'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { EventEntity } from '@/domain/types';
import { cn } from '@/lib/utils';

interface NavbarProps {
  event: EventEntity;
}

const navLinks = [
  { label: 'About', href: '#about', isAnchor: true },
  { label: 'Speakers', href: '#speakers', isAnchor: true },
  { label: 'Partners', href: '#partners', isAnchor: true },
  { label: 'Register', href: 'register', isAnchor: false },
];

const primaryLinks = navLinks.filter((link) => link.isAnchor);

export function Navbar({ event }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleAnchorClick = (href: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }, 320);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-[#F2E4CC]/95 backdrop-blur-xl border-b border-[#E3D4B5] shadow-[0_6px_24px_rgba(28,28,28,0.12)]'
            : 'bg-[#F2E4CC] border-b border-[#E3D4B5]',
        )}
      >
        <div className="grid grid-cols-3 items-center px-5 sm:px-8 md:px-12 lg:px-16 h-16 md:h-20">
          {/* Left: Links (desktop) / Menu toggle (mobile) */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-[#1A1A1A]"
            >
              <span className="text-lg leading-none font-light">{menuOpen ? '×' : '≡'}</span>
              <span>{menuOpen ? 'Close' : 'Menu'}</span>
            </button>
            <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#1A1A1A]">
              {primaryLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleAnchorClick(link.href)}
                  className="transition-colors hover:text-[#226C3D]"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Center: Brand */}
          <Link
            href={`/events/${event.slug}`}
            onClick={() => setMenuOpen(false)}
            className="justify-self-center text-2xl md:text-3xl lg:text-4xl leading-none tracking-[0.12em] text-[#1A1A1A] transition-transform hover:scale-[1.02]"
            style={{ fontFamily: '"Anton", "Inter", system-ui, sans-serif' }}
          >
            AURA
          </Link>

          {/* Right: Register CTA */}
          <div className="flex justify-end">
            <Link
              href={'https://luma.com/j281yy78'}
              className="inline-flex items-center rounded-full border-2 border-[#1A1A1A] bg-[#226C3D] px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#F2E4CC] shadow-[0_4px_0_#1A1A1A] transition-transform hover:-translate-y-0.5"
            >
              Buy Tickets
            </Link>
          </div>
        </div>
      </motion.header>

      {/* Full-screen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#F2E4CC] flex flex-col pt-20 md:pt-24 overflow-y-auto"
          >
            {/* Links */}
            <nav className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-8">
              {navLinks.map(({ label, href, isAnchor }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.45, delay: 0.06 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  className="border-b border-[#E0D1B5] first:border-t"
                >
                  {isAnchor ? (
                    <button
                      onClick={() => handleAnchorClick(href)}
                      className="w-full text-left py-5 md:py-6 group flex items-center justify-between"
                    >
                      <span className="font-instrument italic text-[11vw] md:text-[8vw] lg:text-[7vw] text-[#1A1A1A] group-hover:text-[#226C3D] leading-none transition-colors">
                        {label}
                      </span>
                      <span className="text-[#9C8E7C] text-2xl md:text-3xl group-hover:text-[#226C3D] group-hover:translate-x-1 transition-all">
                        →
                      </span>
                    </button>
                  ) : (
                    <Link
                      href={`/events/${event.slug}/${href}`}
                      onClick={() => setMenuOpen(false)}
                      className="w-full text-left py-5 md:py-6 group flex items-center justify-between"
                    >
                      <span className="font-instrument italic text-[11vw] md:text-[8vw] lg:text-[7vw] text-[#226C3D] leading-none transition-colors group-hover:text-[#1A5430]">
                        {label}
                      </span>
                      <span className="text-[#226C3D] text-2xl md:text-3xl group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </Link>
                  )}
                </motion.div>
              ))}
            </nav>

            {/* Bottom info bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              className="px-8 md:px-16 lg:px-24 py-6 md:py-8 flex flex-wrap items-end justify-between gap-4 border-t border-[#E0D1B5]"
            >
              <div>
                <p className="text-[#9C8E7C] text-[10px] font-bold uppercase tracking-[0.2em] mb-1">Presented by</p>
                <p className="text-[#1A1A1A] text-sm font-semibold">MTU & Students&apos; Representative Council</p>
              </div>
              <div className="text-right">
                <p className="text-[#9C8E7C] text-[10px] font-bold uppercase tracking-[0.2em] mb-1">Date & Venue</p>
                <p className="text-[#1A1A1A] text-sm font-semibold">May 11, 2026 · MTU Multi-Purpose Hall</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
