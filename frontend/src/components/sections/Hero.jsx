import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MotifField } from '../shared/Motif';
import { trackCTAClick, trackVideoPlay } from '../../utils/analytics';
import { TEACHING_CLIPS, TeachingClip } from './Teaching';

/* The methods this program is built to sit on top of. This is the fastest
   ICP signal on the page — a trader scanning for two seconds should find
   their own vocabulary here. */
const METHODS = ['ICT', 'SMC', 'Liquidity', 'Supply & demand', 'FVGs', 'Break & retest', 'Price action'];

/* The single-video VSL (Bunny Stream). Temporarily hidden while Edgar records a
   new one — flip SHOW_LEGACY_VSL to true to bring it back. In the meantime the
   hero shows the three short "how I explain the market" clips instead. */
const SHOW_LEGACY_VSL = false;
const HERO_VIDEO = 'https://player.mediadelivery.net/embed/738150/032f9b3d-98ef-4bb3-8f07-7c5d8fd924f3';
const HERO_VIDEO_PLAY = `${HERO_VIDEO}?autoplay=true&loop=false&muted=false&preload=true&responsive=true`;

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
};

const Hero = () => {
  const navigate = useNavigate();
  const [playing, setPlaying] = useState(false);

  return (
    <section id="hero" className="ofs-hero ofs-hero--vsl t-dark" aria-labelledby="hero-h1">
      <MotifField />

      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'radial-gradient(80% 62% at 50% 34%, rgba(7,8,8,0.90) 0%, rgba(7,8,8,0.74) 52%, rgba(7,8,8,0) 100%)',
      }} />

      <div className="ofs-hero-in ofs-hero-in--vsl">
        <div className="ofs-hero-copy">
          <p className="ofs-label ofs-hero-a" style={{ display: 'inline-flex', alignItems: 'center', gap: 9 }}>
            <span aria-hidden="true" style={{
              width: 5, height: 5, borderRadius: 999, background: 'var(--accent)', display: 'inline-block',
            }} />
            OFS Private Mentorship&nbsp;&nbsp;·&nbsp;&nbsp;Limited intake
          </p>

          <h1 id="hero-h1" className="ofs-hero-b">
            Work 1:1 with Edgar to add Order Flow to{' '}
            <span className="ofs-em">the strategy you already trade</span>.
          </h1>

          <p className="ofs-lead ofs-hero-c">
            For futures traders already using ICT, SMC, liquidity, supply &amp; demand,
            FVGs, break &amp; retest or price action — who want to use order flow to
            validate setups, read participation, and make more structured execution
            decisions.
          </p>

          <ul className="ofs-methods ofs-hero-d" aria-label="Approaches this works alongside">
            {METHODS.map((m) => <li key={m}>{m}</li>)}
          </ul>
        </div>

        {/* Temporary VSL: three short clips of how Edgar explains the market.
            The single-video VSL below is kept in code for when the new
            recording is ready (SHOW_LEGACY_VSL). */}
        <div className="ofs-hero-video ofs-hero-e">
          <p className="ofs-label ofs-label--accent" style={{ marginBottom: 16 }}>See how I explain the market</p>
          <ul className="ofs-teach-grid ofs-teach-grid--hero">
            {TEACHING_CLIPS.map((clip, i) => <TeachingClip key={clip.id} clip={clip} autoplay={i === 0} />)}
          </ul>
        </div>

        {SHOW_LEGACY_VSL && (
          <div className="ofs-hero-video ofs-hero-e">
            <p className="ofs-label ofs-label--accent" style={{ marginBottom: 14 }}>Before you apply</p>
            <div className="ofs-video-frame ofs-vsl-frame">
              {playing ? (
                <iframe
                  src={HERO_VIDEO_PLAY}
                  title="A quick message from Edgar — Order Flow School private mentorship"
                  allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen;"
                  loading="lazy" allowFullScreen
                />
              ) : (
                <button
                  type="button"
                  className="ofs-vsl-ph"
                  onClick={() => { setPlaying(true); trackVideoPlay('vsl'); }}
                  aria-label="Play: a quick message from Edgar"
                >
                  <span className="ofs-vsl-play" aria-hidden="true">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                  </span>
                  <span className="ofs-vsl-ph-title">A quick message from Edgar.</span>
                  <span className="ofs-fine" style={{ maxWidth: '48ch' }}>
                    Who OFS is for, how the mentorship works, and what I actually want
                    to help you improve.
                  </span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Primary action, immediately under the video */}
        <div className="ofs-hero-apply ofs-hero-f">
          <div className="ofs-hero-cta">
            <button
              className="ofs-btn"
              data-testid="hero-cta"
              onClick={() => { trackCTAClick('hero_apply'); navigate('/apply'); }}
            >
              Apply to work with Edgar <span className="ofs-arrow" aria-hidden="true">&rarr;</span>
            </button>
            <button
              className="ofs-btn-ghost"
              data-testid="hero-cta-secondary"
              onClick={() => { trackCTAClick('hero_included'); scrollTo('included'); }}
            >
              What&rsquo;s included <span aria-hidden="true">&darr;</span>
            </button>
          </div>

          <p className="ofs-scarcity" role="note">
            <span className="ofs-scarcity-dot" aria-hidden="true" />
            Edgar mentors a limited number of traders 1:1 — only a handful of application slots open each month.
          </p>

          <p className="ofs-fine" style={{ marginTop: 14 }}>
            Applications reviewed individually · Existing trading foundation required · Not a signals service
          </p>
        </div>
      </div>

      <div id="hero-sentinel" aria-hidden="true" style={{ position: 'absolute', bottom: 0, height: 1, width: '100%' }} />
    </section>
  );
};

export default Hero;
