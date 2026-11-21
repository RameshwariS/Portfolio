import { memo, useEffect, useRef, useState } from 'react';
import { mascotLines } from '../data.js';
import { finePointer, reducedMotion } from '../hooks.js';
import { Meta, Tile } from './ui.jsx';

// "Ping" — the site mascot. A little server-bot with a screen for a face.
// Eyes follow the cursor, it blinks, waves on hover, hops and talks when poked,
// and gets happy eyes when the "hire" easter egg fires.
function Mascot({ party }) {
  const svgRef = useRef(null);
  const lookRef = useRef(null);
  const [line, setLine] = useState("hi, I'm Ping!");
  const [pokes, setPokes] = useState(0);

  // Eye tracking (fine pointers only), eased in a rAF loop that runs while visible.
  useEffect(() => {
    if (!finePointer() || reducedMotion()) return undefined;
    const svg = svgRef.current, look = lookRef.current;
    let mx = innerWidth / 2, my = innerHeight / 2, x = 0, y = 0, raf = 0;
    const onMove = (e) => { mx = e.clientX; my = e.clientY; };
    const loop = () => {
      const r = svg.getBoundingClientRect();
      const dx = mx - (r.left + r.width * 0.5), dy = my - (r.top + r.height * 0.49);
      const d = Math.hypot(dx, dy) || 1, k = Math.min(1, d / 280);
      x += ((dx / d) * 6 * k - x) * 0.15;
      y += ((dy / d) * 4.5 * k - y) * 0.15;
      look.setAttribute('transform', `translate(${x.toFixed(2)} ${y.toFixed(2)})`);
      raf = requestAnimationFrame(loop);
    };
    const io = new IntersectionObserver(([e]) => {
      cancelAnimationFrame(raf);
      if (e.isIntersecting) raf = requestAnimationFrame(loop);
    });
    io.observe(svg);
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => { cancelAnimationFrame(raf); io.disconnect(); window.removeEventListener('pointermove', onMove); };
  }, []);

  useEffect(() => { if (party) setLine('201 Created!!'); }, [party]);

  const poke = () => {
    setLine(mascotLines[pokes % mascotLines.length]);
    setPokes((n) => n + 1);
    if (!reducedMotion()) {
      svgRef.current.animate(
        [
          { transform: 'translateY(0) scale(1, 1)' },
          { transform: 'translateY(4px) scale(1.06, .92)', offset: 0.15 },
          { transform: 'translateY(-18px) scale(.96, 1.05)', offset: 0.5 },
          { transform: 'translateY(0) scale(1.04, .96)', offset: 0.85 },
          { transform: 'translateY(0) scale(1, 1)' },
        ],
        { duration: 620, easing: 'cubic-bezier(.3,.7,.4,1)' },
      );
    }
  };

  return (
    <Tile className={`t-mascot ${party ? 'is-party' : ''}`}>
      <Meta path="/mascot" status="ping" />
      <button
        type="button"
        className="mascot"
        onClick={poke}
        data-cursor="view"
        data-cursor-label="Poke"
        aria-label="Ping, the site mascot. Poke for a status update."
      >
        <span className="mascot__bubble" key={line + pokes} aria-live="polite">{line}</span>
        <svg ref={svgRef} className="mascot__svg" viewBox="0 0 200 200" aria-hidden="true">
          <defs>
            <linearGradient id="ping-body" x1="0" y1="0" x2=".35" y2="1">
              <stop offset="0" stopColor="#b3a3ff" />
              <stop offset="1" stopColor="#5a3de0" />
            </linearGradient>
            <linearGradient id="ping-screen" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#14122a" />
              <stop offset="1" stopColor="#0a0914" />
            </linearGradient>
          </defs>

          <ellipse className="mascot__shadow" cx="100" cy="190" rx="44" ry="6" />

          <g className="mascot__float">
            {/* antenna with the amber "live" light */}
            <path d="M100 46V29" stroke="#c4b8ff" strokeWidth="3.5" strokeLinecap="round" />
            <circle className="mascot__halo" cx="100" cy="22" r="13" fill="#ffb547" />
            <circle cx="100" cy="22" r="7" fill="#ffb547" />

            {/* feet */}
            <rect x="68" y="158" width="24" height="20" rx="10" fill="#4630c0" />
            <rect x="108" y="158" width="24" height="20" rx="10" fill="#4630c0" />

            {/* arms (right one waves on hover) */}
            <rect x="26" y="100" width="22" height="38" rx="11" fill="#7a5ff0" transform="rotate(16 48 104)" />
            <g className="mascot__wave">
              <rect x="152" y="100" width="22" height="38" rx="11" fill="#7a5ff0" transform="rotate(-16 152 104)" />
            </g>

            {/* body + gloss */}
            <rect x="38" y="44" width="124" height="126" rx="46" fill="url(#ping-body)" />
            <path d="M58 70q10-16 34-18" stroke="#fff" strokeOpacity=".5" strokeWidth="5" strokeLinecap="round" fill="none" />

            {/* screen face */}
            <rect x="54" y="72" width="92" height="64" rx="26" fill="url(#ping-screen)" />
            <rect x="54.75" y="72.75" width="90.5" height="62.5" rx="25.25" fill="none" stroke="#fff" strokeOpacity=".12" strokeWidth="1.5" />
            <ellipse cx="70" cy="118" rx="6.5" ry="3.6" fill="#ffb547" opacity=".5" />
            <ellipse cx="130" cy="118" rx="6.5" ry="3.6" fill="#ffb547" opacity=".5" />

            <g ref={lookRef}>
              <g className="mascot__eyes">
                <rect x="77" y="88" width="13" height="20" rx="6.5" fill="#86ecff" />
                <rect x="110" y="88" width="13" height="20" rx="6.5" fill="#86ecff" />
                <circle cx="86" cy="93" r="2.3" fill="#fff" />
                <circle cx="119" cy="93" r="2.3" fill="#fff" />
              </g>
              <g className="mascot__happy" fill="none" stroke="#86ecff" strokeWidth="4" strokeLinecap="round">
                <path d="M77 101q6.5-11 13 0" />
                <path d="M110 101q6.5-11 13 0" />
              </g>
              <path d="M93 117q7 6 14 0" stroke="#86ecff" strokeWidth="3" strokeLinecap="round" fill="none" />
            </g>

            {/* server status LEDs */}
            <circle className="mascot__led" cx="88" cy="152" r="3.2" fill="#2dd4ef" />
            <circle className="mascot__led" cx="100" cy="152" r="3.2" fill="#f4f2ee" />
            <circle className="mascot__led" cx="112" cy="152" r="3.2" fill="#ffb547" />
          </g>
        </svg>
      </button>
      <p className="mascot__cap"><span>Ping · chief morale officer</span><span>poke me</span></p>
    </Tile>
  );
}

export default memo(Mascot);
