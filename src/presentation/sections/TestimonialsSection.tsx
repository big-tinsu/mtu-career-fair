'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';

const quotes = [
  {
    text: 'AURA Career Fair completely changed how I approached my job search. Landed 3 interviews within a week.',
    name: 'Chisom Adaeze',
    handle: '@chisomwrites',
    dept: 'Mass Communication',
    initials: 'CA',
    accent: '#226C3D',
    rot: -7,
    from: { x: -260, y: -180, rotate: -22, opacity: 0 },
  },
  {
    text: 'The CV clinic rewrote my entire summary in 5 minutes. My callback rate went from 0 to 4 in a month.',
    name: 'Tunde Afolabi',
    handle: '@tunde_builds',
    dept: 'Computer Science',
    initials: 'TA',
    accent: '#8B6914',
    rot: 6,
    from: { x: 280, y: -120, rotate: 24, opacity: 0 },
  },
  {
    text: 'I shook hands with 4 company reps and walked away with an internship offer. No cap.',
    name: 'Blessing Eze',
    handle: '@blessingeze_',
    dept: 'Business Administration',
    initials: 'BE',
    accent: '#1A5430',
    rot: -4,
    from: { x: -180, y: 220, rotate: -18, opacity: 0 },
  },
  {
    text: "The panel talk alone was worth more than a semester of lectures. These speakers are the real deal.",
    name: 'Emeka Okafor',
    handle: '@emekacodes',
    dept: 'Engineering',
    initials: 'EO',
    accent: '#226C3D',
    rot: 10,
    from: { x: 300, y: 160, rotate: 30, opacity: 0 },
  },
  {
    text: "I've been to career fairs before. AURA is on a completely different level. Don't miss this.",
    name: 'Fadeke Adesanya',
    handle: '@fadeketalks',
    dept: 'Law',
    initials: 'FA',
    accent: '#C9A227',
    rot: -9,
    from: { x: -60, y: 260, rotate: -28, opacity: 0 },
  },
  {
    text: 'The networking lunch was everything. Left with 12 LinkedIn connections including two CEOs.',
    name: 'Kemi Badmus',
    handle: '@kemibadmus',
    dept: 'Economics',
    initials: 'KB',
    accent: '#4A7C3F',
    rot: 5,
    from: { x: 200, y: -240, rotate: 20, opacity: 0 },
  },
];

function Card({ q, i }: { q: typeof quotes[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotX = useSpring(useTransform(y, [-60, 60], [8, -8]), { stiffness: 400, damping: 30 });
  const rotY = useSpring(useTransform(x, [-60, 60], [-8, 8]), { stiffness: 400, damping: 30 });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  }
  function onMouseLeave() {
    x.set(0);
    y.set(0);
    setHovered(false);
  }

  return (
    <motion.div
      ref={ref}
      initial={q.from}
      whileInView={{ x: 0, y: 0, rotate: q.rot, opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 1.1,
        delay: i * 0.08,
        ease: [0.16, 1, 0.3, 1],
        opacity: { duration: 0.4 },
      }}
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }}
      whileHover={{ rotate: 0, scale: 1.06, zIndex: 20 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onMouseEnter={() => setHovered(true)}
      className="relative bg-white rounded-2xl p-6 shadow-xl cursor-default select-none"
    >
      {/* Top accent bar */}
      <div className="h-1 w-10 rounded-full mb-5" style={{ backgroundColor: q.accent }} />

      {/* Quote */}
      <p className="text-[#1A1A1A] text-sm leading-relaxed mb-6 font-medium">
        &ldquo;{q.text}&rdquo;
      </p>

      {/* Author row */}
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0"
          style={{ backgroundColor: q.accent }}
        >
          {q.initials}
        </div>
        <div>
          <p className="text-[#1A1A1A] text-[13px] font-bold leading-none mb-0.5">{q.name}</p>
          <p className="text-[#9C8E7C] text-[11px]">{q.dept}</p>
        </div>
        <div className="ml-auto">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#9C8E7C]">
            {q.handle}
          </span>
        </div>
      </div>

      {/* Corner quote mark */}
      <div
        className="absolute top-4 right-5 font-instrument italic leading-none opacity-10 select-none pointer-events-none"
        style={{ fontSize: 64, color: q.accent }}
      >
        &ldquo;
      </div>

      {/* Hovered glow ring */}
      {hovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{ boxShadow: `0 0 0 2px ${q.accent}40, 0 24px 48px ${q.accent}25` }}
        />
      )}
    </motion.div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="relative bg-[#1A1A1A] overflow-hidden py-28">

      {/* Giant ghost watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden
      >
        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
          className="font-instrument italic text-white whitespace-nowrap"
          style={{ fontSize: 'clamp(5rem, 18vw, 18rem)', opacity: 0.04, lineHeight: 1 }}
        >
          Beyond
        </motion.p>
      </div>

      {/* Floating noise texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat',
          backgroundSize: '200px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <p className="text-[#226C3D] text-[10px] font-bold uppercase tracking-[0.3em] mb-4">
            Attendee Stories
          </p>
          <h2
            className="font-instrument italic text-white leading-[0.88]"
            style={{ fontSize: 'clamp(2.8rem, 6vw, 5.5rem)' }}
          >
            Real People.<br />
            <span style={{ color: '#C9A227' }}>Real Impact.</span>
          </h2>
        </motion.div>

        {/* Cards — masonry-style 3 columns, perspective container */}
        <div
          className="grid gap-6"
          style={{
            perspective: 1200,
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          }}
        >
          {quotes.map((q, i) => (
            <Card key={q.name} q={q} i={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 text-center"
        >
          <p className="text-[#9C8E7C] text-sm mb-2">Join hundreds of students who already registered</p>
          <p className="font-instrument italic text-white/30 text-lg">May 11, 2026 · MTU Multi-Purpose Hall</p>
        </motion.div>
      </div>
    </section>
  );
}
