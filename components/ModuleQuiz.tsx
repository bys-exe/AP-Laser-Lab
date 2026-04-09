
import React, { useState } from 'react';

const QUESTIONS = [
  {
    q: "Which property is most essential for a state to be called a 'Metastable State'?",
    options: ["Low energy level", "Long lifetime", "High temperature", "Short wavelength"],
    a: 1
  },
  {
    q: "Why is a 2-level laser system practically impossible for continuous laser action?",
    options: ["Stimulated emission is too slow", "It violates thermodynamic laws", "Populations can at most be equal", "Mirror losses are too high"],
    a: 2
  },
  {
    q: "In a 4-level system, between which levels does the laser transition occur?",
    options: ["E3 and E2", "E2 and E1", "E1 and E0", "E3 and E0"],
    a: 1
  },
  {
    q: "What does the Einstein coefficient 'B' represent?",
    options: ["Spontaneous emission probability", "Stimulated transition probability", "Energy density", "Wavelength constant"],
    a: 1
  }
];

const ModuleQuiz: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  const handleNext = () => {
    if (selected === QUESTIONS[currentIdx].a) {
      setScore(prev => prev + 1);
    }
    
    if (currentIdx < QUESTIONS.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelected(null);
    } else {
      setShowResult(true);
    }
  };

  const restart = () => {
    setCurrentIdx(0);
    setScore(0);
    setShowResult(false);
    setSelected(null);
  };

  if (showResult) {
    return (
      <div className="max-w-2xl mx-auto bg-zinc-900 border border-zinc-800 p-16 text-center space-y-10">
        <div className="text-7xl">🏆</div>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-white uppercase tracking-tight">Assessment Complete</h2>
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Quantum Proficiency Level</p>
        </div>
        
        <div className="space-y-6">
          <p className="text-xl text-zinc-400 font-bold">
            You achieved <span className="text-cyan-500 font-bold">{score}</span> / {QUESTIONS.length}
          </p>
          <div className="w-full bg-black h-2 border border-zinc-800">
            <div 
              className="bg-cyan-500 h-full"
              style={{ width: `${(score / QUESTIONS.length) * 100}%` }}
            />
          </div>
        </div>

        <button 
          onClick={restart}
          className="bg-cyan-500 text-black px-12 py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-cyan-400"
        >
          Re-Initialize Module
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-10">
      <header className="flex justify-between items-center bg-zinc-900 p-8 border border-zinc-800">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-white uppercase tracking-tight">Knowledge Check</h2>
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Theoretical Validation</p>
        </div>
        <div className="px-6 py-2 bg-black border border-zinc-800 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
          {currentIdx + 1} / {QUESTIONS.length}
        </div>
      </header>

      <div className="bg-zinc-900 border border-zinc-800 p-16 space-y-12">
        <h3 className="text-2xl font-bold text-white leading-tight">
          {QUESTIONS[currentIdx].q}
        </h3>

        <div className="space-y-4">
          {QUESTIONS[currentIdx].options.map((opt, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`w-full p-6 text-left border flex items-center gap-6 ${
                selected === i 
                  ? 'border-cyan-500 bg-black text-white' 
                  : 'border-zinc-800 bg-black text-zinc-400 hover:border-zinc-600'
              }`}
            >
              <span className={`w-8 h-8 flex items-center justify-center text-[10px] font-bold ${
                selected === i ? 'bg-cyan-500 text-black' : 'bg-zinc-800 text-zinc-500'
              }`}>
                {String.fromCharCode(65 + i)}
              </span>
              <span className="text-[14px] font-bold">{opt}</span>
            </button>
          ))}
        </div>

        <div className="pt-8 flex justify-end">
          <button
            onClick={handleNext}
            disabled={selected === null}
            className={`px-12 py-4 text-[10px] font-bold uppercase tracking-widest ${
              selected === null 
                ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed' 
                : 'bg-cyan-500 text-black hover:bg-cyan-400'
            }`}
          >
            {currentIdx === QUESTIONS.length - 1 ? 'Finalize' : 'Next Phase'}
          </button>
        </div>
      </div>
      
      <div className="bg-zinc-900 p-8 border border-zinc-800 flex items-center gap-4">
        <div className="w-1.5 h-1.5 bg-cyan-500"></div>
        <p className="text-[11px] text-zinc-500 font-bold uppercase tracking-widest">
          Tip: Review the theory notes if you encounter difficulty.
        </p>
      </div>
    </div>
  );
};

export default ModuleQuiz;
