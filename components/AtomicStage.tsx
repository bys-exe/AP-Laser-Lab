
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
    <div className="space-y-10">
      <header className="flex justify-between items-end border-b border-zinc-800 pb-6">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="bg-zinc-800 text-cyan-500 px-3 py-1 text-[10px] font-bold uppercase tracking-widest border border-zinc-700">
              Stage 03
            </span>
            <div className="h-px w-8 bg-zinc-800"></div>
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Atomic Architecture</span>
          </div>
          <h2 className="text-3xl font-bold text-white uppercase tracking-tight">Energy Systems</h2>
        </div>
        <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest max-w-[200px] text-right leading-tight">
          Analysis of Energy States and the Metastable condition.
        </p>
      </header>

      <div className="bg-zinc-900 p-8 border border-zinc-800 space-y-6">
        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-4">
            <h4 className="text-[10px] font-bold uppercase text-cyan-500 tracking-widest flex items-center gap-3">
              <div className="w-1 h-4 bg-cyan-500"></div>
              Theoretical Background
            </h4>
            <p className="text-[13px] text-zinc-400 leading-tight font-bold">
              For laser action, we need a Metastable State—a level where electrons stay for a long period (10⁻³s vs 10⁻⁸s). 
              In a 2-level system, inversion is impossible. 3 and 4-level systems solve this by utilizing fast non-radiative 
              transitions into a metastable reservoir.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-[10px] font-bold uppercase text-zinc-500 tracking-widest flex items-center gap-3">
              <div className="w-1 h-4 bg-zinc-700"></div>
              Experiment Aim
            </h4>
            <div className="text-[12px] text-zinc-500 space-y-2 font-bold">
              <p><span className="text-zinc-300 uppercase text-[9px]">Aim:</span> Compare electron accumulation in atomic configurations.</p>
              <p><span className="text-zinc-300 uppercase text-[9px]">Procedure:</span> Toggle system levels. Observe how 4-level systems maintain an empty lower laser level.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-zinc-900 border border-zinc-800 p-8 h-[450px] relative flex flex-col">
           <div className="flex justify-between items-center mb-8">
             <h4 className="text-[10px] font-bold uppercase text-zinc-500 tracking-widest">Atomic Visualization</h4>
             <div className="flex bg-black p-1 border border-zinc-800">
               {[2, 3, 4].map(n => (
                 <button
                   key={n}
                   onClick={() => setLevelType(n as any)}
                   className={`px-6 py-2 text-[9px] font-bold tracking-widest ${
                     levelType === n ? 'bg-cyan-500 text-black' : 'text-zinc-500 hover:bg-zinc-800 hover:text-white'
                   }`}
                 >
                   {n}-LEVEL
                 </button>
               ))}
             </div>
           </div>

           <div className="flex-1 relative">
             <svg className="w-full h-full" viewBox="0 0 400 300">
               {Array.from({ length: levelType }).slice().reverse().map((_, i) => {
                 const lvlIdx = levelType - 1 - i;
                 const y = 250 - (lvlIdx * 200 / (levelType - 1 || 1));
                 return (
                   <g key={lvlIdx}>
                     <line 
                       x1="50" y1={y} x2="350" y2={y} 
                       stroke={lvlIdx === 1 && levelType > 2 ? "#06b6d4" : "#27272a"} 
                       strokeWidth="2" 
                       strokeDasharray={lvlIdx > 0 ? "4 4" : "0"} 
                     />
                     <text x="50" y={y - 10} fill={lvlIdx === 1 && levelType > 2 ? "#06b6d4" : "#52525b"} className="text-[9px] font-bold uppercase tracking-widest">{labels[lvlIdx]}</text>
                     {electrons.filter(e => e.level === lvlIdx).map(e => (
                       <circle 
                         key={e.id} 
                         cx={50 + (e.x * 3)} cy={y} r="5" 
                         fill={lvlIdx === 0 ? "#3f3f46" : "#06b6d4"} 
                       />
                     ))}
                   </g>
                 );
               })}
             </svg>
           </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
           <div className="bg-zinc-900 p-8 border border-zinc-800 space-y-6">
              <h4 className="text-[10px] font-bold uppercase text-zinc-500 tracking-widest border-b border-zinc-800 pb-3 text-center">Technical Matrix</h4>
              <div className="space-y-4">
                 {[
                   { label: "Inversion State", value: matrix[levelType].inversion, color: "text-cyan-500" },
                   { label: "Pumping Power", value: matrix[levelType].pump, color: "text-zinc-400" },
                   { label: "Efficiency Rating", value: matrix[levelType].eff, color: "text-white", large: true }
                 ].map((item, idx) => (
                   <div key={idx} className="p-4 bg-black border border-zinc-800 space-y-1 text-center">
                      <p className="text-[9px] text-zinc-600 uppercase font-bold tracking-widest">{item.label}</p>
                      <p className={`${item.large ? 'text-xl font-mono' : 'text-[12px]'} font-bold uppercase ${item.color}`}>{item.value}</p>
                   </div>
                 ))}
              </div>
           </div>

           <button 
             onClick={onNext} 
             className="w-full bg-white text-black font-bold py-6 text-xl uppercase tracking-tighter hover:bg-cyan-500 active:bg-cyan-600"
           >
             Continue →
           </button>
        </div>
      </div>
    </div>
  );
};

export default AtomicStage;
