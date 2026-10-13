import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import useReveal from '../hooks/useReveal';
import { OFS_LIVE, DISCORD } from '../config/offers';
import { trackCTAClick } from '../utils/analytics';
import EmbeddedCheckout from '../components/shared/WhopCheckout';
import {
  RoomClips, MemberWall, ResultsNote, UnlockGrid, DecisionFlow, FaqList,
  TrialButton, DiscordButton, TrialBar, useTrialBar, scrollToCheckout,
} from '../components/live/LiveRoom';

/* Direct door into the Live Room — the page the Instagram bio links to.
   The visitor has not applied for anything; they want to trade live with
   Edgar. So this is an invitation written in his voice, with two ways in:
     1. the free trial of OFS Live (primary — embedded checkout on this page)
     2. the free Discord (secondary — for people not ready for a trial)
   The applicant-facing version of this offer is pages/NotReadyYet.jsx; both
   are assembled from components/live. No income claims anywhere on the page. */

const SOURCE = 'Live page';
const MICRO = OFS_LIVE.trialMicro;
// The benefit-led label only reads well with a multi-day trial.
const TRIAL_CTA = OFS_LIVE.trialDays > 1
  ? `Trade with me free for ${OFS_LIVE.trialLength}`
  : 'Start my free trial';
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const TRIAL_GETS = [
  `${OFS_LIVE.sessionsPerWeek} live sessions a week`,
  'Real-time commentary through the week',
  'Weekly group classes',
  'The OFS Foundations curriculum',
  'The private member community',
];

const FAQS = [
  ['What do I get during the free trial?',
   `Full OFS Live access for ${OFS_LIVE.trialLength}: the Live Room sessions that run while you are in, the real-time commentary, the weekly group classes, the Foundations curriculum and the member community.`],
  ['When are the live sessions?',
   `${OFS_LIVE.sessionsPerWeekWords} each week during US market hours, announced in the community ahead of time. Sessions follow what the market is actually doing, so the week shapes the schedule. Starting early in the week gives your trial the most live time.`],
  ['Is this a signals room?',
   'No. You will see me trade and hear my thinking live, but the purpose is to understand the decision process, not blindly copy entries. OFS Live is built around developing your own read of context, order flow and execution.'],
  ['What happens when the trial ends?',
   `Nothing is charged during the ${OFS_LIVE.trialNote}. After that it is $74.99 every 30 days through Whop, renewing automatically until you cancel. You can cancel yourself inside Whop at any time; cancel before the trial ends and you are not charged.`],
  ['What is the difference between the free Discord and OFS Live?',
   'The free Discord is the open community server: a place to look around, ask questions and meet the traders here. OFS Live is the membership — the Live Room sessions, the commentary, the weekly classes and the Foundations curriculum.'],
  ['Is OFS Live the same as the private 1:1 mentorship?',
   'No. OFS Live is the $75/month membership. The private mentorship is separate and by application: direct 1:1 work with me on the strategy you already trade.'],
];

const Tick = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
);
const Dash = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden="true"><line x1="6" y1="12" x2="18" y2="12" /></svg>
);

