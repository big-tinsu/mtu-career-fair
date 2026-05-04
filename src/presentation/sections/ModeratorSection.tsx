'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { SpeakerEntity } from '@/domain/types';
import { viewportConfig } from '@/lib/animations';
import { getInitials } from '@/lib/utils';

interface ModeratorSectionProps {
  moderator: SpeakerEntity;
}

export function ModeratorSection({ moderator }: ModeratorSectionProps) {
  return (
    <section className="bg-[#F2E4CC] px-6 md:px-12 lg:px-20 pb-20">
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Divider line */}
        <div className="w-full h-px bg-[#1A1A1A]/10 mb-16" />

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">

          {/* Photo */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative" style={{ width: 260, height: 320 }}>
              {/* Offset shadow block */}
              <div
                className="absolute bg-[#226C3D]/20"
                style={{ inset: 0, transform: 'translate(10px, 10px)' }}
              />
              <div className="relative w-full h-full overflow-hidden border border-[#1A1A1A]/12">
                {moderator.photo ? (
                  <Image
                    src={moderator.photo}
                    alt={moderator.name}
                    fill
                    className="object-cover object-top"
                  />
                ) : (
                  <div className="w-full h-full bg-[#226C3D] flex items-center justify-center text-[#F2E4CC] font-bold text-5xl">
                    {getInitials(moderator.name)}
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Label */}
            <p className="text-[#226C3D] text-[10px] font-bold uppercase tracking-[0.3em] mb-5">
              Meet Our Moderator
            </p>

            {/* Name */}
            <h2
              className="font-instrument italic text-[#1A1A1A] leading-[0.9] mb-4"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)' }}
            >
              {moderator.name}
            </h2>

            {/* Role */}
            <div className="flex items-center gap-2 mb-6">
              <span className="text-[#1A1A1A]/40 text-xs">—</span>
              <p className="text-[#5C5046] text-sm font-medium">
                {moderator.title}
                <span className="text-[#1A1A1A]/25 mx-2">·</span>
                {moderator.company}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {moderator.tags?.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 border border-[#1A1A1A]/15 text-[#5C5046] rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Bio */}
            <p className="text-[#5C5046] text-sm leading-relaxed max-w-xl">
              {moderator.bio}
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
