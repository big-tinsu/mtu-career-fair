'use client';

import { motion } from 'framer-motion';
import { FiMapPin, FiUser } from 'react-icons/fi';
import { AgendaItem, AgendaItemType } from '@/domain/types';
import { fadeInUp, staggerContainer, viewportConfig } from '@/lib/animations';
import { cn } from '@/lib/utils';

interface AgendaTimelineProps {
  items: AgendaItem[];
}

const typeConfig: Record<
  AgendaItemType,
  { dot: string; bg: string; border: string; label?: string }
> = {
  keynote: {
    dot: 'bg-gradient-to-b from-[#6F00FF] to-[#08BFFF]',
    bg: 'bg-[rgba(111,0,255,0.08)]',
    border: 'border-[rgba(111,0,255,0.25)]',
    label: 'Keynote',
  },
  main: {
    dot: 'bg-[#6F00FF]',
    bg: 'bg-white/[0.03]',
    border: 'border-white/[0.08]',
  },
  break: {
    dot: 'bg-white/20',
    bg: 'bg-transparent',
    border: 'border-transparent',
  },
  networking: {
    dot: 'bg-[#08BFFF]',
    bg: 'bg-[rgba(8,191,255,0.05)]',
    border: 'border-[rgba(8,191,255,0.15)]',
    label: 'Networking',
  },
  workshop: {
    dot: 'bg-[#F59929]',
    bg: 'bg-[rgba(245,153,41,0.05)]',
    border: 'border-[rgba(245,153,41,0.15)]',
    label: 'Workshop',
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
      <div className="absolute left-[52px] top-0 bottom-0 w-px bg-gradient-to-b from-[rgba(111,0,255,0.4)] via-[rgba(111,0,255,0.1)] to-transparent hidden md:block" />

      <div className="space-y-4">
        {items.map((item, idx) => {
          const config = typeConfig[item.type];
          const isBreak = item.type === 'break';

          return (
            <motion.div
              key={item.id}
              variants={fadeInUp}
              className={cn(
                'flex gap-4 md:gap-6 items-start group',
                isBreak && 'opacity-50',
              )}
            >
              <div className="hidden md:flex flex-col items-center flex-shrink-0 w-[52px] pt-1">
                <div
                  className={cn(
                    'w-3 h-3 rounded-full ring-4 ring-[#040019] flex-shrink-0 transition-transform duration-300 group-hover:scale-125',
                    config.dot,
                  )}
                />
              </div>

              <div className="flex-1">
                <div className={cn('rounded-xl p-4 border transition-all duration-300', config.bg, config.border, !isBreak && 'hover:border-opacity-50')}>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-white font-semibold text-sm">{item.title}</span>
                      {config.label && (
                        <span className="text-xs px-2 py-0.5 rounded-md bg-white/5 text-white/40 font-medium">
                          {config.label}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-white/40 text-xs flex-shrink-0">
                      <span className="font-mono">{item.time}</span>
                      {item.endTime && (
                        <>
                          <span>–</span>
                          <span className="font-mono">{item.endTime}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {item.description && (
                    <p className="text-white/50 text-sm leading-relaxed">{item.description}</p>
                  )}

                  <div className="flex flex-wrap gap-3 mt-3">
                    {item.speaker && (
                      <span className="flex items-center gap-1 text-xs text-[#C192FF]">
                        <FiUser size={11} />
                        {item.speaker}
                      </span>
                    )}
                    {item.location && (
                      <span className="flex items-center gap-1 text-xs text-white/30">
                        <FiMapPin size={11} />
                        {item.location}
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
