
import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Target, Cpu, Zap, Activity, Database, Layers } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

import { LabStage } from '../types.ts';

const TheoryNotes: React.FC<{ onNext: () => void; onSelectStage: (stage: LabStage) => void }> = ({ onNext, onSelectStage }) => {
  const labModules = [
    {
      icon: Zap,
      title: '03 Energy Systems',
      desc: 'Atoms exist in discrete energy levels. Transitions between these levels involve the absorption or emission of photons with energy E = hν.',
      formula: 'E_2 - E_1 = h\\nu',
      stage: LabStage.ATOMIC_STATES
    },
    {
      icon: Layers,
      title: '04 Einstein Processes',
      desc: 'Three fundamental interactions: Absorption, Spontaneous Emission, and Stimulated Emission. The latter is key to laser action.',
      formula: 'R_{stim} = B_{21} \\cdot \\rho(\\nu) \\cdot N_2',
      stage: LabStage.INTERACTIONS
    },
    {
      icon: Activity,
      title: '05 Population Inversion',
      desc: 'To achieve gain, more atoms must be in the excited state (N2) than the ground state (N1). This requires external pumping.',
      formula: 'N_2 > N_1',
      stage: LabStage.POPULATION
    },
    {
      icon: Cpu,
      title: '06 Optical Cavity',
      desc: 'A resonator provides feedback. Light is amplified as it bounces between mirrors, creating a coherent beam.',
      formula: 'G \\cdot R_1 \\cdot R_2 \\ge 1',
      stage: LabStage.CAVITY
    },
    {
      icon: Database,
      title: '07 Optical Comms',
      desc: 'Lasers transmit data via high-speed modulation. Information is encoded into a bit-stream of light pulses.',
      formula: 'f_{mod} \\propto \\frac{1}{\\tau_{pulse}}',
      stage: LabStage.BIT_STREAM
    },
    {
      icon: Target,
      title: '08 Numerical Analysis',
      desc: 'Quantitative evaluation of laser performance, including threshold current, slope efficiency, and beam quality.',
      formula: '\\eta = \\frac{P_{out}}{P_{in} - P_{th}}',
      stage: LabStage.PRACTICE
    }
  ];

  return (
    <div className="space-y-16 md:space-y-24">
      {/* Header Section */}
      <section className="space-y-6 md:space-y-8">
        <div className="inline-block px-4 py-1.5 bg-lab-surface border border-lab-border text-lab-primary text-[8px] md:text-[10px] font-black uppercase tracking-[0.5em]">
          KNOWLEDGE_BASE :: CORE_THEORY
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.85] text-[var(--text-main)]">
          THEORETICAL <br />
          <span className="text-lab-primary italic">FOUNDATIONS</span>
        </h2>
        <p className="text-[var(--text-muted)] max-w-3xl text-xs md:text-sm leading-relaxed font-medium tracking-tight border-l-2 border-lab-border pl-4 md:pl-6">
          Laser physics is governed by the interaction of radiation with matter. To master the experiments in this virtual lab, you must understand the transition from individual atomic states to a macroscopic coherent beam.
        </p>
      </section>

      {/* Lab Modules Grid */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {labModules.map((module, i) => (
          <div 
            key={i} 
            onClick={() => onSelectStage(module.stage)}
            className="bg-lab-surface border border-lab-border p-6 md:p-8 space-y-4 md:space-y-6 hover:border-lab-primary transition-colors group cursor-pointer"
          >
            <div className="flex justify-between items-start">
              <module.icon className="w-5 h-5 md:w-6 md:h-6 text-lab-primary" />
              <div className="text-[7px] md:text-[8px] font-black text-[var(--text-muted)] uppercase tracking-widest">MODULE_REF: {module.title.split(' ')[0]}</div>
            </div>
            
            <div className="space-y-3 md:space-y-4">
              <h3 className="text-base md:text-lg font-black text-[var(--text-main)] uppercase tracking-tighter">{module.title}</h3>
              <p className="text-xs md:text-sm text-[var(--text-muted)] font-medium leading-relaxed tracking-tight">
                {module.desc}
              </p>
            </div>

            <div className="pt-4 border-t border-lab-border/30">
              <div className="text-[8px] md:text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-2 md:mb-3">GOVERNING_EQUATION</div>
              <div className="bg-lab-bg border border-lab-border p-3 md:p-4 flex items-center justify-center text-lab-primary overflow-x-auto">
                <InlineMath math={module.formula} />
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Einstein's Relation Highlight */}
      <section className="bg-lab-surface border border-lab-border p-6 md:p-12 space-y-8 md:space-y-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 md:p-8 opacity-5">
          <Layers className="w-24 h-24 md:w-32 md:h-32 text-[var(--text-main)]" />
        </div>
        
        <div className="space-y-3 md:space-y-4 relative z-10">
          <div className="text-[8px] md:text-[9px] font-black text-lab-secondary uppercase tracking-[0.3em]">CRITICAL_PRINCIPLE</div>
          <h3 className="text-2xl md:text-3xl font-black text-[var(--text-main)] uppercase tracking-tighter">EINSTEIN'S RELATION</h3>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center relative z-10">
          <div className="bg-lab-bg border border-lab-border p-6 md:p-12 flex items-center justify-center text-2xl md:text-4xl text-lab-primary overflow-x-auto">
            <BlockMath math="R_{stim} = B_{21} \cdot \rho(\nu) \cdot N_2" />
          </div>
          <div className="space-y-4 md:space-y-6">
            <p className="text-[var(--text-muted)] text-xs md:text-sm leading-relaxed font-medium uppercase tracking-tight italic">
              "The rate of stimulated emission is proportional to the radiation density and the number of atoms in the excited state."
            </p>
            <div className="space-y-2">
              {[
                { label: 'B21: Einstein Coefficient for Stimulated Emission' },
                { label: 'ρ(ν): Spectral Radiation Density' },
                { label: 'N2: Population of the Upper Energy Level' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-[8px] md:text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">
                  <div className="w-1 h-1 bg-lab-primary shrink-0" />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <div className="pt-8 md:pt-12 flex justify-center">
        <button 
          onClick={onNext}
          className="bg-lab-primary text-black px-10 md:px-16 py-4 md:py-6 font-black uppercase tracking-[0.4em] text-sm md:text-lg hover:bg-white transition-colors w-full md:w-auto"
        >
          BEGIN ATOMIC ANALYSIS →
        </button>
      </div>
    </div>
  );
};

export default TheoryNotes;
