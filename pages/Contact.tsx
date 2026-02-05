import React, { useState, useEffect } from 'react';
import { MapPin, Mail, Loader2, AlertCircle, CheckCircle2, Star, ExternalLink, Fingerprint, UserPlus, Calendar, ArrowRight } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import MbsysLogo from '../components/MbsysLogo';

interface ContactProps {
  onNavigate: (path: string) => void;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const Contact: React.FC<ContactProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [resultMessage, setResultMessage] = useState("");

  const validate = (data: typeof formData) => {
    const newErrors: FormErrors = {};
    if (data.name.length < 3) newErrors.name = "ID must be at least 3 characters.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) newErrors.email = "Invalid email address.";
    if (data.message.length < 10) newErrors.message = "Parameters must be at least 10 characters.";
    return newErrors;
  };

  useEffect(() => {
    setErrors(validate(formData));
  }, [formData]);

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const isFormValid = Object.keys(errors).length === 0;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid) {
      setTouched({ name: true, email: true, message: true });
      return;
    }
    
    setStatus('submitting');
    setResultMessage("Sending message...");

    const form = e.currentTarget;
    const formSubmissionData = new FormData(form);
    formSubmissionData.append("access_key", "dd8c64c7-af35-4e38-9e3d-c91955a0f707");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formSubmissionData
      });

      const data = await response.json();
      if (data.success) {
        setStatus('success');
        setResultMessage("Message sent successfully. We will contact you soon.");
        setFormData({ name: '', email: '', message: '' });
        setTouched({});
        setTimeout(() => {
          setStatus('idle');
          setResultMessage("");
        }, 6000);
      } else {
        setStatus('error');
        setResultMessage(data.message || "Failed to send message.");
      }
    } catch (error) {
      setStatus('error');
      setResultMessage("Connection error. Please call us directly.");
    }
  };

  const getInputClasses = (fieldName: string) => {
    const isError = touched[fieldName] && errors[fieldName as keyof FormErrors];
    const isSuccess = touched[fieldName] && !errors[fieldName as keyof FormErrors];
    
    return `w-full bg-slate-50 dark:bg-slate-900/50 border p-5 sm:p-6 rounded-xl text-base sm:text-lg outline-none transition-all duration-300 font-sans 
      focus:scale-[1.01] focus:shadow-[0_0_30px_rgba(6,182,212,0.1)] focus:bg-white dark:focus:bg-slate-800
      ${isError 
        ? 'border-primary ring-2 ring-primary/10' 
        : isSuccess 
          ? 'border-green-500/50 focus:border-green-500' 
          : 'border-slate-300 dark:border-slate-800 focus:border-secondary'}`;
  };

  return (
    <div className="pt-32 sm:pt-48 pb-24">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Fast Track Booking Bar */}
        <ScrollReveal className="mb-16 sm:mb-24 p-8 md:p-14 bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-white/5 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-10 group shadow-lg transition-all hover:border-secondary/20">
          <div className="flex flex-col sm:flex-row items-center gap-10 text-center sm:text-left">
            <div className="w-20 h-20 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center shadow-xl border border-slate-100 dark:border-slate-700 shrink-0">
               <Calendar className="text-secondary animate-pulse" size={32} />
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white leading-none">Fast Track Protocol</h3>
              <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-lg leading-relaxed">Skip the manual transmission. Map a technical audit directly into our live operational grid.</p>
            </div>
          </div>
          <a 
            href="https://cal.id/mbsys" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full md:w-auto px-12 py-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-tech font-bold uppercase tracking-[0.3em] text-sm flex items-center justify-center gap-4 hover:scale-105 transition-all shadow-2xl active:scale-95 group/btn"
          >
            Launch Scheduler <ArrowRight size={22} className="group-hover/btn:translate-x-3 transition-transform" />
          </a>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 mb-24 items-start">
          <ScrollReveal className="text-center sm:text-left space-y-10">
            <div>
              <span className="text-primary font-tech font-bold tracking-[0.6em] uppercase text-xs sm:text-sm mb-6 block">COMMS INTERFACE</span>
              <h2 className="text-5xl sm:text-7xl md:text-8xl font-display font-bold text-slate-900 dark:text-white leading-[0.9] tracking-tighter">Establish <br/><span className="text-secondary">Sync.</span></h2>
            </div>
            
            <p className="text-slate-600 dark:text-slate-400 font-sans text-lg sm:text-2xl mb-12 leading-relaxed max-w-2xl mx-auto sm:mx-0 font-light">Translate your architectural vision into a high-performance infrastructure grid. Our tactical response team is ready for intercept.</p>
            
            <div className="space-y-6 sm:space-y-8">
              <div className="flex items-center gap-8 p-8 sm:p-10 glass-panel rounded-2xl border-l-8 border-secondary hover:border-primary transition-all duration-500 cursor-default">
                <MapPin className="text-secondary w-10 h-10 sm:w-12 sm:h-12" />
                <div className="text-left">
                  <p className="text-xs uppercase font-bold text-slate-500 font-tech tracking-[0.4em] mb-2">HQ Coordinate</p>
                  <p className="font-display font-bold text-lg sm:text-2xl dark:text-white tracking-wide transition-colors">JP Nagar, Bengaluru, India</p>
                </div>
              </div>
              <div className="flex items-center gap-8 p-8 sm:p-10 glass-panel rounded-2xl border-l-8 border-primary hover:border-secondary transition-all duration-500 cursor-default">
                <Mail className="text-primary w-10 h-10 sm:w-12 sm:h-12" />
                <div className="text-left">
                  <p className="text-xs uppercase font-bold text-slate-500 font-tech tracking-[0.4em] mb-2">Secure Protocol</p>
                  <p className="font-display font-bold text-lg sm:text-2xl dark:text-white tracking-wide transition-colors">info@mbsys.co.in</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={300} className="w-full">
            <form onSubmit={handleSubmit} className="space-y-8 bg-white dark:bg-surface-dark p-8 sm:p-16 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-4xl relative">
              <div className="space-y-3 group">
                <div className="flex justify-between items-center px-2">
                  <label className="text-xs sm:text-sm font-tech font-black uppercase tracking-[0.4em] text-slate-500 group-focus-within:text-secondary transition-colors">Name</label>
                  {touched.name && !errors.name && <CheckCircle2 size={16} className="text-green-500" />}
                </div>
                <input 
                  type="text" name="name" required value={formData.name} 
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  onBlur={() => handleBlur('name')}
                  className={getInputClasses('name')}
                  placeholder="Full Name / Corporate Entity"
                />
                {touched.name && errors.name && (
                  <p className="px-2 text-xs font-mono text-primary flex items-center gap-2 uppercase tracking-tighter animate-slide-in-top">
                    <AlertCircle size={14} /> {errors.name}
                  </p>
                )}
              </div>

              <div className="space-y-3 group">
                <div className="flex justify-between items-center px-2">
                  <label className="text-xs sm:text-sm font-tech font-black uppercase tracking-[0.4em] text-slate-500 group-focus-within:text-secondary transition-colors">Email Address</label>
                  {touched.email && !errors.email && <CheckCircle2 size={16} className="text-green-500" />}
                </div>
                <input 
                  type="email" name="email" required value={formData.email} 
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  onBlur={() => handleBlur('email')}
                  className={getInputClasses('email')}
                  placeholder="Secure Link Email"
                />
                {touched.email && errors.email && (
                  <p className="px-2 text-xs font-mono text-primary flex items-center gap-2 uppercase tracking-tighter animate-slide-in-top">
                    <AlertCircle size={14} /> {errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-3 group">
                <div className="flex justify-between items-center px-2">
                  <label className="text-xs sm:text-sm font-tech font-black uppercase tracking-[0.4em] text-slate-500 group-focus-within:text-secondary transition-colors">Parameters</label>
                  {touched.message && !errors.message && <CheckCircle2 size={16} className="text-green-500" />}
                </div>
                <textarea 
                  name="message" required value={formData.message} 
                  onChange={e => setFormData({...formData, message: e.target.value})} 
                  onBlur={() => handleBlur('message')}
                  rows={5}
                  className={getInputClasses('message')}
                  placeholder="Technical parameters, site blueprints, or infrastructure requirements..."
                />
                {touched.message && errors.message && (
                  <p className="px-2 text-xs font-mono text-primary flex items-center gap-2 uppercase tracking-tighter animate-slide-in-top">
                    <AlertCircle size={14} /> {errors.message}
                  </p>
                )}
              </div>

              <div className="relative pt-4">
                <button 
                  type="submit" 
                  disabled={status === 'submitting' || (status === 'idle' && !isFormValid && Object.keys(touched).length > 0)}
                  className={`w-full relative py-6 sm:py-8 font-tech font-black uppercase tracking-[0.5em] text-sm sm:text-base transition-all flex items-center justify-center gap-5 shadow-2xl active:scale-[0.98] overflow-hidden group/btn rounded-2xl ${
                    status === 'error' ? 'bg-primary' :
                    !isFormValid && Object.keys(touched).length > 0 
                    ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed' 
                    : 'bg-primary text-white hover:bg-red-600'
                  }`}
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="animate-spin" size={24} /> SENDING...
                    </>
                  ) : status === 'success' ? (
                    <>
                      <CheckCircle2 size={24} /> SENT
                    </>
                  ) : (
                    <>
                      <Fingerprint size={24} className="group-hover/btn:animate-pulse" /> SEND MESSAGE
                    </>
                  )}
                </button>
                
                {resultMessage && (
                  <p className={`mt-6 text-center text-sm font-tech uppercase tracking-[0.3em] font-bold ${status === 'error' ? 'text-primary' : 'text-secondary animate-pulse'}`}>
                    {resultMessage}
                  </p>
                )}
              </div>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};

export default Contact;