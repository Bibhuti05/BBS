import React, { forwardRef } from 'react';
import { Briefcase } from 'lucide-react';
import { Experience } from '../types';

interface ExperienceCardProps {
  experience: Experience;
  index: number;
  isActive: boolean; // true if this specific card is currently expanded
  onClick: () => void;
}

const ExperienceCard = forwardRef<HTMLDivElement, ExperienceCardProps>(
  ({ experience, index, isActive, onClick }, ref) => {
    
    const isEven = index % 2 === 0;

    const gradientClasses = isEven
      ? 'bg-gradient-to-r md:bg-gradient-to-l from-white via-white/90 to-transparent dark:from-zinc-800 dark:via-zinc-800/90 dark:to-transparent'
      : 'bg-gradient-to-r from-white via-white/90 to-transparent dark:from-zinc-800 dark:via-zinc-800/90 dark:to-transparent';

    return (
      <div 
        ref={ref}
        className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pr-12 text-left md:text-right' : 'md:pl-12 text-left'}`}
      >
        <div 
          onClick={onClick}
          className={`
            relative overflow-hidden
            bg-white dark:bg-zinc-800 rounded-2xl shadow-sm hover:shadow-md 
            border border-zinc-100 dark:border-zinc-700 group cursor-pointer 
            transition-all duration-300 hover:scale-[1.02]
            ${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}
          `}
        >
          {/* Background Image Container */}
          {experience.logo && (
            <img 
              src={experience.logo} 
              alt={`${experience.company} logo`}
              className={`absolute top-0 bottom-0 h-full w-[85%] md:w-[70%] object-cover opacity-20 dark:opacity-30 pointer-events-none transition-transform duration-700 group-hover:scale-110 z-0 ${
                isEven 
                  ? 'right-0 md:right-auto md:left-0 object-right md:object-left' 
                  : 'right-0 object-right'
              }`}
            />
          )}

          {/* Gradient Overlay */}
          <div className={`absolute inset-0 z-0 pointer-events-none ${gradientClasses}`} />

          {/* Content Wrapper */}
          <div className="relative z-10 p-6">
            <div className={`inline-flex items-center gap-2 mb-2 px-3 py-1 rounded-full text-xs font-medium bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 ${isEven ? 'md:flex-row-reverse' : ''}`}>
              <Briefcase size={14} />
              {experience.period}
            </div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-1 group-hover:text-primary-500 transition-colors">
              {experience.role}
            </h3>
            <h4 className="text-lg font-medium text-zinc-700 dark:text-zinc-300 mb-3">
              {experience.company}
            </h4>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed line-clamp-3">
              {experience.description}
            </p>
            <div className={`mt-4 flex ${isEven ? 'md:justify-end' : 'justify-start'}`}>
               <span className="text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wide border-b border-transparent group-hover:border-primary-500 transition-colors">
                  View Details
               </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

ExperienceCard.displayName = 'ExperienceCard';

export default ExperienceCard;