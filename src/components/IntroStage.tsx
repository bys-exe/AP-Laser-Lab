
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
    <div className="p-12 space-y-24">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center space-y-12 py-12">
        <div className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.5em]">
          SYSTEM_STATUS: OPERATIONAL
        </div>
        
        <h1 className="text-7xl md:text-9xl font-black text-lab-primary uppercase tracking-tighter leading-[0.8]">
          LASER ACTION <br />
          VIRTUAL LAB
        </h1>

        <button 
          onClick={onNext}
          className="bg-lab-primary text-black px-12 py-4 font-black uppercase tracking-[0.3em] text-sm hover:bg-white transition-colors"
        >
          INITIALIZE LABORATORY
        </button>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 pt-12 border-t border-lab-border w-full max-w-4xl">
          {[
            { label: 'BEAM_INTENSITY', val: '1.21 GW' },
            { label: 'STABILITY_COEF', val: '0.9984' },
            { label: 'REFRACTION_INDEX', val: '1.520' },
            { label: 'PULSE_WIDTH', val: '12 fs' }
          ].map((stat) => (
            <div key={stat.label} className="text-left space-y-1">
              <div className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">{stat.label}</div>
              <div className="text-2xl font-black text-white tracking-tighter">{stat.val}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Active Modules Section */}
      <section className="space-y-12">
        <div className="flex justify-between items-end border-b border-lab-border pb-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-black text-white uppercase tracking-tighter">ACTIVE_MODULES</h2>
            <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">PHYSICAL SIMULATION ENVIRONMENT NODES</p>
          </div>
          <div className="text-[10px] font-black text-lab-primary uppercase tracking-widest">REALTIME_TELEMETRY</div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { 
              id: '01-AT', 
              title: 'ATOMIC TRANSITIONS', 
              desc: 'Simulation of electron excitation states and photon emission probability across hydrogen-like atoms.', 
              status: 'READY',
              icon: Zap,
              color: 'text-lab-primary'
            },
            { 
              id: '02-OF', 
              title: 'OPTICAL FEEDBACK', 
              desc: 'Closed-loop resonance analysis. Modeling interference patterns within Fabry-Perot cavities.', 
              status: 'CALIBRATING',
              icon: RefreshCw,
              color: 'text-lab-primary'
            },
            { 
              id: '03-QS', 
              title: 'QUANTUM STATES', 
              desc: 'Probability density mapping and wave function collapse visualization for multi-particle systems.', 
              status: 'LOCKED',
              icon: Layers,
              color: 'text-lab-primary',
              locked: true
            }
          ].map((module) => (
            <div 
              key={module.id} 
              className="bg-lab-surface border border-lab-border p-8 space-y-8 hover:border-lab-primary transition-colors group relative"
            >
              <div className="flex justify-between items-start">
                <module.icon className={`w-8 h-8 ${module.color}`} />
                <div className="text-[8px] font-black text-zinc-700 uppercase tracking-widest">M_ID: {module.id}</div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-black text-white uppercase tracking-tighter">{module.title}</h3>
                <p className="text-[11px] text-zinc-500 font-medium leading-relaxed uppercase tracking-tight">
                  {module.desc}
                </p>
              </div>

              <div className="flex justify-between items-center pt-4">
                <div className={`text-[10px] font-black uppercase tracking-widest ${module.status === 'READY' ? 'text-lab-primary' : module.status === 'CALIBRATING' ? 'text-lab-secondary' : 'text-zinc-700'}`}>
                  {module.status}
                </div>
                {module.locked ? (
                  <Lock className="w-4 h-4 text-zinc-800" />
                ) : (
                  <ArrowRight className="w-4 h-4 text-zinc-800 group-hover:text-lab-primary transition-colors" />
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-24 pb-12 text-center space-y-6 border-t border-lab-border">
        <div className="text-[9px] font-black text-zinc-700 uppercase tracking-widest">
          © 2024 VIRTUAL_LAB_OS / PRECISION INSTRUMENTATION SECTOR
        </div>
        <div className="flex justify-center gap-8">
          {['PRIVACY_PROTOCOL', 'SYSTEM_SPECS', 'LOG_OUT'].map((item) => (
            <button key={item} className="text-[9px] font-black text-zinc-500 hover:text-white transition-colors tracking-widest">
              {item}
            </button>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default IntroStage;
