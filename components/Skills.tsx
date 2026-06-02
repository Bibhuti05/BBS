import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { SKILLS } from '../constants';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const CLR_LIGHT: [string, string][] = [
  ['#d4d4d8', '#52525b'],
  ['#d4d4d8', '#52525b'],
  ['#d4d4d8', '#52525b'],
  ['#d4d4d8', '#52525b'],
  ['#d4d4d8', '#52525b'],
  ['#d4d4d8', '#52525b'],
];

const CLR_DARK: [string, string][] = [
  ['#27272a', '#a1a1aa'],
  ['#27272a', '#a1a1aa'],
  ['#27272a', '#a1a1aa'],
  ['#27272a', '#a1a1aa'],
  ['#27272a', '#a1a1aa'],
  ['#27272a', '#a1a1aa'],
];

const GLOW = 'rgba(161,161,170,0.35)';

type IconLayer = {
  d: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  fillRule?: 'evenodd';
};

const ICONS: Record<string, IconLayer[]> = {
  'React / Next.js': [
    { d: 'M50.307 58.816a8.816 8.816 0 1 0 0-17.632 8.816 8.816 0 0 0 0 17.632', fill: 'currentColor' },
    { d: 'M50.307 68.063c26.126 0 47.306-8.087 47.306-18.063s-21.18-18.062-47.306-18.062C24.18 31.938 3 40.024 3 50s21.18 18.063 47.307 18.063Z', stroke: 'currentColor', strokeWidth: 5 },
    { d: 'M34.664 59.031C47.727 81.658 65.321 95.957 73.96 90.97c8.64-4.988 5.053-27.374-8.01-50C52.885 18.342 35.291 4.043 26.652 9.03s-5.052 27.374 8.011 50Z', stroke: 'currentColor', strokeWidth: 5 },
    { d: 'M34.664 40.969c-13.063 22.626-16.65 45.012-8.01 50 8.638 4.988 26.232-9.311 39.295-31.938s16.65-45.012 8.01-50c-8.638-4.988-26.232 9.311-39.295 31.938Z', stroke: 'currentColor', strokeWidth: 5 },
  ],
  TypeScript: [
    { d: 'M0 0h100v100H0z', fill: 'currentColor' },
    { d: 'M48.016 37.031h4.797v8.282h-12.97v36.843l-.343.094c-.469.125-6.64.125-7.969-.016l-1.062-.093V45.312H17.5v-8.28l4.11-.048c2.25-.03 8.03-.03 12.843 0 4.813.032 10.906.047 13.563.047m36.61 41.219c-1.907 2.016-3.954 3.14-7.36 4.063-1.485.406-1.735.421-5.078.406-3.344-.016-3.61-.016-5.235-.438-4.203-1.078-7.594-3.187-9.906-6.172-.656-.843-1.734-2.593-1.734-2.812 0-.063.156-.203.359-.297s.625-.36.969-.562c.343-.204.968-.579 1.39-.797.422-.22 1.64-.938 2.703-1.579 1.063-.64 2.032-1.156 2.141-1.156.11 0 .313.219.469.485.937 1.578 3.125 3.593 4.672 4.28.953.407 3.062.86 4.078.86.937 0 2.656-.406 3.578-.828.984-.453 1.484-.906 2.078-1.812.406-.641.453-.813.438-2.032 0-1.125-.063-1.437-.375-1.953-.875-1.437-2.063-2.187-6.875-4.312-4.97-2.203-7.204-3.516-9.016-5.282-1.344-1.312-1.61-1.67-2.453-3.312-1.094-2.11-1.235-2.797-1.25-5.937-.016-2.204.031-2.922.265-3.672.329-1.125 1.391-3.297 1.875-3.844 1-1.172 1.36-1.531 2.063-2.11 2.125-1.75 5.438-2.906 8.61-3.015.359 0 1.546.062 2.656.14 3.187.266 5.359 1.047 7.453 2.72 1.578 1.25 3.968 4.187 3.734 4.577-.156.235-6.39 4.391-6.797 4.516-.25.078-.422-.016-.765-.422-2.125-2.547-2.985-3.094-5.047-3.219-1.469-.093-2.25.078-3.235.735-1.03.687-1.53 1.734-1.53 3.187.015 2.125.827 3.125 3.827 4.61 1.938.953 3.594 1.734 3.719 1.734.188 0 4.203 2 5.25 2.625 4.875 2.86 6.86 5.797 7.375 10.86.375 3.812-.703 7.296-3.047 9.765', fill: '#fff' },
  ],
  'Tailwind CSS': [
    { d: 'M50 20q-20 0-25 19.994 7.5-9.997 17.5-7.498c3.804.95 6.522 3.71 9.532 6.764 4.902 4.974 10.576 10.731 22.969 10.731q20 0 24.999-19.995-7.5 9.997-17.5 7.5c-3.803-.951-6.521-3.71-9.531-6.765C68.067 25.758 62.392 20 50 20M25 49.991q-20 0-25 19.995 7.5-9.998 17.5-7.498c3.803.952 6.522 3.71 9.532 6.763C31.933 74.225 37.608 79.984 50 79.984q20 0 25-19.995-7.5 9.997-17.5 7.498c-3.803-.95-6.522-3.71-9.532-6.763C43.066 55.75 37.393 49.991 25 49.991', fill: 'currentColor' },
  ],
  'Node.js': [
    { d: 'M46.279 1.067c2.479-1.42 5.709-1.426 8.186 0 12.464 7.042 24.931 14.074 37.393 21.12 2.343 1.321 3.911 3.93 3.887 6.63v42.371c.018 2.813-1.705 5.483-4.178 6.774-12.422 7.004-24.838 14.016-37.259 21.02-2.53 1.447-5.825 1.335-8.277-.23-3.724-2.16-7.455-4.308-11.18-6.465-.76-.453-1.619-.815-2.156-1.552.475-.64 1.324-.72 2.015-1 1.554-.495 2.982-1.288 4.41-2.058.361-.247.802-.152 1.148.069 3.185 1.826 6.342 3.705 9.537 5.513.682.394 1.372-.129 1.955-.453 12.19-6.89 24.396-13.754 36.584-20.646a1.21 1.21 0 0 0 .664-1.191c.009-13.977.002-27.957.005-41.934a1.31 1.31 0 0 0-.781-1.308C75.852 20.756 63.479 13.773 51.102 6.8a1.29 1.29 0 0 0-1.458-.002c-12.378 6.975-24.749 13.964-37.126 20.935-.506.23-.845.738-.785 1.302q.002 20.966 0 41.936a1.19 1.19 0 0 0 .673 1.176c3.303 1.873 6.61 3.733 9.916 5.6 1.861 1.002 4.148 1.597 6.199.83 1.81-.65 3.08-2.497 3.045-4.42.017-13.895-.009-27.793.013-41.686-.046-.617.54-1.127 1.14-1.069 1.586-.01 3.175-.021 4.762.005.663-.015 1.119.649 1.037 1.27-.007 13.984.017 27.968-.01 41.952.003 3.726-1.528 7.781-4.975 9.605-4.247 2.2-9.496 1.733-13.691-.376-3.632-1.813-7.098-3.952-10.666-5.894C6.697 76.68 4.983 73.999 5 71.189V28.817c-.026-2.756 1.604-5.412 4.021-6.713Q27.651 11.588 46.28 1.067', fill: 'currentColor' },
    { d: 'M57.114 30.417c5.417-.348 11.216-.206 16.091 2.462 3.774 2.046 5.867 6.338 5.933 10.53-.105.566-.696.878-1.236.84-1.572-.003-3.144.02-4.716-.011-.667.025-1.054-.59-1.138-1.179-.451-2.006-1.545-3.993-3.434-4.96-2.898-1.452-6.26-1.38-9.42-1.349-2.308.123-4.79.322-6.744 1.68-1.5 1.027-1.957 3.102-1.421 4.773.505 1.2 1.89 1.587 3.023 1.944 6.529 1.708 13.447 1.538 19.85 3.785 2.651.916 5.245 2.697 6.152 5.472 1.187 3.72.667 8.168-1.98 11.154-2.146 2.458-5.273 3.796-8.39 4.522-4.149.925-8.454.949-12.666.538-3.962-.451-8.084-1.492-11.142-4.191-2.614-2.27-3.892-5.808-3.765-9.223.03-.576.605-.978 1.157-.93 1.583-.014 3.165-.018 4.748.001.632-.045 1.101.501 1.133 1.097.292 1.912 1.01 3.918 2.678 5.051 3.216 2.075 7.253 1.933 10.936 1.991 3.052-.135 6.477-.176 8.967-2.193 1.314-1.15 1.703-3.075 1.348-4.73-.384-1.398-1.847-2.05-3.103-2.476-6.444-2.038-13.44-1.299-19.822-3.604-2.59-.916-5.096-2.647-6.092-5.309-1.389-3.767-.752-8.427 2.172-11.313 2.852-2.87 6.968-3.976 10.881-4.372', fill: 'currentColor' },
  ],
  PostgreSQL: [
    { d: 'M98.472 59.902c-.582-1.766-2.105-2.995-4.074-3.29-.929-.14-1.992-.08-3.251.18-2.194.454-3.821.627-5.009.66 4.483-7.59 8.129-16.246 10.227-24.393 3.394-13.175 1.58-19.177-.539-21.892C90.218 3.981 82.036.121 72.166.003c-5.267-.065-9.89.978-12.3 1.728-2.246-.398-4.66-.62-7.193-.66-4.749-.076-8.944.962-12.529 3.095a57 57 0 0 0-8.848-2.227C22.644.514 15.672 1.624 10.57 5.237c-6.175 4.375-9.038 11.975-8.509 22.59.168 3.37 2.048 13.625 5.009 23.35 1.701 5.59 3.515 10.232 5.392 13.798 2.661 5.058 5.51 8.035 8.706 9.105 1.792.599 5.048 1.018 8.472-1.842.434.527 1.013 1.05 1.782 1.537.976.618 2.17 1.122 3.361 1.42 4.296 1.078 8.319.808 11.752-.701.02.612.037 1.197.05 1.702.023.82.046 1.623.076 2.374.203 5.08.548 9.029 1.57 11.792.055.152.13.384.21.63.51 1.564 1.361 4.182 3.529 6.232C54.215 99.35 56.929 100 59.415 100c1.247 0 2.437-.164 3.48-.388 3.72-.8 7.944-2.017 11-6.38 2.889-4.125 4.293-10.337 4.547-20.126l.093-.793.06-.517.68.06.176.012c3.788.173 8.42-.633 11.265-1.958 2.248-1.046 9.452-4.86 7.756-10.008', fill: 'currentColor' },
    { d: 'M91.994 60.903c-11.264 2.33-12.038-1.494-12.038-1.494C91.848 41.713 96.82 19.251 92.53 13.753C80.825-1.243 60.564 5.85 60.226 6.033l-.109.02c-2.225-.463-4.716-.74-7.515-.785-5.096-.084-8.963 1.34-11.896 3.57 0 0-36.145-14.93-34.463 18.78.357 7.17 10.25 54.262 22.05 40.039 4.313-5.202 8.48-9.6 8.48-9.6 2.07 1.38 4.547 2.082 7.145 1.83l.202-.172c-.063.646-.034 1.277.08 2.025-3.04 3.406-2.146 4.004-8.223 5.258-6.149 1.271-2.537 3.533-.178 4.125 2.859.717 9.474 1.732 13.943-4.542l-.178.716c1.19.957 2.027 6.222 1.887 10.996-.14 4.773-.234 8.05.704 10.61.94 2.56 1.874 8.32 9.863 6.604 6.674-1.435 10.134-5.152 10.615-11.353.341-4.407 1.114-3.756 1.163-7.697l.62-1.865c.715-5.976.113-7.904 4.225-7.007l1 .088c3.027.138 6.988-.488 9.313-1.572 5.007-2.33 7.976-6.22 3.04-5.198', fill: 'currentColor', opacity: 0.7 },
    { d: 'M42.821 30.825c-1.015-.142-1.934-.011-2.4.342a.88.88 0 0 0-.364.587c-.058.42.235.884.415 1.123.51.678 1.255 1.143 1.992 1.246q.16.022.319.022c1.229 0 2.347-.96 2.445-1.668.123-.887-1.161-1.479-2.407-1.652m33.627.028c-.097-.696-1.33-.894-2.502-.73-1.17.162-2.303.692-2.209 1.389.076.542 1.052 1.467 2.207 1.467q.146 0 .296-.02c.77-.108 1.337-.599 1.605-.882.41-.431.647-.912.603-1.224', fill: '#fff' },
  ],
  'React Native': [
    { d: 'M29.66 5.418c-1.656.056-3.234.46-4.66 1.281-2.85 1.645-4.552 4.664-5.316 8.237s-.684 7.822.078 12.578c.293 1.834.723 3.762 1.22 5.733-1.955.554-3.84 1.148-5.575 1.81-4.5 1.72-8.219 3.774-10.931 6.223C1.763 43.73 0 46.71 0 50s1.763 6.274 4.476 8.722c2.712 2.45 6.43 4.505 10.93 6.224 1.735.662 3.62 1.255 5.575 1.81-.497 1.971-.926 3.9-1.22 5.732-.762 4.758-.84 9.006-.077 12.578.766 3.574 2.465 6.592 5.315 8.238s6.313 1.61 9.79.484c3.477-1.125 7.117-3.318 10.856-6.356 1.44-1.17 2.896-2.505 4.355-3.922 1.458 1.417 2.914 2.751 4.355 3.922 3.737 3.039 7.376 5.232 10.854 6.357 3.476 1.125 6.941 1.16 9.791-.484 2.85-1.647 4.552-4.665 5.316-8.238s.682-7.822-.08-12.578c-.293-1.834-.721-3.762-1.218-5.733 1.955-.555 3.84-1.148 5.575-1.81 4.5-1.718 8.219-3.773 10.931-6.223 2.713-2.449 4.476-5.432 4.476-8.722 0-3.291-1.763-6.272-4.476-8.72-2.712-2.45-6.431-4.505-10.931-6.223-1.734-.662-3.618-1.257-5.574-1.811.497-1.971.925-3.9 1.22-5.733.761-4.756.84-9.005.076-12.578C79.55 11.362 77.85 8.344 75 6.699s-6.312-1.61-9.79-.484c-3.476 1.125-7.117 3.318-10.855 6.356-1.44 1.172-2.899 2.506-4.357 3.923-1.459-1.416-2.914-2.752-4.355-3.923-3.737-3.038-7.374-5.233-10.85-6.358-1.74-.562-3.476-.851-5.134-.797zm.2 4.332c1.04-.03 2.23.162 3.594.601 2.727.883 5.996 2.79 9.448 5.594 1.33 1.08 2.69 2.33 4.06 3.664-2.863 3.094-5.702 6.612-8.449 10.496-4.736.437-9.203 1.137-13.315 2.07-.468-1.855-.871-3.656-1.143-5.35-.703-4.39-.718-8.175-.118-10.978.599-2.803 1.72-4.506 3.237-5.382.759-.437 1.647-.687 2.686-.715m40.28 0c1.04.029 1.928.277 2.687.715 1.517.875 2.638 2.579 3.237 5.38.6 2.803.586 6.59-.117 10.98-.271 1.692-.674 3.496-1.143 5.349-4.111-.932-8.578-1.633-13.317-2.07-2.746-3.882-5.587-7.401-8.45-10.496 1.37-1.333 2.733-2.584 4.062-3.664 3.452-2.806 6.721-4.709 9.449-5.592 1.363-.44 2.554-.631 3.593-.601zM50 22.737a97 97 0 0 1 5.813 6.973c-1.91-.086-3.842-.144-5.813-.144s-3.902.057-5.812.144A96 96 0 0 1 50 22.736m0 11.178c3.113 0 6.148.122 9.09.343a121 121 0 0 1 4.842 7.698A121 121 0 0 1 68.177 50a121 121 0 0 1-4.245 8.043 121 121 0 0 1-4.844 7.7c-2.94.22-5.975.344-9.087.344q-4.553 0-9.092-.344a121 121 0 0 1-4.842-7.7 121 121 0 0 1-4.245-8.042 121 121 0 0 1 4.247-8.044 121 121 0 0 1 4.843-7.7q4.538-.343 9.088-.343m-14.666.908a128 128 0 0 0-3.032 4.961 128 128 0 0 0-2.78 5.105 97 97 0 0 1-3.135-8.52 97 97 0 0 1 8.947-1.546m29.333 0q4.51.562 8.947 1.546a97 97 0 0 1-3.134 8.521 128 128 0 0 0-2.782-5.107 128 128 0 0 0-3.03-4.96m-42.507 2.61C23.41 41.46 25.036 45.68 27.027 50c-1.992 4.322-3.617 8.542-4.867 12.569-1.84-.52-3.601-1.074-5.203-1.685-4.155-1.586-7.44-3.467-9.569-5.389-2.127-1.92-3.041-3.742-3.041-5.494s.914-3.572 3.041-5.492c2.128-1.922 5.414-3.803 9.569-5.389 1.602-.611 3.363-1.166 5.203-1.686m55.68 0c1.84.52 3.603 1.075 5.203 1.688 4.156 1.586 7.441 3.465 9.57 5.387 2.127 1.921 3.04 3.742 3.04 5.493s-.913 3.574-3.04 5.494c-2.129 1.922-5.415 3.802-9.57 5.388-1.6.611-3.364 1.164-5.204 1.685-1.248-4.026-2.875-8.245-4.865-12.566 1.992-4.322 3.617-8.541 4.866-12.569M50 41.088a8.914 8.914 0 0 0 0 17.825 8.914 8.914 0 0 0 0-17.825m20.48 14.024a97 97 0 0 1 3.132 8.522 97 97 0 0 1-8.943 1.547 128 128 0 0 0 3.029-4.963q1.448-2.52 2.782-5.106m-40.959.002a128 128 0 0 0 2.781 5.104 130 130 0 0 0 3.032 4.962 96 96 0 0 1-8.947-1.546 97 97 0 0 1 3.134-8.52m-4.324 12.715c4.11.931 8.578 1.63 13.316 2.067 2.747 3.885 5.588 7.404 8.45 10.5-1.37 1.332-2.73 2.582-4.06 3.664-3.451 2.805-6.724 4.71-9.451 5.594-2.727.881-4.762.76-6.28-.116-1.517-.876-2.636-2.578-3.235-5.38-.6-2.803-.585-6.589.118-10.982.272-1.691.672-3.494 1.142-5.347m49.605 0c.47 1.853.872 3.656 1.143 5.347.703 4.393.72 8.179.12 10.982s-1.721 4.505-3.238 5.382c-1.518.875-3.552.995-6.28.112-2.727-.883-5.996-2.789-9.448-5.594-1.329-1.08-2.69-2.33-4.06-3.664 2.863-3.093 5.702-6.614 8.448-10.498 4.737-.437 9.204-1.136 13.315-2.067M44.187 70.29q2.905.14 5.814.145 2.909-.006 5.814-.145A96 96 0 0 1 50 77.268a96 96 0 0 1-5.813-6.977', fill: 'currentColor' },
  ],
};

