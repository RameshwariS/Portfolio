import { useState } from 'react';

export default function Palette({ commands, onClose }) {
  const [query, setQuery] = useState('');
  const [sel, setSel] = useState(0);
  const q = query.trim().toLowerCase();
  const list = commands.filter((c) => `${c.label} ${c.hint}`.toLowerCase().includes(q));
  const run = (c) => { onClose(); c.run(); };

  const onKeyDown = (e) => {
    if (e.key === 'Escape') onClose();
    else if (e.key === 'ArrowDown') { e.preventDefault(); setSel((s) => (s + 1) % Math.max(list.length, 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setSel((s) => (s - 1 + list.length) % Math.max(list.length, 1)); }
    else if (e.key === 'Enter' && list[sel]) run(list[sel]);
  };

  return (
    <div className="palette-backdrop" onMouseDown={onClose}>
      <div className="palette" role="dialog" aria-modal="true" aria-label="Command palette" onMouseDown={(e) => e.stopPropagation()}>
        <div className="palette-input">
          <span aria-hidden="true">&gt;</span>
          <input
            autoFocus
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSel(0); }}
            onKeyDown={onKeyDown}
            placeholder="Type a command or search…"
            aria-label="Command"
          />
          <kbd>esc</kbd>
        </div>
        <ul className="palette-list">
          {list.map((c, i) => (
            <li key={c.label}>
              <button className={i === sel ? 'sel' : ''} onMouseEnter={() => setSel(i)} onClick={() => run(c)}>
                <span>{c.label}</span>
                <span className="palette-hint">{c.hint}</span>
              </button>
            </li>
          ))}
          {list.length === 0 && <li className="palette-empty">404: no matching command</li>}
        </ul>
      </div>
    </div>
  );
}
