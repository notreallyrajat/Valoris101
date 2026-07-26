import React from 'react';
import logoSrc from '../assets/logo.png';

interface ValorisLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const ValorisLogo: React.FC<ValorisLogoProps> = ({
  className = '',
  size = 'md',
}) => {
  const heightMap = {
    sm: '72px',
    md: '120px',
    lg: '165px',
  };

  return (
    <div className={`flex items-center justify-center select-none ${className}`}>
      <img
        src={logoSrc}
        alt="Valoris Logo"
        style={{ height: heightMap[size], width: 'auto', objectFit: 'contain' }}
        draggable={false}
      />
    </div>
  );
};
