'use client';

import { useMutation } from '@tanstack/react-query';
import { registerForEvent } from '@/application/useCases/registerForEvent';
import { RegistrationFormData } from '@/domain/types';

export function useRegistration(eventId: string) {
  return useMutation({
    mutationFn: (data: RegistrationFormData) => registerForEvent(eventId, data),
  });
}
