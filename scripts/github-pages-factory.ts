/**
 * 🚀 GITHUB PAGES BACKLINK FACTORY
 * 7 ayrı keyword için 7 ayrı HTML sayfası oluşturur
 * ve GitHub'a push eder → DA:96'dan gerçek backlink
 */

import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const GITHUB_TOKEN = 'YOUR_GITHUB_TOKEN_HERE';
const GITHUB_USER = 'ayhan531';
const REPO_NAME = 'deneme-bonusu-2026';

const PAGES = [
    {
        slug: 'yatiirimsiz-deneme-bonusu',
        title: 'Yatırımsız Deneme Bonusu 2026 - Kodsuz Anında Bonus',
        h1: '💰 Yatırımsız Deneme Bonusu Veren Siteler 2026',
        description: 'Yatırım yapmadan, kodsuz ve anında deneme bonusu veren güvenilir siteler listesi. Mart 2026 güncel.',
        keyword: 'yatırımsız deneme bonusu 2026',
        primarySite: { name: 'Flovaz Komersial', url: 'https://flovazcomercial.com' }
    },
    {
        slug: 'bedava-casino-bonusu',
        title: 'Bedava Casino Bonusu 2026 - Ücretsiz Slot ve Casino Fırsatları',
        h1: '🎰 Bedava Casino Bonusu 2026',
        description: 'Ücretsiz casino bonusu, bedava slot dönüşü ve karşılıksız freebet fırsatları. Mart 2026 güncel liste.',
        keyword: 'bedava casino bonusu 2026',
        primarySite: { name: 'Bedava Bonus 2026', url: 'https://bedavabonus2026.com' }
    },
    {
        slug: 'guvenilir-bahis-siteleri',
        title: 'Güvenilir Bahis Siteleri 2026 - Lisanslı Platform Listesi',
        h1: '🛡️ Güvenilir Bahis Siteleri 2026',
        description: 'Türkiye\'nin en güvenilir bahis siteleri listesi. Lisanslı, denetimli ve hızlı ödeme yapan platformlar.',
        keyword: 'güvenilir bahis siteleri 2026',
        primarySite: { name: 'VizyonTek Bonus', url: 'https://vizyontekyazilim.com' }
    },
    {
        slug: 'casino-deneme-bonusu',
        title: 'Casino Deneme Bonusu 2026 - En Yüksek Bonus Veren Siteler',
        h1: '🎲 Casino Deneme Bonusu 2026',
        description: 'En yüksek casino deneme bonusu veren siteler. Freespin, freebet ve çevrimsiz bonus listesi.',
        keyword: 'casino deneme bonusu 2026',
        primarySite: { name: '2026 Bonuslar Merkezi', url: 'https://2026bonuslar.com' }
    },
    {
        slug: 'yasal-bahis-platformlari',
        title: 'Yasal Bahis Platformları 2026 - Onaylı Sitelerin Tam Listesi',
        h1: '⚖️ Yasal Bahis Platformları 2026',
        description: 'Türkiye\'de yasal statüde faaliyet gösteren onaylı bahis platformları. 2026 güncel liste.',
        keyword: 'yasal bahis platformları 2026',
        primarySite: { name: 'Yasal Bonus 2026', url: 'https://yasalbonus2026.com' }
    },
    {
        slug: 'bahis-haberleri-2026',
        title: 'Bahis Haberleri 2026 - Güncel Casino ve Bahis Sektörü',
        h1: '📰 Bahis Haberleri ve Analiz 2026',
        description: 'Mart 2026 bahis sektörü haberleri, casino kampanya duyuruları ve bonus analiz raporları.',
        keyword: 'bahis haberleri 2026',
        primarySite: { name: 'Haber Analiz 2026', url: 'https://haber-analiz2026.com' }
    },
    {
        slug: 'bagimsiz-casino-inceleme',
        title: 'Bağımsız Casino İnceleme 2026 - Tarafsız Platform Analizi',
        h1: '🔍 Bağımsız Casino İnceleme 2026',
        description: 'Tarafsız ve bağımsız casino platform incelemeleri. Objektif değerlendirmeler ve güven skorları.',
        keyword: 'bağımsız casino inceleme 2026',
        primarySite: { name: 'Independent News', url: 'https://independent-news.org' }
    }
];

