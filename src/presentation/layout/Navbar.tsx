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
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

export function Navbar({ event }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'py-3 bg-[rgba(4,0,25,0.85)] backdrop-blur-xl border-b border-white/[0.06]'
            : 'py-5 bg-transparent',
        )}
      >
        <div className="layout flex items-center justify-between gap-4">
          <Link href={`/events/${event.slug}`} className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6F00FF] to-[#08BFFF] flex items-center justify-center text-white font-bold text-sm shadow-[0_0_16px_rgba(111,0,255,0.4)]">
              M
            </div>
            <span className="text-white font-semibold text-sm hidden sm:block group-hover:text-white/80 transition-colors">
              MTU Career Fair
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="px-4 py-2 text-sm text-white/60 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-150 cursor-pointer"
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
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 text-white/70 hover:text-white hover:bg-white/10 transition-all"
              aria-label="Menu"
            >
              {menuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[60px] z-40 md:hidden bg-[rgba(4,0,25,0.97)] backdrop-blur-xl border-b border-white/[0.06] px-4 py-4 space-y-1"
          >
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => { scrollTo(link.href); setMenuOpen(false); }}
                className="w-full text-left px-4 py-3 text-white/70 hover:text-white rounded-xl hover:bg-white/5 transition-all text-sm"
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
