'use client';

import { use, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#6F00FF] to-[#08BFFF] flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(111,0,255,0.4)]">
          <FiCheckCircle size={36} className="text-white" />
        </div>
      </motion.div>

      <motion.h1 variants={fadeInUp} className="font-figtree text-3xl md:text-4xl font-bold text-white mb-3">
        Application Submitted!
      </motion.h1>
      <motion.p variants={fadeInUp} className="text-white/50 text-base mb-8">
        Thanks, <strong className="text-white">{registration.firstName}</strong>! Your registration for{' '}
        <strong className="text-[#C192FF]">{mockEvent.title}</strong> is now under review.
      </motion.p>

      <motion.div
        variants={fadeInUp}
        className="rounded-2xl bg-white/[0.03] border border-white/[0.08] p-6 mb-8 text-left"
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4">
          Your Application
        </p>
        <div className="space-y-3">
          {[
            { label: 'Name', value: `${registration.firstName} ${registration.lastName}` },
            { label: 'Email', value: registration.email },
            { label: 'Major', value: registration.major || '—' },
            { label: 'Year', value: registration.year || '—' },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between gap-4">
              <span className="text-white/30 text-sm">{label}</span>
              <span className="text-white/70 text-sm text-right">{value}</span>
            </div>
          ))}
          <div className="flex justify-between gap-4 pt-3 border-t border-white/[0.06]">
            <span className="text-white/30 text-sm">Status</span>
            <StatusBadge status={registration.status} />
          </div>
        </div>
      </motion.div>

      <motion.div variants={fadeInUp} className="flex flex-col gap-3">
        <div className="flex items-center gap-3 text-white/40 text-sm bg-white/[0.03] rounded-xl p-4">
          <FiClock className="text-[#FCD34D] flex-shrink-0" size={16} />
          <span>Applications are reviewed within 24–48 hours.</span>
        </div>
        <div className="flex items-center gap-3 text-white/40 text-sm bg-white/[0.03] rounded-xl p-4">
          <FiMail className="text-[#4ADE80] flex-shrink-0" size={16} />
          <span>
            A confirmation email will be sent to <strong className="text-white/60">{registration.email}</strong> once approved.
          </span>
        </div>
      </motion.div>

      <motion.div variants={fadeInUp} className="mt-8">
        <Link href={`/events/${mockEvent.slug}`} className="text-[#C192FF] hover:text-white text-sm transition-colors">
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
    <div className="min-h-screen bg-[#040019] text-white">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-[#6F00FF] blur-[150px] opacity-10" />
      </div>

      <div className="relative z-10 layout py-16 md:py-24">
        <AnimatePresence mode="wait">
          {submitted ? (
            <ConfirmationView key="confirmation" registration={submitted} />
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-2xl mx-auto"
            >
              <Link
                href={`/events/${slug}`}
                className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors mb-10"
              >
                <FiArrowLeft size={14} />
                Back to event
              </Link>

              <div className="mb-10">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C192FF] mb-3">
                  Registration
                </p>
                <h1 className="font-figtree text-3xl md:text-4xl font-bold text-white mb-2">
                  Apply to attend
                </h1>
                <p className="text-white/50 text-base">
                  Complete the form below. Approved applicants will receive a confirmation email with event details.
                </p>
              </div>

              <div className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-6 md:p-8">
                <RegistrationForm onSubmit={handleSubmit} isLoading={isPending} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
