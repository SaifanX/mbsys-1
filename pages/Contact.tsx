import React, { useState, useEffect } from 'react';
import { MapPin, Mail, Loader2, Lock, AlertCircle, CheckCircle2, Star, ExternalLink, Fingerprint, UserPlus, Calendar, ArrowRight } from 'lucide-react';
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
    if (!emailRegex.test(data.email)) newErrors.email = "Invalid channel frequency protocol.";
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
    setResultMessage("Transmitting data...");

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
        setResultMessage("Form Submitted Successfully");
        setFormData({ name: '', email: '', message: '' });
        setTouched({});
        setTimeout(() => {
          setStatus('idle');
          setResultMessage("");
        }, 5000);
      } else {
        setStatus('error');
        setResultMessage(data.message || "Error submitting form.");
      }
    } catch (error) {
      setStatus('error');
      setResultMessage("Network connection failure.");
    }
  };

  const handleDownloadVCard = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:MBSYS Infrastructure
ORG:MBSYS Professional Infrastructure Solutions
TEL;TYPE=WORK,VOICE:+919886374122
EMAIL;TYPE=PREF,INTERNET:info@mbsys.co.in
URL:https://mbsys.co.in
ADR;TYPE=WORK:;;JP Nagar;Bengaluru;Karnataka;560078;India
END:VCARD`;
    
    const blob = new Blob([vcard], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'MBSYS_Contact.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getInputClasses = (fieldName: string) => {
    const isError = touched[fieldName] && errors[fieldName as keyof FormErrors];
    const isSuccess = touched[fieldName] && !errors[fieldName as keyof FormErrors];
    
    return `w-full bg-slate-50 dark:bg-slate-900 border p-4 rounded-sm text-sm outline-none transition-all duration-300 font-sans 
      focus:scale-[1.01] focus:shadow-[0_0_20px_rgba(6,182,212,0.15)] focus:bg-white dark:focus:bg-slate-800
      ${isError 
        ? 'border-primary ring-1 ring-primary/20' 
        : isSuccess 
          ? 'border-green-500/50 focus:border-green-500' 
          : 'border-slate-200 dark:border-slate-700 focus:border-secondary'}`;
  };

  return (
    <div className="pt-32 animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Fast Track Booking Bar */}
        <div className="mb-16 p-6 md:p-8 bg-gradient-to-r from-secondary/10 to-primary/10 border border-slate-200 dark:border-white/5 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-8 group">
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center shadow-lg border border-slate-100 dark:border-slate-700">
               <Calendar className="text-secondary animate-pulse" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white">Fast Track Protocol</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Skip the form. Book a technical sync directly into our field grid.</p>
            </div>
          </div>
          <a 
            href="https://cal.id/mbsys" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full md:w-auto px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-tech font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:scale-105 transition-all shadow-xl active:scale-95"
          >
            Launch Scheduler <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mb-20">
          <div className="animate-in slide-in-from-left-4 duration-1000">
            <span className="text-primary font-tech font-bold tracking-[0.3em] uppercase text-xs mb-4 block">COMMS INTERFACE</span>
            <h2 className="text-5xl md:text-7xl font-display font-bold text-slate-900 dark:text-white mb-8">Establish Sync</h2>
            <p className="text-slate-600 dark:text-slate-400 font-sans text-lg mb-12 leading-relaxed">Translate your blueprint into a high-performance grid. Our tactical team is standing by to respond to your parameters.</p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-6 p-6 glass-panel rounded-sm border-l-4 border-secondary hover:border-primary transition-colors cursor-default">
                <MapPin className="text-secondary w-8 h-8" />
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-500 font-tech">HQ Coordinate</p>
                  <p className="font-display font-bold dark:text-white tracking-wide">JP Nagar, Bengaluru, India</p>
                </div>
              </div>
              <div className="flex items-center gap-6 p-6 glass-panel rounded-sm border-l-4 border-primary hover:border-secondary transition-colors cursor-default">
                <Mail className="text-primary w-8 h-8" />
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-500 font-tech">Secure Protocol</p>
                  <p className="font-display font-bold dark:text-white tracking-wide">info@mbsys.co.in</p>
                </div>
              </div>
              
              <button 
                onClick={handleDownloadVCard}
                className="w-full flex items-center justify-center gap-3 p-6 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-sm font-tech font-bold uppercase tracking-widest text-xs hover:scale-[1.02] active:scale-95 transition-all shadow-xl"
              >
                <UserPlus size={20} /> Download Technical Identity (vCard)
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-surface-dark p-6 md:p-10 rounded-sm border border-slate-200 dark:border-slate-800 shadow-2xl relative animate-in slide-in-from-right-4 duration-1000">
            <div className="space-y-2 group">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-tech font-black uppercase tracking-widest text-slate-500 group-focus-within:text-secondary transition-colors">Operator ID</label>
                {touched.name && !errors.name && <CheckCircle2 size={12} className="text-green-500" />}
              </div>
              <input 
                type="text" name="name" required value={formData.name} 
                onChange={e => setFormData({...formData, name: e.target.value})}
                onBlur={() => handleBlur('name')}
                className={getInputClasses('name')}
                placeholder="Full Name"
              />
              {touched.name && errors.name && (
                <p className="text-[10px] font-mono text-primary flex items-center gap-1 uppercase tracking-tighter animate-in fade-in slide-in-from-top-1">
                  <AlertCircle size={10} /> {errors.name}
                </p>
              )}
            </div>

            <div className="space-y-2 group">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-tech font-black uppercase tracking-widest text-slate-500 group-focus-within:text-secondary transition-colors">Channel Frequency</label>
                {touched.email && !errors.email && <CheckCircle2 size={12} className="text-green-500" />}
              </div>
              <input 
                type="email" name="email" required value={formData.email} 
                onChange={e => setFormData({...formData, email: e.target.value})}
                onBlur={() => handleBlur('email')}
                className={getInputClasses('email')}
                placeholder="Email Address"
              />
              {touched.email && errors.email && (
                <p className="text-[10px] font-mono text-primary flex items-center gap-1 uppercase tracking-tighter animate-in fade-in slide-in-from-top-1">
                  <AlertCircle size={10} /> {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-2 group">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-tech font-black uppercase tracking-widest text-slate-500 group-focus-within:text-secondary transition-colors">Parameters</label>
                {touched.message && !errors.message && <CheckCircle2 size={12} className="text-green-500" />}
              </div>
              <textarea 
                name="message" required value={formData.message} 
                onChange={e => setFormData({...formData, message: e.target.value})} 
                onBlur={() => handleBlur('message')}
                rows={4}
                className={getInputClasses('message')}
                placeholder="Message Details..."
              />
              {touched.message && errors.message && (
                <p className="text-[10px] font-mono text-primary flex items-center gap-1 uppercase tracking-tighter animate-in fade-in slide-in-from-top-1">
                  <AlertCircle size={10} /> {errors.message}
                </p>
              )}
            </div>

            <div className="relative">
              <button 
                type="submit" 
                disabled={status === 'submitting' || (status === 'idle' && !isFormValid && Object.keys(touched).length > 0)}
                className={`w-full relative py-5 font-tech font-black uppercase tracking-[0.3em] text-xs transition-all flex items-center justify-center gap-3 shadow-lg active:scale-[0.98] overflow-hidden group/btn ${
                  status === 'error' ? 'bg-primary' :
                  !isFormValid && Object.keys(touched).length > 0 
                  ? 'bg-slate-300 dark:bg-slate-800 text-slate-500 cursor-not-allowed' 
                  : 'bg-primary text-white hover:bg-red-600'
                }`}
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="animate-spin" size={16} /> TRANSMITTING...
                  </>
                ) : status === 'success' ? (
                  <>
                    <CheckCircle2 size={16} /> SYNC SUCCESSFUL
                  </>
                ) : status === 'error' ? (
                  <>
                    <AlertCircle size={16} /> RETRY SYNC
                  </>
                ) : (
                  <>
                    <Fingerprint size={16} className="group-hover/btn:animate-pulse" /> INITIALIZE SYNC
                  </>
                )}
              </button>
              
              {resultMessage && (
                <p className={`mt-4 text-center text-[10px] font-tech uppercase tracking-widest font-bold ${status === 'error' ? 'text-primary' : 'text-secondary animate-pulse'}`}>
                  {resultMessage}
                </p>
              )}
            </div>
          </form>
        </div>
        
        <div className="mb-20 p-8 lg:p-12 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-sm shadow-xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex items-center gap-8 md:gap-10">
               <div className="w-20 h-20 md:w-24 md:h-24 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-lg border border-slate-200 dark:border-slate-700 p-4 transition-all hover:rotate-6 hover:scale-105">
                  <MbsysLogo className="w-full h-auto" />
               </div>
               <div className="space-y-2">
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-slate-900 dark:text-white tracking-tight">Network Sentiment</h3>
                  <div className="flex items-center gap-2">
                     <div className="flex items-center gap-0.5">
                        {[1,2,3,4,5].map(i => <Star key={i} size={18} fill="#FACC15" className="text-yellow-400" />)}
                     </div>
                     <span className="ml-2 font-tech text-sm md:text-base font-bold text-slate-600 dark:text-slate-400">5.0/5.0 Google Presence</span>
                  </div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold opacity-80 font-tech">Synced with Global Ecosystem</p>
               </div>
            </div>
            <a 
              href="https://maps.app.goo.gl/7aEp8tyHSyCm8fUh6" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full md:w-auto flex items-center justify-center gap-4 px-10 py-5 bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 rounded-sm text-xs font-black uppercase tracking-[0.25em] hover:border-secondary hover:text-secondary transition-all group shadow-xl hover:-translate-y-1 font-tech"
            >
              Find us on Google Maps <ExternalLink size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;