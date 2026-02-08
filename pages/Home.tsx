import React from 'react';
import { ArrowRight, Zap, CheckCircle, Activity, Globe, ExternalLink, ShieldCheck, Calendar, Award, Users, ShieldAlert } from 'lucide-react';
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
    { id: '2', author: 'Sarah Jenkins', role: 'Operations Director', company: 'CloudCore Labs', quote: "The smart systems significantly improved our operational efficiency and facility management." },
    { id: '3', author: 'Vikram Singh', role: 'Head of Security', company: 'Indigo Retail', quote: "The comprehensive security architecture provided by MBSYS has set a new standard for our outlets." }
  ];

  const handleLinkClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  const differentiators = [
    {
      icon: Award,
      title: "Technical Expertise",
      description: "Our team consists of certified engineers with over a decade of experience in deploying complex technical infrastructure.",
      bullets: ["Technical Proficiency", "Advanced Certifications", "Industry Compliance"]
    },
    {
      icon: ShieldCheck,
      title: "Reliability & Uptime",
      description: "We deliver mission-critical systems designed for high performance and zero-downtime operations.",
      bullets: ["Proactive Monitoring", "Robust Architecture", "24/7 Support Readiness"]
    },
    {
      icon: Users,
      title: "Client-Centric Focus",
      description: "We prioritize long-term partnerships, tailoring technical solutions to specific operational goals.",
      bullets: ["Customized Solutions", "Transparent Communication", "Result-Oriented Approach"]
    }
  ];

  return (
    <div className="bg-background-light dark:bg-background-dark">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-28 sm:pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 tech-grid opacity-30 pointer-events-none"></div>
        
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            <ScrollReveal className="space-y-8 text-left">
              <ScrollReveal delay={100} direction="down">
                <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/80 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 backdrop-blur-sm shadow-sm">
                  <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-slate-500">Service Status: Online</span>
                </div>
              </ScrollReveal>
              
              <ScrollReveal delay={200}>
                <h1 className="text-5xl sm:text-7xl md:text-8xl font-display font-bold leading-[1.0] tracking-tighter text-slate-900 dark:text-white">
                  Integrated <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-red-600">Infrastructure.</span>
                </h1>
              </ScrollReveal>
              
              <ScrollReveal delay={300}>
                <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed border-l-4 border-primary/50 pl-6 sm:pl-8">
                  Professional engineering for enterprise environments. We align architectural design with technical performance.
                </p>
              </ScrollReveal>
              
              <ScrollReveal delay={400} className="flex flex-col sm:flex-row gap-6 pt-6">
                <a href="https://cal.id/mbsys" target="_blank" className="px-10 py-5 bg-primary text-white font-bold uppercase tracking-[0.2em] text-sm rounded-sm shadow-xl flex items-center justify-center gap-3 hover:scale-105 transition-transform duration-300">
                  <Calendar size={20} /> Book Site Audit
                </a>
                <a href="#services" onClick={(e) => handleLinkClick(e, '#services')} className="px-10 py-5 bg-white dark:bg-transparent border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-bold uppercase tracking-[0.2em] text-sm rounded-sm flex items-center justify-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300">
                  Our Services <ArrowRight size={20} />
                </a>
              </ScrollReveal>
            </ScrollReveal>

            <ScrollReveal delay={500} className="grid grid-cols-2 gap-6 relative mt-12 lg:mt-0">
               <div className="glass-panel p-8 md:p-12 rounded-sm border-t-4 border-t-secondary/50 hover:-translate-y-2 transition-transform duration-500">
                  <Zap className="text-secondary mb-6 w-8 h-8 md:w-10 md:h-10" />
                  <div className="text-4xl md:text-5xl font-bold mb-2 text-slate-900 dark:text-white"><Counter end={10} suffix="+" /></div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Years of Experience</p>
               </div>
               <div className="glass-panel p-8 md:p-12 rounded-sm border-t-4 border-t-primary/50 hover:-translate-y-2 transition-transform duration-500">
                  <CheckCircle className="text-primary mb-6 w-8 h-8 md:w-10 md:h-10" />
                  <div className="text-4xl md:text-5xl font-bold mb-2 text-slate-900 dark:text-white"><Counter end={100} suffix="+" /></div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Successful Projects</p>
               </div>
               <div className="glass-panel p-8 md:p-12 rounded-sm border-t-4 border-t-primary/50 hover:-translate-y-2 transition-transform duration-500">
                  <Activity className="text-primary mb-6 w-8 h-8 md:w-10 md:h-10" />
                  <div className="text-4xl md:text-5xl font-bold mb-2 text-slate-900 dark:text-white"><Counter end={500} suffix="+" /></div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Managed Systems</p>
               </div>
               <div className="glass-panel p-8 md:p-12 rounded-sm border-t-4 border-t-secondary/50 hover:-translate-y-2 transition-transform duration-500">
                  <Globe className="text-secondary mb-6 w-8 h-8 md:w-10 md:h-10" />
                  <div className="text-4xl md:text-5xl font-bold mb-2 text-slate-900 dark:text-white">24/7</div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Technical Support</p>
               </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Partner Section */}
      <section className="py-16 sm:py-24 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800">
        <ScrollReveal className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex flex-col sm:flex-row items-center gap-10">
            <MbsysLogo className="h-16 md:h-20" />
            <div className="hidden sm:block h-16 w-px bg-slate-300 dark:bg-slate-700"></div>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-3 mb-2">
                 <ShieldCheck className="text-green-500" size={24} />
                 <h3 className="text-2xl md:text-3xl font-bold font-display text-slate-900 dark:text-white">Professional Partner</h3>
              </div>
              <p className="text-sm md:text-base text-slate-500">Authorized Infrastructure Authority in Bengaluru</p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Implementation Overview */}
      <section className="py-24 sm:py-36 relative">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
           <ScrollReveal className="mb-16 sm:mb-20 md:flex justify-between items-end">
              <div className="max-w-3xl">
                <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Project Insights</span>
                <h2 className="text-4xl sm:text-6xl font-display font-bold mb-6 text-slate-900 dark:text-white leading-tight">Implementation Overview</h2>
                <p className="text-slate-600 dark:text-slate-400 text-lg sm:text-xl">Explore the technical infrastructure integrated within our finished interior projects.</p>
              </div>
           </ScrollReveal>
           <ScrollReveal delay={300}>
             <XRaySlider 
                imageBefore="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000"
                imageAfter="https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=2000"
                labelBefore="Finished Design"
                labelAfter="Technical Systems"
             />
           </ScrollReveal>
        </div>
      </section>

      {/* Why Choose MBSYS */}
      <section className="py-24 sm:py-36 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 tech-grid opacity-10 pointer-events-none"></div>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
          <ScrollReveal className="text-center mb-20">
            <span className="text-secondary font-bold tracking-[0.4em] uppercase text-xs sm:text-sm mb-4 block">Core Differentiators</span>
            <h2 className="text-4xl sm:text-6xl font-display font-bold mb-6">Why Choose MBSYS</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {differentiators.map((item, idx) => (
              <ScrollReveal key={idx} delay={idx * 200} className="bg-slate-800/50 backdrop-blur-sm p-10 rounded-2xl border border-white/5 hover:border-primary/30 transition-all group">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <item.icon className="text-primary w-8 h-8" />
                </div>
                <h3 className="text-2xl font-display font-bold mb-4">{item.title}</h3>
                <p className="text-slate-400 mb-8 leading-relaxed font-light">
                  {item.description}
                </p>
                <ul className="space-y-3">
                  {item.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-slate-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-secondary"></div>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 sm:py-36 bg-slate-50 dark:bg-slate-900/30 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <ScrollReveal className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold font-display text-slate-900 dark:text-white mb-6">Client Testimonials</h2>
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