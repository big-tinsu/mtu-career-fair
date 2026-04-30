'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import { EventEntity } from '@/domain/types';
import { fadeInUp, viewportConfig } from '@/lib/animations';
import { formatDate, getSpotsRemaining } from '@/lib/utils';
import { Button } from '../ui/Button';
import { WordReveal } from '../ui/WordReveal';

interface RegistrationCTASectionProps {
  event: EventEntity;
}

export function RegistrationCTASection({ event }: RegistrationCTASectionProps) {
  const spots = getSpotsRemaining(event.capacity, event.registeredCount);

  return (
    <section id="register" className="py-24 md:py-36 bg-[#226C3D] relative overflow-hidden">
      {/* Subtle texture */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      <motion.div
        initial={{ scaleX: 0, originX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={viewportConfig}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-0 right-0 h-[2px] bg-white/20"
      />

      <div className="layout relative z-10">
        <div className="max-w-3xl">
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="text-white/50 text-xs font-bold uppercase tracking-[0.2em] mb-6"
          >
            Don&apos;t Miss Out
          </motion.p>

          <h2 className="font-manrope text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.97] tracking-tight mb-6">
            <WordReveal text="Your career journey starts May 11." delay={0.1} staggerDelay={0.08} />
          </h2>

          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="text-white/60 text-lg mb-10 max-w-xl"
          >
            {formatDate(event.date)} · {event.time} – {event.endTime} · {event.location}, Mountain Top University
          </motion.p>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
          >
            <Link href={`/events/${event.slug}/register`}>
              <Button variant="white" size="xl" rightIcon={<FiArrowRight size={18} />}>
                Register Free Now
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#F2E4CC] animate-pulse" />
              <span className="text-white/50 text-sm">
                Only <strong className="text-white">{spots}</strong> spots remaining
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
