'use client';

import { use, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowLeft, FiCheckCircle, FiClock, FiMail } from 'react-icons/fi';
import { useRegistration } from '@/hooks/useRegistration';
import { mockEvent } from '@/constants/eventData';
import { RegistrationEntity, RegistrationFormData } from '@/domain/types';
import { scaleIn, fadeInUp, staggerContainer } from '@/lib/animations';
import { RegistrationForm } from '@/presentation/ui/RegistrationForm';
import { StatusBadge } from '@/presentation/ui/StatusBadge';

interface PageProps {
  params: Promise<{ slug: string }>;
}

function ConfirmationView({ registration }: { registration: RegistrationEntity }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="text-center max-w-lg mx-auto"
    >
      <motion.div variants={scaleIn} className="mb-8">
        <div className="w-20 h-20 rounded-2xl bg-[#226C3D] flex items-center justify-center mx-auto shadow-[0_8px_32px_rgba(34,108,61,0.3)]">
          <FiCheckCircle size={36} className="text-white" />
        </div>
      </motion.div>

      <motion.h1 variants={fadeInUp} className="font-manrope text-3xl md:text-4xl font-black text-[#1A1A1A] mb-3">
        Application Submitted!
      </motion.h1>
      <motion.p variants={fadeInUp} className="text-[#5C5046] text-base mb-8">
        Thank you, <strong className="text-[#1A1A1A]">{registration.firstName}</strong>! Your registration for{' '}
        <strong className="text-[#226C3D]">{mockEvent.title}</strong> is now under review.
      </motion.p>

      <motion.div
        variants={fadeInUp}
        className="rounded-2xl bg-white border border-[#E8D9BE] p-6 mb-6 text-left shadow-sm"
      >
        <p className="text-xs font-bold uppercase tracking-widest text-[#9C8E7C] mb-4">Your Registration</p>
        <div className="space-y-3">
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
          <div className="flex justify-between gap-4 pt-3 border-t border-[#F0E8D8]">
            <span className="text-[#9C8E7C] text-sm">Status</span>
            <StatusBadge status={registration.status} />
          </div>
        </div>
      </motion.div>

      <motion.div variants={fadeInUp} className="flex flex-col gap-3 mb-8">
        <div className="flex items-center gap-3 text-[#5C5046] text-sm bg-white border border-[#E8D9BE] rounded-xl p-4">
          <FiClock className="text-[#8B6914] flex-shrink-0" size={16} />
          <span>Applications are reviewed within 24–48 hours.</span>
        </div>
        <div className="flex items-center gap-3 text-[#5C5046] text-sm bg-white border border-[#E8D9BE] rounded-xl p-4">
          <FiMail className="text-[#226C3D] flex-shrink-0" size={16} />
          <span>A confirmation email will be sent to <strong className="text-[#1A1A1A]">{registration.email}</strong>.</span>
        </div>
      </motion.div>

      <motion.div variants={fadeInUp}>
        <Link href={`/events/${mockEvent.slug}`} className="text-[#226C3D] hover:text-[#1A5430] text-sm font-medium transition-colors">
          ← Back to event page
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default function RegisterPage({ params }: PageProps) {
  const { slug } = use(params);
  const event = mockEvent;
  const { mutateAsync, isPending } = useRegistration(event.id);
  const [submitted, setSubmitted] = useState<RegistrationEntity | null>(null);

  const handleSubmit = async (data: RegistrationFormData) => {
    const result = await mutateAsync(data);
    setSubmitted(result);
  };

  return (
    <div className="min-h-screen bg-[#F2E4CC] text-[#1A1A1A]">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[rgba(34,108,61,0.04)] blur-[100px]" />
      </div>

      <div className="relative z-10">
        {/* Side image for large screens */}
        <div className="hidden lg:block fixed left-0 top-0 bottom-0 w-[40%] overflow-hidden">
          <Image
            src="/images/imagetwo.jpeg"
            alt="AURA Career Fair"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#F2E4CC]/60" />
          <div className="absolute bottom-12 left-8 right-8">
            <p className="text-white/80 text-xs font-bold uppercase tracking-widest mb-2">AURA Career Fair 2026</p>
            <p className="text-white font-manrope font-black text-3xl leading-tight">Beyond the Degree</p>
          </div>
        </div>

        <div className="lg:ml-[40%]">
          <div className="max-w-xl mx-auto px-6 py-16 md:py-24">
            <AnimatePresence mode="wait">
              {submitted ? (
                <ConfirmationView key="confirmation" registration={submitted} />
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Link
                    href={`/events/${slug}`}
                    className="inline-flex items-center gap-2 text-[#5C5046] hover:text-[#226C3D] text-sm transition-colors mb-10 font-medium"
                  >
                    <FiArrowLeft size={14} /> Back to event
                  </Link>

                  <div className="mb-10">
                    <p className="text-[#226C3D] text-xs font-bold uppercase tracking-[0.2em] mb-3">
                      Free Registration
                    </p>
                    <h1 className="font-manrope text-3xl md:text-4xl font-black text-[#1A1A1A] mb-2 leading-tight">
                      Register for AURA<br />Career Fair 2026
                    </h1>
                    <p className="text-[#5C5046] text-base">
                      Fill in your details below. Approved attendees receive a confirmation before the event.
                    </p>
                  </div>

                  <div className="bg-white rounded-3xl border border-[#E8D9BE] p-6 md:p-8 shadow-[0_4px_24px_rgba(28,28,28,0.08)]">
                    <RegistrationForm onSubmit={handleSubmit} isLoading={isPending} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
