import React, { useState, useEffect } from 'react';
import { MapPin, Mail, Loader2, CheckCircle2, Phone, Calendar, ShieldAlert } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

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
    if (data.name.length < 3) newErrors.name = "Name must be at least 3 characters.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) newErrors.email = "Please enter a valid email address.";
    if (data.message.length < 10) newErrors.message = "Message must be at least 10 characters.";
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
    setResultMessage("Submitting your inquiry...");

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
        setResultMessage("Thank you. Your message has been received.");
        setFormData({ name: '', email: '', message: '' });
        setTouched({});
      } else {
        setStatus('error');
        setResultMessage(data.message || "An error occurred during submission.");
      }
    } catch (error) {
      setStatus('error');
      setResultMessage("Unable to connect. Please contact us via phone.");
    }
  };

  const getInputClasses = (fieldName: string) => {
    const isError = touched[fieldName] && errors[fieldName as keyof FormErrors];
    const isSuccess = touched[fieldName] && !errors[fieldName as keyof FormErrors];
    
    return `w-full bg-slate-50 dark:bg-slate-900/50 border p-5 sm:p-6 rounded-xl text-base sm:text-lg outline-none transition-all duration-300 font-sans 
      focus:shadow-sm focus:bg-white dark:focus:bg-slate-800
      ${isError 
        ? 'border-primary ring-1 ring-primary/10' 
        : isSuccess 
          ? 'border-green-500/50 focus:border-green-500' 
          : 'border-slate-300 dark:border-slate-800 focus:border-secondary'}`;
  };

  return (
    <div className="pt-32 sm:pt-48 pb-24">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 mb-24 items-start">
          <ScrollReveal className="text-center sm:text-left space-y-10">
            <div>
              <span className="text-primary font-sans font-bold tracking-[0.4em] uppercase text-xs sm:text-sm mb-6 block">Contact Us</span>
              <h2 className="text-5xl sm:text-7xl md:text-8xl font-display font-bold text-slate-900 dark:text-white leading-[0.9] tracking-tighter">Get in <br/><span className="text-secondary">Touch.</span></h2>
            </div>
            
            <p className="text-slate-600 dark:text-slate-400 font-sans text-lg sm:text-2xl mb-12 leading-relaxed max-w-2xl mx-auto sm:mx-0 font-light">Contact our engineering team to discuss your project requirements or to schedule a professional site audit.</p>
            
            <div className="space-y-6 sm:space-y-8">
              <div className="flex items-center gap-8 p-8 sm:p-10 glass-panel rounded-2xl border-l-8 border-secondary hover:border-primary transition-all duration-500">
                <MapPin className="text-secondary w-10 h-10 sm:w-12 sm:h-12" />
                <div className="text-left">
                  <p className="text-xs uppercase font-bold text-slate-500 font-sans tracking-[0.4em] mb-2">Office Location</p>
                  <p className="font-display font-bold text-lg sm:text-2xl dark:text-white tracking-wide">JP Nagar, Bengaluru, India</p>
                </div>
              </div>
              <div className="flex items-center gap-8 p-8 sm:p-10 glass-panel rounded-2xl border-l-8 border-primary hover:border-secondary transition-all duration-500">
                <Mail className="text-primary w-10 h-10 sm:w-12 sm:h-12" />
                <div className="text-left">
                  <p className="text-xs uppercase font-bold text-slate-500 font-sans tracking-[0.4em] mb-2">Email Address</p>
                  <p className="font-display font-bold text-lg sm:text-2xl dark:text-white tracking-wide">info@mbsys.co.in</p>
                </div>
              </div>
              <div className="flex items-center gap-8 p-8 sm:p-10 glass-panel rounded-2xl border-l-8 border-slate-900 dark:border-white hover:border-secondary transition-all duration-500">
                <Phone className="text-slate-900 dark:text-white w-10 h-10 sm:w-12 sm:h-12" />
                <div className="text-left">
                  <p className="text-xs uppercase font-bold text-slate-500 font-sans tracking-[0.4em] mb-2">Phone Support</p>
                  <p className="font-display font-bold text-lg sm:text-2xl dark:text-white tracking-wide">+91 98863 74122</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={300} className="w-full">
            <form onSubmit={handleSubmit} className="space-y-8 bg-white dark:bg-surface-dark p-8 sm:p-16 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
              <div className="space-y-3">
                <label className="text-xs sm:text-sm font-sans font-bold uppercase tracking-[0.4em] text-slate-500">Full Name</label>
                <input 
                  type="text" name="name" required value={formData.name} 
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  onBlur={() => handleBlur('name')}
                  className={getInputClasses('name')}
                  placeholder="Enter your name"
                />
                {touched.name && errors.name && (
                  <p className="px-2 text-xs font-sans text-primary flex items-center gap-2">
                    <ShieldAlert size={14} /> {errors.name}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <label className="text-xs sm:text-sm font-sans font-bold uppercase tracking-[0.4em] text-slate-500">Email Address</label>
                <input 
                  type="email" name="email" required value={formData.email} 
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  onBlur={() => handleBlur('email')}
                  className={getInputClasses('email')}
                  placeholder="name@company.com"
                />
                {touched.email && errors.email && (
                  <p className="px-2 text-xs font-sans text-primary flex items-center gap-2">
                    <ShieldAlert size={14} /> {errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <label className="text-xs sm:text-sm font-sans font-bold uppercase tracking-[0.4em] text-slate-500">Project Details</label>
                <textarea 
                  name="message" required value={formData.message} 
                  onChange={e => setFormData({...formData, message: e.target.value})} 
                  onBlur={() => handleBlur('message')}
                  rows={5}
                  className={getInputClasses('message')}
                  placeholder="Describe your infrastructure requirements..."
                />
                {touched.message && errors.message && (
                  <p className="px-2 text-xs font-sans text-primary flex items-center gap-2">
                    <ShieldAlert size={14} /> {errors.message}
                  </p>
                )}
              </div>

              <div className="relative pt-4">
                <button 
                  type="submit" 
                  disabled={status === 'submitting' || (status === 'idle' && !isFormValid && Object.keys(touched).length > 0)}
                  className={`w-full py-6 sm:py-8 font-sans font-bold uppercase tracking-[0.4em] text-sm sm:text-base transition-all flex items-center justify-center gap-5 shadow-lg active:scale-[0.98] rounded-2xl ${
                    status === 'error' ? 'bg-primary' :
                    !isFormValid && Object.keys(touched).length > 0 
                    ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed' 
                    : 'bg-primary text-white hover:bg-red-600'
                  }`}
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="animate-spin" size={24} /> Sending...
                    </>
                  ) : status === 'success' ? (
                    <>
                      <CheckCircle2 size={24} /> Message Sent
                    </>
                  ) : (
                    <>
                      Send Message
                    </>
                  )}
                </button>
                
                {resultMessage && (
                  <p className={`mt-6 text-center text-sm font-sans uppercase tracking-[0.3em] font-bold ${status === 'error' ? 'text-primary' : 'text-secondary'}`}>
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