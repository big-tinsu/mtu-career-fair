'use client';

import { motion } from 'framer-motion';
import { FiLinkedin, FiTwitter } from 'react-icons/fi';
import { SpeakerEntity, SpeakerType } from '@/domain/types';
import { cardHover, fadeInUp } from '@/lib/animations';
import { cn, getInitials } from '@/lib/utils';
import { Badge } from './Badge';

interface SpeakerCardProps {
  speaker: SpeakerEntity;
}

const typeConfig: Record<SpeakerType, { label: string; variant: 'purple' | 'blue' | 'green' | 'yellow' }> = {
  keynote: { label: 'Keynote', variant: 'yellow' },
  speaker: { label: 'Speaker', variant: 'purple' },
  panelist: { label: 'Panelist', variant: 'blue' },
  host: { label: 'Host', variant: 'green' },
};

const avatarGradients = [
  'from-[#6F00FF] to-[#08BFFF]',
  'from-[#FF1D45] to-[#6F00FF]',
  'from-[#08BFFF] to-[#0CAC91]',
  'from-[#F59929] to-[#FF1D45]',
  'from-[#EA157F] to-[#6F00FF]',
  'from-[#0CAC91] to-[#08BFFF]',
];

export function SpeakerCard({ speaker }: SpeakerCardProps) {
  const { label, variant } = typeConfig[speaker.type];
  const gradientIdx =
    speaker.id
      .split('')
      .reduce((acc, c) => acc + c.charCodeAt(0), 0) % avatarGradients.length;

  return (
    <motion.div
      variants={fadeInUp}
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      <motion.div
        variants={cardHover}
        className={cn(
          'relative flex flex-col p-6 rounded-2xl h-full',
          'bg-white/[0.03] border border-white/[0.08]',
          'hover:border-[rgba(111,0,255,0.3)] hover:bg-[rgba(111,0,255,0.05)]',
          'transition-colors duration-300',
        )}
      >
        <div className="flex items-start gap-4 mb-4">
          <div
            className={cn(
              'w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0',
              `bg-gradient-to-br ${avatarGradients[gradientIdx]}`,
            )}
          >
            {getInitials(speaker.name)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h3 className="text-white font-semibold text-base leading-tight">{speaker.name}</h3>
            </div>
            <p className="text-white/50 text-xs leading-tight truncate">{speaker.title}</p>
            <p className="text-[#C192FF] text-xs font-medium mt-0.5">{speaker.company}</p>
          </div>
          <Badge variant={variant} className="flex-shrink-0 hidden sm:inline-flex">
            {label}
          </Badge>
        </div>

        <p className="text-white/50 text-sm leading-relaxed flex-1">{speaker.bio}</p>

        {speaker.tags && (
          <div className="flex flex-wrap gap-1.5 mt-4">
            {speaker.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md bg-white/5 text-white/40 text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {(speaker.linkedIn || speaker.twitter) && (
          <div className="flex gap-3 mt-4 pt-4 border-t border-white/[0.06]">
            {speaker.linkedIn && (
              <a
                href={speaker.linkedIn}
                className="text-white/30 hover:text-[#08BFFF] transition-colors"
                aria-label="LinkedIn"
              >
                <FiLinkedin size={16} />
              </a>
            )}
            {speaker.twitter && (
              <a
                href={speaker.twitter}
                className="text-white/30 hover:text-[#08BFFF] transition-colors"
                aria-label="Twitter"
              >
                <FiTwitter size={16} />
              </a>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
