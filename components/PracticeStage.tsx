
import React, { useState } from 'react';

const PracticeStage: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [showSolution, setShowSolution] = useState(false);

  const problem = {
    title: "Numerical Analysis: Population Ratio",
    text: "Calculate the population ratio N₂/N₁ for a Ruby laser (λ = 694.3 nm) operating at T = 300K. This calculation reveals why natural population inversion is impossible at room temperature.",
    hint: "ΔE = hc/λ. Population Ratio = exp(-ΔE/kT). Given k = 1.38e-23, h = 6.63e-34.",
    solution: "1. ΔE = (6.63e-34 * 3e8) / 694.3e-9 = 2.86e-19 J\n2. kT = 1.38e-23 * 300 = 4.14e-21 J\n3. Ratio = exp(-2.86e-19 / 4.14e-21) = exp(-69) ≈ 10⁻³⁰",
    correctTrigger: "10^-30"
  };

  const checkAnswer = () => {
    if (userInput.includes('-30') || userInput.includes('10')) {
      setFeedback("CORRECT! The ratio is extremely small (10⁻³⁰), highlighting the absolute necessity of external pumping energy to achieve inversion.");
    } else {
      setFeedback("Incorrect. Review the hc/λ energy calculation and Boltzmann exponential factor.");
    }
  };

  return (
    <div className="space-y-12">
      <header className="flex justify-between items-end border-b border-zinc-800 pb-8">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="bg-black text-cyan-500 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest border border-cyan-500">
              Stage 07
            </span>
            <div className="h-px w-12 bg-zinc-800"></div>
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Quantitative Lab</span>
          </div>
          <h2 className="text-4xl font-bold text-white uppercase tracking-tight">Numerical Analysis</h2>
        </div>
        <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest max-w-[200px] text-right leading-tight">
          Quantifying laser conditions through first-principles calculation.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7 bg-zinc-900 p-12 border border-zinc-800 space-y-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500"></div>
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-white leading-tight">{problem.title}</h3>
            <p className="text-zinc-400 leading-tight text-[15px] font-bold">{problem.text}</p>
          </div>
          
          <div className="space-y-6">
            <label className="text-[10px] font-bold uppercase text-zinc-500 tracking-widest">Enter Result (Order of Magnitude)</label>
            <div className="flex gap-4">
              <input 
                type="text" 
                placeholder="e.g. 10^-30"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="flex-1 bg-black border border-zinc-800 px-8 py-6 text-white font-mono outline-none focus:border-cyan-500"
              />
              <button 
                onClick={checkAnswer} 
                className="bg-cyan-500 text-black font-bold px-12 py-6 hover:bg-cyan-400 uppercase tracking-widest text-[10px]"
              >
                Verify
              </button>
            </div>
          </div>

          {feedback && (
            <div className={`p-8 border ${feedback.includes('CORRECT') ? 'border-cyan-500 bg-black text-cyan-500' : 'border-zinc-800 bg-black text-zinc-500'}`}>
              <div className="flex items-center gap-4">
                <div className={`w-2 h-2 ${feedback.includes('CORRECT') ? 'bg-cyan-500' : 'bg-zinc-700'}`}></div>
                <p className="text-[13px] font-bold leading-tight">{feedback}</p>
              </div>
            </div>
          )}

          <div className="pt-4">
             <button 
               onClick={() => setShowSolution(!showSolution)} 
               className="text-[10px] font-bold uppercase text-zinc-500 hover:text-cyan-500 tracking-widest flex items-center gap-3"
             >
               <div className={`w-1.5 h-1.5 ${showSolution ? 'bg-cyan-500' : 'bg-zinc-700'}`}></div>
               {showSolution ? 'Hide Solution' : 'Show Step-by-Step Solution'}
             </button>
          </div>

          {showSolution && (
            <div className="bg-black p-8 border border-zinc-800 text-[13px] text-zinc-400 font-mono whitespace-pre-line overflow-hidden">
              {problem.solution}
            </div>
          )}
        </div>

        <div className="lg:col-span-5 space-y-8">
           <div className="bg-zinc-900 p-10 border border-zinc-800 space-y-8">
              <h4 className="text-[10px] font-bold uppercase text-zinc-500 tracking-widest border-b border-zinc-800 pb-4 text-center">Reference Constants</h4>
              <div className="space-y-4">
                 {[
                   { label: "Planck's (h)", value: "6.63 x 10⁻³⁴ J·s" },
                   { label: "Boltzmann (k)", value: "1.38 x 10⁻²³ J/K" },
                   { label: "Speed of Light (c)", value: "3.00 x 10⁸ m/s" }
                 ].map((item, idx) => (
                   <div key={idx} className="p-5 bg-black border border-zinc-800 flex justify-between items-center hover:border-cyan-500">
                      <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">{item.label}</span>
                      <span className="text-xs font-mono text-white font-bold">{item.value}</span>
                   </div>
                 ))}
              </div>
           </div>

           <button 
             onClick={onNext} 
             className="w-full bg-cyan-500 text-black font-bold py-7 hover:bg-cyan-400 text-xl uppercase tracking-widest"
           >
             Final Assessment
           </button>
        </div>
      </div>
    </div>
  );
};

export default PracticeStage;
