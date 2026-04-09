
import React, { useState } from 'react';

const InteractionStage: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [active, setActive] = useState<'abs' | 'spon' | 'stim'>('stim');
  const [density, setDensity] = useState(50);

  const processInfo = {
    abs: {
      title: "Stimulated Absorption",
      desc: "In this process, an atom in the ground state (E₁) absorbs an incident photon of energy exactly ΔE = E₂ - E₁. Watch as the incoming photon strikes the ground-state electron. Upon contact, the electron briefly expands significantly ('absorbing' the wave energy) before being promoted to the higher energy level (E₂). This process decreases the ground state population."
    },
    spon: {
      title: "Spontaneous Emission",
      desc: "An atom in the excited state (E₂) is inherently unstable and tends to return to its ground state (E₁) without external influence. The electron drops from E₂ to E₁. CRITICALLY: It is only after the electron reaches the ground level that it releases its excess energy as a single photon. These photons are random in phase and direction, resulting in incoherent light."
    },
    stim: {
      title: "Stimulated Emission",
      desc: "This is the engine of the laser. An incoming 'trigger' photon (yellow) interacts with an electron already in the excited state. This stimulates the electron to drop to the ground state instantly. Observe that two identical yellow photons exit the atom together only after the electron reaches the bottom level. These two photons are perfectly synchronized in phase, color, and direction, producing coherent laser light."
    }
  };

  return (
    <div className="animate-stage space-y-8 pb-20">
      <header className="flex justify-between items-start border-b border-slate-800 pb-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-white uppercase tracking-tight">Experiment 04: Einstein Processes</h2>
          <p className="text-slate-400 text-sm italic">Qualitative and Quantitative Analysis of Transition Rates.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-6">
          <div className="flex gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
            {(['abs', 'spon', 'stim'] as const).map(k => (
              <button
                key={k}
                onClick={() => setActive(k)}
                className={`flex-1 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  active === k ? 'bg-rose-600 text-white shadow-lg shadow-rose-900/40' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {k === 'abs' ? 'Absorption' : k === 'spon' ? 'Spontaneous' : 'Stimulated'}
              </button>
            ))}
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-[2.5rem] h-[400px] relative overflow-hidden flex items-center justify-center shadow-inner">
            <svg className="w-full h-full" viewBox="0 0 400 300">
              <line x1="50" y1="80" x2="350" y2="80" stroke="#1e293b" strokeWidth="3" strokeDasharray="8 4" />
              <line x1="50" y1="220" x2="350" y2="220" stroke="#334155" strokeWidth="4" />
              <text x="55" y="65" fill="#475569" className="text-[10px] font-black uppercase tracking-wider">Excited Level (E₂)</text>
              <text x="55" y="245" fill="#475569" className="text-[10px] font-black uppercase tracking-wider">Ground Level (E₁)</text>

              {active === 'abs' && (
                <g>
                  {/* Incoming Photon: Plain Wavy Line */}
                  <text x="-100" y="222" fill="#facc15" className="text-4xl font-black italic tracking-tighter">
                    ~~~~~~
                    <animate attributeName="x" values="-100;175" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="1;1;0" dur="2s" keyTimes="0;0.7;1" repeatCount="indefinite" />
                  </text>
                  {/* Electron: Expands on contact */}
                  <circle cx="200" cy="220" r="14" fill="#06b6d4" stroke="#fff" strokeWidth="2">
                    <animate attributeName="r" values="14;14;40;14" keyTimes="0;0.65;0.75;0.8" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="cy" values="220;220;220;80;80" keyTimes="0;0.7;0.75;0.9;1" dur="2s" repeatCount="indefinite" />
                  </circle>
                </g>
              )}

              {active === 'spon' && (
                <g>
                  {/* Electron drops first */}
                  <circle cx="200" cy="80" r="14" fill="#f43f5e" stroke="#fff" strokeWidth="2">
                    <animate attributeName="cy" values="80;80;220;220" keyTimes="0;0.4;0.7;1" dur="3s" repeatCount="indefinite" />
                  </circle>
                  {/* Plain Wavy Photon leaves ONLY AFTER reach bottom */}
                  <text x="200" y="222" fill="#facc15" className="text-4xl font-black italic tracking-tighter">
                    ~~~~~~
                    <animate attributeName="x" values="200;200;500" keyTimes="0;0.7;1" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.68;0.7;1" dur="3s" repeatCount="indefinite" />
                  </text>
                </g>
              )}

              {active === 'stim' && (
                <g>
                  {/* Plain Wavy Trigger Photon */}
                  <text x="-100" y="82" fill="#facc15" className="text-4xl font-black italic tracking-tighter">
                    ~~~~~~
                    <animate attributeName="x" values="-100;175" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="1;1;0" dur="2s" keyTimes="0;0.8;1" repeatCount="indefinite" />
                  </text>
                  {/* Electron at top forced to drop */}
                  <circle cx="200" cy="80" r="14" fill="#f43f5e" stroke="#fff" strokeWidth="2">
                    <animate attributeName="cy" values="80;80;220;220" keyTimes="0;0.8;0.9;1" dur="2s" repeatCount="indefinite" />
                  </circle>
                  {/* Two identical wavy photons exit AFTER reaching ground */}
                  <g>
                    <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.85;0.9;1" dur="2s" repeatCount="indefinite" />
                    <text x="200" y="210" fill="#facc15" className="text-4xl font-black italic tracking-tighter">
                      ~~~~~~
                      <animate attributeName="x" values="200;200;500" keyTimes="0;0.85;1" dur="2s" repeatCount="indefinite" />
                    </text>
                    <text x="200" y="240" fill="#facc15" className="text-4xl font-black italic tracking-tighter">
                      ~~~~~~
                      <animate attributeName="x" values="200;200;500" keyTimes="0;0.85;1" dur="2s" repeatCount="indefinite" />
                    </text>
                  </g>
                </g>
              )}
            </svg>
          </div>
          
          <div className="bg-slate-900/80 p-6 rounded-[2rem] border border-slate-800 space-y-4 shadow-xl">
             <h3 className="text-lg font-black text-rose-500 uppercase tracking-tight">{processInfo[active].title}</h3>
             <p className="text-sm text-slate-300 leading-relaxed font-medium">{processInfo[active].desc}</p>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 p-8 rounded-[2.5rem] border border-slate-800 space-y-6 shadow-xl">
             <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Radiation Density ρ(ν)</label>
                  <span className="text-rose-500 font-mono font-bold">{density} uJ/m³</span>
                </div>
                <div className="px-2 py-4 bg-slate-950 rounded-2xl border border-slate-800 shadow-inner">
                  <input 
                    type="range" 
                    value={density} 
                    onChange={(e) => setDensity(Number(e.target.value))} 
                    className="w-full"
                  />
                </div>
             </div>

             <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4 shadow-inner">
                <h4 className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Statistical Probability Scaling</h4>
                <div className="h-[100px] w-full flex items-end overflow-hidden border-b border-l border-slate-800 p-1">
                   <svg width="100%" height="100%" viewBox="0 0 300 100" preserveAspectRatio="none">
                      <path d={`M 0 100 L 300 ${100 - (density * 0.9)}`} fill="none" stroke="#f43f5e" strokeWidth="5" style={{ transition: 'd 0.3s ease' }} />
                   </svg>
                </div>
                <div className="flex justify-between text-[8px] text-slate-600 font-black uppercase">
                  <span>Input Density →</span>
                </div>
             </div>
          </div>

          <button onClick={onNext} className="w-full bg-white text-slate-950 font-black py-5 rounded-3xl shadow-2xl hover:bg-slate-200 transition-all text-xl">
            Go to Population Lab →
          </button>
        </div>
      </div>
    </div>
  );
};

export default InteractionStage;
