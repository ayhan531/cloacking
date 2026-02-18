const axios = require('axios');

async function main() {
    console.log("🔥 STARTING CONTINUOUS PING DAEMON (NO-GSC MODE)");
    console.log("⏳ Interval: Every 15 minutes");

    const domains = [
        'flovazcomercial.com',
        'haber-analiz2026.com',
        'vizyontekyazilim.com',
        'yasalbonus2026.com',
        'bonusverensiteler2026.com',
        '2026bonuslar.com',
        'bedavabonus2026.com'
    ];

    const ping = async () => {
        const timestamp = new Date().toLocaleTimeString();
        console.log(`\n[${timestamp}] 📡 Executing Ping Cycle...`);

        for (const domain of domains) {
            const sitemapUrl = `https://${domain}/sitemap.xml`;
            const feedUrl = `https://${domain}/feed.xml`;

            // Standard Pings
            const googlePing = `http://www.google.com/ping?sitemap=${sitemapUrl}`;
            const bingPing = `http://www.bing.com/ping?sitemap=${sitemapUrl}`;

            // RSS Ping (Specialized)
            // Note: Google uses PubSubHubbub mostly now but some aggregators still poll

            try {
                // We just fire and forget, catching errors to keep the daemon alive
                await axios.get(googlePing, { timeout: 5000 }).catch(() => { });
                await axios.get(bingPing, { timeout: 5000 }).catch(() => { });

                // Also hit the site itself to wake up the server/cache
                await axios.get(`https://${domain}`, { timeout: 5000 }).catch(() => { });
                await axios.get(feedUrl, { timeout: 5000 }).catch(() => { });

                process.stdout.write(`.`); // Compact success indicator
            } catch (error) {
                process.stdout.write(`x`); // Compact error indicator
            }
        }
        console.log(`\n[${timestamp}] 🏁 Cycle Complete.`);
    };

    // Run immediately then loop
    await ping();

    // 15 Minutes = 900,000 ms
    setInterval(ping, 15 * 60 * 1000);
}

main().catch(console.error);
