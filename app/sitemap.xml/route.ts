import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
    const headersList = await headers();
    const host = headersList.get("host") || "";
    const domain = host.split(':')[0].replace('www.', '');

    let urls = [
        { loc: `https://${domain}`, lastmod: new Date().toISOString(), priority: '1.0', changefreq: 'always' },
        { loc: `https://${domain}/hakkimizda`, lastmod: new Date().toISOString(), priority: '0.8', changefreq: 'monthly' },
        { loc: `https://${domain}/iletisim`, lastmod: new Date().toISOString(), priority: '0.8', changefreq: 'monthly' },
        { loc: `https://${domain}/deneme-bonusu`, lastmod: new Date().toISOString(), priority: '0.9', changefreq: 'daily' },
        { loc: `https://${domain}/bahis-siteleri`, lastmod: new Date().toISOString(), priority: '0.9', changefreq: 'daily' },
        { loc: `https://${domain}/casino-siteleri`, lastmod: new Date().toISOString(), priority: '0.9', changefreq: 'daily' },
        { loc: `https://${domain}/hosgeldin-bonusu`, lastmod: new Date().toISOString(), priority: '0.9', changefreq: 'daily' },
    ];

    try {
        const site = await prisma.site.findUnique({
            where: { domain },
            select: { maskContent: true }
        });

        if (site && site.maskContent) {
            const maskContent = typeof site.maskContent === 'string'
                ? JSON.parse(site.maskContent)
                : (site.maskContent as any);

            if (maskContent.news && Array.isArray(maskContent.news)) {
                // 🕒 Hourly precision for the lastmod signal
                const hourlyLastmod = new Date().toISOString().split(':')[0] + ':00:00Z';
                console.log(`[Sitemap] Domain: ${domain}, Injecting ${maskContent.news.length} news URLs`);
                const newsUrls = maskContent.news.map((item: any) => ({
                    loc: `https://${domain}/haberler/${item.slug}`,
                    lastmod: hourlyLastmod,
                    priority: '0.9',
                    changefreq: 'always'
                }));
                urls = [...urls, ...newsUrls];
            }
        }
    } catch (e) {
        console.error("Sitemap DB Error:", e);
    }

    const escapeXml = (unsafe: string) => {
        return unsafe.replace(/[<>&'"]/g, (c) => {
            switch (c) {
                case '<': return '&lt;';
                case '>': return '&gt;';
                case '&': return '&amp;';
                case '\'': return '&apos;';
                case '"': return '&quot;';
            }
            return c;
        });
    }

    const sitemapData = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.map((url) => `
  <url>
    <loc>${escapeXml(url.loc)}</loc>
    <lastmod>${escapeXml(url.lastmod)}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>
  `).join("")}
</urlset>`;

    return new Response(sitemapData, {
        headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
            "Pragma": "no-cache",
            "Expires": "0"
        },
    });
}
