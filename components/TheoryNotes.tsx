
import React from 'react';

const TheoryNotes: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const notes = [
    {
      title: "Light-Matter Interaction",
      content: "When electromagnetic radiation interacts with an atomic system, three processes occur: Absorption, Spontaneous Emission, and Stimulated Emission. The dominance of stimulated emission is the prerequisite for laser action."
    },
    {
      title: "Einstein's A & B Coefficients",
      content: "Einstein derived that the probability of stimulated transitions (B) is proportional to radiation density, while spontaneous emission (A) is a purely random decay. To achieve coherence, B21*ρ(ν) must significantly exceed A21."
    },
    {
      title: "Population Inversion",
      content: "Naturally, more atoms reside in the ground state (Boltzmann distribution). Population Inversion is the state where N₂ > N₁, typically achieved through 'optical pumping' in 3 or 4-level energy systems."
    },
    {
      title: "Optical Feedback",
      content: "The laser medium is placed inside a resonant cavity with two mirrors. This provides positive feedback, allowing photons to pass through the gain medium multiple times, causing massive light amplification."
    }
  ];

  return (
    <div className="animate-stage space-y-12">
      <header className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="bg-rose-600/20 text-rose-500 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-rose-500/20">Stage 02</span>
          <h2 className="text-4xl font-black text-white leading-tight">Theory</h2>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {notes.map((note, i) => (
          <div key={i} className="bg-slate-900 border border-slate-800 p-8 rounded-[2rem] space-y-4 hover:border-slate-700 transition-colors shadow-lg">
            <h4 className="text-rose-500 font-black uppercase text-[10px] tracking-widest">{note.title}</h4>
            <p className="text-sm text-slate-400 leading-relaxed">{note.content}</p>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 p-10 rounded-[3rem] border border-slate-800 flex flex-col items-center text-center space-y-6">
        <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest">Critical Equilibrium Equation</h4>
        <div className="bg-slate-950 px-12 py-8 rounded-3xl border border-slate-800">
          <p className="text-3xl font-serif italic text-white tracking-widest">N₂ / N₁ = e <sup>-(E₂ - E₁) / kT</sup></p>
        </div>
        <p className="text-[10px] text-slate-500 max-w-lg leading-relaxed font-bold italic">
          Boltzmann's Law describes why we need external pumping to achieve inversion.
        </p>
      </div>

      <button 
        onClick={onNext}
        className="w-full bg-white text-slate-950 font-black py-6 rounded-3xl shadow-2xl hover:bg-slate-200 transition-all text-xl"
      >
        Proceed to Stage 3: Atomic States →
      </button>
    </div>
  );
};

export default TheoryNotes;
