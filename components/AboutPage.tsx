import Image from 'next/image';
import { inter } from '../lib/fonts';
import { useLocalePath } from '../lib/useLocalePath';
import useTranslation from '../lib/translation';
import SEOHead from '../components/SEOHead';
import { FiMapPin, FiRefreshCw, FiAward } from 'react-icons/fi';

const FLEET_IMAGES = [
  { src: '/images/truck1.jpg', alt: 'ASMI truck 1' },
  { src: '/images/truck2.jpg', alt: 'ASMI truck 2' },
  { src: '/images/truck3.jpg', alt: 'ASMI truck 3' },
  { src: '/images/truck4.jpg', alt: 'ASMI truck 4' },
];

export default function AboutPage() {
  const { isLithuanian } = useLocalePath();
  const { t } = useTranslation('common');

  const title = isLithuanian ? 'Apie ASMI' : 'About ASMI';
  const description = isLithuanian
    ? 'ASMI – pervežimų įmonė, įkurta 2012 metais. Teikiame spaudos, gėrimų ir maisto produktų pervežimo paslaugas Kauno apskrityje.'
    : 'ASMI – a transport company founded in 2012. We provide press, beverage and food product transport services in Kaunas County.';

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: title,
    description,
    url: `https://asmi.lt${isLithuanian ? '/lt/apie' : '/en/about'}`,
    inLanguage: isLithuanian ? 'lt' : 'en',
  };

  return (
    <>
      <SEOHead
        title={title}
        description={description}
        canonicalUrl={isLithuanian ? '/lt/apie' : '/en/about'}
        lang={isLithuanian ? 'lt' : 'en'}
        structuredData={structuredData}
      />

      {/* Header */}
      <section className='bg-surface py-16 px-6 text-center'>
        <div className='max-w-3xl mx-auto'>
          <h1 className={`text-3xl md:text-4xl font-bold text-text mb-3 ${inter.className}`}>
            {t('about.title')}
          </h1>
          <p className={`text-text-muted text-base ${inter.className}`}>{t('about.subtitle')}</p>
        </div>
      </section>

      {/* Biography */}
      <section className='max-w-3xl mx-auto px-6 py-20'>
        <h3 className={`text-2xl font-semibold text-text mb-6 ${inter.className}`}>
          {t('about.bioTitle')}
        </h3>
        <div className={`space-y-4 text-text-muted leading-relaxed ${inter.className}`}>
          <p>{t('about.bioP1')}</p>
          <p>{t('about.bioP2')}</p>
          <p>{t('about.bioP3')}</p>
        </div>
      </section>

      {/* Fleet */}
      <section className='bg-surface py-20 px-6'>
        <div className='max-w-4xl mx-auto text-center'>
          <h3 className={`text-2xl font-semibold text-text mb-4 ${inter.className}`}>
            {t('about.fleetTitle')}
          </h3>
          <p className={`text-text-muted leading-relaxed mb-10 ${inter.className}`}>
            {t('about.fleetDesc')}
          </p>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            {FLEET_IMAGES.map((img, i) => (
              <div key={i} className='relative aspect-[4/3] border border-border overflow-hidden'>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className='object-cover'
                  sizes='(max-width: 768px) 50vw, 25vw'
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className='max-w-4xl mx-auto px-6 py-20'>
        <h3 className={`text-2xl font-semibold text-text text-center mb-12 ${inter.className}`}>
          {t('about.advantagesTitle')}
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {[
            { Icon: FiMapPin, title: t('about.adv1Title'), desc: t('about.adv1Desc') },
            { Icon: FiRefreshCw, title: t('about.adv2Title'), desc: t('about.adv2Desc') },
            { Icon: FiAward, title: t('about.adv3Title'), desc: t('about.adv3Desc') },
          ].map((adv, i) => (
            <div key={i} className='text-center'>
              <adv.Icon className='w-8 h-8 text-primary mx-auto mb-5' />
              <h3 className={`text-lg font-semibold text-text mb-3 ${inter.className}`}>{adv.title}</h3>
              <p className={`text-sm text-text-muted leading-relaxed ${inter.className}`}>{adv.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
