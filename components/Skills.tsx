import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const SKILL_GROUPS = [
  {
    label: 'Frontend',
    skills: ['React / Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'HTML', 'CSS'],
  },
  {
    label: 'Backend',
    skills: ['Node.js', 'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Prisma', 'Socket.io'],
  },
  {
    label: 'Tools',
    skills: ['Git', 'GitHub', 'Bun', 'Docker'],
  },
];

const STATS = [
  { value: '3+', label: 'Years building' },
  { value: '10+', label: 'Products shipped' },
  { value: '200+', label: 'Issues resolved' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

/* ───── live clock hook ───── */
function useLiveClock() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
          timeZone: 'Asia/Kolkata',
        })
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

/* ───── card wrapper ───── */
const Card: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
}> = ({ children, className = '', delay = 0 }) => (
  <motion.div
    className={`bg-[#141414] rounded-2xl border border-white/[0.06] ${className}`}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ duration: 0.5, delay }}
  >
    {children}
  </motion.div>
);

const Skills: React.FC = () => {
  const clock = useLiveClock();

  return (
    <section id="skills" className="bg-[#0a0a0a] text-white py-20 md:py-28">
      <div className="container mx-auto px-6">

        {/* ─── Section header ─── */}
        <motion.div
          className="flex items-start justify-between mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.h2
            className="text-3xl md:text-5xl font-bold tracking-tight text-white italic"
            variants={fadeUp}
          >
            Where I'm at, currently.
          </motion.h2>
          <motion.p
            className="hidden md:block text-xs font-mono text-zinc-600 mt-2"
            variants={fadeUp}
          >
            updated as things change
          </motion.p>
        </motion.div>

        {/* ─── Masonry bento grid ─── */}
        {/*
          Desktop layout (matching reference):
          ┌──────────────────────┬─────────────────────────────┐
          │                      │      latest video           │
          │     building         ├──────────────┬──────────────┤
          │     (tall card)      │   my time    │   learning   │
          ├───────────────────────┴──────────────┴──────────────┤
          │   what I reach for              │     so far       │
          └─────────────────────────────────┴──────────────────┘
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">

          {/* ── Row 1 + 2: Building card (tall, left) ── */}
          <Card className="lg:col-span-5 lg:row-span-2 p-7 flex flex-col justify-between min-h-[320px]" delay={0}>
            <div>
              <p className="text-[11px] font-mono text-zinc-600 tracking-widest mb-5">
                building
              </p>
              <p className="text-xl md:text-2xl font-semibold text-white leading-snug">
                Building Xplore — an anonymous video &amp; text chat app with WebRTC, real-time socket connections, and peer-to-peer streaming. Currently deep in performance tuning and scaling.
              </p>
            </div>
            <div className="mt-8 pt-5 border-t border-white/[0.06] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-mono text-zinc-500">
                Software Engineer&nbsp;&nbsp;/&nbsp;&nbsp;@bibhuticodes&nbsp;&nbsp;/&nbsp;&nbsp;Bangalore
              </span>
            </div>
          </Card>

          {/* ── Row 1 right: Latest video card ── */}
          <Card className="lg:col-span-7 p-5 flex items-center gap-5" delay={0.05}>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[11px] font-mono text-zinc-600 tracking-widest">
                  latest project
                </p>
                <a
                  href="https://xplore-production.up.railway.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center text-zinc-500 hover:text-white hover:border-white/25 transition-colors"
                >
                  <ArrowUpRight size={14} />
                </a>
              </div>
              <div className="flex items-center gap-4">
                <img
                  src="/assets/xplore.png"
                  alt="Xplore preview"
                  className="w-20 h-14 rounded-lg object-cover flex-shrink-0 bg-zinc-800"
                />
                <div>
                  <p className="text-sm font-semibold text-white">Xplore — Anonymous Video Chat</p>
                  <p className="text-xs font-mono text-zinc-600 mt-0.5">Next.js · WebRTC · Socket.io</p>
                </div>
              </div>
            </div>
          </Card>

          {/* ── Row 2 right: My time + Learning (side by side) ── */}
          <Card className="lg:col-span-4 p-5" delay={0.1}>
            <p className="text-[11px] font-mono text-zinc-600 tracking-widest mb-3">
              my time
            </p>
            <p className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              {clock}
            </p>
            <p className="text-xs font-mono text-zinc-600 mt-2">Bangalore</p>
          </Card>

          <Card className="lg:col-span-3 p-5" delay={0.15}>
            <p className="text-[11px] font-mono text-zinc-600 tracking-widest mb-3">
              learning
            </p>
            <p className="text-sm text-zinc-300 leading-relaxed">
              Getting comfortable with advanced database query planning, system design patterns, and distributed architectures.
            </p>
          </Card>

          {/* ── Row 3: Skills pills + Stats ── */}
          <Card className="lg:col-span-8 p-7" delay={0.2}>
            <p className="text-[11px] font-mono text-zinc-600 tracking-widest mb-5">
              what I reach for
            </p>
            <div className="space-y-5">
              {SKILL_GROUPS.map((group) => (
                <div key={group.label} className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono text-zinc-600 w-16 flex-shrink-0">
                    {group.label}
                  </span>
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-full border border-white/10 text-xs text-zinc-400 hover:border-white/25 hover:text-white transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </Card>

          <Card className="lg:col-span-4 p-7" delay={0.25}>
            <p className="text-[11px] font-mono text-zinc-600 tracking-widest mb-5">
              so far
            </p>
            <div className="space-y-4">
              {STATS.map((stat) => (
                <div key={stat.label} className="flex items-baseline gap-3">
                  <p className="text-3xl md:text-4xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs font-mono text-zinc-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </Card>

        </div>
      </div>
    </section>
  );
};

export default Skills;
