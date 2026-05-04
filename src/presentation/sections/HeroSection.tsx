'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import { EventEntity } from '@/domain/types';
import { formatDate } from '@/lib/utils';

interface HeroSectionProps {
  event: EventEntity;
}

const tickerItems = [
  'AURA CAREER FAIR', '2026', 'BEYOND THE DEGREE', 'MTU × SRC',
  'MAY 11', 'FREE ENTRY', 'MTU MULTI-PURPOSE HALL', 'NETWORKING',
];

export function HeroSection({ event }: HeroSectionProps) {
  return (
    <section className="min-h-screen bg-[url('/images/bg-image.jpeg')] bg-cover bg-center bg-no-repeat flex flex-col relative overflow-hidden">
      {/* Radial glows */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full bg-[#2D7A4F]/25 blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[#226C3D]/20 blur-[100px]" />
      </div>

      {/* Main content */}
      <div className="relative flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-20 xl:px-28 pt-32 pb-16">
        {/* Label */}
        {/* <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[#1A5430] text-[10px] md:text-xs tracking-[0.35em] uppercase mb-6 md:mb-8 font-medium"
        >
          Mountain Top University × SRC Present
        </motion.p> */}

        {/* AURA */}
        {/* <div className="overflow-hidden mb-1 md:mb-2">
          <motion.h1
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="font-instrument italic text-[26vw] md:text-[22vw] lg:text-[18vw] xl:text-[16vw] leading-[0.82] tracking-tight text-[#1A5430] select-none"
          >
            AURA
          </motion.h1>
        </div> */}

        {/* Career Fair 2026 */}
        {/* <div className="overflow-hidden mb-8 md:mb-10">
          <motion.div
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1], delay: 0.38 }}
            className="flex flex-wrap items-baseline gap-3 md:gap-5"
          >
            <span className="font-instrument italic text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#F2E4CC]/70 leading-none">
              Career Fair
            </span>
            <span className="font-bold text-xl md:text-2xl text-[#4CAF70] leading-none tracking-tight">
              2026
            </span>
          </motion.div>
        </div> */}

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-4 mb-8 md:mb-10"
        >
          <div className="h-px w-8 bg-[#F2E4CC]/25 flex-shrink-0" />
          <p className="font-instrument italic text-base md:text-lg text-[#F2E4CC]/50">
            &ldquo;{event.subtitle}&rdquo;
          </p>
        </motion.div>

        {/* Event meta */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-wrap gap-x-0 gap-y-2 mb-10 md:mb-12"
        >
          {[
            formatDate(event.date),
            `${event.time} – ${event.endTime}`,
            event.location,
            'Ogun State, Nigeria',
          ].map((detail, i) => (
            <span key={i} className="text-[#F2E4CC]/40 text-xs md:text-sm flex items-center">
              {i > 0 && <span className="mx-3 opacity-40">·</span>}
              {detail}
            </span>
          ))}
        </motion.div>

        {/* CTAs */}
        {/* <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="flex flex-wrap items-center gap-3 md:gap-4"
        >
          <Link href={`/events/${event.slug}/register`}>
            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: '#fff' }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2.5 bg-[#F2E4CC] text-[#1A5430] font-bold text-sm px-8 py-4 rounded-full transition-colors"
            >
              Register Now — Free
              <FiArrowRight size={15} />
            </motion.button>
          </Link>
          <motion.a
            href="#about"
            whileHover={{ color: 'rgba(242,228,204,0.9)' }}
            className="flex items-center gap-2 text-[#F2E4CC]/50 hover:text-[#F2E4CC]/80 text-sm font-medium transition-colors border border-[#F2E4CC]/15 px-6 py-4 rounded-full hover:border-[#F2E4CC]/30"
          >
            Learn more
          </motion.a>
        </motion.div> */}
      </div>

      {/* Scrolling ticker band */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="relative z-10 border-t border-[#F2E4CC]/10 bg-[#F2E4CC]/5 overflow-hidden py-3"
      >
        <div
          className="flex whitespace-nowrap"
          style={{ animation: 'marquee 28s linear infinite' }}
        >
          {[...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
            <span
              key={i}
              className="flex-shrink-0 text-[#F2E4CC]/30 text-[10px] font-bold uppercase tracking-[0.35em] mx-6"
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
