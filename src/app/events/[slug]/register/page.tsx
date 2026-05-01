'use client';

import { use, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowLeft, FiCalendar, FiMapPin, FiCheckCircle, FiClock, FiMail } from 'react-icons/fi';
import { useRegistration } from '@/hooks/useRegistration';
import { mockEvent } from '@/constants/eventData';
import { RegistrationEntity, RegistrationFormData } from '@/domain/types';
import { RegistrationForm } from '@/presentation/ui/RegistrationForm';
import { StatusBadge } from '@/presentation/ui/StatusBadge';
import { getSpotsRemaining } from '@/lib/utils';

interface PageProps {
  params: Promise<{ slug: string }>;
}

function ConfirmationView({ registration }: { registration: RegistrationEntity }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center max-w-md mx-auto py-12"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="w-16 h-16 rounded-2xl bg-[#226C3D] flex items-center justify-center mx-auto mb-6 shadow-[0_8px_32px_rgba(34,108,61,0.3)]"
      >
        <FiCheckCircle size={30} className="text-white" />
      </motion.div>

      <h1 className="font-instrument text-3xl text-[#1A1A1A] mb-2">Application Submitted!</h1>
      <p className="text-[#5C5046] text-sm mb-8">
        Thank you, <strong className="text-[#1A1A1A]">{registration.firstName}</strong>. Your registration for{' '}
        <strong className="text-[#226C3D]">{mockEvent.title}</strong> is now under review.
      </p>

      <div className="bg-white rounded-2xl border border-[#E8D9BE] p-5 mb-5 text-left">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#9C8E7C] mb-3">Your Registration</p>
        <div className="space-y-2.5">
          {[
            { label: 'Name', value: `${registration.firstName} ${registration.lastName}` },
            { label: 'Email', value: registration.email },
            { label: 'Programme', value: registration.major || '—' },
            { label: 'Level', value: registration.year || '—' },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between gap-4">
              <span className="text-[#9C8E7C] text-sm">{label}</span>
              <span className="text-[#1A1A1A] text-sm text-right font-medium">{value}</span>
            </div>
          ))}
          <div className="flex justify-between gap-4 pt-2.5 border-t border-[#F0E8D8]">
            <span className="text-[#9C8E7C] text-sm">Status</span>
            <StatusBadge status={registration.status} />
          </div>
        </div>
      </div>

      <div className="space-y-2.5 mb-8">
        <div className="flex items-center gap-3 text-[#5C5046] text-sm bg-white border border-[#E8D9BE] rounded-xl p-3.5">
          <FiClock className="text-[#8B6914] flex-shrink-0" size={15} />
          <span>Applications are reviewed within 24–48 hours.</span>
        </div>
        <div className="flex items-center gap-3 text-[#5C5046] text-sm bg-white border border-[#E8D9BE] rounded-xl p-3.5">
          <FiMail className="text-[#226C3D] flex-shrink-0" size={15} />
          <span>Confirmation email sent to <strong className="text-[#1A1A1A]">{registration.email}</strong>.</span>
        </div>
      </div>

      <Link href={`/events/${mockEvent.slug}`} className="text-[#226C3D] hover:text-[#1A5430] text-sm font-medium transition-colors">
        ← Back to event page
      </Link>
    </motion.div>
  );
}

export default function RegisterPage({ params }: PageProps) {
  const { slug } = use(params);
  const event = mockEvent;
  const { mutateAsync, isPending } = useRegistration(event.id);
  const [submitted, setSubmitted] = useState<RegistrationEntity | null>(null);

  const spots = getSpotsRemaining(event.capacity, event.registeredCount);

  const handleSubmit = async (data: RegistrationFormData) => {
    const result = await mutateAsync(data);
    setSubmitted(result);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#1A1A1A]">
      {/* Top bar */}
      <div className="border-b border-[#E8D9BE] bg-white sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-5 md:px-8 py-4 flex items-center gap-3">
          <Link
            href={`/events/${slug}`}
            className="flex items-center gap-1.5 text-[#9C8E7C] hover:text-[#226C3D] text-sm font-medium transition-colors"
          >
            <FiArrowLeft size={15} />
            Back
          </Link>
          <span className="text-[#E0D1B5]">·</span>
          <span className="text-[#1A1A1A] text-sm font-medium">{event.title}</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="confirmation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-5xl mx-auto px-5 md:px-8"
          >
            <ConfirmationView registration={submitted} />
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-5xl mx-auto px-5 md:px-8 py-8 md:py-12"
          >
            <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-8 xl:gap-12 items-start">

              {/* Left — Event summary (sticky) */}
              <div className="lg:sticky lg:top-20">
                {/* Event image */}
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-5 bg-[#1A5430]">
                  <Image
                    src="/images/imagetwo.jpeg"
                    alt="AURA Career Fair 2026"
                    fill
                    className="object-cover object-center opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A5430]/70 via-[#1A5430]/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-0.5">AURA Career Fair 2026</p>
                    <p className="text-white font-instrument italic text-xl leading-tight">Beyond the Degree</p>
                  </div>
                </div>

                {/* Event details */}
                <div className="space-y-4">
                  <div>
                    <h2 className="font-semibold text-[#1A1A1A] text-lg leading-tight mb-0.5">{event.title}</h2>
                    <p className="text-[#9C8E7C] text-sm">{event.subtitle}</p>
                  </div>

                  <div className="space-y-2.5">
                    <div className="flex items-start gap-3 text-sm text-[#5C5046]">
                      <FiCalendar size={14} className="text-[#226C3D] mt-0.5 flex-shrink-0" />
                      <div>
                        <p>Monday, May 11, 2026</p>
                        <p className="text-[#9C8E7C] text-xs mt-0.5">{event.time} – {event.endTime}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 text-sm text-[#5C5046]">
                      <FiMapPin size={14} className="text-[#226C3D] mt-0.5 flex-shrink-0" />
                      <div>
                        <p>{event.location}</p>
                        <p className="text-[#9C8E7C] text-xs mt-0.5">{event.address}</p>
                      </div>
                    </div>
                  </div>

                  {/* Organizer */}
                  <div className="flex items-center gap-2 text-xs text-[#9C8E7C] pt-1">
                    <div className="w-5 h-5 rounded-md bg-[#226C3D] flex items-center justify-center text-white font-bold text-[10px] flex-shrink-0">
                      A
                    </div>
                    Organised by MTU & SRC
                  </div>

                  {/* Spots + free badge */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="flex items-center gap-1.5 bg-[#F2E4CC] border border-[#E0D1B5] rounded-full px-3 py-1 text-xs">
                      <span className="font-bold text-[#226C3D]">{spots} spots</span>
                      <span className="text-[#9C8E7C]">remaining</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-[rgba(34,108,61,0.08)] rounded-full px-3 py-1 text-xs font-bold text-[#226C3D]">
                      Free Entry
                    </div>
                  </div>
                </div>
              </div>

              {/* Right — Registration form */}
              <div>
                <div className="bg-white rounded-2xl border border-[#E8D9BE] p-6 md:p-8 shadow-[0_2px_16px_rgba(28,28,28,0.06)]">
                  <div className="mb-6">
                    <h1 className="font-instrument text-2xl md:text-3xl text-[#1A1A1A] mb-1.5 leading-tight">
                      Register to attend
                    </h1>
                    <p className="text-[#5C5046] text-sm">
                      Approved attendees receive a confirmation email before the event.
                    </p>
                  </div>

                  <RegistrationForm onSubmit={handleSubmit} isLoading={isPending} />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
