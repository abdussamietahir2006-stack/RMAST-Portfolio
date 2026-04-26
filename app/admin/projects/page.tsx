// ============================================================
// app/admin/projects/page.tsx
// ============================================================
'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProjectsPage() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#e8f5ec', margin: '0 0 4px' }}>Projects Admin</h1>
          <p style={{ fontSize: '12px', color: 'rgba(200,230,215,0.4)', margin: 0 }}>Admin panel for managing projects</p>
        </div>
      </div>
      <p style={{ color: 'rgba(200,230,215,0.6)' }}>Projects management functionality not yet implemented.</p>
    </div>
  );
}