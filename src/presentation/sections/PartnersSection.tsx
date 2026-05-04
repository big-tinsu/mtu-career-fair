'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { PartnerEntity } from '@/domain/types';
import { viewportConfig } from '@/lib/animations';

interface PartnersSectionProps {
  partners: PartnerEntity[];
}

const CARD_COLORS = [
  '#226C3D',
  '#C9A227',
  '#1A5430',
  '#8B6914',
  '#2D5A3D',
  '#A07C18',
];

function PartnerCard({ partner, idx }: { partner: PartnerEntity; idx: number }) {
  const bg = CARD_COLORS[idx % CARD_COLORS.length];

  return (
    <motion.a
      href={partner.website ?? '#'}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.88, y: 12 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={viewportConfig}
      transition={{ duration: 0.5, delay: idx * 0.07, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -5, scale: 1.03 }}
      className="focus:outline-none"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: bg,
        borderRadius: 22,
        padding: '22px 16px 14px',
        aspectRatio: '1 / 1.15',
        overflow: 'hidden',
        cursor: 'pointer',
        textDecoration: 'none',
        boxShadow: '0 4px 0 rgba(0,0,0,0.35)',
      }}
    >
      {/* Logo or name in center */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        {partner.logo ? (
          <div
            style={{
              position: 'relative',
              width: '88%',
              height: 90,
              backgroundColor: 'rgba(255,255,255,0.15)',
              borderRadius: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '8px 12px',
            }}
          >
            <Image
              src={partner.logo}
              alt={partner.name}
              fill
              className="object-cover"
              style={{ padding: '8px 12px' }}
              sizes="320px"
            />
          </div>
        ) : (
          <p
            style={{
              fontFamily: '"Instrument Serif", Georgia, serif',
              fontStyle: 'italic',
              fontSize: 'clamp(1rem, 1.6vw, 1.4rem)',
              color: 'rgba(255,255,255,0.92)',
              textAlign: 'center',
              lineHeight: 1.2,
              padding: '0 8px',
            }}
          >
            {partner.name}
          </p>
        )}
      </div>

      {/* White pill label */}
      <div
        style={{
          backgroundColor: 'rgba(255,255,255,0.95)',
          borderRadius: 100,
          padding: '5px 14px',
          marginTop: 14,
          maxWidth: '100%',
          overflow: 'hidden',
        }}
      >
        <p
          style={{
            fontFamily: '"Instrument Serif", Georgia, serif',
            fontStyle: 'italic',
            fontSize: '0.8rem',
            color: '#1A1A1A',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            textAlign: 'center',
          }}
        >
          {partner.name}
        </p>
      </div>
    </motion.a>
  );
}

export function PartnersSection({ partners }: PartnersSectionProps) {
  const withLogo    = partners.filter(p => p.logo);
  const withoutLogo = partners.filter(p => !p.logo);
  const gridPartners = [...withLogo, ...withoutLogo].slice(0, 6);

  return (
    <section id="partners" className="bg-[#F2E4CC] overflow-hidden">
      <div className="flex min-h-[75vh] items-center">

        {/* ── Left: 50% info panel ── */}
        <motion.div
          className="flex flex-col justify-center"
          style={{
            width: '50%',
            padding: 'clamp(3rem, 6vw, 6rem)',
            flexShrink: 0,
          }}
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-[#226C3D] text-[10px] font-bold uppercase tracking-[0.3em] mb-6">
            Official Partners
          </p>

          <h2
            className="text-[#1A1A1A] leading-[0.9] mb-6"
            style={{
              fontFamily: '"Instrument Serif", Georgia, serif',
              fontStyle: 'italic',
              fontSize: 'clamp(2.8rem, 5vw, 5.5rem)',
            }}
          >
            Backed by those<br />who
            {' '}
            <span
              style={{
                display: 'inline',
                backgroundColor: '#C9A227',
                color: '#F2E4CC',
                padding: '0.05em 0.25em',
                borderRadius: 8,
              }}
            >
              believe in you.
            </span>
          </h2>

          <p className="text-[#5C5046] text-sm leading-relaxed mb-10" style={{ maxWidth: 380 }}>
            Industry-leading organisations supporting the next generation of Nigerian professionals.
          </p>

          <Link href="register">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2.5 bg-[#226C3D] text-[#F2E4CC] font-bold text-sm px-7 py-3.5 rounded-full w-fit"
              style={{ boxShadow: '0 4px 0 #1A5430' }}
            >
              Register Free →
            </motion.button>
          </Link>
        </motion.div>

        {/* ── Right: 3×2 colorful grid ── */}
        <div
          style={{
            width: '50%',
            flexShrink: 0,
            padding: 'clamp(2rem, 4vw, 4rem) clamp(2rem, 4vw, 4rem) clamp(2rem, 4vw, 4rem) 0',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 12,
          }}
        >
          {gridPartners.map((partner, idx) => (
            <PartnerCard key={partner.id} partner={partner} idx={idx} />
          ))}
        </div>

      </div>
    </section>
  );
}
