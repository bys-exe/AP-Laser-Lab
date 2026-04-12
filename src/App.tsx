
import React, { useState, useEffect, useRef } from 'react';
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
  LayoutDashboard,
  Sun,
  Moon
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const scrollToTop = () => {
      if (mainRef.current) {
        mainRef.current.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      // Fallbacks for various browsers and configurations
      document.documentElement.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.body.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    };

    // Immediate scroll
    scrollToTop();
    
    // Multiple delayed scrolls to handle potential layout shifts and React's render cycle
    const timers = [0, 50, 150, 300, 500].map(delay => setTimeout(scrollToTop, delay));
    
    return () => timers.forEach(clearTimeout);
  }, [currentStage]);

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, [theme]);

  const stages = [
    { id: LabStage.INTRODUCTION, label: 'Virtual Lab', icon: LayoutDashboard },
    { id: LabStage.THEORY, label: 'Theoretical Foundations', icon: Microscope },
    { id: LabStage.ATOMIC_STATES, label: '01 Energy Systems', icon: Zap },
    { id: LabStage.INTERACTIONS, label: '02 Einstein Processes', icon: Layers },
    { id: LabStage.POPULATION, label: '03 Population Inversion', icon: Activity },
    { id: LabStage.CAVITY, label: '04 The Optical Cavity', icon: Cpu },
    { id: LabStage.BIT_STREAM, label: '05 Optical Comms', icon: Database },
    { id: LabStage.PRACTICE, label: '06 Numerical Practice', icon: Microscope },
    { id: LabStage.VIVA, label: '07 Final Evaluation', icon: Activity },
  ];

  const renderStage = () => {
    switch (currentStage) {
      case LabStage.INTRODUCTION: return <IntroStage onNext={() => setCurrentStage(LabStage.THEORY)} />;
      case LabStage.THEORY: return <TheoryNotes onNext={() => setCurrentStage(LabStage.ATOMIC_STATES)} onSelectStage={(stage) => setCurrentStage(stage)} />;
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
    <div className="min-h-screen bg-lab-bg flex font-sans selection:bg-lab-primary selection:text-black overflow-hidden">
      
      {/* Sidebar Overlay */}
      <div 
        onClick={() => setIsSidebarOpen(false)}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-200 ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      />

      {/* Sidebar */}
      <aside 
        style={{ 
          transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.2s ease-out',
          willChange: 'transform'
        }}
        className="fixed top-0 left-0 h-full w-64 border-r border-lab-border bg-lab-bg flex flex-col z-50 shadow-lg"
      >
        <div className="p-8 border-b border-lab-border flex flex-col gap-1">
          <div className="text-lab-primary font-black text-sm tracking-tighter">VIRTUAL_LAB_OS</div>
          <div className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-widest">SECTOR_07</div>
        </div>

        <nav className="flex-1 overflow-y-auto py-6">
          <div className="px-8 mb-4">
            <p className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-[0.3em]">Navigation</p>
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
                : 'text-[var(--text-muted)] hover:text-[var(--text-main)] border-transparent'
              }`}
            >
              <s.icon className={`w-4 h-4 ${currentStage === s.id ? 'text-lab-primary' : 'text-[var(--text-muted)]'}`} />
              {s.label}
            </button>
          ))}
        </nav>

        <div className="p-8 border-t border-lab-border">
          <div className="flex justify-between items-end">
            <p className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Uptime</p>
            <p className="text-[10px] font-bold text-lab-primary">99.98%</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main ref={mainRef} className="flex-1 overflow-y-auto bg-lab-bg relative" style={{ scrollBehavior: 'auto' }}>
        {/* Toggle Sidebar Button */}
        <button 
          style={{ 
            left: isSidebarOpen ? '272px' : '16px',
            transition: 'left 0.2s ease-out',
            willChange: 'left'
          }}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="fixed top-6 md:top-10 z-[60] p-3 md:p-4 border border-lab-border bg-lab-bg hover:border-lab-primary transition-colors group"
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span className={`w-full h-px bg-[var(--text-main)] group-hover:bg-lab-primary block transition-all duration-300 ${isSidebarOpen ? 'rotate-45 translate-y-[9px]' : ''}`} />
            <span className={`w-full h-px bg-[var(--text-main)] group-hover:bg-lab-primary block transition-all duration-300 ${isSidebarOpen ? 'opacity-0' : ''}`} />
            <span className={`w-full h-px bg-[var(--text-main)] group-hover:bg-lab-primary block transition-all duration-300 ${isSidebarOpen ? '-rotate-45 -translate-y-[9px]' : ''}`} />
          </div>
        </button>

        <div className="max-w-7xl mx-auto p-6 md:p-20 lg:p-32 pt-24 md:pt-40">
          {/* Theme Toggle Button */}
          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="fixed top-6 md:top-10 right-6 md:right-10 z-[60] p-3 md:p-4 border border-lab-border bg-lab-bg hover:border-lab-primary transition-colors group"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-6 h-6 text-lab-primary group-hover:text-white transition-colors" />
            ) : (
              <Moon className="w-6 h-6 text-lab-primary group-hover:text-zinc-900 transition-colors" />
            )}
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStage}
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
              transition={{ 
                duration: 0.4, 
                ease: [0.22, 1, 0.36, 1] // Custom quintic ease-out for a premium feel
              }}
              className="w-full"
            >
              {renderStage()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default App;
