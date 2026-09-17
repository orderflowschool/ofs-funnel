# Order Flow School - Product Requirements Document

## Original Problem Statement

Build a premium, high-converting, application-based landing funnel for Order Flow School - a trading education brand for serious futures traders. The website must combine strong direct-response conversion logic, premium brand design, clear funnel architecture, mobile-first responsiveness, application-based exclusivity, and modern clean code.

## User Personas

### Primary User: Serious Futures Trader
- **Experience Level**: Beginner to advanced
- **Pain Points**: Inconsistent results, failed evaluations, lack of structure, trading blind with indicators
- **Goals**: Master order flow, become consistently profitable, pass prop firm evaluations
- **Behavior**: Researching trading education, skeptical of "guru" marketing, values serious professional approach

### Secondary User: Order Flow School Team
- **Role**: Review applications and conduct interviews
- **Goals**: Attract qualified, committed students; filter out casual browsers
- **Needs**: Structured application data, calendar booking integration, CRM connectivity

## Core Requirements (Static)

### Functional Requirements
1. **Landing Page Funnel** with 10 sections in specific order
2. **Multi-step Application Form** (5 steps with validation)
3. **Success/Confirmation Flow** after application
4. **Calendar Booking Integration** (placeholder ready)
5. **Mobile-First Responsive Design**
6. **Analytics Tracking Hooks** for conversion optimization

