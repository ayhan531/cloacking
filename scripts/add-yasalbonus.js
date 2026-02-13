const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const domain = 'yasalbonus2026.com';
    const siteName = 'Yasal Bonus 2026 Analiz';

    // Nuclear Dates
    const currentYear = 2026;
    const monthNames = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
    const currentMonth = monthNames[new Date().getMonth()];

    console.log(`Setting up ${domain}...`);

    const maskContent = {
        siteName: siteName,
        heroTitle: "2026 Dijital Finans ve Bonus Güvenlik Portalı",
        heroSubtitle: "Yasal Bonus 2026 Analiz merkezi, sektördeki platformların finansal sağlamlığını ve deneme bonusu protokollerini 2026 standartlarında denetler. En güvenilir ve onaylı listelere buradan ulaşın.",
        heroImage: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=2070&auto=format&fit=crop",
        news: [
            {
                id: "1",
                slug: "2026-yasal-bonus-kriterleri",
                title: `${currentMonth} ${currentYear} Yasal Bonus Değerlendirme Kriterleri`,
                date: new Date().toISOString(),
                summary: "2026 yılında platformların yasal ve güvenilir sayılabilmesi için gereken yeni nesil altyapı standartları ve kullanıcı koruma poliçeleri açıklandı.",
                tags: ["GÜVENLİK", "ANALİZ"]
            },
            {
                id: "2",
                slug: "deneme-bonusu-vergi-ve-hukuk",
                title: "Deneme Bonusu Veren Siteler ve 2026 Hukuki Süreçleri",
                date: new Date().toISOString(),
                summary: "Dijital oyun sektöründeki bedava bonusların finansal takibi ve yasal regülasyonlar hakkında uzman avukat görüşleri.",
                tags: ["HUKUK"]
            }
        ],
        services: [
            { id: "1", name: "Kurumsal Denetim", description: "Platformların ödeme sistemleri ve finansal şeffaflık raporlaması." },
            { id: "2", name: "Siber Güvenlik Sertifikası", description: "256-bit SSL ve WAF koruma testleri sonuçları." },
            { id: "3", name: "Bonus Doğrulama", description: "Yatırım şartsız deneme bonusu veren sitelerin anlık bonus kontrolü." }
        ],
        colorScheme: {
            primary: "#065f46", // Dark Emerald (Trust & Law)
            secondary: "#064e3b",
            accent: "#10b981",
            background: "#FFFFFF",
            text: "#064e3b"
        },
        type: "news"
    };

    const seoSettings = {
        metaTitle: `${currentMonth} ${currentYear} Deneme Bonusu Veren Siteler - ${siteName}`,
        metaDescription: `2026 deneme bonusu veren siteler listesi. Yasal Bonus Analiz merkezi ile en güvenilir, yatırımsız ve en yüksek bedava bonus veren platformların teknik raporları.`,
        keywords: "deneme bonusu veren siteler 2026, yasal bonus 2026, bedava bonus, yatırım şartsız deneme bonusu, bahis siteleri 2026, casino siteleri",
        googleSiteVerification: ""
    };

    const bettingContent = {
        theme: { primaryColor: "#10b981", secondaryColor: "#064e3b", backgroundColor: "#0F172A" },
        topBanner: { id: "1", title: "VENOMBET %300 HOŞGELDİN BONUSU", link: "https://venombet.link", isActive: true },
        bottomBanner: { id: "2", title: "BETSİN 500 TL DENEME BONUSU", link: "https://betsin.link", isActive: true },
        brandCarousel: [],
        bonuses: [],
        giveaways: [],
        liveWinners: [],
        games: [],
        navigation: [
            { id: "1", label: "Anasayfa", icon: "Home", link: "/", isActive: true },
            { id: "2", label: "Bonuslar", icon: "Trophy", link: "#", isActive: true }
        ],
        wheelItems: [],
        popups: [],
        popupLayout: "single",
        mobileImmediatePopup: true,
        heroSlides: [],
        trendSites: []
    };

    const cloakingRules = {
        showMaskTo: { desktop: true, bots: true },
        showBettingTo: { mobile: true, includedCountries: ["TR", "CY"] }
    };

    const site = await prisma.site.upsert({
        where: { domain },
        update: {
            name: siteName,
            maskType: 'blog',
            maskContent: JSON.stringify(maskContent),
            seoSettings: JSON.stringify(seoSettings),
            bettingContent: JSON.stringify(bettingContent),
            cloakingRules: JSON.stringify(cloakingRules),
            isActive: true,
            updatedAt: new Date()
        },
        create: {
            domain,
            name: siteName,
            maskType: 'blog',
            maskContent: JSON.stringify(maskContent),
            seoSettings: JSON.stringify(seoSettings),
            bettingContent: JSON.stringify(bettingContent),
            cloakingRules: JSON.stringify(cloakingRules),
            isActive: true
        }
    });

    console.log('Site created/updated successfully:', site.domain);
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
