import React from 'react';
import { useNavigate } from 'react-router-dom';
import useReveal from '../../hooks/useReveal';
import { trackCTAClick } from '../../utils/analytics';

/* The close. No new argument after the framework — just the invitation, framed
   as the natural next step for someone who already has a foundation. */
const FinalCTA = () => {
  const navigate = useNavigate();
  const scope = useReveal();

  return (
    <section id="application" ref={scope} className="ofs-section t-dark" aria-labelledby="final-h">
      <div className="ofs-wrap" style={{ maxWidth: 780, textAlign: 'center' }}>
        <p className="ofs-label reveal" style={{ marginBottom: 18 }}>The application</p>
        <h2 id="final-h" className="reveal" style={{ maxWidth: '20ch', marginInline: 'auto' }}>
          Bring your strategy. <span className="ofs-em">Build the decision process around it.</span>
        </h2>
        <p className="ofs-lead reveal" style={{ marginTop: 22, maxWidth: '54ch', marginInline: 'auto' }}>
          If you already have a trading foundation and want to learn how to
          integrate order flow into what you already do, apply below.
        </p>

        <div className="reveal" style={{ marginTop: 34 }}>
          <button
            className="ofs-btn ofs-btn--auto"
            data-testid="final-cta"
            onClick={() => { trackCTAClick('final_apply'); navigate('/apply'); }}
          >
            Apply to work with Edgar <span className="ofs-arrow" aria-hidden="true">&rarr;</span>
          </button>
          <p className="ofs-fine" style={{ marginTop: 16 }}>
            Applications reviewed individually · Existing trading foundation required
          </p>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
