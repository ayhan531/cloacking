/**
 * 🛰️ HOURLY FRESHNESS PUNCH
 * Updates all site metadata and news to reflect the CURRENT HOUR to force a 'News' ranking.
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const now = new Date();
const currentStr = `${now.getHours()}:${now.getMinutes() < 10 ? '0'+now.getMinutes() : now.getMinutes()}`;
const dateStr = "20 Mart 2026";

async function main() {
    console.log(`🛰️ SYNCING TO ${dateStr} ${currentStr}...`);

    const sites = await prisma.site.findMany({ where: { isActive: true } });

    for (const site of sites) {
        console.log(`📡 Pushing hourly freshness to ${site.domain}...`);
        
        let seoSettings = JSON.parse(site.seoSettings || "{}");
        seoSettings.metaTitle = `🚨 #1 LİDER: [${currentStr}] | ${dateStr} | Deneme Bonusu Veren Siteler Hakkındaki Her Şey 2026 (DAKİKA DAKİKA GÜNCEL)`;
        seoSettings.metaDescription = `${site.domain} ile ${dateStr} saat ${currentStr} itibarıyla deneme bonusu veren siteler hakkındaki her şey burada. Yatırımsız, çevrimsiz dev liste!`;
        
        // Update H1 as well in maskContent (if we use it there)
        let maskContent = JSON.parse(site.maskContent || "{}");
        maskContent.heroTitle = `Deneme Bonusu Veren Siteler Hakkındaki Her Şey - [${currentStr}]`;
        
        if (maskContent.news) {
            // Update last 50 news articles to have "now" timestamp
            maskContent.news = maskContent.news.map((item: any, idx: number) => {
                if (idx < 50) {
                    return {
                        ...item,
                        date: new Date(Date.now() - (idx * 60000)).toISOString() // 1 min apart
                    };
                }
                return item;
            });
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
