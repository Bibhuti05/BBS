import React, { useRef, useState, useCallback, useEffect } from 'react';
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

const CARD_W = 200;
const GAP = 16;
const MAX_OFFSET = 5;
const BASE_ROT = 8;
const BASE_SKEW_X = 5;
const BASE_SKEW_Y = 16;
const BASE_SCALE = 0.1;
const SCROLL_SPEED = 0.5;

const Skills: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const [offsets, setOffsets] = useState<number[]>([]);

  const baseSkills = SKILL_GROUPS.flatMap((g) => g.skills);
  const allSkills = [...baseSkills, ...baseSkills, ...baseSkills];

  const totalSetWidth = baseSkills.length * (CARD_W + GAP);

  const updateOffsets = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    const scrollCenter = el.scrollLeft + el.clientWidth / 2;

    setOffsets(
      allSkills.map((_, i) => {
        const cardCenter = i * (CARD_W + GAP) + CARD_W / 2;
        return (cardCenter - scrollCenter) / (CARD_W + GAP);
      })
    );
  }, [allSkills.length]);

  useEffect(() => {
    updateOffsets();
    const el = containerRef.current;
    if (!el) return;

    // Start at the beginning of the second set for seamless loop
    el.scrollLeft = totalSetWidth;

    // Always update offsets on scroll (even when paused / user scrolling manually)
    const onScroll = () => updateOffsets();
    el.addEventListener('scroll', onScroll, { passive: true });

    let raf: number;

    const tick = () => {
      if (!pausedRef.current && el) {
        el.scrollLeft += SCROLL_SPEED;

        // Loop: when we've scrolled past the second set, jump back
        if (el.scrollLeft >= totalSetWidth * 2) {
          el.scrollLeft = totalSetWidth;
        }
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('scroll', onScroll);
    };
  }, [updateOffsets, totalSetWidth]);

  const handleMouseEnter = () => { pausedRef.current = true; };
  const handleMouseLeave = () => { pausedRef.current = false; };

  return (
    <section id="skills" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          className="mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
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

        <div
          ref={containerRef}
          className="flex overflow-x-auto scrollbar-thin py-8"
          style={{ gap: `${GAP}px` }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {allSkills.map((skillName, i) => {
            const Icon = SKILL_ICONS[skillName];
            const raw = offsets[i] ?? 0;
            const clamped = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, raw));
            const t = clamped / MAX_OFFSET;

            const rotate = t * BASE_ROT;
            const skewX = t * -BASE_SKEW_X;
            const skewY = t * BASE_SKEW_Y;
            const scale = 1 - Math.abs(t) ** 1.5 * (1 - BASE_SCALE);
            const translateY = Math.abs(t) * 8;
            const opacity = 1 - Math.abs(t) ** 1.5 * 0.95;

            return (
              <motion.div
                key={`${skillName}-${i}`}
                style={{
                  transform: `rotate(${rotate}deg) skew(${skewX}deg, ${skewY}deg) scale(${scale}) translateY(${translateY}px)`,
                  opacity,
                  willChange: 'transform, opacity',
                }}
                className="flex h-[200px] w-[200px] shrink-0 flex-col items-center justify-center gap-4 rounded-2xl border border-[#2e2e2c] bg-white/60 dark:bg-[#1c1c1a] p-6"
              >
                <div className="text-zinc-500 dark:text-[#A8A29E]">
                  {Icon && <Icon size={48} />}
                </div>
                <span className="text-center text-base font-medium text-zinc-700 dark:text-[#DAD6CE]">
                  {skillName}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
