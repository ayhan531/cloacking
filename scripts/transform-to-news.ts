
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const domain = 'flovazcomercial.com';

    // Fetch existing data
    const existingSite = await prisma.site.findUnique({ where: { domain } });
    if (!existingSite) {
        console.error('Site not found!');
        return;
    }

    let currentMaskContent = JSON.parse(existingSite.maskContent);

    // Update to be a News Site
    const newMaskContent = {
        ...currentMaskContent,
        siteName: "Gündem 2026",
        logo: "", // Remove specific logo if it conflicts
        heroTitle: "2026 Ekonomi ve Finans Gündemi - Şok Gelişmeler!",
        heroSubtitle: "Piyasalardaki son hareketlilik yatırımcıları nasıl etkileyecek? Kripto paralar, döviz kurları ve borsa analizleri.",
        heroImage: "", // Use default trending icon
        type: "news", // Trigger the news layout
        // Add more news items to look full
        news: [
            {
                id: "1",
                title: "2026 Yılında Bahis ve Casino Sektöründe Devrim",
                slug: "2026-bahis-casino-devrim",
                summary: "Yeni teknolojik gelişmelerle birlikte online bahis sektörü çağ atlıyor. İşte 2026 yılının en güvenilir ve en çok kazandıran trendleri.",
                content: "<p>Sektör uzmanları 2026 yılının dijital bahis için dönüm noktası olacağını belirtiyor...</p>",
                date: new Date().toISOString(),
                tags: ["Sektör", "Analiz", "2026"],
                image: "https://images.unsplash.com/photo-1518186285589-2f7649f01403?q=80&w=2069&auto=format&fit=crop"
            },
            {
                id: "2",
                title: "Deneme Bonusu Veren Siteler Listesi Yenilendi!",
                slug: "deneme-bonusu-veren-siteler-2026",
                summary: "Yatırımsız şartsız deneme bonusu veren en güvenilir siteler listesi. Kullanıcı yorumlarına göre en iyi 10 site.",
                content: "<p>Deneme bonusları her geçen gün artıyor. 2026 yılında bedava bahis oynamak isteyenler için hazırladığımız özel liste...</p>",
                date: new Date().toISOString(),
                tags: ["Deneme Bonusu", "Fırsat", "Liste"],
                image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=2070&auto=format&fit=crop"
            },
            {
                id: "3",
                title: "Ekonomi Uzmanlarından Kritik Uyarı: Bu Fırsatı Kaçırmayın",
                slug: "ekonomi-uyarisi-firsat",
                summary: "Global piyasalardaki ani değişimler yeni fırsatlar doğuruyor. İşte uzmanların dikkat çektiği o yatırım araçları.",
                content: "<p>Dolar ve Euro paritesindeki hareketlilik sonrası gözler o sektöre çevrildi...</p>",
                date: new Date().toISOString(),
                tags: ["Ekonomi", "Finans"],
                image: "https://images.unsplash.com/photo-1611974765270-ca1258634369?q=80&w=2064&auto=format&fit=crop"
            },
            {
                id: "4",
                title: "Teknoloji Dünyasında Şok Gelişme: Yapay Zeka Yasası",
                slug: "yapay-zeka-yasasi-2026",
                summary: "Avrupa Birliği ve Türkiye'de eş zamanlı yürürlüğe giren yeni yapay zeka düzenlemeleri neleri değiştiriyor?",
                content: "<p>Teknoloji devlerini zora sokacak yeni düzenlemeler resmi gazetede yayınlandı...</p>",
                date: new Date().toISOString(),
                tags: ["Teknoloji", "Yapay Zeka"],
                image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop"
            }
        ]
    };

    await prisma.site.update({
        where: { domain },
        data: {
            maskType: 'blog', // Set mask type to blog/news
            maskContent: JSON.stringify(newMaskContent),
            seoSettings: JSON.stringify({
                ...JSON.parse(existingSite.seoSettings),
                metaTitle: 'Gündem 2026 - Son Dakika Haberler ve Analizler',
                metaDescription: 'Türkiye ve dünya gündeminden en sıcak haberler. Ekonomi, spor, magazin ve teknoloji dünyasındaki son gelişmeler Gündem 2026\'da.',
            })
        }
    });

    console.log('Site successfully transformed to NEWS PORTAL layout!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