const ALL_SITES = [
    { name: 'Flovaz Komersial', url: 'https://flovazcomercial.com', desc: 'Deneme bonusu veren siteler 2026 otoritesi' },
    { name: 'Haber Analiz 2026', url: 'https://haber-analiz2026.com', desc: 'Güncel bahis haberleri ve analiz' },
    { name: 'VizyonTek Bonus', url: 'https://vizyontekyazilim.com', desc: 'Güvenilir casino siteleri inceleme' },
    { name: 'Yasal Bonus 2026', url: 'https://yasalbonus2026.com', desc: 'Yasal bonus veren siteler rehberi' },
    { name: '2026 Bonuslar', url: 'https://2026bonuslar.com', desc: 'Casino bonus mart 2026' },
    { name: 'Bedava Bonus 2026', url: 'https://bedavabonus2026.com', desc: 'Bedava bahis bonusu 2026' },
    { name: 'Independent News', url: 'https://independent-news.org', desc: 'Bağımsız casino inceleme 2026' },
];

function generateHTML(page: typeof PAGES[0]): string {
    const siteLinks = ALL_SITES.map(s =>
        `<li><a href="${s.url}" rel="dofollow" target="_blank">${s.name}</a> - ${s.desc}</li>`
    ).join('\n');

    return `<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${page.title}</title>
<meta name="description" content="${page.description}">
<meta name="keywords" content="${page.keyword}, deneme bonusu veren siteler 2026, bahis siteleri">
<meta property="og:title" content="${page.title}">
<meta property="og:description" content="${page.description}">
<style>
body{font-family:Arial,sans-serif;max-width:900px;margin:0 auto;padding:20px;background:#f9f9f9;color:#333}
h1{color:#c0392b;border-bottom:3px solid #c0392b;padding-bottom:10px}
h2{color:#2c3e50;margin-top:30px}
.card{background:white;border:1px solid #ddd;border-radius:8px;padding:20px;margin:15px 0;box-shadow:0 2px 4px rgba(0,0,0,.05)}
.card a{color:#e74c3c;font-weight:bold;text-decoration:none}
.card a:hover{text-decoration:underline}
.highlight{background:#fff3cd;border-left:4px solid #ffc107;padding:15px;margin:20px 0}
ul li{margin:10px 0}
ul a{color:#2980b9}
</style>
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"Article","headline":"${page.h1}","description":"${page.description}","datePublished":"2026-03-05","dateModified":"2026-03-05","author":{"@type":"Organization","name":"Deneme Bonusu 2026 Rehberi"}}
</script>
</head>
<body>
<h1>${page.h1}</h1>
<p>Mart 2026 itibarıyla güncellenen kapsamlı <strong>${page.keyword}</strong> rehberimize hoş geldiniz. Bu sayfada güvenilir platformlar, avantajlı kampanyalar ve tarafsız değerlendirmeler bulacaksınız.</p>

<div class="highlight">
<strong>⭐ En Çok Önerilen Site:</strong><br>
<a href="${page.primarySite.url}" rel="dofollow" target="_blank" style="font-size:1.2em">${page.primarySite.name}</a>
<br><small>Türkiye'nin ${page.keyword} alanında en kapsamlı ve güncel kaynağı</small><br>
→ <a href="${page.primarySite.url}">${page.primarySite.url}</a>
</div>

<div class="card">
<h2>📋 ${page.keyword.charAt(0).toUpperCase() + page.keyword.slice(1)} Neden Önemli?</h2>
<p>2026 yılında Türkiye online bahis pazarı hızla büyümektedir. <strong>${page.keyword}</strong> arayan kullanıcıların sayısı her geçen ay artmakta ve güvenilir platform bulmak giderek daha kritik hale gelmektedir. Bu nedenle bağımsız denetimden geçmiş, kullanıcı yorumlarıyla desteklenmiş platformları listeliyoruz.</p>
</div>

<h2>🔗 2026 Güncel Platform Rehber Listesi</h2>
<ul>
${siteLinks}
</ul>

<div class="card">
<h2>✅ Nasıl Doğru Platform Seçilir?</h2>
<ul>
<li>Lisans ve denetim bilgilerini kontrol edin</li>
<li>Kullanıcı yorumlarını inceleyin</li>
<li>Bonus çevrim şartlarını dikkatlice okuyun</li>
<li>7/24 müşteri desteği olup olmadığını doğrulayın</li>
<li>SSL güvenlik sertifikasını kontrol edin</li>
</ul>
</div>

<hr>
<p style="color:#999;font-size:.85em;text-align:center">Son güncelleme: Mart 2026 | Bu sayfa bilgi amaçlıdır.</p>
</body>
</html>`;
}

