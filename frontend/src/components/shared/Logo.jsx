import React from 'react';

const Logo = ({ className = '' }) => {
  return (
    <img 
      src="/ofs-logo.jpeg" 
      alt="Order Flow School" 
      className={`h-8 w-auto ${className}`}
      style={{ 
        objectFit: 'contain',
        maxHeight: '32px'
      }}
    />
  );
};

export default Logo;
