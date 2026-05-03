import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, X, Calendar, ShieldCheck, Loader2, AlertCircle, MessageSquare, ArrowUpRight } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import SEO from '../components/SEO';
import { Service } from '../types';

interface ServicesProps {
  services: Service[];
  onNavigate: (path: string) => void;
}

const ServiceCard: React.FC<{ service: Service, idx: number, onExpand: (s: Service) => void }> = ({ service, idx, onExpand }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [imgError, setImgError] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <ScrollReveal 
      delay={idx * 100} 
      onClick={() => onExpand(service)}
      className="h-full"
    >
      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        itemScope 
        itemType="https://schema.org/Service"
        className="group relative bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-700 hover:border-secondary/30 cursor-pointer h-full"
      >
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(6, 182, 212, 0.1), transparent 85%)`
          }}
        />

        <div className="h-64 overflow-hidden relative bg-slate-100 dark:bg-slate-900">
          {!imgError ? (
            <img 
              itemProp="image"
              src={service.image} 
              alt={`${service.title} implementation`} 
              onError={() => setImgError(true)}
              className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" 
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
            className="text-slate-600 dark:text-slate-400 font-sans text-sm sm:text-base mb-8 sm:mb-10 leading-relaxed line-clamp-3"
          >
            {service.description}
          </p>
          <div className="inline-flex items-center text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-secondary group-hover:text-primary transition-all group-hover:gap-2">
            Service Details <ArrowRight size={18} className="ml-3 group-hover:translate-x-2 transition-transform" />
          </div>
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
      setIsImgLoaded(false);
      setModalImgError(false);
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [expandedService]);

  const getWhatsAppLink = (title: string) => {
    const message = `Hello MBSYS, I am interested in your ${title} services. Please provide more information.`;
    return `https://wa.me/91XXXXXXXXXX?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-slate-50 dark:bg-slate-950">
      <SEO 
        title="Expert Technical Services | IT, Security & Infrastructure"
        description="Explore MBSYS's comprehensive technical services in Bengaluru. From IT AMC and network security to CCTV and smart office solutions."
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <div className="max-w-3xl mb-20">
            <h1 className="text-4xl sm:text-7xl font-display font-bold text-slate-900 dark:text-white tracking-tighter mb-8">
              Technical <span className="text-secondary">Excellence</span> <br/>
              Without Compromise
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
              We provide mission-critical infrastructure solutions designed for performance, 
              security, and long-term scalability.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              idx={idx} 
              onExpand={(s) => setExpandedService(s)} 
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {expandedService && createPortal(
          <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 sm:p-8 lg:p-16">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 bg-slate-950/95 backdrop-blur-xl" 
              onClick={() => setExpandedService(null)}
            ></motion.div>
            
            <motion.button 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => setExpandedService(null)}
              className="fixed top-6 right-6 z-[100001] p-4 bg-white/10 hover:bg-primary/20 border border-white/20 rounded-full text-white backdrop-blur-xl transition-all hover:scale-110 active:scale-95 group"
            >
              <X size={28} className="group-hover:rotate-90 transition-transform duration-300" />
            </motion.button>
            
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.98 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-5xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-y-auto flex flex-col max-h-[92vh] mt-4 no-scrollbar will-change-transform"
            >
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
              </div>

              <div className="w-full p-8 sm:p-14 lg:p-16 space-y-8">
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

                <div className="pt-8 flex flex-col sm:flex-row gap-4">
                   <button 
                     onClick={() => {
                       setExpandedService(null);
                       onNavigate(`/services/${expandedService.slug}`);
                     }}
                     className="flex-1 py-5 bg-slate-900 dark:bg-slate-800 text-white font-bold uppercase tracking-[0.4em] text-xs flex items-center justify-center gap-4 rounded-xl hover:bg-primary transition-all"
                   >
                     <ArrowUpRight size={18} /> View Case Study
                   </button>
                   <a href={getWhatsAppLink(expandedService.title)} target="_blank" className="flex-1 py-5 bg-green-600 text-white font-bold uppercase tracking-[0.3em] text-sm flex items-center justify-center gap-4 rounded-xl">
                    <MessageSquare size={22} /> WhatsApp Inquiry
                   </a>
                </div>
              </div>
            </motion.div>
          </div>,
          document.body
        )}
      </AnimatePresence>
    </div>
  );
};

export default Services;
