
import React, { useEffect, useState } from 'react';
import { Home, Code2, Briefcase, FolderGit2, Mail } from 'lucide-react';

const NAV_ITEMS = [
  { name: 'Home', href: '#hero', icon: Home },
  { name: 'Skills', href: '#skills', icon: Code2 },
  { name: 'Experience', href: '#experience', icon: Briefcase },
  { name: 'Portfolio', href: '#portfolio', icon: FolderGit2 },
  { name: 'Contact', href: '#contact', icon: Mail },
];

const MobileNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const item of NAV_ITEMS) {
        const sectionId = item.href.replace('#', '');
        const element = document.getElementById(sectionId);
        
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
             setActiveSection(sectionId);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Trigger once on mount to set initial active state
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="md:hidden fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-auto max-w-[95vw]">
      <nav className="flex items-center justify-between px-6 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-full shadow-2xl shadow-primary-900/20 dark:shadow-black/50 ring-1 ring-black/5 dark:ring-white/10">
        <ul className="flex items-center gap-6 sm:gap-8">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.replace('#', '');
            return (
              <li key={item.name}>
                <a 
                  href={item.href}
                  className={`relative flex flex-col items-center justify-center transition-all duration-300 group ${
                    isActive 
                      ? 'text-primary-600 dark:text-primary-400 -translate-y-1' 
                      : 'text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                  aria-label={item.name}
                >
                  <item.icon 
                    size={24} 
                    strokeWidth={isActive ? 2.5 : 2} 
                    className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}
                  />
                  
                  {isActive && (
                    <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-600 dark:bg-primary-400 rounded-full animate-pulse"></span>
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default MobileNav;
