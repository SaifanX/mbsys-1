import React, { useEffect, useState, useRef } from 'react';
import { Terminal, ArrowRight, Cpu, Shield, Globe, Activity, Fingerprint, Rocket, Microscope, CheckCircle } from 'lucide-react';
import { TimelineItem } from '../types';

interface AboutProps {
  timeline: TimelineItem[];
  onNavigate: (path: string) => void;
}

interface TimelineCardProps {
  item: TimelineItem;
  index: number;
  isVisible: boolean;
}

const TimelineCard: React.FC<TimelineCardProps> = ({ item, index, isVisible }) => {
  return (
    <div 
      className={`relative pl-8 pb-12 transition-all duration-1000 delay-${index * 200} ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
      }`}
    >
      <div className="absolute left-0 top-0 h-full w-px bg-slate-200 dark:bg-slate-800"></div>
      <div className="absolute left-[-4px] top-2 w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_#ef4444]"></div>
      
      <div className="space-y-3 group">
        <span className="inline-block px-3 py-1 rounded-sm bg-slate-100 dark:bg-slate-800 text-[10px] font-tech font-bold text-secondary tracking-widest uppercase border border-slate-200 dark:border-slate-700">
          {item.year}
        </span>
        <h3 className="text-xl lg:text-2xl font-display font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
          {item.title}
        </h3>
        <p className="text-slate-500 dark:text-slate-400 font-sans text-sm leading-relaxed max-w-lg">
          {item.description}
        </p>
      </div>
    </div>
  );
};

