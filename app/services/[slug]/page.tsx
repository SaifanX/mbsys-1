import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, CheckCircle2, Phone, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import ScrollReveal from '../../../components/ScrollReveal';
import { SERVICES } from '../../../constants';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const service = SERVICES.find(s => s.slug === slug);
  
  if (!service) {
    return {
      title: 'Service Not Found | MBSYS',
      description: 'The requested service could not be found.',
    };
  }

  return {
    title: `${service.title} | Technical Expert Bengaluru`,
    description: service.longDescription,
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = SERVICES.find(s => s.slug === slug);

  if (!service) {
    notFound();
  }

  const Icon = service.icon;

  return (
    <div className="pt-32 sm:pt-48 pb-24 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
        <ScrollReveal className="mb-12">
          <Link 
            href="/services"
            className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors font-sans font-bold uppercase tracking-widest text-xs"
          >
            <ArrowLeft size={16} /> Back to Services
          </Link>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <ScrollReveal className="space-y-8">
            <div className="inline-flex items-center gap-4 px-5 py-2.5 rounded-xl bg-primary/10 border border-primary/20">
              <Icon className="text-primary w-6 h-6" />
              <span className="text-xs font-bold text-primary tracking-[0.4em] uppercase">Core Expertise</span>
            </div>
            
            <h1 className="text-5xl sm:text-7xl font-display font-bold text-slate-900 dark:text-white leading-[0.9] tracking-tighter">
              {service.title} <span className="text-secondary block mt-2">Precision Systems.</span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-400 font-sans leading-relaxed border-l-4 border-slate-200 dark:border-slate-800 pl-8 py-2">
              {service.longDescription}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
              {service.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-4 p-5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary transition-all">
                  <CheckCircle2 className="text-primary shrink-0" size={20} />
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">{feature}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={300} className="relative group">
            <div className="aspect-[4/5] sm:aspect-square rounded-3xl overflow-hidden shadow-3xl border border-slate-200 dark:border-slate-800">
              <img 
                src={service.image} 
                alt={`${service.title} Professional Implementation Bengaluru`} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-12 left-12 right-12 text-white space-y-4">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="text-secondary" size={24} />
                  <span className="font-sans font-bold tracking-[0.4em] uppercase text-xs opacity-70">Bengaluru Certified</span>
                </div>
                <h3 className="text-3xl font-display font-bold">Integrated Reliability</h3>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Technical Deep Dive Section */}
        <div className="mt-32 pt-32 border-t border-slate-200 dark:border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
             <div className="lg:col-span-1 space-y-6">
                <span className="text-secondary font-bold tracking-[0.6em] uppercase text-xs">Technical Specs</span>
                <h2 className="text-4xl font-display font-bold text-slate-900 dark:text-white leading-none">Engineering Standards</h2>
                <p className="text-slate-600 dark:text-slate-400 font-sans leading-relaxed">Our implementation protocols exceed industry standards, ensuring your infrastructure is built for the future.</p>
             </div>
             <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="p-10 bg-slate-900 text-white rounded-2xl space-y-6 border border-white/5 shadow-2xl">
                   <Zap className="text-primary w-10 h-10" />
                   <h3 className="text-2xl font-display font-bold">Performance Optimized</h3>
                   <p className="text-slate-400 font-sans leading-relaxed">High-bandwidth architecture designed to handle peak enterprise loads without latency.</p>
                </div>
                <div className="p-10 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl space-y-6 hover:shadow-xl transition-all">
                   <ShieldCheck className="text-secondary w-10 h-10" />
                   <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white">Security First</h3>
                   <p className="text-slate-600 dark:text-slate-400 font-sans leading-relaxed">Every component is audited for security vulnerabilities before being deployed into your network.</p>
                </div>
             </div>
          </div>
        </div>

        {/* Conversion CTA */}
        <ScrollReveal className="mt-32 p-12 lg:p-24 bg-primary text-white rounded-3xl overflow-hidden relative group text-center">
           <div className="absolute inset-0 tech-grid opacity-20 group-hover:opacity-30 transition-opacity"></div>
           <div className="relative z-10 space-y-8 max-w-3xl mx-auto">
              <h2 className="text-4xl sm:text-6xl font-display font-bold tracking-tighter">Ready to Deploy?</h2>
              <p className="text-lg sm:text-xl opacity-80 font-sans leading-relaxed">Contact our engineering team today for a technical audit of your {service.title} requirements.</p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
                 <a 
                   href="tel:+919886374122"
                   className="px-12 py-6 bg-white text-primary font-bold uppercase tracking-widest rounded-xl hover:scale-105 transition-all flex items-center justify-center gap-4 shadow-2xl"
                 >
                   <Phone size={20} /> Call Engineering
                 </a>
                 <Link 
                   href="/contact"
                   className="px-12 py-6 border border-white/30 font-bold uppercase tracking-widest rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-4"
                 >
                   Online Quote <ArrowRight size={20} />
                 </Link>
              </div>
           </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
