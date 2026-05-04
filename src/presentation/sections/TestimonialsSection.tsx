'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

const CARDS = [
  {
    name: 'Daniel Olatinsu',
    username: '@tinsu',
    initials: 'DO',
    color: '#226C3D',
    text: 'I’m really looking forward to this first edition of the AURA Career Fair. Feels like something MTU actually needs right now.',
    time: '9:14 AM · May 12, 2026',
  },
  {
    name: 'Abejoye Favour',
    username: '@favour_abejoye',
    initials: 'AF',
    color: '#8B6914',
    text: 'Looking forward to the networking sessions. Hopefully I can leave with something tangible.',
    time: '11:32 AM · May 12, 2026',
  },
  {
    name: 'M.O',
    username: '@mo_',
    initials: 'MO',
    color: '#1A5430',
    text: 'I’m hoping this creates a real bridge between students and industry. That’s been missing for a while.',
    time: '2:07 PM · May 12, 2026',
  },
  {
    name: 'Flourish Joshua',
    username: '@fjspeaks',
    initials: 'FJ',
    color: '#226C3D',
    text: 'The speaker lineup looks solid. I’m hoping the panel sessions are actually practical and not just vibes.',
    time: '3:55 PM · May 12, 2026',
  },
  {
    name: 'Ayeni Busola',
    username: '@busolatalks',
    initials: 'AB',
    color: '#4A7C3F',
    text: 'I’m particularly interested in the structure of the event and the opportunities it presents for meaningful engagement.',
    time: '5:41 PM · May 12, 2026',
  },
];

const N = CARDS.length;
const BASE_TOP   = 80;
const CARD_OFFSET = 40;

// Slight rotation per card for the playful scattered feel
const ROTATIONS = [-2, 1.5, -1, 2, -1.5];


interface CardProps {
  card: typeof CARDS[0];
  i: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

function TestimonialCard({ card, i, progress, range, targetScale }: CardProps) {
  const scale = useTransform(progress, range, [1, targetScale]);
  const rot   = ROTATIONS[i % ROTATIONS.length];

  return (
    <div
      className="h-screen sticky top-0 flex justify-center items-start overflow-hidden"
      style={{ paddingTop: `calc(50vh - 160px + ${i * CARD_OFFSET}px)`, zIndex: i + 1 }}
    >
<motion.div style={{ scale, transformOrigin: 'top center', width: 'min(88vw, 600px)', position: 'relative', zIndex: 2 }}>

        {/* Main card */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            backgroundColor: '#FFFFFF',
            border: '2.5px solid #1A1A1A',
            borderRadius: 60,
            transform: `rotate(${rot}deg)`,
            padding: '55px 26px 55px',
          }}
        >
          {/* Header row */}
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-sm"
              style={{ backgroundColor: card.color, border: '2px solid #1A1A1A' }}
            >
              {card.initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-[#1A1A1A] text-[16px] leading-none mb-0.5">{card.name}</p>
              <p className="text-[#9C8E7C] text-[14px]">{card.username}</p>
            </div>
            {/* Twitter bird */}
            <svg
              width="28" height="28" viewBox="0 0 24 24" fill="#1DA1F2"
              className="flex-shrink-0" aria-hidden
            >
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
            </svg>
          </div>

          {/* Tweet text */}
          <p
            className="text-[#1A1A1A] leading-snug mb-4"
            style={{ fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)', fontWeight: 400 }}
          >
            {card.text}
          </p>

          {/* Timestamp */}
          <p className="text-[#9C8E7C] text-[13px]">
            {card.time} · <span className="text-[#226C3D] font-medium">AURA Love</span>
          </p>
        </div>

      </motion.div>
    </div>
  );
}

export function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>

      {/* Single background layer — sticky, sits behind ALL cards */}
      {/* <div
        className="sticky top-0 h-screen pointer-events-none select-none overflow-hidden"
        style={{ zIndex: 0, marginBottom: '-100vh' }}
      >
        <span
          className="absolute left-[-2vw] top-1/2 -translate-y-1/2 font-instrument italic text-[#1A1A1A] opacity-[0.07] whitespace-nowrap leading-none"
          style={{ fontSize: '22vw' }}
        >
          AURA
        </span>
        <div
          className="absolute right-[4vw] top-1/2 -translate-y-1/2"
          style={{ backgroundColor: '#C9A227', borderRadius: 12, padding: '10px 28px' }}
        >
          <span className="font-instrument italic text-white leading-none" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
            Love
          </span>
        </div>
      </div> */}

      {CARDS.map((card, i) => {
        const targetScale: number          = 1 - (N - i) * 0.05;
        const range: [number, number] = [i * (1 / N), 1];
        return (
          <TestimonialCard
            key={card.username}
            card={card}
            i={i}
            progress={scrollYProgress}
            range={range}
            targetScale={targetScale}
          />
        );
      })}
    </div>
  );
}
