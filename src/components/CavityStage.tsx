
import React, { useState } from 'react';
import { motion } from 'motion/react';

const WavePacket: React.FC<{ 
  color?: string; 
  className?: string; 
  animate?: any;
  initial?: any;
  transition?: any;
  style?: React.CSSProperties;
}> = ({ color = "#facc15", className = "", animate, initial, transition, style }) => {
  const path = "M 0 0 Q 5 -10 10 0 Q 15 15 20 0 Q 25 -20 30 0 Q 35 25 40 0 Q 45 -20 50 0 Q 55 15 60 0 Q 65 -10 70 0";
  return (
    <motion.svg 
      viewBox="0 0 70 50" 
      className={`w-12 h-6 overflow-visible ${className}`}
      initial={initial}
      animate={animate}
      transition={transition}
      style={style}
    >
      <defs>
        <linearGradient id="waveGradientCavity" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color} stopOpacity="0" />
          <stop offset="50%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={path} fill="none" stroke="url(#waveGradientCavity)" strokeWidth="3" strokeLinecap="round" />
    </motion.svg>
  );
};

const CavityStage: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [gain, setGain] = useState(1.5);
  const [reflectivity, setReflectivity] = useState(90);

  const threshold = (100 - reflectivity) / 10 + 1;
  const isLasing = gain >= threshold;

  return (
    <div className="space-y-8 md:space-y-12 pb-20 font-mono">
      <header className="flex flex-col md:flex-row justify-between items-start border-b border-lab-border pb-6 md:pb-8 relative overflow-hidden">
        <div className="space-y-2">
          <h2 className="text-2xl md:text-4xl font-black text-[var(--text-main)] tracking-tighter uppercase">Stage 06: The Optical Cavity</h2>
          <p className="text-[var(--text-muted)] text-[8px] md:text-[10px] font-bold uppercase tracking-[0.4em]">Resonance, Feedback, & Lasing Threshold Dynamics</p>
        </div>
      </header>

      {/* Optical Cavity Box Animation */}
      <div className="relative h-[350px] md:h-[480px] w-full flex items-center justify-center bg-lab-bg border border-lab-border shadow-[inset_0_0_100px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] overflow-hidden group">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.02),transparent_70%)]" />
        
        {/* Mirror Labels */}
        <div className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 rotate-180 flex flex-col items-center gap-2 md:gap-4" style={{ writingMode: 'vertical-rl' }}>
           <span className="text-[var(--text-muted)] font-black text-[7px] md:text-[9px] uppercase tracking-[0.5em]">100% Mirror (Full)</span>
           <div className="w-1.5 md:w-2 h-24 md:h-40 bg-lab-surface border border-lab-border shadow-[0_0_20px_rgba(0,0,0,0.2)] dark:shadow-[0_0_20px_rgba(0,0,0,0.5)]"></div>
        </div>
        <div className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 md:gap-4" style={{ writingMode: 'vertical-rl' }}>
           <span className="text-cyan-500 font-black text-[7px] md:text-[9px] uppercase tracking-[0.5em]">Output Coupler (Partial)</span>
           <div className="w-1.5 md:w-2 h-24 md:h-40 bg-cyan-500 shadow-[0_0_30px_rgba(6,182,212,0.3)]"></div>
        </div>

        {/* The Cavity Rectangle */}
        <div className="w-[70%] md:w-[75%] h-[200px] md:h-[300px] bg-lab-bg border-x-[1px] border-lab-border relative overflow-hidden shadow-2xl flex items-center">
          
          {/* Internal Glow when lasing */}
          <motion.div 
            className="absolute inset-0 bg-cyan-500/10 blur-3xl pointer-events-none"
            animate={{ opacity: isLasing ? 1 : 0 }}
          />
          
          {/* Multiple Fast Moving Laser Lines */}
          {isLasing ? (
            <div className="absolute inset-0 z-20">
              {[...Array(8)].map((_, i) => (
                <WavePacket 
                  key={i}
                  animate={{ x: [-150, 600] }}
                  transition={{ 
                    duration: 0.4 + Math.random() * 0.2, 
                    repeat: Infinity, 
                    delay: i * 0.05,
                    ease: "linear"
                  }}
                  className="absolute"
                  style={{ top: `${10 + i * 11}%` }}
                />
              ))}
              {/* Main Core Beam Trail */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px] bg-cyan-500/30 blur-sm"></div>
            </div>
          ) : (
            /* Slow, scattered seed photons when below threshold */
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <WavePacket 
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="scale-125 md:scale-150"
              />
            </div>
          )}
          
          {/* Continuous Lasing Beam Output */}
          {isLasing && (
             <div className="absolute right-0 h-10 md:h-12 flex items-center translate-x-full z-30">
                <motion.div 
                  className="h-1 bg-cyan-500 shadow-[0_0_60px_#06b6d4] w-[200px] md:w-[400px]"
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 0.1, repeat: Infinity }}
                />
                <div className="absolute left-0 flex gap-0">
                  {[...Array(3)].map((_, i) => (
                    <WavePacket key={i} className="scale-125 md:scale-150" />
                  ))}
                </div>
             </div>
          )}

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-40 px-4">
             {!isLasing ? (
               <span className="text-[7px] md:text-[9px] font-black text-[var(--text-muted)] uppercase tracking-[0.4em] italic text-center">Gain &lt; Cavity Loss</span>
             ) : (
               <motion.span 
                className="text-[8px] md:text-[10px] font-black text-[var(--text-main)] uppercase tracking-[0.5em] md:tracking-[1em] drop-shadow-lg text-center"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
               >
                 STIMULATED OSCILLATION ACTIVE
               </motion.span>
             )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        <div className="bg-lab-surface p-6 md:p-10 border border-lab-border space-y-8 md:space-y-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500/20" />
          <div className="space-y-6 md:space-y-8">
            <div className="flex justify-between items-end">
              <div className="space-y-1">
                <label className="text-[8px] md:text-[9px] font-black uppercase text-[var(--text-muted)] tracking-[0.3em]">Optical Gain Coefficient</label>
                <div className="text-xl md:text-2xl font-black text-[var(--text-main)] tracking-tighter">g</div>
              </div>
              <div className="text-right">
                <span className={`text-2xl md:text-3xl font-black tracking-tighter transition-colors ${isLasing ? 'text-cyan-400' : 'text-[var(--text-muted)]'}`}>{gain.toFixed(1)}x</span>
              </div>
            </div>
            <div className="relative h-10 md:h-12 flex items-center px-4 bg-lab-bg border border-lab-border rounded-sm">
              <input 
                type="range" 
                min="0.5" 
                max="5" 
                step="0.1" 
                value={gain} 
                onChange={(e) => setGain(Number(e.target.value))} 
                className="w-full h-1 bg-lab-border appearance-none cursor-pointer accent-cyan-500 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-cyan-500 [&::-webkit-slider-thumb]:rounded-none [&::-webkit-slider-thumb]:appearance-none"
              />
            </div>
          </div>

          <div className="space-y-6 md:space-y-8">
            <div className="flex justify-between items-end">
              <div className="space-y-1">
                <label className="text-[8px] md:text-[9px] font-black uppercase text-[var(--text-muted)] tracking-[0.3em]">Mirror Reflectivity</label>
                <div className="text-xl md:text-2xl font-black text-[var(--text-main)] tracking-tighter">R (%)</div>
              </div>
              <div className="text-right">
                <span className="text-[var(--text-main)] text-2xl md:text-3xl font-black tracking-tighter">{reflectivity}%</span>
              </div>
            </div>
            <div className="relative h-10 md:h-12 flex items-center px-4 bg-lab-bg border border-lab-border rounded-sm">
              <input 
                type="range" 
                min="50" 
                max="99" 
                value={reflectivity} 
                onChange={(e) => setReflectivity(Number(e.target.value))} 
                className="w-full h-1 bg-lab-border appearance-none cursor-pointer accent-cyan-500 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-cyan-500 [&::-webkit-slider-thumb]:rounded-none [&::-webkit-slider-thumb]:appearance-none"
              />
            </div>
          </div>
        </div>

        <div className="bg-lab-surface p-6 md:p-10 border border-lab-border space-y-6 md:space-y-8 flex flex-col justify-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-3xl rounded-full" />
          <h3 className="text-[10px] md:text-xs font-black text-cyan-400 uppercase tracking-[0.3em] flex items-center gap-3">
            <span className="w-2 h-2 bg-cyan-500" />
            Theory: Optical Feedback Mechanism
          </h3>
          <p className="text-xs md:text-sm text-[var(--text-muted)] leading-relaxed font-medium tracking-tight">
            The optical resonator mirrors provide <span className="text-[var(--text-main)] font-bold">feedback</span> by reflecting photons back into the gain medium multiple times. This increases the distance light travels through the medium, allowing for massive amplification. At the 'threshold', the gain precisely matches internal and mirror losses, resulting in a stable output beam.
          </p>
          <div className="p-4 md:p-6 bg-lab-bg border border-lab-border shadow-inner relative group">
             <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
             <div className="flex justify-between items-center relative z-10">
                <span className="text-[8px] md:text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest">Resonator Status</span>
                <span className={`text-[9px] md:text-[10px] font-black uppercase tracking-widest text-right ${isLasing ? 'text-cyan-400' : 'text-[var(--text-muted)]'}`}>
                   {isLasing ? 'Stimulated Oscillation Sustained' : 'Below Lasing Threshold'}
                </span>
             </div>
          </div>
          
          <button 
            onClick={onNext} 
            className="group relative w-full bg-lab-surface border border-lab-border p-6 md:p-8 transition-all hover:border-cyan-500/50"
          >
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity" />
            <div className="absolute top-0 left-0 w-full h-[2px] bg-lab-border" />
            <span className="text-lg md:text-xl font-black text-[var(--text-main)] uppercase tracking-tighter group-hover:text-cyan-400 transition-colors">Continue to Optical Comms →</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CavityStage;
;
