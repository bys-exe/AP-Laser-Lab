
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
    <div className="space-y-8 md:space-y-12 font-mono pb-20">
      <header className="flex flex-col md:flex-row justify-between items-start border-b border-lab-border pb-6 md:pb-8 relative overflow-hidden">
        <div className="space-y-2">
          <h2 className="text-2xl md:text-4xl font-black text-[var(--text-main)] uppercase tracking-tighter">Experiment 06: Numerical Analysis</h2>
          <p className="text-[var(--text-muted)] text-[8px] md:text-[10px] font-bold uppercase tracking-[0.4em]">Quantifying Laser Conditions via First-Principles</p>
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
              Laser performance is quantified using physical constants and thermodynamic laws. The <span className="text-[var(--text-main)]">Boltzmann Distribution</span> allows us to calculate the natural population ratio, proving that without external energy, laser action is statistically impossible.
            </p>
          </div>
          <div className="space-y-4 md:space-y-6">
            <h4 className="text-[9px] md:text-[10px] font-black uppercase text-[var(--text-muted)] tracking-[0.3em] flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-lab-border" />
              Experiment Aim & Procedure
            </h4>
            <p className="text-xs md:text-sm text-[var(--text-muted)] font-medium tracking-tight">
              <span className="text-[var(--text-main)]">Aim:</span> To apply theoretical formulas to solve numerical problems related to laser efficiency. <br/>
              <span className="text-[var(--text-main)]">Procedure:</span> Read the problem statement and identify parameters. Use the provided formulas to calculate the required values. Enter your answer to verify your understanding.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">
        <div className="lg:col-span-7 bg-lab-surface p-6 md:p-10 border border-lab-border space-y-8 md:space-y-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500/20" />
          <div className="space-y-4 md:space-y-6">
            <h3 className="text-2xl md:text-3xl font-black text-[var(--text-main)] leading-tight uppercase tracking-tighter">{problem.title}</h3>
            <p className="text-xs md:text-sm text-[var(--text-muted)] leading-relaxed font-medium tracking-tight max-w-xl">{problem.text}</p>
          </div>
          
          <div className="space-y-4 md:space-y-6 pt-4">
            <label className="text-[8px] md:text-[9px] font-black uppercase text-[var(--text-muted)] tracking-[0.3em]">Enter Result (Order of Magnitude)</label>
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="text" 
                placeholder="e.g. 10^-30"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="flex-1 bg-lab-bg border border-lab-border px-6 md:px-8 py-4 md:py-5 text-[var(--text-main)] font-mono outline-none focus:border-cyan-500/50 transition-all shadow-[var(--lab-inner-shadow-subtle)] placeholder:text-[var(--text-muted)]/30"
              />
              <button 
                onClick={checkAnswer} 
                className="bg-lab-surface border border-lab-border text-[var(--text-main)] font-black px-8 md:px-10 py-4 md:py-5 hover:border-cyan-500/50 transition-all uppercase tracking-widest text-[10px] md:text-xs"
              >
                Verify
              </button>
            </div>
          </div>

          {feedback && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-6 md:p-8 border ${feedback.includes('CORRECT') ? 'border-cyan-500/30 bg-cyan-500/5 text-cyan-400' : 'border-red-900/30 bg-red-950/5 text-red-500'}`}
            >
              <p className="text-[9px] md:text-[10px] font-black leading-relaxed uppercase tracking-widest">{feedback}</p>
            </motion.div>
          )}

          <div className="pt-4">
             <button onClick={() => setShowSolution(!showSolution)} className="text-[8px] md:text-[9px] font-black uppercase text-[var(--text-muted)] hover:text-cyan-500 transition-colors tracking-[0.3em]">
               {showSolution ? '[-] Hide Solution' : '[+] Show Step-by-Step Solution'}
             </button>
          </div>

          {showSolution && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-lab-bg p-6 md:p-8 border border-lab-border text-[9px] md:text-[10px] text-[var(--text-muted)] font-mono whitespace-pre-line leading-loose uppercase tracking-widest shadow-[var(--lab-inner-shadow-subtle)]"
            >
              {problem.solution}
            </motion.div>
          )}
        </div>

        <div className="lg:col-span-5 space-y-6 md:space-y-8">
           <div className="bg-lab-surface p-6 md:p-10 border border-lab-border space-y-8 md:space-y-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full" />
              <h4 className="text-[9px] md:text-[10px] font-black uppercase text-[var(--text-muted)] tracking-[0.3em] border-b border-lab-border pb-4">Reference Constants</h4>
              <div className="space-y-4 md:space-y-6">
                 {[
                   { label: "Planck's (h)", val: "6.63 x 10⁻³⁴ J·s" },
                   { label: "Boltzmann (k)", val: "1.38 x 10⁻²³ J/K" },
                   { label: "Speed of Light (c)", val: "3.00 x 10⁸ m/s" }
                 ].map((c, i) => (
                   <div key={i} className="p-4 md:p-6 bg-lab-bg border border-lab-border flex justify-between items-center shadow-[var(--lab-inner-shadow-subtle)] group relative overflow-hidden">
                      <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="text-[8px] md:text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest relative z-10">{c.label}</span>
                      <span className="text-[10px] md:text-xs font-black text-[var(--text-main)] tracking-tighter relative z-10">{c.val}</span>
                   </div>
                 ))}
              </div>
           </div>

           <button 
            onClick={onNext} 
            className="group relative w-full bg-lab-surface border border-lab-border p-6 md:p-8 transition-all hover:border-cyan-500/50"
          >
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity" />
            <div className="absolute top-0 left-0 w-full h-[2px] bg-lab-border" />
            <span className="text-lg md:text-xl font-black text-[var(--text-main)] uppercase tracking-tighter group-hover:text-cyan-400 transition-colors">Enter Final Evaluation →</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PracticeStage;
