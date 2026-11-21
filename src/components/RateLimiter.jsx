import { useEffect, useRef } from 'react';
import { reducedMotion } from '../hooks.js';

// Live GoProxyX demo: requests flow into a gateway guarded by a token bucket.
// Allowed requests route to a service (cyan); when the bucket is empty they
// bounce back as 429s (amber). Hovering the parent tile triggers a burst.
export default function RateLimiter() {
  const wrapRef = useRef(null), canvasRef = useRef(null), okRef = useRef(null), limRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current, canvas = canvasRef.current, ctx = canvas.getContext('2d');
    const tile = wrap.closest('.tile');
    const CAP = 8, REFILL = 3.2; // bucket size, tokens per second
    const lanes = [{ name: '/items', p: 0 }, { name: '/users', p: 0 }, { name: '/orders', p: 0 }];
    let w = 0, h = 0, tokens = CAP, packets = [], pops = [], acc = 0, ok = 0, lim = 0, ui = 0;
    let burst = false, raf = 0, last = 0;

    const geo = () => {
      const span = Math.min(h - 96, 250), top = Math.max(44, (h - span) / 2 - 8), bot = top + span;
      return { gx: Math.round(w * 0.4), sx: w - 84, top, bot, cy: (top + bot) / 2, lane: (i) => top + 18 + i * ((bot - top - 36) / 2) };
    };

    function step(dt) {
      const g = geo();
      tokens = Math.min(CAP, tokens + REFILL * dt);
      acc += (burst ? 12 : 2.4) * dt;
      while (acc >= 1) { acc--; packets.push({ x: -6, y: 34 + Math.random() * (h - 84), s: 'in', v: 120 + Math.random() * 70, a: 1, lane: 0 }); }
      for (const p of packets) {
        if (p.s === 'in') {
          p.x += p.v * dt;
          p.y += (g.cy - p.y) * Math.min(1, dt * 1.6) * (p.x / g.gx);
          if (p.x >= g.gx - 14) {
            if (tokens >= 1) { tokens--; ok++; p.s = 'out'; p.x = g.gx + 14; p.lane = (Math.random() * 3) | 0; }
            else { lim++; p.s = 'rej'; p.v = -(50 + Math.random() * 50); pops.push({ x: g.gx - 30, y: p.y, t: 0 }); }
          }
        } else if (p.s === 'out') {
          p.x += p.v * 1.3 * dt;
          p.y += (g.lane(p.lane) - p.y) * Math.min(1, dt * 6);
          if (p.x >= g.sx - 6) { p.dead = true; lanes[p.lane].p = 1; }
        } else {
          p.x += p.v * dt; p.a -= dt * 1.4;
          if (p.a <= 0) p.dead = true;
        }
      }
      packets = packets.filter((p) => !p.dead);
      pops.forEach((q) => { q.t += dt; });
      pops = pops.filter((q) => q.t < 1);
      lanes.forEach((l) => { l.p = Math.max(0, l.p - dt * 2.4); });
      if ((ui += dt) > 0.15) { ui = 0; okRef.current.textContent = ok; limRef.current.textContent = lim; }
    }

    const rr = (x, y, ww, hh, r) => { ctx.beginPath(); if (ctx.roundRect) ctx.roundRect(x, y, ww, hh, r); else ctx.rect(x, y, ww, hh); };

    function draw() {
      const g = geo();
      ctx.clearRect(0, 0, w, h);
      ctx.font = '500 10.5px "JetBrains Mono", ui-monospace, monospace';
      ctx.textBaseline = 'middle';
      lanes.forEach((l, i) => {
        const y = g.lane(i);
        ctx.strokeStyle = 'rgba(255,255,255,.1)'; ctx.lineWidth = 1; ctx.setLineDash([3, 5]);
        ctx.beginPath(); ctx.moveTo(g.gx + 12, g.cy);
        ctx.bezierCurveTo(g.gx + 56, g.cy, g.gx + 40, y, g.gx + 96, y); ctx.lineTo(g.sx - 8, y); ctx.stroke();
        ctx.setLineDash([]);
        if (l.p > 0) { ctx.strokeStyle = `rgba(45,212,239,${l.p * 0.5})`; ctx.beginPath(); ctx.arc(g.sx, y, 7 + (1 - l.p) * 12, 0, 6.283); ctx.stroke(); }
        rr(g.sx - 7, y - 7, 14, 14, 4);
        ctx.fillStyle = `rgba(45,212,239,${0.12 + l.p * 0.5})`; ctx.fill();
        ctx.strokeStyle = 'rgba(45,212,239,.55)'; ctx.stroke();
        ctx.fillStyle = 'rgba(244,242,238,.62)'; ctx.fillText(l.name, g.sx + 14, y + 0.5);
      });
      rr(g.gx - 12, g.top, 24, g.bot - g.top, 10);
      ctx.fillStyle = 'rgba(255,255,255,.05)'; ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,.22)'; ctx.stroke();
      ctx.fillStyle = 'rgba(244,242,238,.62)';
      ctx.fillText('gateway', g.gx - 24, g.top - 26);
      for (let i = 0; i < CAP; i++) {
        const fill = Math.max(0, Math.min(1, tokens - i));
        ctx.fillStyle = fill > 0 ? `rgba(244,242,238,${0.2 + fill * 0.75})` : 'rgba(255,255,255,.1)';
        ctx.fillRect(g.gx - 24 + i * 6, g.top - 13, 4, 4);
      }
      ctx.fillStyle = 'rgba(244,242,238,.4)'; ctx.fillText('clients', 12, g.top - 26);
      for (const p of packets) {
        const col = p.s === 'in' ? '244,242,238' : p.s === 'out' ? '45,212,239' : '255,181,71';
        ctx.fillStyle = `rgba(${col},${0.16 * p.a})`; ctx.beginPath(); ctx.arc(p.x, p.y, 6, 0, 6.283); ctx.fill();
        ctx.fillStyle = `rgba(${col},${p.a})`; ctx.beginPath(); ctx.arc(p.x, p.y, 2.3, 0, 6.283); ctx.fill();
      }
      ctx.font = '600 11px "JetBrains Mono", ui-monospace, monospace';
      for (const q of pops) { ctx.fillStyle = `rgba(255,181,71,${1 - q.t})`; ctx.fillText('429', q.x - 8, q.y - q.t * 24); }
    }

    function resize() {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      w = wrap.offsetWidth; h = wrap.offsetHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    }
    const loop = (t) => {
      const dt = Math.min(0.05, (t - last) / 1000 || 0.016); last = t;
      step(dt); draw();
      raf = requestAnimationFrame(loop);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    if (reducedMotion()) { // one calm, pre-simulated frame
      for (let i = 0; i < 160; i++) step(1 / 60);
      draw();
      return () => ro.disconnect();
    }
    const io = new IntersectionObserver(([e]) => {
      cancelAnimationFrame(raf);
      if (e.isIntersecting) { last = performance.now(); raf = requestAnimationFrame(loop); }
    });
    io.observe(wrap);
    const on = () => { burst = true; }, off = () => { burst = false; };
    tile.addEventListener('pointerenter', on); tile.addEventListener('pointerleave', off);
    tile.addEventListener('focusin', on); tile.addEventListener('focusout', off);
    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
      tile.removeEventListener('pointerenter', on); tile.removeEventListener('pointerleave', off);
      tile.removeEventListener('focusin', on); tile.removeEventListener('focusout', off);
    };
  }, []);

  return (
    <div className="feat__viz" ref={wrapRef}>
      <canvas className="gw" ref={canvasRef} role="img" aria-label="Animation: requests flow through the gateway; when the token bucket is empty they are rejected with 429." />
      <p className="gw__legend" aria-hidden="true">
        <span><i className="c-ok" />200 · <b ref={okRef}>0</b></span>
        <span><i className="c-429" />429 · <b ref={limRef}>0</b></span>
        <span className="gw__hint">hover = traffic burst</span>
      </p>
    </div>
  );
}
