import { jobs } from '../data.js';
import { Links, Rule, SectionHead } from './ui.jsx';

export default function Experience() {
  return (
    <section id="work" className="section wrap">
      <SectionHead index={2} label="Experience" title="Where I've *shipped* and led." />
      <div className="jobs">
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
