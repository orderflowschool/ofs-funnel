import React, { useEffect, useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import useReveal from '../hooks/useReveal';
import { OFS_LIVE } from '../config/offers';
import { trackCTAClick, trackVideoPlay } from '../utils/analytics';
import EmbeddedCheckout from '../components/shared/WhopCheckout';

/* Post-application page for applicants routed to OFS Live — a product they
   QUALIFIED for. Order: hero → live-room preview → member testimonials →
   checkout → what's included → the point of the room → FAQ. Every "Start my
   free trial" button scrolls to the checkout, and a sticky mobile button keeps
   it one tap away. */

const MICRO = OFS_LIVE.trialMicro;

/* Real clips from inside the live room (Bunny Stream). Click-to-load. */
const LIVE_CLIPS = [
  { id: 'r1', videoUrl: 'https://player.mediadelivery.net/embed/738150/fbe29aef-d026-41fc-aa9a-d986c64131e0', cap: 'A live session, as it happened.' },
  { id: 'r2', videoUrl: 'https://player.mediadelivery.net/embed/738150/61b0b2b3-612c-491d-b8d3-26c86241180f', cap: 'Reading context while the move develops.' },
  { id: 'r3', videoUrl: 'https://player.mediadelivery.net/embed/738150/bef09563-fc43-498b-a344-8f81700783dd', cap: 'Managing the decision in real time.' },
];

/* Unedited screenshots posted by members in the live room. Nothing fabricated;
   captions only label what the screenshot already shows. */
const LIVE_WINS = [
  {
    src: '/testimonials/live-mentor-transparency.png',
    alt: 'ronaldopekel — "this is what happens when there is a good mentor with full transparency", with a live footprint chart.',
    cap: 'ronaldopekel — “what happens when there’s a good mentor with full transparency.”',
  },
  {
    src: '/testimonials/live-robin-27r.png',
    alt: 'Robin W — 2.7R right off the 9:30 open.',
    cap: 'Robin W — 2.7R right off the 9:30 open.',
  },
  {
    src: '/testimonials/live-sakib-3r.png',
    alt: 'Sakib Hossain — a scalp using GEX and delta-profile confirmation, a 3R trade on a Lucid account.',
    cap: 'Sakib Hossain — a scalp on GEX + delta-profile confirmation (3R).',
  },
  {
    src: '/testimonials/live-amazing-trade.png',
    alt: 'ronaldopekel — "amazing trade", a live footprint short.',
    cap: 'ronaldopekel — “amazing trade.”',
  },
  {
    src: '/testimonials/live-best-entry.png',
    alt: 'ronaldopekel — same trade, filled a bit late and got the best entry ever.',
    cap: 'ronaldopekel — “the best entry ever.”',
  },
  {
    src: '/testimonials/live-fast-beautiful.png',
    alt: 'ronaldopekel — this trade was so fast and beautiful, under 10 seconds plus slippage for extra profit.',
    cap: 'ronaldopekel — “so fast and beautiful — under 10 seconds.”',
  },
];

const RoomClip = ({ clip }) => {
  const [playing, setPlaying] = useState(false);
  return (
    <li className="ofs-card ofs-card--hover ofs-room-card reveal">
      <div className="ofs-room-media">
        {playing ? (
          <iframe
            src={`${clip.videoUrl}?autoplay=true&loop=false&muted=false&preload=true&responsive=true`}
            title={`OFS Live — ${clip.cap}`}
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen;"
            loading="lazy" allowFullScreen
          />
        ) : (
          <button type="button" className="ofs-room-poster" onClick={() => { setPlaying(true); trackVideoPlay(`room_${clip.id}`); }}
                  aria-label={`Play: ${clip.cap}`}>
            <span className="ofs-teach-play" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
            </span>
          </button>
        )}
      </div>
      <div className="ofs-room-body">
        <p className="ofs-teach-caption">{clip.cap}</p>
      </div>
    </li>
  );
};

/* The five things OFS Live unlocks. */
const UNLOCK = [
  ['01', 'Live market sessions with Edgar',
   'Join 2–3 live sessions each week and watch the decision process develop as the market moves.',
   'Context → Location → Aggression → Reaction → Execution'],
  ['02', 'Follow the market through the week',
   'Live voice or written commentary around context, levels, participation and changes in the market thesis.'],
  ['03', 'Go deeper every week',
   'Group classes covering execution, auction theory, order flow, psychology and changing market conditions.'],
  ['04', 'OFS Foundations included',
   'Build the order-flow knowledge underneath the Live Room, so you understand what you are watching instead of simply following it.'],
  ['05', 'Private OFS community',
   'Learn alongside traders working through the same concepts, sessions and market conditions.'],
];

const FLOW = ['Context', 'Location', 'Aggression', 'Reaction', 'Execution'];

const LIVE_INCLUDES = [
  'The Live Room',
  'Real-time commentary',
  'Weekly group classes',
  'OFS Foundations',
  'Private community',
];

const FAQS = [
  ['What is included in OFS Live?',
   'The Live Room with 2–3 sessions a week, live voice or written commentary, weekly group classes, the full OFS Foundations curriculum and the private community — all on one membership.'],
  ['When are the live sessions?',
   'Two to three each week during US market hours, announced in the community ahead of time. Sessions follow what the market is actually doing, so the week shapes the schedule.'],
  ['Is this a signals room?',
   'No. You will see Edgar trade and explain his thinking live, but the purpose is to understand the decision process, not blindly copy entries. OFS Live is built around developing your own read of context, order flow and execution.'],
  ['How does the free trial and membership work?',
   'You start with a free trial day. After that it is $74.99 every 30 days through Whop, renewing automatically until you cancel. You can cancel yourself inside Whop at any time, and access runs to the end of the period you have paid for.'],
  ['Is OFS Live the same as the private 1:1 program?',
   'No. OFS Live is the $75/month membership that includes the Live Room, Foundations, group classes and private community. The private OFS program is a separate application-only mentorship with deeper curriculum and direct 1:1 development with Edgar.'],
  ['Can I apply for private mentorship later?',
   'Yes. Work through Foundations, put screen time into the live room, and reapply when the framework is something you are using rather than reading about — a lot of the strongest applications are second applications.'],
];

const scrollToCheckout = () => {
  const el = document.getElementById('checkout');
  if (!el) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
};

const StartFreeTrial = ({ where }) => (
  <button
    type="button"
    className="ofs-btn ofs-btn--auto"
    onClick={() => { trackCTAClick(`OFS Live · ${where}`); scrollToCheckout(); }}
    data-testid={`ofs-live-cta-${where}`}
  >
    Start my free trial <span className="ofs-arrow" aria-hidden="true">&rarr;</span>
  </button>
);

const NotReadyYet = () => {
  const scope = useReveal();
  const [open, setOpen] = useState(null);
  const [pastHero, setPastHero] = useState(false);
  const [atCheckout, setAtCheckout] = useState(false);

  useEffect(() => {
    document.title = 'OFS Live | Order Flow School';
    window.scrollTo(0, 0);

    const hero = document.getElementById('live-hero-end');
    const heroIO = hero && new IntersectionObserver(
      ([e]) => setPastHero(!e.isIntersecting && e.boundingClientRect.top < 0),
      { threshold: 0 }
    );
    if (heroIO) heroIO.observe(hero);

    // Hide the sticky button only while the real checkout is on screen.
    const co = document.getElementById('checkout');
    const coIO = co && new IntersectionObserver(
      ([e]) => setAtCheckout(e.isIntersecting),
      { threshold: 0.15 }
    );
    if (coIO) coIO.observe(co);

    return () => { if (heroIO) heroIO.disconnect(); if (coIO) coIO.disconnect(); };
  }, []);

  const barUp = pastHero && !atCheckout;

  return (
    <div className="ofs-has-mobilebar" style={{ background: '#070808', minHeight: '100vh' }}>
      <Header ctaLabel={null} />

      <main ref={scope}>
        {/* ── Qualification hero ─────────────────────────── */}
        <section className="ofs-section t-dark" style={{ paddingTop: 'calc(var(--nav-h) + 72px)' }} aria-labelledby="live-h">
          <div className="ofs-wrap">
            <div style={{ maxWidth: '62ch' }}>
              <p className="ofs-label reveal" style={{ display: 'inline-flex', alignItems: 'center', gap: 9 }}>
                <span aria-hidden="true" style={{ width: 5, height: 5, borderRadius: 999, background: 'var(--accent)', display: 'inline-block' }} />
                Application reviewed
              </p>

              <h1 id="live-h" className="reveal" style={{ marginTop: 20, maxWidth: '15ch', fontSize: 'clamp(30px,3.4vw + 1rem,62px)' }}>
                You qualified for <span className="ofs-em">OFS Live</span>.
              </h1>

              <p className="ofs-lead reveal" style={{ marginTop: 22, maxWidth: '52ch' }}>
                Based on your application, OFS Live is the OFS membership that best
                fits where you are right now. Watch Edgar read and trade the market
                live, follow the reasoning behind the decisions, and build the
                foundation underneath it through Foundations and weekly classes.
              </p>

              <ul className="ofs-methods reveal" aria-label="What OFS Live includes" style={{ marginTop: 24 }}>
                {LIVE_INCLUDES.map((m) => <li key={m}>{m}</li>)}
              </ul>

              <div className="reveal" style={{ marginTop: 32 }}>
                <StartFreeTrial where="hero" />
                <p className="ofs-fine" style={{ marginTop: 14 }}>{MICRO}</p>
              </div>
            </div>
          </div>
          <div id="live-hero-end" aria-hidden="true" style={{ height: 1 }} />
        </section>

        {/* ── See inside the live room (videos) ──────────── */}
        <section className="ofs-section t-dark ofs-section--tight" aria-labelledby="room-h">
          <div className="ofs-wrap">
            <div className="reveal" style={{ maxWidth: '50ch' }}>
              <p className="ofs-label ofs-label--accent">See inside the live room</p>
              <h2 id="room-h" style={{ marginTop: 12, fontSize: 'clamp(22px,1.4vw + 1rem,30px)' }}>
                A look at what a session <span className="ofs-em">actually feels like</span>.
              </h2>
            </div>
            <ul className="ofs-room-grid">
              {LIVE_CLIPS.map((clip) => <RoomClip key={clip.id} clip={clip} />)}
            </ul>
          </div>
        </section>

        {/* ── Member testimonials (real screenshots) ─────── */}
        <section className="ofs-section t-dark ofs-section--tint" aria-labelledby="fb-h">
          <div className="ofs-wrap">
            <div style={{ maxWidth: '54ch' }}>
              <p className="ofs-label reveal">From the live room</p>
              <h2 id="fb-h" className="reveal" style={{ marginTop: 16 }}>
                Real members. <span className="ofs-em">Real trades, called live.</span>
              </h2>
              <p className="ofs-lead reveal" style={{ marginTop: 20 }}>
                Unedited screenshots posted by members in the room — the trade,
                the read behind it, and the transparency that comes with it.
              </p>
            </div>

            <div className="ofs-wall reveal">
              {LIVE_WINS.map((w) => (
                <figure key={w.src} className="ofs-wall-item">
                  <img src={w.src} alt={w.alt} loading="lazy" />
                  <figcaption className="ofs-wall-cap">
                    <span className="ofs-wall-tag" aria-hidden="true">
                      <span className="ofs-wall-dot" /> OFS live room
                    </span>
                    <p>{w.cap}</p>
                  </figcaption>
                </figure>
              ))}
            </div>

            <p className="ofs-fine reveal" style={{ marginTop: 28, maxWidth: '66ch' }}>
              Individual results vary and are not typical. Trading futures involves
              substantial risk of loss. Nothing here is a projection of what any
              particular trader should expect.
            </p>
          </div>
        </section>

        {/* ── Checkout (under the testimonials) ──────────── */}
        <section id="checkout" className="ofs-section t-blue" aria-labelledby="join-h">
          <div className="ofs-wrap" style={{ maxWidth: 760, textAlign: 'center' }}>
            <p className="ofs-label reveal" style={{ marginBottom: 18 }}>Your access is ready</p>
            <h2 id="join-h" className="reveal" style={{ maxWidth: '18ch', marginInline: 'auto' }}>
              Start with <span className="ofs-em">one live day</span>.
            </h2>
            <p className="ofs-lead reveal" style={{ marginTop: 22, maxWidth: '54ch', marginInline: 'auto' }}>
              Get inside the room, watch how Edgar reads the market, explore
              Foundations, and decide from experience whether you want to stay.
            </p>
            <div className="reveal ofs-checkout-card" style={{ marginTop: 34 }}>
              <EmbeddedCheckout />
            </div>
            <p className="ofs-fine reveal" style={{ marginTop: 16 }}>{MICRO}</p>
          </div>
        </section>

        {/* ── What's included ────────────────────────────── */}
        <section className="ofs-section t-light" aria-labelledby="unlock-h">
          <div className="ofs-wrap">
            <div style={{ maxWidth: '50ch' }}>
              <p className="ofs-label reveal">Your OFS Live access</p>
              <h2 id="unlock-h" className="reveal" style={{ marginTop: 16 }}>
                Learn it. Then <span className="ofs-em">watch it happen live</span>.
              </h2>
              <p className="ofs-lead reveal" style={{ marginTop: 18 }}>
                Foundations teaches you the language. The Live Room lets you see
                Edgar apply it while the outcome is still unknown.
              </p>
            </div>

            <ul className="ofs-phases">
              {UNLOCK.map(([n, t, d, micro], i) => (
                <li key={n} className="ofs-card ofs-phase reveal" data-reveal-delay={i * 70}>
                  <span className="ofs-label ofs-label--accent">{n}</span>
                  <h3>{t}</h3>
                  <p>{d}</p>
                  {micro && <p className="ofs-label" style={{ marginTop: 14, letterSpacing: '.06em', fontSize: 10, color: 'var(--muted)' }}>{micro}</p>}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── The point of the room (last content before FAQ) ── */}
        <section className="ofs-section t-dark" aria-labelledby="point-h">
          <div className="ofs-wrap ofs-split">
            <div className="ofs-split-aside">
              <p className="ofs-label reveal">The point of the room</p>
              <h2 id="point-h" className="reveal" style={{ marginTop: 16 }}>
                Don't just watch the trade. <span className="ofs-em">Understand the decision.</span>
              </h2>
              <p className="ofs-lead reveal" style={{ marginTop: 18, maxWidth: '46ch' }}>
                OFS Live is not built around copying entries. The value is seeing
                how Edgar reads context, interprets participation and adjusts
                decisions while the market is still developing.
              </p>
            </div>

            <div className="reveal">
              <ol className="ofs-flow" aria-label="The OFS decision sequence">
                {FLOW.map((step, i) => (
                  <li key={step}>
                    <span className="ofs-flow-n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                    <span className="ofs-flow-t">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ── FAQ (the very last section) ────────────────── */}
        <section className="ofs-section t-light ofs-section--tint" aria-labelledby="lfaq-h">
          <div className="ofs-wrap ofs-split">
            <div className="ofs-split-aside">
              <p className="ofs-label reveal">Before you join</p>
              <h2 id="lfaq-h" className="reveal" style={{ marginTop: 16 }}>The practical details.</h2>
            </div>
            <div>
              <ul className="ofs-faq">
                {FAQS.map(([q, a], i) => {
                  const isOpen = open === i;
                  return (
                    <li key={q} className="reveal" data-reveal-delay={i * 55}>
                      <button type="button" className="ofs-faq-q" aria-expanded={isOpen}
                              aria-controls={`lfaq-${i}`} id={`lfaq-btn-${i}`}
                              onClick={() => setOpen(isOpen ? null : i)}>
                        <span>{q}</span>
                        <span className={`ofs-faq-sign${isOpen ? ' is-open' : ''}`} aria-hidden="true"><i /><i /></span>
                      </button>
                      <div id={`lfaq-${i}`} role="region" aria-labelledby={`lfaq-btn-${i}`}
                           className={`ofs-faq-a${isOpen ? ' is-open' : ''}`}>
                        <div><p>{a}</p></div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <div className={`ofs-mobilebar md:hidden${barUp ? ' is-up' : ''}`} aria-hidden={!barUp}>
        <button type="button" className="ofs-btn" tabIndex={barUp ? 0 : -1}
                onClick={() => { trackCTAClick('OFS Live · sticky'); scrollToCheckout(); }}
                data-testid="ofs-live-cta-sticky">
          Start my free trial
        </button>
      </div>
    </div>
  );
};

export default NotReadyYet;
