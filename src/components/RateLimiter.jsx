import { useEffect, useRef, useState } from 'react';

const BUCKET_CAP = 8;
const BURST = 12;

// A playable token bucket: each request spends a token, one refills per second.
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
    <div className="limiter">
      <div className="limiter-bar">
        <span>Live demo &middot; token bucket</span>
        <span>cap {BUCKET_CAP} &middot; refill 1/s</span>
      </div>
      <div className="tokens" role="img" aria-label={`${tokens} of ${BUCKET_CAP} tokens available`}>
        {Array.from({ length: BUCKET_CAP }).map((_, i) => (
          <span key={i} className={i < tokens ? 'token full' : 'token'} />
        ))}
      </div>
      <ol className="limiter-log" aria-live="polite">
        {log.length === 0 && <li className="idle">{'// no traffic yet. send a request, then try to get rate-limited.'}</li>}
        {log.map((r) => (
          <li key={r.id} className={r.ok ? 'ok' : 'limited'}>
            <span className="req-id">#{String(r.id).padStart(3, '0')}</span>
            <span>GET /api</span>
            <b>{r.ok ? '200 OK' : '429 Too Many Requests'}</b>
            {r.ok && <span className="req-ms">{r.ms}ms</span>}
          </li>
        ))}
      </ol>
      <div className="limiter-actions">
        <button className="btn small" onClick={() => send(1)}><span>Send request</span></button>
        <button className="btn small ghost" onClick={() => send(BURST)}><span>Burst &times;{BURST}</span></button>
        <span className="limiter-stats">
          <b>{stats.ok}</b> served &middot; <b>{stats.limited}</b> limited
        </span>
      </div>
    </div>
  );
}
