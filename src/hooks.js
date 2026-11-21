import { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';

export const finePointer = () => window.matchMedia('(pointer: fine)').matches;
export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Deep space (dark) is the designed default; a visitor's choice is remembered.
function initialTheme() {
  try {
    if (localStorage.getItem('theme') === 'light') return 'light';
  } catch { /* storage unavailable */ }
  return 'dark';
}

export function useTheme() {
  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('theme', theme); } catch { /* storage unavailable */ }
  }, [theme]);

  // Switches theme with a circular wipe that grows from the click position,
  // where the browser supports view transitions.
  const toggle = (event) => {
    const next = theme === 'light' ? 'dark' : 'light';
    if (!document.startViewTransition || reducedMotion()) { setTheme(next); return; }
    const x = event?.clientX ?? window.innerWidth / 2;
    const y = event?.clientY ?? 0;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    const transition = document.startViewTransition(() => {
      flushSync(() => setTheme(next));
      document.documentElement.dataset.theme = next;
    });
    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 700, easing: 'cubic-bezier(.3, 0, .1, 1)', pseudoElement: '::view-transition-new(root)' }
      );
    });
  };

  return [theme, toggle];
}

export function useClock() {
  const [clock, setClock] = useState('');
  useEffect(() => {
    const fmt = () => new Date().toLocaleTimeString('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setClock(fmt());
    const id = setInterval(() => setClock(fmt()), 1000);
    return () => clearInterval(id);
  }, []);
  return clock;
}

// Id of the section currently under the reading line (35% down the viewport).
export function useActiveSection(ids) {
  const [active, setActive] = useState('');
  useEffect(() => {
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const onScroll = () => {
      const mark = window.innerHeight * 0.35;
      let current = '';
      sections.forEach((s) => { if (s.getBoundingClientRect().top <= mark) current = s.id; });
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, [ids]);
  return active;
}

// Adds `in-view` to every `.reveal` / `.observe` element the first time it
// scrolls into view. `.reveal` fades up; `.observe` only gets the class, for
// children that animate themselves (split words, hairlines).
export function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in-view'); obs.unobserve(e.target); } }),
      { threshold: 0.1, rootMargin: '0px 0px -6% 0px' }
    );
    document.querySelectorAll('.reveal, .observe').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// Elements marked `data-magnetic` lean toward the pointer while hovered.
export function useMagnetic() {
  useEffect(() => {
    if (!finePointer() || reducedMotion()) return undefined;
    const els = [...document.querySelectorAll('[data-magnetic]')];
    const move = (e) => {
      const el = e.currentTarget;
      const r = el.getBoundingClientRect();
      const k = Number(el.dataset.magnetic) || 0.3;
      el.style.translate = `${(e.clientX - r.left - r.width / 2) * k}px ${(e.clientY - r.top - r.height / 2) * k}px`;
    };
    const leave = (e) => { e.currentTarget.style.translate = ''; };
    els.forEach((el) => { el.addEventListener('mousemove', move); el.addEventListener('mouseleave', leave); });
    return () => els.forEach((el) => { el.removeEventListener('mousemove', move); el.removeEventListener('mouseleave', leave); });
  }, []);
}
