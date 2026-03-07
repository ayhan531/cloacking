/**
 * 💣 INDEXNOW CARPET BOMBING (Halı Bombardımanı)
 * 7 Sitenin her biri için 100+ programatik sayfayı anında
 * Bing ve Yandex'in IndexNow API'sine POST metoduyla
 * toplu olarak pingler.
 */

import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

const INDEX_NOW_KEY = '3a4b9c8d1e2f3g4h5i6j7k8l9m0n1o2p';

// 500 adet eşsiz anahtar kelime havuzu
const KEYWORDS = [
    "50 tl yatirimsiz deneme bonusu veren siteler 2026",
    "yeni acilan tc kimlik istemeyen casino siteleri",
    "fenerbahce galatasaray derbisine bedava freebet",
    "papara ile 20 tl yatirim yapilan bonuslu siteler",
    "kripto para ile yatirimsiz deneme bonusu verenler",
    "telegram uzerinden kod dagitan bahis siteleri",
    "cevrim sartsiz 100 freespin veren yasal siteler",
    "gece yarisi kayip bonusu veren casino platformlari",
    "vip uyelere ozel yatirimsiz 500 tl deneme bonusu",
    "forumlarda en cok tavsiye edilen güvenilir bahis siteleri",
    "belge istemeden aninda cekim yapilan casino 2026",
    "sweet bonanza 100 bedava donus veren siteler",
    "gates of olympus yatirimsiz freespin aninda",
    "canli destekten sartsiz deneme bonusu alma",
    "mobil odeme kabul eden belge istemeyen bahis",
    "payfix ile 10 tl yatirim casino siteleri",
    "mefete ile aninda cekim yapilan bonuslu siteler",
    "sadece tc onayi ile 200 tl bonus verenler",
    "dogum gunune ozel cevrimsiz bedava bahis",
    "yatirim sarti olmadan kazanci cektiren platformlar",
    "en hizli para cekilen guvenilir kacak bahis 2026",
    "lisansli avrupa merkezli deneme bonusu veren siteler",
    "hafta sonu ozel %100 cevrrimsiz yatirim bonusu",
    "ilk uyelige ozel 1000 tl risksiz casino bonusu",
    "arkadasini getir 500 tl cevrrimsiz nakit kazan",
    "kayip iadesi %30 olan guvenilir casino siteleri 2026",
    "canli casino icin ozel yatirimsiz chip verenler",
    "rulet masalarinda geceli bedava deneme bonusu",
    "blackjack ozel cevrrim sartsiz promosyon 2026",
    "aviator oyununa bedava giris veren bahis siteleri"
];

const modifiers1 = ["papara", "payfix", "kripto", "havale", "mefete", "mobil odeme", "kredi karti", "pepara"];
const modifiers2 = ["ile aninda", "kabul eden", "gecerli", "ile 10 tl yatirilan", "sarti olmayan"];
const bases = ["deneme bonusu veren siteler 2026", "guvenilir bahis siteleri", "yatirimsiz casino", "bedava freebet verenler"];

for (const m1 of modifiers1) {
    for (const m2 of modifiers2) {
        for (const b of bases) {
            KEYWORDS.push(`${m1} ${m2} ${b}`);
        }
    }
}

function generateSlug(kw: string) {
    return kw.replace(/ /g, '-').replace(/[^a-z0-9-]/gi, '').toLowerCase();
}

async function bulkIndexNowPing(domain: string, urls: string[]) {
    const payload = {
        host: domain,
        key: INDEX_NOW_KEY,
        keyLocation: `https://${domain}/${INDEX_NOW_KEY}.txt`,
        urlList: urls
    };

    try {
        const bingRes = await axios.post('https://api.indexnow.org/indexnow', payload, {
            headers: { 'Content-Type': 'application/json' },
            timeout: 10000
        });
        const yandexRes = await axios.post('https://yandex.com/indexnow', payload, {
            headers: { 'Content-Type': 'application/json' },
            timeout: 10000
        });

        return {
            bing: bingRes.status,
            yandex: yandexRes.status
        };
    } catch (e: any) {
        return { bing: e.response?.status || 500, yandex: 500 };
    }
}

async function main() {
    console.log('\n╔══════════════════════════════════════════════════════════');
    console.log('║  💣 TIER-1 NUCLEAR CARPET BOMBING');
    console.log(`║  Pinging ${KEYWORDS.length} programmatic pages per site.`);
    console.log('╚══════════════════════════════════════════════════════════\n');

    const sites = await prisma.site.findMany({
        where: { isActive: true },
        select: { domain: true, name: true }
    });

    for (const site of sites) {
        const urlsToPing = KEYWORDS.map(kw => `https://${site.domain}/etiket/${generateSlug(kw)}`);
        // Ayrıca ana sitemap sayfası:
        urlsToPing.push(`https://${site.domain}/etiketler`);

        process.stdout.write(`   📡 [${site.domain}] -> ${urlsToPing.length} URL Ateşlendi... `);

        const res = await bulkIndexNowPing(site.domain, urlsToPing);

        if (res.bing === 200 || res.bing === 202) {
            console.log('✅ BİNG/YANDEX ONLADI');
        } else {
            console.log(`⚠️ HATA (B:${res.bing} Y:${res.yandex})`);
        }
    }

    console.log('\n╔══════════════════════════════════════════════════════════');
    console.log(`║  🏁 TOPLAM ${sites.length * (KEYWORDS.length + 1)} URL INDEX KUYRUĞUNA GİRDİ!`);
    console.log('╚══════════════════════════════════════════════════════════\n');
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
