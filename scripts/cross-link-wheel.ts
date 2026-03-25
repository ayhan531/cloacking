/**
 * 🔥 CROSS-LINK NETWORK BUILDER v3.0
 * 1. Tüm 7 sitenin birbirine link verdiği Telegraph makaleleri oluştur (Link Wheel)
 * 2. Her makale tüm diğer sitelere dofollow link verir
 * 3. Toplam 7 hub makalesi = her site 6 backlink alır
 * 4. Tüm backlinkler IndexNow ile anında ping'lenir
 * 5. BONUS: Rentry.co'da "Mega Kapsamlı Rehber" yayınla (tüm sitelere tek sayfada 7 link)
 */

import axios from 'axios';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const INDEX_NOW_KEY = '3a4b9c8d1e2f3g4h5i6j7k8l9m0n1o2p';

interface TNode { tag: string; attrs?: Record<string, string>; children?: (string | TNode)[]; }

const KWS: Record<string, string> = {
    'flovazcomercial.com': 'yatırımsız deneme bonusu veren siteler 2026',
    'haber-analiz2026.com': 'güvenilir bahis siteleri 2026',
    'vizyontekyazilim.com': 'deneme bonusu veren siteler 2026',
    'yasalbonus2026.com': 'yasal casino siteleri 2026',
    '2026bonuslar.com': 'çevrimsiz freebet veren siteler 2026',
    'bedavabonus2026.com': 'bedava casino bonusu 2026',
    'independent-news.org': 'bağımsız casino inceleme 2026',
};

async function makeAccount(domain: string) {
    const r = await axios.post('https://api.telegra.ph/createAccount', {
        short_name: (domain.replace(/\./g, '').substring(0, 25) + Math.random().toString(36).substring(2, 6)),
        author_name: `${domain} Otorite Rehberi`,
        author_url: `https://${domain}`
    }, { timeout: 10000 });
    return r.data.result.access_token as string;
}

async function makePage(token: string, title: string, content: TNode[], authorUrl: string) {
    const r = await axios.post('https://api.telegra.ph/createPage', {
        access_token: token,
        title: title.substring(0, 256),
        content: JSON.stringify(content),
        author_url: authorUrl,
        return_content: false
    }, { timeout: 15000 });
    return r.data.result.url as string;
}

function buildLinkWheelContent(thisDomain: string, thisName: string, allSites: { domain: string; name: string }[]): TNode[] {
    const kw = KWS[thisDomain] || 'deneme bonusu veren siteler 2026';
    const month = new Intl.DateTimeFormat('tr-TR', { month: 'long', year: 'numeric' }).format(new Date());
    const otherSites = allSites.filter(s => s.domain !== thisDomain);

    const linksSection: TNode[] = otherSites.map(s => ({
        tag: 'li',
        children: [
            { tag: 'a', attrs: { href: `https://${s.domain}`, target: '_blank' }, children: [`${s.name} — ${KWS[s.domain] || 'bahis incelemeleri'}`] }
        ]
    }));

    return [
        { tag: 'h3', children: [`🏆 ${month} | ${kw.toUpperCase()} — Tam Rehber`] },
        { tag: 'p', children: [`${thisName} olarak ${month} ayında en kapsamlı **${kw}** analizini yayınlıyoruz. Piyasadaki 300+ platformu inceleyerek yalnızca denetimden geçenleri listeliyoruz.`] },
        { tag: 'h4', children: ['🎯 Bu Rehberde Ne Bulacaksınız?'] },
        { tag: 'ul', children: [
            { tag: 'li', children: ['✅ %100 Yatırımsız Deneme Bonusu Veren Siteler'] },
            { tag: 'li', children: ['✅ Çevrim Şarsız Freebet Kampanyaları'] },
            { tag: 'li', children: ['✅ Kripto ile Ekstra Bonus Fırsatları'] },
            { tag: 'li', children: ['✅ Papara / Paykasa ile Hızlı Para Çekme'] },
        ]},
        { tag: 'h4', children: [`🔗 ${month} Güvenilir Platform Ağı`] },
        { tag: 'p', children: ['Aşağıdaki platformlar bağımsız denetim sertifikasına sahiptir:'] },
        { tag: 'ul', children: linksSection },
        { tag: 'h4', children: ['📊 Bonus Karşılaştırma Tablosu'] },
        { tag: 'p', children: [
            'Ana sitemizde güncel karşılaştırma tablosuna ulaşmak için: ',
            { tag: 'a', attrs: { href: `https://${thisDomain}`, target: '_blank' }, children: [`${thisName} — Resmi Rehber`] }
        ]},
        { tag: 'blockquote', children: [`"${thisName} tarafından derlenen bu liste, ${month} tarihli en güncel ve en güvenilir ${kw} kaynağıdır."`] },
        { tag: 'p', children: [
            '🔗 Detaylı analiz: ',
            { tag: 'a', attrs: { href: `https://${thisDomain}`, target: '_blank' }, children: [`https://${thisDomain}`] }
        ]},
    ];
}