const About: React.FC<AboutProps> = ({ timeline, onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const coreValues = [
    { icon: Cpu, title: 'Precision Engineering', desc: 'Every terminal, cable, and rack is placed with millimetric accuracy for peak performance.' },
    { icon: Shield, title: 'Ironclad Security', desc: 'Zero-trust architecture embedded into the physical layer of your infrastructure.' },
    { icon: Globe, title: 'Global Standards', desc: 'Aligning local deployments with international technical protocols and safety codes.' },
    { icon: Activity, title: 'Real-time Vitality', desc: 'Infrastructure that communicates its health status proactively to prevent downtime.' }
  ];

  const advantages = [
    { 
      icon: Fingerprint,
      title: 'Integrated Sovereignty', 
      desc: 'We seamlessly merge architectural interior design with high-end technical infrastructure, eliminating the "tech vs aesthetics" conflict.',
      benefit: 'Invisible complexity, visual excellence.'
    },
    { 
      icon: Microscope,
      title: 'Vendor-Neutral Selection', 
      desc: 'We select best-in-class components for your specific parameters, not tied to hardware brands.',
      benefit: 'Unbiased performance optimization.'
    },
    { 
      icon: Globe,
      title: 'JP Nagar Nexus', 
      desc: 'Our strategic location allows for rapid response to major tech hubs within minutes.',
      benefit: 'Minimizing mission-critical downtime.'
    },
    { 
      icon: Rocket,
      title: 'Legacy Resilience', 
      desc: 'Every system we design includes a scalability roadmap, ensuring growth without structural overhauls.',
      benefit: 'Lower Total Cost of Ownership (TCO).'
    }
  ];

  return (
    <div className="pt-32 pb-20 animate-in fade-in duration-700 bg-background-light dark:bg-background-dark transition-colors duration-500 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
              <Terminal size={14} className="text-primary" />
              <span className="text-[10px] font-tech font-bold text-primary tracking-widest uppercase">System_Genesis // 2016</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-slate-900 dark:text-white leading-[0.9] tracking-tighter transition-colors">
              The Architecture of <br/><span className="text-secondary">Possibility.</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 font-sans leading-relaxed border-l-4 border-slate-200 dark:border-slate-800 pl-8 py-2 transition-colors">
              Founded in the heart of Bengaluru's tech corridor, MBSYS began with a singular mission: to eliminate the gap between architectural vision and technical execution. We don't just provide services; we install the nervous systems of modern enterprise.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-4">
              <div>
                <p className="text-3xl font-display font-bold text-slate-900 dark:text-white transition-colors">100%</p>
                <p className="text-[10px] font-tech font-bold uppercase tracking-widest text-slate-500">Uptime Focus</p>
              </div>
              <div>
                <p className="text-3xl font-display font-bold text-slate-900 dark:text-white transition-colors">500+</p>
                <p className="text-[10px] font-tech font-bold uppercase tracking-widest text-slate-500">Live Grids</p>
              </div>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-secondary/20 blur-2xl opacity-30 group-hover:opacity-60 transition-opacity"></div>
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl transition-all duration-500">
              <img 
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop" 
                alt="Tech Infrastructure" 
                className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent flex items-end p-8">
                <div className="space-y-2 text-white">
                  <p className="font-tech font-bold text-xs tracking-widest uppercase opacity-70">Location: JP Nagar HQ</p>
                  <p className="font-display font-bold text-xl text-secondary">Center of Operations</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The MBSYS Advantage - Unique Selling Propositions */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <span className="text-secondary font-tech font-bold tracking-[0.4em] uppercase text-xs mb-4 block">Competitive Edge</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-4 transition-colors">The MBSYS Advantage</h2>
            <div className="w-24 h-1 bg-secondary mx-auto mb-8"></div>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-sans leading-relaxed transition-colors">
              Why industry leaders in Bengaluru choose our specialized engineering approach over generic contractors.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {advantages.map((adv, idx) => (
              <div 
                key={idx} 
                className="group relative p-8 lg:p-10 rounded-2xl bg-white dark:bg-slate-900/30 backdrop-blur-sm border border-slate-200 dark:border-white/5 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.4)] transition-all duration-500 hover:-translate-y-1 hover:border-secondary/30 overflow-hidden"
              >
                {/* Decorative Icon Background */}
                <div className="absolute -top-4 -right-4 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-700 pointer-events-none">
                   <adv.icon size={160} className="text-slate-900 dark:text-white" />
                </div>
                
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center border border-secondary/20 mb-6 group-hover:bg-secondary/20 transition-all duration-500">
                    <adv.icon className="text-secondary" size={24} />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-4 transition-colors">
                    {adv.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed font-sans text-sm transition-colors">
                    {adv.desc}
                  </p>
                  <div className="flex items-center gap-3 py-3 px-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-800 transition-colors">
                    <CheckCircle className="text-green-500 shrink-0" size={16} />
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 italic transition-colors">{adv.benefit}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Values Grid */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <span className="text-primary font-tech font-bold tracking-[0.4em] uppercase text-xs mb-4 block">Core Directives</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white transition-colors">Technical Protocols</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, i) => (
              <div key={i} className="p-8 bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 rounded-2xl hover:border-secondary transition-all hover:-translate-y-2 group shadow-sm hover:shadow-lg">
                <value.icon className="w-10 h-10 text-primary mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-4 transition-colors">{value.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-sans leading-relaxed transition-colors">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Strategic Evolution (Timeline) */}
        <div ref={sectionRef} className="mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
              <span className="text-secondary font-tech font-bold tracking-[0.4em] uppercase text-xs mb-4 block">Evolution Log</span>
              <h2 className="text-4xl md:text-6xl font-display font-bold text-slate-900 dark:text-white mb-6 transition-colors">Strategic Milestone Grid</h2>
              <p className="text-slate-500 dark:text-slate-400 font-sans transition-colors">Tracing the lineage of connectivity from initial core sync to full-grid dominance.</p>
            </div>
            <div className="lg:col-span-8">
              <div className="max-w-2xl">
                {timeline.map((item, i) => (
                  <TimelineCard key={i} item={item} index={i} isVisible={isVisible} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <section className="relative py-24 rounded-3xl overflow-hidden border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-slate-900/50 shadow-inner transition-colors duration-500">
          <div className="absolute inset-0 tech-grid opacity-5 pointer-events-none"></div>
          <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 mb-8 shadow-sm transition-colors">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              <span className="text-[10px] font-tech font-bold text-slate-500 dark:text-slate-400 tracking-widest uppercase">Awaiting_Instructions // v2.9</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-slate-900 dark:text-white mb-8 tracking-tighter transition-colors">
              Initialize Your <br/><span className="text-primary">Infrastructure Sync.</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 font-sans text-lg mb-12 transition-colors">
              Join the growing network of high-performance environments managed by MBSYS. Secure your channel today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button 
                onClick={() => onNavigate('#contact')}
                className="w-full sm:w-auto px-10 py-5 bg-primary text-white font-tech font-bold uppercase tracking-[0.3em] text-xs hover:bg-red-600 transition-all shadow-xl shadow-red-500/20 active:scale-95 flex items-center justify-center gap-3"
              >
                Start Protocol <ArrowRight size={16} />
              </button>
              <button 
                onClick={() => onNavigate('#services')}
                className="w-full sm:w-auto px-10 py-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-tech font-bold uppercase tracking-[0.3em] text-xs hover:border-secondary transition-all active:scale-95"
              >
                View Catalog
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default About;