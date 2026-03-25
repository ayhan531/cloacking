/**
 * 🛰️ FRESHNESS SYNC (22 MARCH 2026)
 * Forces all dates in the database to 22 March 01:25 to trigger 'New Content' indexing.
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const now = new Date();
const currentStr = `${now.getHours()}:${now.getMinutes() < 10 ? '0'+now.getMinutes() : now.getMinutes()}`;
const dateStr = "22 Mart 2026";

async function main() {
    console.log(`🛰️ SYNCHRONIZING TO ${dateStr} ${currentStr}...`);

    const sites = await prisma.site.findMany({ where: { isActive: true } });

    for (const site of sites) {
        console.log(`📡 Pushing 22-March data to ${site.domain}...`);
        
        let seoSettings = JSON.parse(site.seoSettings || "{}");
        seoSettings.metaTitle = `🚨 #1 LİDER: [${currentStr}] | ${dateStr} | Deneme Bonusu Veren Siteler Hakkındaki Her Şey 2026 (SON DAKİKA)`;
        seoSettings.metaDescription = `En taze 22 Mart 2026 verileri! ${site.domain} ile deneme bonusu veren siteler hakkındaki her şey burada. Yatırımsız, çevrimsiz, anlık güncel liste!`;
        
        let maskContent = JSON.parse(site.maskContent || "{}");
        maskContent.heroTitle = `Deneme Bonusu Veren Siteler - [${currentStr}] - ${dateStr}`;
        
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

    console.log("\n🛰️ ALL SITES UPDATED to 22 MARCH. RUNNING MASTER BLAST...");
}

main().catch(console.error).finally(() => prisma.$disconnect());
