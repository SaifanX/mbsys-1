import React from 'react';
import MbsysLogo from './MbsysLogo';
import { MapPin, Phone, Mail, ChevronRight, Github, Linkedin, Twitter, ExternalLink } from 'lucide-react';

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
      title: "Solutions",
      links: [
        { name: "IT Infrastructure", href: "#services" },
        { name: "CCTV Surveillance", href: "#services" },
        { name: "Networking & Wi-Fi", href: "#services" },
        { name: "Home Automation", href: "#services" },
      ]
    },
    {
      title: "Company",
      links: [
        { name: "Our Story", href: "#about" },
        { name: "Technical Milestones", href: "#about" },
        { name: "HQ Operations", href: "#contact" },
        { name: "Careers", href: "#contact" },
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Privacy Protocol", href: "#" },
        { name: "Security Standards", href: "#" },
        { name: "Terms of Service", href: "#" },
        { name: "Support Grid", href: "#contact" },
      ]
    }
  ];

  return (
    <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 relative z-10 overflow-hidden transition-colors duration-500">
      {/* Top Footer: Brand & Link Grid */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-8">
            <a href="#" onClick={(e) => handleLinkClick(e, '#')} className="inline-block hover:scale-105 transition-transform duration-300">
              <MbsysLogo className="h-12 dark:brightness-200 transition-all" />
            </a>
            <p className="text-base sm:text-lg leading-relaxed max-w-sm text-slate-500 dark:text-slate-400 font-light italic">
              "Connecting dots between architectural vision and technical reality for mission-critical infrastructure."
            </p>
            <div className="flex items-center gap-4">
              {[Twitter, Linkedin, Github].map((Icon, i) => (
                <a key={i} href="#" className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:text-primary hover:border-primary transition-all active:scale-90">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Dynamic Link Columns */}
          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {footerColumns.map((col, i) => (
              <div key={i} className="space-y-6">
                <h4 className="text-xs sm:text-sm font-tech font-black uppercase tracking-[0.3em] text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-4">
                  {col.title}
                </h4>
                <ul className="space-y-4">
                  {col.links.map((link, j) => (
                    <li key={j}>
                      <a 
                        href={link.href} 
                        onClick={(e) => link.href.startsWith('#') && handleLinkClick(e, link.href)}
                        className="text-sm sm:text-base hover:text-primary dark:hover:text-secondary transition-colors font-medium flex items-center group"
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

          {/* Direct Comms Column */}
          <div className="lg:col-span-3 space-y-6">
            <h4 className="text-xs sm:text-sm font-tech font-black uppercase tracking-[0.3em] text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-4">
              Contact Us
            </h4>
            <div className="space-y-5">
              <div className="flex gap-4">
                <div className="p-3 bg-secondary/10 rounded-xl shrink-0 h-fit">
                  <Phone size={18} className="text-secondary" />
                </div>
                <div>
                  <p className="text-[10px] font-tech font-bold uppercase tracking-widest text-slate-400 mb-1">Phone</p>
                  <a href="tel:+919886374122" className="text-sm sm:text-base font-bold text-slate-900 dark:text-white hover:text-primary transition-colors">+91 98863 74122</a>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="p-3 bg-primary/10 rounded-xl shrink-0 h-fit">
                  <Mail size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-[10px] font-tech font-bold uppercase tracking-widest text-slate-400 mb-1">Email</p>
                  <a href="mailto:info@mbsys.co.in" className="text-sm sm:text-base font-bold text-slate-900 dark:text-white hover:text-primary transition-colors">info@mbsys.co.in</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Presence Area */}
      <div className="w-full border-y border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/20">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-4 p-8 sm:p-12 lg:p-16 flex flex-col justify-center space-y-8 bg-slate-50 dark:bg-slate-900/50">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-primary text-white rounded-2xl shadow-lg">
                <MapPin size={24} />
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white">HQ Coordinates</h3>
            </div>
            <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed font-light">
              Located in the heart of Bengaluru's southern tech hub, our operational center manages grids across JP Nagar and beyond.
            </p>
            <a 
              href="https://maps.app.goo.gl/7aEp8tyHSyCm8fUh6" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-fit flex items-center gap-3 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-tech font-bold uppercase tracking-widest rounded-lg hover:scale-105 transition-all shadow-xl active:scale-95"
            >
              Initialize Navigation <ExternalLink size={14} />
            </a>
          </div>
          <div className="lg:col-span-8 h-[350px] lg:h-auto relative group overflow-hidden">
            <div className="absolute inset-0 pointer-events-none z-10 bg-slate-900/20 dark:bg-slate-900/40 mix-blend-multiply group-hover:opacity-0 transition-opacity duration-1000"></div>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248897.0497830073!2d77.28269998671874!3d12.906666699999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15f17ca16937%3A0x1394a04740953861!2sMBSYS!5e0!3m2!1sen!2sin!4v1768919217116!5m2!1sen!2sin" 
              className="w-full h-full grayscale invert-[.75] dark:invert border-0 contrast-[1.1] transition-all duration-1000 group-hover:grayscale-0 group-hover:invert-0"
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="MBSYS HQ Location"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Legal Bottom Bar */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 py-10 text-center space-y-6">
        <p className="text-[10px] sm:text-xs font-tech font-bold uppercase tracking-[0.4em] opacity-60 dark:opacity-40 transition-colors">
          © 2026 MBSYS INFRASTRUCTURE CORP. REGISTERED BENGALURU, KA.
        </p>
        
        <div className="max-w-4xl mx-auto">
          <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-500 font-medium leading-relaxed opacity-70 dark:opacity-50 transition-colors">
            MBSYS operates as a professional technical architecture and infrastructure partner. All security deployments adhere strictly to local regulatory data sovereignty protocols. Performance metrics are site-dependent.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-[10px] font-tech font-bold uppercase tracking-[0.25em] opacity-60 dark:opacity-40">
          {['Privacy Policy', 'Security Audit', 'Service Terms', 'Support Grid', 'Liability Protocol'].map((item, i) => (
            <a 
              key={i} 
              href="#" 
              className="hover:text-primary dark:hover:text-white hover:opacity-100 transition-all relative group"
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