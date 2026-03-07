import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

const INDEX_NOW_KEY = '3a4b9c8d1e2f3g4h5i6j7k8l9m0n1o2p';

// News content pool (Templates for variation)
const TITLES = [
    "Mart 2026 Deneme Bonusu Veren Tüm Siteler Güncellendi",
    "Yeni Açılan Yatırımsız Casino Siteleri - Tam Liste",
    "Papara ve Payfix ile Minimum 20 TL Yatırılan Siteler",
    "Kimlik İstemeyen En Güvenilir Bahis Platformları",
    "2026'da Çevrimsiz Freebet Alabileceğiniz Bonus Ağları",
    "Deneme Bonusu 2026: Mart Ayı Özel Analiz Raporu",
    "Avrupa Merkezli Bahis Sitelerinin Güven Skoru Açıklandı",
    "Kripto Para ile Hızlı Çekim Yapılan Bonuslu Casinolar"
];

const SUMMARIES = [
    "Bugün yayınlanan son listede en yüksek çevrimsiz freespin veren ve yatırım şartı aramayan yeni bahis sitelerini tek tek inceledik. Mart ayı kazanç fırsatlarını inceleyin.",
    "Casino dünyasında Mart 2026 rekabeti artıyor. Yatırımsız 100 freespin veren platformların güven analizi ve anında ödeme yapan sistemler haberimizde.",
    "Bakiye yüklemeden deneme bonusu almak isteyenler için 7/24 canlı destek hattından bonus kodunu alabileceğiniz yeni platformları listeye ekledik.",
    "Mobil ödeme ve Payfix kabul eden lisanslı sitelerde Mart ayı boyunca geçerli olan özel promosyonlar ve kayıp iadesi oranları güncellendi."
];

function generateSlug(title: string) {
    return title.toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^a-z0-9-]/gi, '')
        + '-' + Math.floor(Math.random() * 10000);
}

async function main() {
    console.log('\n╔══════════════════════════════════════════════════════════');
    console.log('║  🗞️  NUCLEAR NEWS PUMP v1.0');
    console.log('║  Sitelerin her birine taze haber basılıyor...');
    console.log('╚══════════════════════════════════════════════════════════\n');

    const sites = await prisma.site.findMany({ where: { isActive: true } });

    for (const site of sites) {
        let maskContent: any;
        try {
            maskContent = JSON.parse(site.maskContent);
        } catch (e) {
            maskContent = { news: [] };
        }

        if (!maskContent.news) maskContent.news = [];

        // Günde 1 yerine 3 haber basalım (Agresif Mod)
        const newsAdded: string[] = [];
        for (let i = 0; i < 3; i++) {
            const newTitle = TITLES[Math.floor(Math.random() * TITLES.length)];
            const newSummary = SUMMARIES[Math.floor(Math.random() * SUMMARIES.length)];
            const slug = generateSlug(newTitle);

            const newArticle = {
                slug,
                title: `${newTitle} (#${String(Math.floor(Math.random() * 999)).padStart(3, '0')})`,
                summary: newSummary,
                date: new Date().toISOString()
            };

            maskContent.news.unshift(newArticle);
            newsAdded.push(slug);
        }

        // En fazla 15 haber kalsın
        if (maskContent.news.length > 15) maskContent.news = maskContent.news.slice(0, 15);

        await prisma.site.update({
            where: { id: site.id },
            data: { maskContent: JSON.stringify(maskContent) }
        });

        console.log(`   ✅ [${site.domain}] -> ${newsAdded.length} Yeni Haber Basıldı: ${newsAdded.join(', ')}`);

        // IndexNow Ping (Toplu Ping)
        const payload = {
            host: site.domain,
            key: INDEX_NOW_KEY,
            keyLocation: `https://${site.domain}/${INDEX_NOW_KEY}.txt`,
            urlList: [
                ...newsAdded.map(slug => `https://${site.domain}/haberler/${slug}`),
                `https://${site.domain}/`
            ]
        };

        try {
            await axios.post('https://api.indexnow.org/indexnow', payload, { timeout: 5000 });
            process.stdout.write(' (Bing/Yandex PINGLENDİ)\n');
        } catch (e) {
            process.stdout.write(' (Ping hatası)\n');
        }
    }

    console.log('\n🏁 Tüm haberler basıldı ve botlar haberdar edildi.');
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
