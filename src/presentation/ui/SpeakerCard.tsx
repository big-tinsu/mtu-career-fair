'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiLinkedin } from 'react-icons/fi';
import { SpeakerEntity, SpeakerType } from '@/domain/types';
import { fadeInUp } from '@/lib/animations';
import { cn, getInitials } from '@/lib/utils';
import { Badge } from './Badge';

interface SpeakerCardProps {
  speaker: SpeakerEntity;
}

const typeConfig: Record<SpeakerType, { label: string; variant: 'green' | 'gold' | 'blue' | 'cream' }> = {
  keynote: { label: 'Keynote', variant: 'gold' },
  speaker: { label: 'Speaker', variant: 'green' },
  panelist: { label: 'Panelist', variant: 'green' },
  host: { label: 'Host', variant: 'cream' },
};

const avatarColors = [
  'from-[#226C3D] to-[#4CAF70]',
  'from-[#1A5430] to-[#226C3D]',
  'from-[#8B6914] to-[#C9A227]',
  'from-[#004B87] to-[#0071C5]',
];

export function SpeakerCard({ speaker }: SpeakerCardProps) {
  const { label, variant } = typeConfig[speaker.type];
  const gradientIdx =
    speaker.id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % avatarColors.length;

  return (
    <motion.div
      variants={fadeInUp}
      className={cn(
        'group flex flex-col h-full bg-white rounded-2xl overflow-hidden',
        'border border-[#E8D9BE] hover:border-[rgba(34,108,61,0.3)]',
        'shadow-[0_2px_12px_rgba(28,28,28,0.06)] hover:shadow-[0_8px_32px_rgba(28,28,28,0.12)]',
        'transition-all duration-300',
      )}
    >
      <div className="relative h-48 overflow-hidden">
        {speaker.photo ? (
          <Image
            src={speaker.photo}
            alt={speaker.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div
            className={cn(
              'w-full h-full flex items-center justify-center text-white text-4xl font-bold font-manrope',
              `bg-gradient-to-br ${avatarColors[gradientIdx]}`,
            )}
          >
            {getInitials(speaker.name)}
          </div>
        )}
        <div className="absolute top-3 right-3">
          <Badge variant={variant}>{label}</Badge>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-manrope font-bold text-[#1A1A1A] text-base leading-tight mb-0.5">
          {speaker.name}
        </h3>
        <p className="text-[#5C5046] text-xs mb-1">{speaker.title}</p>
        <p className="text-[#226C3D] text-xs font-semibold mb-3">{speaker.company}</p>

        <p className="text-[#6B5E4A] text-sm leading-relaxed flex-1">{speaker.bio}</p>

        {speaker.tags && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {speaker.tags.map((tag) => (
              <span key={tag} className="px-2 py-0.5 rounded-md bg-[#F2E4CC] text-[#6B5E4A] text-xs">
                {tag}
              </span>
            ))}
          </div>
        )}

        {speaker.linkedIn && (
          <div className="mt-4 pt-4 border-t border-[#F0E8D8]">
            <a
              href={speaker.linkedIn}
              className="flex items-center gap-1.5 text-xs text-[#9C8E7C] hover:text-[#226C3D] transition-colors"
            >
              <FiLinkedin size={13} /> LinkedIn
            </a>
          </div>
        )}
      </div>
    </motion.div>
  );
}
