import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { trackCTAClick } from '../../utils/analytics';

/**
 * The page alternates light and dark sections, so a fixed bar in one fixed
 * colour is wrong half the time. This watches which section is currently
 * passing under the nav and inverts to match it.
 */
const useNavTheme = (enabled) => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    if (!enabled) return;
    const sections = Array.from(document.querySelectorAll('main > section'));
    if (!sections.length) return;

    const navH = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10
    ) || 60;

    // A 1px-tall band sitting just below the nav. Whatever intersects it is
    // the section the bar is currently floating over.
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const cls = e.target.className || '';
          if (cls.includes('t-light')) setTheme('light');
          else if (cls.includes('t-blue')) setTheme('blue');
          else setTheme('dark');
        });
      },
      { rootMargin: `-${navH}px 0px -${Math.max(0, window.innerHeight - navH - 1)}px 0px`, threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [enabled]);

  return theme;
};

const Header = ({ ctaLabel = 'Apply', onCta }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [solid, setSolid] = useState(!isHome);
  const overTheme = useNavTheme(isHome);

  useEffect(() => {
    if (!isHome) { setSolid(true); return; }
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  const handle = () => {
    trackCTAClick('Nav Apply');
    if (onCta) return onCta();
    navigate('/apply');
  };

  // Transparent bar always sits over the dark hero, so never invert there.
  const light = isHome && solid && overTheme !== 'dark';

  return (
    <nav
      className={`ofs-nav${solid ? ' ofs-nav--solid' : ''}${light ? ' ofs-nav--onlight' : ''}`}
      aria-label="Primary"
    >
      <a
        href="/"
        className="ofs-mark"
        onClick={(e) => { e.preventDefault(); navigate('/'); }}
        aria-label="Order Flow School — home"
      >
        <b>OFS</b>
        <span>Order Flow School</span>
      </a>

      {ctaLabel !== null && (
        <button className="ofs-nav-btn" data-testid="nav-cta" onClick={handle}>
          {ctaLabel}
        </button>
      )}
    </nav>
  );
};

export default Header;
