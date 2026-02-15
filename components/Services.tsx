import React, { useState, useEffect, useRef } from 'react';
import { BuildingIcon, CameraIcon } from './Icons';
import { Service } from '../types';

const servicesList: Service[] = [
  {
    id: 1,
    title: "Real Estate",
    description: "Προωθήστε ακίνητα με εντυπωσιακές εναέριες λήψεις 4K. Αναδείξτε τη τοποθεσία και τις διαστάσεις του ακινήτου όπως ποτέ άλλοτε.",
    icon: <BuildingIcon className="w-10 h-10" />
  },
  {
    id: 2,
    title: "Εκδηλώσεις & Γάμοι",
    description: "Απαθανατίστε τις πιο σημαντικές στιγμές από ψηλά. Κινηματογραφική κάλυψη για γάμους, συναυλίες και εταιρικά events.",
    icon: <CameraIcon className="w-10 h-10" />
  }
];

export const Services = () => {
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
      id="services" 
      ref={sectionRef}
      className={`py-20 bg-slate-900 transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Οι Υπηρεσίες μας</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Παρέχουμε ολοκληρωμένες λύσεις εναέριας κινηματογράφησης προσαρμοσμένες στις ανάγκες σας.
          </p>
        </div>
        
        {/* Adjusted grid to center the 2 remaining items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {servicesList.map((service) => (
            <div key={service.id} className="bg-slate-800/50 p-8 rounded-2xl hover:bg-slate-800 transition-all duration-300 group border border-slate-700/50 hover:border-cyan-500/30">
              <div className="text-cyan-400 mb-6 p-4 bg-slate-900 rounded-xl inline-block group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-black/30">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
              <p className="text-slate-400 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};