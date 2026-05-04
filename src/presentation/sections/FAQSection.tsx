'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { viewportConfig } from '@/lib/animations';

const FAQS = [
  {
    q: 'Is registration free?',
    a: 'Yes — attendance is completely free for all MTU students and graduates. Simply register online to secure your spot before capacity fills up.',
  },
  {
    q: 'What should I bring on the day?',
    a: 'Bring multiple printed copies of your CV, your student or alumni ID, and dress professionally. A notebook and pen are handy for capturing recruiter contacts.',
  },
  {
    q: 'Which companies will be attending?',
    a: 'We have 20+ organisations confirmed across tech, finance, consulting, engineering, and the public sector. Check the Partners section for the full list of confirmed names.',
  },
  {
    q: 'Can recent graduates attend?',
    a: 'Absolutely. The fair is open to all MTU graduates — not just current students. If you graduated within the last three years, this event is especially for you.',
  },
  {
    q: 'What time does the fair start?',
    a: 'Doors open at 10:00 AM and the event runs until 5:00 PM. Panel talks and CV clinics are scheduled between 11 AM and 3 PM — plan around those.',
  },
  {
    q: 'Where exactly is the venue?',
    a: 'Full venue details and directions are sent in your confirmation email once you register. The location is on the MTU main campus — watch your inbox.',
  },
];

const TAB_H = 28;

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-[#F2E4CC] overflow-hidden">

      {/* ── Heading ── */}
      <motion.div
        className="text-center px-6"
        style={{ paddingTop: 'clamp(5rem, 9vw, 8rem)', paddingBottom: 'clamp(3rem, 6vw, 5rem)' }}
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportConfig}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      >
        <p
          className="font-bold uppercase mb-5"
          style={{ color: '#226C3D', fontSize: 10, letterSpacing: '0.3em' }}
        >
          Got Questions?
        </p>

        <div
          style={{
            fontFamily: '"Instrument Serif", Georgia, serif',
            fontStyle: 'italic',
            fontSize: 'clamp(2.8rem, 6vw, 6rem)',
            lineHeight: 1,
            color: '#1A1A1A',
          }}
        >
          Frequently Asked
        </div>

        <div style={{ marginTop: '0.12em' }}>
          <span
            style={{
              display: 'inline-block',
              backgroundColor: '#C9A227',
              borderRadius: 12,
              padding: '0.06em 0.3em',
              fontFamily: '"Instrument Serif", Georgia, serif',
              fontStyle: 'italic',
              fontSize: 'clamp(2.8rem, 6vw, 6rem)',
              lineHeight: 1.1,
              color: '#F2E4CC',
            }}
          >
            Questions
          </span>
        </div>
      </motion.div>

      {/* ── Body: photo + accordion ── */}
      <div
        className="flex"
        style={{
          gap: 'clamp(2rem, 5vw, 4rem)',
          paddingBottom: 'clamp(4rem, 8vw, 7rem)',
          paddingLeft: 'clamp(2rem, 8vw, 8rem)',
          paddingRight: 'clamp(2rem, 8vw, 8rem)',
          alignItems: 'flex-start',
        }}
      >

        {/* Left: sticky photo */}
        <motion.div
          className="hidden md:block flex-shrink-0"
          style={{ width: '38%', position: 'sticky', top: '7rem' }}
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            style={{
              position: 'relative',
              borderRadius: 28,
              overflow: 'hidden',
              aspectRatio: '3/4',
              border: '3px solid #1A1A1A',
              boxShadow: '6px 6px 0 #1A1A1A',
            }}
          >
            <Image
              src="/images/imagetwo.jpeg"
              alt="AURA Career Fair"
              fill
              className="object-cover"
              sizes="40vw"
            />
            {/* Gold label overlay */}
            <div
              className="absolute bottom-5 left-5"
              style={{
                backgroundColor: '#C9A227',
                borderRadius: 8,
                padding: '6px 14px',
              }}
            >
              <span
                style={{
                  fontFamily: '"Instrument Serif", Georgia, serif',
                  fontStyle: 'italic',
                  fontSize: '1.05rem',
                  color: '#F2E4CC',
                }}
              >
                AURA 2026
              </span>
            </div>
          </div>
        </motion.div>

        {/* Right: folder-tab accordion */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: `${TAB_H + 10}px`,
            paddingTop: `${TAB_H}px`,
          }}
        >
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportConfig}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                style={{ position: 'relative' }}
              >
                {/* Folder tab */}
                <div
                  style={{
                    position: 'absolute',
                    top: -TAB_H,
                    left: 0,
                    height: TAB_H + 2,
                    paddingLeft: 16,
                    paddingRight: 16,
                    backgroundColor: isOpen ? '#C9A227' : '#DDB84E',
                    borderRadius: '8px 8px 0 0',
                    display: 'flex',
                    alignItems: 'center',
                    border: '1.5px solid #1A1A1A',
                    borderBottom: 'none',
                    zIndex: 2,
                    transition: 'background-color 0.25s ease',
                  }}
                >
                  <span
                    style={{
                      fontFamily: '"Instrument Serif", Georgia, serif',
                      fontStyle: 'italic',
                      fontSize: '0.82rem',
                      color: isOpen ? '#F2E4CC' : '#5C3E06',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Question row */}
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full text-left"
                  style={{
                    backgroundColor: isOpen ? '#C9A227' : '#F5ECD6',
                    border: '1.5px solid #1A1A1A',
                    padding: '20px 22px',
                    position: 'relative',
                    zIndex: 1,
                    transition: 'background-color 0.25s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 16,
                  }}
                >
                  <span
                    style={{
                      fontFamily: '"Instrument Serif", Georgia, serif',
                      fontStyle: 'italic',
                      fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                      color: isOpen ? '#F2E4CC' : '#1A1A1A',
                      lineHeight: 1.25,
                      transition: 'color 0.25s ease',
                    }}
                  >
                    {faq.q}
                  </span>

                  <span
                    style={{
                      flexShrink: 0,
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      border: `2px solid ${isOpen ? '#F2E4CC' : '#1A1A1A'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.4rem',
                      lineHeight: 1,
                      color: isOpen ? '#F2E4CC' : '#1A1A1A',
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease, color 0.25s ease, border-color 0.25s ease',
                    }}
                  >
                    +
                  </span>
                </button>

                {/* Answer */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        overflow: 'hidden',
                        backgroundColor: '#C9A227',
                        borderLeft: '1.5px solid #1A1A1A',
                        borderRight: '1.5px solid #1A1A1A',
                        borderBottom: '1.5px solid #1A1A1A',
                      }}
                    >
                      <p
                        style={{
                          padding: '16px 22px 22px',
                          fontSize: '0.9rem',
                          color: 'rgba(242,228,204,0.9)',
                          lineHeight: 1.65,
                        }}
                      >
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
