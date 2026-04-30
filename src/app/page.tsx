import { redirect } from 'next/navigation';
import { EVENT_SLUG } from '@/constants/eventData';

export default function Home() {
  redirect(`/events/${EVENT_SLUG}`);
}
