
import React, { useState, useEffect } from 'react';

const ModuleEnergyLevels: React.FC = () => {
  const [levelType, setLevelType] = useState<2 | 3 | 4>(3);
  const [electrons, setElectrons] = useState<{ id: number, level: number, x: number }[]>([]);
  
  // Initialize electrons
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
      
      // Basic random transitions for animation effect
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
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800">Atomic Energy Levels</h2>
        <div className="flex bg-gray-100 p-1 rounded-lg">
          {[2, 3, 4].map(n => (
            <button
              key={n}
              onClick={() => setLevelType(n as any)}
              className={`px-4 py-2 rounded-md transition-all ${
                levelType === n ? 'bg-blue-600 text-white shadow' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {n}-Level
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-gray-50 border rounded-xl h-[400px] relative p-8 flex flex-col justify-between">
          {levels.slice().reverse().map(lvl => (
            <div key={lvl} className="relative h-1 w-full bg-gray-300">
              <span className="absolute -top-6 left-0 text-xs font-mono font-bold text-gray-500">
                {lvl === 0 ? 'GROUND (E0)' : lvl === levelType - 1 ? 'EXCITED (Emax)' : `METASTABLE (E${lvl})`}
              </span>
              
              {electrons.filter(e => e.level === lvl).map(e => (
                <div
                  key={e.id}
                  className="absolute -top-3 w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-sm transition-all duration-1000 ease-in-out"
                  style={{ left: `${e.x}%` }}
                />
              ))}
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-blue-900 mb-2">System Insights</h3>
            <p className="text-sm text-gray-600">
              {levelType === 2 && "In a 2-level system, population inversion is impossible because stimulated emission and absorption processes reach equilibrium at equal populations."}
              {levelType === 3 && "A 3-level system uses a metastable state to hold electrons longer, allowing for population inversion between E1 and E0."}
              {levelType === 4 && "A 4-level system is most efficient because the lower laser level (E1) is rapidly emptied, making population inversion easier to maintain."}
            </p>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100">
            <h4 className="font-bold text-yellow-800 text-sm mb-1 uppercase tracking-wider">Metastable State</h4>
            <p className="text-xs text-yellow-700 leading-relaxed">
              A state where electrons stay for a significantly longer time (approx 10⁻³ s) compared to excited states (10⁻⁸ s). This is CRITICAL for achieving population inversion.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleEnergyLevels;
