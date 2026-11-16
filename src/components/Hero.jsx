import { useEffect, useState } from 'react';
import { heroFacts, numbers, profile, rotatingWords } from '../data.js';
import { Arrow, Flower, Heart, Sparkle, Squiggle, Window } from './ui.jsx';

const BADGE_TEXT = `${profile.status} ✦ ${profile.status} ✦ `;

export default function Hero({ onCopyEmail }) {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setWordIndex((i) => (i + 1) % rotatingWords.length), 2200);
    return () => clearInterval(id);
  }, []);

  const leetcode = numbers.find((n) => n.label.includes('LeetCode'));
  const coverage = numbers.find((n) => n.label.includes('coverage'));

  return (
    <section id="home" className="hero wrap">
      <span className="blob b1" aria-hidden="true" />
      <span className="blob b2" aria-hidden="true" />
      <span className="blob b3" aria-hidden="true" />

      <div className="hero-copy">
        <p className="hello rise" style={{ '--d': '0ms' }}>hi there, I&apos;m <Sparkle /></p>
        <h1 className="hero-name">
          <span className="first rise" style={{ '--d': '120ms' }}>{profile.first}</span>
          <span className="last rise" style={{ '--d': '240ms' }}>
            {profile.last}
            <Squiggle />
          </span>
        </h1>
        <p className="hero-role rise" style={{ '--d': '420ms' }}>
          a software engineer who builds{' '}
          <span className="rotator"><span key={wordIndex} className="rot-word">{rotatingWords[wordIndex]}</span></span>{' '}
          that hold up in production.
        </p>
        <div className="hero-cta rise" style={{ '--d': '540ms' }}>
          <a href="#projects" className="btn pink" data-cursor="peek">See my work <Arrow /></a>
          <button className="btn" data-cursor="copy" onClick={onCopyEmail}>Copy email</button>
        </div>
      </div>

      <div className="collage rise" style={{ '--d': '380ms' }}>
        <Window title="about_me.txt" className="facts-win">
          <ul className="facts">
            {heroFacts.map((f) => (
              <li key={f.k}><Heart /><span className="fact-k">{f.k}</span><span className="fact-v">{f.v}</span></li>
            ))}
          </ul>
        </Window>

        <a href="#contact" className="spin" data-magnetic="0.3" data-cursor="say hi" aria-label={`${profile.status}. Go to contact`}>
          <svg viewBox="0 0 200 200" aria-hidden="true">
            <defs><path id="spin-path" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" /></defs>
            <text><textPath href="#spin-path" textLength="456">{BADGE_TEXT}</textPath></text>
          </svg>
          <Heart />
        </a>
        <span className="sticker st-go" aria-hidden="true">{'ʕ◔ϖ◔ʔ'} Go</span>
        {leetcode && <span className="sticker st-lc">{leetcode.value}{leetcode.suffix} LeetCode <Sparkle /></span>}
        {coverage && <span className="sticker st-cov">{coverage.value}{coverage.suffix} test coverage</span>}
        <Flower className="float f1" />
        <Sparkle className="float f2" />
        <Heart className="float f3" />
      </div>
    </section>
  );
}
