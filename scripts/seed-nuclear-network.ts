import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log("🔥 THE NUCLEAR SEED: Fixing all sites and deploying 2026bonuslar.com...");

    const domains = [
        'flovazcomercial.com',
        'haber-analiz2026.com',
        'vizyontekyazilim.com',
        'yasalbonus2026.com',
        'bonusverensiteler2026.com',
        '2026bonuslar.com',
        'bedavabonus2026.com'
    ];

    const monthNames = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
    const currentMonth = monthNames[new Date().getMonth()];
    const currentYear = new Date().getFullYear();
    const today = new Date().toLocaleDateString('tr-TR');

    for (const domain of domains) {
        console.log(`Processing: ${domain}...`);

        let site = await prisma.site.findUnique({ where: { domain } });

        const newsArticles = [
            { id: '1', title: `2026 Deneme Bonusu Veren Siteler: Tam Liste`, slug: 'deneme-bonusu-veren-siteler-2026', summary: 'Bu ayın en çok kazandıran platformlarını karşılaştırdık.', content: '2026 yılında deneme bonusu veren siteler arasında kıyasıya bir rekabet var. Özellikle 500 TL deneme bonusu veren siteler öne çıkıyor.', date: new Date().toISOString() },
            { id: '2', title: `Yatırımsız Bonus Analizi: Kimler Veriyor?`, slug: 'yatirim-sartsiz-bonus-2026', summary: 'Para yatırmadan kazanmanın en güvenli yolları.', content: 'Yatırım şartsız bonuslar 2026 yılında artık bir standart haline geldi. İşte güvenilir platformlar.', date: new Date().toISOString() },
            { id: '3', title: `En Güvenilir Bahis Altyapıları 2026`, slug: 'en-guvenilir-altyapilar', summary: 'Kapanmayan ve ödeme yapan siteleri nasıl anlarsınız?', content: 'Lisanslı altyapıların önemi 2026 yılında daha da arttı.', date: new Date().toISOString() }
        ];

        const defaultMask = {
            siteName: domain.split('.')[0].toUpperCase(),
            heroTitle: `${currentMonth} ${currentYear} En İyi Bonuslar`,
            heroSubtitle: "Profesyonel Analiz ve Güvenilir Bahis Rehberiniz",
            colorScheme: { primary: '#9333EA', secondary: '#3B82F6', accent: '#F472B6', background: '#FFFFFF', text: '#1F2937' },
            news: newsArticles
        };

        const defaultBetting = {
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
        };

        const defaultRules = {
            showMaskTo: { bots: true, desktop: true },
            showBettingTo: { mobile: true, includedCountries: ["TR", "CY"] }
        };

        const defaultSeo = {
            metaTitle: `${currentMonth} ${currentYear} Deneme Bonusu Veren Siteler - ${domain}`,
            metaDescription: `${domain} ile 2026'nın en güvenilir bonus fırsatlarına ulaşın.`,
            keywords: "deneme bonusu, bonus veren siteler 2026, bedava bonus"
        };

        if (site) {
            await prisma.site.update({
                where: { id: site.id },
                data: {
                    isActive: true,
                    maskType: 'blog',
                    maskContent: JSON.stringify({ ...defaultMask, ...JSON.parse(site.maskContent || '{}') }),
                    bettingContent: JSON.stringify({ ...defaultBetting, ...JSON.parse(site.bettingContent || '{}') }),
                    cloakingRules: JSON.stringify(defaultRules),
                    seoSettings: JSON.stringify({ ...defaultSeo, ...JSON.parse(site.seoSettings || '{}') }),
                    updatedAt: new Date()
                }
            });
        } else {
            await prisma.site.create({
                data: {
                    domain,
                    name: domain.split('.')[0].toUpperCase(),
                    isActive: true,
                    maskType: 'blog',
                    maskContent: JSON.stringify(defaultMask),
                    bettingContent: JSON.stringify(defaultBetting),
                    cloakingRules: JSON.stringify(defaultRules),
                    seoSettings: JSON.stringify(defaultSeo)
                }
            });
        }
    }

    console.log("✅ THE NUCLEAR SEED: All sites are synchronized and updated.");
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
