'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';

// ── Floating particle ─────────────────────────────────────────────────────────
function Particle({ x, y, accent }: { x: number; y: number; accent: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: [0, 0.7, 0], scale: [0, 1, 0], y: [0, -60], x: [0, (Math.random() - 0.5) * 40] }}
      transition={{ duration: 2.5, ease: 'easeOut' }}
      style={{
        position: 'absolute', left: x, top: y,
        width: 6, height: 6, borderRadius: '50%',
        background: accent, boxShadow: `0 0 14px 4px ${accent}88`,
        pointerEvents: 'none', zIndex: 2,
      }}
    />
  );
}

// ── 3D Rotating Orb ───────────────────────────────────────────────────────────
function HeroOrb() {
  const orbRef = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const sp = { stiffness: 80, damping: 20 };
  const rotateX = useSpring(useTransform(rawY, [-200, 200], [25, -25]), sp);
  const rotateY = useSpring(useTransform(rawX, [-200, 200], [-25, 25]), sp);

  useEffect(() => {
    const move = (e: MouseEvent) => { rawX.set(e.clientX - window.innerWidth / 2); rawY.set(e.clientY - window.innerHeight / 2); };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [rawX, rawY]);

  return (
    <motion.div
      ref={orbRef}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', position: 'relative', width: 320, height: 320 }}
    >
      {/* Outer ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          border: '1px dashed rgba(82,183,136,0.25)',
        }}
      >
        <div style={{ position: 'absolute', top: -5, left: '50%', width: 10, height: 10, borderRadius: '50%', background: '#52b788', boxShadow: '0 0 12px #52b788', transform: 'translateX(-50%)' }} />
      </motion.div>

      {/* Middle ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute', inset: 28, borderRadius: '50%',
          border: '1px dashed rgba(0,229,255,0.2)',
        }}
      >
        <div style={{ position: 'absolute', bottom: -5, left: '50%', width: 8, height: 8, borderRadius: '50%', background: '#00e5ff', boxShadow: '0 0 10px #00e5ff', transform: 'translateX(-50%)' }} />
      </motion.div>

      {/* Inner ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
        style={{ position: 'absolute', inset: 56, borderRadius: '50%', border: '1px solid rgba(255,202,40,0.15)' }}
      >
        <div style={{ position: 'absolute', right: -4, top: '50%', width: 7, height: 7, borderRadius: '50%', background: '#ffca28', boxShadow: '0 0 10px #ffca28', transform: 'translateY(-50%)' }} />
      </motion.div>

      {/* Core globe */}
      <div style={{
        position: 'absolute', inset: 80, borderRadius: '50%',
        background: 'radial-gradient(circle at 35% 35%, rgba(82,183,136,0.35), rgba(0,0,0,0.8) 70%)',
        border: '1px solid rgba(82,183,136,0.3)',
        boxShadow: '0 0 40px rgba(82,183,136,0.2), inset 0 0 40px rgba(0,0,0,0.6)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{ fontFamily: "'Syne', sans-serif", fontSize: '28px', fontWeight: 800, letterSpacing: '2px', background: 'linear-gradient(135deg, #52b788, #00e5ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>RA</span>
      </div>

      {/* Float labels */}
      {[
        { label: '⚡ Full Stack', top: '0%', left: '55%', accent: '#52b788' },
        { label: '🎨 UI/UX', top: '60%', left: '-10%', accent: '#00e5ff' },
        { label: '🤖 AI', top: '75%', left: '60%', accent: '#ffca28' },
      ].map((tag, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.8 }}
          style={{
            position: 'absolute', top: tag.top, left: tag.left,
            background: 'rgba(7,11,10,0.85)', backdropFilter: 'blur(10px)',
            border: `1px solid ${tag.accent}44`, borderRadius: 100,
            padding: '6px 14px', fontSize: '11px', fontWeight: 700,
            color: tag.accent, whiteSpace: 'nowrap',
            boxShadow: `0 0 20px ${tag.accent}22`,
          }}
        >
          {tag.label}
        </motion.div>
      ))}
    </motion.div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function ContactHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; accent: string }[]>([]);
  const accents = ['#52b788', '#00e5ff', '#ffca28', '#76ff03'];

  const handleClick = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const id = Date.now();
    const accent = accents[Math.floor(Math.random() * accents.length)];
    setParticles(p => [...p, { id, x: e.clientX - rect.left, y: e.clientY - rect.top, accent }]);
    setTimeout(() => setParticles(p => p.filter(pt => pt.id !== id)), 2600);
  };

  const words = ["Let's", 'Build', 'Something', 'Extraordinary'];

  return (
    <section
      ref={sectionRef}
      onClick={handleClick}
      style={{
        padding: '8rem 6vw 5rem', position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(180deg, #060d0b 0%, #0b0f0e 100%)',
        minHeight: '92vh', display: 'flex', alignItems: 'center', cursor: 'crosshair',
      }}
    >
      {/* Animated mesh gradient bg */}
      <motion.div
        animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `
            radial-gradient(ellipse 60% 50% at 20% 30%, rgba(82,183,136,0.08) 0%, transparent 60%),
            radial-gradient(ellipse 50% 60% at 80% 70%, rgba(0,229,255,0.05) 0%, transparent 60%),
            radial-gradient(ellipse 40% 40% at 60% 20%, rgba(255,202,40,0.04) 0%, transparent 55%)
          `,
        }}
      />

      {/* Grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `linear-gradient(rgba(82,183,136,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(82,183,136,0.025) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />

      {/* Click particles */}
      {particles.map(p => <Particle key={p.id} x={p.x} y={p.y} accent={p.accent} />)}

      {/* Content grid */}
      <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center', position: 'relative', zIndex: 3 }}>

        {/* Left */}
        <div>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: 'rgba(82,183,136,0.07)', border: '1px solid rgba(82,183,136,0.22)',
              padding: '7px 20px', borderRadius: 100, marginBottom: 36,
            }}
          >
            <motion.span
              animate={{ opacity: [1, 0.3, 1], scale: [1, 1.5, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              style={{ width: 7, height: 7, borderRadius: '50%', background: '#52b788', flexShrink: 0, boxShadow: '0 0 8px #52b788' }}
            />
            <span style={{ color: '#52b788', fontSize: '11px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase' }}>
              Get In Touch
            </span>
          </motion.div>

          {/* Word-by-word 3D reveal */}
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, lineHeight: 1.0, letterSpacing: '-2px', margin: '0 0 28px', fontSize: 'clamp(3rem,5.5vw,5.5rem)', perspective: '800px' }}>
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 60, rotateX: -40 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: false }}
                transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  display: 'inline-block', marginRight: '0.22em',
                  color: i === 2 ? 'transparent' : i === 3 ? 'transparent' : '#e8f5ec',
                  background: i >= 2
                    ? (i === 2
                      ? 'linear-gradient(90deg, #52b788, #00e5ff)'
                      : 'linear-gradient(90deg, #00e5ff, #ffca28)')
                    : 'none',
                  WebkitBackgroundClip: i >= 2 ? 'text' : 'unset',
                  backgroundClip: i >= 2 ? 'text' : 'unset',
                  WebkitTextFillColor: i >= 2 ? 'transparent' : '#e8f5ec',
                }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.55, duration: 0.7 }}
            style={{ color: 'rgba(232,245,236,0.5)', fontSize: '1.05rem', lineHeight: 1.8, maxWidth: 460, marginBottom: 44 }}
          >
            Have a project in mind? Let&apos;s turn your vision into a high-performance digital experience — from concept to deployment.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.65 }}
            style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 56 }}
          >
            {[
              { label: 'Book a Call →', solid: true },
              { label: 'Send a Message', solid: false },
            ].map((btn, i) => (
              <motion.a
                key={i}
                href={btn.solid ? '#booking' : '#form'}
                whileHover={{ scale: 1.05, boxShadow: btn.solid ? '0 0 40px rgba(82,183,136,0.4)' : '0 0 20px rgba(255,255,255,0.06)' }}
                whileTap={{ scale: 0.96 }}
                style={{
                  padding: '13px 28px', borderRadius: 100, cursor: 'pointer',
                  fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '14px',
                  letterSpacing: '0.5px', textDecoration: 'none',
                  background: btn.solid ? '#52b788' : 'transparent',
                  color: btn.solid ? '#060d0b' : 'rgba(232,245,236,0.7)',
                  border: btn.solid ? 'none' : '1px solid rgba(255,255,255,0.12)',
                  transition: 'box-shadow 0.2s',
                }}
              >
                {btn.label}
              </motion.a>
            ))}
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.8 }}
            style={{ display: 'flex', gap: 32, paddingTop: 32, borderTop: '1px solid rgba(82,183,136,0.1)' }}
          >
            {[
              { val: '< 24hr', label: 'Response time' },
              { val: '100%', label: 'Client satisfaction' },
              { val: '20+', label: 'Projects delivered' },
            ].map((s, i) => (
              <div key={i}>
                <p style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.7rem', fontWeight: 800, color: '#52b788', margin: '0 0 3px', lineHeight: 1 }}>{s.val}</p>
                <p style={{ fontSize: '11px', color: 'rgba(232,245,236,0.3)', textTransform: 'uppercase', letterSpacing: '1.5px', margin: 0 }}>{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: 3D Orb */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <HeroOrb />
        </motion.div>
      </div>

      {/* Bottom hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', zIndex: 3, textAlign: 'center' }}
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <span style={{ color: 'rgba(82,183,136,0.3)', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase' }}>Click anywhere for magic ✦</span>
        </motion.div>
      </motion.div>

      <style>{`@keyframes pulseDot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.35;transform:scale(1.6)} }`}</style>
    </section>
  );
}