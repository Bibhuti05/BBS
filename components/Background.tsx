import React, { useRef, useEffect, useCallback } from 'react';

const GRID_SIZE = 48;
const GLOW_RADIUS = 200;

const Background: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const animRef = useRef<number>(0);
  const glowCanvasRef = useRef<HTMLCanvasElement>(
    typeof document !== 'undefined' ? document.createElement('canvas') : {} as HTMLCanvasElement
  );

  const drawGrid = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number, color: string) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x <= w; x += GRID_SIZE) {
        ctx.moveTo(x + 0.5, 0);
        ctx.lineTo(x + 0.5, h);
      }
      for (let y = 0; y <= h; y += GRID_SIZE) {
        ctx.moveTo(0, y + 0.5);
        ctx.lineTo(w, y + 0.5);
      }
      ctx.stroke();
    },
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const glowCanvas = glowCanvasRef.current;
    const glowCtx = glowCanvas.getContext('2d');
    if (!glowCtx) return;

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      glowCanvas.width = w;
      glowCanvas.height = h;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseLeave = () => {
      mouseRef.current = null;
    };
    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    const render = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const isDark = document.documentElement.classList.contains('dark');
      const baseAlpha = isDark ? 0.06 : 0.09;

      drawGrid(ctx, w, h, `rgba(161, 161, 170, ${baseAlpha})`);

      const mouse = mouseRef.current;
      if (mouse) {
        glowCtx.clearRect(0, 0, w, h);

        const gradient = glowCtx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, GLOW_RADIUS
        );
        gradient.addColorStop(0, 'rgba(239, 68, 68, 0.55)');
        gradient.addColorStop(0.4, 'rgba(239, 68, 68, 0.2)');
        gradient.addColorStop(1, 'rgba(239, 68, 68, 0)');
        glowCtx.fillStyle = gradient;
        glowCtx.fillRect(0, 0, w, h);

        glowCtx.globalCompositeOperation = 'destination-in';
        drawGrid(glowCtx, w, h, 'white');
        glowCtx.globalCompositeOperation = 'source-over';

        ctx.drawImage(glowCanvas, 0, 0);
      }

      ctx.restore();
      animRef.current = requestAnimationFrame(render);
    };

    animRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [drawGrid]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-light-bg dark:bg-dark-bg transition-colors duration-500">
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/[0.04] via-transparent to-primary-500/[0.03] dark:from-primary-500/[0.06] dark:via-transparent dark:to-primary-400/[0.04]" />
    </div>
  );
};

export default Background;
