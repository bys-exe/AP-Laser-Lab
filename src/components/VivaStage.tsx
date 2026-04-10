
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

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
      <div className="space-y-12 text-center font-mono py-20">
        <div className="space-y-6">
          <div className="inline-block px-4 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black uppercase tracking-[0.5em]">
            Evaluation Complete
          </div>
          <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none text-white">
            Final <br />
            <span className="text-cyan-500 italic drop-shadow-[0_0_30px_rgba(6,182,212,0.3)]">Score: {score}/{questions.length}</span>
          </h2>
        </div>

        <div className="max-w-xl mx-auto p-12 border border-zinc-900 bg-zinc-950 space-y-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
          <p className="text-zinc-500 text-[11px] leading-relaxed font-medium uppercase tracking-widest">
            {score === questions.length 
              ? "Exceptional performance. You have mastered the fundamental principles of laser action and Einstein's theoretical framework." 
              : "Good effort. Review the sections on Population Inversion and Stimulated Emission to improve your understanding of coherent light amplification."}
          </p>
          
          <button 
            onClick={onRestart}
            className="group relative w-full bg-zinc-900 border border-zinc-800 p-8 transition-all hover:border-cyan-500/50"
          >
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity" />
            <div className="absolute top-0 left-0 w-full h-[2px] bg-zinc-800" />
            <span className="text-xl font-black text-white uppercase tracking-tighter group-hover:text-cyan-400 transition-colors">Restart Laboratory</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-16 font-mono py-10">
      <div className="space-y-6">
        <div className="inline-block px-4 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black uppercase tracking-[0.5em]">
          Stage 09: Viva Voce
        </div>
        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none text-white">
          Knowledge <br />
          <span className="text-cyan-500 italic drop-shadow-[0_0_30px_rgba(6,182,212,0.2)]">Verification</span>
        </h2>
      </div>

      <div className="max-w-4xl space-y-12">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <span className="text-zinc-700 text-[10px] font-black uppercase tracking-[0.3em]">Question {currentQuestion + 1} / {questions.length}</span>
            <div className="flex-1 h-px bg-zinc-900" />
          </div>
          <h3 className="text-3xl font-black text-white uppercase tracking-tighter leading-tight max-w-2xl">
            {questions[currentQuestion].q}
          </h3>
        </div>

        <div className="grid gap-6">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid gap-4"
            >
              {questions[currentQuestion].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  className="w-full text-left p-8 border border-zinc-900 bg-zinc-950 hover:border-cyan-500/50 hover:bg-zinc-900/50 transition-all group relative overflow-hidden shadow-xl"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-zinc-900 group-hover:bg-cyan-500 transition-colors" />
                  <div className="flex items-center gap-8 relative z-10">
                    <div className="w-10 h-10 border border-zinc-800 flex items-center justify-center text-[10px] font-black text-zinc-700 group-hover:border-cyan-500/50 group-hover:text-cyan-400 transition-all">
                      {String.fromCharCode(65 + i)}
                    </div>
                    <span className="text-[11px] font-black text-zinc-500 group-hover:text-white transition-colors uppercase tracking-widest">{opt}</span>
                  </div>
                </button>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default VivaStage;
