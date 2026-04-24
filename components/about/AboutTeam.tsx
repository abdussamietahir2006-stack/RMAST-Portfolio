'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';

const skills = [
  { label: 'Next.js', level: 96, color: '#52b788' },
  { label: 'TypeScript', level: 92, color: '#00e5ff' },
  { label: 'MongoDB', level: 88, color: '#ffca28' },
  { label: 'UI/UX Design', level: 90, color: '#76ff03' },
];

const stats = [
  { value: '3+', label: 'Years Building' },
  { value: '40+', label: 'Projects Shipped' },
  { value: '100%', label: 'Client Satisfaction' },
];

// ── Animated Skill Bar ────────────────────────────────────────────────────────
function SkillBar({ skill, index, hovered }: { skill: typeof skills[0]; index: number; hovered: boolean }) {
  return (
    <div style={{ marginBottom: '14px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
        <span style={{ fontSize: '12px', color: 'rgba(232,245,236,0.6)', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 600 }}>
          {skill.label}
        </span>
        <motion.span
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ delay: index * 0.07 + 0.2 }}
          style={{ fontSize: '12px', color: skill.color, fontWeight: 700 }}
        >
          {skill.level}%
        </motion.span>
      </div>
      <div style={{ height: '3px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
        <motion.div
          animate={{ width: hovered ? `${skill.level}%` : '0%' }}
          transition={{ delay: index * 0.07 + 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            height: '100%',
            background: `linear-gradient(90deg, ${skill.color}, ${skill.color}88)`,
            borderRadius: '4px',
            boxShadow: `0 0 8px ${skill.color}66`,
          }}
        />
      </div>
    </div>
  );
}

// ── Avatar Orb ────────────────────────────────────────────────────────────────
function AvatarOrb({ hovered }: { hovered: boolean }) {
  return (
    <div style={{ position: 'relative', width: '110px', height: '110px', flexShrink: 0 }}>
      {/* Rotating ring */}
      <motion.div
        animate={{ rotate: hovered ? 360 : 0 }}
        transition={{ duration: 8, ease: 'linear', repeat: hovered ? Infinity : 0 }}
        style={{
          position: 'absolute', inset: '-8px',
          borderRadius: '50%',
          border: '1.5px dashed rgba(82,183,136,0.3)',
        }}
      />
      {/* Second ring */}
      <motion.div
        animate={{ rotate: hovered ? -360 : 0 }}
        transition={{ duration: 5, ease: 'linear', repeat: hovered ? Infinity : 0 }}
        style={{
          position: 'absolute', inset: '-16px',
          borderRadius: '50%',
          border: '1px dashed rgba(0,229,255,0.15)',
        }}
      />
      {/* Glow */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1.1 : 0.9 }}
        transition={{ duration: 0.4 }}
        style={{
          position: 'absolute', inset: 0,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(82,183,136,0.3) 0%, transparent 70%)',
          filter: 'blur(8px)',
        }}
      />
      {/* Avatar circle */}
      <div style={{
        width: '110px', height: '110px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(82,183,136,0.2), rgba(0,229,255,0.1))',
        border: '1.5px solid rgba(82,183,136,0.4)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '40px',
        position: 'relative', overflow: 'hidden',
      }}>
        <motion.div
          animate={{ scale: hovered ? 1.15 : 1 }}
          transition={{ type: 'spring', stiffness: 280, damping: 14 }}
        >
          👨‍💻
        </motion.div>
      </div>
    </div>
  );
}

