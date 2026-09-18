from fastapi import FastAPI, APIRouter, HTTPException, Request
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import asyncio
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
import re
from datetime import datetime, timezone, timedelta
import httpx

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Airtable config
AIRTABLE_PAT = os.environ['AIRTABLE_PAT']
AIRTABLE_BASE_ID = os.environ['AIRTABLE_BASE_ID']
AIRTABLE_TABLE_REF = os.environ.get('AIRTABLE_TABLE_ID') or "OFS%20Applications"
AIRTABLE_URL = f"https://api.airtable.com/v0/{AIRTABLE_BASE_ID}/{AIRTABLE_TABLE_REF}"

# GHL config
GHL_API_KEY = os.environ['GHL_API_KEY']
GHL_LOCATION_ID = os.environ['GHL_LOCATION_ID']
GHL_BASE_URL = "https://services.leadconnectorhq.com"

app = FastAPI()
api_router = APIRouter(prefix="/api")

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# ─── GHL Helper ───

async def ghl_create_or_update_contact(email: str, first_name: str, last_name: str, phone: str, tags: list):
    """Create or update a GHL contact via v2 API and apply tags."""
    headers = {
        "Authorization": f"Bearer {GHL_API_KEY}",
        "Content-Type": "application/json",
        "Version": "2021-07-28",
    }
    payload = {
        "email": email,
        "firstName": first_name,
        "lastName": last_name or "",
        "phone": phone or "",
        "tags": tags,
        "source": "Funnel",
        "locationId": GHL_LOCATION_ID,
    }
    try:
        async with httpx.AsyncClient() as http:
            # v2 upsert: POST /contacts/upsert
            resp = await http.post(
                f"{GHL_BASE_URL}/contacts/upsert",
                headers=headers,
                json=payload,
                timeout=15,
            )
            if resp.status_code in (200, 201):
                data = resp.json()
                contact_id = data.get("contact", {}).get("id", "")
                logger.info(f"GHL contact upserted: {email} → {contact_id}, tags={tags}")
                return contact_id
            else:
                logger.error(f"GHL upsert error {resp.status_code}: {resp.text[:200]}")
    except Exception as exc:
        logger.error(f"GHL request failed: {exc}")
    return None


async def ghl_add_tags(contact_id: str, tags: list):
    """Add tags to an existing GHL contact via v2 API."""
    if not contact_id or not tags:
        return
    headers = {
        "Authorization": f"Bearer {GHL_API_KEY}",
        "Content-Type": "application/json",
        "Version": "2021-07-28",
    }
    try:
        async with httpx.AsyncClient() as http:
            resp = await http.put(
                f"{GHL_BASE_URL}/contacts/{contact_id}",
                headers=headers,
                json={"tags": tags},
                timeout=15,
            )
            if resp.status_code in (200, 201):
                logger.info(f"GHL tags added to {contact_id}: {tags}")
            else:
                logger.error(f"GHL add tags error {resp.status_code}: {resp.text[:200]}")
    except Exception as exc:
        logger.error(f"GHL add tags failed: {exc}")


async def ghl_lookup_contact_by_email(email: str):
    """Look up a GHL contact by email via v2 upsert (returns existing contact)."""
    headers = {
        "Authorization": f"Bearer {GHL_API_KEY}",
        "Content-Type": "application/json",
        "Version": "2021-07-28",
    }
    try:
        async with httpx.AsyncClient() as http:
            resp = await http.post(
                f"{GHL_BASE_URL}/contacts/upsert",
                headers=headers,
                json={"email": email, "locationId": GHL_LOCATION_ID},
                timeout=15,
            )
            if resp.status_code in (200, 201):
                return resp.json().get("contact", {}).get("id")
    except Exception as exc:
        logger.error(f"GHL lookup failed: {exc}")
    return None


# ─── 5-Minute No-Book Timer ───

