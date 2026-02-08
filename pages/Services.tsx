import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2, X, Calendar, ShieldCheck, Loader2, AlertCircle, MessageSquare } from 'lucide-react';
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
  const [imgError, setImgError] = React.useState(false);
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
        itemScope 
        itemType="https://schema.org/Service"
        className="group relative bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 rounded-sm overflow-hidden hover:shadow-2xl transition-all duration-700 hover:border-secondary/30"
      >
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10"
          style={{
            background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, rgba(6, 182, 212, 0.1), transparent 85%)`
          }}
        />

        <div className="h-56 sm:h-64 overflow-hidden relative bg-slate-100 dark:bg-slate-900">
          {!imgError ? (
            <img 
              itemProp="image"
              src={service.image} 
              alt={`${service.title} implementation`} 
              onError={() => setImgError(true)}
              className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" 
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-40">
               <AlertCircle className="text-slate-400 mb-2" size={32} />
               <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Image Unavailable</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
          <div className="absolute bottom-6 left-6 p-4 bg-secondary/20 backdrop-blur-md rounded-full border border-secondary/40">
            <service.icon className="text-white w-6 h-6 sm:w-8 sm:h-8" />
          </div>
        </div>
        <div className="p-8 sm:p-12 relative z-20">
          <h3 
            itemProp="name"
            className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white mb-4 sm:mb-6 group-hover:text-secondary transition-colors"
          >
            {service.title}
          </h3>
          <p 
            itemProp="description"
            className="text-slate-600 dark:text-slate-400 font-sans text-sm sm:text-base mb-8 sm:mb-10 leading-relaxed"
          >
            {service.description}
          </p>
          <button 
            onClick={() => onExpand(service)}
            className="inline-flex items-center text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-secondary hover:text-primary transition-all group/link"
          >
            Service Details <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-3 transition-transform" />
          </button>
        </div>
      </div>
    </ScrollReveal>
  );
};

const Services: React.FC<ServicesProps> = ({ services, onNavigate }) => {
  const [expandedService, setExpandedService] = useState<Service | null>(null);
  const [isImgLoaded, setIsImgLoaded] = useState(false);
  const [modalImgError, setModalImgError] = useState(false);

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

  const getWhatsAppLink = (serviceTitle: string) => {
    const phoneNumber = "919886374122";
    const message = `I would like to inquire about your ${serviceTitle} services.`;
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="pt-32 sm:pt-48 pb-24">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
        <ScrollReveal className="mb-16 sm:mb-32 text-center sm:text-left">
          <span className="text-primary font-bold tracking-[0.4em] uppercase text-xs sm:text-sm mb-4 block">Our Solutions</span>
          <h2 className="text-5xl sm:text-7xl md:text-8xl font-display font-bold text-slate-900 dark:text-white mb-6 sm:mb-8 tracking-tighter">Technical Expertise</h2>
          <div className="w-32 h-1.5 bg-secondary mx-auto sm:mx-0 rounded-full"></div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
          {services.map((service, idx) => (
            <ServiceCard key={service.id} service={service} idx={idx} onExpand={setExpandedService} />
          ))}
        </div>
      </div>

      {expandedService && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-8 lg:p-16">
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-3xl" onClick={() => setExpandedService(null)}></div>
          
          <div className="relative w-full max-w-4xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 rounded-2xl shadow-3xl overflow-y-auto flex flex-col animate-modal-enter max-h-[94vh] mt-4">
            <button onClick={() => setExpandedService(null)} className="fixed lg:absolute top-6 right-6 z-[10000] p-4 bg-primary text-white rounded-full shadow-2xl transition-all">
              <X size={28} />
            </button>
            
            <div className="w-full h-64 sm:h-96 lg:h-[450px] overflow-hidden relative shrink-0">
              {!modalImgError ? (
                <img 
                  src={expandedService.image} 
                  alt={expandedService.title} 
                  onLoad={() => setIsImgLoaded(true)}
                  onError={() => setModalImgError(true)}
                  className={`w-full h-full object-cover transition-opacity duration-700 ${isImgLoaded ? 'opacity-100' : 'opacity-0'}`} 
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-slate-900">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Image Unavailable</p>
                </div>
              )}
              <div className="absolute top-6 left-6 flex items-center gap-3 px-5 py-2.5 bg-slate-900/85 backdrop-blur-md rounded-full border border-white/10">
                 <ShieldCheck size={18} className="text-secondary" />
                 <span className="text-xs font-bold text-white tracking-[0.2em] uppercase">Quality Assured</span>
              </div>
            </div>

            <div className="w-full p-8 sm:p-14 lg:p-16 space-y-8 bg-white dark:bg-surface-dark">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-3 text-secondary">
                  <expandedService.icon size={22} />
                  <span className="text-xs sm:text-sm uppercase font-bold tracking-[0.3em]">Technical Specification</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-display font-bold text-slate-900 dark:text-white tracking-tighter">
                  {expandedService.title}
                </h2>
              </div>

              <p className="text-lg sm:text-xl lg:text-2xl text-slate-600 dark:text-slate-400 font-sans leading-relaxed font-light">
                {expandedService.longDescription}
              </p>

              <div className="space-y-6">
                <h4 className="text-xs sm:text-sm font-bold uppercase tracking-[0.4em] text-slate-500">Key Features</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {expandedService.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-4 p-5 bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 rounded-xl">
                      <CheckCircle2 size={20} className="text-secondary shrink-0" />
                      <span className="text-sm sm:text-lg font-sans text-slate-800 dark:text-slate-200">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-10 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row gap-4 pb-10">
                <a href="https://cal.id/mbsys" target="_blank" className="flex-1 py-5 bg-primary text-white font-bold uppercase tracking-[0.3em] text-sm flex items-center justify-center gap-4 rounded-xl">
                  <Calendar size={22} /> Book Audit
                </a>
                <a href={getWhatsAppLink(expandedService.title)} target="_blank" className="flex-1 py-5 bg-green-600 text-white font-bold uppercase tracking-[0.3em] text-sm flex items-center justify-center gap-4 rounded-xl">
                  <MessageSquare size={22} /> WhatsApp Inquiry
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;