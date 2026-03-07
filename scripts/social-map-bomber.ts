import fs from 'fs';
import path from 'path';

const SITES = [
    { name: 'Flovaz Komersial', url: 'https://flovazcomercial.com', kw: 'yatırımsız deneme bonusu 2026' },
    { name: 'Bedava Bonus 2026', url: 'https://bedavabonus2026.com', kw: 'bedava casino bonusu 2026' },
    { name: 'VizyonTek Bonus', url: 'https://vizyontekyazilim.com', kw: 'güvenilir bahis siteleri 2026' },
    { name: '2026 Bonuslar Merkezi', url: 'https://2026bonuslar.com', kw: 'casino deneme bonusu 2026' },
    { name: 'Yasal Bonus 2026', url: 'https://yasalbonus2026.com', kw: 'yasal bahis platformları 2026' },
    { name: 'Haber Analiz 2026', url: 'https://haber-analiz2026.com', kw: 'bahis haberleri 2026' },
    { name: 'Independent News', url: 'https://independent-news.org', kw: 'bağımsız casino inceleme 2026' }
];

const OUTPUT_DIR = path.join(process.cwd(), 'social-bomber-output');

if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function generateSiteData(site: any) {
    const siteFolder = path.join(OUTPUT_DIR, site.url.replace('https://', '').replace(/\./g, '_'));
    if (!fs.existsSync(siteFolder)) {
        fs.mkdirSync(siteFolder, { recursive: true });
    }

    console.log(`📡 [${site.name}] için sosyal medya kiti hazırlanıyor...`);

    // 1. Twitter Tweets
    let tweets = '';
    for (let i = 0; i < 20; i++) {
        const templates = [
            `🚨 2026 Mart Güncel: ${site.kw} veren en güvenilir platformlar listelendi! [${site.name}] farkıyla: ${site.url} #denemebonusu #${site.name.replace(/ /g, '')}`,
            `🔥 Yatırımsız kazanç fırsatı! ${site.kw} arayanlar için dev rehber burada: ${site.url} #casino #bedavabonus`,
            `✅ Lisanslı siteler, anında ödeme. ${site.kw} ile bugün şansını dene: ${site.url} #bahis #slot`
        ];
        tweets += templates[Math.floor(Math.random() * templates.length)] + '\n\n';
    }
    fs.writeFileSync(path.join(siteFolder, 'twitter-tweets.txt'), tweets, 'utf8');

    // 2. YouTube Shorts SEO
    const ytSEO = `
🎬 BU VİDEONUN ALTINA BUNU YAPIŞTIR:
====================================
BAŞLIK: ${site.kw.toUpperCase()} - 2026 MART (YATIRIMSIZ)
------------------------------------
AÇIKLAMA:
En güvenilir ${site.kw} fırsatları için sitemizi ziyaret edin.
🔗 LİNK: ${site.url}

#denemebonusu #casino #bahis #2026 #slot #bedavabahis
====================================
    `;
    fs.writeFileSync(path.join(siteFolder, 'youtube-seo.txt'), ytSEO, 'utf8');
}

function main() {
    console.log('\n╔══════════════════════════════════════════════════════════');
    console.log('║  🚀 MULTI-SITE SOCIAL BOMBER v2.0');
    console.log('║  Her site için bağımsız sosyal medya kitleri üretiliyor...');
    console.log('╚══════════════════════════════════════════════════════════\n');

    for (const site of SITES) {
        generateSiteData(site);
    }

    console.log('\n✅ İşlem Tamam! Her site için özel klasörler oluşturuldu.');
    console.log(`📂 Klasör: ${OUTPUT_DIR}`);
}

main();
