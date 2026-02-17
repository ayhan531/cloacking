import { getSiteByDomain } from "@/lib/site-service";
import { headers } from "next/headers";

export async function GET() {
    const headersList = await headers();
    const host = headersList.get("host") || "";
    // Clean domain for DB lookup
    const domain = host.split(':')[0].replace('www.', '');

    let urls = [
        { loc: `https://${domain}`, lastmod: new Date().toISOString(), priority: '1.0', changefreq: 'always' },
        { loc: `https://${domain}/hakkimizda`, lastmod: new Date().toISOString(), priority: '0.8', changefreq: 'monthly' },
        { loc: `https://${domain}/iletisim`, lastmod: new Date().toISOString(), priority: '0.8', changefreq: 'monthly' },
        // Add critical SEO pages
        { loc: `https://${domain}/deneme-bonusu`, lastmod: new Date().toISOString(), priority: '0.9', changefreq: 'daily' },
        { loc: `https://${domain}/bahis-siteleri`, lastmod: new Date().toISOString(), priority: '0.9', changefreq: 'daily' },
        { loc: `https://${domain}/casino-siteleri`, lastmod: new Date().toISOString(), priority: '0.9', changefreq: 'daily' },
        { loc: `https://${domain}/hosgeldin-bonusu`, lastmod: new Date().toISOString(), priority: '0.9', changefreq: 'daily' },
    ];

    try {
        const site = await getSiteByDomain(domain);
        if (site && site.maskContent && site.maskContent.news) {
            // 🚀 NUCLEAR CONTENT INJECTION
            const newsUrls = site.maskContent.news.map((item: any) => ({
                loc: `https://${domain}/haberler/${item.slug}`,
                lastmod: item.date || new Date().toISOString(),
                priority: '0.9', // High priority for fresh news
                changefreq: 'daily'
            }));
            urls = [...urls, ...newsUrls];
        }
    } catch (e) {
        console.error("Sitemap DB Error:", e);
    }

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.map((url) => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>
  `).join("")}
</urlset>`;

    return new Response(sitemap, {
        headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=59"
        },
    });
}
