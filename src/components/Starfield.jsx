import { useEffect, useRef } from 'react';
import { reducedMotion } from '../hooks.js';

const DENSITY = 0.00017;          // stars per square pixel
const DEPTHS = [0.15, 0.4, 0.85]; // far → near; nearer stars move and streak more
const TINTS = ['--ink', '--ink', '--ink', '--accent', '--accent-2'];

// The page backdrop: a field of stars on a fixed canvas. Stars twinkle, shift
// with the pointer, slide at different depths as the page scrolls, and stretch
// into streaks when it scrolls fast. Every few seconds a shooting star crosses.
export default function Starfield() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const still = reducedMotion();
    let width = 0, height = 0, stars = [], colors = [], raf = 0;
    let lastY = window.scrollY, velocity = 0;
    let targetX = 0, targetY = 0, shiftX = 0, shiftY = 0;
    let shot = null, nextShotAt = 2500;

    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      colors = TINTS.map((name) => cs.getPropertyValue(name).trim() || '#fff');
    };

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth; height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = Array.from({ length: Math.round(width * height * DENSITY) }, () => {
        const layer = Math.floor(Math.random() * DEPTHS.length);
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          depth: DEPTHS[layer],
          radius: 0.45 + layer * 0.4 + Math.random() * 0.5,
          tint: Math.floor(Math.random() * TINTS.length),
          phase: Math.random() * Math.PI * 2,
          speed: 0.6 + Math.random() * 1.6,
        };
      });
    };

    const wrap = (value, size) => ((value % size) + size) % size;

    const drawShot = (time) => {
      if (!shot && time > nextShotAt) {
        shot = { x: width * (0.3 + Math.random() * 0.7), y: height * Math.random() * 0.35, life: 1 };
      }
      if (!shot) return;
      shot.x -= 11; shot.y += 6; shot.life -= 0.022;
      const tail = ctx.createLinearGradient(shot.x, shot.y, shot.x + 150, shot.y - 82);
      tail.addColorStop(0, colors[0]);
      tail.addColorStop(1, 'transparent');
      ctx.globalAlpha = Math.max(shot.life, 0);
      ctx.strokeStyle = tail;
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(shot.x, shot.y);
      ctx.lineTo(shot.x + 150, shot.y - 82);
      ctx.stroke();
      if (shot.life <= 0) { shot = null; nextShotAt = time + 5000 + Math.random() * 7000; }
    };

    const draw = (time) => {
      const t = time / 1000;
      const y = window.scrollY;
      velocity += (y - lastY - velocity) * 0.12;
      lastY = y;
      shiftX += (targetX - shiftX) * 0.05;
      shiftY += (targetY - shiftY) * 0.05;

      ctx.clearRect(0, 0, width, height);
      ctx.lineCap = 'round';
      for (const s of stars) {
        const px = wrap(s.x + shiftX * s.depth * 26, width);
        const py = wrap(s.y - y * s.depth * 0.35 + shiftY * s.depth * 26, height);
        const twinkle = still ? 1 : 0.55 + 0.45 * Math.sin(t * s.speed + s.phase);
        const streak = Math.max(-70, Math.min(70, velocity * s.depth * 1.5));
        ctx.globalAlpha = (0.3 + s.depth * 0.7) * twinkle;
        if (Math.abs(streak) > 1.5) {
          ctx.strokeStyle = colors[s.tint];
          ctx.lineWidth = s.radius * 1.5;
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(px, py + streak);
          ctx.stroke();
        } else {
          ctx.fillStyle = colors[s.tint];
          ctx.beginPath();
          ctx.arc(px, py, s.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      if (!still) drawShot(time);
      ctx.globalAlpha = 1;
      raf = still ? 0 : requestAnimationFrame(draw);
    };

    const redraw = () => { if (still || !raf) raf = requestAnimationFrame(draw); };
    const onResize = () => { build(); redraw(); };
    const onMove = (e) => {
      targetX = e.clientX / width - 0.5;
      targetY = e.clientY / height - 0.5;
    };

    readColors();
    build();
    raf = requestAnimationFrame(draw);

    // repaint in the new colours when the theme changes
    const mo = new MutationObserver(() => { readColors(); redraw(); });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    window.addEventListener('resize', onResize);
    if (!still) window.addEventListener('pointermove', onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      mo.disconnect();
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  return <canvas className="starfield" ref={ref} aria-hidden="true" />;
}
