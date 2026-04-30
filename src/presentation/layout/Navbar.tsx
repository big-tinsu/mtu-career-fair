'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FiMenu, FiX } from 'react-icons/fi';
import { EventEntity } from '@/domain/types';
import { cn } from '@/lib/utils';
import { Button } from '../ui/Button';

interface NavbarProps {
  event: EventEntity;
}

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Speakers', href: '#speakers' },
  { label: 'Partners', href: '#partners' },
  { label: 'Agenda', href: '#agenda' },
];

function scrollTo(id: string) {
  document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
}

export function Navbar({ event }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-400',
          scrolled
            ? 'py-3 bg-white/90 backdrop-blur-xl border-b border-[#E8D9BE] shadow-[0_2px_20px_rgba(28,28,28,0.06)]'
            : 'py-5 bg-transparent',
        )}
      >
        <div className="layout flex items-center justify-between gap-4">
          <Link href={`/events/${event.slug}`} className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-[#226C3D] flex items-center justify-center text-white font-bold text-sm shadow-[0_2px_8px_rgba(34,108,61,0.3)]">
              A
            </div>
            <div className="hidden sm:block">
              <span className="text-[#1A1A1A] font-bold text-sm font-manrope leading-tight block group-hover:text-[#226C3D] transition-colors">
                AURA Career Fair
              </span>
              <span className="text-[#9C8E7C] text-[10px] leading-none">Mountain Top University</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="px-4 py-2 text-sm text-[#5C5046] hover:text-[#226C3D] rounded-xl hover:bg-[rgba(34,108,61,0.06)] transition-all duration-150 cursor-pointer font-medium"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link href={`/events/${event.slug}/register`}>
              <Button size="sm">Register Free</Button>
            </Link>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl border border-[#E0D1B5] text-[#5C5046] hover:text-[#226C3D] hover:bg-[rgba(34,108,61,0.06)] transition-all"
            >
              {menuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[64px] z-40 md:hidden bg-white/95 backdrop-blur-xl border-b border-[#E8D9BE] px-4 py-3 space-y-1 shadow-lg"
          >
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => { scrollTo(link.href); setMenuOpen(false); }}
                className="w-full text-left px-4 py-3 text-[#5C5046] hover:text-[#226C3D] rounded-xl hover:bg-[rgba(34,108,61,0.06)] transition-all text-sm font-medium"
              >
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
