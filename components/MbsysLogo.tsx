import React from 'react';

interface MbsysLogoProps {
  className?: string;
}

const MbsysLogo: React.FC<MbsysLogoProps> = ({ className = "h-12" }) => (
  <svg viewBox="0 0 350 110" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="MBSYS Logo">
    {/* 3x3 Dot Grid - Red (#EF4444) */}
    {/* Row 1 - Smallest */}
    <circle cx="20" cy="25" r="7.5" fill="#EF4444" />
    <circle cx="55" cy="25" r="7.5" fill="#EF4444" />
    <circle cx="90" cy="25" r="7.5" fill="#EF4444" />
    
    {/* Row 2 - Medium */}
    <circle cx="20" cy="55" r="11" fill="#EF4444" />
    <circle cx="55" cy="55" r="11" fill="#EF4444" />
    <circle cx="90" cy="55" r="11" fill="#EF4444" />
    
    {/* Row 3 - Largest */}
    <circle cx="20" cy="90" r="15" fill="#EF4444" />
    <circle cx="55" cy="90" r="15" fill="#EF4444" />
    <circle cx="90" cy="90" r="15" fill="#EF4444" />

    {/* Text MBSyS - Exact casing and serif style */}
    <text 
      x="115" 
      y="65" 
      className="fill-[#1A365D] dark:fill-white font-serif font-bold text-[68px] tracking-tight transition-colors duration-500"
      style={{ fontFamily: "'Times New Roman', serif" }}
    >
      MBS<tspan dy="2" className="text-[58px]">y</tspan>S
    </text>
    
    {/* Slogan - Connecting Dots - Precise positioning and weight */}
    <text 
      x="116" 
      y="95" 
      className="fill-[#1A365D] dark:fill-secondary font-sans text-[26px] font-light tracking-wide transition-colors duration-500"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      Connecting Dots
    </text>
  </svg>
);

export default MbsysLogo;