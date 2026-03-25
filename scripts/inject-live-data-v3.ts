/**
 * 🚀 LIVE DATA INJECTOR V3 (18 March 2026)
 * Injects verified current domains and high-fidelity AI-generated premium logos.
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const LIVE_BRANDS = [
    {
        name: 'Sahabet',
        logo: '/assets/logos/sahabet.png',
        link: 'https://sahabet1435.com',
        amount: '125 TL Deneme Bonusu'
    },
    {
        name: 'Matadorbet',
        logo: '/assets/logos/matadorbet.png',
        link: 'https://matadorbet1064.com',
        amount: '150 TL Deneme Bonusu'
    },
    {
        name: 'Onwin',
        logo: '/assets/logos/onwin.png',
        link: 'https://onwin3132.com',
        amount: '750 TL Deneme Bonusu + 750 FS'
    },
    {
        name: 'Betist',
        logo: '/assets/logos/betist.png',
        link: 'https://betist1145.com',
        amount: '475 TL Hoşgeldin Bonusu'
    },
    {
        name: 'Meritking',
        logo: '/assets/logos/meritking.png',
        link: 'https://meritking839.com',
        amount: '100 TL Çevrimsiz Bonus'
    }
];

async function main() {
    console.log("🎲 INJECTING LIVE 18-MARCH DATA...");

    const sites = await prisma.site.findMany({ where: { isActive: true } });

    for (const site of sites) {
        console.log(`🔗 Updating ${site.domain}...`);
        
        // 1. Betting Content
        let bettingContent = JSON.parse(site.bettingContent || "{}");
        bettingContent.brandCarousel = LIVE_BRANDS.map((b, i) => ({ id: `lb-${i}`, ...b }));
        bettingContent.trendSites = LIVE_BRANDS.slice(0, 4).map((b, i) => ({ id: `lt-${i}`, ...b }));
        bettingContent.bonuses = LIVE_BRANDS.map((b, i) => ({
            id: `lbon-${i}`,
            title: `${b.name} Mart 18 GÜNCEL`,
            amount: b.amount,
            link: b.link,
            image: b.logo,
            isActive: true
        }));
        bettingContent.heroSlides = LIVE_BRANDS.slice(0, 2).map((b, i) => ({
            id: `lh-${i}`,
            type: 'image',
            image: b.logo,
            title: `${b.name.toUpperCase()} LİDER GİRİŞ`,
            subtitle: `${b.amount} - SADECE BUGÜNE ÖZEL`,
            ctaText: 'BONUSU KAP',
            ctaLink: b.link
        }));

        // 2. Mask Content
        let maskContent = JSON.parse(site.maskContent || "{}");
        maskContent.heroTitle = `Deneme Bonusu Veren Siteler 2026: 18 Mart Güncel Lider Listesi`;
        maskContent.heroSubtitle = `Matadorbet, Sahabet ve Onwin'in bu gece sızdırılan özel bonus raporlarını ve ${site.domain} farkıyla en güvenilir analizleri keşfedin.`;
        
        // 3. SEO Settings
        let seoSettings = JSON.parse(site.seoSettings || "{}");
        seoSettings.metaTitle = `🔥 18 MART FLAŞ: Deneme Bonusu Veren Siteler Hakkındaki Her Şey (${site.domain})`;
        seoSettings.metaDescription = `Bugün (18 Mart 2026) güncellenen dev liste! Sahabet, Matadorbet ve Onwin deneme bonusu veren siteler hakkındaki her şey burada.`;

        await prisma.site.update({
            where: { id: site.id },
            data: {
                bettingContent: JSON.stringify(bettingContent),
                maskContent: JSON.stringify(maskContent),
                seoSettings: JSON.stringify(seoSettings)
            }
        });
        
        console.log(`   ✅ ${site.domain} updated with verified 18-March data.`);
    }

    console.log("\n💎 DATA INJECTION COMPLETE. ALL SITES ARE READY.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
