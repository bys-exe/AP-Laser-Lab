
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const ModulePumping: React.FC = () => {
  const [pumpPower, setPumpPower] = useState(20);
  const [data, setData] = useState<{ time: number, N0: number, N1: number }[]>([]);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => prev + 1);
      setData(prev => {
        const last = prev.length > 0 ? prev[prev.length - 1] : { N0: 100, N1: 0 };
        
        // Simplified population dynamics
        // Rate of pumping proportional to pumpPower * N0
        // Rate of decay proportional to N1
        const pumpingRate = (pumpPower / 100) * last.N0;
        const decayRate = 0.1 * last.N1;
        
        const deltaN1 = pumpingRate - decayRate;
        const newN1 = Math.max(0, Math.min(100, last.N1 + deltaN1));
        const newN0 = 100 - newN1;

        const newData = [...prev, { time: time, N0: newN0, N1: newN1 }];
        return newData.slice(-50); // Keep last 50 points
      });
    }, 200);

    return () => clearInterval(interval);
  }, [time, pumpPower]);

  const isInversion = data.length > 0 && data[data.length - 1].N1 > data[data.length - 1].N0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Pumping & Population Inversion</h2>
          <div className={`px-4 py-1 rounded-full text-sm font-bold uppercase ${isInversion ? 'bg-green-100 text-green-700 animate-pulse' : 'bg-red-100 text-red-700'}`}>
            {isInversion ? 'Population Inversion Achieved!' : 'Normal Distribution'}
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-600 block">Pump Power (External Energy Input)</label>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={pumpPower} 
            onChange={(e) => setPumpPower(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-xs text-gray-400">
            <span>Minimum (0)</span>
            <span>Current: {pumpPower}%</span>
            <span>Maximum (100)</span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white p-4 rounded-xl shadow-sm h-[350px]">
          <h3 className="text-sm font-bold text-gray-500 mb-4 uppercase">Population vs Time</h3>
          <ResponsiveContainer width="100%" height="90%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="time" hide />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend verticalAlign="top" height={36}/>
              <Line type="monotone" dataKey="N0" stroke="#3b82f6" name="Ground State (N0)" strokeWidth={2} dot={false} isAnimationActive={false} />
              <Line type="monotone" dataKey="N1" stroke="#ef4444" name="Metastable State (N1)" strokeWidth={2} dot={false} isAnimationActive={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-4">
          <div className="bg-blue-900 text-white p-5 rounded-xl shadow-lg h-full">
            <h3 className="font-bold mb-3 border-b border-blue-800 pb-2 text-blue-300 uppercase text-xs tracking-widest">Physics Explained</h3>
            <div className="space-y-4 text-sm">
              <p>
                <strong className="text-blue-200">Population Inversion:</strong> When the number of atoms in the higher energy level (N1) exceeds the number in the lower level (N0).
              </p>
              <p>
                <strong className="text-blue-200">The Condition:</strong> N1 &gt; N0. This is a non-equilibrium state required for light amplification.
              </p>
              <div className="bg-blue-800 p-3 rounded-lg border border-blue-700">
                <p className="text-xs font-mono">
                  Boltzman Dist: <br/>
                  N1/N0 = exp(-ΔE/kT)
                </p>
                <p className="mt-2 text-[10px] text-blue-400">
                  *Normally N1 is much less than N0. We need Pumping to reverse this!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModulePumping;
