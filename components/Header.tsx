import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { inter } from '../lib/fonts';
import { useLocalePath } from '../lib/useLocalePath';
import useTranslation from '../lib/translation';
import LanguageSwitcher, { flags, getAlternateUrl, LocaleOption } from './LanguageSwitcher';

export default function Header() {
  const router = useRouter();
  const { prefix, isLithuanian } = useLocalePath();
  const { t, lang } = useTranslation('common');
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { href: prefix, label: t('nav.home') },
    { href: isLithuanian ? `${prefix}/paslaugos` : `${prefix}/services`, label: t('nav.services') },
    { href: isLithuanian ? `${prefix}/apie` : `${prefix}/about`, label: t('nav.about') },
    { href: isLithuanian ? `${prefix}/kontaktai` : `${prefix}/contact`, label: t('nav.contact') },
  ];

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (mobileRef.current && !mobileRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    }
    if (mobileOpen) document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [router.asPath]);

  return (
    <header ref={mobileRef} className='relative w-full bg-white border-b border-border sticky top-0 z-50 shadow-sm'>
      <div className='max-w-6xl mx-auto px-6'>
        {/* Desktop layout */}
        <div className='hidden md:flex items-center justify-between py-3 gap-4'>
          <Link href={prefix} className='hover:opacity-80 transition-opacity duration-200 shrink-0'>
            <Image src='/images/logo.png' alt='ASMI' width={180} height={50} className='object-contain max-h-12' priority style={{ width: 'auto', height: 'auto' }} />
          </Link>

          <div className='flex items-center justify-center flex-1'>
            <nav className='flex items-center gap-8'>
              {navLinks.map(({ href, label }) => {
                const isHome = href === prefix;
                const active = isHome ? router.asPath === href || router.asPath === href + '/' : router.asPath === href || router.asPath.startsWith(href + '/');
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`text-sm font-medium transition-colors duration-200 ${inter.className} ${
                      active ? 'text-primary' : 'text-text hover:text-primary'
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className='flex items-center gap-4 shrink-0'>
            <span className='w-px h-5 bg-border' aria-hidden />
            <LanguageSwitcher initialLocale={isLithuanian ? 'lt' : 'en'} />
          </div>
        </div>

        {/* Mobile layout */}
        <div className='flex md:hidden items-center justify-center relative py-3'>
          <button
            onClick={(e) => { e.stopPropagation(); setMobileOpen((v) => !v); }}
            aria-label='Toggle menu'
            className='absolute left-0 text-text hover:text-primary transition-colors p-1 z-10'
          >
            {mobileOpen ? (
              <svg className='w-6 h-6' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={1.5}>
                <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
              </svg>
            ) : (
              <svg className='w-6 h-6' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={1.5}>
                <path strokeLinecap='round' strokeLinejoin='round' d='M4 6h16M4 12h16M4 18h16' />
              </svg>
            )}
          </button>

          <Link href={prefix} className='hover:opacity-80 transition-opacity duration-200'>
            <Image src='/images/logo.png' alt='ASMI' width={130} height={36} className='object-contain max-h-9' style={{ width: 'auto', height: 'auto' }} />
          </Link>
        </div>
      </div>

      {/* Mobile nav drawer */}
      {mobileOpen && (
        <div className='md:hidden absolute top-full left-0 right-0 border-b border-border bg-white px-6 py-6 flex flex-col gap-5 shadow-lg z-50'>
          {navLinks.map(({ href, label }) => {
            const isHome = href === prefix;
            const active = isHome ? router.asPath === href || router.asPath === href + '/' : router.asPath === href || router.asPath.startsWith(href + '/');
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`text-base font-medium transition-colors ${inter.className} ${
                  active ? 'text-primary' : 'text-text hover:text-primary'
                }`}
              >
                {label}
              </Link>
            );
          })}
          <div className='flex flex-col gap-2 pt-4 border-t border-border'>
            <span className={`text-xs uppercase tracking-wider text-text-muted ${inter.className}`}>
              {isLithuanian ? 'Kalba' : 'Language'}
            </span>
            {(['lt', 'en'] as LocaleOption[]).map((loc) => (
              <Link
                key={loc}
                href={getAlternateUrl(router.asPath, loc)}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2 text-sm uppercase tracking-wider transition-colors ${inter.className} ${
                  loc === (isLithuanian ? 'lt' : 'en') ? 'text-primary font-semibold' : 'text-text hover:text-primary'
                }`}
              >
                {flags[loc]}
                <span>{loc.toUpperCase()}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
