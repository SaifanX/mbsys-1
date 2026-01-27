import React from 'react';

interface MbsysLogoProps {
  className?: string;
}

const MbsysLogo: React.FC<MbsysLogoProps> = ({ className = "h-10" }) => (
  <svg viewBox="0 0 240 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="MBSYS Logo">
    {/* Dots Pattern - Left Column */}
    <circle cx="12" cy="18" r="5" className="fill-primary animate-logo-pulse" />
    <circle cx="12" cy="38" r="6" className="fill-primary animate-logo-pulse animation-delay-200" />
    <circle cx="12" cy="62" r="7" className="fill-primary animate-logo-pulse animation-delay-400" />
    
    {/* Dots Pattern - Middle Column */}
    <circle cx="32" cy="18" r="6" className="fill-primary animate-logo-pulse animation-delay-100" />
    <circle cx="32" cy="38" r="8" className="fill-primary animate-logo-pulse animation-delay-300" />
    <circle cx="32" cy="62" r="10" className="fill-primary animate-logo-pulse animation-delay-500" />
    
    {/* Dots Pattern - Right Column */}
    <circle cx="56" cy="18" r="7" className="fill-primary animate-logo-pulse animation-delay-300" />
    <circle cx="56" cy="38" r="10" className="fill-primary animate-logo-pulse animation-delay-500" />
    <circle cx="56" cy="62" r="12" className="fill-primary animate-logo-pulse animation-delay-700" />

    {/* Text MBSyS */}
    <text x="80" y="58" className="fill-slate-900 dark:fill-slate-100 font-serif font-bold text-5xl tracking-wide drop-shadow-md transition-colors duration-500">
      MBSyS
    </text>
    
    {/* Slogan */}
    <text x="84" y="76" className="fill-secondary font-sans text-[10px] font-bold tracking-[0.3em] uppercase transition-colors duration-500">
      Connecting Dots
    </text>
  </svg>
);

export default MbsysLogo;