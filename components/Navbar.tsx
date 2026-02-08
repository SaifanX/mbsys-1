import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Moon, Sun, Calendar } from 'lucide-react';
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
          className={`w-full max-w-7xl transition-all duration-700 pointer-events-auto flex items-center justify-between relative z-[110]
            ${scrolled 
              ? 'mt-4 px-6 py-3 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/50 dark:border-white/5 shadow-xl' 
              : 'mt-0 px-2 py-8 w-full bg-transparent border-transparent shadow-none'
            }`}
        >
          <a href="#" onClick={(e) => handleLinkClick(e, '#')} className="flex items-center gap-3 group active:scale-95 transition-transform">
            <MbsysLogo className={`transition-all duration-500 ${scrolled ? 'h-7 md:h-8' : 'h-10 md:h-12'}`} />
          </a>

          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`text-[11px] font-bold uppercase tracking-[0.2em] transition-all relative group py-2 h-full flex flex-col justify-center ${
                  currentPath === link.href 
                    ? 'text-primary' 
                    : 'text-slate-600 dark:text-slate-300'
                } hover:text-primary`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-0 h-[1.5px] bg-primary transition-all duration-500 ${currentPath === link.href ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'}`}></span>
              </a>
            ))}
            
            <button 
              onClick={onToggleTheme}
              className={`p-2.5 rounded-full transition-all duration-300 group ${
                scrolled ? 'bg-slate-100 dark:bg-slate-800' : 'bg-slate-200/50 dark:bg-white/10'
              } text-slate-600 dark:text-slate-300 hover:scale-110`}
              aria-label="Toggle Theme"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <div className={`flex items-center gap-3 pl-6 border-l transition-colors duration-500 ${scrolled ? 'border-slate-200 dark:border-slate-700' : 'border-slate-300/40 dark:border-slate-700/50'}`}>
               <a 
                 href="https://cal.id/mbsys" 
                 target="_blank"
                 rel="noopener noreferrer"
                 className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-secondary transition-colors text-[10px] font-bold uppercase tracking-widest px-3"
               >
                 <Calendar size={14} /> Book Consultation
               </a>
               <a 
                 href="tel:+919886374122" 
                 className="flex items-center gap-3 px-5 py-2.5 bg-primary text-white rounded-full font-bold uppercase tracking-widest text-[10px] shadow-lg transition-all"
               >
                 <Phone size={14} /> Call Support
               </a>
            </div>
          </div>

          <div className="md:hidden flex items-center gap-3">
            <button onClick={onToggleTheme} className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button onClick={() => setIsDrawerOpen(true)} className="p-2 text-slate-600 dark:text-slate-300">
              <Menu size={28} />
            </button>
          </div>
        </div>
      </nav>

      <div 
        className={`fixed inset-0 bg-slate-950/60 backdrop-blur-md z-[150] transition-opacity duration-500 md:hidden ${isDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsDrawerOpen(false)}
      />

      <div 
        className={`fixed top-0 right-0 bottom-0 w-[85%] max-w-xs bg-white dark:bg-background-dark z-[160] shadow-2xl transition-transform duration-500 md:hidden ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
            <MbsysLogo className="h-7" />
            <button onClick={() => setIsDrawerOpen(false)} className="p-2 text-slate-500">
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-12 px-8">
            <div className="flex flex-col space-y-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`text-4xl font-display font-bold uppercase tracking-tight transition-all ${
                    currentPath === link.href ? 'text-primary' : 'text-slate-900 dark:text-slate-100'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>
            <div className="mt-16 pt-12 border-t border-slate-100 dark:border-slate-800 space-y-8">
               <p className="font-bold text-2xl text-slate-900 dark:text-white">+91 988-6374-122</p>
               <a href="tel:+919886374122" className="flex items-center justify-center gap-3 w-full py-5 bg-primary text-white font-bold uppercase tracking-widest text-sm rounded-xl">
                 <Phone size={18} /> Call Now
               </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;