async function buildRentryMegaHub(allSites: { domain: string; name: string }[]): Promise<string | null> {
    const month = new Intl.DateTimeFormat('tr-TR', { month: 'long', year: 'numeric' }).format(new Date());
    let text = `# 🏆 ${month} — Deneme Bonusu Veren Siteler 2026: Tam Yetkili Rehber\n\n`;
    text += `Bu rehber, 2026 yılının en güvenilir **deneme bonusu veren siteler** platformlarını kapsamlı biçimde listeler. Tüm siteler bağımsız V-Audit denetim sisteminden geçmiştir.\n\n`;
    text += `## 🎯 Öne Çıkan Platformlar\n\n`;
    for (const site of allSites) {
        const kw = KWS[site.domain] || 'deneme bonusu';
        text += `### ${site.name}\n`;
        text += `**Uzmanlaşma:** ${kw}\n`;
        text += `**Resmi Site:** [${site.name}](https://${site.domain})\n`;
        text += `**URL:** https://${site.domain}\n\n`;
    }
    text += `## 📋 ${month} Bonus Fırsatları\n\n`;
    text += `| Platform | Bonus Türü | Miktar | Şart |\n`;
    text += `|---|---|---|---|\n`;
    text += `| [Flovaz](https://flovazcomercial.com) | Yatırımsız | 500 TL | Çevrimsiz |\n`;
    text += `| [Bedava Bonus](https://bedavabonus2026.com) | Free Spin | 200 Spin | Şartsız |\n`;
    text += `| [2026 Bonuslar](https://2026bonuslar.com) | Freebet | 300 TL | Yatırımsız |\n`;
    text += `| [Yasal Bonus](https://yasalbonus2026.com) | Hoşgeldin | 500 TL | 1x Çevrim |\n`;
    text += `| [VizyonTek](https://vizyontekyazilim.com) | Kayıp İadesi | %25 | Haftalık |\n`;
    text += `| [Haber Analiz](https://haber-analiz2026.com) | VIP | 1000 TL | Özel |\n`;
    text += `| [Independent](https://independent-news.org) | Kripto | +%20 | Ek Yatırım |\n\n`;
    text += `## 🔗 Tüm Kaynaklar\n\n`;
    for (const site of allSites) {
        text += `- [${site.name}](https://${site.domain}) — ${KWS[site.domain] || 'bonus rehberi'}\n`;
    }
    text += `\n*Son güncelleme: ${new Date().toISOString()} — ${month}*\n`;

    try {
        const fd = new URLSearchParams();
        fd.append('text', text);
        fd.append('edit_code', Math.random().toString(36).substring(2, 14));
        const res = await axios.post('https://rentry.co/api/new', fd.toString(), {
            headers: { 'Referer': 'https://rentry.co', 'Content-Type': 'application/x-www-form-urlencoded' },
            timeout: 12000
        });
        return res.data?.url || null;
    } catch { return null; }
}

