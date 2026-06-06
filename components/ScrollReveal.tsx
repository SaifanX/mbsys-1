"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'none';
  delay?: number;
  duration?: number;
  threshold?: number;
  onClick?: () => void;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({ 
  children, 
  className = "", 
  direction = 'up',
  delay = 0,
  threshold = 0.1,
  onClick
}) => {
  const getVariants = () => {
    const hidden = {
      opacity: 0,
      y: direction === 'up' ? 30 : direction === 'down' ? -30 : 0,
      scale: 0.98
    };

    return {
      hidden,
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          type: "spring" as const,
          damping: 25,
          stiffness: 100,
          duration: 0.8,
          delay: delay / 1000,
        }
      }
    };
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: threshold }}
      variants={getVariants()}
      className={className}
      onClick={onClick}
      style={{ willChange: "transform, opacity", cursor: onClick ? 'pointer' : 'inherit' }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
