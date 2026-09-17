import React from 'react';

const Card = ({ children, className = '', testimonial = false, hover = false, ...props }) => (
  <div className={`ofs-card ${hover ? 'ofs-card--hover' : ''} ${className}`} {...props}>
    {children}
  </div>
);

export default Card;
