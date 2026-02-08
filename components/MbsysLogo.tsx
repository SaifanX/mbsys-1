import React from 'react';

interface MbsysLogoProps {
  className?: string;
}

const MbsysLogo: React.FC<MbsysLogoProps> = ({ className = "h-12" }) => (
  <svg viewBox="0 0 320 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="MBSYS Logo">
    {/* 3x3 Dot Grid - Red (#EF4444 equivalent) */}
    {/* Row 1 - Small */}
    <circle cx="20" cy="25" r="7" fill="#EF4444" />
    <circle cx="50" cy="25" r="7" fill="#EF4444" />
    <circle cx="80" cy="25" r="7" fill="#EF4444" />
    
    {/* Row 2 - Medium */}
    <circle cx="20" cy="50" r="10" fill="#EF4444" />
    <circle cx="50" cy="50" r="10" fill="#EF4444" />
    <circle cx="80" cy="50" r="10" fill="#EF4444" />
    
    {/* Row 3 - Large */}
    <circle cx="20" cy="80" r="14" fill="#EF4444" />
    <circle cx="50" cy="80" r="14" fill="#EF4444" />
    <circle cx="80" cy="80" r="14" fill="#EF4444" />

    {/* Text MBSYS - Using a serif font style to match reference */}
    <text 
      x="105" 
      y="62" 
      className="fill-[#1E3A8A] dark:fill-white font-serif font-bold text-6xl tracking-tight transition-colors duration-500"
      style={{ fontFamily: "'Times New Roman', serif" }}
    >
      MBSYS
    </text>
    
    {/* Slogan - Connecting Dots */}
    <text 
      x="105" 
      y="88" 
      className="fill-[#1E40AF] dark:fill-secondary font-sans text-xl font-normal tracking-wide transition-colors duration-500"
    >
      Connecting Dots
    </text>
  </svg>
);

export default MbsysLogo;