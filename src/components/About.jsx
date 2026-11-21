import { memo } from 'react';
import { about, profile, status } from '../data.js';
import { useClock } from '../hooks.js';
import { Icon, Meta, Tile } from './ui.jsx';

export const StatusTile = memo(function StatusTile() {
  return (
    <Tile className="t-status">
      <Meta path="/status" status="live" />
      <div className="status">
        <span className="pulse" aria-hidden="true" />
        <p className="status__title">{status.title}</p>
        <p className="status__sub">{status.sub}</p>
      </div>
    </Tile>
  );
});

export const AboutTile = memo(function AboutTile() {
  return (
    <Tile className="t-about">
      <Meta path="/about" status="200" />
      <p className="about__lead">{about.lead}<span>{about.highlight}</span></p>
      <p className="about__sub">{about.sub}</p>
    </Tile>
  );
});

// Re-renders every second on its own; nothing else on the page does.
export function ClockTile() {
  const { hh, mm, ss, mood, progress } = useClock();
  return (
    <Tile className="t-clock" aria-label={`Local time in India: ${hh}:${mm} IST, ${mood}`}>
      <Meta path="/local-time" status="IST" />
      <p className="clock__place">{profile.location}</p>
      <p className="clock__time" aria-hidden="true">
        <span>{hh}</span><span className="colon">:</span><span>{mm}</span><span className="sec">{ss}</span>
      </p>
      <p className="clock__note" aria-hidden="true">{mood} · UTC+5:30</p>
      <div className="dayline" aria-hidden="true"><i style={{ '--p': progress.toFixed(4) }} /></div>
    </Tile>
  );
}

export const ResumeTile = memo(function ResumeTile() {
  return (
    <Tile as="a" className="t-resume" href={profile.resume} download data-cursor="view" data-cursor-label="Get">
      <Meta as="span" path="/resume.pdf" status="200" />
      <span className="resume__icon" aria-hidden="true"><Icon name="download" /></span>
      <span className="resume__title">Résumé</span>
      <span className="resume__sub">PDF · 2 pages · download</span>
    </Tile>
  );
});
