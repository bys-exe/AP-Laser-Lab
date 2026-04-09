
import React, { useState, useEffect, useRef } from 'react';

interface PhotonStreak {
  x: number;
  y: number;
  length: number;
  opacity: number;
  speed: number;
}

const CavityStage: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [gain, setGain] = useState(1.5);
  const [reflectivity, setReflectivity] = useState(90);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>(null);
  const photonsRef = useRef<PhotonStreak[]>([]);

  const threshold = (100 - reflectivity) / 10 + 1;
  const isLasing = gain >= threshold;

  useEffect(() => {
    if (!isLasing) {
      photonsRef.current = [];
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const numPhotons = 400;
    const baseSpeed = 15;
    const cavityWidth = canvas.width;
    const cavityHeight = canvas.height;

    // Initialize photons if empty
    if (photonsRef.current.length === 0) {
      for (let i = 0; i < numPhotons; i++) {
        photonsRef.current.push({
          x: Math.random() * cavityWidth,
          y: (Math.random() - 0.5) * cavityHeight * 0.6 + cavityHeight / 2,
          length: Math.random() * 60 + 20,
          opacity: Math.random() * 0.5 + 0.3,
          speed: baseSpeed * (0.7 + Math.random() * 0.6) * (gain / 2),
        });
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, cavityWidth, cavityHeight);
      ctx.strokeStyle = '#06b6d4'; // cyan-500
      ctx.lineWidth = 1.5;

      photonsRef.current.forEach((photon) => {
        // Update speed based on current gain
        const currentSpeed = baseSpeed * (0.7 + Math.random() * 0.01) * (gain / 2);
        photon.x += currentSpeed;

        if (photon.x > cavityWidth) {
          photon.x = -photon.length;
          photon.y = (Math.random() - 0.5) * cavityHeight * 0.6 + cavityHeight / 2;
        }

        ctx.globalAlpha = photon.opacity;
        ctx.beginPath();
        ctx.moveTo(photon.x, photon.y);
        ctx.lineTo(photon.x - photon.length, photon.y);
        ctx.stroke();
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isLasing, gain]);

  return (
    <div className="space-y-10">
      <header className="flex justify-between items-end border-b border-zinc-800 pb-6">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="bg-zinc-800 text-cyan-500 px-3 py-1 text-[10px] font-bold uppercase tracking-widest border border-zinc-700">
              Stage 06
            </span>
            <div className="h-px w-8 bg-zinc-800"></div>
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Optical Feedback</span>
          </div>
          <h2 className="text-3xl font-bold text-white uppercase tracking-tight">Resonant Cavity</h2>
        </div>
        <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest max-w-[200px] text-right leading-tight">
          The Fabry-Pérot Resonator and Coherent Amplification.
        </p>
      </header>

      <div className="bg-black border border-zinc-800 h-[400px] relative flex items-center justify-center overflow-hidden">
        {/* Mirror 1: High Reflector */}
        <div className="absolute left-10 w-4 h-40 bg-zinc-800 border-l-2 border-zinc-400 flex items-center justify-center z-20">
          <span className="absolute -top-8 text-[9px] font-bold text-zinc-500 uppercase tracking-widest">100% Mirror</span>
        </div>

        {/* Gain Medium Box (Visual Frame) */}
        <div className="w-2/3 h-24 border border-zinc-800/50 relative flex items-center justify-center z-10 pointer-events-none">
           <span className="text-[9px] font-bold text-zinc-800 uppercase tracking-widest">
             Active Gain Medium
           </span>
        </div>

        {/* Particle Canvas */}
        <canvas 
          ref={canvasRef}
          width={800}
          height={400}
          className={`absolute inset-0 w-full h-full z-0 transition-opacity duration-500 ${isLasing ? 'opacity-100' : 'opacity-0'}`}
        />

        {/* Mirror 2: Output Coupler */}
        <div className="absolute right-10 w-4 h-40 bg-zinc-800 border-r-2 border-cyan-500/50 flex items-center justify-center z-20">
          <span className="absolute -top-8 text-[9px] font-bold text-cyan-500/60 uppercase tracking-widest">Output Coupler</span>
        </div>

        {/* Laser Output Beam (Static) */}
        {isLasing && (
          <div className="absolute left-[calc(100%-10px)] w-[1000px] h-2 bg-cyan-500 z-30" />
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-zinc-900 p-8 border border-zinc-800 space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Optical Gain Coefficient (g)</span>
                <span className={`text-2xl font-mono font-bold ${isLasing ? 'text-cyan-500' : 'text-zinc-700'}`}>{gain.toFixed(1)}x</span>
              </div>
              <div className="p-4 bg-black border border-zinc-800">
                <input 
                  type="range" 
                  min="0.5" 
                  max="5" 
                  step="0.1" 
                  value={gain} 
                  onChange={(e) => setGain(Number(e.target.value))} 
                  className="w-full h-1 bg-zinc-800 appearance-none cursor-pointer accent-cyan-500"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Mirror Reflectivity (%)</span>
                <span className="text-white font-mono font-bold text-2xl">{reflectivity}%</span>
              </div>
              <div className="p-4 bg-black border border-zinc-800">
                <input 
                  type="range" 
                  min="50" 
                  max="99" 
                  value={reflectivity} 
                  onChange={(e) => setReflectivity(Number(e.target.value))} 
                  className="w-full h-1 bg-zinc-800 appearance-none cursor-pointer accent-cyan-500"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="bg-zinc-900 p-8 border border-zinc-800 space-y-6">
             <h3 className="text-[10px] font-bold text-cyan-500 uppercase tracking-widest flex items-center gap-3">
               <div className="w-1.5 h-1.5 bg-cyan-500"></div>
               Feedback Mechanism
             </h3>
             <p className="text-[13px] text-zinc-400 leading-tight font-bold">
               The optical resonator mirrors provide feedback by reflecting photons back into the gain medium multiple times. At the 'threshold', the gain matches losses, resulting in a stable output beam.
             </p>
             <div className="p-6 bg-black border border-zinc-800 space-y-2 text-center">
                <p className="text-[9px] text-zinc-600 uppercase font-bold tracking-widest">Resonator Status</p>
                <p className={`font-bold uppercase text-[12px] ${isLasing ? 'text-cyan-500' : 'text-zinc-700'}`}>
                   {isLasing ? 'Stimulated Oscillation Sustained' : 'Below Lasing Threshold'}
                </p>
             </div>
          </div>

          <button 
            onClick={onNext} 
            className="w-full bg-white text-black font-bold py-6 text-xl uppercase tracking-tighter hover:bg-cyan-500 active:bg-cyan-600"
          >
            Continue →
          </button>
        </div>
      </div>
    </div>
  );
};

export default CavityStage;
