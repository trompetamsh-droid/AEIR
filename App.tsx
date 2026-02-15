import React, { useState, useEffect, useRef } from 'react';
import { DroneIcon, MenuIcon, XIcon, InstagramIcon, MailIcon } from './components/Icons';
import { Services } from './components/Services';
import { Contact } from './components/Contact';
import { AiWidget } from './components/AiWidget';
import { ScrollDrone } from './components/ScrollDrone';
import { SectionFlyover } from './components/SectionFlyover';
import { Logo } from './components/Logo';
import { Intro } from './components/Intro';
import { Hero3DBackground } from './components/Hero3DBackground';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showReelOpen, setShowReelOpen] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [introComplete]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Height of the fixed header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      
      {/* Intro Sequence - Plays the logo reveal animation */}
      <Intro onComplete={() => setIntroComplete(true)} />

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/80 backdrop-blur-md border-b border-cyan-900/30' : 'bg-transparent border-b border-white/5'} ${!introComplete ? 'opacity-0 pointer-events-none' : 'opacity-100 delay-500'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-20">
            {/* Dynamic Logo Component */}
            <a 
              href="#home" 
              onClick={(e) => scrollToSection(e, 'home')}
              className="cursor-pointer"
            >
              <Logo scrolled={scrolled} />
            </a>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-8 items-center">
              {['Home', 'Services', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={(e) => scrollToSection(e, item.toLowerCase())}
                  className="text-sm font-semibold text-slate-300 hover:text-cyan-400 transition-colors uppercase tracking-wide relative group cursor-pointer"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>

            {/* Mobile Toggle */}
            <button 
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-slate-900 border-b border-slate-800 p-6 flex flex-col gap-4 shadow-xl">
            {['Home', 'Services', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-lg font-semibold text-slate-300 hover:text-cyan-400 cursor-pointer"
                onClick={(e) => scrollToSection(e, item.toLowerCase())}
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-900">
        {/* Background Layers with Parallax */}
        <div 
            className="absolute -top-[10%] left-0 w-full h-[120%] z-0 overflow-hidden pointer-events-none bg-slate-900 will-change-transform"
            style={{ transform: `translateY(${scrollY * 0.4}px)` }}
        >
          
          {/* 3D Generated Background Animation */}
          <Hero3DBackground />
          
          {/* Gradient Overlay for text readability (Lighter than before to see the animation) */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-transparent to-slate-950/90 z-10"></div>
          
          {/* Grain Texture */}
          <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-10"></div>
        </div>

        {/* Hero Content with Staggered Animations */}
        <div className="relative z-20 text-center px-6 max-w-4xl mx-auto mt-16">
          <div className={`transition-all duration-1000 delay-100 transform ${introComplete ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <span className="inline-block py-1 px-3 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-md">
                Cinematic FPV & Aerial Systems
            </span>
          </div>

          <div className={`transition-all duration-1000 delay-300 transform ${introComplete ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white mb-8 leading-tight tracking-tight drop-shadow-2xl">
                BEYOND THE <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">HORIZON</span>
            </h1>
          </div>

          <div className={`transition-all duration-1000 delay-500 transform ${introComplete ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <p className="text-lg md:text-xl text-slate-200 mb-10 max-w-2xl mx-auto leading-relaxed text-shadow-sm font-medium">
                Κινηματογραφικές αεροφωτογραφίες και βίντεο παραγωγές υψηλών προδιαγραφών.
            </p>
          </div>

          <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 delay-700 transform ${introComplete ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <a 
                href="#services"
                onClick={(e) => scrollToSection(e, 'services')}
                className="group relative bg-white text-slate-950 px-8 py-4 rounded-full font-bold hover:bg-slate-200 transition-all shadow-lg shadow-white/10 overflow-hidden cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                Υπηρεσίες
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite]"></div>
            </a>
            
            <a 
              href="#contact" 
              onClick={(e) => scrollToSection(e, 'contact')}
              className="bg-transparent border border-white/20 text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-colors backdrop-blur-sm cursor-pointer"
            >
              Επικοινωνία
            </a>
          </div>
        </div>
      </header>

      {/* Services Section */}
      <Services />

      {/* Contact Section */}
      <Contact />

      {/* Footer - Removed Facebook and Logo Download */}
      <footer className="bg-slate-950 py-12 border-t border-slate-800 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-start gap-4">
            <div className="flex items-center gap-2">
              <DroneIcon className="text-cyan-500 w-8 h-8" />
              <span className="text-2xl font-bold text-white tracking-tighter">AEIR</span>
            </div>
          </div>
          
          <div className="text-slate-500 text-sm">
            © {new Date().getFullYear()} AEIR Drone Cinematography. All rights reserved.
          </div>

          <div className="flex gap-6">
            <a href="https://www.instagram.com/aeir_gr/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors"><InstagramIcon /></a>
            <a href="mailto:info@aeir.space" className="text-slate-400 hover:text-cyan-400 transition-colors"><MailIcon /></a>
          </div>
        </div>
      </footer>

      {/* Cinematic Overlays */}
      <ScrollDrone />
      <SectionFlyover />

      {/* AI Widget */}
      <AiWidget />

      {/* Showreel Modal (Pop-up Cinema) - Preserved in code but hidden from nav unless triggered by other means (currently inaccessible via nav) */}
      {showReelOpen && (
        <div className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 animate-fade-in">
          <button 
            onClick={() => setShowReelOpen(false)}
            className="absolute top-6 right-6 text-white hover:text-cyan-400 transition-colors"
          >
            <XIcon className="w-10 h-10" />
          </button>
          <div className="w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative">
             <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/LvXTjAioaR0?autoplay=1&rel=0&showinfo=0&modestbranding=1" 
                title="AEIR Showreel"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;