import { submitRegistration } from '@/infrastructure/api/registrationApi';
import { RegistrationEntity, RegistrationFormData } from '@/domain/types';

export async function registerForEvent(
  eventId: string,
  formData: RegistrationFormData,
): Promise<RegistrationEntity> {
  if (!formData.firstName.trim() || !formData.lastName.trim()) {
    throw new Error('First and last name are required');
  }
  if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    throw new Error('A valid email address is required');
  }
  return submitRegistration(eventId, formData);
}
