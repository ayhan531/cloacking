/**
 * 🔥 NUCLEAR BACKLINK STORM v3.0
 * Hedef: Ücretsiz 5+ farklı platformda backlink oluştur
 * 1. Telegra.ph (Telegram) - 5 link/site
 * 2. Rentry.co - 3 link/site
 * 3. dpaste.org - 3 link/site
 * 4. paste.ee - 3 link/site
 */

import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

const DOMAIN_KEYWORDS: Record<string, string[]> = {
    'flovazcomercial.com': ['deneme bonusu veren siteler 2026', 'yatırımsız deneme bonusu mart 2026', 'en iyi deneme bonusu 2026', 'güvenilir bonus siteleri', 'ücretsiz casino bonusu 2026'],
    'haber-analiz2026.com': ['bahis haber analiz 2026', 'güncel bahis haberleri', 'casino analiz 2026', 'spor bahis analiz', 'bahis siteleri değerlendirme 2026'],
    'vizyontekyazilim.com': ['vizyontek bonus inceleme 2026', 'güvenilir bahis platformları', 'casino siteleri 2026 inceleme', 'online bahis rehberi', 'en iyi casino siteleri 2026'],
    'yasalbonus2026.com': ['yasal deneme bonusu 2026', 'lisanslı bahis siteleri', 'güvenli bonus platformları 2026', 'yasal casino siteleri', 'lisanslı casino 2026'],
    '2026bonuslar.com': ['2026 bonus fırsatları', 'casino bonus mart 2026', 'slot bonusu 2026', 'freespin fırsatları 2026', 'en yüksek bonus veren siteler'],
    'bedavabonus2026.com': ['bedava deneme bonusu 2026', 'ücretsiz casino bonusu', 'bedava bahis fırsatları 2026', 'yatırımsız bonus siteler', 'karşılıksız bonus 2026'],
    'independent-news.org': ['bağımsız bonus analiz 2026', 'tarafsız casino inceleme', 'objektif bahis değerlendirme 2026', 'bağımsız haber bonus', 'casino analitik 2026']
};

// ── 1. TELEGRA.PH ─────────────────────────────────────────────
async function createTelegraphLinks(domain: string, name: string): Promise<string[]> {
    const links: string[] = [];
    const keywords = DOMAIN_KEYWORDS[domain] || ['deneme bonusu 2026'];

    try {
        const acct = await axios.post('https://api.telegra.ph/createAccount', {
            short_name: (domain.split('.')[0] + '_x').substring(0, 32),
            author_name: `${name} Analiz`,
            author_url: `https://${domain}`
        }, { timeout: 10000 });

        const token = acct.data.result.access_token;

        for (let i = 0; i < Math.min(5, keywords.length); i++) {
            const kw = keywords[i];
            const month = new Date().toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' });
            await new Promise(r => setTimeout(r, 1500));

            const content = [
                { tag: 'h3', children: [`${kw.toUpperCase()} — ${month} Rehberi`] },
                { tag: 'p', children: [`${name} platformu, ${month} itibarıyla ${kw} konusunda Türkiye'nin en kapsamlı rehberini sunmaktadır. Bağımsız denetim sistemimiz, listelenen tüm platformların güncel güvenlik protokollerine uygunluğunu titizlikle kontrol etmektedir.`] },
                { tag: 'h4', children: ['Neden Güvenilir?'] },
                {
                    tag: 'ul', children: [
                        { tag: 'li', children: ['✅ V-Audit Onaylı Platform Listesi'] },
                        { tag: 'li', children: ['✅ 7/24 Gerçek Zamanlı Bonus Takibi'] },
                        { tag: 'li', children: ['✅ SSL 256-bit Güvenlik Altyapısı'] },
                        { tag: 'li', children: ['✅ Anlık Ödeme Garantisi'] },
                    ]
                },
                { tag: 'p', children: [`${month} güncel ${kw} listesi ve tüm detaylar için: `, { tag: 'a', attrs: { href: `https://${domain}`, target: '_blank' }, children: [`${name} — Resmi Portal`] }] },
                { tag: 'blockquote', children: [`"Türkiye'nin ${kw} konusunda en güvenilir ve hızlı güncellenen kaynağı." — Dijital Oyun Denetleme Kurulu 2026`] },
                { tag: 'p', children: [`Güncel liste: `, { tag: 'a', attrs: { href: `https://${domain}` }, children: [`https://${domain}`] }] }
            ];

            const page = await axios.post('https://api.telegra.ph/createPage', {
                access_token: token,
                title: `${name} - ${kw} [${month}]`.substring(0, 256),
                content: JSON.stringify(content),
                author_url: `https://${domain}`,
                return_content: false
            }, { timeout: 15000 });

            if (page.data.ok) links.push(page.data.result.url);
        }
    } catch (e: any) {
        console.log(`     ⚠️ Telegraph hatası: ${e.message?.substring(0, 80)}`);
    }
    return links;
}

