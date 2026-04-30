'use client';

import { motion } from 'framer-motion';
import { FiCheckCircle } from 'react-icons/fi';
import { EventEntity } from '@/domain/types';
import { fadeInUp, slideInLeft, slideInRight, viewportConfig } from '@/lib/animations';
import { formatDate } from '@/lib/utils';

interface AboutSectionProps {
  event: EventEntity;
}

const highlights = [
  'Meet recruiters from 80+ leading companies',
  'Drop your resume directly to hiring managers',
  'Attend live panels and keynotes from industry leaders',
  'Get one-on-one resume reviews',
  'Network with fellow students and alumni',
  'Access exclusive internship and full-time opportunities',
];

export function AboutSection({ event }: AboutSectionProps) {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="layout">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C192FF] mb-4">
              About the Event
            </p>
            <h2 className="font-figtree text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              Your next career{' '}
              <span className="bg-gradient-to-r from-[#6F00FF] to-[#08BFFF] bg-clip-text text-transparent">
                starts here
              </span>
            </h2>
            <div className="space-y-4 text-white/50 text-base leading-relaxed">
              {event.longDescription?.split('\n\n').map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="space-y-4"
          >
            <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] p-6 mb-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4">
                Event Info
              </p>
              <div className="space-y-3">
                {[
                  { label: 'Date', value: formatDate(event.date) },
                  { label: 'Time', value: `${event.time} – ${event.endTime} EST` },
                  { label: 'Venue', value: event.location },
                  { label: 'Address', value: event.address },
                  { label: 'Entry', value: event.isFree ? 'Free — Approval Required' : `$${event.price}` },
                  { label: 'Capacity', value: `${event.capacity} attendees` },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between gap-4">
                    <span className="text-white/30 text-sm flex-shrink-0">{label}</span>
                    <span className="text-white/70 text-sm text-right">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4">
                What to Expect
              </p>
              <ul className="space-y-2.5">
                {highlights.map((item) => (
                  <motion.li
                    key={item}
                    variants={fadeInUp}
                    className="flex items-start gap-3 text-sm text-white/60"
                  >
                    <FiCheckCircle className="text-[#4ADE80] flex-shrink-0 mt-0.5" size={15} />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
