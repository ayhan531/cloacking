/**
 * ⚡ INDEXNOW MULTI-PUSH (BİNG & YANDEX)
 * Pushes up to 10,000 URLs directly to IndexNow API for instant crawl.
 * This targets Bing and Yandex specifically.
 */
import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();
const INDEX_NOW_KEY = '3a4b9c8d1e2f3g4h5i6j7k8l9m0n1o2p';

async function main() {
    console.log("⚡ STARTING INDEXNOW MULTI-PUSH (BING + YANDEX)...");

    const sites = await prisma.site.findMany({ where: { isActive: true } });

    for (const site of sites) {
        console.log(`📡 Processing ${site.domain}...`);
        
        let maskContent = JSON.parse(site.maskContent || "{}");
        if (!maskContent.news || !Array.isArray(maskContent.news)) {
            console.log(`   ⚠️ No news found for ${site.domain}`);
            continue;
        }

        // Get all slugs (limit to 1000 per push per Bing rules)
        const urlList = [
            `https://${site.domain}/`,
            `https://${site.domain}/haberler`,
            `https://${site.domain}/deneme-bonusu`,
            ...maskContent.news.slice(0, 1000).map((n: any) => `https://${site.domain}/haberler/${n.slug}`)
        ];

        const payload = {
            host: site.domain,
            key: INDEX_NOW_KEY,
            keyLocation: `https://${site.domain}/${INDEX_NOW_KEY}.txt`, // We'll create this on the fly if needed
            urlList: urlList
        };

        // Push to Bing
        try {
            const bingRes = await axios.post('https://www.bing.com/indexnow', payload, { timeout: 15000 });
            console.log(`   ✅ Bing Pushed: ${urlList.length} URLs (Status: ${bingRes.status})`);
        } catch (e: any) {
            console.error(`   ❌ Bing Push Failed for ${site.domain}:`, e.response?.data || e.message);
        }

        // Push to Yandex
        try {
            const yandexRes = await axios.post('https://yandex.com/indexnow', payload, { timeout: 15000 });
            console.log(`   ✅ Yandex Pushed: ${urlList.length} URLs (Status: ${yandexRes.status})`);
        } catch (e: any) {
            console.error(`   ❌ Yandex Push Failed for ${site.domain}:`, e.response?.data || e.message);
        }
    }

    console.log("\n⚡ INDEXNOW BOMB COMPLETE.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
