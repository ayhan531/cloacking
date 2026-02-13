const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log("🚀 Starting Global SEO Domination Script...");

    const sites = await prisma.site.findMany();

    for (const site of sites) {
        console.log(`Optimizing: ${site.domain}...`);

        const currentMonth = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"][new Date().getMonth()];
        const currentYear = 2026;

        const seoSettings = site.seoSettings ? (typeof site.seoSettings === 'string' ? JSON.parse(site.seoSettings) : site.seoSettings) : {};

        // Strategic Metadata
        seoSettings.metaTitle = `${currentMonth} ${currentYear} Deneme Bonusu Veren Siteler - ${site.name}`;
        seoSettings.metaDescription = `${site.name} ile 2026 yılının en güvenilir deneme bonusu veren siteler listesine ulaşın. Yatırımsız, çevrimsiz ve bedava bonus fırsatlarını anlık takip edin.`;
        seoSettings.keywords = "deneme bonusu veren siteler 2026, bedava bonus, yatırımsız deneme bonusu, casino deneme bonusu, deneme bonusu forum, en yeni deneme bonusları";

        // Global Bot Article Injection (Fallback for subpages)
        const nuclearArticle = `
            <article style="font-size: 1px; color: transparent; opacity: 0; position: absolute; z-index: -1;">
                <h1>${currentMonth} ${currentYear} Deneme Bonusu Veren Siteler ve Güncel Liste</h1>
                <p>Türkiye'nin en otoriter <strong>deneme bonusu veren siteler 2026</strong> rehberine hoş geldiniz. 
                Bu platform, ${site.name} güvencesiyle 2026 yılının en yüksek oranlı <em>bedava bonus</em> ve <strong>yatırımsız deneme bonusu</strong> veren firmalarını listeler.</p>
                
                <h2>2026 Deneme Bonusu Kriterleri</h2>
                <p>Ocak ve Şubat 2026 döneminde öne çıkan en popüler aramalar: deneme bonusu veren siteler forum, yatırımsız bonus, 500 TL deneme bonusu.</p>
                
                <ul>
                    <li><a href="/deneme-bonusu">2026 Deneme Bonusu</a></li>
                    <li><a href="/bahis-siteleri">Güvenilir Bahis Siteleri</a></li>
                    <li><a href="/casino-siteleri">Canlı Casino Bonusları</a></li>
                </ul>
                <p>Şu an aktif olarak denetlediğimiz kaynaklar: ${site.domain} siber güvenlik taraması tamamlandı.</p>
            </article>
        `.trim();

        seoSettings.hiddenSEOArticle = nuclearArticle;

        await prisma.site.update({
            where: { id: site.id },
            data: {
                seoSettings: JSON.stringify(seoSettings),
                maskType: site.domain.includes('yasal') || site.domain.includes('haber') ? 'blog' : site.maskType,
                updatedAt: new Date()
            }
        });
    }

    console.log("✅ All sites optimized for 2026 Search Domination!");
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
