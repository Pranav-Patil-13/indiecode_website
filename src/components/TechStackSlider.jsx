import React from 'react';
import { TechIcons } from './TechIcons';
import './TechStackSlider.css';

export const TECH_ITEMS = [
  { name: 'Next.js', Icon: TechIcons.Nextjs },
  { name: 'TypeScript', Icon: TechIcons.TypeScript },
  { name: 'Node.js', Icon: TechIcons.Nodejs },
  { name: 'Supabase', Icon: TechIcons.Supabase },
  { name: 'PostgreSQL', Icon: TechIcons.PostgreSQL },
  { name: 'Redis', Icon: TechIcons.Redis },
  { name: 'Docker', Icon: TechIcons.Docker },
  { name: 'Stripe', Icon: TechIcons.Stripe },
  { name: 'Tailwind', Icon: TechIcons.Tailwind },
  { name: 'AWS', Icon: TechIcons.AWS },
  { name: 'Vercel', Icon: TechIcons.Vercel },
  { name: 'Firebase', Icon: TechIcons.Firebase },
  { name: 'HLS.js', Icon: TechIcons.HLSjs },
  { name: 'GraphQL', Icon: TechIcons.GraphQL },
];

/**
 * TechStackSlider Component
 * Preserved for future placement in 'Services', 'How We Build', or 'Technology' sections.
 */
export default function TechStackSlider({ label = 'CORE STACK' }) {
  return (
    <div className="tech-stack-slider-wrapper" aria-label="Technologies We Build With">
      {label && <div className="tech-stack-label">{label}</div>}
      <div className="tech-ticker-mask">
        <div className="tech-ticker-track">
          {/* First set */}
          {TECH_ITEMS.map((item, index) => (
            <span key={`tech-1-${index}`} className="tech-badge">
              <item.Icon />
              <span className="tech-name">{item.name}</span>
            </span>
          ))}

          {/* Duplicate set for seamless infinite loop */}
          {TECH_ITEMS.map((item, index) => (
            <span key={`tech-2-${index}`} className="tech-badge">
              <item.Icon />
              <span className="tech-name">{item.name}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
