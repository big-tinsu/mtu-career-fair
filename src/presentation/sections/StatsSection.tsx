'use client';

import { motion } from 'framer-motion';
import { staggerContainerFast, fadeInUp, viewportConfig } from '@/lib/animations';

interface StatItem {
  label: string;
  value: string;
}

interface StatsSectionProps {
  stats: StatItem[];
}

export function StatsSection({ stats }: StatsSectionProps) {
  return (
    <section className="py-16 border-y border-white/[0.06] bg-[rgba(111,0,255,0.04)]">
      <div className="layout">
        <motion.div
          variants={staggerContainerFast}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeInUp}
              className="text-center"
            >
              <p className="font-figtree text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#6F00FF] via-[#C192FF] to-[#08BFFF] bg-clip-text text-transparent leading-none mb-2">
                {stat.value}
              </p>
              <p className="text-white/40 text-sm font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
