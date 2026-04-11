
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw } from 'lucide-react';

const VivaStage: React.FC<{ onRestart: () => void }> = ({ onRestart }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const questions = [
    {
      q: "Why is a metastable state essential for laser action?",
      options: [
        "It increases the speed of light in the medium",
        "It allows electrons to accumulate in an excited state longer",
        "It prevents stimulated emission from occurring",
        "It cools down the active medium"
      ],
      correct: 1,
      explanation: "Metastable states have lifetimes of ~10⁻³s, compared to 10⁻⁸s for normal excited states, enabling the population inversion required for lasing."
    },
    {
      q: "In stimulated emission, the emitted photon is identical to the incident photon in:",
      options: [
        "Phase and direction only",
        "Energy and phase only",
        "Phase, direction, and energy",
        "Direction and polarization only"
      ],
      correct: 2,
      explanation: "Stimulated emission produces a photon that is a perfect clone of the trigger photon, which is the basis for laser coherence."
    },
    {
      q: "At thermal equilibrium, which energy state is most populated?",
      options: [
        "Ground State (E₁)",
        "Excited State (E₂)",
        "Metastable State",
        "All states are equally populated"
      ],
      correct: 0,
      explanation: "According to the Boltzmann distribution, lower energy states are always more populated at thermal equilibrium."
    },
    {
      q: "What is the primary role of the 'Output Coupler' in a laser cavity?",
      options: [
        "To reflect 100% of the light back into the medium",
        "To allow a fraction of the coherent light to exit as a beam",
        "To pump the atoms into excited states",
        "To filter out unwanted wavelengths"
      ],
      correct: 1,
      explanation: "The output coupler is a partially reflective mirror that lets a small percentage of the amplified light escape as the laser beam."
    },
    {
      q: "In optical communications, what is a common cause of Intersymbol Interference (ISI)?",
      options: [
        "Using too much power",
        "Pulse broadening due to dispersion",
        "The laser being too coherent",
        "Using a 4-level laser system"
      ],
      correct: 1,
      explanation: "As pulses travel, they spread out (disperse). If they spread too much, they overlap with adjacent pulses, causing ISI."
    },
    {
      q: "A 4-level laser system is generally more efficient than a 3-level system because:",
      options: [
        "It uses fewer energy levels",
        "The ground state is always empty",
        "The lower laser level is rapidly emptied",
        "It doesn't require a metastable state"
      ],
      correct: 2,
      explanation: "In a 4-level system, the lower laser level (E₂) is above the ground state and empties very quickly, making population inversion easier to maintain."
    },
    {
      q: "The 'Lasing Threshold' is reached when:",
      options: [
        "The pump is turned on",
        "Spontaneous emission starts",
        "Gain equals total cavity losses",
        "The output coupler is removed"
      ],
      correct: 2,
      explanation: "Threshold is the point where the gain provided by the medium exactly compensates for the losses in the cavity."
    },
    {
      q: "Which Einstein coefficient represents the probability of stimulated emission?",
      options: [
        "A₂₁",
        "B₁₂",
        "B₂₁",
        "C₃₁"
      ],
      correct: 2,
      explanation: "B₂₁ is the Einstein coefficient for stimulated emission, while A₂₁ is for spontaneous emission and B₁₂ is for absorption."
    },
    {
      q: "Numerical Aperture (NA) in an optical fiber determines:",
      options: [
        "The color of the light",
        "The light-gathering capacity (Acceptance Cone)",
        "The speed of data transmission",
        "The length of the fiber"
      ],
      correct: 1,
      explanation: "NA is a measure of the range of angles over which the fiber can accept and propagate light."
    },
    {
      q: "What does 'Slope Efficiency' measure in laser performance?",
      options: [
        "The angle of the laser beam",
        "Conversion of pump power into output power above threshold",
        "The time it takes to reach threshold",
        "The stability of the laser frequency"
      ],
      correct: 1,
      explanation: "Slope efficiency is the ratio of the increase in laser output power to the increase in pump power once threshold is exceeded."
    }
  ];

  const handleAnswer = (idx: number) => {
    if (isAnswered) return;
    setSelectedAnswer(idx);
    setIsAnswered(true);
    if (idx === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const progress = ((currentQuestion + (isAnswered ? 1 : 0)) / questions.length) * 100;

  if (showResult) {
    return (
      <div className="flex flex-col items-center justify-center text-center font-mono py-8 md:py-12 space-y-8 md:space-y-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-4 md:space-y-6"
        >
          <div className="inline-block px-4 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[8px] md:text-[10px] font-black uppercase tracking-[0.5em]">
            Evaluation Complete
          </div>
          <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none text-[var(--text-main)]">
            Final <br />
            <span className="text-cyan-500 italic">Score: {score}/{questions.length}</span>
          </h2>
        </motion.div>

        <div className="max-w-xl w-full p-6 md:p-10 border border-lab-border bg-lab-surface space-y-6 md:space-y-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
          <p className="text-[var(--text-muted)] text-xs md:text-sm leading-relaxed font-medium tracking-wide">
            {score >= 8 
              ? "Exceptional performance. You have mastered the fundamental principles of laser action and Einstein's theoretical framework." 
              : score >= 5
              ? "Good effort. You have a solid grasp of the basics, but some advanced concepts could use a review."
              : "Review the lab modules. Focus on Population Inversion, Stimulated Emission, and Cavity Dynamics to strengthen your foundations."}
          </p>
          
          <button 
            onClick={onRestart}
            className="group relative w-full bg-lab-surface border border-lab-border p-4 md:p-6 transition-all hover:border-cyan-500/50 flex items-center justify-center gap-3"
          >
            <RotateCcw className="w-4 h-4 md:w-5 md:h-5 text-[var(--text-muted)] group-hover:text-cyan-400 transition-colors" />
            <span className="text-base md:text-lg font-black text-[var(--text-main)] uppercase tracking-tighter group-hover:text-cyan-400 transition-colors">Restart Laboratory</span>
          </button>
        </div>
      </div>
    );
  }

  const q = questions[currentQuestion];

  return (
    <div className="flex flex-col items-center justify-center font-mono py-4 md:py-8 space-y-8 md:space-y-12 max-w-2xl mx-auto px-4">
      {/* Header */}
      <div className="text-center space-y-3 md:space-y-4">
        <div className="inline-block px-4 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[8px] md:text-[10px] font-black uppercase tracking-[0.5em]">
          Experiment 07: Final Evaluation
        </div>
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter leading-none text-[var(--text-main)]">
          Knowledge <span className="text-cyan-500 italic">Verification</span>
        </h2>
      </div>

      {/* Progress Bar */}
      <div className="w-full space-y-2">
        <div className="flex justify-between text-[8px] md:text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">
          <span>Progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-1 bg-lab-bg border border-lab-border rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-cyan-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="w-full space-y-6 md:space-y-8">
        <div className="space-y-3 md:space-y-4 text-center">
          <span className="text-[var(--text-muted)] text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em]">Question {currentQuestion + 1} / {questions.length}</span>
          <h3 className="text-lg md:text-xl font-black text-[var(--text-main)] uppercase tracking-tighter leading-tight">
            {q.q}
          </h3>
        </div>

        <div className="grid gap-2 md:gap-3">
          {q.options.map((opt, i) => {
            let state = 'default';
            if (isAnswered) {
              if (i === q.correct) state = 'correct';
              else if (i === selectedAnswer) state = 'incorrect';
              else state = 'dimmed';
            }

            return (
              <button
                key={i}
                disabled={isAnswered}
                onClick={() => handleAnswer(i)}
                className={`w-full text-left p-4 md:p-5 border transition-all group relative overflow-hidden ${
                  state === 'correct' ? 'border-green-500/50 bg-green-500/5' :
                  state === 'incorrect' ? 'border-red-500/50 bg-red-500/5' :
                  state === 'dimmed' ? 'border-lab-border opacity-30' :
                  'border-lab-border bg-lab-surface hover:border-cyan-500/50 hover:bg-lab-bg'
                }`}
              >
                <div className={`absolute top-0 left-0 w-1 h-full transition-colors ${
                  state === 'correct' ? 'bg-green-500' :
                  state === 'incorrect' ? 'bg-red-500' :
                  'bg-lab-border group-hover:bg-cyan-500'
                }`} />
                
                <div className="flex items-center gap-4 md:gap-6 relative z-10">
                  <div className={`w-6 h-6 md:w-8 md:h-8 border flex items-center justify-center text-[8px] md:text-[10px] font-black transition-all ${
                    state === 'correct' ? 'border-green-500/50 text-green-400' :
                    state === 'incorrect' ? 'border-red-500/50 text-red-400' :
                    'border-lab-border text-[var(--text-muted)] group-hover:border-cyan-500/50 group-hover:text-cyan-400'
                  }`}>
                    {String.fromCharCode(65 + i)}
                  </div>
                  <span className={`text-[10px] md:text-xs font-bold transition-colors tracking-wide ${
                    state === 'correct' ? 'text-green-400' :
                    state === 'incorrect' ? 'text-red-400' :
                    'text-[var(--text-muted)] group-hover:text-[var(--text-main)]'
                  }`}>
                    {opt}
                  </span>
                  
                  {state === 'correct' && <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-green-500 ml-auto" />}
                  {state === 'incorrect' && <XCircle className="w-3 h-3 md:w-4 md:h-4 text-red-500 ml-auto" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation & Next Button */}
        <AnimatePresence>
          {isAnswered && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4 md:space-y-6"
            >
              <div className="p-4 md:p-6 bg-lab-surface border border-lab-border relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-lab-border" />
                <div className="space-y-1 md:space-y-2">
                  <span className="text-[8px] md:text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest">Explanation</span>
                  <p className="text-[10px] md:text-xs text-[var(--text-muted)] leading-relaxed font-medium tracking-wide">
                    {q.explanation}
                  </p>
                </div>
              </div>

              <button 
                onClick={nextQuestion}
                className="w-full py-3 md:py-4 bg-lab-primary text-black font-black uppercase tracking-[0.2em] text-[10px] md:text-xs hover:bg-[var(--text-main)] hover:text-lab-bg transition-colors flex items-center justify-center gap-2"
              >
                {currentQuestion + 1 === questions.length ? 'Finish Quiz' : 'Next Question'}
                <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default VivaStage;
