import React, { useEffect } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import useReveal from '../hooks/useReveal';
import { OFS_LIVE } from '../config/offers';
import EmbeddedCheckout from '../components/shared/WhopCheckout';
import {
  LIVE_INCLUDES, RoomClips, MemberWall, ResultsNote, UnlockGrid, DecisionFlow,
  FaqList, TrialButton, TrialBar, useTrialBar,
} from '../components/live/LiveRoom';

/* Post-application page for applicants routed to OFS Live — a product they
   QUALIFIED for. Order: hero → live-room preview → member testimonials →
   checkout → what's included → the point of the room → FAQ. Every "Start my
   free trial" button scrolls to the checkout, and a sticky mobile button keeps
   it one tap away.

   The direct-traffic version of this page (different angle, adds the free
   Discord) is pages/Live.jsx; both are assembled from components/live. */

const MICRO = OFS_LIVE.trialMicro;

const FAQS = [
  ['What is included in OFS Live?',
   `The Live Room with ${OFS_LIVE.sessionsPerWeek} sessions a week, live voice or written commentary, weekly group classes, the full OFS Foundations curriculum and the private community — all on one membership.`],
  ['When are the live sessions?',
   `${OFS_LIVE.sessionsPerWeekWords} each week during US market hours, announced in the community ahead of time. Sessions follow what the market is actually doing, so the week shapes the schedule.`],
  ['Is this a signals room?',
   'No. You will see Edgar trade and explain his thinking live, but the purpose is to understand the decision process, not blindly copy entries. OFS Live is built around developing your own read of context, order flow and execution.'],
  ['How does the free trial and membership work?',
   `You start with a ${OFS_LIVE.trialNote}. After that it is $74.99 every 30 days through Whop, renewing automatically until you cancel. You can cancel yourself inside Whop at any time, and access runs to the end of the period you have paid for.`],
  ['Is OFS Live the same as the private 1:1 program?',
   'No. OFS Live is the $75/month membership that includes the Live Room, Foundations, group classes and private community. The private OFS program is a separate application-only mentorship with deeper curriculum and direct 1:1 development with Edgar.'],
  ['Can I apply for private mentorship later?',
   'Yes. Work through Foundations, put screen time into the live room, and reapply when the framework is something you are using rather than reading about — a lot of the strongest applications are second applications.'],
];

