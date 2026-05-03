import React, { useState } from 'react';
import { Phone, MessageSquare, Plus, X, Calendar } from 'lucide-react';

const QuickActionHub: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    {
      icon: Phone,
      label: 'Call Support',
      href: 'tel:+919886374122',
      color: 'bg-slate-900 dark:bg-white dark:text-slate-900',
      description: 'Support Line',
      type: 'link'
    },
    {
      icon: Calendar,
      label: 'Book Consultation',
      href: 'https://cal.id/mbsys',
      color: 'bg-secondary',
      description: 'Site Audit',
      type: 'link'
    },
    {
      icon: MessageSquare,
      label: 'WhatsApp',
      href: 'https://wa.me/919886374122?text=I%20would%20like%20to%20discuss%20an%20infrastructure%20project.',
      color: 'bg-green-600',
      description: 'Direct Message',
      type: 'link'
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[200] flex flex-col items-end gap-3">
      {/* Action Menu */}
      <div className={`flex flex-col gap-3 transition-all duration-[700ms] ease-[cubic-bezier(0.32,0.72,0,1)] origin-bottom ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-75 opacity-0 translate-y-12 pointer-events-none'}`}>
        {actions.map((action, idx) => (
          <div key={idx} className="flex items-center gap-3 group">
            <div className="bg-white/95 dark:bg-slate-800/95 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xl backdrop-blur-md">
              <p className="text-[10px] font-sans font-bold uppercase tracking-widest text-slate-500 dark:text-slate-300 leading-none mb-1">{action.label}</p>
              <p className="text-[8px] text-slate-400 dark:text-slate-500 font-sans uppercase tracking-tighter">{action.description}</p>
            </div>
            
            <a
              href={action.href}
              target={action.href?.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className={`${action.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-2xl active:scale-90 transition-all border border-white/20 hover:scale-105`}
            >
              <action.icon size={24} />
            </a>
          </div>
        ))}
      </div>

      {/* Main Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-xl transition-all duration-500 active:scale-75 ${isOpen ? 'bg-slate-900 dark:bg-white dark:text-slate-900 rotate-180' : 'bg-primary rotate-0 hover:scale-110'}`}
        aria-label="Toggle Quick Actions"
      >
        {isOpen ? <X size={28} /> : <Plus size={28} />}
      </button>
    </div>
  );
};

export default QuickActionHub;