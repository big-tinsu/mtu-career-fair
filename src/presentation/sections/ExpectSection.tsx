'use client';

import { motion } from 'framer-motion';
import { viewportConfig } from '@/lib/animations';

const experiences = [
  { label: 'Expert Panel Talks',      bg: '#226C3D' },
  { label: 'Career Networking',        bg: '#1A5430' },
  { label: 'CV Review Sessions',       bg: '#8B6914' },
  { label: 'Recruiter Direct Access',  bg: '#4A7C3F' },
  { label: 'Graduate Opportunities',   bg: '#C9A227' },
];

export function ExpectSection() {
  return (
    <section className="flex" style={{ minHeight: '75vh' }}>

      {/* ── Left dark column with rotated Instrument Serif label ── */}
      <div
        className="bg-[#1A1A1A] flex items-center justify-center flex-shrink-0"
        style={{ width: 'clamp(100px, 18vw, 220px)' }}
      >
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportConfig}
          transition={{ duration: 0.8 }}
          className="font-instrument italic text-white text-center leading-tight select-none"
          style={{
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            fontSize: 'clamp(1.8rem, 3.5vw, 3.2rem)',
          }}
        >
          What to<br />Experience
        </motion.p>
      </div>

      {/* ── Right side — stacked coloured rows ──────────────────── */}
      <div className="flex-1 flex flex-col">
        {experiences.map(({ label, bg }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.55, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 flex items-center justify-center relative overflow-hidden"
            style={{
              backgroundColor: bg,
              borderBottom: i < experiences.length - 1 ? '1px solid rgba(0,0,0,0.15)' : 'none',
            }}
          >
            {/* Left-to-right depth gradient */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.18) 0%, transparent 55%)' }}
            />
            <p
              className="font-instrument italic text-white text-center relative z-10 px-8 leading-none"
              style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)' }}
            >
              {label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
