import { useEffect, useState } from 'react';
import { profile } from '../data.js';

const COUNT_MS = 1000;

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
      <span className="loader-tag">{profile.first} {profile.last} &middot; ignition sequence</span>
      <span className="loader-count" aria-hidden="true">{String(n).padStart(3, '0')}</span>
      <span className="loader-bar" style={{ transform: `scaleX(${n / 100})` }} />
    </div>
  );
}
