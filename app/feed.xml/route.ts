import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export async function GET() {
    const headersList = await headers();
    const host = headersList.get("host") || "";
    const domain = host.split(':')[0].replace('www.', '');

    const tags = [
        "deneme bonusu veren siteler 2026",
        "bonus veren siteler 2026",
        "yatırımsız deneme bonusu 2026",
        "çevrimsiz deneme bonusu 2026",
        "500 tl deneme bonusu veren siteler",
        "en iyi bahis siteleri 2026",
        "bedava bonus veren siteler 2026",
        "güvenilir bahis siteleri listesi"
    ];

    const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/">
<channel>
  <title>${domain.toUpperCase()} - 2026 Bonus Otorite Merkezi</title>
  <link>https://${domain}</link>
  <description>2026 yılının en güncel deneme bonusu veren siteler analiz raporu.</description>
  <language>tr</language>
  ${tags.map((tag, i) => `
  <item>
    <title>${tag.toUpperCase()} - Güncel Rapor</title>
    <link>https://${domain}/haberler/${tag.replace(/ /g, '-')}-analiz</link>
    <description>${tag} konusu hakkında 2026 yılının en detaylı incelemesi ve güvenilir siteler listesi.</description>
    <pubDate>${new Date().toUTCString()}</pubDate>
    <guid>https://${domain}/news-signal-${i}</guid>
  </item>`).join('')}
</channel>
</rss>`.trim();

    return new Response(rss, {
        headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, s-maxage=3600"
        },
    });
}
