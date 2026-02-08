import React, { useEffect, useRef, useState, useMemo } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'none';
  delay?: number;
  duration?: number;
  threshold?: number;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({ 
  children, 
  className = "", 
  direction = 'up',
  delay = 0,
  duration = 800, // Reduced default duration for snappier feel
  threshold = 0.05 // Lower threshold for earlier trigger
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { 
        threshold, 
        rootMargin: '0px 0px -5% 0px' 
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [threshold]);

  const getAnimationClass = () => {
    if (!isVisible) return "reveal-hidden";
    if (direction === 'up') return "animate-fade-in-up";
    if (direction === 'down') return "animate-fade-in-down";
    return "animate-fade-in";
  };

  const style = useMemo(() => ({
    animationDelay: `${delay}ms`,
    animationDuration: `${duration}ms`,
    animationFillMode: 'forwards' as const,
  }), [delay, duration]);

  return (
    <div 
      ref={ref} 
      className={`${getAnimationClass()} gpu-accelerated ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;