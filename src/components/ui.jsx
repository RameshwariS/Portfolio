import { Fragment, useEffect, useRef, useState } from 'react';

export const pad = (n) => String(n).padStart(2, '0');

export function Arrow({ size = 14 }) {
  return (
    <svg className="arrow" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

// ── Text motion ──────────────────────────────────────────────────────────
// Splits a sentence into words that rise out of a mask, one after another,
// when the nearest `.observe` ancestor (or the element itself) comes into view.
// Wrap a phrase in *asterisks* to set it in the italic serif.
export function Words({ text, as: Tag = 'span', className = '' }) {
  let italic = false;
  return (
    <Tag className={`words observe ${className}`} aria-label={text.replace(/\*/g, '')}>
      {text.split(' ').map((raw, i) => {
        let word = raw;
        if (word.startsWith('*')) { italic = true; word = word.slice(1); }
        const isItalic = italic;
        if (word.endsWith('*')) { italic = false; word = word.slice(0, -1); }
        return (
          <Fragment key={i}>
            <span className="w" aria-hidden="true"><span className={isItalic ? 'it' : ''} style={{ '--i': i }}>{word}</span></span>{' '}
          </Fragment>
        );
      })}
    </Tag>
  );
}

// One line of text whose letters rise in sequence (used for the hero name).
export function Chars({ text, delay = 0 }) {
  return (
    <span className="line" aria-hidden="true">
      {[...text].map((c, i) => (
        <span className="ch" key={i} style={{ animationDelay: `${delay + i * 38}ms` }}>{c}</span>
      ))}
    </span>
  );
}

// Text that rolls up and is replaced by a copy of itself on hover.
export function Roll({ children }) {
  return <span className="roll" data-text={children}><span>{children}</span></span>;
}

// ── Links ────────────────────────────────────────────────────────────────
// External link. A link with no URL yet (TODO_LINK in data.js) renders as a
// dashed marker while developing and is left out of production builds.
export function Ext({ href, children }) {
  if (!href) {
    return import.meta.env.DEV
      ? <span className="link-todo" title="No URL yet: add it in src/data.js">{children} [add link]</span>
      : null;
  }
  return <a href={href} target="_blank" rel="noreferrer" className="u-link">{children} <Arrow size={12} /></a>;
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
// A hairline that draws itself across when it scrolls into view.
export function Rule() {
  return <span className="rule observe" aria-hidden="true" />;
}

// Section opener: drawn hairline, small index label, then a word-revealed title.
export function SectionHead({ index, label, title }) {
  return (
    <header className="sec-head">
      <Rule />
      <p className="label"><span>({pad(index)})</span>{label}</p>
      <Words as="h2" className="sec-title" text={title} />
    </header>
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
        const p = Math.min((t - start) / 1600, 1);
        setN(value * (1 - Math.pow(1 - p, 4)));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => { obs.disconnect(); cancelAnimationFrame(raf); };
  }, [value]);
  return <span ref={ref}>{n.toFixed(decimals)}{suffix}</span>;
}
