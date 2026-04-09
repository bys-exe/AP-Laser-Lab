
import React, { useState } from 'react';

const InteractionStage: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [active, setActive] = useState<'abs' | 'spon' | 'stim'>('stim');
  const [density, setDensity] = useState(50);

  const processInfo = {
    abs: {
      title: "Stimulated Absorption",
      desc: "An atom in the ground state (E₁) absorbs an incident photon of energy exactly ΔE = E₂ - E₁. The electron is promoted to the higher energy level (E₂)."
    },
    spon: {
      title: "Spontaneous Emission",
      desc: "An atom in the excited state (E₂) returns to ground state (E₁) without external influence, releasing a single photon random in phase and direction."
    },
    stim: {
      title: "Stimulated Emission",
      desc: "The engine of the laser. An incoming photon stimulates an excited electron to drop to ground state, releasing two identical, synchronized photons."
    }
  };

  return (
    <div className="space-y-10">
      <header className="flex justify-between items-end border-b border-zinc-800 pb-6">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="bg-zinc-800 text-cyan-500 px-3 py-1 text-[10px] font-bold uppercase tracking-widest border border-zinc-700">
              Stage 04
            </span>
            <div className="h-px w-8 bg-zinc-800"></div>
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Quantum Dynamics</span>
          </div>
          <h2 className="text-3xl font-bold text-white uppercase tracking-tight">Einstein Processes</h2>
        </div>
        <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest max-w-[200px] text-right leading-tight">
          Qualitative and Quantitative Analysis of Transition Rates.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-6">
          <div className="flex bg-black border border-zinc-800">
            {(['abs', 'spon', 'stim'] as const).map(k => (
              <button
                key={k}
                onClick={() => setActive(k)}
                className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-widest ${
                  active === k ? 'bg-cyan-500 text-black' : 'text-zinc-500 hover:bg-zinc-800 hover:text-white'
                }`}
              >
                {k === 'abs' ? 'Absorption' : k === 'spon' ? 'Spontaneous' : 'Stimulated'}
              </button>
            ))}
          </div>

          <div className="bg-black border border-zinc-800 h-[400px] relative flex items-center justify-center">
            <svg className="w-full h-full relative z-10" viewBox="0 0 400 300">
              <line x1="50" y1="80" x2="350" y2="80" stroke="#27272a" strokeWidth="2" strokeDasharray="4 4" />
              <line x1="50" y1="220" x2="350" y2="220" stroke="#3f3f46" strokeWidth="2" />
              <text x="55" y="65" fill="#52525b" className="text-[9px] font-bold uppercase tracking-widest">Excited Level (E₂)</text>
              <text x="55" y="245" fill="#52525b" className="text-[9px] font-bold uppercase tracking-widest">Ground Level (E₁)</text>

              {active === 'abs' && (
                <g key="abs">
                  <text x="-100" y="222" fill="#facc15" className="text-4xl font-bold italic">
                    ~~~~~~
                    <animate attributeName="x" values="-100;175" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="1;1;0" dur="2s" keyTimes="0;0.7;1" repeatCount="indefinite" />
                  </text>
                  <circle cx="200" cy="220" r="12" fill="#06b6d4">
                    <animate attributeName="r" values="12;12;30;12" keyTimes="0;0.65;0.75;0.8" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="cy" values="220;220;220;80;80" keyTimes="0;0.7;0.75;0.9;1" dur="2s" repeatCount="indefinite" />
                  </circle>
                </g>
              )}

              {active === 'spon' && (
                <g key="spon">
                  <circle cx="200" cy="80" r="12" fill="#06b6d4">
                    <animate attributeName="cy" values="80;80;220;220" keyTimes="0;0.4;0.7;1" dur="3s" repeatCount="indefinite" />
                  </circle>
                  <text x="200" y="222" fill="#facc15" className="text-4xl font-bold italic">
                    ~~~~~~
                    <animate attributeName="x" values="200;200;500" keyTimes="0;0.7;1" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.68;0.7;1" dur="3s" repeatCount="indefinite" />
                  </text>
                </g>
              )}

              {active === 'stim' && (
                <g key="stim">
                  <text x="-100" y="82" fill="#facc15" className="text-4xl font-bold italic">
                    ~~~~~~
                    <animate attributeName="x" values="-100;175" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="1;1;0" dur="2s" keyTimes="0;0.8;1" repeatCount="indefinite" />
                  </text>
                  <circle cx="200" cy="80" r="12" fill="#06b6d4">
                    <animate attributeName="cy" values="80;80;220;220" keyTimes="0;0.8;0.9;1" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <g>
                    <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.85;0.9;1" dur="2s" repeatCount="indefinite" />
                    <text x="200" y="210" fill="#facc15" className="text-4xl font-bold italic">
                      ~~~~~~
                      <animate attributeName="x" values="200;200;500" keyTimes="0;0.85;1" dur="2s" repeatCount="indefinite" />
                    </text>
                    <text x="200" y="240" fill="#facc15" className="text-4xl font-bold italic">
                      ~~~~~~
                      <animate attributeName="x" values="200;200;500" keyTimes="0;0.85;1" dur="2s" repeatCount="indefinite" />
                    </text>
                  </g>
                </g>
              )}
            </svg>
          </div>
          
          <div className="bg-zinc-900 p-8 border border-zinc-800 space-y-4">
             <h3 className="text-xl font-bold text-white uppercase tracking-tight">{processInfo[active].title}</h3>
             <p className="text-[14px] text-zinc-400 leading-tight font-bold">{processInfo[active].desc}</p>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="bg-zinc-900 p-8 border border-zinc-800 space-y-8">
             <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-bold uppercase text-zinc-500 tracking-widest">Radiation Density ρ(ν)</label>
                  <span className="text-cyan-500 font-mono font-bold text-lg">{density}</span>
                </div>
                <div className="p-4 bg-black border border-zinc-800">
                  <input 
                    type="range" 
                    value={density} 
                    onChange={(e) => setDensity(Number(e.target.value))} 
                    className="w-full h-1 bg-zinc-800 appearance-none cursor-pointer accent-cyan-500"
                  />
                </div>
             </div>

             <div className="bg-black p-6 border border-zinc-800 space-y-4">
                <h4 className="text-[9px] font-bold uppercase text-zinc-600 tracking-widest text-center">Statistical Probability Scaling</h4>
                <div className="h-[100px] w-full flex items-end border-b border-l border-zinc-800 p-1">
                   <svg width="100%" height="100%" viewBox="0 0 300 100" preserveAspectRatio="none">
                      <path 
                        d={`M 0 100 L 300 ${100 - (density * 0.9)}`}
                        fill="none" stroke="#06b6d4" strokeWidth="4"
                      />
                      <line x1="0" y1="100" x2="300" y2="100" stroke="#27272a" strokeWidth="1" />
                   </svg>
                </div>
                <div className="flex justify-between text-[8px] text-zinc-600 font-bold uppercase tracking-widest">
                  <span>Low</span>
                  <span>High</span>
                </div>
             </div>
          </div>

          <button 
            onClick={onNext} 
            className="w-full bg-white text-black font-bold py-6 text-xl uppercase tracking-tighter hover:bg-cyan-500 active:bg-cyan-600"
          >
            Continue →
          </button>
        </div>
      </div>
    </div>
  );
};

export default InteractionStage;
