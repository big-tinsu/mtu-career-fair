'use client';

import { motion } from 'framer-motion';
import { EventEntity } from '@/domain/types';
import { REGISTER_URL } from '../ui/RegisterButton';

interface Props {
  event: EventEntity;
}

export function RegistrationCTASection({ event }: Props) {
  return (
    <section
      className="flex items-center justify-center"
      style={{
        backgroundColor: '#F2E4CC',
        padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 4vw, 3rem)',
      }}
    >
      {/* ── Outermost layer: thin dark border ── */}
      <div
        className="w-full"
        style={{
          maxWidth: 1200,
          borderRadius: 52,
          padding: 4,
          backgroundColor: '#1A1A1A',
        }}
      >
        {/* ── Gold ring ── */}
        <div style={{ borderRadius: 49, padding: 20, backgroundColor: '#C9A227' }}>
          {/* ── Dark green ring ── */}
          <div style={{ borderRadius: 34, padding: 14, backgroundColor: '#1A5430' }}>
            {/* ── Inner card: main green ── */}
            <div
              style={{
                borderRadius: 24,
                backgroundColor: '#226C3D',
                padding: 'clamp(3.5rem, 8vw, 6rem) clamp(2rem, 6vw, 4rem)',
                textAlign: 'center',
                minHeight: 440,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 28,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Faint watermark behind text */}
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
                aria-hidden
              >
                <span
                  className="font-instrument italic text-white whitespace-nowrap"
                  style={{ fontSize: 'clamp(6rem, 18vw, 18rem)', opacity: 0.05, lineHeight: 1 }}
                >
                  AURA
                </span>
              </div>

              {/* Eyebrow */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 text-[#C9A227] text-[10px] font-bold uppercase tracking-[0.3em]"
              >
                MTU × SRC · May 11, 2026
              </motion.p>

              {/* Headline */}
              <motion.h2
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 font-instrument italic text-[#F2E4CC] leading-[0.92]"
                style={{ fontSize: 'clamp(2.6rem, 6vw, 5.5rem)', maxWidth: 820 }}
              >
                Get Your Spot at the Career Event of the Year
              </motion.h2>

              {/* Subtext */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 text-[#F2E4CC]/55 leading-relaxed"
                style={{ fontSize: 'clamp(0.9rem, 1.4vw, 1.1rem)', maxWidth: 520 }}
              >
                No stuffy conference rooms, no dull corporate halls — just industry leaders, real recruiters, and a community of driven professionals ready to help you go beyond the degree.
              </motion.p>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10"
              >
                <motion.a
                  href={REGISTER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04, backgroundColor: '#ffffff' }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-[#F2E4CC] text-[#1A5430] font-bold px-10 py-4 rounded-full text-base transition-colors inline-block"
                >
                  Register Free — It&apos;s Today
                </motion.a>
              </motion.div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
