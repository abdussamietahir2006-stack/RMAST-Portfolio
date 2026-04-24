'use client';

import ContactHero from '@/components/contact/ContactHero';
import ContactForm from '@/components/contact/ContactForm';
import ContactBooking from '@/components/contact/ContactBooking';
import ContactFAQ from '@/components/contact/ContactFAQ';

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactForm />
      <ContactBooking />
      <ContactFAQ />
    </>
  );
}