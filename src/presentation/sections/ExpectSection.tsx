'use client';

import { motion } from 'framer-motion';
import { viewportConfig } from '@/lib/animations';

const experiences = [
  { label: 'Expert Panel Talks',     bg: '#216C3D', light: false },
  { label: 'Career Networking',       bg: '#F5EFE3', light: true  },
  { label: 'CV Review Sessions',      bg: '#216C3D', light: false },
  { label: 'Recruiter Direct Access', bg: '#F5EFE3', light: true  },
  { label: 'Graduate Opportunities',  bg: '#216C3D', light: false },
];

const CURVE_H = 'clamp(28px, 3.5vw, 48px)';
const CURVE_R = 'clamp(20px, 2.5vw, 36px)';

export function ExpectSection() {
  return (
    <section
      className="flex relative"
      style={{ minHeight: '75vh'}}
    >
      {/* Top inverted curve — beige arch pointing down into the section */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none z-20"
        style={{
          height: CURVE_H,
          backgroundColor: '#F2E4CC',
          borderRadius: `0 0 ${CURVE_R} ${CURVE_R}`,
        }}
      />

      {/* ── Left dark column ── */}
      <div
        className="bg-[#1A1A1A] flex items-center justify-center flex-shrink-0"
        style={{ width: 'clamp(100px, 18vw, 220px)' }}
      >
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportConfig}
          transition={{ duration: 0.8 }}
          className="text-white text-center leading-tight select-none"
          style={{
            fontFamily: '"Instrument Serif", Georgia, serif',
            fontStyle: 'italic',
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            fontSize: 'clamp(1.8rem, 3.5vw, 3.2rem)',
          }}
        >
          What to<br />Experience
        </motion.p>
      </div>

      {/* ── Right side — stacked rows ── */}
      <div className="flex-1 flex flex-col">
        {experiences.map(({ label, bg, light }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.55, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 flex items-center justify-center relative overflow-hidden"
            style={{
              backgroundColor: bg,
              borderBottom: i < experiences.length - 1
                ? `1px solid ${light ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.06)'}`
                : 'none',
              cursor: 'pointer',
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: light
                  ? 'linear-gradient(to right, rgba(0,0,0,0.06) 0%, transparent 55%)'
                  : 'linear-gradient(to right, rgba(0,0,0,0.25) 0%, transparent 55%)',
              }}
            />
            <p
              className="text-center relative z-10 px-8 leading-none"
              style={{
                fontFamily: '"Instrument Serif", Georgia, serif',
                fontStyle: 'italic',
                fontSize: 'clamp(2rem, 5vw, 4.5rem)',
                color: light ? '#1A1A1A' : '#ffffff',
              }}
            >
              {label}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Bottom inverted curve — beige arch pointing up into the section */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none z-20"
        style={{
          height: CURVE_H,
          backgroundColor: '#F2E4CC',
          borderRadius: `${CURVE_R} ${CURVE_R} 0 0`,
        }}
      />
    </section>
  );
}
