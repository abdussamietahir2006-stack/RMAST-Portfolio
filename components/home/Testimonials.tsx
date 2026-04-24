'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';

const testimonialData = [
  {
    quote: 'Working with RMAST was a game changer. The level of detail and execution is unmatched. Our platform is now lightning-fast and absolutely beautiful. Every feature we asked for was delivered beyond our expectations.',
    name: 'Sarah Ahmed',
    role: 'CEO, TechFlow',
    avatar: 'SA',
    accent: '#52b788',
    accentDim: 'rgba(82,183,136,0.12)',
    stars: 5,
    tag: 'Web Development',
    metric: '+240%',
    metricLabel: 'user engagement',
  },
  {
    quote: 'The 3D animations he built increased our conversion rate by 40%. This is creative excellence meeting technical perfection. I have worked with many developers — RMAST operates on a completely different level.',
    name: 'James Okafor',
    role: 'Founder, LuxeStore',
    avatar: 'JO',
    accent: '#00e5ff',
    accentDim: 'rgba(0,229,255,0.1)',
    stars: 5,
    tag: '3D & UI/UX',
    metric: '+40%',
    metricLabel: 'conversion rate',
  },
  {
    quote: 'Saved us 20+ hours per week with AI automation. Not only is he talented but he deeply understands business problems. A true partner who thinks about your growth, not just the task list.',
    name: 'Layla Hassan',
    role: 'Operations Lead, StartupX',
    avatar: 'LH',
    accent: '#ffca28',
    accentDim: 'rgba(255,202,40,0.1)',
    stars: 5,
    tag: 'AI Automations',
    metric: '20hr',
    metricLabel: 'saved per week',
  },
  {
    quote: 'From wireframe to live product in 3 weeks. The admin dashboard alone was worth every penny — full CMS, booking system, leads management. We run our entire business through it now.',
    name: 'Omar Khalid',
    role: 'Director, Nexora Agency',
    avatar: 'OK',
    accent: '#76ff03',
    accentDim: 'rgba(118,255,3,0.08)',
    stars: 5,
    tag: 'Full Stack',
    metric: '3wk',
    metricLabel: 'zero to live',
  },
];

