import React from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '../constants';
import { ArrowUpRight, Github } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const Projects: React.FC = () => {
  return (
    <section id="portfolio" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          className="mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight"
            variants={fadeUp}
          >
            Featured <span className="text-zinc-400 dark:text-[#78716c]">Projects</span>
          </motion.h2>
          <motion.p
            className="text-lg text-zinc-500 dark:text-[#C2BDB2] max-w-xl"
            variants={fadeUp}
          >
            A selection of projects that showcase my passion for building high-quality software.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              className="project-card aspect-[4/5] rounded-3xl bg-[#1e1e1c] relative"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Info - hidden by default, shown on hover */}
              <div className="project-card-info absolute inset-0 z-10 p-8 flex flex-col justify-start">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-2xl font-bold text-white">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github size={18} />
                    </a>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ArrowUpRight size={18} />
                    </a>
                  </div>
                </div>
                <p className="text-xs uppercase tracking-widest text-[#78716c] mb-4">
                  {project.tags[0]} · {project.tags.slice(1, 3).join(' ')}
                </p>
                <p className="text-sm text-[#C2BDB2] leading-relaxed line-clamp-3">
                  {project.description}
                </p>
              </div>

              {/* Image - full bleed initially, shrinks on hover */}
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 block"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-card-image w-full h-full object-cover"
                />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
