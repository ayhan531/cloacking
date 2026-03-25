/**
 * 💣 NUCLEAR BACKLINK BUILDER v2.0
 * Platform: Telegra.ph (x3) + Rentry.co (x2) + Paste.fo (x2)
 * Her site için 7 backlink = Toplam 49 dofollow/nofollow karışık backlink
 * Oluşturulan tüm backlink URL'leri Bing + Yandex IndexNow ile anında ping'lenir
 */

import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();
const INDEX_NOW_KEY = '3a4b9c8d1e2f3g4h5i6j7k8l9m0n1o2p';

const KW_POOL = [
    'deneme bonusu veren siteler 2026',
    'yatırımsız deneme bonusu',
    'çevrimsiz freebet 2026',
    'güvenilir bahis siteleri',
    'bedava casino bonusu 2026',
    'yeni açılan casino siteleri 2026',
    'en yüksek deneme bonusu veren siteler',
];

// ─── Telegraph ────────────────────────────────────────────────
async function telegraphCreate(domain: string, name: string, kw: string): Promise<string | null> {
    try {
        const accRes = await axios.post('https://api.telegra.ph/createAccount', {
            short_name: (domain.split('.')[0] + Math.random().toString(36).substring(2, 6)).substring(0, 32),
            author_name: name,
            author_url: `https://${domain}`
        }, { timeout: 10000 });
        const token = accRes.data.result.access_token;

        const month = new Intl.DateTimeFormat('tr-TR', { month: 'long', year: 'numeric' }).format(new Date());
        const title = `${month} - ${kw.charAt(0).toUpperCase() + kw.slice(1)} Rehberi`;
        const content = JSON.stringify([
            { tag: 'h3', children: [`🔥 ${title}`] },
            { tag: 'p', children: [`2026 yılında **${kw}** arayanlar için en doğru kaynak. Piyasada yüzlerce sahte liste varken ${name} bağımsız denetim platformu gerçek verileri sunuyor.`] },
            { tag: 'h4', children: ['En Popüler Seçenekler (Mart 2026)'] },
            { tag: 'ul', children: [
                { tag: 'li', children: ['✅ Yatırımsız 500 TL — Anlık Tanımlama'] },
                { tag: 'li', children: ['✅ 200 Free Spin — Çevrim Şartsız'] },
                { tag: 'li', children: ['✅ Kripto ile Ekstra %20 Bonus'] },
            ]},
            { tag: 'p', children: [
                'Güncel listeye ulaşmak için: ',
                { tag: 'a', attrs: { href: `https://${domain}`, target: '_blank' }, children: [`${name} — Resmi Portal`] }
            ]},
            { tag: 'blockquote', children: [`"${name} tarafından derlenen liste, 2026'nın en güvenilir ${kw} kaynağıdır." — Türkiye Dijital Oyun Denetleme`] },
            { tag: 'p', children: [`🔗 `, { tag: 'a', attrs: { href: `https://${domain}`, target: '_blank' }, children: [`https://${domain}`] }] },
        ]);

        await new Promise(r => setTimeout(r, 1500));
        const pageRes = await axios.post('https://api.telegra.ph/createPage', {
            access_token: token, title: title.substring(0, 256),
            content, author_url: `https://${domain}`, return_content: false
        }, { timeout: 15000 });
        return pageRes.data.result.url;
    } catch { return null; }
}

// ─── Rentry.co ────────────────────────────────────────────────
async function rentryCreate(domain: string, name: string, kw: string): Promise<string | null> {
    try {
        const slug = `${domain.split('.')[0]}-${kw.replace(/\s+/g, '-').substring(0, 20)}-${Math.random().toString(36).substring(2, 6)}`;
        const month = new Intl.DateTimeFormat('tr-TR', { month: 'long', year: 'numeric' }).format(new Date());
        const text = `# ${month} ${kw.charAt(0).toUpperCase() + kw.slice(1)} — ${name}

**${kw}** konusunda 2026'nın en güvenilir içeriği burada.

## Neden ${name}?
- ✅ Bağımsız denetimden geçmiş listeler
- ✅ Anlık güncellenen kampanyalar
- ✅ %100 yatırımsız seçenekler

## Mart 2026 Özel Kampanyalar
| Platform | Bonus | Şart |
|---|---|---|
| V-Audit Premium | 500 TL | Çevrimsiz |
| CyberSlot Net | 333 TL | Yatırımsız |
| Global Gaming | 250 Freebet | Şartsız |

**Resmi Portal:** [${name}](https://${domain})

---
*Bu içerik ${name} tarafından ${month} tarihinde güncellenmiştir.*
🔗 https://${domain}`;

        const res = await axios.post('https://rentry.co/api/new', { text, edit_code: Math.random().toString(36).substring(2, 12) }, {
            headers: { 'Referer': 'https://rentry.co', 'Content-Type': 'application/x-www-form-urlencoded' },
            timeout: 12000
        });
        if (res.data?.url) return res.data.url;
        return null;
    } catch { return null; }
}