// ── Main Card ─────────────────────────────────────────────────────────────────
function TeamCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; color: string }[]>([]);
  const ACCENT_COLORS = ['#52b788', '#00e5ff', '#ffca28', '#76ff03'];

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const sp = { stiffness: 180, damping: 22, mass: 0.8 };
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [10, -10]), sp);
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-10, 10]), sp);
  const glareX  = useSpring(useTransform(rawX, [-0.5, 0.5], [10, 90]), sp);
  const glareY  = useSpring(useTransform(rawY, [-0.5, 0.5], [10, 90]), sp);
  const shadowX = useSpring(useTransform(rawX, [-0.5, 0.5], [-28, 28]), sp);
  const shadowY = useSpring(useTransform(rawY, [-0.5, 0.5], [-28, 28]), sp);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
    if (Math.random() > 0.78) {
      const id = Date.now() + Math.random();
      const color = ACCENT_COLORS[Math.floor(Math.random() * ACCENT_COLORS.length)];
      setParticles(p => [...p.slice(-6), { id, x: e.clientX - rect.left, y: e.clientY - rect.top, color }]);
      setTimeout(() => setParticles(p => p.filter(pt => pt.id !== id)), 800);
    }
  }, [rawX, rawY]);

  const boxShadow = useTransform(
    [shadowX, shadowY],
    ([sx, sy]: number[]) =>
      `${sx}px ${sy}px 70px rgba(0,0,0,0.75), 0 0 0 1px rgba(82,183,136,0.15)`
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 80, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, margin: '-60px' }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: '1000px', maxWidth: '720px', margin: '0 auto' }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { rawX.set(0); rawY.set(0); setHovered(false); setParticles([]); }}
        style={{
          rotateX, rotateY, boxShadow,
          transformStyle: 'preserve-3d',
          position: 'relative',
          borderRadius: '24px',
          background: 'rgba(11,15,14,0.85)',
          border: '1px solid rgba(82,183,136,0.18)',
          backdropFilter: 'blur(16px)',
          overflow: 'hidden',
          cursor: 'crosshair',
        }}
      >
        {/* Top accent bar */}
        <motion.div
          animate={{ scaleX: hovered ? 1 : 0.2, opacity: hovered ? 1 : 0.3 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
            background: 'linear-gradient(90deg, #52b788, #00e5ff, transparent)',
            transformOrigin: 'left',
          }}
        />

        {/* Glare */}
        <motion.div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 3,
          background: useTransform([glareX, glareY], ([gx, gy]: number[]) =>
            `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.08) 0%, transparent 55%)`),
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s',
        }} />

        {/* Bloom */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
            background: 'radial-gradient(ellipse 90% 60% at 50% 110%, rgba(82,183,136,0.12), transparent 65%)',
          }}
        />

        {/* Scan line */}
        <motion.div
          animate={{ y: hovered ? '100%' : '-5%', opacity: hovered ? [0, 0.4, 0] : 0 }}
          transition={{ duration: 1.6, ease: 'linear', repeat: hovered ? Infinity : 0, repeatDelay: 1.5 }}
          style={{
            position: 'absolute', left: 0, right: 0, height: '2px', zIndex: 4, pointerEvents: 'none',
            background: 'linear-gradient(90deg, transparent, #52b788, #00e5ff, transparent)',
          }}
        />

        {/* Content */}
        <div style={{ padding: '44px 40px', position: 'relative', zIndex: 2 }}>
          {/* Top section */}
          <div style={{ display: 'flex', gap: '28px', alignItems: 'flex-start', marginBottom: '36px', flexWrap: 'wrap' }}>
            <AvatarOrb hovered={hovered} />

            <div style={{ flex: 1, minWidth: '200px' }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  background: 'rgba(82,183,136,0.07)', border: '1px solid rgba(82,183,136,0.2)',
                  padding: '5px 14px', borderRadius: '100px', marginBottom: '14px',
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#52b788', boxShadow: '0 0 6px #52b788', flexShrink: 0 }} />
                <span style={{ color: '#52b788', fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>
                  Founder & Developer
                </span>
              </motion.div>

              <motion.h3
                style={{
                  fontFamily: "'Syne', sans-serif",
                  color: '#e8f5ec', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
                  fontWeight: 800, margin: '0 0 10px', letterSpacing: '-1px', lineHeight: 1.05,
                }}
              >
                Abdus Samie{' '}
                <span style={{
                  background: 'linear-gradient(90deg, #52b788, #00e5ff)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>
                  Tahir
                </span>
              </motion.h3>

              <motion.div
                animate={{ width: hovered ? '60px' : '0px' }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                style={{ height: '2px', background: 'linear-gradient(90deg, #52b788, transparent)', borderRadius: '2px', marginBottom: '14px' }}
              />

              <p style={{ color: 'rgba(232,245,236,0.55)', fontSize: '0.9rem', lineHeight: 1.75, margin: 0, maxWidth: '380px' }}>
                Full-stack developer obsessed with clean code, pixel-perfect design, and building products that actually move the needle. I don't just write code — I craft systems.
              </p>
            </div>
          </div>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: '0', marginBottom: '36px', borderTop: '1px solid rgba(82,183,136,0.1)', paddingTop: '28px' }}>
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: i * 0.1 + 0.3, duration: 0.6 }}
                style={{
                  flex: 1,
                  textAlign: 'center',
                  borderRight: i < stats.length - 1 ? '1px solid rgba(82,183,136,0.08)' : 'none',
                  padding: '0 16px',
                }}
              >
                <motion.div
                  animate={{ color: hovered ? '#52b788' : '#e8f5ec' }}
                  transition={{ duration: 0.3 }}
                  style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.8rem', fontWeight: 800, lineHeight: 1 }}
                >
                  {stat.value}
                </motion.div>
                <div style={{ color: 'rgba(232,245,236,0.35)', fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', marginTop: '6px', fontWeight: 600 }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Skills */}
          <motion.div
            animate={{ opacity: hovered ? 1 : 0.4 }}
            transition={{ duration: 0.35 }}
          >
            <p style={{ color: 'rgba(232,245,236,0.25)', fontSize: '10px', letterSpacing: '2.5px', textTransform: 'uppercase', fontWeight: 700, marginBottom: '18px' }}>
              Core Stack
            </p>
            {skills.map((skill, i) => (
              <SkillBar key={i} skill={skill} index={i} hovered={hovered} />
            ))}
          </motion.div>

          {/* Social badges */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.35, delay: 0.1 }}
                style={{ display: 'flex', gap: '10px', marginTop: '28px', flexWrap: 'wrap' }}
              >
                {['GitHub', 'LinkedIn', 'Twitter', 'Portfolio'].map((platform, i) => (
                  <motion.div
                    key={platform}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.06, type: 'spring', stiffness: 400, damping: 18 }}
                    style={{
                      padding: '7px 16px', borderRadius: '10px',
                      background: 'rgba(82,183,136,0.08)', border: '1px solid rgba(82,183,136,0.2)',
                      color: 'rgba(232,245,236,0.7)', fontSize: '12px', fontWeight: 600,
                      cursor: 'pointer', letterSpacing: '0.5px',
                    }}
                  >
                    {platform}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Particles */}
        <AnimatePresence>
          {particles.map(pt => (
            <motion.div key={pt.id}
              initial={{ opacity: 1, scale: 1, x: pt.x - 4, y: pt.y - 4 }}
              animate={{ opacity: 0, scale: 3, x: pt.x - 4, y: pt.y - 50 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              style={{
                position: 'absolute', width: 8, height: 8,
                borderRadius: '50%', background: pt.color,
                boxShadow: `0 0 12px 4px ${pt.color}88`,
                zIndex: 10, pointerEvents: 'none',
              }}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function AboutTeam() {
  return (
    <section style={{ padding: '9rem 6vw', background: '#0b0f0e', position: 'relative', overflow: 'hidden' }}>

      {/* Grid bg */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(rgba(82,183,136,0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(82,183,136,0.025) 1px, transparent 1px)
        `,
        backgroundSize: '64px 64px',
      }} />
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(82,183,136,0.05) 0%, transparent 70%)',
      }} />

      {/* Floating orbs */}
      <motion.div
        animate={{ y: [0, -30, 0], x: [0, 15, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', top: '15%', left: '8%', width: '280px', height: '280px',
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(82,183,136,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <motion.div
        animate={{ y: [0, 25, 0], x: [0, -20, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        style={{
          position: 'absolute', bottom: '20%', right: '5%', width: '320px', height: '320px',
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,229,255,0.03) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
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
          <span style={{ color: '#52b788', fontSize: '11px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase' }}>The Team</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 0.1, duration: 0.7 }}
          style={{
            fontFamily: "'Syne', sans-serif", color: '#e8f5ec',
            fontSize: 'clamp(2.2rem, 5.5vw, 4rem)',
            fontWeight: 800, letterSpacing: '-1.5px', lineHeight: 1.05, marginBottom: '18px',
          }}
        >
          The{' '}
          <span style={{ background: 'linear-gradient(90deg, #52b788, #00e5ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Mind
          </span>{' '}
          Behind It
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false }} transition={{ delay: 0.2 }}
          style={{ color: 'rgba(232,245,236,0.45)', maxWidth: '420px', margin: '0 auto', fontSize: '1rem', lineHeight: 1.75 }}
        >
          One focused developer. One quality standard. World-class outcomes.
        </motion.p>
      </motion.div>

      {/* Card */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <TeamCard />
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