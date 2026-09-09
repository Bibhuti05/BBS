import React from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '../constants';
import { ArrowUpRight, Github } from 'lucide-react';

const Projects: React.FC = () => {
  return (
    <section id="portfolio" className="bg-[#0e0e0e] text-white py-20 md:py-28">
      <div className="container mx-auto px-6 max-w-6xl">

        {/* Header */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-mono text-zinc-600 uppercase tracking-widest mb-3">
            projects
          </p>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
            Things I've built.
          </h2>
        </motion.div>

        {/* Project list */}
        <div className="space-y-0 ">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              className="group py-8 flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Number + year */}
              <div className="flex sm:flex-col items-center sm:items-start gap-4 sm:gap-1 shrink-0 w-full sm:w-20">
                <span className="text-xs font-mono text-zinc-600">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between gap-6 mb-3">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/title"
                  >
                    <h3 className="text-2xl md:text-3xl font-bold text-white group-hover/title:text-zinc-300 transition-colors duration-200 inline-flex items-center gap-2">
                      {project.title}
                      <ArrowUpRight
                        size={20}
                        className="opacity-0 group-hover/title:opacity-100 transition-opacity -translate-y-0.5"
                      />
                    </h3>
                  </a>

                  {/* Tags — right side on desktop */}
                  <div className="hidden sm:flex items-center gap-2 flex-wrap justify-end shrink-0">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 rounded-full border border-white/10 text-zinc-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl mb-4">
                  {project.description}
                </p>

                {/* Mobile tags */}
                <div className="flex sm:hidden items-center gap-2 flex-wrap mb-4">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full border border-white/10 text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-zinc-600 hover:text-zinc-400 transition-colors"
                  >
                    {project.link.replace('https://', '')}
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-600 hover:text-white transition-colors"
                  >
                    <Github size={14} />
                  </a>
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
