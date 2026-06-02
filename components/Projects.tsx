import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { PROJECTS } from '../constants';
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const total = PROJECTS.length;

const getStackPosition = (position: number) => {
  if (position === 0) return { y: 0, scale: 1, opacity: 1, zIndex: 10 };
  if (position === 1) return { y: 20, scale: 0.92, opacity: 0.7, zIndex: 9 };
  if (position === 2) return { y: 40, scale: 0.84, opacity: 0.5, zIndex: 8 };
  if (position === 3) return { y: 60, scale: 0.76, opacity: 0.3, zIndex: 7 };
  return { y: 80, scale: 0.68, opacity: 0.15, zIndex: 6 };
};

const Projects: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => setActiveIndex((prev) => (prev + 1) % total);
  const prev = () => setActiveIndex((prev) => (prev - 1 + total) % total);

  useEffect(() => {
    const interval = setInterval(next, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.y < -80) next();
    if (info.offset.y > 80) prev();
  };

  return (
    <section id="portfolio" className="py-20 bg-white/30 dark:bg-black/20 backdrop-blur-sm">
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
            Featured <span className="text-primary-600 dark:text-primary-400">Projects</span>
          </motion.h2>
          <motion.p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto" variants={fadeUp}>
            A selection of projects that showcase my passion for building high-quality software.
          </motion.p>
        </motion.div>

        <div className="relative flex justify-center items-center min-h-[400px]">
          <AnimatePresence initial={false}>
            {PROJECTS.map((project, index) => {
              const position = ((index - activeIndex) % total + total) % total;
              const stackPos = getStackPosition(position);
              const isFront = position === 0;

              return (
                <motion.div
                  key={project.id}
                  className="absolute w-[340px] md:w-[400px] rounded-2xl bg-zinc-100 dark:bg-zinc-800 overflow-hidden"
                  style={{ boxShadow: isFront ? '0 8px 30px rgba(0,0,0,0.12)' : '0 4px 15px rgba(0,0,0,0.08)' }}
                  initial={{ y: 200, scale: 0.5, opacity: 0 }}
                  animate={{
                    y: stackPos.y,
                    scale: stackPos.scale,
                    opacity: stackPos.opacity,
                    zIndex: stackPos.zIndex,
                  }}
                  exit={{ y: -200, scale: 0.5, opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                  }}
                  onClick={() => !isFront && setActiveIndex(index)}
                  whileHover={isFront ? { y: stackPos.y - 4 } : {}}
                  whileTap={isFront ? { scale: 0.98 } : {}}
                  drag={isFront ? "y" : false}
                  dragConstraints={{ top: 0, bottom: 0 }}
                  dragElastic={0.3}
                  onDragEnd={isFront ? handleDragEnd : undefined}
                >
                  <div className="relative h-48 overflow-hidden">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      animate={{ scale: isFront ? 1 : 0.95 }}
                      transition={{ duration: 0.5 }}
                    />
                    {isFront && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent flex items-end justify-between p-4"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex gap-2">
                          <motion.a
                            href={project.link}
                            className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-primary-500 transition-colors"
                            whileHover={{ scale: 1.2, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Github size={18} />
                          </motion.a>
                          <motion.a
                            href={project.link}
                            className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-primary-500 transition-colors"
                            whileHover={{ scale: 1.2, rotate: -5 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <ExternalLink size={18} />
                          </motion.a>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  <div className="relative p-6 z-10 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm">
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs font-medium rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[70%] h-6 bg-gradient-to-b from-primary-500/8 to-transparent rounded-full blur-2xl" />
        </div>

        <div className="flex items-center justify-center gap-6 mt-8">
          <motion.button
            onClick={prev}
            className="p-3 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors shadow-md"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Previous project"
          >
            <ChevronLeft size={20} />
          </motion.button>

          <div className="flex items-center gap-2">
            {PROJECTS.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  index === activeIndex
                    ? 'bg-primary-500'
                    : 'bg-zinc-300 dark:bg-zinc-600 hover:bg-primary-300 dark:hover:bg-primary-700'
                }`}
                animate={{ scale: index === activeIndex ? 1.4 : 1 }}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.8 }}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>

          <motion.button
            onClick={next}
            className="p-3 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors shadow-md"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Next project"
          >
            <ChevronRight size={20} />
          </motion.button>
        </div>

        <motion.p
          className="text-center text-sm text-zinc-500 dark:text-zinc-500 mt-3"
          key={activeIndex}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeIndex + 1} / {total}
        </motion.p>
      </div>
    </section>
  );
};

export default Projects;