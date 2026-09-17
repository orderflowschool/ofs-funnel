import { useEffect, useRef } from 'react';
import { trackSectionView } from '../utils/analytics';

/**
 * Fires a one-shot section_view analytics event the first time the given
 * element scrolls at least `threshold` into view. Reuses an existing ref
 * (e.g. the one returned by useReveal) so a section needs only one ref.
 */
const useSectionView = (ref, name, threshold = 0.3) => {
  const fired = useRef(false);

  useEffect(() => {
    const el = ref && ref.current;
    if (!el || fired.current) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fired.current) {
          fired.current = true;
          trackSectionView(name);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, name, threshold]);
};

export default useSectionView;
