import { useEffect, useRef } from 'react';

/**
 * Scroll reveal per the plan's motion spec:
 * translateY(16px) + blur(4px) -> resolved, 700ms ease-out-expo, staggered 80ms.
 * Falls back to a plain crossfade under prefers-reduced-motion (handled in CSS).
 *
 * Uses IntersectionObserver, never a scroll listener — continuous reflow is what
 * kills scroll performance on mobile, and mobile is the priority here.
 */
export default function useReveal(stagger = 80) {
  const scope = useRef(null);

  useEffect(() => {
    const root = scope.current;
    if (!root) return;
    const els = root.querySelectorAll('.reveal');
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        // Stagger only within a single intersecting batch, so a long page
        // doesn't accumulate a growing delay as you scroll.
        const hits = entries.filter((e) => e.isIntersecting);
        hits.forEach((e, i) => {
          const el = e.target;
          const own = el.dataset.revealDelay;
          el.style.transitionDelay = `${own !== undefined ? Number(own) : i * stagger}ms`;
          el.classList.add('is-in');
          io.unobserve(el);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    els.forEach((el) => io.observe(el));

    // Failsafe: if anything is still hidden well after load — a missed
    // callback, a restored scroll position, a fast flick past a section —
    // show it rather than leave a hole in the page.
    const failsafe = window.setTimeout(() => {
      els.forEach((el) => el.classList.add('is-in'));
    }, 4000);

    return () => { io.disconnect(); window.clearTimeout(failsafe); };
  }, [stagger]);

  return scope;
}
