import React, { useEffect, useRef, useState } from 'react';
import useReveal from '../../hooks/useReveal';
import { MotifDrawn } from '../shared/Motif';

/* The OFS Framework. Not five features — one ordered decision process.
   Each stage is a question, asked in the same sequence every session. */
const STAGES = [
  {
    n: '01',
    title: 'Context',
    q: 'What are we trading?',
    body: 'Is the market balancing or trending, and what has it been doing on the way here? The same setup means different things in a rotation and in a one-way session. Context decides how much weight everything after it deserves.',
  },
  {
    n: '02',
    title: 'Location',
    q: 'Where should this matter?',
    body: 'Your strategy already answers this — the level, the imbalance, the zone. The job here is being honest about whether this is a location the rest of the market is likely to care about, or only one you marked.',
  },
  {
    n: '03',
    title: 'Aggression',
    q: 'Who is actively trying?',
    body: 'Someone has to be doing the work. Order flow shows which side is paying up, at what size, and whether that effort is arriving where your thesis needs it to.',
  },
  {
    n: '04',
    title: 'Reaction',
    q: 'Are they succeeding?',
    body: 'This is the stage most traders skip. Aggression without reaction is incomplete information — heavy buying that fails to move price tells you something very different from heavy buying that does.',
  },
  {
    n: '05',
    title: 'Execution',
    q: 'Does the evidence justify risk?',
    body: 'Enough of the expected behaviour showed up, or it did not. The answer is execute, wait, or no trade — and knowing which is the actual skill being built.',
  },
];

const Framework = () => {
  const scope = useReveal();
  const [active, setActive] = useState(0);
  const stageRefs = useRef([]);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 900px)');
    if (!desktop.matches) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const idx = Number(e.target.dataset.idx);
        if (!Number.isNaN(idx)) setActive(idx);
      }),
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );
    stageRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section ref={scope} className="ofs-section t-dark" aria-labelledby="fw-h">
      <div className="ofs-wrap ofs-split">
        <div className="ofs-split-aside">
          <p className="ofs-label reveal">The OFS Framework</p>
          <h2 id="fw-h" className="reveal" style={{ marginTop: 16 }}>
            Information isn't the edge. <span className="ofs-em">Knowing what to do with it is.</span>
          </h2>
          <p className="ofs-lead reveal" style={{ marginTop: 20 }}>
            Five questions, asked in the same order, on every trade you are
            considering. It is the part that turns a screen full of data into
            a decision you can repeat and review.
          </p>

          <ol className="ofs-rail reveal" aria-hidden="true">
            {STAGES.map((s, i) => (
              <li key={s.n} className={i === active ? 'is-active' : ''}>
                <span className="ofs-rail-dot" />
                <span className="ofs-rail-label">{s.title}</span>
              </li>
            ))}
          </ol>

          <div className="reveal ofs-rail-motif">
            <MotifDrawn height={140} />
          </div>
        </div>

        <div>
          <ol className="ofs-stages">
            {STAGES.map((s, i) => (
              <li
                key={s.n}
                data-idx={i}
                ref={(el) => { stageRefs.current[i] = el; }}
                className="reveal"
                data-reveal-delay={i * 70}
              >
                <div className={`ofs-card ofs-stage${i === active ? ' is-active' : ''}`}>
                  <div className="ofs-stage-head">
                    <span className="ofs-label">{s.n}</span>
                    <span className="ofs-stage-q">{s.q}</span>
                  </div>
                  <h3 style={{ marginTop: 14 }}>{s.title}</h3>
                  <p style={{ marginTop: 12, fontSize: 16, lineHeight: 1.62, color: 'var(--body)' }}>
                    {s.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="reveal" style={{ marginTop: 30 }}>
            <ul className="ofs-outcomes">
              <li>Execute</li>
              <li>Wait</li>
              <li>No trade</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Framework;
