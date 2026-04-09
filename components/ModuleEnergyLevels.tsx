
import React, { useState, useEffect } from 'react';

const ModuleEnergyLevels: React.FC = () => {
  const [levelType, setLevelType] = useState<2 | 3 | 4>(3);
  const [electrons, setElectrons] = useState<{ id: number, level: number, x: number }[]>([]);
  
  useEffect(() => {
    const initialElectrons = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      level: 0,
      x: 20 + Math.random() * 60
    }));
    setElectrons(initialElectrons);
  }, []);

  const moveRandomElectron = () => {
    setElectrons(prev => {
      const idx = Math.floor(Math.random() * prev.length);
      const newElectrons = [...prev];
      const currentLevel = newElectrons[idx].level;
      
      let nextLevel = currentLevel;
      if (currentLevel === 0) {
        nextLevel = Math.floor(Math.random() * (levelType - 1)) + 1;
      } else {
        nextLevel = 0;
      }
      
      newElectrons[idx] = { ...newElectrons[idx], level: nextLevel };
      return newElectrons;
    });
  };

  useEffect(() => {
    const interval = setInterval(moveRandomElectron, 1500);
    return () => clearInterval(interval);
  }, [levelType]);

  const levels = Array.from({ length: levelType }, (_, i) => i);

  return (
    <div className="space-y-10">
      <header className="flex justify-between items-center bg-zinc-900 p-8 border border-zinc-800">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-white uppercase tracking-tight">Atomic Energy Levels</h2>
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Quantum State Configuration</p>
        </div>
        <div className="flex bg-black p-1 border border-zinc-800">
          {[2, 3, 4].map(n => (
            <button
              key={n}
              onClick={() => setLevelType(n as any)}
              className={`px-6 py-2 text-[10px] font-bold uppercase tracking-widest ${
                levelType === n ? 'bg-cyan-500 text-black' : 'text-zinc-500 hover:text-white'
              }`}
            >
              {n}-Level
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-black border border-zinc-800 h-[450px] relative p-12 flex flex-col justify-between overflow-hidden">
          {levels.slice().reverse().map(lvl => (
            <div key={lvl} className="relative h-px w-full bg-zinc-800">
              <div className="absolute -top-6 left-0 flex items-center gap-3">
                 <div className={`w-1.5 h-1.5 ${lvl === 0 ? 'bg-zinc-700' : 'bg-cyan-500'}`}></div>
                 <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
                   {lvl === 0 ? 'Ground State (E₀)' : lvl === levelType - 1 ? 'Excited State (Eₘₐₓ)' : `Metastable State (E${lvl})`}
                 </span>
              </div>
              
              {electrons.filter(e => e.level === lvl).map(e => (
                <div
                  key={e.id}
                  className="absolute -top-2 w-4 h-4 bg-cyan-500 border border-white/20 flex items-center justify-center"
                  style={{ left: `${e.x}%` }}
                >
                  <div className="w-1 h-1 bg-white"></div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-zinc-900 p-8 border border-zinc-800 space-y-4">
            <h3 className="text-[10px] font-bold text-cyan-500 uppercase tracking-widest flex items-center gap-2">
              <div className="w-1 h-1 bg-cyan-500"></div>
              System Dynamics
            </h3>
            <p className="text-[13px] text-zinc-400 leading-tight font-bold">
              {levelType === 2 && "In a 2-level system, population inversion is impossible because stimulated emission and absorption processes reach equilibrium at equal populations."}
              {levelType === 3 && "A 3-level system uses a metastable state to hold electrons longer, allowing for population inversion between E₁ and E₀."}
              {levelType === 4 && "A 4-level system is most efficient because the lower laser level (E₁) is rapidly emptied, making population inversion easier to maintain."}
            </p>
          </div>
          
          <div className="bg-zinc-900 p-8 border border-zinc-800 space-y-4">
            <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">The Metastable Key</h4>
            <p className="text-[12px] text-zinc-500 leading-tight font-bold">
              A state where electrons stay for a significantly longer time (~10⁻³ s) compared to excited states (~10⁻⁸ s). This is <span className="text-cyan-500">CRITICAL</span> for achieving population inversion.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleEnergyLevels;
