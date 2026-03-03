import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

async function main() {
    console.log("🔥 MASSIVE URL PING: Submitting 210+ News URLs to IndexNow...");

    const sites = await prisma.site.findMany({ where: { isActive: true } });

    for (const site of sites) {
        const domain = site.domain;
        const mask = typeof site.maskContent === 'string' ? JSON.parse(site.maskContent) : site.maskContent;

        if (!mask || !mask.news) continue;

        const urls = [
            `https://${domain}/`,
            `https://${domain}/haberler`,
            ...mask.news.map((n: any) => `https://${domain}/haberler/${n.slug}`)
        ];

        console.log(`📡 [${domain}] Sending ${urls.length} URLs to Bing IndexNow...`);

        try {
            // Using a generic key or a per-site key if available
            // For now, let's use the standard IndexNow endpoint
            const res = await axios.post('https://www.bing.com/indexnow', {
                host: domain,
                key: "flovaz2026indexnowkey", // Example key
                keyLocation: `https://${domain}/flovaz2026indexnowkey.txt`,
                urlList: urls
            });
            console.log(`   ✅ Status: ${res.status} (Bing)`);
        } catch (e: any) {
            console.error(`   ❌ Bing failed for ${domain}:`, e.message);
        }

        try {
            const res = await axios.post('https://yandex.com/indexnow', {
                host: domain,
                key: "flovaz2026indexnowkey",
                keyLocation: `https://${domain}/flovaz2026indexnowkey.txt`,
                urlList: urls
            });
            console.log(`   ✅ Status: ${res.status} (Yandex)`);
        } catch (e: any) {
            // Silence Yandex errors if they are too noisy
        }
    }

    console.log("🏁 PING EXPLOSION COMPLETE.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
