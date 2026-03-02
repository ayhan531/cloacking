import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

async function pingSitemaps() {
    console.log("🔄 SITEMAP VE INDEXNOW PING İŞLEMİ BAŞLATILIYOR...\n");

    const sites = await prisma.site.findMany({
        where: { isActive: true },
        select: { domain: true }
    });

    for (const site of sites) {
        const sitemapUrl = `https://${site.domain}/sitemap.xml`;
        console.log(`\n🌐 Pingleniyor: ${sitemapUrl}`);

        // 1. Google Ping
        try {
            const googleUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`;
            await axios.get(googleUrl, { timeout: 5000 });
            console.log(`  ✅ Google: Sitemap başarıyla iletildi.`);
        } catch (error: any) {
            console.log(`  ❌ Google: Ping başarısız! (${error.message})`);
        }

        // 2. Bing Ping
        try {
            const bingUrl = `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`;
            await axios.get(bingUrl, { timeout: 5000 });
            console.log(`  ✅ Bing: Sitemap başarıyla iletildi.`);
        } catch (error: any) {
            console.log(`  ❌ Bing: Ping başarısız! (${error.message})`);
        }

        // 3. IndexNow Ping (Yandex, Bing, Seznam)
        try {
            // Arama motorları IndexNow API kullanarak daha hızlı indeksleme yapabilir
            const indexNowUrl = `https://api.indexnow.org/indexnow?url=${encodeURIComponent(sitemapUrl)}&key=YOUR_INDEXNOW_KEY`;
            // Gerçek key istersen burayı güncelleyebiliriz, ancak basit sitemap pingi genelde yeterlidir.
            console.log(`  ℹ️  IndexNow: Entegrasyon hazır. (Kullanmak istersen IndexNow API kodunu buraya girebilirsin)`);
        } catch (error) { }
    }

    console.log("\n🎯 BÜTÜN PING İŞLEMLERİ TAMAMLANDI!");
}

pingSitemaps()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
