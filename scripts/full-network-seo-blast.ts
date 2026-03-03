import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    console.log("🧨 FULL NETWORK SEO OVERHAUL INITIATED...");
    
    const sites = await prisma.site.findMany({ where: { isActive: true } });
    
    for (const site of sites) {
        console.log(`\n🚀 Optimizing Domain: ${site.domain}`);
        
        let seoSettings = JSON.parse(site.seoSettings as string || "{}");
        let maskContent = JSON.parse(site.maskContent as string || "{}");
        let name = site.name;

        // Ensure absolutely NO generic names
        const specificNames: Record<string, string> = {
            'haber-analiz2026.com': '2026 Haber Analiz & Bonus Platformu',
            'vizyontekyazilim.com': 'VizyonTek Bonus & İnceleme',
            'yasalbonus2026.com': 'Yasal Bonus 2026 Otoritesi',
            '2026bonuslar.com': '2026 Bonuslar Merkezi',
            'bedavabonus2026.com': 'Bedava Bonus 2026 Ağ',
            'independent-news.org': 'Bağımsız Bonus & Haber Yüzü',
            'flovazcomercial.com': 'Mart 2026 Deneme Bonusu Otoritesi'
        };

        const newName = specificNames[site.domain as string] || name;
        
        // Force Metadata updates specifically for ALL domains
        seoSettings.metaTitle = `🚨 ${newName} - Kesin Liste & Analiz`;
        seoSettings.metaDescription = `${newName} olarak yatırım şartsız, en yüksek ve güvenilir deneme bonusu sitelerini inceliyoruz. Güncel liste için hemen tıklayın.`;
        seoSettings.keywords = `deneme bonusu veren siteler 2026, bedava bonus, ${site.domain.split('.')[0]}, güvenilir bonus siteleri`;
        
        // Ensure botArticle is fresh and mentions the specific site name
        if (maskContent.botArticle) {
             maskContent.botArticle = maskContent.botArticle.replace(/Mart 2026 Deneme Bonusu Otoritesi/g, newName);
        }

        await prisma.site.update({
            where: { id: site.id },
            data: {
                name: newName,
                seoSettings: JSON.stringify(seoSettings),
                maskContent: JSON.stringify(maskContent),
                updatedAt: new Date()
            }
        });
        
        console.log(`   ✅ SEO Metadata and Name aggressively updated for ${site.domain}`);
    }
    console.log("\n💥 ALL DOMAINS SEO OPTIMIZATION COMPLETE.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
