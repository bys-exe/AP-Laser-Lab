
import React from 'react';
import { motion } from 'motion/react';

const IntroStage: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-1000 font-mono">
      <div className="space-y-6 relative">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-block px-4 py-1.5 bg-cyan-500/5 border border-cyan-500/20 text-cyan-500 text-[10px] font-black uppercase tracking-[0.5em] shadow-[0_0_20px_rgba(6,182,212,0.1)]"
        >
          Mission Briefing :: AP-742
        </motion.div>
        
        <div className="space-y-2">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.8] text-white"
          >
            Laser Action <br />
            <span className="text-cyan-500 italic drop-shadow-[0_0_30px_rgba(6,182,212,0.3)]">Virtual Lab</span>
          </motion.h1>
        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-zinc-500 max-w-2xl text-sm leading-relaxed font-medium uppercase tracking-tight border-l-2 border-zinc-800 pl-6"
        >
          Welcome to the Applied Physics simulation environment. This platform is engineered to provide a high-fidelity, interactive understanding of laser physics through first-principles simulation and real-time data analysis.
        </motion.p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          { title: 'Atomic Transitions', desc: 'Explore the quantum dynamics of electrons jumping between energy levels to absorb and emit light.' },
          { title: 'Population Inversion', desc: 'Master the non-equilibrium state required for light amplification and gain.' },
          { title: 'Optical Feedback', desc: 'Analyze the role of mirrors and resonators in creating a coherent, monochromatic beam.' }
        ].map((item, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 + (i * 0.1) }}
            className="p-10 border border-zinc-900 bg-zinc-950/50 hover:border-cyan-500/30 transition-all duration-500 group relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
            <div className="text-cyan-500 font-black mb-6 text-xs tracking-[0.3em] uppercase opacity-50 group-hover:opacity-100 transition-opacity">0{i+1}</div>
            <h3 className="text-white font-black uppercase tracking-tighter mb-4 text-lg group-hover:text-cyan-400 transition-colors">{item.title}</h3>
            <p className="text-zinc-600 text-[11px] leading-relaxed font-medium uppercase tracking-tight group-hover:text-zinc-400 transition-colors">{item.desc}</p>
            
            <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-cyan-500/5 blur-3xl rounded-full group-hover:bg-cyan-500/10 transition-all" />
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="pt-12"
      >
        <button 
          onClick={onNext}
          className="group relative px-16 py-8 bg-zinc-900 border border-zinc-800 text-white font-black uppercase tracking-[0.3em] text-xl hover:border-cyan-500/50 transition-all overflow-hidden"
        >
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity" />
          <span className="relative z-10 group-hover:text-cyan-400 transition-colors">Initialize Laboratory</span>
          
          {/* Animated Border */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-zinc-800 overflow-hidden">
            <motion.div 
              className="h-full bg-cyan-500"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </button>
      </motion.div>
    </div>
  );
};

export default IntroStage;
