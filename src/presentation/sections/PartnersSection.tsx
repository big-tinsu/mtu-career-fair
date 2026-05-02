'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import { PartnerEntity } from '@/domain/types';
import { viewportConfig } from '@/lib/animations';

interface PartnersSectionProps {
  partners: PartnerEntity[];
}

// Alternating card background colours for the grid slots
const CARD_BG = ['#F2E4CC', '#226C3D', '#1A5430', '#8B6914', '#F2E4CC', '#226C3D'];

function PartnerCard({
  partner,
  idx,
}: {
  partner: PartnerEntity;
  idx: number;
}) {
  const bg      = CARD_BG[idx % CARD_BG.length];
  const isDark  = bg !== '#F2E4CC';
  const border  = isDark ? '#1A1A1A' : '#C4B89E';

  return (
    <motion.a
      href={partner.website ?? '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="relative group flex flex-col rounded-2xl overflow-hidden focus:outline-none"
      style={{ backgroundColor: bg, minHeight: 200 }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportConfig}
      transition={{ duration: 0.6, delay: idx * 0.07, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Card border */}
      <div
        className="absolute inset-0 pointer-events-none z-10 rounded-2xl"
        style={{ border: `2px solid ${border}` }}
      />

      {/* Logo or name */}
      <div className="flex-1 flex items-center justify-center p-8">
        {partner.logo ? (
          <div className="relative w-full" style={{ height: 90 }}>
            <Image
              src={partner.logo}
              alt={partner.name}
              fill
              className="object-contain transition-transform duration-500 group-hover:scale-[1.05]"
            />
          </div>
        ) : (
          <p
            className="font-instrument italic text-center leading-tight"
            style={{
              fontSize: 'clamp(1.6rem, 3vw, 2.8rem)',
              color: isDark ? '#F2E4CC' : '#1A1A1A',
            }}
          >
            {partner.name}
          </p>
        )}
      </div>

      {/* Name badge */}
      <div className="px-4 pb-5 flex justify-center z-10 relative">
        <span
          className="px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest whitespace-nowrap shadow-sm"
          style={{
            backgroundColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.08)',
            color: isDark ? '#F2E4CC' : '#1A1A1A',
          }}
        >
          {partner.description ?? partner.name}
        </span>
      </div>
    </motion.a>
  );
}

export function PartnersSection({ partners }: PartnersSectionProps) {
  // Show up to 6 partners in the grid; prioritise those with logos
  const withLogo    = partners.filter(p => p.logo);
  const withoutLogo = partners.filter(p => !p.logo);
  const gridPartners = [...withLogo, ...withoutLogo].slice(0, 6);

  return (
    <section id="partners" className="bg-[#F2E4CC] overflow-hidden" style={{ paddingTop: 0, paddingBottom: 0 }}>
      <div className="flex min-h-[70vh]">

        {/* ── Left info panel ─────────────────────────── */}
        <div
          className="flex-shrink-0 flex flex-col justify-center"
          style={{
            width: 'clamp(260px, 30vw, 380px)',
            padding: 'clamp(2.5rem, 5vw, 4.5rem)',
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[#226C3D] text-[10px] font-bold uppercase tracking-[0.3em] mb-6">
              Official Partners
            </p>
            <h2
              className="font-instrument italic text-[#1A1A1A] leading-[0.88] mb-6"
              style={{ fontSize: 'clamp(2rem, 3.8vw, 3.6rem)' }}
            >
              Backed by<br />those who<br />believe in you.
            </h2>
            <p className="text-[#5C5046] text-sm leading-relaxed mb-10">
              Industry-leading organisations supporting the next generation of Nigerian professionals.
            </p>
            <Link href="register">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2.5 bg-[#226C3D] text-[#F2E4CC] font-bold text-sm px-6 py-3.5 rounded-full"
              >
                Register Free <FiArrowRight size={14} />
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* ── 2×3 Partner grid ────────────────────────── */}
        <div
          className="flex-1 grid gap-4"
          style={{
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: 'repeat(2, 1fr)',
            padding: 'clamp(1.5rem, 4vw, 3rem)',
            alignContent: 'center',
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
