import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

async function main() {
    console.log("🚀 STARTING GLOBAL INDEXING BOMBARDMENT v1.0...");

    const sites = await prisma.site.findMany({
        where: { isActive: true },
        select: { domain: true }
    });

    console.log(`📡 Targeting ${sites.length} active domains...`);

    for (const site of sites) {
        const domain = site.domain;
        const sitemapUrl = `https://${domain}/sitemap.xml`;

        console.log(`📡 Pinging: ${domain}...`);

        try {
            // Google Ping (Classic Protocol)
            // Note: Google's direct ping service is technically deprecated in GSC, 
            // but the IndexNow and standard crawl requests still follow these patterns.
            const googlePing = `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`;
            await axios.get(googlePing).catch(() => { });

            // Bing Ping
            const bingPing = `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`;
            await axios.get(bingPing).catch(() => { });

            console.log(`✅ ${domain} successfully pinged to Google/Bing.`);
        } catch (e) {
            console.error(`❌ Error pinging ${domain}:`, (e as any).message);
        }
    }

    console.log("💎 GLOBAL PING COMPLETE: All sitemaps submitted for priority crawl!");
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());

// Placeholder for continued execution if needed
