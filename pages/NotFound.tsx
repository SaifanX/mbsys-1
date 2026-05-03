import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, ShieldAlert } from 'lucide-react';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden bg-slate-950">
      {/* Background Cinematic Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none" />
      
      <div className="max-w-2xl w-full text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12 inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-primary/10 border border-primary/20 backdrop-blur-sm shadow-[0_0_50px_-12px_rgba(239,68,68,0.5)]"
        >
          <ShieldAlert className="w-12 h-12 text-primary" />
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-8xl md:text-9xl font-display font-black text-white mb-4 tracking-tighter"
        >
          404
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-200 mb-6 uppercase tracking-widest">
            System Routing Error
          </h2>
          <p className="text-slate-400 text-lg mb-12 max-w-md mx-auto leading-relaxed">
            The infrastructure you're looking for has been relocated or doesn't exist in our current network directory.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <button
            onClick={() => navigate('/')}
            className="group flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-full font-bold uppercase tracking-widest text-[10px] shadow-2xl hover:shadow-primary/40 hover:-translate-y-1 transition-all active:scale-95"
          >
            <Home className="w-4 h-4" />
            <span>Back to HQ</span>
          </button>
          
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-3 px-8 py-4 bg-white/5 text-white border border-white/10 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-white/10 transition-all"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Previous Node</span>
          </button>
        </motion.div>
      </div>

      {/* Decorative Binary Elements */}
      <div className="absolute bottom-10 left-10 text-[10px] font-mono text-primary/20 select-none hidden lg:block">
        ERROR_CODE: 0x404_INFRA_NOT_FOUND<br />
        REQUEST_STATE: NULL_POINTER<br />
        SYSTEM_STATUS: OPERATIONAL
      </div>
    </div>
  );
};

export default NotFound;
