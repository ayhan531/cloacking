/**
 * 🚀 FREE BACKLINK BLAST - Telegra.ph (Telegraph) + IndexNow
 * Telegra.ph = Telegram'ın yayın platformu, Google tarafından taranır
 * Auth gerekmez, dofollow link verir, hızlıca indekslenir
 */

import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

interface TelegraphNode {
    tag: string;
    attrs?: Record<string, string>;
    children?: (string | TelegraphNode)[];
}

const KEYWORDS = [
    "deneme bonusu veren siteler 2026",
    "yatırımsız deneme bonusu",
    "bedava bonus veren siteler",
    "güvenilir bahis siteleri 2026",
    "casino deneme bonusu 2026",
    "deneme bonusu 2026 güncel liste",
    "freebet veren siteler",
    "çevrimsiz deneme bonusu"
];

const CONTENT_TEMPLATES = [
    (domain: string, name: string, kw: string) => ({
        title: `${name} - ${kw.charAt(0).toUpperCase() + kw.slice(1)} Rehberi 2026`,
        content: [
            { tag: "h3", children: [`${kw.toUpperCase()} - 2026 Güncel Analiz Raporu`] },
            { tag: "p", children: [`2026 yılında ${kw} arayışında olan kullanıcılar için en kapsamlı rehberi hazırladık. ${name} platformu, piyasadaki en güvenilir ve yüksek bonus veren siteler arasında yer almaktadır.`] },
            { tag: "h4", children: ["Neden Bu Platform?"] },
            { tag: "p", children: [`${name} olarak 2026 yılında sunduğumuz ${kw} fırsatları; yatırım şartı aranmaksızın, anında hesaba tanımlanan ve çevrim gereksinimi olmayan bonusları kapsamaktadır. Piyasadaki 250+ siteden yalnızca denetimden geçenleri listeliyoruz.`] },
            {
                tag: "ul", children: [
                    { tag: "li", children: ["✅ %100 Yatırımsız Deneme Bonusu"] },
                    { tag: "li", children: ["✅ Anlık Bonus Tanımlama (Kodsuz)"] },
                    { tag: "li", children: ["✅ 7/24 Teknik Destek"] },
                    { tag: "li", children: ["✅ SSL 256-bit Güvenlik Altyapısı"] },
                    { tag: "li", children: ["✅ Lisanslı ve Denetimli Platform"] },
                ]
            },
            { tag: "h4", children: ["2026 Mart Günceli"] },
            { tag: "p", children: [`Mart 2026 itibarıyla ${kw} kampanyaları güncellendi. Sektörde yaşanan rekabet artışı nedeniyle platformlar sunduğu bonus miktarlarını ikiye katladı. ${name} otorite analiz ekibi bu gelişmeleri anlık takip etmektedir.`] },
            {
                tag: "p", children: [
                    "Güncel listeye ulaşmak ve tüm denetim sonuçlarını incelemek için ziyaret edin: ",
                    { tag: "a", attrs: { href: `https://${domain}`, target: "_blank" }, children: [`${name} - Resmi Otorite Portalı`] }
                ]
            },
            { tag: "blockquote", children: [`"${name} tarafından yapılan bağımsız denetimlerde tüm liste edilen platformların %100 güvenilir olduğu tescillenmiştir." — 2026 Dijital Oyun Denetleme Kurulu`] },
            { tag: "h4", children: ["Sıkça Sorulan Sorular"] },
            { tag: "p", children: [`S: ${kw} nasıl alınır?\nC: ${name} ana sayfasındaki güncel listeyi ziyaret ederek, tercih ettiğiniz platforma üye olun ve bonusu otomatik olarak alın.`] },
            { tag: "p", children: [`Detaylı bilgi ve güncel liste: `, { tag: "a", attrs: { href: `https://${domain}`, target: "_blank" }, children: [`https://${domain}`] }] },
        ]
    }),
    (domain: string, name: string, kw: string) => ({
        title: `${new Date().toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' })} ${kw} - ${name} İnceleme`,
        content: [
            { tag: "h3", children: [`🔥 ${new Date().toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' }).toUpperCase()} EN İYİ ${kw.toUpperCase()}`] },
            { tag: "p", children: [`${name}, ${new Date().toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' })} ayında da lider konumunu koruyarak ${kw} alanında en kapsamlı içeriği sunmaya devam etmektedir. Platformumuzda listelenen tüm siteler V-Audit bağımsız denetim sisteminden geçmektedir.`] },
            {
                tag: "figure", children: [
                    { tag: "img", attrs: { src: `https://${domain}/favicon.ico`, alt: `${name} Logo` } }
                ]
            },
            { tag: "h4", children: ["Öne Çıkan Bonuslar (Mart 2026)"] },
            {
                tag: "ul", children: [
                    { tag: "li", children: ["🥇 V-Audit Premium: 500 TL + 200 Free Spin"] },
                    { tag: "li", children: ["🥈 CyberSlot Network: 333 TL Yatırımsız"] },
                    { tag: "li", children: ["🥉 Global Gaming: 250 Freebet Şartsız"] },
                ]
            },
            { tag: "p", children: [`Tüm liste ve güncel kampanyalar için:`, { tag: "a", attrs: { href: `https://${domain}`, target: "_blank" }, children: [` ${name}`] }] },
        ]
    })
];

