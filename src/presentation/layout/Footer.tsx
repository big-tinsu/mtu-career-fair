import Link from 'next/link';
import { FiInstagram, FiTwitter, FiMail } from 'react-icons/fi';
import { EventEntity } from '@/domain/types';
import { formatDate } from '@/lib/utils';

interface FooterProps {
  event: EventEntity;
}

export function Footer({ event }: FooterProps) {
  return (
    <footer className="bg-[#226C3D] text-white">
      <div className="layout py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white font-bold text-sm">
                A
              </div>
              <div>
                <span className="text-white font-bold text-sm font-manrope block">AURA Career Fair</span>
                <span className="text-white/50 text-[10px]">Beyond the Degree</span>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Connecting Mountain Top University students with global career opportunities.
            </p>
          </div>

          <div>
            <p className="text-white/50 font-semibold text-xs uppercase tracking-widest mb-4">Event Details</p>
            <ul className="space-y-2 text-sm text-white/60">
              <li className="text-white/80">{formatDate(event.date)}</li>
              <li>{event.time} – {event.endTime}</li>
              <li>{event.location}</li>
              <li className="text-xs">{event.address}</li>
            </ul>
          </div>

          <div>
            <p className="text-white/50 font-semibold text-xs uppercase tracking-widest mb-4">Quick Links</p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={`/events/${event.slug}/register`} className="text-white/60 hover:text-white transition-colors">
                  Register Now
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-white/60 hover:text-white transition-colors">
                  Organizer Dashboard
                </Link>
              </li>
              <li>
                <a href="mailto:src@mtu.edu.ng" className="text-white/60 hover:text-white transition-colors">
                  Contact Organisers
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10">
          <p className="text-white/40 text-xs">
            © 2026 {event.organizer.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {event.socialLinks?.twitter && (
              <a href={event.socialLinks.twitter} className="text-white/40 hover:text-white transition-colors">
                <FiTwitter size={16} />
              </a>
            )}
            {event.socialLinks?.instagram && (
              <a href={event.socialLinks.instagram} className="text-white/40 hover:text-white transition-colors">
                <FiInstagram size={16} />
              </a>
            )}
            <a href="mailto:src@mtu.edu.ng" className="text-white/40 hover:text-white transition-colors">
              <FiMail size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
