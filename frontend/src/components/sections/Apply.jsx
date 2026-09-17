import React from 'react';
import { useNavigate } from 'react-router-dom';
import useReveal from '../../hooks/useReveal';
import { trackCTAClick } from '../../utils/analytics';

/* Admissions, not a sales call. The four steps mirror the actual form so
   nobody arrives at it unsure what they're being asked for. */
const STEPS = [
  ['01', 'Your trading', 'How long you have traded, and where Edgar should send his reply.'],
  ['02', 'Your process', 'Where your decision-making tends to break down when it breaks down.'],
  ['03', 'Your goals', 'What you are actually trying to get better at right now.'],
  ['04', 'Fit & details', 'Whether the timing lines up on both sides, and how to reach you.'],
];

const Apply = () => {
  const navigate = useNavigate();
  const scope = useReveal();

  return (
    <section ref={scope} className="ofs-section t-blue" aria-labelledby="apply-h">
      <div className="ofs-wrap ofs-split">
        <div className="ofs-split-aside">
          <p className="ofs-label reveal">The application</p>
          <h2 id="apply-h" className="reveal" style={{ marginTop: 16 }}>
            Think this is the missing layer in your trading?
          </h2>
          <p className="ofs-lead reveal" style={{ marginTop: 20 }}>
            Tell us where you are, what you currently trade and what you are
            trying to improve. Applications are read individually. If OFS looks
            like a strong fit you will be invited to the next step — a
            conversation about your trading, not a pitch.
          </p>

          <div className="reveal" style={{ marginTop: 32 }}>
            <button
              className="ofs-btn ofs-btn--auto"
              data-testid="final-cta"
              onClick={() => { trackCTAClick('Apply section'); navigate('/apply'); }}
            >
              Start your application <span className="ofs-arrow" aria-hidden="true">&rarr;</span>
            </button>
            <p className="ofs-fine" style={{ marginTop: 16 }}>
              About three minutes · No payment at application · You hear back either way
            </p>
          </div>
        </div>

        <div>
          <ul className="ofs-steps reveal">
            {STEPS.map(([n, t, d]) => (
              <li key={n}>
                <span className="ofs-step-n">{n}</span>
                <span>
                  <span className="ofs-step-t" style={{ display: 'block' }}>{t}</span>
                  <span className="ofs-step-d" style={{ display: 'block' }}>{d}</span>
                </span>
              </li>
            ))}
          </ul>
          <p className="ofs-fine reveal" style={{ marginTop: 22, maxWidth: '52ch' }}>
            Order Flow School is a paid private program. Nothing is charged at
            application, and there is no obligation at the conversation stage.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Apply;
