import React, { useState, useEffect, useRef, useCallback } from 'react';

/* ───── Types ───── */
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  angle: number;
  speed: number;
  duration: number;
  delay: number;
  layer: 'core' | 'mid' | 'outer' | 'debris';
}

interface Shockwave {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
}

/* ───── SkillPillCursor ───── */
interface SkillPillCursorProps {
  skillName: string;
  x: number;
  y: number;
  isVisible: boolean;
  clickPulse: boolean;
}

const SkillPillCursor: React.FC<SkillPillCursorProps> = ({ skillName, x, y, isVisible, clickPulse }) => (
  <div
    className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center whitespace-nowrap bg-black/40 text-white"
    style={{
      height: 40,
      padding: '0 16px',
      borderRadius: 9999,
      transform: `translate(${x}px, ${y - 20}px) translate(-50%, 0) scale(${clickPulse ? 1.15 : 1})`,
      opacity: isVisible ? 1 : 0,
      transition: clickPulse
        ? 'transform 120ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.15s ease-out'
        : 'transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s ease-out',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      fontSize: 14,
      fontWeight: 600,
      letterSpacing: 0.02,
    }}
  >
    {skillName}
  </div>
);

/* ───── Component ───── */
const InvertedCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [shockwaves, setShockwaves] = useState<Shockwave[]>([]);
  const [clickPulse, setClickPulse] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const particleIdRef = useRef(0);
  const shockwaveIdRef = useRef(0);
  const isVisibleRef = useRef(false);

  // Keep ref in sync for event listeners
  useEffect(() => { isVisibleRef.current = isVisible; }, [isVisible]);

  useEffect(() => {
    const handleSkillHover = (e: Event) => {
      const detail = (e as CustomEvent).detail as string | null;
      setHoveredSkill(detail);
    };
    window.addEventListener('skillHover', handleSkillHover);
    return () => window.removeEventListener('skillHover', handleSkillHover);
  }, []);

  /* ── Particle Factory ── */
  const createExplosion = useCallback((cx: number, cy: number) => {
    const newParticles: Particle[] = [];
    const nowId = particleIdRef.current;

    // ─ Core blast: small, fast, close
    for (let i = 0; i < 8; i++) {
      newParticles.push({
        id: nowId + i,
        x: cx,
        y: cy,
        size: 3 + Math.random() * 4,
        angle: Math.random() * Math.PI * 2,
        speed: 60 + Math.random() * 120,
        duration: 350 + Math.random() * 250,
        delay: Math.random() * 30,
        layer: 'core',
      });
    }

    // ─ Mid ring: medium burst
    for (let i = 0; i < 10; i++) {
      newParticles.push({
        id: nowId + 100 + i,
        x: cx + (Math.random() - 0.5) * 10,
        y: cy + (Math.random() - 0.5) * 10,
        size: 2 + Math.random() * 5,
        angle: (Math.PI * 2 * i) / 10 + (Math.random() - 0.5) * 0.4,
        speed: 100 + Math.random() * 180,
        duration: 450 + Math.random() * 350,
        delay: Math.random() * 50,
        layer: 'mid',
      });
    }

    // ─ Outer scatter: larger, farther
    for (let i = 0; i < 14; i++) {
      newParticles.push({
        id: nowId + 200 + i,
        x: cx,
        y: cy,
        size: 2 + Math.random() * 4,
        angle: Math.random() * Math.PI * 2,
        speed: 180 + Math.random() * 250,
        duration: 550 + Math.random() * 400,
        delay: Math.random() * 80,
        layer: 'outer',
      });
    }

    // ─ Debris: tiny, chaotic, slow fade
    for (let i = 0; i < 6; i++) {
      newParticles.push({
        id: nowId + 300 + i,
        x: cx + (Math.random() - 0.5) * 6,
        y: cy + (Math.random() - 0.5) * 6,
        size: 1 + Math.random() * 2,
        angle: Math.random() * Math.PI * 2,
        speed: 40 + Math.random() * 80,
        duration: 700 + Math.random() * 500,
        delay: Math.random() * 100,
        layer: 'debris',
      });
    }

    particleIdRef.current += 400;
    setParticles((prev) => [...prev, ...newParticles]);

    // Remove particles after animation ends
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newParticles.find((np) => np.id === p.id)));
    }, 1300);
  }, []);

  /* ── Shockwave Ring ── */
  const createShockwave = useCallback((cx: number, cy: number) => {
    const id = shockwaveIdRef.current++;
    const sw: Shockwave = {
      id,
      x: cx,
      y: cy,
      size: 20,
      duration: 500,
    };
    setShockwaves((prev) => [...prev, sw]);

    setTimeout(() => {
      setShockwaves((prev) => prev.filter((s) => s.id !== id));
    }, 600);
  }, []);

  /* ── Event Handlers ── */
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisibleRef.current) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);

    const handleClick = (e: MouseEvent) => {
      createExplosion(e.clientX, e.clientY);
      createShockwave(e.clientX, e.clientY);
      setClickPulse(true);
      setTimeout(() => setClickPulse(false), 250);
    };

    // Hide default cursor
    document.body.style.cursor = 'none';
    const html = document.documentElement;
    const originalHtmlCursor = html.style.cursor;
    html.style.cursor = 'none';

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleClick);

    return () => {
      document.body.style.cursor = '';
      html.style.cursor = originalHtmlCursor;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleClick);
    };
  }, [createExplosion, createShockwave]);

  const cursorSize = 40;
  const halfSize = cursorSize / 2;

  return (
    <>
      {/* ── Shockwave Rings ── */}
      {shockwaves.map((sw) => (
        <div
          key={sw.id}
          className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
          style={{
            width: `${sw.size}px`,
            height: `${sw.size}px`,
            left: sw.x - sw.size / 2,
            top: sw.y - sw.size / 2,
            border: '2px solid rgba(255,255,255,0.6)',
            backdropFilter: 'invert(1)',
            WebkitBackdropFilter: 'invert(1)',
            animation: `shockwaveExpand ${sw.duration}ms cubic-bezier(0.22, 1, 0.36, 1) forwards`,
          }}
        />
      ))}

      {/* ── Particles ── */}
      {particles.map((p) => {
        const endX = Math.cos(p.angle) * p.speed;
        const endY = Math.sin(p.angle) * p.speed;

        return (
          <div
            key={p.id}
            className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
            style={{
              width: p.size,
              height: p.size,
              left: p.x,
              top: p.y,
              marginLeft: -p.size / 2,
              marginTop: -p.size / 2,
              backdropFilter: 'invert(1)',
              WebkitBackdropFilter: 'invert(1)',
              animation: `particleBurst ${p.duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${p.delay}ms forwards`,
              // CSS custom properties for the keyframes
              ['--endX' as string]: `${endX}px`,
              ['--endY' as string]: `${endY}px`,
            }}
          />
        );
      })}

      {/* ── Main Cursor ── */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          width: cursorSize,
          height: cursorSize,
          transform: `translate(${position.x - halfSize}px, ${position.y - halfSize}px) scale(${clickPulse ? 1.4 : 1})`,
          opacity: isVisible && !hoveredSkill ? 1 : 0,
          transition: clickPulse
            ? 'transform 120ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.15s ease-out'
            : 'transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.15s ease-out',
          backdropFilter: 'invert(1)',
          WebkitBackdropFilter: 'invert(1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      />

      {/* ── Skill Pill Cursor ── */}
      {hoveredSkill && (
        <SkillPillCursor
          skillName={hoveredSkill}
          x={position.x}
          y={position.y}
          isVisible={isVisible}
          clickPulse={clickPulse}
        />
      )}

      {/* ── Keyframe Styles ── */}
      <style>{`
        @keyframes shockwaveExpand {
          0% {
            transform: scale(1);
            opacity: 1;
            border-width: 3px;
          }
          100% {
            transform: scale(6);
            opacity: 0;
            border-width: 0.5px;
          }
        }

        @keyframes particleBurst {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          60% {
            opacity: 0.8;
          }
          100% {
            transform: translate(var(--endX), var(--endY)) scale(0.1);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
};

export default InvertedCursor;
