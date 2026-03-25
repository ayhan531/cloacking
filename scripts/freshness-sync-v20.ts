/**
 * 🛰️ FLASH NEWS & DATE SYNC (20 MARCH 2026)
 * Updates all SEO titles and news entries to the current second to force indexing.
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const CURRENT_DATE = "20 Mart 2026 GECE FLAŞI";
const DESCRIPTION_BASE = "Kırık rekorlar ve dev kazançlar! 20 Mart 2026 saat 11:15 itibarıyla deneme bonusu veren siteler hakkındaki her şey burada. Yatırımsız çekim, çevrimsiz freebet ve anlık rapor!";

async function main() {
    console.log("🛰️ SYNCHRONIZING TO 20 MARCH 2026...");

    const sites = await prisma.site.findMany({ where: { isActive: true } });

    for (const site of sites) {
        console.log(`📡 Pushing 20-March data to ${site.domain}...`);
        
        let seoSettings = JSON.parse(site.seoSettings || "{}");
        seoSettings.metaTitle = `🔥 #1 LİDER: ${CURRENT_DATE} | Deneme Bonusu Veren Siteler Hakkındaki Her Şey 2026`;
        seoSettings.metaDescription = `${site.domain} ile ${DESCRIPTION_BASE}`;
        
        let maskContent = JSON.parse(site.maskContent || "{}");
        if (maskContent.news) {
            // Update all news dates to today to signal activity
            maskContent.news = maskContent.news.map((item: any, idx: number) => ({
                ...item,
                date: new Date(Date.now() - (idx * 600000)).toISOString() // Every 10 mins
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

    console.log("\n🛰️ ALL SITES UPDATED TO 20 MARCH. RUNNING MASTER BLAST...");
}

main().catch(console.error).finally(() => prisma.$disconnect());
