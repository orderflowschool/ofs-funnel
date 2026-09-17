import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import StepIndicator from '../components/application/StepIndicator';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import {
  Step1Details,
  Step2Trading,
  Step3Commitment,
  Step4Fit,
} from '../components/application/FormSteps';
import { isEnglishPrimaryCountry } from '../data/countries';
import { needsInvestmentRevalidation, passesCoreQualification, REVALIDATION } from '../lib/qualification';
import {
  trackApplicationStart, trackApplicationStep, trackFormSubmission,
  trackQualifiedLead, trackNonQualifiedLead,
} from '../utils/analytics';

const API_URL = process.env.REACT_APP_BACKEND_URL;
const DRAFT_KEY = 'ofs.application.draft.v1';
const TOTAL = 4;

/* Local preview mode: on localhost the real admissions backend isn't reachable,
   so the qualified/non-qualified routing is simulated client-side from the same
   rules the backend mirrors. This lets the frontend paths (/success and
   /not-ready-yet) be tested without a server. It NEVER runs on the live domain,
   where the backend remains the single source of truth. */
const IS_PREVIEW =
  typeof window !== 'undefined' &&
  /^(localhost|127\.0\.0\.1|\[::1\])$/.test(window.location.hostname);

const simulateQualified = (data) =>
  passesCoreQualification(data) &&
  data.callWillingness === 'Yes' &&
  data.speaksEnglish !== 'No' &&
  !(needsInvestmentRevalidation(data) && data.investmentRevalidation === REVALIDATION.NO);

const EMPTY = {
  firstName: '', lastName: '', email: '', phone: '', instagram: '',
  country: '', speaksEnglish: '', tradingExperience: '',
  tradingAssets: [], futuresExperience: '', biggestStruggle: [],
  consistencyBlocks: '', seriousness: '', whyOFS: '', readiness: '',
  investment: '', callWillingness: '', investmentRevalidation: '',
};

const loadDraft = () => {
  try {
    const raw = window.localStorage.getItem(DRAFT_KEY);
    return raw ? { ...EMPTY, ...JSON.parse(raw) } : EMPTY;
  } catch { return EMPTY; }
};

const WHAT_HAPPENS = [
  ['01', 'Edgar reads your answers himself. This is not an automated filter.'],
  ['02', 'You hear back within 24–48 hours either way.'],
  ['03', 'If it looks like a fit, you are invited to a short conversation about your trading.'],
  ['04', 'If the timing is wrong, you are pointed to the part of OFS that fits where you are now.'],
];