async def check_no_book(app_id: str, email: str):
    """Wait 5 minutes, then check if lead booked. If not, tag 'Qualified - No Book'."""
    await asyncio.sleep(300)  # 5 minutes
    record = await db.applications.find_one({"id": app_id}, {"_id": 0, "booked": 1})
    if record and not record.get("booked"):
        logger.info(f"No booking after 5 min for {email} — tagging 'Qualified - No Book'")
        contact_id = await ghl_lookup_contact_by_email(email)
        if contact_id:
            await ghl_add_tags(contact_id, ["Qualified - No Book"])
        await db.applications.update_one({"id": app_id}, {"$set": {"ghl_tag": "Qualified - No Book"}})


# ─── Models ───

class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class ApplicationSubmission(BaseModel):
    firstName: str
    lastName: Optional[str] = ""
    email: str
    phone: str
    instagram: Optional[str] = ""
    country: Optional[str] = ""
    tradingExperience: Optional[str] = ""
    tradingAssets: Optional[List[str]] = []
    futuresExperience: Optional[str] = ""
    biggestStruggle: Optional[List[str]] = []
    consistencyBlocks: Optional[str] = ""
    seriousness: Optional[str] = ""
    whyOFS: Optional[str] = ""
    readiness: Optional[str] = ""
    timezoneAvailable: Optional[str] = ""
    investment: Optional[str] = ""
    callWillingness: Optional[str] = ""
    speaksEnglish: Optional[str] = ""
    investmentRevalidation: Optional[str] = ""

class PartialContact(BaseModel):
    firstName: str
    lastName: Optional[str] = ""
    email: str
    phone: str
    instagram: Optional[str] = ""

class BookingConfirmation(BaseModel):
    email: str


class WaitlistSubmission(BaseModel):
    firstName: str
    lastName: Optional[str] = ""
    email: str
    tradingExperience: str
    mainMarket: str
    reason: str


class MasterclassRegistration(BaseModel):
    firstName: str
    lastName: Optional[str] = ""
    email: str
    country: str
    countryCode: Optional[str] = None
    tradingExperience: str
    funnelStage: Optional[str] = "masterclass_registration"
    masterclassId: Optional[str] = None
    utm_source: Optional[str] = None
    utm_medium: Optional[str] = None
    utm_campaign: Optional[str] = None
    utm_content: Optional[str] = None
    utm_term: Optional[str] = None
    referrer: Optional[str] = None
    landingPath: Optional[str] = None


# ─── Routes ───

@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks

@api_router.post("/applications/partial")
async def save_partial_contact(data: PartialContact):
    """Save contact info early (Step 1) and push it to GHL.

    Anyone who completes step 1 is a real lead even if they never finish, so the
    contact goes to GHL immediately with an 'Application Started' tag — that is
    what an abandon sequence can be built on. Airtable is deliberately left for
    completed applications only, so the review table stays a list of actual
    applications rather than a mix of finished and half-finished records.
    """
    now = datetime.now(timezone.utc).isoformat()
    doc = {"created_at": now, "partial": True, **data.model_dump()}
    await db.partial_contacts.insert_one(doc)

    try:
        await ghl_create_or_update_contact(
            email=data.email,
            first_name=data.firstName,
            last_name=data.lastName or "",
            phone=data.phone or "",
            tags=["Application Started"],
        )
    except Exception as exc:  # never block the form on a CRM hiccup
        logger.error(f"GHL partial-contact sync failed for {data.email}: {exc}")

    return {"status": "saved"}


