import React, { useEffect, useState } from 'react';
import { Contrast } from 'lucide-react';
import { Theme } from '../types';

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const [theme, setTheme] = useState<Theme>(Theme.DARK);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
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
    setRotation((prev) => prev + 180);
    setTheme((prev) => (prev === Theme.DARK ? Theme.LIGHT : Theme.DARK));
  };

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full transition-all duration-300 hover:shadow-[0_0_12px_rgba(239,68,68,0.4)] ${className}`}
      aria-label="Toggle Theme"
    >
      <Contrast
        size={20}
        className={theme === Theme.DARK ? 'text-white' : 'text-black'}
        style={{ transform: `rotate(${rotation}deg)`, transition: 'transform 0.5s ease-in-out' }}
      />
    </button>
  );
};

export default ThemeToggle;