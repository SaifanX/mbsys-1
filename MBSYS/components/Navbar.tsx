import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Moon, Sun, Calendar, LayoutGrid } from 'lucide-react';
import MbsysLogo from './MbsysLogo';
import BrandToggle from './BrandToggle';

interface NavbarProps {
  onNavigate: (path: string) => void;
  currentPath: string;
  onSwitchBrand: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPath, onSwitchBrand }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
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
              ? 'mt-4 px-8 py-3 rounded-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/50 dark:border-white/5 shadow-2xl'
              : 'mt-0 px-4 py-6 w-full bg-transparent border-transparent shadow-none'
            }`}
        >
          <a href="/" onClick={(e) => handleLinkClick(e, '/')} className="flex items-center gap-3 group active:scale-95 transition-transform" aria-label="MBSYS Home">
            <MbsysLogo className={`transition-all duration-500 ${scrolled ? 'h-10 md:h-12' : 'h-16 md:h-20'}`} />
          </a>

          <div className="hidden lg:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`text-[12px] font-bold uppercase tracking-[0.3em] transition-all relative group py-2 h-full flex flex-col justify-center ${currentPath === link.href
                  ? 'text-primary'
                  : 'text-slate-600 dark:text-slate-300'
                  } hover:text-primary`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-0 h-[1px] bg-primary transition-all duration-500 ${currentPath === link.href ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'}`}></span>
              </a>
            ))}

            <div className="flex items-center gap-6 pl-10 border-l border-slate-200/50 dark:border-white/10">
              <BrandToggle currentBrand="mbsys" onToggle={onSwitchBrand} />
            </div>

            <div className={`flex items-center gap-4 ml-6 transition-all duration-500`}>
              <a
                href="https://cal.id/mbsys"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-secondary transition-colors text-[10px] font-bold uppercase tracking-widest px-3"
              >
                <Calendar size={14} /> <span>Consult</span>
              </a>
              <a
                href="tel:+919886374122"
                className="flex items-center gap-3 px-8 py-3.5 bg-primary text-white rounded-full font-bold uppercase tracking-widest text-[10px] shadow-[0_10px_20px_-10px_rgba(177,141,89,0.5)] hover:shadow-[0_15px_25px_-10px_rgba(177,141,89,0.6)] hover:-translate-y-0.5 transition-all active:scale-95"
              >
                <Phone size={14} /> Support
              </a>
            </div>
          </div>

          <div className="lg:hidden flex items-center gap-4">
            <button onClick={() => setIsDrawerOpen(true)} className="p-2 text-slate-600 dark:text-slate-300" aria-label="Open Menu">
              <Menu size={28} />
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[150] transition-opacity duration-500 lg:hidden ${isDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsDrawerOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white dark:bg-slate-900 z-[160] shadow-2xl transition-transform duration-700 lg:hidden ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-8 border-b border-slate-100 dark:border-white/5">
            <MbsysLogo className="h-12" />
            <button onClick={() => setIsDrawerOpen(false)} className="p-3 text-slate-500 hover:rotate-90 transition-transform duration-300">
              <X size={28} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-12 px-10">
            <div className="flex flex-col space-y-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`text-5xl font-display font-bold uppercase tracking-tight transition-all hover:translate-x-2 duration-300 ${currentPath === link.href ? 'text-primary' : 'text-slate-900 dark:text-slate-100'
                    }`}
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="mt-16 pt-12 border-t border-slate-100 dark:border-white/5 space-y-10">
              <div className="flex flex-col gap-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Switch Experience</span>
                <div className="flex">
                  <BrandToggle currentBrand="mbsys" onToggle={onSwitchBrand} />
                </div>
              </div>

              <div className="space-y-6">
                <p className="font-bold text-3xl text-slate-900 dark:text-white tracking-tight">+91 98863-74122</p>
                <a href="tel:+919886374122" className="flex items-center justify-center gap-4 w-full py-6 bg-primary text-white font-bold uppercase tracking-widest text-[10px] rounded-full shadow-2xl hover:scale-[1.02] active:scale-95 transition-all">
                  <Phone size={18} /> Support Line
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