### Design Requirements
1. **Premium Dark Theme**: Deep navy background (#040814), muted red accent (#C63F5C)
2. **Institutional Feel**: Clean, sophisticated, not flashy or "guru-style"
3. **Clear Visual Hierarchy**: Large typography, generous spacing
4. **Subtle Animations**: Fade-up on scroll, smooth transitions
5. **No Gradients Overuse**: Follow 80/20 gradient restriction rule

### Technical Requirements
1. **React 19** with modern hooks
2. **React Router** for multi-page experience
3. **Tailwind CSS** for styling
4. **Shadcn UI** components (accordion)
5. **Lucide React** icons (no emojis)
6. **LocalStorage** for form persistence
7. **Modular Architecture** for easy integration

## What's Been Implemented

### ✅ Phase 1: Frontend Funnel (Completed - March 13, 2026)

#### Landing Page Sections
1. **Hero Section** - Value proposition with video placeholder, primary CTA
2. **Pain Identification** - 5 relatable pain points, emotional connection
3. **Reframe/Mechanism** - 3-step framework explanation
4. **Founder Video** - Private breakdown video section
5. **Why OFS Works** - 6 feature cards with benefits
6. **What's Inside** - 8 curriculum items
7. **Who It's For** - Two-column for/not-for comparison
8. **Student Proof** - Mixed testimonials (text, video, screenshot placeholders)
9. **FAQ** - 8 questions with accordion UI
10. **Final CTA** - Application invitation with context

#### Application Flow
- **Multi-step Form**: 5 steps with progress indicator
  - Step 1: Trading Profile (experience, assets, futures background)
  - Step 2: Current Struggle (challenges, consistency blocks)
  - Step 3: Seriousness & Fit (commitment, motivation, readiness)
  - Step 4: Investment & Qualification (budget range, call willingness)
  - Step 5: Contact Details (name, email, phone, Instagram)
- **Form Features**:
  - Real-time validation with error messages
  - Progress indicator with step visualization
  - LocalStorage auto-save (preserves data on refresh)
  - Mobile-optimized inputs and layouts
  - Navigation between steps

#### Additional Pages
- **Success Page**: Application confirmation with next steps
- **Booking Page**: Calendar integration placeholder ready for Calendly/Cal.com
- **Post-Booking Confirmation Page** 🆕: Critical show-up rate optimizer with:
  - Step 1/3: Required founder pre-call video (thanks, expectations, pre-frame)
  - Step 2/3: Call commitment confirmation (email/SMS placeholders)
  - Step 3/3: Student testimonials (clarity, structure, confidence focus)
  - Final pre-call reminder checklist
  - Premium onboarding experience design

#### Layout & Components
- **Fixed Header**: Logo, Apply CTA, mobile-friendly
- **Mobile Sticky CTA**: Bottom-fixed on mobile, hidden on other pages
- **Reusable Components**: Card, SectionWrapper, StepIndicator
- **Analytics Hooks**: Placeholder functions for GA4 and Meta Pixel

#### Design Implementation
- Premium dark theme with exact color specifications
- Fade-up animations on scroll (Intersection Observer)
- Hover states and transitions
- Mobile-first responsive breakpoints
- Custom scrollbar styling
- Proper focus states for accessibility

## Prioritized Backlog

### P0 (Pre-Launch Critical)
- [ ] **Form Backend Integration** - Connect application form to database/CRM
- [ ] **Real Video Content** - Replace all video placeholders with actual URLs (hero, founder, testimonials, **pre-call video**)
- [ ] **Real Testimonials** - Add authentic student testimonials with proof
- [ ] **Calendar Integration** - Implement Calendly or Cal.com booking **with auto-redirect to /booking-confirmed**
- [ ] **Analytics Setup** - Add real GA4 and Meta Pixel IDs
- [ ] **Logo Upload** - Replace placeholder with actual OFS logo
- [ ] **Email Integration** - Set up application notification system
- [ ] **Record Pre-Call Video** 🆕 - Critical founder video for post-booking page (3-5 min)

### P1 (Post-Launch Optimization)
- [ ] **A/B Testing Framework** - Test headline variations
- [ ] **Email Sequences** - Automated follow-up for applicants
- [ ] **SMS Confirmation** 🆕 - Add SMS confirmation on post-booking page
- [ ] **Application Review Dashboard** - Internal tool for team
- [ ] **Advanced Analytics** - Heatmaps, session recordings
- [ ] **SEO Optimization** - Meta tags, structured data, sitemap
- [ ] **Performance Optimization** - Image lazy loading, code splitting
- [ ] **Form Abandonment Recovery** - Email reminders for incomplete applications
- [ ] **No-Show Tracking** 🆕 - Monitor and improve show-up rates from post-booking page

### P2 (Future Enhancements)
- [ ] **Member Login Portal** - For accepted students
- [ ] **Payment Integration** - Stripe for course payment
- [ ] **Resource Library** - Free content for lead nurturing
- [ ] **Referral Program** - Student referral tracking
- [ ] **Live Chat** - Support widget for questions
- [ ] **Blog/Content Hub** - SEO and authority building
- [ ] **Video Hosting** - Self-hosted vs YouTube comparison

## Next Action Items

### Immediate (Before Launch)
1. **Add Real Content**: Gather and implement actual videos, testimonials, screenshots (**including pre-call video**)
2. **Backend Setup**: Create simple API endpoint for form submissions
3. **Integrate Calendar**: Connect Calendly account and embed **with redirect to /booking-confirmed**
4. **Setup Analytics**: Add Google Analytics and Meta Pixel tracking IDs
5. **Test Mobile**: Full mobile device testing (iOS, Android)
6. **Form Testing**: Submit test applications end-to-end **including post-booking flow**

### Short-term (First Week)
1. **Monitor Submissions**: Check application quality and completion rate
2. **Track Show-up Rates** 🆕: Monitor effectiveness of post-booking page
3. **Collect Feedback**: Ask early applicants about experience
4. **Optimize Load Time**: Compress images, optimize bundle size
5. **Setup Monitoring**: Error tracking (Sentry), uptime monitoring
6. **Document Process**: Create internal guide for application review

### Enhancement Ideas
- Add video testimonials with subtitles for accessibility
- Implement social proof notifications ("5 traders applied today")
- Create alternative landing pages for different traffic sources
- Add exit-intent popup for abandoning visitors
- Implement progressive profiling (simpler initial form, more details later)

## Technical Notes

### Current Architecture
- **Frontend**: React 19 + Tailwind CSS + React Router
- **State Management**: React hooks (useState, useEffect)
- **Persistence**: LocalStorage for form auto-save
- **Icons**: Lucide React (consistent, professional)
- **Forms**: Custom validation (no external form library)

### Integration Endpoints Needed
```
POST /api/applications        # Submit new application
GET  /api/applications/:id    # Retrieve application status
POST /api/booking             # Confirm calendar booking
POST /api/analytics           # Track conversion events
```

### Environment Variables Required
```
REACT_APP_BACKEND_URL          # Already configured
REACT_APP_GA_ID                # Google Analytics
REACT_APP_META_PIXEL_ID        # Meta Pixel
REACT_APP_CALENDLY_URL         # Calendar booking
```

## Success Metrics

### Primary KPIs
- **Application Start Rate**: % of visitors who click "Apply"
- **Application Completion Rate**: % who start and complete form
- **Qualified Application Rate**: % that meet acceptance criteria
- **Booking Rate**: % who schedule call after applying
- **Show-up Rate** 🆕: % who attend scheduled call (target: 80%+ with post-booking page)
- **Acceptance Rate**: % accepted into program

### Secondary Metrics
- **Time on Page**: Landing page engagement
- **Scroll Depth**: How far visitors read
- **Form Step Drop-off**: Which step loses most applicants
- **Mobile vs Desktop**: Conversion rate comparison
- **Traffic Source Performance**: Which channels bring best applicants

## Risk Mitigation

### Technical Risks
- **Form Submission Failure**: Implement retry logic, show clear errors
- **Data Loss**: LocalStorage backup, email confirmation
- **Mobile Compatibility**: Extensive device testing

### Business Risks
- **Low-Quality Applications**: Clear qualification messaging throughout
- **Application Volume**: Manual review may not scale - plan automation
- **No-Show Bookings**: Calendar reminders, booking deposits

---

**Last Updated**: April 15, 2026
**Version**: 2.4 - OFS Foundations Sales Page
**Status**: Phase 1 Complete - Ready for Content & Integration

## Recent Updates

### May 26, 2026 - v3.3 (Master Update)
- ✅ Bug fixes: VSL badge ▶, FAQ underline, hero image fill, gold button gradient, duplicate CTA heading
- ✅ New 3-line hero headline with cinematic background image
- ✅ New sections: watch-then-apply, CTAs below Who/FAQ, urgency copy on FinalCTA
- ✅ 5 feature cards on /success page
- ✅ Alternating section bg, colored for/not-for cards, FAQ gold open state
- ✅ 15/15 tests passed (app flow, mobile QA, form validation, redirects)

### May 23, 2026 - v3.0 (Institutional Visual Redesign)
- ✅ Complete visual redesign: "Bloomberg Terminal meets luxury brand" aesthetic
- ✅ Typography: Bebas Neue (display/headlines), Barlow (body), Barlow Condensed (labels/badges)
- ✅ Color system: Gold #C9A84C primary accent, #060A12 bg, #0D1420 cards, green #00D97E for positives, red #C63F5C for warnings only
- ✅ Components: Gold badges (2px border-radius), sharp institutional buttons, testimonial cards with gold top border + decorative quote marks, noise texture overlay, radial glow hero, gold section dividers
- ✅ Sticky nav: "OFS" wordmark + "Apply Now" gold button, backdrop blur
- ✅ Footer: OFS logo, Instagram/YouTube social icons (gold on hover), risk disclaimer
- ✅ Form inputs: Gold border focus state, custom radio buttons, gold step progress
- ✅ All pages unified: Homepage, /apply, /success, /not-ready-yet
- ✅ Full backup saved at /app/backups/v2.5/
- ✅ Scroll animations: IntersectionObserver fade-up with stagger delays
- ✅ No copy or functionality changed — visual design only

### April 28, 2026 - v2.5 (GoHighLevel CRM Integration)
- ✅ **GHL webhook integration** — contacts created/updated in GHL on form submission via v2 API
- ✅ **Tag: "Applied"** — added to every lead on form submit
- ✅ **Tag: "Disqualified"** — added alongside "Applied" for non-qualified leads
- ✅ **Tag: "Qualified - Booked"** — added when Calendly booking fires (frontend notifies backend)
- ✅ **Tag: "Qualified - No Book"** — added automatically after 5-minute timer if no booking detected
- ✅ **Tag: "Cancelled" / "No Show"** — Calendly webhook endpoint at `/api/webhooks/calendly`
- ✅ GHL v2 Private Integration Token with contacts.read + contacts.write scopes

### April 15, 2026 - v2.4 (OFS Foundations Sales Page Rebuild)
- ✅ Complete rebuild of `/not-ready-yet` as premium OFS Foundations sales page
- ✅ v2: Typography overhaul — DM Sans body, Syne reserved for hero/stats/price only. Tailwind classes matching funnel patterns. Generous spacing (space-y-8/12, gap-6/8). Card styles matching funnel (bg-[#0A0A0A], border-gray-800/50, rounded-xl, p-6).
- ✅ Removed $100 from hero CTA button ("Get Instant Access" only) and sticky bar button ("Get Access" only)
- ✅ 9 sections: Hero, Features (6 cards), VSL (hidden), Pain (4 cards), Stats Bar, Social Proof (4 Vimeo), For Who/Not For Who, Pricing ($100 card), Footer + sticky CTA bar
- ✅ Design: #060A12 bg, gold #C9A84C CTAs, scroll animations, mobile responsive

### April 15, 2026 - v2.3 (Silent All-DQ — No Inline Blocks)
- ✅ Removed ALL inline disqualification cards from the form. Every lead fills the entire 4-step form regardless of answers.
- ✅ Removed conditional hiding of investment/call questions on Step 4 when timezone is "No" — all 3 questions always visible.
- ✅ Removed `isCurrentStepDisqualified` logic — Next/Submit buttons always available.
- ✅ Backend qualification logic updated to silently evaluate: seriousness, readiness, timezone, call willingness, English proficiency, country+budget tier, and minimum budget.
- ✅ Qualified → `/success` (Calendly booking). Not qualified → `/not-ready-yet` (low ticket page). Lead never knows why.

### Jul 5, 2026 - v5.0 (Masterclass Registration Pivot)
- ✅ **Complete positioning pivot** from closed-enrollment/waitlist → **Order Flow Masterclass registration**. Zero old-funnel language remains anywhere in the codebase.
- ✅ **New homepage** (`/pages/Home.jsx`) with 8 sections: Hero (pulse pill + 3-line H1 "STOP TRADING BLIND. LEARN TO READ WHAT CANDLESTICKS HIDE." + gold divider + subhead + LIVE ONLINE/LIMITED REGISTRATION chips + gold CTA), Paradigm Shift (3 cards), 4-Module Curriculum with framework list (Map→Read→Wait→Execute), Who This Is For (single-column checklist), Static Instructor (no VSL), Registration Form (id=masterclass-registration), 5-item FAQ using `<details>`, Final CTA.
- ✅ **New masterclass form** (`/components/masterclass/MasterclassForm.jsx`) with 5 fields: firstName (required), lastName (optional), email (required), **country (searchable accessible combobox required — full ALL_COUNTRIES list + ISO 3166-1 alpha-2 code)**, tradingExperience (select required, 6 options). Country combobox has proper aria-expanded/aria-controls/role='combobox', keyboard nav (ArrowUp/Down/Enter/Escape), focus-first-error on submit.
- ✅ **Centralized config** at `/config/masterclass.js` — single source of truth for date/time/timezone/duration/isFree/isLive/registrationOpen/etc. Safe editable fallback copy when values are null. No invented dates or scarcity.
- ✅ **New confirmation page** `/masterclass-confirmed`: "Your spot is reserved." + 3-step next-steps + optional calendar link (config-gated).
- ✅ **New backend endpoint** `POST /api/masterclass/register` → MongoDB `db.masterclass_registrations` + Airtable mirror (Source='Masterclass Registration', Lead Status='Registered - Masterclass', Why OFS carries `[Masterclass · <country> (<ISO>)]` + attribution summary). Captures countryCode, funnelStage, UTMs, referrer, landingPath. 1-hour email dedupe returns 429. Regex-escapes email for defensive Mongo queries.
- ✅ **Analytics events** added in `utils/analytics.js`: `masterclass_page_view`, `masterclass_cta_clicked`, `masterclass_form_started`, `masterclass_registration_submitted`, `masterclass_registration_success`, `masterclass_registration_error`. No PII.
- ✅ **Header** + **MobileCTA** CTAs now say "Secure My Spot" and scroll to `#masterclass-registration`. Respects `prefers-reduced-motion`.
- ✅ **HTML metadata** updated: title, description, OG title/description, Twitter card. All reference the masterclass.
- ✅ **Country ISO codes** added to `data/countries.js` (`COUNTRY_ISO` + `isoForCountry` helpers) — covers ~75 most-selected countries; nulls out gracefully for the rest.
- ✅ **No CTAs point to `/not-ready-yet`** from the new homepage.
- ✅ **All existing routes intact** (`/apply` 4-step qualification, `/success`, `/booking-confirmed`, `/not-ready-yet`) — used tests confirm they still load.
- ✅ **Regression + E2E via `testing_agent_v3_fork` (iteration_16.json)**: backend 7/7 pytest, frontend 20+ Playwright checks including keyboard-driven country combobox, mobile 390px overflow + stacking + sticky bar, error focus-management, Airtable side-effect verification, all legacy routes still loading. **100% pass**.


### Jul 4, 2026 - v4.0 (Closed-Enrollment Pivot — Waitlist Homepage)
- ✅ **Homepage completely repositioned** as a closed-enrollment / early-access landing experience:
  - Hero: pulsing "ENROLLMENT CLOSED" gold badge + H1 "ORDER FLOW SCHOOL IS CURRENTLY CLOSED." + subhead about rebuilding backend + primary CTA "Apply for Early Access" + "SCROLL FOR DETAILS" cue.
  - "What's Happening" section with 3 gold-topped cards (Rebuilding platform, Tightening curriculum, Selective reopening).
  - Inline early-access waitlist form (5 fields: firstName+lastName, email, tradingExperience radio, mainMarket radio, reason textarea).
  - Optional context section with Edgar's VSL (Vimeo `1175230814`) + secondary outlined CTA.
  - Closing note "Serious traders only. Manually reviewed. First-in-line for the next intake." + final gold CTA.
- ✅ New backend endpoint `POST /api/waitlist` → MongoDB `db.waitlist` + Airtable mirror with `Source='Early Access Waitlist'` and `Lead Status='Waitlist'`. Reuses existing 1-hour dedupe pattern (returns 429 on duplicate).
- ✅ Header nav CTA changed from "Apply Now" → `/apply` to **"Early Access"** → smooth-scroll to `#early-access-form`.
- ✅ MobileCTA changed to "Apply for Early Access" → scroll to form.
- ✅ Per owner spec: **no CTA on the new homepage points to `/not-ready-yet`** (the $100 Foundations tripwire). Page still lives at its URL for direct traffic but is no longer part of the funnel from Home.
- ✅ **Existing routes completely preserved**: `/apply` 4-step qualification flow, `/success`, `/booking-confirmed`, `/not-ready-yet` all untouched and functional.
- ✅ Full E2E regression via testing_agent_v3_fork (iteration_15.json): **backend 6/6 pytest + frontend 20/20 Playwright checks** including mobile 390px + regression on all preserved routes.


### Jun 2, 2026 - v3.10 (Cooldown replaced + High-budget override)
- ✅ **CHANGE 1**: 7-day cooldown REMOVED. Replaced with two-tier dedupe:
  - Within 1 hour of any previous submission from same email → HTTP 429 "It looks like you already submitted recently…"
  - Previously Qualified email retrying → HTTP 409 "You already have an approved application…"
  - Otherwise (prev=Not Qualified / Review Manually / no prev) → fresh evaluation
- ✅ **CHANGE 2**: High-budget override added. A lead with $2,500-$4,000 or $4,000+ qualifies UNLESS BOTH seriousness="Curious, but not fully committed" AND readiness="Just exploring" (the absolute lowest signals). One good signal anywhere saves them.
- ✅ Full new qualification matrix implemented:
  - Empty budget → Review Manually (never auto-DQ)
  - $0-$500 → Never qualifies
  - $500-$1,000 → Qualifies only if BOTH seriousness AND readiness are HIGH-tier (financing)
  - $1,000-$2,500 → Qualifies if neither signal is at absolute lowest
  - $2,500-$4,000 / $4,000+ → Qualifies unless BOTH signals at absolute lowest
- ✅ **CHANGE 3 (Audit report)** generated at `/app/memory/false_negative_audit_2026-06-02.txt`:
  - **Bucket 1** — 3 records would now QUALIFY under high-budget override (1 real lead: Edgar Alvarez `reckSftQEFnCHhDUr`)
  - **Bucket 2** — 168 records had empty budget; under new rules these would be "Review Manually" instead of "Not Qualified". Likely a UI bug in the past or partial submissions auto-marked DQ.
  - **Bucket 3** — 1 record victim of the 7-day cooldown (Joshua Henry `recggmc05XmL6WQUk`)
- ✅ Frontend `Application.jsx` now handles 429/409 responses gracefully (shows server `detail` message inline via `submit-error-message`, does NOT redirect to /not-ready-yet).
- ✅ Audit script saved at `/app/backend/scripts/audit_false_negatives.py` for re-running anytime.
- ✅ **All 13 verification test cases PASSED** (curl) including dedupe (429), already-qualified block (409), high-budget override, financing path, and edge cases.


### Jun 1, 2026 - v3.9 (Major Qualification Logic Rewrite)
- 🐛 **Root cause found (PART 1 audit)**: Latest Airtable record (Edgar Alvarez, reckSftQEFnCHhDUr) showed perfect HIGH+HIGH+$4,000+ marked "Not Qualified" — caused by 7-day cooldown from a $0-$500 submission 65 seconds earlier (same email retrying).
- ✅ **Timezone question removed entirely** from Step 4 (form question, Step 5 review label, `formData.timezoneAvailable` state, validation, and `Timezone Available` Airtable write all gone). Step 4 now has exactly 2 questions: Budget + Call willingness.
- ✅ **Qualification logic rewritten** per owner spec in `server.py`:
  - Commitment tier = `min(tier(seriousness), tier(readiness))` where LOW={Curious..., Just exploring}, MEDIUM={I want to improve..., Interested but unsure}, HIGH={I'm serious..., I'm fully committed..., Ready to commit, Fully ready}.
  - Rule 1 (gate): commitment=LOW → NOT QUALIFIED, no further evaluation.
  - Rule 2 (manual review): empty budget → "Review Manually", warning logged, never auto-DQ.
  - Rule 3: $0-$500 → NOT QUALIFIED.
  - Rule 4: $500-$1,000 + MEDIUM → NOT QUALIFIED.
  - Rule 5: $500-$1,000 + HIGH → QUALIFIED (financing offered on call).
  - Rule 6: $1,000+ → QUALIFIED for any non-LOW commitment.
  - Rule 7: Call willingness recorded, never disqualifies.
  - Rule 8: Timezone fully ignored.
- ✅ Budget still writes to `fldvu4Vz3Ovlb6tXe` (Investment Amount singleSelect); legacy `Investment` field never written.
- ✅ Field mismatch audit (PART 5): All other form fields (Seriousness, Readiness, Call Willingness, Trading Experience, etc.) verified to write to correctly named Airtable fields. No mismatches found.
- ✅ **All 7 test cases PASSED**: backend curl + Airtable record verification + frontend E2E via testing_agent_v3_fork (iteration_14.json). 100% success rate.


### May 31, 2026 - v3.8 (5 targeted UX polishes)
- ✅ `/apply` form Prev/Next button row: `gap:16`, `width:100%`, `padding:0 4px`. Previous = `flex-shrink:0, min-width:100px`. Next/Submit = `flex:1, min-height:52px`. Mobile spacing fixed.
- ✅ Homepage VSL container: removed "▶ WATCH BEFORE YOU APPLY" badge. Kept "Watch the full video, then apply below." + CTA.
- ✅ `/not-ready-yet`: Student Results section (4 Vimeo cards) hidden via `style={{display:'none'}}` + HTML comment. Code intact.
- ✅ `/not-ready-yet`: Sticky bar moved from bottom-fixed to **top-fixed** (always visible). Wrapper has `paddingTop:64`. Removed `showBar` state + IntersectionObserver. Mobile breakpoint reduced from 640px to 480px. Emergent watermark no longer overlaps.
- ✅ `/not-ready-yet`: "The Real Problem" pain section (4 cards) hidden via `style={{display:'none'}}` + HTML comment. Adjacent `<hr>` dividers removed to prevent doubled lines.
- ✅ Frontend regression PASSED 5/5 (desktop + mobile) via testing_agent_v3_fork (iteration_13.json). End-to-end form submission verified previously in iteration_12.


### Mar 4, 2026 - v3.7.1 (VSL separation + Application flow verification)
- ✅ VSL container now visually separated from video (24px margin, both with independent border-radius:4px) per user request.
- ✅ Defined missing CSS variables in `:root` (`--font-body`, `--font-display`, `--text-primary`, `--text-secondary`) — they were referenced in `FormSteps.jsx` but undefined; fallback to body Inter was correct but variable hygiene was broken.
- ⚠️ User reported "can't submit applications" — testing_agent_v3_fork executed a complete E2E submission flow on `/apply` (4 steps with valid data) and SUBMISSION SUCCEEDED end-to-end (POST /api/applications → 200 → redirect to /success). Airtable record `bug-test-e2e@example.com` was created with Investment Amount = $2,500-$4,000 and Qualified Status = "Qualified". The bug is NOT REPRODUCIBLE on the current preview build. Most likely cause: user's browser is serving a stale pre-v3.7 bundle from cache. Recommended user action: hard refresh (Ctrl+Shift+R / Cmd+Shift+R) or test in incognito.


### Mar 4, 2026 - v3.7 (Airtable Bug Fix + DOM Reorder + Typography Upgrade)
- ✅ **CRITICAL BUG FIX (Airtable)**: Budget answer was being written to legacy `Investment` (singleLineText, fldcp1Dd732ACZa9k) — Airtable's Qualified Status formula reads from `Investment Amount` (singleSelect, fldvu4Vz3Ovlb6tXe). This caused every high-budget lead to be silently marked "Not Qualified". `server.py` now writes budget to field ID `fldvu4Vz3Ovlb6tXe` directly, and stopped writing to legacy `Investment`. Added defensive "Review Manually" qualified-status fallback when budget is empty (+ structured warning log).
- ⚠️ **Manual step pending for user**: PAT lacks Airtable schema-write scope, so the legacy `Investment` field could not be renamed via API. User to manually rename it in Airtable to "Investment (DEPRECATED - do not use)" in 30 seconds.
- ✅ **Homepage VSL DOM reorder**: Instruction container ("▶ WATCH BEFORE YOU APPLY" + post-VSL CTA) now physically renders ABOVE the Vimeo iframe in source order (no CSS positioning tricks). Border-radii flipped to maintain flush visual connection — measured 0px gap.
- ✅ **Typography Upgrade (Anton/Barlow → League Spartan/Inter)**:
  - Google Fonts `<link>` swapped in `public/index.html` (loads League Spartan 400-900 + Inter 300-700 + Cormorant Garamond 700).
  - All 13 JSX/CSS files updated via sed: `Anton`→`League Spartan`, `Barlow`/`Barlow Condensed`→`Inter`.
  - Global CSS rules in `ofs-design.css`: body Inter 16px/line-height 1.7, H1/H2 League Spartan 800/letter-spacing -0.02em, H3 League Spartan 700, p margin-bottom 1em, .g-badge Inter 600/0.16em, .g-btn Inter 600/0.12em.
  - "IS ORDER FLOW SCHOOL RIGHT FOR YOU?" changed to title case "Is Order Flow School Right for You?" with `text-transform:none`.
  - Zero Anton/Barlow references remain on the site.
- ✅ Full regression PASSED via testing_agent_v3_fork (iteration_11.json): backend 100% + frontend 100%, both Airtable submission paths verified, VSL DOM order confirmed, typography fully migrated on /, /apply, /success, /not-ready-yet, /booking-confirmed.


### Feb 29, 2026 - v3.6 (UX Polish Pass — 4 changes)
- ✅ `/success`: added 32px breathing room (marginTop) between subheadline and the two-button anchor nav.
- ✅ `/booking-confirmed`: removed duplicate watch-video messaging from top hero (red "Do NOT skip" line + body paragraph). Top now shows only green check + "YOUR CALL IS CONFIRMED". Step 1 section with the video below is untouched.
- ✅ Homepage hero: converted plain text "Join Order Flow School →" link into a proper ghost pill button (1.5px gold border, 9999 radius, 14px 32px padding, transparent bg, Barlow Condensed 700 uppercase). "Applications reviewed manually." gray micro-text retained below.
- ✅ Homepage VSL: instruction container is now flush against the video iframe (video wrapper has no bottom border/radius; container has no top border/radius and `margin-top: 0`). Measured visual gap = 0px.
- ✅ Frontend regression PASSED 4/4 + smoke via testing_agent_v3_fork (iteration_10.json).


### Feb 26, 2026 - v3.5 (Funnel Polish Pass — 8 changes)
- ✅ Removed duplicate "YOUR OBJECTIONS ARE ANSWERED" CTA at bottom of homepage (was below FAQ). Final CTA "READY TO STOP TRADING BLIND?" is now the sole closer.
- ✅ Tightened gap between VSL iframe and "WATCH BEFORE YOU APPLY" container from 32px to 8px (margin-top).
- ✅ All `/not-ready-yet` checkout CTAs (hero, pricing card, sticky bar) now open `https://whop.com/checkout/plan_3VIsMeJcCRHpX` in a new tab via `target="_blank" rel="noopener noreferrer"`.
- ✅ `/success` subheadline updated to "Your next step is simple — book your call with Edgar Alvarez, Founder & CEO of Order Flow School, below."
- ✅ Removed pull-quote testimonial card from `/success`.
- ✅ Replaced it with two-button anchor nav: outlined "What's Included" (scrolls to `#whats-included`) + filled gold "Next Step: Book Your Call →" (scrolls to `#book-your-call`).
- ✅ Added sticky bottom CTA bar on `/success`: "OFS Accelerator / Private access · Limited spots each week" + gold "Book Your Call →" button. Responsive: row on desktop, stacks with full-width button on mobile (≤640px).
- ✅ `/booking-confirmed` now scrolls to top on mount (window.scrollTo({top:0, behavior:'instant'})).
- ✅ Frontend regression PASSED 14/14 via testing_agent_v3_fork (iteration_9.json).


### Feb 26, 2026 - v3.4 (Success Page Cinematic Redesign)
- ✅ Full visual overhaul of `/success` page to match the `/not-ready-yet` "Tier-1 Prop Firm" design language (v3.3 system).
- ✅ Six dedicated sections rebuilt: (1) Top Hero with green pulse pill + Anton H1 "YOU'VE BEEN APPROVED FOR OFS ACCELERATOR" (gold span) + Barlow subhead + testimonial reframe; (2) Red warning + gold timezone cards (side-by-side, stack on mobile); (3) Book Your Call — Calendly InlineWidget with `overflow: visible` wrapper and forced `width:100% !important; height:700px !important` (no double scrollbars); (4) What Happens Next 3-step numbered card; (5) Five feature cards in a 2-col grid using FeatureIcon SVGs; (6) Shared Footer component.
- ✅ Strict design tokens: bg `#000000`, card `#111111`, gold `#C9A235`, 12px border radius, Anton/Barlow/Barlow Condensed fonts.
- ✅ All `data-testid` hooks preserved/added: `success-page`, `approved-pill`, `success-heading`, `et-warning-card`, `timezone-card`, `calendly-widget-container`, `what-happens-next`, `success-feature-card-0..4`, `et-reminder-text`.
- ✅ Booking flow preserved: `useCalendlyEventListener.onEventScheduled` → `trackCalendlyBookingCompleted` → POST `/api/applications/booking-confirmed` → `navigate('/booking-confirmed')`.
- ✅ Frontend regression PASSED 14/14 via testing_agent_v3_fork (iteration_8.json). Mobile responsive at 390px verified.


### April 15, 2026 - v2.2 (Form Streamlining + Success Page Overhaul)
- ✅ **CHANGE 1**: Removed "What do you trade most often?" checkbox question from Step 1.
- ✅ **CHANGE 2**: Removed Step 5 (Review & Submit). Form is now 4 steps. Submits directly on Step 4.
- ✅ **CHANGE 3**: Success page heading → "You're approved for Order Flow School" with new body copy about 15-min call.
- ✅ **CHANGE 4**: Warning block moved below "Schedule your interview call" heading, above Calendly. Updated text about ET, no-shows, and late cancellations.
- ✅ **CHANGE 5**: Timezone detection on Success page — if visitor is 7+ hours from ET, amber banner shows calculated local time range. Persistent "All times shown are in Eastern Time (ET)" text below Calendly for ALL visitors.
- ✅ All 5 changes tested and verified via testing agent (100% pass rate).

### April 14, 2026 - v2.1 (Silent Country/Budget DQ + English Question)
- ✅ **"Do you speak English?"** question added to Step 1 — appears only for non-English-first-language countries. 3 options: "Yes, fluently" / "Decent" / "No"
- ✅ **Silent country/budget DQ** — removed visible DQ card from Step 4. Non-Tier1 + low budget now silently evaluated at submission → redirected to `/not-ready-yet`. Applicant never knows.
- ✅ **Silent English DQ** — "No" English speakers silently redirected to `/not-ready-yet` after submission.
- ✅ Backend qualification logic updated with 3 checks: English, country+budget tier, minimum budget.
- ✅ `speaksEnglish` field added to backend model and Airtable mapping.
- ✅ `ENGLISH_PRIMARY_COUNTRIES` set added to `countries.js`.

### April 11, 2026 - v2.0 (Major Form Overhaul)
- ✅ **CHANGE 1**: Hero headline → "Stop failing evals. Start trading with real edge. Apply to Order Flow School."
- ✅ **CHANGE 2**: Feature card contrast fixed — titles #FFFFFF bold, descriptions #D1D5DB
- ✅ **CHANGE 3**: Contact fields (name, email, phone, Instagram) moved to Step 1 before trading questions. Step 5 is now Review & Submit. Contact data saves to backend immediately on Step 1 completion via `/api/applications/partial`
- ✅ **CHANGE 4**: Timezone availability question added to Step 4. "No" → inline disqualification with self-study CTA
- ✅ **CHANGE 5**: Auto-disqualify low-commitment answers on Step 3 ("Curious" or "Just exploring") with inline DQ message
- ✅ **CHANGE 6**: Auto-disqualify call refusal on Step 4 with specific DQ message
- ✅ **CHANGE 7**: Instagram Handle now required with helper text
- ✅ All DQ messages styled consistently, Next button hidden on disqualification, all CTAs link to Whop
- ✅ `timezoneAvailable` field added to backend model and Airtable mapping

### March 18, 2026 - v1.3
- ✅ **GA4 Connected** — Measurement ID `G-BNRH0HNWBR` live, tracking: page_view, application_started, application_step_completed, application_submitted, qualified_lead, non_qualified_lead, booking_page_viewed, calendly_booking_completed
- ✅ **Low-ticket offer page updated** — `/not-ready-yet` now has structured $100 offer with 5 benefits, scarcity line, reapply messaging
- ✅ **Testimonials moved above "Who is this school for"** on landing page
- ✅ **"Direct 1:1 Access for Questions"** title updated in feature cards

### March 18, 2026 - v1.2
- ✅ **Backend Proxy for Airtable** — Secure `/api/applications` endpoint in FastAPI that receives form data, stores in MongoDB, and forwards to Airtable (token never exposed on frontend)
- ✅ **Calendly Integration** — Embedded live Calendly widget (`react-calendly` InlineWidget) on `/success` page with dark theme, name/email prefill, and auto-redirect to `/booking-confirmed` on event scheduled
- ✅ **Live Form Submission** — Application form now POSTs to backend API with real qualification logic (server-side)
- ✅ **Lead Segmentation** — Qualified leads ($500+) → `/success` (Calendly), Non-qualified ($0–$500) → `/not-ready-yet`
- ✅ **All tests passing** — 10/10 backend tests, 100% frontend tests
- ⚠️ **Airtable token 403** — Token lacks permissions to write to base. User needs to regenerate token with correct scope (see notes below)

### March 13, 2026 - v1.1
- ✅ Added Post-Booking Confirmation Page (`/booking-confirmed`)
- ✅ Complete funnel: Landing → Apply → Success → Book → Post-Booking
