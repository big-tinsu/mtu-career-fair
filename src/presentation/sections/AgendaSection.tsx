'use client';

import { motion } from 'framer-motion';
import { AgendaItem } from '@/domain/types';
import { fadeInUp, viewportConfig } from '@/lib/animations';
import { AgendaTimeline } from '../ui/AgendaTimeline';
import { WordReveal } from '../ui/WordReveal';

interface AgendaSectionProps {
  items: AgendaItem[];
}

export function AgendaSection({ items }: AgendaSectionProps) {
  return (
    <section id="agenda" className="py-24 md:py-32 bg-white">
      <div className="layout">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mb-16"
        >
          <p className="text-[#226C3D] text-xs font-bold uppercase tracking-[0.2em] mb-4">
            Programme Schedule
          </p>
          <h2 className="font-manrope text-4xl md:text-5xl lg:text-6xl font-black text-[#1A1A1A] leading-[1.02] tracking-tight max-w-2xl">
            <WordReveal text="A full day built for your future." />
          </h2>
        </motion.div>

        <div className="max-w-3xl">
          <AgendaTimeline items={items} />
        </div>
      </div>
    </section>
  );
}
