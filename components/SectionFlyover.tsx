import React, { useEffect, useState, useRef } from 'react';
import { DroneIcon } from './Icons';

export const SectionFlyover = () => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [animationClass, setAnimationClass] = useState('');
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Removed 'portfolio' from this list
    const sections = ['home', 'services', 'contact'];
    
    const observer = new IntersectionObserver((entries) => {
      // Find the entry that is most visible
      const visibleEntry = entries.find(entry => entry.isIntersecting && entry.intersectionRatio > 0.5);

      if (visibleEntry) {
        const newSection = visibleEntry.target.id;
        
        setActiveSection(prev => {
          if (prev !== newSection) {
            // Determine direction based on section index order
            const prevIndex = sections.indexOf(prev);
            const newIndex = sections.indexOf(newSection);
            
            // Only animate if we are not on the very first detection (page load)
            if (!isFirstRender.current && prevIndex !== -1 && newIndex !== -1) {
              const direction = newIndex > prevIndex ? 'fly-right' : 'fly-left';
              setAnimationClass(direction);
              
              // Reset animation after it completes (matched to new slower duration)
              setTimeout(() => setAnimationClass(''), 3500);
            }
            
            // After first update, we are no longer in initial state
            isFirstRender.current = false;
            return newSection;
          }
          return prev;
        });
      }
    }, { threshold: 0.51 }); // Use slightly > 0.5 to ensure only one is active

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  if (!animationClass) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-40 flex items-center justify-center overflow-hidden">
      <style>
        {`
          @keyframes flyRight {
            0% { transform: translateX(-120vw) rotate(10deg); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateX(120vw) rotate(10deg); opacity: 0; }
          }
          @keyframes flyLeft {
            0% { transform: translateX(120vw) rotate(-10deg); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateX(-120vw) rotate(-10deg); opacity: 0; }
          }
          .fly-right { animation: flyRight 3.5s cubic-bezier(0.45, 0, 0.55, 1) forwards; }
          .fly-left { animation: flyLeft 3.5s cubic-bezier(0.45, 0, 0.55, 1) forwards; }
        `}
      </style>
      
      <div className={`relative ${animationClass}`}>
        {/* Speed Lines Trail - Larger and softer for slower speed */}
        <div className={`absolute top-1/2 -translate-y-1/2 h-2 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent w-[80vw] blur-md ${animationClass === 'fly-right' ? '-left-[60vw]' : '-right-[60vw]'}`}></div>

        <div className="relative text-cyan-300 drop-shadow-[0_0_35px_rgba(34,211,238,0.3)]">
          {/* Much larger drone icon */}
          <DroneIcon className="w-48 h-48 md:w-96 md:h-96 opacity-90" />
          
          {/* Engine Glows - Adjusted for larger size */}
          <div className="absolute top-4 left-4 w-8 h-8 bg-green-500 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-4 right-4 w-8 h-8 bg-red-500 rounded-full blur-xl animate-pulse"></div>

          {/* Propeller Blur - Larger area */}
          <div className="absolute -inset-8 bg-cyan-400/5 blur-2xl rounded-full"></div>
          <div className="absolute top-0 left-0 w-full h-full animate-spin [animation-duration:0.15s]">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-full bg-white/5 blur-[2px]"></div>
             <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-2 bg-white/5 blur-[2px]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};