// ── Single 3D Card ────────────────────────────────────────────────────────────
function TestimonialCard({ t, isActive }: { t: typeof testimonialData[0]; isActive: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const sp = { stiffness: 180, damping: 22 };
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [8, -8]), sp);
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-8, 8]), sp);
  const glareX  = useSpring(useTransform(rawX, [-0.5, 0.5], [15, 85]), sp);
  const glareY  = useSpring(useTransform(rawY, [-0.5, 0.5], [15, 85]), sp);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleLeave = () => { rawX.set(0); rawY.set(0); };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        rotateX: isActive ? rotateX : 0,
        rotateY: isActive ? rotateY : 0,
        transformStyle: 'preserve-3d',
        position: 'relative',
        borderRadius: '24px',
        background: 'rgba(11,15,14,0.85)',
        border: `1px solid ${t.accent}28`,
        backdropFilter: 'blur(16px)',
        padding: '48px 44px',
        overflow: 'hidden',
        cursor: 'crosshair',
        boxShadow: isActive ? `0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px ${t.accent}18, 0 0 60px ${t.accentDim}` : 'none',
      }}
    >
      {/* Glare */}
      {isActive && (
        <motion.div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 3,
          background: useTransform([glareX, glareY], ([gx, gy]: number[]) =>
            `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.08) 0%, transparent 55%)`),
        }} />
      )}

      {/* Top-left accent bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '80px', height: '3px',
        background: `linear-gradient(90deg, ${t.accent}, transparent)`,
        borderRadius: '0 0 4px 0',
      }} />

      {/* Bottom bloom */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `radial-gradient(ellipse 90% 60% at 50% 120%, ${t.accentDim}, transparent 65%)`,
      }} />

      {/* Scan line */}
      {isActive && (
        <motion.div
          animate={{ y: ['0%', '100%'], opacity: [0, 0.45, 0] }}
          transition={{ duration: 2.5, ease: 'linear', repeat: Infinity, repeatDelay: 2 }}
          style={{
            position: 'absolute', left: 0, right: 0, height: '2px',
            background: `linear-gradient(90deg, transparent, ${t.accent}, transparent)`,
            zIndex: 4, pointerEvents: 'none',
          }}
        />
      )}

      {/* Giant quote mark */}
      <div style={{
        position: 'absolute', top: 20, right: 32,
        fontFamily: 'Georgia, serif', fontSize: '140px', lineHeight: 1,
        color: t.accent, opacity: 0.06, pointerEvents: 'none', userSelect: 'none',
        fontWeight: 900,
      }}>
        "
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2 }}>

        {/* Top row: tag + stars */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: t.accentDim, border: `1px solid ${t.accent}30`,
            padding: '5px 14px', borderRadius: '100px',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: t.accent, flexShrink: 0 }} />
            <span style={{ color: t.accent, fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
              {t.tag}
            </span>
          </div>
          <div style={{ display: 'flex', gap: '3px' }}>
            {Array.from({ length: t.stars }).map((_, i) => (
              <motion.span
                key={i}
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: i * 0.08 + 0.2, type: 'spring', stiffness: 400 }}
                style={{ color: '#ffca28', fontSize: '14px' }}
              >★</motion.span>
            ))}
          </div>
        </div>

        {/* Quote */}
        <p style={{
          color: 'rgba(232,245,236,0.85)',
          fontSize: '1.05rem', lineHeight: 1.8,
          fontStyle: 'italic', marginBottom: '36px',
          letterSpacing: '0.01em',
        }}>
          &ldquo;{t.quote}&rdquo;
        </p>

        {/* Divider */}
        <div style={{ height: '1px', background: `linear-gradient(90deg, ${t.accent}44, transparent)`, marginBottom: '28px' }} />

        {/* Author + Metric row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: 48, height: 48, borderRadius: '50%',
              background: `linear-gradient(135deg, ${t.accentDim}, rgba(0,0,0,0.4))`,
              border: `2px solid ${t.accent}44`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '14px',
              color: t.accent, flexShrink: 0,
            }}>
              {t.avatar}
            </div>
            <div>
              <p style={{ color: '#e8f5ec', fontWeight: 700, fontSize: '1rem', margin: '0 0 3px', fontFamily: "'Syne', sans-serif" }}>{t.name}</p>
              <p style={{ color: 'rgba(232,245,236,0.45)', fontSize: '0.82rem', margin: 0 }}>{t.role}</p>
            </div>
          </div>

          {/* Metric */}
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.8rem', fontWeight: 800, color: t.accent, margin: '0 0 2px', lineHeight: 1 }}>
              {t.metric}
            </p>
            <p style={{ color: 'rgba(232,245,236,0.35)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', margin: 0 }}>
              {t.metricLabel}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Main ─────────────────────────────────────────────────────────────────────