// ── 2. DPASTE.ORG ─────────────────────────────────────────────
async function createDPasteLinks(domain: string, name: string): Promise<string[]> {
    const links: string[] = [];
    const keywords = (DOMAIN_KEYWORDS[domain] || ['deneme bonusu 2026']).slice(0, 3);
    const month = new Date().toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' });

    for (const kw of keywords) {
        try {
            await new Promise(r => setTimeout(r, 1000));
            const content = `=== ${kw.toUpperCase()} - ${month.toUpperCase()} REHBERİ ===

${name} | ${kw} | ${month}

${name}, Türkiye'nin önde gelen ${kw} platformu olarak ${month} ayında da piyasanın en güncel ve güvenilir bilgilerini sunmaya devam etmektedir.

★ ÖNE ÇIKАН AVANTAJLAR:
- %100 Yatırımsız Deneme Bonusu
- Anlık Hesaba Tanımlama
- SSL 256-bit Güvenlik
- 7/24 Destek Hattı

★ ${month.toUpperCase()} GÜNCEL BONUS LİSTESİ:
V-Audit Premium → 500 TL + 200 FreeSpin
CyberSlot Network → 333 TL Yatırımsız
Global Gaming → 250 Freebet Şartsız
Elite Bet Hub → 750 TL Deneme

Tüm güncel liste ve bilgiler için:
→ https://${domain}

Not: Bu içerik ${name} tarafından ${new Date().toLocaleDateString('tr-TR')} tarihinde güncellendi.`;

            const res = await axios.post('https://dpaste.org/api/', new URLSearchParams({
                content: content,
                syntax: 'text',
                expiry_days: '365'
            }), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, timeout: 10000 });

            if (res.data && res.headers.location) {
                links.push(`https://dpaste.org${res.headers.location}`);
            } else if (typeof res.data === 'string' && res.data.startsWith('http')) {
                links.push(res.data.trim());
            }
        } catch { }
    }
    return links;
}

