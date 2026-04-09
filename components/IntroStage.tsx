
import React from 'react';

const IntroStage: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  return (
    <div className="animate-stage space-y-12">
      <header className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="bg-rose-600/20 text-rose-500 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-rose-500/20">Stage 01</span>
          <h2 className="text-5xl font-black text-white leading-tight">Fundamentals of Laser</h2>
        </div>
        <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
          The term <span className="text-rose-500 font-bold italic">LASER</span> stands for Light Amplification by Stimulated Emission of Radiation.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] space-y-6 shadow-xl">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <div className="w-2 h-6 bg-rose-600 rounded-full"></div>
            Core Characteristics
          </h3>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <div className="w-8 h-8 rounded-lg bg-slate-950 flex items-center justify-center text-rose-500 shrink-0 border border-slate-800 font-black text-xs">1</div>
              <div>
                <p className="text-sm font-bold text-slate-200">Monochromaticity</p>
                <p className="text-[11px] text-slate-500 leading-relaxed">The beam consists of a single wavelength (color), unlike white light which is a broad spectrum.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="w-8 h-8 rounded-lg bg-slate-950 flex items-center justify-center text-rose-500 shrink-0 border border-slate-800 font-black text-xs">2</div>
              <div>
                <p className="text-sm font-bold text-slate-200">Coherence</p>
                <p className="text-[11px] text-slate-500 leading-relaxed">All emitted photons are in phase both in time (temporal) and space (spatial).</p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="w-8 h-8 rounded-lg bg-slate-950 flex items-center justify-center text-rose-500 shrink-0 border border-slate-800 font-black text-xs">3</div>
              <div>
                <p className="text-sm font-bold text-slate-200">Directionality</p>
                <p className="text-[11px] text-slate-500 leading-relaxed">The beam has extremely low divergence, staying narrow over vast distances.</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] space-y-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-600/5 blur-3xl rounded-full"></div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <div className="w-2 h-6 bg-cyan-600 rounded-full"></div>
            Beam Comparison
          </h3>
          <div className="space-y-6 pt-4">
            <div className="space-y-2">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Incoherent (Standard Bulb)</p>
              <div className="h-12 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-center overflow-hidden">
                <div className="flex gap-2">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="w-1.5 h-6 bg-amber-400/30 rounded-full blur-[2px] animate-pulse" style={{ animationDelay: `${i * 0.15}s` }}></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Coherent (Laser Source)</p>
              <div className="h-12 bg-slate-950 rounded-2xl border border-rose-900/20 flex items-center justify-center">
                 <div className="w-[85%] h-[2px] bg-rose-600 shadow-[0_0_15px_#e11d48]"></div>
              </div>
            </div>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed pt-4 italic">
            Notice how the laser beam maintains phase and direction over the path, unlike conventional light.
          </p>
        </div>
      </div>

      <div className="pt-8">
        <button 
          onClick={onNext}
          className="bg-rose-600 hover:bg-rose-500 text-white font-black px-12 py-5 rounded-3xl shadow-2xl shadow-rose-900/30 transition-all active:scale-95 flex items-center gap-4 text-xl group"
        >
          Access Theory Library
          <span className="text-2xl transition-transform group-hover:translate-x-2">→</span>
        </button>
      </div>
    </div>
  );
};

export default IntroStage;
