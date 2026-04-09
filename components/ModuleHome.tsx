
import React from 'react';

const ModuleHome: React.FC = () => {
  return (
    <div className="space-y-16">
      <header className="text-center space-y-6">
        <div className="inline-flex items-center gap-3 bg-zinc-800 text-cyan-500 px-6 py-2 text-[10px] font-bold uppercase tracking-widest border border-zinc-700 mb-4">
          <div className="w-1.5 h-1.5 bg-cyan-500"></div>
          Virtual Research Environment
        </div>
        <h1 className="text-6xl font-bold text-white tracking-tight uppercase">
          AP Laser <span className="text-cyan-500">Lab</span>
        </h1>
        <p className="text-xl text-zinc-400 max-w-2xl mx-auto font-bold leading-tight">
          Exploring <span className="text-white">L</span>ight <span className="text-white">A</span>mplification by <span className="text-white">S</span>timulated <span className="text-white">E</span>mission of <span className="text-white">R</span>adiation.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-zinc-900 p-10 border border-zinc-800 space-y-8">
          <h2 className="text-2xl font-bold text-white uppercase tracking-tight">The Physics of Coherence</h2>
          <p className="text-zinc-400 leading-tight text-[15px] font-bold">
            A laser is a device that emits light through a process of optical amplification based on the stimulated emission of electromagnetic radiation. Unlike conventional light sources, laser light is coherent, monochromatic, and highly directional.
          </p>
          <div className="p-8 bg-black border border-zinc-800 space-y-4">
            <h3 className="text-[10px] font-bold text-cyan-500 uppercase tracking-widest">Core Properties:</h3>
            <div className="grid grid-cols-2 gap-4">
              {['Monochromaticity', 'Spatial Coherence', 'Directionality', 'High Brightness'].map((prop, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-1 h-1 bg-cyan-500"></div>
                  <span className="text-xs font-bold text-zinc-300">{prop}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 p-10 border border-zinc-800 space-y-8">
          <h2 className="text-2xl font-bold text-white uppercase tracking-tight">Industrial Impact</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: "🏥", label: "Medical", desc: "Precision Surgery" },
              { icon: "🛰️", label: "Telecom", desc: "Fiber Optics" },
              { icon: "🏗️", label: "Industry", desc: "Laser Cutting" },
              { icon: "💿", label: "Storage", desc: "Optical Data" }
            ].map((app, i) => (
              <div key={i} className="p-6 bg-black border border-zinc-800 hover:border-cyan-500">
                <span className="text-3xl block mb-3">{app.icon}</span>
                <span className="block text-[10px] font-bold text-cyan-500 uppercase tracking-widest mb-1">{app.label}</span>
                <span className="text-xs font-bold text-zinc-400">{app.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="bg-zinc-900 border border-zinc-800 p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12">
           <div className="w-16 h-16 border border-zinc-800 flex items-center justify-center text-zinc-800 font-bold text-3xl">
             ?
           </div>
        </div>
        <div className="relative z-10 space-y-8">
          <h2 className="text-2xl font-bold text-white uppercase tracking-tight">Laboratory Protocol</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              "Navigate through modules in sequence (Energy → Pumping → Emission).",
              "Interact with real-time simulations using precision controls.",
              "Monitor population dynamics via integrated telemetry graphs.",
              "Consult the AI Research Assistant for theoretical deep-dives.",
              "Validate your findings in the Final Assessment (Viva Voce)."
            ].map((step, i) => (
              <div key={i} className="flex gap-6">
                <span className="text-cyan-500 font-bold text-xl opacity-50">0{i+1}</span>
                <p className="text-zinc-400 text-sm font-bold leading-tight">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ModuleHome;
