
import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Target, Cpu, Zap, Activity, Database, Layers } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

const TheoryNotes: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const labModules = [
    {
      icon: Zap,
      title: '03 Energy Systems',
      desc: 'Atoms exist in discrete energy levels. Transitions between these levels involve the absorption or emission of photons with energy E = hν.',
      formula: 'E_2 - E_1 = h\\nu'
    },
    {
      icon: Layers,
      title: '04 Einstein Processes',
      desc: 'Three fundamental interactions: Absorption, Spontaneous Emission, and Stimulated Emission. The latter is key to laser action.',
      formula: 'R_{stim} = B_{21} \\cdot \\rho(\\nu) \\cdot N_2'
    },
    {
      icon: Activity,
      title: '05 Population Inversion',
      desc: 'To achieve gain, more atoms must be in the excited state (N2) than the ground state (N1). This requires external pumping.',
      formula: 'N_2 > N_1'
    },
    {
      icon: Cpu,
      title: '06 Optical Cavity',
      desc: 'A resonator provides feedback. Light is amplified as it bounces between mirrors, creating a coherent beam.',
      formula: 'G \\cdot R_1 \\cdot R_2 \\ge 1'
    },
    {
      icon: Database,
      title: '07 Optical Comms',
      desc: 'Lasers transmit data via high-speed modulation. Information is encoded into a bit-stream of light pulses.',
      formula: 'f_{mod} \\propto \\frac{1}{\\tau_{pulse}}'
    },
    {
      icon: Target,
      title: '08 Numerical Analysis',
      desc: 'Quantitative evaluation of laser performance, including threshold current, slope efficiency, and beam quality.',
      formula: '\\eta = \\frac{P_{out}}{P_{in} - P_{th}}'
    }
  ];

  return (
    <div className="space-y-24">
      {/* Header Section */}
      <section className="space-y-8">
        <div className="inline-block px-4 py-1.5 bg-lab-surface border border-lab-border text-lab-primary text-[10px] font-black uppercase tracking-[0.5em]">
          KNOWLEDGE_BASE :: CORE_THEORY
        </div>
        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.85] text-white">
          THEORETICAL <br />
          <span className="text-lab-primary italic">FOUNDATIONS</span>
        </h2>
        <p className="text-zinc-500 max-w-3xl text-sm leading-relaxed font-medium uppercase tracking-tight border-l-2 border-lab-border pl-6">
          Laser physics is governed by the interaction of radiation with matter. To master the experiments in this virtual lab, you must understand the transition from individual atomic states to a macroscopic coherent beam.
        </p>
      </section>

      {/* Lab Modules Grid */}
      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {labModules.map((module, i) => (
          <div key={i} className="bg-lab-surface border border-lab-border p-8 space-y-6 hover:border-lab-primary transition-colors group">
            <div className="flex justify-between items-start">
              <module.icon className="w-6 h-6 text-lab-primary" />
              <div className="text-[8px] font-black text-zinc-700 uppercase tracking-widest">MODULE_REF: {module.title.split(' ')[0]}</div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-black text-white uppercase tracking-tighter">{module.title}</h3>
              <p className="text-[11px] text-zinc-500 font-medium leading-relaxed uppercase tracking-tight">
                {module.desc}
              </p>
            </div>

            <div className="pt-4 border-t border-lab-border/30">
              <div className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-3">GOVERNING_EQUATION</div>
              <div className="bg-lab-bg border border-lab-border p-4 flex items-center justify-center text-lab-primary">
                <InlineMath math={module.formula} />
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Einstein's Relation Highlight */}
      <section className="bg-lab-surface border border-lab-border p-12 space-y-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Layers className="w-32 h-32 text-white" />
        </div>
        
        <div className="space-y-4 relative z-10">
          <div className="text-[9px] font-black text-lab-secondary uppercase tracking-[0.3em]">CRITICAL_PRINCIPLE</div>
          <h3 className="text-3xl font-black text-white uppercase tracking-tighter">EINSTEIN'S RELATION</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="bg-lab-bg border border-lab-border p-12 flex items-center justify-center text-4xl text-lab-primary">
            <BlockMath math="R_{stim} = B_{21} \cdot \rho(\nu) \cdot N_2" />
          </div>
          <div className="space-y-6">
            <p className="text-zinc-400 text-sm leading-relaxed font-medium uppercase tracking-tight italic">
              "The rate of stimulated emission is proportional to the radiation density and the number of atoms in the excited state."
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                <div className="w-1 h-1 bg-lab-primary" />
                <span>B21: Einstein Coefficient for Stimulated Emission</span>
              </div>
              <div className="flex items-center gap-3 text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                <div className="w-1 h-1 bg-lab-primary" />
                <span>ρ(ν): Spectral Radiation Density</span>
              </div>
              <div className="flex items-center gap-3 text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                <div className="w-1 h-1 bg-lab-primary" />
                <span>N2: Population of the Upper Energy Level</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <div className="pt-12 flex justify-center">
        <button 
          onClick={onNext}
          className="bg-lab-primary text-black px-16 py-6 font-black uppercase tracking-[0.4em] text-lg hover:bg-white transition-colors"
        >
          BEGIN ATOMIC ANALYSIS →
        </button>
      </div>
    </div>
  );
};

export default TheoryNotes;
