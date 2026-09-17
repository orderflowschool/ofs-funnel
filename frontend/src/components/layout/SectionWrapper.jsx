import React from 'react';

const SectionWrapper = ({ children, className = '', background = 'primary', id }) => (
  <section
    id={id}
    className={`ofs-section ${background === 'panel' ? 'ofs-section--tint' : ''} ${className}`}
  >
    <div className="ofs-wrap">{children}</div>
  </section>
);

export default SectionWrapper;
