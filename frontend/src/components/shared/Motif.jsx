import React, { useEffect, useRef } from 'react';

/**
 * The OFS signature motif — an order-flow step line.
 *
 * Not decoration borrowed from a reference site: this is the same shape a
 * footprint/tape actually draws (hold, then jump), thinned to a hairline and
 * threaded through the page — hero backdrop, section dividers, footer — so the
 * brand's own chart language is the connective tissue.
 */

const RULE = "M0 20.0L31.6 20.0L31.6 16.9L73.8 16.9L73.8 14.0L106.6 14.0L106.6 14.4L131.8 14.4L131.8 15.8L166.7 15.8L166.7 16.2L202.7 16.2L202.7 13.7L245.5 13.7L245.5 17.8L274.4 17.8L274.4 15.9L320.3 15.9L320.3 20.4L354.6 20.4L354.6 19.1L398.3 19.1L398.3 15.4L431.1 15.4L431.1 14.7L451.3 14.7L451.3 12.9L490.1 12.9L490.1 17.2L522.7 17.2L522.7 18.3L567.6 18.3L567.6 17.5L601.0 17.5L601.0 14.4L626.0 14.4L626.0 13.4L674.4 13.4L674.4 14.4L701.9 14.4L701.9 16.4L740.2 16.4L740.2 15.5L782.7 15.5L782.7 18.1L806.3 18.1L806.3 18.9L847.6 18.9L847.6 21.9L887.2 21.9L887.2 19.3L927.8 19.3L927.8 16.1L951.2 16.1L951.2 19.0L980.9 19.0L980.9 18.8L1013.8 18.8L1013.8 20.2L1064.4 20.2L1064.4 20.4L1102.1 20.4L1102.1 18.4L1133.5 18.4L1133.5 19.3L1166.4 19.3L1166.4 18.8L1200.0 18.8L1200.0 22.4L1200.0 22.4";
const FIELD = "M0 330.0L22.5 330.0L22.5 352.3L40.1 352.3L40.1 326.1L54.8 326.1L54.8 321.8L72.1 321.8L72.1 302.9L86.4 302.9L86.4 303.4L104.7 303.4L104.7 304.3L120.5 304.3L120.5 285.9L145.9 285.9L145.9 287.9L161.7 287.9L161.7 305.8L178.0 305.8L178.0 285.7L200.5 285.7L200.5 296.4L217.1 296.4L217.1 307.1L238.4 307.1L238.4 302.6L254.1 302.6L254.1 299.2L270.0 299.2L270.0 311.5L285.2 311.5L285.2 291.9L304.8 291.9L304.8 308.4L324.1 308.4L324.1 308.1L342.6 308.1L342.6 294.1L355.5 294.1L355.5 289.7L380.3 289.7L380.3 279.3L390.7 279.3L390.7 265.6L407.9 265.6L407.9 263.2L431.6 263.2L431.6 289.6L446.9 289.6L446.9 288.3L464.4 288.3L464.4 283.8L487.6 283.8L487.6 292.8L500.0 292.8L500.0 277.3L523.6 277.3L523.6 295.5L542.0 295.5L542.0 286.4L556.9 286.4L556.9 314.2L575.4 314.2L575.4 338.9L588.7 338.9L588.7 361.2L605.5 361.2L605.5 350.9L623.1 350.9L623.1 362.6L648.2 362.6L648.2 381.1L667.4 381.1L667.4 395.2L682.5 395.2L682.5 409.2L702.7 409.2L702.7 387.5L723.1 387.5L723.1 370.9L732.6 370.9L732.6 341.4L753.5 341.4L753.5 322.8L776.5 322.8L776.5 346.4L786.7 346.4L786.7 322.1L808.0 322.1L808.0 305.2L826.1 305.2L826.1 324.5L840.9 324.5L840.9 320.3L865.9 320.3L865.9 318.0L877.8 318.0L877.8 339.3L900.8 339.3L900.8 357.4L917.4 357.4L917.4 347.5L935.4 347.5L935.4 360.9L952.8 360.9L952.8 341.3L967.0 341.3L967.0 333.8L990.1 333.8L990.1 335.2L1005.7 335.2L1005.7 350.4L1018.9 350.4L1018.9 352.9L1039.2 352.9L1039.2 351.4L1062.6 351.4L1062.6 333.9L1081.8 333.9L1081.8 310.4L1095.5 310.4L1095.5 314.7L1110.0 314.7L1110.0 319.3L1130.5 319.3L1130.5 317.4L1151.1 317.4L1151.1 292.6L1165.3 292.6L1165.3 312.5L1180.8 312.5L1180.8 333.4L1199.4 333.4L1199.4 341.3L1217.0 341.3L1217.0 335.9L1237.6 335.9L1237.6 312.2L1258.6 312.2L1258.6 313.0L1276.4 313.0L1276.4 316.8L1292.9 316.8L1292.9 319.3L1308.1 319.3L1308.1 340.7L1323.8 340.7L1323.8 357.6L1350.1 357.6L1350.1 352.1L1367.1 352.1L1367.1 356.6L1383.2 356.6L1383.2 340.5L1398.1 340.5L1398.1 330.0L1400.0 330.0";
const FIELD2 = "M0 395.0L16.4 395.0L16.4 381.9L46.2 381.9L46.2 371.0L71.5 371.0L71.5 388.2L90.7 388.2L90.7 387.6L113.7 387.6L113.7 378.7L132.6 378.7L132.6 376.4L153.0 376.4L153.0 397.1L171.3 397.1L171.3 405.7L200.4 405.7L200.4 387.2L225.2 387.2L225.2 386.2L241.2 386.2L241.2 379.7L263.3 379.7L263.3 399.6L282.4 399.6L282.4 406.9L310.0 406.9L310.0 417.9L330.6 417.9L330.6 410.1L347.9 410.1L347.9 402.0L370.2 402.0L370.2 414.6L398.1 414.6L398.1 399.2L412.5 399.2L412.5 380.4L443.2 380.4L443.2 365.9L457.9 365.9L457.9 359.0L477.3 359.0L477.3 382.3L502.3 382.3L502.3 389.3L529.3 389.3L529.3 390.7L551.1 390.7L551.1 401.2L570.1 401.2L570.1 401.7L595.7 401.7L595.7 406.4L610.4 406.4L610.4 418.6L638.6 418.6L638.6 430.4L658.4 430.4L658.4 420.6L676.2 420.6L676.2 419.5L695.8 419.5L695.8 422.7L724.6 422.7L724.6 430.9L740.1 430.9L740.1 426.1L766.3 426.1L766.3 423.0L786.3 423.0L786.3 398.1L815.0 398.1L815.0 412.2L826.8 412.2L826.8 423.8L854.4 423.8L854.4 398.7L876.8 398.7L876.8 389.7L895.2 389.7L895.2 375.1L923.1 375.1L923.1 384.1L937.1 384.1L937.1 388.2L961.5 388.2L961.5 407.3L980.6 407.3L980.6 411.2L1010.2 411.2L1010.2 422.1L1025.1 422.1L1025.1 429.9L1045.8 429.9L1045.8 409.0L1073.4 409.0L1073.4 420.8L1092.6 420.8L1092.6 402.7L1110.4 402.7L1110.4 397.1L1142.3 397.1L1142.3 401.0L1159.2 401.0L1159.2 400.1L1177.4 400.1L1177.4 388.2L1200.0 388.2L1200.0 397.8L1227.0 397.8L1227.0 379.6L1247.7 379.6L1247.7 399.4L1263.1 399.4L1263.1 385.0L1296.8 385.0L1296.8 387.1L1317.8 387.1L1317.8 400.7L1334.0 400.7L1334.0 417.6L1353.1 417.6L1353.1 405.1L1374.5 405.1L1374.5 412.1L1394.8 412.1L1394.8 405.9L1400.0 405.9";
const FOOT = "M0 14.0L40.5 14.0L40.5 14.3L95.0 14.3L95.0 12.2L121.5 12.2L121.5 10.0L161.6 10.0L161.6 8.3L205.5 8.3L205.5 10.2L269.7 10.2L269.7 12.6L296.9 12.6L296.9 12.5L347.8 12.5L347.8 11.9L374.7 11.9L374.7 14.6L431.6 14.6L431.6 12.1L460.4 12.1L460.4 10.3L526.1 10.3L526.1 9.1L560.4 9.1L560.4 13.5L588.0 13.5L588.0 13.0L642.3 13.0L642.3 15.8L677.7 15.8L677.7 13.8L722.1 13.8L722.1 11.1L775.9 11.1L775.9 14.0L812.6 14.0L812.6 11.2L862.6 11.2L862.6 13.5L903.9 13.5L903.9 12.6L951.4 12.6L951.4 13.9L988.0 13.9L988.0 14.1L1021.7 14.1L1021.7 13.8L1079.0 13.8L1079.0 15.0L1110.3 15.0L1110.3 16.6L1165.9 16.6L1165.9 13.0L1191.2 13.0L1191.2 11.7L1200.0 11.7";