const NotReadyYet = () => {
  const scope = useReveal();
  const barUp = useTrialBar();

  useEffect(() => {
    document.title = 'OFS Live | Order Flow School';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="ofs-has-mobilebar" style={{ background: '#070808', minHeight: '100vh' }}>
      <Header ctaLabel={null} />

      <main ref={scope}>
        {/* ── Qualification hero ─────────────────────────── */}
        <section className="ofs-section t-dark" style={{ paddingTop: 'calc(var(--nav-h) + 72px)', paddingBottom: 'clamp(28px,3.5vw,48px)' }} aria-labelledby="live-h">
          <div className="ofs-wrap">
            <div style={{ maxWidth: '62ch' }}>
              <p className="ofs-label reveal" style={{ display: 'inline-flex', alignItems: 'center', gap: 9 }}>
                <span aria-hidden="true" style={{ width: 5, height: 5, borderRadius: 999, background: 'var(--accent)', display: 'inline-block' }} />
                Application reviewed
              </p>

              <h1 id="live-h" className="reveal" style={{ marginTop: 20, maxWidth: '15ch', fontSize: 'clamp(30px,3.4vw + 1rem,62px)' }}>
                You qualified for <span className="ofs-em">OFS Live</span>.
              </h1>

              <p className="ofs-lead reveal" style={{ marginTop: 22, maxWidth: '52ch' }}>
                Based on your application, OFS Live is the OFS membership that best
                fits where you are right now. Watch Edgar read and trade the market
                live, follow the reasoning behind the decisions, and build the
                foundation underneath it through Foundations and weekly classes.
              </p>

              <ul className="ofs-methods reveal" aria-label="What OFS Live includes" style={{ marginTop: 24 }}>
                {LIVE_INCLUDES.map((m) => <li key={m}>{m}</li>)}
              </ul>

              <div className="reveal" style={{ marginTop: 32 }}>
                <TrialButton where="hero" />
                <p className="ofs-fine" style={{ marginTop: 14 }}>{MICRO}</p>
              </div>
            </div>
          </div>
          <div id="live-hero-end" aria-hidden="true" style={{ height: 1 }} />
        </section>

        {/* ── See inside the live room (videos) ──────────── */}
        <section className="ofs-section t-dark ofs-section--tight" style={{ paddingTop: 'clamp(28px,3.5vw,48px)', paddingBottom: 'clamp(28px,3.5vw,48px)' }} aria-labelledby="room-h">
          <div className="ofs-wrap">
            <div className="reveal" style={{ maxWidth: '50ch' }}>
              <p className="ofs-label ofs-label--accent">See inside the live room</p>
              <h2 id="room-h" style={{ marginTop: 12, fontSize: 'clamp(22px,1.4vw + 1rem,30px)' }}>
                A look at what a session <span className="ofs-em">actually feels like</span>.
              </h2>
            </div>
            <RoomClips />
          </div>
        </section>

        {/* ── Member testimonials (real screenshots) ─────── */}
        <section className="ofs-section t-dark ofs-section--tint" style={{ paddingTop: 'clamp(28px,3.5vw,48px)' }} aria-labelledby="fb-h">
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

        {/* ── Checkout (under the testimonials) ──────────── */}
        <section id="checkout" className="ofs-section t-blue" aria-labelledby="join-h">
          <div className="ofs-wrap" style={{ maxWidth: 760, textAlign: 'center' }}>
            <p className="ofs-label reveal" style={{ marginBottom: 18 }}>Your access is ready</p>
            <h2 id="join-h" className="reveal" style={{ maxWidth: '18ch', marginInline: 'auto' }}>
              Start with <span className="ofs-em">{OFS_LIVE.trialLengthWords} free</span>.
            </h2>
            <p className="ofs-lead reveal" style={{ marginTop: 22, maxWidth: '54ch', marginInline: 'auto' }}>
              Get inside the room, watch how Edgar reads the market, explore
              Foundations, and decide from experience whether you want to stay.
            </p>
            <div className="reveal ofs-checkout-card" style={{ marginTop: 34 }}>
              <EmbeddedCheckout />
            </div>
            <p className="ofs-fine reveal" style={{ marginTop: 16 }}>{MICRO}</p>
          </div>
        </section>

        {/* ── What's included ────────────────────────────── */}
        <section className="ofs-section t-light" aria-labelledby="unlock-h">
          <div className="ofs-wrap">
            <div style={{ maxWidth: '50ch' }}>
              <p className="ofs-label reveal">Your OFS Live access</p>
              <h2 id="unlock-h" className="reveal" style={{ marginTop: 16 }}>
                Learn it. Then <span className="ofs-em">watch it happen live</span>.
              </h2>
              <p className="ofs-lead reveal" style={{ marginTop: 18 }}>
                Foundations teaches you the language. The Live Room lets you see
                Edgar apply it while the outcome is still unknown.
              </p>
            </div>

            <UnlockGrid />
          </div>
        </section>

        {/* ── The point of the room (last content before FAQ) ── */}
        <section className="ofs-section t-dark" aria-labelledby="point-h">
          <div className="ofs-wrap ofs-split">
            <div className="ofs-split-aside">
              <p className="ofs-label reveal">The point of the room</p>
              <h2 id="point-h" className="reveal" style={{ marginTop: 16 }}>
                Don't just watch the trade. <span className="ofs-em">Understand the decision.</span>
              </h2>
              <p className="ofs-lead reveal" style={{ marginTop: 18, maxWidth: '46ch' }}>
                OFS Live is not built around copying entries. The value is seeing
                how Edgar reads context, interprets participation and adjusts
                decisions while the market is still developing.
              </p>
            </div>

            <div className="reveal">
              <DecisionFlow />
            </div>
          </div>
        </section>

        {/* ── FAQ (the very last section) ────────────────── */}
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
      </main>

      <Footer />

      <TrialBar show={barUp} />
    </div>
  );
};

export default NotReadyYet;
