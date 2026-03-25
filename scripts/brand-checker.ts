/**
 * 🕵️ BRAND RANK CHECKER v1.1
 * Checks if our sites rank for their own domain names/brand names.
 */
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

puppeteer.use(StealthPlugin());

const BRANDS = [
    { name: 'flovazcomercial', domain: 'flovazcomercial.com' },
    { name: 'bedavabonus2026', domain: 'bedavabonus2026.com' },
    { name: 'vizyontekyazilim', domain: 'vizyontekyazilim.com' },
    { name: '2026bonuslar', domain: '2026bonuslar.com' },
    { name: 'yasalbonus2026', domain: 'yasalbonus2026.com' }
];

async function checkBrand(brand: any) {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    console.log(`\n🔍 Checking Brand: "${brand.name}"`);
    
    try {
        await page.goto(`https://www.google.com/search?q=${encodeURIComponent(brand.name)}`, { waitUntil: 'networkidle2' });
        
        const firstResult = await page.evaluate(() => {
            const firstA = document.querySelector('div.g a');
            return firstA ? (firstA as HTMLAnchorElement).href : null;
        });

        if (firstResult && firstResult.includes(brand.domain)) {
            console.log(`   ✅ RANK #1! Brand recognized by Google.`);
        } else {
            console.log(`   ❌ Not #1 yet. Current Top: ${firstResult}`);
        }

    } catch (e: any) {
        console.log(`   ⚠️ Error: ${e.message}`);
    } finally {
        await browser.close();
    }
}

async function main() {
    for (const b of BRANDS) {
        await checkBrand(b);
    }
}

main().catch(console.error);
