import React from 'react';

interface MbsysLogoProps {
  className?: string;
}

const MbsysLogo: React.FC<MbsysLogoProps> = ({ className = "h-16" }) => (
  <img 
    src="https://res.cloudinary.com/dyxjxhie1/image/upload/LOGO_.png"
    alt="MBSYS Logo"
    className={`object-contain transition-all duration-500 ${className}`}
    loading="eager"
  />
);

export default MbsysLogo;