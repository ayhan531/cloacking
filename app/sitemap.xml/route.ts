import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export async function GET() {
    const headersList = await headers();
    const host = headersList.get("host") || "";
    const domain = host.split(':')[0].replace('www.', '');

    // Temel sayfalar her zaman olmalı
    let pages = ['', 'deneme-bonusu', 'bahis-siteleri', 'casino-siteleri', 'hosgeldin-bonusu', 'hakkimizda', 'haberler'];

    try {
        // Veritabanını kontrol et, ama bulamazsan bile patlama!
        const site = await prisma.site.findUnique({ where: { domain } });
        if (site) {
            const maskContent = typeof site.maskContent === 'string' ? JSON.parse(site.maskContent) : site.maskContent;
            if (maskContent.news && Array.isArray(maskContent.news)) {
                const newsPages = maskContent.news.map((item: any) => `haberler/${item.slug}`);
                pages = [...pages, ...newsPages];
            }
        }
    } catch (e) {
        console.error("Sitemap DB fallback activated for:", domain);
    }

    // Google'ı sevindirecek kusursuz XML
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages.map(page => `
  <url>
    <loc>https://${domain}${page ? `/${page}` : ''}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('')}
</urlset>`.trim();

    return new Response(xml, {
        headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, s-maxage=86400"
        },
    });
}
