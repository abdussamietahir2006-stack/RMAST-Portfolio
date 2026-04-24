'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useRef, useState } from 'react';

const navLinks = [
  { href: '/',         label: 'Home' },
  { href: '/about',    label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/projects',     label: 'Projects' },
];

// ── Magnetic Nav Link ─────────────────────────────────────────────────────────
function NavLink({ href, label, isActive }: { href: string; label: string; isActive: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [hov, setHov] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({
      x: (e.clientX - rect.left - rect.width / 2) * 0.25,
      y: (e.clientY - rect.top - rect.height / 2) * 0.25,
    });
  };
  const handleLeave = () => { setPos({ x: 0, y: 0 }); setHov(false); };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMove}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={handleLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 350, damping: 22 }}
      style={{
        position: 'relative',
        display: 'inline-flex', flexDirection: 'column', alignItems: 'center',
        gap: '4px', textDecoration: 'none', cursor: 'pointer',
        padding: '8px 14px',
      }}
    >
      <motion.span
        animate={{
          color: isActive ? '#52b788' : hov ? '#e8f5ec' : 'rgba(232,245,236,0.45)',
          letterSpacing: hov ? '0.2em' : '0.15em',
        }}
        transition={{ duration: 0.22 }}
        style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}
      >
        {label}
      </motion.span>

      {/* Active underline */}
      <motion.div
        animate={{ scaleX: isActive ? 1 : hov ? 0.6 : 0, opacity: isActive ? 1 : hov ? 0.6 : 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'absolute', bottom: 2, left: 14, right: 14,
          height: '1.5px',
          background: 'linear-gradient(90deg, transparent, #52b788, transparent)',
          transformOrigin: 'center', borderRadius: '2px',
        }}
      />
    </motion.a>
  );
}

// ── Main Navbar ───────────────────────────────────────────────────────────────
export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 40));

  return (
    <>
      <motion.header
        animate={{
          backdropFilter: scrolled ? 'blur(20px)' : 'blur(10px)',
          background: scrolled ? 'rgba(5,12,10,0.88)' : 'rgba(5,12,10,0.4)',
          borderBottomColor: scrolled ? 'rgba(82,183,136,0.12)' : 'rgba(82,183,136,0.06)',
          boxShadow: scrolled ? '0 8px 40px rgba(0,0,0,0.4)' : 'none',
        }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000,
          borderBottom: '1px solid rgba(82,183,136,0.06)',
        }}
      >
        <nav style={{
          maxWidth: '1200px', margin: '0 auto',
          padding: '0 6vw', height: '72px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>

          {/* ── LOGO ── */}
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={{ position: 'relative', cursor: 'pointer' }}
            >
              {/* Glow pulse behind logo */}
              <motion.div
                animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.15, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute', inset: '-8px',
                  borderRadius: '12px',
                  background: 'radial-gradient(circle, rgba(82,183,136,0.15) 0%, transparent 70%)',
                  pointerEvents: 'none',
                }}
              />

              <h1 style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: '1.55rem',
                fontWeight: 800,
                letterSpacing: '0.22em',
                margin: 0,
                lineHeight: 1,
                background: 'linear-gradient(135deg, #52b788 0%, #00e5ff 55%, #ffca28 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 12px rgba(82,183,136,0.5))',
                position: 'relative',
              }}>
                RMAST
              </h1>

              {/* Underline accent */}
              <motion.div
                animate={{ scaleX: [0, 1, 0], opacity: [0, 0.8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                style={{
                  position: 'absolute', bottom: -4, left: 0, right: 0,
                  height: '1.5px',
                  background: 'linear-gradient(90deg, transparent, #52b788, transparent)',
                  borderRadius: '2px', transformOrigin: 'center',
                }}
              />
            </motion.div>
          </Link>

          {/* ── Links ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {navLinks.map(({ href, label }) => (
              <NavLink key={href} href={href} label={label} isActive={pathname === href} />
            ))}

            {/* CTA */}
            <Link href="/contact" style={{ marginLeft: '12px' }}>
              <motion.div
                whileHover={{ scale: 1.06, boxShadow: '0 0 30px rgba(82,183,136,0.4)' }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '10px 22px', borderRadius: '100px',
                  background: '#52b788', color: '#070b0a',
                  fontFamily: "'Syne', sans-serif", fontWeight: 800,
                  fontSize: '12px', letterSpacing: '1.5px', textTransform: 'uppercase',
                  cursor: 'pointer', whiteSpace: 'nowrap',
                  boxShadow: '0 0 0 rgba(82,183,136,0)',
                  transition: 'box-shadow 0.2s',
                }}
              >
                Hire Me
              </motion.div>
            </Link>
          </div>
        </nav>
      </motion.header>

      {/* Spacer */}
      <div style={{ height: 72 }} />
    </>
  );
}