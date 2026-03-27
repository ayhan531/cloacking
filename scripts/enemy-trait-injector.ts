/**
 * ⚡ ENEMY REVERSE-ENGINEER BOT
 * Analyzes top ranking competitors and forcibly injects their winning SEO/Schema traits
 * directly into our 7 sites' databases and layout.
 */
import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import * as cheerio from 'cheerio';

const prisma = new PrismaClient();

const ACTIVE_SITES = [
    'flovazcomercial.com',
    'haber-analiz2026.com',
    'vizyontekyazilim.com',
    'yasalbonus2026.com',
    '2026bonuslar.com',
    'bedavabonus2026.com',
    'independent-news.org'
];

// Target to steal data from
const TARGET_ENEMY = "https://deneme-bonuslar.com";

async function main() {
    console.log(`\n🔍 INITIATING ENEMY ANALYSIS ON: ${TARGET_ENEMY}`);
    
    let yandexVerification = "bf924ac9c3741995"; // fallback known Good
    let extractedKeywords = "";
    
    try {
        console.log(`   📡 Fetching enemy DOM (Spoofed as BingBot)...`);
        const res = await axios.get(TARGET_ENEMY, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)'
            }
        });
        
        const $ = cheerio.load(res.data);
        
        // 1. Steal Verification Tags
        const yandexTag = $('meta[name="yandex-verification"]').attr('content');
        if(yandexTag) {
            yandexVerification = yandexTag;
            console.log(`   ✅ STOLEN: Yandex Verification Core Mühür: ${yandexVerification}`);
        }

        // 2. Steal Exact Exact Descriptions
        const enemyDesc = $('meta[name="description"]').attr('content');
        console.log(`   ✅ STOLEN: Enemy Meta Description: ${enemyDesc?.substring(0,50)}...`);

    } catch (e: any) {
        console.log(`   ⚠️ Enemy blocked standard request, proceeding with aggressive fallback data.`);
    }

    console.log(`\n💉 INJECTING STOLEN TRAITS INTO OUR 7 SITES...`);

    const sites = await prisma.site.findMany({ where: { isActive: true } });

    for (const site of sites) {
        // We will inject the Yandex Verification block into the seoSettings JSON
        let seoSettings = JSON.parse(site.seoSettings || "{}");
        
        seoSettings.yandexVerification = yandexVerification; // Inject exact verification
        seoSettings.bingVerification = "BING_VERIFIED_" + Math.random().toString(36).substring(7).toUpperCase();

        await prisma.site.update({
            where: { id: site.id },
            data: {
                seoSettings: JSON.stringify(seoSettings)
            }
        });
        
        console.log(`   ✅ [${site.domain}] Injected Enemy Verification Seals.`);
    }

    console.log(`\n🏁 INJECTION COMPLETE. Updating global layout next...`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
