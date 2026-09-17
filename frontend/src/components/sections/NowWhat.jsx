import React from 'react';
import useReveal from '../../hooks/useReveal';

/* Specific situations, not generic pain. Every line here should be something
   an experienced futures trader has personally sat through. */
const BEATS = [
  {
    q: 'Price reaches your level. The setup prints.',
    a: 'And the real decision starts there — the part your strategy was never built to answer.',
  },
  {
    q: 'The setup looked identical yesterday.',
    a: 'Yesterday it worked. Today it failed. Nothing in the pattern tells you what was different.',
  },
  {
    q: 'Your analysis says short. The market starts building evidence for long.',
    a: 'Do you adapt, or spend the next hour defending the idea you came in with?',
  },
  {
    q: 'You know where you want to trade.',
    a: 'You are far less certain whether the behaviour inside that location actually supports taking it.',
  },
  {
    q: 'You skip the one that runs and take the one that chops.',
    a: 'That is not a discipline failure. You had no way to tell the two apart in advance.',
  },
];

const NowWhat = () => {
  const scope = useReveal(70);

  return (
    <section ref={scope} className="ofs-section t-dark" aria-labelledby="nowwhat-h">
      <div className="ofs-wrap ofs-split">
        <div className="ofs-split-aside">
          <p className="ofs-label reveal">The moment</p>
          <h2 id="nowwhat-h" className="reveal" style={{ marginTop: 16 }}>
            You know the setup. <span className="ofs-em">Now what?</span>
          </h2>
          <p className="ofs-lead reveal" style={{ marginTop: 20 }}>
            Knowing where an opportunity might exist and knowing whether it
            deserves execution are two different skills. Most traders have
            spent years on the first one.
          </p>
        </div>

        <div>
          <ul className="ofs-beats">
            {BEATS.map((b, i) => (
              <li key={b.q} className="reveal" data-reveal-delay={i * 70}>
                <p className="ofs-beat-q">{b.q}</p>
                <p className="ofs-beat-a">{b.a}</p>
              </li>
            ))}
          </ul>

          <p className="reveal ofs-verdict">
            Your next level probably isn't another strategy.
            <br />
            <span className="ofs-em">It's knowing what has to happen before the setup deserves risk.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default NowWhat;
