'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchRegistrations, updateRegistrationStatus } from '@/infrastructure/api/registrationApi';
import { RegistrationStatus } from '@/domain/types';

export function useRegistrations(eventId: string) {
  return useQuery({
    queryKey: ['registrations', eventId],
    queryFn: () => fetchRegistrations(eventId),
    refetchInterval: 30_000,
  });
}

export function useUpdateRegistrationStatus(eventId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: RegistrationStatus }) =>
      updateRegistrationStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['registrations', eventId] });
    },
  });
}