// ─── Paste.fo ─────────────────────────────────────────────────
async function pastefoCreate(domain: string, name: string, kw: string): Promise<string | null> {
    try {
        const month = new Intl.DateTimeFormat('tr-TR', { month: 'long', year: 'numeric' }).format(new Date());
        const content = `${month} - ${kw.toUpperCase()} REHBERİ

${name} tarafından hazırlanmıştır.

2026 yılında ${kw} arayanlar için en kapsamlı analiz platformu.

Neden Biz?
- Tüm siteler V-Audit bağımsız sisteminden geçer
- Anlık güncellenen bonus tutarları
- %100 lisanslı ve denetimli platformlar

Öne Çıkan Fırsatlar:
* 500 TL Yatırımsız Deneme Bonusu
* 200 Çevrimsiz Free Spin
* Kripto ile +%20 Ekstra Bonus

Resmi site: https://${domain}
Kaynak: ${name} Otorite Portalı ${new Date().toISOString()}`;

        const fd = new URLSearchParams();
        fd.append('content', content);
        fd.append('title', `${name} - ${kw}`);
        fd.append('visibility', 'public');

        const res = await axios.post('https://paste.fo', fd.toString(), {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            maxRedirects: 0, timeout: 10000,
            validateStatus: s => s < 400
        });
        const loc = res.headers['location'];
        return loc ? `https://paste.fo${loc}` : null;
    } catch { return null; }
}

// ─── IndexNow Ping ────────────────────────────────────────────
async function pingIndexNow(urls: string[]) {
    const checkUrls = urls.filter(Boolean);
    if (!checkUrls.length) return;
    for (const url of checkUrls) {
        const domain = new URL(url).hostname;
        await axios.post('https://api.indexnow.org/indexnow', {
            host: domain, key: INDEX_NOW_KEY,
            keyLocation: `https://${domain}/${INDEX_NOW_KEY}.txt`,
            urlList: [url]
        }, { headers: { 'Content-Type': 'application/json' }, timeout: 8000 }).catch(() => {});
        await new Promise(r => setTimeout(r, 300));
    }
}

// ─── MAIN ─────────────────────────────────────────────────────
async function main() {
    console.log('\n╔══════════════════════════════════════════════════════════');
    console.log('║  💣 NUCLEAR BACKLINK BUILDER v2.0');
    console.log('║  Telegraph x3 + Rentry x2 + Paste.fo x2 = 7 link/site');
    console.log('╚══════════════════════════════════════════════════════════\n');

    const sites = await prisma.site.findMany({
        where: { isActive: true },
        select: { domain: true, name: true }
    });

    const allLinks: string[] = [];
    let totalOk = 0;

    for (const site of sites) {
        console.log(`\n🌐 ${site.name} (${site.domain})`);
        const links: string[] = [];

        // Telegraph x3
        for (let i = 0; i < 3; i++) {
            const kw = KW_POOL[Math.floor(Math.random() * KW_POOL.length)];
            const url = await telegraphCreate(site.domain, site.name, kw);
            if (url) { console.log(`   ✅ Telegraph [${i+1}/3]: ${url}`); links.push(url); totalOk++; }
            else { console.log(`   ❌ Telegraph [${i+1}/3]: Hata`); }
            await new Promise(r => setTimeout(r, 1200));
        }

        // Rentry x2
        for (let i = 0; i < 2; i++) {
            const kw = KW_POOL[Math.floor(Math.random() * KW_POOL.length)];
            const url = await rentryCreate(site.domain, site.name, kw);
            if (url) { console.log(`   ✅ Rentry    [${i+1}/2]: ${url}`); links.push(url); totalOk++; }
            else { console.log(`   ❌ Rentry    [${i+1}/2]: Hata`); }
            await new Promise(r => setTimeout(r, 1000));
        }

        // Paste.fo x2
        for (let i = 0; i < 2; i++) {
            const kw = KW_POOL[Math.floor(Math.random() * KW_POOL.length)];
            const url = await pastefoCreate(site.domain, site.name, kw);
            if (url) { console.log(`   ✅ Paste.fo  [${i+1}/2]: ${url}`); links.push(url); totalOk++; }
            else { console.log(`   ❌ Paste.fo  [${i+1}/2]: Hata`); }
            await new Promise(r => setTimeout(r, 800));
        }

        // Oluşturulan backlinkleri IndexNow ile ping'le
        console.log(`   📡 ${links.length} backlink IndexNow'a bildirildi...`);
        await pingIndexNow(links);
        allLinks.push(...links);
        await new Promise(r => setTimeout(r, 1000));
    }

    console.log('\n\n╔══════════════════════════════════════════════════════════');
    console.log(`║  🏁 TOPLAM ${totalOk} BACKLINK OLUŞTURULDU (${sites.length} site × 7 = hedef ${sites.length * 7})`);
    console.log('╠══════════════════════════════════════════════════════════');
    for (const l of allLinks) console.log(`║  🔗 ${l}`);
    console.log('╚══════════════════════════════════════════════════════════\n');
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
