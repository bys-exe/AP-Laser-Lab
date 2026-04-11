
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const WavePacket: React.FC<{ 
  color?: string; 
  className?: string; 
  animate?: any;
  initial?: any;
  transition?: any;
}> = ({ color = "#facc15", className = "", animate, initial, transition }) => {
  // A path that looks like a wave packet (Gaussian envelope)
  const path = "M 0 0 Q 5 -10 10 0 Q 15 15 20 0 Q 25 -20 30 0 Q 35 25 40 0 Q 45 -20 50 0 Q 55 15 60 0 Q 65 -10 70 0";
  
  return (
    <motion.svg 
      viewBox="0 0 70 50" 
      className={`w-16 h-8 overflow-visible ${className}`}
      initial={initial}
      animate={animate}
      transition={transition}
    >
      <defs>
        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color} stopOpacity="0" />
          <stop offset="50%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path 
        d={path} 
        fill="none" 
        stroke="url(#waveGradient)" 
        strokeWidth="3" 
        strokeLinecap="round"
        className="opacity-80"
      />
    </motion.svg>
  );
};

const InteractionStage: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [active, setActive] = useState<'abs' | 'spon' | 'stim'>('stim');
  const [density, setDensity] = useState(50);
  const [key, setKey] = useState(0); // Used to restart animations

  useEffect(() => {
    setKey(prev => prev + 1);
  }, [active]);

  const processInfo = {
    abs: {
      title: "Absorption",
      desc: (
        <>
          An atom in the <span className="text-cyan-400">GROUND STATE</span> (E₁) absorbs an incident photon. 
          The energy of the photon must exactly match the gap ΔE. Upon impact, the electron 
          is promoted to the <span className="text-cyan-400">EXCITED STATE</span> (E₂), and the photon is 
          completely consumed.
        </>
      )
    },
    spon: {
      title: "Spontaneous Emission",
      desc: (
        <>
          An atom in the <span className="text-cyan-400">EXCITED STATE</span> (E₂) is unstable. 
          After a random interval, it decays to the ground state, emitting a single photon. 
          These emissions are <span className="text-cyan-400">INCOHERENT</span>, meaning they have 
          random phase and direction.
        </>
      )
    },
    stim: {
      title: "Stimulated Emission",
      desc: (
        <>
          The fundamental principle of <span className="text-cyan-400">COHERENCE</span>. 
          An incoming 'trigger' photon interacts with an already excited electron, 
          forcing it to decay. This results in <span className="text-cyan-400">TWO IDENTICAL</span> photons 
          that are perfectly synchronized in phase and direction.
        </>
      )
    }
  };

  return (
    <div className="space-y-8 pb-20 font-mono">
      <header className="flex flex-col md:flex-row justify-between items-start border-b border-lab-border pb-6 relative overflow-hidden">
        <div className="space-y-1">
          <h2 className="text-2xl md:text-4xl font-black text-[var(--text-main)] uppercase tracking-tighter">Experiment 02: Einstein Processes</h2>
          <p className="text-[var(--text-muted)] text-[8px] md:text-[10px] font-bold uppercase tracking-[0.4em]">Quantum Interaction Dynamics & Transition Probabilities</p>
        </div>
      </header>

      <div className="bg-lab-surface p-6 md:p-10 border border-lab-border space-y-6 md:space-y-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full" />
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 relative z-10">
          <div className="space-y-4 md:space-y-6">
            <h4 className="text-[9px] md:text-[10px] font-black uppercase text-cyan-500 tracking-[0.3em] flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-cyan-500" />
              Theoretical Background
            </h4>
            <p className="text-xs md:text-sm text-[var(--text-muted)] leading-relaxed font-medium tracking-tight">
              Einstein's theory of radiation describes three ways light interacts with atoms. 
              <span className="text-[var(--text-main)]">Absorption</span> consumes energy, while 
              <span className="text-[var(--text-main)]">Spontaneous Emission</span> releases it randomly. 
              The most critical for lasers is <span className="text-[var(--text-main)]">Stimulated Emission</span>, 
              where a photon triggers the release of an identical twin.
            </p>
          </div>
          <div className="space-y-4 md:space-y-6">
            <h4 className="text-[9px] md:text-[10px] font-black uppercase text-[var(--text-muted)] tracking-[0.3em] flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-lab-border" />
              Experiment Aim & Procedure
            </h4>
            <p className="text-xs md:text-sm text-[var(--text-muted)] font-medium tracking-tight">
              <span className="text-[var(--text-main)]">Aim:</span> To visualize and differentiate between the three Einstein processes. <br/>
              <span className="text-[var(--text-main)]">Procedure:</span> Select a process from the control panel. Observe how photons interact with the atom in each case. Adjust the radiation density to see its effect on transition probability.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">
        <div className="lg:col-span-7 space-y-6 md:space-y-8">
          {/* Tab System */}
          <div className="flex flex-wrap gap-2 bg-lab-surface p-1.5 border border-lab-border rounded-sm">
            {(['abs', 'spon', 'stim'] as const).map(k => (
              <button
                key={k}
                onClick={() => setActive(k)}
                className={`flex-1 min-w-[100px] py-3 md:py-4 text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 relative overflow-hidden ${
                  active === k 
                  ? 'text-cyan-400' 
                  : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
                }`}
              >
                {active === k && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute inset-0 bg-cyan-500/5 border border-cyan-500/20"
                  />
                )}
                <span className="relative z-10">
                  {k === 'abs' ? 'Absorption' : k === 'spon' ? 'Spontaneous' : 'Stimulated'}
                </span>
              </button>
            ))}
          </div>

          {/* Visualization Panel */}
          <div className="bg-lab-surface border border-lab-border h-[300px] md:h-[450px] relative overflow-hidden shadow-[var(--lab-inner-shadow)] group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.05),transparent_70%)]" />
            
            {/* Glassy Energy Levels */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-[30%] left-6 md:left-12 right-6 md:right-12 h-px bg-lab-border">
                <div className="absolute -top-5 md:-top-6 left-0 text-[8px] md:text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Excited Level (E₂)</div>
              </div>
              <div className="absolute top-[70%] left-6 md:left-12 right-6 md:right-12 h-px bg-lab-border">
                <div className="absolute top-3 md:top-4 left-0 text-[8px] md:text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Ground Level (E₁)</div>
              </div>
            </div>

            {/* Animation Stage */}
            <div className="absolute inset-0 flex items-center justify-center" key={key}>
              <AnimatePresence mode="wait">
                {active === 'abs' && (
                  <div className="relative w-full h-full">
                    {/* Incoming Photon */}
                    <WavePacket 
                      initial={{ x: -400, y: 90, opacity: 1 }}
                      animate={{ 
                        x: [-400, -60, -60],
                        opacity: [1, 1, 0] 
                      }}
                      transition={{ 
                        duration: 2.5, 
                        repeat: Infinity, 
                        times: [0, 0.4, 0.45],
                        ease: "linear" 
                      }}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    />
                    {/* Electron */}
                    <motion.div 
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-pink-500 rounded-full"
                      initial={{ y: 90 }}
                      animate={{ 
                        scale: [1, 1, 1.8, 1, 1],
                        y: [90, 90, 90, -90, -90],
                      }}
                      transition={{ 
                        duration: 2.5, 
                        repeat: Infinity, 
                        times: [0, 0.4, 0.45, 0.65, 1],
                        ease: "easeInOut"
                      }}
                    />
                  </div>
                )}

                {active === 'spon' && (
                  <div className="relative w-full h-full">
                    {/* Electron */}
                    <motion.div 
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-pink-500 rounded-full"
                      initial={{ y: -90 }}
                      animate={{ 
                        y: [-90, -90, 90, 90],
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity, 
                        times: [0, 0.3, 0.5, 1],
                        ease: "easeInOut"
                      }}
                    />
                    {/* Emitted Photon */}
                    <WavePacket 
                      initial={{ x: 12, y: 90, opacity: 0, rotate: 0 }}
                      animate={{ 
                        x: [12, 12, 12, 400],
                        opacity: [0, 0, 1, 1],
                        rotate: [0, 0, 0, 45]
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity, 
                        times: [0, 0.49, 0.5, 0.8],
                        ease: "linear" 
                      }}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    />
                  </div>
                )}

                {active === 'stim' && (
                  <div className="relative w-full h-full">
                    {/* Trigger Photon */}
                    <WavePacket 
                      initial={{ x: -400, y: -90, opacity: 1 }}
                      animate={{ 
                        x: [-400, -60, -60],
                        opacity: [1, 1, 0] 
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity, 
                        times: [0, 0.3, 0.35],
                        ease: "linear" 
                      }}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    />
                    {/* Electron */}
                    <motion.div 
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-pink-500 rounded-full"
                      initial={{ y: -90 }}
                      animate={{ 
                        y: [-90, -90, 90, 90],
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity, 
                        times: [0, 0.3, 0.5, 1],
                        ease: "easeInOut"
                      }}
                    />
                    {/* Coherent Pair */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <WavePacket 
                        initial={{ x: 12, y: 75, opacity: 0 }}
                        animate={{ 
                          x: [12, 12, 12, 400],
                          opacity: [0, 0, 1, 1] 
                        }}
                        transition={{ 
                          duration: 3, 
                          repeat: Infinity, 
                          times: [0, 0.49, 0.5, 0.8],
                          ease: "linear" 
                        }}
                        className="absolute"
                      />
                      <WavePacket 
                        initial={{ x: 12, y: 105, opacity: 0 }}
                        animate={{ 
                          x: [12, 12, 12, 400],
                          opacity: [0, 0, 1, 1] 
                        }}
                        transition={{ 
                          duration: 3, 
                          repeat: Infinity, 
                          times: [0, 0.49, 0.5, 0.8],
                          ease: "linear" 
                        }}
                        className="absolute"
                      />
                    </div>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
          {/* Elegant Description */}
          <div className="bg-lab-surface p-6 md:p-8 border border-lab-border relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500/50" />
            <div className="relative z-10 space-y-4">
              <h3 className="text-lg md:text-xl font-black text-cyan-400 uppercase tracking-tighter flex items-center gap-3">
                <span className="w-2 h-2 bg-cyan-500" />
                {processInfo[active].title}
              </h3>
              <p className="text-xs md:text-sm text-[var(--text-muted)] leading-relaxed font-medium tracking-tight max-w-2xl">
                {processInfo[active].desc}
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6 md:space-y-8">
          {/* Controls Panel */}
          <div className="bg-lab-surface p-6 md:p-8 border border-lab-border space-y-6 md:space-y-8 shadow-2xl relative">
             <div className="space-y-4 md:space-y-6">
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <label className="text-[8px] md:text-[9px] font-black uppercase text-[var(--text-muted)] tracking-[0.3em]">Radiation Density</label>
                    <div className="text-xl md:text-2xl font-black text-[var(--text-main)] tracking-tighter">ρ(ν)</div>
                  </div>
                  <div className="text-right">
                    <span className="text-cyan-400 font-mono text-xl md:text-2xl font-black">{density}</span>
                    <span className="text-[var(--text-muted)] text-[8px] md:text-[10px] font-bold ml-2 uppercase">uJ/m³</span>
                  </div>
                </div>
                
                <div className="relative h-10 md:h-12 flex items-center px-4 bg-lab-bg border border-lab-border rounded-sm">
                  <input 
                    type="range" 
                    min="0"
                    max="100"
                    value={density} 
                    onChange={(e) => setDensity(Number(e.target.value))} 
                    className="w-full h-1 bg-lab-border appearance-none cursor-pointer accent-cyan-500 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-cyan-500 [&::-webkit-slider-thumb]:rounded-none [&::-webkit-slider-thumb]:appearance-none"
                  />
                </div>
             </div>

             <div className="bg-lab-bg p-6 md:p-8 border border-lab-border space-y-4 md:space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-10">
                  <svg width="40" height="40" viewBox="0 0 40 40">
                    <path d="M 0 40 L 40 0" stroke="currentColor" strokeWidth="1" className="text-[var(--text-main)]" />
                  </svg>
                </div>
                <h4 className="text-[8px] md:text-[9px] font-black uppercase text-[var(--text-muted)] tracking-[0.3em]">Statistical Probability Scaling</h4>
                <div className="h-[100px] md:h-[140px] w-full relative border-b border-l border-lab-border/50">
                   {/* Grid Lines */}
                   <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 opacity-5">
                     {[...Array(16)].map((_, i) => <div key={i} className="border border-[var(--text-main)]" />)}
                   </div>
                   
                   <svg width="100%" height="100%" viewBox="0 0 300 100" preserveAspectRatio="none" className="relative z-10">
                      <defs>
                        <linearGradient id="graphGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.2" />
                          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.8" />
                        </linearGradient>
                      </defs>
                      <motion.path 
                        d={"M 0 100 L 300 " + (100 - (density * 0.9))} 
                        fill="none" 
                        stroke="url(#graphGradient)" 
                        strokeWidth="3" 
                        animate={{ d: "M 0 100 L 300 " + (100 - (density * 0.9)) }}
                      />
                      <circle cx="300" cy={100 - (density * 0.9)} r="4" fill="#06b6d4" />
                   </svg>
                </div>
                <div className="flex justify-between text-[7px] md:text-[8px] text-[var(--text-muted)] font-black uppercase tracking-widest">
                  <span>Input Density ρ</span>
                  <span>Probability W_21</span>
                </div>
             </div>
          </div>

          {/* Dimensional Button */}
          <button 
            onClick={onNext} 
            className="group relative w-full bg-lab-surface border border-lab-border p-5 md:p-6 transition-all hover:border-cyan-500/50"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            {/* Static Border Effect */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-lab-border" />
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-lab-border" />

            <div className="relative flex items-center justify-between">
              <span className="text-lg md:text-xl font-black text-[var(--text-main)] uppercase tracking-tighter group-hover:text-cyan-400 transition-colors">
                Go to Population Lab
              </span>
              <span className="text-xl md:text-2xl text-cyan-500">
                →
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InteractionStage;
