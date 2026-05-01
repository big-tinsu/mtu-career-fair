import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchEventBySlug, fetchPartners, fetchSpeakers } from '@/infrastructure/api/eventApi';
import { formatDate } from '@/lib/utils';
import { Navbar } from '@/presentation/layout/Navbar';
import { Footer } from '@/presentation/layout/Footer';
import { HeroSection } from '@/presentation/sections/HeroSection';
import { StatsSection } from '@/presentation/sections/StatsSection';
import { AboutSection } from '@/presentation/sections/AboutSection';
import { SpeakersSection } from '@/presentation/sections/SpeakersSection';
import { PartnersSection } from '@/presentation/sections/PartnersSection';
import { RegistrationCTASection } from '@/presentation/sections/RegistrationCTASection';
import { eventStats } from '@/constants/eventData';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await fetchEventBySlug(slug);
  if (!event) return {};

  return {
    title: `${event.title} — ${formatDate(event.date)}`,
    description: event.description,
    openGraph: {
      title: `${event.title} | ${event.subtitle}`,
      description: event.description,
      type: 'website',
      images: [{ url: '/images/imagetwo.jpeg' }],
    },
  };
}

export default async function EventPage({ params }: PageProps) {
  const { slug } = await params;
  const event = await fetchEventBySlug(slug);
  if (!event) notFound();

  const [speakers, partners] = await Promise.all([
    fetchSpeakers(event.id),
    fetchPartners(event.id),
  ]);

  return (
    <div className="min-h-screen bg-[#F2E4CC] text-[#1A1A1A] overflow-x-hidden">
      <Navbar event={event} />
      <main>
        <HeroSection event={event} />
        <StatsSection stats={eventStats} />
        <AboutSection event={event} />
        <SpeakersSection speakers={speakers} />
        <PartnersSection partners={partners} />
        <RegistrationCTASection event={event} />
      </main>
      <Footer event={event} />
    </div>
  );
}
