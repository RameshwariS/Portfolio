import { memo } from 'react';
import { skills } from '../data.js';
import Marquee from './Marquee.jsx';
import { Meta, SecHead, Tile } from './ui.jsx';

function Skills() {
  return (
    <section id="stack" className="section wrap" aria-labelledby="stack-title">
      <SecHead idx="04" id="stack-title" title="Stack" note="GET /stack · hover to pause" />
      <div className="bento bento--stack">
        <Tile className="t-skills">
          <Meta path="/stack" status={`${skills.core.length + skills.tools.length} tools`} />
          <Marquee items={skills.core} label="Core languages and backend" duration={52} itemClass={(i) => (i % 2 ? 'word o' : 'word')} />
          <Marquee items={skills.tools} label="Data, frontend, testing, DevOps and AI tools" duration={60} itemClass="pill" reverse />
          <p className="skills__foot"><strong>Grounded in:</strong> {skills.grounding}</p>
        </Tile>
      </div>
    </section>
  );
}

export default memo(Skills);
