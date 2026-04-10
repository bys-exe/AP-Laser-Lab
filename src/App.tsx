
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LabStage } from './types.ts';
import IntroStage from './components/IntroStage.tsx';
import TheoryNotes from './components/TheoryNotes.tsx';
import AtomicStage from './components/AtomicStage.tsx';
import InteractionStage from './components/InteractionStage.tsx';
import PopulationStage from './components/PopulationStage.tsx';
import CavityStage from './components/CavityStage.tsx';
import PracticeStage from './components/PracticeStage.tsx';
import VivaStage from './components/VivaStage.tsx';

const App: React.FC = () => {
  const [currentStage, setCurrentStage] = useState<LabStage>(LabStage.INTRODUCTION);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    console.log('[APP] App.tsx: Component mounted.');
    console.log('[APP] App.tsx: Current Stage:', currentStage);
  }, [currentStage]);

  const stages = [
    { id: LabStage.INTRODUCTION, label: '01 Virtual Lab' },
    { id: LabStage.THEORY, label: '02 Theoretical Foundations' },
    { id: LabStage.ATOMIC_STATES, label: '03 Energy Systems' },
    { id: LabStage.INTERACTIONS, label: '04 Einstein Processes' },
    { id: LabStage.POPULATION, label: '05 Population Inversion' },
    { id: LabStage.CAVITY, label: '06 The Optical Cavity' },
    { id: LabStage.PRACTICE, label: '07 Numerical Practice' },
    { id: LabStage.VIVA, label: '08 Final Evaluation' },
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
    <div className="min-h-screen bg-black flex font-mono text-white selection:bg-cyan-500 selection:text-black relative overflow-hidden">
      
      {/* Hamburger Button */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-6 left-6 z-50 p-3 bg-zinc-900 border border-zinc-800 hover:border-cyan-500 transition-colors group"
        aria-label="Toggle Sidebar"
      >
        <div className="w-5 h-4 flex flex-col justify-between">
          <motion.span 
            animate={isSidebarOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            className="w-full h-0.5 bg-white group-hover:bg-cyan-400 block origin-center"
          />
          <motion.span 
            animate={isSidebarOpen ? { opacity: 0 } : { opacity: 1 }}
            className="w-full h-0.5 bg-white group-hover:bg-cyan-400 block"
          />
          <motion.span 
            animate={isSidebarOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            className="w-full h-0.5 bg-white group-hover:bg-cyan-400 block origin-center"
          />
        </div>
      </button>

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            <motion.nav 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-72 bg-zinc-900 border-r border-zinc-800 p-8 pt-24 flex flex-col gap-8 z-40 shadow-2xl"
            >
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
                    onClick={() => {
                      setCurrentStage(s.id);
                      setIsSidebarOpen(false);
                    }}
                    className={`text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest border border-transparent transition-all ${
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
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-black relative">
        <div className="max-w-5xl mx-auto p-8 md:p-12 pt-24 md:pt-24">
          <div key={currentStage}>
            {renderStage()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
