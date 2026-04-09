
import React, { useState } from 'react';

const ModuleNumerical: React.FC = () => {
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  const problem = {
    text: "Calculate the ratio of populations of two energy levels in a laser at room temperature (T = 300K), if the transition wavelength is 632.8 nm (He-Ne laser).",
    formula: "N2/N1 = exp(-hf/kT)",
    h: 6.63e-34,
    c: 3e8,
    k: 1.38e-23,
    lambda: 632.8e-9,
    ans: 1.15e-33 // approx
  };

  const checkAns = () => {
    // Very simple check for demonstration
    if (userInput.includes('-33')) {
      setFeedback("Correct! The ratio is extremely small, confirming that at thermal equilibrium, higher levels are virtually empty.");
    } else {
      setFeedback("Incorrect. Hint: Calculate ΔE = hc/λ first, then divide by kT. The exponent will be quite large and negative.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Numerical Practice Corner</h2>
        
        <div className="bg-gray-900 text-green-400 p-6 rounded-xl font-mono text-sm space-y-4 shadow-inner">
          <p className="text-gray-400"># PROBLEM_01</p>
          <p className="leading-relaxed text-white text-lg font-sans">{problem.text}</p>
          <div className="pt-4 border-t border-gray-800 text-xs">
            <span className="text-gray-500">GIVEN:</span> T=300K, λ=632.8nm, h=6.63e-34, k=1.38e-23
          </div>
        </div>

        <div className="mt-8 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-500">Your Answer (Scientific Notation)</label>
            <div className="flex gap-4">
              <input 
                type="text" 
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="e.g. 1.15e-33"
                className="flex-1 p-3 border-2 rounded-xl focus:border-blue-600 outline-none transition-all"
              />
              <button 
                onClick={checkAns}
                className="bg-gray-800 text-white px-8 py-3 rounded-xl font-bold hover:bg-black transition-colors"
              >
                Check Answer
              </button>
            </div>
          </div>

          {feedback && (
            <div className={`p-4 rounded-xl border-2 ${feedback.startsWith('Correct') ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
              <p className="text-sm font-semibold">{feedback}</p>
            </div>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
           <h3 className="font-bold text-gray-800 mb-4">Common Formulas</h3>
           <div className="space-y-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-xs text-gray-400 uppercase font-bold mb-1">Energy Ratio</div>
                <div className="text-lg font-serif">N₂ / N₁ = e<sup>-ΔE/kT</sup></div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-xs text-gray-400 uppercase font-bold mb-1">Einstein Ratio</div>
                <div className="text-lg font-serif">A₂₁ / B₂₁ = 8πhν³ / c³</div>
              </div>
           </div>
        </div>
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 flex flex-col justify-center">
           <h3 className="font-bold text-blue-900 mb-2">Need Help?</h3>
           <p className="text-sm text-blue-800 mb-4">Use the Chatbot to request step-by-step solutions or more practice problems for different laser types like Ruby or CO₂.</p>
           <button 
             className="text-blue-600 font-bold hover:underline text-sm text-left"
             onClick={() => window.alert("Click the blue bubble in the bottom right corner to chat!")}
           >
             Ask Tutor for hints &rarr;
           </button>
        </div>
      </div>
    </div>
  );
};

export default ModuleNumerical;
