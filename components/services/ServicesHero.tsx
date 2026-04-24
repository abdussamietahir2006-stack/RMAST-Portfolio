'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';

function CursorBlob() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 55, damping: 22 });
  const springY = useSpring(y, { stiffness: 55, damping: 22 });

  useEffect(() => {
    const move = (e: MouseEvent) => { x.set(e.clientX - 200); y.set(e.clientY - 200); };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [x, y]);

  return (
    <motion.div style={{
      position: 'fixed', left: springX, top: springY,
      width: '400px', height: '400px', pointerEvents: 'none', zIndex: 0,
      background: 'radial-gradient(circle, rgba(82,183,136,0.1), transparent 70%)',
      borderRadius: '50%', filter: 'blur(40px)', mixBlendMode: 'screen',
    }} />
  );
}

const WORDS = ['Development', 'Design', '3D & Motion', 'AI Automation'];

function Typewriter() {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = WORDS[idx];
    let t: ReturnType<typeof setTimeout>;
    if (!deleting && text.length < word.length) {
      t = setTimeout(() => setText(word.slice(0, text.length + 1)), 70);
    } else if (!deleting && text.length === word.length) {
      t = setTimeout(() => setDeleting(true), 1600);
    } else if (deleting && text.length > 0) {
      t = setTimeout(() => setText(text.slice(0, -1)), 40);
    } else {
      setDeleting(false);
      setIdx(i => (i + 1) % WORDS.length);
    }
    return () => clearTimeout(t);
  }, [text, deleting, idx]);

  return (
    <span style={{ color: '#52b788' }}>
      {text}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.55, repeat: Infinity, repeatType: 'reverse' }}
        style={{ borderRight: '2px solid #52b788', marginLeft: '2px' }}
      />
    </span>
  );
}

function FloatingOrb({ size, x, y, dur, delay, color }: { size: number; x: string; y: string; dur: number; delay: number; color: string }) {
  return (
    <motion.div
      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
      transition={{ duration: dur, repeat: Infinity, ease: 'easeInOut', delay }}
      style={{
        position: 'absolute', left: x, top: y,
        width: size, height: size, borderRadius: '50%',
        background: `radial-gradient(circle, ${color}, transparent 70%)`,
        filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0,
      }}
    />
  );
}

export default function ServicesHero() {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (Math.random() > 0.85) {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      const id = Date.now() + Math.random();
      setParticles(p => [...p.slice(-10), { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
      setTimeout(() => setParticles(p => p.filter(pt => pt.id !== id)), 900);
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      style={{
        padding: '10rem 6vw 7rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: '#0b0f0e',
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'crosshair',
      }}
    >
      <CursorBlob />

      {/* Grid bg */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(rgba(82,183,136,0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(82,183,136,0.025) 1px, transparent 1px)
        `,
        backgroundSize: '64px 64px',
      }} />

      {/* Ambient blobs */}
      <FloatingOrb size={600} x="-10%" y="-30%" dur={18} delay={0} color="rgba(52,120,90,0.2)" />
      <FloatingOrb size={500} x="60%" y="40%" dur={22} delay={4} color="rgba(0,229,255,0.06)" />
      <FloatingOrb size={400} x="30%" y="-20%" dur={15} delay={2} color="rgba(82,183,136,0.08)" />

      {/* Rotating ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute', width: '700px', height: '700px',
          border: '1px dashed rgba(82,183,136,0.06)',
          borderRadius: '50%', top: '50%', left: '50%',
          marginTop: '-350px', marginLeft: '-350px', pointerEvents: 'none',
        }}
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute', width: '1000px', height: '1000px',
          border: '1px dashed rgba(82,183,136,0.03)',
          borderRadius: '50%', top: '50%', left: '50%',
          marginTop: '-500px', marginLeft: '-500px', pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            background: 'rgba(82,183,136,0.07)', border: '1px solid rgba(82,183,136,0.2)',
            padding: '7px 20px', borderRadius: '100px', marginBottom: '32px',
          }}
        >
          <span style={{
            width: 7, height: 7, borderRadius: '50%',
            background: '#52b788', boxShadow: '0 0 8px #52b788',
            animation: 'pulseDot 1.8s ease infinite', flexShrink: 0,
          }} />
          <span style={{ color: '#52b788', fontSize: '11px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase' }}>
            Services
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 'clamp(2.8rem, 6vw, 5rem)',
            fontWeight: 800,
            color: '#e8f5ec',
            letterSpacing: '-2px',
            lineHeight: 1.0,
            marginBottom: '20px',
          }}
        >
          World-Class{' '}
          <span style={{
            background: 'linear-gradient(90deg, #52b788, #00e5ff)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
            Digital
          </span>
          <br />
          <Typewriter />
        </motion.h1>

        {/* Animated underline */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            height: '2px', width: '80px', margin: '0 auto 28px',
            background: 'linear-gradient(90deg, #52b788, #00e5ff)',
            borderRadius: '2px', transformOrigin: 'center',
          }}
        />

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          style={{
            color: 'rgba(232,245,236,0.55)',
            fontSize: '1rem',
            lineHeight: 1.8,
            maxWidth: '520px',
            margin: '0 auto 52px',
          }}
        >
          Crafting high-end digital systems that blend development, design, immersive 3D, and intelligent AI automation — built to move the needle.
        </motion.p>

        {/* Stat pills */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          {[
            { label: '4 Core Services', accent: '#52b788' },
            { label: '40+ Projects Shipped', accent: '#00e5ff' },
            { label: '100% Client Satisfaction', accent: '#76ff03' },
          ].map((pill, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.06, y: -3 }}
              style={{
                padding: '10px 20px', borderRadius: '100px',
                background: `${pill.accent}11`,
                border: `1px solid ${pill.accent}33`,
                color: pill.accent,
                fontSize: '12px', fontWeight: 700, letterSpacing: '0.5px',
              }}
            >
              {pill.label}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Particles */}
      <AnimatePresence>
        {particles.map(pt => (
          <motion.div key={pt.id}
            initial={{ opacity: 1, scale: 1, x: pt.x - 4, y: pt.y - 4 }}
            animate={{ opacity: 0, scale: 3, x: pt.x - 4, y: pt.y - 50 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{
              position: 'absolute', width: 8, height: 8,
              borderRadius: '50%', background: '#52b788',
              boxShadow: '0 0 12px 4px rgba(82,183,136,0.6)',
              zIndex: 10, pointerEvents: 'none',
            }}
          />
        ))}
      </AnimatePresence>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        style={{
          position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', zIndex: 3,
        }}
      >
        <span style={{ fontSize: '10px', letterSpacing: '2px', color: 'rgba(232,245,236,0.25)', textTransform: 'uppercase' }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          style={{
            width: '20px', height: '34px',
            border: '1px solid rgba(232,245,236,0.12)',
            borderRadius: '20px',
            display: 'flex', justifyContent: 'center', paddingTop: '5px',
          }}
        >
          <motion.div
            animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            style={{ width: '3px', height: '6px', background: '#52b788', borderRadius: '2px' }}
          />
        </motion.div>
      </motion.div>

      <style>{`
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.35; transform: scale(1.6); }
        }
      `}</style>
    </section>
  );
}