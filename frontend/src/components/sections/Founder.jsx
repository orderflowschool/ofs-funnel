import React from 'react';
import useReveal from '../../hooks/useReveal';
import FootprintCard from '../shared/FootprintCard';

/* Drop a real photograph in here and the fallback disappears.
   Naturally lit, at the desk, nothing staged — this is the only face on the
   page, so it carries the trust. */
const FOUNDER_PHOTO = null;   // e.g. '/edgar-desk.jpg'

const Founder = () => {
  const scope = useReveal();

  return (
    <section ref={scope} className="ofs-section t-dark" aria-labelledby="founder-h">
      <div className="ofs-wrap ofs-founder">
        <div>
          <p className="ofs-label reveal">Who you'd be working with</p>
          <blockquote id="founder-h" className="ofs-founder-quote reveal">
            “I already had setups. Order flow gave me{' '}
            <span className="ofs-em">more information</span> — not a decision.”
          </blockquote>
          <p className="reveal" style={{ marginTop: 22, color: 'var(--body)', maxWidth: '46ch' }}>
            More data still didn't tell me what mattered in the moment, or when
            a trade actually deserved execution. What I needed was a repeatable
            way to organise the information around the trade thesis itself —
            what the idea required, and whether the market was delivering it.
          </p>
          <p className="reveal" style={{ marginTop: 16, color: 'var(--body)', maxWidth: '46ch' }}>
            That became the OFS Framework. It is what I teach, and it is what I
            use.
          </p>
          <p className="ofs-label reveal" style={{ marginTop: 28 }}>
            Edgar Alvarez — Founder, Order Flow School
          </p>
        </div>

        <div className="ofs-founder-media reveal">
          <div className="ofs-founder-photo">
            {FOUNDER_PHOTO ? (
              <img src={FOUNDER_PHOTO} alt="Edgar Alvarez at his trading desk" loading="lazy" />
            ) : (
              <div className="ofs-founder-placeholder">
                <span className="ofs-founder-initials" aria-hidden="true">EA</span>
                <span className="ofs-label">Photograph to come</span>
              </div>
            )}
          </div>
          <FootprintCard />
        </div>
      </div>
    </section>
  );
};

export default Founder;
