import { Fragment, useEffect, useRef } from 'react';
import { reducedMotion } from '../hooks.js';

// An endless strip of words. It drifts on its own, and scrolling the page
// speeds it up, flips its direction and leans it into the movement.
export default function Marquee({ items }) {
  const trackRef = useRef(null);

  useEffect(() => {
    if (reducedMotion()) return undefined;
    const track = trackRef.current;
    let x = 0, velocity = 0, direction = -1, lastY = window.scrollY, raf = 0;
    const tick = () => {
      const half = track.scrollWidth / 2;
      const y = window.scrollY;
      const dy = y - lastY;
      lastY = y;
      velocity += (dy - velocity) * 0.1;
      if (Math.abs(dy) > 0.5) direction = dy > 0 ? -1 : 1;
      x += direction * (0.5 + Math.abs(velocity) * 0.3);
      if (x <= -half) x += half;
      if (x > 0) x -= half;
      const lean = Math.max(-10, Math.min(10, velocity * 0.3));
      track.style.transform = `translate3d(${x}px, 0, 0) skewX(${lean}deg)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track" ref={trackRef}>
        {[0, 1].map((k) => (
          <span key={k}>
            {items.map((t) => <Fragment key={t}>{t}<i /></Fragment>)}
          </span>
        ))}
      </div>
    </div>
  );
}
