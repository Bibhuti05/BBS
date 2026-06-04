import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { SKILLS } from '../constants';
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

const SKILL_ICONS: Record<string, React.FC<{ size: number }>> = {
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

function hexToRgba(hex: string, alpha: number): string {
  const n = parseInt(hex.replace('#', ''), 16);
  return `rgba(${(n >> 16) & 0xff},${(n >> 8) & 0xff},${n & 0xff},${alpha})`;
}

function lighten(hex: string, pct: number): string {
  const n = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, ((n >> 16) & 0xff) + Math.round(255 * pct));
  const g = Math.min(255, ((n >> 8) & 0xff) + Math.round(255 * pct));
  const b = Math.min(255, (n & 0xff) + Math.round(255 * pct));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

function darken(hex: string, pct: number): string {
  const n = parseInt(hex.replace('#', ''), 16);
  const r = Math.max(0, ((n >> 16) & 0xff) - Math.round(255 * pct));
  const g = Math.max(0, ((n >> 8) & 0xff) - Math.round(255 * pct));
  const b = Math.max(0, (n & 0xff) - Math.round(255 * pct));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

interface BrandStyle {
  brand: string;
  light: [string, string];
  dark: [string, string];
  iconLight: string;
  iconDark: string;
}

const BRAND: Record<string, BrandStyle> = {
  'React / Next.js': { brand: '#61DAFB', light: [lighten('#61DAFB', 0.55), '#61DAFB'], dark: ['#61DAFB', darken('#61DAFB', 0.2)], iconLight: '#18181b', iconDark: '#ffffff' },
  'TypeScript':      { brand: '#3178C6', light: [lighten('#3178C6', 0.55), '#3178C6'], dark: ['#3178C6', darken('#3178C6', 0.2)], iconLight: '#ffffff', iconDark: '#ffffff' },
  'Tailwind CSS':    { brand: '#06B6D4', light: [lighten('#06B6D4', 0.55), '#06B6D4'], dark: ['#06B6D4', darken('#06B6D4', 0.2)], iconLight: '#18181b', iconDark: '#ffffff' },
  'React Native':    { brand: '#61DAFB', light: [lighten('#61DAFB', 0.55), '#61DAFB'], dark: ['#61DAFB', darken('#61DAFB', 0.2)], iconLight: '#18181b', iconDark: '#ffffff' },
  'Node.js':         { brand: '#339933', light: [lighten('#339933', 0.55), '#339933'], dark: ['#339933', darken('#339933', 0.2)], iconLight: '#ffffff', iconDark: '#ffffff' },
  'JavaScript':      { brand: '#F7DF1E', light: [lighten('#F7DF1E', 0.3), '#F7DF1E'], dark: ['#F7DF1E', darken('#F7DF1E', 0.05)], iconLight: '#18181b', iconDark: '#18181b' },
  'PostgreSQL':      { brand: '#4169E1', light: [lighten('#4169E1', 0.55), '#4169E1'], dark: ['#4169E1', darken('#4169E1', 0.2)], iconLight: '#ffffff', iconDark: '#ffffff' },
  'MySQL':           { brand: '#4479A1', light: [lighten('#4479A1', 0.55), '#4479A1'], dark: ['#4479A1', darken('#4479A1', 0.2)], iconLight: '#ffffff', iconDark: '#ffffff' },
  'SQLite':          { brand: '#003B57', light: [lighten('#003B57', 0.55), '#003B57'], dark: ['#003B57', darken('#003B57', 0.15)], iconLight: '#ffffff', iconDark: '#ffffff' },
  'MongoDB':         { brand: '#47A248', light: [lighten('#47A248', 0.55), '#47A248'], dark: ['#47A248', darken('#47A248', 0.2)], iconLight: '#ffffff', iconDark: '#ffffff' },
  'Redis':           { brand: '#DC382D', light: [lighten('#DC382D', 0.55), '#DC382D'], dark: ['#DC382D', darken('#DC382D', 0.2)], iconLight: '#ffffff', iconDark: '#ffffff' },
  'Prisma':          { brand: '#2D3748', light: [lighten('#2D3748', 0.55), '#2D3748'], dark: ['#2D3748', darken('#2D3748', 0.1)], iconLight: '#ffffff', iconDark: '#ffffff' },
  'Socket.io':       { brand: '#010101', light: [lighten('#010101', 0.75), '#010101'], dark: [lighten('#010101', 0.45), '#010101'], iconLight: '#ffffff', iconDark: '#ffffff' },
  'GitHub':          { brand: '#181616', light: [lighten('#181616', 0.75), '#181616'], dark: [lighten('#181616', 0.45), '#181616'], iconLight: '#ffffff', iconDark: '#ffffff' },
  'Git':             { brand: '#F05032', light: [lighten('#F05032', 0.55), '#F05032'], dark: ['#F05032', darken('#F05032', 0.2)], iconLight: '#ffffff', iconDark: '#ffffff' },
  'npm':             { brand: '#CB3837', light: [lighten('#CB3837', 0.55), '#CB3837'], dark: ['#CB3837', darken('#CB3837', 0.2)], iconLight: '#ffffff', iconDark: '#ffffff' },
  'Bun':             { brand: '#000000', light: [lighten('#000000', 0.75), '#000000'], dark: [lighten('#000000', 0.45), '#000000'], iconLight: '#ffffff', iconDark: '#ffffff' },
  'HTML':            { brand: '#E34F26', light: [lighten('#E34F26', 0.55), '#E34F26'], dark: ['#E34F26', darken('#E34F26', 0.2)], iconLight: '#ffffff', iconDark: '#ffffff' },
  'CSS':             { brand: '#1572B6', light: [lighten('#1572B6', 0.55), '#1572B6'], dark: ['#1572B6', darken('#1572B6', 0.2)], iconLight: '#ffffff', iconDark: '#ffffff' },
};

const HOVER_SCALE = 1.3;
const MAX_PUSH = 55;
const PUSH_DECAY = 190;
const SPRING = 0.1;
const DAMP = 0.78;
const R_LERP = 0.22;

const BASE_MOBILE = 28;
const BASE_DESKTOP = 40;
const ICON_RATIO = 0.55;

const HEIGHT_MOBILE = 340;
const HEIGHT_DESKTOP = 460;

interface Bubble {
  restX: number;
  restY: number;
  restR: number;
  tx: number;
  ty: number;
  tr: number;
  cx: number;
  cy: number;
  r: number;
  vx: number;
  vy: number;
  name: string;
}

function getIsDark(): boolean {
  return (
    document.documentElement.classList.contains('dark') ||
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
}

function hexLayout(
  w: number,
  h: number,
  count: number,
  size: number,
  gap: number,
): Array<{ x: number; y: number }> {
  const cellW = size * 2 + gap;
  const cellH = cellW * 0.866;

  let cols = Math.max(2, Math.floor(w * 0.92 / cellW));
  const rows = Math.ceil(count / cols);

  const totalW = cols * cellW;
  const totalH = rows * cellH;
  const ox = (w - totalW) / 2 + cellW / 2;
  const oy = (h - totalH) / 2 + cellH / 2;

  const positions: Array<{ x: number; y: number }> = [];
  for (let row = 0; row < rows; row++) {
    const offset = (row % 2) * cellW * 0.5;
    for (let col = 0; col < cols; col++) {
      if (positions.length >= count) break;
      positions.push({
        x: col * cellW + offset + ox,
        y: row * cellH + oy,
      });
    }
  }

  const j = cellW * 0.015;
  return positions.map((p) => ({
    x: p.x + (Math.random() - 0.5) * j * 2,
    y: p.y + (Math.random() - 0.5) * j * 2,
  }));
}

function easeOutBack(t: number): number {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}

const Skills: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const bubbleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stateRef = useRef<{
    bubbles: Bubble[];
    hovered: number | null;
    isDark: boolean;
    base: number;
  } | null>(null);
  const isMobileRef = useRef(window.innerWidth < 768);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setIsVisible(true); obs.disconnect(); } },
      { threshold: 0.1 },
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const fn = () => { isMobileRef.current = window.innerWidth < 768; };
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const container = containerRef.current;
    if (!container) return;

    const isMobile = isMobileRef.current;
    const base = isMobile ? BASE_MOBILE : BASE_DESKTOP;
    const h = isMobile ? HEIGHT_MOBILE : HEIGHT_DESKTOP;
    const gap = isMobile ? 6 : 10;

    container.style.height = `${h}px`;

    const rect = container.getBoundingClientRect();
    const w = rect.width;
    if (w === 0) return;

    const positions = hexLayout(w, h, SKILLS.length, base, gap);

    const bubbles: Bubble[] = SKILLS.map((skill, i) => ({
      restX: positions[i].x,
      restY: positions[i].y,
      restR: base,
      tx: positions[i].x,
      ty: positions[i].y,
      tr: 0,
      cx: positions[i].x,
      cy: positions[i].y,
      r: 0,
      vx: 0,
      vy: 0,
      name: skill.name,
    }));

    stateRef.current = { bubbles, hovered: null, isDark: getIsDark(), base };

    const introDelay = bubbles.map((_, i) => i * 45);
    const introDur = bubbles.map(() => 500);
    let start: number | null = null;

    const tick = (ts: number) => {
      const s = stateRef.current;
      if (!s) return;
      if (start === null) start = ts;
      const elapsed = ts - start;
      s.isDark = getIsDark();

      for (let i = 0; i < s.bubbles.length; i++) {
        const b = s.bubbles[i];
        const isH = i === s.hovered;

        if (isH) {
          b.tr = b.restR * HOVER_SCALE;
          b.tx = b.restX;
          b.ty = b.restY;
        } else if (s.hovered !== null) {
          b.tr = b.restR;
          const hb = s.bubbles[s.hovered];
          const dx = b.restX - hb.restX;
          const dy = b.restY - hb.restY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 1) {
            const push = MAX_PUSH * Math.exp(-dist / PUSH_DECAY);
            b.tx = b.restX + (dx / dist) * push;
            b.ty = b.restY + (dy / dist) * push;
          } else {
            b.tx = b.restX;
            b.ty = b.restY;
          }
        } else {
          b.tr = b.restR;
          b.tx = b.restX;
          b.ty = b.restY;
        }

        b.vx = (b.vx + (b.tx - b.cx) * SPRING) * DAMP;
        b.vy = (b.vy + (b.ty - b.cy) * SPRING) * DAMP;
        b.cx += b.vx;
        b.cy += b.vy;
        b.r += (b.tr - b.r) * R_LERP;
      }

      for (let i = 0; i < s.bubbles.length; i++) {
        const b = s.bubbles[i];
        let introR = 0;
        if (elapsed > introDelay[i]) {
          const t = Math.min((elapsed - introDelay[i]) / introDur[i], 1);
          introR = b.restR * easeOutBack(t);
        }
        const physR = b.r > 0 ? b.r : 0;
        const finalR = Math.max(physR, introR);

        const el = bubbleRefs.current[i];
        if (!el) continue;

        const bc = BRAND[b.name];
        const colors = s.isDark ? bc.dark : bc.light;
        const iconClr = s.isDark ? bc.iconDark : bc.iconLight;
        const isHvd = i === s.hovered;
        const scale = finalR / s.base;

        el.style.opacity = finalR > 0.5 ? '1' : '0';
        el.style.transform = `translate(${b.cx - s.base}px, ${b.cy - s.base}px) scale(${scale})`;
        el.style.background = `radial-gradient(circle at 35% 35%, ${colors[0]}, ${colors[1]})`;
        el.style.color = iconClr;
        el.style.boxShadow = isHvd
          ? `0 0 ${Math.round(finalR * 0.6)}px ${hexToRgba(bc.brand, 0.5)}, 0 0 ${Math.round(finalR * 1.2)}px ${hexToRgba(bc.brand, 0.2)}`
          : `0 0 0px transparent`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    const onResize = () => {
      const s = stateRef.current;
      if (!s) return;
      const m = isMobileRef.current;
      const b = m ? BASE_MOBILE : BASE_DESKTOP;
      const g = m ? 6 : 10;
      const newH = m ? HEIGHT_MOBILE : HEIGHT_DESKTOP;
      s.base = b;
      container.style.height = `${newH}px`;
      const rect = container.getBoundingClientRect();
      const w = rect.width;
      if (w === 0) return;
      const pos = hexLayout(w, newH, s.bubbles.length, b, g);
      for (let i = 0; i < s.bubbles.length; i++) {
        s.bubbles[i].restX = pos[i].x;
        s.bubbles[i].restY = pos[i].y;
        s.bubbles[i].restR = b;
      }
    };

    const ro = new ResizeObserver(onResize);
    ro.observe(container);

    const mo = new MutationObserver(() => {
      if (stateRef.current) stateRef.current.isDark = getIsDark();
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      mo.disconnect();
    };
  }, [isVisible]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const s = stateRef.current;
    if (!s || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    let closest = -1;
    let closestD = Infinity;
    for (let i = 0; i < s.bubbles.length; i++) {
      const b = s.bubbles[i];
      const dx = mx - b.cx;
      const dy = my - b.cy;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < b.restR * HOVER_SCALE && d < closestD) {
        closestD = d;
        closest = i;
      }
    }
    s.hovered = closest >= 0 ? closest : null;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (stateRef.current) stateRef.current.hovered = null;
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-20 bg-white/50 dark:bg-dark-card/50 backdrop-blur-sm overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4"
            variants={fadeUp}
          >
            Technical{' '}
            <span className="text-primary-600 dark:text-primary-400">Proficiency</span>
          </motion.h2>
          <motion.p
            className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto"
            variants={fadeUp}
          >
            A curated list of the technologies and tools I use to build
            performant and scalable applications.
          </motion.p>
        </motion.div>

        <div
          ref={containerRef}
          className="relative w-full"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {SKILLS.map((skill, i) => {
            const Icon = SKILL_ICONS[skill.name];
            const base = isMobileRef.current ? BASE_MOBILE : BASE_DESKTOP;
            return (
              <div
                key={skill.name}
                ref={(el) => { bubbleRefs.current[i] = el; }}
                className="absolute top-0 left-0 rounded-full flex items-center justify-center pointer-events-none select-none"
                style={{
                  width: base * 2,
                  height: base * 2,
                  transformOrigin: `${base}px ${base}px`,
                  willChange: 'transform, opacity',
                  opacity: 0,
                  border: '1px solid rgba(255,255,255,0.25)',
                }}
              >
                {Icon && <Icon size={base * 2 * ICON_RATIO} />}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;