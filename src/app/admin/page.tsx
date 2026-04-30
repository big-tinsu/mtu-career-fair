'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowLeft, FiCheck, FiX, FiRefreshCw, FiUsers, FiClock, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { useRegistrations, useUpdateRegistrationStatus } from '@/hooks/useAdmin';
import { mockEvent } from '@/constants/eventData';
import { RegistrationEntity, RegistrationStatus } from '@/domain/types';
import { fadeInUp, staggerContainer, viewportConfig } from '@/lib/animations';
import { StatusBadge } from '@/presentation/ui/StatusBadge';
import { formatDateShort, getInitials } from '@/lib/utils';
import { cn } from '@/lib/utils';

type FilterStatus = 'all' | RegistrationStatus;

const filterTabs: { label: string; value: FilterStatus }[] = [
  { label: 'All', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'Approved', value: 'approved' },
  { label: 'Rejected', value: 'rejected' },
];

function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: number; color: string }) {
  return (
    <motion.div
      variants={fadeInUp}
      className="rounded-2xl bg-white/[0.03] border border-white/[0.07] p-5 flex items-center gap-4"
    >
      <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', color)}>
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-white font-figtree">{value}</p>
        <p className="text-white/40 text-xs">{label}</p>
      </div>
    </motion.div>
  );
}

function RegistrationRow({
  reg,
  onApprove,
  onReject,
  isUpdating,
}: {
  reg: RegistrationEntity;
  onApprove: () => void;
  onReject: () => void;
  isUpdating: boolean;
}) {
  return (
    <motion.tr
      variants={fadeInUp}
      className="border-b border-white/[0.05] hover:bg-white/[0.02] transition-colors"
    >
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6F00FF] to-[#08BFFF] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {getInitials(`${reg.firstName} ${reg.lastName}`)}
          </div>
          <div>
            <p className="text-white text-sm font-medium">{reg.firstName} {reg.lastName}</p>
            <p className="text-white/40 text-xs">{reg.email}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-4 hidden md:table-cell">
        <p className="text-white/60 text-sm">{reg.major || '—'}</p>
        <p className="text-white/30 text-xs">{reg.year || '—'}</p>
      </td>
      <td className="px-4 py-4 hidden lg:table-cell">
        <p className="text-white/40 text-xs">{formatDateShort(reg.createdAt)}</p>
      </td>
      <td className="px-4 py-4">
        <StatusBadge status={reg.status} />
      </td>
      <td className="px-4 py-4">
        {reg.status === 'pending' && (
          <div className="flex items-center gap-2">
            <button
              onClick={onApprove}
              disabled={isUpdating}
              className="w-7 h-7 rounded-lg bg-[rgba(74,222,128,0.1)] border border-[rgba(74,222,128,0.2)] text-[#4ADE80] flex items-center justify-center hover:bg-[rgba(74,222,128,0.2)] transition-colors disabled:opacity-40"
              title="Approve"
            >
              <FiCheck size={13} />
            </button>
            <button
              onClick={onReject}
              disabled={isUpdating}
              className="w-7 h-7 rounded-lg bg-[rgba(248,113,113,0.1)] border border-[rgba(248,113,113,0.2)] text-[#F87171] flex items-center justify-center hover:bg-[rgba(248,113,113,0.2)] transition-colors disabled:opacity-40"
              title="Reject"
            >
              <FiX size={13} />
            </button>
          </div>
        )}
      </td>
    </motion.tr>
  );
}

export default function AdminPage() {
  const event = mockEvent;
  const { data: registrations = [], isLoading, refetch } = useRegistrations(event.id);
  const { mutate: updateStatus, isPending: isUpdating } = useUpdateRegistrationStatus(event.id);
  const [filter, setFilter] = useState<FilterStatus>('all');

  const filtered = filter === 'all' ? registrations : registrations.filter((r) => r.status === filter);

  const counts = {
    total: registrations.length,
    pending: registrations.filter((r) => r.status === 'pending').length,
    approved: registrations.filter((r) => r.status === 'approved').length,
    rejected: registrations.filter((r) => r.status === 'rejected').length,
  };

  return (
    <div className="min-h-screen bg-[#040019] text-white">
      <div className="border-b border-white/[0.06] bg-[rgba(4,0,25,0.9)] backdrop-blur-xl sticky top-0 z-10">
        <div className="layout py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href={`/events/${event.slug}`} className="text-white/40 hover:text-white transition-colors">
              <FiArrowLeft size={16} />
            </Link>
            <div>
              <p className="text-white font-semibold text-sm">{event.title}</p>
              <p className="text-white/30 text-xs">Organizer Dashboard</p>
            </div>
          </div>
          <button
            onClick={() => refetch()}
            className="flex items-center gap-1.5 text-white/40 hover:text-white text-xs transition-colors"
          >
            <FiRefreshCw size={13} />
            Refresh
          </button>
        </div>
      </div>

      <div className="layout py-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <StatCard icon={<FiUsers size={18} className="text-white/60" />} label="Total Applicants" value={counts.total} color="bg-white/[0.06]" />
          <StatCard icon={<FiClock size={18} className="text-[#FCD34D]" />} label="Pending Review" value={counts.pending} color="bg-[rgba(252,211,77,0.08)]" />
          <StatCard icon={<FiCheckCircle size={18} className="text-[#4ADE80]" />} label="Approved" value={counts.approved} color="bg-[rgba(74,222,128,0.08)]" />
          <StatCard icon={<FiXCircle size={18} className="text-[#F87171]" />} label="Rejected" value={counts.rejected} color="bg-[rgba(248,113,113,0.08)]" />
        </motion.div>

        <div className="rounded-2xl bg-white/[0.02] border border-white/[0.07] overflow-hidden">
          <div className="flex items-center gap-1 p-4 border-b border-white/[0.06]">
            {filterTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setFilter(tab.value)}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                  filter === tab.value
                    ? 'bg-[rgba(111,0,255,0.2)] text-white border border-[rgba(111,0,255,0.3)]'
                    : 'text-white/40 hover:text-white hover:bg-white/5',
                )}
              >
                {tab.label}
                {tab.value !== 'all' && (
                  <span className="ml-1.5 opacity-60">
                    ({counts[tab.value as Exclude<FilterStatus, 'all'>]})
                  </span>
                )}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="py-20 text-center text-white/30 text-sm">Loading registrations…</div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center text-white/30 text-sm">No registrations found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-white/[0.05]">
                    <th className="px-4 py-3 text-xs font-medium text-white/30 uppercase tracking-wider">Applicant</th>
                    <th className="px-4 py-3 text-xs font-medium text-white/30 uppercase tracking-wider hidden md:table-cell">Major / Year</th>
                    <th className="px-4 py-3 text-xs font-medium text-white/30 uppercase tracking-wider hidden lg:table-cell">Applied</th>
                    <th className="px-4 py-3 text-xs font-medium text-white/30 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-xs font-medium text-white/30 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <motion.tbody
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  {filtered.map((reg) => (
                    <RegistrationRow
                      key={reg.id}
                      reg={reg}
                      isUpdating={isUpdating}
                      onApprove={() => updateStatus({ id: reg.id, status: 'approved' })}
                      onReject={() => updateStatus({ id: reg.id, status: 'rejected' })}
                    />
                  ))}
                </motion.tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
