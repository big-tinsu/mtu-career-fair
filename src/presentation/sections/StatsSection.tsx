'use client';

import { motion } from 'framer-motion';
import { StatItem } from '@/domain/types';
import { viewportConfig } from '@/lib/animations';
import { CountUp } from '../ui/CountUp';

interface StatsSectionProps {
  stats: StatItem[];
}

const rows = [
  { bg: '#226C3D', numCol: '#F2E4CC', labelCol: 'rgba(242,228,204,0.35)', border: 'rgba(255,255,255,0.08)' },
  { bg: '#F2E4CC',  numCol: '#1A5430', labelCol: '#9C8E7C',                 border: 'rgba(26,26,26,0.08)'  },
  { bg: '#1A5430', numCol: '#F2E4CC', labelCol: 'rgba(242,228,204,0.35)', border: 'rgba(255,255,255,0.06)' },
  { bg: '#FFFFFF',  numCol: '#226C3D', labelCol: '#C4B89E',                 border: 'rgba(26,26,26,0.06)'  },
];

export function StatsSection({ stats }: StatsSectionProps) {
  return (
    <section className="overflow-hidden">
      {stats.map((stat, i) => {
        const { bg, numCol, labelCol, border } = rows[i % rows.length];
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.75, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-between px-8 md:px-16 lg:px-24 xl:px-32 py-6 md:py-8 border-b"
            style={{ backgroundColor: bg, borderColor: border }}
          >
            {/* Stat number */}
            <p
              className="font-instrument italic leading-none tabular-nums select-none"
              style={{ color: numCol, fontSize: 'clamp(4.5rem, 11vw, 9.5rem)' }}
            >
              <CountUp value={stat.value} suffix={stat.suffix} />
            </p>

            {/* Label */}
            <p
              className="text-right font-black uppercase tracking-tighter leading-none"
              style={{ color: labelCol, fontSize: 'clamp(1rem, 2.8vw, 2.4rem)', maxWidth: '38%' }}
            >
              {stat.label}
            </p>
          </motion.div>
        );
      })}
    </section>
  );
}
