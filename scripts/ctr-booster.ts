import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

puppeteer.use(StealthPlugin());

/**
 * 🤖 CTR (Click-Through Rate) MANIPULATION BOT
 * Bu script, Google ve Bing aramalarında sitenizi bulup tıklar.
 * Google'a "Bu site çok popüler, herkes buna tıklıyor" mesajı verir.
 */

const TARGETS = [
    {
        keyword: 'yatırımsız deneme bonusu 2026',
        targetUrl: 'flovazcomercial.com',
        mainDomain: 'flovazcomercial.com'
    },
    {
        keyword: 'bedava casino bonusu 2026',
        targetUrl: 'bedavabonus2026.com',
        mainDomain: 'bedavabonus2026.com'
    },
    {
        keyword: 'güvenilir bahis siteleri 2026',
        targetUrl: 'vizyontekyazilim.com',
        mainDomain: 'vizyontekyazilim.com'
    },
    {
        keyword: 'casino deneme bonusu 2026',
        targetUrl: '2026bonuslar.com',
        mainDomain: '2026bonuslar.com'
    },
    {
        keyword: 'yasal bahis platformları 2026',
        targetUrl: 'yasalbonus2026.com',
        mainDomain: 'yasalbonus2026.com'
    },
    {
        keyword: 'bahis haberleri 2026',
        targetUrl: 'haber-analiz2026.com',
        mainDomain: 'haber-analiz2026.com'
    },
    {
        keyword: 'bağımsız casino inceleme 2026',
        targetUrl: 'independent-news.org',
        mainDomain: 'independent-news.org'
    }
];

async function simulateHumanSearch(target: typeof TARGETS[0]) {
    const browser = await puppeteer.launch({
        headless: false, // Gerçekten izlemek istersen true yapabilirsin
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--window-size=1280,800'
        ]
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    try {
        console.log(`🔍 [${target.keyword}] kelimesi aranıyor...`);
        // Rastgele Google veya Bing seç
        const useBing = Math.random() > 0.5;
        const searchUrl = useBing ? 'https://www.bing.com' : 'https://www.google.com';

        await page.goto(searchUrl, { waitUntil: 'networkidle2', timeout: 60000 });

        // Çerez Reddetme (Google & Bing)
        await page.evaluate(() => {
            const buttons = Array.from(document.querySelectorAll('button, a'));
            const refuseButton = buttons.find(b => {
                const text = (b as HTMLElement).innerText || "";
                return text.includes('Reddet') || text.includes('Refuse') || text.includes('Kabul etmiyorum') || text.includes('Reject all');
            });
            if (refuseButton) (refuseButton as HTMLElement).click();
        });
        await new Promise(r => setTimeout(r, 3000));

        // Arama yap - Daha esnek selector
        console.log('   ⌨️ Arama kutusu aranıyor...');
        const searchBoxSelector = useBing ? 'input[name="q"]' : 'textarea[name="q"], input[name="q"], [role="combobox"]';

        try {
            await page.waitForSelector(searchBoxSelector, { timeout: 30000 });
        } catch (e) {
            console.log('   ❌ Arama kutusu bulunamadı, CAPTCHA olabilir. Ekran görüntüsü alınıyor...');
            await page.screenshot({ path: `error-captcha-${target.targetUrl}.png` });
            throw e;
        }

        await page.type(searchBoxSelector, target.keyword, { delay: 150 });
        await page.keyboard.press('Enter');

        try {
            await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 30000 });
        } catch (e) {
            console.log('   ⚠️ Navigasyon biraz yavaş, devam ediliyor...');
        }

        // Sitemizi bulana kadar sayfaları gez (İlk 10 sayfa - Agresif!)
        let found = false;
        for (let i = 0; i < 10; i++) {
            console.log(`   📄 ${useBing ? 'Bing' : 'Google'} Sayfa ${i + 1} taranıyor...`);

            // Sayfadaki linkleri kontrol et
            const links = await page.$$('a');
            for (const link of links) {
                const href = await page.evaluate(el => el.href, link);
                if (href && (href.includes(target.targetUrl) || href.includes(target.mainDomain))) {
                    console.log('   ✅ HEDEF BULUNDU! Tıklanıyor...');
                    // İnsan gibi kaydır ve tıkla
                    await page.evaluate((el) => el.scrollIntoView({ behavior: 'smooth', block: 'center' }), link);
                    await new Promise(r => setTimeout(r, 1000));
                    await link.click();
                    found = true;
                    break;
                }
            }

            if (found) break;

            // Sonraki sayfa
            const nextSelector = useBing ? 'a[title="Sonraki sayfa"]' : '#pnnext';
            const nextButton = await page.$(nextSelector);
            if (nextButton) {
                await nextButton.click();
                try {
                    await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 30000 });
                } catch (e) { }
                await new Promise(r => setTimeout(r, 3000));
            } else {
                break;
            }
        }

        if (found) {
            console.log('   🕒 Sitede 1-2 dakika vakit geçiriliyor (Human Session)...');
            // Rastgele kaydırma yap (İnsan gibi davran)
            for (let j = 0; j < 5; j++) {
                await page.evaluate(() => window.scrollBy(0, Math.floor(Math.random() * 500)));
                await new Promise(r => setTimeout(r, Math.random() * 10000 + 5000));
            }
            // Sitenin içindeki ana domaine tıkla (Backlink gücünü asıl siteye aktar)
            const mainLink = await page.$(`a[href*="${target.mainDomain}"]`);
            if (mainLink) {
                console.log(`   🚀 Ana siteye (${target.mainDomain}) geçiş yapılıyor...`);
                await mainLink.click();
                await page.waitForNavigation({ waitUntil: 'networkidle2' });
                await new Promise(r => setTimeout(r, 20000)); // Ana sitede de bekle
            }
        } else {
            console.log('   ❌ Hedef ilk 5 sayfada bulunamadı.');
        }

    } catch (error: any) {
        console.error('   ⚠️ Hata:', error.message);
    } finally {
        await browser.close();
        console.log('   🏁 Session bitti.\n');
    }
}

async function startBot() {
    console.log('\n╔══════════════════════════════════════════════════════════');
    console.log('║  🤖 NUCLEAR CTR BOOSTER v1.0');
    console.log('║  Google Aramalarını Manipüle Etme Başlıyor...');
    console.log('╚══════════════════════════════════════════════════════════\n');

    while (true) {
        for (const target of TARGETS) {
            await simulateHumanSearch(target);
            // Her arama arası rastgele bekle (Spam önlemi)
            const waitTime = Math.random() * 30000 + 30000;
            console.log(`💤 Sıradaki arama için ${Math.round(waitTime / 1000)} saniye bekleniyor...`);
            await new Promise(r => setTimeout(r, waitTime));
        }
    }
}

startBot();