export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const total = testimonialData.length;

  // Auto-rotate
  useEffect(() => {
    const id = setInterval(() => {
      setDirection(1);
      setActive(a => (a + 1) % total);
    }, 4000);
    return () => clearInterval(id);
  }, [total]);

  const goTo = (i: number) => {
    setDirection(i > active ? 1 : -1);
    setActive(i);
  };

  const variants = {
    enter:  (d: number) => ({ opacity: 0, x: d * 80,  scale: 0.92, rotateY: d * 12 }),
    center:              ({ opacity: 1, x: 0,       scale: 1,    rotateY: 0 }),
    exit:   (d: number) => ({ opacity: 0, x: d * -80, scale: 0.92, rotateY: d * -12 }),
  };

  const t = testimonialData[active];

  return (
    <section style={{ padding: '9rem 6vw', background: '#0b0f0e', position: 'relative', overflow: 'hidden' }}>

      {/* BG */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `linear-gradient(rgba(82,183,136,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(82,183,136,0.022) 1px, transparent 1px)`,
        backgroundSize: '64px 64px',
      }} />
      <motion.div
        animate={{ background: [
          `radial-gradient(ellipse 60% 50% at 30% 50%, ${t.accentDim}, transparent 65%)`,
          `radial-gradient(ellipse 60% 50% at 70% 50%, ${t.accentDim}, transparent 65%)`,
        ]}}
        transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        style={{ textAlign: 'center', marginBottom: '5rem', position: 'relative', zIndex: 1 }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            background: 'rgba(82,183,136,0.07)', border: '1px solid rgba(82,183,136,0.2)',
            padding: '7px 20px', borderRadius: '100px', marginBottom: '28px',
          }}
        >
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#52b788', boxShadow: '0 0 8px #52b788', animation: 'pulseDot 1.8s ease infinite', flexShrink: 0 }} />
          <span style={{ color: '#52b788', fontSize: '11px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase' }}>Testimonials</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ delay: 0.1 }}
          style={{ fontFamily: "'Syne', sans-serif", color: '#e8f5ec', fontSize: 'clamp(2.2rem, 5.5vw, 4rem)', fontWeight: 800, letterSpacing: '-1.5px', lineHeight: 1.05, marginBottom: '16px' }}
        >
          What Clients{' '}
          <span style={{ background: 'linear-gradient(90deg, #52b788, #ffca28)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Say
          </span>
        </motion.h2>

        <p style={{ color: 'rgba(232,245,236,0.4)', fontSize: '1rem' }}>
          Real words from real partners.
        </p>
      </motion.div>

      {/* Carousel */}
      <div style={{ maxWidth: '820px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Thumbnail strip (inactive previews) */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '36px' }}>
          {testimonialData.map((item, i) => (
            <motion.button
              key={i}
              onClick={() => goTo(i)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '8px 20px', borderRadius: '100px',
                border: `1px solid ${i === active ? item.accent : 'rgba(255,255,255,0.08)'}`,
                background: i === active ? item.accentDim : 'transparent',
                color: i === active ? item.accent : 'rgba(232,245,236,0.35)',
                fontSize: '12px', fontWeight: 700, cursor: 'pointer',
                letterSpacing: '1px', textTransform: 'uppercase',
                transition: 'all 0.3s',
              }}
            >
              {item.name.split(' ')[0]}
            </motion.button>
          ))}
        </div>

        {/* Main card with slide+3D transition */}
        <div style={{ position: 'relative', perspective: '1200px' }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={active}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <TestimonialCard t={testimonialData[active]} isActive />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress bar + nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '36px', justifyContent: 'center' }}>

          {/* Prev */}
          <motion.button
            onClick={() => goTo((active - 1 + total) % total)}
            whileHover={{ scale: 1.12, borderColor: t.accent }}
            whileTap={{ scale: 0.9 }}
            style={{
              width: 42, height: 42, borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.12)', background: 'transparent',
              color: 'rgba(232,245,236,0.6)', fontSize: '16px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'border-color 0.2s',
            }}
          >←</motion.button>

          {/* Dots */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {testimonialData.map((item, i) => (
              <motion.button
                key={i}
                onClick={() => goTo(i)}
                animate={{
                  width: i === active ? 32 : 8,
                  background: i === active ? item.accent : 'rgba(255,255,255,0.15)',
                }}
                transition={{ duration: 0.35 }}
                style={{ height: 8, borderRadius: '4px', border: 'none', cursor: 'pointer' }}
              />
            ))}
          </div>

          {/* Next */}
          <motion.button
            onClick={() => goTo((active + 1) % total)}
            whileHover={{ scale: 1.12, borderColor: t.accent }}
            whileTap={{ scale: 0.9 }}
            style={{
              width: 42, height: 42, borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.12)', background: 'transparent',
              color: 'rgba(232,245,236,0.6)', fontSize: '16px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'border-color 0.2s',
            }}
          >→</motion.button>
        </div>

        {/* Auto-play progress bar */}
        <div style={{ height: '2px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', marginTop: '20px', overflow: 'hidden' }}>
          <motion.div
            key={active}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 4, ease: 'linear' }}
            style={{ height: '100%', background: t.accent, borderRadius: '2px' }}
          />
        </div>
        <p style={{ textAlign: 'center', color: 'rgba(232,245,236,0.2)', fontSize: '11px', marginTop: '10px', letterSpacing: '1px' }}>
          {active + 1} / {total} 
        </p>
      </div>

      <style>{`
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.35; transform: scale(1.6); }
        }
      `}</style>
    </section>
  );
}