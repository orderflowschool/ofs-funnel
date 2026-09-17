import React from 'react';

/**
 * A miniature footprint readout — the "floating proof artifact" that sits over
 * the founder photo. Deliberately OFS's own chart language rather than a
 * generic SaaS donut chart: bid x ask at each price, with the imbalanced
 * prints marked the way they are on a real ladder.
 */
/* Heavy volume on the ASK side is buyers lifting offers. Five levels of it
   with price refusing to advance is the textbook absorption read — the note
   at the bottom of the card and the numbers have to agree. */
const ROWS = [
  { px: '21 486.75', bid: 96,  ask: 118,   flag: null  },
  { px: '21 486.50', bid: 112, ask: 141,   flag: null  },
  { px: '21 486.25', bid: 128, ask: 1204,  flag: 'ask' },
  { px: '21 486.00', bid: 141, ask: 1087,  flag: 'ask' },
  { px: '21 485.75', bid: 133, ask: 902,   flag: 'ask' },
];

const FootprintCard = ({ tilt = -4 }) => (
  <div className="ofs-fp" style={{ '--fp-tilt': `${tilt}deg` }} aria-hidden="true">
    <div className="ofs-fp-head">
      <span className="ofs-fp-sym">NQ · 1m</span>
      <span className="ofs-fp-tag">Absorption</span>
    </div>
    <table className="ofs-fp-table">
      <tbody>
        {ROWS.map((r) => (
          <tr key={r.px} className={r.flag ? `is-${r.flag}` : undefined}>
            <td className="ofs-fp-bid">{r.bid}</td>
            <td className="ofs-fp-px">{r.px}</td>
            <td className="ofs-fp-ask">{r.ask}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <p className="ofs-fp-note">Buyers lifting. Price not moving.</p>
  </div>
);

export default FootprintCard;
