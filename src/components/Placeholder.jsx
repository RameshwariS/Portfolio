import { Flower, Sparkle } from './ui.jsx';

// Stand-in visual for a project that has no screenshot yet. It is labelled as
// a placeholder on purpose; set `image` on the project in data.js to replace it.
export default function Placeholder({ label }) {
  return (
    <div className="ph" role="img" aria-label={`Placeholder visual for ${label}`}>
      <Sparkle className="ph-sparkle a" />
      <Sparkle className="ph-sparkle b" />
      <Flower className="ph-flower" />
      <span className="ph-note">screenshot coming soon</span>
      <span className="ph-tag">placeholder &middot; set image in data.js</span>
    </div>
  );
}
