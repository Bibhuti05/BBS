import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Theme } from '../types';

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const [theme, setTheme] = useState<Theme>(Theme.DARK);

  useEffect(() => {
    // Initialize theme from local storage or system preference
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (systemPrefersDark) {
      setTheme(Theme.DARK);
    } else {
      setTheme(Theme.LIGHT);
    }
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === Theme.DARK) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === Theme.DARK ? Theme.LIGHT : Theme.DARK));
  };

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 ${className}`}
      aria-label="Toggle Theme"
    >
      {theme === Theme.DARK ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-primary-600" />}
    </button>
  );
};

export default ThemeToggle;