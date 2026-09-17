import React, { useEffect, useRef, useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import Choice, { ChoiceGroup } from './Choice';
import { ALL_COUNTRIES, isEnglishPrimaryCountry } from '../../data/countries';
import { needsInvestmentRevalidation, REVALIDATION } from '../../lib/qualification';
import { PRIVATE_PROGRAM } from '../../config/offers';

/* ─────────────────────────────────────────────────────────────
   NOTE ON OPTION VALUES
   The backend scores qualification off the exact strings used for
   `seriousness`, `readiness` and `investment` (server.py). Those
   values are kept verbatim here — only the question wording and the
   order of the steps change. Changing an option string means changing
   the matching constant in server.py, or applications score wrong.

   STEP ORDER
   1. Your details   — who you are and where to reach you (asked first,
      so a lead is captured even if the form is abandoned).
   2. Your trading   — experience and where it breaks down.
   3. Commitment     — how serious, how ready.
   4. Fit            — budget, the call, and — for developing markets that
      already qualify on budget + readiness — the enrolment re-check.
   The submit payload is unchanged, so the backend is untouched.
   ───────────────────────────────────────────────────────────── */

const Field = ({ id, label, optional, error, hint, children }) => (
  <div className="ofs-form-block">
    <label className="ofs-field-label" htmlFor={id}>
      {label} {optional
        ? <span style={{ color: 'var(--muted)', fontWeight: 400 }}>(optional)</span>
        : <span className="ofs-req" aria-hidden="true">*</span>}
    </label>
    {children}
    {hint && <p className="ofs-fine" style={{ marginTop: 8 }}>{hint}</p>}
    {error && <p className="ofs-error" id={`${id}-err`} role="alert">{error}</p>}
  </div>
);

const Text = ({ id, value, onChange, error, ...rest }) => (
  <input
    id={id} className="ofs-input" value={value || ''} onChange={onChange}
    aria-invalid={error ? 'true' : undefined}
    aria-describedby={error ? `${id}-err` : undefined}
    data-testid={`input-${id}`} {...rest}
  />
);

const CountrySelect = ({ value, onChange, error }) => {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const wrap = useRef(null);

  useEffect(() => {
    if (!open) return;
    const away = (e) => { if (wrap.current && !wrap.current.contains(e.target)) setOpen(false); };
    const esc = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', away);
    document.addEventListener('keydown', esc);
    return () => { document.removeEventListener('mousedown', away); document.removeEventListener('keydown', esc); };
  }, [open]);

  const list = q ? ALL_COUNTRIES.filter((c) => c.toLowerCase().includes(q.toLowerCase())) : ALL_COUNTRIES;

  return (
    <div className="ofs-form-block">
      <span className="ofs-field-label">Where are you based? <span className="ofs-req" aria-hidden="true">*</span></span>
      <div className="ofs-combo" ref={wrap}>
        <button type="button" className="ofs-combo-btn" aria-expanded={open} aria-haspopup="listbox"
                onClick={() => setOpen((o) => !o)} data-testid="input-country">
          <span className={value ? undefined : 'ofs-combo-ph'}>{value || 'Select your country'}</span>
          <ChevronDown className="w-4 h-4" style={{ color: 'var(--muted)', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 200ms' }} />
        </button>
        {open && (
          <div className="ofs-combo-pop">
            <div className="ofs-combo-search">
              <Search className="w-4 h-4" style={{ color: 'var(--muted)', flex: '0 0 auto' }} />
              <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search countries" aria-label="Search countries" />
            </div>
            <div className="ofs-combo-list" role="listbox" aria-label="Country">
              {list.map((c) => (
                <button key={c} type="button" role="option" aria-selected={c === value}
                        className="ofs-combo-item"
                        onClick={() => { onChange(c); setOpen(false); setQ(''); }}>{c}</button>
              ))}
              {!list.length && <p className="ofs-fine" style={{ padding: '14px 16px' }}>No match.</p>}
            </div>
          </div>
        )}
      </div>
      {error && <p className="ofs-error" role="alert">{error}</p>}
    </div>
  );
};

/* ── Step 1 — Your details (where to reach you) ─────── */
export const Step1Details = ({ formData, updateFormData, errors }) => (
  <div>
    <div className="ofs-form-pair">
      <Field id="firstName" label="First name" error={errors.firstName}>
        <Text id="firstName" value={formData.firstName} placeholder="Edgar" error={errors.firstName}
              autoComplete="given-name"
              onChange={(e) => updateFormData({ firstName: e.target.value })} />
      </Field>
      <Field id="lastName" label="Last name" optional>
        <Text id="lastName" value={formData.lastName} placeholder="Alvarez" autoComplete="family-name"
              onChange={(e) => updateFormData({ lastName: e.target.value })} />
      </Field>
    </div>

    <Field id="email" label="Email" error={errors.email}>
      <Text id="email" type="email" inputMode="email" autoComplete="email"
            value={formData.email} placeholder="you@example.com" error={errors.email}
            onChange={(e) => updateFormData({ email: e.target.value })} />
    </Field>

    <Field id="phone" label="Phone" error={errors.phone}
           hint="Used only to arrange the conversation if you're a fit.">
      <Text id="phone" type="tel" inputMode="tel" autoComplete="tel"
            value={formData.phone} placeholder="+1 (555) 123-4567" error={errors.phone}
            onChange={(e) => updateFormData({ phone: e.target.value })} />
    </Field>

    <CountrySelect value={formData.country || ''} error={errors.country}
                   onChange={(v) => updateFormData({ country: v, speaksEnglish: '', investmentRevalidation: '' })} />

    {formData.country && !isEnglishPrimaryCountry(formData.country) && (
      <ChoiceGroup id="speaksEnglish" legend="Do you speak English?" error={errors.speaksEnglish}
                   hint="The program runs in English — this is only so we know what to expect.">
        {[
          ['Yes, fluently', 'Yes, fluently'],
          ['Decent', "It's decent — not perfect, but I can follow along"],
          ['No', "No, I don't speak English"],
        ].map(([v, l]) => (
          <Choice key={v} name="speaksEnglish" value={v} label={l}
                  checked={formData.speaksEnglish === v}
                  onChange={(e) => updateFormData({ speaksEnglish: e.target.value })} />
        ))}
      </ChoiceGroup>
    )}

    <Field id="instagram" label="Instagram handle" optional
           hint="Only if you'd like Edgar to glance at your trading. We never post, tag or message you.">
      <Text id="instagram" value={formData.instagram} placeholder="@yourhandle"
            onChange={(e) => updateFormData({ instagram: e.target.value })} />
    </Field>
  </div>
);

/* ── Step 2 — Your trading ─────────────────────────── */
const BREAKDOWNS = [
  'I see the setup and hesitate, then miss the move',
  'I enter late, after the move is already going',
  'I take the setup and it fails without me understanding why',
  'I hold my original bias and defend it against what the market is doing',
  'I force setups when there is nothing really there',
  'I cut the winners early and sit through the losers',
  "I can't tell a good version of my setup from a bad one in advance",
  'I keep failing evaluations or giving back funded accounts',
];

export const Step2Trading = ({ formData, updateFormData, errors }) => (
  <div>
    <ChoiceGroup id="tradingExperience" legend="How long have you been trading?"
                 hint="Whatever you currently trade stays yours — the framework is built to sit on top of it, so we only need your experience level here."
                 error={errors.tradingExperience}>
      {/* Values below are written to Airtable — keep them stable. */}
      {["I'm a complete beginner", 'Less than 6 months', '6 months – 1 year', '1–2 years', '2+ years'].map((o) => (
        <Choice key={o} name="tradingExperience" value={o} label={o}
                checked={formData.tradingExperience === o}
                onChange={(e) => updateFormData({ tradingExperience: e.target.value })} />
      ))}
    </ChoiceGroup>

    <ChoiceGroup id="biggestStruggle" legend="When your trading breaks down, what usually happens?"
                 hint="Select everything that sounds like you. Being honest here is what makes the review useful."
                 error={errors.biggestStruggle}>
      {BREAKDOWNS.map((o) => (
        <Choice key={o} type="checkbox" name="biggestStruggle" value={o} label={o}
                checked={formData.biggestStruggle?.includes(o)}
                onChange={(e) => {
                  const cur = formData.biggestStruggle || [];
                  updateFormData({ biggestStruggle: e.target.checked ? [...cur, o] : cur.filter((s) => s !== o) });
                }} />
      ))}
    </ChoiceGroup>
  </div>
);

/* ── Step 3 — Commitment ───────────────────────────── */
export const Step3Commitment = ({ formData, updateFormData, errors }) => (
  <div>
    {/* Value strings below drive qualification in server.py — do not edit. */}
    <ChoiceGroup id="seriousness" legend="How serious are you about joining OFS and working with Edgar?"
                 error={errors.seriousness}>
      {['Curious, but not fully committed',
        "I want to improve, but I haven't treated it seriously enough yet",
        "I'm serious and ready to put in the work",
        "I'm fully committed to becoming consistently profitable"].map((o) => (
        <Choice key={o} name="seriousness" value={o} label={o}
                checked={formData.seriousness === o}
                onChange={(e) => updateFormData({ seriousness: e.target.value })} />
      ))}
    </ChoiceGroup>

    <ChoiceGroup id="readiness" legend="If accepted, how ready are you to work inside a structured process?"
                 hint="This means reviewing your own sessions and being corrected, not just watching lessons."
                 error={errors.readiness}>
      {['Just exploring', 'Interested but unsure', 'Ready to commit', 'Fully ready'].map((o) => (
        <Choice key={o} name="readiness" value={o} label={o}
                checked={formData.readiness === o}
                onChange={(e) => updateFormData({ readiness: e.target.value })} />
      ))}
    </ChoiceGroup>
  </div>
);

/* ── Step 4 — Fit ──────────────────────────────────── */
export const Step4Fit = ({ formData, updateFormData, errors }) => (
  <div>
    {/* Band strings map to the Airtable "Investment Amount" select and to the
        qualification rule in server.py — do not edit the values. */}
    <ChoiceGroup
      id="investment"
      legend="If the fit is right, what level of investment in your development is realistic for you?"
      hint="Order Flow School is a paid private program. Nothing is charged at application — this only tells us whether the timing works on your side."
      error={errors.investment}
    >
      {['$0-$500', '$500-$1,000', '$1,000-$2,500', '$2,500-$4,000', '$4,000+'].map((o) => (
        <Choice key={o} name="investment" value={o} label={o}
                checked={formData.investment === o}
                onChange={(e) => updateFormData({ investment: e.target.value, investmentRevalidation: '' })} />
      ))}
    </ChoiceGroup>

    <ChoiceGroup id="callWillingness"
                 legend="If your application looks like a fit, are you open to a short conversation about your trading?"
                 error={errors.callWillingness}>
      {[['Yes', 'Yes'], ['No', 'Not right now']].map(([v, l]) => (
        <Choice key={v} name="callWillingness" value={v} label={l}
                checked={formData.callWillingness === v}
                onChange={(e) => updateFormData({ callWillingness: e.target.value })} />
      ))}
    </ChoiceGroup>

    {/* Enrolment re-check — shown only to developing-market applicants who
        already qualify on budget + readiness. First-world qualified leads
        never see it (see lib/qualification.js). */}
    {needsInvestmentRevalidation(formData) && (
      <ChoiceGroup
        id="investmentRevalidation"
        legend={`This is a private mentorship built to develop you into a consistent, independent trader — and enrolment starts at ${PRIVATE_PROGRAM.fromPrice}. If Edgar accepts you, are you in a position to invest at that level to make it happen?`}
        hint="We ask so expectations are clear on both sides before the call. Nothing is charged now, and a straight answer costs you nothing."
        error={errors.investmentRevalidation}
      >
        {[REVALIDATION.YES, REVALIDATION.MAYBE, REVALIDATION.NO].map((o) => (
          <Choice key={o} name="investmentRevalidation" value={o} label={o}
                  checked={formData.investmentRevalidation === o}
                  onChange={(e) => updateFormData({ investmentRevalidation: e.target.value })} />
        ))}
      </ChoiceGroup>
    )}

    <p className="ofs-fine" style={{ marginTop: 26 }}>
      By submitting, you agree to receive email and SMS about your application
      and scheduling. Your answers are used to review your application and
      nothing else.
    </p>
  </div>
);

export default Step1Details;
