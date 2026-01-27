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
      description: 'Instant Support'
    },
    {
      icon: Calendar,
      label: 'Sync Audit',
      href: 'https://cal.id/mbsys',
      color: 'bg-slate-900 dark:bg-white dark:text-slate-900',
      description: 'Book Online'
    },
    {
      icon: MessageSquare,
      label: 'WhatsApp',
      href: 'https://wa.me/919886374122?text=MBSYS%20Sync%20Requested:%20I%20would%20like%20to%20discuss%20an%20infrastructure%20project.',
      color: 'bg-green-600',
      description: 'Direct Message'
    },
    {
      icon: MapPin,
      label: 'Navigation',
      href: 'https://www.google.com/maps/dir/?api=1&destination=MBSYS+JP+Nagar+Bengaluru',
      color: 'bg-secondary',
      description: 'Get Directions'
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[200] flex flex-col items-end gap-3 md:hidden">
      {/* Action Menu */}
      <div className={`flex flex-col gap-3 transition-all duration-500 origin-bottom ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-50 opacity-0 translate-y-10 pointer-events-none'}`}>
        {actions.map((action, idx) => (
          <div key={idx} className="flex items-center gap-3 group">
            <div className="bg-white dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 shadow-xl">
              <p className="text-[10px] font-tech font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 leading-none mb-1">{action.label}</p>
              <p className="text-[8px] text-slate-400 dark:text-slate-500 font-mono uppercase tracking-tighter">{action.description}</p>
            </div>
            <a
              href={action.href}
              target={action.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className={`${action.color} w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg active:scale-90 transition-transform`}
            >
              <action.icon size={20} />
            </a>
          </div>
        ))}
      </div>

      {/* Main Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-300 ${isOpen ? 'bg-slate-900 dark:bg-white dark:text-slate-900 rotate-0' : 'bg-primary rotate-0 shadow-[0_0_20px_rgba(239,68,68,0.5)]'}`}
      >
        {isOpen ? <X size={24} /> : <Plus size={24} className="animate-pulse" />}
        {!isOpen && (
          <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20"></div>
        )}
      </button>
    </div>
  );
};

export default QuickActionHub;