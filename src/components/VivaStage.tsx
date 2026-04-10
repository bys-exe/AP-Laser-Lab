
import React, { useState } from 'react';

const VivaStage: React.FC<{ onRestart: () => void }> = ({ onRestart }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      q: "What is the primary condition for light amplification in a laser?",
      options: ["Thermal Equilibrium", "Population Inversion", "Spontaneous Emission", "Bose-Einstein Condensation"],
      correct: 1
    },
    {
      q: "In a 3-level laser system, which state must be metastable?",
      options: ["Ground State", "Excited State E3", "Intermediate State E2", "All of the above"],
      correct: 2
    },
    {
      q: "Which Einstein process is responsible for the coherence of laser light?",
      options: ["Spontaneous Emission", "Stimulated Absorption", "Stimulated Emission", "Non-radiative decay"],
      correct: 2
    },
    {
      q: "What does the 'Output Coupler' mirror do in a laser cavity?",
      options: ["Reflects 100% of light", "Absorbs all light", "Allows a small percentage of light to escape", "Pumps the active medium"],
      correct: 2
    }
  ];

  const handleAnswer = (idx: number) => {
    if (idx === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    return (
      <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 text-center">
        <div className="space-y-4">
          <div className="inline-block px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-500 text-[10px] font-bold uppercase tracking-[0.3em]">
            Evaluation Complete
          </div>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none text-white">
            Final <br />
            <span className="text-cyan-500 italic">Score: {score}/{questions.length}</span>
          </h2>
        </div>

        <div className="max-w-md mx-auto p-8 border border-zinc-800 bg-zinc-900/50 space-y-6">
          <p className="text-zinc-400 text-sm leading-relaxed font-bold uppercase tracking-tight">
            {score === questions.length 
              ? "Exceptional performance. You have mastered the fundamental principles of laser action." 
              : "Good effort. Review the sections on Population Inversion and Stimulated Emission to improve your understanding."}
          </p>
          <button 
            onClick={onRestart}
            className="w-full bg-white text-black font-black py-5 hover:bg-cyan-500 transition-all text-xl uppercase tracking-widest"
          >
            Restart Lab
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="space-y-4">
        <div className="inline-block px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-500 text-[10px] font-bold uppercase tracking-[0.3em]">
          Stage 08: Viva Voce
        </div>
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none text-white">
          Knowledge <br />
          <span className="text-cyan-500 italic">Verification</span>
        </h2>
      </div>

      <div className="max-w-3xl space-y-8">
        <div className="space-y-4">
          <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.2em]">Question {currentQuestion + 1} of {questions.length}</p>
          <h3 className="text-2xl font-black text-white uppercase tracking-tighter leading-tight">
            {questions[currentQuestion].q}
          </h3>
        </div>

        <div className="grid gap-4">
          {questions[currentQuestion].options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              className="w-full text-left p-6 border border-zinc-800 bg-zinc-900/50 hover:border-cyan-500 hover:bg-zinc-900 transition-all group"
            >
              <div className="flex items-center gap-6">
                <div className="w-8 h-8 border border-zinc-700 flex items-center justify-center text-[10px] font-black text-zinc-500 group-hover:border-cyan-500 group-hover:text-cyan-500 transition-colors">
                  {String.fromCharCode(65 + i)}
                </div>
                <span className="text-sm font-bold text-zinc-400 group-hover:text-white transition-colors uppercase tracking-tight">{opt}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VivaStage;
