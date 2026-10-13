import React, { useEffect, useState } from 'react';
import { OFS_LIVE, DISCORD } from '../../config/offers';
import { trackCTAClick } from '../../utils/analytics';

/* Shared building blocks for the two OFS Live pages:
     /not-ready-yet — applicants routed here after the 1:1 application
     /live          — direct traffic (Instagram bio) who want to trade live
   The pages differ in angle, hero and section order; everything that shows
   the room itself (clips, member screenshots, what's included, the decision
   sequence, the FAQ accordion, the trial button and sticky bar) lives here so
   a change is made once. */

/* Real clips from inside the live room (Bunny Stream). Every clip loads its
   player so it shows a real thumbnail; the first autoplays muted as a hook. */
export const LIVE_CLIPS = [
  { id: 'r1', videoUrl: 'https://player.mediadelivery.net/embed/738150/fbe29aef-d026-41fc-aa9a-d986c64131e0', cap: 'A live session, as it happened.' },
  { id: 'r2', videoUrl: 'https://player.mediadelivery.net/embed/738150/61b0b2b3-612c-491d-b8d3-26c86241180f', cap: 'Reading context while the move develops.' },
  { id: 'r3', videoUrl: 'https://player.mediadelivery.net/embed/738150/bef09563-fc43-498b-a344-8f81700783dd', cap: 'Managing the decision in real time.' },
];

/* Unedited screenshots posted by members in the live room. Nothing fabricated;
   captions only label what the screenshot already shows. */
