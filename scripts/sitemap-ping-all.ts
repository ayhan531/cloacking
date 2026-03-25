/**
 * 📡 TOTAL SITEMAP PING (REDLINE SHOUT)
 * Hammers the Google and Bing sitemap submission endpoints for all 7 domains.
 * This is the 'Loudest' signal for a new site version.
 */
import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

async function main() {
    console.log("📡 INITIATING TOTAL SITEMAP SUBMISSION...");

    const sites = await prisma.site.findMany({ where: { isActive: true } });

    for (const site of sites) {
        console.log(`🚀 Shout-out for ${site.domain}...`);
        
        try {
            const sitemapUrl = `https://${site.domain}/sitemap.xml`;
            
            // 1. Google Ping (Legacy but often still triggers a response)
            const gPing = await axios.get(`https://www.google.com/ping?sitemap=${sitemapUrl}`).catch(e => ({ status: 'error' }));
            console.log(`   ✅ Google Ping (204 is good): ${gPing.status}`);

            // 2. Bing Ping (Official endpoint)
            const bPing = await axios.get(`https://www.bing.com/ping?sitemap=${sitemapUrl}`).catch(e => ({ status: 'error' }));
            console.log(`   ✅ Bing Ping (200 is good): ${bPing.status}`);

            // 3. IndexNow Push (The most modern way)
            const iNow = await axios.post('https://www.bing.com/indexnow', {
                host: site.domain,
                key: "3a4b9c8d1e2f3g4h5i6j7k8l9m0n1o2p",
                keyLocation: `https://${site.domain}/3a4b9c8d1e2f3g4h5i6j7k8l9m0n1o2p.txt`,
                urlList: [sitemapUrl, `https://${site.domain}/`]
            }).catch(e => ({ status: 'error' }));
            console.log(`   ✅ IndexNow Push: ${(iNow as any).status}`);

        } catch (e) {
            console.error(`   ❌ Failed ping for ${site.domain}`);
        }
    }

    console.log("\n📡 ALL SITEMAPS SHOUTED. GOOGLE AND BING ARE LISTENING NOW.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
