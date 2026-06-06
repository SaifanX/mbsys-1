"use client";

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, X, AlertCircle, MessageSquare, ArrowUpRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ScrollReveal from '../../components/ScrollReveal';
import { Server, Shield, Wifi, Video, Home as HomeIcon, PenTool } from 'lucide-react';
import { Service } from '../../types';
import { CmsProvider, useCms } from "../../lib/cms";
import AdminBar from "../../components/AdminBar";
import EditableText from "../../components/EditableText";
import EditableImage from "../../components/EditableImage";

const iconMap: { [key: string]: any } = {
  'infra-amc': Server,
  'cctv-surveillance': Video,
  'networking-wifi': Wifi,
  'security-firewall': Shield,
  'home-automation': HomeIcon,
  'interiors-renovation': PenTool,
};

const ServiceCard: React.FC<{ 
  service: any, 
  idx: number, 
  onExpand: (s: any) => void 
}> = ({ service, idx, onExpand }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [imgError, setImgError] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { isAdmin } = useCms();

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const IconComp = iconMap[service.id] || Server;

  return (
    <ScrollReveal 
      delay={idx * 100} 
      onClick={() => !isAdmin && onExpand(service)} // Disable modal expand if editing directly
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
          <EditableImage
            path={`list[${idx}].image`}
            alt={`${service.title} implementation`}
            className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
            wrapperClassName="w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent pointer-events-none"></div>
          <div className="absolute bottom-6 left-6 p-4 bg-secondary/20 backdrop-blur-md rounded-full border border-secondary/40 pointer-events-none">
            <IconComp className="text-white w-6 h-6 sm:w-8 sm:h-8" />
          </div>
        </div>

        <div className="p-8 sm:p-12 relative z-20">
          <h3 
            itemProp="name"
            className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white mb-4 sm:mb-6 group-hover:text-secondary transition-colors"
          >
            <EditableText path={`list[${idx}].title`} />
          </h3>
          <p 
            itemProp="description"
            className="text-slate-600 dark:text-slate-400 font-sans text-sm sm:text-base mb-8 sm:mb-10 leading-relaxed"
          >
            <EditableText path={`list[${idx}].description`} />
          </p>

          {isAdmin ? (
            <button
              onClick={() => onExpand(service)}
              className="px-4 py-2 bg-slate-800 text-white rounded text-xs font-bold uppercase tracking-wider hover:bg-secondary transition-colors"
            >
              📝 Edit Details Modal
            </button>
          ) : (
            <div className="inline-flex items-center text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-secondary group-hover:text-primary transition-all group-hover:gap-2">
              Service Details <ArrowRight size={18} className="ml-3 group-hover:translate-x-2 transition-transform" />
            </div>
          )}
        </div>
      </div>
    </ScrollReveal>
  );
};

export default function ServicesClient({ initialData }: { initialData: any }) {
  const fallbackData = {
    title: "Technical Excellence Without Compromise",
    description: "We provide mission-critical infrastructure solutions designed for performance, security, and long-term scalability.",
    list: [
      { 
        id: 'infra-amc', 
        title: 'IT Infrastructure & Support', 
        slug: 'it-infrastructure-support',
        description: 'Design, implementation, and maintenance of mission-critical IT environments in Bengaluru.', 
        longDescription: 'We design, implement, and maintain complete IT infrastructure for businesses. Our Annual Maintenance Contracts (AMC) cover system monitoring, troubleshooting, and scheduled upgrades.',
        features: ['Infrastructure Design', 'Maintenance Contracts (AMC)', 'Proactive System Monitoring', 'System Troubleshooting'],
        image: 'https://images.unsplash.com/photo-1597733336794-12d05021d510?q=60&w=1200&auto=format' 
      },
      { 
        id: 'cctv-surveillance', 
        title: 'CCTV & Security Solutions', 
        slug: 'cctv-security-solutions',
        description: 'Professional IP camera installations for reliable business surveillance.', 
        longDescription: 'End-to-end security solutions including site assessment, camera selection, installation, and configuration to ensure reliable office surveillance.',
        features: ['Site Security Assessment', 'High-Definition Installation', 'Network Configuration', 'Routine Maintenance'],
        image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=60&w=1200&auto=format' 
      },
      { 
        id: 'networking-wifi', 
        title: 'Networking & Connectivity', 
        slug: 'networking-connectivity',
        description: 'High-performance cabling and scalable wireless solutions for business continuity.', 
        longDescription: 'We deploy structured cabling and high-performance wireless networks that deliver stable and secure connectivity for modern office environments.',
        features: ['Structured Cabling', 'Wireless Network Design', 'Secure Connectivity', 'Commercial Installations'],
        image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=60&w=1200&auto=format' 
      },
      { 
        id: 'security-firewall', 
        title: 'Data Security & Firewalls', 
        slug: 'data-security-firewalls',
        description: 'Advanced network security to protect critical business data.', 
        longDescription: 'Advanced firewall deployment and network security solutions to protect your systems from cyber threats and unauthorized access.',
        features: ['Firewall Deployment', 'Network Hardening', 'Security Audits', 'Access Control Systems'],
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=60&w=1200&auto=format' 
      },
      { 
        id: 'home-automation', 
        title: 'Smart Office Solutions', 
        slug: 'smart-office-solutions',
        description: 'Integration of lighting, security, and smart access control systems.', 
        longDescription: 'Our smart office solutions integrate lighting, security, and access control into a single manageable system for efficiency and comfort.',
        features: ['System Integration', 'Automated Lighting Control', 'Access Management', 'Energy Efficiency'],
        image: 'https://images.unsplash.com/photo-1558002038-1055907df827?q=60&w=1200&auto=format' 
      },
      { 
        id: 'interiors-renovation', 
        title: 'Office Interiors & Renovation', 
        slug: 'office-renovation-interiors',
        description: 'Modern workspace design with integrated technical infrastructure.', 
        longDescription: 'We deliver functional office interiors and renovation solutions, seamlessly integrating IT, networking, and security infrastructure for a clean workspace.',
        features: ['Office Space Planning', 'Turnkey Renovations', 'Infrastructure Integration', 'Modern Design Standards'],
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=60&w=1200&auto=format' 
      }
    ]
  };

  const finalInitialData = { ...fallbackData, ...(initialData || {}) };

  return (
    <CmsProvider pageName="services" initialData={finalInitialData}>
      <ServicesMain />
    </CmsProvider>
  );
}

