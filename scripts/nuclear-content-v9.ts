import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    console.log("🚀 NUCLEAR CONTENT V9: Flooding the index with Mart 2026 Otorite content...");

    const sites = await prisma.site.findMany();
    const currentYear = "2026";
    const currentMonth = "Mart";

    const subjects = [
        "Deneme Bonusu Veren Siteler",
        "Yatırımsız Karşılıksız Bonus",
        "Bedava Bonus Veren Platformlar",
        "En Yüksek Bonus Veren Bahis Siteleri",
        "Çevrimsiz Deneme Bonusu Fırsatları",
        "Yeni Açılan Casino Siteleri",
        "Güvenilir Bahis Analiz Raporu",
        "Mart 2026 Özel Bonus Listesi",
        "Yatırım Şartsız Bonus Veren Siteler",
        "Slot ve Casino Deneme Bonusu"
    ];

    const adjectives = [
        "Kesin", "Güncel", "Otorite Onaylı", "Flaş", "En İyi", "Süper", "VIP", "Gizli", "Kaçırılmayacak", "Popüler"
    ];

    const bodies = [
        "2026 yılında bahis dünyası devasa bir değişim yaşadı. Artık oyuncular yatırım yapmadan önce sitelerin güvenliğini test etmek istiyor. İşte bu noktada Mart 2026 listemiz devreye giriyor.",
        "Güvenlik her şeydir. SSL 4.0 ve SHA-512 korumalı sitelerimizle paranız ve verileriniz güvende. Deneme bonusunuzu alırken risk almayın.",
        "Kripto ödeme yöntemleri artık standart. Bitcoin, Ethereum ve Tether ile saniyeler içinde çekim yapabileceğiniz siteleri sizler için eledik.",
        "Bonus oranları hiç bu kadar yüksek olmamıştı. 500 TL'den başlayan deneme bonusları Mart ayı boyunca sitemizde güncellenmeye devam edecek.",
        "Analiz ekibimiz 250'den fazla siteyi tek tek inceledi. Sadece lisansı doğrulanmış ve ödeme hızı kanıtlanmış olanlar bu listeye girebildi.",
        "Yatırımsız bonus demek, cebinizden tek kuruş çıkmadan kazanmaya başlamak demektir. Sektörün dev isimleri artık bu yöntemi reklam bütçesi olarak kullanıyor."
    ];

    for (const site of sites) {
        console.log(`📡 Power-Charging News Cluster for: ${site.domain}...`);

        let mask = typeof site.maskContent === 'string' ? JSON.parse(site.maskContent) : (site.maskContent || {});

        const siteNews = [];
        for (let i = 0; i < 30; i++) {
            const subject = subjects[i % subjects.length];
            const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
            const body1 = bodies[Math.floor(Math.random() * bodies.length)];
            const body2 = bodies[Math.floor(Math.random() * bodies.length)];

            const title = `${adj} ${subject} ${currentMonth} ${currentYear} İncelemesi`;
            const slug = `${subject.toLowerCase().replace(/ /g, '-')}-${adj.toLowerCase()}-${i}`;

            siteNews.push({
                id: (i + 1).toString(),
                title: title,
                slug: slug,
                summary: `${title} hakkında bilmeniz gereken tüm detaylar ve Mart 2026 güncel giriş adresleri.`,
                content: `<p>${body1}</p><p>${body2}</p><p>Hemen sitemizdeki ana listeden bu fırsatları değerlendirebilirsiniz. Bahis ve casino dünyasının en güvenilir analizleri ${site.domain} üzerinde.</p>`,
                date: new Date(Date.now() - i * 3600000).toISOString(),
                author: "Otorite Analist",
                tags: ["Mart 2026", "Deneme Bonusu", "Analiz"]
            });
        }

        mask.news = siteNews;
        mask.type = 'news';
        mask.siteName = site.name.replace(/Bonus/g, 'Bonus');

        await prisma.site.update({
            where: { id: site.id },
            data: {
                maskContent: JSON.stringify(mask),
                maskType: 'blog',
                updatedAt: new Date()
            }
        });
    }

    console.log("✅ NUCLEAR CONTENT V9 DEPLOYED. All sites are now overflowing with fresh authority data.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
