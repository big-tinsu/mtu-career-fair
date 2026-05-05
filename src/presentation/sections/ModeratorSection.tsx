'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { SpeakerEntity } from '@/domain/types';
import { viewportConfig } from '@/lib/animations';
import { getInitials } from '@/lib/utils';

interface ModeratorSectionProps {
  moderators: SpeakerEntity[];
}

interface CardProps {
  moderator: SpeakerEntity;
  index: number;
}

function ModeratorCard({ moderator, index }: CardProps) {
  return (
    <motion.div
      className="flex flex-col sm:flex-row gap-8 items-start"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportConfig}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Photo */}
      <div className="flex-shrink-0">
        <div className="relative" style={{ width: 200, height: 250 }}>
          <div
            className="absolute bg-[#226C3D]/20"
            style={{ inset: 0, transform: 'translate(8px, 8px)' }}
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
              <div className="w-full h-full bg-[#226C3D] flex items-center justify-center text-[#F2E4CC] font-bold text-4xl">
                {getInitials(moderator.name)}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 pt-1">
        <h3
          className="font-instrument italic text-[#1A1A1A] leading-[0.9] mb-3"
          style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}
        >
          {moderator.name}
        </h3>

        <p className="text-[#5C5046] text-sm font-medium mb-4">
          {moderator.title}
          <span className="text-[#1A1A1A]/25 mx-2">·</span>
          {moderator.company}
        </p>

        <div className="flex flex-wrap gap-2 mb-5">
          {moderator.tags?.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 border border-[#1A1A1A]/15 text-[#5C5046] rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="text-[#5C5046] text-sm leading-relaxed">
          {moderator.bio}
        </p>
      </div>
    </motion.div>
  );
}

export function ModeratorSection({ moderators }: ModeratorSectionProps) {
  if (moderators.length === 0) return null;

  return (
    <section className="bg-[#F2E4CC] px-6 md:px-12 lg:px-20 pb-20">
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Divider + label */}
        <div className="w-full h-px bg-[#1A1A1A]/10 mb-14" />
        <motion.p
          className="text-[#226C3D] text-[10px] font-bold uppercase tracking-[0.3em] mb-12"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          Meet Our Moderator{moderators.length > 1 ? 's' : ''}
        </motion.p>

        <div className="flex flex-col gap-14">
          {moderators.map((m, i) => (
            <ModeratorCard key={m.id} moderator={m} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
