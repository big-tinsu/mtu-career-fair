'use client';

import { motion } from 'framer-motion';
import { AgendaItem } from '@/domain/types';
import { fadeInUp, viewportConfig } from '@/lib/animations';
import { AgendaTimeline } from '../ui/AgendaTimeline';

interface AgendaSectionProps {
  items: AgendaItem[];
}

export function AgendaSection({ items }: AgendaSectionProps) {
  return (
    <section id="agenda" className="py-24 md:py-32">
      <div className="layout">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C192FF] mb-4">
            Program Schedule
          </p>
          <h2 className="font-figtree text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            Full day of{' '}
            <span className="bg-gradient-to-r from-[#6F00FF] to-[#08BFFF] bg-clip-text text-transparent">
              opportunity
            </span>
          </h2>
          <p className="text-white/40 text-base max-w-xl mx-auto">
            A packed agenda designed to maximize your career prospects — from keynotes to one-on-one resume reviews.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <AgendaTimeline items={items} />
        </div>
      </div>
    </section>
  );
}
