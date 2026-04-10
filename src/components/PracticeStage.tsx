
import React, { useState } from 'react';
import { motion } from 'motion/react';

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
    <div className="space-y-12 font-mono pb-20">
      <header className="flex justify-between items-start border-b border-zinc-900 pb-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
        <div className="space-y-2">
          <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Experiment 07: Numerical Analysis</h2>
          <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.4em]">Quantifying Laser Conditions via First-Principles</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7 bg-zinc-950 p-10 border border-zinc-900 space-y-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500/20" />
          <div className="space-y-6">
            <h3 className="text-3xl font-black text-white leading-tight uppercase tracking-tighter">{problem.title}</h3>
            <p className="text-[11px] text-zinc-500 leading-relaxed font-medium uppercase tracking-tight max-w-xl">{problem.text}</p>
          </div>
          
          <div className="space-y-6 pt-4">
            <label className="text-[9px] font-black uppercase text-zinc-600 tracking-[0.3em]">Enter Result (Order of Magnitude)</label>
            <div className="flex gap-4">
              <input 
                type="text" 
                placeholder="e.g. 10^-30"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="flex-1 bg-black border border-zinc-900 px-8 py-5 text-white font-mono outline-none focus:border-cyan-500/50 transition-all shadow-inner placeholder:text-zinc-800"
              />
              <button 
                onClick={checkAnswer} 
                className="bg-zinc-900 border border-zinc-800 text-white font-black px-10 py-5 hover:border-cyan-500/50 transition-all uppercase tracking-widest text-xs"
              >
                Verify
              </button>
            </div>
          </div>

          {feedback && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-8 border ${feedback.includes('CORRECT') ? 'border-cyan-500/30 bg-cyan-500/5 text-cyan-400' : 'border-red-900/30 bg-red-950/5 text-red-500'}`}
            >
              <p className="text-[10px] font-black leading-relaxed uppercase tracking-widest">{feedback}</p>
            </motion.div>
          )}

          <div className="pt-4">
             <button onClick={() => setShowSolution(!showSolution)} className="text-[9px] font-black uppercase text-zinc-700 hover:text-cyan-500 transition-colors tracking-[0.3em]">
               {showSolution ? '[-] Hide Solution' : '[+] Show Step-by-Step Solution'}
             </button>
          </div>

          {showSolution && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-black p-8 border border-zinc-900 text-[10px] text-zinc-600 font-mono whitespace-pre-line leading-loose uppercase tracking-widest shadow-inner"
            >
              {problem.solution}
            </motion.div>
          )}
        </div>

        <div className="lg:col-span-5 space-y-8">
           <div className="bg-zinc-950 p-10 border border-zinc-900 space-y-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-3xl rounded-full" />
              <h4 className="text-[10px] font-black uppercase text-zinc-600 tracking-[0.3em] border-b border-zinc-900 pb-4">Reference Constants</h4>
              <div className="space-y-6">
                 {[
                   { label: "Planck's (h)", val: "6.63 x 10⁻³⁴ J·s" },
                   { label: "Boltzmann (k)", val: "1.38 x 10⁻²³ J/K" },
                   { label: "Speed of Light (c)", val: "3.00 x 10⁸ m/s" }
                 ].map((c, i) => (
                   <div key={i} className="p-6 bg-black border border-zinc-900 flex justify-between items-center shadow-inner group">
                      <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
                      <span className="text-[9px] font-black text-zinc-700 uppercase tracking-widest relative z-10">{c.label}</span>
                      <span className="text-xs font-black text-white tracking-tighter relative z-10">{c.val}</span>
                   </div>
                 ))}
              </div>
           </div>

           <button 
            onClick={onNext} 
            className="group relative w-full bg-zinc-900 border border-zinc-800 p-8 transition-all hover:border-cyan-500/50"
          >
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity" />
            <div className="absolute top-0 left-0 w-full h-[2px] bg-zinc-800" />
            <span className="text-xl font-black text-white uppercase tracking-tighter group-hover:text-cyan-400 transition-colors">Enter Final Evaluation →</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PracticeStage;
