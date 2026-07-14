import { NextApiRequest, NextApiResponse } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://asmi.lt';

const PAGES = [
  { path: '/lt', priority: '1.0', changefreq: 'weekly' },
  { path: '/lt/paslaugos', priority: '0.9', changefreq: 'monthly' },
  { path: '/lt/apie', priority: '0.8', changefreq: 'monthly' },
  { path: '/lt/kontaktai', priority: '0.8', changefreq: 'monthly' },
  { path: '/en', priority: '0.9', changefreq: 'weekly' },
  { path: '/en/services', priority: '0.8', changefreq: 'monthly' },
  { path: '/en/about', priority: '0.7', changefreq: 'monthly' },
  { path: '/en/contact', priority: '0.7', changefreq: 'monthly' },
];

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  const urls = PAGES.map((page) => {
    const alternates = page.path.startsWith('/lt')
      ? [
          { hreflang: 'lt', href: `${BASE_URL}${page.path}` },
          { hreflang: 'en', href: `${BASE_URL}${page.path.replace('/lt', '/en')}` },
          { hreflang: 'x-default', href: BASE_URL },
        ]
      : [
          { hreflang: 'en', href: `${BASE_URL}${page.path}` },
          { hreflang: 'lt', href: `${BASE_URL}${page.path.replace('/en', '/lt')}` },
          { hreflang: 'x-default', href: BASE_URL },
        ];

    const alternateTags = alternates
      .map((alt) => `    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${alt.href}"/>`)
      .join('\n');

    return `  <url>
    <loc>${BASE_URL}${page.path}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
${alternateTags}
  </url>`;
  }).join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>`;

  res.setHeader('Content-Type', 'application/xml');
  res.status(200).send(sitemap);
}
