'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import { EventEntity } from '@/domain/types';
import { fadeInUp, viewportConfig } from '@/lib/animations';
import { formatDate } from '@/lib/utils';
import { WordReveal } from '../ui/WordReveal';

interface AboutSectionProps {
  event: EventEntity;
}

const highlights = [
  'Direct access to recruiters from top companies',
  'Live panel discussions with industry leaders',
  'One-on-one CV review sessions',
  'Networking lunch with professionals',
  'Graduate opportunity matching',
  'Exclusive TOEFL testing information',
];

export function AboutSection({ event }: AboutSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);

  return (
    <section id="about" ref={ref} className="py-24 md:py-32 bg-[#F2E4CC]">
      <div className="layout">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: editorial bold statement */}
          <div>
            <motion.p
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.6 }}
              className="text-[#226C3D] text-xs font-bold uppercase tracking-[0.2em] mb-6"
            >
              About the Event
            </motion.p>

            <h2 className="font-manrope text-4xl md:text-5xl lg:text-6xl font-black text-[#1A1A1A] leading-[1.02] tracking-tight mb-8">
              <WordReveal text="Your degree opened the door." delay={0.1} staggerDelay={0.07} />
              <br />
              <span className="text-[#226C3D]">
                <WordReveal text="Now step through it." delay={0.6} staggerDelay={0.07} />
              </span>
            </h2>

            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={viewportConfig} className="space-y-4 mb-10">
              {event.longDescription?.split('\n\n').map((para, i) => (
                <p key={i} className="text-[#5C5046] text-base leading-relaxed">{para}</p>
              ))}
            </motion.div>

            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={viewportConfig} className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {highlights.map((h) => (
                <div key={h} className="flex items-start gap-2.5 text-sm text-[#5C5046]">
                  <FiCheckCircle className="text-[#226C3D] flex-shrink-0 mt-0.5" size={15} />
                  {h}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: image + event card */}
          <div className="flex flex-col gap-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewportConfig}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden rounded-3xl aspect-[4/5]"
            >
              <motion.div style={{ y: imageY }} className="absolute inset-0 h-[110%] -top-[5%]">
                <Image
                  src="/images/imageone.jpeg"
                  alt="AURA Career Fair — Official Partners"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl border border-[#E8D9BE] p-6 shadow-[0_2px_12px_rgba(28,28,28,0.06)]"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-[#9C8E7C] mb-4">Event Details</p>
              <div className="space-y-3">
                {[
                  { label: 'Date', value: formatDate(event.date) },
                  { label: 'Time', value: `${event.time} – ${event.endTime}` },
                  { label: 'Venue', value: event.location },
                  { label: 'Address', value: event.address },
                  { label: 'Admission', value: 'Free — Registration Required' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between gap-4">
                    <span className="text-[#9C8E7C] text-sm flex-shrink-0">{label}</span>
                    <span className="text-[#1A1A1A] text-sm text-right font-medium">{value}</span>
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