export const LIVE_WINS = [
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

export const FLOW = ['Context', 'Location', 'Aggression', 'Reaction', 'Execution'];

/* Short labels for what the membership includes (hero pills, comparison card). */
export const LIVE_INCLUDES = [
  'The Live Room',
  'Real-time commentary',
  'Weekly group classes',
  'OFS Foundations',
  'Private community',
];

/* The five things OFS Live unlocks. `firstPerson` swaps "with Edgar" for
   "with me" on the page written in Edgar's own voice. */
const unlockItems = (firstPerson) => [
  ['01', firstPerson ? 'Live market sessions with me' : 'Live market sessions with Edgar',
   `Join ${OFS_LIVE.sessionsPerWeek} live sessions each week and watch the decision process develop as the market moves.`,
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

/* ── Room clips ─────────────────────────────────────── */
const RoomClip = ({ clip, autoplay = false }) => {
  // First clip autoplays muted (silent hook); the rest load paused on their
  // thumbnail. Muted is required — browsers block autoplay with sound.
  const params = autoplay
    ? 'autoplay=true&muted=true&loop=false&preload=true&responsive=true'
    : 'autoplay=false&muted=true&loop=false&preload=true&responsive=true';
  const src = `${clip.videoUrl}${clip.videoUrl.includes('?') ? '&' : '?'}${params}`;
  return (
    <li className="ofs-card ofs-card--hover ofs-room-card reveal">
      <div className="ofs-room-media">
        <iframe
          src={src}
          title={`OFS Live — ${clip.cap}`}
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen;"
          loading={autoplay ? 'eager' : 'lazy'}
          allowFullScreen
        />
      </div>
      <div className="ofs-room-body">
        <p className="ofs-teach-caption">{clip.cap}</p>
      </div>
    </li>
  );
};

export const RoomClips = () => (
  <ul className="ofs-room-grid">
    {LIVE_CLIPS.map((clip, i) => <RoomClip key={clip.id} clip={clip} autoplay={i === 0} />)}
  </ul>
);

/* ── Member screenshots ─────────────────────────────── */
export const MemberWall = () => (
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
);

export const ResultsNote = () => (
  <p className="ofs-fine reveal" style={{ marginTop: 28, maxWidth: '66ch' }}>
    Individual results vary and are not typical. Trading futures involves
    substantial risk of loss. Nothing here is a projection of what any
    particular trader should expect.
  </p>
);

/* ── What's included ────────────────────────────────── */
export const UnlockGrid = ({ firstPerson = false }) => (
  <ul className="ofs-phases">
    {unlockItems(firstPerson).map(([n, t, d, micro], i) => (
      <li key={n} className="ofs-card ofs-phase reveal" data-reveal-delay={i * 70}>
        <span className="ofs-label ofs-label--accent">{n}</span>
        <h3>{t}</h3>
        <p>{d}</p>
        {micro && <p className="ofs-label" style={{ marginTop: 14, letterSpacing: '.06em', fontSize: 10, color: 'var(--muted)' }}>{micro}</p>}
      </li>
    ))}
  </ul>
);

/* ── The decision sequence ──────────────────────────── */
export const DecisionFlow = () => (
  <ol className="ofs-flow" aria-label="The OFS decision sequence">
    {FLOW.map((step, i) => (
      <li key={step}>
        <span className="ofs-flow-n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
        <span className="ofs-flow-t">{step}</span>
      </li>
    ))}
  </ol>
);

/* ── FAQ accordion ──────────────────────────────────── */
export const FaqList = ({ items, idPrefix = 'lfaq' }) => {
  const [open, setOpen] = useState(null);
  return (
    <ul className="ofs-faq">
      {items.map(([q, a], i) => {
        const isOpen = open === i;
        return (
          <li key={q} className="reveal" data-reveal-delay={i * 55}>
            <button type="button" className="ofs-faq-q" aria-expanded={isOpen}
                    aria-controls={`${idPrefix}-${i}`} id={`${idPrefix}-btn-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}>
              <span>{q}</span>
              <span className={`ofs-faq-sign${isOpen ? ' is-open' : ''}`} aria-hidden="true"><i /><i /></span>
            </button>
            <div id={`${idPrefix}-${i}`} role="region" aria-labelledby={`${idPrefix}-btn-${i}`}
                 className={`ofs-faq-a${isOpen ? ' is-open' : ''}`}>
              <div><p>{a}</p></div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

/* ── Trial CTA → the embedded checkout on the same page ── */
export const scrollToCheckout = () => {
  const el = document.getElementById('checkout');
  if (!el) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
};

/* `source` names the page in analytics so the two pages can be told apart.
   `block` lets the button go full-width on phones (default keeps it compact). */
export const TrialButton = ({ where, source = 'OFS Live', label = 'Start my free trial', block = false }) => (
  <button
    type="button"
    className={`ofs-btn${block ? '' : ' ofs-btn--auto'}`}
    onClick={() => { trackCTAClick(`${source} · ${where}`); scrollToCheckout(); }}
    data-testid={`ofs-live-cta-${where}`}
  >
    {label} <span className="ofs-arrow" aria-hidden="true">&rarr;</span>
  </button>
);

/* ── Free Discord (secondary path) ──────────────────── */
const DiscordGlyph = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
  </svg>
);

export const DiscordButton = ({ where, source = 'OFS Live', label = 'Join the free Discord' }) => (
  <a
    className="ofs-btn-ghost"
    href={DISCORD.inviteUrl}
    target="_blank"
    rel="noopener noreferrer"
    onClick={() => trackCTAClick(`${source} · ${where}`)}
    data-testid={`ofs-live-discord-${where}`}
  >
    <DiscordGlyph /> {label}
  </a>
);

/* ── Sticky mobile bar ──────────────────────────────── */
/* Arrives once the hero has scrolled away and steps aside while the real
   checkout is on screen. Relies on #live-hero-end and #checkout in the page. */
export const useTrialBar = () => {
  const [pastHero, setPastHero] = useState(false);
  const [atCheckout, setAtCheckout] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('live-hero-end');
    const heroIO = hero && new IntersectionObserver(
      ([e]) => setPastHero(!e.isIntersecting && e.boundingClientRect.top < 0),
      { threshold: 0 }
    );
    if (heroIO) heroIO.observe(hero);

    const co = document.getElementById('checkout');
    const coIO = co && new IntersectionObserver(
      ([e]) => setAtCheckout(e.isIntersecting),
      { threshold: 0.15 }
    );
    if (coIO) coIO.observe(co);

    return () => { if (heroIO) heroIO.disconnect(); if (coIO) coIO.disconnect(); };
  }, []);

  return pastHero && !atCheckout;
};

export const TrialBar = ({ show, source = 'OFS Live', label = 'Start my free trial' }) => (
  <div className={`ofs-mobilebar md:hidden${show ? ' is-up' : ''}`} aria-hidden={!show}>
    <button type="button" className="ofs-btn" tabIndex={show ? 0 : -1}
            onClick={() => { trackCTAClick(`${source} · sticky`); scrollToCheckout(); }}
            data-testid="ofs-live-cta-sticky">
      {label}
    </button>
  </div>
);
