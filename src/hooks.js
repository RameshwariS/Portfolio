import { useEffect, useRef, useState } from 'react';

export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const finePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;
export const wait = (ms) => new Promise((r) => setTimeout(r, ms));

// ── Live IST clock ───────────────────────────────────────────────────────
const istFormat = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23',
});

function moodFor(h) {
  if (h < 6) return 'probably asleep';
  if (h < 10) return 'booting up';
  if (h < 18) return 'probably shipping code';
  if (h < 22) return 'probably on LeetCode';
  return 'winding down';
}

function readClock() {
  const p = Object.fromEntries(istFormat.formatToParts(new Date()).map((x) => [x.type, x.value]));
  const h = +p.hour, m = +p.minute, s = +p.second;
  return { hh: p.hour, mm: p.minute, ss: p.second, mood: moodFor(h), progress: (h * 3600 + m * 60 + s) / 86400 };
}

export function useClock() {
  const [time, setTime] = useState(readClock);
  useEffect(() => {
    const id = setInterval(() => setTime(readClock()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

// ── Typed key sequence anywhere on the page (easter eggs) ───────────────
export function useKeySequence(word, onMatch) {
  const cb = useRef(onMatch);
  cb.current = onMatch;
  useEffect(() => {
    let buf = '';
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey || e.key.length !== 1) return;
      if (/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName) || e.target.isContentEditable) return;
      buf = (buf + e.key.toLowerCase()).slice(-word.length);
      if (buf === word) { buf = ''; cb.current(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [word]);
}
