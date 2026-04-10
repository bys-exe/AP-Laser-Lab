
import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

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
    <div className="animate-stage space-y-8 md:space-y-12 font-mono">
      <header className="space-y-2 border-b border-lab-border pb-6 md:pb-8 relative overflow-hidden">
        <h2 className="text-2xl md:text-4xl font-black text-[var(--text-main)] uppercase tracking-tighter">Experiment 03: Energy Systems</h2>
        <p className="text-[var(--text-muted)] text-[8px] md:text-[10px] font-bold uppercase tracking-[0.4em]">Analysis of Energy States & Metastable Conditions</p>
      </header>

      <div className="bg-lab-surface p-6 md:p-10 border border-lab-border space-y-6 md:space-y-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-3xl rounded-full" />
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 relative z-10">
          <div className="space-y-4 md:space-y-6">
            <h4 className="text-[9px] md:text-[10px] font-black uppercase text-cyan-500 tracking-[0.3em] flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-cyan-500" />
              Theoretical Background
            </h4>
            <p className="text-xs md:text-sm text-[var(--text-muted)] leading-relaxed font-medium tracking-tight">
              For laser action, we need a <span className="text-[var(--text-main)]">Metastable State</span>—a level where electrons stay for a long period (10⁻³s vs 10⁻⁸s). 
              In a 2-level system, the rates of absorption and stimulated emission are equal at best, making 
              population inversion impossible. 3 and 4-level systems solve this by utilizing fast non-radiative 
              transitions into a metastable reservoir.
            </p>
          </div>
          <div className="space-y-4 md:space-y-6">
            <h4 className="text-[9px] md:text-[10px] font-black uppercase text-[var(--text-muted)] tracking-[0.3em] flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-lab-border" />
              Experiment Aim & Procedure
            </h4>
            <p className="text-xs md:text-sm text-[var(--text-muted)] font-medium tracking-tight">
              <span className="text-[var(--text-main)]">Aim:</span> To compare electron accumulation in different atomic configurations. <br/>
              <span className="text-[var(--text-main)]">Procedure:</span> Toggle the system levels above. Observe how 4-level systems maintain 
              an empty lower laser level, maximizing efficiency compared to 2 or 3-level types.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">
        <div className="lg:col-span-8 bg-lab-surface border border-lab-border p-6 md:p-12 h-[350px] md:h-[500px] relative overflow-hidden shadow-2xl group">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.02),transparent_70%)]" />
           
           <div className="absolute top-4 right-4 md:top-8 md:right-8 flex bg-lab-bg p-1 border border-lab-border z-10 rounded-sm">
             {[2, 3, 4].map(n => (
               <button
                 key={n}
                 onClick={() => setLevelType(n as any)}
                 className={`px-3 md:px-6 py-1.5 md:py-2 text-[8px] md:text-[10px] font-black tracking-[0.2em] transition-all relative overflow-hidden ${
                   levelType === n ? 'text-cyan-400' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
                 }`}
               >
                 {levelType === n && (
                   <motion.div layoutId="levelTab" className="absolute inset-0 bg-cyan-500/5 border border-cyan-500/20" />
                 )}
                 <span className="relative z-10">{n}-LEVEL</span>
               </button>
             ))}
           </div>

           <svg className="w-full h-full mt-8 md:mt-10" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet">
             {Array.from({ length: levelType }).slice().reverse().map((_, i) => {
               const lvlIdx = levelType - 1 - i;
               const y = 250 - (lvlIdx * 200 / (levelType - 1 || 1));
               return (
                 <g key={lvlIdx}>
                   <line x1="50" y1={y} x2="350" y2={y} stroke={lvlIdx === 1 && levelType > 2 ? "#facc15" : "#1e293b"} strokeWidth="1" strokeDasharray={lvlIdx > 0 ? "4 4" : "0"} className="opacity-50" />
                   <text x="50" y={y - 15} fill="#3f3f46" className="text-[9px] font-black uppercase tracking-[0.2em]">{labels[lvlIdx]}</text>
                   {electrons.filter(e => e.level === lvlIdx).map(e => (
                     <motion.circle 
                       key={e.id} 
                       cx={50 + (e.x * 3)} 
                       cy={y} 
                       r="5" 
                       fill={lvlIdx === 0 ? "#06b6d4" : "#f43f5e"} 
                       className="drop-shadow-[0_0_8px_rgba(6,182,212,0.3)]"
                       layout
                       transition={{ type: "spring", stiffness: 100, damping: 20 }}
                     />
                   ))}
                 </g>
               );
             })}
           </svg>
        </div>

        <div className="lg:col-span-4 space-y-6 md:space-y-8">
           <div className="bg-lab-surface p-6 md:p-10 border border-lab-border space-y-6 md:space-y-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500/20" />
              <h4 className="text-[9px] md:text-[10px] font-black uppercase text-[var(--text-muted)] tracking-[0.3em] border-b border-lab-border pb-4">Technical Matrix</h4>
              <div className="space-y-4 md:space-y-6">
                 <div className="p-4 md:p-6 bg-lab-bg border border-lab-border space-y-2 shadow-inner relative group">
                    <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
                    <p className="text-[8px] md:text-[9px] text-[var(--text-muted)] uppercase font-black tracking-widest relative z-10">Inversion State</p>
                    <p className="text-xs md:text-sm font-black text-cyan-500 uppercase tracking-tighter relative z-10">{matrix[levelType].inversion}</p>
                 </div>
                 <div className="p-4 md:p-6 bg-lab-bg border border-lab-border space-y-2 shadow-inner relative group">
                    <p className="text-[8px] md:text-[9px] text-[var(--text-muted)] uppercase font-black tracking-widest relative z-10">Pumping Power</p>
                    <p className="text-xs md:text-sm font-black text-[var(--text-muted)] uppercase tracking-tighter relative z-10">{matrix[levelType].pump}</p>
                 </div>
                 <div className="p-4 md:p-6 bg-lab-bg border border-lab-border space-y-2 shadow-inner relative group">
                    <p className="text-[8px] md:text-[9px] text-[var(--text-muted)] uppercase font-black tracking-widest relative z-10">Efficiency Rating</p>
                    <p className="text-2xl md:text-3xl font-black text-[var(--text-main)] tracking-tighter relative z-10">{matrix[levelType].eff}</p>
                 </div>
              </div>
           </div>

           <button 
            onClick={onNext} 
            className="group relative w-full bg-lab-surface border border-lab-border p-6 md:p-8 transition-all hover:border-cyan-500/50"
          >
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity" />
            <div className="absolute top-0 left-0 w-full h-[2px] bg-lab-border" />
            <span className="text-lg md:text-xl font-black text-[var(--text-main)] uppercase tracking-tighter group-hover:text-cyan-400 transition-colors">Continue to Interactions →</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AtomicStage;
