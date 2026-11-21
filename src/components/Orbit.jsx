import { Fragment } from 'react';
import { reducedMotion } from '../hooks.js';

// Each orbit carries one satellite, labelled with a core technology.
const ORBITS = [
  { rx: 120, ry: 44, seconds: 18, size: 4, label: 'Go', offset: 0 },
  { rx: 190, ry: 70, seconds: 28, size: 5, label: 'Java', offset: 9 },
  { rx: 262, ry: 97, seconds: 40, size: 3.5, label: 'Redis', offset: 24 },
  { rx: 336, ry: 124, seconds: 56, size: 4.5, label: 'Docker', offset: 35 },
];
const TILT = -18;

const ellipse = (rx, ry) => `M ${-rx},0 a ${rx},${ry} 0 1,0 ${rx * 2},0 a ${rx},${ry} 0 1,0 ${-rx * 2},0`;

// A small planetary system: a glowing body with satellites circling on tilted
// orbits. With reduced motion the satellites are parked at fixed positions.
export default function Orbit() {
  const still = reducedMotion();
  return (
    <svg className="orbit" viewBox="-370 -230 740 460" aria-hidden="true">
      <defs>
        <radialGradient id="planet-fill" cx="34%" cy="30%" r="80%">
          <stop offset="0" className="planet-lit" />
          <stop offset=".55" className="planet-mid" />
          <stop offset="1" className="planet-dark" />
        </radialGradient>
        <radialGradient id="planet-halo">
          <stop offset="0" className="halo-in" />
          <stop offset="1" className="halo-out" />
        </radialGradient>
      </defs>
      <g transform={`rotate(${TILT})`}>
        <circle r="150" fill="url(#planet-halo)" />
        {ORBITS.map((o, i) => {
          const angle = (i * 1.9) + 0.6;
          return (
            <Fragment key={o.label}>
              <path className="orbit-line" d={ellipse(o.rx, o.ry)} />
              <g className="sat" transform={still ? `translate(${o.rx * Math.cos(angle)}, ${o.ry * Math.sin(angle)})` : undefined}>
                <circle r={o.size} />
                <text x={o.size + 9} y="4" transform={`rotate(${-TILT})`}>{o.label}</text>
                {!still && <animateMotion dur={`${o.seconds}s`} begin={`-${o.offset}s`} repeatCount="indefinite" path={ellipse(o.rx, o.ry)} />}
              </g>
            </Fragment>
          );
        })}
        <circle r="44" fill="url(#planet-fill)" />
      </g>
    </svg>
  );
}
