import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { MASTERCLASS, formatEventDateTime } from '../config/masterclass';

const MasterclassConfirmed = () => {
  useEffect(() => {
    document.title = 'Your spot is reserved | Order Flow Masterclass';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const eventDT = formatEventDateTime();

  return (
    <div className="min-h-screen" style={{ background: '#070808', color: '#FAF9F6', fontFamily: "'Inter Variable','Inter',sans-serif" }} data-testid="mc-confirmed-page">
      <Header />

      <main style={{ paddingTop: 120, paddingBottom: 80 }}>
        <div className="max-w-2xl mx-auto px-5 text-center">
          <div style={{
            width: 68, height: 68, borderRadius: 9999, margin: '0 auto 24px',
            background: 'rgba(173,203,248,0.08)', border: '1px solid rgba(173,203,248,0.35)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ADCBF8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <span style={{
            fontFamily: "'Inter Variable','Inter',sans-serif", fontWeight: 600, fontSize: 10,
            textTransform: 'uppercase', letterSpacing: '0.18em', color: '#ADCBF8',
          }}>Registration Confirmed</span>

          <h1 style={{
            fontFamily: "'Geist Variable','Geist',sans-serif", fontWeight: 800,
            fontSize: 'clamp(34px,5.5vw,52px)', color: '#FAF9F6',
            letterSpacing: '-0.02em', lineHeight: 1.05,
            marginTop: 14, marginBottom: 18,
          }} data-testid="mc-confirmed-headline">
            Your spot is reserved.
          </h1>

          <p style={{ fontFamily: "'Inter Variable','Inter',sans-serif", fontSize: 18, lineHeight: 1.6, color: '#C6C8CB', maxWidth: 520, margin: '0 auto' }}>
            Check your inbox for your masterclass access details and next steps.
          </p>

          {eventDT && (
            <div style={{
              marginTop: 36, padding: '20px 24px',
              background: '#111214', border: '1px solid rgba(173,203,248,0.25)',
              borderLeft: '3px solid #ADCBF8', borderRadius: 4,
              textAlign: 'left', maxWidth: 460, margin: '36px auto 0',
            }}>
              <p style={{ fontFamily: "'Inter Variable','Inter',sans-serif", fontSize: 10, color: '#ADCBF8', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600, margin: 0 }}>
                Save the date
              </p>
              <p style={{ fontFamily: "'Geist Variable','Geist',sans-serif", fontWeight: 700, fontSize: 22, color: '#FAF9F6', letterSpacing: '-0.01em', marginTop: 8, marginBottom: 0 }}>
                {eventDT}
              </p>
            </div>
          )}

          {/* Next steps */}
          <div style={{ marginTop: 48, textAlign: 'left', maxWidth: 520, marginLeft: 'auto', marginRight: 'auto' }}>
            <h2 style={{ fontFamily: "'Geist Variable','Geist',sans-serif", fontWeight: 700, fontSize: 20, color: '#FAF9F6', letterSpacing: '-0.01em', textAlign: 'center', marginBottom: 24 }}>
              What happens next
            </h2>
            <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 16 }}>
              {[
                'Check the email address you used to register.',
                'Save the masterclass date when the event details arrive.',
                'Watch for reminder emails before the session begins.',
              ].map((step, i) => (
                <li key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <span style={{
                    width: 28, height: 28, borderRadius: 9999, flexShrink: 0,
                    background: '#ADCBF8', color: '#07142B',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: "'Geist Variable','Geist',sans-serif", fontWeight: 800, fontSize: 14, lineHeight: 1,
                  }}>{i + 1}</span>
                  <span style={{ fontFamily: "'Inter Variable','Inter',sans-serif", fontSize: 15, color: '#FAF9F6', lineHeight: 1.6, paddingTop: 4 }}>
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          {MASTERCLASS.calendarLink && (
            <a
              href={MASTERCLASS.calendarLink}
              target="_blank" rel="noopener noreferrer"
              data-testid="mc-add-to-calendar"
              style={{
                display: 'inline-block', marginTop: 36,
                border: '1.5px solid rgba(173,203,248,0.6)',
                borderRadius: 9999, padding: '14px 32px',
                background: 'transparent', color: '#ADCBF8',
                fontFamily: "'Inter Variable','Inter',sans-serif", fontWeight: 600,
                fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              Add to calendar
            </a>
          )}

          <p style={{ marginTop: 44, fontFamily: "'Inter Variable','Inter',sans-serif", fontSize: 13, color: '#9A9C9F' }}>
            Didn't receive the email? Check your spam or contact us at{' '}
            <a href={`mailto:${MASTERCLASS.supportEmail}`} style={{ color: '#ADCBF8', textDecoration: 'none' }}>
              {MASTERCLASS.supportEmail}
            </a>.
          </p>

          <div style={{ marginTop: 40 }}>
            <Link
              to="/"
              style={{
                fontFamily: "'Inter Variable','Inter',sans-serif", fontSize: 12, letterSpacing: '0.14em',
                textTransform: 'uppercase', color: '#9A9C9F', textDecoration: 'none',
              }}
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MasterclassConfirmed;
