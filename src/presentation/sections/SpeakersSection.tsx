'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FiX, FiLinkedin } from 'react-icons/fi';
import { SpeakerEntity } from '@/domain/types';
import { cn, getInitials } from '@/lib/utils';

interface SpeakerPanelProps {
  speaker: SpeakerEntity | null;
  onClose: () => void;
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

export function SpeakerPanel({ speaker, onClose }: SpeakerPanelProps) {
  return (
    <AnimatePresence>
      {speaker && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#1A1A1A]/50 backdrop-blur-sm z-40"
          />

          {/* Panel */}
          <motion.aside
            key="panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-sm md:max-w-md bg-white z-50 flex flex-col shadow-2xl overflow-y-auto"
          >
            {/* Photo */}
            <div className="relative h-72 md:h-80 flex-shrink-0 bg-[#F2E4CC]">
              {speaker.photo ? (
                <Image
                  src={speaker.photo}
                  alt={speaker.name}
                  fill
                  className={cn('object-cover', speaker.photoPosition ?? 'object-top')}
                />
              ) : (
                <div
                  className={cn(
                    'w-full h-full flex items-center justify-center text-white text-7xl font-bold',
                    `bg-gradient-to-br ${gradientFor(speaker.id)}`,
                  )}
                >
                  {getInitials(speaker.name)}
                </div>
              )}
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent" />

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#1A1A1A] hover:bg-white transition-colors shadow-md"
              >
                <FiX size={17} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 md:p-8">
              {/* Name */}
              <h2 className="font-instrument text-2xl md:text-3xl text-[#1A1A1A] leading-tight mb-1">
                {speaker.name}
              </h2>
              <p className="text-[#5C5046] text-sm mb-0.5">{speaker.title}</p>
              <p className="text-[#226C3D] text-sm font-semibold mb-5">{speaker.company}</p>

              {/* Divider */}
              <div className="h-px bg-[#F0E8D8] mb-5" />

              {/* Bio */}
              {speaker.bio && (
                <p className="text-[#5C5046] text-sm leading-relaxed mb-6">{speaker.bio}</p>
              )}

              {/* Tags */}
              {speaker.tags && speaker.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {speaker.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-[#F2E4CC] text-[#5C5046] text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* LinkedIn */}
              {speaker.linkedIn && speaker.linkedIn !== '#' && (
                <a
                  href={speaker.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-[#226C3D] font-medium hover:text-[#1A5430] transition-colors"
                >
                  <FiLinkedin size={16} />
                  View LinkedIn Profile
                </a>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
