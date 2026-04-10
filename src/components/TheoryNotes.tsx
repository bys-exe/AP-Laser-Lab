
import React from 'react';
import { motion } from 'motion/react';

const TheoryNotes: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-1000 font-mono">
      <div className="space-y-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="inline-block px-4 py-1.5 bg-cyan-500/5 border border-cyan-500/20 text-cyan-500 text-[10px] font-black uppercase tracking-[0.5em]"
        >
          Knowledge Base :: AP-742
        </motion.div>
        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.85] text-white">
          Theoretical <br />
          <span className="text-cyan-500 italic drop-shadow-[0_0_30px_rgba(6,182,212,0.3)]">Foundations</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-16">
        <div className="space-y-12">
          <section className="space-y-6 relative">
            <div className="absolute -left-6 top-0 w-1 h-full bg-cyan-500/20" />
            <h3 className="text-2xl font-black uppercase tracking-tighter text-white">
              What is a LASER?
            </h3>
            <p className="text-zinc-500 text-sm leading-relaxed font-medium uppercase tracking-tight">
              LASER stands for <span className="text-white font-bold">Light Amplification by Stimulated Emission of Radiation</span>. Unlike ordinary light sources, laser light is monochromatic, coherent, and highly directional.
            </p>
          </section>

          <section className="space-y-8">
            <h3 className="text-xs font-black uppercase tracking-[0.4em] text-zinc-600">
              The Three Pillars
            </h3>
            <div className="space-y-4">
              {[
                { title: 'Active Medium', desc: 'A collection of atoms, molecules, or ions that can be excited to higher energy states.' },
                { title: 'Pumping Source', desc: 'External energy (optical, electrical) used to excite the atoms and achieve population inversion.' },
                { title: 'Optical Resonator', desc: 'A pair of mirrors that provide feedback, allowing light to pass through the medium multiple times.' }
              ].map((item, i) => (
                <div key={i} className="p-6 bg-zinc-950 border border-zinc-900 group hover:border-cyan-500/30 transition-colors">
                  <p className="text-[10px] font-black text-cyan-500 uppercase mb-2 tracking-widest opacity-50 group-hover:opacity-100 transition-opacity">0{i+1} {item.title}</p>
                  <p className="text-[11px] text-zinc-600 font-medium uppercase tracking-tight group-hover:text-zinc-400 transition-colors">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-12">
          <div className="p-10 bg-zinc-950 border border-zinc-900 space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <svg width="60" height="60" viewBox="0 0 60 60">
                <circle cx="30" cy="30" r="25" stroke="white" strokeWidth="1" fill="none" />
              </svg>
            </div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600">Einstein's Relation</h4>
            <div className="p-8 bg-black border border-zinc-900 flex items-center justify-center shadow-inner relative group">
              <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
              <code className="text-cyan-500 text-2xl font-black tracking-tighter relative z-10">
                R_stim = B_21 * ρ(ν) * N_2
              </code>
            </div>
            <p className="text-[11px] text-zinc-600 leading-relaxed italic font-medium uppercase tracking-tight text-center">
              "The rate of stimulated emission is proportional to the radiation density and the number of atoms in the excited state."
            </p>
          </div>

          <div className="p-10 border border-cyan-500/10 bg-cyan-500/5 space-y-6 relative">
            <div className="absolute top-0 left-0 w-full h-px bg-cyan-500/20" />
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-500">Learning Objectives</h4>
            <ul className="space-y-4">
              {['Understand Energy Levels', 'Master Einstein Coefficients', 'Analyze Population Inversion', 'Calculate Lasing Threshold'].map((obj, i) => (
                <li key={i} className="flex items-center gap-4 text-[11px] text-zinc-400 font-black uppercase tracking-widest">
                  <div className="w-1.5 h-1.5 bg-cyan-500 shadow-[0_0_10px_#06b6d4]" />
                  {obj}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="pt-12">
        <button 
          onClick={onNext}
          className="group relative w-full md:w-auto px-16 py-6 bg-zinc-900 border border-zinc-800 text-white font-black uppercase tracking-[0.3em] hover:border-cyan-500/50 transition-all overflow-hidden"
        >
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity" />
          <span className="relative z-10 group-hover:text-cyan-400 transition-colors">Begin Atomic Analysis →</span>
          
          <div className="absolute top-0 left-0 w-full h-[2px] bg-zinc-800 overflow-hidden">
            <motion.div 
              className="h-full bg-cyan-500"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </button>
      </div>
    </div>
  );
};

export default TheoryNotes;
