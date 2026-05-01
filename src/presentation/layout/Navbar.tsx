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

  const isTransparent = !scrolled || menuOpen;

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          !menuOpen && scrolled
            ? 'bg-white/95 backdrop-blur-xl border-b border-[#E8D9BE] shadow-[0_2px_20px_rgba(28,28,28,0.06)]'
            : 'bg-transparent border-b border-transparent',
        )}
      >
        <div className="flex items-center justify-between px-6 md:px-10 lg:px-16 h-16 md:h-20">
          {/* Left: Menu toggle */}
          <button
            onClick={() => setMenuOpen(v => !v)}
            className={cn(
              'flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors z-10',
              menuOpen
                ? 'text-[#1A1A1A]'
                : isTransparent
                  ? 'text-[#F2E4CC]/70 hover:text-[#F2E4CC]'
                  : 'text-[#5C5046] hover:text-[#226C3D]',
            )}
          >
            <span className="text-lg leading-none font-light">{menuOpen ? '×' : '≡'}</span>
            <span>{menuOpen ? 'Close' : 'Menu'}</span>
          </button>

          {/* Center: Brand */}
          <Link
            href={`/events/${event.slug}`}
            onClick={() => setMenuOpen(false)}
            className={cn(
              'font-instrument italic text-2xl md:text-3xl leading-none tracking-tight transition-colors absolute left-1/2 -translate-x-1/2',
              menuOpen
                ? 'text-[#1A1A1A] hover:text-[#226C3D]'
                : isTransparent
                  ? 'text-[#F2E4CC] hover:text-white'
                  : 'text-[#1A1A1A] hover:text-[#226C3D]',
            )}
          >
            AURA
          </Link>

          {/* Right: Register CTA */}
          <Link
            href={`/events/${event.slug}/register`}
            className={cn(
              'flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] transition-all group',
              menuOpen
                ? 'text-[#226C3D] hover:text-[#1A5430]'
                : isTransparent
                  ? 'text-[#F2E4CC]/70 hover:text-[#F2E4CC]'
                  : 'text-[#5C5046] hover:text-[#226C3D]',
            )}
          >
            <span className="hidden sm:inline">Register</span>
            <span className="text-base leading-none transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
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
