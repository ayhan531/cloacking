const axios = require('axios');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    console.log("🚀 STARTING EMERGENCY INDEX FORCE PING...");

    // Hedef domainler
    const domains = [
        'flovazcomercial.com',
        'haber-analiz2026.com',
        'vizyontekyazilim.com',
        'yasalbonus2026.com',
        'bonusverensiteler2026.com',
        '2026bonuslar.com',
        'bedavabonus2026.com'
    ];

    for (const domain of domains) {
        const sitemapUrl = `https://${domain}/sitemap.xml`;
        // Google Ping Endpoint (Note: Google officially deprecated this, but it still often triggers a crawl)
        const googlePing = `http://www.google.com/ping?sitemap=${sitemapUrl}`;
        const bingPing = `http://www.bing.com/ping?sitemap=${sitemapUrl}`;

        console.log(`\n📡 Pinging for: ${domain}`);

        try {
            await axios.get(googlePing);
            console.log(`✅ Google Ping Success: ${domain}`);
        } catch (error) {
            console.error(`❌ Google Ping Failed: ${domain} - ${error.message}`);
        }

        try {
            await axios.get(bingPing);
            console.log(`✅ Bing Ping Success: ${domain}`);
        } catch (error) {
            console.error(`❌ Bing Ping Failed: ${domain} - ${error.message}`);
        }
    }

    console.log("\n🏁 FORCE INDEXING COMPLETE. Wait 24h for results.");
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
