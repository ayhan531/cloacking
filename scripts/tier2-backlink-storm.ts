/**
 * 🕸️ TIER-2 BACKLINK STORM (Asalak SEO Güçlendirici)
 * Hedef: Medium, Blogger, Quora gibi yayınladığımız ana makalelere (Tier-1)
 * Telegraph, Rentry ve dpaste üzerinden çöp/spam backlink basarak
 * Medium/Blogger'ın otoritesini şaha kaldırmak.
 */

import axios from 'axios';

// ── YAYINLADIĞIMIZ ANA MAKALELER (TIER-1) ──────────────
const TIER_1_URLS = [
    {
        url: 'https://medium.com/@ibretlikvelet/2026-y%C4%B1l%C4%B1nda-yat%C4%B1r%C4%B1ms%C4%B1z-deneme-bonusu-2026-rehberi-kesin-kazan%C3%A7-taktikleri-653d44ad2333',
        kw: 'Yatırımsız Deneme Bonusu 2026 Medium',
        name: 'Medium Makalesi'
    },
    {
        url: 'https://denemebonusurehberi2026.blogspot.com/2026/03/2026-ylnda-guvenilir-bahis-siteleri.html',
        kw: 'Güvenilir Bahis Siteleri 2026 Blogger',
        name: 'Blogger Makalesi'
    },
    {
        url: 'https://qr.ae/pCdCGd',
        kw: 'Casino Deneme Bonusu 2026 Quora',
        name: 'Quora Cevabı'
    },
    {
        url: 'https://ayhan531.github.io/deneme-bonusu-2026/',
        kw: 'Deneme Bonusu 2026 Github',
        name: 'Github Pages'
    },
    {
        url: 'https://sites.google.com/view/yatirimsiz-deneme-bonusu-2026',
        kw: 'Yatırımsız Bonus 2026 Google Sites',
        name: 'Google Sites'
    }
];

// ── 1. TELEGRA.PH (Tier-2) ─────────────────────────────────────────────
async function createTelegraphTier2(targetSite: any): Promise<string[]> {
    const links: string[] = [];
    try {
        const acct = await axios.post('https://api.telegra.ph/createAccount', {
            short_name: 'Tier2_Boost',
            author_name: targetSite.name,
            author_url: targetSite.url
        }, { timeout: 10000 });

        const token = acct.data.result.access_token;
        const month = new Date().toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' });

        // 3 Tane Telegraph Basıyoruz her hedef için
        for (let i = 0; i < 3; i++) {
            await new Promise(r => setTimeout(r, 1000));
            const content = [
                { tag: 'h3', children: [`${targetSite.kw} - T2 Booster ${i + 1}`] },
                { tag: 'p', children: [`Kesinlikle okunması gereken harika bir kaynak bulundu. ${month} ayında en iyi taktikleri bu yazıda bulabilirsiniz.`] },
                { tag: 'p', children: [`Lütfen okuyun: `, { tag: 'a', attrs: { href: targetSite.url, target: '_blank', rel: 'dofollow' }, children: [`Buraya Tıklayın - ${targetSite.name}`] }] }
            ];

            const page = await axios.post('https://api.telegra.ph/createPage', {
                access_token: token,
                title: `${targetSite.kw} [T2]`.substring(0, 256),
                content: JSON.stringify(content),
                author_url: targetSite.url,
                return_content: false
            }, { timeout: 15000 });

            if (page.data.ok) links.push(page.data.result.url);
        }
    } catch (e: any) { }
    return links;
}

// ── 2. RENTRY.CO (Tier-2) ─────────────────────────────────────────────
async function createRentryTier2(targetSite: any): Promise<string[]> {
    const links: string[] = [];
    try {
        const month = new Date().toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' });

        for (let i = 0; i < 2; i++) {
            await new Promise(r => setTimeout(r, 1200));
            const csrf = await axios.get('https://rentry.co', { timeout: 8000 });
            const csrfMatch = csrf.data.match(/csrfmiddlewaretoken.*?value="([^"]+)"/);
            if (!csrfMatch) continue;
            const csrfToken = csrfMatch[1];
            const cookies = csrf.headers['set-cookie']?.join('; ') || '';

            const text = `# ${targetSite.kw} Destek Sayfası
            
Bu sayfa ${targetSite.name} için bir tier-2 destek ve indeksleme sayfasıdır. 
En iyi ve en güncel bilgiler için ana makalemize göz atın:

[${targetSite.name} Makalesine Git](${targetSite.url})

Güncelleme: ${month}`;

            const urlCode = `t2-${Date.now().toString(36)}`.substring(0, 20);
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
        }
    } catch { }
    return links;
}

// ── ANA ÇALIŞMA ───────────────────────────────────────────────
async function main() {
    console.log('\n╔══════════════════════════════════════════════════════════');
    console.log('║  🕸️ TIER-2 BACKLINK STORM (Asalak SEO Güçlendirici)');
    console.log('║  Medium, Blogger ve Quora linklerine backlink basılıyor...');
    console.log('╚══════════════════════════════════════════════════════════\n');

    const allTier2Links: string[] = [];

    for (const site of TIER_1_URLS) {
        console.log(`\n🛑 Hedef (Tier-1): ${site.name}`);
        console.log(`   URL: ${site.url}`);

        process.stdout.write('   📨 Telegraph (Tier-2)... ');
        const tLinks = await createTelegraphTier2(site);
        console.log(`✅ ${tLinks.length} link basıldı`);
        allTier2Links.push(...tLinks);

        process.stdout.write('   📝 Rentry.co (Tier-2)... ');
        const rLinks = await createRentryTier2(site);
        console.log(`✅ ${rLinks.length} link basıldı`);
        allTier2Links.push(...rLinks);

        await new Promise(r => setTimeout(r, 1000));
    }

    console.log('\n📡 Tier-2 Linkleri IndexNow ile Bing\'e Çakılıyor...');
    let pinged = 0;
    for (const link of allTier2Links) {
        try {
            await axios.get(`https://www.bing.com/indexnow?url=${encodeURIComponent(link)}&key=3a4b9c8d1e2f3g4h5i6j7k8l9m0n1o2p`, { timeout: 3000 });
            pinged++;
        } catch { }
        await new Promise(r => setTimeout(r, 200));
    }

    console.log('\n╔══════════════════════════════════════════════════════════');
    console.log(`║  ✅ TIER-2 STORM BİTTİ: Toplam ${allTier2Links.length} adet SPAM Link üretildi.`);
    console.log(`║  🚀 Tüm bu linklerin gücü Medium ve Blogger'a akacak!`);
    console.log(`║  🛡️ Senin ana bahis siten %100 güvende.`);
    console.log('╚══════════════════════════════════════════════════════════\n');
}

main().catch(console.error);