async function uploadFileToGitHub(filename: string, content: string) {
    const encoded = Buffer.from(content).toString('base64');
    const res = await axios.put(
        `https://api.github.com/repos/${GITHUB_USER}/${REPO_NAME}/contents/${filename}`,
        {
            message: `Add ${filename} - ${new Date().toISOString()}`,
            content: encoded
        },
        {
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Content-Type': 'application/json'
            }
        }
    );
    return res.data.content?.html_url;
}

async function main() {
    console.log('\n╔══════════════════════════════════════════════════════════');
    console.log('║  🚀 GITHUB PAGES BACKLINK FACTORY (DA:96)');
    console.log(`║  Hedef: https://ayhan531.github.io/${REPO_NAME}/`);
    console.log('╚══════════════════════════════════════════════════════════\n');

    const createdPages: string[] = [];

    for (const page of PAGES) {
        process.stdout.write(`  📄 ${page.slug}.html oluşturuluyor... `);
        try {
            const html = generateHTML(page);
            await uploadFileToGitHub(`${page.slug}.html`, html);
            const pageUrl = `https://ayhan531.github.io/${REPO_NAME}/${page.slug}.html`;
            console.log(`✅`);
            console.log(`     └─ ${pageUrl}`);
            createdPages.push(pageUrl);
            await new Promise(r => setTimeout(r, 800));
        } catch (e: any) {
            console.log(`❌ ${e.message?.substring(0, 60)}`);
        }
    }

    // Tüm sayfaları Bing'e ping'le
    console.log('\n📡 Yeni sayfalar Bing IndexNow\'a bildiriliyor...');
    for (const url of createdPages) {
        try {
            await axios.get(`https://www.bing.com/indexnow?url=${encodeURIComponent(url)}&key=3a4b9c8d1e2f3g4h5i6j7k8l9m0n1o2p`, { timeout: 5000 });
            await new Promise(r => setTimeout(r, 300));
        } catch { }
    }

    console.log('\n╔══════════════════════════════════════════════════════════');
    console.log(`║  ✅ ${createdPages.length + 1} GITHUB PAGES SAYFASI OLUŞTURULDU`);
    console.log(`║  🌐 Ana sayfa: https://ayhan531.github.io/${REPO_NAME}/`);
    console.log('╠══════════════════════════════════════════════════════════');
    for (const url of createdPages) console.log(`║  🔗 ${url}`);
    console.log('║');
    console.log('║  GitHub DA: 96 - Bu linklerin etkisi Telegraph\'tan');
    console.log('║  çok daha güçlü! 2-5 gün içinde Bing\'de görünür.');
    console.log('╚══════════════════════════════════════════════════════════\n');
}

main().catch(console.error);
