import React from 'react';
import { useNavigate } from 'react-router-dom';
import useReveal from '../../hooks/useReveal';
import { trackCTAClick } from '../../utils/analytics';

/* The product is trader development. Components (curriculum, live room,
   community, platform access) belong further down the funnel — here the
   four phases describe what actually happens to the trader. */
const PHASES = [
  {
    n: '01',
    t: 'Learn',
    d: 'Build the order-flow foundation and the OFS decision process, so the tools are attached to a method rather than collected.',
  },
  {
    n: '02',
    t: 'Watch',
    d: 'See the framework applied in live conditions, while the outcome is still unknown. Not calls to copy — the reasoning as it happens.',
  },
  {
    n: '03',
    t: 'Apply',
    d: 'Bring your own setups, sessions and decisions in. This is where the framework meets the way you actually trade.',
  },
  {
    n: '04',
    t: 'Develop',
    d: 'Refine it with direct feedback from Edgar until the process is yours and no longer needs to be handed to you.',
  },
];

const Program = () => {
  const navigate = useNavigate();
  const scope = useReveal();

  return (
    <section ref={scope} className="ofs-section t-light" aria-labelledby="prog-h">
      <div className="ofs-wrap">
        <div style={{ maxWidth: '50ch' }}>
          <p className="ofs-label reveal">Working with Edgar</p>
          <h2 id="prog-h" className="reveal" style={{ marginTop: 16 }}>
            Build the decision-maker. <span className="ofs-em">Not another strategy.</span>
          </h2>
          <p className="ofs-lead reveal" style={{ marginTop: 20 }}>
            The work is one-to-one where it matters: your charts, your sessions,
            your decisions — reviewed directly, inside a structured curriculum
            and a live market environment.
          </p>
        </div>

        <ul className="ofs-phases">
          {PHASES.map((p, i) => (
            <li key={p.n} className="ofs-card ofs-phase reveal" data-reveal-delay={i * 80}>
              <span className="ofs-label ofs-label--accent">{p.n}</span>
              <h3>{p.t}</h3>
              <p>{p.d}</p>
            </li>
          ))}
        </ul>

        <div className="reveal ofs-card" style={{ marginTop: 26, padding: 'clamp(24px,3vw,36px)' }}>
          <p style={{
            fontFamily: 'var(--font-display)', fontWeight: 600,
            fontSize: 'clamp(19px,1vw + 1rem,26px)', letterSpacing: '-0.02em',
            lineHeight: 1.24, color: 'var(--ink)', maxWidth: '30ch',
          }}>
            The goal isn't to need me more. <span className="ofs-em">It's to need me less.</span>
          </p>
          <p className="ofs-fine" style={{ marginTop: 14, maxWidth: '58ch' }}>
            This is not a signals service and there is nothing to copy. If you
            finish still waiting to be told what to do, it hasn't worked.
          </p>
          <div style={{ marginTop: 26 }}>
            <button
              className="ofs-btn ofs-btn--auto"
              onClick={() => { trackCTAClick('Program Apply'); navigate('/apply'); }}
            >
              Apply to work with Edgar <span className="ofs-arrow" aria-hidden="true">&rarr;</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Program;
