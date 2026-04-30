'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchAgenda, fetchEventBySlug, fetchPartners, fetchSpeakers } from '@/infrastructure/api/eventApi';

export function useEvent(slug: string) {
  return useQuery({
    queryKey: ['event', slug],
    queryFn: () => fetchEventBySlug(slug),
    staleTime: 1000 * 60 * 5,
  });
}

export function useSpeakers(eventId: string) {
  return useQuery({
    queryKey: ['speakers', eventId],
    queryFn: () => fetchSpeakers(eventId),
    enabled: !!eventId,
    staleTime: 1000 * 60 * 10,
  });
}

export function usePartners(eventId: string) {
  return useQuery({
    queryKey: ['partners', eventId],
    queryFn: () => fetchPartners(eventId),
    enabled: !!eventId,
    staleTime: 1000 * 60 * 10,
  });
}

export function useAgenda(eventId: string) {
  return useQuery({
    queryKey: ['agenda', eventId],
    queryFn: () => fetchAgenda(eventId),
    enabled: !!eventId,
    staleTime: 1000 * 60 * 10,
  });
}
