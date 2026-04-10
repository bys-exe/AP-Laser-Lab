
import React, { useState, useEffect } from 'react';

const AtomicStage: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [levelType, setLevelType] = useState<2 | 3 | 4>(4);
  const [electrons, setElectrons] = useState<{ id: number; level: number; x: number }[]>([]);

  useEffect(() => {
    setElectrons(Array.from({ length: 15 }, (_, i) => ({
      id: i,
      level: 0,
      x: Math.random() * 100,
    })));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setElectrons(prev => prev.map(e => {
        if (Math.random() > 0.8) {
          return { ...e, level: e.level > 0 ? 0 : Math.floor(Math.random() * (levelType - 1)) + 1 };
        }
        return e;
      }));
    }, 1500);
    return () => clearInterval(timer);
  }, [levelType]);

  const labels = ["Ground State (E₁)", "Metastable (E₂)", "Excited (E₃)", "Upper Level (E₄)"];

  const matrix = {
    2: { inversion: "Impossible", pump: "Extreme", eff: "0%" },
    3: { inversion: "Moderate", pump: "High", eff: "< 1%" },
    4: { inversion: "Efficient", pump: "Low", eff: "10-20%" }
  };

  return (
    <div className="animate-stage space-y-10">
      <header className="space-y-1">
        <h2 className="text-3xl font-black text-white uppercase tracking-tight">Experiment 03: Energy Systems</h2>
        <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest">Analysis of Energy States and the Metastable condition.</p>
      </header>

      <div className="bg-zinc-900/60 p-8 border border-zinc-800 space-y-6 shadow-2xl">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase text-cyan-500 tracking-widest">Theoretical Background</h4>
            <p className="text-xs text-zinc-400 leading-relaxed font-bold uppercase tracking-tight">
              For laser action, we need a <span className="text-white">Metastable State</span>—a level where electrons stay for a long period (10⁻³s vs 10⁻⁸s). 
              In a 2-level system, the rates of absorption and stimulated emission are equal at best, making 
              population inversion impossible. 3 and 4-level systems solve this by utilizing fast non-radiative 
              transitions into a metastable reservoir.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase text-zinc-600 tracking-widest">Experiment Aim & Procedure</h4>
            <p className="text-xs text-zinc-500 font-bold uppercase tracking-tight">
              <span className="text-zinc-400">Aim:</span> To compare electron accumulation in different atomic configurations. <br/>
              <span className="text-zinc-400">Procedure:</span> Toggle the system levels above. Observe how 4-level systems maintain 
              an empty lower laser level, maximizing efficiency compared to 2 or 3-level types.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-zinc-900 border border-zinc-800 p-10 h-[450px] relative overflow-hidden shadow-2xl">
           <div className="absolute top-8 right-8 flex bg-black p-1 border border-zinc-800 z-10">
             {[2, 3, 4].map(n => (
               <button
                 key={n}
                 onClick={() => setLevelType(n as any)}
                 className={`px-6 py-2 text-[10px] font-black tracking-widest transition-all ${
                   levelType === n ? 'bg-cyan-500 text-black' : 'text-zinc-600 hover:text-zinc-400'
                 }`}
               >
                 {n}-LEVEL
               </button>
             ))}
           </div>

           <svg className="w-full h-full mt-10" viewBox="0 0 400 300">
             {Array.from({ length: levelType }).slice().reverse().map((_, i) => {
               const lvlIdx = levelType - 1 - i;
               const y = 250 - (lvlIdx * 200 / (levelType - 1 || 1));
               return (
                 <g key={lvlIdx}>
                   <line x1="50" y1={y} x2="350" y2={y} stroke={lvlIdx === 1 && levelType > 2 ? "#facc15" : "#334155"} strokeWidth="2" strokeDasharray={lvlIdx > 0 ? "4 4" : "0"} />
                   <text x="50" y={y - 12} fill="#475569" className="text-[9px] font-black uppercase tracking-widest">{labels[lvlIdx]}</text>
                   {electrons.filter(e => e.level === lvlIdx).map(e => (
                     <circle key={e.id} cx={50 + (e.x * 3)} cy={y} r="5" fill={lvlIdx === 0 ? "#06b6d4" : "#f43f5e"} className="transition-all duration-700 ease-in-out" />
                   ))}
                 </g>
               );
             })}
           </svg>
        </div>

        <div className="lg:col-span-4 space-y-6">
           <div className="bg-zinc-900 p-8 border border-zinc-800 space-y-6 shadow-xl">
              <h4 className="text-[10px] font-black uppercase text-zinc-600 tracking-widest border-b border-zinc-800 pb-2 text-center">Technical Matrix</h4>
              <div className="space-y-4">
                 <div className="p-4 bg-black border border-zinc-800 space-y-1 text-center shadow-inner">
                    <p className="text-[9px] text-zinc-600 uppercase font-bold">Inversion State</p>
                    <p className="text-xs font-black text-cyan-500 uppercase">{matrix[levelType].inversion}</p>
                 </div>
                 <div className="p-4 bg-black border border-zinc-800 space-y-1 text-center shadow-inner">
                    <p className="text-[9px] text-zinc-600 uppercase font-bold">Pumping Power</p>
                    <p className="text-xs font-black text-zinc-400 uppercase">{matrix[levelType].pump}</p>
                 </div>
                 <div className="p-4 bg-black border border-zinc-800 space-y-1 text-center shadow-inner">
                    <p className="text-[9px] text-zinc-600 uppercase font-bold">Efficiency Rating</p>
                    <p className="text-xl font-mono font-black text-white">{matrix[levelType].eff}</p>
                 </div>
              </div>
           </div>

           <button onClick={onNext} className="w-full bg-white text-black font-black py-6 hover:bg-cyan-500 transition-all text-xl">Continue to Interactions →</button>
        </div>
      </div>
    </div>
  );
};

export default AtomicStage;
