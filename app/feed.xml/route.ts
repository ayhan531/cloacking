import { getSiteByDomain } from "@/lib/site-service";
import { headers } from "next/headers";

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

export async function GET() {
    const headersList = await headers();
    const host = headersList.get("host") || "";
    const domain = host.split(':')[0].replace('www.', '');

    let site: any = null;
    let items = [];

    try {
        site = await getSiteByDomain(domain);
        if (site && site.maskContent && site.maskContent.news) {
            items = site.maskContent.news;
        }
    } catch (e) {
        console.error("RSS Feed DB Error:", e);
    }

    const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(site?.name || domain)} News Feed</title>
    <link>https://${domain}</link>
    <description>Latest updates from ${escapeXml(site?.name || domain)}</description>
    <language>tr</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://${domain}/feed.xml" rel="self" type="application/rss+xml" />
    ${items.map((item: any) => `
    <item>
      <title>${escapeXml(item.title)}</title>
      <link>https://${domain}/haberler/${escapeXml(item.slug)}</link>
      <guid isPermaLink="true">https://${domain}/haberler/${escapeXml(item.slug)}</guid>
      <pubDate>${item.date ? new Date(item.date).toUTCString() : new Date().toUTCString()}</pubDate>
      <description>${escapeXml(item.excerpt || item.title)}</description>
    </item>
    `).join("")}
  </channel>
</rss>`;

    return new Response(feed, {
        headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=59"
        },
    });
}
