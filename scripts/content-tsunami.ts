/**
 * ☢️ CONTENT TSUNAMI (HIGH RISK SEO)
 * Generates 40+ new dynamic news articles for each site to dominate indexing.
 * Uses aggressive long-tail keywords.
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const LONG_TAIL_KEYWORDS = [
    "deneme bonusu veren siteler hakkındaki her şey 2026 gizli liste",
    "yatırımsız deneme bonusu veren siteler mart 18 gece flaşı",
    "en güvenilir bahis siteleri listesinde 1 numara kim",
    "çevrimsiz freebet veren siteler yeni açılan casinolar",
    "bedava casino bonusu veren siteler 2026 tam liste",
    "sahabet matadorbet onwin güncel giriş adresleri bugün",
    "meritking betist casibom deneme bonusu detayları",
    "500 tl deneme bonusu veren siteler 2026 rehberi",
    "yatırımsız para çekilen bahis siteleri 2026",
    "en yüksek deneme bonusu veren siteler hakkında her şey"
];

async function main() {
    console.log("☢️ STARTING CONTENT TSUNAMI...");

    const sites = await prisma.site.findMany({ where: { isActive: true } });

    for (const site of sites) {
        console.log(`🌊 Flooding ${site.domain} with content...`);
        
        let maskContent = JSON.parse(site.maskContent || "{}");
        if (!maskContent.news) maskContent.news = [];

        // Generate 40 articles per site
        for (let i = 0; i < 40; i++) {
            const keyword = LONG_TAIL_KEYWORDS[i % LONG_TAIL_KEYWORDS.length];
            const timestamp = new Date(Date.now() - (i * 3600000)).toISOString();
            const slug = `${keyword.replace(/\s+/g, '-')}-${i}`;
            
            maskContent.news.unshift({
                id: `tsu-${i}`,
                title: `${keyword.toUpperCase()} - MART 2026`,
                summary: `${site.domain} analistleri tarafından hazırlanan bu raporda, ${keyword} konusundaki tüm teknik detaylar ve 18 Mart 2026 güncel giriş bilgileri yer almaktadır.`,
                content: `Bu makale ${keyword} alanındaki en son gelişmeleri incelemektedir. 2026 standartlarına uygun olarak deneme bonusu veren siteler hakkındaki her şey bu analizde...`,
                date: timestamp,
                slug: slug,
                tags: ["Deneme Bonusu", "2026", "Analiz"]
            });
        }

        // Limit to 100 news to avoid DB size issues but keep it massive
        maskContent.news = maskContent.news.slice(0, 100);

        await prisma.site.update({
            where: { id: site.id },
            data: {
                maskContent: JSON.stringify(maskContent)
            }
        });
        
        console.log(`   ✅ ${site.domain} flooded with 40 new organic entries.`);
    }

    console.log("\n🔥 TSUNAMI COMPLETE. NUCLEAR INDEXING STARTING...");
}

main().catch(console.error).finally(() => prisma.$disconnect());
