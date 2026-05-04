'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { EventEntity } from '@/domain/types';
import { viewportConfig } from '@/lib/animations';

interface AboutSectionProps {
  event: EventEntity;
}

const TOP_BARS = [
  { color: '#C9A227', h: 95  },
  { color: '#226C3D', h: 120 },
  { color: '#F2E4CC', h: 80  },
  { color: '#C9A227', h: 105 },
  { color: '#1A5430', h: 90  },
  { color: '#F2E4CC', h: 110 },
  { color: '#C9A227', h: 85  },
  { color: '#226C3D', h: 100 },
  { color: '#C9A227', h: 95  },
];

// Photos positioned inside the frame — negative left/right values get clipped by overflow:hidden
const LEFT_PHOTOS = [
  { src: '/images/speakers/speaker.jpeg',  top: -20,  left: -30, w: 190, h: 165, rotate: -5, accent: '#C9A227' },
  { src: '/images/speakers/speaker2.jpeg', top: 220,  left: -20, w: 200, h: 215, rotate: -2, accent: '#226C3D' },
  // { src: '/images/speakers/speaker3.jpg',  top: 440,  left: -25, w: 185, h: 190, rotate: 4,  accent: '#F2E4CC' },
];

const RIGHT_PHOTOS = [
  { src: '/images/speakers/speaker4.JPG',  top: -15, right: -25, w: 200, h: 180, rotate: 4,  accent: '#226C3D' },
  { src: '/images/speakers/speaker5.jpg',  top: 210, right: -15, w: 200, h: 215, rotate: -3, accent: '#C9A227' },
  // { src: '/images/imageone.jpeg',          top: 440, right: -30, w: 185, h: 190, rotate: 5,  accent: '#F2E4CC' },
];

const DIAG_BARS = [
  { color: '#C9A227', h: 260 },
  { color: '#226C3D', h: 230 },
  { color: '#F2E4CC', h: 210 },
  { color: '#C9A227', h: 180 },
];

export function AboutSection({ event }: AboutSectionProps) {
  return (
    <section id="about" className="bg-[#1A1A1A] relative overflow-hidden">

      {/* ── Top vertical bars hanging from the section top ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 flex gap-2.5 z-10">
        {TOP_BARS.map(({ color, h }, i) => (
          <motion.div
            key={i}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={viewportConfig}
            transition={{ duration: 0.55, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            style={{ width: 28, height: h, backgroundColor: color, borderRadius: '0 0 8px 8px', transformOrigin: 'top' }}
          />
        ))}
      </div>

      {/* ── Bottom-right diagonal stripes ── */}
      <div
        className="absolute z-0 flex gap-3"
        style={{ bottom: -80, right: -60, transform: 'rotate(-32deg)', transformOrigin: 'bottom right' }}
      >
        {DIAG_BARS.map(({ color, h }, i) => (
          <motion.div
            key={i}
            initial={{ scaleY: 0, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            viewport={viewportConfig}
            transition={{ duration: 0.55, delay: i * 0.07 }}
            style={{ width: 28, height: h, backgroundColor: color, borderRadius: '8px 8px 0 0', transformOrigin: 'bottom' }}
          />
        ))}
      </div>

      {/* ── Outer wrapper for tag positioning (no overflow clip here) ── */}
      <div
        className="relative"
        style={{
          marginTop: 130,
          marginBottom: 100,
          marginLeft: 'clamp(4rem, 10vw, 14rem)',
          marginRight: 'clamp(4rem, 10vw, 14rem)',
        }}
      >
        {/* Tag clipping the top border */}
        <div
          className="absolute flex items-center gap-2 z-30"
          style={{
            top: -16, left: 24,
            backgroundColor: '#1A1A1A',
            border: '2px solid #226C3D',
            borderRadius: 0,
            padding: '4px 12px',
          }}
        >
          <div style={{ width: 12, height: 12, border: '2px solid #C9A227', borderRadius: 3 }} />
          <span className="text-[#F2E4CC] text-xs font-medium">About the Event</span>
        </div>

        {/* ── Bordered frame with overflow:hidden to clip photos ── */}
        <div
          className="relative"
          style={{
            border: '2px solid #226C3D',
            borderRadius: 0,
            overflow: 'hidden',
            minHeight: 360,
          }}
        >
          {/* Photos inside the frame — edges get clipped */}
          {LEFT_PHOTOS.map((photo, i) => (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="absolute overflow-hidden z-20"
              style={{
                top: photo.top, left: photo.left,
                width: photo.w, height: photo.h,
                borderRadius: 14,
                transform: `rotate(${photo.rotate}deg)`,
                outline: `4px solid ${photo.accent}`,
                outlineOffset: -2,
              }}
            >
              <Image src={photo.src} alt="" fill className="object-cover object-top" sizes="200px" />
            </motion.div>
          ))}

          {RIGHT_PHOTOS.map((photo, i) => (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="absolute overflow-hidden z-20"
              style={{
                top: photo.top, right: photo.right,
                width: photo.w, height: photo.h,
                borderRadius: 14,
                transform: `rotate(${photo.rotate}deg)`,
                outline: `4px solid ${photo.accent}`,
                outlineOffset: -2,
              }}
            >
              <Image src={photo.src} alt="" fill className="object-cover object-top" sizes="200px" />
            </motion.div>
          ))}

          {/* Centre content */}
          <div
            className="flex flex-col items-center text-center mx-auto relative z-10"
            style={{
              maxWidth: 660,
              paddingTop: 'clamp(3.5rem, 8vw, 7rem)',
              paddingBottom: 'clamp(3.5rem, 8vw, 7rem)',
              paddingLeft: '1.5rem',
              paddingRight: '1.5rem',
            }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-white mb-6"
              style={{
                fontFamily: '"Instrument Serif", Georgia, serif',
                fontStyle: 'italic',
                fontSize: 'clamp(2.2rem, 4.5vw, 4.8rem)',
                lineHeight: 1.05,
              }}
            >
              The No.1 Career Fair for:
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 0 }}
              whileInView={{ opacity: 1, scale: 1, rotate: -2 }}
              viewport={viewportConfig}
              transition={{ duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mb-8"
            >
              <span
                style={{
                  display: 'inline-block',
                  backgroundColor: '#C9A227',
                  borderRadius: 12,
                  padding: '0.18em 0.55em',
                  fontFamily: '"Instrument Serif", Georgia, serif',
                  fontStyle: 'italic',
                  fontSize: 'clamp(1.8rem, 3.8vw, 4rem)',
                  color: '#F2E4CC',
                  lineHeight: 1.15,
                  boxShadow: '0 6px 0 rgba(0,0,0,0.55)',
                }}
              >
                MTU Students &amp; Graduates
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-sm leading-relaxed"
              style={{ color: 'rgba(242,228,204,0.65)', maxWidth: 440 }}
            >
              {event.description}
            </motion.p>
          </div>
        </div>
      </div>

    </section>
  );
}
