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
    // twitter: 'https://twitter.com/mountaintopuni',
  },
};

export const mockSpeakers: SpeakerEntity[] = [
  {
    id: 'spk-001',
    name: 'Apostle Ayooluwa Glory',
    title: 'Lead Pastor, Doxazo Global',
    company: 'Doxazo Global',
    bio: 'Lead Pastor of Doxazo Global — a purpose-driven leader and visionary trailblazer rooted in Lagos, Nigeria, with campus annexes in Sunderland, UK and New Brunswick, Canada. He holds a BSc in Mass Communication from Mountain Top University and a Master\'s in Sociology and Humanities, with certifications in Project Management, Entrepreneurship, and Facility Management. Driven by a clear Apostolic mandate to raise leaders who walk in kingdom authority, develop leadership capacity, and live out God\'s purpose with boldness and lasting impact.',
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
    type: 'moderator',
    photo: '/images/speakers/speaker5.jpg',
    linkedIn: '#',
    tags: ['HR', 'Talent', 'Career Growth'],
  },
  {
    id: 'spk-006',
    name: 'Peter Justin Akpan',
    title: 'Investment Professional',
    company: 'Impact Private Equity',
    bio: 'Peter Justin Akpan is an Investment Professional at an impact-focused private equity firm, where he drives capital into mission-driven businesses across Africa. He has executed over $35 million in impact investments spanning five African countries, helping businesses scale while generating measurable social outcomes. Before private equity, Peter spent three years in KPMG\'s Deal Advisory practice, advising on M&A and impact investment transactions worth more than $5 billion. Peter became a Chartered Accountant at 18, emerging as one of the youngest Chartered Accountants in Africa. He graduated with first-class honours in Accounting at 19 from the University of Calabar. At 23, he became a CFA Charterholder — one of the youngest to obtain the highest global professional qualification in Finance. Outside the corporate world, he enjoys public speaking, volunteering, and mentoring young people in identifying and maximising their potential.',
    type: 'panelist',
    photo: '/images/speakers/peter.jpeg',
    tags: ['Finance', 'Investment', 'Private Equity'],
  },
  {
    id: 'spk-007',
    name: 'Tiffany Ambrose',
    title: 'Anatomy Graduate & Career Development Advocate',
    company: 'Babcock University',
    bio: 'Tiffany Ambrose is a recent Anatomy graduate from Babcock University with a 4.21 CGPA and a growing focus on Occupational Health and Safety. She has completed globally recognised certifications with distinctions in health, leadership, and workplace wellbeing from institutions such as Stanford University and the University of Pennsylvania. With a strong interest in career development and professional positioning, Tiffany has built a rapidly growing network of professionals across industries by leveraging strategic communication and digital platforms. She is passionate about helping students bridge the gap between academic knowledge and real-world opportunities through intentional learning, networking, and self-development.',
    type: 'spotlight',
    photo: '/images/speakers/spotlight.png',
    tags: ['Career Development', 'Networking', 'Self-Development'],
  },
  {
    id: 'spk-004',
    name: 'Omodolapo Ajaguma',
    title: 'Corporate Executive & Coach',
    company: 'Future Leaders Foundation',
    bio: 'Omodolapo Ajagunna is a Nigerian fashion entrepreneur, Creative director, and CEO of Adire Enroyale—a contemporary brand dedicated to elevating traditional Adire textiles into modern, globally relevant fashion pieces. With a strong focus on cultural preservation and innovation, she has positioned Adire Enroyale as a brand that blends heritage craftsmanship with refined, premium design aesthetics. Through her work, Omodolapo champions the storytelling power of indigenous fabrics, contributing to the growing movement to promote Adire as a globally recognized cultural symbol.  ￼As a CEO, she is recognized for her commitment to supporting sustainable production and creating fashion that reflects both African identity and modern sophistication. Her leadership reflects a broader vision to place Nigerian textile artistry on the international stage while building a scalable, culturally rooted fashion business. She has also trained people who are now also business owners. She holds a Bachelor’s degree in Business Administration from Mountain Top University and also serves as a worship/music minister within and outside her church community. She’s happily married and blessed with a beautiful daughter.',
    type: 'panelist',
    photo: '/images/speakers/speaker4.JPG',
    linkedIn: '#',
    tags: ['Coaching', 'Corporate', 'Women in Leadership'],
  },
];

export const mockPartners: PartnerEntity[] = [
  { id: 'p-001', name: 'TOEFL', tier: 'platinum', logo: '/images/partners/toefl.jpeg', logoColor: '#004B87', website: '#' },
  { id: 'p-009', name: 'Hadley', tier: 'platinum', logo: '/images/partners/htg-logo.png', logoColor: '#1A1A1A', website: '#' },
  { id: 'p-010', name: 'Techie Academy', tier: 'gold', logo: '/images/partners/techie-academy.png', logoColor: '#226C3D', website: '#' },
  // { id: 'p-002', name: 'GTBank', tier: 'gold', logoColor: '#F26522', website: '#' },
  // { id: 'p-003', name: 'Access Bank', tier: 'gold', logoColor: '#E31E2D', website: '#' },
  // { id: 'p-004', name: 'Andela', tier: 'silver', logoColor: '#15803D', website: '#' },
  // { id: 'p-005', name: 'Flutterwave', tier: 'silver', logoColor: '#F5A623', website: '#' },
  // { id: 'p-006', name: 'Paystack', tier: 'silver', logoColor: '#00C3F7', website: '#' },
  // { id: 'p-007', name: 'MTU Lode', tier: 'media', logoColor: '#226C3D', website: '#' },
  // { id: 'p-008', name: 'Campus Herald', tier: 'media', logoColor: '#8B6914', website: '#' },
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
