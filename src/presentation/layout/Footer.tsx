import Link from 'next/link';
import { FiInstagram, FiTwitter, FiMail } from 'react-icons/fi';
import { EventEntity } from '@/domain/types';
import { formatDate } from '@/lib/utils';

interface FooterProps {
  event: EventEntity;
}

export function Footer({ event }: FooterProps) {
  return (
    <footer className="bg-[#1A1A1A] text-white overflow-hidden relative">
      {/* Giant AURA watermark */}
      <div
        className="absolute bottom-0 left-0 leading-none pointer-events-none select-none overflow-hidden"
        aria-hidden
      >
        <p
          className="font-instrument italic text-white/[0.04]"
          style={{ fontSize: 'clamp(8rem, 22vw, 24rem)', lineHeight: 0.85 }}
        >
          AURA
        </p>
      </div>

      <div className="relative z-10">
        {/* Main footer grid */}
        <div className="px-6 md:px-12 lg:px-20 xl:px-28 pt-16 md:pt-20 pb-12 grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <p className="font-instrument italic text-3xl md:text-4xl text-[#F2E4CC] leading-none mb-4">AURA</p>
            <p className="text-white/30 text-xs font-bold uppercase tracking-[0.2em] mb-4">Beyond the Degree</p>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Connecting Mountain Top University students with global career opportunities, mentors, and industry leaders.
            </p>
          </div>

          {/* Event details */}
          <div>
            <p className="text-white/30 text-[10px] font-bold uppercase tracking-[0.2em] mb-5">Event Details</p>
            <ul className="space-y-3">
              <li className="text-white/80 text-sm font-semibold">{formatDate(event.date)}</li>
              <li className="text-white/50 text-sm">{event.time} – {event.endTime}</li>
              <li className="text-white/50 text-sm">{event.location}</li>
              <li className="text-white/30 text-xs leading-relaxed">{event.address}</li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <p className="text-white/30 text-[10px] font-bold uppercase tracking-[0.2em] mb-5">Quick Links</p>
            <ul className="space-y-3">
              {[
                { label: 'Register Now', href: `/events/${event.slug}/register` },
                { label: 'Organizer Dashboard', href: '/admin' },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-white/50 hover:text-white text-sm transition-colors hover:underline"
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="mailto:src@mtu.edu.ng"
                  className="text-white/50 hover:text-white text-sm transition-colors hover:underline"
                >
                  Contact Organisers
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="px-6 md:px-12 lg:px-20 xl:px-28 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/8">
          <p className="text-white/25 text-xs">
            © 2026 {event.organizer.name}. Free to attend.
          </p>
          <div className="flex items-center gap-5">
            {event.socialLinks?.twitter && (
              <a
                href={event.socialLinks.twitter}
                className="text-white/30 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiTwitter size={16} />
              </a>
            )}
            {event.socialLinks?.instagram && (
              <a
                href={event.socialLinks.instagram}
                className="text-white/30 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiInstagram size={16} />
              </a>
            )}
            <a href="mailto:src@mtu.edu.ng" className="text-white/30 hover:text-white transition-colors">
              <FiMail size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
