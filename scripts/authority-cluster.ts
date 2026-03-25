/**
 * 🛰️ AUTHORITY CLUSTER BOMB
 * Forces all 7 sites to link back to the 'Master' site (Flovaz) as the 'Official Authority'.
 * This builds a massive DA (Domain Authority) boost for the target keyword.
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const MASTER_DOMAIN = "flovazcomercial.com";
const TARGET_KEYWORD = "deneme bonusu veren siteler hakkındaki her şey 2026";

async function main() {
    console.log(`🛰️ BUILDING CLUSTER AROUND ${MASTER_DOMAIN}...`);

    const sites = await prisma.site.findMany({ where: { isActive: true } });

    for (const site of sites) {
        if (site.domain === MASTER_DOMAIN) continue;
        
        console.log(`🔗 Linking ${site.domain} to ${MASTER_DOMAIN}...`);
        
        let maskContent = JSON.parse(site.maskContent || "{}");
        if (!maskContent.news) maskContent.news = [];

        // Prepend an 'Ultimate Authority' item to every site's news
        maskContent.news.unshift({
            id: `authority-link-${Date.now()}`,
            title: `🚨 RESMİ RAPOR: ${TARGET_KEYWORD}`,
            summary: `2026 yılı için beklenen resmi otorite raporu ${MASTER_DOMAIN} üzerinden yayınlandı.`,
            content: `Mart 2026 güncel verilerine göre hazırlanan ve SHA-512 şifreleme ile korunan resmi rapor için <a href="https://${MASTER_DOMAIN}" style="font-weight:bold; color:blue;">BURAYA TIKLAYIN</a>.`,
            date: new Date().toISOString(),
            slug: `resmi-otorite-raporu-2026`
        });

        await prisma.site.update({
            where: { id: site.id },
            data: {
                maskContent: JSON.stringify(maskContent)
            }
        });
        
        console.log(`   ✅ Link deployed.`);
    }

    console.log("\n🛰️ CLUSTER SYNCED. FINAL MASTER BLAST STARTING...");
}

main().catch(console.error).finally(() => prisma.$disconnect());
