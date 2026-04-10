
import React, { useState } from 'react';

const CavityStage: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [gain, setGain] = useState(1.5);
  const [reflectivity, setReflectivity] = useState(90);

  const threshold = (100 - reflectivity) / 10 + 1;
  const isLasing = gain >= threshold;

  return (
    <div className="animate-stage space-y-12 pb-20">
      <header className="flex justify-between items-start border-b border-zinc-800 pb-6">
        <div className="space-y-1">
          <h2 className="text-4xl font-black text-white tracking-tight uppercase">Stage 06: The Optical Cavity</h2>
          <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest">Resonance, feedback, and achieving the lasing threshold.</p>
        </div>
      </header>

      {/* Optical Cavity Box Animation */}
      <div className="relative h-[450px] w-full flex items-center justify-center bg-zinc-900/20 border border-zinc-800/50 shadow-inner overflow-hidden">
        
        {/* Mirror Labels */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 rotate-180 flex flex-col items-center gap-2" style={{ writingMode: 'vertical-rl' }}>
           <span className="text-zinc-700 font-black text-[10px] uppercase tracking-[0.4em]">100% Mirror (Full)</span>
           <div className="w-1.5 h-32 bg-zinc-800"></div>
        </div>
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2" style={{ writingMode: 'vertical-rl' }}>
           <span className="text-cyan-500 font-black text-[10px] uppercase tracking-[0.4em]">Output Coupler (Partial)</span>
           <div className="w-1.5 h-32 bg-cyan-500"></div>
        </div>

        {/* The Cavity Rectangle (Dark Red Box) */}
        <div className="w-[85%] h-[320px] bg-zinc-950 border-x-[12px] border-zinc-800 relative overflow-hidden shadow-2xl flex items-center group">
          
          {/* Internal Glow when lasing */}
          <div className={`absolute inset-0 transition-opacity duration-1000 ${isLasing ? 'opacity-30 bg-cyan-500 blur-2xl' : 'opacity-0'}`}></div>
          
          {/* Multiple Fast Moving Laser Lines */}
          {isLasing ? (
            <div className="absolute inset-0 z-20">
              {[...Array(6)].map((_, i) => (
                <div 
                  key={i} 
                  className="absolute text-white text-xl font-black italic tracking-tighter whitespace-nowrap"
                  style={{
                    top: `${15 + i * 14}%`,
                    animation: `fastLaser ${0.3 + Math.random() * 0.4}s linear infinite`,
                    animationDelay: `${i * 0.1}s`
                  }}
                >
                  ~~~~~~
                </div>
              ))}
              {/* Main Core Beam Trail */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1 bg-cyan-500/40 blur-sm"></div>
            </div>
          ) : (
            /* Slow, scattered seed photons when below threshold */
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <div className="text-white text-2xl font-black italic tracking-tighter animate-pulse opacity-40">
                ~~~~~~
              </div>
            </div>
          )}
          
          {/* Continuous Lasing Beam Output */}
          {isLasing && (
             <div className="absolute right-0 h-10 flex items-center translate-x-full z-30">
                <div className="h-1 bg-cyan-500 shadow-[0_0_60px_#06b6d4] w-[300px] animate-pulse"></div>
                <div className="absolute left-0 text-white text-4xl font-black italic tracking-tighter animate-pulse">
                  ~~~~~~~~~~~~~~~~~~
                </div>
             </div>
          )}

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             {!isLasing ? (
               <span className="text-[10px] font-black text-zinc-800 uppercase tracking-widest animate-pulse italic">Gain &lt; Cavity Loss</span>
             ) : (
               <span className="text-[10px] font-black text-white uppercase tracking-[0.8em] animate-pulse drop-shadow-lg">STIMULATED OSCILLATION ACTIVE</span>
             )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="bg-zinc-900 p-10 border border-zinc-800 space-y-10 shadow-2xl">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Optical Gain Coefficient (g)</span>
              <span className={`text-2xl font-mono font-black ${isLasing ? 'text-cyan-500' : 'text-zinc-700'}`}>{gain.toFixed(1)}x</span>
            </div>
            <div className="bg-black p-4 border border-zinc-800 shadow-inner">
              <input 
                type="range" 
                min="0.5" 
                max="5" 
                step="0.1" 
                value={gain} 
                onChange={(e) => setGain(Number(e.target.value))} 
                className="w-full accent-cyan-500"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Mirror Reflectivity (%)</span>
              <span className="text-white font-mono font-black text-2xl">{reflectivity}%</span>
            </div>
            <div className="bg-black p-4 border border-zinc-800 shadow-inner">
              <input 
                type="range" 
                min="50" 
                max="99" 
                value={reflectivity} 
                onChange={(e) => setReflectivity(Number(e.target.value))} 
                className="w-full accent-cyan-500"
              />
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 p-10 border border-zinc-800 space-y-8 flex flex-col justify-center shadow-2xl">
          <h3 className="text-xs font-black text-cyan-500 uppercase tracking-widest flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse"></div>
            Theory: Optical Feedback Mechanism
          </h3>
          <p className="text-sm text-zinc-400 leading-relaxed font-bold uppercase tracking-tight">
            The optical resonator mirrors provide <span className="text-white">feedback</span> by reflecting photons back into the gain medium multiple times. This increases the distance light travels through the medium, allowing for massive amplification. At the 'threshold', the gain precisely matches internal and mirror losses, resulting in a stable output beam.
          </p>
          <div className="mt-4 p-6 bg-black border border-zinc-800 shadow-inner">
             <div className="flex justify-between items-center">
                <span className="text-[10px] font-black text-zinc-700 uppercase">Resonator Status</span>
                <span className={`text-[11px] font-black uppercase ${isLasing ? 'text-cyan-500' : 'text-zinc-700'}`}>
                   {isLasing ? 'Stimulated Oscillation Sustained' : 'Below Lasing Threshold'}
                </span>
             </div>
          </div>
          <button 
            onClick={onNext}
            className="w-full bg-white text-black font-black py-5 hover:bg-cyan-500 transition-all shadow-2xl text-xl mt-4"
          >
            Go to Numerical Lab →
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fastLaser {
          0% { left: -150px; }
          100% { left: 100%; }
        }
      `}</style>
    </div>
  );
};

export default CavityStage;
