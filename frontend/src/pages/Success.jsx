import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { InlineWidget, useCalendlyEventListener } from 'react-calendly';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import useReveal from '../hooks/useReveal';
import { CALENDLY_URL } from '../config/offers';
import { trackBookingPageViewed, trackCalendlyBookingCompleted } from '../utils/analytics';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const ON_THE_CALL = [
  ['01', 'Where you actually are', 'What you trade, how you decide, and what keeps going wrong — in your words.'],
  ['02', 'Whether the framework fits', 'Edgar tells you honestly if the private program is the right next step, or if it is not.'],
  ['03', 'What happens after', 'If it is a fit, how the work would run for you specifically. No pressure either way.'],
];

const BRING = [
  'One recent session — a good one or a bad one, either is useful',
  'The setup you currently trade, in your own words',
  'The point where your decision process usually breaks down',
];

const Success = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const scope = useReveal();
  const firstName = location.state?.firstName || '';
  const email = location.state?.email || '';

  useEffect(() => {
    document.title = 'Your application | Order Flow School';
    trackBookingPageViewed();
    window.scrollTo(0, 0);
  }, []);

  useCalendlyEventListener({
    onEventScheduled: () => {
      trackCalendlyBookingCompleted();
      if (email) {
        axios.post(`${API_URL}/api/applications/booking-confirmed`, { email }).catch(() => {});
      }
      navigate('/booking-confirmed');
    },
  });

  return (
    <div style={{ background: '#070808', minHeight: '100vh' }}>
      <Header ctaLabel={null} />

      <main ref={scope}>
        {/* ── Verdict ───────────────────────────────────── */}
        <section className="ofs-section t-dark" style={{ paddingTop: 'calc(var(--nav-h) + 72px)' }} aria-labelledby="succ-h">
          <div className="ofs-wrap">
            <p className="ofs-label reveal" style={{ display: 'inline-flex', alignItems: 'center', gap: 9 }}>
              <span aria-hidden="true" style={{ width: 5, height: 5, borderRadius: 999, background: 'var(--accent)', display: 'inline-block' }} />
              Application reviewed
            </p>

            <h1 id="succ-h" className="reveal" style={{ marginTop: 20, maxWidth: '17ch', fontSize: 'clamp(30px,3.2vw + 1rem,60px)' }}>
              {firstName ? `${firstName}, your application ` : 'Your application '}
              looks like <span className="ofs-em">a potential fit</span>.
            </h1>

            <p className="ofs-lead reveal" style={{ marginTop: 22, maxWidth: '56ch' }}>
              The next step is a short conversation with Edgar to go deeper on
              your trading and work out together whether the private program
              makes sense for where you are. Pick a time below.
            </p>
          </div>
        </section>

        {/* ── The calendar ──────────────────────────────── */}
        <section id="choose-a-time" className="ofs-section t-light" aria-labelledby="cal-h">
          <div className="ofs-wrap">
            <div style={{ maxWidth: '46ch' }}>
              <p className="ofs-label reveal">Next step</p>
              <h2 id="cal-h" className="reveal" style={{ marginTop: 16 }}>Choose a time.</h2>
              <p className="ofs-lead reveal" style={{ marginTop: 18 }}>
                Around 30 minutes. Your confirmation and reminders arrive by email
                as soon as the time is booked.
              </p>
            </div>

            <div className="reveal ofs-commit ofs-commit--hard" style={{ marginTop: 'clamp(22px,2.6vw,32px)' }} role="note" aria-label="Booking commitment">
              <span className="ofs-commit-icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </span>
              <div>
                <p className="ofs-commit-k">Read this before you pick a time</p>
                <p className="ofs-commit-b">
                  This call is booked <strong>personally with Edgar</strong>, and the
                  number of slots is limited. Picking a time is you giving your word
                  that you will be there.
                </p>
                <p className="ofs-commit-hard-line">
                  By booking, I accept that if I miss this call or cancel at the last
                  minute, that is my one chance — gone. I will not be able to apply to
                  Order Flow School, book with Edgar, or work with him ever again.
                </p>
                <p className="ofs-commit-keep">Only book a time you know you will keep.</p>
              </div>
            </div>

            <div className="reveal ofs-cal" style={{ marginTop: 'clamp(22px,2.6vw,32px)' }}>
              <InlineWidget
                url={CALENDLY_URL}
                styles={{ height: '760px', width: '100%' }}
                pageSettings={{
                  backgroundColor: 'ffffff',
                  primaryColor: '1159c5',
                  textColor: '070808',
                  hideEventTypeDetails: false,
                  hideLandingPageDetails: false,
                  hideGdprBanner: true,
                }}
                prefill={{ email, name: firstName }}
              />
            </div>

            <div className="reveal" style={{ marginTop: 'clamp(32px,4vw,52px)', maxWidth: 760 }}>
              <p className="ofs-label ofs-label--accent">On the call</p>
              <ul className="ofs-steps" style={{ marginTop: 12 }}>
                {ON_THE_CALL.map(([n, t, d]) => (
                  <li key={n}>
                    <span className="ofs-step-n">{n}</span>
                    <span>
                      <span className="ofs-step-t" style={{ display: 'block' }}>{t}</span>
                      <span className="ofs-step-d" style={{ display: 'block' }}>{d}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Prep ──────────────────────────────────────── */}
        <section className="ofs-section t-dark" aria-labelledby="prep-h">
          <div className="ofs-wrap ofs-split">
            <div className="ofs-split-aside">
              <p className="ofs-label reveal">Before we speak</p>
              <h2 id="prep-h" className="reveal" style={{ marginTop: 16 }}>
                Come with something <span className="ofs-em">specific</span>.
              </h2>
              <p className="ofs-lead reveal" style={{ marginTop: 18 }}>
                This is a conversation about your trading, not a pitch. The more
                concrete you can be, the more useful it is for both of us.
              </p>
            </div>

            <div>
              <ul className="ofs-fit-list reveal" style={{ marginTop: 0 }}>
                {BRING.map((t) => (
                  <li key={t} className="ofs-fit-row ofs-fit-row--yes">
                    <span className="ofs-fit-mark" aria-hidden="true">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    </span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
              <p className="ofs-fine reveal" style={{ marginTop: 24, maxWidth: '56ch' }}>
                If something changes, reschedule from your confirmation email
                rather than not showing up. It takes ten seconds and keeps the
                door open.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Success;
