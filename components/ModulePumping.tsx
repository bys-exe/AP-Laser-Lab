
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
        const pumpingRate = (pumpPower / 100) * last.N0;
        const decayRate = 0.1 * last.N1;
        const deltaN1 = pumpingRate - decayRate;
        const newN1 = Math.max(0, Math.min(100, last.N1 + deltaN1));
        const newN0 = 100 - newN1;
        const newData = [...prev, { time: time, N0: newN0, N1: newN1 }];
        return newData.slice(-50);
      });
    }, 200);
    return () => clearInterval(interval);
  }, [time, pumpPower]);

  const isInversion = data.length > 0 && data[data.length - 1].N1 > data[data.length - 1].N0;

  return (
    <div className="space-y-10">
      <header className="flex justify-between items-center bg-zinc-900 p-8 border border-zinc-800">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-white uppercase tracking-tight">Population Dynamics</h2>
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Non-Equilibrium State Analysis</p>
        </div>
        <div className={`px-6 py-2 border text-[10px] font-bold uppercase tracking-widest ${
          isInversion 
            ? 'bg-black border-cyan-500 text-cyan-500' 
            : 'bg-black border-zinc-800 text-zinc-500'
        }`}>
          {isInversion ? 'Inversion Achieved' : 'Normal Distribution'}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-zinc-900 p-8 border border-zinc-800 space-y-6">
            <div className="flex justify-between items-center">
               <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Pump Power (External Energy Input)</span>
               <span className="text-white font-mono font-bold text-xl">{pumpPower}%</span>
            </div>
            <div className="p-4 bg-black border border-zinc-800">
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={pumpPower} 
                onChange={(e) => setPumpPower(Number(e.target.value))}
                className="w-full h-1 bg-zinc-800 appearance-none cursor-pointer accent-cyan-500"
              />
            </div>
          </div>

          <div className="bg-zinc-900 p-8 border border-zinc-800 h-[400px]">
            <h3 className="text-[10px] font-bold text-zinc-500 mb-6 uppercase tracking-widest text-center">Real-Time Population Telemetry</h3>
            <ResponsiveContainer width="100%" height="85%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272a" />
                <XAxis dataKey="time" hide />
                <YAxis domain={[0, 100]} stroke="#52525b" fontSize={10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#000', border: '1px solid #27272a' }}
                  itemStyle={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' }}
                />
                <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' }}/>
                <Line type="monotone" dataKey="N0" stroke="#52525b" name="Ground (N₀)" strokeWidth={2} dot={false} isAnimationActive={false} />
                <Line type="monotone" dataKey="N1" stroke="#06b6d4" name="Metastable (N₁)" strokeWidth={2} dot={false} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="bg-zinc-900 p-8 border border-zinc-800 space-y-8 h-full">
            <h3 className="text-[10px] font-bold text-cyan-500 uppercase tracking-widest flex items-center gap-2">
              <div className="w-1 h-1 bg-cyan-500"></div>
              Physics Deep-Dive
            </h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">The Condition</p>
                <p className="text-[13px] text-zinc-400 leading-tight font-bold">
                  Population Inversion occurs when <span className="text-white">N₁ &gt; N₀</span>. This is a non-equilibrium state required for light amplification.
                </p>
              </div>
              <div className="p-6 bg-black border border-zinc-800 space-y-4">
                <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest text-center">Boltzmann Distribution</p>
                <div className="text-center font-mono text-cyan-500 text-sm">
                  N₁/N₀ = e<sup>-ΔE/kT</sup>
                </div>
                <p className="text-[10px] text-zinc-500 leading-tight text-center italic font-bold">
                  *Normally N₁ &lt;&lt; N₀. External pumping is required to reverse this natural state.
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
