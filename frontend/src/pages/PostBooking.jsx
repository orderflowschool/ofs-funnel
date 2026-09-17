import React, { useEffect } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import useReveal from '../hooks/useReveal';

/* Founder pre-call video. Drop a Vimeo url in and the frame becomes a player —
   this is the single biggest lever on show-up rate. */
const PRE_CALL_VIDEO = 'https://player.vimeo.com/video/1175230814?badge=0&autopause=0&player_id=0';

const BRING = [
  ['01', 'Watch the video above', 'Three minutes. It sets up what the conversation is actually for.'],
  ['02', 'Have one recent session open', 'A good one or a bad one — either gives us something concrete to look at.'],
  ['03', 'Be ready to explain your setup', 'In your own words, the way you would describe it to another trader.'],
  ['04', 'Know where it breaks down', 'The moment in your process where the decision usually goes wrong.'],
];

const PostBooking = () => {
  const scope = useReveal();

  useEffect(() => {
    document.title = 'Confirmed | Order Flow School';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ background: '#070808', minHeight: '100vh' }}>
      <Header ctaLabel={null} />

      <main ref={scope}>
        <section className="ofs-section t-dark" style={{ paddingTop: 'calc(var(--nav-h) + 72px)' }} aria-labelledby="pb-h">
          <div className="ofs-wrap">
            <p className="ofs-label reveal" style={{ display: 'inline-flex', alignItems: 'center', gap: 9 }}>
              <span aria-hidden="true" style={{ width: 5, height: 5, borderRadius: 999, background: 'var(--accent)', display: 'inline-block' }} />
              Confirmed
            </p>
            <h1 id="pb-h" className="reveal" style={{ marginTop: 20, maxWidth: '16ch', fontSize: 'clamp(30px,3.2vw + 1rem,60px)' }}>
              Your time is <span className="ofs-em">booked</span>.
            </h1>
            <p className="ofs-lead reveal" style={{ marginTop: 22, maxWidth: '52ch' }}>
              Details and a calendar invite are on their way to your email, with
              a reminder before we speak. One thing to do before then.
            </p>
          </div>
        </section>

        <section className="ofs-section t-light" aria-labelledby="pbv-h">
          <div className="ofs-wrap ofs-wrap--narrow" style={{ textAlign: 'center' }}>
            <p className="ofs-label reveal">Watch first</p>
            <h2 id="pbv-h" className="reveal" style={{ marginTop: 16 }}>
              What this conversation is — <span className="ofs-em">and isn't</span>.
            </h2>
            <p className="ofs-lead reveal" style={{ margin: '18px auto 0', maxWidth: '52ch' }}>
              Three minutes from Edgar on how the call runs and what he needs
              from you to give a straight answer about fit.
            </p>
            <div className="reveal ofs-video-frame" style={{ marginTop: 36 }}>
              <iframe
                src={PRE_CALL_VIDEO}
                title="Order Flow School — before your conversation"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                referrerPolicy="origin" loading="lazy" allowFullScreen
                data-testid="pre-call-video"
              />
            </div>
          </div>
        </section>

        <section className="ofs-section t-dark" aria-labelledby="pbp-h">
          <div className="ofs-wrap ofs-split">
            <div className="ofs-split-aside">
              <p className="ofs-label reveal">Before we speak</p>
              <h2 id="pbp-h" className="reveal" style={{ marginTop: 16 }}>
                Four minutes of prep changes the whole call.
              </h2>
              <p className="ofs-lead reveal" style={{ marginTop: 18 }}>
                This is a conversation about your trading, not a pitch. Turning
                up with something specific is what makes it worth the time.
              </p>
              <p className="ofs-fine reveal" style={{ marginTop: 22, maxWidth: '44ch' }}>
                If something changes, reschedule from your confirmation email
                rather than not showing up. It takes ten seconds and keeps the
                door open.
              </p>
            </div>

            <div>
              <ul className="ofs-steps reveal">
                {BRING.map(([n, t, d]) => (
                  <li key={n}>
                    <span className="ofs-step-n">{n}</span>
                    <span>
                      <span className="ofs-step-t" style={{ display: 'block' }}>{t}</span>
                      <span className="ofs-step-d" style={{ display: 'block' }}>{d}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="ofs-fine reveal" style={{ marginTop: 26 }}>
                Questions before then? DM{' '}
                <a href="https://www.instagram.com/orderflowschool" target="_blank" rel="noopener noreferrer"
                   style={{ color: 'var(--accent-ink)' }}>@orderflowschool</a>.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PostBooking;
