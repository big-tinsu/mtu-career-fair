import Link from 'next/link';
import { FiTwitter, FiInstagram, FiMail } from 'react-icons/fi';
import { EventEntity } from '@/domain/types';
import { formatDate } from '@/lib/utils';

interface FooterProps {
  event: EventEntity;
}

export function Footer({ event }: FooterProps) {
  return (
    <footer className="border-t border-white/[0.06] bg-[rgba(4,0,25,0.5)]">
      <div className="layout py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#6F00FF] to-[#08BFFF] flex items-center justify-center text-white font-bold text-xs">
                M
              </div>
              <span className="text-white font-semibold text-sm">MTU Career Fair</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              {event.description}
            </p>
          </div>

          <div>
            <p className="text-white/60 font-semibold text-xs uppercase tracking-widest mb-4">
              Event Details
            </p>
            <ul className="space-y-2 text-sm text-white/40">
              <li>{formatDate(event.date)}</li>
              <li>{event.time} – {event.endTime}</li>
              <li>{event.location}</li>
              <li>{event.address}</li>
            </ul>
          </div>

          <div>
            <p className="text-white/60 font-semibold text-xs uppercase tracking-widest mb-4">
              Quick Links
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={`/events/${event.slug}/register`} className="text-white/40 hover:text-white transition-colors">
                  Register Now
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-white/40 hover:text-white transition-colors">
                  Organizer Login
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/[0.06]">
          <p className="text-white/25 text-xs">
            © 2026 {event.organizer.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {event.socialLinks?.twitter && (
              <a href={event.socialLinks.twitter} className="text-white/25 hover:text-white/70 transition-colors" aria-label="Twitter">
                <FiTwitter size={16} />
              </a>
            )}
            {event.socialLinks?.instagram && (
              <a href={event.socialLinks.instagram} className="text-white/25 hover:text-white/70 transition-colors" aria-label="Instagram">
                <FiInstagram size={16} />
              </a>
            )}
            <a href="mailto:careers@mtu.edu" className="text-white/25 hover:text-white/70 transition-colors" aria-label="Email">
              <FiMail size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
