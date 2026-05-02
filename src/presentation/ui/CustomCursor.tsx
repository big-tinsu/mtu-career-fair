'use client';

import { useEffect, useRef, useState } from 'react';

export function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (ref.current) {
        ref.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    // cursor:none !important on * means getComputedStyle always returns 'none',
    // so we walk the DOM tree and check for interactive elements or explicit inline styles
    const checkPointer = (e: MouseEvent) => {
      let el = e.target as HTMLElement | null;
      while (el && el !== document.body) {
        const tag = el.tagName.toLowerCase();
        if (tag === 'a' || tag === 'button' || el.getAttribute('role') === 'button') {
          setIsPointer(true);
          return;
        }
        if (el.style?.cursor === 'pointer' || el.classList?.contains('cursor-pointer')) {
          setIsPointer(true);
          return;
        }
        el = el.parentElement;
      }
      setIsPointer(false);
    };

    window.addEventListener('mousemove', move, { passive: true });
    window.addEventListener('mouseover', checkPointer, { passive: true });
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', checkPointer);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{ willChange: 'transform' }}
    >
      {isPointer ? (
        <div
          style={{
            width: 22,
            height: 22,
            borderRadius: '50%',
            backgroundColor: 'white',
            border: '2px solid rgba(0,0,0,0.25)',
            transform: 'translate(-50%, -50%)',
          }}
        />
      ) : (
        <svg width="46" height="56" viewBox="0 0 46 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M3 3 L3 45 L14 33 L22 52 L31 48 L23 30 L39 30 Z"
            fill="#226C3D"
            stroke="white"
            strokeWidth="2.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      )}
    </div>
  );
}
