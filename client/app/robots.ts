import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/success', '/cancel'],
    },
    sitemap: `${process.env.CLIENT_URL || 'http://localhost:3000'}/sitemap.xml`,
  };
}
