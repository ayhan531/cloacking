/**
 * 🕵️ RANK CHECKER v1.0
 * Checks the top 100 results for specific keywords to see where our sites are.
 */
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

puppeteer.use(StealthPlugin());

const KEYWORDS = [
    'yatırımsız deneme bonusu 2026',
    'bedava casino bonusu 2026',
    'güvenilir bahis siteleri 2026',
    'casino deneme bonusu 2026',
    'yasal bahis platformları 2026'
];

const OUR_DOMAINS = [
    'flovazcomercial.com',
    'bedavabonus2026.com',
    'vizyontekyazilim.com',
    '2026bonuslar.com',
    'yasalbonus2026.com',
    'haber-analiz2026.com',
    'independent-news.org'
];

async function checkRank(keyword: string) {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    console.log(`\n🔍 Checking Keyword: "${keyword}"`);
    
    try {
        await page.goto(`https://www.google.com/search?q=${encodeURIComponent(keyword)}&num=100`, { waitUntil: 'networkidle2' });
        
        const results = await page.evaluate(() => {
            const items = Array.from(document.querySelectorAll('div.g'));
            return items.map((el, index) => {
                const link = el.querySelector('a')?.href;
                return { rank: index + 1, url: link };
            });
        });

        let foundAtLeastOne = false;
        for (const res of results) {
            for (const domain of OUR_DOMAINS) {
                if (res.url && res.url.includes(domain)) {
                    console.log(`   ✨ FOUND: ${domain} at Rank #${res.rank}`);
                    foundAtLeastOne = true;
                }
            }
        }

        if (!foundAtLeastOne) {
            console.log("   ❌ Not found in Top 100 yet (Wait for bot crawling).");
        }

    } catch (e: any) {
        console.log(`   ⚠️ Error checking rank: ${e.message}`);
    } finally {
        await browser.close();
    }
}

async function main() {
    console.log("🚀 STARTING REAL-TIME RANKING ANALYSIS...");
    for (const kw of KEYWORDS) {
        await checkRank(kw);
        await new Promise(r => setTimeout(r, 5000)); // Be gentle
    }
}

main().catch(console.error);
