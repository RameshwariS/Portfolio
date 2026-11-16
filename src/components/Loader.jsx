import { useEffect, useState } from 'react';
import { Flower } from './ui.jsx';

const COUNT_MS = 900;

// Opening curtain: counts to 100, then lifts. `leaving` is driven by the parent.
export default function Loader({ leaving, onCounted }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    let raf;
    const start = performance.now();
    const tick = (t) => {
      const p = Math.min((t - start) / COUNT_MS, 1);
      setN(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else onCounted();
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onCounted]);

  return (
    <div className={`loader ${leaving ? 'leaving' : ''}`} role="status" aria-label="Loading">
      <Flower className="loader-flower" />
      <span className="loader-count" aria-hidden="true">{n}%</span>
      <span className="loader-note">just a sec&hellip;</span>
    </div>
  );
}
