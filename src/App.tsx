
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, 
  Cpu, 
  Database, 
  Settings, 
  User, 
  Zap, 
  Layers, 
  Microscope, 
  Thermometer,
  LayoutDashboard
} from 'lucide-react';
import { LabStage } from './types.ts';
import IntroStage from './components/IntroStage.tsx';
import TheoryNotes from './components/TheoryNotes.tsx';
import AtomicStage from './components/AtomicStage.tsx';
import InteractionStage from './components/InteractionStage.tsx';
import PopulationStage from './components/PopulationStage.tsx';
import CavityStage from './components/CavityStage.tsx';
import PracticeStage from './components/PracticeStage.tsx';
import BitStreamLab from './components/BitStreamLab.tsx';
import VivaStage from './components/VivaStage.tsx';

const App: React.FC = () => {
  const [currentStage, setCurrentStage] = useState<LabStage>(LabStage.INTRODUCTION);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const stages = [
    { id: LabStage.INTRODUCTION, label: '01 Virtual Lab', icon: LayoutDashboard },
    { id: LabStage.THEORY, label: '02 Theoretical Foundations', icon: Microscope },
    { id: LabStage.ATOMIC_STATES, label: '03 Energy Systems', icon: Zap },
    { id: LabStage.INTERACTIONS, label: '04 Einstein Processes', icon: Layers },
    { id: LabStage.POPULATION, label: '05 Population Inversion', icon: Activity },
    { id: LabStage.CAVITY, label: '06 The Optical Cavity', icon: Cpu },
    { id: LabStage.BIT_STREAM, label: '07 Optical Comms', icon: Database },
    { id: LabStage.PRACTICE, label: '08 Numerical Practice', icon: Microscope },
    { id: LabStage.VIVA, label: '09 Final Evaluation', icon: Activity },
  ];

  const renderStage = () => {
    switch (currentStage) {
      case LabStage.INTRODUCTION: return <IntroStage onNext={() => setCurrentStage(LabStage.THEORY)} />;
      case LabStage.THEORY: return <TheoryNotes onNext={() => setCurrentStage(LabStage.ATOMIC_STATES)} />;
      case LabStage.ATOMIC_STATES: return <AtomicStage onNext={() => setCurrentStage(LabStage.INTERACTIONS)} />;
      case LabStage.INTERACTIONS: return <InteractionStage onNext={() => setCurrentStage(LabStage.POPULATION)} />;
      case LabStage.POPULATION: return <PopulationStage onNext={() => setCurrentStage(LabStage.CAVITY)} />;
      case LabStage.CAVITY: return <CavityStage onNext={() => setCurrentStage(LabStage.BIT_STREAM)} />;
      case LabStage.BIT_STREAM: return <BitStreamLab onNext={() => setCurrentStage(LabStage.PRACTICE)} />;
      case LabStage.PRACTICE: return <PracticeStage onNext={() => setCurrentStage(LabStage.VIVA)} />;
      case LabStage.VIVA: return <VivaStage onRestart={() => setCurrentStage(LabStage.INTRODUCTION)} />;
      default: return <IntroStage onNext={() => setCurrentStage(LabStage.THEORY)} />;
    }
  };

  return (
    <div className="min-h-screen bg-lab-bg flex font-sans text-white selection:bg-lab-primary selection:text-black overflow-hidden">
      
      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ x: isSidebarOpen ? 0 : -256 }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="fixed top-0 left-0 h-full w-64 border-r border-lab-border bg-lab-bg flex flex-col z-50 shadow-2xl"
      >
        <div className="p-8 border-b border-lab-border flex flex-col gap-1">
          <div className="text-lab-primary font-black text-sm tracking-tighter">VIRTUAL_LAB_OS</div>
          <div className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">SECTOR_07</div>
          <div className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase mt-2">
            {currentTime.toLocaleTimeString([], { hour12: false })}
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-6">
          <div className="px-8 mb-4">
            <p className="text-[9px] font-black text-zinc-700 uppercase tracking-[0.3em]">Navigation</p>
          </div>
          {stages.map((s) => (
            <button
              key={s.id}
              onClick={() => {
                setCurrentStage(s.id);
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-4 px-8 py-4 text-[10px] font-bold uppercase tracking-widest transition-all border-l-2 ${
                currentStage === s.id 
                ? 'bg-lab-surface text-lab-primary border-lab-primary' 
                : 'text-zinc-500 hover:text-white border-transparent'
              }`}
            >
              <s.icon className={`w-4 h-4 ${currentStage === s.id ? 'text-lab-primary' : 'text-zinc-600'}`} />
              {s.label}
            </button>
          ))}
        </nav>

        <div className="p-8 border-t border-lab-border">
          <div className="flex justify-between items-end">
            <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">Uptime</p>
            <p className="text-[10px] font-bold text-lab-primary">99.98%</p>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-lab-bg relative">
        {/* Toggle Sidebar Button */}
        <motion.button 
          initial={false}
          animate={{ left: isSidebarOpen ? 256 + 24 : 40 }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="fixed top-10 z-[60] p-4 border border-lab-border bg-lab-bg hover:border-lab-primary transition-colors group"
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span className={`w-full h-px bg-white group-hover:bg-lab-primary block transition-all duration-300 ${isSidebarOpen ? 'rotate-45 translate-y-[9px]' : ''}`} />
            <span className={`w-full h-px bg-white group-hover:bg-lab-primary block transition-all duration-300 ${isSidebarOpen ? 'opacity-0' : ''}`} />
            <span className={`w-full h-px bg-white group-hover:bg-lab-primary block transition-all duration-300 ${isSidebarOpen ? '-rotate-45 -translate-y-[9px]' : ''}`} />
          </div>
        </motion.button>

        <div className="max-w-7xl mx-auto p-12 md:p-20 lg:p-32 pt-32 md:pt-40">
          {renderStage()}
        </div>
      </main>
    </div>
  );
};

export default App;
