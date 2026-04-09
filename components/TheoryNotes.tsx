
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
    <div className="space-y-12">
      <header className="space-y-4">
        <div className="flex items-center gap-4">
          <span className="bg-zinc-800 text-cyan-500 px-3 py-1 text-[10px] font-bold uppercase tracking-widest border border-zinc-700">
            Stage 02
          </span>
          <div className="h-px w-8 bg-zinc-800"></div>
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Theoretical Framework</span>
        </div>
        
        <h2 className="text-4xl md:text-6xl font-bold text-white leading-none tracking-tighter uppercase">
          Core <br/>
          <span className="text-cyan-500">Principles</span>
        </h2>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {notes.map((note, i) => (
          <div 
            key={i} 
            className="bg-zinc-900 border border-zinc-800 p-8 space-y-4 hover:border-cyan-500"
          >
            <div className="flex justify-between items-start">
              <h4 className="text-cyan-500 font-bold uppercase text-[10px] tracking-widest">{note.title}</h4>
              <span className="text-zinc-700 font-mono text-[9px] font-bold">0{i+1}</span>
            </div>
            <p className="text-[14px] text-zinc-400 leading-tight font-bold">{note.content}</p>
          </div>
        ))}
      </div>

      <div className="bg-zinc-900 p-10 border border-zinc-800 flex flex-col items-center text-center space-y-6">
        <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Critical Equilibrium Equation</h4>
        
        <div className="bg-black px-12 py-8 border border-zinc-800">
          <p className="text-3xl md:text-4xl font-serif italic text-white tracking-widest">
            N₂ / N₁ = e <sup className="text-cyan-500">-(E₂ - E₁) / kT</sup>
          </p>
        </div>
        
        <p className="text-[12px] text-zinc-500 max-w-lg leading-tight font-bold italic">
          Boltzmann's Law describes why we need external pumping to achieve inversion. 
          At thermal equilibrium, the lower energy state is always more populated.
        </p>
      </div>

      <div className="pt-8">
        <button 
          onClick={onNext}
          className="w-full bg-white text-black font-bold py-6 text-xl uppercase tracking-tighter hover:bg-cyan-500 active:bg-cyan-600"
        >
          Proceed to Energy Levels →
        </button>
      </div>
    </div>
  );
};

export default TheoryNotes;
