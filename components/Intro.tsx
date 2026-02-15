import React, { useEffect, useState } from 'react';
import { DroneIcon } from './Icons';

export const Intro = ({ onComplete }: { onComplete: () => void }) => {
  const [stage, setStage] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Sequence of animations
    const timeouts = [
      setTimeout(() => setStage(1), 500),  // Icon appears
      setTimeout(() => setStage(2), 1500), // Text appears
      setTimeout(() => setStage(3), 3000), // Glow explosion
      setTimeout(() => setStage(4), 3500), // Fade out
      setTimeout(() => {
        setIsVisible(false);
        onComplete();
      }, 4000), // Remove component
    ];

    return () => timeouts.forEach(clearTimeout);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-[100] bg-[#050b14] flex items-center justify-center transition-opacity duration-1000 ${stage === 4 ? 'opacity-0' : 'opacity-100'}`}>
      <div className="relative flex flex-col items-center justify-center">
        
        {/* Glowing Background Effect */}
        <div className={`absolute inset-0 bg-cyan-500/20 blur-[100px] rounded-full transition-all duration-1000 ${stage >= 1 ? 'opacity-100 scale-150' : 'opacity-0 scale-0'}`}></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-4 md:gap-6">
          {/* Icon */}
          <div className={`transition-all duration-1000 cubic-bezier(0.34, 1.56, 0.64, 1) ${stage >= 1 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-50'}`}>
             <div className="relative">
                <DroneIcon className="w-20 h-20 md:w-32 md:h-32 text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.6)]" />
                {/* Scanner effect on icon */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-transparent animate-[scan_2s_infinite]"></div>
             </div>
          </div>

          {/* Text */}
          <div className={`transition-all duration-1000 delay-300 ${stage >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <h1 className="text-6xl md:text-9xl font-extrabold tracking-tighter text-white">
              AEIR
            </h1>
          </div>
        </div>

        {/* Loading Line */}
        <div className={`mt-12 h-[2px] bg-slate-800 w-48 overflow-hidden rounded-full transition-opacity duration-500 ${stage >= 1 && stage < 4 ? 'opacity-100' : 'opacity-0'}`}>
          <div className="h-full bg-cyan-500 w-full origin-left animate-[progress_3s_ease-in-out_forwards]"></div>
        </div>
      </div>
    </div>
  );
};