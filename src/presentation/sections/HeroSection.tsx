'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { FiArrowRight, FiCalendar, FiClock, FiMapPin, FiShare2 } from 'react-icons/fi';
import { EventEntity } from '@/domain/types';
import { staggerContainer } from '@/lib/animations';
import { formatDate, getSpotsRemaining } from '@/lib/utils';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { WordReveal } from '../ui/WordReveal';

interface HeroSectionProps {
  event: EventEntity;
}

export function HeroSection({ event }: HeroSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const spots = getSpotsRemaining(event.capacity, event.registeredCount);
  const spotsPercent = Math.round((event.registeredCount / event.capacity) * 100);

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: event.title, url: window.location.href });
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <section ref={ref} className="min-h-screen flex flex-col md:flex-row pt-[72px] md:pt-0 overflow-hidden">
      {/* Left — Image */}
      <div className="relative w-full md:w-[55%] h-[40vh] md:h-screen overflow-hidden flex-shrink-0">
        <motion.div style={{ y: imageY }} className="absolute inset-0 h-[115%] -top-[7.5%]">
          <Image
            src="/images/imagetwo.jpeg"
            alt="AURA Career Fair 2026"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#F2E4CC]/80 hidden md:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/20 to-transparent" />
        </motion.div>

        {/* Badge overlaid on image */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="absolute bottom-6 left-6"
        >
          <div className="bg-white/90 backdrop-blur-md rounded-2xl px-4 py-3 shadow-lg border border-white/50">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#9C8E7C] mb-0.5">
              Organised by
            </p>
            <p className="text-[#226C3D] font-bold text-sm font-manrope leading-tight">
              MTU × SRC
            </p>
          </div>
        </motion.div>
      </div>

      {/* Right — Info */}
      <div className="flex-1 bg-[#F2E4CC] flex items-center md:min-h-screen">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="w-full px-6 md:px-10 lg:px-16 py-12 md:py-0"
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap gap-2 mb-6"
          >
            <Badge variant="green" dot>{event.status === 'upcoming' ? 'Registration Open' : 'Live Now'}</Badge>
            {event.isFree && <Badge variant="cream">Free Entry</Badge>}
            <Badge variant="neutral">#{event.tags[3]}</Badge>
          </motion.div>

          <h1 className="font-manrope text-5xl sm:text-6xl lg:text-7xl font-black text-[#1A1A1A] leading-[0.95] tracking-tight mb-3">
            <WordReveal text={event.title} delay={0.3} />
          </h1>

          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="h-[3px] w-10 rounded-full bg-[#226C3D]" />
            <p className="text-[#226C3D] font-bold text-lg tracking-wide">
              &ldquo;{event.subtitle}&rdquo;
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.5 }}
            className="space-y-2.5 mb-8"
          >
            {[
              { icon: <FiCalendar size={14} className="text-[#226C3D]" />, text: formatDate(event.date) },
              { icon: <FiClock size={14} className="text-[#226C3D]" />, text: `${event.time} – ${event.endTime}` },
              { icon: <FiMapPin size={14} className="text-[#226C3D]" />, text: event.location },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-3 text-[#5C5046] text-sm">
                <span className="w-7 h-7 rounded-lg bg-[rgba(34,108,61,0.1)] flex items-center justify-center flex-shrink-0">
                  {icon}
                </span>
                {text}
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 mb-8"
          >
            <Link href={`/events/${event.slug}/register`}>
              <Button size="lg" rightIcon={<FiArrowRight size={16} />} className="w-full sm:w-auto">
                Register Now — Free
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              onClick={handleShare}
              leftIcon={<FiShare2 size={15} />}
              className="w-full sm:w-auto"
            >
              Share
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.15, duration: 0.5 }}
          >
            <div className="flex items-center justify-between text-xs text-[#9C8E7C] mb-2">
              <span>{event.registeredCount} registered</span>
              <span className="font-semibold text-[#226C3D]">{spots} spots left</span>
            </div>
            <div className="h-1.5 rounded-full bg-[#E0D1B5] overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${spotsPercent}%` }}
                transition={{ duration: 1.4, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
                className="h-full rounded-full bg-[#226C3D]"
              />
            </div>
            <p className="text-[10px] text-[#C4B49E] mt-1.5">
              {event.organizer.name}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
