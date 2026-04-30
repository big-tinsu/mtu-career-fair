'use client';

import { motion } from 'framer-motion';
import { PartnerEntity, PartnerTier } from '@/domain/types';
import { fadeInUp, staggerContainer, viewportConfig } from '@/lib/animations';
import { cn } from '@/lib/utils';

interface PartnerLogoGridProps {
  partners: PartnerEntity[];
}

const tierConfig: Record<
  PartnerTier,
  { label: string; cardSize: string; textSize: string; order: number }
> = {
  platinum: {
    label: 'Platinum Partners',
    cardSize: 'h-24 min-w-[180px]',
    textSize: 'text-xl font-bold',
    order: 1,
  },
  gold: {
    label: 'Gold Partners',
    cardSize: 'h-20 min-w-[150px]',
    textSize: 'text-lg font-semibold',
    order: 2,
  },
  silver: {
    label: 'Silver Partners',
    cardSize: 'h-16 min-w-[130px]',
    textSize: 'text-base font-medium',
    order: 3,
  },
  media: {
    label: 'Media Partners',
    cardSize: 'h-14 min-w-[120px]',
    textSize: 'text-sm font-medium',
    order: 4,
  },
};

function PartnerCard({ partner, cardSize, textSize }: { partner: PartnerEntity; cardSize: string; textSize: string }) {
  return (
    <motion.a
      variants={fadeInUp}
      href={partner.website ?? '#'}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.04, y: -2 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'flex items-center justify-center px-6 rounded-xl',
        'bg-white/[0.03] border border-white/[0.07]',
        'hover:border-white/[0.15] hover:bg-white/[0.06]',
        'transition-colors duration-200 cursor-pointer',
        cardSize,
      )}
    >
      <span
        className={cn('font-figtree tracking-tight', textSize)}
        style={{ color: partner.logoColor ?? '#ffffff' }}
      >
        {partner.name}
      </span>
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
        const { label, cardSize, textSize } = tierConfig[tier];
        const tierPartners = partners.filter((p) => p.tier === tier);

        return (
          <div key={tier}>
            <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-white/30 mb-6">
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
                <PartnerCard
                  key={partner.id}
                  partner={partner}
                  cardSize={cardSize}
                  textSize={textSize}
                />
              ))}
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
