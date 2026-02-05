import React, { useState } from 'react';
import { Phone, MessageSquare, MapPin, Plus, X, Calendar } from 'lucide-react';

const QuickActionHub: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    {
      icon: Phone,
      label: 'Voice Link',
      href: 'tel:+919886374122',
      color: 'bg-primary',
      description: 'Support'
    },
    {
      icon: Calendar,
      label: 'Sync Audit',
      href: 'https://cal.id/mbsys',
      color: 'bg-slate-900 dark:bg-white dark:text-slate-900',
      description: 'Booking'
    },
    {
      icon: MessageSquare,
      label: 'WhatsApp',
      href: 'https://wa.me/919886374122?text=MBSYS%20Sync%20Requested:%20I%20would%20like%20to%20discuss%20an%20infrastructure%20project.',
      color: 'bg-green-600',
      description: 'Direct'
    },
    {
      icon: MapPin,
      label: 'HQ Coord',
      href: 'https://www.google.com/maps/dir/?api=1&destination=MBSYS+JP+Nagar+Bengaluru',
      color: 'bg-secondary',
      description: 'Navigate'
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[200] flex flex-col items-end gap-3">
      {/* Action Menu - Tactile Stack */}
      <div className={`flex flex-col gap-3 transition-all duration-[700ms] ease-[cubic-bezier(0.32,0.72,0,1)] origin-bottom ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-75 opacity-0 translate-y-12 pointer-events-none'}`}>
        {actions.map((action, idx) => (
          <div key={idx} className="flex items-center gap-3 group">
            <div className="bg-white/95 dark:bg-slate-800/95 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xl backdrop-blur-md">
              <p className="text-[10px] font-tech font-black uppercase tracking-widest text-slate-500 dark:text-slate-300 leading-none mb-1">{action.label}</p>
              <p className="text-[8px] text-slate-400 dark:text-slate-500 font-mono uppercase tracking-tighter">{action.description}</p>
            </div>
            <a
              href={action.href}
              target={action.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className={`${action.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-2xl active:scale-90 transition-all border border-white/20 hover:scale-105`}
            >
              <action.icon size={24} />
            </a>
          </div>
        ))}
      </div>

      {/* Main Toggle - Pulse & Scale Interaction */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-500 border border-white/10 active:scale-75 ${isOpen ? 'bg-slate-900 dark:bg-white dark:text-slate-900 rotate-180' : 'bg-primary rotate-0 hover:scale-110'}`}
        aria-label="Toggle Quick Actions"
      >
        {isOpen ? <X size={28} /> : <Plus size={28} />}
        
        {/* Sonar Indicator for closed state */}
        {!isOpen && (
          <div className="absolute inset-0 rounded-2xl bg-primary animate-[ping_3s_infinite] opacity-40"></div>
        )}
      </button>
    </div>
  );
};

export default QuickActionHub;