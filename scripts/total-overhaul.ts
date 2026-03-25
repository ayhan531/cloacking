/**
 * 🎰 TOTAL DATA OVERHAUL
 * Updates both Betting and Mask content with real brands.
 * Clears SEO overrides to show the fresh titles.
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
    console.log("🎰 DATA OVERHAUL: INJECTING REALITY...");

    const sites = await prisma.site.findMany({ where: { isActive: true } });

    for (const site of sites) {
        console.log(`📡 Nuking and rebuilding ${site.domain}...`);
        
        // 1. Update Betting Content
        let bettingContent = JSON.parse(site.bettingContent || "{}");
        bettingContent.brandCarousel = REAL_BRANDS.map((b, i) => ({ id: `b-${i}`, ...b }));
        bettingContent.trendSites = REAL_BRANDS.slice(0, 3).map((b, i) => ({ id: `t-${i}`, ...b }));
        bettingContent.bonuses = REAL_BRANDS.map((b, i) => ({
            id: `bon-${i}`,
            title: `${b.name} Mart 2026 Özel`,
            amount: b.amount,
            link: b.link,
            image: b.logo,
            isActive: true
        }));
        bettingContent.heroSlides = [
            {
                id: 'h1',
                type: 'image',
                image: REAL_BRANDS[0].logo,
                title: 'SAHABET GİRİŞ YAP',
                subtitle: 'Mart 2026 Deneme Bonusu Aktif!',
                ctaText: 'HEMEN GİT',
                ctaLink: REAL_BRANDS[0].link
            }
        ];

        // 2. Update Mask Content (Promote real brands in academic mask)
        let maskContent = JSON.parse(site.maskContent || "{}");
        maskContent.heroTitle = `Deneme Bonusu Veren Siteler Hakkındaki Her Şey (2026)`;
        maskContent.heroSubtitle = `15 Mart Gecesi İtibarıyla Sahabet, Matadorbet ve Onwin Gibi Otorite Sitelerin Güncel Bonus Raporları.`;
        
        // 3. SEO Settings (Nuke the overrides)
        const seoSettings = JSON.parse(site.seoSettings || "{}");
        delete seoSettings.metaTitle; // Let the app/page.tsx fallback handle it
        delete seoSettings.metaDescription;

        await prisma.site.update({
            where: { id: site.id },
            data: {
                bettingContent: JSON.stringify(bettingContent),
                maskContent: JSON.stringify(maskContent),
                seoSettings: JSON.stringify(seoSettings)
            }
        });
        
        console.log(`   ✅ ${site.domain} fully updated.`);
    }

    console.log("\n🚀 OVERHAUL COMPLETE. REFRESH THE PAGE.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
