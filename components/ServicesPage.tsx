import Link from 'next/link';
import { inter } from '../lib/fonts';
import { useLocalePath } from '../lib/useLocalePath';
import useTranslation from '../lib/translation';
import SEOHead from '../components/SEOHead';
import { FiBookOpen, FiTruck, FiMapPin, FiCheckCircle, FiPackage } from 'react-icons/fi';

export default function ServicesPage() {
  const { prefix, isLithuanian } = useLocalePath();
  const { t } = useTranslation('common');

  const title = isLithuanian ? 'Paslaugos' : 'Services';
  const description = isLithuanian
    ? 'ASMI teikia spaudos pervežimo ir gėrimų bei maisto produktų pervežimo paslaugas Kauno apskrityje.'
    : 'ASMI provides press transport and beverage & food product transport services in Kaunas County.';

  const contactHref = isLithuanian ? `${prefix}/kontaktai` : `${prefix}/contact`;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    provider: { '@type': 'Organization', name: 'UAB ASMI' },
    areaServed: 'Kaunas County',
    description,
  };

  return (
    <>
      <SEOHead
        title={title}
        description={description}
        canonicalUrl={isLithuanian ? '/lt/paslaugos' : '/en/services'}
        lang={isLithuanian ? 'lt' : 'en'}
        structuredData={structuredData}
      />

      {/* Header */}
      <section className='bg-surface py-16 px-6 text-center'>
        <div className='max-w-3xl mx-auto'>
          <h1 className={`text-3xl md:text-4xl font-bold text-text mb-3 ${inter.className}`}>
            {t('services.title')}
          </h1>
          <p className={`text-text-muted text-base ${inter.className}`}>{t('services.subtitle')}</p>
        </div>
      </section>

      {/* Service cards */}
      <section className='max-w-5xl mx-auto px-6 py-20'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          <div className='bg-white p-8 border border-border hover:border-primary transition-colors duration-300'>
            <FiBookOpen className='w-8 h-8 text-primary mb-6' />
            <h2 className={`text-xl font-semibold text-text mb-4 ${inter.className}`}>
              {t('services.s1Title')}
            </h2>
            <p className={`text-text-muted text-sm leading-relaxed ${inter.className}`}>
              {t('services.s1Desc')}
            </p>
          </div>

          <div className='bg-white p-8 border border-border hover:border-primary transition-colors duration-300'>
            <FiTruck className='w-8 h-8 text-primary mb-6' />
            <h2 className={`text-xl font-semibold text-text mb-4 ${inter.className}`}>
              {t('services.s2Title')}
            </h2>
            <p className={`text-text-muted text-sm leading-relaxed ${inter.className}`}>
              {t('services.s2Desc')}
            </p>
          </div>

          <div className='bg-white p-8 border border-border hover:border-primary transition-colors duration-300'>
            <FiPackage className='w-8 h-8 text-primary mb-6' />
            <h2 className={`text-xl font-semibold text-text mb-4 ${inter.className}`}>
              {t('services.s3Title')}
            </h2>
            <p className={`text-text-muted text-sm leading-relaxed ${inter.className}`}>
              {t('services.s3Desc')}
            </p>
          </div>
        </div>
      </section>

      {/* Geography */}
      <section className='bg-surface py-20 px-6'>
        <div className='max-w-3xl mx-auto text-center'>
          <FiMapPin className='w-8 h-8 text-primary mx-auto mb-6' />
          <h3 className={`text-2xl font-semibold text-text mb-4 ${inter.className}`}>
            {t('services.geoTitle')}
          </h3>
          <p className={`text-text-muted leading-relaxed ${inter.className}`}>
            {t('services.geoDesc')}
          </p>
        </div>
      </section>

      {/* Why choose us */}
      <section className='max-w-3xl mx-auto px-6 py-20'>
        <h3 className={`text-2xl font-semibold text-text text-center mb-12 ${inter.className}`}>
          {t('services.advTitle')}
        </h3>
        <div className='space-y-4'>
          {[t('services.adv1'), t('services.adv2'), t('services.adv3'), t('services.adv4')].map((adv, i) => (
            <div key={i} className='flex items-start gap-3'>
              <FiCheckCircle className='w-5 h-5 text-primary shrink-0 mt-0.5' />
              <p className={`text-text-muted ${inter.className}`}>{adv}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className='bg-primary py-20 px-6 text-center'>
        <h3 className={`text-2xl md:text-3xl font-semibold text-white mb-4 ${inter.className}`}>
          {t('services.ctaTitle')}
        </h3>
        <p className={`text-white/90 mb-8 max-w-xl mx-auto ${inter.className}`}>
          {t('services.ctaText')}
        </p>
        <Link
          href={contactHref}
          className={`inline-block px-8 py-3 bg-white text-primary text-sm font-medium uppercase tracking-wider hover:bg-surface transition-colors duration-300 ${inter.className}`}
        >
          {t('services.ctaButton')}
        </Link>
      </section>
    </>
  );
}
