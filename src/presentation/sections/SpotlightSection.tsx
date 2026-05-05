'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { SpeakerEntity } from '@/domain/types';
import { viewportConfig } from '@/lib/animations';
import { getInitials } from '@/lib/utils';
import { SpeakerPanel } from '../ui/SpeakerPanel';

interface SpotlightSectionProps {
  speaker: SpeakerEntity;
}

export function SpotlightSection({ speaker }: SpotlightSectionProps) {
  const [selected, setSelected] = useState<SpeakerEntity | null>(null);

  return (
    <>
      <section className="bg-[#F2E4CC] px-6 md:px-12 lg:px-20 pb-24">
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>

          {/* Header */}
          <motion.div
            className="flex items-center gap-4 mb-12"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="h-px flex-1 bg-[#1A1A1A]/10" />
            <p className="text-[#226C3D] text-[10px] font-bold uppercase tracking-[0.3em] flex-shrink-0">
              Spotlight Speaker
            </p>
            <div className="h-px flex-1 bg-[#1A1A1A]/10" />
          </motion.div>

          {/* Card */}
          <motion.div
            className="flex flex-col lg:flex-row-reverse gap-10 lg:gap-16 items-center"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Photo — right side on desktop */}
            <div className="flex-shrink-0">
              <div className="relative" style={{ width: 240, height: 300 }}>
                <div className="absolute -top-2 -right-2 w-5 h-5 border-t-2 border-r-2 border-[#226C3D]/40" />
                <div className="absolute -bottom-2 -left-2 w-5 h-5 border-b-2 border-l-2 border-[#226C3D]/40" />
                <div className="relative w-full h-full overflow-hidden border border-[#1A1A1A]/12">
                  {speaker.photo ? (
                    <Image
                      src={speaker.photo}
                      alt={speaker.name}
                      fill
                      className="object-cover object-top"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#C9A227] flex items-center justify-center text-white font-bold text-5xl">
                      {getInitials(speaker.name)}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Content — left side on desktop */}
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#226C3D]" />
                <span className="text-[#226C3D] text-[11px] font-bold uppercase tracking-[0.25em]">
                  Rising Voice
                </span>
              </div>

              <h2
                className="font-instrument italic text-[#1A1A1A] leading-[0.9] mb-4"
                style={{ fontSize: 'clamp(2rem, 4.5vw, 3.4rem)' }}
              >
                {speaker.name}
              </h2>

              <p className="text-[#5C5046] text-sm font-medium mb-6">
                {speaker.title}
                <span className="text-[#1A1A1A]/25 mx-2">·</span>
                {speaker.company}
              </p>

              <div className="flex flex-wrap gap-2 mb-7">
                {speaker.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 bg-[#226C3D]/8 border border-[#226C3D]/20 text-[#226C3D] rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Clamped bio */}
              <p
                className="text-[#5C5046] text-sm leading-relaxed max-w-xl mb-2"
                style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                } as React.CSSProperties}
              >
                {speaker.bio}
              </p>

              <button
                onClick={() => setSelected(speaker)}
                className="text-[#226C3D] text-xs font-semibold hover:text-[#1A5430] transition-colors"
              >
                See more →
              </button>
            </div>
          </motion.div>

        </div>
      </section>

      <SpeakerPanel speaker={selected} onClose={() => setSelected(null)} />
    </>
  );
}
