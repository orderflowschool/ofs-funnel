import React, { useState } from 'react';
import useReveal from '../../hooks/useReveal';
import { faqItems } from '../../data/faq';

const FAQ = () => {
  const scope = useReveal(60);
  const [open, setOpen] = useState(null);

  return (
    <section ref={scope} className="ofs-section t-light" aria-labelledby="faq-h">
      <div className="ofs-wrap ofs-split">
        <div className="ofs-split-aside">
          <p className="ofs-label reveal">Before you apply</p>
          <h2 id="faq-h" className="reveal" style={{ marginTop: 16 }}>
            The questions we actually get asked.
          </h2>
        </div>

        <div className="ofs-split-main">
          <ul className="ofs-faq">
            {faqItems.map((item, i) => {
              const isOpen = open === item.id;
              return (
                <li key={item.id} className="reveal" data-reveal-delay={i * 60}>
                  <button
                    type="button"
                    className="ofs-faq-q"
                    aria-expanded={isOpen}
                    aria-controls={`${item.id}-panel`}
                    id={`${item.id}-button`}
                    onClick={() => setOpen(isOpen ? null : item.id)}
                  >
                    <span>{item.question}</span>
                    <span className={`ofs-faq-sign${isOpen ? ' is-open' : ''}`} aria-hidden="true">
                      <i /><i />
                    </span>
                  </button>
                  <div
                    id={`${item.id}-panel`}
                    role="region"
                    aria-labelledby={`${item.id}-button`}
                    className={`ofs-faq-a${isOpen ? ' is-open' : ''}`}
                  >
                    <div><p>{item.answer}</p></div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
