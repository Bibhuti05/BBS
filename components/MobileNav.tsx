
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Code2, Briefcase, FolderGit2, Mail, BookOpen } from 'lucide-react';

const NAV_ITEMS = [
  { name: 'Home',      href: '#hero',       icon: Home,       isRoute: false },
  { name: 'Skills',    href: '#skills',     icon: Code2,      isRoute: false },
  { name: 'Work',      href: '#experience', icon: Briefcase,  isRoute: false },
  { name: 'Projects',  href: '#portfolio',  icon: FolderGit2, isRoute: false },
  { name: 'Blog',      href: '/blog',       icon: BookOpen,   isRoute: true  },
  { name: 'Contact',   href: '#contact',    icon: Mail,       isRoute: false },
];

const MobileNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    if (!isHomePage) return;
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      for (const item of NAV_ITEMS) {
        if (item.isRoute) continue;
        const id = item.href.replace('#', '');
        const el = document.getElementById(id);
        if (el && scrollPosition >= el.offsetTop && scrollPosition < el.offsetTop + el.offsetHeight) {
          setActiveSection(id);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  const handleClick = useCallback((href: string, isRoute: boolean) => {
    if (isRoute) return;
    if (!isHomePage) { navigate(`/${href}`); return; }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, [isHomePage, navigate]);

  return (
    <div className="md:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-50">
      <nav className="flex items-center gap-1 px-3 py-2 rounded-full bg-zinc-900/90 backdrop-blur-md border border-white/10">
        {NAV_ITEMS.map((item) => {
          const isActive = item.isRoute
            ? location.pathname.startsWith('/blog')
            : isHomePage && activeSection === item.href.replace('#', '');

          if (item.isRoute) {
            return (
              <Link
                key={item.name}
                to={item.href}
                aria-label={item.name}
                className={`flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200 ${
                  isActive ? 'bg-white text-zinc-900' : 'text-zinc-500 hover:text-white hover:bg-white/10'
                }`}
              >
                <item.icon size={16} />
              </Link>
            );
          }

          return (
            <button
              key={item.name}
              onClick={() => handleClick(item.href, item.isRoute)}
              aria-label={item.name}
              className={`flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200 ${
                isActive ? 'bg-white text-zinc-900' : 'text-zinc-500 hover:text-white hover:bg-white/10'
              }`}
            >
              <item.icon size={16} />
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default MobileNav;
