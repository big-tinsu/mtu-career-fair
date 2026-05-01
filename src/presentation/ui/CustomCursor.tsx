'use client';

import { useEffect, useRef } from 'react';

export function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf: number;
    let tx = -100, ty = -100;       // target (exact mouse)
    let rx = -100, ry = -100;       // ring current (lerped)
    let rs = 1,    rts = 1;         // ring scale current / target

    const LERP_POS   = 0.13;
    const LERP_SCALE = 0.14;
    const DOT_R      = 6;           // dot radius px (diameter 12)
    const RING_R     = 28;          // ring radius px (diameter 56)

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    /* ── mouse move: dot is instant ─────────────────────────── */
    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${tx - DOT_R}px, ${ty - DOT_R}px)`;
      }
    };

    /* ── hover state: ring grows ─────────────────────────────── */
    const onOver = (e: MouseEvent) => {
      if ((e.target as Element).closest('a, button, [role="button"], input, select, textarea')) {
        rts = 1.8;
        dotRef.current?.classList.add('scale-0');
      }
    };
    const onOut = (e: MouseEvent) => {
      if ((e.target as Element).closest('a, button, [role="button"], input, select, textarea')) {
        rts = 1;
        dotRef.current?.classList.remove('scale-0');
      }
    };

    /* ── animation loop ──────────────────────────────────────── */
    const tick = () => {
      rx = lerp(rx, tx, LERP_POS);
      ry = lerp(ry, ty, LERP_POS);
      rs = lerp(rs, rts, LERP_SCALE);

      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(${rx - RING_R}px, ${ry - RING_R}px) scale(${rs})`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout',  onOut);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout',  onOut);
    };
  }, []);

  return (
    <>
      {/* Dot — exact position, instant */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-3 h-3 rounded-full bg-[#226C3D] pointer-events-none z-[9999] transition-transform duration-150"
        style={{ willChange: 'transform' }}
      />

      {/* Ring — lags behind, scale on hover */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-14 h-14 rounded-full border-2 border-[#226C3D] pointer-events-none z-[9998]"
        style={{ willChange: 'transform' }}
      />
    </>
  );
}
