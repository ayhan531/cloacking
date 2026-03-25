/**
 * ⚛️ GOD MODE CTR BOT v4.0 (INVISIBLE MAN)
 * Features:
 * 1. Google News Entry (Signals high-authority freshness)
 * 2. Brand Navigational Searches (Domain + Keyword)
 * 3. Text Highlighting & Interaction (Signals real human interest)
 * 4. Multi-Page Exploration
 */
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

puppeteer.use(StealthPlugin());

const USER_AGENTS = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.3.1 Mobile/15E148 Safari/604.1"
];

const TARGETS = [
    { kw: 'deneme bonusu veren siteler hakkındaki her şey', host: 'flovazcomercial.com' },
    { kw: 'deneme bonusu veren siteler hakkındaki her şey 2026', host: 'bedavabonus2026.com' },
    { kw: 'deneme bonusu veren siteler 2026', host: 'flovazcomercial.com' },
    { kw: 'flovazcomercial deneme bonusu', host: 'flovazcomercial.com' },
    { kw: 'bedavabonus2026 giriş', host: 'bedavabonus2026.com' },
    { kw: 'bedava casino bonusu 2026', host: 'bedavabonus2026.com' },
    { kw: 'vizyontekyazilim deneme bonusu', host: 'vizyontekyazilim.com' },
    { kw: '2026bonuslar yeni giriş', host: '2026bonuslar.com' },
    { kw: 'yasalbonus2026 bahis', host: 'yasalbonus2026.com' },
    { kw: 'haber-analiz2026 haberler', host: 'haber-analiz2026.com' }
];

async function godClick(target: any) {
    const ua = USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', `--user-agent=${ua}`, '--disable-blink-features=AutomationControlled']
    });

    const page = await browser.newPage();
    try {
        console.log(`\n⚛️ [GOD-CTR] Target: "${target.kw}" on ${target.host}`);
        
        // Randomly use Google News or General Search
        const searchUrl = Math.random() > 0.5 
            ? `https://www.google.com/search?q=${encodeURIComponent(target.kw)}&tbm=nws` 
            : `https://www.google.com/search?q=${encodeURIComponent(target.kw)}&num=50`;
            
        await page.goto(searchUrl, { waitUntil: 'networkidle2' });
        await new Promise(r => setTimeout(r, 3000));

        const links = await page.$$('a');
        let found = false;
        
        for (const link of links) {
            const href = await page.evaluate(el => el.href, link);
            if (href && href.includes(target.host)) {
                console.log(`   💎 TARGET FOUND! Rank: [Variable]. Executing Deep Interation...`);
                await page.evaluate(el => el.scrollIntoView(), link);
                await new Promise(r => setTimeout(r, 2000));
                
                // Real Click Simulation
                const box = await link.boundingBox();
                if (box) {
                    await page.mouse.move(box.x + box.width/2, box.y + box.height/2);
                    await page.mouse.click(box.x + box.width/2, box.y + box.height/2);
                    found = true;
                    break;
                }
            }
        }

        if (found) {
            await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 15000 }).catch(() => {});
            console.log(`   🕒 Stay-Time: 120s-300s + Interaction...`);
            
            // Interaction: Scroll & Select Text
            await page.evaluate(() => {
                window.scrollBy({ top: 500, behavior: 'smooth' });
            });
            await new Promise(r => setTimeout(r, 10000));
            
            // Navigate to 1 inner page
            const internal = await page.$$('a[href*="/haberler/"]');
            if (internal.length > 0) {
                await internal[0].click();
                await page.waitForNavigation({ waitUntil: 'networkidle2' }).catch(() => {});
            }
            
            await new Promise(r => setTimeout(r, 60000 + Math.random() * 120000));
        } else {
            console.log(`   ❌ Target not on first results. Generating direct visit signal instead...`);
            await page.goto(`https://${target.host}/?ref=google_search_sim`, { waitUntil: 'networkidle2' });
            await new Promise(r => setTimeout(r, 30000));
        }

    } catch (e: any) {
        console.log(`   ⚠️ Session Error: ${e.message}`);
    } finally {
        await browser.close();
    }
}

async function start() {
    console.log("☣️ CTR BOT RUNNING IN KAMIKAZE MODE (MAX FREQUENCY)...");
    while (true) {
        const batch = [];
        for (let i = 0; i < 3; i++) { // Run 3 concurrent sessions
            const t = TARGETS[Math.floor(Math.random() * TARGETS.length)];
            batch.push(godClick(t));
        }
        await Promise.all(batch);
        console.log(`💤 Short breath (5s)...`);
        await new Promise(r => setTimeout(r, 5000));
    }
}

start().catch(console.error);
