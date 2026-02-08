import React from 'react';

interface MbsysLogoProps {
  className?: string;
}

/**
 * MbsysLogo component that renders the official brand identity.
 * Uses a relative path 'assets/logo.png' to ensure the image loads 
 * correctly in both root and subdirectory deployments.
 */
const MbsysLogo: React.FC<MbsysLogoProps> = ({ className = "h-12" }) => {
  return (
    <div className="flex items-center min-w-[120px]">
      <img 
        src="assets/logo.png" 
        alt="MBSyS" 
        className={`${className} block object-contain`}
        style={{ 
          display: 'block',
          width: 'auto',
          maxWidth: '100%',
          height: 'auto'
        }}
        fetchPriority="high"
        loading="eager"
      />
    </div>
  );
};

export default MbsysLogo;