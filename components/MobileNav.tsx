
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Code2, Briefcase, FolderGit2, Mail, BookOpen, MoreHorizontal } from 'lucide-react';

const NAV_ITEMS = [
  { name: 'Home', href: '#hero', icon: Home, isRoute: false },
  { name: 'Skills', href: '#skills', icon: Code2, isRoute: false },
  { name: 'Experience', href: '#experience', icon: Briefcase, isRoute: false },
  { name: 'Portfolio', href: '#portfolio', icon: FolderGit2, isRoute: false },
];

const MORE_ITEMS = [
  { name: 'Blog', href: '/blog', icon: BookOpen, isRoute: true },
  { name: 'Contact', href: '#contact', icon: Mail, isRoute: false },
];

const MobileNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [moreOpen, setMoreOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';
  const morePanelRef = useRef<HTMLDivElement>(null);
  const moreBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isHomePage) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const item of NAV_ITEMS) {
        if (item.isRoute) continue;
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
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  useEffect(() => {
    if (!moreOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        morePanelRef.current && !morePanelRef.current.contains(e.target as Node) &&
        moreBtnRef.current && !moreBtnRef.current.contains(e.target as Node)
      ) {
        setMoreOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [moreOpen]);

  const handleNavClick = useCallback((href: string, isRoute: boolean) => {
    setMoreOpen(false);
    if (!isHomePage && !isRoute) {
      navigate(`/${href}`);
    }
  }, [isHomePage, navigate]);

  return (
    <div className="md:hidden fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-auto max-w-[95vw]">
      <nav className="relative flex items-center justify-between px-3 py-2 bg-white/40 dark:bg-zinc-800/40 backdrop-blur border border-zinc-200/50 dark:border-zinc-700/50 rounded-full shadow-2xl shadow-black/15 dark:shadow-black/60">
        <ul className="flex items-center gap-4 sm:gap-6">
          {NAV_ITEMS.map((item) => {
            const isActive = isHomePage && activeSection === item.href.replace('#', '');

            return (
              <li key={item.name}>
                <a 
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href, false);
                  }}
                  className={`flex items-center justify-center p-1.5 rounded-full transition-all duration-300 group ${
                    isActive 
                      ? 'text-primary-600 dark:text-primary-400 bg-primary-600/10 dark:bg-primary-400/10'
                      : 'text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
                  }`}
                  aria-label={item.name}
                >
                  <item.icon 
                    size={20} 
                    strokeWidth={isActive ? 2.5 : 2} 
                    className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}
                  />
                </a>
              </li>
            );
          })}

          <li>
            <button
              ref={moreBtnRef}
              onClick={() => setMoreOpen((prev) => !prev)}
              className={`flex items-center justify-center p-1.5 rounded-full transition-all duration-300 ${
                moreOpen
                  ? 'text-primary-600 dark:text-primary-400 bg-primary-600/10 dark:bg-primary-400/10'
                  : 'text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
              aria-label="More"
            >
              <MoreHorizontal size={20} />
            </button>
          </li>
        </ul>

        {moreOpen && (
          <div
            ref={morePanelRef}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 flex gap-2 px-3 py-2 bg-white/80 dark:bg-zinc-800/80 backdrop-blur border border-zinc-200/50 dark:border-zinc-700/50 rounded-2xl shadow-xl shadow-black/10 dark:shadow-black/50 animate-more-expand origin-bottom"
          >
            {MORE_ITEMS.map((item) => {
              const isActive = item.isRoute
                ? location.pathname.startsWith('/blog')
                : false;

              if (item.isRoute) {
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center justify-center p-1.5 rounded-full transition-all duration-300 group ${
                      isActive
                        ? 'text-primary-600 dark:text-primary-400 bg-primary-600/10 dark:bg-primary-400/10'
                        : 'text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
                    }`}
                    aria-label={item.name}
                  >
                    <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                  </Link>
                );
              }

              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href, false);
                  }}
                  className="flex items-center justify-center p-1.5 rounded-full text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 transition-all duration-300"
                  aria-label={item.name}
                >
                  <item.icon size={20} />
                </a>
              );
            })}
          </div>
        )}
      </nav>
    </div>
  );
};

export default MobileNav;
