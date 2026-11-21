// ── Page motion ──────────────────────────────────────────────────────────
// All GSAP / ScrollTrigger / Lenis work lives here so components stay plain
// markup. initMotion() runs once after mount and returns a cleanup function
// (safe under React StrictMode's double-mount in dev).

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { finePointer, reducedMotion } from './hooks.js';

gsap.registerPlugin(ScrollTrigger);

export function initMotion(root, { onLoaded, onIntroDone }) {
  const reduce = reducedMotion();
  const fine = finePointer();
  const html = document.documentElement;
  const $ = (s, c = root) => c.querySelector(s);
  const $$ = (s, c = root) => [...c.querySelectorAll(s)];
  const cleanups = [];
  const on = (target, type, fn, opts) => {
    target.addEventListener(type, fn, opts);
    cleanups.push(() => target.removeEventListener(type, fn, opts));
  };

  const tiles = $$('.tile');

  // Size each tile's rotating border gradient to its diagonal so it covers every corner.
  const ro = new ResizeObserver((entries) => {
    for (const { target: el } of entries) {
      el.style.setProperty('--diag', `${Math.ceil(Math.hypot(el.offsetWidth, el.offsetHeight) + 24)}px`);
    }
  });
  tiles.forEach((t) => ro.observe(t));
  cleanups.push(() => ro.disconnect());

  // Path lengths for the DSVX version-graph draw-on
  $$('.dag path').forEach((p) => p.style.setProperty('--len', Math.ceil(p.getTotalLength())));

  // ── Smooth scroll ──
  let lenis = null;
  if (!reduce) {
    lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    const raf = (t) => lenis.raf(t * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    cleanups.push(() => { gsap.ticker.remove(raf); lenis.destroy(); });
  }

  // In-page anchors: smooth scroll + move focus for keyboard users
  on(document, 'click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href');
    const target = id.length > 1 && document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(id === '#top' ? 0 : target, { offset: -84, duration: 1.4 });
    else target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  });

  const ctx = gsap.context(() => {
    if (reduce) return; // calm version: everything simply visible

    // ── Count-ups (markup holds final values for reduced motion) ──
    $$('[data-count]').forEach((el) => {
      const end = parseFloat(el.dataset.count);
      const dec = +(el.dataset.decimals || 0);
      const o = { v: 0 };
      el.textContent = (0).toFixed(dec);
      ScrollTrigger.create({
        trigger: el, start: 'top 92%', once: true,
        onEnter: () => gsap.to(o, { v: end, duration: 1.8, ease: 'power3.out', onUpdate: () => { el.textContent = o.v.toFixed(dec); } }),
      });
    });

    // ── Loader → curtain wipe → hero intro (under 2s total) ──
    html.classList.add('is-loading');
    lenis?.stop();

    const indexTiles = $$('#top .tile');
    const heroChars = $$('.name .ch');
    gsap.set(indexTiles, { opacity: 0, y: 44, scale: 0.96 });
    gsap.set(heroChars, { yPercent: 115 });
    gsap.set('.nav', { opacity: 0, y: -24 });

    const intro = gsap.timeline({ paused: true })
      .to(indexTiles, { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'expo.out', stagger: 0.075 })
      .to(heroChars, { yPercent: 0, duration: 1.1, ease: 'expo.out', stagger: 0.03 }, 0.1)
      .to('.nav', { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out' }, 0.3)
      .add(() => onIntroDone?.(), 0.9);

    const loader = $('.loader');
    if (loader) {
      const num = $('.loader__num'), status = $('.loader__status'), count = { v: 0 };
      gsap.timeline({
        onComplete: () => {
          html.classList.remove('is-loading');
          lenis?.start();
          onLoaded?.();
          ScrollTrigger.refresh();
        },
      })
        .from('.loader__mark span', { yPercent: 110, duration: 0.7, ease: 'expo.out', stagger: 0.08 }, 0)
        .to(count, { v: 100, duration: 1.1, ease: 'power2.inOut', onUpdate: () => { num.textContent = String(Math.round(count.v)).padStart(3, '0'); } }, 0)
        .to('.loader__bar i', { scaleX: 1, duration: 1.1, ease: 'power2.inOut' }, 0)
        .add(() => { status.textContent = '→ 200 OK'; }, 1.1)
        .to(loader, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.75, ease: 'expo.inOut' }, 1.18)
        .add(() => intro.play(), 1.5);
    } else {
      html.classList.remove('is-loading');
      lenis?.start();
      intro.play();
    }

    // ── Section headings: letters rise from a mask, rule draws in ──
    $$('.sec-head').forEach((head) => {
      const chars = $$('.ch', head);
      gsap.set(chars, { yPercent: 115 });
      gsap.timeline({ scrollTrigger: { trigger: head, start: 'top 88%', once: true } })
        .to(chars, { yPercent: 0, duration: 1.1, ease: 'expo.out', stagger: 0.04 })
        .from($('.sec-head__rule', head), { scaleX: 0, duration: 1.4, ease: 'expo.out' }, 0.1)
        .from([$('.sec-head__idx', head), $('.sec-head__note', head)], { opacity: 0, y: 12, duration: 0.8, stagger: 0.1 }, 0.25);
    });

    // ── Tiles below the fold: staggered rise on scroll ──
    const laterTiles = $$('.section:not(#top) .tile');
    gsap.set(laterTiles, { opacity: 0, y: 64, scale: 0.97 });
    ScrollTrigger.batch(laterTiles, {
      start: 'top 90%', once: true,
      onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, scale: 1, duration: 1.15, ease: 'expo.out', stagger: 0.09, overwrite: 'auto' }),
    });

    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    if (!fine) return; // touch: no tilt, magnetism or custom cursor

    // ── 3D tilt + cursor spotlight (max angle shrinks on big tiles) ──
    tiles.forEach((t) => {
      gsap.set(t, { transformPerspective: 1100 });
      const rx = gsap.quickTo(t, 'rotationX', { duration: 0.7, ease: 'power3.out' });
      const ry = gsap.quickTo(t, 'rotationY', { duration: 0.7, ease: 'power3.out' });
      const spot = $('.tile__spot', t);
      const sx = gsap.quickSetter(spot, 'x', 'px'), sy = gsap.quickSetter(spot, 'y', 'px');
      const isProject = t.classList.contains('project');
      on(t, 'pointerenter', () => {
        if (isProject) gsap.to(t, { scale: 1.015, duration: 0.7, ease: 'power3.out', overwrite: 'auto' });
      });
      on(t, 'pointermove', (e) => {
        const r = t.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        const max = Math.min(6, 1800 / r.width);
        ry((px - 0.5) * 2 * max);
        rx(-(py - 0.5) * 2 * max);
        sx(e.clientX - r.left); sy(e.clientY - r.top);
      });
      on(t, 'pointerleave', () => {
        rx(0); ry(0);
        if (isProject) gsap.to(t, { scale: 1, duration: 0.8, ease: 'power3.out', overwrite: 'auto' });
      });
    });

    // ── Magnetic buttons & icons ──
    $$('[data-magnetic]').forEach((el) => {
      const k = parseFloat(el.dataset.magnetic) || 0.35;
      const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' });
      const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' });
      on(el, 'pointermove', (e) => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * k);
        yTo((e.clientY - (r.top + r.height / 2)) * k);
      });
      on(el, 'pointerleave', () => { xTo(0); yTo(0); });
    });

    // ── Custom cursor: exact dot + lagging ring (frame-rate independent) ──
    const cur = $('.cursor'), dot = $('.cursor__dot'), ring = $('.cursor__ring'), label = $('.cursor__label');
    if (cur) {
      html.classList.add('has-cursor');
      let mx = innerWidth / 2, my = innerHeight / 2, rxp = mx, ryp = my, shown = false;
      on(window, 'pointermove', (e) => {
        mx = e.clientX; my = e.clientY;
        if (!shown) { shown = true; rxp = mx; ryp = my; cur.classList.add('is-on'); }
      }, { passive: true });
      on(html, 'pointerleave', () => { shown = false; cur.classList.remove('is-on'); });
      const follow = () => {
        const k = 1 - Math.pow(1 - 0.2, gsap.ticker.deltaRatio());
        rxp += (mx - rxp) * k; ryp += (my - ryp) * k;
        dot.style.transform = `translate3d(${mx}px,${my}px,0)`;
        ring.style.transform = `translate3d(${rxp}px,${ryp}px,0)`;
      };
      gsap.ticker.add(follow);
      cleanups.push(() => { gsap.ticker.remove(follow); html.classList.remove('has-cursor'); });
      on(document, 'pointerover', (e) => {
        const view = e.target.closest('[data-cursor="view"]');
        const link = e.target.closest('a, button, [data-magnetic]');
        // A secondary link inside a project tile (e.g. "PyPI ↗") gets the normal link state.
        const inner = view && link && link !== view && !link.classList.contains('stretch');
        cur.classList.toggle('is-view', !!view && !inner);
        cur.classList.toggle('is-link', !!link && (!view || !!inner));
        if (view) label.textContent = view.dataset.cursorLabel || 'View';
      });
    }
  }, root);

  if (reduce) { onLoaded?.(); onIntroDone?.(); }

  return () => {
    ctx.revert();
    cleanups.forEach((fn) => fn());
    html.classList.remove('is-loading');
  };
}

