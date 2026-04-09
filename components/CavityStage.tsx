
import React, { useState } from 'react';

const CavityStage: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [gain, setGain] = useState(1.5);
  const [reflectivity, setReflectivity] = useState(90);

  const threshold = (100 - reflectivity) / 10 + 1;
  const isLasing = gain >= threshold;

  return (
    <div className="animate-stage space-y-12 pb-20">
      <header className="flex justify-between items-start border-b border-slate-800 pb-6">
        <div className="space-y-1">
          <h2 className="text-4xl font-black text-white tracking-tight">Stage 5: The Optical Cavity</h2>
          <p className="text-slate-400 text-lg">Resonance, feedback, and achieving the lasing threshold.</p>
        </div>
      </header>

      {/* Optical Cavity Box Animation */}
      <div className="relative h-[450px] w-full flex items-center justify-center bg-slate-900/20 rounded-[3rem] border border-slate-800/50 shadow-inner overflow-hidden">
        
        {/* Mirror Labels */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 rotate-180 flex flex-col items-center gap-2" style={{ writingMode: 'vertical-rl' }}>
           <span className="text-slate-500 font-black text-[10px] uppercase tracking-[0.4em]">100% Mirror (Full)</span>
           <div className="w-1.5 h-32 bg-slate-700 rounded-full"></div>
        </div>
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2" style={{ writingMode: 'vertical-rl' }}>
           <span className="text-rose-500 font-black text-[10px] uppercase tracking-[0.4em]">Output Coupler (Partial)</span>
           <div className="w-1.5 h-32 bg-rose-600 rounded-full"></div>
        </div>

        {/* The Cavity Rectangle (Dark Red Box) */}
        <div className="w-[85%] h-[320px] bg-red-950/40 rounded-[2.5rem] border-x-[12px] border-slate-800 relative overflow-hidden shadow-2xl flex items-center group">
          
          {/* Internal Glow when lasing */}
          <div className={`absolute inset-0 transition-opacity duration-1000 ${isLasing ? 'opacity-30 bg-rose-600 blur-2xl' : 'opacity-0'}`}></div>
          
          {/* Multiple Fast Moving Laser Lines */}
          {isLasing ? (
            <div className="absolute inset-0 z-20">
              {[...Array(6)].map((_, i) => (
                <div 
                  key={i} 
                  className="absolute h-[2px] bg-white shadow-[0_0_10px_white] w-32"
                  style={{
                    top: `${15 + i * 14}%`,
                    animation: `fastLaser ${0.3 + Math.random() * 0.4}s linear infinite`,
                    animationDelay: `${i * 0.1}s`
                  }}
                ></div>
              ))}
              {/* Main Core Beam Trail */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1 bg-rose-500/40 blur-sm"></div>
            </div>
          ) : (
            /* Slow, scattered seed photons when below threshold */
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-ping opacity-20"></div>
            </div>
          )}
          
          {/* Continuous Lasing Beam Output */}
          {isLasing && (
             <div className="absolute right-0 h-10 bg-rose-500/80 shadow-[0_0_60px_#f43f5e,0_0_100px_rgba(244,63,94,0.3)] w-[300px] translate-x-full rounded-full animate-pulse z-30"></div>
          )}

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             {!isLasing ? (
               <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest animate-pulse italic">Gain &lt; Loss</span>
             ) : (
               <span className="text-[10px] font-black text-white uppercase tracking-[0.8em] animate-pulse drop-shadow-lg">STIMULATED OSCILLATION ACTIVE</span>
             )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="bg-slate-900 p-10 rounded-[3rem] border border-slate-800 space-y-10 shadow-2xl">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Optical Gain Coefficient (g)</span>
              <span className={`text-2xl font-mono font-black ${isLasing ? 'text-green-500' : 'text-rose-500'}`}>{gain.toFixed(1)}x</span>
            </div>
            {/* Fixed Slider UI */}
            <div className="bg-slate-950 p-4 rounded-3xl border border-slate-800 shadow-inner">
              <input 
                type="range" 
                min="0.5" 
                max="5" 
                step="0.1" 
                value={gain} 
                onChange={(e) => setGain(Number(e.target.value))} 
                className="w-full"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mirror Reflectivity (%)</span>
              <span className="text-white font-mono font-black text-2xl">{reflectivity}%</span>
            </div>
            {/* Fixed Slider UI */}
            <div className="bg-slate-950 p-4 rounded-3xl border border-slate-800 shadow-inner">
              <input 
                type="range" 
                min="50" 
                max="99" 
                value={reflectivity} 
                onChange={(e) => setReflectivity(Number(e.target.value))} 
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div className="bg-slate-900 p-10 rounded-[3rem] border border-slate-800 space-y-8 flex flex-col justify-center shadow-2xl">
          <h3 className="text-xs font-black text-rose-500 uppercase tracking-widest flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse"></div>
            Theory: Optical Feedback Mechanism
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed font-medium">
            The optical resonator mirrors provide <strong>feedback</strong> by reflecting photons back into the gain medium multiple times. This increases the distance light travels through the medium, allowing for massive amplification. At the 'threshold', the gain precisely matches internal and mirror losses, resulting in a stable output beam.
          </p>
          <div className="mt-4 p-6 bg-slate-950 rounded-3xl border border-slate-800 shadow-inner">
             <div className="flex justify-between items-center">
                <span className="text-[10px] font-black text-slate-600 uppercase">Resonator Status</span>
                <span className={`text-[11px] font-black uppercase ${isLasing ? 'text-green-500' : 'text-rose-500'}`}>
                   {isLasing ? 'Stimulated Oscillation Sustained' : 'Below Lasing Threshold'}
                </span>
             </div>
          </div>
          <button 
            onClick={onNext}
            className="w-full bg-white text-slate-950 font-black py-5 rounded-3xl hover:bg-slate-100 transition-all shadow-2xl text-xl mt-4"
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
