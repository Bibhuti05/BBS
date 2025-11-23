import React, { useState, useEffect, useRef } from 'react';
import { SKILLS } from '../constants';
import { Skill } from '../types';

const SkillCard: React.FC<{ skill: Skill; index: number; isVisible: boolean }> = ({ skill, index, isVisible }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const duration = 1000;
      const steps = 60;
      const stepTime = duration / steps;
      const increment = skill.level / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= skill.level) {
          setCount(skill.level);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, stepTime);
      
      return () => clearInterval(timer);
    } else {
      setCount(0);
    }
  }, [isVisible, skill.level]);

  return (
    <div 
      className="group p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-primary-500/50 dark:hover:border-primary-500/50 shadow-sm hover:shadow-lg hover:shadow-primary-500/10 transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 rounded-lg bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 group-hover:scale-110 transition-transform duration-300">
          {skill.icon}
        </div>
        <span className="text-2xl font-bold text-gray-300 dark:text-gray-600 group-hover:text-primary-500/20 transition-colors">
          0{index + 1}
        </span>
      </div>
      <div className="flex justify-between items-end mb-3">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {skill.name}
        </h3>
        <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
          {count}%
        </span>
      </div>
      <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-primary-500 to-emerald-400 rounded-full transition-all duration-1000 ease-out group-hover:!w-full"
          style={{ width: `${isVisible ? skill.level : 0}%` }}
        ></div>
      </div>
    </div>
  );
};

const Skills: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="py-20 bg-white/50 dark:bg-dark-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Technical <span className="text-primary-600 dark:text-primary-400">Proficiency</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A curated list of the technologies and tools I use to build performant and scalable applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SKILLS.map((skill, index) => (
            <SkillCard 
              key={skill.name} 
              skill={skill} 
              index={index} 
              isVisible={isVisible} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;