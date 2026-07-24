import React from 'react';

interface ValorisLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const ValorisLogo: React.FC<ValorisLogoProps> = ({
  className = '',
  size = 'md',
  showTagline = true,
}) => {
  const scale = size === 'sm' ? 0.75 : size === 'lg' ? 1.3 : 1;

  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      <svg
        width={320 * scale}
        height={ showTagline ? 110 * scale : 75 * scale }
        viewBox="0 0 460 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-full h-auto drop-shadow-sm"
      >
        <defs>
          {/* Main Blue Gradient */}
          <linearGradient id="valBlue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#083874" />
            <stop offset="100%" stopColor="#0B4B94" />
          </linearGradient>

          {/* Green Arrow Gradient */}
          <linearGradient id="greenArrow" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#16a34a" />
            <stop offset="50%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#4ade80" />
          </linearGradient>

          {/* Teal Circle Gradient */}
          <linearGradient id="tealCircle" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00A896" />
            <stop offset="100%" stopColor="#028090" />
          </linearGradient>

          {/* Chart Green Gradient */}
          <linearGradient id="chartGreen" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#16a34a" />
            <stop offset="100%" stopColor="#4ade80" />
          </linearGradient>

          {/* S Teal-Blue Gradient */}
          <linearGradient id="sGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0096C7" />
            <stop offset="100%" stopColor="#0B4B94" />
          </linearGradient>
        </defs>

        {/* --- LETTER V (with Green Growth Arrow stem) --- */}
        <g id="letter-V">
          {/* Right arm of V */}
          <path
            d="M 52 35 L 82 108 L 60 108 L 38 48 Z"
            fill="url(#valBlue)"
          />
          {/* Left arm with Green upward Arrow */}
          <path
            d="M 4 48 L 42 108 L 56 108 L 22 48 Z"
            fill="url(#valBlue)"
          />
          {/* Arrow overlay stemming upward */}
          <path
            d="M 12 60 L 40 18 L 84 18 L 72 30 L 48 30 L 28 66 Z"
            fill="url(#greenArrow)"
          />
          <path
            d="M 56 12 L 85 24 L 72 44 L 63 32 L 48 30 L 56 12 Z"
            fill="url(#greenArrow)"
          />
        </g>

        {/* SVG clean letter path rendering for precision */}
        {/* V (Crisp Geometric SVG) */}
        <g id="V-symbol">
          <path
            d="M 8 40 L 42 110 L 55 110 L 86 35 L 68 35 L 48 88 L 28 40 Z"
            fill="url(#valBlue)"
          />
          {/* Green Arrow top left */}
          <path
            d="M 2 48 L 44 14 L 84 12 L 68 28 L 48 28 L 24 64 Z"
            fill="url(#greenArrow)"
          />
          <path
            d="M 84 12 L 58 36 L 70 42 Z"
            fill="url(#greenArrow)"
          />
        </g>

        {/* LETTER A */}
        <g id="letter-A">
          <path
            d="M 102 110 L 130 35 L 148 35 L 176 110 L 157 110 L 150 90 L 128 90 L 122 110 Z M 133 74 L 145 74 L 139 52 Z"
            fill="url(#valBlue)"
          />
        </g>

        {/* LETTER L */}
        <g id="letter-L">
          <path
            d="M 188 35 L 206 35 L 206 94 L 236 94 L 236 110 L 188 110 Z"
            fill="url(#valBlue)"
          />
        </g>

        {/* LETTER O (Circle with Hand & Bar Chart) */}
        <g id="letter-O" transform="translate(244, 30)">
          {/* Outer Ring */}
          <circle cx="40" cy="40" r="38" fill="none" stroke="url(#tealCircle)" strokeWidth="12" />
          
          {/* Internal Hand Curve */}
          <path
            d="M 16 48 C 16 58, 28 62, 40 62 C 54 62, 64 56, 64 48 C 64 44, 52 46, 40 48 C 28 50, 16 46, 16 48 Z"
            fill="url(#valBlue)"
          />

          {/* Bar Chart inside O */}
          {/* Bar 1 */}
          <rect x="25" y="40" width="7" height="13" rx="2" fill="url(#chartGreen)" />
          {/* Bar 2 */}
          <rect x="36" y="28" width="8" height="25" rx="2" fill="url(#chartGreen)" />
          {/* Bar 3 */}
          <rect x="48" y="20" width="8" height="33" rx="2" fill="url(#chartGreen)" />
        </g>

        {/* LETTER R */}
        <g id="letter-R">
          <path
            d="M 338 35 L 366 35 C 378 35 386 42 386 54 C 386 64 378 70 368 72 L 388 110 L 368 110 L 350 75 L 354 75 L 354 51 L 364 51 C 369 51 372 49 372 45 C 372 41 369 39 364 39 L 354 39 Z"
            fill="url(#valBlue)"
          />
          {/* Solid R stem */}
          <rect x="336" y="35" width="16" height="75" fill="url(#valBlue)" />
          <path d="M336 35 H366 C378 35 384 41 384 51 C384 61 378 66 366 66 H352 V35 Z" fill="url(#valBlue)" />
          <path d="M352 66 L374 110 H392 L368 67 Z" fill="url(#valBlue)" />
        </g>

        {/* LETTER i (with Bright Green Dot) */}
        <g id="letter-i">
          {/* Dot */}
          <circle cx="403" cy="24" r="8" fill="#84cc16" />
          {/* Stem */}
          <rect x="396" y="44" width="14" height="66" fill="#00A896" />
        </g>

        {/* LETTER S */}
        <g id="letter-S">
          <path
            d="M 452 48 C 452 40 444 35 432 35 C 420 35 412 42 412 50 C 412 62 426 66 438 70 C 450 74 456 80 456 92 C 456 104 444 112 430 112 C 416 112 408 102 408 94 L 422 94 C 422 100 426 103 432 103 C 438 103 444 99 444 92 C 444 84 432 80 420 76 C 410 72 402 66 402 51 C 402 38 414 27 432 27 C 448 27 458 37 458 48 Z"
            fill="url(#sGrad)"
          />
        </g>

        {/* TAGLINE & DIVIDER LINES */}
        {showTagline && (
          <g id="tagline-group" transform="translate(0, 130)">
            {/* Left Blue Line */}
            <line x1="20" y1="5" x2="105" y2="5" stroke="#0B4B94" strokeWidth="2.5" strokeLinecap="round" />
            
            {/* Tagline Text */}
            <text
              x="230"
              y="9"
              textAnchor="middle"
              fill="#062852"
              fontSize="12.5"
              fontWeight="800"
              letterSpacing="2.5"
              fontFamily="Inter, sans-serif"
            >
              VALUE  •  GROWTH  •  TRUST  •  IMPACT  •  SUCCESS
            </text>

            {/* Right Teal Line */}
            <line x1="355" y1="5" x2="440" y2="5" stroke="#00A896" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        )}
      </svg>
    </div>
  );
};
