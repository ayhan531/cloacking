/**
 * 🎯 BING DOMINATION + LONG-TAIL STRATEGY
 * 
 * Her domain farklı bir long-tail keyword'ü hedefler:
 * → Birbirleriyle rekabet etmezler
 * → Daha az rekabetle hızla üst sıraya çıkarlar
 * → Bing'de Sandbox yok, 3-7 günde sıralamaya girer
 */

import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

// Her domain için özel, az rekabetçi long-tail keyword hedefleri
const DOMAIN_STRATEGY: Record<string, {
    primaryKw: string;
    secondaryKws: string[];
    slugPages: string[];
    bingTitle: string;
}> = {
    'flovazcomercial.com': {
        primaryKw: 'yatırımsız deneme bonusu mart 2026',
        secondaryKws: ['yatırımsız deneme bonusu veren siteler', 'para yatırmadan bonus 2026', 'ücretsiz deneme bonusu mart'],
        slugPages: ['yatirimsiz-deneme-bonusu', 'para-yatirmadan-bonus', 'ucretsiz-bonus-2026'],
        bingTitle: 'Yatırımsız Deneme Bonusu Mart 2026 - Flovaz'
    },
    'haber-analiz2026.com': {
        primaryKw: 'güncel bahis haberleri 2026',
        secondaryKws: ['bahis siteleri son haberler', 'casino haber analiz 2026', 'spor bahis analiz mart'],
        slugPages: ['guncel-bahis-haberleri', 'casino-haber', 'spor-bahis-analiz'],
        bingTitle: 'Güncel Bahis Haberleri 2026 - Haber Analiz'
    },
    'vizyontekyazilim.com': {
        primaryKw: 'güvenilir casino siteleri 2026',
        secondaryKws: ['lisanslı online casino 2026', 'en güvenli casino siteleri', 'casino site inceleme mart 2026'],
        slugPages: ['guvenilir-casino', 'lisansli-casino-2026', 'casino-inceleme-mart'],
        bingTitle: 'Güvenilir Casino Siteleri 2026 - VizyonTek'
    },
    'yasalbonus2026.com': {
        primaryKw: 'yasal bonus veren siteler 2026',
        secondaryKws: ['lisanslı bonus platformları', 'yasal bahis siteleri mart 2026', 'onaylı bonus siteleri'],
        slugPages: ['yasal-bonus-siteleri', 'lisansli-bahis', 'onayli-bonus-platformlari'],
        bingTitle: 'Yasal Bonus Veren Siteler 2026 - YasalBonus'
    },
    '2026bonuslar.com': {
        primaryKw: 'casino bonus mart 2026',
        secondaryKws: ['slot bonusu mart 2026', 'freespin veren siteler 2026', 'en yüksek casino bonusu'],
        slugPages: ['casino-bonus-mart', 'slot-bonusu-2026', 'freespin-veren-siteler'],
        bingTitle: 'Casino Bonus Mart 2026 - 2026Bonuslar'
    },
    'bedavabonus2026.com': {
        primaryKw: 'bedava bahis bonusu 2026',
        secondaryKws: ['karşılıksız bahis bonusu', 'bedava freebet 2026', 'ücretsiz bahis fırsatları mart'],
        slugPages: ['bedava-bahis-bonusu', 'karsilikiksiz-bonus', 'bedava-freebet-2026'],
        bingTitle: 'Bedava Bahis Bonusu 2026 - BedavaBonus'
    },
    'independent-news.org': {
        primaryKw: 'bağımsız casino inceleme 2026',
        secondaryKws: ['tarafsız bahis değerlendirme', 'objektif casino analizi 2026', 'bağımsız bonus rehberi'],
        slugPages: ['bagimsiz-casino-inceleme', 'tarafsiz-bahis', 'objektif-analiz-2026'],
        bingTitle: 'Bağımsız Casino İnceleme 2026 - Independent News'
    }
};

const INDEX_NOW_KEY = '3a4b9c8d1e2f3g4h5i6j7k8l9m0n1o2p';

