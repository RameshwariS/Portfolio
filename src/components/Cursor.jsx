import { useEffect, useRef } from 'react';
import { finePointer, reducedMotion } from '../hooks.js';

// A follower that trails the native pointer. It grows over links and buttons,
// and shows a word when the hovered element has `data-cursor="Word"`.
export default function Cursor() {
  const ref = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    if (!finePointer() || reducedMotion()) return undefined;
    const el = ref.current;
    let x = -100, y = -100, cx = -100, cy = -100, raf = 0;
    const loop = () => {
      cx += (x - cx) * 0.2;
      cy += (y - cy) * 0.2;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      // stop once it has caught up; the next mouse move restarts it
      raf = Math.abs(x - cx) + Math.abs(y - cy) > 0.1 ? requestAnimationFrame(loop) : 0;
    };
    const move = (e) => {
      x = e.clientX; y = e.clientY;
      const target = e.target instanceof Element ? e.target.closest('[data-cursor], a, button') : null;
      const label = target?.dataset.cursor || '';
      el.classList.toggle('on', !!target);
      el.classList.toggle('labelled', !!label);
      if (label) labelRef.current.textContent = label;
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const hide = () => el.classList.remove('live');
    const show = () => el.classList.add('live');
    window.addEventListener('mousemove', move);
    window.addEventListener('mousemove', show, { once: true });
    document.addEventListener('mouseleave', hide);
    document.addEventListener('mouseenter', show);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousemove', show);
      document.removeEventListener('mouseleave', hide);
      document.removeEventListener('mouseenter', show);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="cursor" ref={ref} aria-hidden="true">
      <span className="cursor-dot"><span ref={labelRef} /></span>
    </div>
  );
}
