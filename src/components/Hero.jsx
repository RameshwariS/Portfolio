import { memo, useEffect, useLayoutEffect, useRef } from 'react';
import { heroFacts, profile, roles } from '../data.js';
import { finePointer, reducedMotion, wait } from '../hooks.js';
import { Icon, Meta, Split, Tile } from './ui.jsx';

// ── Scramble / glitch text that cycles through roles ────────────────────
const GLYPHS = '!<>-_/[]{}=+*^?#01';
const esc = (s) => s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

function scrambleTo(el, text, alive) {
  return new Promise((resolve) => {
    const from = el.textContent;
    const queue = Array.from({ length: Math.max(from.length, text.length) }, (_, i) => {
      const start = Math.floor(Math.random() * 14);
      return { from: from[i] || '', to: text[i] || '', start, end: start + 6 + Math.floor(Math.random() * 16), ch: '' };
    });
    let frame = 0;
    (function tick() {
      if (!alive()) return resolve();
      let out = '', done = 0;
      for (const q of queue) {
        if (frame >= q.end) { done++; out += esc(q.to); }
        else if (frame >= q.start) {
          if (!q.ch || Math.random() < 0.3) q.ch = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          out += `<span class="glyph">${esc(q.ch)}</span>`;
        } else out += esc(q.from);
      }
      el.innerHTML = out;
      if (done === queue.length) resolve();
      else { frame++; requestAnimationFrame(tick); }
    })();
  });
}

function Scramble({ words, active }) {
  const ref = useRef(null);
  // The span is managed imperatively (React renders it empty), so set the first word before paint.
  useLayoutEffect(() => { ref.current.textContent = words[0]; }, [words]);
  useEffect(() => {
    if (!active || reducedMotion()) return undefined;
    let alive = true, i = 0;
    (async () => {
      while (alive) {
        await wait(2600);
        if (!alive) break;
        if (document.hidden) continue;
        i = (i + 1) % words.length;
        await scrambleTo(ref.current, words[i], () => alive);
      }
    })();
    return () => { alive = false; };
  }, [active, words]);
  return <span className="scramble" aria-hidden="true" ref={ref} />;
}

// ── Particle "network" behind the hero that shies away from the cursor ──
function ParticleField() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current, host = canvas.parentElement, ctx = canvas.getContext('2d');
    const LINK = 104, PUSH = 140;
    let w = 0, h = 0, pts = [], mx = -1e4, my = -1e4, raf = 0;

    function draw(move) {
      ctx.clearRect(0, 0, w, h);
      if (move) {
        for (const p of pts) {
          const dx = p.x - mx, dy = p.y - my, d2 = dx * dx + dy * dy;
          if (d2 < PUSH * PUSH) { const d = Math.sqrt(d2) || 1, f = (1 - d / PUSH) * 0.5; p.vx += (dx / d) * f; p.vy += (dy / d) * f; }
          p.vx += (p.bx - p.vx) * 0.04; p.vy += (p.by - p.vy) * 0.04;
          p.x += p.vx; p.y += p.vy;
          if (p.x < -10) p.x = w + 10; else if (p.x > w + 10) p.x = -10;
          if (p.y < -10) p.y = h + 10; else if (p.y > h + 10) p.y = -10;
        }
      }
      ctx.lineWidth = 1;
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i];
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j], dx = a.x - b.x, dy = a.y - b.y, d2 = dx * dx + dy * dy;
          if (d2 < LINK * LINK) {
            ctx.strokeStyle = `rgba(244,242,238,${(1 - Math.sqrt(d2) / LINK) * 0.16})`;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
        const d = Math.hypot(a.x - mx, a.y - my);
        if (d < 180) {
          ctx.strokeStyle = `rgba(124,92,255,${(1 - d / 180) * 0.55})`;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mx, my); ctx.stroke();
        }
        ctx.fillStyle = 'rgba(244,242,238,.6)';
        ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, 6.283); ctx.fill();
      }
    }
    function resize() {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      w = host.offsetWidth; h = host.offsetHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      pts = Array.from({ length: Math.min(80, Math.round((w * h) / 10500)) }, () => {
        const a = Math.random() * Math.PI * 2, sp = 0.12 + Math.random() * 0.18;
        return { x: Math.random() * w, y: Math.random() * h, bx: Math.cos(a) * sp, by: Math.sin(a) * sp, vx: 0, vy: 0, r: 0.6 + Math.random() * 1.2 };
      });
      draw(false);
    }
    const loop = () => { draw(true); raf = requestAnimationFrame(loop); };
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    const io = new IntersectionObserver(([e]) => {
      cancelAnimationFrame(raf);
      if (e.isIntersecting && !reducedMotion()) raf = requestAnimationFrame(loop);
    });
    io.observe(host);
    const move = (e) => { const r = host.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; };
    const leave = () => { mx = my = -1e4; };
    if (finePointer()) { host.addEventListener('pointermove', move); host.addEventListener('pointerleave', leave); }
    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
      host.removeEventListener('pointermove', move); host.removeEventListener('pointerleave', leave);
    };
  }, []);
  return <canvas className="field" ref={ref} aria-hidden="true" />;
}

function Hero({ introDone }) {
  return (
    <Tile className="t-hero">
      <ParticleField />
      <Meta path="/" status="200 OK" />
      <div className="hero__body">
        <p className="eyebrow">{profile.eyebrow}</p>
        <h1 className="name" aria-label={`${profile.first} ${profile.last}`}>
          <span className="line" aria-hidden="true"><Split text={profile.first} /></span>
          <span className="line" aria-hidden="true"><Split text={profile.last} /><em className="ch">.</em></span>
        </h1>
        <p className="hero__sub">
          I build <Scramble words={roles} active={introDone} /><span className="caret" aria-hidden="true" />
          <span className="sr-only">{roles.slice(0, 4).join(', ')}.</span>
        </p>
      </div>
      <div className="hero__foot">
        <a className="btn btn--solid" href="#projects" data-magnetic>See the work <Icon name="down" /></a>
        <a className="btn" href="#contact" data-magnetic>Say hello</a>
        <ul className="hero__facts" aria-label="Quick facts">
          {heroFacts.map((f) => <li key={f}>{f}</li>)}
        </ul>
      </div>
    </Tile>
  );
}

export default memo(Hero);
