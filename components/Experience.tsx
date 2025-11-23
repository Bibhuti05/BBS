import React, { useEffect, useRef, useState } from 'react';
import { EXPERIENCES } from '../constants';
import ExperienceCard from './ExperienceCard';
import ExperienceDetails from './ExperienceDetails';

const Experience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  
  // State for expanded view
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [rects, setRects] = useState<Map<number, DOMRect>>(new Map());
  
  // Refs for cards to capture their positions
  const cardRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !dotRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const height = rect.height;
      
      const relativeY = (windowHeight / 2) - rect.top;
      let progress = relativeY / height;
      const clampedProgress = Math.min(Math.max(progress, 0), 1);
      
      dotRef.current.style.top = `${clampedProgress * 100}%`;
      
      if (progress >= 0 && progress <= 1) {
        dotRef.current.style.opacity = '1';
      } else {
        dotRef.current.style.opacity = '0';
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCardClick = (id: number) => {
    const cardElement = cardRefs.current.get(id);
    if (cardElement) {
      // Capture current dimensions before opening
      const rect = cardElement.getBoundingClientRect();
      setRects(prev => new Map(prev).set(id, rect));
      setSelectedId(id);
    }
  };

  const handleClose = () => {
    setSelectedId(null);
  };

  // Helper to find selected experience data
  const selectedExperience = EXPERIENCES.find(e => e.id === selectedId);
  // Helper to get stored rect
  const selectedRect = selectedId ? rects.get(selectedId) || null : null;

  return (
    <section id="experience" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Work <span className="text-primary-600 dark:text-primary-400">Experience</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            My professional journey and the value I've delivered to companies and clients.
          </p>
        </div>

        <div ref={containerRef} className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-800"></div>
          
          {/* Sliding Glow Dot */}
          <div 
            ref={dotRef}
            className="absolute left-0 md:left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-primary-500 rounded-full z-0 transition-opacity duration-300"
            style={{ 
              top: '0%', 
              opacity: 0,
              boxShadow: '0 0 15px 5px rgba(16, 185, 129, 0.6), 0 0 30px 10px rgba(16, 185, 129, 0.3)' 
            }}
          ></div>

          {EXPERIENCES.map((exp, index) => (
            <div 
              key={exp.id} 
              className={`relative flex flex-col md:flex-row items-center mb-12 ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Checkpoint Dot */}
              <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-white dark:bg-gray-900 border-4 border-primary-500 z-10 flex items-center justify-center shadow-sm">
                 <div className="w-2.5 h-2.5 rounded-full bg-primary-500"></div>
              </div>

              {/* Content Spacer */}
              <div className="w-full md:w-1/2"></div>

              {/* Content Card */}
              <ExperienceCard 
                experience={exp}
                index={index}
                isActive={selectedId === exp.id}
                onClick={() => handleCardClick(exp.id)}
                ref={(el) => {
                  if (el) cardRefs.current.set(exp.id, el);
                  else cardRefs.current.delete(exp.id);
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Details Overlay (Modal/Sheet) */}
      {selectedExperience && (
        <ExperienceDetails 
          experience={selectedExperience}
          initialRect={selectedRect}
          onClose={handleClose}
        />
      )}
    </section>
  );
};

export default Experience;