const HOVER_SCALE = 1.28;
const MAX_DISPLACEMENT = 55;
const DECAY = 190;
const STIFFNESS = 0.1;
const DAMPING = 0.78;
const RADIUS_LERP = 0.22;

interface Bubble {
  restX: number;
  restY: number;
  restR: number;
  targetX: number;
  targetY: number;
  targetR: number;
  cx: number;
  cy: number;
  r: number;
  vx: number;
  vy: number;
  name: string;
  colorI: number;
}

interface AppState {
  bubbles: Bubble[];
  hovered: number | null;
  w: number;
  h: number;
  dpr: number;
  isDark: boolean;
}

function getIsDark(): boolean {
  return (
    document.documentElement.classList.contains('dark') ||
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
}

function getSizes(isMobile: boolean): number[] {
  const base = isMobile ? 34 : 42;
  const range = isMobile ? 22 : 28;
  return SKILLS.map((s) => Math.round(base + (s.level / 100) * range));
}

function hexLayout(
  w: number,
  h: number,
  sizes: number[],
): Array<{ x: number; y: number }> {
  const maxR = Math.max(...sizes);
  const gap = 10;

  let cellW = maxR * 2 + gap;
  let cellH = cellW * 0.866;

  const spanW = 2.5 * cellW;
  if (spanW > w * 0.88) {
    cellW = (w * 0.88) / 2.5;
    cellH = cellW * 0.866;
  }

  const positions: Array<{ x: number; y: number }> = [];
  for (let r = 0; r < 2; r++) {
    for (let c = 0; c < 3; c++) {
      const ox = (r % 2) * cellW * 0.5;
      positions.push({
        x: c * cellW + ox + cellW * 0.5,
        y: r * cellH + cellH * 0.5,
      });
    }
  }

  const gridCenterX = (positions[0].x + positions[5].x) / 2;
  const gridCenterY = (positions[0].y + positions[5].y) / 2;
  const offX = w / 2 - gridCenterX;
  const offY = h / 2 - gridCenterY;
  const jitter = cellW * 0.02;

  return positions.map((p) => ({
    x: p.x + offX + (Math.random() - 0.5) * jitter * 2,
    y: p.y + offY + (Math.random() - 0.5) * jitter * 2,
  }));
}

function initBubbles(
  w: number,
  h: number,
  isMobile: boolean,
): Bubble[] {
  const sizes = getSizes(isMobile);
  const positions = hexLayout(w, h, sizes);

  return SKILLS.map((skill, i) => ({
    restX: positions[i].x,
    restY: positions[i].y,
    restR: sizes[i],
    targetX: positions[i].x,
    targetY: positions[i].y,
    targetR: 0,
    cx: positions[i].x,
    cy: positions[i].y,
    r: 0,
    vx: 0,
    vy: 0,
    name: skill.name,
    colorI: i % CLR_LIGHT.length,
  }));
}

function drawGlow(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
) {
  ctx.save();
  const grad = ctx.createRadialGradient(x, y, r * 0.7, x, y, r + 14);
  grad.addColorStop(0, GLOW);
  grad.addColorStop(1, 'transparent');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(x, y, r + 14, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawBubble(
  ctx: CanvasRenderingContext2D,
  b: Bubble,
  isHovered: boolean,
  isDark: boolean,
) {
  const { cx: x, cy: y, r, colorI, name } = b;
  if (r < 1) return;

  const colors = isDark ? CLR_DARK[colorI] : CLR_LIGHT[colorI];

  if (isHovered) {
    drawGlow(ctx, x, y, r);
  }

  const grad = ctx.createRadialGradient(
    x - r * 0.3,
    y - r * 0.35,
    r * 0.05,
    x,
    y,
    r,
  );
  grad.addColorStop(0, colors[0]);
  grad.addColorStop(1, colors[1]);

  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.fill();

  ctx.strokeStyle = isDark
    ? 'rgba(255,255,255,0.12)'
    : 'rgba(255,255,255,0.55)';
  ctx.lineWidth = Math.max(1.5, r * 0.02);
  ctx.stroke();

  const iconLayers = ICONS[name];
  if (!iconLayers) return;

  const iconSize = r * 1.1;
  const scale = iconSize / 100;
  ctx.save();
  ctx.translate(x - iconSize / 2, y - iconSize / 2);
  ctx.scale(scale, scale);

  for (const layer of iconLayers) {
    ctx.beginPath();
    const p = new Path2D(layer.d);
    if (layer.fill) {
      ctx.fillStyle = layer.fill === 'currentColor'
        ? isDark ? '#e4e4e7' : '#18181b'
        : layer.fill;
      ctx.globalAlpha = layer.opacity ?? 1;
      ctx.fill(p);
      ctx.globalAlpha = 1;
    }
    if (layer.stroke) {
      ctx.strokeStyle = layer.stroke === 'currentColor'
        ? isDark ? '#e4e4e7' : '#18181b'
        : layer.stroke;
      ctx.lineWidth = layer.strokeWidth ?? 1;
      ctx.stroke(p);
    }
  }

  ctx.restore();
}

function easeOutBack(t: number): number {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}

const Skills: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const stateRef = useRef<AppState | null>(null);
  const isMobileRef = useRef(window.innerWidth < 768);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onResize = () => {
      isMobileRef.current = window.innerWidth < 768;
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let started = false;

    const init = () => {
      const rect = container.getBoundingClientRect();
      const w = rect.width;
      if (w === 0) return;

      const isMobile = isMobileRef.current;
      const h = isMobile ? 320 : 420;
      const dpr = window.devicePixelRatio || 1;
      const bubbles = initBubbles(w, h, isMobile);

      container.style.height = `${h}px`;

      stateRef.current = {
        bubbles,
        hovered: null,
        w,
        h,
        dpr,
        isDark: getIsDark(),
      };

      if (!started) {
        started = true;
        startLoop();
      }
    };

    let startTime: number | null = null;

    const startLoop = () => {
      const introDelay = stateRef.current!.bubbles.map((_, i) => i * 80);
      const introDurations = stateRef.current!.bubbles.map(() => 600);

      const animate = (timestamp: number) => {
        const s = stateRef.current;
        if (!s || !canvasRef.current) return;
        if (startTime === null) startTime = timestamp;
        const elapsed = timestamp - startTime;

        s.isDark = getIsDark();

        canvas.width = s.w * s.dpr;
        canvas.height = s.h * s.dpr;
        const c = canvas.getContext('2d');
        if (!c) return;
        c.scale(s.dpr, s.dpr);
        c.clearRect(0, 0, s.w, s.h);

        for (let i = 0; i < s.bubbles.length; i++) {
          const b = s.bubbles[i];
          const isHvd = i === s.hovered;

          if (isHvd) {
            b.targetR = b.restR * HOVER_SCALE;
            b.targetX = b.restX;
            b.targetY = b.restY;
          } else if (s.hovered !== null) {
            b.targetR = b.restR;
            const h = s.bubbles[s.hovered];
            const dx = b.restX - h.restX;
            const dy = b.restY - h.restY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist > 1) {
              const push = MAX_DISPLACEMENT * Math.exp(-dist / DECAY);
              b.targetX = b.restX + (dx / dist) * push;
              b.targetY = b.restY + (dy / dist) * push;
            } else {
              b.targetX = b.restX;
              b.targetY = b.restY;
            }
          } else {
            b.targetR = b.restR;
            b.targetX = b.restX;
            b.targetY = b.restY;
          }

          const ax = (b.targetX - b.cx) * STIFFNESS;
          const ay = (b.targetY - b.cy) * STIFFNESS;
          b.vx = (b.vx + ax) * DAMPING;
          b.vy = (b.vy + ay) * DAMPING;
          b.cx += b.vx;
          b.cy += b.vy;

          b.r += (b.targetR - b.r) * RADIUS_LERP;
        }

        for (let i = 0; i < s.bubbles.length; i++) {
          const b = s.bubbles[i];
          const introTarget = b.restR;
          const inDelay = introDelay[i];
          const inDur = introDurations[i];

          let introR = 0;
          if (elapsed > inDelay) {
            const t = Math.min((elapsed - inDelay) / inDur, 1);
            introR = introTarget * easeOutBack(t);
          }

          const physR = b.r > 0 ? b.r : 0;
          const finalR = Math.max(physR, introR);

          if (finalR < 0.5) continue;
          const drawB = { ...b, r: finalR, cx: b.cx, cy: b.cy };
          drawBubble(c, drawB, i === s.hovered, s.isDark);
        }

        rafRef.current = requestAnimationFrame(animate);
      };

      rafRef.current = requestAnimationFrame(animate);
    };

    const onResize = () => {
      const s = stateRef.current;
      if (!s) return;
      const isMobile = isMobileRef.current;
      const rect = container.getBoundingClientRect();
      const w = rect.width;
      if (w === 0) return;
      const h = isMobile ? 320 : 420;
      s.w = w;
      s.h = h;
      s.isDark = getIsDark();
      container.style.height = `${h}px`;

      const sizes = getSizes(isMobile);
      const positions = hexLayout(w, h, sizes);
      for (let i = 0; i < s.bubbles.length; i++) {
        s.bubbles[i].restX = positions[i].x;
        s.bubbles[i].restY = positions[i].y;
        s.bubbles[i].restR = sizes[i];
      }
    };

    const ro = new ResizeObserver(() => {
      if (!started) {
        init();
      } else {
        onResize();
      }
    });
    ro.observe(container);

    init();

    window.addEventListener('resize', onResize);

    const mo = new MutationObserver(() => {
      if (stateRef.current) stateRef.current.isDark = getIsDark();
    });
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      window.removeEventListener('resize', onResize);
      mo.disconnect();
    };
  }, [isVisible]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const s = stateRef.current;
      if (!s || !canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      let closest = -1;
      let closestDist = Infinity;
      for (let i = 0; i < s.bubbles.length; i++) {
        const b = s.bubbles[i];
        if (b.r < 1) continue;
        const dx = mx - b.cx;
        const dy = my - b.cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < b.r * 0.85 && dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      }
      s.hovered = closest >= 0 ? closest : null;
    },
    [],
  );

  const handleMouseLeave = useCallback(() => {
    const s = stateRef.current;
    if (s) s.hovered = null;
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
          variants={{
            visible: { transition: { staggerChildren: 0.15 } },
          }}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4"
            variants={fadeUp}
          >
            Technical{' '}
            <span className="text-primary-600 dark:text-primary-400">
              Proficiency
            </span>
          </motion.h2>
          <motion.p
            className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto"
            variants={fadeUp}
          >
            A curated list of the technologies and tools I use to build
            performant and scalable applications.
          </motion.p>
        </motion.div>

        <div ref={containerRef} className="relative w-full">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full cursor-pointer"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          />
        </div>
      </div>
    </section>
  );
};

export default Skills;