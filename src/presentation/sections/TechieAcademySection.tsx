'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { viewportConfig } from '@/lib/animations';

const VIDEOS = [
  {
    title: 'Techie Academy — Career Leap',
    src: '/videos/techie-academy/techie-one.mp4',
  },
  {
    title: 'Techie Academy — Skills That Matter',
    src: '/videos/techie-academy/techie-two.mp4',
  },
  {
    title: 'Techie Academy — Real Stories',
    src: '/videos/techie-academy/techie-three.mp4',
  },
  {
    title: 'Techie Academy — Community Impact',
    src: '/videos/techie-academy/techie-four.mp4',
  },
];

export function TechieAcademySection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % VIDEOS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + VIDEOS.length) % VIDEOS.length);
  };

  return (
    <section
      id='techie-academy'
      className='bg-[#F2E4CC] py-12 md:py-16 overflow-hidden'
    >
      <div className='mx-auto max-w-[1400px] px-5 sm:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          className='text-center mb-10 md:mb-12'
        >
          <p className='text-[#226C3D] font-bold uppercase tracking-[0.2em] text-xs mb-4'>
            Featured Partnership
          </p>
          <h2 className='font-instrument italic text-5xl md:text-7xl text-[#1A1A1A] leading-none mb-6'>
            Techie Academy
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <p className="text-lg md:text-xl text-[#1A1A1A] leading-relaxed">
            Techie Academy is transforming career trajectories through innovative tech education. Our partnership provides students with hands-on experience, industry mentorship, and direct pathways to exciting opportunities in the technology sector.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row items-start gap-8"
          style={{ gap: 'clamp(2rem, 5vw, 4rem)' }}
        >
          {/* Left: Image — matches FAQ style */}
          <motion.div
            className="hidden md:block flex-shrink-0"
            style={{ width: '38%', position: 'sticky', top: '7rem' }}
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              style={{
                position: 'relative',
                borderRadius: 28,
                overflow: 'hidden',
                aspectRatio: '3/4',
                border: '3px solid #1A1A1A',
                boxShadow: '6px 6px 0 #1A1A1A',
              }}
            >
              <Image
                src="/images/techie-partnership.jpeg"
                alt="Techie Academy partnership"
                fill
                className="object-cover"
                sizes="40vw"
              />
              {/* Gold label overlay */}
              <div
                className="absolute bottom-5 left-5"
                style={{
                  backgroundColor: '#C9A227',
                  borderRadius: 8,
                  padding: '6px 14px',
                }}
              >
                <span
                  style={{
                    fontFamily: '"Instrument Serif", Georgia, serif',
                    fontStyle: 'italic',
                    fontSize: '1.05rem',
                    color: '#F2E4CC',
                  }}
                >
                  Techie Academy
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right: Manual Video Slider */}
          <div className='flex-1 basis-1/2 w-full mx-auto lg:mx-0'>
            <div className="relative mx-auto lg:mx-0 rounded-none border-2 border-[#1A1A1A] bg-white shadow-[0_10px_0_#1A1A1A]">
                  <div className='relative bg-[#1A1A1A] h-[500px] flex items-center justify-center'>
                    <video
                      className='max-h-full max-w-full object-contain'
                      src={VIDEOS[activeIndex].src}
                      controls
                      autoPlay
                      playsInline
                      preload='metadata'
                      key={activeIndex}
                    />
                  </div>
                  <div className='px-5 py-4 bg-white border-t-2 border-[#1A1A1A]'>
                    <p className='text-base font-semibold text-[#1A1A1A] truncate'>
                      {VIDEOS[activeIndex].title}
                    </p>
                    <div className='flex items-center justify-between mt-2'>
                      <p className='text-xs text-[#7A6F62]'>
                        Techie Academy alumni
                      </p>
                      <p className='text-xs font-bold text-[#1A1A1A]'>
                        {activeIndex + 1} / {VIDEOS.length}
                      </p>
                    </div>
                  </div>
            </div>

            {/* Custom Controls */}
            <div className='mt-8 flex items-center gap-4 justify-center'>
              <button
                onClick={handlePrev}
                className='flex items-center justify-center w-12 h-12 rounded-full border-2 border-[#1A1A1A] bg-white text-[#1A1A1A] shadow-[0_4px_0_#1A1A1A] hover:translate-y-[2px] hover:shadow-[0_2px_0_#1A1A1A] transition-all'
              >
                <span className='text-xl'>←</span>
              </button>
              <button
                onClick={handleNext}
                className='flex items-center justify-center w-12 h-12 rounded-full border-2 border-[#1A1A1A] bg-[#226C3D] text-[#F2E4CC] shadow-[0_4px_0_#1A1A1A] hover:translate-y-[2px] hover:shadow-[0_2px_0_#1A1A1A] transition-all'
              >
                <span className='text-xl'>→</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
