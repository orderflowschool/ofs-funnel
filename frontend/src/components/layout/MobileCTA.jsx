import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { trackCTAClick } from '../../utils/analytics';

/**
 * The single highest-leverage mobile conversion element on the page:
 * a slim fixed bar that arrives once the hero has scrolled past, so the
 * primary action is never more than a thumb away — and never covers the
 * hero's own CTA while it's still on screen.
 */
const HIDDEN_ON = ['/apply', '/success', '/booking', '/booking-confirmed', '/not-ready-yet', '/masterclass-confirmed', '/masterclass', '/legal'];

const MobileCTA = ({ watchSelector = '#hero-sentinel', endSelector = '#application', label = 'Apply to work with Edgar' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [pastHero, setPastHero] = useState(false);
  const [atEnd, setAtEnd] = useState(false);

  const hidden = HIDDEN_ON.some((p) => location.pathname.startsWith(p));

  // Appears once the hero CTA has scrolled out of view…
  useEffect(() => {
    if (hidden) return;
    const sentinel = document.querySelector(watchSelector);
    if (!sentinel) { setPastHero(true); return; }
    const io = new IntersectionObserver(
      ([entry]) => setPastHero(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { threshold: 0 }
    );
    io.observe(sentinel);
    return () => io.disconnect();
  }, [hidden, watchSelector, location.pathname]);

  // …and steps aside once the final application section is on screen, so it
  // never competes with the closing CTA.
  useEffect(() => {
    if (hidden) return;
    const end = document.querySelector(endSelector);
    if (!end) return;
    const io = new IntersectionObserver(
      ([entry]) => setAtEnd(entry.isIntersecting),
      { threshold: 0.12 }
    );
    io.observe(end);
    return () => io.disconnect();
  }, [hidden, endSelector, location.pathname]);

  const up = pastHero && !atEnd;

  if (hidden) return null;

  return (
    <div className={`ofs-mobilebar md:hidden${up ? ' is-up' : ''}`} aria-hidden={!up}>
      <button
        className="ofs-btn"
        data-testid="mobile-sticky-cta"
        tabIndex={up ? 0 : -1}
        onClick={() => { trackCTAClick('sticky_mobile_apply'); navigate('/apply'); }}
      >
        {label}
      </button>
    </div>
  );
};

export default MobileCTA;
