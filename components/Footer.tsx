import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaFacebookF } from 'react-icons/fa';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import { inter } from '../lib/fonts';
import { useLocalePath } from '../lib/useLocalePath';
import useTranslation from '../lib/translation';

function GoogleBusinessProfileIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox='0 0 24 24' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
      <path d='M12 2C8.13 2 5 5.13 5 9c0 1.74.6 3.34 1.6 4.6L12 22l5.4-8.4C18.4 12.34 19 10.74 19 9c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z' />
    </svg>
  );
}

const SOCIALS = [
  { href: 'https://www.facebook.com/profile.php?id=100064377924371', Icon: FaFacebookF, label: 'Facebook' },
  { href: 'https://maps.app.goo.gl/ontnDSJVB1y9MUG67', Icon: GoogleBusinessProfileIcon, label: 'Google Business Profile' },
];

export default function Footer() {
  const { prefix, isLithuanian } = useLocalePath();
  const { t } = useTranslation('common');
  const [year, setYear] = useState(2026);
  useEffect(() => { setYear(new Date().getFullYear()); }, []);

  const navLinks = [
    { href: prefix, label: t('nav.home') },
    { href: isLithuanian ? `${prefix}/paslaugos` : `${prefix}/services`, label: t('nav.services') },
    { href: isLithuanian ? `${prefix}/apie` : `${prefix}/about`, label: t('nav.about') },
    { href: isLithuanian ? `${prefix}/kontaktai` : `${prefix}/contact`, label: t('nav.contact') },
  ];

  return (
    <footer className='w-full border-t border-border mt-20 py-12 px-6 bg-white'>
      <div className='max-w-6xl mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-10 mb-10'>
          {/* Logo + socials */}
          <div className='flex flex-col items-center gap-4'>
            <Link href={prefix} className='hover:opacity-80 transition-opacity'>
              <Image src='/images/logo.png' alt='ASMI' width={160} height={44} className='object-contain' style={{ width: 'auto', height: 'auto' }} />
            </Link>
            <div className='flex items-center gap-3'>
              {SOCIALS.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className='w-9 h-9 flex items-center justify-center rounded-full border border-border text-text-muted hover:text-primary hover:border-primary transition-colors duration-200'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <Icon className='w-4 h-4' />
                </a>
              ))}
            </div>
          </div>

          {/* Nav links */}
          <div className='flex flex-col gap-3'>
            <h3 className={`text-sm font-semibold text-text uppercase tracking-wider mb-1 ${inter.className}`}>
              {isLithuanian ? 'Nuorodos' : 'Navigation'}
            </h3>
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`text-sm text-text-muted hover:text-primary transition-colors duration-200 ${inter.className}`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Contact info */}
          <div className='flex flex-col gap-3'>
            <h3 className={`text-sm font-semibold text-text uppercase tracking-wider mb-1 ${inter.className}`}>
              {isLithuanian ? 'Kontaktai' : 'Contact'}
            </h3>
            <div className={`text-sm text-text-muted space-y-2 ${inter.className}`}>
              <p className='flex items-start gap-2'>
                <FiMapPin className='w-4 h-4 shrink-0 text-primary mt-0.5' />
                {t('footer.address')}
              </p>
              <a href='tel:+37069955433' className='flex items-center gap-2 hover:text-primary transition-colors'>
                <FiPhone className='w-4 h-4 shrink-0 text-primary' />
                {t('footer.phone')}
              </a>
              <a href='mailto:info@asmi.lt' className='flex items-center gap-2 hover:text-primary transition-colors'>
                <FiMail className='w-4 h-4 shrink-0 text-primary' />
                {t('footer.email')}
              </a>
              <p className='pt-2 text-xs text-text-muted'>{t('footer.companyCode')}</p>
              <p className='text-xs text-text-muted'>{isLithuanian ? 'Įmonės pavadinimas: UAB ASMI' : 'Company name: UAB ASMI'}</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className='border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-3'>
          <p className={`text-xs text-text-muted tracking-wide ${inter.className}`}>
            © {t('footer.company')} {year}. {t('footer.rights')}.
          </p>
          <p className={`text-xs text-text-muted tracking-wide ${inter.className}`}>
            {t('footer.credit')}{' '}
            <a href='https://seomasters.lt' target='_blank' rel='noopener noreferrer' className='hover:text-primary transition-colors'>
              Seomasters.lt
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
