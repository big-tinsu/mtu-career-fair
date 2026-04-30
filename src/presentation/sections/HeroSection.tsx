'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiCalendar, FiMapPin, FiClock, FiArrowRight, FiShare2 } from 'react-icons/fi';
import { EventEntity } from '@/domain/types';
import { fadeIn, fadeInUp, staggerContainer } from '@/lib/animations';
import { formatDate, getSpotsRemaining } from '@/lib/utils';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface HeroSectionProps {
  event: EventEntity;
}

export function HeroSection({ event }: HeroSectionProps) {
  const spots = getSpotsRemaining(event.capacity, event.registeredCount);
  const spotsPercent = Math.round((event.registeredCount / event.capacity) * 100);

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: event.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-[#6F00FF] blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#08BFFF] blur-[120px]"
        />
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-[0.03]" />
      </div>

      <div className="layout relative z-10 py-20 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="flex flex-wrap items-center justify-center gap-2 mb-6">
            <Badge variant="purple" dot>{event.status === 'upcoming' ? 'Registration Open' : 'Live Now'}</Badge>
            {event.isFree && <Badge variant="green">Free to Attend</Badge>}
            <Badge variant="neutral">{event.tags[0]}</Badge>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="font-figtree text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-4"
          >
            <span className="text-white">{event.title.split(' ').slice(0, 2).join(' ')}</span>
            <br />
            <span className="bg-gradient-to-r from-[#6F00FF] via-[#C192FF] to-[#08BFFF] bg-clip-text text-transparent">
              {event.title.split(' ').slice(2).join(' ')}
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-white/50 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-8"
          >
            {event.description}
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap items-center justify-center gap-4 mb-10 text-sm"
          >
            <span className="flex items-center gap-2 text-white/60 bg-white/5 rounded-full px-4 py-2">
              <FiCalendar className="text-[#C192FF]" size={14} />
              {formatDate(event.date)}
            </span>
            <span className="flex items-center gap-2 text-white/60 bg-white/5 rounded-full px-4 py-2">
              <FiClock className="text-[#08BFFF]" size={14} />
              {event.time} – {event.endTime}
            </span>
            <span className="flex items-center gap-2 text-white/60 bg-white/5 rounded-full px-4 py-2">
              <FiMapPin className="text-[#4ADE80]" size={14} />
              {event.location}
            </span>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
            <Link href={`/events/${event.slug}/register`}>
              <Button size="lg" rightIcon={<FiArrowRight size={16} />}>
                Register Now — It&apos;s Free
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              onClick={handleShare}
              leftIcon={<FiShare2 size={16} />}
            >
              Share Event
            </Button>
          </motion.div>

          <motion.div variants={fadeIn} className="max-w-xs mx-auto">
            <div className="flex items-center justify-between text-xs text-white/40 mb-2">
              <span>{event.registeredCount} registered</span>
              <span>{spots} spots remaining</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${spotsPercent}%` }}
                transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="h-full rounded-full bg-gradient-to-r from-[#6F00FF] to-[#08BFFF]"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center pt-2"
        >
          <div className="w-1 h-2 rounded-full bg-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
