"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TransitionOverlayProps {
  isExiting: boolean;
  onExitComplete?: () => void;
  brandColor?: string;
}

const TransitionOverlay: React.FC<TransitionOverlayProps> = ({ 
  isExiting, 
  onExitComplete,
  brandColor = "#020617" 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  // Handle Entry (Reveal) only if coming from a brand switch
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('from')) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 1400);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <AnimatePresence onExitComplete={onExitComplete}>
      {/* Entry Reveal (Inwards Ripple) */}
      {!isExiting && isVisible && (
        <motion.div
          initial={{ clipPath: 'circle(150% at 50% 50%)' }}
          animate={{ clipPath: 'circle(0% at 50% 50%)' }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[999999] pointer-events-none"
          style={{ backgroundColor: brandColor }}
        >
           <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-12 h-12 border border-white/10 rounded-full animate-ping" />
           </div>
        </motion.div>
      )}

      {/* Exit Cover (Circle Expansion) */}
      {isExiting && (
        <motion.div
          initial={{ clipPath: 'circle(0% at 50% 50%)' }}
          animate={{ clipPath: 'circle(150% at 50% 50%)' }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[999999] flex items-center justify-center"
          style={{ backgroundColor: brandColor }}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-center"
          >
            <div className="relative mb-8">
              <div className="w-16 h-16 border border-white/10 rounded-full mx-auto" />
              <div className="absolute inset-0 w-16 h-16 border-t-2 border-[#EF4444] rounded-full animate-spin mx-auto" />
            </div>
            <div className="space-y-2">
              <span className="block text-white font-headline text-[10px] uppercase tracking-[0.6em] leading-none">Switching Experience</span>
              <span className="block text-white/30 text-[8px] uppercase tracking-[0.4em]">Optimizing Assets</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TransitionOverlay;
