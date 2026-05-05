'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { PartnerEntity, PartnerTier } from '@/domain/types';
import { fadeInUp, staggerContainer, viewportConfig } from '@/lib/animations';
import { cn } from '@/lib/utils';

interface PartnerLogoGridProps {
  partners: PartnerEntity[];
}

const tierConfig: Record<PartnerTier, { label: string; cardH: string; textSize: string; order: number }> = {
  platinum: { label: 'Platinum Partners', cardH: 'h-24', textSize: 'text-2xl font-bold', order: 1 },
  gold: { label: 'Gold Partners', cardH: 'h-20', textSize: 'text-xl font-semibold', order: 2 },
  silver: { label: 'Silver Partners', cardH: 'h-16', textSize: 'text-base font-medium', order: 3 },
  media: { label: 'Media Partners', cardH: 'h-14', textSize: 'text-sm font-medium', order: 4 },
};

function PartnerCard({ partner, cardH, textSize }: { partner: PartnerEntity; cardH: string; textSize: string }) {
  const inner = partner.logo ? (
    <div className="relative w-28 h-10">
      <Image src={partner.logo} alt={partner.name} fill className="object-contain" />
    </div>
  ) : (
    <span className={cn('font-manrope tracking-tight', textSize)} style={{ color: partner.logoColor ?? '#226C3D' }}>
      {partner.name}
    </span>
  );

  const sharedClass = cn(
    'flex items-center justify-center px-8 rounded-2xl min-w-[140px]',
    'bg-white border border-[#E8D9BE]',
    'shadow-[0_2px_8px_rgba(28,28,28,0.05)]',
    'transition-all duration-200',
    cardH,
  );

  if (!partner.website) {
    return (
      <motion.div variants={fadeInUp} className={sharedClass}>
        {inner}
      </motion.div>
    );
  }

  return (
    <motion.a
      variants={fadeInUp}
      href={partner.website}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.03, y: -2, transition: { duration: 0.2 } }}
      className={cn(sharedClass, 'hover:border-[rgba(34,108,61,0.3)] hover:shadow-[0_6px_20px_rgba(28,28,28,0.1)] cursor-pointer')}
    >
      {inner}
    </motion.a>
  );
}

export function PartnerLogoGrid({ partners }: PartnerLogoGridProps) {
  const tiers = (['platinum', 'gold', 'silver', 'media'] as PartnerTier[]).filter((tier) =>
    partners.some((p) => p.tier === tier),
  );

  return (
    <div className="space-y-12">
      {tiers.map((tier) => {
        const { label, cardH, textSize } = tierConfig[tier];
        const tierPartners = partners.filter((p) => p.tier === tier);

        return (
          <div key={tier}>
            <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-[#9C8E7C] mb-6">
              {label}
            </p>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="flex flex-wrap justify-center gap-4"
            >
              {tierPartners.map((partner) => (
                <PartnerCard key={partner.id} partner={partner} cardH={cardH} textSize={textSize} />
              ))}
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
