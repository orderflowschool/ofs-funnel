"""Comprehensive audit: surface historical records that would have a DIFFERENT
qualification outcome under the new rules (2026-06-02 ruleset).

Flags:
  - DQ records that would now QUALIFY under high-budget override
  - DQ records with empty budget that would now be "Review Manually"
  - DQ records that would now QUALIFY due to removed 7-day cooldown
    (i.e. emails with multiple DQs > 1h apart < 7d apart where any record has high budget)
"""
import os
from collections import defaultdict
from datetime import datetime, timedelta
from dotenv import load_dotenv
import httpx

load_dotenv('/app/backend/.env')

pat = os.environ['AIRTABLE_PAT']
base_id = os.environ['AIRTABLE_BASE_ID']
table_id = 'tbl4EmVSMo5Y8EiSn'

url = f'https://api.airtable.com/v0/{base_id}/{table_id}?pageSize=100'
records, offset = [], None
while True:
    u = url + (f'&offset={offset}' if offset else '')
    r = httpx.get(u, headers={'Authorization': f'Bearer {pat}'}, timeout=20).json()
    records.extend(r.get('records', []))
    offset = r.get('offset')
    if not offset:
        break

HIGH_BUDGETS = {'$1,000-$2,500', '$2,500-$4,000', '$4,000+', '$2,500+'}
SUPER_HIGH = {'$2,500-$4,000', '$4,000+', '$2,500+'}
SERIOUSNESS_ABS_LOW = 'Curious, but not fully committed'
READINESS_ABS_LOW = 'Just exploring'

# Bucket 1: would now QUALIFY under high-budget override
new_qual_high_override = []
# Bucket 2: had empty budget → would now be "Review Manually"
review_manually_now = []
# Bucket 3: blocked by 7-day cooldown (emails with multiple DQ within window)
cooldown_victims = []

by_email = defaultdict(list)
for rec in records:
    f = rec.get('fields', {})
    em = (f.get('Email') or '').strip().lower()
    if em:
        by_email[em].append(rec)

for rec in records:
    f = rec.get('fields', {})
    status = f.get('Qualified Status')
    if status != 'Not Qualified':
        continue
    budget = f.get('Investment Amount')
    sers = f.get('Seriousness')
    ready = f.get('Readiness')

    # Bucket 1: high-budget override would save them
    if budget in SUPER_HIGH:
        # NEW rule DQs only if BOTH at absolute lowest
        if not (sers == SERIOUSNESS_ABS_LOW and ready == READINESS_ABS_LOW):
            new_qual_high_override.append(rec)

    # Bucket 2: empty budget — now Review Manually
    if not budget:
        review_manually_now.append(rec)

# Bucket 3: emails with multiple Not Qualified records, >1h<7d apart,
# where any record has high budget (likely cooldown false negative)
for email, recs in by_email.items():
    if len(recs) < 2:
        continue
    recs_s = sorted(recs, key=lambda r: r.get('createdTime', ''))
    dq_recs = [r for r in recs_s if r['fields'].get('Qualified Status') == 'Not Qualified']
    if len(dq_recs) < 2:
        continue
    for i in range(len(dq_recs)):
        for j in range(i + 1, len(dq_recs)):
            try:
                ta = datetime.fromisoformat(dq_recs[i]['createdTime'].replace('Z', '+00:00'))
                tb = datetime.fromisoformat(dq_recs[j]['createdTime'].replace('Z', '+00:00'))
            except Exception:
                continue
            delta = tb - ta
            if not (timedelta(hours=1) < delta < timedelta(days=7)):
                continue
            # Any record (DQ or otherwise) with high budget for this email?
            any_high = any(r['fields'].get('Investment Amount') in HIGH_BUDGETS for r in recs_s)
            if any_high:
                cooldown_victims.append((email, dq_recs[i], dq_recs[j], delta))
                break
        else:
            continue
        break


def short(rec, fields=('First Name', 'Last Name', 'Investment Amount', 'Seriousness', 'Readiness')):
    f = rec['fields']
    parts = [f"{k}={f.get(k, '<empty>')!r}" for k in fields]
    return f"id={rec['id']} created={rec['createdTime']} " + " ".join(parts)


print('=' * 78)
print(f"BUCKET 1 — Would now QUALIFY under high-budget override: {len(new_qual_high_override)}")
print('=' * 78)
for rec in new_qual_high_override[:30]:
    print('  ', short(rec))
if len(new_qual_high_override) > 30:
    print(f'  ... and {len(new_qual_high_override)-30} more')

print()
print('=' * 78)
print(f"BUCKET 2 — Would now be REVIEW MANUALLY (empty budget): {len(review_manually_now)}")
print('=' * 78)
for rec in review_manually_now[:30]:
    print('  ', short(rec))
if len(review_manually_now) > 30:
    print(f'  ... and {len(review_manually_now)-30} more')

print()
print('=' * 78)
print(f"BUCKET 3 — Likely 7-day cooldown false negatives: {len(cooldown_victims)}")
print('=' * 78)
for email, a, b, delta in cooldown_victims[:30]:
    print(f"  EMAIL: {email}  gap={delta}")
    print('    A:', short(a))
    print('    B:', short(b))
