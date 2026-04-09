
import React, { useState, useEffect } from 'react';
import { LabStage } from './types';
import IntroStage from '@/components/IntroStage';
import TheoryNotes from '@/components/TheoryNotes';
import AtomicStage from '@/components/AtomicStage';
import InteractionStage from '@/components/InteractionStage';
import PopulationStage from '@/components/PopulationStage';
import CavityStage from '@/components/CavityStage';
import PracticeStage from '@/components/PracticeStage';
import VivaStage from '@/components/VivaStage';

const App: React.FC = () => {
  const [currentStage, setCurrentStage] = useState<LabStage>(LabStage.INTRODUCTION);

  useEffect(() => {
    console.log('[APP] App.tsx: Component mounted.');
    console.log('[APP] App.tsx: Current Stage:', currentStage);
  }, [currentStage]);

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
    <div className="min-h-screen bg-black flex flex-col md:flex-row font-mono text-white selection:bg-cyan-500 selection:text-black">
      {/* Sidebar */}
      <nav className="w-full md:w-72 bg-zinc-900 border-b md:border-b-0 md:border-r border-zinc-800 p-6 flex flex-col gap-8 shrink-0 overflow-y-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-cyan-500 flex items-center justify-center font-bold text-black text-xl">
            AP
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tighter uppercase leading-none">Laser Lab</h1>
            <p className="text-[10px] text-zinc-500 font-bold uppercase mt-1 tracking-widest">v2.0.0-PRO</p>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-2 px-1">Navigation</p>
          {stages.map((s) => (
            <button
              key={s.id}
              onClick={() => setCurrentStage(s.id)}
              className={`text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest border border-transparent ${
                currentStage === s.id 
                ? 'bg-cyan-500 text-black' 
                : 'text-zinc-500 hover:bg-zinc-800 hover:text-white'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="mt-auto pt-6 border-t border-zinc-800">
          <div className="p-4 bg-zinc-950 border border-zinc-800">
            <div className="flex justify-between items-end mb-2">
              <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">System Load</p>
              <p className="text-[10px] font-bold text-cyan-500">
                {Math.round(((stages.findIndex(s => s.id === currentStage) + 1) / stages.length) * 100)}%
              </p>
            </div>
            <div className="w-full bg-zinc-800 h-1">
               <div 
                 className="bg-cyan-500 h-full" 
                 style={{ width: `${((stages.findIndex(s => s.id === currentStage) + 1) / stages.length) * 100}%` }}
               />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-black relative">
        <div className="max-w-5xl mx-auto p-8 md:p-12">
          <div key={currentStage}>
            {renderStage()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
