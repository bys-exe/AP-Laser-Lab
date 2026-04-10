
import React, { useState } from 'react';

const PracticeStage: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [showSolution, setShowSolution] = useState(false);

  const problem = {
    title: "Numerical Exercise: Population Ratio",
    text: "Calculate the population ratio N₂/N₁ for a Ruby laser (λ = 694.3 nm) operating at T = 300K.",
    hint: "ΔE = hc/λ. Population Ratio = exp(-ΔE/kT). Given k = 1.38e-23, h = 6.63e-34.",
    solution: "1. ΔE = (6.63e-34 * 3e8) / 694.3e-9 = 2.86e-19 J\n2. kT = 1.38e-23 * 300 = 4.14e-21 J\n3. Ratio = exp(-2.86e-19 / 4.14e-21) = exp(-69) ≈ 10⁻³⁰",
    correctTrigger: "10^-30"
  };

  const checkAnswer = () => {
    if (userInput.includes('-30') || userInput.includes('10')) {
      setFeedback("CORRECT! The ratio is extremely small, highlighting the absolute necessity of pumping energy to achieve inversion.");
    } else {
      setFeedback("Incorrect. Review the hc/λ energy calculation and Boltzmann exponential factor.");
    }
  };

  return (
    <div className="animate-stage space-y-12">
      <header className="space-y-1">
        <h2 className="text-3xl font-black text-white uppercase tracking-tight">Experiment 07: Numerical Analysis</h2>
        <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest">Quantifying laser conditions through first-principles calculation.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="bg-zinc-900 p-10 border border-zinc-800 space-y-8 shadow-2xl">
          <h3 className="text-2xl font-black text-white leading-tight uppercase tracking-tighter">{problem.title}</h3>
          <p className="text-zinc-400 leading-relaxed text-sm font-bold uppercase tracking-tight">{problem.text}</p>
          
          <div className="space-y-4 pt-4">
            <label className="text-[10px] font-black uppercase text-zinc-600 tracking-widest">Enter Result (Order of Magnitude)</label>
            <div className="flex gap-4">
              <input 
                type="text" 
                placeholder="e.g. 10^-30"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="flex-1 bg-black border border-zinc-800 px-6 py-4 text-white font-mono outline-none focus:border-cyan-500 transition-colors"
              />
              <button onClick={checkAnswer} className="bg-cyan-500 text-black font-black px-8 py-4 hover:bg-white transition-all shadow-lg">Verify</button>
            </div>
          </div>

          {feedback && (
            <div className={`p-6 border-2 ${feedback.includes('CORRECT') ? 'border-cyan-500 bg-cyan-500/5 text-cyan-500' : 'border-red-900 bg-black text-red-500'}`}>
              <p className="text-xs font-bold leading-relaxed uppercase tracking-tight">{feedback}</p>
            </div>
          )}

          <div className="pt-4 flex gap-4">
             <button onClick={() => setShowSolution(!showSolution)} className="text-[10px] font-black uppercase text-zinc-600 hover:text-white transition-colors">
               {showSolution ? 'Hide Solution' : 'Show Step-by-Step Solution'}
             </button>
          </div>

          {showSolution && (
            <div className="bg-black p-6 border border-zinc-800 text-xs text-zinc-500 font-mono whitespace-pre-line animate-fadeIn">
              {problem.solution}
            </div>
          )}
        </div>

        <div className="bg-zinc-900 p-10 border border-zinc-800 space-y-8 shadow-2xl">
           <h4 className="text-[10px] font-black uppercase text-zinc-600 tracking-widest">Reference Constants</h4>
           <div className="grid gap-4">
              <div className="p-4 bg-black border border-zinc-800 flex justify-between items-center">
                 <span className="text-[10px] font-bold text-zinc-600 uppercase">Planck's (h)</span>
                 <span className="text-xs font-mono text-white">6.63 x 10⁻³⁴ J·s</span>
              </div>
              <div className="p-4 bg-black border border-zinc-800 flex justify-between items-center">
                 <span className="text-[10px] font-bold text-zinc-600 uppercase">Boltzmann (k)</span>
                 <span className="text-xs font-mono text-white">1.38 x 10⁻²³ J/K</span>
              </div>
              <div className="p-4 bg-black border border-zinc-800 flex justify-between items-center">
                 <span className="text-[10px] font-bold text-zinc-600 uppercase">Speed of Light (c)</span>
                 <span className="text-xs font-mono text-white">3.00 x 10⁸ m/s</span>
              </div>
           </div>
           <button 
            onClick={onNext}
            className="w-full bg-white text-black font-black py-5 hover:bg-cyan-500 transition-all shadow-xl text-xl"
          >
            Enter Final Evaluation →
          </button>
        </div>
      </div>
    </div>
  );
};

export default PracticeStage;
