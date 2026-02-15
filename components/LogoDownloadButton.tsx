import React, { useState, useRef, useEffect } from 'react';

interface LogoDownloadButtonProps {
  className?: string;
  dropdownAlign?: 'left' | 'right' | 'center';
}

export const LogoDownloadButton: React.FC<LogoDownloadButtonProps> = ({ 
  className,
  dropdownAlign = 'center' 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const downloadLogo = (type: 'jpeg' | 'png-transparent' | 'png-icon' | 'png-text') => {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 630;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Fill background only for JPEG
    if (type === 'jpeg') {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    const style = `
      <style>
        .text { 
          font-family: system-ui, -apple-system, sans-serif; 
          font-weight: 800; 
          font-size: 180px; 
          fill: white; 
          letter-spacing: -5px; 
        }
      </style>
    `;

    // SVG Content Generation
    let svgContent = '';

    if (type === 'png-icon') {
        // Centered Icon
        svgContent = `
        <g transform="translate(600, 315)">
             <g transform="translate(-144, -144) scale(12)">
                <path d="M2 8h20" stroke="#22d3ee" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                <path d="M12 2v20" stroke="#22d3ee" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                <path d="m19 5-7 7-7-7" stroke="#22d3ee" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                <rect x="10" y="10" width="4" height="4" stroke="#22d3ee" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                <path d="M4.5 14h.01" stroke="#22d3ee" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                <path d="M19.5 14h.01" stroke="#22d3ee" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
            </g>
        </g>`;
    } else if (type === 'png-text') {
        // Centered Text
        svgContent = `
        ${style}
        <g transform="translate(600, 315)">
             <text x="0" y="20" class="text" text-anchor="middle" dominant-baseline="middle">AEIR</text>
        </g>`;
    } else {
        // Full Logo (JPEG or Transparent PNG)
        // Adjust translation to center the whole composition
        // Icon is on left, Text on right.
        svgContent = `
        ${style}
        <g transform="translate(600, 315)">
            <g transform="translate(-350, -150) scale(12)">
                <path d="M2 8h20" stroke="#22d3ee" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                <path d="M12 2v20" stroke="#22d3ee" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                <path d="m19 5-7 7-7-7" stroke="#22d3ee" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                <rect x="10" y="10" width="4" height="4" stroke="#22d3ee" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                <path d="M4.5 14h.01" stroke="#22d3ee" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                <path d="M19.5 14h.01" stroke="#22d3ee" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
            </g>
            <text x="0" y="50" class="text">AEIR</text>
        </g>`;
    }

    const svgData = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">${svgContent}</svg>`;
    
    const img = new Image();
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    img.onload = () => {
        ctx.drawImage(img, 0, 0);
        const mimeType = type === 'jpeg' ? 'image/jpeg' : 'image/png';
        const extension = type === 'jpeg' ? 'jpg' : 'png';
        const filename = `AEIR_Logo_${type}.${extension}`;
        
        const dataUrl = canvas.toDataURL(mimeType, 0.9);
        const link = document.createElement('a');
        link.download = filename;
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        setIsOpen(false);
    };
    img.src = url;
  };

  const defaultClass = "text-xs text-slate-600 hover:text-cyan-500 transition-colors mt-4 flex items-center gap-2 group";

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={className || defaultClass}
        title="Download Logo Options"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
        </svg>
        Download Logo
      </button>

      {isOpen && (
        <div className={`absolute z-50 mt-2 w-64 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden animate-fade-in ${
          dropdownAlign === 'center' ? 'left-1/2 -translate-x-1/2' : (dropdownAlign === 'right' ? 'right-0' : 'left-0')
        } ${
            // Fix for footer: if it might go off screen bottom, we can't easily detect without logic, 
            // but we can just use bottom positioning if we knew we were in footer.
            // For now, let's assume default drop down is fine, or use bottom-full if align is 'left' (heuristic for footer here)
            // Actually, let's just use standard top-down for now to avoid complexity, unless specifically asked.
            ''
        }`}>
            <div className="p-1">
                <button onClick={() => downloadLogo('jpeg')} className="flex items-center w-full px-4 py-3 text-sm text-slate-300 hover:bg-slate-800 hover:text-cyan-400 transition-colors rounded-lg text-left">
                    <span className="w-3 h-3 rounded-full bg-slate-500 mr-3 shrink-0"></span>
                    <div>
                        <div className="font-semibold text-white">Full Logo (JPG)</div>
                        <div className="text-xs opacity-50">Dark Background</div>
                    </div>
                </button>
                <button onClick={() => downloadLogo('png-transparent')} className="flex items-center w-full px-4 py-3 text-sm text-slate-300 hover:bg-slate-800 hover:text-cyan-400 transition-colors rounded-lg text-left">
                    <span className="w-3 h-3 rounded-full bg-white/10 mr-3 border border-white/30 shrink-0"></span>
                    <div>
                        <div className="font-semibold text-white">Full Logo (PNG)</div>
                        <div className="text-xs opacity-50">Transparent</div>
                    </div>
                </button>
                <button onClick={() => downloadLogo('png-icon')} className="flex items-center w-full px-4 py-3 text-sm text-slate-300 hover:bg-slate-800 hover:text-cyan-400 transition-colors rounded-lg text-left">
                    <span className="w-3 h-3 rounded-full bg-cyan-500 mr-3 shrink-0"></span>
                    <div>
                        <div className="font-semibold text-white">Icon Only (PNG)</div>
                        <div className="text-xs opacity-50">Transparent</div>
                    </div>
                </button>
                <button onClick={() => downloadLogo('png-text')} className="flex items-center w-full px-4 py-3 text-sm text-slate-300 hover:bg-slate-800 hover:text-cyan-400 transition-colors rounded-lg text-left">
                    <span className="w-3 h-3 rounded-full bg-white mr-3 shrink-0"></span>
                    <div>
                        <div className="font-semibold text-white">Text Only (PNG)</div>
                        <div className="text-xs opacity-50">Transparent</div>
                    </div>
                </button>
            </div>
        </div>
      )}
    </div>
  );
};