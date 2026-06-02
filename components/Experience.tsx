import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { EXPERIENCES } from '../constants';
import ExperienceCard from './ExperienceCard';
import ExperienceDetails from './ExperienceDetails';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const Experience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [rects, setRects] = useState<Map<number, DOMRect>>(new Map());
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
      const rect = cardElement.getBoundingClientRect();
      setRects(prev => new Map(prev).set(id, rect));
      setSelectedId(id);
    }
  };

  const handleClose = () => {
    setSelectedId(null);
  };

  const selectedExperience = EXPERIENCES.find(e => e.id === selectedId);
  const selectedRect = selectedId ? rects.get(selectedId) || null : null;

  return (
    <section id="experience" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } },
          }}
        >
          <motion.h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4" variants={fadeUp}>
            Work <span className="text-primary-600 dark:text-primary-400">Experience</span>
          </motion.h2>
          <motion.p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto" variants={fadeUp}>
            My professional journey and the value I've delivered to companies and clients.
          </motion.p>
        </motion.div>

        <div ref={containerRef} className="relative max-w-4xl mx-auto">
          <motion.div
            className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-zinc-200 dark:bg-zinc-800"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            style={{ originY: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          
          <div
            ref={dotRef}
            className="absolute left-0 md:left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-primary-500 rounded-full z-0 transition-opacity duration-300"
            style={{
              top: '0%',
              opacity: 0,
              boxShadow: '0 0 15px 5px rgba(16, 185, 129, 0.6), 0 0 30px 10px rgba(16, 185, 129, 0.3)'
            }}
          />

          {EXPERIENCES.map((exp, index) => (
            <motion.div
              key={exp.id}
              className={`relative flex flex-col md:flex-row items-center mb-12 ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
              initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <motion.div
                className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-white dark:bg-zinc-900 border-4 border-primary-500 z-10 flex items-center justify-center shadow-sm"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 300, delay: index * 0.15 + 0.2 }}
              >
                <div className="w-2.5 h-2.5 rounded-full bg-primary-500"></div>
              </motion.div>

              <div className="w-full md:w-1/2"></div>

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
            </motion.div>
          ))}
        </div>
      </div>

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