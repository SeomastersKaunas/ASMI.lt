import { useState, FormEvent } from 'react';
import { inter } from '../lib/fonts';
import { useLocalePath } from '../lib/useLocalePath';
import useTranslation from '../lib/translation';
import SEOHead from '../components/SEOHead';
import { FiPhone, FiMail, FiMapPin, FiBriefcase } from 'react-icons/fi';

export default function ContactPage() {
  const { isLithuanian } = useLocalePath();
  const { t } = useTranslation('common');
  const [form, setForm] = useState({ name: '', clientEmail: '', phone: '', subject: '', message: '', website: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/submitForm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, subject: form.subject || (isLithuanian ? 'Bendri klausimai' : 'General inquiry') }),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }

  const title = isLithuanian ? 'Kontaktai' : 'Contact';
  const description = isLithuanian
    ? 'Susisiekite su ASMI. Telefonas: 0 699 55433, el. paštas: info@asmi.lt. Adresas: Kaunas, Pramonės pr. 4L, 51329.'
    : 'Get in touch with ASMI. Phone: 0 699 55433, email: info@asmi.lt. Address: Kaunas, Pramonės pr. 4L, 51329.';

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: title,
    description,
    url: `https://asmi.lt${isLithuanian ? '/lt/kontaktai' : '/en/contact'}`,
    inLanguage: isLithuanian ? 'lt' : 'en',
  };

  return (
    <>
      <SEOHead
        title={title}
        description={description}
        canonicalUrl={isLithuanian ? '/lt/kontaktai' : '/en/contact'}
        lang={isLithuanian ? 'lt' : 'en'}
        structuredData={structuredData}
      />

      {/* Header */}
      <section className='bg-surface py-16 px-6 text-center'>
        <div className='max-w-3xl mx-auto'>
          <h1 className={`text-3xl md:text-4xl font-bold text-text mb-3 ${inter.className}`}>
            {t('contact.title')}
          </h1>
          <p className={`text-text-muted text-base ${inter.className}`}>{t('contact.subtitle')}</p>
        </div>
      </section>

      <div className='max-w-5xl mx-auto px-6 py-20'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-14 items-start'>
          {/* Contact info */}
          <div>
            <h2 className={`text-2xl font-semibold text-text mb-4 ${inter.className}`}>
              {t('contact.infoTitle')}
            </h2>
            <p className={`text-text-muted text-sm leading-relaxed mb-8 ${inter.className}`}>
              {t('contact.infoText')}
            </p>

            <div className={`space-y-5 text-sm ${inter.className}`}>
              <div className='flex items-start gap-3'>
                <FiMapPin className='w-5 h-5 shrink-0 text-primary mt-0.5' />
                <div>
                  <p className='text-text font-medium'>{t('contact.addressLabel')}</p>
                  <p className='text-text-muted'>{t('contact.address')}</p>
                </div>
              </div>

              <a href='tel:069955433' className='flex items-start gap-3 hover:text-primary transition-colors'>
                <FiPhone className='w-5 h-5 shrink-0 text-primary mt-0.5' />
                <div>
                  <p className='text-text font-medium'>{t('contact.phoneLabel')}</p>
                  <p className='text-text-muted'>{t('contact.phone')}</p>
                </div>
              </a>

              <a href='mailto:info@asmi.lt' className='flex items-start gap-3 hover:text-primary transition-colors'>
                <FiMail className='w-5 h-5 shrink-0 text-primary mt-0.5' />
                <div>
                  <p className='text-text font-medium'>{t('contact.emailLabel')}</p>
                  <p className='text-text-muted'>{t('contact.email')}</p>
                </div>
              </a>

              <div className='flex items-start gap-3'>
                <FiBriefcase className='w-5 h-5 shrink-0 text-primary mt-0.5' />
                <div>
                  <p className='text-text font-medium'>{t('contact.companyLabel')}</p>
                  <p className='text-text-muted'>{t('contact.companyCode')}</p>
                  <p className='text-text-muted'>{t('contact.companyName')}</p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className='mt-8'>
              <h3 className={`text-sm font-semibold text-text uppercase tracking-wider mb-3 ${inter.className}`}>
                {t('contact.mapTitle')}
              </h3>
              <div className='w-full border border-border overflow-hidden relative' style={{ height: '300px' }}>
                <iframe
                  src='https://maps.google.com/maps?q=ASMI%20Pramon%C4%97s%20pr.%204L%20Kaunas&z=15&output=embed'
                  style={{ border: 0, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                  allowFullScreen
                  loading='lazy'
                  referrerPolicy='no-referrer-when-downgrade'
                  title='ASMI location'
                />
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div>
            <h2 className={`text-2xl font-semibold text-text mb-6 ${inter.className}`}>
              {t('contact.formTitle')}
            </h2>

            {status === 'sent' ? (
              <div className={`text-center py-12 ${inter.className}`}>
                <p className='text-primary text-lg mb-2'>{t('contact.formSuccess')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className='space-y-5'>
                <div>
                  <label className={`block text-xs uppercase tracking-wider text-text-muted mb-1.5 ${inter.className}`}>
                    {t('contact.formName')}
                  </label>
                  <input
                    type='text'
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={`w-full border border-border bg-white px-4 py-3 text-sm text-text focus:outline-none focus:border-primary transition-colors ${inter.className}`}
                    placeholder={t('contact.formNamePlaceholder')}
                  />
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                  <div>
                    <label className={`block text-xs uppercase tracking-wider text-text-muted mb-1.5 ${inter.className}`}>
                      {t('contact.formPhone')}
                    </label>
                    <input
                      type='tel'
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className={`w-full border border-border bg-white px-4 py-3 text-sm text-text focus:outline-none focus:border-primary transition-colors ${inter.className}`}
                      placeholder={t('contact.formPhonePlaceholder')}
                    />
                  </div>
                  <div>
                    <label className={`block text-xs uppercase tracking-wider text-text-muted mb-1.5 ${inter.className}`}>
                      {t('contact.formEmail')}
                    </label>
                    <input
                      type='email'
                      required
                      value={form.clientEmail}
                      onChange={(e) => setForm({ ...form, clientEmail: e.target.value })}
                      className={`w-full border border-border bg-white px-4 py-3 text-sm text-text focus:outline-none focus:border-primary transition-colors ${inter.className}`}
                      placeholder={t('contact.formEmailPlaceholder')}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-xs uppercase tracking-wider text-text-muted mb-1.5 ${inter.className}`}>
                    {t('contact.formSubject')}
                  </label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className={`w-full border border-border bg-white px-4 py-3 text-sm text-text focus:outline-none focus:border-primary transition-colors ${inter.className}`}
                  >
                    <option value=''>{t('contact.formSubjectPlaceholder')}</option>
                    <option value={t('contact.formSubject1')}>{t('contact.formSubject1')}</option>
                    <option value={t('contact.formSubject2')}>{t('contact.formSubject2')}</option>
                    <option value={t('contact.formSubject3')}>{t('contact.formSubject3')}</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-xs uppercase tracking-wider text-text-muted mb-1.5 ${inter.className}`}>
                    {t('contact.formMessage')}
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={`w-full border border-border bg-white px-4 py-3 text-sm text-text focus:outline-none focus:border-primary transition-colors resize-none ${inter.className}`}
                    placeholder={t('contact.formMessagePlaceholder')}
                  />
                </div>

                {/* Honeypot */}
                <input
                  type='text'
                  name='website'
                  value={form.website}
                  onChange={(e) => setForm({ ...form, website: e.target.value })}
                  className='hidden'
                  tabIndex={-1}
                  autoComplete='off'
                  aria-hidden='true'
                />

                {status === 'error' && (
                  <p className={`text-xs text-red-500 ${inter.className}`}>{t('contact.formError')}</p>
                )}

                <button
                  type='submit'
                  disabled={status === 'sending'}
                  className={`w-full py-3.5 bg-primary text-white text-sm font-medium uppercase tracking-wider hover:bg-primary-dark transition-colors disabled:opacity-60 ${inter.className}`}
                >
                  {status === 'sending' ? t('contact.formSending') : t('contact.formSubmit')}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
