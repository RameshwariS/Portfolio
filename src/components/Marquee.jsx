// Infinite marquee: the list is rendered twice and the track slides -50%.
// CSS pauses it on hover and stops it for reduced motion.
export default function Marquee({ items, itemClass, label, reverse = false, duration = 50 }) {
  const render = (hidden) => (
    <ul className="marquee__group" aria-label={hidden ? undefined : label} aria-hidden={hidden || undefined}>
      {items.map((t, i) => (
        <li key={t} className={typeof itemClass === 'function' ? itemClass(i) : itemClass}>{t}</li>
      ))}
    </ul>
  );
  return (
    <div className={`marquee ${reverse ? 'marquee--rev' : ''}`} style={{ '--dur': `${duration}s` }}>
      <div className="marquee__track">{render(false)}{render(true)}</div>
    </div>
  );
}
