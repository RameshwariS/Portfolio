// Stand-in visual for a project that has no screenshot yet. It is labelled as
// a placeholder on purpose; set `image` on the project in data.js to replace it.
export default function Placeholder({ label }) {
  return (
    <div className="ph" role="img" aria-label={`Placeholder visual for ${label}`}>
      <span className="ph-tag tl">{label}</span>
      <span className="ph-tag tr">16 : 10</span>
      <span className="ph-mid">Screenshot placeholder</span>
      <span className="ph-tag bl">Set `image` in data.js</span>
    </div>
  );
}
