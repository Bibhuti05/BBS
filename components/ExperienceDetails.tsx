
import React, { useEffect, useState } from 'react';
import { X, Briefcase, CheckCircle2 } from 'lucide-react';
import { Experience } from '../types';

interface ExperienceDetailsProps {
  experience: Experience;
  initialRect: DOMRect | null;
  onClose: () => void;
}

const ExperienceDetails: React.FC<ExperienceDetailsProps> = ({ experience, initialRect, onClose }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Trigger entry animation with a small delay to ensure DOM is painted with initial state
    const timer = setTimeout(() => {
      setIsAnimating(true);
    }, 50);

    // Lock body scroll
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timer);
    };
  }, []);

  const handleClose = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsClosing(true);
    setIsAnimating(false);
    
    // Wait for animation to finish before unmounting
    setTimeout(() => {
      onClose();
    }, 500);
  };

  // Calculate styles for desktop "card expansion" animation
  const getDesktopStyles = (): React.CSSProperties => {
    if (!initialRect) return {};
    
    if (isAnimating && !isClosing) {
      // Final State (Centered Modal)
      return {
        position: 'fixed',
        top: '50%',
        left: '50%',
        width: 'min(90vw, 900px)',
        height: 'auto',
        maxHeight: '85vh',
        transform: 'translate(-50%, -50%)',
        zIndex: 70, // High z-index to stay above backdrop
      };
    }
    
    // Initial/Exit State (Matches the clicked card)
    return {
      position: 'fixed',
      top: `${initialRect.top}px`,
      left: `${initialRect.left}px`,
      width: `${initialRect.width}px`,
      height: `${initialRect.height}px`,
      transform: 'translate(0, 0)',
      zIndex: 70,
    };
  };

  return (
    <>
      {/* Backdrop - z-[60] ensures it covers header (z-50) and mobile nav (z-50) */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-500 ${
          isAnimating && !isClosing ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleClose}
      />

      {isMobile ? (
        /* --- MOBILE BOTTOM SHEET --- */
        /* z-[70] ensures it sits above the backdrop */
        <div 
          className={`
            fixed bottom-0 left-0 right-0 z-[70] bg-white dark:bg-gray-800 
            rounded-t-[2rem] shadow-2xl overflow-hidden flex flex-col
            transition-transform duration-500 ease-out h-[75vh] will-change-transform
            ${isAnimating && !isClosing ? 'translate-y-0' : 'translate-y-full'}
          `}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Drag Handle Area - Solid background to cover scrolling content */}
          <div className="w-full flex justify-center pt-4 pb-2 shrink-0 relative z-20 bg-white dark:bg-gray-800" onClick={handleClose}>
            <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full" />
          </div>

          {/* Close Button */}
          <button 
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300 z-30"
          >
            <X size={20} />
          </button>

          {/* Content Wrapper with Gradient Fade */}
          <div className="relative flex-1 overflow-hidden">
             {/* Top Fade Gradient - Creates the inset shadow/fade effect */}
             <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-white dark:from-gray-800 to-transparent z-10 pointer-events-none"></div>

             {/* Scrollable Content */}
             <div className="p-6 overflow-y-auto h-full pb-20 pt-2">
                <div className="flex items-center gap-4 mb-6 mt-2">
                    <img 
                      src={experience.logo} 
                      alt={`${experience.company} Logo`} 
                      className="w-16 h-16 rounded-xl shadow-md object-cover"
                    />
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{experience.role}</h2>
                      <p className="text-primary-600 dark:text-primary-400 font-medium">{experience.company}</p>
                    </div>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-sm font-medium mb-6">
                    <Briefcase size={16} /> {experience.period}
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Overview</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {experience.description}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Key Responsibilities</h3>
                    <ul className="space-y-3">
                      {experience.responsibilities.map((resp, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                          <CheckCircle2 className="w-5 h-5 text-primary-500 shrink-0 mt-0.5" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
             </div>
          </div>
        </div>
      ) : (
        /* --- DESKTOP EXPANDING CARD --- */
        <div 
          style={getDesktopStyles()}
          className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] flex flex-col md:flex-row"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button 
            onClick={handleClose}
            className={`
              absolute top-4 right-4 z-10 p-2 rounded-full 
              bg-gray-100/50 dark:bg-gray-700/50 backdrop-blur-sm
              text-gray-600 dark:text-gray-300 hover:bg-red-100 hover:text-red-500 transition-colors
              ${isAnimating && !isClosing ? 'opacity-100 delay-300' : 'opacity-0'}
            `}
          >
            <X size={24} />
          </button>

          {/* Left Side: Main Info */}
          <div className="w-full md:w-2/3 p-8 md:p-10 overflow-y-auto max-h-full custom-scrollbar">
             {/* Animate content opacity based on expansion */}
             <div className={`transition-opacity duration-300 ${isAnimating && !isClosing ? 'opacity-100 delay-150' : 'opacity-0'}`}>
                <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400 font-medium mb-2">
                   <Briefcase size={18} />
                   <span>{experience.period}</span>
                </div>
                
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {experience.role}
                </h2>
                <h3 className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                  at {experience.company}
                </h3>

                <div className="prose dark:prose-invert max-w-none">
                   <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Role Overview</h4>
                   <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                     {experience.description}
                   </p>

                   <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Key Responsibilities & Achievements</h4>
                   <ul className="space-y-4">
                     {experience.responsibilities.map((resp, idx) => (
                       <li key={idx} className="flex items-start gap-3">
                         <div className="mt-1.5 w-2 h-2 rounded-full bg-primary-500 shrink-0" />
                         <span className="text-gray-600 dark:text-gray-300">{resp}</span>
                       </li>
                     ))}
                   </ul>
                </div>
             </div>
          </div>

          {/* Right Side: Company Branding (Visible only on expansion) */}
          <div className="hidden md:flex w-1/3 bg-gray-50 dark:bg-gray-900/50 items-center justify-center p-10 border-l border-gray-100 dark:border-gray-700">
            <div className={`flex flex-col items-center text-center transition-all duration-500 delay-200 ${isAnimating && !isClosing ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
               <div className="w-32 h-32 rounded-2xl bg-white dark:bg-gray-800 shadow-lg p-4 mb-6 flex items-center justify-center">
                  <img src={experience.logo} alt={experience.company} className="w-full h-full object-contain" />
               </div>
               <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">{experience.company}</h3>
               <a href={experience.companyUrl} className="mt-4 text-sm text-primary-600 hover:underline">Visit Company Website</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ExperienceDetails;
