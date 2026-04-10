
import React from 'react';
import { motion } from 'motion/react';
import { 
  Zap, 
  RefreshCw, 
  Layers, 
  ChevronRight, 
  Lock, 
  Activity,
  Cpu,
  Database,
  ArrowRight
} from 'lucide-react';

const IntroStage: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  return (
    <div className="p-4 md:p-12 space-y-16 md:y-24">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center space-y-8 md:space-y-12 py-8 md:py-12">
        <div className="text-[8px] md:text-[10px] font-black text-zinc-500 uppercase tracking-[0.5em]">
          SYSTEM_STATUS: OPERATIONAL
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-9xl font-black text-lab-primary uppercase tracking-tighter leading-[0.8]">
          LASER ACTION <br />
          VIRTUAL LAB
        </h1>

        <button 
          onClick={onNext}
          className="bg-lab-primary text-black px-8 md:px-12 py-3 md:py-4 font-black uppercase tracking-[0.3em] text-xs md:text-sm hover:bg-[var(--text-main)] hover:text-lab-bg transition-colors"
        >
          INITIALIZE LABORATORY
        </button>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12 pt-8 md:pt-12 border-t border-lab-border w-full max-w-4xl">
          {[
            { label: 'BEAM_INTENSITY', val: '1.21 GW' },
            { label: 'STABILITY_COEF', val: '0.9984' },
            { label: 'REFRACTION_INDEX', val: '1.520' },
            { label: 'PULSE_WIDTH', val: '12 fs' }
          ].map((stat) => (
            <div key={stat.label} className="text-left space-y-1">
              <div className="text-[8px] font-black text-[var(--text-muted)] uppercase tracking-widest">{stat.label}</div>
              <div className="text-2xl font-black text-[var(--text-main)] tracking-tighter">{stat.val}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-16 md:pt-24 pb-8 md:pb-12 text-center space-y-6 border-t border-lab-border">
        <div className="text-[8px] md:text-[9px] font-black text-zinc-700 uppercase tracking-widest px-4">
          © 2024 VIRTUAL_LAB_OS / PRECISION INSTRUMENTATION SECTOR
        </div>
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {['PRIVACY_PROTOCOL', 'SYSTEM_SPECS', 'LOG_OUT'].map((item) => (
            <button key={item} className="text-[8px] md:text-[9px] font-black text-zinc-500 hover:text-[var(--text-main)] transition-colors tracking-widest">
              {item}
            </button>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default IntroStage;
