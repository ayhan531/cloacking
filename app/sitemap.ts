import { MetadataRoute } from 'next';
import { headers } from 'next/headers';
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const headersList = await headers();
    const host = headersList.get('host') || '';
    const domain = host.split(':')[0].replace('www.', '');

    let routes: string[] = ['', 'deneme-bonusu', 'bahis-siteleri', 'casino-siteleri', 'hosgeldin-bonusu', 'hakkimizda', 'haberler'];

    try {
        const site = await prisma.site.findUnique({ where: { domain } });
        if (site) {
            const maskContent = typeof site.maskContent === 'string' ? JSON.parse(site.maskContent) : site.maskContent;
            if (maskContent.news && Array.isArray(maskContent.news)) {
                const newsRoutes = maskContent.news.map((item: any) => `haberler/${item.slug}`);
                routes = [...routes, ...newsRoutes];
            }
        }
    } catch (e) {
        console.error("Sitemap generation error:", e);
    }

    return routes.map((route) => ({
        url: `https://${domain}${route ? `/${route}` : ''}`,
        lastModified: new Date(),
        changefreq: 'daily' as any,
        priority: route === '' ? 1.0 : (route.includes('bonus') ? 0.9 : 0.7),
    }));
}
