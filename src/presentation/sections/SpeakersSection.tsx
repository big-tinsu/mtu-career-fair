'use client';

import { motion } from 'framer-motion';
import { SpeakerEntity } from '@/domain/types';
import { fadeInUp, staggerContainer, viewportConfig } from '@/lib/animations';
import { SpeakerCard } from '../ui/SpeakerCard';

interface SpeakersSectionProps {
  speakers: SpeakerEntity[];
}

export function SpeakersSection({ speakers }: SpeakersSectionProps) {
  const keynote = speakers.filter((s) => s.type === 'keynote');
  const featured = speakers.filter((s) => s.type === 'speaker');
  const panelists = speakers.filter((s) => s.type === 'panelist');

  return (
    <section id="speakers" className="py-24 md:py-32">
      <div className="layout">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C192FF] mb-4">
            Speakers & Panelists
          </p>
          <h2 className="font-figtree text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            Learn from the{' '}
            <span className="bg-gradient-to-r from-[#6F00FF] to-[#08BFFF] bg-clip-text text-transparent">
              best in the field
            </span>
          </h2>
          <p className="text-white/40 text-base max-w-xl mx-auto">
            Industry veterans and recent alumni sharing unfiltered insights on careers, hiring, and breaking into tech.
          </p>
        </motion.div>

        {keynote.length > 0 && (
          <div className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/25 mb-6">
              Keynote Speaker
            </p>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
            >
              {keynote.map((s) => (
                <SpeakerCard key={s.id} speaker={s} />
              ))}
            </motion.div>
          </div>
        )}

        {featured.length > 0 && (
          <div className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/25 mb-6">
              Featured Speakers
            </p>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
            >
              {featured.map((s) => (
                <SpeakerCard key={s.id} speaker={s} />
              ))}
            </motion.div>
          </div>
        )}

        {panelists.length > 0 && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/25 mb-6">
              Panelists
            </p>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
            >
              {panelists.map((s) => (
                <SpeakerCard key={s.id} speaker={s} />
              ))}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
