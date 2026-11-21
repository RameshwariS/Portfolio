// Intro curtain: initials rise, counter runs 000 → 100, then motion.js wipes it away.
export default function Loader() {
  return (
    <div className="loader" aria-hidden="true">
      <div className="loader__mark"><span>R</span><span>S</span></div>
      <div className="loader__bar"><i /></div>
      <div className="loader__row">
        <span>GET / <span className="loader__status">→ connecting…</span></span>
        <span className="loader__num">000</span>
      </div>
    </div>
  );
}
