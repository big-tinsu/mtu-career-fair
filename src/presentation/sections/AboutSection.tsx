'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import { EventEntity } from '@/domain/types';
import { fadeInUp, viewportConfig } from '@/lib/animations';
import { formatDate } from '@/lib/utils';
import { WordReveal } from '../ui/WordReveal';

interface AboutSectionProps {
  event: EventEntity;
}

const highlights = [
  { num: '01', text: 'Direct access to recruiters from top companies' },
  { num: '02', text: 'Live panel discussions with industry leaders' },
  { num: '03', text: 'One-on-one CV review sessions' },
  { num: '04', text: 'Networking lunch with professionals' },
  { num: '05', text: 'Graduate opportunity matching' },
  { num: '06', text: 'Exclusive TOEFL testing information' },
];

export function AboutSection({ event }: AboutSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  return (
    <section id="about" ref={ref} className="py-24 md:py-36 bg-[#F2E4CC]">
      {/* Full-width editorial header */}
      <div className="px-6 md:px-12 lg:px-20 xl:px-28 mb-16 md:mb-20">
        <motion.p
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6 }}
          className="text-[#226C3D] text-xs font-bold uppercase tracking-[0.25em] mb-6"
        >
          About the Event
        </motion.p>

        <h2 className="font-instrument italic leading-[0.92] tracking-tight" style={{ fontSize: 'clamp(2.8rem, 7vw, 7rem)' }}>
          <WordReveal text="Your degree opened the door." delay={0.1} staggerDelay={0.06} />
          <br />
          <span className="text-[#226C3D]">
            <WordReveal text="Now step through it." delay={0.55} staggerDelay={0.06} />
          </span>
        </h2>
      </div>

      {/* Two-column body */}
      <div className="px-6 md:px-12 lg:px-20 xl:px-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left */}
          <div>
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="mb-12"
            >
              {event.longDescription?.split('\n\n').map((para, i) => (
                <p key={i} className="text-[#5C5046] text-base leading-relaxed mb-4 last:mb-0">{para}</p>
              ))}
            </motion.div>

            {/* Numbered stacked highlights */}
            <div>
              {highlights.map(({ num, text }, i) => (
                <motion.div
                  key={num}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={viewportConfig}
                  transition={{ duration: 0.55, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-start gap-5 py-4 border-b border-[#E0D1B5] last:border-0 group"
                >
                  <span className="font-instrument italic text-[#226C3D]/40 text-sm leading-none mt-0.5 flex-shrink-0 group-hover:text-[#226C3D] transition-colors">
                    {num}
                  </span>
                  <p className="text-[#1A1A1A] text-sm md:text-base font-medium leading-snug group-hover:text-[#226C3D] transition-colors">
                    {text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewportConfig}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden rounded-3xl aspect-[4/5]"
            >
              <motion.div style={{ y: imageY }} className="absolute inset-0 h-[112%] -top-[6%]">
                <Image
                  src="/images/imageone.jpeg"
                  alt="AURA Career Fair"
                  fill
                  className="object-cover"
                />
              </motion.div>
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A5430]/30 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="text-white/80 text-xs font-bold uppercase tracking-widest">AURA Career Fair 2026</p>
                <p className="font-instrument italic text-white text-xl leading-tight mt-0.5">Beyond the Degree</p>
              </div>
            </motion.div>

            {/* Event details card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="bg-[#1A5430] rounded-2xl p-6 shadow-[0_8px_32px_rgba(26,84,48,0.25)]"
            >
              <p className="text-[#F2E4CC]/50 text-[10px] font-bold uppercase tracking-[0.25em] mb-4">Event Details</p>
              <div className="space-y-3">
                {[
                  { label: 'Date', value: formatDate(event.date) },
                  { label: 'Time', value: `${event.time} – ${event.endTime}` },
                  { label: 'Venue', value: event.location },
                  { label: 'Address', value: event.address },
                  { label: 'Admission', value: 'Free — Registration Required' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between gap-4">
                    <span className="text-[#F2E4CC]/40 text-sm flex-shrink-0">{label}</span>
                    <span className="text-[#F2E4CC] text-sm text-right font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
