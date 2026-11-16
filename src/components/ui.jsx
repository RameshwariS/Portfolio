import { useEffect, useRef, useState } from 'react';

export const pad = (n) => String(n).padStart(2, '0');

// ── Doodles ──────────────────────────────────────────────────────────────
// Small decorative shapes. They take their fill from `color`.
export function Sparkle({ className = '' }) {
  return (
    <svg className={`doodle ${className}`} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 1c.9 6.2 4.2 9.6 11 11-6.8 1.4-10.1 4.8-11 11-.9-6.2-4.2-9.6-11-11 6.8-1.4 10.1-4.8 11-11Z" />
    </svg>
  );
}

export function Heart({ className = '' }) {
  return (
    <svg className={`doodle ${className}`} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 21s-8.5-5.4-8.5-11.3C3.5 6.5 5.9 4.5 8.5 4.5c1.7 0 2.9.9 3.5 1.9.6-1 1.8-1.9 3.5-1.9 2.6 0 5 2 5 5.2C20.5 15.6 12 21 12 21Z" />
    </svg>
  );
}

export function Flower({ className = '' }) {
  return (
    <svg className={`doodle ${className}`} viewBox="0 0 40 40" aria-hidden="true">
      <g>
        <circle cx="20" cy="9.5" r="7.5" /><circle cx="30" cy="16.8" r="7.5" /><circle cx="26.2" cy="28.5" r="7.5" />
        <circle cx="13.8" cy="28.5" r="7.5" /><circle cx="10" cy="16.8" r="7.5" />
      </g>
      {/* covers the petal outlines where they overlap in the middle */}
      <circle className="flower-fill" cx="20" cy="20" r="9.5" />
      <circle className="flower-eye" cx="20" cy="20" r="4.6" />
    </svg>
  );
}

export function Squiggle({ className = '' }) {
  return (
    <svg className={`squiggle ${className}`} viewBox="0 0 200 14" preserveAspectRatio="none" aria-hidden="true">
      <path d="M3 8c12-8 20 8 32 0s20-8 32 0 20 8 32 0 20-8 32 0 20 8 32 0 20-8 32 0" pathLength="1" />
    </svg>
  );
}

export function Arrow({ size = 14 }) {
  return (
    <svg className="arrow" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

// ── Links ────────────────────────────────────────────────────────────────
// External link. A link with no URL yet (TODO_LINK in data.js) renders as a
// dashed marker while developing and is left out of production builds.
export function Ext({ href, children, className = 'u-link' }) {
  if (!href) {
    return import.meta.env.DEV
      ? <span className="link-todo" title="No URL yet: add it in src/data.js">{children} [add link]</span>
      : null;
  }
  return <a href={href} target="_blank" rel="noreferrer" className={className}>{children} <Arrow /></a>;
}

export function Links({ links }) {
  if (!links?.length) return null;
  return (
    <div className="links">
      {links.map((l) => <Ext key={l.label} href={l.href}>{l.label}</Ext>)}
    </div>
  );
}

// ── Layout pieces ────────────────────────────────────────────────────────
// Handwritten kicker above a serif heading. <em> inside gets a marker highlight.
export function SectionHead({ index, kicker, children }) {
  return (
    <header className="sec-head reveal">
      <p className="kicker"><span>{pad(index)}</span>{kicker}</p>
      <h2 className="sec-title">{children}</h2>
    </header>
  );
}

// A little app window: pastel title bar with three dots.
export function Window({ title, className = '', children }) {
  return (
    <div className={`win ${className}`}>
      <div className="win-bar">
        <i /><i /><i />
        <span>{title}</span>
      </div>
      {children}
    </div>
  );
}

export function Chips({ items }) {
  return (
    <ul className="chips">
      {items.map((s) => <li key={s}>{s}</li>)}
    </ul>
  );
}

export function CountUp({ value, decimals, suffix }) {
  const ref = useRef(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const el = ref.current;
    let raf;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      const start = performance.now();
      const tick = (t) => {
        const p = Math.min((t - start) / 1400, 1);
        setN(value * (1 - Math.pow(1 - p, 3)));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => { obs.disconnect(); cancelAnimationFrame(raf); };
  }, [value]);
  return <span ref={ref}>{n.toFixed(decimals)}{suffix}</span>;
}
