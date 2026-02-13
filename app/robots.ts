import { MetadataRoute } from 'next';
import { headers } from 'next/headers';

export default async function robots(): Promise<MetadataRoute.Robots> {
    const headersList = await headers();
    const host = headersList.get('host') || '';
    const domain = host.split(':')[0].replace('www.', '');

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
            },
            {
                userAgent: ['Googlebot-News', 'Googlebot-Image'],
                allow: '/',
            }
        ],
        sitemap: `https://${domain}/sitemap.xml`,
    };
}
