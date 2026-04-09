
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
      <div className="max-w-2xl mx-auto bg-white p-12 rounded-3xl shadow-2xl text-center space-y-6">
        <div className="text-6xl">🎓</div>
        <h2 className="text-3xl font-bold text-gray-800">Viva Voce Completed!</h2>
        <p className="text-xl text-gray-600">You scored <span className="font-bold text-blue-600">{score}</span> out of {QUESTIONS.length}</p>
        <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
          <div 
            className="bg-blue-600 h-full transition-all duration-1000" 
            style={{ width: `${(score / QUESTIONS.length) * 100}%` }}
          />
        </div>
        <button 
          onClick={restart}
          className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fadeIn">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">
           <span>Viva Mode</span>
           <span>Question {currentIdx + 1} of {QUESTIONS.length}</span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-800 mb-8 leading-tight">
          {QUESTIONS[currentIdx].q}
        </h3>

        <div className="space-y-3">
          {QUESTIONS[currentIdx].options.map((opt, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`w-full p-4 rounded-xl text-left transition-all border-2 ${
                selected === i 
                  ? 'border-blue-600 bg-blue-50 text-blue-900 shadow-md' 
                  : 'border-gray-100 bg-white text-gray-600 hover:border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  selected === i ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'
                }`}>
                  {String.fromCharCode(65 + i)}
                </span>
                {opt}
              </div>
            </button>
          ))}
        </div>

        <div className="mt-10 flex justify-end">
          <button
            onClick={handleNext}
            disabled={selected === null}
            className={`px-10 py-3 rounded-xl font-bold transition-all ${
              selected === null 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg'
            }`}
          >
            {currentIdx === QUESTIONS.length - 1 ? 'Finish' : 'Next Question'}
          </button>
        </div>
      </div>
      
      <div className="bg-yellow-50 p-4 rounded-xl text-xs text-yellow-800 border border-yellow-100 italic">
        Tip: If you're stuck, ask the AI Tutor for a hint!
      </div>
    </div>
  );
};

export default ModuleQuiz;
