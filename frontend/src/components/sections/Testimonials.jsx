import React from 'react';
import useReveal from '../../hooks/useReveal';

/* Social proof, immediately after the hero — real, unedited screenshots posted
   by members in the OFS community: payouts, funded accounts, daily results and
   a note on the teaching. Nothing fabricated; captions only label what the
   screenshot already shows. Ordered strongest-first, packed as a masonry wall
   so mixed aspect ratios sit tight without stretching. */
const WINS = [
  {
    src: '/testimonials/bjr-33k.png',
    alt: 'bjr.trader — a +$33,173.70 day across multiple prop accounts, with Edgar replying "proud of you".',
    cap: 'bjr.trader — a +$33,173 day, close to max payout across four firms.',
  },
  {
    src: '/testimonials/keshav-payout.png',
    alt: 'Lucid Trading payout certificate awarded to Keshav for $1,077 on a funded account.',
    cap: 'Keshav — $1,077 payout on a funded Lucid account.',
  },
  {
    src: '/testimonials/dm-orderflow.png',
    alt: 'Member message: first successful trade using the order-flow methods taught, praising the clear teaching.',
    cap: '“My first successful trade using the order-flow methods you taught.”',
  },
  {
    src: '/testimonials/nerve16-accounts.png',
    alt: 'Nerve16 — two funded accounts both closed green the same day, $1,491.50 and $1,579.50.',
    cap: 'Nerve16 — two funded accounts closed green, same day.',
  },
  {
    src: '/testimonials/vinicius-day.png',
    alt: 'Vinicius Miguel — a $1,508 daily P/L on Blusky.',
    cap: 'Vinicius — a $1,508 day on Blusky.',
  },
  {
    src: '/testimonials/suhail-month.png',
    alt: 'Suhail — a green trading month on the Lucid dashboard; dE_SK reports $3.3k on the week.',
    cap: 'Suhail — a green month on Lucid · dE_SK, $3.3k on the week.',
  },
  {
    src: '/testimonials/robin-day.png',
    alt: 'Robin W — done for the day, up $1.3k.',
    cap: 'Robin W — $1.3k, done for the day.',
  },
];

const Testimonials = () => {
  const scope = useReveal();

  return (
    <section id="results" ref={scope} className="ofs-section ofs-section--tight t-dark" aria-labelledby="results-h">
      <div className="ofs-wrap">
        <div style={{ maxWidth: '54ch' }}>
          <p className="ofs-label reveal">Student results</p>
          <h2 id="results-h" className="reveal" style={{ marginTop: 16 }}>
            Real education. <span className="ofs-em">Real results.</span>
          </h2>
          <p className="ofs-lead reveal" style={{ marginTop: 20 }}>
            Unedited screenshots from the OFS community — payouts, funded accounts
            and daily results from traders using the framework.
          </p>
        </div>

        <div className="ofs-wall reveal">
          {WINS.map((w) => (
            <figure key={w.src} className="ofs-wall-item">
              <img src={w.src} alt={w.alt} loading="lazy" />
              <figcaption className="ofs-wall-cap">
                <span className="ofs-wall-tag" aria-hidden="true">
                  <span className="ofs-wall-dot" /> OFS community
                </span>
                <p>{w.cap}</p>
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="ofs-fine reveal" style={{ marginTop: 28, maxWidth: '66ch' }}>
          Individual results vary and are not typical. Trading futures involves
          substantial risk of loss. Nothing here is a projection of what any
          particular trader should expect.
        </p>
      </div>
    </section>
  );
};

export default Testimonials;
