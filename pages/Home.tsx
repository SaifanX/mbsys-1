import React from 'react';
import { ArrowRight, Zap, CheckCircle, Activity, Globe, ExternalLink, ShieldCheck, Calendar } from 'lucide-react';
import Counter from '../components/Counter';
import XRaySlider from '../components/XRaySlider';
import MbsysLogo from '../components/MbsysLogo';
import TestimonialCarousel from '../components/TestimonialCarousel';
import ScrollReveal from '../components/ScrollReveal';
import { Service, Testimonial } from '../types';

interface HomeProps {
  services: Service[];
  onNavigate: (path: string) => void;
}

const Home: React.FC<HomeProps> = ({ services, onNavigate }) => {
  const testimonials: Testimonial[] = [
    { id: '1', author: 'Arjun Mehta', role: 'CTO', company: 'Nexus FinTech', quote: "MBSYS designed a robust IT infrastructure that serves as the backbone of our regional headquarters." },
    { id: '2', author: 'Sarah Jenkins', role: 'Operations Director', company: 'CloudCore Labs', quote: "The smart facility controls significantly improved our operational efficiency and energy management." },
    { id: '3', author: 'Vikram Singh', role: 'Head of Security', company: 'Indigo Retail', quote: "The comprehensive security architecture provided by MBSYS has set a new standard for our retail outlets." }
  ];

  const handleLinkClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <div className="bg-background-light dark:bg-background-dark">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-28 sm:pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 tech-grid opacity-30 pointer-events-none transition-opacity"></div>
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
           <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-secondary/10 dark:bg-secondary/5 rounded-full blur-[100px]"></div>
           <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]"></div>
        </div>
        
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            <ScrollReveal className="space-y-8 sm:space-y-10 text-left">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/80 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 backdrop-blur-sm shadow-sm transition-all">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                </span>
                <span className="text-xs sm:text-sm font-sans font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Services Active</span>
              </div>
              
              <h1 className="text-5xl sm:text-7xl md:text-8xl 2xl:text-9xl font-display font-bold leading-[1.0] tracking-tighter text-slate-900 dark:text-white">
                Integrated <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-red-600">Solutions.</span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed border-l-4 border-primary/50 pl-6 sm:pl-8">
                Professional infrastructure integration for enterprise environments. We align architectural design with technical performance.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 pt-6">
                <a 
                  href="https://cal.id/mbsys" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative px-10 py-5 bg-primary text-white font-bold uppercase tracking-[0.2em] text-sm rounded-sm overflow-hidden shadow-xl shadow-red-500/20 active:scale-95 transition-transform flex items-center justify-center gap-3"
                >
                  <Calendar size={20} /> Schedule a Site Audit
                </a>
                <a 
                  href="#services" 
                  onClick={(e) => handleLinkClick(e, '#services')}
                  className="px-10 py-5 bg-white dark:bg-transparent border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-bold uppercase tracking-[0.2em] text-sm rounded-sm hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-95 transition-all flex items-center justify-center gap-3"
                >
                  View Services <ArrowRight size={20} />
                </a>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200} className="grid grid-cols-2 gap-6 md:gap-8 relative mt-12 lg:mt-0">
               <div className="glass-panel p-8 md:p-12 rounded-sm hover:-translate-y-2 transition-all duration-300 border-t-4 border-t-secondary/50 shadow-xl dark:shadow-none">
                  <Zap className="text-secondary mb-6 w-8 h-8 md:w-10 md:h-10" />
                  <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 text-slate-900 dark:text-white"><Counter end={10} suffix="+" /></div>
                  <p className="text-xs md:text-sm font-sans font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Years of Expertise</p>
               </div>
               <div className="glass-panel p-8 md:p-12 rounded-sm hover:-translate-y-2 transition-all duration-300 border-t-4 border-t-primary/50 shadow-xl dark:shadow-none">
                  <CheckCircle className="text-primary mb-6 w-8 h-8 md:w-10 md:h-10" />
                  <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 text-slate-900 dark:text-white"><Counter end={100} suffix="+" /></div>
                  <p className="text-xs md:text-sm font-sans font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Successful Projects</p>
               </div>
               <div className="glass-panel p-8 md:p-12 rounded-sm hover:-translate-y-2 transition-all duration-300 border-t-4 border-t-primary/50 shadow-xl dark:shadow-none">
                  <Activity className="text-primary mb-6 w-8 h-8 md:w-10 md:h-10" />
                  <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 text-slate-900 dark:text-white"><Counter end={500} suffix="+" /></div>
                  <p className="text-xs md:text-sm font-sans font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Managed Endpoints</p>
               </div>
               <div className="glass-panel p-8 md:p-12 rounded-sm hover:-translate-y-2 transition-all duration-300 border-t-4 border-t-secondary/50 shadow-xl dark:shadow-none">
                  <Globe className="text-secondary mb-6 w-8 h-8 md:w-10 md:h-10" />
                  <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 text-slate-900 dark:text-white">24/7</div>
                  <p className="text-xs md:text-sm font-sans font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Technical Support</p>
               </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Trust Protocol */}
      <section className="py-16 sm:py-24 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800 transition-colors">
        <ScrollReveal className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex flex-col sm:flex-row items-center gap-10 text-center sm:text-left">
            <MbsysLogo className="h-16 md:h-20" />
            <div className="hidden sm:block h-16 w-px bg-slate-300 dark:bg-slate-700"></div>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-3 mb-2">
                 <ShieldCheck className="text-green-500" size={24} />
                 <h3 className="text-2xl md:text-3xl font-bold font-display text-slate-900 dark:text-white">Professional Partner</h3>
              </div>
              <p className="text-sm md:text-base text-slate-500 font-sans">Trusted infrastructure authority in Bengaluru</p>
            </div>
          </div>
          <a 
            href="https://maps.app.goo.gl/7aEp8tyHSyCm8fUh6" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group px-8 py-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-sm shadow-lg hover:shadow-2xl transition-all hover:border-secondary flex items-center gap-4 w-full sm:w-auto justify-center"
          >
            <span className="font-sans font-bold uppercase tracking-[0.25em] text-xs text-slate-700 dark:text-slate-300">View HQ Location</span> 
            <ExternalLink className="text-slate-400 group-hover:text-secondary transition-colors" size={18} />
          </a>
        </ScrollReveal>
      </section>

      {/* X-Ray Visualization */}
      <section className="py-24 sm:py-36 relative">
        <div className="absolute inset-0 bg-white dark:bg-[#0B1120] -z-10 transition-colors"></div>
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
           <ScrollReveal className="mb-16 sm:mb-20 md:flex justify-between items-end">
              <div className="max-w-3xl text-center sm:text-left">
                <span className="text-primary font-sans font-bold tracking-[0.4em] uppercase text-xs mb-4 block">Technical Insights</span>
                <h2 className="text-4xl sm:text-6xl font-display font-bold mb-6 text-slate-900 dark:text-white leading-tight">Infrastructure Overview</h2>
                <p className="text-slate-600 dark:text-slate-400 text-lg sm:text-xl max-w-2xl">Use the interactive viewer to explore the structural systems integrated within high-end finishes.</p>
              </div>
              <div className="hidden md:block pb-4">
                 <div className="flex items-center gap-4 text-sm font-sans font-bold uppercase tracking-widest text-slate-500">
                    <span className="w-3 h-3 rounded-full bg-slate-900 dark:bg-white transition-colors"></span> Finished
                    <span className="w-12 h-px bg-slate-300 dark:bg-slate-700 mx-2"></span>
                    <span className="w-3 h-3 rounded-full bg-secondary"></span> Structural
                 </div>
              </div>
           </ScrollReveal>
           
           <ScrollReveal delay={300}>
             <XRaySlider 
                imageBefore="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000"
                imageAfter="https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=2000"
                labelBefore="Visual Design"
                labelAfter="Infrastructure System"
             />
           </ScrollReveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 sm:py-36 bg-slate-50 dark:bg-slate-900/30 border-t border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
          <ScrollReveal className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold font-display text-slate-900 dark:text-white mb-6">Client Feedback</h2>
            <div className="w-32 h-1.5 bg-secondary mx-auto rounded-full"></div>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <TestimonialCarousel testimonials={testimonials} />
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Home;