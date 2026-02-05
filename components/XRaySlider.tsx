import React, { useState, useRef, useEffect } from 'react';
import { MoveHorizontal, Loader2, AlertCircle } from 'lucide-react';

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
  const [imagesLoaded, setImagesLoaded] = useState({ before: false, after: false });
  const [loadError, setLoadError] = useState({ before: false, after: false });
  const containerRef = useRef<HTMLDivElement>(null);

  const isReady = (imagesLoaded.before && imagesLoaded.after) || (loadError.before || loadError.after);

  const handleMove = (clientX: number) => {
    if (!isReady) return;
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percentage = (x / rect.width) * 100;
      setSliderPosition(percentage);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0 || !isReady) return;
    setIsDragging(true);
    handleMove(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isReady) return;
    setIsDragging(true);
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleMove(e.clientX);
      }
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging) {
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
  }, [isDragging, isReady]);

  const handleImageLoad = (type: 'before' | 'after') => {
    setImagesLoaded(prev => ({ ...prev, [type]: true }));
  };

  const handleImageError = (type: 'before' | 'after') => {
    setLoadError(prev => ({ ...prev, [type]: true }));
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-[4/5] md:aspect-video lg:h-[600px] overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xl select-none group cursor-ew-resize transition-all duration-500 touch-none bg-slate-100 dark:bg-slate-900"
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {/* Loading Overlay */}
      <div className={`absolute inset-0 z-50 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 transition-opacity duration-500 ${isReady ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className="flex flex-col items-center">
            <Loader2 className="w-8 h-8 text-secondary animate-spin mb-4" />
            <span className="text-xs font-sans font-medium uppercase tracking-widest text-slate-400">Loading Grid...</span>
        </div>
      </div>

      {/* Infrastructure Layer (Bottom) */}
      <div className={`absolute inset-0 w-full h-full bg-slate-900 overflow-hidden transition-opacity duration-700 ${isReady ? 'opacity-100' : 'opacity-0'}`}>
         {!loadError.after ? (
           <img 
            src={imageAfter} 
            alt="Infrastructure View" 
            className="w-full h-full object-cover opacity-80 mix-blend-screen filter grayscale brightness-125 scale-100"
            draggable={false}
            onLoad={() => handleImageLoad('after')}
            onError={() => handleImageError('after')}
          />
         ) : (
           <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950 tech-grid">
              <AlertCircle className="text-secondary mb-4 opacity-30" size={48} />
              <p className="text-[10px] font-tech font-bold text-secondary uppercase tracking-widest opacity-40">System Mesh Data Not Found</p>
           </div>
         )}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-20"></div>
        
        <div className="absolute top-4 left-4 sm:top-8 sm:left-8 bg-secondary/90 backdrop-blur-xl px-4 py-2 rounded-lg border border-white/20 text-white text-[10px] font-tech font-bold uppercase tracking-[0.2em] shadow-2xl z-10 transition-transform group-hover:scale-105">
           {labelAfter}
        </div>
      </div>

      {/* Visual Layer (Top with Clip Path) */}
      <div 
        className={`absolute inset-0 w-full h-full z-20 transition-opacity duration-700 ${isReady ? 'opacity-100' : 'opacity-0'}`}
        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
      >
        {!loadError.before ? (
          <img 
            src={imageBefore} 
            alt="Finished View" 
            className="w-full h-full object-cover"
            draggable={false}
            onLoad={() => handleImageLoad('before')}
            onError={() => handleImageError('before')}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-200 dark:bg-slate-800">
             <AlertCircle className="text-slate-400 mb-4" size={48} />
             <p className="text-[10px] font-tech font-bold text-slate-500 uppercase tracking-widest">Visual Finish Not Available</p>
          </div>
        )}
        <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 bg-white/90 dark:bg-black/90 backdrop-blur-xl px-4 py-2 rounded-lg text-slate-900 dark:text-white text-[10px] font-tech font-bold uppercase tracking-[0.2em] border border-slate-200 dark:border-white/10 shadow-2xl transition-transform group-hover:scale-105">
           {labelBefore}
        </div>
      </div>

      {/* Tactical Slider Handle */}
      <div 
        className={`absolute top-0 bottom-0 w-[2px] bg-primary cursor-ew-resize z-30 shadow-[0_0_30px_rgba(239,68,68,1)] transition-opacity duration-500 ${isReady ? 'opacity-100' : 'opacity-0'}`}
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 sm:w-14 sm:h-14 bg-primary rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(239,68,68,0.6)] border-4 border-white dark:border-slate-900 transition-transform hover:scale-110 active:scale-90">
          <MoveHorizontal className="text-white w-5 h-5 sm:w-7 sm:h-7" />
          {isDragging && (
            <div className="absolute inset-[-8px] rounded-full border-2 border-primary animate-ping opacity-60"></div>
          )}
          {!isDragging && (
             <div className="absolute inset-0 rounded-full bg-white/30 animate-pulse"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default XRaySlider;