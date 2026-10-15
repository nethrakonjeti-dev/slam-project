/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ className = '', size = 32, showText = true }) => {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Original SVG logo: outer industrial gear teeth + inner circuit nodes + embedded heartbeat waveform */}
      <div
        className="relative flex items-center justify-center shrink-0 rounded-lg p-1.5 transition-transform duration-200 hover:scale-105"
        style={{
          width: size,
          height: size,
          background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.2) 0%, rgba(20, 184, 166, 0.2) 100%)',
          border: '1px solid rgba(6, 182, 212, 0.4)',
        }}
      >
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-cyan-400"
        >
          {/* Outer Industrial Gear Teeth */}
          <path
            d="M24 6V9M24 39V42M6 24H9M39 24H42M11.27 11.27L13.39 13.39M34.61 34.61L36.73 36.73M11.27 36.73L13.39 34.61M34.61 13.39L36.73 11.27"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle
            cx="24"
            cy="24"
            r="15"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="2 2"
            opacity="0.6"
          />

          {/* AI Circuit Paths */}
          <path
            d="M17 19H20V15M31 29H28V33"
            stroke="#14b8a6"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <circle cx="20" cy="15" r="1.8" fill="#14b8a6" />
          <circle cx="28" cy="33" r="1.8" fill="#14b8a6" />

          {/* Central Heartbeat / Vibration Waveform */}
          <path
            d="M12 24H18L21 16L24 32L27 20L30 26H36"
            stroke="#38bdf8"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col select-none">
          <div className="flex items-center gap-1 font-bold text-base tracking-tight" style={{ color: 'var(--text-primary)' }}>
            <span>Predict</span>
            <span className="text-cyan-400">AI</span>
          </div>
        </div>
      )}
    </div>
  );
};
