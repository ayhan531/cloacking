/**
 * 💣 GLOBAL 7-SITE SERP DOMINATION (21 MARCH)
 * Assigns unique angles and titles to all 7 sites to avoid clustering.
 * Forces all 7 sites to climb to #1 with unique relevance.
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const now = new Date();
const currentStr = `${now.getHours()}:${now.getMinutes() < 10 ? '0'+now.getMinutes() : now.getMinutes()}`;
const dateStr = "21 Mart 2026";

const ANGLES = [
    { title: "RESMİ LİSTE", desc: "2026'nın en büyük resmi deneme bonusu listesi" },
    { title: "YATIRIMSIZ ŞARTSIZ", desc: "Hiç para yatırmadan çekim yapabileceğiniz siteler" },
    { title: "EN YENİ GİRİŞLER", desc: "Bugün açılan, en güncel deneme bonusu veren adresler" },
    { title: "GÜVENİLİR ANALİZ", desc: "Sektörün en güvenilir otoritesinden deneme bonusu raporu" },
    { title: "FREESPIN MERKEZİ", desc: "Slotlar için bedava dönüş ve deneme bakiyesi rehberi" },
    { title: "EDİTÖRÜN SEÇİMİ", desc: "Mart 2026'nın en çok kazandıran 10 bahis sitesi" },
    { title: "SON DAKİKA GÜNDEM", desc: "Anlık olarak güncellenen deneme bonusu haberleri" }
];

async function main() {
    console.log(`🌐 DOMINATING SERP FOR ${dateStr}...`);

    const sites = await prisma.site.findMany({ where: { isActive: true } });

    for (let i = 0; i < sites.length; i++) {
        const site = sites[i];
        const angle = ANGLES[i % ANGLES.length];
        
        console.log(`🚀 Pushing unique angle to ${site.domain}: ${angle.title}...`);
        
        let seoSettings = JSON.parse(site.seoSettings || "{}");
        // Each title is UNIQUE to avoid Google's deduplication.
        seoSettings.metaTitle = `🔥 ${angle.title}: [${currentStr}] | ${dateStr} | Deneme Bonusu Veren Siteler Hakkındaki Her Şey 2026 (ZİRVEDE BİZ VARIZ)`;
        seoSettings.metaDescription = `${site.domain} ile ${angle.desc}. 21 Mart 2021 saat ${currentStr} itibarıyla deneme bonusu veren siteler hakkındaki her şey burada!`;
        
        let maskContent = JSON.parse(site.maskContent || "{}");
        maskContent.heroTitle = `${angle.title}: ${dateStr}`;
        maskContent.heroSubtitle = angle.desc;
        
        // Update news dates to today to force crawl.
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
        
        console.log(`   ✅ ${site.domain} successfully optimized for domination.`);
    }

    console.log("\n🌐 ALL SITES UNIQUE. RUNNING MASTER BLAST...");
}

main().catch(console.error).finally(() => prisma.$disconnect());
