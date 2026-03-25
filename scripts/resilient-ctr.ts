/**
 * 🕵️ RESILIENT CTR BOOSTER v2.0
 * Features: User-Agent rotation, extended delay, stealth enhancements.
 */
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

puppeteer.use(StealthPlugin());

const USER_AGENTS = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Edge/122.0.0.0",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:123.0) Gecko/20100101 Firefox/123.0"
];

const TARGETS = [
    { keyword: 'yatırımsız deneme bonusu 2026', targetUrl: 'flovazcomercial.com' },
    { keyword: 'flovazcomercial deneme bonusu', targetUrl: 'flovazcomercial.com' },
    { keyword: 'bedava casino bonusu 2026', targetUrl: 'bedavabonus2026.com' },
    { keyword: 'bedavabonus2026 giriş', targetUrl: 'bedavabonus2026.com' },
    { keyword: 'güvenilir bahis siteleri 2026', targetUrl: 'vizyontekyazilim.com' },
    { keyword: 'vizyontekyazilim casino', targetUrl: 'vizyontekyazilim.com' },
    { keyword: 'casino deneme bonusu 2026', targetUrl: '2026bonuslar.com' },
    { keyword: '2026bonuslar yeni giriş', targetUrl: '2026bonuslar.com' },
    { keyword: 'yasal bahis platformları 2026', targetUrl: 'yasalbonus2026.com' },
    { keyword: 'bahis haberleri 2026', targetUrl: 'haber-analiz2026.com' },
    { keyword: 'bağımsız casino inceleme 2026', targetUrl: 'independent-news.org' }
];

async function simulateCTR(target: any) {
    const ua = USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', `--user-agent=${ua}`]
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 768 });

    try {
        console.log(`\n🚀 [CTR v2] Searching "${target.keyword}"...`);
        const engine = Math.random() > 0.3 ? 'https://www.google.com' : 'https://www.bing.com';
        await page.goto(engine, { waitUntil: 'networkidle2' });

        // Wait for search box
        const selector = engine.includes('google') ? 'textarea[name="q"]' : 'input[name="q"]';
        await page.waitForSelector(selector, { timeout: 10000 });
        
        await page.type(selector, target.keyword, { delay: 200 });
        await page.keyboard.press('Enter');
        await page.waitForNavigation({ waitUntil: 'networkidle2' });

        let found = false;
        for (let p = 0; p < 5; p++) {
            console.log(`   📄 Page ${p + 1}...`);
            const links = await page.$$('a');
            for (const link of links) {
                const href = await page.evaluate(el => el.href, link);
                if (href && href.includes(target.targetUrl)) {
                    console.log(`   ✅ BINGO! Clicking ${target.targetUrl}`);
                    await page.evaluate(el => el.scrollIntoView(), link);
                    await new Promise(r => setTimeout(r, 2000));
                    await link.click();
                    found = true;
                    break;
                }
            }
            if (found) break;

            // Next page logic
            const next = engine.includes('google') ? '#pnnext' : 'a[title*="Sonraki"]';
            const btn = await page.$(next);
            if (btn) {
                await btn.click();
                await page.waitForNavigation({ waitUntil: 'networkidle2' });
            } else break;
        }

        if (found) {
            console.log("   🕒 Browsing site: Dwell Time + Subpage Exploration...");
            // Real User Flow: Visit 2-3 news articles
            for (let i = 0; i < 2; i++) {
                try {
                    const internalLinks = await page.$$('a[href*="/haberler/"]');
                    if (internalLinks.length > 0) {
                        const randomLink = internalLinks[Math.floor(Math.random() * internalLinks.length)];
                        await randomLink.click();
                        await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 5000 });
                        console.log(`      👀 Subpage visited: ${await page.url()}`);
                        await new Promise(r => setTimeout(r, 15000 + Math.random() * 20000)); // Stay 15-35s
                    }
                } catch { }
            }
            // Final Stay
            await new Promise(r => setTimeout(r, 30000 + Math.random() * 60000));
        } else {
            console.log("   ❌ Not in top 5 pages.");
        }

    } catch (e: any) {
        console.log(`   ⚠️ CAPTCHA or Error: ${e.message}`);
    } finally {
        await browser.close();
    }
}

async function runLoop() {
    while (true) {
        for (const t of TARGETS) {
            await simulateCTR(t);
            const pause = 120000 + Math.random() * 300000; // 2-7 mins pause
            console.log(`💤 Sleeping ${Math.round(pause/1000)}s...`);
            await new Promise(r => setTimeout(r, pause));
        }
    }
}

runLoop().catch(console.error);
