
import React from 'react';

const TheoryNotes: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="space-y-4">
        <div className="inline-block px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-500 text-[10px] font-bold uppercase tracking-[0.3em]">
          Knowledge Base
        </div>
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none text-white">
          Theoretical <br />
          <span className="text-cyan-500 italic">Foundations</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <section className="space-y-4">
            <h3 className="text-xl font-black uppercase tracking-tighter text-white border-l-4 border-cyan-500 pl-4">
              What is a LASER?
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              LASER stands for <span className="text-white font-bold">Light Amplification by Stimulated Emission of Radiation</span>. Unlike ordinary light sources, laser light is monochromatic, coherent, and highly directional.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-black uppercase tracking-tighter text-white border-l-4 border-cyan-500 pl-4">
              The Three Pillars
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-zinc-900 border border-zinc-800">
                <p className="text-xs font-bold text-cyan-500 uppercase mb-1">1. Active Medium</p>
                <p className="text-[11px] text-zinc-500">A collection of atoms, molecules, or ions that can be excited to higher energy states.</p>
              </div>
              <div className="p-4 bg-zinc-900 border border-zinc-800">
                <p className="text-xs font-bold text-cyan-500 uppercase mb-1">2. Pumping Source</p>
                <p className="text-[11px] text-zinc-500">External energy (optical, electrical) used to excite the atoms and achieve population inversion.</p>
              </div>
              <div className="p-4 bg-zinc-900 border border-zinc-800">
                <p className="text-xs font-bold text-cyan-500 uppercase mb-1">3. Optical Resonator</p>
                <p className="text-[11px] text-zinc-500">A pair of mirrors that provide feedback, allowing light to pass through the medium multiple times.</p>
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <div className="p-8 bg-zinc-900 border border-zinc-800 space-y-6">
            <h4 className="text-xs font-black uppercase tracking-widest text-zinc-500">Einstein's Relation</h4>
            <div className="p-6 bg-black border border-zinc-800 flex items-center justify-center">
              <code className="text-cyan-500 text-lg font-bold">
                R_stim = B_21 * ρ(ν) * N_2
              </code>
            </div>
            <p className="text-[11px] text-zinc-500 leading-relaxed italic">
              "The rate of stimulated emission is proportional to the radiation density and the number of atoms in the excited state."
            </p>
          </div>

          <div className="p-8 border border-cyan-500/20 bg-cyan-500/5 space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-cyan-500">Learning Objectives</h4>
            <ul className="space-y-2">
              {['Understand Energy Levels', 'Master Einstein Coefficients', 'Analyze Population Inversion', 'Calculate Lasing Threshold'].map((obj, i) => (
                <li key={i} className="flex items-center gap-3 text-xs text-zinc-300 font-bold uppercase">
                  <div className="w-1.5 h-1.5 bg-cyan-500" />
                  {obj}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="pt-8">
        <button 
          onClick={onNext}
          className="w-full md:w-auto px-12 py-5 bg-cyan-500 text-black font-black uppercase tracking-widest hover:bg-white transition-all"
        >
          Begin Atomic Analysis →
        </button>
      </div>
    </div>
  );
};

export default TheoryNotes;
