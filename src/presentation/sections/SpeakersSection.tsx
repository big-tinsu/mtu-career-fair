'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import { SpeakerEntity } from '@/domain/types';
import { viewportConfig } from '@/lib/animations';
import { SpeakerPanel } from '../ui/SpeakerPanel';
import { RegisterButton } from '../ui/RegisterButton';
import { getInitials } from '@/lib/utils';

interface SpeakersSectionProps {
  speakers: SpeakerEntity[];
}

const cardStyles = [
  { bg: '#226C3D', photoH: 380, badgeBg: '#F2E4CC', badgeText: '#1A5430' },
  { bg: '#F2E4CC', photoH: 320, badgeBg: '#226C3D', badgeText: '#F2E4CC' },
  { bg: '#1A5430', photoH: 440, badgeBg: '#F2E4CC', badgeText: '#1A5430' },
  { bg: '#8B6914', photoH: 360, badgeBg: '#F2E4CC', badgeText: '#8B6914' },
  { bg: '#C9A227', photoH: 400, badgeBg: '#1A1A1A', badgeText: '#F2E4CC' },
];

const cornerPos = ['-top-2 -left-2', '-top-2 -right-2', '-bottom-2 -left-2', '-bottom-2 -right-2'] as const;

// speakerIdx -1 = text block cell
const COLUMNS: { speakerIdx: number; styleIdx: number; offsetTop?: number }[][] = [
  [{ speakerIdx: -1, styleIdx: -1 }, { speakerIdx: 3, styleIdx: 3, offsetTop: 80 }],
  [{ speakerIdx: 0, styleIdx: 0 }, { speakerIdx: 2, styleIdx: 2 }],
  [{ speakerIdx: 1, styleIdx: 1 }, { speakerIdx: 4, styleIdx: 4 }],
];
const COLUMN_TOPS = [0, 60, 200];

interface CardProps {
  speaker: SpeakerEntity;
  styleIdx: number;
  colIdx: number;
  rowIdx: number;
  onClick: () => void;
}

function SpeakerCard({ speaker, styleIdx, colIdx, rowIdx, onClick }: CardProps) {
  const style  = cardStyles[styleIdx % cardStyles.length];
  const isDark = style.bg !== '#F2E4CC';
  const border = isDark ? '#1A1A1A' : '#C4B89E';
  const tag    = speaker.tags?.[0] ?? 'Panelist';

  return (
    <motion.div
      className="flex flex-col"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportConfig}
      transition={{
        duration: 0.7,
        delay: colIdx * 0.1 + rowIdx * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* Photo card */}
      <button
        onClick={onClick}
        className="relative group focus:outline-none w-full flex-shrink-0"
        style={{ height: style.photoH, backgroundColor: style.bg }}
      >
        {/* Category tag — floating above top border */}
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
          <span className="bg-white border border-[#D0C8B8] shadow-sm px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest text-[#1A1A1A] whitespace-nowrap">
            {tag}
          </span>
        </div>

        {/* Card border */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{ border: `2px solid ${border}` }}
        />

        {/* Corner handles */}
        {cornerPos.map((cls) => (
          <div
            key={cls}
            className={`absolute ${cls} w-4 h-4 pointer-events-none z-20`}
            style={{ backgroundColor: 'white', border: `2px solid ${border}` }}
          />
        ))}

        {/* Photo */}
        <div className="absolute inset-0 overflow-hidden">
          {speaker.photo ? (
            <Image
              src={speaker.photo}
              alt={speaker.name}
              fill
              className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center text-white font-bold"
              style={{ fontSize: 72 }}
            >
              {getInitials(speaker.name)}
            </div>
          )}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 z-10" />
        </div>

        {/* Name badge */}
        <div className="absolute bottom-4 left-4 z-20">
          <span
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-bold shadow-md"
            style={{ backgroundColor: style.badgeBg, color: style.badgeText }}
          >
            <span style={{ fontSize: 8, opacity: 0.65 }}>▶</span>
            {speaker.name}
          </span>
        </div>
      </button>

      {/* White bio box */}
      <button
        onClick={onClick}
        className="text-left w-full focus:outline-none"
        style={{
          backgroundColor: '#FFFFFF',
          border: '1.5px solid #E0D6C8',
          borderTop: 'none',
          padding: '14px 16px 16px',
          cursor: 'pointer',
        }}
      >
        <p className="text-[#1A1A1A] font-semibold text-[13px] leading-snug mb-1.5">
          {speaker.name}
        </p>
        <p
          className="text-[#5C5046] text-[12px] leading-relaxed"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {speaker.bio}
        </p>
      </button>
    </motion.div>
  );
}

export function SpeakersSection({ speakers }: SpeakersSectionProps) {
  const [selected, setSelected] = useState<SpeakerEntity | null>(null);

  return (
    <>
      <section
        id="speakers"
        className="bg-[#F2E4CC]"
        style={{
          paddingTop: 20,
          paddingBottom: 80,
          paddingLeft: 'clamp(1.5rem, 4vw, 3rem)',
          paddingRight: 'clamp(1.5rem, 4vw, 3rem)',
        }}
      >
        <div className="flex gap-8 items-start" style={{ maxWidth: 1440, margin: '0 auto' }}>

          {COLUMNS.map((col, ci) => (
            <div
              key={ci}
              className="flex-1 flex flex-col gap-16"
              style={{ paddingTop: COLUMN_TOPS[ci] }}
            >
              {col.map(({ speakerIdx, styleIdx, offsetTop }, ri) => {

                if (speakerIdx === -1) {
                  return (
                    <motion.div
                      key="text-block"
                      className="flex flex-col"
                      initial={{ opacity: 0, x: -32 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={viewportConfig}
                      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                      style={{ paddingTop: 40 }}
                    >
                      <p className="text-[#226C3D] text-[10px] font-bold uppercase tracking-[0.28em] mb-5">
                        The Panelists
                      </p>
                      <h2
                        className="font-instrument italic text-[#1A1A1A] leading-[0.88] mb-5"
                        style={{ fontSize: 'clamp(2rem, 8.8vw, 5.0rem)' }}
                      >
                        Our 2026<br />Speaker<br />Lineup
                      </h2>
                      <p className="text-[#5C5046] text-sm leading-relaxed mb-8">
                        Industry leaders, entrepreneurs, and executives sharing real stories from the frontlines of career success.
                      </p>
                      <RegisterButton label="Register Free" size="md" />
                    </motion.div>
                  );
                }

                const speaker = speakers[speakerIdx];
                if (!speaker) return null;
                return (
                  <div key={speaker.id} style={offsetTop ? { marginTop: offsetTop } : undefined}>
                    <SpeakerCard
                      speaker={speaker}
                      styleIdx={styleIdx}
                      colIdx={ci}
                      rowIdx={ri}
                      onClick={() => setSelected(speaker)}
                    />
                  </div>
                );
              })}
            </div>
          ))}

        </div>
      </section>

      <SpeakerPanel speaker={selected} onClose={() => setSelected(null)} />
    </>
  );
}
