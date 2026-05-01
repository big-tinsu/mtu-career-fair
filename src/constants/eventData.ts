import { AgendaItem, EventEntity, PartnerEntity, SpeakerEntity } from '@/domain/types';

export const EVENT_SLUG = 'aura-career-fair-2026';

export const mockEvent: EventEntity = {
  id: 'evt-mtu-aura-001',
  slug: EVENT_SLUG,
  title: 'AURA Career Fair',
  subtitle: 'Beyond the Degree',
  description:
    'Mountain Top University & Students’ Representative Council present AURA Career Fair 2026 — connecting the next generation of leaders with global opportunities.',
  longDescription: `The AURA Career Fair is Mountain Top University’s flagship career event, bringing together students, graduates, and industry professionals for a day of networking, mentorship, and opportunity.

Themed “Beyond the Degree,” this year’s fair challenges every attendee to look past their certificate and discover the limitless possibilities that come from combining academic knowledge with real-world skills, network, and vision.

Join us for expert panel discussions, direct engagement with recruiters and industry leaders, resume clinics, and a community of driven professionals who believe your degree is just the beginning — not the destination.`,
  date: '2026-05-11',
  time: '9:30 AM',
  endTime: '4:00 PM',
  location: 'MTU Multi-Purpose Hall',
  address: 'Mountain Top University, Prayer City, Ogun State, Nigeria',
  capacity: 500,
  registeredCount: 312,
  status: 'upcoming',
  tags: ['Career Fair', 'Networking', 'Leadership', 'Opportunities', 'Beyond the Degree'],
  requiresApproval: true,
  isFree: true,
  organizer: {
    id: 'org-mtu-src-001',
    name: 'MTU & Students’ Representative Council',
    website: 'https://www.mtu.edu.ng',
  },
  socialLinks: {
    instagram: 'https://instagram.com/src_mountaintopuniversity',
    twitter: 'https://twitter.com/mountaintopuni',
  },
};

export const mockSpeakers: SpeakerEntity[] = [
  {
    id: 'spk-001',
    name: 'Apostle Ayoboluwa Glory',
    title: 'Spiritual Leader & Career Mentor',
    company: 'Glory Ministries International',
    bio: 'A visionary leader dedicated to empowering the next generation to discover purpose beyond the classroom. Known for his transformational teachings on faith, career, and excellence.',
    type: 'panelist',
    photo: '/images/speakers/speaker.jpeg',
    tags: ['Leadership', 'Purpose', 'Mentorship'],
  },
  {
    id: 'spk-002',
    name: 'Oluwafemi Oladapo',
    title: 'Senior Executive & Career Strategist',
    company: 'Industry Leader',
    bio: 'Oluwafemi brings decades of industry experience across finance, strategy, and leadership development. A passionate advocate for youth empowerment and professional excellence.',
    type: 'panelist',
    photo: '/images/speakers/speaker2.jpeg',
    linkedIn: '#',
    tags: ['Finance', 'Strategy', 'Entrepreneurship'],
  },
  {
    id: 'spk-003',
    name: 'Samuel Olamide Ayegun',
    title: 'Tech Entrepreneur & Innovator',
    company: 'TechBridge Nigeria',
    bio: 'Samuel is a pioneering tech entrepreneur who has built multiple startups across West Africa. He believes in the power of African innovation to solve global problems.',
    type: 'panelist',
    photo: '/images/speakers/speaker3.jpg',
    linkedIn: '#',
    tags: ['Technology', 'Startups', 'Innovation'],
  },
  {
    id: 'spk-005',
    name: 'Temitope Adeyemi',
    title: 'Human Resources Director',
    company: 'Workforce Africa',
    bio: 'Temitope is a renowned HR leader who has shaped talent acquisition strategies across multinational companies in Africa. She offers sharp, practical guidance on standing out in a competitive job market.',
    type: 'panelist',
    photo: '/images/speakers/speaker5.jpg',
    linkedIn: '#',
    tags: ['HR', 'Talent', 'Career Growth'],
  },
  {
    id: 'spk-004',
    name: 'Omodolapo Ajaguma',
    title: 'Corporate Executive & Coach',
    company: 'Future Leaders Foundation',
    bio: 'Omodolapo is a seasoned corporate professional and life coach who has helped hundreds of young Nigerians navigate the transition from campus to career with confidence.',
    type: 'panelist',
    photo: '/images/speakers/speaker4.JPG',
    linkedIn: '#',
    tags: ['Coaching', 'Corporate', 'Women in Leadership'],
  },
];

