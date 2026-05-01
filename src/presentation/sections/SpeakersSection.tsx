'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { SpeakerEntity } from '@/domain/types';
import { fadeInUp, staggerContainer, viewportConfig } from '@/lib/animations';
import { SpeakerPanel } from '../ui/SpeakerPanel';
import { cn, getInitials } from '@/lib/utils';

interface SpeakersSectionProps {
  speakers: SpeakerEntity[];
}

const avatarGradients = [
  'from-[#1A5430] to-[#226C3D]',
  'from-[#226C3D] to-[#4CAF70]',
  'from-[#8B6914] to-[#C9A227]',
  'from-[#004B87] to-[#0071C5]',
];

function gradientFor(id: string) {
  const idx = id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % avatarGradients.length;
  return avatarGradients[idx];
}

export function SpeakersSection({ speakers }: SpeakersSectionProps) {
  const [selected, setSelected] = useState<SpeakerEntity | null>(null);

  return (
    <>
      <section id="speakers" className="py-24 md:py-32 bg-[#F2E4CC]">
        <div className="layout">
          {/* Header */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="mb-14 md:mb-16"
          >
            <p className="text-[#226C3D] text-xs font-bold uppercase tracking-[0.25em] mb-4">
              The Panelists
            </p>
            <h2 className="font-instrument italic text-4xl md:text-5xl lg:text-6xl text-[#1A1A1A] leading-[1.05] max-w-xl">
              Voices that have<br />walked the path.
            </h2>
          </motion.div>

          {/* Photo grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
          >
            {speakers.map((speaker) => (
              <motion.button
                key={speaker.id}
                variants={fadeInUp}
                onClick={() => setSelected(speaker)}
                className="group text-left focus:outline-none"
              >
                {/* Photo card */}
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-3 md:mb-4 bg-[#E8D9BE]">
                  {speaker.photo ? (
                    <Image
                      src={speaker.photo}
                      alt={speaker.name}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div
                      className={cn(
                        'w-full h-full flex items-center justify-center text-white text-4xl md:text-5xl',
                        `bg-gradient-to-br ${gradientFor(speaker.id)}`,
                      )}
                    >
                      {getInitials(speaker.name)}
                    </div>
                  )}

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-[#1A5430]/0 group-hover:bg-[#1A5430]/30 transition-all duration-300" />

                  {/* "View profile" pill — slides up on hover */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <div className="bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 text-center">
                      <p className="text-[#226C3D] text-xs font-bold tracking-wide">View Profile</p>
                    </div>
                  </div>
                </div>

                {/* Name + title */}
                <div>
                  <p className="font-semibold text-[#1A1A1A] text-sm md:text-base leading-snug group-hover:text-[#226C3D] transition-colors">
                    {speaker.name}
                  </p>
                  <p className="text-[#9C8E7C] text-xs mt-0.5 leading-snug">{speaker.title}</p>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      <SpeakerPanel speaker={selected} onClose={() => setSelected(null)} />
    </>
  );
}
