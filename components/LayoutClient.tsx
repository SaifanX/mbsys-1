"use client";

import React, { useState, useEffect } from 'react';
import ScrollToTop from './ScrollToTop';
import Navbar from './Navbar';
import Footer from './Footer';
import LocationSection from './LocationSection';
import QuickActionHub from './QuickActionHub';
import MeteorShower from './MeteorShower';
import CursorTrail from './CursorTrail';
import TransitionOverlay from './TransitionOverlay';
import { ArrowUp } from 'lucide-react';

interface LayoutClientProps {
  children: React.ReactNode;
}

const LayoutClient: React.FC<LayoutClientProps> = ({ children }) => {
  const darkMode = true; // Hardcoded dark mode for MBSYS
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [overlayColor, setOverlayColor] = useState("#020617"); // Default MBSYS Deep Slate

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
      
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.documentElement.classList.add('dark');

    const handleSwitch = () => {
      handleSwitchBrand();
    };
    window.addEventListener('switch-brand', handleSwitch);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('switch-brand', handleSwitch);
    };
  }, []);

  const handleSwitchBrand = () => {
    setOverlayColor("#171512"); // Hunar Charcoal
    setIsExiting(true);
    // Wait for the animation to cover the screen before redirecting
    setTimeout(() => {
      window.location.href = 'https://hunar.mbsys.co.in?from=mbsys';
    }, 1100);
  };

  return (
    <div className="min-h-screen relative bg-slate-950 transition-colors duration-500 selection:bg-secondary/30 overflow-x-hidden text-white">
      <TransitionOverlay isExiting={isExiting} brandColor={overlayColor} />
      <ScrollToTop />
      <MeteorShower darkMode={darkMode} />
      <CursorTrail darkMode={darkMode} />

      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-[200] pointer-events-none">
        <div 
          className="h-full bg-primary shadow-[0_0_10px_#EF4444] transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <QuickActionHub />

      {/* Scroll To Top Button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-6 right-24 z-[90] p-4 rounded-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-2xl transition-all duration-500 hover:scale-110 active:scale-95 border border-slate-200 dark:border-white/10 ${showScrollTop ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-50 pointer-events-none'}`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      <Navbar />

      <main className="relative min-h-screen z-10">
        {children}
      </main>

      <div className="relative z-10">
        <LocationSection />
        <Footer />
      </div>
    </div>
  );
};

export default LayoutClient;