const Live = () => {
  const scope = useReveal();
  const barUp = useTrialBar();

  useEffect(() => {
    document.title = 'OFS Live Room | Trade live with Edgar';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="ofs-has-mobilebar" style={{ background: '#070808', minHeight: '100vh' }}>
      <Header ctaLabel="Free trial" onCta={scrollToCheckout} ctaEvent={`${SOURCE} · nav`} />

      <main ref={scope}>
        {/* ── Hero: the invitation + both ways in ─────────── */}
        <section className="ofs-section t-dark" style={{ paddingTop: 'calc(var(--nav-h) + clamp(26px,5vw,64px))', paddingBottom: 'clamp(28px,3.5vw,48px)' }} aria-labelledby="live-h">
          <div className="ofs-wrap">
            <div style={{ maxWidth: '62ch' }}>
              <p className="ofs-label reveal" style={{ display: 'inline-flex', alignItems: 'center', gap: 9 }}>
                <span aria-hidden="true" style={{ width: 5, height: 5, borderRadius: 999, background: 'var(--accent)', display: 'inline-block' }} />
                OFS Live Room
              </p>

              <h1 id="live-h" className="reveal" style={{ marginTop: 18, maxWidth: '14ch', fontSize: 'clamp(33px,3.4vw + 1rem,64px)' }}>
                Trade live with me, <span className="ofs-em">{OFS_LIVE.sessionsPerWeek} times a week</span>.
              </h1>

              <p className="ofs-lead reveal" style={{ marginTop: 20, maxWidth: '50ch' }}>
                Sit in while I read order flow and trade futures in real time.
                You hear the read before the trade: what I&rsquo;m waiting for,
                why I take it, why I pass.
              </p>

              <div className="ofs-hero-cta reveal" style={{ marginTop: 30 }}>
                <TrialButton where="hero-trial" source={SOURCE} label={TRIAL_CTA} block />
                <DiscordButton where="hero-discord" source={SOURCE} />
              </div>

              <p className="ofs-fine reveal" style={{ marginTop: 14 }}>{MICRO}</p>
              <p className="ofs-fine reveal" style={{ marginTop: 4 }}>
                Free Discord: {DISCORD.memberCount} traders, no card needed.
              </p>

              <figure className="ofs-hero-quote reveal">
                <blockquote>
                  &ldquo;This is what happens when there is a good mentor with full transparency.&rdquo;
                </blockquote>
                <figcaption>ronaldopekel, in the live room</figcaption>
              </figure>
            </div>
          </div>
          <div id="live-hero-end" aria-hidden="true" style={{ height: 1 }} />
        </section>

        {/* ── Inside the room (clips) ─────────────────────── */}
        <section className="ofs-section t-dark ofs-section--tight" style={{ paddingTop: 'clamp(28px,3.5vw,48px)' }} aria-labelledby="room-h">
          <div className="ofs-wrap">
            <div className="reveal" style={{ maxWidth: '50ch' }}>
              <p className="ofs-label ofs-label--accent">Inside the live room</p>
              <h2 id="room-h" style={{ marginTop: 12, fontSize: 'clamp(22px,1.4vw + 1rem,30px)' }}>
                This is what a session <span className="ofs-em">looks like</span>.
              </h2>
            </div>
            <RoomClips />
          </div>
        </section>

        {/* ── What you get each week ──────────────────────── */}
        <section className="ofs-section t-light" aria-labelledby="unlock-h">
          <div className="ofs-wrap">
            <div style={{ maxWidth: '50ch' }}>
              <p className="ofs-label reveal">What you get</p>
              <h2 id="unlock-h" className="reveal" style={{ marginTop: 16 }}>
                Learn it. Then <span className="ofs-em">watch it happen live</span>.
              </h2>
              <p className="ofs-lead reveal" style={{ marginTop: 18 }}>
                Foundations teaches you the language. The Live Room lets you
                watch me apply it while the outcome is still unknown.
              </p>
            </div>

            <UnlockGrid firstPerson />

            <div className="ofs-cta-row reveal">
              <TrialButton where="included-trial" source={SOURCE} label={TRIAL_CTA} />
              <p className="ofs-fine">{MICRO}</p>
            </div>
          </div>
        </section>

        {/* ── Member screenshots ──────────────────────────── */}
        <section className="ofs-section t-dark ofs-section--tint" aria-labelledby="fb-h">
          <div className="ofs-wrap">
            <div style={{ maxWidth: '54ch' }}>
              <p className="ofs-label reveal">From the live room</p>
              <h2 id="fb-h" className="reveal" style={{ marginTop: 16 }}>
                Real members. <span className="ofs-em">Real trades, called live.</span>
              </h2>
              <p className="ofs-lead reveal" style={{ marginTop: 20 }}>
                Unedited screenshots posted by members in the room — the trade,
                the read behind it, and the transparency that comes with it.
              </p>
            </div>

            <MemberWall />
            <ResultsNote />
          </div>
        </section>

        {/* ── Two ways in ─────────────────────────────────── */}
        <section className="ofs-section t-light" aria-labelledby="ways-h">
          <div className="ofs-wrap">
            <div style={{ maxWidth: '50ch' }}>
              <p className="ofs-label reveal">Two ways in</p>
              <h2 id="ways-h" className="reveal" style={{ marginTop: 16 }}>
                Start free, <span className="ofs-em">either way</span>.
              </h2>
              <p className="ofs-lead reveal" style={{ marginTop: 18 }}>
                Take the trial if you want to be in the room for the next
                session. Join the Discord if you would rather look around first.
              </p>
            </div>

            <div className="ofs-two-col">
              <article className="ofs-card ofs-way ofs-way--featured reveal" aria-labelledby="way-live">
                <p className="ofs-label ofs-label--accent">OFS Live · {OFS_LIVE.trialLength} free</p>
                <h3 id="way-live">The Live Room, in full.</h3>
                <ul className="ofs-fit-list">
                  {TRIAL_GETS.map((t) => (
                    <li key={t} className="ofs-fit-row ofs-fit-row--yes">
                      <span className="ofs-fit-mark" aria-hidden="true"><Tick /></span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
                <div className="ofs-way-foot">
                  <TrialButton where="ways-trial" source={SOURCE} block />
                  <p className="ofs-fine">{OFS_LIVE.renewalNote}</p>
                </div>
              </article>

              <article className="ofs-card ofs-way reveal" data-reveal-delay="90" aria-labelledby="way-discord">
                <p className="ofs-label">Free Discord</p>
                <h3 id="way-discord">Look around first.</h3>
                <ul className="ofs-fit-list">
                  <li className="ofs-fit-row ofs-fit-row--yes">
                    <span className="ofs-fit-mark" aria-hidden="true"><Tick /></span>
                    <span>The OFS community server, with {DISCORD.memberCount} traders</span>
                  </li>
                  <li className="ofs-fit-row ofs-fit-row--yes">
                    <span className="ofs-fit-mark" aria-hidden="true"><Tick /></span>
                    <span>Free to join, no card needed</span>
                  </li>
                  <li className="ofs-fit-row ofs-fit-row--no">
                    <span className="ofs-fit-mark" aria-hidden="true"><Dash /></span>
                    <span>Live Room sessions, classes and Foundations are part of OFS Live</span>
                  </li>
                </ul>
                <div className="ofs-way-foot">
                  <DiscordButton where="ways-discord" source={SOURCE} />
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ── Checkout ────────────────────────────────────── */}
        <section id="checkout" className="ofs-section t-blue" aria-labelledby="join-h">
          <div className="ofs-wrap" style={{ maxWidth: 760, textAlign: 'center' }}>
            <p className="ofs-label reveal" style={{ marginBottom: 18 }}>Start free</p>
            <h2 id="join-h" className="reveal" style={{ maxWidth: '18ch', marginInline: 'auto' }}>
              {cap(OFS_LIVE.trialLengthWords)} in the room. <span className="ofs-em">Free.</span>
            </h2>
            <p className="ofs-lead reveal" style={{ marginTop: 22, maxWidth: '54ch', marginInline: 'auto' }}>
              Join the next live session, open Foundations, sit in on a class.
              Then decide from experience whether you want to stay.
            </p>
            <div className="reveal ofs-checkout-card" style={{ marginTop: 34 }}>
              <EmbeddedCheckout />
            </div>
            <p className="ofs-fine reveal" style={{ marginTop: 16 }}>{MICRO}</p>
            <p className="ofs-fine reveal" style={{ marginTop: 10 }}>
              Not ready for the trial?{' '}
              <a
                href={DISCORD.inviteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ofs-inline-link"
                onClick={() => trackCTAClick(`${SOURCE} · checkout-discord`)}
              >
                Join the free Discord instead
              </a>.
            </p>
          </div>
        </section>

        {/* ── The point of the room ───────────────────────── */}
        <section className="ofs-section t-dark" aria-labelledby="point-h">
          <div className="ofs-wrap ofs-split">
            <div className="ofs-split-aside">
              <p className="ofs-label reveal">The point of the room</p>
              <h2 id="point-h" className="reveal" style={{ marginTop: 16 }}>
                Don&rsquo;t just watch the trade. <span className="ofs-em">Understand the decision.</span>
              </h2>
              <p className="ofs-lead reveal" style={{ marginTop: 18, maxWidth: '46ch' }}>
                OFS Live is not built around copying entries. The value is
                seeing how I read context, interpret participation and adjust
                decisions while the market is still developing.
              </p>
            </div>

            <div className="reveal">
              <DecisionFlow />
            </div>
          </div>
        </section>

        {/* ── FAQ ─────────────────────────────────────────── */}
        <section className="ofs-section t-light ofs-section--tint" aria-labelledby="lfaq-h">
          <div className="ofs-wrap ofs-split">
            <div className="ofs-split-aside">
              <p className="ofs-label reveal">Before you join</p>
              <h2 id="lfaq-h" className="reveal" style={{ marginTop: 16 }}>The practical details.</h2>
            </div>
            <div>
              <FaqList items={FAQS} />
            </div>
          </div>
        </section>

        {/* ── Quiet bridge to the 1:1 program ─────────────── */}
        <section className="ofs-section t-dark ofs-bridge" aria-labelledby="mentor-h">
          <div className="ofs-wrap ofs-bridge-in">
            <div className="reveal">
              <p className="ofs-label">Private mentorship</p>
              <h2 id="mentor-h" style={{ marginTop: 12, fontSize: 'clamp(22px,1.4vw + 1rem,30px)' }}>
                Want me working on your trading directly?
              </h2>
              <p className="ofs-fine" style={{ marginTop: 10, fontSize: 15 }}>
                The 1:1 program is separate, and by application.
              </p>
            </div>
            <Link
              to="/"
              className="ofs-btn-ghost reveal"
              onClick={() => trackCTAClick(`${SOURCE} · mentorship`)}
            >
              See the 1:1 mentorship <span className="ofs-arrow" aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </section>
      </main>

      <Footer />

      <TrialBar show={barUp} source={SOURCE} />
    </div>
  );
};

export default Live;
