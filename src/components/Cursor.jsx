// Dot + lagging ring. Positioned by motion.js on fine pointers only.
export default function Cursor() {
  return (
    <div className="cursor" aria-hidden="true">
      <div className="cursor__dot"><i /></div>
      <div className="cursor__ring"><i /><span className="cursor__label">View</span></div>
    </div>
  );
}
