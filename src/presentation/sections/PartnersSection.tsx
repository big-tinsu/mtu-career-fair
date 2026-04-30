'use client';

import { motion } from 'framer-motion';
import { PartnerEntity } from '@/domain/types';
import { fadeInUp, viewportConfig } from '@/lib/animations';
import { PartnerLogoGrid } from '../ui/PartnerLogoGrid';

interface PartnersSectionProps {
  partners: PartnerEntity[];
}

export function PartnersSection({ partners }: PartnersSectionProps) {
  return (
    <section id="partners" className="py-24 md:py-32 bg-[rgba(111,0,255,0.03)]">
      <div className="layout">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C192FF] mb-4">
            Our Partners
          </p>
          <h2 className="font-figtree text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            Backed by{' '}
            <span className="bg-gradient-to-r from-[#6F00FF] to-[#08BFFF] bg-clip-text text-transparent">
              industry leaders
            </span>
          </h2>
          <p className="text-white/40 text-base max-w-xl mx-auto">
            Over 80 companies across tech, engineering, automotive, aerospace, and energy are actively
            recruiting at this event.
          </p>
        </motion.div>

        <PartnerLogoGrid partners={partners} />
      </div>
    </section>
  );
}
