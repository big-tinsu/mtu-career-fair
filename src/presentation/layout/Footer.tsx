'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiInstagram } from 'react-icons/fi';
import { EventEntity } from '@/domain/types';

interface FooterProps {
  event: EventEntity;
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export function Footer({ event }: FooterProps) {
  const [name, setName]     = useState('');
  const [email, setEmail]   = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });

      const data: { message?: string; error?: string } = await res.json();

      if (!res.ok) {
        setStatus('error');
        setMessage(data.error ?? 'Something went wrong. Please try again.');
      } else {
        setStatus('success');
        setMessage(data.message ?? "You're in the loop!");
        setName('');
        setEmail('');
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please check your connection and try again.');
    }
  }

  return (
    <footer style={{ backgroundColor: '#F2E4CC' }}>

      {/* ── Main content row ─────────────────────────────────────── */}
      <div
        className="flex flex-col md:flex-row items-start justify-between gap-12 border-b border-[#D5C9B3]"
        style={{ padding: 'clamp(3rem, 6vw, 5rem) clamp(2rem, 6vw, 5rem)' }}
      >
        {/* Left: heading + contact */}
        <div className="flex-1">
          <h2
            className="font-instrument italic text-[#1A1A1A] leading-none mb-5"
            style={{ fontSize: 'clamp(3rem, 6vw, 5rem)' }}
          >
            See You<br />There!
          </h2>
          <p className="text-[#5C5046] text-sm leading-relaxed mb-6" style={{ maxWidth: 320 }}>
            Reach out to the AURA team at{' '}
            <a
              href="mailto:src@mtu.edu.ng"
              className="text-[#226C3D] font-semibold underline underline-offset-2"
            >
              src@mtu.edu.ng
            </a>{' '}
            if you have any questions.
          </p>

          {/* Social links */}
          <div className="flex items-center gap-4">
            {event.socialLinks?.instagram && (
              <a
                href={event.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[#1A1A1A]/60 hover:text-[#1A1A1A] transition-colors text-sm font-medium"
              >
                <FiInstagram size={16} /> Instagram
              </a>
            )}
          </div>
        </div>

        {/* Right: Stay in the loop form */}
        <div className="flex-shrink-0" style={{ width: 'clamp(280px, 36vw, 480px)' }}>
          <p className="text-[#226C3D] text-[10px] font-bold uppercase tracking-[0.28em] mb-4">
            Stay in the loop
          </p>

          {status === 'success' ? (
            <div className="bg-[#226C3D]/10 border border-[#226C3D]/25 rounded-2xl px-6 py-5">
              <p className="text-[#226C3D] font-semibold text-sm leading-relaxed">{message}</p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-3 text-[#226C3D]/60 text-xs underline underline-offset-2 hover:text-[#226C3D] transition-colors"
              >
                Subscribe another email
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  disabled={status === 'loading'}
                  className="flex-1 bg-white border-2 border-[#D5C9B3] rounded-full px-5 py-3.5 text-sm text-[#1A1A1A] placeholder:text-[#9C8E7C] focus:outline-none focus:border-[#226C3D] transition-colors disabled:opacity-60"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  disabled={status === 'loading'}
                  className="flex-1 bg-white border-2 border-[#D5C9B3] rounded-full px-5 py-3.5 text-sm text-[#1A1A1A] placeholder:text-[#9C8E7C] focus:outline-none focus:border-[#226C3D] transition-colors disabled:opacity-60"
                />
              </div>

              {status === 'error' && (
                <p className="text-red-600 text-xs px-1">{message}</p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-[#226C3D] text-[#F2E4CC] font-bold text-sm py-4 rounded-full hover:bg-[#1A5430] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Submitting…' : 'Stay in the Loop'}
              </button>
            </form>
          )}

          {/* Quick links */}
          <div className="flex gap-6 mt-6">
            {['About', 'Speakers', 'Partners'].map(l => (
              <Link
                key={l}
                href={`#${l.toLowerCase()}`}
                className="text-[#5C5046] text-[13px] hover:text-[#1A1A1A] transition-colors"
              >
                {l}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── Copyright bar ────────────────────────────────────────── */}
      <div
        className="flex items-center justify-between border-t border-[#D5C9B3]"
        style={{ padding: '1rem clamp(2rem, 6vw, 5rem)' }}
      >
        <p className="text-[#9C8E7C] text-xs">
          © 2026 AURA Career Fair · MTU Students&apos; Representative Council
        </p>
        <p className="text-[#9C8E7C] text-xs">
          May 11, 2026 · Ogun State, Nigeria
        </p>
      </div>

    </footer>
  );
}
