'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { EventEntity } from '@/domain/types';

interface HeroSectionProps {
  event: EventEntity;
}

const tickerItems = [
  'AURA CAREER FAIR', '2026', 'BEYOND THE DEGREE', 'MTU × SRC',
  'MAY 11', 'FREE ENTRY', 'MTU MULTI-PURPOSE HALL', 'NETWORKING',
];

const leftArcs = [
  { size: 680, color: '#1A5430', thickness: 22 },
  { size: 530, color: '#226C3D', thickness: 22 },
  { size: 380, color: '#3D9960', thickness: 22 },
  { size: 230, color: '#5BBF7A', thickness: 22 },
];

const rightArcs = [
  { size: 680, color: '#7A5217', thickness: 22 },
  { size: 530, color: '#B07A28', thickness: 22 },
  { size: 380, color: '#D4A044', thickness: 22 },
  { size: 230, color: '#EFC068', thickness: 22 },
];

export function HeroSection({ event }: HeroSectionProps) {
  return (
    <section className="min-h-screen bg-[url('/images/bg-image.jpeg')] bg-cover bg-center bg-no-repeat flex flex-col relative overflow-hidden">

      

      {/* Main content */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-6 md:px-12 text-center pt-32 pb-20">

        {/* Date badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2.5 mb-10"
        >
          <div className="w-9 h-9 rounded-full bg-[#226C3D] flex items-center justify-center flex-shrink-0">
            <span className="text-[#F2E4CC] text-sm leading-none">✦</span>
          </div>
          <span className="bg-[#226C3D] text-[#F2E4CC] text-sm md:text-base font-semibold px-5 py-2 rounded-full">
            Monday, 11th May · MTU Multi-Purpose Hall
          </span>
        </motion.div>

        {/* Main heading */}
        <div className="overflow-hidden mb-6">
          <motion.h1
            initial={{ y: '105%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
            className="font-black leading-[0.9] tracking-tight max-w-4xl mx-auto"
            style={{
              fontSize: 'clamp(2.8rem, 8.5vw, 7rem)',
              color: '#F2E4CC',
              WebkitTextStroke: '2.5px #1A1A1A',
              paintOrder: 'stroke fill',
              textShadow: '5px 7px 0px rgba(26,26,26,0.16)',
            } as React.CSSProperties}
          >
            Careers, connections,
            <br />
            and limitless futures.
          </motion.h1>
        </div>

        {/* Subtitle pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <span
            className="inline-block bg-[#226C3D] text-[#F2E4CC] font-bold px-7 py-2.5 rounded-lg font-instrument italic"
            style={{ fontSize: 'clamp(1.05rem, 2.4vw, 1.45rem)' }}
          >
            AURA Career Fair is here.
          </span>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.72 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <Link href={`/events/${event.slug}/register`}>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-[#1A5430] text-[#F2E4CC] font-bold text-sm px-8 py-4 rounded-full transition-colors hover:bg-[#0D3B22]"
            >
              Register Now — Free Entry
            </motion.button>
          </Link>
          <motion.a
            href="#about"
            className="text-[#1A5430]/60 hover:text-[#1A5430] text-sm font-medium border border-[#1A5430]/25 hover:border-[#1A5430]/50 px-6 py-4 rounded-full transition-colors"
          >
            Learn more
          </motion.a>
        </motion.div>
      </div>

      {/* Scrolling ticker */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="relative z-10 border-t border-[#1A1A1A]/10 bg-[#1A1A1A]/5 overflow-hidden py-3"
      >
        <div
          className="flex whitespace-nowrap"
          style={{ animation: 'marquee 28s linear infinite' }}
        >
          {[...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
            <span
              key={i}
              className="flex-shrink-0 text-[#1A1A1A]/35 text-[10px] font-bold uppercase tracking-[0.35em] mx-6"
            >
              {item}
              {i % tickerItems.length !== tickerItems.length - 1 && (
                <span className="mx-4 opacity-40">·</span>
              )}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
