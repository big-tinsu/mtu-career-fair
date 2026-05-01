'use client';

import { motion } from 'framer-motion';
import { PartnerEntity, PartnerTier } from '@/domain/types';
import { fadeInUp, viewportConfig } from '@/lib/animations';

interface PartnersSectionProps {
  partners: PartnerEntity[];
}

const tierConfig: Record<PartnerTier, { label: string; sizeClass: string }> = {
  platinum: { label: 'Platinum Partner', sizeClass: 'text-[13vw] md:text-[10vw] lg:text-[9vw]' },
  gold:     { label: 'Gold Partners',    sizeClass: 'text-[8vw] md:text-[6vw] lg:text-[5.5vw]' },
  silver:   { label: 'Silver Partners',  sizeClass: 'text-[5vw] md:text-[3.8vw] lg:text-[3.4vw]' },
  media:    { label: 'Media Partners',   sizeClass: 'text-[3.5vw] md:text-[2.8vw] lg:text-[2.4vw]' },
};

export function PartnersSection({ partners }: PartnersSectionProps) {
  const tiers = (['platinum', 'gold', 'silver', 'media'] as PartnerTier[]).filter(tier =>
    partners.some(p => p.tier === tier),
  );

  const allNames = partners.map(p => p.name);

  return (
    <section id="partners" className="bg-white overflow-hidden">
      {/* Header */}
      <div className="px-6 md:px-12 lg:px-20 xl:px-28 pt-24 md:pt-32 pb-16 md:pb-20">
        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={viewportConfig}>
          <p className="text-[#226C3D] text-xs font-bold uppercase tracking-[0.25em] mb-5">
            Official Partners & Sponsors
          </p>
          <h2
            className="font-instrument italic text-[#1A1A1A] leading-[0.92]"
            style={{ fontSize: 'clamp(2.8rem, 7vw, 7rem)' }}
          >
            Backed by those<br />who believe in you.
          </h2>
        </motion.div>
      </div>

      {/* Tier rows */}
      {tiers.map((tier, tierIdx) => {
        const { label, sizeClass } = tierConfig[tier];
        const tierPartners = partners.filter(p => p.tier === tier);
        const isEven = tierIdx % 2 === 0;

        return (
          <motion.div
            key={tier}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.65, delay: tierIdx * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className={`border-t border-[#E8D9BE] ${isEven ? 'bg-white' : 'bg-[#F2E4CC]/40'}`}
          >
            <div className="px-6 md:px-12 lg:px-20 xl:px-28 py-8 md:py-10">
              <p className="text-[#9C8E7C] text-[10px] font-bold uppercase tracking-[0.25em] mb-4">
                {label}
              </p>
              <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
                {tierPartners.map((partner, i) => (
                  <span key={partner.id}>
                    <a
                      href={partner.website ?? '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`font-instrument italic leading-none transition-opacity hover:opacity-60 ${sizeClass}`}
                      style={{ color: partner.logoColor ?? '#1A1A1A' }}
                    >
                      {partner.name}
                    </a>
                    {i < tierPartners.length - 1 && (
                      <span className="text-[#C4B89E] mx-2 text-2xl align-middle">·</span>
                    )}
                  </span>
                ))}
              </div>
              {tierPartners[0]?.description && (
                <p className="text-[#9C8E7C] text-xs mt-3">{tierPartners[0].description}</p>
              )}
            </div>
          </motion.div>
        );
      })}

      {/* Scrolling marquee */}
      <div className="border-t border-[#E8D9BE] bg-[#F2E4CC]/30 py-5 overflow-hidden">
        <div
          className="flex whitespace-nowrap"
          style={{ animation: 'marquee 22s linear infinite' }}
        >
          {[...allNames, ...allNames, ...allNames, ...allNames].map((name, i) => (
            <span
              key={i}
              className="flex-shrink-0 font-instrument italic text-3xl md:text-4xl text-[#1A1A1A]/15 mx-8"
            >
              {name}
              <span className="mx-5 text-[#C4B89E]/50">·</span>
            </span>
          ))}
        </div>
      </div>

      <div className="border-t border-[#E8D9BE] bg-white py-5 overflow-hidden">
        <div
          className="flex whitespace-nowrap"
          style={{ animation: 'marquee-reverse 30s linear infinite' }}
        >
          {[...allNames, ...allNames, ...allNames, ...allNames].map((name, i) => (
            <span
              key={i}
              className="flex-shrink-0 font-instrument italic text-3xl md:text-4xl text-[#226C3D]/10 mx-8"
            >
              {name}
              <span className="mx-5 text-[#C4B89E]/30">·</span>
            </span>
          ))}
        </div>
      </div>

      <div className="pb-24 md:pb-32" />
    </section>
  );
}
