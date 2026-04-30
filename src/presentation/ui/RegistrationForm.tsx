'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiPhone, FiLinkedin, FiMessageSquare } from 'react-icons/fi';
import { RegistrationFormData } from '@/domain/types';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { cn } from '@/lib/utils';
import { Button } from './Button';

interface RegistrationFormProps {
  onSubmit: (data: RegistrationFormData) => void;
  isLoading?: boolean;
}

const YEARS = ['100 Level', '200 Level', '300 Level', '400 Level', '500 Level', 'Postgraduate', 'Alumni', 'Other'];
const MAJORS = [
  'Business Administration',
  'Computer Science',
  'Accounting',
  'Law',
  'Engineering',
  'Mass Communication',
  'Medicine & Surgery',
  'Social Sciences',
  'Natural Sciences',
  'Theology / Religious Studies',
  'Other',
];

function Field({ label, icon, required, children }: { label: string; icon?: React.ReactNode; required?: boolean; children: React.ReactNode }) {
  return (
    <motion.div variants={fadeInUp} className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-[#1A1A1A]">
        {label}
        {required && <span className="text-[#B91C1C] ml-0.5">*</span>}
      </label>
      <div className="relative">
        {icon && <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9C8E7C]">{icon}</span>}
        {children}
      </div>
    </motion.div>
  );
}

const inputCls = (hasIcon: boolean) =>
  cn(
    'w-full bg-white border border-[#E0D1B5] rounded-xl text-[#1A1A1A] text-sm',
    'placeholder:text-[#C4B49E] focus:outline-none focus:border-[#226C3D] focus:ring-1 focus:ring-[rgba(34,108,61,0.2)]',
    'transition-all duration-200 py-3',
    hasIcon ? 'pl-10 pr-4' : 'px-4',
  );

export function RegistrationForm({ onSubmit, isLoading = false }: RegistrationFormProps) {
  const [form, setForm] = useState<RegistrationFormData>({
    firstName: '', lastName: '', email: '', phone: '',
    organization: '', year: '', major: '', linkedin: '', message: '',
  });

  const set = (field: keyof RegistrationFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <motion.form
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="First Name" icon={<FiUser size={15} />} required>
          <input type="text" placeholder="Oluwaseun" value={form.firstName} onChange={set('firstName')} required className={inputCls(true)} />
        </Field>
        <Field label="Last Name" required>
          <input type="text" placeholder="Adeyemi" value={form.lastName} onChange={set('lastName')} required className={inputCls(false)} />
        </Field>
      </div>

      <Field label="Email Address" icon={<FiMail size={15} />} required>
        <input type="email" placeholder="you@mtu.edu.ng" value={form.email} onChange={set('email')} required className={inputCls(true)} />
      </Field>

      <Field label="Phone Number" icon={<FiPhone size={15} />}>
        <input type="tel" placeholder="+234 800 000 0000" value={form.phone} onChange={set('phone')} className={inputCls(true)} />
      </Field>

      <Field label="Department / Faculty">
        <input type="text" placeholder="e.g. Business Administration" value={form.organization} onChange={set('organization')} className={inputCls(false)} />
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Level">
          <select value={form.year} onChange={set('year')} className={cn(inputCls(false), 'cursor-pointer')}>
            <option value="">Select level</option>
            {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        </Field>
        <Field label="Programme of Study">
          <select value={form.major} onChange={set('major')} className={cn(inputCls(false), 'cursor-pointer')}>
            <option value="">Select programme</option>
            {MAJORS.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
        </Field>
      </div>

      <Field label="LinkedIn Profile (Optional)" icon={<FiLinkedin size={15} />}>
        <input type="url" placeholder="linkedin.com/in/yourprofile" value={form.linkedin} onChange={set('linkedin')} className={inputCls(true)} />
      </Field>

      <Field label="What are your career goals?" icon={<FiMessageSquare size={15} />}>
        <textarea
          placeholder="Tell us what you hope to gain from this event..."
          value={form.message}
          onChange={set('message')}
          rows={3}
          className={cn(inputCls(true), 'resize-none pt-3 leading-relaxed')}
        />
      </Field>

      <Button type="submit" size="lg" isLoading={isLoading} className="w-full mt-2">
        Submit Registration
      </Button>

      <p className="text-center text-xs text-[#9C8E7C]">
        By registering, you agree to our event policies. Approved registrations will receive a confirmation email.
      </p>
    </motion.form>
  );
}
