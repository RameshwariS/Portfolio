import { useEffect, useRef } from 'react';
import { jobs } from '../data.js';
import { Links, Rule, SectionHead } from './ui.jsx';

export default function Experience() {
  const pathRef = useRef(null);

  // The flight path beside the roles fills in as the section scrolls past.
  useEffect(() => {
    const el = pathRef.current;
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const progress = (window.innerHeight * 0.62 - r.top) / r.height;
      el.style.setProperty('--tp', Math.min(Math.max(progress, 0), 1).toFixed(4));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, []);

  return (
    <section id="work" className="section wrap">
      <SectionHead index={2} label="Experience" codename="Flight log" title="Where I've *shipped* and led." />
      <div className="jobs" ref={pathRef}>
        <span className="flight-path" aria-hidden="true"><i /></span>
        {jobs.map((j) => (
          <article className="job reveal" key={j.title}>
            <Rule />
            <div className="job-when">
              <span>{j.period}</span>
              <span>{j.note}</span>
            </div>
            <div className="job-head">
              <h3 className="job-title">{j.title}</h3>
              <p className="job-org">{j.org}</p>
              <p className="job-tags">{j.tags.join(' · ')}</p>
              <Links links={j.links} />
            </div>
            <ul className="points">
              {j.bullets.map((b) => <li key={b}>{b}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
