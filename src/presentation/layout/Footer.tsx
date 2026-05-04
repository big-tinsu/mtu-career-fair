'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiInstagram } from 'react-icons/fi';
import { EventEntity } from '@/domain/types';

interface FooterProps {
  event: EventEntity;
}

const SPEAKER_PHOTOS = [
  { src: '/images/speakers/speaker.jpeg',  name: 'Speaker 1', h: 220, color: '#226C3D' },
  { src: '/images/speakers/speaker2.jpeg', name: 'Speaker 2', h: 290, color: '#8B6914' },
  { src: '/images/speakers/speaker3.jpg',  name: 'Speaker 3', h: 250, color: '#1A5430' },
  { src: '/images/speakers/speaker4.JPG',  name: 'Speaker 4', h: 310, color: '#4A7C3F' },
  { src: '/images/speakers/speaker5.jpg',  name: 'Speaker 5', h: 260, color: '#226C3D' },
];

export function Footer({ event }: FooterProps) {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail]         = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Navigate to registration page with prefilled values
    window.location.href = `/events/${event.slug}/register?name=${encodeURIComponent(firstName)}&email=${encodeURIComponent(email)}`;
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
            {/* {event.socialLinks?.twitter && (
              <a
                href={event.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[#1A1A1A]/60 hover:text-[#1A1A1A] transition-colors text-sm font-medium"
              >
                <FiTwitter size={16} /> Twitter
              </a>
            )} */}
          </div>
        </div>

        {/* Right: email sign-up form */}
        <div className="flex-shrink-0" style={{ width: 'clamp(280px, 36vw, 480px)' }}>
          <p className="text-[#226C3D] text-[10px] font-bold uppercase tracking-[0.28em] mb-4">
            Stay in the loop
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                className="flex-1 bg-white border-2 border-[#D5C9B3] rounded-full px-5 py-3.5 text-sm text-[#1A1A1A] placeholder:text-[#9C8E7C] focus:outline-none focus:border-[#226C3D] transition-colors"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="flex-1 bg-white border-2 border-[#D5C9B3] rounded-full px-5 py-3.5 text-sm text-[#1A1A1A] placeholder:text-[#9C8E7C] focus:outline-none focus:border-[#226C3D] transition-colors"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#226C3D] text-[#F2E4CC] font-bold text-sm py-4 rounded-full hover:bg-[#1A5430] transition-colors"
            >
              Register for Free
            </button>
          </form>

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

      {/* ── Speaker photo strip ──────────────────────────────────── */}
      {/* <div className="flex items-end w-full overflow-hidden">
        {SPEAKER_PHOTOS.map((photo) => (
          <div
            key={photo.src}
            className="relative flex-1 flex-shrink-0 overflow-hidden"
            style={{ height: photo.h, backgroundColor: photo.color }}
          >
            <Image
              src={photo.src}
              alt={photo.name}
              fill
              className="object-cover object-top"
              sizes="20vw"
            />
          </div>
        ))}
      </div> */}

      {/* ── Copyright bar ────────────────────────────────────────── */}
      <div
        className="flex items-center justify-between border-t border-[#D5C9B3]"
        style={{ padding: '1rem clamp(2rem, 6vw, 5rem)' }}
      >
        <p className="text-[#9C8E7C] text-xs">
          © 2026 AURA Career Fair · MTU Students' Representative Council
        </p>
        <p className="text-[#9C8E7C] text-xs">
          May 11, 2026 · Ogun State, Nigeria
        </p>
      </div>

    </footer>
  );
}
