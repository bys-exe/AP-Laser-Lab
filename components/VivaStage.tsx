
import React, { useState } from 'react';

const QUESTIONS = [
  {
    q: "Laser light is 'Coherent' because all photons have the same:",
    o: ["Color", "Energy", "Phase and Direction", "Amplitude"],
    a: 2,
    expl: "Coherence implies that the electromagnetic waves are in phase both spatially and temporally."
  },
  {
    q: "What process is the 'engine' of light amplification in a laser?",
    o: ["Absorption", "Spontaneous Emission", "Stimulated Emission", "Refraction"],
    a: 2,
    expl: "Stimulated emission produces an identical photon, leading to exponential growth of the light field."
  },
  {
    q: "Population Inversion means that:",
    o: ["N₁ > N₂", "N₂ > N₁", "N₁ = N₂", "All atoms are ground"],
    a: 1,
    expl: "Inversion occurs when more atoms are in the excited state (N₂) than the ground state (N₁)."
  },
  {
    q: "What is the primary role of a Metastable State?",
    o: ["To cool the laser", "To allow accumulation of excited atoms", "To block photons", "To stabilize the mirrors"],
    a: 1,
    expl: "Metastable states have long lifetimes, allowing atoms to stay excited long enough for inversion to occur."
  }
];

const VivaStage: React.FC<{ onRestart: () => void }> = ({ onRestart }) => {
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [sel, setSel] = useState<number | null>(null);

  const handleNext = () => {
    if (sel === QUESTIONS[idx].a) setScore(s => s + 1);
    
    if (idx < QUESTIONS.length - 1) {
      setIdx(idx + 1);
      setSel(null);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    const finalScore = Math.round((score / QUESTIONS.length) * 100);
    return (
      <div className="max-w-2xl mx-auto bg-zinc-900 p-12 border border-zinc-800 text-center space-y-10">
        <div className="space-y-4">
          <div className="w-20 h-20 bg-cyan-500 mx-auto flex items-center justify-center">
            <span className="text-black font-bold text-2xl">{finalScore}%</span>
          </div>
          <h2 className="text-3xl font-bold text-white uppercase tracking-tight">Certification Complete</h2>
          <p className="text-zinc-400 font-bold leading-tight">
            {finalScore >= 75 
              ? "Exceptional! You have a deep understanding of Laser Action and Einstein's coefficients." 
              : "Good effort. You might want to review the Population Inversion section again."}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
           <div className="p-6 bg-black border border-zinc-800">
              <p className="text-[9px] text-zinc-600 uppercase font-bold tracking-widest mb-1">Score</p>
              <p className="text-2xl font-bold text-white">{score} / {QUESTIONS.length}</p>
           </div>
           <div className="p-6 bg-black border border-zinc-800">
              <p className="text-[9px] text-zinc-600 uppercase font-bold tracking-widest mb-1">Status</p>
              <p className={`text-2xl font-bold uppercase ${finalScore >= 75 ? 'text-cyan-500' : 'text-zinc-500'}`}>
                {finalScore >= 75 ? 'Qualified' : 'Review Needed'}
              </p>
           </div>
        </div>

        <div className="flex gap-4">
          <button 
            onClick={onRestart} 
            className="flex-1 bg-white text-black font-bold py-6 text-xl uppercase tracking-tighter hover:bg-cyan-500 active:bg-cyan-600"
          >
            Restart Lab
          </button>
          <button 
            onClick={() => window.print()} 
            className="flex-1 border border-zinc-800 text-zinc-500 font-bold py-6 text-xl uppercase tracking-tighter hover:bg-zinc-800 hover:text-white"
          >
            Print Report
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <header className="flex justify-between items-end border-b border-zinc-800 pb-6">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="bg-zinc-800 text-cyan-500 px-3 py-1 text-[10px] font-bold uppercase tracking-widest border border-zinc-700">
              Final Stage
            </span>
            <div className="h-px w-8 bg-zinc-800"></div>
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Academic Defense</span>
          </div>
          <h2 className="text-3xl font-bold text-white uppercase tracking-tight">Viva Voce</h2>
        </div>
        <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest max-w-[200px] text-right leading-tight">
          Comprehensive Evaluation of Laser Physics Mastery.
        </p>
      </header>

      <div className="max-w-3xl mx-auto space-y-8">
        <div className="flex justify-between items-center px-2">
           <div className="flex gap-2">
             {QUESTIONS.map((_, i) => (
               <div 
                 key={i} 
                 className={`h-1 w-10 ${
                   i === idx ? 'bg-cyan-500' : i < idx ? 'bg-zinc-700' : 'bg-zinc-900'
                 }`}
               />
             ))}
           </div>
           <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">Question {idx + 1} of {QUESTIONS.length}</span>
        </div>

        <div className="bg-zinc-900 p-10 border border-zinc-800 space-y-8 relative">
          <div className="absolute top-0 right-0 p-6">
             <div className="w-12 h-12 border border-zinc-800 flex items-center justify-center text-zinc-800 font-bold text-xl">
               {idx + 1}
             </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white leading-tight max-w-[85%]">{QUESTIONS[idx].q}</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {QUESTIONS[idx].o.map((opt, i) => (
              <button
                key={i}
                onClick={() => setSel(i)}
                className={`p-6 border text-left font-bold uppercase tracking-widest text-[10px] ${
                  sel === i 
                    ? 'bg-cyan-500 border-cyan-500 text-black' 
                    : 'bg-black border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 border ${sel === i ? 'bg-black border-black' : 'border-zinc-800'}`}></div>
                  <span className="opacity-40">{String.fromCharCode(65 + i)}.</span>
                  {opt}
                </div>
              </button>
            ))}
          </div>

          <button 
            onClick={handleNext}
            disabled={sel === null}
            className={`w-full py-6 font-bold text-xl uppercase tracking-tighter ${
              sel !== null ? 'bg-white text-black hover:bg-cyan-500 active:bg-cyan-600' : 'bg-zinc-800 text-zinc-700 cursor-not-allowed'
            }`}
          >
            {idx === QUESTIONS.length - 1 ? 'Complete Lab' : 'Next Question'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VivaStage;
