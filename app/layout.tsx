import './globals.css';
import { ReactNode } from 'react';

import Navbar from '../components/navbar';
import Footer from '../components/footer';

export const metadata = {
  title: 'RMAST – Portfolio',
  description: 'Full-Stack Developer · Designer · AI Automation',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="layout">
          <Navbar />

          <main className="main">
            {children}
          </main>

          <Footer />
        </div>
      </body>
    </html>
  );
}