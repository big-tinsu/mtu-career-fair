import { Badge } from './Badge';
import { RegistrationStatus } from '@/domain/types';

interface StatusBadgeProps {
  status: RegistrationStatus;
}

const config: Record<
  RegistrationStatus,
  { label: string; variant: 'yellow' | 'green' | 'red' | 'blue' }
> = {
  pending: { label: 'Pending Review', variant: 'yellow' },
  approved: { label: 'Approved', variant: 'green' },
  rejected: { label: 'Rejected', variant: 'red' },
  waitlisted: { label: 'Waitlisted', variant: 'blue' },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const { label, variant } = config[status];
  return (
    <Badge variant={variant} dot>
      {label}
    </Badge>
  );
}
