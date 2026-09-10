import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { EXPERIENCES } from '../constants';
import { ArrowUpRight, Plane } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

interface LineCoords {
  top: number;
  left: number;
  length: number;
  ready: boolean;
}

const Experience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [lineCoords, setLineCoords] = useState<LineCoords>({
    top: 0,
    left: 0,
    length: 0,
    ready: false,
  });
  const [activeStops, setActiveStops] = useState<number[]>([0, 1, 2, 3]);
  const [stopProgressList, setStopProgressList] = useState<number[]>([]);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const lastScrollY = useRef(0);

  // Measure timeline coordinates
  const updateCoords = useCallback(() => {
    if (!containerRef.current || dotRefs.current.length < 2) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const firstDot = dotRefs.current[0];
    const lastDot = dotRefs.current[dotRefs.current.length - 1];

    if (!firstDot || !lastDot) return;

    const firstRect = firstDot.getBoundingClientRect();
    const lastRect = lastDot.getBoundingClientRect();

    const top = firstRect.top - containerRect.top + firstRect.height / 2;
    const bottom = lastRect.top - containerRect.top + lastRect.height / 2;
    const left = firstRect.left - containerRect.left + firstRect.width / 2;
    const length = Math.max(0, bottom - top);

    setLineCoords({
      top,
      left,
      length,
      ready: true,
    });

    // Compute relative progress threshold for each stop from bottom (1IN1B = 0) to top (Adobe = 1)
    const stopProgresses = dotRefs.current.map((dot) => {
      if (!dot) return 0;
      const rect = dot.getBoundingClientRect();
      const dotCenter = rect.top - containerRect.top + rect.height / 2;
      return Math.max(0, Math.min(1, (bottom - dotCenter) / (length || 1)));
    });
    setStopProgressList(stopProgresses);
  }, []);

  useEffect(() => {
    updateCoords();

    const t1 = setTimeout(updateCoords, 100);
    const t2 = setTimeout(updateCoords, 500);

    const ro = new ResizeObserver(() => {
      updateCoords();
    });
    if (containerRef.current) {
      ro.observe(containerRef.current);
    }

    window.addEventListener('resize', updateCoords);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      ro.disconnect();
      window.removeEventListener('resize', updateCoords);
    };
  }, [updateCoords]);

  // Track scroll direction for plane rotation
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (Math.abs(currentY - lastScrollY.current) > 2) {
        setIsScrollingUp(currentY < lastScrollY.current);
        lastScrollY.current = currentY;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Framer motion scroll progress along timeline
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 65%', 'end 75%'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    mass: 0.2,
  });

  // Green line length reduces as we scroll down (100% -> 0%)
  // and increases as we scroll up (0% -> 100%)
  const fillHeightString = useTransform(
    smoothProgress,
    [0, 1],
    ['100%', '0%']
  );

  useEffect(() => {
    const unsubscribe = smoothProgress.on('change', (progress) => {
      if (!stopProgressList.length) return;
      const currentFraction = Math.max(0, Math.min(1, 1 - progress));
      const active: number[] = [];
      stopProgressList.forEach((reqProgress, idx) => {
        if (currentFraction >= reqProgress - 0.03) {
          active.push(idx);
        }
      });
      const bottomIdx = stopProgressList.length - 1;
      if (!active.includes(bottomIdx)) {
        active.push(bottomIdx);
      }
      setActiveStops(active);
    });
    return () => unsubscribe();
  }, [smoothProgress, stopProgressList]);

  return (
    <section id="experience" className="bg-[#eae8e3] py-20 md:py-28">
      <div className="container mx-auto px-6 max-w-6xl">

        {/* Header */}
        <motion.div
          className="mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.p
            className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-3"
            variants={fadeUp}
          >
            about
          </motion.p>
          <motion.h2
            className="text-4xl md:text-6xl font-extrabold tracking-tight text-zinc-900 mb-4"
            variants={fadeUp}
          >
            I work on the parts
            <br />
            that matter most.
          </motion.h2>
        </motion.div>

        {/* Bio + principles */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 pb-16 border-b border-black/10">
          <motion.div
            className="space-y-5 text-zinc-600 text-base leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p>
              Frontend-focused engineer who cares about performance and user experience.
              I build modern web apps with React and Next.js, and I understand the backend
              well enough to integrate it cleanly.
            </p>
            <p>
              I got here by shipping things that broke and working out why.
              That's also how I ended up doing code reviews and mentoring teammates —
              the moment a bug stops being scary for someone is a good moment.
            </p>
            <p>
              These days I split my time between product work at startups and
              a handful of personal projects I run myself — the best way to
              keep learning things I wouldn't otherwise pick up.
            </p>
          </motion.div>

          <motion.div
            className="space-y-0 divide-y divide-black/8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {[
              'I write frontend first and interfaces second, and I think it shows in the code.',
              'I default to clean, composable architecture. React and TypeScript solve more than they get credit for.',
              'Most of what I know about production came from breaking it and having to fix it fast.',
              'I review code carefully because explaining something is how I find out if I actually understand it.',
            ].map((point, i) => (
              <div key={i} className="flex gap-5 py-5">
                <span className="text-xs font-mono text-zinc-400 mt-1 shrink-0 w-6">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-sm text-zinc-600 leading-relaxed">{point}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Experience list */}
        <motion.p
          className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          work experience
        </motion.p>

        {/* Experience list container with continuous line and traveling plane */}
        <div ref={containerRef} className="relative">
          {/* Base track line (continuous line connecting Adobe to 1IN1B) */}
          {lineCoords.ready && (
            <div
              style={{
                position: 'absolute',
                top: `${lineCoords.top}px`,
                left: `${lineCoords.left}px`,
                width: '2px',
                height: `${lineCoords.length}px`,
                transform: 'translateX(-50%)',
              }}
              className="bg-black/10 z-0 pointer-events-none"
            >
              {/* Active lime green line: anchored to the BOTTOM (1IN1B) and extends upwards */}
              <motion.div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: '50%',
                  width: '2.5px',
                  height: fillHeightString,
                  transform: 'translateX(-50%)',
                }}
                className="bg-lime-500 shadow-[0_0_8px_rgba(132,204,22,0.6)] origin-bottom"
              />

              {/* Traveling lime green Plane at the tip of the green line */}
              <motion.div
                style={{
                  position: 'absolute',
                  bottom: fillHeightString,
                  left: '50%',
                  transform: 'translate(-50%, 50%)',
                }}
                className="z-20 pointer-events-none"
              >
                <div
                  className="transition-transform duration-300 ease-out flex items-center justify-center"
                  style={{
                    transform: isScrollingUp ? 'rotate(-45deg)' : 'rotate(135deg)',
                  }}
                >
                  <Plane
                    size={20}
                    className="text-lime-600 fill-lime-500 filter drop-shadow-[0_2px_8px_rgba(132,204,22,0.8)]"
                  />
                </div>
              </motion.div>
            </div>
          )}

          {/* Experience items */}
          <div className="space-y-12 sm:space-y-16">
            {EXPERIENCES.map((exp, index) => {
              const isStopActive = activeStops.includes(index);

              return (
                <motion.div
                  key={exp.id}
                  className="group flex items-start gap-4 sm:gap-6"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                >
                  {/* Column 1: Time and date / period (desktop) */}
                  <div className="hidden sm:flex sm:flex-col items-end gap-1 shrink-0 sm:w-28 text-right pt-0.5">
                    <span className="text-xs font-mono text-zinc-400">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-xs text-zinc-400">{exp.period}</span>
                  </div>

                  {/* Column 2: Circular point on line */}
                  <div className="w-8 shrink-0 flex items-start justify-center pt-1.5 relative">
                    <div
                      ref={(el) => {
                        dotRefs.current[index] = el;
                      }}
                      className={`w-3.5 h-3.5 rounded-full z-10 transition-all duration-300 ${
                        isStopActive
                          ? 'bg-lime-500 border-2 border-white shadow-[0_0_8px_rgba(132,204,22,0.8)] scale-110'
                          : 'bg-[#eae8e3] border-2 border-zinc-400'
                      }`}
                    />
                  </div>

                  {/* Column 3: Experience text & details */}
                  <div className="flex-1 min-w-0">
                    {/* Mobile time and date */}
                    <div className="sm:hidden flex items-center gap-2 mb-1.5">
                      <span className="text-xs font-mono text-zinc-400">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="text-xs text-zinc-400">{exp.period}</span>
                    </div>

                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-bold text-zinc-900 mb-0.5">{exp.company}</h3>
                          <a
                            href={exp.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-black/5"
                            aria-label={`Visit ${exp.company} website`}
                          >
                            <ArrowUpRight size={16} className="text-zinc-400" />
                          </a>
                        </div>
                        <p className="text-sm font-medium text-zinc-600">{exp.role}</p>
                      </div>

                      {/* Logo photo div on the far right */}
                      {exp.logo && (
                        <a
                          href={exp.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-16 h-12 sm:w-20 sm:h-14 rounded-xl border border-white bg-white shadow-md overflow-hidden shrink-0 block transition-transform duration-300 group-hover:scale-105 hover:shadow-lg"
                          aria-label={`Visit ${exp.company} website`}
                        >
                          <img
                            src={exp.logo}
                            alt={`${exp.company} logo`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </a>
                      )}
                    </div>

                    <p className="text-sm text-zinc-600 leading-relaxed max-w-2xl mb-3">
                      {exp.description}
                    </p>

                    {exp.responsibilities && exp.responsibilities.length > 0 && (
                      <ul className="space-y-2 max-w-2xl mt-3">
                        {exp.responsibilities.map((responsibility, i) => (
                          <li key={i} className="text-sm text-zinc-600 leading-relaxed flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 mt-2 shrink-0" />
                            <span>{responsibility}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Experience;