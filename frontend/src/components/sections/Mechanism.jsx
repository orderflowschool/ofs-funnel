import React from 'react';
import useReveal from '../../hooks/useReveal';
import useSectionView from '../../hooks/useSectionView';

/* The OFS Framework — the conceptual close. By the time a visitor reaches it
   they've seen the proof, the teaching and the offer; this is the "why it's
   different". OFS does not replace the strategy — it installs a decision
   process around it. Read top to bottom, ending on the three legitimate
   outcomes (Execute / Wait / No trade all carry equal weight). */
const STACK = [
  {
    k: 'You bring',
    v: 'The strategy you already trade.',
    n: 'Your levels. Your model. Your read. Nothing gets thrown away.',
  },
  {
    k: 'Step one',
    v: 'What does this trade need the market to do?',
    n: 'Reject. Accept. Defend. Expand. Every setup carries an expectation about how the auction should behave.',
  },
  {
    k: 'Step two',
    v: 'What behaviour should exist if the thesis is right?',
    n: 'Define what you need to see before you start interpreting the data. This keeps order flow from becoming random confirmation hunting.',
  },
  {
    k: 'Step three',
    v: 'Order flow shows what participants are actually doing.',
    n: 'Who is aggressive? Where is size appearing? Are participants trapped? And is that activity actually producing a reaction?',
    accent: true,
  },
  {
    k: 'Step four',
    v: 'The OFS Framework organises the evidence.',
    n: 'Context. Location. Aggression. Reaction. Execution. In that order.',
    accent: true,
  },
];

const Mechanism = () => {
  const scope = useReveal();
  useSectionView(scope, 'framework');

  return (
    <section id="framework" ref={scope} className="ofs-section t-dark" aria-labelledby="mech-h">
      <div className="ofs-wrap ofs-split">
        <div className="ofs-split-aside">
          <p className="ofs-label reveal">The OFS Framework</p>
          <h2 id="mech-h" className="reveal" style={{ marginTop: 16 }}>
            Keep your strategy. Build a <span className="ofs-em">better decision process</span> around it.
          </h2>
          <p className="ofs-lead reveal" style={{ marginTop: 20 }}>
            Order flow gives you information. The OFS Framework gives that
            information a job. Before looking for confirmation, define what your
            trade actually needs the market to do — then use order flow to test
            whether participants are behaving in a way that supports the thesis.
          </p>
          <p className="reveal" style={{ marginTop: 18, color: 'var(--body)', maxWidth: '46ch' }}>
            That is the difference between <span className="ofs-em">seeing data</span> and
            using data to make a decision.
          </p>
          <p className="reveal ofs-fine" style={{ marginTop: 22, maxWidth: '44ch' }}>
            Aggression tells you who is trying. Reaction tells you whether they are
            succeeding. The decision comes from how that evidence fits the full
            trade thesis.
          </p>
        </div>

        <div>
          <ul className="ofs-stack reveal">
            {STACK.map((row) => (
              <li key={row.k} className={`ofs-stack-row${row.accent ? ' ofs-stack-row--accent' : ''}`}>
                <span className="ofs-stack-key">{row.k}</span>
                <span>
                  <span className="ofs-stack-val">{row.v}</span>
                  <span className="ofs-stack-note" style={{ display: 'block' }}>{row.n}</span>
                </span>
              </li>
            ))}
          </ul>

          <div className="reveal" style={{ marginTop: 30 }}>
            <p className="ofs-label">The output is one of three</p>
            <ul className="ofs-outcomes ofs-outcomes--equal">
              <li>Execute</li>
              <li>Wait</li>
              <li>No trade</li>
            </ul>
            <p className="ofs-fine" style={{ marginTop: 16, maxWidth: '52ch' }}>
              All three are correct answers. Two of them are decisions most traders
              never make on purpose.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mechanism;
