import React, { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
  age: number;
  color: string;
  size: number;
  vx: number;
  vy: number;
}

interface CursorTrailProps {
  darkMode: boolean;
}

const CursorTrail: React.FC<CursorTrailProps> = ({ darkMode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const colors = darkMode 
      ? ['#EF4444', '#06B6D4', '#ffffff', '#FACC15'] 
      : ['#EF4444', '#0891B2', '#1E293B', '#EF4444'];

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      
      // Increased density for prominent dust trail
      for (let i = 0; i < 6; i++) {
        pointsRef.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 2.5,
          vy: (Math.random() - 0.5) * 2.5,
          age: 0,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 5 + 2,
        });
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      mouseRef.current = { x: touch.clientX, y: touch.clientY };
      for (let i = 0; i < 4; i++) {
        pointsRef.current.push({
          x: touch.clientX,
          y: touch.clientY,
          vx: (Math.random() - 0.5) * 3.5,
          vy: (Math.random() - 0.5) * 3.5,
          age: 0,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 6 + 3,
        });
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    handleResize();

    const maxAge = 80; // Extended lifetime for persistence

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      pointsRef.current = pointsRef.current.filter((p) => {
        p.age += 1;
        if (p.age > maxAge) return false;

        const opacity = Math.pow(1 - p.age / maxAge, 1.5);
        ctx.globalAlpha = opacity;
        
        // Intense Plasma Glow
        ctx.shadowBlur = p.age < 15 ? 20 : 8;
        ctx.shadowColor = p.color;
        
        ctx.fillStyle = p.color;
        
        // Newtonian Drift
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.97;
        p.vy *= 0.97;

        ctx.beginPath();
        // Slightly varying radius for organic look
        ctx.arc(p.x, p.y, p.size * opacity, 0, Math.PI * 2);
        ctx.fill();

        return true;
      });

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationId);
    };
  }, [darkMode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{ mixBlendMode: darkMode ? 'screen' : 'multiply' }}
    />
  );
};

export default CursorTrail;