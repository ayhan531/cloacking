/**
 * 🛰️ NAVIGATIONAL SEARCH BOOSTER v1.0
 * Simulates users searching for our domain names directly.
 * This signals high brand authority to Google.
 */
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

puppeteer.use(StealthPlugin());

const THE_BRANDS = [
    'flovazcomercial',
    'bedavabonus2026',
    'haber-analiz2026',
    'vizyontekyazilim',
    'yasalbonus2026',
    '2026bonuslar'
];

const ADDONS = ['', ' giriş', ' güncel adres', ' bonus', ' 2026'];

async function searchBrand(brand: string) {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    const page = await browser.newPage();
    try {
        const query = brand + ADDONS[Math.floor(Math.random() * ADDONS.length)];
        console.log(`🛰️ [NAV-SEARCH] Brand Search: "${query}"`);
        
        await page.goto(`https://www.google.com/search?q=${encodeURIComponent(query)}`, { waitUntil: 'networkidle2' });
        await new Promise(r => setTimeout(r, 2000));

        // Let's find any link that has the brand in it
        const links = await page.$$('a');
        for (const link of links) {
            const text = await page.evaluate(el => el.innerText, link);
            const href = await page.evaluate(el => el.href, link);
            if (href.includes(brand)) {
                console.log(`   💎 Found brand link. Clicking...`);
                await link.click();
                await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 10000 }).catch(() => {});
                await new Promise(r => setTimeout(r, 15000 + Math.random() * 20000));
                break;
            }
        }
    } catch (e) {
        console.log(`   ⚠️ Search error: ${e}`);
    } finally {
        await browser.close();
    }
}

async function start() {
    console.log("🚀 STARTING NAVIGATIONAL SEARCH VOLLEY...");
    while (true) {
        const b = THE_BRANDS[Math.floor(Math.random() * THE_BRANDS.length)];
        await searchBrand(b);
        await new Promise(r => setTimeout(r, 5000));
    }
}

start().catch(console.error);
