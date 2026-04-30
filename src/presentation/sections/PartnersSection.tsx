'use client';

import { motion } from 'framer-motion';
import { PartnerEntity } from '@/domain/types';
import { fadeInUp, viewportConfig } from '@/lib/animations';
import { PartnerLogoGrid } from '../ui/PartnerLogoGrid';
import { WordReveal } from '../ui/WordReveal';

interface PartnersSectionProps {
  partners: PartnerEntity[];
}

export function PartnersSection({ partners }: PartnersSectionProps) {
  return (
    <section id="partners" className="py-24 md:py-32 bg-[#F2E4CC]">
      <div className="layout">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mb-16"
        >
          <p className="text-[#226C3D] text-xs font-bold uppercase tracking-[0.2em] mb-4">
            Official Partners & Sponsors
          </p>
          <h2 className="font-manrope text-4xl md:text-5xl lg:text-6xl font-black text-[#1A1A1A] leading-[1.02] tracking-tight max-w-2xl">
            <WordReveal text="Backed by organisations that believe in you." />
          </h2>
        </motion.div>

        <PartnerLogoGrid partners={partners} />
      </div>
    </section>
  );
}
