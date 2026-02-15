import React from 'react';

interface MbsysLogoProps {
  className?: string;
}

const MbsysLogo: React.FC<MbsysLogoProps> = ({ className = "h-10" }) => (
  <svg viewBox="0 0 240 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="MBSYS Logo">
    {/* Pattern - Left Column */}
    <circle cx="12" cy="18" r="5" className="fill-primary" />
    <circle cx="12" cy="38" r="6" className="fill-primary" />
    <circle cx="12" cy="62" r="7" className="fill-primary" />
    
    {/* Pattern - Middle Column */}
    <circle cx="32" cy="18" r="6" className="fill-primary" />
    <circle cx="32" cy="38" r="8" className="fill-primary" />
    <circle cx="32" cy="62" r="10" className="fill-primary" />
    
    {/* Pattern - Right Column */}
    <circle cx="56" cy="18" r="7" className="fill-primary" />
    <circle cx="56" cy="38" r="10" className="fill-primary" />
    <circle cx="56" cy="62" r="12" className="fill-primary" />

    {/* Text MBSyS */}
    <text x="80" y="58" className="fill-slate-900 dark:fill-slate-100 font-display font-bold text-5xl tracking-tight transition-colors duration-500">
      MBSyS
    </text>
    
    {/* Slogan */}
    <text x="84" y="76" className="fill-secondary font-sans text-[10px] font-semibold tracking-[0.2em] uppercase transition-colors duration-500">
      Engineering Excellence
    </text>
  </svg>
);

export default MbsysLogo;