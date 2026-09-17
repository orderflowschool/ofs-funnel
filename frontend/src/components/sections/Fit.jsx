import React from 'react';
import useReveal from '../../hooks/useReveal';

const FITS = [
  'You already trade futures, or you are moving into them deliberately',
  'You have a setup or strategy you actually use — ICT, SMC, liquidity, supply and demand, price action, your own',
  'You want to understand what is happening beyond the candle',
  'You want more independence, not more signals',
  'You are willing to review your own decisions honestly',
  'You care about process more than about being right',
];

const DOESNT = [
  'You are completely new to trading and still learning the basics',
  'You want entries called for you',
  'You are looking for a plug-and-play indicator, or expect the software to decide',
  'You want a guaranteed outcome',
  'You change strategy every few weeks',
  'You are not in a position to study, practise and review',
];

const Row = ({ children, kind }) => (
  <li className={`ofs-fit-row ofs-fit-row--${kind}`}>
    <span className="ofs-fit-mark" aria-hidden="true">
      {kind === 'yes' ? (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
      ) : (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12" /></svg>
      )}
    </span>
    <span>{children}</span>
  </li>
);

const Fit = () => {
  const scope = useReveal();

  return (
    <section ref={scope} className="ofs-section t-dark" aria-labelledby="fit-h">
      <div className="ofs-wrap">
        <div style={{ maxWidth: '48ch' }}>
          <p className="ofs-label reveal">Fit</p>
          <h2 id="fit-h" className="reveal" style={{ marginTop: 16 }}>
            OFS isn't for <span className="ofs-em">every trader</span>.
          </h2>
          <p className="ofs-lead reveal" style={{ marginTop: 20 }}>
            Not as a filter for its own sake. The work assumes you already have
            a foundation to build on — without one there is nothing for the
            framework to attach to, and you would be better served starting
            somewhere else.
          </p>
        </div>

        <div className="ofs-fit-grid">
          <div className="ofs-card ofs-fit-col ofs-fit-col--yes reveal">
            <p className="ofs-label ofs-label--accent">This will probably fit if</p>
            <ul className="ofs-fit-list">{FITS.map((t) => <Row key={t} kind="yes">{t}</Row>)}</ul>
          </div>
          <div className="ofs-card ofs-fit-col reveal" data-reveal-delay="90">
            <p className="ofs-label">This probably isn't for you if</p>
            <ul className="ofs-fit-list">{DOESNT.map((t) => <Row key={t} kind="no">{t}</Row>)}</ul>
          </div>
        </div>

        <p className="ofs-fine reveal" style={{ marginTop: 26, maxWidth: '60ch' }}>
          If the second column describes where you are right now, that is not a
          problem — it just means a different part of Order Flow School is the
          better place to start, and the application will point you there.
        </p>
      </div>
    </section>
  );
};

export default Fit;
