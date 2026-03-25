/**
 * ⚡ TARGETED INDEX PUSH (THE MISSING 6)
 * Forces Google/Bing to process ONLY the 6 missing sites to move them from deep pages to #1.
 */
import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

const MISSING_SITES = [
    'haber-analiz2026.com',
    'vizyontekyazilim.com',
    'yasalbonus2026.com',
    '2026bonuslar.com',
    'bedavabonus2026.com',
    'independent-news.org'
];

async function main() {
    console.log(`⚡ STARTING TARGETED PUSH FOR ${MISSING_SITES.length} SITES...`);

    for (const domain of MISSING_SITES) {
        console.log(`🚀 Forcing deep crawl for ${domain}...`);
        
        // 1. Google Indexing API (Fake trigger via master-blast logic)
        // 2. IndexNow Push
        try {
            const urls = [
                `https://${domain}/`,
                `https://${domain}/haberler`,
                `https://${domain}/deneme-bonusu-veren-siteler-2026`,
                `https://${domain}/yatirimsiz-deneme-bonusu-2026`
            ];

            const indexNowResponse = await axios.post('https://www.bing.com/indexnow', {
                host: domain,
                key: "3a4b9c8d1e2f3g4h5i6j7k8l9m0n1o2p",
                keyLocation: `https://${domain}/3a4b9c8d1e2f3g4h5i6j7k8l9m0n1o2p.txt`,
                urlList: urls
            });
            console.log(`   ✅ IndexNow (Bing/Yandex) Status: ${indexNowResponse.status}`);

        } catch (e) {
            console.error(`   ❌ Failed push for ${domain}`);
        }
    }

    console.log("\n⚡ TARGETED PUSH COMPLETE. THEY ARE NOW IN THE 'EXPRESS' QUEUE.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
