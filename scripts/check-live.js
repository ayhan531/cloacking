
async function checkLiveStatus() {
    const urls = [
        'https://flovazcomercial.com/',
        'https://flovazcomercial.com/deneme-bonusu',
        'https://haber-analiz2026.com/'
    ];

    for (const url of urls) {
        try {
            console.log(`\n--- CHECKING: ${url} ---`);
            const response = await fetch(url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
                }
            });
            const html = await response.text();

            const titleMatch = html.match(/<title>(.*?)<\/title>/);
            const title = titleMatch ? titleMatch[1] : 'No Title Found';
            console.log(`Title: ${title}`);

            const descriptionMatch = html.match(/<meta name="description" content="(.*?)"/);
            const description = descriptionMatch ? descriptionMatch[1] : 'No Description Found';
            console.log(`Description: ${description.substring(0, 100)}...`);

            // Check if unique keywords are present
            if (html.includes('Elite Global Sigorta')) console.log('✅ Name uniqueness: FOUND (Elite Global Sigorta)');
            if (html.includes('Haber Analiz 2026')) console.log('✅ Name uniqueness: FOUND (Haber Analiz 2026)');

        } catch (e) {
            console.log(`Error checking ${url}: ${e.message}`);
        }
    }
}

checkLiveStatus();
