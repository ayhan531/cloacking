/**
 * 💣 TIER 3 MASSIVE PING BOMB
 * Pings every single URL of all 7 sites to Google, Bing, and Yandex.
 * High risk, Maximum visibility.
 */
import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();
const INDEX_NOW_KEY = '3a4b9c8d1e2f3g4h5i6j7k8l9m0n1o2p';

async function main() {
    console.log("💣 INITIATING TIER 3 MASSIVE PING BOMB...");

    const sites = await prisma.site.findMany({ where: { isActive: true } });

    for (const site of sites) {
        console.log(`📡 Bombing ${site.domain}...`);
        const maskContent = JSON.parse(site.maskContent || "{}");
        const news = maskContent.news || [];
        
        const urls = [
            `https://${site.domain}/`,
            `https://${site.domain}/deneme-bonusu`,
            `https://${site.domain}/haberler`,
            ...news.map((n: any) => `https://${site.domain}/haberler/${n.slug}`)
        ];

        console.log(`   🚀 Pinging ${urls.length} URLs to IndexNow...`);
        
        // Bing IndexNow
        try {
            await axios.post('https://api.indexnow.org/indexnow', {
                host: site.domain,
                key: INDEX_NOW_KEY,
                keyLocation: `https://${site.domain}/${INDEX_NOW_KEY}.txt`,
                urlList: urls
            }, { timeout: 30000 });
            console.log(`   ✅ Bing/Yandex Pushed.`);
        } catch {
            console.log(`   ❌ IndexNow Error.`);
        }

        // Standard Ping-o-Matic Style Pings
        const pingServices = [
            'http://rpc.pingomatic.com',
            'http://rpc.twingly.com',
            'http://ping.blo.gs/',
            'http://www.blogpeople.net/servlet/weblogUpdates'
        ];

        for (const service of pingServices) {
            try {
                await axios.get(service, { params: { name: site.name, url: `https://${site.domain}/` }, timeout: 5000 });
            } catch {}
        }
    }

    console.log("\n🏁 TIER 3 PING BOMB COMPLETED.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
