import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Moon, Sun, Lock } from 'lucide-react';
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

  // Prevent body scroll when drawer is open
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
          <a href="#" onClick={(e) => handleLinkClick(e, '#')} className="flex items-center gap-3 group">
            <MbsysLogo className={`transition-all duration-500 ${scrolled ? 'h-7 md:h-8' : 'h-10 md:h-12'}`} />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`text-[11px] font-bold uppercase tracking-[0.2em] transition-all relative group py-2 ${
                  currentPath === link.href 
                    ? 'text-primary' 
                    : 'text-slate-600 dark:text-slate-300'
                } hover:text-primary`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-0 h-[1px] bg-primary transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] origin-left ${currentPath === link.href ? 'w-full scale-x-100' : 'w-full scale-x-0 group-hover:scale-x-100'}`}></span>
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

            <div className={`flex items-center gap-4 pl-6 border-l transition-colors duration-500 ${scrolled ? 'border-slate-200 dark:border-slate-700' : 'border-slate-300/40 dark:border-slate-700/50'}`}>
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
              className={`p-2 rounded-full transition-colors ${scrolled ? 'bg-slate-100 dark:bg-slate-800' : 'bg-slate-200/50 dark:bg-white/10'} text-slate-600 dark:text-slate-300`}
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

      {/* Side Drawer Backdrop */}
      <div 
        className={`fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-[150] transition-all duration-500 md:hidden ${isDrawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsDrawerOpen(false)}
      />

      {/* Side Drawer Menu */}
      <div 
        className={`fixed top-0 right-0 bottom-0 w-[85%] max-w-xs bg-white dark:bg-background-dark z-[160] shadow-[0_0_40px_rgba(0,0,0,0.2)] dark:shadow-[0_0_40px_rgba(0,0,0,0.6)] transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] md:hidden ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800/50">
            <MbsysLogo className="h-7" />
            <button 
              onClick={() => setIsDrawerOpen(false)} 
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-12 px-8">
            <div className="flex flex-col space-y-10">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`text-4xl font-display font-bold uppercase tracking-tight transition-all duration-300 group relative w-fit ${
                    currentPath === link.href ? 'text-primary' : 'text-slate-900 dark:text-slate-100'
                  }`}
                >
                  {link.name}
                  <span className={`absolute -bottom-1 left-0 h-[2px] bg-primary transition-all duration-500 ease-out origin-left ${currentPath === link.href ? 'w-full scale-x-100' : 'w-0 scale-x-0 group-hover:w-full group-hover:scale-x-100'}`}></span>
                </a>
              ))}
            </div>

            <div className="mt-20 pt-12 border-t border-slate-100 dark:border-slate-800/50 space-y-10">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                  <Lock size={14} />
                  <span className="text-[10px] uppercase font-bold tracking-widest">Technical Support Grid</span>
                </div>
                <p className="font-tech font-bold text-2xl text-slate-900 dark:text-white">+91 988-6374-122</p>
              </div>
              
              <a 
                href="tel:+919886374122" 
                className="flex items-center justify-center gap-3 w-full py-5 bg-primary text-white font-tech font-bold uppercase tracking-widest text-sm rounded-xl shadow-lg shadow-red-500/20 active:scale-[0.98] transition-all"
              >
                <Phone size={18} /> Establish Voice Link
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;