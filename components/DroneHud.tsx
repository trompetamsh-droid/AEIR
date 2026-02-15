import React, { useState, useEffect } from 'react';
import { BatteryIcon, SignalIcon } from './Icons';

export const DroneHud = () => {
  const [time, setTime] = useState(new Date());
  const [isRecording, setIsRecording] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    const recBlinker = setInterval(() => setIsRecording(prev => !prev), 1000);
    return () => {
      clearInterval(timer);
      clearInterval(recBlinker);
    };
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour12: false });
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-30 hidden md:block overflow-hidden">
      {/* Corner Brackets */}
      <div className="absolute top-6 left-6 w-16 h-16 border-t-2 border-l-2 border-white/20 rounded-tl-lg"></div>
      <div className="absolute top-6 right-6 w-16 h-16 border-t-2 border-r-2 border-white/20 rounded-tr-lg"></div>
      <div className="absolute bottom-6 left-6 w-16 h-16 border-b-2 border-l-2 border-white/20 rounded-bl-lg"></div>
      <div className="absolute bottom-6 right-6 w-16 h-16 border-b-2 border-r-2 border-white/20 rounded-br-lg"></div>

      {/* Top Bar Info */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 flex gap-8 text-[10px] font-mono text-white/60 bg-black/20 px-4 py-1 rounded-full backdrop-blur-[2px]">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full bg-red-500 ${isRecording ? 'opacity-100' : 'opacity-30'}`}></span>
          <span className="text-red-400">REC</span>
          <span>{formatTime(time)}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>ISO 800</span>
          <span>1/60</span>
          <span>F2.8</span>
          <span>4K</span>
        </div>
      </div>

      {/* Battery & Signal (Top Right) */}
      <div className="absolute top-8 right-10 flex gap-4 text-white/80">
        <div className="flex items-center gap-1">
          <SignalIcon className="w-4 h-4" />
          <span className="text-xs font-mono">RC: STRONG</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs font-mono">82%</span>
          <BatteryIcon className="w-5 h-5 text-green-400" />
        </div>
      </div>

      {/* Center Crosshair */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10">
        <div className="w-8 h-[1px] bg-white"></div>
        <div className="h-8 w-[1px] bg-white absolute top-0 left-1/2 -translate-x-1/2"></div>
      </div>
    </div>
  );
};