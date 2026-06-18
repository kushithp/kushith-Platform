import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // Read production domain or default fallback
  const domain = 'https://kushith.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/admin/'],
    },
    sitemap: `${domain}/sitemap.xml`,
  };
}
