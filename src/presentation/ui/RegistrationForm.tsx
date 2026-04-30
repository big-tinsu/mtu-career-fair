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

const YEARS = ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate', 'PhD', 'Other'];
const MAJORS = [
  'Computer Science',
  'Computer Engineering',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Chemical Engineering',
  'Biomedical Engineering',
  'Data Science',
  'Business Administration',
  'Other',
];

function Field({
  label,
  icon,
  required,
  children,
}: {
  label: string;
  icon?: React.ReactNode;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <motion.div variants={fadeInUp} className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-white/70">
        {label}
        {required && <span className="text-[#FF1D45] ml-0.5">*</span>}
      </label>
      <div className="relative">
        {icon && (
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30">
            {icon}
          </span>
        )}
        {children}
      </div>
    </motion.div>
  );
}

const inputCls = (hasIcon: boolean) =>
  cn(
    'w-full bg-white/[0.04] border border-white/10 rounded-xl text-white text-sm',
    'placeholder:text-white/25 focus:outline-none focus:border-[rgba(111,0,255,0.5)] focus:bg-white/[0.06]',
    'transition-all duration-200 py-3',
    hasIcon ? 'pl-10 pr-4' : 'px-4',
  );

export function RegistrationForm({ onSubmit, isLoading = false }: RegistrationFormProps) {
  const [form, setForm] = useState<RegistrationFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    organization: '',
    year: '',
    major: '',
    linkedin: '',
    message: '',
  });

  const set = (field: keyof RegistrationFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

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
          <input
            type="text"
            placeholder="Alex"
            value={form.firstName}
            onChange={set('firstName')}
            required
            className={inputCls(true)}
          />
        </Field>
        <Field label="Last Name" required>
          <input
            type="text"
            placeholder="Johnson"
            value={form.lastName}
            onChange={set('lastName')}
            required
            className={inputCls(false)}
          />
        </Field>
      </div>

      <Field label="Email Address" icon={<FiMail size={15} />} required>
        <input
          type="email"
          placeholder="you@mtu.edu"
          value={form.email}
          onChange={set('email')}
          required
          className={inputCls(true)}
        />
      </Field>

      <Field label="Phone Number" icon={<FiPhone size={15} />}>
        <input
          type="tel"
          placeholder="+1 (906) 555-0100"
          value={form.phone}
          onChange={set('phone')}
          className={inputCls(true)}
        />
      </Field>

      <Field label="University / Organization">
        <input
          type="text"
          placeholder="Michigan Technological University"
          value={form.organization}
          onChange={set('organization')}
          className={inputCls(false)}
        />
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Academic Year">
          <select value={form.year} onChange={set('year')} className={cn(inputCls(false), 'cursor-pointer')}>
            <option value="">Select year</option>
            {YEARS.map((y) => (
              <option key={y} value={y} className="bg-[#0D0030] text-white">
                {y}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Major / Field">
          <select value={form.major} onChange={set('major')} className={cn(inputCls(false), 'cursor-pointer')}>
            <option value="">Select major</option>
            {MAJORS.map((m) => (
              <option key={m} value={m} className="bg-[#0D0030] text-white">
                {m}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="LinkedIn Profile" icon={<FiLinkedin size={15} />}>
        <input
          type="url"
          placeholder="linkedin.com/in/yourhandle"
          value={form.linkedin}
          onChange={set('linkedin')}
          className={inputCls(true)}
        />
      </Field>

      <Field label="Anything you'd like us to know?" icon={<FiMessageSquare size={15} />}>
        <textarea
          placeholder="Tell us about your goals, what roles you're targeting, or companies you're excited about..."
          value={form.message}
          onChange={set('message')}
          rows={3}
          className={cn(inputCls(true), 'resize-none pt-3 leading-relaxed')}
        />
      </Field>

      <Button type="submit" size="lg" isLoading={isLoading} className="w-full mt-2">
        Submit Application
      </Button>

      <p className="text-center text-xs text-white/25">
        By registering you agree to our event policies. Approved attendees will receive a
        confirmation email.
      </p>
    </motion.form>
  );
}
