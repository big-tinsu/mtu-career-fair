import { mockAgenda, mockEvent, mockPartners, mockSpeakers } from '@/constants/eventData';
import { AgendaItem, EventEntity, PartnerEntity, SpeakerEntity } from '@/domain/types';

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export async function fetchEventBySlug(slug: string): Promise<EventEntity | null> {
  await delay(300);
  if (slug === mockEvent.slug) return mockEvent;
  return null;
}

export async function fetchSpeakers(eventId: string): Promise<SpeakerEntity[]> {
  await delay(200);
  if (eventId === mockEvent.id) return mockSpeakers;
  return [];
}

export async function fetchPartners(eventId: string): Promise<PartnerEntity[]> {
  await delay(200);
  if (eventId === mockEvent.id) return mockPartners;
  return [];
}

export async function fetchAgenda(eventId: string): Promise<AgendaItem[]> {
  await delay(200);
  if (eventId === mockEvent.id) return mockAgenda;
  return [];
}
