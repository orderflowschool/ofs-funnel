import React, { useEffect, useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import useReveal from '../hooks/useReveal';
import { trackSectionView } from '../utils/analytics';

/* Booked-call confirmation page. The conversion already happened — the only job
   here is to MAXIMIZE SHOW-UP RATE via two tiny commitments (reply YES + add to
   calendar), then reward the commitment with useful material sent by email.
   Short, calm, no sales copy, no homework. */

/* ── Page configuration ─────────────────────────────────────
   Pre-call video is intentionally OFF. Flip showPreCallVideo to true and set the
   url/poster/title to reintroduce a 60–90s pre-call video — it renders between
   the hero commitment actions and "what we sent you", and nothing else changes.
   When false, no video block (and no empty frame) is rendered at all. */
const showPreCallVideo = false;
const preCallVideoUrl = '';
const preCallVideoPoster = '';
const preCallVideoTitle = 'A minute from Edgar before we speak';

/* Kept in sync with the actual confirmation email so the inbox hint matches. */
const confirmationEmailSearchText = 'Order Flow School';

const STEPS = [
  ['01', 'Check your email', 'Your meeting confirmation is already on its way.'],
  ['02', 'Reply “YES”', 'A quick reply confirms that you’re coming.'],
  ['03', 'Add it to your calendar', 'Protect the time now so nothing else gets booked over it.'],
];

const RESOURCES = [
  {
    k: '01 / Quickstart',
    t: 'OFS Order Flow Quickstart',
    d: 'Newer to order flow? Start here for the core language and concepts we use inside OFS.',
    type: 'PDF guide',
  },
  {
    k: '02 / Trade breakdown',
    t: 'Inside the decision process behind a $6,000 trade.',
    d: 'See how context, participation and reaction shaped the decision while the market was still moving.',
    type: 'YouTube breakdown',
  },
];

const PROMPTS = [
  ['Your setup', 'What were you looking for?'],
  ['Your decision', 'Why did you take it, pass on it or hesitate?'],
  ['Your question', 'What do you wish you understood better?'],
];

const RECAP = ['Email', 'Yes', 'Calendar', 'One trade'];

const Check = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const PostBooking = () => {
  const scope = useReveal();
  const [barUp, setBarUp] = useState(false);

  useEffect(() => {
    document.title = 'Confirmed | Order Flow School';
    window.scrollTo(0, 0);
    trackSectionView('booking_confirmation_view');

    // Mobile reminder: appears after the hero scrolls away, hides at the final section.
    const heroEnd = document.getElementById('pb-hero-end');
    const final = document.getElementById('pb-final');
    let past = false;
    let atFinal = false;
    const sync = () => setBarUp(past && !atFinal);
    const heroIO = heroEnd && new IntersectionObserver(
      ([e]) => { past = !e.isIntersecting && e.boundingClientRect.top < 0; sync(); },
      { threshold: 0 }
    );
    const finalIO = final && new IntersectionObserver(
      ([e]) => { atFinal = e.isIntersecting; sync(); },
      { threshold: 0.1 }
    );
    if (heroIO) heroIO.observe(heroEnd);
    if (finalIO) finalIO.observe(final);
    return () => { if (heroIO) heroIO.disconnect(); if (finalIO) finalIO.disconnect(); };
  }, []);

  return (
    <div className="ofs-has-mobilebar" style={{ background: '#070808', minHeight: '100vh' }}>
      <Header ctaLabel={null} />

      <main ref={scope}>
        {/* ── 01 · Confirmation + immediate action ─────────── */}
        <section className="ofs-section t-dark" style={{ paddingTop: 'calc(var(--nav-h) + 72px)', paddingBottom: 'clamp(36px,4.5vw,64px)' }} aria-labelledby="pb-h">
          <div className="ofs-wrap">
            <p className="ofs-label reveal" style={{ display: 'inline-flex', alignItems: 'center', gap: 9 }}>
              <span aria-hidden="true" style={{ width: 5, height: 5, borderRadius: 999, background: 'var(--accent)', display: 'inline-block' }} />
              Confirmed
            </p>

            <h1 id="pb-h" className="reveal" style={{ marginTop: 20, maxWidth: '14ch', fontSize: 'clamp(32px,3.4vw + 1rem,64px)' }}>
              You’re <span className="ofs-em">booked</span>.
            </h1>

            <p className="reveal" style={{ marginTop: 20, fontSize: 'clamp(20px,1.3vw + 1rem,28px)', color: 'var(--ink)', fontWeight: 600, letterSpacing: '-.01em' }}>
              Check your inbox now.
            </p>
            <p className="ofs-lead reveal" style={{ marginTop: 12, maxWidth: '44ch' }}>
              Reply <span className="ofs-em" style={{ fontWeight: 700 }}>YES</span> to confirm
              you’re coming, then add the meeting to your calendar.
            </p>

            <ul className="ofs-steps reveal" style={{ marginTop: 'clamp(30px,3.4vw,44px)', maxWidth: 560 }}>
              {STEPS.map(([n, t, d]) => (
                <li key={n}>
                  <span className="ofs-step-n">{n}</span>
                  <span>
                    <span className="ofs-step-t" style={{ display: 'block' }}>{t}</span>
                    <span className="ofs-step-d" style={{ display: 'block' }}>{d}</span>
                  </span>
                </li>
              ))}
            </ul>

            <p className="ofs-fine reveal" style={{ marginTop: 16 }}>Takes less than a minute.</p>

            <p className="ofs-email-hint reveal">
              Can’t see it? Check Promotions / Spam and search <strong>“{confirmationEmailSearchText}”</strong>.
            </p>
          </div>
          <div id="pb-hero-end" aria-hidden="true" style={{ height: 1 }} />
        </section>

        {/* ── Pre-call video (config-gated; off for now) ───── */}
        {showPreCallVideo && preCallVideoUrl && (
          <section className="ofs-section t-light ofs-section--tight" aria-labelledby="pbv-h">
            <div className="ofs-wrap ofs-wrap--narrow" style={{ textAlign: 'center' }}>
              <p className="ofs-label reveal">Watch first</p>
              <h2 id="pbv-h" className="reveal" style={{ marginTop: 16 }}>{preCallVideoTitle}</h2>
              <div className="reveal ofs-video-frame" style={{ marginTop: 32 }}>
                <iframe
                  src={preCallVideoUrl}
                  title={preCallVideoTitle}
                  poster={preCallVideoPoster || undefined}
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                  referrerPolicy="origin" loading="lazy" allowFullScreen
                />
              </div>
            </div>
          </section>
        )}

        {/* ── 02 · What we sent you ────────────────────────── */}
        <section className="ofs-section t-light" aria-labelledby="pbsent-h">
          <div className="ofs-wrap">
            <div style={{ maxWidth: '52ch' }}>
              <p className="ofs-label reveal">In your email</p>
              <h2 id="pbsent-h" className="reveal" style={{ marginTop: 16 }}>
                Two things for you <span className="ofs-em">before we speak</span>.
              </h2>
              <p className="ofs-lead reveal" style={{ marginTop: 18 }}>
                Neither is required. They’re there if you want to get familiar with
                how I teach and think before the call.
              </p>
            </div>

            <div className="ofs-res-grid reveal">
              {RESOURCES.map((r) => (
                <article key={r.t} className="ofs-res-card">
                  <p className="ofs-res-k">{r.k}</p>
                  <h3 className="ofs-res-t">{r.t}</h3>
                  <p className="ofs-res-d">{r.d}</p>
                  <div className="ofs-res-meta">
                    <span className="ofs-res-type">{r.type}</span>
                    <span className="ofs-res-sent">Sent to your email</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── 03 · One thing to bring ──────────────────────── */}
        <section className="ofs-section t-dark" aria-labelledby="pbbring-h">
          <div className="ofs-wrap">
            <div style={{ maxWidth: '52ch' }}>
              <p className="ofs-label reveal">Before we speak</p>
              <h2 id="pbbring-h" className="reveal" style={{ marginTop: 16 }}>
                Bring <span className="ofs-em">one real trade</span>.
              </h2>
              <p className="ofs-lead reveal" style={{ marginTop: 18 }}>
                Winning, losing, missed or forced. Bring something that actually
                represents how you trade.
              </p>
            </div>

            <ul className="ofs-prep-grid reveal">
              {PROMPTS.map(([k, q]) => (
                <li key={k} className="ofs-prep-item">
                  <p className="ofs-prep-k">{k}</p>
                  <p className="ofs-prep-q">{q}</p>
                </li>
              ))}
            </ul>

            <div className="reveal" style={{ marginTop: 'clamp(34px,4vw,54px)', maxWidth: '48ch' }}>
              <p style={{ fontSize: 'clamp(21px,1.4vw + 1rem,30px)', color: 'var(--ink)', letterSpacing: '-.01em', lineHeight: 1.2 }}>
                Don’t bring me the perfect screenshot.
              </p>
              <p className="ofs-lead" style={{ marginTop: 10 }}>Bring me something real.</p>
              <p className="ofs-fine" style={{ marginTop: 18, maxWidth: '46ch' }}>
                We’ll use it to understand how you currently make decisions and
                whether OFS can meaningfully help.
              </p>
            </div>
          </div>
        </section>

        {/* ── 04 · Final confirmation ──────────────────────── */}
        <section id="pb-final" className="ofs-section t-blue" aria-labelledby="pbset-h">
          <div className="ofs-wrap" style={{ maxWidth: 820 }}>
            <p className="ofs-label reveal">You’re all set</p>
            <h2 id="pbset-h" className="reveal" style={{ marginTop: 16 }}>
              See you <span className="ofs-em">on the call</span>.
            </h2>
            <p className="ofs-lead reveal" style={{ marginTop: 18, maxWidth: '52ch' }}>
              Check your email, reply <strong>YES</strong>, add the meeting to your
              calendar and bring one real trade.
            </p>

            <ul className="ofs-recap reveal">
              {RECAP.map((x) => (
                <li key={x}><span className="ofs-recap-ic"><Check /></span>{x}</li>
              ))}
            </ul>

            <div className="reveal" style={{ marginTop: 'clamp(34px,4vw,52px)', maxWidth: '48ch' }}>
              <p className="ofs-label" style={{ color: 'var(--muted)' }}>Something changed?</p>
              <p className="ofs-lead" style={{ marginTop: 10 }}>
                Use the reschedule link in your confirmation email to choose another time.
              </p>
              <p className="ofs-fine" style={{ marginTop: 10 }}>
                Please reschedule instead of missing the meeting.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Mobile reminder — informational, not a fake button (no reliable inbox URL). */}
      <div className={`ofs-emailbar md:hidden${barUp ? ' is-up' : ''}`} aria-hidden={!barUp}>
        <p className="ofs-emailbar-t">✉ Check your email</p>
        <p className="ofs-emailbar-s">Reply “YES” + add it to your calendar</p>
      </div>
    </div>
  );
};

export default PostBooking;
