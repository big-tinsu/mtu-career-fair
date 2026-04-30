'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import { EventEntity } from '@/domain/types';
import { fadeInUp, scaleIn, viewportConfig } from '@/lib/animations';
import { formatDate, getSpotsRemaining } from '@/lib/utils';
import { Button } from '../ui/Button';

interface RegistrationCTASectionProps {
  event: EventEntity;
}

export function RegistrationCTASection({ event }: RegistrationCTASectionProps) {
  const spots = getSpotsRemaining(event.capacity, event.registeredCount);

  return (
    <section id="register" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(111,0,255,0.12)] via-transparent to-[rgba(8,191,255,0.08)]" />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-[#6F00FF] blur-[140px]"
        />
      </div>

      <div className="layout relative z-10">
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="max-w-2xl mx-auto text-center"
        >
          <motion.p variants={fadeInUp} className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C192FF] mb-4">
            Don&apos;t Miss Out
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="font-figtree text-4xl md:text-5xl font-bold text-white leading-tight mb-4"
          >
            Secure your spot at
            <br />
            <span className="bg-gradient-to-r from-[#6F00FF] via-[#C192FF] to-[#08BFFF] bg-clip-text text-transparent">
              {event.title}
            </span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-white/50 text-base mb-8">
            {formatDate(event.date)} · {event.time} – {event.endTime} · {event.location}
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-3 bg-[rgba(255,165,0,0.1)] border border-[rgba(255,165,0,0.2)] rounded-full px-4 py-2 text-sm text-[#FCD34D] mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[#FCD34D] animate-pulse" />
            Only <strong>{spots}</strong> spots remaining
          </motion.div>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href={`/events/${event.slug}/register`}>
              <Button size="lg" rightIcon={<FiArrowRight size={16} />} className="w-full sm:w-auto">
                Apply to Attend — Free
              </Button>
            </Link>
          </motion.div>

          <motion.p variants={fadeInUp} className="text-white/25 text-xs mt-6">
            Registration requires approval. Confirmed attendees will receive an email with details.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
