import React from 'react';
import useReveal from '../../hooks/useReveal';

/* "See how I teach" — a small authority/trust block so the visitor experiences
   how Edgar thinks before applying. Config-driven: add a real videoUrl (and
   optional posterUrl) to a clip and its card goes live.

   Rules:
   - Every clip loads its Bunny player straight away so it shows a real
     thumbnail (never a black box). The first clip on the page autoplays muted
     as a silent hook; the rest sit on their thumbnails until the visitor plays
     them. Muted is required — browsers block autoplay with sound.
   - A clip with no videoUrl is hidden in production. In development it renders
     a neutral skeleton so the slot is visible while filming — never the words
     "coming soon", "placeholder" or "upload video". */
export const TEACHING_CLIPS = [
  {
    id: 'live',
    category: 'Live trading',
    caption: 'A decision while the outcome is still unknown.',
    videoUrl: 'https://player.mediadelivery.net/embed/738150/29e9cda2-fdaf-461c-8ec6-66c8dfbdfca2',
    posterUrl: null,
  },
  {
    id: 'breakdown',
    category: 'Market breakdown',
    caption: 'How context and location shape the trade before execution.',
    videoUrl: 'https://player.mediadelivery.net/embed/738150/0ef61635-6cae-4af1-9964-2e4ddf6d36e3',
    posterUrl: null,
  },
  {
    id: 'framework',
    category: 'OFS Framework',
    caption: 'How aggression and reaction change the decision.',
    videoUrl: 'https://player.mediadelivery.net/embed/738150/61de4975-88e3-44b6-9dae-7fddd061d888',
    posterUrl: null,
  },
];

const isDev = process.env.NODE_ENV !== 'production';

export const TeachingClip = ({ clip, autoplay = false }) => {
  const hasVideo = Boolean(clip.videoUrl);

  // Bunny params. The first clip autoplays muted (silent hook); the rest load
  // paused on their thumbnail. preload=true so the poster frame appears fast.
  const params = autoplay
    ? 'autoplay=true&muted=true&loop=false&preload=true&responsive=true'
    : 'autoplay=false&muted=true&loop=false&preload=true&responsive=true';
  const src = hasVideo
    ? `${clip.videoUrl}${clip.videoUrl.includes('?') ? '&' : '?'}${params}`
    : null;

  return (
    <li className="ofs-card ofs-card--hover ofs-teach-card reveal">
      <div className="ofs-teach-media">
        {hasVideo ? (
          <iframe
            src={src}
            title={`${clip.category} — Edgar, Order Flow School`}
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen;"
            loading={autoplay ? 'eager' : 'lazy'}
            allowFullScreen
          />
        ) : (
          <span className="ofs-teach-poster is-empty" aria-hidden="true" />
        )}
      </div>
      <div className="ofs-teach-body">
        <p className="ofs-label ofs-label--accent">{clip.category}</p>
        <p className="ofs-teach-caption">{clip.caption}</p>
      </div>
    </li>
  );
};

const Teaching = () => {
  const scope = useReveal();
  const shown = isDev ? TEACHING_CLIPS : TEACHING_CLIPS.filter((c) => c.videoUrl);

  if (!shown.length) return null;

  return (
    <section id="teaching" ref={scope} className="ofs-section t-light" aria-labelledby="teach-h">
      <div className="ofs-wrap">
        <div style={{ maxWidth: '52ch' }}>
          <p className="ofs-label reveal">Inside the live room</p>
          <h2 id="teach-h" className="reveal" style={{ marginTop: 16 }}>
            Get a feel for how I actually <span className="ofs-em">think about the market</span>.
          </h2>
          <p className="ofs-lead reveal" style={{ marginTop: 20 }}>
            A few short clips from inside the live room — real sessions, breakdowns
            and calls — so you can see how I read the market before you apply.
          </p>
        </div>

        <ul className="ofs-teach-grid">
          {shown.map((clip, i) => <TeachingClip key={clip.id} clip={clip} autoplay={i === 0} />)}
        </ul>
      </div>
    </section>
  );
};

export default Teaching;
