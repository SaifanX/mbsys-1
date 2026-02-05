import React from 'react';
import { Terminal, Cpu, Shield, Globe, Activity, Calendar, ArrowRight } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import { TimelineItem } from '../types';

interface AboutProps {
  timeline: TimelineItem[];
  onNavigate: (path: string) => void;
}

interface TimelineCardProps {
  item: TimelineItem;
  index: number;
}

const TimelineCard: React.FC<TimelineCardProps> = ({ item, index }) => {
  return (
    <ScrollReveal 
      delay={index * 150} 
      className={`relative pl-12 pb-12 sm:pb-16`}
    >
      <div className="absolute left-0 top-0 h-full w-px bg-slate-200 dark:bg-slate-800"></div>
      <div className="absolute left-[-5px] top-3 w-2.5 h-2.5 rounded-full bg-primary shadow-sm"></div>
      
      <div className="space-y-4 sm:space-y-5 group text-left">
        <span className="inline-block px-4 py-1.5 rounded-sm bg-slate-100 dark:bg-slate-800 text-xs sm:text-sm font-sans font-bold text-secondary tracking-[0.3em] uppercase border border-slate-200 dark:border-slate-700">
          {item.year}
        </span>
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors leading-none">
          {item.title}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 font-sans text-base sm:text-lg leading-relaxed max-w-2xl">
          {item.description}
        </p>
      </div>
    </ScrollReveal>
  );
};

const About: React.FC<AboutProps> = ({ timeline, onNavigate }) => {
  const coreValues = [
    { icon: Cpu, title: 'Precision', desc: 'Expert engineering and installation standards for all infrastructure components.' },
    { icon: Shield, title: 'Reliability', desc: 'Durable and secure systems designed for continuous operation.' },
    { icon: Globe, title: 'Compliance', desc: 'Alignment with international industry standards and local regulations.' },
    { icon: Activity, title: 'Monitoring', desc: 'Proactive maintenance and support systems for peak performance.' }
  ];

  return (
    <div className="pt-32 sm:pt-48 pb-24 bg-background-light dark:bg-background-dark transition-colors overflow-x-hidden">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 mb-24 sm:mb-48 items-center">
          <ScrollReveal className="space-y-10 sm:space-y-12 text-center sm:text-left">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <span className="text-xs font-sans font-bold text-primary tracking-[0.4em] uppercase">Company Overview</span>
            </div>
            <h1 className="text-5xl sm:text-7xl md:text-8xl 2xl:text-9xl font-display font-bold text-slate-900 dark:text-white leading-[0.95] tracking-tighter transition-colors">
              Infrastructure <br/><span className="text-secondary">Excellence.</span>
            </h1>
            <p className="text-lg sm:text-2xl text-slate-600 dark:text-slate-400 font-sans leading-relaxed border-l-0 sm:border-l-4 border-slate-200 dark:border-slate-800 sm:pl-10 py-4 transition-colors font-light">
              Headquartered in Bengaluru, MBSYS delivers professional technical solutions by integrating advanced infrastructure with functional design.
            </p>
            <div className="grid grid-cols-2 gap-8 sm:gap-12 pt-6">
              <div>
                <p className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-slate-900 dark:text-white transition-colors">100%</p>
                <p className="text-xs sm:text-sm font-sans font-bold uppercase tracking-[0.3em] text-slate-500 mt-2">Client Focus</p>
              </div>
              <div>
                <p className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-slate-900 dark:text-white transition-colors">500+</p>
                <p className="text-xs sm:text-sm font-sans font-bold uppercase tracking-[0.3em] text-slate-500 mt-2">Projects Completed</p>
              </div>
            </div>
          </ScrollReveal>
          
          <ScrollReveal direction="down" delay={300} className="relative group mt-12 lg:mt-0">
            <div className="relative aspect-[4/5] lg:aspect-square rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl transition-all duration-1000">
              <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000" 
                alt="Infrastructure Project" 
                loading="lazy"
                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent flex items-end p-10 sm:p-14">
                <div className="space-y-2 sm:space-y-4 text-white">
                  <p className="font-sans font-bold text-xs tracking-[0.4em] uppercase opacity-70">Bengaluru Headquarters</p>
                  <p className="font-display font-bold text-2xl sm:text-4xl text-secondary leading-tight">Professional Technical <br/>Operations</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Core Values */}
        <div className="mb-24 sm:mb-48">
          <ScrollReveal className="text-center mb-20 sm:mb-24">
            <span className="text-primary font-sans font-bold tracking-[0.6em] uppercase text-xs sm:text-sm mb-6 block">Our Standards</span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-bold text-slate-900 dark:text-white leading-none tracking-tighter">Technical Excellence</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
            {coreValues.map((value, i) => (
              <ScrollReveal key={i} delay={i * 150} className="p-10 sm:p-14 bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 rounded-2xl hover:border-secondary transition-all hover:-translate-y-4 group shadow-lg text-center">
                <value.icon className="w-12 h-12 sm:w-16 sm:h-16 text-primary mb-8 sm:mb-12 mx-auto transition-transform duration-500" />
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-slate-900 dark:text-white mb-4 transition-colors leading-tight">{value.title}</h3>
                <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-400 font-sans leading-relaxed transition-colors opacity-90">{value.desc}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-24 sm:mb-48">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            <ScrollReveal className="lg:col-span-5 lg:sticky lg:top-48 h-fit text-center lg:text-left">
              <span className="text-secondary font-sans font-bold tracking-[0.6em] uppercase text-xs sm:text-sm mb-6 block">Our History</span>
              <h2 className="text-5xl sm:text-7xl md:text-8xl font-display font-bold text-slate-900 dark:text-white mb-8 transition-colors leading-none tracking-tighter">Milestones</h2>
              <p className="text-lg sm:text-xl text-slate-500 dark:text-slate-400 font-sans max-w-md mx-auto lg:mx-0 leading-relaxed font-light">Established since 2016, we have a proven track record of delivering reliable technical infrastructure.</p>
            </ScrollReveal>
            <div className="lg:col-span-7">
              <div className="max-w-3xl mx-auto lg:mx-0">
                {timeline.map((item, i) => (
                  <TimelineCard key={i} item={item} index={i} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Final Conversion CTA */}
        <ScrollReveal className="mb-24 p-12 lg:p-24 bg-slate-900 dark:bg-slate-800/80 border border-slate-900 dark:border-white/10 text-white rounded-3xl overflow-hidden relative group">
           <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left">
              <div className="space-y-6">
                 <h2 className="text-4xl sm:text-6xl font-display font-bold leading-none tracking-tighter">Discuss Your Project</h2>
                 <p className="text-lg sm:text-xl opacity-70 font-sans max-w-xl leading-relaxed">Partner with our technical team to design and deploy robust infrastructure for your facility.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-6 shrink-0 w-full lg:w-auto">
                 <a 
                   href="https://cal.id/mbsys" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="px-12 py-6 bg-primary text-white font-sans font-bold uppercase tracking-[0.2em] rounded-xl shadow-2xl hover:scale-105 active:scale-95 transition-all text-center flex items-center justify-center gap-4"
                 >
                   <Calendar size={20} /> Schedule Consultation
                 </a>
                 <button 
                   onClick={() => onNavigate('#contact')}
                   className="px-12 py-6 border border-white/20 font-sans font-bold uppercase tracking-[0.2em] rounded-xl hover:bg-white/10 transition-all text-center flex items-center justify-center gap-4"
                 >
                   Contact Us <ArrowRight size={20} />
                 </button>
              </div>
           </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default About;