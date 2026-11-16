import { useEffect, useRef, useState } from 'react';

const BUCKET_CAP = 8;
const BURST = 12;

// A playable token bucket, drawn as a cookie jar: each request eats a cookie
// (token) and one bakes back every second.
export default function RateLimiter() {
  const [tokens, setTokens] = useState(BUCKET_CAP);
  const [log, setLog] = useState([]);
  const [stats, setStats] = useState({ ok: 0, limited: 0 });
  const bucket = useRef(BUCKET_CAP);
  const seq = useRef(0);

  useEffect(() => {
    const id = setInterval(() => {
      bucket.current = Math.min(BUCKET_CAP, bucket.current + 1);
      setTokens(bucket.current);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const send = (count) => {
    const entries = [];
    let ok = 0;
    for (let i = 0; i < count; i += 1) {
      const allowed = bucket.current > 0;
      if (allowed) { bucket.current -= 1; ok += 1; }
      seq.current += 1;
      entries.push({ id: seq.current, ok: allowed, ms: 2 + Math.floor(Math.random() * 9) });
    }
    setTokens(bucket.current);
    setLog((l) => [...l, ...entries].slice(-5));
    setStats((s) => ({ ok: s.ok + ok, limited: s.limited + count - ok }));
  };

  return (
    <div className="jar">
      <p className="jar-note">a token bucket, but make it cookies</p>
      <div className="cookies" role="img" aria-label={`${tokens} of ${BUCKET_CAP} tokens available`}>
        {Array.from({ length: BUCKET_CAP }).map((_, i) => (
          <span key={i} className={i < tokens ? 'cookie full' : 'cookie'} />
        ))}
      </div>
      <ol className="jar-log" aria-live="polite">
        {log.length === 0 && <li className="idle">{'// each request eats a cookie, one bakes back every second. try to empty the jar!'}</li>}
        {log.map((r) => (
          <li key={r.id} className={r.ok ? 'ok' : 'limited'}>
            <span className="req-id">#{String(r.id).padStart(3, '0')}</span>
            <span>GET /cookie</span>
            <b>{r.ok ? '200 OK' : '429 Too Many Requests'}</b>
            {r.ok && <span className="req-ms">{r.ms}ms</span>}
          </li>
        ))}
      </ol>
      <div className="jar-actions">
        <button className="btn pink small" data-cursor="yum" onClick={() => send(1)}>Send request</button>
        <button className="btn small" data-cursor="chaos" onClick={() => send(BURST)}>Burst &times;{BURST}</button>
        <span className="jar-stats">
          <b>{stats.ok}</b> served &middot; <b className="limited">{stats.limited}</b> limited
        </span>
      </div>
    </div>
  );
}
