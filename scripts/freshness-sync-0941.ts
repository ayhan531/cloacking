/**
 * 🛰️ FRESHNESS SYNC (22 MARCH 09:41)
 * Updates all site metadata and news to reflect the CURRENT MINUTE (09:41) to force a 'News' ranking.
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const now = new Date();
const currentStr = `${now.getHours()}:${now.getMinutes() < 10 ? '0'+now.getMinutes() : now.getMinutes()}`;
const dateStr = "22 Mart 2026";

async function main() {
    console.log(`🛰️ SYNCING TO ${dateStr} ${currentStr}...`);

    const sites = await prisma.site.findMany({ where: { isActive: true } });

    for (const site of sites) {
        console.log(`📡 Pushing hourly freshness to ${site.domain}...`);
        
        let seoSettings = JSON.parse(site.seoSettings || "{}");
        seoSettings.metaTitle = `🚨 #1 LİDER: [${currentStr}] | ${dateStr} | Deneme Bonusu Veren Siteler Hakkındaki Her Şey 2026 (DAKİKA DAKİKA GÜNCEL)`;
        
        let maskContent = JSON.parse(site.maskContent || "{}");
        maskContent.heroTitle = `${site.domain.split('.')[0].toUpperCase()} - [${currentStr}] - ${dateStr}`;
        
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
        
        console.log(`   ✅ ${site.domain} updated.`);
    }

    console.log("\n🛰️ ALL SITES SYNCED. RUNNING INDEXING API...");
}

main().catch(console.error).finally(() => prisma.$disconnect());
