import React from 'react';
import { DroneIcon } from './Icons';

interface LogoProps {
  scrolled?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ scrolled = false, className = "" }) => {
  return (
    <div className={`group flex items-center gap-2 relative select-none ${className}`}>
      {/* Icon Container with Continuous Animation */}
      <style>
        {`
          @keyframes logo-hover {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-4px) rotate(5deg); }
          }
        `}
      </style>
      <div 
        className="transition-colors duration-300"
        style={{ animation: 'logo-hover 4s ease-in-out infinite' }}
      >
        <DroneIcon 
          className={`w-8 h-8 transition-colors duration-300 ${scrolled ? 'text-cyan-400' : 'text-white'}`} 
        />
      </div>
      
      {/* Text Container with Shimmer Effect */}
      <div className="relative overflow-hidden">
        <span className={`text-2xl font-extrabold tracking-tighter transition-colors duration-300 ${scrolled ? 'text-cyan-400' : 'text-white'}`}>
          AEIR
        </span>
        
        {/* Scanning Light Effect (Visible only when scrolled) */}
        <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full ${scrolled ? 'animate-[shimmer_2s_infinite]' : ''}`}></div>
      </div>
    </div>
  );
};