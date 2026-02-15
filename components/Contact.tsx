import React, { useState, useEffect, useRef } from 'react';
import { PhoneIcon, MailIcon, MapPinIcon } from './Icons';

export const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className={`py-20 bg-slate-900 relative overflow-hidden transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      {/* Background element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-cyan-900/5 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-full bg-blue-900/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Επικοινωνία</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Είστε έτοιμοι να απογειώσετε το project σας; Καλέστε μας ή στείλτε μας email για άμεση εξυπηρέτηση.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Phone Card */}
          <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300 hover:bg-slate-800 flex flex-col items-center text-center group">
            <div className="bg-slate-900 p-4 rounded-full text-cyan-400 mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-black/20">
              <PhoneIcon className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-white mb-2">Τηλέφωνο</h4>
            <p className="text-slate-400 mb-4 text-sm">Καλέστε μας καθημερινά 09:00 - 18:00</p>
            <a href="tel:+306971741097" className="text-white font-mono text-lg hover:text-cyan-400 transition-colors bg-slate-900/50 px-4 py-2 rounded-lg border border-slate-700/50">
              +30 697 174 1097
            </a>
          </div>
          
          {/* Email Card */}
          <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300 hover:bg-slate-800 flex flex-col items-center text-center group">
            <div className="bg-slate-900 p-4 rounded-full text-cyan-400 mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-black/20">
              <MailIcon className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-white mb-2">Email</h4>
            <p className="text-slate-400 mb-4 text-sm">Στείλτε μας μήνυμα οποιαδήποτε στιγμή</p>
            <a href="mailto:info@aeir.space" className="text-white font-mono text-lg hover:text-cyan-400 transition-colors bg-slate-900/50 px-4 py-2 rounded-lg border border-slate-700/50">
              info@aeir.space
            </a>
          </div>
          
          {/* Location Card */}
          <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300 hover:bg-slate-800 flex flex-col items-center text-center group">
            <div className="bg-slate-900 p-4 rounded-full text-cyan-400 mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-black/20">
              <MapPinIcon className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-white mb-2">Τοποθεσία</h4>
            <p className="text-slate-400 mb-4 text-sm">Διαθέσιμοι για project σε όλη την Ελλάδα</p>
            <div className="text-white font-mono text-lg bg-slate-900/50 px-4 py-2 rounded-lg border border-slate-700/50">
              Αθήνα, Ελλάδα
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};