@api_router.post("/waitlist")
async def submit_waitlist(data: WaitlistSubmission):
    """Early-access waitlist capture (site is in closed-enrollment mode).

    Persists to MongoDB and mirrors to Airtable with Source='Early Access Waitlist'
    and Lead Status='Waitlist' so Edgar can filter them separately in the same table.
    Also idempotent on email — a second submission from the same email inside 1 hour
    is treated as a duplicate and returns 429.
    """
    email_norm = data.email.strip().lower()  # noqa: F841 — kept for future analytics/log tagging
    now_dt = datetime.now(timezone.utc)
    now_iso = now_dt.isoformat()

    # 1-hour dedupe (same rule as /applications)
    one_hour_ago = (now_dt - timedelta(hours=1)).isoformat()
    recent = await db.waitlist.find_one(
        {"email": {"$regex": f"^{data.email.strip()}$", "$options": "i"},
         "created_at": {"$gte": one_hour_ago}},
        {"_id": 0, "id": 1},
    )
    if recent:
        raise HTTPException(
            status_code=429,
            detail="You're already on the list. We'll be in touch before the next intake opens.",
        )

    entry_id = str(uuid.uuid4())
    doc = {
        "id": entry_id,
        "created_at": now_iso,
        **data.model_dump(),
    }
    await db.waitlist.insert_one(doc)

    # Mirror to Airtable so Edgar can see it in the same board as applications.
    # Uses free-text fields where possible + Source singleSelect with typecast.
    airtable_fields = {
        "First Name": data.firstName,
        "Last Name": data.lastName or "",
        "Email": data.email,
        "Trading Experience": data.tradingExperience,
        # Repurpose the free-text "Why OFS" field to carry the reason + market.
        "Why OFS": f"[Market: {data.mainMarket}] {data.reason}",
        "Lead Status": "Waitlist",
        "Source": "Early Access Waitlist",
    }
    try:
        async with httpx.AsyncClient() as http:
            resp = await http.post(
                AIRTABLE_URL,
                headers={"Authorization": f"Bearer {AIRTABLE_PAT}", "Content-Type": "application/json"},
                json={"fields": airtable_fields, "typecast": True},
                timeout=15,
            )
        if resp.status_code not in (200, 201):
            logger.error(f"Airtable waitlist error {resp.status_code}: {resp.text}")
    except Exception as exc:
        logger.error(f"Airtable waitlist request failed: {exc}")

    return {"status": "ok", "id": entry_id}


@api_router.post("/masterclass/register")
async def register_masterclass(data: MasterclassRegistration):
    """Order Flow Masterclass registration.

    Persists to MongoDB `masterclass_registrations` and mirrors to Airtable with
    Source='Masterclass Registration' + Lead Status='Registered - Masterclass'.
    Includes 1-hour email dedupe (429 on retry).
    """
    now_dt = datetime.now(timezone.utc)
    now_iso = now_dt.isoformat()

    # 1-hour dedupe (regex-escape email so special chars don't break the pattern)
    one_hour_ago = (now_dt - timedelta(hours=1)).isoformat()
    email_regex = f"^{re.escape(data.email.strip())}$"
    recent = await db.masterclass_registrations.find_one(
        {"email": {"$regex": email_regex, "$options": "i"},
         "created_at": {"$gte": one_hour_ago}},
        {"_id": 0, "id": 1},
    )
    if recent:
        raise HTTPException(
            status_code=429,
            detail="You've already registered for the masterclass. Check your inbox for details.",
        )

    entry_id = str(uuid.uuid4())
    doc = {"id": entry_id, "created_at": now_iso, **data.model_dump()}
    await db.masterclass_registrations.insert_one(doc)

    # Airtable mirror. Country goes into a free-text field via "Country" column;
    # attribution + market/reason stashed into "Why OFS" for at-a-glance triage.
    attribution_summary = " | ".join(
        f"{k}={v}" for k, v in (
            ('utm_source', data.utm_source), ('utm_medium', data.utm_medium),
            ('utm_campaign', data.utm_campaign), ('utm_content', data.utm_content),
            ('utm_term', data.utm_term), ('referrer', data.referrer),
        ) if v
    )
    why_line = f"[Masterclass · {data.country}"
    if data.countryCode:
        why_line += f" ({data.countryCode})"
    why_line += "]"
    if attribution_summary:
        why_line += f" attribution: {attribution_summary}"

    airtable_fields = {
        "First Name": data.firstName,
        "Last Name": data.lastName or "",
        "Email": data.email,
        "Country": data.country,
        "Trading Experience": data.tradingExperience,
        "Why OFS": why_line,
        "Lead Status": "Registered - Masterclass",
        "Source": "Masterclass Registration",
    }
    try:
        async with httpx.AsyncClient() as http:
            resp = await http.post(
                AIRTABLE_URL,
                headers={"Authorization": f"Bearer {AIRTABLE_PAT}", "Content-Type": "application/json"},
                json={"fields": airtable_fields, "typecast": True},
                timeout=15,
            )
        if resp.status_code not in (200, 201):
            logger.error(f"Airtable masterclass error {resp.status_code}: {resp.text}")
    except Exception as exc:
        logger.error(f"Airtable masterclass request failed: {exc}")

    logger.info(f"[MASTERCLASS] registration id={entry_id} email={data.email} country={data.country}")
    return {"status": "ok", "id": entry_id, "confirmationPath": "/masterclass-confirmed"}



