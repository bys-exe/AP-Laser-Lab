
import React from 'react';

const IntroStage: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="space-y-4">
        <div className="inline-block px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-500 text-[10px] font-bold uppercase tracking-[0.3em]">
          Mission Briefing
        </div>
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.85] text-white">
          Laser Action <br />
          <span className="text-cyan-500 italic">Virtual Lab</span>
        </h1>
        <p className="text-zinc-500 max-w-xl text-sm leading-relaxed font-bold uppercase tracking-tight">
          Welcome to the Applied Physics simulation environment. This platform is designed to provide engineering students with a deep, interactive understanding of laser physics through first-principles simulation.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          { title: 'Atomic Transitions', desc: 'Explore how electrons jump between energy levels to absorb and emit light.' },
          { title: 'Population Inversion', desc: 'Learn the non-equilibrium state required for light amplification.' },
          { title: 'Optical Feedback', desc: 'Master the role of mirrors and resonators in creating a coherent beam.' }
        ].map((item, i) => (
          <div key={i} className="p-8 border border-zinc-800 bg-zinc-900/50 hover:border-cyan-500/50 transition-colors group">
            <div className="text-cyan-500 font-bold mb-4 text-xs tracking-widest uppercase">0{i+1}</div>
            <h3 className="text-white font-bold uppercase tracking-tighter mb-2 group-hover:text-cyan-500 transition-colors">{item.title}</h3>
            <p className="text-zinc-500 text-xs leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="pt-8">
        <button 
          onClick={onNext}
          className="group relative px-12 py-6 bg-white text-black font-black uppercase tracking-widest text-xl hover:bg-cyan-500 transition-all"
        >
          Initialize Laboratory
          <span className="absolute -bottom-2 -right-2 w-full h-full border-2 border-cyan-500 -z-10 group-hover:bottom-0 group-hover:right-0 transition-all" />
        </button>
      </div>
    </div>
  );
};

export default IntroStage;
