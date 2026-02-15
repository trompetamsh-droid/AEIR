import React, { useEffect, useRef } from 'react';
import { DroneIcon } from './Icons';

export const Hero3DBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();

    // Flight variables
    let offset = 0;
    const speed = 1.5;
    const horizonY = height * 0.4; // Horizon line height
    const gridSpacing = 40;
    
    // Particles (Stars/Dust)
    const particles: {x: number, y: number, z: number, s: number}[] = [];
    for(let i=0; i<100; i++) {
        particles.push({
            x: (Math.random() - 0.5) * width * 2,
            y: (Math.random() - 0.5) * height,
            z: Math.random() * 1000,
            s: Math.random() * 2
        });
    }

    const draw = () => {
      // Clear with dark gradient fade
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, '#020617'); // Slate 950
      gradient.addColorStop(1, '#0f172a'); // Slate 900
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // --- Draw Stars/Dust ---
      ctx.fillStyle = '#ffffff';
      particles.forEach(p => {
        p.z -= speed * 2;
        if(p.z <= 0) p.z = 1000;
        
        // Perspective projection for particles
        const k = 500 / p.z;
        const x = width/2 + p.x * k;
        const y = height/2 + p.y * k;
        const size = p.s * k;

        if(x > 0 && x < width && y > 0 && y < height) {
            ctx.globalAlpha = Math.min(1, k);
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI*2);
            ctx.fill();
        }
      });
      ctx.globalAlpha = 1;

      // --- Draw 3D Floor Grid ---
      ctx.lineWidth = 1;
      
      // Vertical Lines (Perspective)
      const centerX = width / 2;
      const fov = 300;
      
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.15)'; // Cyan with low opacity
      ctx.beginPath();
      // Draw lines radiating from horizon
      for (let x = -width; x < width * 2; x += gridSpacing * 3) {
         // Simple perspective lines
         // Start at horizon
         ctx.moveTo(centerX + (x - centerX) * 0.1, horizonY); 
         // End at bottom screen
         ctx.lineTo(x, height);
      }
      ctx.stroke();

      // Horizontal Lines (Moving towards camera)
      offset = (offset + speed) % gridSpacing;
      
      // We calculate z-depth for horizontal lines
      // We want lines to get closer together as they go up (perspective)
      for (let z = 0; z < height; z += gridSpacing) {
         // Apply logarithmic spacing to simulate depth
         const perspectiveY = horizonY + Math.pow((z + offset) / height, 2.5) * (height - horizonY);
         
         if (perspectiveY < height) {
            const alpha = Math.max(0, (perspectiveY - horizonY) / (height - horizonY)); // Fade out near horizon
            ctx.strokeStyle = `rgba(34, 211, 238, ${alpha * 0.3})`;
            
            ctx.beginPath();
            ctx.moveTo(0, perspectiveY);
            ctx.lineTo(width, perspectiveY);
            ctx.stroke();
         }
      }

      // --- Glow at Horizon ---
      const glow = ctx.createRadialGradient(centerX, horizonY, 0, centerX, horizonY, width/1.5);
      glow.addColorStop(0, 'rgba(6, 182, 212, 0.2)'); // Cyan glow center
      glow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height/2 + 100);

      requestAnimationFrame(draw);
    };

    const animationId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full">
        {/* The Canvas Grid */}
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* The 3D Drone Model (Overlay) */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
            {/* Container to position it slightly above center (horizon) */}
            <div className="relative -mt-24">
                <style>
                    {`
                    @keyframes float-drone {
                        0%, 100% { transform: translateY(0) scale(1) rotateX(10deg); }
                        50% { transform: translateY(-30px) scale(1.05) rotateX(20deg); }
                    }
                    .animate-float-drone {
                        animation: float-drone 5s ease-in-out infinite;
                    }
                    `}
                </style>
                
                <div className="animate-float-drone relative">
                    {/* The Drone Icon - Made more solid and visible */}
                    <DroneIcon className="w-64 h-64 md:w-96 md:h-96 text-transparent fill-slate-900/90 stroke-cyan-400 stroke-[0.5] drop-shadow-[0_0_20px_rgba(34,211,238,0.6)]" />
                    
                    {/* Engine Thruster Glows - Brighter */}
                    <div className="absolute top-12 left-12 w-6 h-6 bg-cyan-300 rounded-full blur-md animate-pulse"></div>
                    <div className="absolute top-12 right-12 w-6 h-6 bg-cyan-300 rounded-full blur-md animate-pulse delay-75"></div>
                    <div className="absolute bottom-12 left-12 w-6 h-6 bg-cyan-300 rounded-full blur-md animate-pulse delay-150"></div>
                    <div className="absolute bottom-12 right-12 w-6 h-6 bg-cyan-300 rounded-full blur-md animate-pulse delay-300"></div>

                    {/* Central Core Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-cyan-500/10 blur-2xl rounded-full"></div>
                </div>
            </div>
        </div>
    </div>
  );
};