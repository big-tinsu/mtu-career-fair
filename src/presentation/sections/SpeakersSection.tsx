'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { SpeakerEntity } from '@/domain/types';
import { fadeInUp, viewportConfig } from '@/lib/animations';
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

interface ThumbProps {
  speaker: SpeakerEntity;
  onClick: () => void;
  direction: 'left' | 'right';
}

function SpeakerThumb({ speaker, onClick, direction }: ThumbProps) {
  return (
    <motion.button
      initial={{ opacity: 0, x: direction === 'left' ? -30 : 30 }}
      animate={{ opacity: 0.4, x: 0 }}
      exit={{ opacity: 0, x: direction === 'left' ? -30 : 30 }}
      transition={{ type: 'spring', damping: 28, stiffness: 220 }}
      onClick={onClick}
      className="flex-shrink-0 w-36 md:w-44 lg:w-56 group hover:opacity-60 transition-opacity"
    >
      <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-[#226C3D]">
        {speaker.photo ? (
          <Image
            src={speaker.photo}
            alt={speaker.name}
            fill
            className="object-cover object-top grayscale"
          />
        ) : (
          <div className={cn('w-full h-full flex items-center justify-center text-white text-3xl', `bg-gradient-to-br ${gradientFor(speaker.id)}`)}>
            {getInitials(speaker.name)}
          </div>
        )}
        <div className="absolute inset-0 bg-[#1A5430]/30" />
      </div>
    </motion.button>
  );
}

export function SpeakersSection({ speakers }: SpeakersSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selected, setSelected] = useState<SpeakerEntity | null>(null);

  const prev = () => setActiveIndex(i => Math.max(0, i - 1));
  const next = () => setActiveIndex(i => Math.min(speakers.length - 1, i + 1));

  const prevSpeaker = activeIndex > 0 ? speakers[activeIndex - 1] : null;
  const activeSpeaker = speakers[activeIndex];
  const nextSpeaker = activeIndex < speakers.length - 1 ? speakers[activeIndex + 1] : null;

  return (
    <>
      <section id="speakers" className="pt-24 md:pt-32 pb-20 md:pb-28 bg-[#1A5430] overflow-hidden">
        {/* Header */}
        <div className="px-6 md:px-12 lg:px-20 xl:px-28 mb-16 md:mb-20">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <p className="text-[#F2E4CC]/35 text-xs font-bold uppercase tracking-[0.25em] mb-5">
              The Panelists
            </p>
            <h2
              className="font-instrument italic text-[#F2E4CC] leading-[0.92]"
              style={{ fontSize: 'clamp(2.8rem, 7vw, 7rem)' }}
            >
              Voices that have<br />walked the path.
            </h2>
          </motion.div>
        </div>

        {/* Carousel */}
        <div className="flex items-end justify-center gap-4 md:gap-6 px-4 mb-10 md:mb-14">
          {/* Prev slot */}
          <div className="flex-shrink-0 w-36 md:w-44 lg:w-56">
            <AnimatePresence mode="wait">
              {prevSpeaker && (
                <SpeakerThumb
                  key={prevSpeaker.id}
                  speaker={prevSpeaker}
                  onClick={prev}
                  direction="left"
                />
              )}
            </AnimatePresence>
          </div>

          {/* Active speaker */}
          <AnimatePresence mode="wait">
            <motion.button
              key={activeSpeaker.id}
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: -16 }}
              transition={{ type: 'spring', damping: 26, stiffness: 200 }}
              onClick={() => setSelected(activeSpeaker)}
              className="flex-shrink-0 w-64 md:w-80 lg:w-[26rem] group text-left"
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#226C3D] mb-5">
                {activeSpeaker.photo ? (
                  <Image
                    src={activeSpeaker.photo}
                    alt={activeSpeaker.name}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className={cn('w-full h-full flex items-center justify-center text-white text-7xl md:text-8xl', `bg-gradient-to-br ${gradientFor(activeSpeaker.id)}`)}>
                    {getInitials(activeSpeaker.name)}
                  </div>
                )}
                {/* Dark overlay on hover */}
                <div className="absolute inset-0 bg-[#1A5430]/0 group-hover:bg-[#1A5430]/25 transition-all duration-300" />
                {/* View profile pill */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <div className="bg-[#F2E4CC]/95 backdrop-blur-sm rounded-xl px-4 py-2.5 text-center">
                    <p className="text-[#226C3D] text-xs font-bold tracking-widest uppercase">View Profile</p>
                  </div>
                </div>
              </div>
              <p className="font-instrument italic text-xl md:text-2xl lg:text-3xl text-[#F2E4CC] leading-tight mb-1 group-hover:text-white transition-colors">
                {activeSpeaker.name}
              </p>
              <p className="text-[#F2E4CC]/40 text-sm">{activeSpeaker.title}</p>
              <p className="text-[#4CAF70] text-xs font-medium mt-0.5">{activeSpeaker.company}</p>
            </motion.button>
          </AnimatePresence>

          {/* Next slot */}
          <div className="flex-shrink-0 w-36 md:w-44 lg:w-56">
            <AnimatePresence mode="wait">
              {nextSpeaker && (
                <SpeakerThumb
                  key={nextSpeaker.id}
                  speaker={nextSpeaker}
                  onClick={next}
                  direction="right"
                />
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6">
          <button
            onClick={prev}
            disabled={activeIndex === 0}
            className="w-12 h-12 rounded-full border border-[#F2E4CC]/20 flex items-center justify-center text-[#F2E4CC]/50 hover:text-[#F2E4CC] hover:border-[#F2E4CC]/50 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
          >
            <FiArrowLeft size={18} />
          </button>
          <p className="text-[#F2E4CC]/35 text-sm font-medium tabular-nums tracking-widest">
            {String(activeIndex + 1).padStart(2, '0')} / {String(speakers.length).padStart(2, '0')}
          </p>
          <button
            onClick={next}
            disabled={activeIndex === speakers.length - 1}
            className="w-12 h-12 rounded-full border border-[#F2E4CC]/20 flex items-center justify-center text-[#F2E4CC]/50 hover:text-[#F2E4CC] hover:border-[#F2E4CC]/50 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
          >
            <FiArrowRight size={18} />
          </button>
        </div>
      </section>

      <SpeakerPanel speaker={selected} onClose={() => setSelected(null)} />
    </>
  );
}
