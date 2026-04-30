'use client';

import { motion } from 'framer-motion';
import { StatItem } from '@/domain/types';
import { staggerContainerFast, viewportConfig } from '@/lib/animations';
import { CountUp } from '../ui/CountUp';

interface StatsSectionProps {
  stats: StatItem[];
}

export function StatsSection({ stats }: StatsSectionProps) {
  return (
    <section className="py-16 bg-white border-y border-[#E8D9BE]">
      <div className="layout">
        <motion.div
          variants={staggerContainerFast}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-[#E8D9BE]"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center px-6 py-6 first:pl-0 last:pr-0 md:first:pl-0 md:last:pr-0"
            >
              <p className="font-manrope text-5xl md:text-6xl font-black text-[#226C3D] leading-none mb-2">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-[#9C8E7C] text-xs font-bold uppercase tracking-[0.15em]">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
