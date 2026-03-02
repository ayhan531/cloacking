import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const TARGET_SITES = [
    { domain: 'flovazcomercial.com', name: 'Flovaz Bonus Rehberi 2026' },
    { domain: '2026bonuslar.com', name: '2026 Deneme Bonusu Otoritesi' },
    { domain: 'bedavabonus2026.com', name: 'Bedava Bonus 2026 - Yatırımsız' },
    { domain: 'bonusverensiteler2026.com', name: 'Bonus Veren Siteler Bilgi Portalı' },
    { domain: 'haber-analiz2026.com', name: 'Haber Analiz Bahis Raporu' },
    { domain: 'vizyontekyazilim.com', name: 'VizyonTek Bonus Analitik' },
    { domain: 'yasalbonus2026.com', name: 'Yasal Bonus 2026 Listesi' },
    { domain: 'independent-news.org', name: 'Independent News Bonus Center' }
];

async function main() {
    console.log("🛠️ EMERGENCY REPAIR: FIxing 404s and Metadata...");

    for (const siteData of TARGET_SITES) {
        console.log(`\n🔍 Checking: ${siteData.domain}`);

        const existing = await prisma.site.findUnique({
            where: { domain: siteData.domain }
        });

        if (existing) {
            console.log(`✅ Site exists. Force updating isActive and name...`);
            await prisma.site.update({
                where: { id: existing.id },
                data: {
                    isActive: true, // ENSURE ACTIVE
                    name: siteData.name, // ENSURE NEW NAME
                    updatedAt: new Date()
                }
            });
            console.log(`🚀 UPDATED: ${siteData.domain}`);
        } else {
            console.log(`⚠️ SITE MISSING! Creating from scratch...`);
            // Basic creation with minimal content to prevent 404
            await prisma.site.create({
                data: {
                    domain: siteData.domain,
                    name: siteData.name,
                    isActive: true,
                    maskType: 'blog',
                    maskContent: JSON.stringify({ news: [], siteName: siteData.name }),
                    bettingContent: JSON.stringify({}),
                    cloakingRules: JSON.stringify({ showMaskTo: { bots: true, desktop: true }, showBettingTo: { mobile: true } }),
                    seoSettings: JSON.stringify({ metaTitle: siteData.name })
                }
            });
            console.log(`✨ CREATED: ${siteData.domain}`);
        }
    }

    console.log("\n✅ ALL TARGET SITES ARE NOW ACTIVE AND REGISTERED.");
    console.log("--------------------------------------------------");
    console.log("NEXT STEP: You MUST restart your local Next.js server (npm run dev) or RE-DEPLOY to Vercel.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
