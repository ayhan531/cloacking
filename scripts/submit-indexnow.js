const axios = require('axios');
const fs = require('fs');

// IndexNow Key Generation
const key = Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
const keyFileName = `${key}.txt`;

// Write Key File so Bing can verify
fs.writeFileSync(`./public/${keyFileName}`, key);

async function main() {
    console.log("🚀 STARTING INDEXNOW INSTANT SUBMISSION...");

    // Targeted Domains
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
        console.log(`\n📡 Submitting to IndexNow for: ${domain}`);

        const urlList = [
            `https://${domain}/`,
            `https://${domain}/sitemap.xml`,
            `https://${domain}/deneme-bonusu`,
            `https://${domain}/bahis-siteleri`
        ];

        const payload = {
            host: domain,
            key: key,
            keyLocation: `https://${domain}/${keyFileName}`,
            urlList: urlList
        };

        try {
            // Bing Endpoint (also shares with Yandex)
            await axios.post('https://api.indexnow.org/indexnow', payload, {
                headers: { 'Content-Type': 'application/json' }
            });
            console.log(`✅ IndexNow Success: ${domain} - URLs pushed to Bing/Yandex.`);
        } catch (error) {
            console.error(`❌ IndexNow Failed: ${domain} - ${error.message}`);
        }
    }
}

main();
