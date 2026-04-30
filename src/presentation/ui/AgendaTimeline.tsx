'use client';

import { motion } from 'framer-motion';
import { FiMapPin, FiUser } from 'react-icons/fi';
import { AgendaItem, AgendaItemType } from '@/domain/types';
import { fadeInUp, staggerContainer, viewportConfig } from '@/lib/animations';
import { cn } from '@/lib/utils';

interface AgendaTimelineProps {
  items: AgendaItem[];
}

const typeConfig: Record<AgendaItemType, { dot: string; bg: string; border: string; tag?: string }> = {
  keynote: {
    dot: 'bg-[#226C3D]',
    bg: 'bg-[rgba(34,108,61,0.05)]',
    border: 'border-[rgba(34,108,61,0.2)]',
    tag: 'Keynote',
  },
  main: {
    dot: 'bg-[#1A1A1A]',
    bg: 'bg-white',
    border: 'border-[#E8D9BE]',
  },
  break: {
    dot: 'bg-[#D0C4B0]',
    bg: 'bg-transparent',
    border: 'border-transparent',
  },
  networking: {
    dot: 'bg-[#8B6914]',
    bg: 'bg-[rgba(139,105,20,0.04)]',
    border: 'border-[rgba(139,105,20,0.15)]',
    tag: 'Networking',
  },
  workshop: {
    dot: 'bg-[#004B87]',
    bg: 'bg-[rgba(0,75,135,0.04)]',
    border: 'border-[rgba(0,75,135,0.12)]',
    tag: 'Workshop',
  },
};

export function AgendaTimeline({ items }: AgendaTimelineProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      className="relative"
    >
      <div className="absolute left-[52px] top-3 bottom-3 w-px bg-gradient-to-b from-[#226C3D] via-[rgba(34,108,61,0.2)] to-transparent hidden md:block" />

      <div className="space-y-3">
        {items.map((item) => {
          const config = typeConfig[item.type];
          const isBreak = item.type === 'break';

          return (
            <motion.div
              key={item.id}
              variants={fadeInUp}
              className={cn('flex gap-4 md:gap-6 items-start group', isBreak && 'opacity-40')}
            >
              <div className="hidden md:flex flex-col items-center flex-shrink-0 w-[52px] pt-4">
                <motion.div
                  className={cn(
                    'w-3 h-3 rounded-full ring-4 ring-[#F2E4CC] flex-shrink-0 transition-transform duration-300 group-hover:scale-125',
                    config.dot,
                  )}
                />
              </div>

              <div className="flex-1">
                <div
                  className={cn(
                    'rounded-2xl p-4 border transition-all duration-300',
                    config.bg, config.border,
                    !isBreak && 'hover:shadow-[0_4px_16px_rgba(28,28,28,0.08)]',
                  )}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[#1A1A1A] font-semibold text-sm font-manrope">{item.title}</span>
                      {config.tag && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-[rgba(34,108,61,0.08)] text-[#226C3D] font-medium border border-[rgba(34,108,61,0.15)]">
                          {config.tag}
                        </span>
                      )}
                    </div>
                    <span className="text-[#9C8E7C] text-xs font-mono flex-shrink-0 whitespace-nowrap">
                      {item.time}{item.endTime ? ` – ${item.endTime}` : ''}
                    </span>
                  </div>

                  {item.description && (
                    <p className="text-[#6B5E4A] text-sm leading-relaxed">{item.description}</p>
                  )}

                  <div className="flex flex-wrap gap-3 mt-2">
                    {item.speaker && (
                      <span className="flex items-center gap-1 text-xs text-[#226C3D]">
                        <FiUser size={11} /> {item.speaker}
                      </span>
                    )}
                    {item.location && (
                      <span className="flex items-center gap-1 text-xs text-[#9C8E7C]">
                        <FiMapPin size={11} /> {item.location}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
