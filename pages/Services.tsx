import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2, X, Calendar, ShieldCheck } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import { Service } from '../types';

interface ServicesProps {
  services: Service[];
  onNavigate: (path: string) => void;
}

interface ServiceCardProps {
  service: Service;
  idx: number;
  onExpand: (s: Service) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  service, 
  idx, 
  onExpand 
}) => {
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  const cardRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <ScrollReveal delay={idx * 100} duration={800}>
      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className="group relative bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 rounded-sm overflow-hidden hover:shadow-[0_30px_60px_rgba(6,182,212,0.15)] transition-all duration-700 hover:border-secondary/30"
      >
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10"
          style={{
            background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, rgba(6, 182, 212, 0.12), transparent 85%)`
          }}
        />

        <div className="h-56 sm:h-64 overflow-hidden relative">
          <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
          <div className="absolute bottom-6 left-6 p-4 bg-secondary/20 backdrop-blur-md rounded-full border border-secondary/40">
            <service.icon className="text-white w-6 h-6 sm:w-8 sm:h-8" />
          </div>
        </div>
        <div className="p-8 sm:p-12 relative z-20">
          <h3 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white mb-4 sm:mb-6 group-hover:text-secondary transition-colors leading-tight">
            {service.title}
          </h3>
          <p className="text-slate-600 dark:text-slate-400 font-sans text-sm sm:text-base mb-8 sm:mb-10 leading-relaxed opacity-90">
            {service.description}
          </p>
          <button 
            onClick={() => onExpand(service)}
            className="inline-flex items-center text-xs sm:text-sm font-tech font-black uppercase tracking-[0.25em] text-secondary hover:text-primary transition-all group/link"
          >
            Explore Protocol <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-3 transition-transform" />
          </button>
        </div>
      </div>
    </ScrollReveal>
  );
};

const Services: React.FC<ServicesProps> = ({ services, onNavigate }) => {
  const [expandedService, setExpandedService] = useState<Service | null>(null);

  useEffect(() => {
    if (expandedService) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [expandedService]);

  return (
    <div className="pt-32 sm:pt-48 pb-24">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
        <ScrollReveal className="mb-16 sm:mb-32 text-center sm:text-left">
          <span className="text-primary font-tech font-bold tracking-[0.4em] uppercase text-xs sm:text-sm mb-4 block">Architectural Solutions</span>
          <h2 className="text-5xl sm:text-7xl md:text-8xl font-display font-bold text-slate-900 dark:text-white mb-6 sm:mb-8 leading-none tracking-tighter">Expertise Stack</h2>
          <div className="w-32 sm:w-48 h-2 bg-secondary mx-auto sm:mx-0 rounded-full"></div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
          {services.map((service, idx) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              idx={idx} 
              onExpand={setExpandedService} 
            />
          ))}
        </div>
      </div>

      {/* Expanded Details Overlay */}
      {expandedService && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-8 lg:p-16">
          <div 
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-3xl animate-fade-in"
            onClick={() => setExpandedService(null)}
          >
            <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-3 text-white/40 font-tech text-xs uppercase tracking-[0.6em] animate-pulse">
               Click anywhere to exit
            </div>
          </div>
          
          <div className="relative w-full max-w-6xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 rounded-2xl shadow-3xl overflow-hidden flex flex-col lg:flex-row animate-modal-enter max-h-[94vh] mt-12 lg:mt-0">
            
            <button 
              onClick={() => setExpandedService(null)}
              className="absolute top-6 right-6 z-[10000] p-4 bg-primary text-white rounded-full transition-all border border-white/20 shadow-2xl active:scale-90 group hover:scale-110"
              aria-label="Close details"
            >
              <X size={28} className="group-hover:rotate-90 transition-transform duration-300" />
            </button>
            
            <div className="w-full lg:w-1/2 h-48 sm:h-80 lg:h-auto overflow-hidden relative shrink-0">
              <img src={expandedService.image} alt={expandedService.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-white dark:from-surface-dark via-transparent to-transparent opacity-70"></div>
              
              <div className="absolute top-6 left-6 flex items-center gap-3 px-5 py-2.5 bg-slate-900/85 backdrop-blur-md rounded-full border border-white/10">
                 <ShieldCheck size={18} className="text-secondary" />
                 <span className="text-xs font-tech font-bold text-white tracking-[0.2em] uppercase">Verified Protocol</span>
              </div>
            </div>

            <div className="w-full lg:w-1/2 p-8 sm:p-14 lg:p-20 space-y-8 sm:space-y-12 overflow-y-auto custom-scrollbar bg-white dark:bg-surface-dark">
              <div className="space-y-4 sm:space-y-6 pt-4 lg:pt-0">
                <div className="inline-flex items-center gap-3 text-secondary">
                  <expandedService.icon size={22} />
                  <span className="font-tech text-xs sm:text-sm uppercase font-bold tracking-[0.4em]">Protocol // Sync</span>
                </div>
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-slate-900 dark:text-white tracking-tighter leading-none">{expandedService.title}</h2>
              </div>

              <p className="text-lg sm:text-xl lg:text-2xl text-slate-600 dark:text-slate-400 font-sans leading-relaxed font-light">
                {expandedService.longDescription}
              </p>

              <div className="space-y-6 sm:space-y-8">
                <h4 className="text-xs sm:text-sm font-tech font-black uppercase tracking-[0.4em] text-slate-500">Infrastructure Nodes</h4>
                <div className="grid grid-cols-1 gap-4 sm:gap-5">
                  {expandedService.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-4 p-5 sm:p-6 bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 rounded-xl">
                      <CheckCircle2 size={20} className="text-secondary shrink-0" />
                      <span className="text-sm sm:text-lg font-sans font-medium text-slate-800 dark:text-slate-200">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-10 sm:pt-14 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-4 sm:gap-6">
                <a 
                  href="https://cal.id/mbsys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-5 sm:py-6 bg-primary text-white font-tech font-bold uppercase tracking-[0.4em] text-sm sm:text-base hover:bg-red-600 transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-4 rounded-xl"
                >
                  <Calendar size={22} /> Book Technical Audit
                </a>
                <div className="grid grid-cols-2 gap-4 sm:gap-6">
                   <button 
                    onClick={() => {
                      setExpandedService(null);
                      onNavigate('#contact');
                    }}
                    className="py-4 sm:py-5 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-tech font-bold uppercase tracking-[0.4em] text-xs sm:text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all rounded-xl"
                  >
                    Manual Inquiry
                  </button>
                  <button 
                    onClick={() => setExpandedService(null)}
                    className="py-4 sm:py-5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-tech font-bold uppercase tracking-[0.4em] text-xs sm:text-sm hover:text-primary transition-all rounded-xl"
                  >
                    Close Protocol
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;