@api_router.post("/applications")
async def submit_application(data: ApplicationSubmission):
    """Accept application, store in MongoDB, forward to Airtable + GHL."""

    app_id = str(uuid.uuid4())
    now_dt = datetime.now(timezone.utc)
    now = now_dt.isoformat()

    # 0. Dedupe + already-qualified check (replaces former 7-day cooldown)
    #    Rules:
    #      a) If most recent submission from this email is < 1 hour ago → block as duplicate.
    #      b) If a previous submission from this email was Qualified → block (they already booked).
    #      c) Otherwise (prev was Not Qualified / Review Manually / no prev) → allow fresh eval.
    email_norm = data.email.strip().lower()
    one_hour_ago_iso = (now_dt - timedelta(hours=1)).isoformat()

    recent_submission = await db.applications.find_one(
        {"email": {"$regex": f"^{data.email.strip()}$", "$options": "i"},
         "created_at": {"$gte": one_hour_ago_iso}},
        {"_id": 0, "id": 1, "created_at": 1},
        sort=[("created_at", -1)],
    )
    if recent_submission:
        logger.info(f"[DEDUPE] Blocked submission from {email_norm} — previous within 1h "
                    f"(prev_id={recent_submission.get('id')})")
        raise HTTPException(
            status_code=429,
            detail="It looks like you already submitted recently. Please wait before reapplying.",
        )

    prev_qualified = await db.applications.find_one(
        {"email": {"$regex": f"^{data.email.strip()}$", "$options": "i"},
         "qualified": True},
        {"_id": 0, "id": 1, "created_at": 1},
        sort=[("created_at", -1)],
    )
    if prev_qualified:
        logger.info(f"[ALREADY_QUALIFIED] Blocked re-submission from {email_norm} — "
                    f"prev_qualified_id={prev_qualified.get('id')}")
        raise HTTPException(
            status_code=409,
            detail="You already have an approved application. "
                   "Check your email for next steps or DM us on Instagram @orderflowschool.",
        )

    # 1. Determine qualification (rewritten 2026-06-02 per owner spec — high-budget override)
    #
    #    COMMITMENT SIGNALS (each evaluated independently):
    #      Seriousness:
    #        ABSOLUTE LOWEST : "Curious, but not fully committed"
    #        MEDIUM          : "I want to improve, but I haven't treated it seriously enough yet"
    #        HIGH            : "I'm serious and ready to put in the work" | "I'm fully committed..."
    #      Readiness:
    #        ABSOLUTE LOWEST : "Just exploring"
    #        MEDIUM          : "Interested but unsure"
    #        HIGH            : "Ready to commit" | "Fully ready"
    #
    #    RULES (in order):
    #      1. Empty budget                       → REVIEW MANUALLY (never auto-DQ)
    #      2. HIGH-BUDGET OVERRIDE ($2,500+):
    #         QUALIFIED unless BOTH seriousness AND readiness are at the absolute lowest.
    #      3. $1,000-$2,500: QUALIFIED unless seriousness=LOW AND readiness=LOW (i.e. min tier == LOW)
    #         AND not redeemed by either seriousness OR readiness being HIGH.
    #         Effectively: QUALIFIED if min(seriousness_tier, readiness_tier) >= MEDIUM.
    #      4. $500-$1,000: QUALIFIED only if both seriousness AND readiness are HIGH-tier.
    #      5. $0-$500: NOT QUALIFIED always.
    #      6. Call willingness  → recorded only, never disqualifies.
    #      7. Timezone          → ignored entirely.

    # Tier 1 markets proceed straight to the conversation. Everyone else gets one
    # additional commitment question at the end of the form, because a selected
    # budget band does not always translate to intent at the real enrolment
    # number. It is a re-check, not a bar — answering yes keeps them qualified.
    # Mirrors frontend/src/data/countries.js (TIER1_COUNTRIES).
    TIER1_COUNTRIES = {
        'United States', 'Canada',
        'United Kingdom', 'Germany', 'France', 'Netherlands', 'Belgium', 'Luxembourg',
        'Switzerland', 'Austria', 'Ireland', 'Denmark', 'Sweden', 'Norway', 'Finland', 'Iceland',
        'Spain', 'Italy', 'Portugal',
        'Australia', 'New Zealand',
        'Japan', 'South Korea', 'Singapore', 'Hong Kong', 'Taiwan',
        'United Arab Emirates', 'Qatar', 'Kuwait', 'Saudi Arabia', 'Bahrain', 'Israel',
    }
    REVALIDATION_DECLINE = 'No — not at that level right now'

    SERIOUSNESS_ABS_LOW = 'Curious, but not fully committed'
    READINESS_ABS_LOW = 'Just exploring'
    SERIOUSNESS_MED = "I want to improve, but I haven't treated it seriously enough yet"
    READINESS_MED = 'Interested but unsure'
    SERIOUSNESS_HIGH = {
        "I'm serious and ready to put in the work",
        "I'm fully committed to becoming consistently profitable",
    }
    READINESS_HIGH = {'Ready to commit', 'Fully ready'}

    def s_tier(answer: str) -> int:
        if not answer:
            return 0
        if answer == SERIOUSNESS_ABS_LOW:
            return 1
        if answer == SERIOUSNESS_MED:
            return 2
        if answer in SERIOUSNESS_HIGH:
            return 3
        return 0  # unrecognised → unknown, not LOW

    def r_tier(answer: str) -> int:
        if not answer:
            return 0
        if answer == READINESS_ABS_LOW:
            return 1
        if answer == READINESS_MED:
            return 2
        if answer in READINESS_HIGH:
            return 3
        return 0

    seriousness_tier = s_tier(data.seriousness)
    readiness_tier = r_tier(data.readiness)

    # Treat unknown (tier=0) as "not absolute lowest" so we don't punish leads on missing data.
    both_absolute_lowest = (seriousness_tier == 1 and readiness_tier == 1)

    HIGH_BUDGETS = {'$2,500-$4,000', '$4,000+'}
    MID_BUDGET = '$1,000-$2,500'
    LOW_HIGH_BUDGET = '$500-$1,000'   # Tier 1: HIGH seriousness qualifies (financing). Else both HIGH.
    DIRT_BUDGET = '$0-$500'

    # Tier 1 markets can finance enrolment, so a genuinely serious lead at the
    # $500-$1,000 band should still reach the call. Used only in that band.
    is_tier1_country = (data.country or "").strip() in TIER1_COUNTRIES

    needs_manual_review = not (data.investment and data.investment.strip())
    if needs_manual_review:
        logger.warning(
            f"[REVIEW MANUALLY] Application {app_id} has empty Investment Amount — "
            f"routing to manual review. email={data.email} country={data.country}"
        )
        is_qualified = False
    else:
        budget = data.investment.strip()
        if budget in HIGH_BUDGETS:
            # High budget override — qualified unless BOTH signals at absolute lowest.
            is_qualified = not both_absolute_lowest
        elif budget == MID_BUDGET:
            # $1,000-$2,500: qualified if neither signal is at absolute lowest AND
            # at least one signal is MEDIUM+ (which is true whenever neither is LOW).
            is_qualified = (seriousness_tier != 1 and readiness_tier != 1)
            # Treat unknown tier=0 conservatively as not-LOW (don't penalise).
        elif budget == LOW_HIGH_BUDGET:
            # $500-$1,000. Tier 1 markets can finance enrolment, so a HIGH
            # seriousness signal qualifies them for the call (readiness only needs
            # to be above "just exploring"). Outside Tier 1, still require BOTH
            # seriousness AND readiness HIGH.
            if is_tier1_country:
                is_qualified = (seriousness_tier == 3 and readiness_tier != 1)
            else:
                is_qualified = (seriousness_tier == 3 and readiness_tier == 3)
        elif budget == DIRT_BUDGET:
            # $0-$500: never qualified.
            is_qualified = False
        else:
            logger.warning(
                f"[REVIEW MANUALLY] Application {app_id} has unrecognised budget value "
                f"{budget!r} — routing to manual review."
            )
            needs_manual_review = True
            is_qualified = False

    # Commitment re-check — only ever applied to applicants who already passed
    # on budget, seriousness and readiness, and only outside Tier 1 markets.
    revalidation_answer = (data.investmentRevalidation or "").strip()
    revalidation_required = is_qualified and (data.country or "").strip() not in TIER1_COUNTRIES
    if revalidation_required:
        if revalidation_answer == REVALIDATION_DECLINE:
            logger.info(
                f"[REVALIDATION_DECLINED] Application {app_id} passed core rules but declined "
                f"at the enrolment level. email={data.email} country={data.country}"
            )
            is_qualified = False
        elif not revalidation_answer:
            # The form always asks when it is required, so a blank here means a
            # direct API post or a client mismatch. Never auto-pass; send it to a human.
            logger.warning(
                f"[REVIEW MANUALLY] Application {app_id} required the commitment re-check "
                f"but none was submitted. email={data.email} country={data.country}"
            )
            needs_manual_review = True
            is_qualified = False

    qualified_status_value = (
        "Review Manually" if needs_manual_review
        else ("Qualified" if is_qualified else "Not Qualified")
    )

    # 2. Store in MongoDB
    doc = {
        "id": app_id,
        "qualified": is_qualified,
        "booked": False,
        "created_at": now,
        **data.model_dump(),
    }
    await db.applications.insert_one(doc)

    # 3. Forward to Airtable
    #    Writes to the "Funnel Applications (Live)" table (set via AIRTABLE_TABLE_ID).
    #    Budget goes to the "Investment Amount" singleSelect (typecast creates the
    #    option if missing); the enrolment re-check answer goes to its own
    #    "Investment Revalidation" column.
    airtable_fields = {
        "First Name": data.firstName,
        "Last Name": data.lastName,
        "Email": data.email,
        "Phone": data.phone,
        "Instagram": data.instagram or "",
        "Country": data.country or "",
        "Speaks English": data.speaksEnglish or "",
        "Trading Experience": data.tradingExperience or "",
        "Biggest Struggle": ", ".join(data.biggestStruggle) if data.biggestStruggle else "",
        "Consistency Blocks": data.consistencyBlocks or "",
        "Seriousness": data.seriousness or "",
        "Why OFS": data.whyOFS or "",
        "Readiness": data.readiness or "",
        "Investment Amount": data.investment or "",
        "Call Willingness": data.callWillingness or "",
        "Investment Revalidation": data.investmentRevalidation or "",
        "Qualified Status": qualified_status_value,
        "Lead Status": "New Application",
        "Source": "Funnel",
    }
    try:
        async with httpx.AsyncClient() as http:
            resp = await http.post(
                AIRTABLE_URL,
                headers={"Authorization": f"Bearer {AIRTABLE_PAT}", "Content-Type": "application/json"},
                json={"fields": airtable_fields, "typecast": True},
                timeout=15,
            )
        if resp.status_code not in (200, 201):
            logger.error(f"Airtable error {resp.status_code}: {resp.text}")
    except Exception as exc:
        logger.error(f"Airtable request failed: {exc}")

    # 4. GHL — Create/update contact + tag
    ghl_tags = ["Applied"]
    if needs_manual_review:
        ghl_tags.append("Review Manually")
    elif not is_qualified:
        ghl_tags.append("Disqualified")
    if revalidation_answer:
        ghl_tags.append(f"Revalidation: {revalidation_answer.split(' —')[0].split(' -')[0]}")

    await ghl_create_or_update_contact(
        email=data.email,
        first_name=data.firstName,
        last_name=data.lastName or "",
        phone=data.phone or "",
        tags=ghl_tags,
    )

    # 5. If qualified, start 5-min no-book timer
    if is_qualified:
        asyncio.create_task(check_no_book(app_id, data.email))

    return {"id": app_id, "qualified": is_qualified, "status": qualified_status_value}