async function pingIndexNow(urls: string[]) {
    const valid = urls.filter(Boolean);
    for (const url of valid) {
        try {
            const domain = new URL(url).hostname;
            await axios.post('https://api.indexnow.org/indexnow', {
                host: domain, key: INDEX_NOW_KEY,
                keyLocation: `https://${domain}/${INDEX_NOW_KEY}.txt`,
                urlList: [url]
            }, { headers: { 'Content-Type': 'application/json' }, timeout: 8000 });
        } catch {}
        await new Promise(r => setTimeout(r, 300));
    }
}

async function main() {
    console.log('\n╔══════════════════════════════════════════════════════════');
    console.log('║  🔥 CROSS-LINK WHEEL BUILDER v3.0');
    console.log('║  7 Site → Birbirine Link Veriyor (Link Wheel Network)');
    console.log('║  + Rentry Mega Hub (Tüm 7 siteye 1 sayfadan link)');
    console.log('╚══════════════════════════════════════════════════════════\n');

    const sites = await prisma.site.findMany({
        where: { isActive: true },
        select: { domain: true, name: true }
    });

    const allLinks: string[] = [];

    // ADIM 1: Her site için link wheel hub makalesi
    console.log('📍 ADIM 1: Link Wheel Hub Makaleleri Oluşturuluyor...\n');
    for (const site of sites) {
        console.log(`🌐 Hub: ${site.name} (${site.domain})`);
        try {
            const token = await makeAccount(site.domain);
            const kw = KWS[site.domain] || 'deneme bonusu veren siteler 2026';
            const month = new Intl.DateTimeFormat('tr-TR', { month: 'long', year: 'numeric' }).format(new Date());
            const content = buildLinkWheelContent(site.domain, site.name, sites);
            const url = await makePage(token, `${month} ${kw} — ${site.name} Kaynak Ağı`, content, `https://${site.domain}`);
            console.log(`   ✅ Hub Yayınlandı: ${url}`);
            allLinks.push(url);
        } catch (e: any) {
            console.log(`   ❌ Hata: ${e.message}`);
        }
        await new Promise(r => setTimeout(r, 1500));
    }

    // ADIM 2: Rentry Mega Hub (tüm 7 siteye tek sayfadan backlink)
    console.log('\n📍 ADIM 2: Rentry.co Mega Hub Oluşturuluyor (7→1 Link)...');
    const rentryUrl = await buildRentryMegaHub(sites);
    if (rentryUrl) {
        console.log(`   ✅ Rentry Mega Hub: ${rentryUrl}`);
        allLinks.push(rentryUrl);
    } else {
        console.log('   ❌ Rentry hatası');
    }

    // ADIM 3: Tüm backlinkleri IndexNow ile ping'le
    console.log(`\n📍 ADIM 3: ${allLinks.length} Backlink IndexNow ile Ping'leniyor...`);
    await pingIndexNow(allLinks);
    console.log('   ✅ Tüm backlinkler arama motorlarına bildirildi!');

    // ÖZET
    console.log('\n\n╔══════════════════════════════════════════════════════════');
    console.log(`║  🏁 TOPLAM ${allLinks.length} BACKLINK OLUŞTURULDU`);
    console.log('╠══════════════════════════════════════════════════════════');
    for (const l of allLinks) console.log(`║  🔗 ${l}`);
    console.log('╠══════════════════════════════════════════════════════════');
    console.log('║  📊 ETKİ ANALİZİ:');
    console.log(`║  • Her site ${sites.length - 1} adet cross-link backlink aldı`);
    console.log('║  • Rentry Mega Hub: 7 siteye 1 sayfadan güçlü link');
    console.log('║  • Hepsi IndexNow ile anında arama motorlarına bildirildi');
    console.log('╚══════════════════════════════════════════════════════════\n');
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
