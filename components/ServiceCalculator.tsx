"use client";

import React, { useState, useMemo } from 'react';
import { Calculator, Server, Video, Wifi, ArrowRight, Check, Send } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

type ServiceType = 'CCTV' | 'IT' | 'NETWORKING';

const ServiceCalculator: React.FC = () => {
  const [activeService, setActiveService] = useState<ServiceType>('CCTV');
  const [quantity, setQuantity] = useState(4);
  const [isAdvanced, setIsAdvanced] = useState(false);
  const [contactInfo, setContactInfo] = useState({ email: '', phone: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const estimate = useMemo(() => {
    let base = 0;
    if (activeService === 'CCTV') {
      base = quantity * 4500; // Average price per camera + installation
      if (isAdvanced) base += 8000; // NVR + 2TB storage
    } else if (activeService === 'IT') {
      base = quantity * 1500; // Monthly AMC per system
      if (isAdvanced) base += 5000; // Server management
    } else if (activeService === 'NETWORKING') {
      base = quantity * 2500; // Per point including cabling
      if (isAdvanced) base += 12000; // Manageable switch + Rack
    }
    return base;
  }, [activeService, quantity, isAdvanced]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const submissionData = new FormData();
    submissionData.append("access_key", "e3068bf8-3c15-4094-9444-225621b099e6");
    submissionData.append("subject", "CALCULATOR: New Quote Request");
    submissionData.append("email", contactInfo.email);
    submissionData.append("phone", contactInfo.phone);
    submissionData.append("message", `
      Service: ${activeService}
      Quantity: ${quantity}
      Advanced Mode: ${isAdvanced ? 'Yes' : 'No'}
      Estimated Quote: ₹${estimate.toLocaleString()}
    `);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: submissionData
      });

      if (response.ok) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error('Error submitting calculator lead:', error);
    }
  };

  return (
    <section id="calculator" className="py-24 bg-white dark:bg-slate-900 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* Text Content */}
          <div className="w-full lg:w-1/2 space-y-8">
            <ScrollReveal>
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 text-primary">
                <Calculator size={18} />
                <span className="text-xs font-bold uppercase tracking-[0.2em]">Instant Estimator</span>
              </div>
              <h2 className="text-5xl sm:text-6xl font-display font-bold text-slate-900 dark:text-white mt-6 tracking-tighter leading-tight">
                Get a Ballpark <br />
                <span className="text-primary italic">Estimate in 30s.</span>
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-md leading-relaxed mt-6">
                Stop guessing. Use our industrial-grade calculator to get an immediate cost projection for your infrastructure projects.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
              {[
                "Transparent Pricing",
                "No Hidden Fees",
                "Custom Configurable",
                "Instant Lead Ingestion"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="p-1 bg-secondary/20 rounded-full">
                    <Check size={14} className="text-secondary" />
                  </div>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Calculator Tool */}
          <div className="w-full lg:w-1/2">
            <ScrollReveal className="glass-panel p-8 sm:p-12 rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl relative overflow-hidden">
              {!isSubmitted ? (
                <div className="space-y-10 relative z-10">
                  {/* Service Selector */}
                  <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl">
                    {(['CCTV', 'IT', 'NETWORKING'] as ServiceType[]).map((service) => (
                      <button
                        key={service}
                        onClick={() => setActiveService(service)}
                        className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                          activeService === service 
                            ? 'bg-white dark:bg-slate-700 text-primary shadow-lg' 
                            : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        {service === 'CCTV' && <Video size={16} />}
                        {service === 'IT' && <Server size={16} />}
                        {service === 'NETWORKING' && <Wifi size={16} />}
                        {service}
                      </button>
                    ))}
                  </div>

                  {/* Quantity Slider */}
                  <div className="space-y-6">
                    <div className="flex justify-between items-end">
                      <label className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                        {activeService === 'CCTV' ? 'Number of Cameras' : activeService === 'IT' ? 'Number of Systems' : 'Network Points'}
                      </label>
                      <span className="text-3xl font-display font-bold text-primary">{quantity}</span>
                    </div>
                    <input 
                      type="range" 
                      min="1" 
                      max="50" 
                      value={quantity} 
                      onChange={(e) => setQuantity(parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                  </div>

                  {/* Toggle Advanced */}
                  <div className="flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-white/5">
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Enterprise Configuration</p>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Include Server/NVR + Backup</p>
                    </div>
                    <button 
                      onClick={() => setIsAdvanced(!isAdvanced)}
                      className={`w-14 h-7 rounded-full transition-all relative ${isAdvanced ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-600'}`}
                    >
                      <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${isAdvanced ? 'left-8' : 'left-1'}`}></div>
                    </button>
                  </div>

                  {/* Price Display */}
                  <div className="pt-8 border-t border-slate-200 dark:border-white/10">
                    <div className="flex justify-between items-center mb-8">
                      <span className="text-sm font-bold uppercase tracking-[0.3em] text-slate-400">Estimated Range</span>
                      <span className="text-4xl sm:text-5xl font-display font-bold text-slate-900 dark:text-white">
                        ₹{estimate.toLocaleString()}<span className="text-lg opacity-50 ml-1">+</span>
                      </span>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                         <input 
                           type="email" 
                           placeholder="Email Address" 
                           required
                           className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-primary transition-colors"
                           onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                         />
                         <input 
                           type="tel" 
                           placeholder="Phone Number" 
                           required
                           className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-primary transition-colors"
                           onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
                         />
                       </div>
                       <button 
                        type="submit"
                        className="w-full py-5 bg-primary text-white font-bold uppercase tracking-[0.3em] text-sm rounded-xl shadow-xl hover:shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4"
                       >
                         Lock in Quote <ArrowRight size={20} />
                       </button>
                    </form>
                  </div>
                </div>
              ) : (
                <div className="py-20 text-center space-y-6">
                   <div className="w-20 h-20 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-8">
                     <Send className="text-secondary" size={32} />
                   </div>
                   <h3 className="text-3xl font-display font-bold text-slate-900 dark:text-white tracking-tight">Quote Request Sent!</h3>
                   <p className="text-slate-500 max-w-xs mx-auto leading-relaxed">
                     Our engineers are reviewing your configuration. You'll receive a detailed PDF breakdown within 2 hours.
                   </p>
                   <button 
                    onClick={() => setIsSubmitted(false)}
                    className="text-primary font-bold uppercase tracking-widest text-xs border-b border-primary/30 pb-1 hover:border-primary transition-all"
                   >
                     Calculate Another Project
                   </button>
                </div>
              )}
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceCalculator;
