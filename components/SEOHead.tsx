import Head from 'next/head';
import { DefaultSeo } from 'next-seo';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface HreflangTag {
  hreflang: string;
  href: string;
}

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  structuredData?: any;
  noIndex?: boolean;
  lang?: string;
  breadcrumbs?: BreadcrumbItem[];
  hreflang?: HreflangTag[];
}

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://asmi.lt';

export default function SEOHead({
  title,
  description,
  keywords = 'pervežimai Kaune, pervežimai Kauno apskrityje, spaudos pervežimas Kaune, spaudos paskirstymas prekybos centrams, gėrimų pervežimas Kaune, maisto produktų pervežimas, krovinių pervežimas Kaune, logistikos paslaugos Kaune, vietiniai pervežimai Kauno apskrityje, prekių paskirstymas Kaune',
  canonicalUrl,
  ogImage = '/images/og-image.jpg',
  structuredData,
  noIndex = false,
  lang = 'lt',
  breadcrumbs,
  hreflang,
}: SEOHeadProps) {
  const isLithuanian = lang === 'lt';
  const normalizeTitle = (value: string) => {
    const parts = value
      .split('|')
      .map((p) => p.trim())
      .filter((p) => p.length > 0 && !/^asmi$/i.test(p));
    const base = parts[0] || 'ASMI';
    return `${base} | ASMI`;
  };
  const normalizedTitle = normalizeTitle(title);
  const fullCanonicalUrl = canonicalUrl ? `${BASE_URL}${canonicalUrl}` : undefined;
  const ogUrl = fullCanonicalUrl || BASE_URL;
  const absoluteOgImage =
    typeof ogImage === 'string' && (ogImage.startsWith('http://') || ogImage.startsWith('https://'))
      ? ogImage
      : `${BASE_URL}${ogImage && ogImage.startsWith('/') ? '' : '/'}${ogImage || '/images/logo.png'}`;
  const safeDescription = description || 'ASMI – patikimi pervežimai Kauno apskrityje nuo 2012 metų. Spaudos, gėrimų ir maisto produktų pervežimo paslaugos.';

  const autoHreflang: HreflangTag[] = canonicalUrl
    ? [
        { hreflang: 'lt', href: `${BASE_URL}/lt${canonicalUrl.replace(/^\/lt/, '')}` },
        { hreflang: 'en', href: `${BASE_URL}/en${canonicalUrl.replace(/^\/(lt|en)/, '')}` },
        { hreflang: 'x-default', href: `${BASE_URL}` },
      ]
    : [];
  const effectiveHreflang = hreflang && hreflang.length > 0 ? hreflang : autoHreflang;

  const siteNavigationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SiteNavigationElement',
    name: isLithuanian ? 'Navigacija' : 'Navigation',
    url: BASE_URL + (isLithuanian ? '/lt' : '/en'),
    hasPart: isLithuanian
      ? [
          { '@type': 'SiteNavigationElement', name: 'Paslaugos', url: `${BASE_URL}/lt/paslaugos` },
          { '@type': 'SiteNavigationElement', name: 'Apie mus', url: `${BASE_URL}/lt/apie` },
          { '@type': 'SiteNavigationElement', name: 'Kontaktai', url: `${BASE_URL}/lt/kontaktai` },
        ]
      : [
          { '@type': 'SiteNavigationElement', name: 'Services', url: `${BASE_URL}/en/services` },
          { '@type': 'SiteNavigationElement', name: 'About', url: `${BASE_URL}/en/about` },
          { '@type': 'SiteNavigationElement', name: 'Contact', url: `${BASE_URL}/en/contact` },
        ],
  };

  const generateBreadcrumbSchema = (): any => {
    if (!breadcrumbs || breadcrumbs.length === 0) {
      return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: isLithuanian ? 'Pradžia' : 'Home',
            item: BASE_URL + (isLithuanian ? '/lt' : '/en'),
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: normalizedTitle.split(' | ')[0],
            item: fullCanonicalUrl || BASE_URL,
          },
        ],
      };
    }
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: crumb.url.startsWith('http') ? crumb.url : `${BASE_URL}${crumb.url}`,
      })),
    };
  };

  const breadcrumbSchema = generateBreadcrumbSchema();

  const defaultStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: normalizedTitle,
    description: safeDescription,
    url: fullCanonicalUrl || BASE_URL,
    inLanguage: isLithuanian ? 'lt' : 'en',
    isPartOf: {
      '@type': 'WebSite',
      name: 'ASMI',
      url: BASE_URL,
    },
  };

  const finalStructuredData = structuredData || defaultStructuredData;

  return (
    <>
      <Head>
        <title>{normalizedTitle}</title>
        <meta name='description' content={safeDescription} />
        <meta name='keywords' content={keywords} />
        <meta name='author' content='UAB ASMI' />
        <meta
          name='robots'
          content={noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'}
        />
        <meta name='googlebot' content={noIndex ? 'noindex, nofollow' : 'index, follow'} />
        <meta name='bingbot' content={noIndex ? 'noindex, nofollow' : 'index, follow'} />

        <meta property='og:title' content={normalizedTitle} />
        <meta property='og:description' content={safeDescription} />
        <meta property='og:url' content={ogUrl} />
        <meta property='og:image' content={absoluteOgImage} />
        <meta property='og:image:width' content='1200' />
        <meta property='og:image:height' content='630' />
        <meta property='og:type' content='website' />
        <meta property='og:site_name' content='ASMI' />
        <meta property='og:locale' content={isLithuanian ? 'lt_LT' : 'en_US'} />
        <meta property='og:locale:alternate' content={isLithuanian ? 'en_US' : 'lt_LT'} />

        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content={normalizedTitle} />
        <meta name='twitter:description' content={safeDescription} />
        <meta name='twitter:image' content={absoluteOgImage} />

        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='theme-color' content='#17aacd' />
        <meta name='msapplication-TileColor' content='#17aacd' />
        {fullCanonicalUrl && <link rel='canonical' href={fullCanonicalUrl} />}

        {effectiveHreflang.length > 0 &&
          effectiveHreflang.map((tag) => (
            <link key={tag.hreflang} rel='alternate' hrefLang={tag.hreflang} href={tag.href} />
          ))}

        <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(finalStructuredData) }} />
        <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(siteNavigationSchema) }} />
        <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      </Head>

      <DefaultSeo
        title={normalizedTitle}
        description={safeDescription}
        openGraph={{
          type: 'website',
          locale: isLithuanian ? 'lt_LT' : 'en_US',
          url: ogUrl,
          site_name: 'ASMI',
          title: normalizedTitle,
          description: safeDescription,
          images: [
            {
              url: absoluteOgImage,
              width: 1200,
              height: 630,
              alt: normalizedTitle,
            },
          ],
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
        additionalMetaTags={[
          { name: 'keywords', content: keywords },
          { name: 'author', content: 'UAB ASMI' },
        ]}
        additionalLinkTags={
          fullCanonicalUrl
            ? [{ rel: 'canonical', href: fullCanonicalUrl }]
            : []
        }
      />
    </>
  );
}
