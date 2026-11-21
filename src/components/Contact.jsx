import { memo, useState } from 'react';
import { profile, socials } from '../data.js';
import { Icon, Meta, SecHead, Tile } from './ui.jsx';

export const Contact = memo(function Contact({ onCopy }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <section id="contact" className="section wrap" aria-labelledby="contact-title">
      <SecHead idx="05" id="contact-title" title="Contact" note="POST /contact → 202" />
      <div className="bento bento--contact">
        <Tile className="t-contact">
          <Meta method="POST" path="/contact" status="202 Accepted" />
          <h3 className="contact__title">Got a system that needs to <span>hold up under load?</span></h3>
          <div className="contact__row">
            <a className="contact__email" href={`mailto:${profile.email}`} data-magnetic="0.15">
              {profile.email} <Icon name="arrow" />
            </a>
            <button className="btn" type="button" onClick={copy} data-magnetic>{copied ? 'Copied ✓' : 'Copy email'}</button>
          </div>
        </Tile>
        <Tile className="t-social">
          <Meta path="/elsewhere" status={String(socials.length)} />
          <ul className="socials">
            {socials.map((s) => (
              <li key={s.label}>
                <a className="social" href={s.href} target="_blank" rel="noopener noreferrer" data-magnetic="0.2">
                  <Icon name={s.icon} />{s.label}
                </a>
              </li>
            ))}
          </ul>
        </Tile>
      </div>
    </section>
  );
});

export function Footer() {
  return (
    <footer className="footer wrap">
      <span>© {new Date().getFullYear()} {profile.first} {profile.last} · built by hand, one endpoint at a time</span>
      <span>psst — type <kbd>h</kbd><kbd>i</kbd><kbd>r</kbd><kbd>e</kbd> anywhere</span>
    </footer>
  );
}
