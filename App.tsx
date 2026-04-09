
import React, { useState } from 'react';
import { LabStage } from './types';
import IntroStage from './components/IntroStage';
import TheoryNotes from './components/TheoryNotes';
import AtomicStage from './components/AtomicStage';
import InteractionStage from './components/InteractionStage';
import PopulationStage from './components/PopulationStage';
import CavityStage from './components/CavityStage';
import PracticeStage from './components/PracticeStage';
import VivaStage from './components/VivaStage';

const App: React.FC = () => {
  const [currentStage, setCurrentStage] = useState<LabStage>(LabStage.INTRODUCTION);

  const stages = [
    { id: LabStage.INTRODUCTION, label: '01 Fundamentals' },
    { id: LabStage.THEORY, label: '02 Theory' },
    { id: LabStage.ATOMIC_STATES, label: '03 Energy Levels' },
    { id: LabStage.INTERACTIONS, label: '04 Einstein Processes' },
    { id: LabStage.POPULATION, label: '05 Pop. Inversion' },
    { id: LabStage.CAVITY, label: '06 Threshold Lab' },
    { id: LabStage.PRACTICE, label: '07 Numerical Lab' },
    { id: LabStage.VIVA, label: '08 Evaluation' },
  ];

  const renderStage = () => {
    switch (currentStage) {
      case LabStage.INTRODUCTION: return <IntroStage onNext={() => setCurrentStage(LabStage.THEORY)} />;
      case LabStage.THEORY: return <TheoryNotes onNext={() => setCurrentStage(LabStage.ATOMIC_STATES)} />;
      case LabStage.ATOMIC_STATES: return <AtomicStage onNext={() => setCurrentStage(LabStage.INTERACTIONS)} />;
      case LabStage.INTERACTIONS: return <InteractionStage onNext={() => setCurrentStage(LabStage.POPULATION)} />;
      case LabStage.POPULATION: return <PopulationStage onNext={() => setCurrentStage(LabStage.CAVITY)} />;
      case LabStage.CAVITY: return <CavityStage onNext={() => setCurrentStage(LabStage.PRACTICE)} />;
      case LabStage.PRACTICE: return <PracticeStage onNext={() => setCurrentStage(LabStage.VIVA)} />;
      case LabStage.VIVA: return <VivaStage onRestart={() => setCurrentStage(LabStage.INTRODUCTION)} />;
      default: return <IntroStage onNext={() => setCurrentStage(LabStage.THEORY)} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row font-sans text-slate-200">
      <nav className="w-full md:w-72 bg-slate-900 border-b md:border-b-0 md:border-r border-slate-800 p-6 flex flex-col gap-8 shrink-0 overflow-y-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-rose-600 rounded-lg flex items-center justify-center font-black text-white italic shadow-[0_0_20px_rgba(225,29,72,0.5)] text-xl">L</div>
          <div>
            <h1 className="text-sm font-black tracking-widest text-white uppercase leading-none">Laser Mastery</h1>
            <p className="text-[9px] text-slate-500 font-bold uppercase mt-1 tracking-tighter">Applied Physics Virtual Lab</p>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          {stages.map((s) => (
            <button
              key={s.id}
              onClick={() => setCurrentStage(s.id)}
              className={`text-left px-4 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                currentStage === s.id 
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-900/30 translate-x-1' 
                : 'text-slate-500 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="mt-auto pt-6 border-t border-slate-800">
          <div className="p-4 bg-slate-950/50 rounded-xl border border-slate-800/50">
            <p className="text-[8px] font-black text-slate-600 uppercase mb-1">Curriculum Status</p>
            <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
               <div className="bg-rose-600 h-full transition-all" style={{ width: `${(stages.findIndex(s => s.id === currentStage) + 1) * 12.5}%` }}></div>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 overflow-y-auto bg-[#020617] relative">
        <div className="max-w-5xl mx-auto p-6 md:p-12 lg:p-16">
          {renderStage()}
        </div>
      </main>
    </div>
  );
};

export default App;
