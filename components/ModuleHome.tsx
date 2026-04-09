
import React from 'react';

const ModuleHome: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      <section className="text-center space-y-4">
        <h1 className="text-5xl font-extrabold text-blue-900 tracking-tight">
          Welcome to <span className="text-red-600">Laser</span> Virtual Lab
        </h1>
        <p className="text-xl text-gray-600">
          Understanding <span className="font-semibold">L</span>ight <span className="font-semibold">A</span>mplification by <span className="font-semibold">S</span>timulated <span className="font-semibold">E</span>mission of <span className="font-semibold">R</span>adiation.
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">What is a LASER?</h2>
          <p className="text-gray-600 leading-relaxed">
            A laser is a device that emits light through a process of optical amplification based on the stimulated emission of electromagnetic radiation. Unlike conventional light sources, laser light is coherent, monochromatic, and highly directional.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
            <h3 className="font-bold text-blue-800">Key Properties:</h3>
            <ul className="list-disc list-inside text-sm text-blue-700 mt-2 space-y-1">
              <li>Monochromaticity (Single wavelength)</li>
              <li>Coherence (Phase correlation)</li>
              <li>Directionality (Negligible divergence)</li>
              <li>Brightness (High intensity)</li>
            </ul>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">Applications</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-red-50 rounded text-center">
              <span className="block text-2xl mb-1">🏥</span>
              <span className="text-xs font-semibold text-red-800 uppercase">Medical Surgery</span>
            </div>
            <div className="p-3 bg-green-50 rounded text-center">
              <span className="block text-2xl mb-1">🛰️</span>
              <span className="text-xs font-semibold text-green-800 uppercase">Communication</span>
            </div>
            <div className="p-3 bg-purple-50 rounded text-center">
              <span className="block text-2xl mb-1">🏗️</span>
              <span className="text-xs font-semibold text-purple-800 uppercase">Industry Cutting</span>
            </div>
            <div className="p-3 bg-yellow-50 rounded text-center">
              <span className="block text-2xl mb-1">💿</span>
              <span className="text-xs font-semibold text-yellow-800 uppercase">Data Storage</span>
            </div>
          </div>
        </div>
      </div>

      <section className="bg-gray-900 text-white p-8 rounded-2xl shadow-xl overflow-hidden relative">
        <div className="relative z-10 space-y-4">
          <h2 className="text-2xl font-bold">How to use this Virtual Lab?</h2>
          <ol className="list-decimal list-inside space-y-3 text-gray-300">
            <li>Navigate through the modules in sequence (Energy Levels → Pumping → Emission → Laser Output).</li>
            <li>Interact with the simulations using sliders and toggles.</li>
            <li>Watch the real-time graphs to see how population dynamics change.</li>
            <li>Use the <span className="text-blue-400 font-bold">Chatbot Assistant</span> at any time to ask for explanations or numerical practice.</li>
            <li>Test your knowledge in the <span className="text-green-400 font-bold">Quiz / Viva Mode</span>.</li>
          </ol>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-600 opacity-10 rounded-full blur-3xl -mr-20 -mt-20"></div>
      </section>
    </div>
  );
};

export default ModuleHome;
