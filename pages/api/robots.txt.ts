import { NextApiRequest, NextApiResponse } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://asmi.lt';

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  const robots = `User-agent: *
Allow: /
Disallow: /api/
Crawl-delay: 1

User-agent: GPTBot
Allow: /
Crawl-delay: 5

User-agent: GoogleOther
Allow: /
Crawl-delay: 5

User-agent: anthropic-ai
Allow: /
Crawl-delay: 5

User-agent: Claude-Web
Allow: /
Crawl-delay: 5

Sitemap: ${BASE_URL}/sitemap.xml`;

  res.setHeader('Content-Type', 'text/plain');
  res.status(200).send(robots);
}
