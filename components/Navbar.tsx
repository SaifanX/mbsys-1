import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Moon, Sun, Lock, Calendar } from 'lucide-react';
import MbsysLogo from './MbsysLogo';

interface NavbarProps {
  darkMode: boolean;
  onToggleTheme: (event: React.MouseEvent) => void;
  onNavigate: (path: string) => void;
  currentPath: string;
}

const Navbar: React.FC<NavbarProps> = ({ darkMode, onToggleTheme, onNavigate, currentPath }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsDrawerOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isDrawerOpen]);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setIsDrawerOpen(false);
    onNavigate(href);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] flex justify-center pointer-events-none px-4 md:px-8">
        <div 
          className={`w-full max-w-7xl transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] pointer-events-auto flex items-center justify-between relative z-[110]
            ${scrolled 
              ? 'mt-4 px-6 py-3 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/50 dark:border-white/5 shadow-xl' 
              : 'mt-0 px-2 py-8 w-full bg-transparent border-transparent shadow-none'
            }`}
        >
          <a href="#" onClick={(e) => handleLinkClick(e, '#')} className="flex items-center gap-3 group active:scale-95 transition-transform">
            <MbsysLogo className={`transition-all duration-500 ${scrolled ? 'h-7 md:h-8' : 'h-10 md:h-12'}`} />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`text-[11px] font-bold uppercase tracking-[0.25em] transition-all relative group py-2 h-full flex flex-col justify-center ${
                  currentPath === link.href 
                    ? 'text-primary' 
                    : 'text-slate-600 dark:text-slate-300'
                } hover:text-primary active:scale-95`}
              >
                {link.name}
                {/* Emerging Line Effect */}
                <span className={`absolute bottom-0 left-0 h-[1.5px] bg-primary transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${currentPath === link.href ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'}`}></span>
              </a>
            ))}
            
            <button 
              onClick={onToggleTheme}
              className={`p-2.5 rounded-full transition-all duration-300 group ${
                scrolled ? 'bg-slate-100 dark:bg-slate-800' : 'bg-slate-200/50 dark:bg-white/10'
              } text-slate-600 dark:text-slate-300 hover:scale-110 active:scale-90`}
              aria-label="Toggle Theme"
            >
              {darkMode ? 
                <Sun size={18} className="group-hover:text-yellow-400 transition-colors" /> : 
                <Moon size={18} className="group-hover:text-secondary transition-colors" />
              }
            </button>

            <div className={`flex items-center gap-3 pl-6 border-l transition-colors duration-500 ${scrolled ? 'border-slate-200 dark:border-slate-700' : 'border-slate-300/40 dark:border-slate-700/50'}`}>
               <a 
                 href="https://cal.id/mbsys" 
                 target="_blank"
                 rel="noopener noreferrer"
                 className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-secondary transition-colors text-[10px] font-tech font-bold uppercase tracking-widest px-3 active:scale-95"
               >
                 <Calendar size={14} /> Sync Calendar
               </a>
               <a 
                 href="tel:+919886374122" 
                 className="flex items-center gap-3 px-5 py-2.5 bg-primary text-white rounded-full font-tech font-bold uppercase tracking-widest text-[10px] shadow-lg shadow-red-500/20 hover:scale-105 active:scale-95 transition-all group"
               >
                 <Phone size={14} className="group-hover:animate-bounce" /> Establish Link
               </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <button 
              onClick={onToggleTheme} 
              className={`p-2 rounded-full transition-colors ${scrolled ? 'bg-slate-100 dark:bg-slate-800' : 'bg-slate-200/50 dark:bg-white/10'} text-slate-600 dark:text-slate-300 active:scale-90`}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button 
              onClick={() => setIsDrawerOpen(true)} 
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-primary transition-all duration-300 active:scale-90"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </nav>

      {/* Side Drawer Backdrop - Smooth Fade */}
      <div 
        className={`fixed inset-0 bg-slate-950/60 backdrop-blur-md z-[150] transition-opacity duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] md:hidden ${isDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsDrawerOpen(false)}
      />

      {/* Side Drawer Menu - Spring Easing & Entry Transitions */}
      <div 
        className={`fixed top-0 right-0 bottom-0 w-[85%] max-w-xs bg-white dark:bg-background-dark z-[160] shadow-[0_0_80px_rgba(0,0,0,0.5)] transition-transform duration-[600ms] ease-[cubic-bezier(0.32,0.72,0,1)] md:hidden ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800/50">
            <MbsysLogo className="h-7" />
            <button 
              onClick={() => setIsDrawerOpen(false)} 
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors active:scale-75"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-12 px-8">
            <div className="flex flex-col space-y-8">
              {navLinks.map((link, idx) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  style={{ transitionDelay: `${isDrawerOpen ? 150 + idx * 50 : 0}ms` }}
                  className={`text-4xl font-display font-bold uppercase tracking-tight transition-all duration-700 group relative w-fit ${
                    currentPath === link.href ? 'text-primary' : 'text-slate-900 dark:text-slate-100'
                  } ${isDrawerOpen ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}`}
                >
                  {link.name}
                  <span className={`absolute -bottom-1 left-0 h-[3px] bg-primary transition-all duration-500 ease-out origin-left ${currentPath === link.href ? 'w-full' : 'w-0'}`}></span>
                </a>
              ))}
            </div>

            <div className="mt-16 pt-12 border-t border-slate-100 dark:border-slate-800/50 space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                  <Lock size={14} />
                  <span className="text-[10px] uppercase font-bold tracking-widest">Tactical Protocol Line</span>
                </div>
                <p className="font-tech font-bold text-2xl text-slate-900 dark:text-white">+91 988-6374-122</p>
              </div>
              
              <div className="flex flex-col gap-4">
                <a 
                  href="tel:+919886374122" 
                  className="flex items-center justify-center gap-3 w-full py-5 bg-primary text-white font-tech font-bold uppercase tracking-widest text-sm rounded-xl shadow-lg shadow-red-500/20 active:scale-95 transition-all"
                >
                  <Phone size={18} /> Establish Link
                </a>
                <a 
                  href="https://cal.id/mbsys" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full py-5 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-tech font-bold uppercase tracking-widest text-sm rounded-xl shadow-md active:scale-95 transition-all"
                >
                  <Calendar size={18} /> Sync Calendar
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;