import React, { useRef } from 'react';
import { PROJECTS } from '../constants';
import { ExternalLink, Github } from 'lucide-react';

const ProjectCard: React.FC<{ project: typeof PROJECTS[0] }> = ({ project }) => {
  const divRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    divRef.current.style.setProperty('--mouse-x', `${x}px`);
    divRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      className="group relative rounded-2xl bg-gray-100 dark:bg-gray-800 overflow-hidden card-spotlight transition-transform duration-300 hover:-translate-y-2"
    >
        {/* Border Gradient Overlay */}
      <div className="card-spotlight-border absolute inset-0 z-[2] rounded-2xl border-2 border-transparent"></div>

      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
            <div className="flex gap-2">
                <a href={project.link} className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-primary-500 transition-colors">
                    <Github size={18} />
                </a>
                <a href={project.link} className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-primary-500 transition-colors">
                    <ExternalLink size={18} />
                </a>
            </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative p-6 z-10 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm h-full">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-500 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
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
    </div>
  );
};

const Projects: React.FC = () => {
  return (
    <section id="portfolio" className="py-20 bg-white/30 dark:bg-black/20 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Featured <span className="text-primary-600 dark:text-primary-400">Projects</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A selection of projects that showcase my passion for building high-quality software.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;