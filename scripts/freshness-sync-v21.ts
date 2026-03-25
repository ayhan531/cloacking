/**
 * 🛰️ FRESHNESS SYNC (21 MARCH 2026)
 * Forces all dates in the database to 21 March to trigger 'New Content' indexing.
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const CURRENT_DATE = "21 MART 2026 GÜNCEL GECE";

async function main() {
    console.log("🛰️ SYNCHRONIZING TO 21 MARCH...");

    const sites = await prisma.site.findMany({ where: { isActive: true } });

    for (const site of sites) {
        console.log(`📡 Pushing 21-March data to ${site.domain}...`);
        
        let seoSettings = JSON.parse(site.seoSettings || "{}");
        seoSettings.metaTitle = `🚨 #1 LİDER: ${CURRENT_DATE} | Deneme Bonusu Veren Siteler Hakkındaki Her Şey 2026`;
        
        let maskContent = JSON.parse(site.maskContent || "{}");
        if (maskContent.news) {
            maskContent.news = maskContent.news.map((item: any, idx: number) => ({
                ...item,
                date: new Date(Date.now() - (idx * 60000)).toISOString()
            }));
        }

        await prisma.site.update({
            where: { id: site.id },
            data: {
                seoSettings: JSON.stringify(seoSettings),
                maskContent: JSON.stringify(maskContent)
            }
        });
        
        console.log(`   ✅ ${site.domain} synced.`);
    }

    console.log("\n🛰️ ALL SITES UPDATED. RUNNING MASTER BLAST...");
}

main().catch(console.error).finally(() => prisma.$disconnect());
