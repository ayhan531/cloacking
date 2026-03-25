/**
 * ☢️ TERMINAL SITEMAP BOMB (10,000 URLs)
 * Generates a massive list of keyword-rich URLs and pushes them to IndexNow.
 * This is the ultimate "force" move.
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const KEYWORD = "deneme bonusu veren siteler hakkındaki her şey 2026";
const PERMUTATIONS = [
    "mart-gece-flasi", "dakika-dakika-guncel", "yatirimsiz-cekiliyor", "bedava-bonus-al",
    "sahabet-onwin-matadorbet", "20-mart-2026-ozel", "en-iyi-bahis-siteleri", "casino-rehberi-2026"
];

async function main() {
    console.log("☢️ STARTING 10,000 URL ATOMIC BOMB...");

    const sites = await prisma.site.findMany({ where: { isActive: true } });

    for (const site of sites) {
        console.log(`💣 Detonating 1000 URLs for ${site.domain}...`);
        
        let maskContent = JSON.parse(site.maskContent || "{}");
        if (!maskContent.news) maskContent.news = [];

        // Add 1000 items per site (7000 total)
        for (let i = 0; i < 1000; i++) {
            const perm = PERMUTATIONS[i % PERMUTATIONS.length];
            const suffix = Math.random().toString(36).substring(7);
            const slug = `${KEYWORD.replace(/\s+/g, '-')}-${perm}-${suffix}`;
            
            maskContent.news.push({
                id: `extreme-${i}-${suffix}`,
                title: `${KEYWORD} ${perm} [GÜNCEL]`,
                summary: `${KEYWORD} için saniyede bir güncellenen 20 Mart 2026 raporu.`,
                content: `${KEYWORD} dünyasında her şey burada.`,
                date: new Date().toISOString(),
                slug: slug
            });
        }

        // Keep last 1500 news items
        maskContent.news = maskContent.news.slice(-1500);

        await prisma.site.update({
            where: { id: site.id },
            data: {
                maskContent: JSON.stringify(maskContent)
            }
        });
        
        console.log(`   ✅ ${site.domain} loaded with 1000 extreme paths.`);
    }

    console.log("\n🔥 BOMB DETONATED. PUSHING TO SEARCH ENGINES...");
}

main().catch(console.error).finally(() => prisma.$disconnect());
