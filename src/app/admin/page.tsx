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

function StatCard({ icon, label, value, color, bg }: { icon: React.ReactNode; label: string; value: number; color: string; bg: string }) {
  return (
    <motion.div
      variants={fadeInUp}
      className="rounded-2xl bg-white border border-[#E8D9BE] p-5 flex items-center gap-4 shadow-sm"
    >
      <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', bg)}>
        <span className={color}>{icon}</span>
      </div>
      <div>
        <p className="text-2xl font-black text-[#1A1A1A] font-manrope">{value}</p>
        <p className="text-[#9C8E7C] text-xs">{label}</p>
      </div>
    </motion.div>
  );
}

function RegistrationRow({ reg, onApprove, onReject, isUpdating }: {
  reg: RegistrationEntity; onApprove: () => void; onReject: () => void; isUpdating: boolean;
}) {
  return (
    <motion.tr variants={fadeInUp} className="border-b border-[#F0E8D8] hover:bg-[#FAF6F0] transition-colors">
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#226C3D] flex items-center justify-center text-white text-xs font-bold font-manrope flex-shrink-0">
            {getInitials(`${reg.firstName} ${reg.lastName}`)}
          </div>
          <div>
            <p className="text-[#1A1A1A] text-sm font-semibold font-manrope">{reg.firstName} {reg.lastName}</p>
            <p className="text-[#9C8E7C] text-xs">{reg.email}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-4 hidden md:table-cell">
        <p className="text-[#5C5046] text-sm">{reg.major || '—'}</p>
        <p className="text-[#9C8E7C] text-xs">{reg.year || '—'}</p>
      </td>
      <td className="px-4 py-4 hidden lg:table-cell">
        <p className="text-[#9C8E7C] text-xs">{formatDateShort(reg.createdAt)}</p>
      </td>
      <td className="px-4 py-4"><StatusBadge status={reg.status} /></td>
      <td className="px-4 py-4">
        {reg.status === 'pending' && (
          <div className="flex items-center gap-2">
            <button
              onClick={onApprove}
              disabled={isUpdating}
              className="w-7 h-7 rounded-lg bg-[rgba(34,108,61,0.1)] border border-[rgba(34,108,61,0.2)] text-[#226C3D] flex items-center justify-center hover:bg-[rgba(34,108,61,0.2)] transition-colors disabled:opacity-40"
            >
              <FiCheck size={13} />
            </button>
            <button
              onClick={onReject}
              disabled={isUpdating}
              className="w-7 h-7 rounded-lg bg-[rgba(185,28,28,0.08)] border border-[rgba(185,28,28,0.15)] text-[#B91C1C] flex items-center justify-center hover:bg-[rgba(185,28,28,0.15)] transition-colors disabled:opacity-40"
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
  const counts: Record<'total' | 'pending' | 'approved' | 'rejected', number> = {
    total: registrations.length,
    pending: registrations.filter((r) => r.status === 'pending').length,
    approved: registrations.filter((r) => r.status === 'approved').length,
    rejected: registrations.filter((r) => r.status === 'rejected').length,
  };

  return (
    <div className="min-h-screen bg-[#F2E4CC] text-[#1A1A1A]">
      <div className="border-b border-[#E8D9BE] bg-white sticky top-0 z-10 shadow-sm">
        <div className="layout py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href={`/events/${event.slug}`} className="text-[#9C8E7C] hover:text-[#226C3D] transition-colors">
              <FiArrowLeft size={16} />
            </Link>
            <div>
              <p className="text-[#1A1A1A] font-bold text-sm font-manrope">{event.title}</p>
              <p className="text-[#9C8E7C] text-xs">Organiser Dashboard</p>
            </div>
          </div>
          <button onClick={() => refetch()} className="flex items-center gap-1.5 text-[#9C8E7C] hover:text-[#226C3D] text-xs transition-colors font-medium">
            <FiRefreshCw size={13} /> Refresh
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
          <StatCard icon={<FiUsers size={18} />} label="Total Applicants" value={counts.total} color="text-[#5C5046]" bg="bg-[#F2E4CC]" />
          <StatCard icon={<FiClock size={18} />} label="Pending" value={counts.pending} color="text-[#8B6914]" bg="bg-[rgba(139,105,20,0.1)]" />
          <StatCard icon={<FiCheckCircle size={18} />} label="Approved" value={counts.approved} color="text-[#226C3D]" bg="bg-[rgba(34,108,61,0.1)]" />
          <StatCard icon={<FiXCircle size={18} />} label="Rejected" value={counts.rejected} color="text-[#B91C1C]" bg="bg-[rgba(185,28,28,0.08)]" />
        </motion.div>

        <div className="rounded-2xl bg-white border border-[#E8D9BE] overflow-hidden shadow-sm">
          <div className="flex items-center gap-1 p-4 border-b border-[#F0E8D8]">
            {filterTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setFilter(tab.value)}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all',
                  filter === tab.value
                    ? 'bg-[rgba(34,108,61,0.1)] text-[#226C3D] border border-[rgba(34,108,61,0.2)]'
                    : 'text-[#9C8E7C] hover:text-[#226C3D] hover:bg-[rgba(34,108,61,0.05)]',
                )}
              >
                {tab.label}
                {tab.value !== 'all' && (
                  <span className="ml-1.5 opacity-60">({counts[tab.value as 'pending' | 'approved' | 'rejected']})</span>
                )}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="py-20 text-center text-[#9C8E7C] text-sm">Loading registrations…</div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center text-[#9C8E7C] text-sm">No registrations found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-[#F0E8D8] bg-[#FAF6F0]">
                    {['Applicant', 'Programme / Level', 'Applied', 'Status', 'Actions'].map((h, i) => (
                      <th key={h} className={cn('px-4 py-3 text-xs font-bold text-[#9C8E7C] uppercase tracking-wider', i === 2 && 'hidden lg:table-cell', i === 1 && 'hidden md:table-cell')}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <motion.tbody variants={staggerContainer} initial="hidden" animate="visible">
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
