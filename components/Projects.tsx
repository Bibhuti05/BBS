import React from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '../constants';
import { ExternalLink, Github } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const Projects: React.FC = () => {
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

        <div className="flex flex-wrap justify-center gap-8">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              className="w-full md:w-[380px] rounded-2xl bg-zinc-100 dark:bg-zinc-800 overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
              }}
              whileHover={{ y: -4 }}
            >
              <div className="relative h-48 overflow-hidden group">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent flex items-end justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <div className="flex gap-2">
                    <motion.a
                      href={project.github}
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;