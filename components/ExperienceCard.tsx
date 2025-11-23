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
    
    return (
      <div 
        ref={ref}
        className={`w-full md:w-1/2 pl-12 md:pl-0 ${index % 2 === 0 ? 'md:pr-12 text-left md:text-right' : 'md:pl-12 text-left'}`}
      >
        <div 
          onClick={onClick}
          className={`
            bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm hover:shadow-md 
            border border-gray-100 dark:border-gray-700 group cursor-pointer 
            transition-all duration-300 hover:scale-[1.02]
            ${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}
          `}
        >
          <div className={`inline-flex items-center gap-2 mb-2 px-3 py-1 rounded-full text-xs font-medium bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
            <Briefcase size={14} />
            {experience.period}
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-primary-500 transition-colors">
            {experience.role}
          </h3>
          <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">
            {experience.company}
          </h4>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-3">
            {experience.description}
          </p>
          <div className={`mt-4 flex ${index % 2 === 0 ? 'md:justify-end' : 'justify-start'}`}>
             <span className="text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wide border-b border-transparent group-hover:border-primary-500 transition-colors">
                View Details
             </span>
          </div>
        </div>
      </div>
    );
  }
);

ExperienceCard.displayName = 'ExperienceCard';

export default ExperienceCard;