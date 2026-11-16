import { jobs } from '../data.js';
import { Chips, Flower, Links, SectionHead } from './ui.jsx';

const NODE_COLORS = ['pink', 'lav', 'mint'];

export default function Experience() {
  return (
    <section id="work" className="section wrap">
      <SectionHead index={2} kicker="experience">Where I&apos;ve <em>shipped</em> and led.</SectionHead>
      <ol className="timeline">
        {jobs.map((j, i) => (
          <li className={`tl c-${NODE_COLORS[i % 3]} reveal`} key={j.title}>
            <Flower className="tl-node" />
            <article className="card tl-card">
              <div className="tl-head">
                <span className="pill">{j.period}</span>
                <h3 className="tl-title">{j.title}</h3>
                <p className="tl-org">{j.org}</p>
                <Chips items={j.tags} />
                <Links links={j.links} />
              </div>
              <ul className="bullets">
                {j.bullets.map((b) => <li key={b}>{b}</li>)}
              </ul>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}
