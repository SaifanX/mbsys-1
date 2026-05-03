import React from 'react';
import { MapPin, ExternalLink } from 'lucide-react';

const LocationSection: React.FC = () => {
  return (
    <section className="w-full border-y border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/20">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 items-stretch">
        <div className="lg:col-span-4 p-8 sm:p-12 lg:p-16 flex flex-col justify-center space-y-8 bg-slate-50 dark:bg-slate-900/50">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-primary text-white rounded-2xl shadow-lg">
              <MapPin size={24} />
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white">Office Location</h3>
          </div>
          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed font-light">
            Located in the central business hub of Bengaluru, our operational center manages projects across JP Nagar and the surrounding regions.
          </p>
          <a 
            href="https://maps.app.goo.gl/7aEp8tyHSyCm8fUh6" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-fit flex items-center gap-3 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold uppercase tracking-widest rounded-lg hover:scale-105 transition-all shadow-xl active:scale-95"
          >
            Get Directions <ExternalLink size={14} />
          </a>
        </div>
        <div className="lg:col-span-8 h-[350px] lg:h-auto relative group overflow-hidden">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248897.0497830073!2d77.28269998671874!3d12.906666699999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15f17ca16937%3A0x1394a04740953861!2sMBSYS!5e0!3m2!1sen!2sin!4v1768919217116!5m2!1sen!2sin" 
            className="w-full h-full border-0 transition-all duration-700 dark:grayscale dark:invert-[0.1]"
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="MBSYS Office Location"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;