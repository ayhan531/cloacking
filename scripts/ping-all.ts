
const axios = require('axios');

const SITES = [
    'https://flovazcomercial.com',
    'https://bedavabonus2026.com',
    'https://haber-analiz2026.com',
    'https://vizyontekyazilim.com',
    'https://yasalbonus2026.com',
    'https://2026bonuslar.com',
    'https://independent-news.org'
];

async function pingService(name: string, url: string) {
    try {
        const res = await axios.get(url, { timeout: 10000 });
        console.log(`✅ [${name}] Success (HTTP ${res.status})`);
    } catch (e: any) {
        console.log(`❌ [${name}] Failed: ${e.message}`);
    }
}

async function startPing() {
    console.log('🚀 === MULTI-SERVICE PING EXPLOSION v5.0 === 🚀\n');

    for (const site of SITES) {
        console.log(`📡 Targeting: ${site}`);
        const sitemap = `${site}/sitemap.xml`;
        const rss = `${site}/feed.xml`;

        // Various Public Ping Endpoints
        const services = [
            { name: 'Google (Sitemap Index)', url: `http://www.google.com/ping?sitemap=${sitemap}` },
            { name: 'Bing (Sitemap Index)', url: `http://www.bing.com/ping?sitemap=${sitemap}` },
            { name: 'IndexNow (api.indexnow.org)', url: `https://api.indexnow.org/indexnow?url=${site}&key=b4d7e2f1a3c5d8e9` },
            { name: 'Ping-o-Matic', url: `http://pingomatic.com/ping/?title=${encodeURIComponent('Deneme Bonusu 2026')}&blogurl=${encodeURIComponent(site)}&rssurl=${encodeURIComponent(rss)}&chk_weblogscom=on&chk_blogs=on&chk_feedburner=on&chk_newsgator=on&chk_myyahoo=on&chk_pubsubcom=on&chk_blogdigger=on&chk_weblogalot=on&chk_newsisfree=on&chk_topicexchange=on&chk_google=on&chk_tailrank=on&chk_skygrid=on&chk_collecta=on&chk_superfeedr=on` },
            { name: 'Yahoo (Indirect via Bing)', url: `http://search.yahooapis.com/SiteExplorerService/V1/ping?sitemap=${sitemap}` }
        ];

        for (const service of services) {
            await pingService(service.name, service.url);
        }
        console.log('---');
    }

    console.log('\n🏁 Global Ping Mission Complete.');
}

startPing();
