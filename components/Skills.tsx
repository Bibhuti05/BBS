import React from 'react';
import { motion } from 'framer-motion';
import {
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiJavascript,
  SiPostgresql,
  SiMysql,
  SiSqlite,
  SiMongodb,
  SiRedis,
  SiPrisma,
  SiSocketdotio,
  SiGithub,
  SiGit,
  SiNpm,
  SiBun,
  SiHtml5,
  SiCss,
} from 'react-icons/si';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const SKILL_ICONS: Record<string, React.FC<{ size: number; color?: string }>> = {
  'React / Next.js': SiReact,
  'TypeScript': SiTypescript,
  'Tailwind CSS': SiTailwindcss,
  'React Native': SiReact,
  'Node.js': SiNodedotjs,
  'JavaScript': SiJavascript,
  'PostgreSQL': SiPostgresql,
  'MySQL': SiMysql,
  'SQLite': SiSqlite,
  'MongoDB': SiMongodb,
  'Redis': SiRedis,
  'Prisma': SiPrisma,
  'Socket.io': SiSocketdotio,
  'GitHub': SiGithub,
  'Git': SiGit,
  'npm': SiNpm,
  'Bun': SiBun,
  'HTML': SiHtml5,
  'CSS': SiCss,
};

interface SkillGroup {
  label: string;
  skills: string[];
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    label: 'Frontend',
    skills: ['React / Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'React Native', 'HTML', 'CSS'],
  },
  {
    label: 'Backend',
    skills: ['Node.js', 'PostgreSQL', 'MySQL', 'SQLite', 'MongoDB', 'Redis', 'Prisma', 'Socket.io'],
  },
  {
    label: 'Tools',
    skills: ['Git', 'GitHub', 'npm', 'Bun'],
  },
];

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          className="mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight"
            variants={fadeUp}
          >
            Technical <span className="text-zinc-400 dark:text-[#78716c]">Proficiency</span>
          </motion.h2>
          <motion.p
            className="text-lg text-zinc-500 dark:text-[#C2BDB2] max-w-xl"
            variants={fadeUp}
          >
            Technologies and tools I use to build performant and scalable applications.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {SKILL_GROUPS.map((group, groupIndex) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
            >
              <h3 className="text-xs font-medium uppercase tracking-widest text-zinc-500 dark:text-[#78716c] mb-8">
                {group.label}
              </h3>
              <div className="space-y-0">
                {group.skills.map((skillName, i) => {
                  const Icon = SKILL_ICONS[skillName];
                  const isLast = i === group.skills.length - 1;
                  return (
                    <div
                      key={skillName}
                      className={`flex items-center gap-4 py-4 ${!isLast ? 'border-b border-[#2e2e2c]' : ''}`}
                    >
                      <div className="text-zinc-400 dark:text-[#57534e]">
                        {Icon && <Icon size={18} />}
                      </div>
                      <span className="text-base text-zinc-700 dark:text-[#DAD6CE]">
                        {skillName}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
