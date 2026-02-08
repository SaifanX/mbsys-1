import React from 'react';
import MbsysLogo from './MbsysLogo';
import { Phone, Mail, ChevronRight, Github, Linkedin, Twitter } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleLinkClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  const footerColumns = [
    {
      title: "Services",
      links: [
        { name: "IT Infrastructure", href: "#services" },
        { name: "CCTV & Security", href: "#services" },
        { name: "Networking", href: "#services" },
        { name: "Office Interiors", href: "#services" },
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#about" },
        { name: "Milestones", href: "#about" },
        { name: "Contact", href: "#contact" },
        { name: "Careers", href: "#contact" },
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Privacy Policy", href: "#" },
        { name: "Safety Standards", href: "#" },
        { name: "Terms of Service", href: "#" },
        { name: "Customer Support", href: "#contact" },
      ]
    }
  ];

  return (
    <footer className="bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 relative z-10 overflow-hidden transition-colors duration-500">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          <div className="lg:col-span-4 space-y-8">
            <a href="#" onClick={(e) => handleLinkClick(e, '#')} className="inline-block hover:scale-105 transition-transform duration-300">
              <MbsysLogo className="h-12 dark:brightness-200 transition-all" />
            </a>
            <p className="text-base sm:text-lg leading-relaxed max-w-sm text-slate-500 dark:text-slate-400 font-light italic">
              "Professional engineering excellence focused on delivering integrated infrastructure and technical systems."
            </p>
            <div className="flex items-center gap-4">
              {[Twitter, Linkedin, Github].map((Icon, i) => (
                <a key={i} href="#" className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:text-primary hover:border-primary transition-all active:scale-90">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {footerColumns.map((col, i) => (
              <div key={i} className="space-y-6">
                <h4 className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-4">
                  {col.title}
                </h4>
                <ul className="space-y-4">
                  {col.links.map((link, j) => (
                    <li key={j}>
                      <a 
                        href={link.href} 
                        onClick={(e) => link.href.startsWith('#') && handleLinkClick(e, link.href)}
                        className="text-sm sm:text-base hover:text-primary transition-colors font-medium flex items-center group"
                      >
                        <ChevronRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 mr-1 text-primary" />
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="lg:col-span-3 space-y-6">
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-4">
              Contact
            </h4>
            <div className="space-y-5">
              <div className="flex gap-4">
                <div className="p-3 bg-secondary/10 rounded-xl shrink-0 h-fit">
                  <Phone size={18} className="text-secondary" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Phone</p>
                  <a href="tel:+919886374122" className="text-sm sm:text-base font-bold text-slate-900 dark:text-white hover:text-primary transition-colors">+91 98863 74122</a>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="p-3 bg-primary/10 rounded-xl shrink-0 h-fit">
                  <Mail size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Email</p>
                  <a href="mailto:info@mbsys.co.in" className="text-sm sm:text-base font-bold text-slate-900 dark:text-white hover:text-primary transition-colors">info@mbsys.co.in</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 py-10 text-center space-y-6 border-t border-slate-200 dark:border-slate-800">
        <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] opacity-60">
          © 2026 MBSYS INFRASTRUCTURE SOLUTIONS. BENGALURU, INDIA.
        </p>
        
        <div className="max-w-4xl mx-auto">
          <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-500 font-medium leading-relaxed opacity-70">
            MBSYS operates as a professional technical systems and infrastructure partner. All security deployments adhere to local regulatory standards and safety requirements.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">
          {['Privacy Policy', 'Safety Audit', 'Terms of Service', 'Support'].map((item, i) => (
            <a 
              key={i} 
              href="#" 
              className="hover:text-primary transition-all relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;