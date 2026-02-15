const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const domain = "2026bonuslar.com";
    console.log(`🚀 Deploying New Strategic Domain: ${domain}...`);

    const monthNames = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
    const currentMonth = monthNames[new Date().getMonth()];
    const currentYear = new Date().getFullYear();

    const site = await prisma.site.upsert({
        where: { domain },
        update: {},
        create: {
            name: "2026 Bonuslar",
            domain: domain,
            isActive: true,
            maskType: 'blog',
            maskContent: JSON.stringify({
                siteName: "2026 Bonuslar",
                heroTitle: `${currentMonth} ${currentYear} Bonus Raporu`,
                heroSubtitle: "Türkiye'nin En Kapsamlı 2026 Deneme Bonusu Analiz Portalı",
                theme: { primaryColor: '#9333EA', secondaryColor: '#3B82F6', backgroundColor: '#0F172A' },
                colorScheme: { primary: '#9333EA', secondary: '#3B82F6', accent: '#F472B6' },
                news: [] // Will be populated by news-cluster script
            }),
            bettingContent: JSON.stringify({
                theme: { primaryColor: '#9333EA', secondaryColor: '#3B82F6', backgroundColor: '#0F172A' },
                navigation: [
                    { id: '1', label: 'Anasayfa', icon: 'Home', link: '/', isActive: true },
                    { id: '2', label: 'Kazananlar', icon: 'Trophy', link: '/winners', isActive: true },
                    { id: '3', label: 'Çark', icon: 'Disc', link: '/wheel', isActive: true },
                    { id: '4', label: 'Telegram', icon: 'Send', link: '#', isActive: true }
                ],
                bonuses: [
                    { id: '1', title: '500 TL Deneme Bonusu', amount: '500 TL', description: 'Yatırım şartsız, anında onay.', link: '#', isActive: true }
                ]
            }),
            cloakingRules: JSON.stringify({
                showMaskTo: { bots: true, desktop: true },
                showBettingTo: { mobile: true, includedCountries: ["TR", "CY"] }
            }),
            seoSettings: JSON.stringify({
                metaTitle: `${currentMonth} ${currentYear} Deneme Bonusu Veren Siteler - ${domain}`,
                metaDescription: "2026'nın en güncel deneme bonusu veren siteleri ve yatırımsız karşılıksız bonusları keşfedin.",
            })
        }
    });

    console.log(`✅ ${domain} handles created. Now running Global Optimization...`);
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
