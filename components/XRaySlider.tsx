import React, { useState, useRef, useEffect } from 'react';
import { MoveHorizontal } from 'lucide-react';

interface XRaySliderProps {
  imageBefore: string;
  imageAfter: string;
  labelBefore?: string;
  labelAfter?: string;
}

const XRaySlider: React.FC<XRaySliderProps> = ({ 
  imageBefore, 
  imageAfter,
  labelBefore = "Visual Finish",
  labelAfter = "Infrastructure"
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percentage = (x / rect.width) * 100;
      setSliderPosition(percentage);
    }
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        e.preventDefault();
        handleMove(e.clientX);
      }
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging) {
        if (e.cancelable) e.preventDefault();
        handleMove(e.touches[0].clientX);
      }
    };

    if (isDragging) {
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchend', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
    }

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchend', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isDragging]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xl select-none group cursor-ew-resize transition-all duration-500"
      onMouseDown={(e) => {
        if (e.button === 0) {
          handleMove(e.clientX);
          handleMouseDown();
        }
      }}
    >
      <div className="absolute inset-0 w-full h-full bg-slate-100 dark:bg-slate-900">
         <img 
          src={imageAfter} 
          alt="Infrastructure View" 
          className="w-full h-full object-cover opacity-70 mix-blend-multiply dark:mix-blend-screen filter grayscale brightness-125 transition-all duration-500"
          draggable={false}
        />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-10 dark:opacity-20"></div>
        
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8 bg-secondary/20 backdrop-blur-md px-2 py-1 sm:px-4 sm:py-2 rounded border border-secondary/50 text-secondary text-[9px] sm:text-[10px] md:text-xs font-mono uppercase tracking-widest shadow-[0_0_15px_rgba(6,182,212,0.3)] z-10">
           {labelAfter}
        </div>
      </div>

      <div 
        className="absolute inset-0 w-full h-full z-20"
        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
      >
        <img 
          src={imageBefore} 
          alt="Finished View" 
          className="w-full h-full object-cover"
          draggable={false}
        />
        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 bg-white/60 dark:bg-black/60 backdrop-blur-md px-2 py-1 sm:px-4 sm:py-2 rounded text-slate-900 dark:text-white text-[9px] sm:text-[10px] md:text-xs font-mono uppercase border border-slate-200 dark:border-white/20">
           {labelBefore}
        </div>
      </div>

      <div 
        className="absolute top-0 bottom-0 w-0.5 sm:w-1 bg-primary cursor-ew-resize z-30 shadow-[0_0_20px_rgba(239,68,68,0.8)]"
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-primary rounded-full flex items-center justify-center shadow-lg border-2 border-white transition-transform hover:scale-110 active:scale-95">
          <MoveHorizontal className="text-white w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          
          {/* Sonar Pulse Micro-interaction */}
          {isDragging && (
            <div className="absolute inset-0 rounded-full border-2 border-primary animate-ping opacity-75"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default XRaySlider;