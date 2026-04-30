import { AgendaItem, EventEntity, PartnerEntity, SpeakerEntity } from '@/domain/types';

export const EVENT_SLUG = 'mtu-career-fair-2026';

export const mockEvent: EventEntity = {
  id: 'evt-mtu-001',
  slug: EVENT_SLUG,
  title: 'MTU Tech Career Fair',
  subtitle: 'Where Innovation Meets Opportunity',
  description:
    'The premier career networking event at Michigan Technological University. Connect with 80+ industry leaders, land internships, and build your professional network.',
  longDescription: `Join us for the most anticipated career event of the year at Michigan Technological University. The MTU Tech Career Fair brings together the brightest students from engineering, computer science, business, and science disciplines with leading employers across technology, manufacturing, aerospace, and beyond.

Whether you're hunting for your first internship, a co-op position, or a full-time role after graduation, this is your moment. Come prepared with your resume, dress professionally, and be ready to make lasting connections.

Over 80 companies will be in attendance, representing industries spanning software development, hardware engineering, data science, robotics, automotive, aerospace, energy, and more. This isn't just a job fair — it's a launchpad for your career.`,
  date: '2026-10-15',
  time: '10:00 AM',
  endTime: '4:00 PM',
  location: 'SDC Ballroom',
  address: 'Student Development Complex, Michigan Tech, Houghton, MI 49931',
  capacity: 600,
  registeredCount: 342,
  status: 'upcoming',
  tags: ['Career Fair', 'Networking', 'Engineering', 'Technology', 'Internships'],
  requiresApproval: true,
  isFree: true,
  organizer: {
    id: 'org-mtu-001',
    name: 'MTU Career Services',
    website: 'https://www.mtu.edu/career/',
  },
  socialLinks: {
    twitter: 'https://twitter.com/michigantech',
    instagram: 'https://instagram.com/michigantech',
  },
};

export const mockSpeakers: SpeakerEntity[] = [
  {
    id: 'spk-001',
    name: 'Dr. Angela Richards',
    title: 'Dean of Engineering',
    company: 'Michigan Tech University',
    bio: "Dr. Richards leads the College of Engineering at Michigan Tech, overseeing research and industry partnerships. She has 20+ years in academia and previously led R&D at Lockheed Martin.",
    type: 'keynote',
    tags: ['Leadership', 'Engineering', 'Academia'],
  },
  {
    id: 'spk-002',
    name: 'James Park',
    title: 'Senior Engineering Manager',
    company: 'Google',
    bio: "James manages multiple product teams at Google Cloud. A Michigan Tech alum ('09), he's been instrumental in growing Google's presence in the Midwest tech ecosystem.",
    type: 'speaker',
    linkedIn: '#',
    tags: ['Cloud', 'Engineering Management', 'Alumni'],
  },
  {
    id: 'spk-003',
    name: 'Priya Sharma',
    title: 'Director of Product Engineering',
    company: 'Apple',
    bio: "Priya leads product engineering for Apple's silicon division. With a background in computer architecture, she has shipped multiple generations of Apple's custom chips and holds 15 patents.",
    type: 'speaker',
    linkedIn: '#',
    tags: ['Hardware', 'Silicon', 'Product'],
  },
  {
    id: 'spk-004',
    name: 'Marcus Thompson',
    title: 'VP of University Recruiting',
    company: 'Amazon',
    bio: "Marcus heads Amazon's technical university recruiting program, hiring thousands of new grads annually. He is passionate about creating pathways for underrepresented students in tech.",
    type: 'panelist',
    linkedIn: '#',
    tags: ['Recruiting', 'Hiring', 'DEI'],
  },
  {
    id: 'spk-005',
    name: 'Lisa Chen',
    title: 'Software Engineer II',
    company: 'Microsoft',
    bio: "Lisa graduated from MTU in 2021 with a CS degree and joined Microsoft's Azure team. She specializes in distributed systems and cloud infrastructure.",
    type: 'panelist',
    linkedIn: '#',
    tags: ['Software Engineering', 'Azure', 'Alumni'],
  },
  {
    id: 'spk-006',
    name: 'Carlos Rivera',
    title: 'Founder & CTO',
    company: 'NovaBridge AI',
    bio: "Carlos founded NovaBridge AI after 10 years at Ford and Tesla. His startup focuses on AI-powered predictive maintenance for manufacturing systems. MTU ME '12.",
    type: 'panelist',
    linkedIn: '#',
    tags: ['AI', 'Startups', 'Manufacturing'],
  },
];

