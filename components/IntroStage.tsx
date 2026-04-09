
import React from 'react';

const IntroStage: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <div className="flex items-center gap-4">
          <span className="bg-zinc-800 text-cyan-500 px-3 py-1 text-[10px] font-bold uppercase tracking-widest border border-zinc-700">
            Stage 01
          </span>
          <div className="h-px w-8 bg-zinc-800"></div>
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Orientation</span>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-4xl md:text-6xl font-bold text-white leading-none tracking-tighter uppercase">
            Fundamentals <br/>
            <span className="text-cyan-500">of Laser</span>
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl leading-tight font-bold">
            LASER: Light Amplification by Stimulated Emission of Radiation.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-zinc-900 border border-zinc-800 p-8 space-y-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-3 uppercase tracking-tight">
            <div className="w-1 h-6 bg-cyan-500"></div>
            Core Characteristics
          </h3>
          <ul className="space-y-4">
            {[
              { id: '1', title: 'Monochromaticity', desc: 'Single wavelength (color) emission.' },
              { id: '2', title: 'Coherence', desc: 'Photons are in phase in time and space.' },
              { id: '3', title: 'Directionality', desc: 'Extremely low beam divergence.' }
            ].map((item) => (
              <li key={item.id} className="flex gap-4">
                <div className="w-8 h-8 bg-zinc-950 flex items-center justify-center text-cyan-500 shrink-0 border border-zinc-800 font-bold text-[10px]">
                  {item.id}
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-zinc-100 uppercase tracking-wide">{item.title}</p>
                  <p className="text-[12px] text-zinc-500 leading-tight">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-8 space-y-6 flex flex-col">
          <h3 className="text-xl font-bold text-white flex items-center gap-3 uppercase tracking-tight">
            <div className="w-1 h-6 bg-zinc-700"></div>
            Beam Comparison
          </h3>
          
          <div className="space-y-6 flex-1 flex flex-col justify-center">
            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Incoherent (Standard Bulb)</p>
                <span className="text-[9px] font-bold text-zinc-600">Random Phase</span>
              </div>
              <div className="h-12 bg-zinc-950 border border-zinc-800 flex items-center justify-center gap-2">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="w-1 bg-zinc-800" style={{ height: `${10 + Math.random() * 20}px` }} />
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <p className="text-[10px] font-bold text-cyan-500 uppercase tracking-widest">Coherent (Laser Source)</p>
                <span className="text-[9px] font-bold text-cyan-900">Synchronized</span>
              </div>
              <div className="h-12 bg-zinc-950 border border-cyan-900/30 flex items-center justify-center">
                 <div className="w-[90%] h-[2px] bg-cyan-500" />
              </div>
            </div>
          </div>
          
          <p className="text-[11px] text-zinc-600 leading-tight font-bold pt-4 border-t border-zinc-800">
            Laser beams maintain phase and direction over the path.
          </p>
        </div>
      </div>

      <div className="pt-8 flex justify-start">
        <button 
          onClick={onNext}
          className="bg-white text-black font-bold px-10 py-5 text-xl uppercase tracking-tighter hover:bg-cyan-500 active:bg-cyan-600"
        >
          Access Theory Library →
        </button>
      </div>
    </div>
  );
};

export default IntroStage;
