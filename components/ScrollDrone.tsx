import React, { useEffect, useState, useRef } from 'react';
import { DroneIcon } from './Icons';

export const ScrollDrone = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [tilt, setTilt] = useState(0);
  const lastScrollTop = useRef(0);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      
      // Calculate scroll speed and direction for tilt
      const delta = scrollTop - lastScrollTop.current;
      
      // Max tilt of 45 degrees, smoothed
      const targetTilt = Math.min(Math.max(delta * 1.5, -45), 45);
      setTilt(targetTilt);

      // Reset tilt when scrolling stops
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setTilt(0);
      }, 100);
      
      lastScrollTop.current = scrollTop;

      // Calculate percentage
      const maxScroll = documentHeight - windowHeight;
      const percentage = (scrollTop / maxScroll) * 100;
      setScrollPercentage(Math.min(Math.max(percentage, 0), 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="fixed right-4 md:right-8 top-0 h-full w-12 pointer-events-none z-40 hidden md:block">
      {/* Vertical Track Line (Dashed for HUD look) */}
      <div className="absolute left-1/2 top-[12vh] bottom-[12vh] w-[1px] border-l border-dashed border-slate-700 -translate-x-1/2 opacity-50"></div>
      
      {/* Altitude Markers */}
      <div className="absolute left-1/2 top-[12vh] bottom-[12vh] -translate-x-1/2 w-4 flex flex-col justify-between text-[10px] text-cyan-900 font-mono">
        <span>MAX</span>
        <span>500</span>
        <span>250</span>
        <span>000</span>
      </div>

      {/* Active Progress Path */}
      <div 
        className="absolute left-1/2 top-[12vh] w-[2px] bg-gradient-to-b from-transparent via-cyan-500 to-cyan-400 -translate-x-1/2 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
        style={{ height: `calc(${scrollPercentage * 0.76}% )` }}
      ></div>

      {/* Drone Container */}
      <div 
        className="absolute left-1/2 -translate-x-1/2 will-change-transform transition-all duration-300 ease-out"
        style={{ 
          top: `calc(12vh + ${scrollPercentage * 0.76}%)`,
          transform: `translateX(-50%) rotate(${tilt}deg) scale(${1 + Math.abs(tilt)/200})`
        }}
      >
        <div className="relative">
          
          {/* Propeller Blur - Spins faster on move */}
          <div className={`absolute -inset-4 bg-cyan-400/10 rounded-full animate-spin ${Math.abs(tilt) > 5 ? '[animation-duration:0.1s]' : '[animation-duration:0.5s]'}`}></div>
          <div className={`absolute -inset-2 bg-cyan-400/20 blur-sm rounded-full animate-spin ${Math.abs(tilt) > 5 ? '[animation-duration:0.1s]' : '[animation-duration:0.5s]'}`}></div>
          
          {/* Drone Body */}
          <div className="relative z-10 text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)] bg-slate-950/80 rounded-full p-2 backdrop-blur-md border border-cyan-500/50">
            <DroneIcon className="w-6 h-6" />
          </div>

          {/* Engine Thrust / Trail particles (only when moving fast) */}
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-20 bg-cyan-400/30 blur-md transition-opacity duration-200 ${tilt < -10 ? 'opacity-100 rotate-180 origin-top' : (tilt > 10 ? 'opacity-100 origin-bottom' : 'opacity-0')}`}></div>
          
          {/* Status Light */}
          <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_5px_#22c55e]"></div>
        </div>
        
        {/* Dynamic Altitude Text */}
        <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 bg-slate-900/80 px-2 py-1 rounded text-[10px] font-mono text-cyan-400 border border-cyan-500/30 backdrop-blur-sm whitespace-nowrap">
          {Math.floor(scrollPercentage * 5)}m
        </div>
      </div>
    </div>
  );
};