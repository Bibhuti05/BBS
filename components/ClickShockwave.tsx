import { useEffect } from 'react';

const ClickShockwave: React.FC = () => {
  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    let swId = 0;
    let pulseTimer: ReturnType<typeof setTimeout> | null = null;

    /* ── Shockwave on click ── */
    const handleClick = (e: MouseEvent) => {
      const el = document.createElement('div');
      el.className = 'click-shockwave';
      el.style.left = `${e.clientX}px`;
      el.style.top = `${e.clientY}px`;
      el.style.setProperty('--sw-id', String(swId++));
      document.body.appendChild(el);
      el.addEventListener('animationend', () => el.remove());

      if (pill) {
        pill.classList.add('click-skill-pill--pulse');
        if (pulseTimer) clearTimeout(pulseTimer);
        pulseTimer = setTimeout(() => pill.classList.remove('click-skill-pill--pulse'), 120);
      }
    };

    /* ── Skill pill cursor ── */
    const pill = document.createElement('div');
    pill.className = 'click-skill-pill';
    pill.style.opacity = '0';
    document.body.appendChild(pill);

    let mouseX = -100;
    let mouseY = -100;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      pill.style.transform = `translate(${mouseX}px, ${mouseY - 20}px) translate(-50%, 0) scale(${pill.classList.contains('click-skill-pill--pulse') ? 1.15 : 1})`;
    };

    const handleSkillHover = (e: Event) => {
      const name = (e as CustomEvent).detail as string | null;
      if (name) {
        pill.textContent = name;
        pill.style.opacity = '1';
        document.body.style.cursor = 'none';
        document.documentElement.style.cursor = 'none';
      } else {
        pill.style.opacity = '0';
        document.body.style.cursor = '';
        document.documentElement.style.cursor = '';
      }
    };

    window.addEventListener('click', handleClick);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('skillHover', handleSkillHover);

    return () => {
      document.body.style.cursor = '';
      document.documentElement.style.cursor = '';
      if (pulseTimer) clearTimeout(pulseTimer);
      pill.remove();
      window.removeEventListener('click', handleClick);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('skillHover', handleSkillHover);
    };
  }, []);

  return null;
};

export default ClickShockwave;