// ── Confetti burst from both bottom corners (the "hire" easter egg) ─────
export function confetti() {
  const c = document.createElement('canvas');
  c.className = 'confetti';
  c.setAttribute('aria-hidden', 'true');
  document.body.appendChild(c);
  const ctx = c.getContext('2d');
  const dpr = Math.min(devicePixelRatio || 1, 2), W = innerWidth, H = innerHeight;
  c.width = W * dpr; c.height = H * dpr; ctx.scale(dpr, dpr);
  const cols = ['#7c5cff', '#2dd4ef', '#ffb547', '#f4f2ee'];
  const P = Array.from({ length: 190 }, (_, i) => {
    const left = i % 2 === 0;
    return {
      x: left ? -10 : W + 10, y: H * 0.75, vx: (left ? 1 : -1) * (5 + Math.random() * 11), vy: -(10 + Math.random() * 11),
      w: 6 + Math.random() * 7, h: 3 + Math.random() * 5, r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.35, c: cols[i % 4],
    };
  });
  const t0 = performance.now(), LIFE = 3.4;
  (function frame(t) {
    const el = (t - t0) / 1000;
    ctx.clearRect(0, 0, W, H);
    ctx.globalAlpha = Math.max(0, 1 - Math.max(0, el - 2) / (LIFE - 2));
    for (const p of P) {
      p.vy += 0.3; p.vx *= 0.985; p.vy *= 0.985; p.x += p.vx; p.y += p.vy; p.r += p.vr;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillStyle = p.c;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h * Math.abs(Math.cos(p.r * 2))); // flutter
      ctx.restore();
    }
    if (el < LIFE) requestAnimationFrame(frame); else c.remove();
  })(t0);
}
