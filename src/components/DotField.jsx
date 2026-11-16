import { useEffect, useRef } from 'react';
import { reducedMotion } from '../hooks.js';

const GAP = 30;        // distance between dots, px
const REACH = 150;     // how far the pointer pushes dots, px

// A grid of dots that breathes in a slow wave and bends away from the pointer.
// Drawn on a canvas; it only animates while it is on screen.
export default function DotField() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const still = reducedMotion();
    const pointer = { x: -9999, y: -9999 };
    let dots = [];
    let width = 0, height = 0, ink = '#000', raf = 0, onScreen = true;

    const readInk = () => { ink = getComputedStyle(document.documentElement).getPropertyValue('--ink').trim() || '#000'; };

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width; height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = [];
      for (let y = GAP / 2; y < height; y += GAP) {
        for (let x = GAP / 2; x < width; x += GAP) dots.push({ ox: x, oy: y, x, y, vx: 0, vy: 0 });
      }
    };

    const draw = (time) => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = ink;
      const t = time / 1000;
      for (const d of dots) {
        const dx = d.x - pointer.x, dy = d.y - pointer.y;
        const dist = Math.hypot(dx, dy) || 1;
        if (dist < REACH) {
          const force = (1 - dist / REACH) * 2.4;
          d.vx += (dx / dist) * force;
          d.vy += (dy / dist) * force;
        }
        // spring back to the resting position
        d.vx = (d.vx + (d.ox - d.x) * 0.05) * 0.84;
        d.vy = (d.vy + (d.oy - d.y) * 0.05) * 0.84;
        d.x += d.vx; d.y += d.vy;
        const pushed = Math.min(Math.hypot(d.x - d.ox, d.y - d.oy) / 16, 1);
        // a diagonal wave drifting across the field
        const wave = still ? 0.5 : (Math.sin(d.ox * 0.012 + d.oy * 0.018 - t * 0.9) + 1) / 2;
        ctx.globalAlpha = 0.1 + wave * 0.16 + pushed * 0.7;
        ctx.beginPath();
        ctx.arc(d.x, d.y, 1 + wave * 0.5 + pushed * 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = !still && onScreen ? requestAnimationFrame(draw) : 0;
    };

    const start = () => { if (!raf) raf = requestAnimationFrame(draw); };
    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };
    const onLeave = () => { pointer.x = -9999; pointer.y = -9999; };
    const onResize = () => { build(); start(); };

    readInk();
    build();
    start();

    const io = new IntersectionObserver(([entry]) => { onScreen = entry.isIntersecting; if (onScreen) start(); });
    io.observe(canvas);
    // redraw in the new colour when the theme changes
    const mo = new MutationObserver(() => { readInk(); start(); });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    window.addEventListener('resize', onResize);
    if (!still) {
      window.addEventListener('pointermove', onMove, { passive: true });
      document.addEventListener('pointerleave', onLeave);
    }

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      mo.disconnect();
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return <canvas className="dotfield" ref={ref} aria-hidden="true" />;
}