/* ── Hairline divider between sections ───────────────────────── */
export const MotifRule = ({ opacity = 0.5 }) => (
  <div aria-hidden="true" style={{ lineHeight: 0, opacity, overflow: 'hidden' }}>
    <svg viewBox="0 0 1200 40" preserveAspectRatio="none"
         style={{ display: 'block', width: '100%', height: 40 }}>
      <path d={RULE} fill="none" stroke="var(--line-2)" strokeWidth="1"
            vectorEffect="non-scaling-stroke" />
    </svg>
  </div>
);

/* ── Footer tail — the last, faintest beat of the thread ─────── */
export const MotifFooterRule = () => (
  <div aria-hidden="true" style={{ lineHeight: 0, overflow: 'hidden' }}>
    <svg viewBox="0 0 1200 28" preserveAspectRatio="none"
         style={{ display: 'block', width: '100%', height: 28 }}>
      <path d={FOOT} fill="none" stroke="var(--line)" strokeWidth="1"
            vectorEffect="non-scaling-stroke" />
    </svg>
  </div>
);

/* ── Hero backdrop — two ghost lines, very low opacity ───────── */
export const MotifField = () => (
  <div aria-hidden="true" style={{
    position: 'absolute', inset: 0, overflow: 'hidden',
    pointerEvents: 'none', zIndex: 0,
  }}>
    <svg viewBox="0 0 1400 520" preserveAspectRatio="xMidYMid slice"
         style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="ofs-motif-fade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FAF9F6" stopOpacity="0" />
          <stop offset="38%" stopColor="#FAF9F6" stopOpacity="0.15" />
          <stop offset="72%" stopColor="#ADCBF8" stopOpacity="0.34" />
          <stop offset="100%" stopColor="#ADCBF8" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="ofs-motif-ghost" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FAF9F6" stopOpacity="0" />
          <stop offset="50%" stopColor="#FAF9F6" stopOpacity="0.07" />
          <stop offset="100%" stopColor="#FAF9F6" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={FIELD2} fill="none" stroke="url(#ofs-motif-ghost)" strokeWidth="1" />
      <path d={FIELD} fill="none" stroke="url(#ofs-motif-fade)" strokeWidth="1.25" />
    </svg>
  </div>
);

/* ── Scroll-drawn variant — the line writes itself on entry ──── */
export const MotifDrawn = ({ height = 190, strokeColor = 'var(--accent-ink)' }) => {
  const ref = useRef(null);

  useEffect(() => {
    const path = ref.current;
    if (!path) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const len = path.getTotalLength();
    if (reduce) { path.style.strokeDasharray = 'none'; path.style.strokeDashoffset = '0'; return; }
    path.style.strokeDasharray = `${len}`;
    path.style.strokeDashoffset = `${len}`;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        path.style.transition = 'stroke-dashoffset 2200ms cubic-bezier(.16,1,.3,1)';
        path.style.strokeDashoffset = '0';
        io.unobserve(e.target);
      });
    }, { threshold: 0.25 });
    io.observe(path);
    return () => io.disconnect();
  }, []);

  return (
    <div aria-hidden="true" style={{ lineHeight: 0, width: '100%' }}>
      <svg viewBox="0 0 1400 520" preserveAspectRatio="none"
           style={{ display: 'block', width: '100%', height }}>
        <path ref={ref} d={FIELD} fill="none" stroke={strokeColor}
              strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  );
};

export default MotifRule;