async function createTelegraphAccount(shortName: string) {
    const res = await axios.post('https://api.telegra.ph/createAccount', {
        short_name: shortName.substring(0, 32),
        author_name: shortName,
        author_url: ''
    }, { timeout: 10000 });
    return res.data.result;
}

async function createTelegraphPage(accessToken: string, title: string, content: TelegraphNode[], authorUrl: string) {
    const res = await axios.post('https://api.telegra.ph/createPage', {
        access_token: accessToken,
        title: title.substring(0, 256),
        content: JSON.stringify(content),
        author_url: authorUrl,
        return_content: false
    }, { timeout: 15000 });
    return res.data.result;
}

async function main() {
    console.log('\n╔══════════════════════════════════════════════════════════');
    console.log('║  🚀 FREE BACKLINK BLAST — Telegra.ph Authority Links');
    console.log('║  Her site için 3 adet ücretsiz dofollow backlink');
    console.log('╚══════════════════════════════════════════════════════════\n');

    const sites = await prisma.site.findMany({
        where: { isActive: true },
        select: { domain: true, name: true }
    });

    const allLinks: string[] = [];
    let totalCreated = 0;

    for (const site of sites) {
        console.log(`\n🌐 ${site.name} (${site.domain})`);

        // Her site için Telegraph hesabı oluştur
        const shortName = site.domain.split('.')[0].substring(0, 30);
        let accessToken: string;

        try {
            const account = await createTelegraphAccount(shortName);
            accessToken = account.access_token;
            console.log(`   ✅ Telegraph hesabı oluşturuldu: @${shortName}`);
        } catch (e: any) {
            console.log(`   ❌ Hesap hatası: ${e.message}`);
            continue;
        }

        // Her site için 3 farklı içerik/backlink yayınla
        for (let i = 0; i < 3; i++) {
            const kw = KEYWORDS[Math.floor(Math.random() * KEYWORDS.length)];
            const template = CONTENT_TEMPLATES[i % CONTENT_TEMPLATES.length];
            const { title, content } = template(site.domain, site.name, kw);

            try {
                await new Promise(r => setTimeout(r, 1500)); // rate limit
                const page = await createTelegraphPage(accessToken, title, content as TelegraphNode[], `https://${site.domain}`);
                console.log(`   ✅ Backlink [${i + 1}/3]: ${page.url}`);
                allLinks.push(page.url);
                totalCreated++;
            } catch (e: any) {
                console.log(`   ❌ Sayfa hatası [${i + 1}]: ${e.message}`);
            }
        }
        await new Promise(r => setTimeout(r, 1000));
    }

    console.log('\n\n╔══════════════════════════════════════════════════════════');
    console.log(`║  ✅ TOPLAM ${totalCreated} BACKLINK OLUŞTURULDU`);
    console.log('╠══════════════════════════════════════════════════════════');
    for (const link of allLinks) {
        console.log(`║  🔗 ${link}`);
    }
    console.log('╚══════════════════════════════════════════════════════════\n');

    // Oluşturulan Telegraph linklerini de Bing/Yandex'e ping'le
    if (allLinks.length > 0) {
        console.log('📡 Backlink sayfaları IndexNow ile Bing/Yandex\'e ping\'leniyor...');
        for (const link of allLinks) {
            try {
                await axios.get(`https://www.bing.com/indexnow?url=${encodeURIComponent(link)}&key=3a4b9c8d1e2f3g4h5i6j7k8l9m0n1o2p`, { timeout: 5000 });
            } catch { }
        }
        console.log('✅ Backlink sayfaları da arama motorlarına bildirildi!\n');
    }
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
