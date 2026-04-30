'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { SpeakerEntity } from '@/domain/types';
import { fadeInUp, staggerContainer, viewportConfig } from '@/lib/animations';
import { SpeakerCard } from '../ui/SpeakerCard';
import { WordReveal } from '../ui/WordReveal';

interface SpeakersSectionProps {
  speakers: SpeakerEntity[];
}

export function SpeakersSection({ speakers }: SpeakersSectionProps) {
  return (
    <section id="speakers" className="py-24 md:py-32 bg-white">
      <div className="layout">
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mb-16"
        >
          <p className="text-[#226C3D] text-xs font-bold uppercase tracking-[0.2em] mb-4">
            The Panelists
          </p>
          <h2 className="font-manrope text-4xl md:text-5xl lg:text-6xl font-black text-[#1A1A1A] leading-[1.02] tracking-tight max-w-2xl">
            <WordReveal text="Voices that have walked the path." />
          </h2>
        </motion.div>

        {/* Panel photo — full bleed on one side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-3xl overflow-hidden aspect-[4/5] lg:aspect-auto lg:min-h-[500px]"
          >
            <Image
              src="/images/imagethree.jpeg"
              alt="AURA Career Fair Panelists"
              fill
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">Featured Panelists</p>
              <p className="text-white font-manrope font-black text-xl leading-tight">Beyond the Degree 2026</p>
            </div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="flex flex-col justify-between gap-4"
          >
            {speakers.slice(0, 4).map((speaker) => (
              <motion.div
                key={speaker.id}
                variants={fadeInUp}
                whileHover={{ x: 4, transition: { duration: 0.2 } }}
                className="flex items-center gap-4 bg-[#FAF6F0] hover:bg-[#F2E4CC] border border-[#E8D9BE] rounded-2xl p-4 transition-colors duration-200 group cursor-default"
              >
                <div className="w-12 h-12 rounded-xl bg-[#226C3D] flex items-center justify-center text-white font-bold font-manrope text-sm flex-shrink-0">
                  {speaker.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-manrope font-bold text-[#1A1A1A] text-sm leading-tight truncate">{speaker.name}</p>
                  <p className="text-[#5C5046] text-xs truncate">{speaker.title}</p>
                  <p className="text-[#226C3D] text-xs font-semibold truncate">{speaker.company}</p>
                </div>
                <div className="w-2 h-2 rounded-full bg-[#226C3D] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Detailed cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {speakers.map((s) => (
            <SpeakerCard key={s.id} speaker={s} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
