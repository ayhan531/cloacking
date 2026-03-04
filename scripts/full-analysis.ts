import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

async function main() {
    console.log("🔍 OLUŞTURULAN 7 BÜYÜK SİTENİN SEO/BOT DURUMU ANALİZ EDİLİYOR...\n");

    const sites = await prisma.site.findMany({
        where: { isActive: true },
        select: { domain: true, name: true }
    });

    console.log(`📊 Toplam ${sites.length} aktif site bulundu.\n`);

    for (const site of sites) {
        console.log(`\n======================================================`);
        console.log(`🌐 HEDEF: ${site.name} (${site.domain})`);

        try {
            // Test 1: Bot View
            const responseBot = await axios.get('http://localhost:3000/', {
                headers: {
                    'Host': site.domain,
                    'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
                },
                timeout: 5000
            });
            const htmlBot = responseBot.data;
            const isBotFriendly = htmlBot.includes('EMERGENCY_INDEX_SIGNAL') && htmlBot.includes('application/ld+json');

            console.log(`🤖 Googlebot Testi: ${isBotFriendly ? '✅ BAŞARILI (Özel Makale & Şemalar Açılıyor)' : '❌ BAŞARISIZ'}`);

            // Text extracts
            const titleMatch = htmlBot.match(/<title>(.*?)<\/title>/);
            console.log(`   └─ Bot Title: ${titleMatch ? titleMatch[1] : 'Bulunamadı'}`);

            // Test 2: Sitemap
            const responseSitemap = await axios.get('http://localhost:3000/sitemap.xml', {
                headers: { 'Host': site.domain },
                timeout: 5000
            });
            const hasSitemap = responseSitemap.data.includes('urlset');
            const sitemapCount = (responseSitemap.data.match(/<url>/g) || []).length;
            console.log(`🗺️  Sitemap Testi:  ${hasSitemap ? `✅ BAŞARILI (${sitemapCount} URL Bulundu)` : '❌ BAŞARISIZ'}`);

            // Test 3: Robots.txt
            const responseRobots = await axios.get('http://localhost:3000/robots.txt', {
                headers: { 'Host': site.domain },
                timeout: 5000
            });
            const hasRobots = responseRobots.data.includes('User-Agent: *');
            console.log(`🤖 Robots.txt:     ${hasRobots ? '✅ BAŞARILI' : '❌ BAŞARISIZ'}`);

        } catch (e: any) {
            console.log(`❌ KRİTİK HATA (${site.domain}): ${e.message}`);
        }
    }

    console.log(`\n======================================================`);
    console.log("🏁 TÜM ANALİZLER TAMAMLANDI");
}

main().catch(console.error).finally(() => prisma.$disconnect());
