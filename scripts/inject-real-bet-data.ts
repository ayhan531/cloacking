/**
 * 🎰 REAL BETTING DATA INJECTOR
 * Updates all 7 sites with real market logos and entry links.
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const REAL_BRANDS = [
    {
        name: 'Sahabet',
        logo: 'https://i.ibb.co/hR0V6wN/sahabet-logo.png',
        link: 'https://sahabet-giris.com',
        amount: '100 TL Deneme Bonusu'
    },
    {
        name: 'Matadorbet',
        logo: 'https://i.ibb.co/ykY8wM0/matadorbet-logo.png',
        link: 'https://matadorbet-giris.com',
        amount: '150 TL Deneme Bonusu'
    },
    {
        name: 'Meritking',
        logo: 'https://i.ibb.co/zXnQXZX/meritking-logo.png',
        link: 'https://meritking-giris.com',
        amount: '100 TL Merit Bonusu'
    },
    {
        name: 'Onwin',
        logo: 'https://i.ibb.co/FwsXm5M/onwin-logo.png',
        link: 'https://onwin-giris.com',
        amount: '200 TL Deneme Bonusu'
    },
    {
        name: 'Betist',
        logo: 'https://i.ibb.co/mS0YmR8/betist-logo.png',
        link: 'https://betist-giris.com',
        amount: '100 TL Deneme Bonusu'
    }
];

async function main() {
    console.log("🎰 DATA INJECTION: REAL BETTING BRANDS...");

    const sites = await prisma.site.findMany({ where: { isActive: true } });

    for (const site of sites) {
        console.log(`📡 Updating ${site.domain} with real brands...`);
        let bettingContent = JSON.parse(site.bettingContent || "{}");

        // 1. Update Brand Carousel
        bettingContent.brandCarousel = REAL_BRANDS.map((b, i) => ({
            id: `brand-${i}`,
            name: b.name,
            logo: b.logo,
            link: b.link
        }));

        // 2. Update Trend Sites
        bettingContent.trendSites = REAL_BRANDS.slice(0, 3).map((b, i) => ({
            id: `trend-${i}`,
            name: b.name,
            logo: b.logo,
            link: b.link
        }));

        // 3. Update Bonuses
        bettingContent.bonuses = REAL_BRANDS.map((b, i) => ({
            id: `bonus-${i}`,
            title: `${b.name} Özel Deneme Bonusu`,
            amount: b.amount,
            link: b.link,
            image: b.logo,
            isActive: true
        }));

        // 4. Update Header/Footer Banners
        if (bettingContent.topBanner) {
            bettingContent.topBanner.link = REAL_BRANDS[0].link;
            bettingContent.topBanner.title = `${REAL_BRANDS[0].name} - BU GECEYE ÖZEL 200 TL BONUS`;
        }
        
        if (bettingContent.bottomBanner) {
            bettingContent.bottomBanner.link = REAL_BRANDS[1].link;
            bettingContent.bottomBanner.title = `${REAL_BRANDS[1].name} GİRİŞ YAP VE KAZAN`;
        }

        // 5. Update Hero Slides
        bettingContent.heroSlides = [
            {
                id: 'hero-1',
                type: 'image',
                image: 'https://i.ibb.co/hR0V6wN/sahabet-logo.png',
                title: 'SAHABET GÜNCEL GİRİŞ',
                subtitle: 'Mart 2026 Özel %100 Yatırımsız Deneme Bonusu',
                ctaText: 'HEMEN GİRİŞ YAP',
                ctaLink: REAL_BRANDS[0].link
            },
            {
                id: 'hero-2',
                type: 'image',
                image: 'https://i.ibb.co/ykY8wM0/matadorbet-logo.png',
                title: 'MATADORBET 150 TL BONUS',
                subtitle: 'Yalnızca Bu Ay Geçerli Çevrimsiz Freebet',
                ctaText: 'BONUSU AL',
                ctaLink: REAL_BRANDS[1].link
            }
        ];

        // 6. Update Navigation
        if (bettingContent.navigation) {
            bettingContent.navigation = bettingContent.navigation.map((n: any) => {
                if (n.label === 'Canlı Destek') {
                    n.link = 'https://t.me/atlastunahan';
                }
                return n;
            });
        }

        await prisma.site.update({
            where: { id: site.id },
            data: {
                bettingContent: JSON.stringify(bettingContent)
            }
        });
        
        console.log(`   ✅ ${site.domain} data updated.`);
    }

    console.log("\n🚀 ALL SITES ARE NOW LIVE WITH REAL BETTING DATA.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
