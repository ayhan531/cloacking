import axios from 'axios';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Configuration
const INDEXNOW_KEY = 'flovaz2026indexnowkey'; // public folder'da bu isimle .txt dosyası var
const INDEXNOW_URL = 'https://www.bing.com/indexnow';
const SEARCH_ENGINES = [
    'https://www.bing.com/indexnow',
    'https://search.yandex.com/indexnow',
    'https://indexnow.org/indexnow'
];

async function main() {
    console.log("🚀 INDEXNOW_PUSH: Targeted Instant Indexing started...");

    // Fetch all active sites
    const sites = await prisma.site.findMany({
        where: { isActive: true },
        select: { domain: true, maskContent: true }
    });

    for (const site of sites) {
        const domain = site.domain;
        console.log(`📡 Preparing URL list for: ${domain}`);

        // Base URLs
        let urlList = [
            `https://${domain}/`,
            `https://${domain}/deneme-bonusu`,
            `https://${domain}/bahis-siteleri`,
            `https://${domain}/casino-siteleri`,
            `https://${domain}/hosgeldin-bonusu`,
            `https://${domain}/hakkimizda`
        ];

        // Add News URLs
        try {
            const maskContent = typeof site.maskContent === 'string' ? JSON.parse(site.maskContent) : site.maskContent;
            if (maskContent && maskContent.news && Array.isArray(maskContent.news)) {
                const newsUrls = maskContent.news.slice(0, 100).map((n: any) => `https://${domain}/haberler/${n.slug}`);
                urlList = [...urlList, ...newsUrls];
            }
        } catch (e) {
            console.error(`Error parsing news for ${domain}`);
        }

        console.log(`📤 Pushing ${urlList.length} URLs for ${domain} to IndexNow...`);

        // Push to each search engine
        for (const engine of SEARCH_ENGINES) {
            try {
                const payload = {
                    host: domain,
                    key: INDEXNOW_KEY,
                    keyLocation: `https://${domain}/${INDEXNOW_KEY}.txt`,
                    urlList: urlList
                };

                const response = await axios.post(engine, payload);
                console.log(`✅ [${engine}] response: ${response.status} for ${domain}`);
            } catch (err: any) {
                console.error(`❌ [${engine}] failed for ${domain}: ${err.message}`);
            }
        }
    }

    console.log("💎 INDEXNOW_PUSH COMPLETE: All search engines notified.");
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
