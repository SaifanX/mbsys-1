import React from 'react';
import { ArrowRight, Zap, CheckCircle, Activity, Globe, ExternalLink, ShieldCheck } from 'lucide-react';
import Counter from '../components/Counter';
import XRaySlider from '../components/XRaySlider';
import MbsysLogo from '../components/MbsysLogo';
import TestimonialCarousel from '../components/TestimonialCarousel';
import { Service, Testimonial } from '../types';

interface HomeProps {
  services: Service[];
  onNavigate: (path: string) => void;
}

const Home: React.FC<HomeProps> = ({ services, onNavigate }) => {
  const testimonials: Testimonial[] = [
    { id: '1', author: 'Arjun Mehta', role: 'CTO', company: 'Nexus FinTech', quote: "MBSYS didn't just install hardware; they architected a nervous system for our headquarters." },
    { id: '2', author: 'Sarah Jenkins', role: 'Operations Director', company: 'CloudCore Labs', quote: "The environment controls reduced our facility energy overhead by 30%." },
    { id: '3', author: 'Vikram Singh', role: 'Head of Security', company: 'Indigo Retail', quote: "The advanced system architecture provided by MBSYS is game-changing." }
  ];

  const handleLinkClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <div className="animate-in fade-in duration-700 bg-background-light dark:bg-background-dark">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-32 pb-12 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 tech-grid opacity-30 pointer-events-none transition-opacity"></div>
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
           <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-secondary/10 dark:bg-secondary/5 rounded-full blur-[100px] animate-pulse-slow"></div>
           <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]"></div>
           <div className="scan-line animate-scan opacity-20 dark:opacity-40"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 backdrop-blur-sm shadow-sm transition-all">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-[10px] font-tech font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Systems Operational</span>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-display font-bold leading-[0.9] tracking-tighter text-slate-900 dark:text-white">
                Connecting <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-red-600">Dots.</span>
              </h1>
              
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed border-l-2 border-primary/50 pl-6">
                Precision digital integration for mission-critical environments. We bridge architectural vision with high-performance technical reality.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <a 
                  href="#services" 
                  onClick={(e) => handleLinkClick(e, '#services')}
                  className="group relative px-8 py-4 bg-primary text-white font-bold uppercase tracking-widest text-sm rounded-sm overflow-hidden shadow-lg shadow-red-500/20 active:scale-95 transition-transform"
                >
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite]"></div>
                  <span className="relative flex items-center gap-2">Explore Services <ArrowRight size={16} /></span>
                </a>
                <button 
                  onClick={(e) => handleLinkClick(e, '#about')}
                  className="px-8 py-4 bg-white dark:bg-transparent border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold uppercase tracking-widest text-sm rounded-sm hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-95 transition-all"
                >
                  About MBSYS
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 md:gap-6 relative">
               <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 blur-3xl -z-10"></div>
               
               <div className="glass-panel p-6 md:p-8 rounded-sm hover:-translate-y-1 transition-all duration-300 border-t-2 border-t-secondary/50 shadow-sm dark:shadow-none">
                  <Zap className="text-secondary mb-4 w-8 h-8" />
                  <div className="text-3xl md:text-4xl font-bold mb-1 text-slate-900 dark:text-white"><Counter end={10} suffix="+" /></div>
                  <p className="text-[10px] font-tech uppercase tracking-widest text-slate-500 dark:text-slate-400">Years Active</p>
               </div>
               <div className="glass-panel p-6 md:p-8 rounded-sm hover:-translate-y-1 transition-all duration-300 border-t-2 border-t-primary/50 shadow-sm dark:shadow-none">
                  <CheckCircle className="text-primary mb-4 w-8 h-8" />
                  <div className="text-3xl md:text-4xl font-bold mb-1 text-slate-900 dark:text-white"><Counter end={100} suffix="+" /></div>
                  <p className="text-[10px] font-tech uppercase tracking-widest text-slate-500 dark:text-slate-400">Projects</p>
               </div>
               <div className="glass-panel p-6 md:p-8 rounded-sm hover:-translate-y-1 transition-all duration-300 border-t-2 border-t-primary/50 shadow-sm dark:shadow-none">
                  <Activity className="text-primary mb-4 w-8 h-8" />
                  <div className="text-3xl md:text-4xl font-bold mb-1 text-slate-900 dark:text-white"><Counter end={500} suffix="+" /></div>
                  <p className="text-[10px] font-tech uppercase tracking-widest text-slate-500 dark:text-slate-400">Active Nodes</p>
               </div>
               <div className="glass-panel p-6 md:p-8 rounded-sm hover:-translate-y-1 transition-all duration-300 border-t-2 border-t-secondary/50 shadow-sm dark:shadow-none">
                  <Globe className="text-secondary mb-4 w-8 h-8" />
                  <div className="text-3xl md:text-4xl font-bold mb-1 text-slate-900 dark:text-white">24/7</div>
                  <p className="text-[10px] font-tech uppercase tracking-widest text-slate-500 dark:text-slate-400">Ops Grid</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Protocol */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex items-center gap-8">
            <MbsysLogo className="h-14 md:h-16" />
            <div className="h-12 w-px bg-slate-300 dark:bg-slate-700"></div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                 <ShieldCheck className="text-green-500" size={20} />
                 <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white">Verified Partner</h3>
              </div>
              <p className="text-sm text-slate-500 font-sans">Trusted technical authority in Bengaluru</p>
            </div>
          </div>
          <a 
            href="https://maps.app.goo.gl/7aEp8tyHSyCm8fUh6" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group px-8 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded shadow hover:shadow-xl transition-all hover:border-secondary flex items-center gap-3"
          >
            <span className="font-tech font-bold uppercase tracking-widest text-xs text-slate-700 dark:text-slate-300">Locate HQ</span> 
            <ExternalLink className="text-slate-400 group-hover:text-secondary transition-colors" size={16} />
          </a>
        </div>
      </section>

      {/* X-Ray Visualization */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-white dark:bg-[#0B1120] -z-10 transition-colors"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="mb-16 md:flex justify-between items-end">
              <div className="max-w-2xl">
                <span className="text-primary font-tech font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Visual Intercept</span>
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-slate-900 dark:text-white">Infrastructure Reveal</h2>
                <p className="text-slate-600 dark:text-slate-400 text-lg">Drag the scanner to reveal the technical mesh behind the visual finishes. We ensure beauty and brains coexist.</p>
              </div>
              <div className="hidden md:block pb-2">
                 <div className="flex items-center gap-2 text-xs font-mono uppercase text-slate-500">
                    <span className="w-2 h-2 rounded-full bg-slate-900 dark:bg-white transition-colors"></span> Visual
                    <span className="w-8 h-px bg-slate-300 dark:bg-slate-700 mx-2 transition-colors"></span>
                    <span className="w-2 h-2 rounded-full bg-secondary"></span> System
                 </div>
              </div>
           </div>
           
           <XRaySlider 
              imageBefore="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop"
              imageAfter="https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=2000&auto=format&fit=crop"
              labelBefore="Visual Layer"
              labelAfter="Tech Layer"
           />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-slate-50 dark:bg-slate-900/30 border-t border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display text-slate-900 dark:text-white mb-4">Client Transmissions</h2>
            <div className="w-24 h-1 bg-secondary mx-auto"></div>
          </div>
          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </section>
    </div>
  );
};

export default Home;