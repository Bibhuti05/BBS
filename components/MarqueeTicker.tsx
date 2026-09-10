import React from 'react';

export const MARQUEE_ITEMS = [
  'React & Next.js',
  'TypeScript',
  'Node.js',
  'PostgreSQL',
  'Open to interesting work',
  'Bangalore, India',
  'Building fast & scalable apps',
  'Full‑stack developer',
  'React & Next.js',
  'TypeScript',
  'Node.js',
  'PostgreSQL',
  'Open to interesting work',
  'Bangalore, India',
  'Building fast & scalable apps',
  'Full‑stack developer',
];

export const MarqueeTicker: React.FC = () => {
  return (
    <div className="h-13 overflow-hidden bg-lime-500 relative z-20 flex items-center">
      <div className="animate-marquee flex gap-0 whitespace-nowrap">
        {MARQUEE_ITEMS.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-3 text-sm text-white px-2 font-medium tracking-wide"
          >
            {item}
            <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
          </span>
        ))}
      </div>
    </div>
  );
};
