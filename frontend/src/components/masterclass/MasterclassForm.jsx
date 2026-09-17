import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Search } from 'lucide-react';
import { ALL_COUNTRIES, isoForCountry } from '../../data/countries';
import { MASTERCLASS } from '../../config/masterclass';
import {
  trackCTAClick,
  trackMasterclassFormStarted,
  trackMasterclassRegistrationSubmitted,
  trackMasterclassRegistrationSuccess,
  trackMasterclassRegistrationError,
} from '../../utils/analytics';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const EXPERIENCE_OPTIONS = [
  "I'm a complete beginner",
  'Less than 6 months',
  '6–12 months',
  '1–2 years',
  '2–4 years',
  '4+ years',
];

/** Read UTM + referrer + landingPath once per page load. */
const readAttribution = () => {
  try {
    const url = new URL(window.location.href);
    const q = url.searchParams;
    return {
      utm_source: q.get('utm_source') || null,
      utm_medium: q.get('utm_medium') || null,
      utm_campaign: q.get('utm_campaign') || null,
      utm_content: q.get('utm_content') || null,
      utm_term: q.get('utm_term') || null,
      referrer: document.referrer || null,
      landingPath: url.pathname || null,
    };
  } catch { return {}; }
};

/* ─── Accessible searchable country combobox ─── */
const CountryCombobox = ({ value, onChange, error, id = 'mc-country' }) => {
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const wrapRef = useRef(null);
  const btnRef = useRef(null);
  const inputRef = useRef(null);
  const listboxId = `${id}-listbox`;

  const filtered = useMemo(
    () => (search
      ? ALL_COUNTRIES.filter(c => c.toLowerCase().includes(search.toLowerCase()))
      : ALL_COUNTRIES),
    [search],
  );

  // Close on outside click
  useEffect(() => {
    const onDoc = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  useEffect(() => { if (open && inputRef.current) inputRef.current.focus(); }, [open]);
  useEffect(() => { setActive(0); }, [search]);

  const pick = (name) => {
    onChange(name);
    setSearch('');
    setOpen(false);
    btnRef.current?.focus();
  };

  const onKey = (e) => {
    if (!open) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(a => Math.min(a + 1, filtered.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(a => Math.max(a - 1, 0)); }
    else if (e.key === 'Enter') { e.preventDefault(); if (filtered[active]) pick(filtered[active]); }
    else if (e.key === 'Escape') { e.preventDefault(); setOpen(false); btnRef.current?.focus(); }
  };

  return (
    <div ref={wrapRef} className="relative">
      <button
        ref={btnRef}
        id={id}
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-haspopup="listbox"
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        onClick={() => setOpen(o => !o)}
        data-testid="mc-country"
        style={{
          width: '100%', minHeight: 48,
          padding: '12px 16px',
          background: '#111214',
          border: `1px solid ${open ? '#ADCBF8' : (error ? '#FF6B87' : 'rgba(173,203,248,0.15)')}`,
          borderRadius: 6, color: '#FAF9F6',
          fontFamily: "'Inter Variable','Inter',sans-serif", fontSize: 15, textAlign: 'left',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          boxShadow: open ? '0 0 0 3px rgba(173,203,248,0.14)' : 'none',
        }}
      >
        <span style={{ color: value ? '#FAF9F6' : '#9A9C9F' }}>{value || 'Select your country'}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9A9C9F" strokeWidth="2"
          style={{ transform: open ? 'rotate(180deg)' : '', transition: 'transform 0.15s ease' }}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div
          role="listbox" id={listboxId} aria-label="Country"
          style={{
            position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 50,
            marginTop: 4, background: '#111214',
            border: '1px solid rgba(173,203,248,0.25)', borderRadius: 6,
            maxHeight: 280, overflow: 'hidden',
            boxShadow: '0 12px 32px rgba(0,0,0,0.6)',
          }}
        >
          <div style={{ padding: 8, borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Search width={16} height={16} color="#9A9C9F" />
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              onKeyDown={onKey}
              placeholder="Search countries…"
              aria-autocomplete="list"
              style={{
                flex: 1, background: 'transparent', border: 'none', outline: 'none',
                color: '#FAF9F6', fontFamily: "'Inter Variable','Inter',sans-serif", fontSize: 14,
              }}
            />
          </div>
          <div style={{ maxHeight: 220, overflowY: 'auto' }}>
            {filtered.length === 0 ? (
              <div style={{ padding: 14, color: '#9A9C9F', fontSize: 14 }}>No matches.</div>
            ) : filtered.map((name, i) => {
              const isActive = i === active;
              return (
                <div
                  key={name}
                  role="option"
                  aria-selected={value === name}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => pick(name)}
                  style={{
                    padding: '10px 14px', cursor: 'pointer',
                    background: isActive ? 'rgba(173,203,248,0.1)' : 'transparent',
                    color: value === name ? '#ADCBF8' : '#FAF9F6',
                    fontFamily: "'Inter Variable','Inter',sans-serif", fontSize: 14,
                  }}
                  data-testid={`mc-country-option-${i}`}
                >
                  {name}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const MasterclassForm = () => {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '',
    country: '', tradingExperience: '',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState(false);
  const errorSummaryRef = useRef(null);

  const attribution = useMemo(readAttribution, []);
  const isFree = MASTERCLASS.isFree;

  const update = (patch) => {
    if (!touched) { setTouched(true); trackMasterclassFormStarted(); }
    setForm(p => ({ ...p, ...patch }));
  };

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = 'Please enter your first name';
    if (!form.email.trim()) e.email = 'Please enter your email';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Please enter a valid email';
    if (!form.country) e.country = 'Please select your country';
    if (!form.tradingExperience) e.tradingExperience = 'Please tell us your trading experience';
    setErrors(e);
    return e;
  };

  const focusFirstError = (e) => {
    const order = ['firstName', 'email', 'country', 'tradingExperience'];
    const first = order.find(k => e[k]);
    if (!first) return;
    const el = document.querySelector(`[data-testid="mc-${first === 'firstName' ? 'first-name' : first === 'tradingExperience' ? 'experience' : first}"]`);
    if (el && el.focus) el.focus();
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { focusFirstError(e); return; }
    if (submitting) return;

    setSubmitting(true); setSubmitError('');
    trackMasterclassRegistrationSubmitted({ ctaLocation: 'form' });
    try {
      const payload = {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        country: form.country,
        countryCode: isoForCountry(form.country),
        tradingExperience: form.tradingExperience,
        funnelStage: 'masterclass_registration',
        masterclassId: MASTERCLASS.id,
        ...attribution,
      };
      const resp = await fetch(`${API_URL}/api/masterclass/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await resp.json().catch(() => ({}));
      if (resp.status === 429) {
        setSubmitError(result.detail || "You've already registered for the masterclass.");
        setSubmitting(false);
        trackMasterclassRegistrationError({ reason: 'duplicate' });
        return;
      }
      if (!resp.ok) {
        setSubmitError('Something went wrong. Please try again in a moment.');
        setSubmitting(false);
        trackMasterclassRegistrationError({ reason: 'server' });
        return;
      }
      trackMasterclassRegistrationSuccess({ masterclassId: MASTERCLASS.id });
      setSubmitted(true);
      // Optional: redirect to confirmation page for a full-page confirmation experience
      window.location.assign(`${MASTERCLASS.confirmationPath}?e=${encodeURIComponent(form.email.trim())}`);
    } catch (err) {
      setSubmitError('Network issue. Please try again.');
      trackMasterclassRegistrationError({ reason: 'network' });
    }
    setSubmitting(false);
  };

  const anyErr = Object.keys(errors).length > 0;

  if (submitted) {
    // Fallback in-place confirmation while the redirect happens
    return (
      <div style={{
        maxWidth: 640, margin: '0 auto', padding: 40,
        background: '#111214', border: '1px solid rgba(173,203,248,0.25)',
        borderRadius: 4, textAlign: 'center',
      }} data-testid="mc-form-success">
        <p style={{ fontFamily: "'Inter Variable','Inter',sans-serif", color: '#C6C8CB' }}>Confirming your registration…</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      style={{
        maxWidth: 640, margin: '0 auto', padding: '36px 32px',
        background: '#111214', border: '1px solid rgba(173,203,248,0.2)',
        borderRadius: 4,
      }}
      data-testid="mc-registration-form"
      aria-labelledby="mc-form-heading"
    >
      <div style={{ marginBottom: 28 }}>
        <span style={{
          fontFamily: "'Inter Variable','Inter',sans-serif", fontWeight: 600, fontSize: 10,
          textTransform: 'uppercase', letterSpacing: '0.16em', color: '#ADCBF8',
        }}>Order Flow Masterclass · Registration</span>
        <h3 id="mc-form-heading" style={{
          fontFamily: "'Geist Variable','Geist',sans-serif", fontWeight: 800, fontSize: 28,
          color: '#FAF9F6', letterSpacing: '-0.02em', marginTop: 10, marginBottom: 10,
        }}>
          Register for the Masterclass
        </h3>
        <p style={{ fontFamily: "'Inter Variable','Inter',sans-serif", fontSize: 14, color: '#C6C8CB', lineHeight: 1.65 }}>
          Complete the form below to reserve your place. Your access details will be sent to the email you provide.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 16 }}>
        <Field id="mc-first-name" label="First name" required error={errors.firstName}>
          <input
            id="mc-first-name" type="text" value={form.firstName}
            onChange={e => update({ firstName: e.target.value })}
            placeholder="First name" autoComplete="given-name"
            aria-invalid={!!errors.firstName}
            aria-describedby={errors.firstName ? 'mc-first-name-err' : undefined}
            data-testid="mc-first-name"
            style={inputStyle(!!errors.firstName)}
          />
        </Field>
        <Field id="mc-last-name" label="Last name" hint="Optional">
          <input
            id="mc-last-name" type="text" value={form.lastName}
            onChange={e => update({ lastName: e.target.value })}
            placeholder="Last name" autoComplete="family-name"
            data-testid="mc-last-name"
            style={inputStyle(false)}
          />
        </Field>
      </div>

      <Field id="mc-email" label="Email" required error={errors.email}>
        <input
          id="mc-email" type="email" value={form.email}
          onChange={e => update({ email: e.target.value })}
          placeholder="you@example.com" autoComplete="email" inputMode="email"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'mc-email-err' : undefined}
          data-testid="mc-email"
          style={inputStyle(!!errors.email)}
        />
      </Field>

      <Field id="mc-country" label="Country" required error={errors.country}>
        <CountryCombobox
          id="mc-country"
          value={form.country}
          onChange={c => update({ country: c })}
          error={!!errors.country}
        />
      </Field>

      <Field id="mc-experience" label="How long have you been trading?" required error={errors.tradingExperience}>
        <select
          id="mc-experience"
          value={form.tradingExperience}
          onChange={e => update({ tradingExperience: e.target.value })}
          aria-invalid={!!errors.tradingExperience}
          aria-describedby={errors.tradingExperience ? 'mc-experience-err' : undefined}
          data-testid="mc-experience"
          style={{ ...inputStyle(!!errors.tradingExperience), appearance: 'none', backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3Csvg width=\'12\' height=\'8\' viewBox=\'0 0 12 8\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M1 1l5 5 5-5\' stroke=\'%238D97A8\' stroke-width=\'2\' fill=\'none\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center', paddingRight: 40 }}
        >
          <option value="" disabled>Select your experience</option>
          {EXPERIENCE_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      </Field>

      {submitError && (
        <div
          role="alert"
          ref={errorSummaryRef}
          data-testid="mc-form-error"
          style={{
            marginTop: 20, padding: '12px 16px',
            background: 'rgba(255,107,135,0.08)',
            border: '1px solid rgba(255,107,135,0.35)',
            borderRadius: 6,
            fontFamily: "'Inter Variable','Inter',sans-serif", fontSize: 14, color: '#FFC2CD', textAlign: 'center',
          }}
        >
          {submitError}
        </div>
      )}

      {anyErr && !submitError && (
        <div
          role="status" aria-live="polite"
          style={{ marginTop: 12, fontFamily: "'Inter Variable','Inter',sans-serif", fontSize: 12, color: '#ADCBF8', textAlign: 'center' }}
        >
          Please fix the highlighted fields above.
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        data-testid="mc-submit"
        onClick={() => trackCTAClick('MC Form Submit')}
        style={{
          marginTop: 24, width: '100%', height: 56,
          background: 'linear-gradient(135deg, #ADCBF8 0%, #ADCBF8 45%, #ADCBF8 100%)',
          color: '#07142B', fontFamily: "'Inter Variable','Inter',sans-serif", fontWeight: 700,
          fontSize: 14, letterSpacing: '0.14em', textTransform: 'uppercase',
          borderRadius: 9999, border: 'none', cursor: submitting ? 'wait' : 'pointer',
          boxShadow: '0 6px 28px rgba(173,203,248,0.35)', transition: 'all 0.2s ease',
          opacity: submitting ? 0.7 : 1,
        }}
      >
        {submitting ? 'Reserving your spot…' : (isFree ? 'Secure My Free Spot' : 'Secure My Spot')}
      </button>

      <p style={{ marginTop: 14, textAlign: 'center', fontFamily: "'Inter Variable','Inter',sans-serif", fontSize: 12, color: '#9A9C9F' }}>
        Registration takes less than a minute. We'll send the class details to your email.
      </p>
    </form>
  );
};

const inputStyle = (hasErr) => ({
  width: '100%', minHeight: 48,
  padding: '12px 16px',
  background: '#111214',
  border: `1px solid ${hasErr ? '#FF6B87' : 'rgba(173,203,248,0.15)'}`,
  borderRadius: 6,
  color: '#FAF9F6', fontFamily: "'Inter Variable','Inter',sans-serif", fontSize: 15,
  outline: 'none',
});

const Field = ({ id, label, required, hint, error, children }) => (
  <div style={{ marginTop: 18 }}>
    <label htmlFor={id} style={{
      display: 'block', fontFamily: "'Inter Variable','Inter',sans-serif",
      fontWeight: 500, fontSize: 14, letterSpacing: '0.01em',
      color: '#FAF9F6', marginBottom: 8,
    }}>
      {label}
      {required && <span style={{ color: '#ADCBF8', marginLeft: 4 }} aria-hidden="true">*</span>}
      {hint && <span style={{ color: '#9A9C9F', marginLeft: 8, fontWeight: 400, fontSize: 12 }}>{hint}</span>}
    </label>
    {children}
    {error && (
      <p id={`${id}-err`} role="alert" style={{ marginTop: 6, fontFamily: "'Inter Variable','Inter',sans-serif", fontSize: 12, color: '#ADCBF8' }}>
        {error}
      </p>
    )}
  </div>
);

export default MasterclassForm;
