// Shared building blocks for the bento layout.

// Stable pseudo-random shimmer offset per tile, so borders don't sweep in sync.
const delayFor = (key = '') => {
  let h = 0;
  for (const c of key) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return `${-((h % 1100) / 100).toFixed(2)}s`;
};

/** Glass tile with shimmering 1px border and a cursor spotlight layer. */
export function Tile({ as: Tag = 'article', className = '', children, ...rest }) {
  return (
    <Tag className={`tile ${className}`} {...rest}>
      <span className="tile__spot" aria-hidden="true" />
      <span className="tile__border" aria-hidden="true" style={{ '--delay': delayFor(className) }}><i /></span>
      {children}
    </Tag>
  );
}

/** The endpoint label at the top of each tile, e.g. "GET /about · 200". */
export function Meta({ method = 'GET', path, status, as: Tag = 'p' }) {
  return (
    <Tag className="meta">
      <b>{method}</b> {path} {status && <span className="ok">{status}</span>}
    </Tag>
  );
}

/** Splits text into per-character spans for mask reveals. */
export function Split({ text }) {
  return [...text].map((c, i) => (
    <span className="ch" key={i}>{c === ' ' ? ' ' : c}</span>
  ));
}

/** Big numbered section heading with a rule and an endpoint note. */
export function SecHead({ idx, id, title, note }) {
  return (
    <header className="sec-head">
      <span className="sec-head__idx">{idx}</span>
      <h2 id={id} className="sec-head__title" aria-label={title}>
        <span aria-hidden="true"><Split text={title} /></span>
      </h2>
      <span className="sec-head__rule" aria-hidden="true" />
      <span className="sec-head__note">{note}</span>
    </header>
  );
}

/** Bullet list where each item is [bold lead-in, rest]. */
export function Ticks({ items }) {
  return (
    <ul className="ticks">
      {items.map(([strong, rest]) => (
        <li key={strong}><strong>{strong}</strong>{rest}</li>
      ))}
    </ul>
  );
}

export function Tags({ items, slide = false }) {
  return (
    <ul className={`tags ${slide ? 'tags--slide' : ''}`} aria-label="Tech used">
      {items.map((t, i) => <li key={t} style={slide ? { '--i': i } : undefined}>{t}</li>)}
    </ul>
  );
}

export function Chips({ links }) {
  if (!links?.length) return null;
  return (
    <div className="chips">
      {links.map((l) => (
        <a key={l.label} className="chip" href={l.href} target="_blank" rel="noopener noreferrer">
          {l.label} <Icon name="arrow" />
        </a>
      ))}
    </div>
  );
}

const PATHS = {
  arrow: <path d="M7 17 17 7M8 7h9v9" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />,
  down: <path d="M12 5v14m0 0-6-6m6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
  download: <path d="M12 4v12m0 0-5-5m5 5 5-5M5 20h14" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />,
  github: <path fill="currentColor" d="M12 .5A11.5 11.5 0 0 0 8.36 22.9c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.35.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />,
  linkedin: <path fill="currentColor" d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5.1c0-1.22-.02-2.78-1.7-2.78-1.7 0-1.96 1.33-1.96 2.7V21h-4z" />,
  leetcode: <path d="M14 4 7 11.5a2.2 2.2 0 0 0 0 3L11.5 19a2.2 2.2 0 0 0 3 0L17 16.6M9 12.9h11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
  medium: <path fill="currentColor" d="M13.5 12a6.75 6.75 0 1 1-13.5 0 6.75 6.75 0 0 1 13.5 0Zm7.4 0c0 3.54-1.51 6.42-3.38 6.42S14.15 15.54 14.15 12s1.51-6.42 3.37-6.42S20.9 8.46 20.9 12ZM24 12c0 3.17-.53 5.75-1.19 5.75S21.62 15.17 21.62 12s.53-5.75 1.19-5.75S24 8.83 24 12Z" />,
};

export function Icon({ name }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true">{PATHS[name]}</svg>;
}
