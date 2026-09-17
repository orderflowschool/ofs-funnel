import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { LEGAL, LEGAL_NAV, LEGAL_UPDATED } from '../data/legal';

const Legal = () => {
  const { slug } = useParams();
  const doc = LEGAL[slug];

  useEffect(() => {
    if (doc) document.title = `${doc.title} | Order Flow School`;
    window.scrollTo(0, 0);
  }, [doc, slug]);

  if (!doc) return <Navigate to="/legal/privacy" replace />;

  return (
    <div className="t-dark" style={{ background: '#070808', minHeight: '100vh' }}>
      <Header />
      <main className="ofs-section t-dark" style={{ paddingTop: 'calc(var(--nav-h) + 56px)' }}>
        <div className="ofs-wrap ofs-split">
          <nav className="ofs-split-aside" aria-label="Legal documents">
            <p className="ofs-label">Legal</p>
            <ul style={{ listStyle: 'none', margin: '18px 0 0', padding: 0, display: 'grid', gap: 4 }}>
              {LEGAL_NAV.map(({ slug: s, label }) => (
                <li key={s}>
                  <Link
                    to={`/legal/${s}`}
                    className="ofs-legal-nav"
                    aria-current={s === slug ? 'page' : undefined}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <article className="ofs-split-main ofs-legal">
            {doc.eyebrow && <p className="ofs-label ofs-label--accent">{doc.eyebrow}</p>}
            <h1 style={{ fontSize: 'clamp(30px,3vw + 1rem,48px)', marginTop: doc.eyebrow ? 14 : 0 }}>{doc.title}</h1>
            {doc.subtitle && (
              <p className="ofs-lead" style={{ marginTop: 16, maxWidth: '62ch' }}>{doc.subtitle}</p>
            )}
            <p className="ofs-label" style={{ marginTop: 22, color: 'var(--muted)' }}>
              Last updated {LEGAL_UPDATED}
            </p>

            {(() => {
              let n = 0;
              return doc.blocks.map((b, i) => {
                if (b.t === 'h') {
                  n += 1;
                  return <h2 key={i}>{doc.numbered ? `${n}. ${b.v}` : b.v}</h2>;
                }
                if (b.t === 'ul') return <ul key={i}>{b.v.map((li, j) => <li key={j}>{li}</li>)}</ul>;
                return <p key={i}>{b.v}</p>;
              });
            })()}

            <div className="ofs-legal-foot">
              <p className="ofs-label">Questions about this page?</p>
              <p className="ofs-fine" style={{ marginTop: 8 }}>
                Email <a href="mailto:support@orderflowschool.com" style={{ color: 'var(--accent-ink)' }}>support@orderflowschool.com</a>.
              </p>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Legal;
