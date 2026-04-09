
import React, { useState } from 'react';

const QUESTIONS = [
  {
    q: "Laser light is 'Coherent' because all photons have the same:",
    o: ["Color", "Energy", "Phase and Direction", "Amplitude"],
    a: 2
  },
  {
    q: "What process is the 'engine' of light amplification in a laser?",
    o: ["Absorption", "Spontaneous Emission", "Stimulated Emission", "Refraction"],
    a: 2
  },
  {
    q: "Population Inversion means that:",
    o: ["N₁ > N₂", "N₂ > N₁", "N₁ = N₂", "All atoms are ground"],
    a: 1
  },
  {
    q: "What is the primary role of a Metastable State?",
    o: ["To cool the laser", "To allow accumulation of excited atoms", "To block photons", "To stabilize the mirrors"],
    a: 1
  }
];

const VivaStage: React.FC<{ onRestart: () => void }> = ({ onRestart }) => {
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [show, setShow] = useState(false);
  const [sel, setSel] = useState<number | null>(null);

  const next = () => {
    if (sel === QUESTIONS[idx].a) setScore(s => s + 1);
    if (idx < QUESTIONS.length - 1) {
      setIdx(idx + 1);
      setSel(null);
    } else {
      setShow(true);
    }
  };

  if (show) {
    return (
      <div className="animate-stage text-center space-y-8 py-10">
        <div className="bg-slate-900 border border-slate-800 p-12 rounded-[3rem] shadow-2xl relative overflow-hidden max-w-lg mx-auto">
          <div className="text-6xl mb-6">🎓</div>
          <h2 className="text-4xl font-black mb-2">Grade: {(score / QUESTIONS.length) * 100}%</h2>
          <p className="text-slate-400 mb-10 leading-relaxed">
            {score === QUESTIONS.length 
              ? "Exceptional! You have a deep understanding of Laser Action and Einstein's coefficients." 
              : "Good effort. You might want to review the Population Inversion section again."}
          </p>
          <div className="flex gap-4">
            <button onClick={onRestart} className="flex-1 bg-white text-slate-950 py-4 rounded-2xl font-black transition-all hover:bg-slate-200">Restart Lab</button>
            <button onClick={() => window.print()} className="flex-1 border border-slate-700 py-4 rounded-2xl font-black hover:bg-slate-800 transition-all">Print Results</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-stage space-y-12 max-w-2xl mx-auto">
      <header className="text-center space-y-2">
        <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Final Evaluation</h2>
        <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">Question {idx + 1} of {QUESTIONS.length}</p>
      </header>

      <div className="bg-slate-900 p-8 rounded-[2rem] border border-slate-800 space-y-8 shadow-2xl">
        <h3 className="text-xl font-bold text-slate-100 leading-relaxed text-center">{QUESTIONS[idx].q}</h3>
        
        <div className="grid grid-cols-1 gap-4">
          {QUESTIONS[idx].o.map((opt, i) => (
            <button
              key={i}
              onClick={() => setSel(i)}
              className={`text-left p-6 rounded-2xl border-2 transition-all font-bold tracking-tight ${
                sel === i 
                ? 'bg-rose-600 border-rose-500 text-white shadow-[0_0_20px_rgba(225,29,72,0.3)]' 
                : 'bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-700 hover:text-slate-300'
              }`}
            >
              <span className="opacity-40 mr-3">{String.fromCharCode(65 + i)}.</span>
              {opt}
            </button>
          ))}
        </div>

        <button 
          onClick={next}
          disabled={sel === null}
          className={`w-full py-5 rounded-2xl font-black text-xl transition-all ${
            sel !== null ? 'bg-slate-100 text-slate-950 hover:bg-white shadow-xl' : 'bg-slate-800 text-slate-700 cursor-not-allowed'
          }`}
        >
          {idx === QUESTIONS.length - 1 ? 'Complete Lab' : 'Next Question'}
        </button>
      </div>
    </div>
  );
};

export default VivaStage;
