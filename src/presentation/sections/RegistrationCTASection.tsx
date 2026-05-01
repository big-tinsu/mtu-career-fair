'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import { EventEntity } from '@/domain/types';
import { fadeInUp, viewportConfig } from '@/lib/animations';
import { formatDate, getSpotsRemaining } from '@/lib/utils';
import { WordReveal } from '../ui/WordReveal';

interface RegistrationCTASectionProps {
  event: EventEntity;
}

export function RegistrationCTASection({ event }: RegistrationCTASectionProps) {
  const spots = getSpotsRemaining(event.capacity, event.registeredCount);

  return (
    <section id="register" className="bg-[#226C3D] relative overflow-hidden">
      {/* Large ghost watermark */}
      <div
        className="absolute inset-0 flex items-center overflow-hidden pointer-events-none select-none"
        aria-hidden
      >
        <p
          className="font-instrument italic text-white/[0.04] whitespace-nowrap leading-none"
          style={{ fontSize: 'clamp(8rem, 22vw, 22rem)' }}
        >
          MAY 11 · 2026
        </p>
      </div>

      {/* Dot grid texture */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Top rule */}
      <motion.div
        initial={{ scaleX: 0, originX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={viewportConfig}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-0 right-0 h-px bg-white/15"
      />

      <div className="relative z-10 px-6 md:px-12 lg:px-20 xl:px-28 pt-24 md:pt-36 pb-24 md:pb-40">
        {/* Overline */}
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="text-white/30 text-xs font-bold uppercase tracking-[0.28em] mb-10"
        >
          Don&apos;t Miss Out
        </motion.p>

        {/* Massive heading */}
        <h2
          className="font-instrument italic text-white leading-[0.88] mb-14 md:mb-16"
          style={{ fontSize: 'clamp(3rem, 9vw, 9.5rem)' }}
        >
          <WordReveal text="Your career journey" delay={0.05} staggerDelay={0.06} />
          <br />
          <span className="text-[#F2E4CC]">
            <WordReveal text="starts May 11." delay={0.4} staggerDelay={0.07} />
          </span>
        </h2>

        {/* CTA row */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-8 md:gap-12"
        >
          <Link href={`/events/${event.slug}/register`}>
            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: '#fff' }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 bg-[#F2E4CC] text-[#1A5430] font-bold text-sm px-8 py-4 rounded-full transition-colors"
            >
              Register Free Now
              <FiArrowRight size={16} />
            </motion.button>
          </Link>

          <div className="flex flex-wrap gap-8">
            <div>
              <p className="text-white/35 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">When</p>
              <p className="text-white/70 text-sm font-medium">{formatDate(event.date)} · {event.time} – {event.endTime}</p>
            </div>
            <div>
              <p className="text-white/35 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">Where</p>
              <p className="text-white/70 text-sm font-medium">{event.location}</p>
            </div>
            <div>
              <p className="text-white/35 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">Spots</p>
              <p className="text-white text-sm font-bold">{spots} remaining</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
