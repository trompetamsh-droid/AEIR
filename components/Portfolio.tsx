import React, { useState, useEffect, useRef } from 'react';
import { Project } from '../types';

const projects: Project[] = [
  { id: 1, title: "Luxury Villa", category: "Real Estate", imageUrl: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1600&auto=format&fit=crop" },
  { id: 2, title: "Island Wedding", category: "Events", imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop" },
  { id: 3, title: "Urban Landscape", category: "Commercial", imageUrl: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1600&auto=format&fit=crop" },
];

const categories = ["All", "Real Estate", "Events", "Commercial"];

export const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

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
      id="portfolio" 
      ref={sectionRef}
      className={`py-20 bg-slate-950 transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Portfolio</h2>
            <p className="text-slate-400 max-w-lg">
              Μια επιλογή από τις αγαπημένες μας λήψεις. Κάθε έργο αφηγείται μια μοναδική ιστορία.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-6 md:mt-0">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeCategory === cat 
                    ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.5)]' 
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div key={project.id} className="group relative overflow-hidden rounded-xl aspect-video cursor-pointer">
              <img 
                src={project.imageUrl} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-cyan-400 text-sm font-semibold uppercase tracking-wider mb-1">{project.category}</span>
                <h3 className="text-white text-xl font-bold">{project.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};