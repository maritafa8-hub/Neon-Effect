/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export type NeonLogoSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | number;

interface NeonLogoProps {
  size?: NeonLogoSize;
  className?: string;
  withGlow?: boolean;
  withBackground?: boolean;
  onClick?: () => void;
  title?: string;
}

const SIZE_MAP: Record<string, { width: number; height: number }> = {
  xs: { width: 22, height: 22 },
  sm: { width: 32, height: 32 },
  md: { width: 48, height: 48 },
  lg: { width: 88, height: 88 },
  xl: { width: 140, height: 140 },
  '2xl': { width: 220, height: 220 },
};

export const NeonLogo: React.FC<NeonLogoProps> = ({
  size = 'md',
  className = '',
  withGlow = true,
  withBackground = false,
  onClick,
  title = 'Neon Glow Effect',
}) => {
  const dimensions =
    typeof size === 'number'
      ? { width: size, height: size }
      : SIZE_MAP[size] || SIZE_MAP.md;

  const filterId = React.useId().replace(/:/g, '_');

  return (
    <div
      onClick={onClick}
      title={title}
      className={`inline-flex items-center justify-center shrink-0 select-none ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
      style={{ width: dimensions.width, height: dimensions.height }}
    >
      <svg
        viewBox="0 0 500 500"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm overflow-visible"
        aria-label="Neon Glow Effect Logo"
      >
        <defs>
          {/* Subtle 3D drop shadow */}
          <filter id={`shadow_${filterId}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="3" dy="5" stdDeviation="4" floodColor="#000000" floodOpacity="0.45" />
          </filter>

          {/* Electric Neon Glow filter if enabled */}
          {withGlow && (
            <filter id={`neon_glow_${filterId}`} x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur1" />
              <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          )}
        </defs>

        {withBackground && (
          <rect
            x="8"
            y="8"
            width="484"
            height="484"
            rx="48"
            fill="#090a0f"
            stroke="#1e293b"
            strokeWidth="8"
          />
        )}

        <g filter={withGlow ? `url(#neon_glow_${filterId})` : undefined}>
          {/* Top Word: NEON (Magenta / Fuchsia) */}
          <text
            x="250"
            y="170"
            textAnchor="middle"
            fontFamily="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
            fontWeight="900"
            fontSize="106"
            fill="#f500d4"
            letterSpacing="2"
            filter={`url(#shadow_${filterId})`}
          >
            NEON
          </text>

          {/* Middle Badge: Black Rounded Box with GLOW in Vivid Electric Green */}
          <g filter={`url(#shadow_${filterId})`}>
            <rect
              x="62"
              y="196"
              width="376"
              height="116"
              rx="22"
              fill="#000000"
              stroke="#00ff33"
              strokeWidth="2"
              strokeOpacity="0.3"
            />
            <text
              x="250"
              y="284"
              textAnchor="middle"
              fontFamily="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
              fontWeight="900"
              fontSize="96"
              fill="#00ff33"
              letterSpacing="3"
            >
              GLOW
            </text>
          </g>

          {/* Bottom Word: EFFECT (Vivid Crimson Red) */}
          <text
            x="250"
            y="426"
            textAnchor="middle"
            fontFamily="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
            fontWeight="900"
            fontSize="94"
            fill="#eb212d"
            letterSpacing="2"
            filter={`url(#shadow_${filterId})`}
          >
            EFFECT
          </text>
        </g>
      </svg>
    </div>
  );
};