@api_router.post("/applications/booking-confirmed")
async def booking_confirmed(data: BookingConfirmation):
    """Called by frontend when Calendly onEventScheduled fires.
       Tags the lead 'Qualified - Booked' in GHL and marks as booked in MongoDB."""
    email = data.email.strip().lower()

    # Find the most recent qualified application for this email
    record = await db.applications.find_one(
        {"email": {"$regex": f"^{email}$", "$options": "i"}, "qualified": True},
        {"_id": 0, "id": 1, "booked": 1},
        sort=[("created_at", -1)],
    )
    if not record:
        return {"status": "no_record"}

    if record.get("booked"):
        return {"status": "already_booked"}

    # Mark as booked
    await db.applications.update_one(
        {"id": record["id"]},
        {"$set": {"booked": True, "booked_at": datetime.now(timezone.utc).isoformat()}}
    )

    # Tag in GHL
    contact_id = await ghl_lookup_contact_by_email(email)
    if contact_id:
        await ghl_add_tags(contact_id, ["Qualified - Booked"])
        logger.info(f"Booking confirmed for {email} — tagged 'Qualified - Booked'")

    return {"status": "booked"}


@api_router.post("/webhooks/calendly")
async def calendly_webhook(request: Request):
    """Receives Calendly webhook events for cancellations and no-shows."""
    try:
        payload = await request.json()
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid JSON")

    event_type = payload.get("event", "")
    event_payload = payload.get("payload", {})

    # Extract email — Calendly nests it differently per event type
    email = ""
    if "invitee" in event_payload:
        email = event_payload["invitee"].get("email", "")
    elif "email" in event_payload:
        email = event_payload["email"]
    # For no-show events, email may be nested under invitee within scheduled_event
    if not email and "no_show" in event_payload:
        invitees = event_payload.get("no_show", {}).get("invitees", [])
        if invitees:
            # Get invitee URI, but we may need to just log for now
            email = event_payload.get("no_show", {}).get("invitee", {}).get("email", "")

    email = email.strip().lower()
    logger.info(f"Calendly webhook received: event={event_type}, email={email}")

    if not email:
        return {"status": "no_email"}

    if event_type == "invitee.canceled":
        # Lead cancelled their booked call
        contact_id = await ghl_lookup_contact_by_email(email)
        if contact_id:
            await ghl_add_tags(contact_id, ["Cancelled"])
            logger.info(f"Calendly cancellation for {email} — tagged 'Cancelled'")
        await db.applications.update_one(
            {"email": {"$regex": f"^{email}$", "$options": "i"}, "booked": True},
            {"$set": {"cancelled": True, "cancelled_at": datetime.now(timezone.utc).isoformat()}}
        )
        return {"status": "cancelled_tagged"}

    if event_type == "invitee_no_show.created":
        # Lead no-showed their booked call
        contact_id = await ghl_lookup_contact_by_email(email)
        if contact_id:
            await ghl_add_tags(contact_id, ["No Show"])
            logger.info(f"Calendly no-show for {email} — tagged 'No Show'")
        await db.applications.update_one(
            {"email": {"$regex": f"^{email}$", "$options": "i"}, "booked": True},
            {"$set": {"no_show": True, "no_show_at": datetime.now(timezone.utc).isoformat()}}
        )
        return {"status": "no_show_tagged"}

    return {"status": "event_ignored", "event": event_type}


# ─── App setup ───

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
