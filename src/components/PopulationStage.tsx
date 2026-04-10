
import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

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
    <div className="space-y-12 pb-20 font-mono">
      <header className="flex justify-between items-start border-b border-zinc-900 pb-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
        <div className="space-y-2">
          <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Experiment 05: Population Inversion</h2>
          <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.4em]">Achieving Non-Equilibrium via Optical Pumping</p>
        </div>
      </header>

      <div className="bg-zinc-950 p-10 border border-zinc-900 space-y-8 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500/20" />
        <h3 className="text-xl font-black text-white uppercase tracking-tighter flex items-center gap-3">
          <span className="w-2 h-2 bg-cyan-500" />
          The Science of Population Inversion
        </h3>
        <p className="text-[11px] text-zinc-500 leading-relaxed font-medium uppercase tracking-tight max-w-3xl">
          Naturally, atoms reside in the Ground State (N₁) following the <span className="text-white">Boltzmann Distribution</span>. At thermal equilibrium, the population of excited states is almost zero. For a laser to work, we must forcefully 'reverse' this natural order using <span className="text-white font-bold">Pumping</span>. When N₂ &gt; N₁, we achieve 'Population Inversion', where stimulated emission finally becomes more likely than absorption, allowing light to be amplified.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-6 space-y-8">
           <div className="bg-zinc-950 p-10 border border-zinc-900 flex flex-col justify-between h-[520px] shadow-2xl relative overflow-hidden">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.02),transparent_70%)]" />
             
             <div className="space-y-8 relative z-10">
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase text-zinc-600 tracking-[0.3em]">Pumping Intensity</label>
                    <div className="text-2xl font-black text-white tracking-tighter">I_pump</div>
                  </div>
                  <div className="text-right">
                    <span className={`font-mono font-black text-3xl transition-colors ${isInverted ? 'text-cyan-400' : 'text-zinc-700'}`}>{pump}%</span>
                  </div>
                </div>
                <div className="relative h-12 flex items-center px-4 bg-black border border-zinc-900 rounded-sm">
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={pump} 
                    onChange={(e) => setPump(Number(e.target.value))} 
                    className="w-full h-1 bg-zinc-800 appearance-none cursor-pointer accent-cyan-500 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-cyan-500 [&::-webkit-slider-thumb]:rounded-none [&::-webkit-slider-thumb]:appearance-none"
                  />
                </div>
             </div>

             <div className="flex gap-16 items-end justify-center h-56 px-10 relative z-10">
                <div className="flex flex-col items-center gap-6 flex-1 h-full">
                  <div className="w-full bg-black relative overflow-hidden h-full border border-zinc-900 shadow-inner">
                    <motion.div 
                      className="absolute bottom-0 w-full bg-zinc-800" 
                      animate={{ height: `${n1}%` }}
                      transition={{ type: "spring", stiffness: 50 }}
                    />
                  </div>
                  <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Ground (N₁)</span>
                </div>
                <div className="flex flex-col items-center gap-6 flex-1 h-full">
                  <div className="w-full bg-black relative overflow-hidden h-full border border-zinc-900 shadow-inner">
                    <motion.div 
                      className={`absolute bottom-0 w-full bg-cyan-500 ${isInverted ? 'shadow-[0_0_40px_rgba(6,182,212,0.4)]' : ''}`} 
                      animate={{ height: `${n2}%` }}
                      transition={{ type: "spring", stiffness: 50 }}
                    />
                  </div>
                  <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Excited (N₂)</span>
                </div>
             </div>

             <div className={`p-6 border flex items-center justify-center gap-4 transition-all relative z-10 overflow-hidden ${isInverted ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.1)]' : 'bg-black text-zinc-700 border-zinc-900'}`}>
                {isInverted && <motion.div className="w-2 h-2 rounded-full bg-cyan-400" animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1 }} />}
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                  {isInverted ? 'Inversion Achieved: System Gain > 0' : 'Thermal Distribution: No Inversion'}
                </span>
             </div>
           </div>
        </div>

        <div className="lg:col-span-6 space-y-8">
           <div className="bg-zinc-950 p-10 border border-zinc-900 h-[520px] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <svg width="40" height="40" viewBox="0 0 40 40">
                  <path d="M 0 0 L 40 40 M 40 0 L 0 40" stroke="white" strokeWidth="1" />
                </svg>
              </div>
              <h4 className="text-[9px] font-black uppercase text-zinc-600 mb-10 tracking-[0.3em]">Transient Population Map (N vs t)</h4>
              
              <div className="h-[280px] w-full bg-black border border-zinc-900 p-8 relative overflow-hidden flex flex-col shadow-inner">
                <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 opacity-5 pointer-events-none">
                  {[...Array(16)].map((_, i) => <div key={i} className="border border-white" />)}
                </div>
                <svg width="100%" height="100%" viewBox="0 0 300 150" preserveAspectRatio="none" className="relative z-10">
                  <path d={generateLinePath(history.map(h => h.n1))} fill="none" stroke="#1e293b" strokeWidth="1.5" />
                  <path d={generateLinePath(history.map(h => h.n2))} fill="none" stroke="#06b6d4" strokeWidth="3" className="drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]" />
                  <line x1="0" y1="75" x2="300" y2="75" stroke="#1e293b" strokeDasharray="4 2" />
                </svg>
                <div className="flex justify-between items-center mt-6 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-zinc-800 rounded-full" />
                    <span className="text-[9px] font-black text-zinc-700 uppercase tracking-widest">N₁ (Ground)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full shadow-[0_0_10px_#06b6d4]" />
                    <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">N₂ (Excited)</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-8 bg-black border border-zinc-900 shadow-inner relative group">
                 <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
                 <h4 className="text-[10px] font-black uppercase text-zinc-700 mb-4 tracking-[0.3em] relative z-10">Lab Analysis</h4>
                 <p className="text-[11px] text-zinc-500 leading-relaxed font-medium uppercase tracking-tight relative z-10">
                   Notice how the excited population N₂ grows as you increase pump intensity. The intersection point marks the <span className="text-white">threshold</span> where laser action begins. Below this intersection, the system acts as a standard lamp.
                 </p>
              </div>
           </div>
        </div>
      </div>

      <button 
        disabled={!isInverted}
        onClick={onNext}
        className={`group relative w-full p-8 transition-all overflow-hidden border ${
          isInverted 
          ? 'bg-zinc-900 border-zinc-800 hover:border-cyan-500/50' 
          : 'bg-zinc-950 border-zinc-900 opacity-50 cursor-not-allowed'
        }`}
      >
        {isInverted && (
          <>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity" />
            <div className="absolute top-0 left-0 w-full h-[2px] bg-zinc-800" />
          </>
        )}
        <span className={`text-xl font-black uppercase tracking-tighter transition-colors ${isInverted ? 'text-white group-hover:text-cyan-400' : 'text-zinc-800'}`}>
          {isInverted ? 'Proceed to Optical Feedback Experiment →' : 'Achieve Inversion to Unlock Next Stage'}
        </span>
      </button>
    </div>
  );
};

export default PopulationStage;
