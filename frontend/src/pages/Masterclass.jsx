import React, { useEffect } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import MobileCTA from '../components/layout/MobileCTA';
import MasterclassForm from '../components/masterclass/MasterclassForm';
import { MASTERCLASS, eventDetailChips } from '../config/masterclass';
import { trackCTAClick, trackMasterclassPageView } from '../utils/analytics';

const HERO_IMG = 'https://customer-assets.emergentagent.com/job_13689160-8bd6-425f-95e1-31c38fa6a6cc/artifacts/xm3yxqlp_ChatGPT%20Image%20May%2023%2C%202026%2C%2008_14_37%20PM.png';

const secureMySpotScroll = (location) => () => {
  trackCTAClick(`MC CTA · ${location}`);
  const target = document.getElementById('masterclass-registration');
  if (!target) return;
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  target.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' });
};

const Masterclass = () => {
  useEffect(() => {
    document.title = 'Order Flow Masterclass | Order Flow School';
    trackMasterclassPageView();
  }, []);

  const chips = eventDetailChips();
  const statusPill = MASTERCLASS.registrationOpen
    ? (MASTERCLASS.isLive ? 'LIVE ORDER FLOW MASTERCLASS · REGISTRATION OPEN' : 'ORDER FLOW MASTERCLASS · REGISTRATION OPEN')
    : (MASTERCLASS.isLive ? 'LIVE ORDER FLOW MASTERCLASS' : 'ORDER FLOW MASTERCLASS');

  return (
    <div className="min-h-screen" style={{ background: '#070808', color: '#FAF9F6', fontFamily: "'Inter Variable','Inter',sans-serif" }} data-testid="masterclass-home">
      <Header ctaLabel="Secure My Spot" onCta={secureMySpotScroll('nav')} />

      <main className="pb-24 md:pb-0">
        {/* ══════════════ 1. HERO ══════════════ */}
        <section className="relative flex items-center justify-center" style={{ minHeight: '100vh' }} aria-labelledby="hero-h1">
          <img
            src={HERO_IMG} alt="" aria-hidden="true"
            className="absolute inset-0 w-full h-full"
            style={{ objectFit: 'cover', objectPosition: 'center 30%', zIndex: 0 }}
          />
          <div className="absolute inset-0" style={{
            zIndex: 1,
            background: 'linear-gradient(180deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.6) 45%, rgba(0,0,0,0.95) 100%)',
          }} />

          <div className="relative w-full px-5 text-center" style={{ zIndex: 2, paddingTop: 132, paddingBottom: 72 }}>
            <div className="flex justify-center mb-8">
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '8px 18px', height: 34, borderRadius: 9999,
                background: 'rgba(7,8,8,0.85)',
                border: '1px solid rgba(173,203,248,0.55)',
                fontFamily: "'Inter Variable','Inter',sans-serif", fontWeight: 600, fontSize: 10,
                letterSpacing: '0.22em', textTransform: 'uppercase', color: '#ADCBF8',
              }} data-testid="hero-status-pill">
                <span style={{
                  width: 7, height: 7, borderRadius: 9999, background: '#ADCBF8',
                  boxShadow: '0 0 10px rgba(173,203,248,0.9)',
                }} />
                {statusPill}
              </span>
            </div>

            <h1 id="hero-h1" style={{
              fontFamily: "'Geist Variable','Geist',sans-serif", fontWeight: 800,
              fontSize: 'clamp(36px,6.4vw,68px)', color: '#FAF9F6',
              letterSpacing: '-0.02em', lineHeight: 1.03,
              maxWidth: 940, margin: '0 auto',
            }} data-testid="hero-headline">
              <span className="block">STOP TRADING BLIND.</span>
              <span className="block">LEARN TO READ WHAT</span>
              <span className="block">CANDLESTICKS HIDE.</span>
            </h1>

            <div className="flex justify-center my-6" aria-hidden="true">
              <div style={{ width: 80, height: 1, background: '#ADCBF8', filter: 'drop-shadow(0 0 6px rgba(173,203,248,0.7))' }} />
            </div>

            <p style={{
              fontFamily: "'Inter Variable','Inter',sans-serif", fontWeight: 400, fontSize: 18,
              lineHeight: 1.6, color: '#FAF9F6', maxWidth: 680, margin: '0 auto',
            }}>
              Join Edgar for an Order Flow Masterclass and learn how to read the auction behind price — so you can understand why a setup is working, when it is failing, and where buyers and sellers are actually taking control.
            </p>

            {/* Event details row */}
            <div style={{
              display: 'flex', justifyContent: 'center', flexWrap: 'wrap',
              gap: 14, marginTop: 32,
            }} aria-label="Masterclass details">
              {chips.length > 0 ? chips.map((chip, i) => (
                <span key={i} style={{
                  fontFamily: "'Inter Variable','Inter',sans-serif", fontWeight: 600, fontSize: 10,
                  letterSpacing: '0.18em', color: '#C6C8CB',
                  padding: '6px 14px', border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 2,
                }} data-testid={`hero-detail-${i}`}>
                  {chip}
                </span>
              )) : (
                <span style={{
                  fontFamily: "'Inter Variable','Inter',sans-serif", fontWeight: 500, fontSize: 13, color: '#9A9C9F',
                }} data-testid="hero-fallback-detail">
                  {MASTERCLASS.fallbackDateLabel}
                </span>
              )}
            </div>

            <div style={{ marginTop: 40 }}>
              <button
                onClick={secureMySpotScroll('hero')}
                data-testid="hero-cta"
                style={{
                  width: 'calc(100% - 32px)', maxWidth: 360, height: 58,
                  background: 'linear-gradient(135deg,#ADCBF8 0%,#ADCBF8 45%,#ADCBF8 100%)',
                  color: '#07142B', fontFamily: "'Inter Variable','Inter',sans-serif",
                  fontWeight: 700, fontSize: 14, letterSpacing: '0.16em',
                  textTransform: 'uppercase', borderRadius: 9999, border: 'none',
                  cursor: 'pointer', boxShadow: '0 6px 28px rgba(173,203,248,0.45)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(1.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.filter = ''; }}
              >
                Secure My Spot
              </button>
              <p style={{ marginTop: 14, fontFamily: "'Inter Variable','Inter',sans-serif", fontSize: 12, color: '#9A9C9F', letterSpacing: '0.02em', maxWidth: 460, marginLeft: 'auto', marginRight: 'auto' }}>
                {MASTERCLASS.isFree
                  ? 'Free registration. Access details and reminders will be sent by email.'
                  : 'Reserve your place now. Access details and reminders will be sent by email.'}
              </p>
            </div>
          </div>
        </section>

        <hr style={{ border: 0, height: 1, background: 'rgba(255,255,255,0.06)' }} />

        {/* ══════════════ 2. PARADIGM SHIFT ══════════════ */}
        <Section eyebrow="THE MISSING LAYER" testid="paradigm-section">
          <SectionHeadline>
            THE CHART SHOWS YOU WHAT HAPPENED.
            <br /><span style={{ color: '#ADCBF8' }}>ORDER FLOW SHOWS YOU WHY.</span>
          </SectionHeadline>
          <SectionLead>
            Most traders are trying to make decisions from the surface of the market. They can see the candle, the pattern, and the level — but not the transactions, aggression, absorption, acceptance, or rejection happening underneath them. This masterclass introduces the layer that turns isolated chart patterns into readable market context.
          </SectionLead>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 20, marginTop: 56, maxWidth: 1040, margin: '56px auto 0',
          }}>
            {[
              { title: 'Read the real auction', body: 'Understand how buyers and sellers are interacting in real time instead of relying only on completed candles.' },
              { title: 'See the context candles hide', body: 'Learn why two identical-looking candles can represent completely different market conditions.' },
              { title: 'Build a confirmation process', body: 'Learn how to map the auction, read aggression, wait for reaction, and execute with clearer context.' },
            ].map((c, i) => (
              <div key={i} className="mc-card" style={{
                padding: 26, background: '#111214',
                border: '1px solid rgba(173,203,248,0.15)', borderTop: '2px solid #ADCBF8',
                borderRadius: 4, textAlign: 'left', height: '100%',
              }} data-testid={`paradigm-card-${i}`}>
                <h3 style={cardTitleStyle}>{c.title}</h3>
                <p style={cardBodyStyle}>{c.body}</p>
              </div>
            ))}
          </div>
        </Section>

        <hr style={{ border: 0, height: 1, background: 'rgba(255,255,255,0.06)' }} />

        {/* ══════════════ 3. CURRICULUM ══════════════ */}
        <Section eyebrow="INSIDE THE MASTERCLASS" bg="#0C0D0F" testid="curriculum-section">
          <SectionHeadline maxWidth={860}>
            WHAT YOU WILL LEARN TO SEE THAT MOST TRADERS NEVER LOOK AT
          </SectionHeadline>
          <SectionLead>
            This is not a collection of signals or another entry pattern. It is an introduction to the information behind the setups traders already use.
          </SectionLead>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 20, marginTop: 56, maxWidth: 1040, margin: '56px auto 0',
          }}>
            {[
              { n: '01', title: 'Why candlesticks leave traders blind', body: 'See what is compressed into every candle and why OHLC data alone cannot explain the auction taking place inside it.' },
              { n: '02', title: 'The three order-flow lenses', body: 'Understand the distinct roles of Footprint Charts, Volume Profile, and Heatmap — and how they work together rather than as isolated indicators.' },
              { n: '03', title: 'Strength, absorption, and trapped traders', body: 'Learn why aggressive buying is not automatically bullish, aggressive selling is not automatically bearish, and reaction matters more than activity alone.' },
              { n: '04', title: 'The OFS reading framework', body: null, framework: ['Map the Auction', 'Read Aggression', 'Wait for Reaction', 'Execute'] },
            ].map((m, i) => (
              <div key={i} style={{
                padding: 28, background: '#111214',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 4, textAlign: 'left',
              }} data-testid={`curriculum-module-${i}`}>
                <span style={{
                  fontFamily: "'Geist Variable','Geist',sans-serif", fontWeight: 800, fontSize: 12,
                  letterSpacing: '0.16em', color: '#ADCBF8',
                }}>MODULE {m.n}</span>
                <h3 style={{ ...cardTitleStyle, marginTop: 12, fontSize: 19 }}>{m.title}</h3>
                {m.body && <p style={cardBodyStyle}>{m.body}</p>}
                {m.framework && (
                  <ol style={{ listStyle: 'none', padding: 0, margin: '4px 0 0 0', display: 'grid', gap: 8 }}>
                    {m.framework.map((step, si) => (
                      <li key={step} style={{ display: 'flex', gap: 10, alignItems: 'center', fontFamily: "'Inter Variable','Inter',sans-serif", fontSize: 14, color: '#FAF9F6' }}>
                        <span aria-hidden="true" style={{ width: 6, height: 6, background: '#ADCBF8', borderRadius: 9999, flexShrink: 0 }} />
                        <span>{step}</span>
                        {si < m.framework.length - 1 && <span aria-hidden="true" style={{ marginLeft: 'auto', color: '#6E7276', fontSize: 12 }}>↓</span>}
                      </li>
                    ))}
                  </ol>
                )}
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <button
              onClick={secureMySpotScroll('post-curriculum')}
              data-testid="post-curriculum-cta"
              style={{
                background: 'linear-gradient(135deg,#ADCBF8 0%,#ADCBF8 45%,#ADCBF8 100%)',
                color: '#07142B', fontFamily: "'Inter Variable','Inter',sans-serif",
                fontWeight: 700, fontSize: 13, letterSpacing: '0.14em',
                textTransform: 'uppercase', borderRadius: 9999, border: 'none',
                cursor: 'pointer', padding: '16px 36px',
                boxShadow: '0 6px 28px rgba(173,203,248,0.35)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(1.1)'; }}
              onMouseLeave={e => { e.currentTarget.style.filter = ''; }}
            >
              Secure My Spot &rarr;
            </button>
          </div>
        </Section>

        <hr style={{ border: 0, height: 1, background: 'rgba(255,255,255,0.06)' }} />

        {/* ══════════════ 4. WHO THIS IS FOR ══════════════ */}
        <Section eyebrow="BUILT FOR SERIOUS TRADERS" testid="who-section">
          <SectionHeadline maxWidth={880}>
            YOU DO NOT NEED ANOTHER SETUP. <br /><span style={{ color: '#ADCBF8' }}>YOU NEED TO UNDERSTAND WHAT IS HAPPENING BEHIND IT.</span>
          </SectionHeadline>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 32, maxWidth: 780, margin: '48px auto 0' }}>
            <div style={{
              padding: '28px 32px', background: '#111214',
              border: '1px solid rgba(173,203,248,0.15)', borderLeft: '3px solid #ADCBF8',
              borderRadius: 4,
            }}>
              <p style={{ fontFamily: "'Inter Variable','Inter',sans-serif", fontWeight: 600, fontSize: 14, color: '#FAF9F6', margin: 0, marginBottom: 14 }}>
                This masterclass is designed for traders who:
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10 }}>
                {[
                  'Already understand basic technical analysis',
                  'Trade futures or are actively learning futures',
                  'Use price action, ICT, SMC, support and resistance, liquidity, or market structure',
                  'Frequently enter late or hesitate because they lack confirmation',
                  'See good-looking setups fail without understanding why',
                  'Want to make decisions using market context rather than isolated patterns',
                ].map((line, i) => (
                  <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontFamily: "'Inter Variable','Inter',sans-serif", fontSize: 15, color: '#C6C8CB', lineHeight: 1.6 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ADCBF8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: 4, flexShrink: 0 }} aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p style={{
              fontFamily: "'Geist Variable','Geist',sans-serif", fontWeight: 700, fontSize: 20,
              color: '#FAF9F6', letterSpacing: '-0.01em', textAlign: 'center', lineHeight: 1.35,
            }}>
              No signal service. No magic indicator. No guaranteed outcomes. <br />
              <span style={{ color: '#ADCBF8' }}>A documented framework for reading the market auction.</span>
            </p>
          </div>
        </Section>

        <hr style={{ border: 0, height: 1, background: 'rgba(255,255,255,0.06)' }} />

        {/* ══════════════ 5. INSTRUCTOR ══════════════ */}
        <Section eyebrow="YOUR INSTRUCTOR" bg="#0C0D0F" testid="instructor-section">
          <SectionHeadline maxWidth={840}>
            TAUGHT BY EDGAR, <span style={{ color: '#ADCBF8' }}>FOUNDER OF ORDER FLOW SCHOOL.</span>
          </SectionHeadline>
          <SectionLead>
            Edgar teaches futures traders how to interpret order flow, auction context, and real-time market behavior instead of depending on isolated patterns or signals. The goal of the masterclass is to help traders understand what price is communicating before they make an execution decision.
          </SectionLead>
          <p style={{
            marginTop: 32, textAlign: 'center',
            fontFamily: "'Geist Variable','Geist',sans-serif", fontWeight: 700, fontSize: 20,
            color: '#FAF9F6', letterSpacing: '-0.01em', lineHeight: 1.35,
          }}>
            Not signals. Not hype. <span style={{ color: '#ADCBF8' }}>Documented market reading.</span>
          </p>
        </Section>

        <hr style={{ border: 0, height: 1, background: 'rgba(255,255,255,0.06)' }} />

        {/* ══════════════ 6. REGISTRATION FORM ══════════════ */}
        <section id="masterclass-registration" style={{ background: '#070808', padding: '84px 20px' }} data-testid="registration-section">
          <div className="max-w-5xl mx-auto">
            <div className="text-center" style={{ marginBottom: 40 }}>
              <span style={eyebrowStyle}>Reserve Your Seat</span>
              <h2 style={headlineStyle(720)}>
                Secure Your Spot in the Order Flow Masterclass
              </h2>
              <p style={leadStyle}>
                Tell us where to send your access details and class reminders.
              </p>
              {chips.length > 0 && (
                <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 12, marginTop: 20 }}>
                  {chips.map((chip, i) => (
                    <span key={i} style={{
                      fontFamily: "'Inter Variable','Inter',sans-serif", fontWeight: 600, fontSize: 10,
                      letterSpacing: '0.18em', color: '#ADCBF8',
                      padding: '6px 14px', border: '1px solid rgba(173,203,248,0.35)',
                      background: 'rgba(173,203,248,0.05)', borderRadius: 2,
                    }}>
                      {chip}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <MasterclassForm />
          </div>
        </section>

        <hr style={{ border: 0, height: 1, background: 'rgba(255,255,255,0.06)' }} />

        {/* ══════════════ 7. FAQ ══════════════ */}
        <Section eyebrow="COMMON QUESTIONS" testid="faq-section">
          <SectionHeadline maxWidth={720}>
            A few things worth knowing before you register.
          </SectionHeadline>
          <div style={{ maxWidth: 780, margin: '40px auto 0', display: 'grid', gap: 16 }}>
            {[
              {
                q: 'Is the masterclass live?',
                a: MASTERCLASS.isLive
                  ? 'Yes — this is a live online session led by Edgar.'
                  : 'Details will be shared with your registration email.',
              },
              {
                q: 'Do I need previous order-flow experience?',
                a: 'No previous order-flow experience is required, but the class is especially valuable for traders who already understand basic charting or technical analysis.',
              },
              {
                q: 'Who is the masterclass for?',
                a: 'It is built primarily for futures traders who want more context behind price action, liquidity, market structure, and execution.',
              },
              {
                q: 'What happens after I register?',
                a: 'You will receive confirmation, access information, and class reminders by email.',
              },
              {
                q: 'Will this give me trade signals?',
                a: 'No. The class is educational and focuses on interpreting market behavior and auction context.',
              },
            ].map((item, i) => (
              <details key={i} style={{
                background: '#111214', border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 4, padding: '18px 22px',
              }} data-testid={`faq-item-${i}`}>
                <summary style={{
                  cursor: 'pointer', listStyle: 'none',
                  fontFamily: "'Geist Variable','Geist',sans-serif", fontWeight: 600, fontSize: 16,
                  color: '#FAF9F6', letterSpacing: '-0.01em',
                }}>
                  {item.q}
                </summary>
                <p style={{ marginTop: 12, marginBottom: 0, fontFamily: "'Inter Variable','Inter',sans-serif", fontSize: 14, lineHeight: 1.65, color: '#C6C8CB' }}>
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </Section>

        <hr style={{ border: 0, height: 1, background: 'rgba(255,255,255,0.06)' }} />

        {/* ══════════════ 8. FINAL CTA ══════════════ */}
        <section style={{ background: '#0C0D0F', padding: '64px 20px' }}>
          <div className="max-w-2xl mx-auto text-center">
            <p style={{
              fontFamily: "'Geist Variable','Geist',sans-serif", fontWeight: 700,
              fontSize: 'clamp(22px,3vw,28px)', color: '#FAF9F6',
              letterSpacing: '-0.01em', lineHeight: 1.3,
            }}>
              You do not need another indicator. <br />
              <span style={{ color: '#ADCBF8' }}>You need to understand what the market is telling you.</span>
            </p>
            <button
              onClick={secureMySpotScroll('final')}
              data-testid="final-cta"
              style={{
                marginTop: 32,
                background: 'linear-gradient(135deg,#ADCBF8 0%,#ADCBF8 45%,#ADCBF8 100%)',
                color: '#07142B', fontFamily: "'Inter Variable','Inter',sans-serif",
                fontWeight: 700, fontSize: 14, letterSpacing: '0.14em',
                textTransform: 'uppercase', borderRadius: 9999, border: 'none',
                cursor: 'pointer', padding: '16px 36px',
                boxShadow: '0 6px 28px rgba(173,203,248,0.35)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(1.1)'; }}
              onMouseLeave={e => { e.currentTarget.style.filter = ''; }}
            >
              Secure My Spot &rarr;
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

/* ─── Style helpers ─── */
const eyebrowStyle = {
  fontFamily: "'Inter Variable','Inter',sans-serif", fontWeight: 600, fontSize: 10,
  textTransform: 'uppercase', letterSpacing: '0.18em', color: '#ADCBF8',
};
const headlineStyle = (maxWidth = 780) => ({
  fontFamily: "'Geist Variable','Geist',sans-serif", fontWeight: 800,
  fontSize: 'clamp(30px,4.5vw,44px)', color: '#FAF9F6',
  letterSpacing: '-0.02em', margin: '16px auto 20px', maxWidth,
  lineHeight: 1.08, textTransform: 'none',
});
const leadStyle = {
  fontFamily: "'Inter Variable','Inter',sans-serif", fontSize: 17, lineHeight: 1.7,
  color: '#C6C8CB', maxWidth: 720, margin: '0 auto',
};
const cardTitleStyle = {
  fontFamily: "'Geist Variable','Geist',sans-serif", fontWeight: 700,
  fontSize: 17, color: '#FAF9F6', letterSpacing: '-0.01em',
  marginBottom: 10, textTransform: 'none',
};
const cardBodyStyle = {
  fontFamily: "'Inter Variable','Inter',sans-serif", fontSize: 14, color: '#C6C8CB', lineHeight: 1.65, margin: 0,
};

const Section = ({ eyebrow, bg = '#070808', children, testid }) => (
  <section style={{ background: bg, padding: '84px 20px' }} data-testid={testid}>
    <div className="max-w-5xl mx-auto text-center">
      {eyebrow && <span style={eyebrowStyle}>{eyebrow}</span>}
      {children}
    </div>
  </section>
);
const SectionHeadline = ({ children, maxWidth }) => <h2 style={headlineStyle(maxWidth)}>{children}</h2>;
const SectionLead = ({ children }) => <p style={leadStyle}>{children}</p>;

export default Masterclass;