const Application = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(loadDraft);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const contactSaved = useRef(false);
  const topRef = useRef(null);

  useEffect(() => { document.title = 'Apply | Order Flow School'; }, []);

  // Persist the draft — a half-finished application that survives a refresh is
  // an application that still gets submitted.
  useEffect(() => {
    try { window.localStorage.setItem(DRAFT_KEY, JSON.stringify(formData)); } catch { /* private mode */ }
  }, [formData]);

  const updateFormData = (updates) => {
    setFormData((prev) => ({ ...prev, ...updates }));
    setErrors((prev) => {
      const next = { ...prev };
      Object.keys(updates).forEach((k) => delete next[k]);
      return next;
    });
  };

  const validateStep = (step) => {
    const e = {};
    if (step === 1) {
      if (!formData.firstName?.trim()) e.firstName = 'First name is required';
      if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Enter a valid email address';
      if (!formData.phone?.trim()) e.phone = 'Phone is required';
      if (!formData.country) e.country = 'Select your country';
      if (formData.country && !isEnglishPrimaryCountry(formData.country) && !formData.speaksEnglish) e.speaksEnglish = 'Please choose one';
    }
    if (step === 2) {
      if (!formData.tradingExperience) e.tradingExperience = 'Select how long you have been trading';
      if (!formData.biggestStruggle?.length) e.biggestStruggle = 'Select at least one';
    }
    if (step === 3) {
      if (!formData.seriousness) e.seriousness = 'Please choose one';
      if (!formData.readiness) e.readiness = 'Please choose one';
    }
    if (step === 4) {
      if (!formData.investment) e.investment = 'Please choose one';
      if (!formData.callWillingness) e.callWillingness = 'Please choose one';
      if (needsInvestmentRevalidation(formData) && !formData.investmentRevalidation) {
        e.investmentRevalidation = 'Please choose one';
      }
    }
    setErrors(e);
    if (Object.keys(e).length) {
      const first = document.querySelector('[role="alert"]');
      first?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return Object.keys(e).length === 0;
  };

  const savePartialContact = async () => {
    if (contactSaved.current) return;
    contactSaved.current = true;
    if (IS_PREVIEW) return;   // no backend on localhost
    try {
      await fetch(`${API_URL}/api/applications/partial`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName, lastName: formData.lastName,
          email: formData.email, phone: formData.phone, instagram: formData.instagram,
        }),
      });
    } catch { /* non-blocking by design */ }
  };

  const goTo = (step) => {
    setCurrentStep(step);
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) return;
    if (currentStep === 1) { savePartialContact(); trackApplicationStart(); }
    trackApplicationStep(currentStep);
    goTo(currentStep + 1);
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;
    setIsSubmitting(true);
    setSubmitError('');

    // Local preview: simulate the routing without a backend.
    if (IS_PREVIEW) {
      trackFormSubmission();
      const qualified = simulateQualified(formData);
      try { window.localStorage.removeItem(DRAFT_KEY); } catch { /* ignore */ }
      if (qualified) {
        trackQualifiedLead();
        navigate('/success', { state: { firstName: formData.firstName, email: formData.email, preview: true } });
      } else {
        trackNonQualifiedLead();
        navigate('/not-ready-yet', { state: { preview: true } });
      }
      return;
    }

    try {
      trackFormSubmission();
      const resp = await fetch(`${API_URL}/api/applications`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await resp.json().catch(() => ({}));
      if (resp.status === 429 || resp.status === 409) {
        setSubmitError(result.detail || 'We could not submit this application.');
        setIsSubmitting(false);
        return;
      }
      if (!resp.ok) {
        setSubmitError('Something went wrong on our side. Please try again.');
        setIsSubmitting(false);
        return;
      }
      try { window.localStorage.removeItem(DRAFT_KEY); } catch { /* ignore */ }
      if (result.qualified) {
        trackQualifiedLead();
        navigate('/success', { state: { firstName: formData.firstName, email: formData.email } });
      } else {
        trackNonQualifiedLead();
        navigate('/not-ready-yet');
      }
    } catch {
      setSubmitError('Something went wrong. Please check your connection and try again.');
    }
    setIsSubmitting(false);
  };

  const stepProps = { formData, updateFormData, errors };
  const Step = [Step1Details, Step2Trading, Step3Commitment, Step4Fit][currentStep - 1];

  return (
    <div className="t-dark" style={{ background: '#070808', minHeight: '100vh' }}>
      <Header ctaLabel={null} />

      <main className="ofs-section t-dark" style={{ paddingTop: 'calc(var(--nav-h) + 44px)', paddingBottom: 'clamp(56px,7vw,96px)' }}>
        <div className="ofs-wrap" ref={topRef}>
          <button
            type="button"
            className="ofs-btn-text"
            style={{ color: 'var(--muted)', marginBottom: 24 }}
            onClick={() => (currentStep > 1 ? goTo(currentStep - 1) : navigate('/'))}
          >
            <ArrowLeft className="w-4 h-4" /> {currentStep > 1 ? 'Previous step' : 'Back to site'}
          </button>

          <h1 style={{ fontSize: 'clamp(28px,2.6vw + 1rem,48px)', maxWidth: '20ch' }}>
            Apply to work with <span className="ofs-em">Edgar</span>.
          </h1>
          <p className="ofs-lead" style={{ marginTop: 16, maxWidth: '54ch' }}>
            Four short steps, about three minutes. No payment at any point in
            this form — it's how Edgar works out whether the program fits where
            you actually are. Your progress saves as you go.
          </p>

          <div className="ofs-form-grid" style={{ marginTop: 'clamp(32px,4vw,52px)' }}>
            <div className="ofs-card ofs-form-card">
              <StepIndicator currentStep={currentStep} totalSteps={TOTAL} />

              {IS_PREVIEW && (
                <p className="ofs-fine" data-testid="preview-mode-note" style={{
                  marginTop: 18, padding: '10px 14px', borderRadius: 10,
                  border: '1px dashed var(--line-2)', color: 'var(--muted)',
                }}>
                  Preview mode — routing to “qualified” vs “not ready yet” is simulated
                  locally from your answers, so you can test both outcomes. The live
                  site uses the real admissions backend.
                </p>
              )}

              <div style={{ marginTop: 34 }} data-testid="application-form-container">
                <Step {...stepProps} />
              </div>

              {submitError && (
                <p className="ofs-error" role="alert" data-testid="submit-error-message" style={{ marginTop: 22 }}>
                  {submitError}
                </p>
              )}

              <div className="ofs-form-actions">
                {currentStep > 1 ? (
                  <button type="button" className="ofs-btn-text" data-testid="prev-step-button"
                          style={{ color: 'var(--body)' }} onClick={() => goTo(currentStep - 1)}>
                    <ArrowLeft className="w-4 h-4" /> Previous
                  </button>
                ) : <span />}

                {currentStep < TOTAL ? (
                  <button type="button" className="ofs-btn" data-testid="next-step-button" onClick={handleNext}>
                    Continue <span className="ofs-arrow" aria-hidden="true">&rarr;</span>
                  </button>
                ) : (
                  <button type="button" className="ofs-btn" data-testid="submit-application-button"
                          disabled={isSubmitting} onClick={handleSubmit}
                          style={isSubmitting ? { opacity: .6, cursor: 'not-allowed' } : undefined}>
                    {isSubmitting ? 'Sending…' : <>Submit my application <span className="ofs-arrow" aria-hidden="true">&rarr;</span></>}
                  </button>
                )}
              </div>
            </div>

            <aside className="ofs-card ofs-rail-card" aria-label="What happens next">
              <p className="ofs-label">What happens next</p>
              <ul className="ofs-rail-list">
                {WHAT_HAPPENS.map(([n, t]) => (
                  <li key={n}><span className="ofs-rail-num">{n}</span><span>{t}</span></li>
                ))}
              </ul>
              <p className="ofs-fine" style={{ marginTop: 22, paddingTop: 18, borderTop: '1px solid var(--line)' }}>
                Your answers are used to review your application and nothing
                else. We never sell or share them.
              </p>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Application;