function ServicesMain() {
  const router = useRouter();
  const { draftData, isAdmin } = useCms();
  const [expandedService, setExpandedService] = useState<any | null>(null);
  const [expandedIdx, setExpandedIdx] = useState<number>(-1);
  const [isImgLoaded, setIsImgLoaded] = useState(false);
  const [modalImgError, setModalImgError] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
    return `https://wa.me/919886374122?text=${encodeURIComponent(message)}`;
  };

  const handleExpand = (service: any) => {
    const idx = draftData.list.findIndex((s: any) => s.id === service.id);
    setExpandedIdx(idx);
    setExpandedService(service);
  };

  const IconComp = expandedService ? (iconMap[expandedService.id] || Server) : Server;

  return (
    <div className="min-h-screen pt-32 pb-20 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <div className="max-w-3xl mb-20">
            <h1 className="text-4xl sm:text-7xl font-display font-bold text-slate-900 dark:text-white tracking-tighter mb-8 leading-none">
              <EditableText path="title" />
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
              <EditableText path="description" />
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {draftData.list.map((service: any, idx: number) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              idx={idx} 
              onExpand={handleExpand} 
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {expandedService && mounted && createPortal(
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
              className="fixed top-6 right-6 z-[100001] p-4 bg-white/10 hover:bg-primary/20 border border-white/20 rounded-full text-white backdrop-blur-xl transition-all hover:scale-110 active:scale-95 group cursor-pointer"
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
                <EditableImage
                  path={`list[${expandedIdx}].image`}
                  alt={expandedService.title}
                  className="w-full h-full object-cover"
                  wrapperClassName="w-full h-full"
                />
              </div>

              <div className="w-full p-8 sm:p-14 lg:p-16 space-y-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-3 text-secondary">
                    <IconComp size={22} />
                    <span className="text-xs sm:text-sm uppercase font-bold tracking-[0.3em]">Technical Specification</span>
                  </div>
                  <h2 className="text-3xl sm:text-5xl font-display font-bold text-slate-900 dark:text-white tracking-tighter">
                    <EditableText path={`list[${expandedIdx}].title`} />
                  </h2>
                </div>

                <div className="text-lg sm:text-xl lg:text-2xl text-slate-600 dark:text-slate-400 font-sans leading-relaxed font-light">
                  <EditableText path={`list[${expandedIdx}].longDescription`} element="p" />
                </div>

                <div className="space-y-6">
                  <h4 className="text-xs sm:text-sm font-bold uppercase tracking-[0.4em] text-slate-500">Key Features</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {expandedService.features.map((feature: string, i: number) => (
                      <div key={i} className="flex items-center gap-4 p-5 bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 rounded-xl">
                        <CheckCircle2 size={20} className="text-secondary shrink-0" />
                        <span className="text-sm sm:text-lg font-sans text-slate-800 dark:text-slate-200">
                          <EditableText path={`list[${expandedIdx}].features[${i}]`} />
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8 flex flex-col sm:flex-row gap-4">
                   <button 
                     onClick={() => {
                       setExpandedService(null);
                       router.push(`/services/${expandedService.slug}`);
                     }}
                     className="flex-1 py-5 bg-slate-900 dark:bg-slate-800 text-white font-bold uppercase tracking-[0.4em] text-xs flex items-center justify-center gap-4 rounded-xl hover:bg-primary transition-all cursor-pointer"
                   >
                     <ArrowUpRight size={18} /> View Case Study
                   </button>
                   <a href={getWhatsAppLink(expandedService.title)} target="_blank" rel="noopener noreferrer" className="flex-1 py-5 bg-green-600 text-white font-bold uppercase tracking-[0.3em] text-sm flex items-center justify-center gap-4 rounded-xl text-center">
                    <MessageSquare size={22} /> WhatsApp Inquiry
                   </a>
                </div>
              </div>
            </motion.div>
          </div>,
          document.body
        )}
      </AnimatePresence>

      <AdminBar />
    </div>
  );
}
