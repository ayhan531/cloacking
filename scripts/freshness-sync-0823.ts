import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const now = new Date();
const currentStr = `08:23`;
const dateStr = "24 Mart 2026";

async function main() {
    console.log(`🛰️ TOTAL SYNCHRONIZATION TO ${dateStr} ${currentStr}...`);

    const sites = await prisma.site.findMany({ where: { isActive: true } });

    for (const site of sites) {
        let seoSettings = JSON.parse(site.seoSettings || "{}");
        seoSettings.metaTitle = `🚨 #1 LİDER: [${currentStr}] | ${dateStr} GÜNCEL SABAH | Deneme Bonusu Veren Siteler Hakkındaki Her Şey 2026 (SON DAKİKA)`;
        
        let maskContent = JSON.parse(site.maskContent || "{}");
        maskContent.heroTitle = `${site.domain.split('.')[0].toUpperCase()} - [${currentStr}] - ${dateStr} SABAH LİSTESİ`;
        
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
    }

    console.log("\n🛰️ ALL SITES DB SYNCED TO EXACT SECOND.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
