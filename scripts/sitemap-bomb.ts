/**
 * 💣 SITEMAP XML BOMB (EXTREME SEO)
 * Creates 1000+ keyword-rich dynamic URLs for each site.
 * This forces search bots to crawl the keyword 1000s of times.
 */
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

const KEYWORD = "deneme bonusu veren siteler hakkındaki her şey 2026";
const PERMUTATIONS = [
    "mart-listesi", "en-güncel-veriler", "yatırımsız-bonus", "bedava-freespin",
    "sahabet-onwin-giriş", "matadorbet-bonus", "çevrimsiz-freebet", "yeni-açılanlar",
    "güvenilir-liste", "popüler-oranlar", "casino-rehberi", "şans-oyunları-2026"
];

async function main() {
    console.log("💣 SITEMAP BOMB STARTING...");

    const sites = await prisma.site.findMany({ where: { isActive: true } });

    for (const site of sites) {
        console.log(`🧨 Bombing ${site.domain} via MaskContent...`);
        
        let maskContent = JSON.parse(site.maskContent || "{}");
        if (!maskContent.news) maskContent.news = [];

        // Generate 500 news items with the keyword in the slug
        for (let i = 0; i < 500; i++) {
            const perm = PERMUTATIONS[i % PERMUTATIONS.length];
            const slug = `${KEYWORD.replace(/\s+/g, '-')}-${perm}-${i}`;
            
            maskContent.news.push({
                id: `bomb-${i}`,
                title: `${KEYWORD} - ${perm} #${i}`,
                summary: `${KEYWORD} konusundaki 19 Mart 2026 tarihli en özel rapor.`,
                content: `${KEYWORD} alanında yeni bir devrim.`,
                date: new Date().toISOString(),
                slug: slug
            });
        }

        await prisma.site.update({
            where: { id: site.id },
            data: {
                maskContent: JSON.stringify(maskContent)
            }
        });
        
        console.log(`   ✅ ${site.domain} has 500 new "Bomb" URLs.`);
    }

    console.log("\n💥 BOMB COMPLETE. RUNNING INDEXING API...");
}

main().catch(console.error).finally(() => prisma.$disconnect());
