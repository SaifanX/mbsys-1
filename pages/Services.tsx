import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2, X, Calendar, ShieldCheck } from 'lucide-react';
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
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="group relative bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 rounded-sm overflow-hidden hover:shadow-[0_20px_50px_rgba(6,182,212,0.1)] transition-all duration-700 hover:border-secondary/30"
      style={{ transitionDelay: `${idx * 100}ms` }}
    >
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10"
        style={{
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(6, 182, 212, 0.1), transparent 80%)`
        }}
      />

      <div className="h-56 overflow-hidden relative">
        <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
        <div className="absolute bottom-6 left-6 p-3 bg-secondary/20 backdrop-blur-md rounded-full border border-secondary/40">
          <service.icon className="text-white w-6 h-6" />
        </div>
      </div>
      <div className="p-10 relative z-20">
        <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white mb-4 group-hover:text-secondary transition-colors">
          {service.title}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 font-sans text-sm mb-8 leading-relaxed opacity-80">
          {service.description}
        </p>
        <button 
          onClick={() => onExpand(service)}
          className="inline-flex items-center text-[10px] font-tech font-black uppercase tracking-[0.2em] text-secondary hover:text-primary transition-all group/link"
        >
          Explore Protocol <ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-2 transition-transform" />
        </button>
      </div>
    </div>
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
    <div className="pt-40 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-24">
          <span className="text-primary font-tech font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Architectural Solutions</span>
          <h2 className="text-5xl md:text-7xl font-display font-bold text-slate-900 dark:text-white mb-6">Expertise Stack</h2>
          <div className="w-32 h-1 bg-secondary"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
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

      {/* Expanded Details Overlay - High Z-Index Hardening */}
      {expandedService && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-2 sm:p-4 lg:p-12">
          {/* Enhanced Backdrop */}
          <div 
            className="fixed inset-0 bg-slate-950/95 backdrop-blur-2xl animate-in fade-in duration-500"
            onClick={() => setExpandedService(null)}
          >
            <div className="absolute top-10 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white/40 font-tech text-[10px] uppercase tracking-[0.5em] animate-pulse">
               Click anywhere to exit sync
            </div>
          </div>
          
          <div className="relative w-full max-w-5xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 rounded-2xl shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col lg:flex-row animate-in zoom-in-95 duration-500 max-h-[92vh] mt-4 lg:mt-0">
            
            {/* Highly Visible Close Button - Isolated from Navbar */}
            <button 
              onClick={() => setExpandedService(null)}
              className="absolute top-6 right-6 z-[1010] p-3 bg-white/90 dark:bg-slate-900/90 hover:bg-primary hover:text-white text-slate-900 dark:text-white backdrop-blur-xl rounded-full transition-all border border-slate-200 dark:border-slate-700 shadow-2xl active:scale-90 group"
              aria-label="Close details"
            >
              <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
            </button>
            
            <div className="w-full lg:w-1/2 h-56 sm:h-72 lg:h-auto overflow-hidden relative shrink-0">
              <img src={expandedService.image} alt={expandedService.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-white dark:from-surface-dark via-transparent to-transparent opacity-60"></div>
              
              <div className="absolute top-6 left-6 flex items-center gap-3 px-4 py-2 bg-slate-900/80 backdrop-blur-md rounded-full border border-white/10">
                 <ShieldCheck size={16} className="text-secondary" />
                 <span className="text-[10px] font-tech font-bold text-white tracking-widest uppercase">Verified Grid Solution</span>
              </div>
            </div>

            <div className="w-full lg:w-1/2 p-6 sm:p-10 lg:p-16 space-y-8 overflow-y-auto custom-scrollbar bg-white dark:bg-surface-dark">
              <div className="space-y-4 pt-4 lg:pt-0">
                <div className="inline-flex items-center gap-2 text-secondary">
                  <expandedService.icon size={22} />
                  <span className="font-tech text-[10px] uppercase font-bold tracking-[0.3em]">Protocol // {expandedService.id.replace('-', ' ')}</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-slate-900 dark:text-white tracking-tight leading-tight">{expandedService.title}</h2>
              </div>

              <p className="text-base lg:text-lg text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
                {expandedService.longDescription}
              </p>

              <div className="space-y-4">
                <h4 className="text-[10px] font-tech font-black uppercase tracking-[0.3em] text-slate-500 dark:text-slate-500">Service Nodes</h4>
                <div className="grid grid-cols-1 gap-3">
                  {expandedService.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 rounded-xl hover:border-secondary/30 transition-colors">
                      <CheckCircle2 size={18} className="text-secondary shrink-0" />
                      <span className="text-sm font-sans font-medium text-slate-800 dark:text-slate-200">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-4">
                <a 
                  href="https://cal.id/mbsys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-5 bg-primary text-white font-tech font-bold uppercase tracking-[0.3em] text-sm hover:bg-red-600 transition-all shadow-xl shadow-red-500/20 active:scale-95 flex items-center justify-center gap-4 rounded-xl"
                >
                  <Calendar size={18} /> Book Technical Audit
                </a>
                <div className="grid grid-cols-2 gap-3">
                   <button 
                    onClick={() => {
                      setExpandedService(null);
                      onNavigate('#contact');
                    }}
                    className="py-4 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-tech font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-slate-50 dark:hover:bg-slate-800 transition-all rounded-xl"
                  >
                    Manual Inquiry
                  </button>
                  <button 
                    onClick={() => setExpandedService(null)}
                    className="py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-tech font-bold uppercase tracking-[0.3em] text-[10px] hover:text-primary transition-all rounded-xl"
                  >
                    Close Protocol
                  </button>
                </div>
              </div>
              
              <div className="pt-10 text-center">
                 <p className="text-[9px] font-mono text-slate-400 uppercase tracking-widest opacity-50">Reference: MBSYS-PR-{(expandedService.id).toUpperCase()}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;