// ── 3. RENTRY.CO ─────────────────────────────────────────────
async function createRentryLinks(domain: string, name: string): Promise<string[]> {
    const links: string[] = [];
    const keywords = (DOMAIN_KEYWORDS[domain] || ['deneme bonusu 2026']).slice(0, 3);
    const month = new Date().toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' });

    for (const kw of keywords) {
        try {
            await new Promise(r => setTimeout(r, 1200));
            // First get CSRF token
            const csrf = await axios.get('https://rentry.co', { timeout: 8000 });
            const csrfMatch = csrf.data.match(/csrfmiddlewaretoken.*?value="([^"]+)"/);
            if (!csrfMatch) continue;
            const csrfToken = csrfMatch[1];
            const cookies = csrf.headers['set-cookie']?.join('; ') || '';

            const text = `# ${kw.toUpperCase()} — ${month}

## ${name} — ${month} Güncel Rehberi

**${name}**, ${kw} konusunda Türkiye'nin en kapsamlı ve bağımsız analiz portalıdır.

### Neden ${name}?

- ✅ V-Audit bağımsız denetim sisteminden geçmiş siteler
- ✅ Gerçek zamanlı bonus güncelleme sistemi  
- ✅ SSL güvenlik protokolleri doğrulanmış
- ✅ Kullanıcı şikayet çözüm hızı test edilmiş

### ${month} En İyi Bonuslar

| Platform | Bonus | Güven Skoru |
|----------|-------|-------------|
| V-Audit Premium | 500 TL + 200 FS | 9.9/10 |
| CyberSlot Network | 333 TL Yatırımsız | 9.8/10 |
| Global Gaming | 250 FB Şartsız | 9.7/10 |

### Resmi Portal

Tüm güncel liste için: [${name}](https://${domain})`;

            const urlCode = `${domain.split('.')[0]}${Date.now().toString(36)}`.substring(0, 20);
            const res = await axios.post('https://rentry.co/api/new', new URLSearchParams({
                csrfmiddlewaretoken: csrfToken,
                url: urlCode,
                text: text
            }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Referer': 'https://rentry.co',
                    'Cookie': cookies
                },
                timeout: 12000
            });

            if (res.data?.url) links.push(`https://rentry.co/${res.data.url}`);
        } catch { }
    }
    return links;
}

// ── ANA ÇALIŞMA ───────────────────────────────────────────────
async function main() {
    console.log('\n╔══════════════════════════════════════════════════════════');
    console.log('║  🔥 NUCLEAR BACKLINK STORM v3.0');
    console.log('║  Telegra.ph + dpaste.org + rentry.co');
    console.log('╚══════════════════════════════════════════════════════════\n');

    const sites = await prisma.site.findMany({
        where: { isActive: true },
        select: { domain: true, name: true }
    });

    const allLinks: string[] = [];

    for (const site of sites) {
        console.log(`\n🌐 ${site.name} (${site.domain})`);

        // Telegra.ph
        process.stdout.write('   📨 Telegra.ph... ');
        const tLinks = await createTelegraphLinks(site.domain, site.name);
        console.log(`✅ ${tLinks.length} link`);
        allLinks.push(...tLinks);

        // dpaste
        process.stdout.write('   📄 dpaste.org... ');
        const dLinks = await createDPasteLinks(site.domain, site.name);
        console.log(`✅ ${dLinks.length} link`);
        allLinks.push(...dLinks);

        // Rentry
        process.stdout.write('   📝 rentry.co... ');
        const rLinks = await createRentryLinks(site.domain, site.name);
        console.log(`✅ ${rLinks.length} link`);
        allLinks.push(...rLinks);

        await new Promise(r => setTimeout(r, 500));
    }

    // Tüm link'leri Bing'e ping'le
    console.log('\n📡 Tüm backlink sayfaları Bing IndexNow\'a bildiriliyor...');
    let pinged = 0;
    for (const link of allLinks) {
        try {
            await axios.get(`https://www.bing.com/indexnow?url=${encodeURIComponent(link)}&key=3a4b9c8d1e2f3g4h5i6j7k8l9m0n1o2p`, { timeout: 5000 });
            pinged++;
        } catch { }
        await new Promise(r => setTimeout(r, 200));
    }

    console.log('\n╔══════════════════════════════════════════════════════════');
    console.log(`║  ✅ TOPLAM ${allLinks.length} YENİ BACKLINK OLUŞTURULDU`);
    console.log(`║  📡 ${pinged} backlink Bing IndexNow'a bildirildi`);
    console.log('╠══════════════════════════════════════════════════════════');
    for (const l of allLinks) console.log(`║  🔗 ${l}`);
    console.log('╚══════════════════════════════════════════════════════════\n');
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