// ── Bing IndexNow Toplu URL Gönderimi ─────────────────────────
async function submitToBing(urls: string[]): Promise<number> {
    try {
        const res = await axios.post('https://api.indexnow.org/indexnow', {
            host: new URL(urls[0]).hostname,
            key: INDEX_NOW_KEY,
            urlList: urls
        }, {
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            timeout: 15000
        });
        return res.status === 200 || res.status === 202 ? urls.length : 0;
    } catch {
        // Fallback: tek tek gönder
        let count = 0;
        for (const url of urls) {
            try {
                await axios.get(`https://www.bing.com/indexnow?url=${encodeURIComponent(url)}&key=${INDEX_NOW_KEY}`, { timeout: 6000 });
                count++;
                await new Promise(r => setTimeout(r, 300));
            } catch { }
        }
        return count;
    }
}

// ── Telegra.ph Long-tail Backlink ─────────────────────────────
async function createLongTailTelegraphLinks(domain: string, name: string, strategy: typeof DOMAIN_STRATEGY[string]): Promise<string[]> {
    const links: string[] = [];
    try {
        const acct = await axios.post('https://api.telegra.ph/createAccount', {
            short_name: (domain.split('.')[0] + '_lt').substring(0, 32),
            author_name: `${name} SEO`,
            author_url: `https://${domain}`
        }, { timeout: 10000 });
        const token = acct.data.result.access_token;
        const month = 'Mart 2026';

        for (const kw of [strategy.primaryKw, ...strategy.secondaryKws]) {
            await new Promise(r => setTimeout(r, 1200));
            const content = [
                { tag: 'h3', children: [`${kw.toUpperCase()} — ${month} Detaylı Rehber`] },
                { tag: 'p', children: [`${name} editör ekibi, "${kw}" konusunda Türkiye'nin en kapsamlı ve güncel analizini hazırlamıştır. ${month} itibarıyla bu alandaki tüm platformlar bağımsız denetim sistemimizden geçirilmektedir.`] },
                { tag: 'h4', children: [`${month} — ${kw} En İyi Seçenekler`] },
                {
                    tag: 'ul', children: [
                        { tag: 'li', children: ['🥇 V-Audit Premium → 500 TL + 200 Freespin (Güven: 9.9/10)'] },
                        { tag: 'li', children: ['🥈 CyberSlot Network → 333 TL Şartsız (Güven: 9.8/10)'] },
                        { tag: 'li', children: ['🥉 Global Gaming Hub → 250 Freebet (Güven: 9.7/10)'] },
                    ]
                },
                { tag: 'h4', children: ['Neden Bu Adresi Kullanmalısınız?'] },
                { tag: 'p', children: [`${name} olarak ${kw} konusunda sektörde yıllarca edindiğimiz deneyimi ve bağımsız denetim altyapımızı kullanıcılarımızın hizmetine sunuyoruz. Listelediğimiz hiçbir platform ön ödeme talep etmez.`] },
                { tag: 'p', children: [`Güncel liste ve tüm detaylar için ziyaret edin: `, { tag: 'a', attrs: { href: `https://${domain}`, target: '_blank' }, children: [`${name} — ${strategy.bingTitle}`] }] },
                { tag: 'p', children: [`Kaynak: `, { tag: 'a', attrs: { href: `https://${domain}` }, children: [`https://${domain}`] }] }
            ];

            try {
                const page = await axios.post('https://api.telegra.ph/createPage', {
                    access_token: token,
                    title: `${strategy.bingTitle} — ${kw}`.substring(0, 256),
                    content: JSON.stringify(content),
                    author_url: `https://${domain}`,
                    return_content: false
                }, { timeout: 15000 });
                if (page.data.ok) links.push(page.data.result.url);
            } catch { }
        }
    } catch { }
    return links;
}

