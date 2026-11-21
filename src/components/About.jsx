import { useEffect, useRef } from 'react';
import { aboutText, education, heroFacts, numbers } from '../data.js';
import { CountUp, Rule, SectionHead } from './ui.jsx';

export default function About() {
  const textRef = useRef(null);

  // Words of the bio light up as the paragraph moves through the viewport.
  useEffect(() => {
    const el = textRef.current;
    const words = [...el.querySelectorAll('span')];
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(Math.max((vh * 0.85 - r.top) / (r.height + vh * 0.3), 0), 1);
      const lit = Math.round(p * words.length);
      words.forEach((w, i) => w.classList.toggle('lit', i < lit));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="about" className="section wrap">
      <SectionHead index={1} label="About" codename="Origin" title="I like the *unglamorous* parts of software." />

      <div className="split">
        <dl className="facts reveal">
          {heroFacts.map((f) => (
            <div key={f.k}><dt>{f.k}</dt><dd>{f.v}</dd></div>
          ))}
        </dl>
        <p className="about-text" ref={textRef}>
          {aboutText.split(' ').map((w, i) => <span key={i}>{w} </span>)}
        </p>
      </div>

      <dl className="stats">
        {numbers.map((n, i) => (
          <div className="stat reveal" style={{ transitionDelay: `${i * 90}ms` }} key={n.label}>
            <Rule />
            <dd><CountUp value={n.value} decimals={n.decimals} suffix={n.suffix} /></dd>
            <dt>{n.label}</dt>
          </div>
        ))}
      </dl>

      <div className="split edu">
        <h3 className="label"><span>(i)</span>Education</h3>
        <div>
          <div className="row edu-row reveal">
            <Rule />
            <span>{education.period}</span>
            <span><b>{education.degree}</b>{education.college}</span>
            <span>CGPA {education.cgpa}</span>
          </div>
          {education.secondary.map((s) => (
            <div className="row edu-row reveal" key={s.name}>
              <Rule />
              <span>{s.year}</span>
              <span><b>{s.name}</b></span>
              <span>{s.details}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
