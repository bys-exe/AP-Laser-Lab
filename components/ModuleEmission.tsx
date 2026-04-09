
import React, { useState } from 'react';

const ModuleEmission: React.FC = () => {
  const [activeProcess, setActiveProcess] = useState<'absorption' | 'spontaneous' | 'stimulated'>('stimulated');

  return (
    <div className="space-y-10">
      <header className="flex justify-between items-center bg-zinc-900 p-8 border border-zinc-800">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-white uppercase tracking-tight">Einstein's Processes</h2>
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Quantum Transition Mechanisms</p>
        </div>
        <div className="flex bg-black p-1 border border-zinc-800">
          {(['absorption', 'spontaneous', 'stimulated'] as const).map(p => (
            <button
              key={p}
              onClick={() => setActiveProcess(p)}
              className={`px-6 py-2 text-[10px] font-bold uppercase tracking-widest ${
                activeProcess === p ? 'bg-cyan-500 text-black' : 'text-zinc-500 hover:text-white'
              }`}
            >
              {p.replace('_', ' ')}
            </button>
          ))}
        </div>
      </header>

      <div className="bg-black border border-zinc-800 h-[450px] relative overflow-hidden flex flex-col justify-center items-center">
        {/* Energy Levels */}
        <div className="w-3/4 h-px bg-zinc-800 absolute top-1/4"></div>
        <div className="w-3/4 h-px bg-zinc-800 absolute bottom-1/4"></div>
        
        <span className="absolute left-10 top-[22%] text-zinc-600 text-[10px] font-bold uppercase tracking-widest">Excited State (E₂)</span>
        <span className="absolute left-10 bottom-[22%] text-zinc-600 text-[10px] font-bold uppercase tracking-widest">Ground State (E₁)</span>

        <div className="relative w-full h-full flex items-center justify-center">
          {activeProcess === 'absorption' && (
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="absolute left-1/4 text-cyan-500 text-2xl animate-[pulse_2s_infinite]">〰️〰️▶</div>
              <div className="absolute bottom-[25%] w-6 h-6 bg-cyan-500 border border-white/20 animate-[bounce_2s_infinite]" />
            </div>
          )}

          {activeProcess === 'spontaneous' && (
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="absolute top-[25%] w-6 h-6 bg-cyan-500 border border-white/20 animate-[bounce_3s_infinite]" />
              <div className="absolute text-cyan-500 text-2xl animate-[pulse_3s_infinite]">〰️〰️▶</div>
            </div>
          )}

          {activeProcess === 'stimulated' && (
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="absolute left-1/4 text-cyan-500 text-2xl animate-[pulse_2s_infinite]">〰️〰️▶</div>
              <div className="absolute top-[25%] w-6 h-6 bg-cyan-500 border border-white/20 animate-[bounce_2s_infinite]" />
              <div className="absolute left-1/2 flex flex-col gap-4 animate-[pulse_2s_infinite]">
                <div className="text-cyan-500 text-2xl">〰️〰️▶</div>
                <div className="text-cyan-500 text-2xl">〰️〰️▶</div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-zinc-900 p-8 border border-zinc-800 space-y-6">
            <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-800 pb-4">Einstein Coefficients</h3>
            <div className="space-y-4">
               {[
                 { char: "A", label: "Spontaneous Emission (A₂₁)", desc: "Probability of an atom jumping down naturally per unit time." },
                 { char: "B", label: "Stimulated Processes (B₁₂, B₂₁)", desc: "Probability of transition due to external photon interaction." }
               ].map((item, idx) => (
                 <div key={idx} className="flex items-center gap-6 bg-black p-6 border border-zinc-800 hover:border-cyan-500">
                    <div className="bg-cyan-500 text-black w-14 h-14 flex items-center justify-center font-mono text-2xl font-bold">
                      {item.char}
                    </div>
                    <div>
                      <p className="text-[13px] font-bold text-white uppercase tracking-widest mb-1">{item.label}</p>
                      <p className="text-[11px] text-zinc-500 font-bold leading-tight">{item.desc}</p>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="bg-zinc-900 p-8 border border-zinc-800 space-y-8 h-full">
             <h3 className="text-[10px] font-bold text-cyan-500 uppercase tracking-widest flex items-center gap-2">
               <div className="w-1 h-1 bg-cyan-500"></div>
               Quantum Identity
             </h3>
             <ul className="space-y-6">
               {[
                 { icon: "✓", text: "Stimulated photons have identical Phase, Frequency, and Direction.", color: "text-cyan-500" },
                 { icon: "✓", text: "Stimulated emission is the fundamental basis of Laser Action.", color: "text-cyan-500" },
                 { icon: "✗", text: "Spontaneous emission produces incoherent, multi-directional light.", color: "text-zinc-600" }
               ].map((item, i) => (
                 <li key={i} className="flex items-start gap-4">
                   <span className={`font-bold ${item.color}`}>{item.icon}</span>
                   <span className="text-[13px] text-zinc-400 font-bold leading-tight">{item.text}</span>
                 </li>
               ))}
             </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleEmission;