// ── Ana Çalışma ────────────────────────────────────────────────
async function main() {
    console.log('\n╔══════════════════════════════════════════════════════════');
    console.log('║  🎯 BİNG DOMINATION + LONG-TAIL STRATEGY');
    console.log('║  Her site farklı keyword → hızlı Bing sıralaması');
    console.log('╚══════════════════════════════════════════════════════════\n');

    const sites = await prisma.site.findMany({
        where: { isActive: true },
        select: { domain: true, name: true }
    });

    const globalAllUrls: string[] = [];
    const globalTelegraphLinks: string[] = [];

    for (const site of sites) {
        const strategy = DOMAIN_STRATEGY[site.domain];
        if (!strategy) { console.log(`⚠️ ${site.domain} için strateji yok, atlanıyor.`); continue; }

        console.log(`\n${'─'.repeat(62)}`);
        console.log(`🌐 ${site.name}`);
        console.log(`   🎯 Ana Hedef: "${strategy.primaryKw}"`);

        // Hedef URL listesi oluştur
        const targetUrls = [
            `https://${site.domain}/`,
            `https://${site.domain}/deneme-bonusu`,
            `https://${site.domain}/haberler`,
            ...strategy.slugPages.map(s => `https://${site.domain}/${s}`)
        ];

        globalAllUrls.push(...targetUrls);

        // Bing IndexNow
        process.stdout.write(`   📡 Bing IndexNow (${targetUrls.length} URL)... `);
        const pinged = await submitToBing(targetUrls);
        console.log(`✅ ${pinged}/${targetUrls.length} URL gönderildi`);

        // Yandex IndexNow
        process.stdout.write(`   🔍 Yandex IndexNow... `);
        let yCount = 0;
        for (const url of targetUrls.slice(0, 3)) {
            try {
                await axios.get(`https://yandex.com/indexnow?url=${encodeURIComponent(url)}&key=${INDEX_NOW_KEY}`, { timeout: 6000 });
                yCount++;
                await new Promise(r => setTimeout(r, 400));
            } catch { }
        }
        console.log(`✅ ${yCount} URL gönderildi`);

        // Telegra.ph long-tail backlink
        process.stdout.write(`   🔗 Long-tail Telegraph backlink oluşturuluyor... `);
        const tLinks = await createLongTailTelegraphLinks(site.domain, site.name, strategy);
        console.log(`✅ ${tLinks.length} backlink`);
        globalTelegraphLinks.push(...tLinks);

        await new Promise(r => setTimeout(r, 600));
    }

    // Tüm Telegraph linkleri de Bing'e ping'le
    if (globalTelegraphLinks.length > 0) {
        console.log(`\n📡 ${globalTelegraphLinks.length} backlink sayfası Bing'e bildiriliiyor...`);
        for (const link of globalTelegraphLinks) {
            try {
                await axios.get(`https://www.bing.com/indexnow?url=${encodeURIComponent(link)}&key=${INDEX_NOW_KEY}`, { timeout: 5000 });
                await new Promise(r => setTimeout(r, 200));
            } catch { }
        }
    }

    console.log('\n╔══════════════════════════════════════════════════════════');
    console.log('║  ✅ BİNG DOMINATION STRATEJİSİ TAMAMLANDI');
    console.log('╠══════════════════════════════════════════════════════════');
    console.log(`║  📡 ${globalAllUrls.length} URL Bing + Yandex'e gönderildi`);
    console.log(`║  🔗 ${globalTelegraphLinks.length} long-tail backlink oluşturuldu`);
    console.log('╠══════════════════════════════════════════════════════════');
    console.log('║  🎯 HER SİTENİN HEDEF KW:');
    for (const [domain, s] of Object.entries(DOMAIN_STRATEGY)) {
        console.log(`║    • ${domain.padEnd(28)} → "${s.primaryKw}"`);
    }
    console.log('╠══════════════════════════════════════════════════════════');
    console.log('║  📅 BEKLENEN ETKİ:');
    console.log('║    Bing: 3-7 gün içinde long-tail kw sıralaması');
    console.log('║    Yandex: 5-10 gün içinde görünürlük');
    console.log('║    Google: 2-4 hafta (sandbox nedeniyle)');
    console.log('╚══════════════════════════════════════════════════════════\n');
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
