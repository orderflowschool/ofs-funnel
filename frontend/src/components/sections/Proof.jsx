import React from 'react';
import { useNavigate } from 'react-router-dom';
import useReveal from '../../hooks/useReveal';
import { testimonials } from '../../data/testimonials';
import { trackCTAClick } from '../../utils/analytics';

/* Proof is framed as evidence — the page is building a case and this is where
   it's argued, in order of weight:
     1. Process proof — the decision explained before the outcome exists.
        Drop a Vimeo id into PROCESS_VIDEO.
     2. Student results — the existing student videos. No invented quotes and
        no fabricated numbers: the video is the proof, not a line we typed.
     3. Edgar's own — he trades what he teaches. Drop his own content in via
        FOUNDER_VIDEO. */
const PROCESS_VIDEO = null;   // e.g. 'https://player.vimeo.com/video/XXXXXXXX'
const FOUNDER_VIDEO = null;   // e.g. 'https://player.vimeo.com/video/XXXXXXXX'

const Proof = () => {
  const navigate = useNavigate();
  const scope = useReveal();
  const videos = testimonials.filter((t) => t.type === 'video');

  return (
    <section id="proof" ref={scope} className="ofs-section t-dark" aria-labelledby="proof-h">
      <div className="ofs-wrap">
        <div style={{ maxWidth: '54ch' }}>
          <p className="ofs-label reveal">The evidence</p>
          <h2 id="proof-h" className="reveal" style={{ marginTop: 16 }}>
            Watch the decision happen <span className="ofs-em">before the outcome exists</span>.
          </h2>
          <p className="ofs-lead reveal" style={{ marginTop: 20 }}>
            Anyone can explain a trade afterwards. The only proof worth much is
            the thesis stated first, the behaviour it required, and what the
            market actually did next.
          </p>
        </div>

        {/* 01 — the process, called in advance */}
        <div className="reveal ofs-exhibit" style={{ marginTop: 'clamp(40px,5vw,64px)' }}>
          <div className="ofs-exhibit-head">
            <span className="ofs-label ofs-label--accent">01</span>
            <span className="ofs-label">The process, called live</span>
          </div>

          {PROCESS_VIDEO ? (
            <div className="ofs-video-frame">
              <iframe
                src={PROCESS_VIDEO}
                title="Order Flow School — the decision process, called in advance"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                referrerPolicy="origin" loading="lazy" allowFullScreen
              />
            </div>
          ) : (
            <div className="ofs-placeholder">
              <p className="ofs-label ofs-label--accent">Process proof — to add</p>
              <p style={{
                marginTop: 14, maxWidth: '54ch', marginLeft: 'auto', marginRight: 'auto',
                fontFamily: 'var(--font-display)', fontWeight: 600,
                fontSize: 'clamp(18px,.9vw + 1rem,23px)', letterSpacing: '-0.018em',
                lineHeight: 1.3, color: 'var(--ink)',
              }}>
                One recorded session: the thesis, the behaviour it needed, the
                reaction, and the decision — all stated before the move.
              </p>
              <p className="ofs-fine" style={{ marginTop: 14, maxWidth: '52ch', marginLeft: 'auto', marginRight: 'auto' }}>
                The strongest asset the page can carry. Drop a video id into{' '}
                <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>PROCESS_VIDEO</code> and
                this frame becomes the player.
              </p>
            </div>
          )}
        </div>

        {/* 02 — student results / testimonials */}
        <div className="reveal ofs-exhibit-head" style={{ marginTop: 'clamp(52px,6vw,88px)' }}>
          <span className="ofs-label ofs-label--accent">02</span>
          <span className="ofs-label">Student results / testimonials</span>
        </div>

        <ul className="ofs-proof-grid">
          {videos.map((t, i) => (
            <li key={t.id} className="ofs-card ofs-card--hover reveal" data-reveal-delay={(i % 2) * 90}>
              <div className="ofs-proof-video">
                <iframe
                  src={t.videoUrl}
                  title={`${t.name} — Order Flow School student`}
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                  referrerPolicy="origin" loading="lazy" allowFullScreen
                  data-testid={`video-testimonial-${t.id}`}
                />
              </div>
              <div className="ofs-proof-body">
                <div className="ofs-proof-tag">
                  <span className="ofs-label ofs-label--accent">{String(i + 1).padStart(2, '0')}</span>
                  <span className="ofs-fine">Results not typical</span>
                </div>
                <p className="ofs-proof-name">{t.name}</p>
                <p className="ofs-label" style={{ marginTop: 8, letterSpacing: '.11em' }}>{t.claim}</p>
              </div>
            </li>
          ))}
        </ul>

        {/* 03 — Edgar's own content: he trades what he teaches */}
        <div className="reveal ofs-exhibit-head" style={{ marginTop: 'clamp(52px,6vw,88px)' }}>
          <span className="ofs-label ofs-label--accent">03</span>
          <span className="ofs-label">From Edgar himself</span>
        </div>

        <div className="ofs-founder-proof reveal">
          {FOUNDER_VIDEO ? (
            <div className="ofs-video-frame">
              <iframe
                src={FOUNDER_VIDEO}
                title="Edgar Alvarez — trading the framework live"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                referrerPolicy="origin" loading="lazy" allowFullScreen
              />
            </div>
          ) : (
            <div className="ofs-placeholder">
              <p className="ofs-label ofs-label--accent">Edgar's own — to add</p>
              <p style={{
                marginTop: 14, maxWidth: '52ch', marginLeft: 'auto', marginRight: 'auto',
                fontFamily: 'var(--font-display)', fontWeight: 600,
                fontSize: 'clamp(18px,.9vw + 1rem,23px)', letterSpacing: '-0.018em',
                lineHeight: 1.3, color: 'var(--ink)',
              }}>
                I don't just teach the framework — I trade it.
              </p>
              <p className="ofs-fine" style={{ marginTop: 14, maxWidth: '52ch', marginLeft: 'auto', marginRight: 'auto' }}>
                Edgar's own recorded sessions and results drop in here. Add a
                video id to{' '}
                <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>FOUNDER_VIDEO</code>.
              </p>
            </div>
          )}

          <blockquote className="ofs-founder-quote" style={{ marginTop: 'clamp(24px,3vw,34px)' }}>
            “I already had setups. Order flow gave me{' '}
            <span className="ofs-em">more information</span> — not a decision.
            The framework is what turned that information into one.”
          </blockquote>
          <p className="ofs-label" style={{ marginTop: 18 }}>
            Edgar Alvarez — Founder, Order Flow School
          </p>
        </div>

        <div className="reveal" style={{ marginTop: 'clamp(44px,5vw,64px)' }}>
          <button
            className="ofs-btn ofs-btn--auto"
            data-testid="proof-cta"
            onClick={() => { trackCTAClick('Proof · Apply'); navigate('/apply'); }}
          >
            Apply to work with Edgar <span className="ofs-arrow" aria-hidden="true">&rarr;</span>
          </button>
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

export default Proof;
