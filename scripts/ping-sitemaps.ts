import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

async function pingSitemaps() {
    console.log("🔄 SITEMAP VE INDEXNOW PING İŞLEMİ BAŞLATILIYOR...\n");

    const sites = await prisma.site.findMany({
        where: { isActive: true },
        select: { domain: true }
    });

    const indexNowKey = "3a4b9c8d1e2f3g4h5i6j7k8l9m0n1o2p";

    for (const site of sites) {
        const sitemapUrl = `https://${site.domain}/sitemap.xml`;
        console.log(`\n🌐 Pingleniyor: ${sitemapUrl}`);

        // 1. IndexNow Ping (Bing)
        try {
            const indexNowUrl = `https://www.bing.com/indexnow?url=${encodeURIComponent(sitemapUrl)}&key=${indexNowKey}`;
            await axios.get(indexNowUrl, { timeout: 5000 });
            console.log(`  ✅ IndexNow (Bing): Sitemap başarıyla iletildi.`);
        } catch (error: any) {
            console.log(`  ❌ IndexNow (Bing): Ping başarısız! (${error.message})`);
        }

        // 2. IndexNow Ping (Yandex)
        try {
            const yandexUrl = `https://yandex.com/indexnow?url=${encodeURIComponent(sitemapUrl)}&key=${indexNowKey}`;
            await axios.get(yandexUrl, { timeout: 5000 });
            console.log(`  ✅ IndexNow (Yandex): Sitemap başarıyla iletildi.`);
        } catch (error: any) {
            console.log(`  ❌ IndexNow (Yandex): Ping başarısız! (${error.message})`);
        }
    }

    console.log("\n🎯 BÜTÜN PING İŞLEMLERİ TAMAMLANDI!");
}

pingSitemaps()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
