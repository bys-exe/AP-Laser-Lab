
import React, { useState, useEffect, useRef } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface PhotonStreak {
  x: number;
  y: number;
  length: number;
  opacity: number;
  speed: number;
}

const ModuleLaserOutput: React.FC = () => {
  const [gain, setGain] = useState(1.5);
  const [threshold, setThreshold] = useState(2.0);
  const [intensity, setIntensity] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>(null);
  const photonsRef = useRef<PhotonStreak[]>([]);

  useEffect(() => {
    if (gain > threshold) {
      setIntensity(prev => Math.min(100, prev + (gain - threshold) * 5));
    } else {
      setIntensity(prev => Math.max(0, prev - 10));
    }
  }, [gain, threshold]);

  useEffect(() => {
    if (intensity <= 0) {
      photonsRef.current = [];
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const numPhotons = 300;
    const baseSpeed = 12;
    const cavityWidth = canvas.width;
    const cavityHeight = canvas.height;

    if (photonsRef.current.length === 0) {
      for (let i = 0; i < numPhotons; i++) {
        photonsRef.current.push({
          x: Math.random() * cavityWidth,
          y: (Math.random() - 0.5) * cavityHeight * 0.5 + cavityHeight / 2,
          length: Math.random() * 50 + 15,
          opacity: Math.random() * 0.4 + 0.2,
          speed: baseSpeed * (0.8 + Math.random() * 0.4) * (gain / 1.5),
        });
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, cavityWidth, cavityHeight);
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 1;

      photonsRef.current.forEach((photon) => {
        const currentSpeed = baseSpeed * (0.8 + Math.random() * 0.01) * (gain / 1.5);
        photon.x += currentSpeed;

        if (photon.x > cavityWidth) {
          photon.x = -photon.length;
          photon.y = (Math.random() - 0.5) * cavityHeight * 0.5 + cavityHeight / 2;
        }

        ctx.globalAlpha = photon.opacity * (intensity / 100);
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
  }, [intensity, gain]);

  const intensityData = Array.from({ length: 20 }, (_, i) => ({
    x: i,
    y: i < threshold * 5 ? 0 : (i - threshold * 5) * 10
  }));

  return (
    <div className="space-y-10">
      <header className="flex justify-between items-center bg-zinc-900 p-8 border border-zinc-800">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-white uppercase tracking-tight">Laser Cavity Dynamics</h2>
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Optical Oscillation Analysis</p>
        </div>
        <div className={`px-6 py-2 border text-[10px] font-bold uppercase tracking-widest ${
          intensity > 0 
            ? 'bg-black border-cyan-500 text-cyan-500' 
            : 'bg-black border-zinc-800 text-zinc-500'
        }`}>
          {intensity > 0 ? 'Lasing Active' : 'Below Threshold'}
        </div>
      </header>

      <div className="bg-zinc-900 border border-zinc-800 p-12 space-y-10 overflow-hidden relative">
        {/* Optical Cavity Visualization */}
        <div className="relative w-full h-64 bg-black border border-zinc-800 flex items-center justify-between px-16 overflow-hidden">
          {/* Mirrors */}
          <div className="absolute left-0 top-0 bottom-0 w-6 bg-zinc-800 flex items-center justify-center text-[9px] text-zinc-500 font-bold leading-tight border-r border-zinc-700 z-20">
             <div className="rotate-90 whitespace-nowrap">100% REFLECTOR</div>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-6 bg-zinc-800 flex items-center justify-center text-[9px] text-zinc-500 font-bold leading-tight border-l border-zinc-700 z-20">
             <div className="rotate-90 whitespace-nowrap">95% REFLECTOR</div>
          </div>

          <div className="absolute top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-zinc-800 uppercase tracking-widest z-10">
            Active Gain Medium
          </div>

          {/* Particle Canvas */}
          <canvas 
            ref={canvasRef}
            width={800}
            height={256}
            className="absolute inset-0 w-full h-full z-0"
          />

          {/* Final Output Beam */}
          {intensity > 10 && (
            <div 
              className="absolute right-0 h-4 bg-cyan-500 z-30"
              style={{ 
                width: '1000px',
                transform: 'translateX(1000px)',
                opacity: intensity / 100
              }}
            />
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Round-Trip Gain</span>
                <span className="text-cyan-500 font-mono font-bold text-xl">{gain.toFixed(1)}</span>
              </div>
              <div className="p-6 bg-black border border-zinc-800">
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

            <div className={`p-8 border ${gain >= threshold ? 'border-cyan-500 bg-black' : 'border-zinc-800 bg-black'} space-y-4`}>
              <h3 className="text-[10px] font-bold text-white uppercase tracking-widest">Threshold Condition</h3>
              <p className="text-[13px] text-zinc-400 leading-tight font-bold">
                Lasing starts when <span className="text-white">Gain &ge; Losses</span>.
              </p>
              {gain >= threshold ? (
                <p className="text-[10px] text-cyan-500 font-bold uppercase tracking-widest pt-2">
                  Oscillation Sustained • Output Active
                </p>
              ) : (
                <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest pt-2">
                  Below Threshold • Spontaneous Dominant
                </p>
              )}
            </div>
          </div>

          <div className="lg:col-span-7 bg-black p-8 border border-zinc-800 h-[350px]">
             <h3 className="text-[10px] font-bold text-zinc-500 mb-6 uppercase tracking-widest text-center">Output Intensity Profile</h3>
             <ResponsiveContainer width="100%" height="80%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                  <XAxis type="number" dataKey="x" hide />
                  <YAxis type="number" dataKey="y" stroke="#52525b" fontSize={10} />
                  <ZAxis type="number" range={[100, 100]} />
                  <Tooltip 
                    cursor={{ strokeDasharray: '3 3' }}
                    contentStyle={{ backgroundColor: '#000', border: '1px solid #27272a' }}
                  />
                  <Scatter name="Laser Output" data={intensityData} fill="#06b6d4" line strokeWidth={2} shape="circle" isAnimationActive={false} />
                </ScatterChart>
             </ResponsiveContainer>
             <p className="text-center text-[10px] text-zinc-600 mt-4 font-bold italic">
               The "knee" in the graph represents the critical threshold point.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleLaserOutput;
