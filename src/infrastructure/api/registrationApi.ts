import { mockRegistrations } from '@/constants/mockRegistrations';
import { RegistrationEntity, RegistrationFormData, RegistrationStatus } from '@/domain/types';

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

let registrations = [...mockRegistrations];

export async function submitRegistration(
  eventId: string,
  data: RegistrationFormData,
): Promise<RegistrationEntity> {
  await delay(800);

  const newReg: RegistrationEntity = {
    id: `reg-${Date.now()}`,
    eventId,
    ...data,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  registrations = [...registrations, newReg];
  return newReg;
}

export async function fetchRegistrations(eventId: string): Promise<RegistrationEntity[]> {
  await delay(400);
  return registrations.filter((r) => r.eventId === eventId);
}

export async function updateRegistrationStatus(
  id: string,
  status: RegistrationStatus,
): Promise<RegistrationEntity> {
  await delay(300);

  const idx = registrations.findIndex((r) => r.id === id);
  if (idx === -1) throw new Error('Registration not found');

  registrations[idx] = { ...registrations[idx], status, updatedAt: new Date().toISOString() };
  return registrations[idx];
}
