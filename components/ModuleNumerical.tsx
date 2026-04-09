
import React, { useState } from 'react';

const ModuleNumerical: React.FC = () => {
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const problem = {
    text: "Calculate the ratio of populations of two energy levels in a laser at room temperature (T = 300K), if the transition wavelength is 632.8 nm (He-Ne laser).",
    formula: "N₂/N₁ = exp(-hf/kT)",
    h: 6.63e-34,
    c: 3e8,
    k: 1.38e-23,
    lambda: 632.8e-9,
    ans: 1.15e-33
  };

  const checkAns = () => {
    if (userInput.includes('-33')) {
      setFeedback({
        type: 'success',
        text: "Correct! The ratio is extremely small (~10⁻³³), confirming that at thermal equilibrium, higher levels are virtually empty."
      });
    } else {
      setFeedback({
        type: 'error',
        text: "Incorrect. Hint: Calculate ΔE = hc/λ first, then divide by kT. The exponent will be quite large and negative."
      });
    }
  };

  return (
    <div className="space-y-10">
      <header className="flex justify-between items-center bg-zinc-900 p-8 border border-zinc-800">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-white uppercase tracking-tight">Numerical Analysis</h2>
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Quantum Computation Workshop</p>
        </div>
        <div className="px-6 py-2 bg-black border border-zinc-800 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
          Problem ID: #QM-01
        </div>
      </header>

      <div className="bg-zinc-900 border border-zinc-800 p-12 space-y-10">
        <div className="bg-black p-8 border border-zinc-800 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 bg-cyan-500"></div>
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Active Challenge</span>
          </div>
          <p className="text-xl text-white font-bold leading-tight italic">"{problem.text}"</p>
          <div className="pt-6 border-t border-zinc-800 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Temp (T)", val: "300 K" },
              { label: "Wavelength (λ)", val: "632.8 nm" },
              { label: "Planck (h)", val: "6.63e-34" },
              { label: "Boltzmann (k)", val: "1.38e-23" }
            ].map((item, i) => (
              <div key={i} className="space-y-1">
                <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">{item.label}</p>
                <p className="text-[12px] text-zinc-400 font-mono">{item.val}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Input Solution (Scientific Notation)</label>
            <div className="flex flex-col md:flex-row gap-4">
              <input 
                type="text" 
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="e.g. 1.15e-33"
                className="flex-1 bg-black border border-zinc-800 px-6 py-4 text-white font-mono outline-none focus:border-cyan-500"
              />
              <button 
                onClick={checkAns}
                className="bg-white text-black px-10 py-4 text-[11px] font-bold uppercase tracking-widest hover:bg-cyan-500 active:bg-cyan-600"
              >
                Verify Result
              </button>
            </div>
          </div>

          {feedback && (
            <div className={`p-6 border ${
              feedback.type === 'success' 
                ? 'bg-black border-cyan-500 text-cyan-500' 
                : 'bg-black border-zinc-800 text-zinc-400'
            }`}>
              <div className="flex items-start gap-4">
                 <div className={`w-5 h-5 flex items-center justify-center text-[10px] font-bold ${feedback.type === 'success' ? 'bg-cyan-500 text-black' : 'bg-zinc-800 text-white'}`}>
                   {feedback.type === 'success' ? '✓' : '!'}
                 </div>
                 <p className="text-[13px] font-bold leading-tight">{feedback.text}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 bg-zinc-900 p-8 border border-zinc-800 space-y-6">
           <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Reference Library</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: "Energy Ratio", formula: "N₂ / N₁ = e⁻ᵟᴱ/ᵏᵀ" },
                { label: "Einstein Ratio", formula: "A₂₁ / B₂₁ = 8πhν³ / c³" }
              ].map((item, i) => (
                <div key={i} className="p-6 bg-black border border-zinc-800">
                  <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest mb-3">{item.label}</p>
                  <p className="text-lg font-mono text-white italic">{item.formula}</p>
                </div>
              ))}
           </div>
        </div>
        <div className="lg:col-span-5 bg-zinc-900 p-8 border border-zinc-800 flex flex-col justify-center space-y-6">
           <div className="space-y-3">
             <h3 className="text-[10px] font-bold text-cyan-500 uppercase tracking-widest">Physics Insight</h3>
             <p className="text-[13px] text-zinc-400 leading-tight font-bold">
               Boltzmann distribution explains why population inversion is a non-equilibrium state. External energy must be supplied to force atoms into higher energy states.
             </p>
           </div>
           <div className="text-zinc-600 text-[9px] font-bold uppercase tracking-widest">
             Reference: Quantum Mechanics Vol II
           </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleNumerical;
