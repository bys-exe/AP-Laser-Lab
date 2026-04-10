
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
    <div className="animate-stage space-y-10 pb-20">
      <header className="flex justify-between items-start border-b border-zinc-800 pb-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-white uppercase tracking-tight">Experiment 05: Population Inversion</h2>
          <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest">Achieving the Non-Equilibrium State via Optical Pumping.</p>
        </div>
      </header>

      <div className="bg-zinc-900/50 p-8 border border-zinc-800 space-y-6 animate-fadeIn shadow-2xl">
        <h3 className="text-lg font-black text-white uppercase tracking-tight">The Science of Population Inversion</h3>
        <p className="text-sm text-zinc-400 leading-relaxed font-bold uppercase tracking-tight">
          Naturally, atoms reside in the Ground State (N₁) following the <span className="text-white">Boltzmann Distribution</span> (N₂/N₁ = e<sup>-ΔE/kT</sup>). At thermal equilibrium, the population of excited states is almost zero. For a laser to work, we must forcefully 'reverse' this natural order using <span className="text-white">Pumping</span>. When N₂ &gt; N₁, we achieve 'Population Inversion', where stimulated emission finally becomes more likely than absorption, allowing light to be amplified.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-6 space-y-6">
           <div className="bg-zinc-900 p-10 border border-zinc-800 flex flex-col justify-between h-[480px] shadow-2xl relative">
             
             <div className="space-y-8 relative z-10">
                <div className="flex justify-between items-center">
                  <h4 className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Pumping Intensity Control</h4>
                  <span className={`font-mono font-black text-3xl transition-colors ${isInverted ? 'text-cyan-500' : 'text-zinc-700'}`}>{pump}%</span>
                </div>
                <div className="bg-black p-4 border border-zinc-800 shadow-inner">
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={pump} 
                    onChange={(e) => setPump(Number(e.target.value))} 
                    className="w-full accent-cyan-500"
                  />
                </div>
             </div>

             <div className="flex gap-12 items-end justify-center h-48 px-6 relative z-10">
                <div className="flex flex-col items-center gap-4 flex-1 h-full">
                  <div className="w-full bg-black relative overflow-hidden h-full border border-zinc-800 shadow-inner">
                    <div className="absolute bottom-0 w-full bg-zinc-700 transition-all duration-500" style={{ height: `${n1}%` }}></div>
                  </div>
                  <span className="text-[10px] font-black text-zinc-600 uppercase">Ground (N₁)</span>
                </div>
                <div className="flex flex-col items-center gap-4 flex-1 h-full">
                  <div className="w-full bg-black relative overflow-hidden h-full border border-zinc-800 shadow-inner">
                    <div className={`absolute bottom-0 w-full bg-cyan-500 transition-all duration-500 ${isInverted ? 'shadow-[0_0_40px_rgba(6,182,212,0.6)]' : ''}`} style={{ height: `${n2}%` }}></div>
                  </div>
                  <span className="text-[10px] font-black text-zinc-600 uppercase">Excited (N₂)</span>
                </div>
             </div>

             <div className={`p-4 border flex items-center justify-center gap-3 transition-all relative z-10 ${isInverted ? 'bg-cyan-500 text-black border-cyan-400 shadow-lg shadow-cyan-900/40' : 'bg-black text-zinc-700 border-zinc-800'}`}>
                <div className={`w-2 h-2 rounded-full ${isInverted ? 'bg-black animate-ping' : 'bg-zinc-900'}`}></div>
                <span className="text-[10px] font-black uppercase tracking-widest">
                  {isInverted ? 'Inversion Achieved: System Gain > 0' : 'Thermal Distribution: No Inversion'}
                </span>
             </div>
           </div>
        </div>

        <div className="lg:col-span-6 space-y-6">
           <div className="bg-zinc-900 p-8 border border-zinc-800 h-[480px] shadow-2xl relative">
              <h4 className="text-[10px] font-black uppercase text-zinc-600 mb-8 tracking-widest">Transient Population Map (N vs t)</h4>
              
              <div className="h-[250px] w-full bg-black border border-zinc-800 p-6 relative overflow-hidden flex flex-col shadow-inner">
                <svg width="100%" height="100%" viewBox="0 0 300 150" preserveAspectRatio="none">
                  <path d={generateLinePath(history.map(h => h.n1))} fill="none" stroke="#3f3f46" strokeWidth="2" strokeOpacity="0.4" />
                  <path d={generateLinePath(history.map(h => h.n2))} fill="none" stroke="#06b6d4" strokeWidth="4" />
                  <line x1="0" y1="75" x2="300" y2="75" stroke="#1e293b" strokeDasharray="4 2" />
                </svg>
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-zinc-700 rounded-full shadow-[0_0_10px_#3f3f46]"></div>
                    <span className="text-[9px] font-black text-zinc-600 uppercase">N₁ (Ground)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full shadow-[0_0_10px_#06b6d4]"></div>
                    <span className="text-[9px] font-black text-zinc-600 uppercase">N₂ (Excited)</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-6 bg-black border border-zinc-800 shadow-inner">
                 <h4 className="text-[10px] font-black uppercase text-zinc-700 mb-3 tracking-widest italic font-bold">Lab Analysis</h4>
                 <p className="text-[11px] text-zinc-500 leading-relaxed font-bold uppercase tracking-tight">
                   Notice how the excited population N₂ grows as you increase pump intensity. The intersection point marks the <span className="text-white">threshold</span> where laser action begins. Below this intersection, the system acts as a standard lamp.
                 </p>
              </div>
           </div>
        </div>
      </div>

      <button 
        disabled={!isInverted}
        onClick={onNext}
        className={`w-full py-6 font-black text-xl transition-all ${
          isInverted ? 'bg-white text-black hover:bg-cyan-500 shadow-2xl' : 'bg-zinc-900 text-zinc-700 cursor-not-allowed'
        }`}
      >
        {isInverted ? 'Proceed to Optical Feedback Experiment →' : 'Achieve Inversion to Unlock Next Stage'}
      </button>
    </div>
  );
};

export default PopulationStage;
