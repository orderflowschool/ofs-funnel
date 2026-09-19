import React from 'react';
import { useNavigate } from 'react-router-dom';
import useReveal from '../../hooks/useReveal';
import { trackCTAClick } from '../../utils/analytics';
import useSectionView from '../../hooks/useSectionView';

/* What's included — the offer made tangible. Five interactive panels so the
   visitor feels a complete environment, not a feature list. Each panel carries
   the "job" it does inside the OFS loop (observe → watch → refine → apply →
   learn). Claims stay to what is actually included; no invented durations or
   "the only school" superlatives. */
const INCLUDED = [
  {
    n: '01', job: 'Implement', title: 'Direct 1:1 guidance',
    d: 'The core of the program: I personally help you implement order flow into the strategy you already trade — your charts, your sessions, your decisions, worked through directly with me.',
  },
  {
    n: '02', job: 'Tools', title: 'Order-flow software',
    d: 'OFS students get a 3-month license for DeepCharts and DeepDOM — the footprint and order-flow tools — completely on us, so you can apply the framework from day one.',
  },
  {
    n: '03', job: 'Live', title: 'OFS Live Room',
    d: 'Lifetime access to the OFS Live Room — live trading with me every week. Watch how Context, Location, Aggression and Reaction develop while the outcome is still unknown.',
    d2: 'The goal isn’t to copy trades — it’s to see the decision process under real market conditions.',
  },
  {
    n: '04', job: 'Learn', title: 'Full OFS curriculum',
    d: 'More than 100 structured lessons, shaped to build your career as an order-flow trader — from the foundations through applying the framework independently across real market conditions.',
  },
  {
    n: '05', job: 'Community', title: 'A community of serious traders',
    d: 'Access to a community of like-minded traders on the same path — which includes the group classes, where we go deeper into real sessions, common execution problems and the framework together.',
  },
];

const Included = () => {
  const navigate = useNavigate();
  const scope = useReveal();
  useSectionView(scope, 'included');

  return (
    <section id="included" ref={scope} className="ofs-section t-blue" aria-labelledby="incl-h">
      <div className="ofs-wrap">
        <div style={{ maxWidth: '56ch' }}>
          <p className="ofs-label reveal">Everything in one place</p>
          <h2 id="incl-h" className="reveal" style={{ marginTop: 16 }}>
            Everything you need to learn it, see it live, and{' '}
            <span className="ofs-em">implement it yourself</span>.
          </h2>
          <p className="ofs-lead reveal" style={{ marginTop: 20 }}>
            The curriculum, tools and direct support are built around one goal:
            helping you integrate the OFS Framework into the strategy you already
            trade.
          </p>
        </div>

        <ul className="ofs-incl-grid reveal">
          {INCLUDED.map((it) => (
            <li key={it.n} className="ofs-incl-card" tabIndex={0}>
              <div className="ofs-incl-top">
                <span className="ofs-incl-n" aria-hidden="true">{it.n}</span>
                <span className="ofs-incl-job">{it.job}</span>
              </div>
              <h3 className="ofs-incl-t">{it.title}</h3>
              <p className="ofs-incl-d">{it.d}</p>
              {it.d2 && <p className="ofs-incl-d2">{it.d2}</p>}
            </li>
          ))}
        </ul>

        <div className="reveal ofs-included-cta">
          <button
            className="ofs-btn ofs-btn--auto"
            data-testid="included-cta"
            onClick={() => { trackCTAClick('included_apply'); navigate('/apply'); }}
          >
            Apply to work with Edgar <span className="ofs-arrow" aria-hidden="true">&rarr;</span>
          </button>
          <p className="ofs-fine" style={{ marginTop: 14 }}>
            Applications reviewed individually.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Included;