export const mockPartners: PartnerEntity[] = [
  { id: 'p-001', name: 'TOEFL', tier: 'platinum', logoColor: '#004B87', website: '#', description: 'Official Test Partner' },
  { id: 'p-002', name: 'GTBank', tier: 'gold', logoColor: '#F26522', website: '#' },
  { id: 'p-003', name: 'Access Bank', tier: 'gold', logoColor: '#E31E2D', website: '#' },
  { id: 'p-004', name: 'Andela', tier: 'silver', logoColor: '#15803D', website: '#' },
  { id: 'p-005', name: 'Flutterwave', tier: 'silver', logoColor: '#F5A623', website: '#' },
  { id: 'p-006', name: 'Paystack', tier: 'silver', logoColor: '#00C3F7', website: '#' },
  { id: 'p-007', name: 'MTU Lode', tier: 'media', logoColor: '#226C3D', website: '#' },
  { id: 'p-008', name: 'Campus Herald', tier: 'media', logoColor: '#8B6914', website: '#' },
];

export const mockAgenda: AgendaItem[] = [
  {
    id: 'ag-001',
    time: '9:00 AM',
    endTime: '9:30 AM',
    title: 'Registration & Welcome',
    description: 'Arrival, badge collection, and light refreshments. Explore the exhibition stands.',
    location: 'Main Foyer',
    type: 'break',
  },
  {
    id: 'ag-002',
    time: '9:30 AM',
    endTime: '10:00 AM',
    title: 'Opening Ceremony',
    description: 'Welcome address from the Vice Chancellor and SRC President.',
    location: 'Multi-Purpose Hall',
    type: 'main',
  },
  {
    id: 'ag-003',
    time: '10:00 AM',
    endTime: '11:30 AM',
    title: 'Keynote Panel: Beyond the Degree',
    description:
      'Our expert panelists share candid insights on career success, entrepreneurship, and life beyond academia in today’s rapidly evolving world.',
    speaker: 'All Panelists',
    location: 'Multi-Purpose Hall',
    type: 'keynote',
  },
  {
    id: 'ag-004',
    time: '11:30 AM',
    endTime: '12:00 PM',
    title: 'Industry Spotlight Presentations',
    description: 'Featured companies present their graduate opportunities, values, and hiring processes.',
    location: 'Multi-Purpose Hall',
    type: 'main',
  },
  {
    id: 'ag-005',
    time: '12:00 PM',
    endTime: '1:00 PM',
    title: 'Networking Lunch',
    description:
      'Catered lunch. A key opportunity to mingle with panelists, recruiters, and fellow students in a relaxed setting.',
    location: 'Atrium',
    type: 'networking',
  },
  {
    id: 'ag-006',
    time: '1:00 PM',
    endTime: '2:30 PM',
    title: 'Breakout: CV Clinics & Recruiter Meetings',
    description:
      'One-on-one CV reviews with professionals. Book a recruiter meeting slot at the registration desk.',
    location: 'Breakout Rooms A–C',
    type: 'workshop',
  },
  {
    id: 'ag-007',
    time: '2:30 PM',
    endTime: '3:30 PM',
    title: 'Open Exhibition & Company Booths',
    description:
      'Walk the exhibition floor, hand in your CV, ask questions, and discover companies you never knew about.',
    location: 'Exhibition Area',
    type: 'networking',
  },
  {
    id: 'ag-008',
    time: '3:30 PM',
    endTime: '4:00 PM',
    title: 'Closing Remarks & Prize Draw',
    description: 'Final words, prize announcements, and thank-you to all attendees and partners.',
    location: 'Multi-Purpose Hall',
    type: 'main',
  },
];

export const eventStats = [
  { label: 'Companies', value: 30, suffix: '+' },
  { label: 'Students Expected', value: 500, suffix: '+' },
  { label: 'Career Opportunities', value: 100, suffix: '+' },
  { label: 'Expert Panelists', value: 4, suffix: '' },
];
