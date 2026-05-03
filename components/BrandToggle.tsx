import React from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid, Cpu } from 'lucide-react';

interface BrandToggleProps {
  currentBrand: 'mbsys' | 'hunar';
  onToggle: () => void;
}

const BrandToggle: React.FC<BrandToggleProps> = ({ currentBrand, onToggle }) => {
  const prefetchBrand = () => {
    const targetUrl = currentBrand === 'mbsys' ? 'http://localhost:5174' : 'http://localhost:3000';
    const existing = document.querySelector(`link[href="${targetUrl}"]`);
    if (!existing) {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = targetUrl;
      document.head.appendChild(link);
    }
  };

  return (
    <div 
      className="flex items-center bg-slate-100 dark:bg-slate-800/50 p-1 rounded-full border border-slate-200 dark:border-white/5 relative overflow-hidden group"
      onMouseEnter={prefetchBrand}
    >
      {/* Background Pill */}
      <motion.div
        animate={{ x: currentBrand === 'mbsys' ? 0 : '100%' }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="absolute top-1 left-1 bottom-1 w-[calc(50%-4px)] bg-white dark:bg-slate-700 rounded-full shadow-sm z-0"
      />

      <button
        onClick={() => currentBrand === 'hunar' && onToggle()}
        className={`relative z-10 flex items-center gap-2 px-4 py-1.5 transition-colors duration-300 ${
          currentBrand === 'mbsys' ? 'text-primary' : 'text-slate-400'
        }`}
      >
        <Cpu size={14} className={currentBrand === 'mbsys' ? 'animate-pulse' : ''} />
        <span className="text-[10px] font-bold uppercase tracking-widest">MBSYS</span>
      </button>

      <button
        onClick={() => currentBrand === 'mbsys' && onToggle()}
        className={`relative z-10 flex items-center gap-2 px-4 py-1.5 transition-colors duration-300 ${
          currentBrand === 'hunar' ? 'text-secondary' : 'text-slate-400'
        }`}
      >
        <LayoutGrid size={14} className={currentBrand === 'hunar' ? 'animate-pulse' : ''} />
        <span className="text-[10px] font-bold uppercase tracking-widest">Hunar</span>
      </button>
    </div>
  );
};

export default BrandToggle;
