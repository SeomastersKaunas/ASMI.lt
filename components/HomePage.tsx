import Link from 'next/link';
import Image from 'next/image';
import { inter } from '../lib/fonts';
import { useLocalePath } from '../lib/useLocalePath';
import useTranslation from '../lib/translation';
import SEOHead from '../components/SEOHead';
import { FiBookOpen, FiTruck, FiPackage } from 'react-icons/fi';

export default function HomePage() {
  const { prefix, isLithuanian } = useLocalePath();
  const { t } = useTranslation('common');

  const title = isLithuanian ? 'ASMI – Patikimi pervežimai Kauno apskrityje' : 'ASMI – Reliable Transport in Kaunas County';
  const description = isLithuanian
    ? 'ASMI teikia spaudos, gėrimų ir maisto produktų pervežimo bei paskirstymo paslaugas Kauno apskrityje nuo 2012 metų.'
    : 'ASMI provides press, beverage and food product transport and distribution services in Kaunas County since 2012.';

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'UAB ASMI',
    url: 'https://asmi.lt',
    telephone: '069955433',
    email: 'info@asmi.lt',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Pramonės pr. 4L',
      addressLocality: 'Kaunas',
      postalCode: '51329',
      addressCountry: 'LT',
    },
    areaServed: 'Kaunas County',
    foundingDate: '2012',
    description: isLithuanian
      ? 'Pervežimų ir logistikos paslaugos Kauno apskrityje. Spaudos, gėrimų ir maisto produktų pervežimas.'
      : 'Transport and logistics services in Kaunas County. Press, beverage and food product transport.',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'http://schema.org/Monday',
        opens: '08:00',
        closes: '17:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'http://schema.org/Tuesday',
        opens: '08:00',
        closes: '17:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'http://schema.org/Wednesday',
        opens: '08:00',
        closes: '17:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'http://schema.org/Thursday',
        opens: '08:00',
        closes: '17:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'http://schema.org/Friday',
        opens: '08:00',
        closes: '17:00',
      },
    ],
    sameAs: [
      'https://www.facebook.com/profile.php?id=100064377924371',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: isLithuanian ? 'Paslaugos' : 'Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: isLithuanian ? 'Spaudos pervežimas' : 'Press Transport',
            description: isLithuanian
              ? 'Spaudos paskirstymas į prekybos centrus visoje Kauno apskrityje.'
              : 'Press distribution to shopping centers throughout Kaunas County.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: isLithuanian ? 'Gėrimų ir maisto produktų pervežimas' : 'Beverage & Food Transport',
            description: isLithuanian
              ? 'Gėrimų ir maisto produktų pervežimas ir paskirstymas Kauno apskrityje.'
              : 'Beverage and food product transport and distribution in Kaunas County.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: isLithuanian ? 'Krovinių pervežimas Kauno apskrityje' : 'Cargo Transport in Kaunas County',
            description: isLithuanian
              ? 'Krovinių pervežimas Kauno apskrityje. Lankstus ir patikimas transportas.'
              : 'Cargo transport in Kaunas County. Flexible and reliable transport.',
          },
        },
      ],
    },
    keywords: [
      'pervežimai Kaune',
      'pervežimai Kauno apskrityje',
      'spaudos pervežimas Kaune',
      'spaudos paskirstymas prekybos centrams',
      'gėrimų pervežimas Kaune',
      'maisto produktų pervežimas',
      'krovinių pervežimas Kaune',
      'logistikos paslaugos Kaune',
      'vietiniai pervežimai Kauno apskrityje',
      'prekių paskirstymas Kaune',
    ],
  };

  const servicesHref = isLithuanian ? `${prefix}/paslaugos` : `${prefix}/services`;
  const aboutHref = isLithuanian ? `${prefix}/apie` : `${prefix}/about`;
  const contactHref = isLithuanian ? `${prefix}/kontaktai` : `${prefix}/contact`;

  return (
    <>
      <SEOHead
        title={title}
        description={description}
        canonicalUrl={isLithuanian ? '/lt' : '/en'}
        lang={isLithuanian ? 'lt' : 'en'}
        structuredData={structuredData}
      />

      <main id="main-content">
      {/* Hero */}
      <section className='relative w-full overflow-hidden h-[60vh] md:h-[65vh] max-h-[600px]'>
        <div className='absolute inset-0 z-0'>
          <Image
            src='/images/asmi_hero_2.webp'
            alt='ASMI transport'
            fill
            className='object-cover object-center'
            priority
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw'
          />
          {/* Gray overlay for faded look */}
          <div className='absolute inset-0 bg-gray-600/55' />
        </div>

        <div className='relative z-10 flex flex-col items-center justify-center h-full px-6 text-center'>
          <h1 className={`text-3xl md:text-5xl font-bold text-white mb-4 max-w-3xl ${inter.className}`}>
            {t('home.heroTitle')}
          </h1>
          <p className={`text-base md:text-lg text-white/90 mb-8 max-w-2xl ${inter.className}`}>
            {t('home.heroSubtitle')}
          </p>
          <Link
            href={contactHref}
            className={`inline-block px-8 py-3 bg-primary text-white text-sm font-medium uppercase tracking-wider hover:bg-primary-dark transition-colors duration-300 ${inter.className}`}
            aria-label={t('home.heroCta')}
          >
            {t('home.heroCta')}
          </Link>
        </div>
      </section>

      {/* About preview */}
      <section className='max-w-4xl mx-auto px-6 py-20 text-center'>
        <h3 className={`text-2xl md:text-3xl font-semibold text-text mb-6 ${inter.className}`}>
          {t('home.aboutTitle')}
        </h3>
        <p className={`text-text-muted leading-relaxed text-base mb-8 ${inter.className}`}>
          {t('home.aboutText')}
        </p>
        <Link
          href={aboutHref}
          className={`inline-block px-6 py-2.5 border border-primary text-primary text-sm font-medium uppercase tracking-wider hover:bg-primary hover:text-white transition-all duration-300 ${inter.className}`}
        >
          {t('home.aboutCta')}
        </Link>
      </section>

      {/* Services preview */}
      <section className='bg-surface py-20 px-6'>
        <div className='max-w-5xl mx-auto'>
          <h3 className={`text-2xl md:text-3xl font-semibold text-text text-center mb-3 ${inter.className}`}>
            {t('home.servicesTitle')}
          </h3>
          <p className={`text-text-muted text-center mb-12 ${inter.className}`}>
            {t('home.servicesSubtitle')}
          </p>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            <div className='bg-white p-8 border border-border hover:border-primary transition-colors duration-300'>
              <FiBookOpen className='w-8 h-8 text-primary mb-5' />
              <h2 className={`text-xl font-semibold text-text mb-3 ${inter.className}`}>
                {t('home.service1Title')}
              </h2>
              <p className={`text-text-muted text-sm leading-relaxed ${inter.className}`}>
                {t('home.service1Desc')}
              </p>
            </div>

            <div className='bg-white p-8 border border-border hover:border-primary transition-colors duration-300'>
              <FiTruck className='w-8 h-8 text-primary mb-5' />
              <h2 className={`text-xl font-semibold text-text mb-3 ${inter.className}`}>
                {t('home.service2Title')}
              </h2>
              <p className={`text-text-muted text-sm leading-relaxed ${inter.className}`}>
                {t('home.service2Desc')}
              </p>
            </div>

            <div className='bg-white p-8 border border-border hover:border-primary transition-colors duration-300'>
              <FiPackage className='w-8 h-8 text-primary mb-5' />
              <h2 className={`text-xl font-semibold text-text mb-3 ${inter.className}`}>
                {t('home.service3Title')}
              </h2>
              <p className={`text-text-muted text-sm leading-relaxed ${inter.className}`}>
                {t('home.service3Desc')}
              </p>
            </div>
          </div>

          <div className='text-center mt-12'>
            <Link
              href={servicesHref}
              className={`inline-block px-6 py-2.5 border border-primary text-primary text-sm font-medium uppercase tracking-wider hover:bg-primary hover:text-white transition-all duration-300 ${inter.className}`}
            >
              {t('home.servicesCta')}
            </Link>
          </div>
        </div>
      </section>

      {/* Why ASMI */}
      <section className='max-w-3xl mx-auto px-6 py-20 text-center'>
        <h3 className={`text-2xl md:text-3xl font-semibold text-text mb-6 ${inter.className}`}>
          {t('home.whyTitle')}
        </h3>
        <p className={`text-text-muted leading-relaxed text-base ${inter.className}`}>
          {t('home.whyText')}
        </p>
      </section>

      {/* CTA */}
      <section className='bg-primary py-20 px-6 text-center'>
        <h3 className={`text-2xl md:text-3xl font-semibold text-white mb-4 ${inter.className}`}>
          {t('home.ctaTitle')}
        </h3>
        <p className={`text-white/90 mb-8 max-w-xl mx-auto ${inter.className}`}>
          {t('home.ctaText')}
        </p>
        <Link
          href={contactHref}
          className={`inline-block px-8 py-3 bg-white text-primary text-sm font-medium uppercase tracking-wider hover:bg-surface transition-colors duration-300 ${inter.className}`}
        >
          {t('home.ctaButton')}
        </Link>
      </section>

      {/* Google Maps */}
      <section className='py-20 px-6'>
        <div className='max-w-4xl mx-auto'>
          <h3 className={`text-2xl md:text-3xl font-semibold text-text text-center mb-8 ${inter.className}`}>
            {isLithuanian ? 'Mūsų vieta' : 'Our location'}
          </h3>
          <div className='w-full border border-border overflow-hidden relative' style={{ height: '400px' }}>
            <iframe
              src='https://maps.google.com/maps?q=ASMI%20Pramon%C4%97s%20pr.%204L%20Kaunas&z=15&output=embed'
              style={{ border: 0, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              allowFullScreen
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
              title='ASMI location'
            />
          </div>
          <div className='text-center mt-6 flex flex-col items-center gap-3'>
            <a
              href='https://maps.app.goo.gl/ontnDSJVB1y9MUG67'
              target='_blank'
              rel='noopener noreferrer'
              className={`block w-full max-w-xs px-6 py-2.5 border border-primary text-primary text-sm font-medium uppercase tracking-wider hover:bg-primary hover:text-white transition-all duration-300 ${inter.className}`}
            >
              {isLithuanian ? 'Atidaryti Google žemėlapiuose' : 'Open in Google Maps'}
            </a>
            <div className='flex gap-3 w-full max-w-xs'>
              <a
                href='https://waze.com/ul?ll=54.9337569,23.9666759&navigate=yes'
                target='_blank'
                rel='noopener noreferrer'
                className={`flex-1 flex items-center justify-center px-4 py-2 border border-border text-text-muted text-xs font-medium uppercase tracking-wider hover:border-primary hover:text-primary transition-all duration-300 ${inter.className}`}
              >
                Waze
              </a>
              <a
                href='https://maps.apple.com/?ll=54.9337569,23.9666759&q=ASMI'
                target='_blank'
                rel='noopener noreferrer'
                className={`flex-1 flex items-center justify-center px-4 py-2 border border-border text-text-muted text-xs font-medium uppercase tracking-wider hover:border-primary hover:text-primary transition-all duration-300 ${inter.className}`}
              >
                {isLithuanian ? 'Apple žemėlapiai' : 'Apple Maps'}
              </a>
            </div>
          </div>
        </div>
      </section>
      </main>
    </>
  );
}
