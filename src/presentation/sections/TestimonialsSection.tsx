'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

// ─── Data ────────────────────────────────────────────────────────────────────

const CARDS = [
  {
    name: 'Chisom Adaeze',
    username: '@chisomwrites',
    initials: 'CA',
    color: '#226C3D',
    text: 'AURA Career Fair completely changed how I approached my job search. Landed 3 interviews within a week of attending. Best event of 2026 🔥',
  },
  {
    name: 'Tunde Afolabi',
    username: '@tunde_builds',
    initials: 'TA',
    color: '#8B6914',
    text: 'The CV clinic was INSANE. A recruiter rewrote my entire summary in 5 minutes — my callback rate tripled after. 100% recommend 🚀',
  },
  {
    name: 'Blessing Eze',
    username: '@blessingeze_',
    initials: 'BE',
    color: '#1A5430',
    text: 'Shook hands with 4 company reps at AURA and walked away with an internship offer the same day. No cap 💼',
  },
  {
    name: 'Emeka Okafor',
    username: '@emekacodes',
    initials: 'EO',
    color: '#226C3D',
    text: 'The panel talk was worth more than a full semester of lectures. MTU really cooked with this one 🎯',
  },
  {
    name: 'Fadeke Adesanya',
    username: '@fadeketalks',
    initials: 'FA',
    color: '#4A7C3F',
    text: "Been to career fairs before. AURA is on a completely different level — the energy, the connections, the speakers. Don't sleep ✨",
  },
];

const N = CARDS.length;

// ─── Card component ───────────────────────────────────────────────────────────

interface CardProps {
  card: (typeof CARDS)[0];
  i: number;
  progress: MotionValue<number>; // parent scroll progress
  range: [number, number];       // when THIS card should start shrinking → full shrink
  targetScale: number;           // how small this card becomes when fully stacked under
}

function TestimonialCard({ card, i, progress, range, targetScale }: CardProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Per-card scroll — used for the inner parallax (quote text subtle shift)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start start'],
  });

  // Subtle vertical shift on the inner content as this card scrolls in
  const innerY = useTransform(scrollYProgress, [0, 1], ['-10%', '0%']);

  // ← KEY: scale driven by the PARENT's scroll progress, not this card's own scroll
  // This is what makes earlier cards "shrink back" as new cards stack on top
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    // Each card is a full-viewport sticky container.
    // CSS sticky + DOM order is what creates the actual stacking —
    // later cards sit on top of earlier ones as you scroll.
    <div
      ref={containerRef}
      className="h-screen sticky top-0 flex items-center justify-center"
      style={{ backgroundColor: '#F5EFE3' }}
    >
      <motion.div
        style={{
          scale,
          // Matches reference: earlier cards sit slightly higher so later
          // cards can stack visually beneath their top edge
          top: `calc(-5vh + ${i * 25}px)`,
          // CRITICAL — scales from the top edge so the card appears to
          // be pushed back rather than shrinking toward its center
          transformOrigin: 'top',
          position: 'relative',
          backgroundColor: '#FFFFFF',
          width: 'min(90vw, 680px)',
          borderRadius: 24,
          boxShadow: '0 8px 48px rgba(0,0,0,0.12)',
          overflow: 'hidden',
        }}
      >
        <motion.div
          style={{ y: innerY }}
          className="p-8 md:p-10 flex flex-col gap-5"
        >
          {/* Header */}
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-sm"
              style={{ backgroundColor: card.color }}
            >
              {card.initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-[#1A1A1A] text-[15px] leading-none mb-0.5 truncate">
                {card.name}
              </p>
              <p className="text-[#9C8E7C] text-[13px] truncate">{card.username}</p>
            </div>
            {/* X / Twitter icon */}
            <svg
              width="18" height="18" viewBox="0 0 24 24" fill="currentColor"
              className="flex-shrink-0 opacity-50 text-[#1A1A1A]"
              aria-hidden
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.263 5.633L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
            </svg>
          </div>

          {/* Quote */}
          <p
            className="text-[#1A1A1A] leading-relaxed"
            style={{ fontSize: 'clamp(1rem, 1.6vw, 1.15rem)' }}
          >
            {card.text}
          </p>

          {/* Footer */}
          <div className="pt-4 border-t border-[#EDE3D3] flex items-center justify-between">
            <p className="text-[#9C8E7C] text-[12px] font-medium">AURA Career Fair 2026</p>
            <span className="text-[11px] font-bold text-[#C4B89E] tabular-nums">
              {String(i + 1).padStart(2, '0')} / {String(N).padStart(2, '0')}
            </span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parent container tracks its OWN full scroll range.
  // This single MotionValue is shared with every card.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    // marginTop/Bottom create the scroll space so sticky cards have room to work.
    // Without enough margin, the sticky elements never get a chance to stack.
    <div
      ref={containerRef}
      style={{ marginTop: '50vh', marginBottom: '50vh' }}
    >
      {CARDS.map((card, i) => {
        // Earlier cards shrink more (pushed further back by the stack)
        const targetScale = 1 - (N - i) * 0.05;

        // range: when scroll progress crosses i/N * 0.8, this card starts shrinking
        // It finishes shrinking at progress = 1 (fully stacked)
        const rangeStart = i * (1 / N);
        const range: [number, number] = [rangeStart, 1];

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
