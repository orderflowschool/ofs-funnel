import React from 'react';
import { Link } from 'react-router-dom';
import { MotifFooterRule } from '../shared/Motif';
import { LEGAL_NAV } from '../../data/legal';

const Footer = () => (
  <footer className="t-dark" style={{ background: '#050506', borderTop: '1px solid var(--line)' }}>
    <div className="ofs-wrap" style={{ padding: '56px var(--gutter) 40px' }}>
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: 32,
        alignItems: 'flex-start', justifyContent: 'space-between',
      }}>
        <div>
          <p className="ofs-mark" style={{ marginBottom: 10 }}>
            <b style={{ fontSize: 22 }}>OFS</b>
            <span>Order Flow School</span>
          </p>
          <p className="ofs-fine" style={{ maxWidth: 300 }}>
            Private order-flow mentorship for futures traders who already have a strategy.
          </p>
        </div>

        <nav aria-label="Legal" style={{ display: 'grid', gap: 10 }}>
          <span className="ofs-label" style={{ marginBottom: 2 }}>Legal</span>
          {LEGAL_NAV.map(({ slug, label }) => (
            <Link
              key={slug}
              to={`/legal/${slug}`}
              className="ofs-footer-link"
              style={{ fontSize: 14, color: 'var(--body)', textDecoration: 'none' }}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div style={{ display: 'grid', gap: 12 }}>
          <span className="ofs-label" style={{ marginBottom: 2 }}>Contact</span>
          <a href="mailto:support@orderflowschool.com" className="ofs-contact-link"
             style={{ fontSize: 14, color: 'var(--body)', textDecoration: 'none' }}>
            support@orderflowschool.com
          </a>
          <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
            <a href="https://www.instagram.com/orderflowschool" target="_blank" rel="noopener noreferrer"
               aria-label="Instagram" className="ofs-social" style={{ color: 'var(--muted)' }}>
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="https://www.youtube.com/@orderflowschool" target="_blank" rel="noopener noreferrer"
               aria-label="YouTube" className="ofs-social" style={{ color: 'var(--muted)' }}>
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </div>

    {/* The motif's final, faintest beat */}
    <MotifFooterRule />

    <div className="ofs-wrap" style={{ padding: '20px var(--gutter) 40px' }}>
      <p className="ofs-fine" style={{ maxWidth: 760 }}>
        Trading futures involves substantial risk of loss and is not suitable for every investor.
        Past performance is not indicative of future results. Order Flow School provides education
        only — not trading signals, investment advice, or a guarantee of any outcome. Results shown
        are individual and not typical.
      </p>
      <p className="ofs-fine" style={{ marginTop: 14, color: 'var(--muted)' }}>
        &copy; {new Date().getFullYear()} Order Flow School. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
