import './globals.css';
import { ReactNode } from 'react';

import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export const metadata = {
  title: 'RMAST – Portfolio',
  description: 'Full-Stack Developer · Designer · AI Automation',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: 0,
          background: 'var(--black)',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          
          <Navbar />

          <main style={{ flex: 1 }}>
            {children}
          </main>

          <Footer />

        </div>
      </body>
    </html>
  );
}