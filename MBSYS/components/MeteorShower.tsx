import React, { useEffect, useRef } from 'react';

interface Meteor {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  width: number;
}

const MeteorShower: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const meteors = useRef<Meteor[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    const createMeteor = () => {
      const angle = Math.PI / 4; // 45 degrees
      return {
        x: Math.random() * canvas.width * 1.5 - canvas.width * 0.5,
        y: -100,
        length: Math.random() * 80 + 20,
        speed: Math.random() * 10 + 5,
        opacity: Math.random() * 0.4 + 0.1,
        width: Math.random() * 1.5 + 0.5,
      };
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Occasionally add a new meteor
      if (Math.random() < 0.05 && meteors.current.length < 15) {
        meteors.current.push(createMeteor());
      }

      meteors.current = meteors.current.filter((m) => {
        m.x += m.speed;
        m.y += m.speed;

        // Draw meteor
        const gradient = ctx.createLinearGradient(
          m.x, m.y,
          m.x - m.length, m.y - m.length
        );

        const color = darkMode ? '239, 68, 68' : '6, 182, 212'; // Primary or Secondary
        gradient.addColorStop(0, `rgba(${color}, ${m.opacity})`);
        gradient.addColorStop(1, `rgba(${color}, 0)`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = m.width;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x - m.length, m.y - m.length);
        ctx.stroke();

        // Remove if off screen
        return m.y < canvas.height + 100 && m.x < canvas.width + 100;
      });

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [darkMode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-40 dark:opacity-20 transition-opacity duration-1000"
    />
  );
};

export default MeteorShower;
