'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { SpeakerEntity } from '@/domain/types';
import { fadeInUp, viewportConfig } from '@/lib/animations';
import { SpeakerPanel } from '../ui/SpeakerPanel';
import { getInitials } from '@/lib/utils';

interface SpeakersSectionProps {
  speakers: SpeakerEntity[];
}

/* Per-speaker card config: background, badge colors, photo height */
const cardStyles = [
  { bg: '#226C3D', photoH: 420, badgeBg: '#F2E4CC',  badgeText: '#1A5430' },
  { bg: '#F2E4CC', photoH: 520, badgeBg: '#226C3D',  badgeText: '#F2E4CC' },
  { bg: '#1A5430', photoH: 520, badgeBg: '#F2E4CC',  badgeText: '#1A5430' },
  { bg: '#8B6914', photoH: 420, badgeBg: '#F2E4CC',  badgeText: '#8B6914' },
];

/* ── Corner selection handles (Figma-aesthetic) ─────────── */
function CornerHandles({ color }: { color: string }) {
  const BORDER = color === '#F2E4CC' ? '#1A1A1A' : '#1A1A1A';
  const BG     = color === '#F2E4CC' ? 'white'   : 'white';
  const pos = ['-top-1.5 -left-1.5', '-top-1.5 -right-1.5', '-bottom-1.5 -left-1.5', '-bottom-1.5 -right-1.5'];
  return (
    <>
      {pos.map((cls, i) => (
        <div
          key={i}
          className={`absolute ${cls} w-3.5 h-3.5 z-30 pointer-events-none`}
          style={{ backgroundColor: BG, border: `2px solid ${BORDER}` }}
        />
      ))}
      <div className="absolute inset-0 z-10 pointer-events-none" style={{ border: `2px solid ${BORDER}` }} />
    </>
  );
}

interface CardProps {
  speaker: SpeakerEntity;
  idx: number;
  onClick: () => void;
}

function SpeakerCard({ speaker, idx, onClick }: CardProps) {
  const { bg, photoH, badgeBg, badgeText } = cardStyles[idx % cardStyles.length];
  const tag = speaker.tags?.[0] ?? 'Panelist';

  return (
    <motion.div
      variants={fadeInUp}
      className="flex-shrink-0 flex flex-col"
      style={{ width: 290 }}
    >
      {/* ── Photo card (variable height) ─────────────── */}
      <button
        onClick={onClick}
        className="relative w-full group focus:outline-none"
        style={{ height: photoH, backgroundColor: bg }}
      >
        <CornerHandles color={bg} />

        {/* Floating category pill — above the photo */}
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap">
          <span className="block bg-white border border-[#E0D1B5] shadow-sm px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A]">
            {tag}
          </span>
        </div>

        {/* Photo */}
        <div className="absolute inset-0 overflow-hidden">
          {speaker.photo ? (
            <Image
              src={speaker.photo}
              alt={speaker.name}
              fill
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center text-white font-bold"
              style={{ fontSize: 72 }}
            >
              {getInitials(speaker.name)}
            </div>
          )}
          {/* Hover tint */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 z-10" />
        </div>

        {/* Name badge — bottom left */}
        <div className="absolute bottom-4 left-4 z-20">
          <span
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-bold shadow-md"
            style={{ backgroundColor: badgeBg, color: badgeText }}
          >
            <span style={{ fontSize: 8, opacity: 0.7 }}>▶</span>
            {speaker.name}
          </span>
        </div>
      </button>

      {/* ── Bio box below card ────────────────────────── */}
      <div className="mt-5 px-0.5">
        <p className="text-[#1A1A1A] text-sm font-bold mb-1.5 leading-snug">{speaker.title}</p>
        <p className="text-[#226C3D] text-xs font-semibold mb-2">{speaker.company}</p>
        <p className="text-[#5C5046] text-sm leading-relaxed">
          {speaker.bio}
        </p>
      </div>
    </motion.div>
  );
}

export function SpeakersSection({ speakers }: SpeakersSectionProps) {
  const [selected, setSelected] = useState<SpeakerEntity | null>(null);

  return (
    <>
      <section id="speakers" className="pt-24 md:pt-32 pb-28 md:pb-36 bg-[#F2E4CC] overflow-hidden">

        {/* ── Section header ──────────────────────────── */}
        <div className="px-6 md:px-12 lg:px-20 xl:px-28 mb-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={viewportConfig}>
              <p className="text-[#226C3D] text-xs font-bold uppercase tracking-[0.25em] mb-5">
                The Panelists
              </p>
              <h2
                className="font-instrument italic text-[#1A1A1A] leading-[0.9]"
                style={{ fontSize: 'clamp(2.8rem, 6.5vw, 6.5rem)' }}
              >
                Voices that<br />walked the path.
              </h2>
            </motion.div>

            <motion.p
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="text-[#5C5046] text-sm max-w-xs leading-relaxed md:text-right flex-shrink-0"
            >
              Industry leaders, entrepreneurs, and executives sharing real career paths.
              <br />
              <span className="text-[#226C3D] font-medium">Click any card to read their story.</span>
            </motion.p>
          </div>
        </div>

        {/* ── Cards — horizontal scroll, bottom-aligned ─ */}
        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="flex items-end gap-6 md:gap-8 overflow-x-auto scrollbar-hide pb-8
                     px-6 md:px-12 lg:px-20 xl:px-28"
          /* Add top padding to give space for the floating category tag */
          style={{ paddingTop: 36 }}
        >
          {speakers.map((speaker, i) => (
            <SpeakerCard
              key={speaker.id}
              speaker={speaker}
              idx={i}
              onClick={() => setSelected(speaker)}
            />
          ))}
          {/* Trailing spacer */}
          <div className="flex-shrink-0 w-4 md:w-10" />
        </motion.div>
      </section>

      <SpeakerPanel speaker={selected} onClose={() => setSelected(null)} />
    </>
  );
}
