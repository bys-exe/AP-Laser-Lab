
import React, { useState } from 'react';

const ModuleEmission: React.FC = () => {
  const [activeProcess, setActiveProcess] = useState<'absorption' | 'spontaneous' | 'stimulated'>('stimulated');

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex flex-wrap gap-2 mb-6">
          {(['absorption', 'spontaneous', 'stimulated'] as const).map(p => (
            <button
              key={p}
              onClick={() => setActiveProcess(p)}
              className={`px-6 py-2 rounded-full font-bold uppercase text-xs tracking-widest transition-all ${
                activeProcess === p ? 'bg-red-600 text-white shadow-lg' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              {p.replace('_', ' ')}
            </button>
          ))}
        </div>

        <div className="relative bg-gray-900 h-[300px] rounded-xl overflow-hidden border-4 border-gray-800 flex flex-col justify-center items-center">
          {/* Energy Levels */}
          <div className="w-3/4 h-1 bg-gray-600 absolute top-1/4"></div>
          <div className="w-3/4 h-1 bg-gray-600 absolute bottom-1/4"></div>
          
          <span className="absolute left-10 top-[22%] text-gray-500 text-xs font-mono">E2 (Excited)</span>
          <span className="absolute left-10 bottom-[22%] text-gray-500 text-xs font-mono">E1 (Ground)</span>

          {activeProcess === 'absorption' && (
            <div className="relative w-full flex items-center justify-center">
              {/* Photon coming in - Yellow */}
              <div className="absolute left-0 animate-[moveRight_2s_infinite]">
                 <div className="text-yellow-400 text-2xl">〰️〰️▶</div>
              </div>
              {/* Electron at bottom */}
              <div className="absolute bottom-[20%] w-8 h-8 bg-red-500 rounded-full border-2 border-white animate-[jumpUp_2s_infinite]"></div>
            </div>
          )}

          {activeProcess === 'spontaneous' && (
            <div className="relative w-full flex items-center justify-center">
              {/* Electron at top */}
              <div className="absolute top-[20%] w-8 h-8 bg-red-500 rounded-full border-2 border-white animate-[fallDown_3s_infinite]"></div>
              {/* Photon going out - Yellow */}
              <div className="absolute top-1/2 left-1/2 animate-[randomExit_3s_infinite]">
                 <div className="text-yellow-400 text-2xl">〰️〰️▶</div>
              </div>
            </div>
          )}

          {activeProcess === 'stimulated' && (
            <div className="relative w-full flex items-center justify-center">
              {/* Trigger Photon - Yellow */}
              <div className="absolute left-0 top-[40%] animate-[moveRightTrigger_2s_infinite]">
                 <div className="text-yellow-400 text-2xl">〰️〰️▶</div>
              </div>
              {/* Electron at top */}
              <div className="absolute top-[20%] w-8 h-8 bg-red-500 rounded-full border-2 border-white animate-[fallDownStimulated_2s_infinite]"></div>
              {/* Two identical photons exiting - both Yellow */}
              <div className="absolute right-0 top-[40%] animate-[moveRightExit_2s_infinite]">
                 <div className="text-yellow-400 text-2xl">〰️〰️▶</div>
                 <div className="text-yellow-400 text-2xl">〰️〰️▶</div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-3">Einstein Coefficients</h3>
          <div className="space-y-4">
             <div className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg">
                <div className="bg-blue-600 text-white w-10 h-10 flex items-center justify-center rounded font-serif text-xl italic">A</div>
                <div>
                  <p className="text-sm font-bold">Spontaneous Emission (A₂₁)</p>
                  <p className="text-xs text-gray-500">The probability of an atom jumping down on its own per unit time.</p>
                </div>
             </div>
             <div className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg">
                <div className="bg-red-600 text-white w-10 h-10 flex items-center justify-center rounded font-serif text-xl italic">B</div>
                <div>
                  <p className="text-sm font-bold">Stimulated Absorption/Emission (B₁₂, B₂₁)</p>
                  <p className="text-xs text-gray-500">The probability of transition due to external photon interaction.</p>
                </div>
             </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
           <h3 className="text-lg font-bold text-gray-800 mb-3">Key Characteristics</h3>
           <ul className="space-y-2">
             <li className="flex items-start gap-2 text-sm text-gray-600">
               <span className="text-green-500">✔</span>
               <span>Stimulated photons have the same <strong>Phase</strong>, <strong>Frequency</strong>, and <strong>Direction</strong>.</span>
             </li>
             <li className="flex items-start gap-2 text-sm text-gray-600">
               <span className="text-green-500">✔</span>
               <span>Stimulated emission is the basis of <strong>Laser Action</strong>.</span>
             </li>
             <li className="flex items-start gap-2 text-sm text-gray-600">
               <span className="text-red-500">✖</span>
               <span>Spontaneous emission produces incoherent light (like a standard bulb).</span>
             </li>
           </ul>
        </div>
      </div>

      <style>{`
        @keyframes moveRight {
          0% { left: 0; opacity: 1; }
          40% { left: 45%; opacity: 1; }
          60% { left: 45%; opacity: 0; }
          100% { left: 100%; opacity: 0; }
        }
        @keyframes moveRightTrigger {
          0% { left: 0; opacity: 1; }
          50% { left: 45%; opacity: 1; }
          51% { opacity: 0; }
          100% { left: 100%; opacity: 0; }
        }
        @keyframes moveRightExit {
          0% { left: 50%; opacity: 0; }
          50% { left: 50%; opacity: 1; }
          100% { left: 90%; opacity: 1; }
        }
        @keyframes jumpUp {
          0% { bottom: 20%; }
          45% { bottom: 20%; }
          55% { bottom: 70%; }
          100% { bottom: 70%; }
        }
        @keyframes fallDown {
          0% { top: 20%; }
          30% { top: 70%; }
          100% { top: 70%; }
        }
        @keyframes fallDownStimulated {
          0% { top: 20%; }
          45% { top: 20%; }
          55% { top: 70%; }
          100% { top: 70%; }
        }
        @keyframes randomExit {
          0% { opacity: 0; transform: translate(0, 0); }
          30% { opacity: 1; transform: translate(50px, -50px); }
          100% { opacity: 0; transform: translate(150px, -150px); }
        }
      `}</style>
    </div>
  );
};

export default ModuleEmission;
