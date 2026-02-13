const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const domain = 'vizyontekyazilim.com';
    const siteName = 'VizyonTek Yazılım';

    const currentYear = 2026;
    const monthNames = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
    const currentMonth = monthNames[new Date().getMonth()];

    const seoSettings = {
        metaTitle: `${currentMonth} ${currentYear} Deneme Bonusu Veren Siteler - ${siteName} Analiz Platformu`,
        metaDescription: `${siteName} ile 2026 yılının en güncel deneme bonusu veren siteler listesine ulaşın. Yatırım şartsız, en yüksek bonus veren güvenilir bahis siteleri teknik inceleme raporu.`,
        keywords: "deneme bonusu veren siteler 2026, yatırımsız deneme bonusu, bedava bonus, bahis siteleri 2026, vizyontek yazılım, bonus veren siteler 2026",
        googleSiteVerification: "", // User will provide if needed
        hiddenSEOArticle: `<article>
            <h1>${currentMonth} ${currentYear} Deneme Bonusu Veren Siteler: VizyonTek Yazılım Teknik Raporu</h1>
            <p><strong>VizyonTek Yazılım</strong> olarak, 2026 dijital finans ve eğlence sektörünün nabzını tutuyoruz. Bu ay yaptığımız siber güvenlik ve altyapı analizlerinde, <em>deneme bonusu veren siteler 2026</em> listesindeki platformların yazılımsal sağlamlığını test ettik.</p>
            
            <h2>2026 Yılı En Yüksek Deneme Bonusları ve Güvenlik Seviyeleri</h2>
            <p>Kullanıcıların en çok arattığı <strong>bedava bonus</strong> teklifleri, 2026 yılında yeni nesil şifreleme yöntemleriyle sunuluyor. VizyonTek ekibi olarak, bu bonusları sunan platformların API hızlarını ve veri tabanı güvenliğini inceleyerek bir 'Güven Skoru' oluşturduk.</p>

            <ul>
                <li><strong>Yatırımsız Deneme Bonusu:</strong> 2026 yılının en popüler fırsatı olan yatırım şartsız bonusların teknik altyapısı.</li>
                <li><strong>Hızlı Ödeme Sistemleri:</strong> Kazançların saniyeler içinde çekilebildiği platformların yazılım mimarisi.</li>
                <li><strong>Siber Koruma:</strong> 256-bit SSL ve WAF koruması kullanan güvenilir bahis siteleri 2026 incelemesi.</li>
            </ul>

            <h2>Sonuç: VizyonTek Onaylı Platformlar</h2>
            <p>Dijital dünyada güven, doğru yazılımla başlar. <strong>VizyonTek Yazılım</strong> ekibi, 2026 boyunca sizler için sektörün en güvenilir ve <strong>deneme bonusu veren siteler</strong> listesini güncellemeye devam edecek. En güncel raporlar için bizi takip etmeye devam edin.</p>
        </article>`
    };

    const updatedSite = await prisma.site.update({
        where: { domain },
        data: {
            seoSettings: JSON.stringify(seoSettings),
            maskType: 'blog', // Changing to blog for better SEO indexing/news potential
            updatedAt: new Date()
        }
    });

    console.log('Site SEO updated successfully for:', domain);
    console.log('New Metadata Title:', seoSettings.metaTitle);
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
