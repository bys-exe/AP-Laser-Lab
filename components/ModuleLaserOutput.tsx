
import React, { useState, useEffect } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ModuleLaserOutput: React.FC = () => {
  const [gain, setGain] = useState(1.5);
  const [threshold, setThreshold] = useState(2.0);
  const [intensity, setIntensity] = useState(0);

  useEffect(() => {
    // If gain exceeds threshold, intensity grows rapidly
    if (gain > threshold) {
      setIntensity(prev => Math.min(100, prev + (gain - threshold) * 5));
    } else {
      setIntensity(prev => Math.max(0, prev - 10));
    }
  }, [gain, threshold]);

  const intensityData = Array.from({ length: 20 }, (_, i) => ({
    x: i,
    y: i < threshold * 5 ? 0 : (i - threshold * 5) * 10
  }));

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 w-full">Laser Cavity & Output</h2>
        
        {/* Optical Cavity Visualization */}
        <div className="relative w-full h-48 bg-gray-100 border-x-8 border-gray-400 rounded-lg flex items-center justify-between px-10 overflow-hidden">
          <div className="absolute inset-0 bg-blue-50 opacity-20"></div>
          
          {/* Mirrors */}
          <div className="absolute left-0 top-0 bottom-0 w-4 bg-gray-500 flex items-center justify-center text-[10px] text-white font-bold leading-tight">
             <div className="rotate-90">100% REFLECTOR</div>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-4 bg-gray-400 flex items-center justify-center text-[10px] text-white font-bold leading-tight">
             <div className="rotate-90 text-gray-700">95% REFLECTOR</div>
          </div>

          {/* Gain Medium Label */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 text-xs font-bold text-gray-400 uppercase tracking-widest">
            Active Gain Medium
          </div>

          {/* Photons (Simulated with div pulses) - Changed to Yellow */}
          <div className="w-full h-full relative flex items-center">
            {intensity > 0 && Array.from({ length: 15 }).map((_, i) => (
              <div 
                key={i}
                className="absolute h-1 bg-yellow-400 shadow-[0_0_10px_yellow] animate-[laserBounce_2s_infinite]"
                style={{ 
                  left: `${Math.random() * 100}%`,
                  width: `${intensity / 2}px`,
                  top: `${20 + Math.random() * 60}%`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              ></div>
            ))}

            {/* Final Output Beam */}
            {intensity > 10 && (
              <div 
                className="absolute right-0 h-4 bg-red-600 shadow-[0_0_20px_rgba(255,0,0,0.8)] rounded-full transition-all duration-300"
                style={{ width: '150px', transform: `translateX(150px)`, opacity: intensity / 100 }}
              ></div>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 w-full mt-10">
          <div className="space-y-6">
            <div className="space-y-4">
              <label className="text-sm font-bold text-gray-600 block">Round-Trip Gain (Power Input)</label>
              <input 
                type="range" 
                min="0.5" 
                max="5" 
                step="0.1"
                value={gain} 
                onChange={(e) => setGain(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Low Gain</span>
                <span className="text-red-600 font-bold">{gain.toFixed(1)}</span>
                <span>High Gain</span>
              </div>
            </div>

            <div className={`p-4 rounded-xl border-2 transition-all ${gain >= threshold ? 'bg-red-50 border-red-500' : 'bg-gray-50 border-gray-200'}`}>
              <h3 className="font-bold text-gray-800 mb-1">Threshold Condition</h3>
              <p className="text-sm text-gray-600">
                Lasing starts when <strong>Gain &ge; Losses</strong>.
              </p>
              {gain >= threshold ? (
                <p className="text-xs text-red-600 font-bold mt-2 uppercase tracking-tight">OSCILLATION SUSTAINED! Output is generating.</p>
              ) : (
                <p className="text-xs text-gray-400 mt-2 uppercase tracking-tight">Below Threshold. Spontaneous emission dominates.</p>
              )}
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm h-[250px] border border-gray-100">
             <h3 className="text-xs font-bold text-gray-400 mb-2 uppercase">Output Intensity Curve</h3>
             <ResponsiveContainer width="100%" height="80%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" dataKey="x" name="Pump Power" label={{ value: 'Pump Power', position: 'bottom', offset: 0 }} hide />
                  <YAxis type="number" dataKey="y" name="Intensity" label={{ value: 'Intensity', angle: -90, position: 'insideLeft' }} />
                  <ZAxis type="number" range={[100, 100]} />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Scatter name="Laser Output" data={intensityData} fill="#dc2626" line shape="circle" />
                </ScatterChart>
             </ResponsiveContainer>
             <div className="text-center text-[10px] text-gray-400 mt-2">Note: The "knee" in the graph is the threshold point.</div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes laserBounce {
          0% { left: 0; width: 20px; }
          50% { left: calc(100% - 20px); width: 40px; }
          100% { left: 0; width: 20px; }
        }
      `}</style>
    </div>
  );
};

export default ModuleLaserOutput;
