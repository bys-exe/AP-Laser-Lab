
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const BitStreamLab: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [text, setText] = useState('HI');
  const [pulseWidth, setPulseWidth] = useState(50); // ms
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [binaryStream, setBinaryStream] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [receivedText, setReceivedText] = useState('');
  const [errorRate, setErrorRate] = useState(0);

  const binaryData = useMemo(() => {
    return text.split('').map(char => {
      return char.charCodeAt(0).toString(2).padStart(8, '0');
    }).join('');
  }, [text]);

  const transmit = () => {
    if (isTransmitting) return;
    setIsTransmitting(true);
    setReceivedText('');
    setCurrentIndex(0);
    setErrorRate(0);
    
    const bits = binaryData.split('');
    setBinaryStream(bits);

    let i = 0;
    const interval = setInterval(() => {
      if (i >= bits.length) {
        clearInterval(interval);
        setIsTransmitting(false);
        // Decode at the end
        const chars = [];
        for (let j = 0; j < bits.length; j += 8) {
          const byte = bits.slice(j, j + 8).join('');
          // Simulate error if pulse width is too low
          const shouldError = pulseWidth < 20 && Math.random() > 0.5;
          if (shouldError) {
            chars.push('?');
          } else {
            chars.push(String.fromCharCode(parseInt(byte, 2)));
          }
        }
        setReceivedText(chars.join(''));
        return;
      }
      setCurrentIndex(i);
      i++;
    }, pulseWidth);
  };

  useEffect(() => {
    if (pulseWidth < 20) {
      setErrorRate(Math.floor((20 - pulseWidth) * 5));
    } else {
      setErrorRate(0);
    }
  }, [pulseWidth]);

  return (
    <div className="space-y-8 md:space-y-12 font-mono">
      <header className="space-y-2 border-b border-lab-border pb-6 md:pb-8">
        <h2 className="text-2xl md:text-4xl font-black text-[var(--text-main)] uppercase tracking-tighter">Experiment 05: Optical Comms</h2>
        <p className="text-[var(--text-muted)] text-[8px] md:text-[10px] font-bold uppercase tracking-[0.4em]">Optical Communications & Intersymbol Interference (ISI)</p>
      </header>

      <div className="bg-lab-surface p-6 md:p-10 border border-lab-border space-y-6 md:space-y-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full" />
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 relative z-10">
          <div className="space-y-4 md:space-y-6">
            <h4 className="text-[9px] md:text-[10px] font-black uppercase text-cyan-500 tracking-[0.3em] flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-cyan-500" />
              Theoretical Background
            </h4>
            <p className="text-xs md:text-sm text-[var(--text-muted)] leading-relaxed font-medium tracking-tight">
              Lasers transmit data via high-speed modulation. Information is encoded into a bit-stream of light pulses. However, as pulses travel, they spread out (disperse). If they spread too much, they overlap with adjacent pulses, causing <span className="text-[var(--text-main)]">Intersymbol Interference (ISI)</span>.
            </p>
          </div>
          <div className="space-y-4 md:space-y-6">
            <h4 className="text-[9px] md:text-[10px] font-black uppercase text-[var(--text-muted)] tracking-[0.3em] flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-lab-border" />
              Experiment Aim & Procedure
            </h4>
            <p className="text-xs md:text-sm text-[var(--text-muted)] font-medium tracking-tight">
              <span className="text-[var(--text-main)]">Aim:</span> To explore the principles of optical data transmission and the impact of pulse width on signal fidelity. <br/>
              <span className="text-[var(--text-main)]">Procedure:</span> Enter a message and adjust the pulse width. Transmit the data and observe the received signal. Lower the pulse width to see how dispersion causes bit errors.
            </p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 md:gap-10">
        {/* Simulation Area */}
        <div className="lg:col-span-8 space-y-6 md:space-y-8">
          <div className="bg-lab-surface border border-lab-border p-6 md:p-10 min-h-[350px] md:h-[400px] relative overflow-hidden shadow-2xl flex flex-col items-center justify-between">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.02),transparent_70%)]" />
            
            <div className="w-full flex justify-between items-center relative z-10">
              {/* Transmitter */}
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-lab-bg border border-lab-border flex items-center justify-center relative">
                  <motion.div 
                    className="w-6 h-6 md:w-8 md:h-8 rounded-full"
                    animate={{ 
                      backgroundColor: currentIndex >= 0 && binaryStream[currentIndex] === '1' ? '#06b6d4' : 'var(--lab-surface)',
                      boxShadow: currentIndex >= 0 && binaryStream[currentIndex] === '1' ? '0 0 30px #06b6d4' : 'none'
                    }}
                    transition={{ duration: 0.05 }}
                  />
                  <div className="absolute -top-6 text-[7px] md:text-[8px] text-[var(--text-muted)] uppercase font-black">Transmitter</div>
                </div>
              </div>

              {/* Fiber Link */}
              <div className="flex-1 h-1 bg-lab-border mx-4 md:mx-8 relative overflow-hidden">
                <motion.div 
                  className="absolute h-full bg-cyan-500/30"
                  animate={{ 
                    x: isTransmitting ? ['-100%', '100%'] : '-100%'
                  }}
                  transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
                />
              </div>

              {/* Receiver */}
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-lab-bg border border-lab-border flex items-center justify-center relative">
                  <motion.div 
                    className="w-6 h-6 md:w-8 md:h-8 rounded-full border border-lab-border"
                    animate={{ 
                      backgroundColor: currentIndex >= 0 && binaryStream[currentIndex] === '1' ? '#06b6d4' : 'var(--lab-surface)',
                      opacity: currentIndex >= 0 ? 1 : 0.2
                    }}
                  />
                  <div className="absolute -top-6 text-[7px] md:text-[8px] text-[var(--text-muted)] uppercase font-black">Receiver</div>
                </div>
              </div>
            </div>

            {/* Bit Stream Display */}
            <div className="w-full bg-lab-bg border border-lab-border p-4 md:p-6 overflow-hidden relative my-6">
               <div className="flex gap-1 font-mono text-[10px] md:text-xs overflow-hidden">
                 {binaryStream.map((bit, i) => (
                   <span key={i} className={`transition-colors ${i === currentIndex ? 'text-cyan-400 font-black scale-125' : i < currentIndex ? 'text-[var(--text-muted)]/40' : 'text-[var(--text-muted)]'}`}>
                     {bit}
                   </span>
                 ))}
                 {binaryStream.length === 0 && <span className="text-[var(--text-muted)]/40 italic">Ready for transmission...</span>}
               </div>
               <div className="absolute top-1 right-2 text-[6px] md:text-[7px] text-[var(--text-muted)] uppercase font-black tracking-widest">Binary Buffer</div>
            </div>

            <div className="w-full flex justify-between items-end">
               <div className="space-y-1 md:space-y-2">
                 <div className="text-[8px] md:text-[9px] text-[var(--text-muted)] uppercase font-black tracking-widest">Received Message</div>
                 <div className="text-2xl md:text-3xl font-black text-[var(--text-main)] tracking-tighter min-h-[32px] md:min-h-[40px]">
                   {receivedText || (isTransmitting ? "..." : "---")}
                 </div>
               </div>
               <div className="text-right">
                 <div className="text-[8px] md:text-[9px] text-[var(--text-muted)] uppercase font-black tracking-widest">Bit Rate</div>
                 <div className="text-lg md:text-xl font-black text-cyan-500 tracking-tighter">
                   {(1000 / pulseWidth).toFixed(1)} bps
                 </div>
               </div>
            </div>
          </div>
        </div>

        {/* Controls & Observation */}
        <div className="lg:col-span-4 space-y-6 md:space-y-8">
          <div className="bg-lab-surface p-6 md:p-8 border border-lab-border space-y-6 shadow-xl">
            <div className="space-y-3 md:space-y-4">
              <label className="text-[8px] md:text-[9px] font-black uppercase text-[var(--text-muted)] tracking-widest">Input Message</label>
              <input 
                type="text" 
                maxLength={8}
                value={text}
                onChange={(e) => setText(e.target.value.toUpperCase())}
                className="w-full bg-lab-bg border border-lab-border px-4 py-3 text-[var(--text-main)] font-mono outline-none focus:border-cyan-500/50"
                placeholder="HI"
              />
            </div>

            <div className="space-y-3 md:space-y-4">
              <div className="flex justify-between">
                <label className="text-[8px] md:text-[9px] font-black uppercase text-[var(--text-muted)] tracking-widest">Pulse Width (ms)</label>
                <span className="text-cyan-500 text-[10px] md:text-xs font-bold">{pulseWidth}ms</span>
              </div>
              <input 
                type="range" min="10" max="200" step="5" value={pulseWidth} 
                onChange={(e) => setPulseWidth(parseInt(e.target.value))}
                className="w-full h-1 bg-lab-border appearance-none cursor-pointer accent-cyan-500"
              />
            </div>

            <button 
              onClick={transmit}
              disabled={isTransmitting || !text}
              className={`w-full py-4 font-black uppercase tracking-widest transition-all text-xs ${isTransmitting ? 'bg-lab-bg text-[var(--text-muted)]' : 'bg-cyan-500 text-black hover:bg-cyan-400'}`}
            >
              {isTransmitting ? "Transmitting..." : "Send Data"}
            </button>
          </div>

          {/* Observation Table */}
          <div className="bg-lab-surface border border-lab-border overflow-hidden">
            <div className="bg-lab-bg px-4 py-2 text-[8px] md:text-[9px] font-black uppercase tracking-widest text-[var(--text-muted)] border-b border-lab-border">
              Observation Table
            </div>
            <table className="w-full text-[9px] md:text-[10px] text-left">
              <thead className="text-[var(--text-muted)] uppercase font-black border-b border-lab-border">
                <tr>
                  <th className="px-4 py-2">Parameter</th>
                  <th className="px-4 py-2 text-right">Value</th>
                </tr>
              </thead>
              <tbody className="text-[var(--text-muted)] font-bold uppercase tracking-tight">
                <tr className="border-b border-lab-border/50">
                  <td className="px-4 py-2">Pulse Interval</td>
                  <td className="px-4 py-2 text-right text-cyan-500">{pulseWidth} ms</td>
                </tr>
                <tr className="border-b border-lab-border/50">
                  <td className="px-4 py-2">Signal Fidelity</td>
                  <td className={`px-4 py-2 text-right ${errorRate > 0 ? "text-red-500" : "text-green-500"}`}>
                    {errorRate > 0 ? `LOW (${errorRate}% ISI)` : "HIGH"}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Decoding Status</td>
                  <td className={`px-4 py-2 text-right ${receivedText.includes('?') ? "text-red-500" : "text-cyan-500"}`}>
                    {receivedText.includes('?') ? "DATA CORRUPT" : "SUCCESS"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <button 
            onClick={onNext}
            className="w-full bg-lab-surface border border-lab-border text-[var(--text-main)] font-black uppercase py-4 tracking-widest hover:border-cyan-500/50 transition-all text-xs"
          >
            Numerical Practice →
          </button>
        </div>
      </div>
    </div>
  );
};

export default BitStreamLab;
