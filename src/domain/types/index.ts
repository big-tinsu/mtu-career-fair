export type EventStatus = 'upcoming' | 'live' | 'past';
export type PartnerTier = 'platinum' | 'gold' | 'silver' | 'media';
export type SpeakerType = 'keynote' | 'speaker' | 'panelist' | 'host' | 'moderator' | 'spotlight';
export type RegistrationStatus = 'pending' | 'approved' | 'rejected' | 'waitlisted';
export type AgendaItemType = 'main' | 'break' | 'networking' | 'workshop' | 'keynote';

export interface OrganizerEntity {
  id: string;
  name: string;
  logo?: string;
  website?: string;
}

export interface EventEntity {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription?: string;
  date: string;
  endDate?: string;
  time: string;
  endTime?: string;
  location: string;
  address: string;
  mapUrl?: string;
  capacity: number;
  registeredCount: number;
  status: EventStatus;
  tags: string[];
  coverImage?: string;
  requiresApproval: boolean;
  isFree: boolean;
  price?: number;
  currency?: string;
  organizer: OrganizerEntity;
  socialLinks?: {
    twitter?: string;
    linkedIn?: string;
    instagram?: string;
  };
}

export interface SpeakerEntity {
  id: string;
  name: string;
  title: string;
  company: string;
  bio: string;
  photo?: string;
  photoPosition?: string;
  linkedIn?: string;
  twitter?: string;
  type: SpeakerType;
  tags?: string[];
}

export interface PartnerEntity {
  id: string;
  name: string;
  logo?: string;
  logoColor?: string;
  website?: string;
  tier: PartnerTier;
  description?: string;
}

export interface AgendaItem {
  id: string;
  time: string;
  endTime?: string;
  title: string;
  description?: string;
  speaker?: string;
  speakerId?: string;
  location?: string;
  type: AgendaItemType;
}

export interface RegistrationEntity {
  id: string;
  eventId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  organization?: string;
  year?: string;
  major?: string;
  linkedin?: string;
  message?: string;
  status: RegistrationStatus;
  createdAt: string;
  updatedAt?: string;
}

export interface StatItem {
  label: string;
  value: number;
  suffix: string;
}

export interface RegistrationFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  organization?: string;
  year?: string;
  major?: string;
  linkedin?: string;
  message?: string;
}