export const mockPartners: PartnerEntity[] = [
  { id: 'p-001', name: 'Amazon', tier: 'platinum', logoColor: '#FF9900', website: '#' },
  { id: 'p-002', name: 'Microsoft', tier: 'platinum', logoColor: '#00A4EF', website: '#' },
  { id: 'p-003', name: 'Google', tier: 'platinum', logoColor: '#4285F4', website: '#' },

  { id: 'p-004', name: 'Ford Motor', tier: 'gold', logoColor: '#003890', website: '#' },
  { id: 'p-005', name: 'General Motors', tier: 'gold', logoColor: '#0172CE', website: '#' },
  { id: 'p-006', name: 'Caterpillar', tier: 'gold', logoColor: '#FFCD11', website: '#' },
  { id: 'p-007', name: 'Boeing', tier: 'gold', logoColor: '#1D4F8E', website: '#' },

  { id: 'p-008', name: 'Intel', tier: 'silver', logoColor: '#0071C5', website: '#' },
  { id: 'p-009', name: 'NVIDIA', tier: 'silver', logoColor: '#76B900', website: '#' },
  { id: 'p-010', name: 'Tesla', tier: 'silver', logoColor: '#CC0000', website: '#' },
  { id: 'p-011', name: 'IBM', tier: 'silver', logoColor: '#1F70C1', website: '#' },

  { id: 'p-012', name: 'MTU Lode', tier: 'media', logoColor: '#6F00FF', website: '#' },
  { id: 'p-013', name: 'Michigan Engineer', tier: 'media', logoColor: '#CC6600', website: '#' },
];

export const mockAgenda: AgendaItem[] = [
  {
    id: 'ag-001',
    time: '9:00 AM',
    endTime: '10:00 AM',
    title: 'Registration & Badge Pickup',
    description: 'Arrive early, pick up your badge, grab a coffee, and explore sponsor booths.',
    location: 'SDC Lobby',
    type: 'break',
  },
  {
    id: 'ag-002',
    time: '10:00 AM',
    endTime: '10:30 AM',
    title: 'Opening Remarks',
    description: 'Welcome from MTU Career Services and the Dean of Engineering.',
    speaker: 'Dr. Angela Richards',
    speakerId: 'spk-001',
    location: 'SDC Ballroom',
    type: 'main',
  },
  {
    id: 'ag-003',
    time: '10:30 AM',
    endTime: '11:30 AM',
    title: 'Keynote: The Future of Engineering Careers',
    description:
      'An inspiring look at where engineering careers are headed in the era of AI, automation, and global challenges.',
    speaker: 'Dr. Angela Richards',
    speakerId: 'spk-001',
    location: 'SDC Ballroom',
    type: 'keynote',
  },
  {
    id: 'ag-004',
    time: '11:30 AM',
    endTime: '12:00 PM',
    title: 'Company Spotlights',
    description: 'Featured presentations from our Platinum sponsors — 10 minutes each.',
    location: 'SDC Ballroom',
    type: 'main',
  },
  {
    id: 'ag-005',
    time: '12:00 PM',
    endTime: '1:00 PM',
    title: 'Networking Lunch',
    description:
      'Catered lunch provided. Mix and mingle with recruiters and hiring managers in an informal setting.',
    location: 'SDC Atrium',
    type: 'networking',
  },
  {
    id: 'ag-006',
    time: '1:00 PM',
    endTime: '2:00 PM',
    title: 'Panel: Breaking Into Big Tech',
    description:
      'Industry professionals share their journey, what they look for in candidates, and advice for landing your dream role.',
    speaker: 'James Park, Priya Sharma, Marcus Thompson',
    location: 'SDC Main Hall',
    type: 'main',
  },
  {
    id: 'ag-007',
    time: '2:00 PM',
    endTime: '3:00 PM',
    title: 'Resume Review Sessions',
    description:
      'One-on-one resume critiques with industry professionals. Sign up at the event (limited slots).',
    location: 'SDC Breakout Rooms',
    type: 'workshop',
  },
  {
    id: 'ag-008',
    time: '3:00 PM',
    endTime: '3:45 PM',
    title: 'Employer Q&A & Open Networking',
    description: 'Visit company booths, ask questions, and hand your resume directly to recruiters.',
    location: 'SDC Ballroom',
    type: 'networking',
  },
  {
    id: 'ag-009',
    time: '3:45 PM',
    endTime: '4:00 PM',
    title: 'Closing Remarks & Raffle',
    description: 'Wrap-up, key announcements, and raffle prize giveaway for registered attendees.',
    location: 'SDC Ballroom',
    type: 'main',
  },
];

export const eventStats = [
  { label: 'Companies', value: '80+' },
  { label: 'Students Expected', value: '600+' },
  { label: 'Open Roles', value: '1,200+' },
  { label: 'Industry Speakers', value: '6' },
];
