
import React, { useState, useEffect } from 'react';

const PopulationStage: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [pump, setPump] = useState(25);
  const [history, setHistory] = useState<{ n1: number, n2: number }[]>([]);
  
  const n2 = Math.min(100, (pump / 100) * 120); 
  const n1 = 100 - (n2 * 0.5);
  const isInverted = n2 > n1;

  useEffect(() => {
    const interval = setInterval(() => {
      setHistory(prev => {
        const updated = [...prev, { n1, n2 }];
        return updated.slice(-50);
      });
    }, 150);
    return () => clearInterval(interval);
  }, [n1, n2]);

  const generateLinePath = (data: number[]) => {
    if (data.length < 2) return "";
    const width = 300;
    const height = 150;
    const step = width / 50;
    return data.map((val, i) => `${i === 0 ? 'M' : 'L'} ${i * step} ${height - (val * height / 100)}`).join(' ');
  };

  return (
    <div className="space-y-10">
      <header className="flex justify-between items-end border-b border-zinc-800 pb-6">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="bg-zinc-800 text-cyan-500 px-3 py-1 text-[10px] font-bold uppercase tracking-widest border border-zinc-700">
              Stage 05
            </span>
            <div className="h-px w-8 bg-zinc-800"></div>
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Thermodynamic Reversal</span>
          </div>
          <h2 className="text-3xl font-bold text-white uppercase tracking-tight">Population Inversion</h2>
        </div>
        <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest max-w-[200px] text-right leading-tight">
          Achieving the Non-Equilibrium State via Optical Pumping.
        </p>
      </header>

      <div className="bg-zinc-900 border border-zinc-800 p-8 space-y-4">
        <h3 className="text-xl font-bold text-white uppercase tracking-tight flex items-center gap-3">
          <div className="w-1 h-6 bg-cyan-500"></div>
          The Science of Population Inversion
        </h3>
        <p className="text-[14px] text-zinc-400 leading-tight font-bold">
          Naturally, atoms reside in the Ground State (N₁) following the Boltzmann Distribution. At thermal equilibrium, the population of excited states is almost zero. For a laser to work, we must forcefully 'reverse' this natural order using Pumping. When N₂ &gt; N₁, we achieve 'Population Inversion', where stimulated emission finally becomes more likely than absorption.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-6 space-y-6">
           <div className="bg-zinc-900 p-8 border border-zinc-800 flex flex-col justify-between h-[480px]">
             <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Pumping Intensity</h4>
                  <span className={`font-mono font-bold text-3xl ${isInverted ? 'text-cyan-500' : 'text-zinc-700'}`}>{pump}%</span>
                </div>
                <div className="bg-black p-4 border border-zinc-800">
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={pump} 
                    onChange={(e) => setPump(Number(e.target.value))} 
                    className="w-full h-1 bg-zinc-800 appearance-none cursor-pointer accent-cyan-500"
                  />
                </div>
             </div>

             <div className="flex gap-10 items-end justify-center h-48 px-4">
                <div className="flex flex-col items-center gap-4 flex-1 h-full">
                  <div className="w-full bg-black relative h-full border border-zinc-800">
                    <div 
                      className="absolute bottom-0 w-full bg-zinc-700" 
                      style={{ height: `${n1}%` }}
                    />
                  </div>
                  <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Ground (N₁)</span>
                </div>
                <div className="flex flex-col items-center gap-4 flex-1 h-full">
                  <div className="w-full bg-black relative h-full border border-zinc-800">
                    <div 
                      className={`absolute bottom-0 w-full ${isInverted ? 'bg-cyan-500' : 'bg-zinc-800'}`} 
                      style={{ height: `${n2}%` }}
                    />
                  </div>
                  <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Excited (N₂)</span>
                </div>
             </div>

             <div className={`p-4 border text-center ${isInverted ? 'bg-cyan-500 text-black border-cyan-500' : 'bg-black text-zinc-600 border-zinc-800'}`}>
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  {isInverted ? 'Inversion Achieved: System Gain > 0' : 'Thermal Distribution: No Inversion'}
                </span>
             </div>
           </div>
        </div>

        <div className="lg:col-span-6 space-y-6">
           <div className="bg-zinc-900 p-8 border border-zinc-800 h-[480px] flex flex-col">
              <h4 className="text-[10px] font-bold text-zinc-500 mb-8 tracking-widest uppercase">Transient Population Map (N vs t)</h4>
              
              <div className="flex-1 w-full bg-black border border-zinc-800 p-6 flex flex-col">
                <svg width="100%" height="100%" viewBox="0 0 300 150" preserveAspectRatio="none">
                  <path 
                    d={generateLinePath(history.map(h => h.n1))}
                    fill="none" stroke="#3f3f46" strokeWidth="2" 
                  />
                  <path 
                    d={generateLinePath(history.map(h => h.n2))}
                    fill="none" stroke="#06b6d4" strokeWidth="3" 
                  />
                  <line x1="0" y1="75" x2="300" y2="75" stroke="#27272a" strokeDasharray="4 2" />
                </svg>
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-zinc-700"></div>
                    <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">N₁ (Ground)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-500"></div>
                    <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">N₂ (Excited)</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-6 bg-black border border-zinc-800">
                 <h4 className="text-[9px] font-bold uppercase text-zinc-600 mb-2 tracking-widest italic">Lab Analysis</h4>
                 <p className="text-[12px] text-zinc-500 leading-tight font-bold">
                   N₂ grows with pump intensity. The intersection marks the threshold where laser action begins.
                 </p>
              </div>
           </div>
        </div>
      </div>

      <div className="pt-8">
        <button 
          disabled={!isInverted}
          onClick={onNext}
          className={`w-full py-6 font-bold text-xl uppercase tracking-tighter ${
            isInverted ? 'bg-white text-black hover:bg-cyan-500 active:bg-cyan-600' : 'bg-zinc-900 text-zinc-700 cursor-not-allowed border border-zinc-800'
          }`}
        >
          {isInverted ? 'Proceed to Optical Feedback →' : 'Achieve Inversion to Unlock Next Stage'}
        </button>
      </div>
    </div>
  );
};

export default PopulationStage;
