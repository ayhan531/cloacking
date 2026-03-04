/**
 * 🚀 MASTER BLAST SCRIPT
 * 1. Tüm siteleri tara (bot view, sitemap, robots)
 * 2. Google Indexing API'ye push et
 * 3. Bing + Yandex IndexNow ping'le
 * 4. Google, Bing, Yandex'te site: sorgusu yap → indeks durumunu analiz et
 */

import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();
const TOKEN_PATH = path.join(process.cwd(), 'google-oauth-token.json');
const INDEX_NOW_KEY = '3a4b9c8d1e2f3g4h5i6j7k8l9m0n1o2p';

// ─────────────────────────────────────────────────────────────
// BÖLÜM 1: TARAMA
// ─────────────────────────────────────────────────────────────
async function scanSite(domain: string, name: string) {
    const results: Record<string, string> = {};
    try {
        const botRes = await axios.get('http://localhost:3000/', {
            headers: { 'Host': domain, 'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)' },
            timeout: 6000
        });
        const html = botRes.data as string;
        const isCloaked = html.includes('EMERGENCY_INDEX_SIGNAL') && html.includes('application/ld+json');
        const titleMatch = html.match(/<title>(.*?)<\/title>/);
        const schemaCount = (html.match(/application\/ld\+json/g) || []).length;
        results['bot'] = isCloaked ? `✅ Bot Görünümü: OK | Title: ${titleMatch?.[1]?.substring(0, 60)} | Şema Sayısı: ${schemaCount}` : '❌ Bot Görünümü BAŞARISIZ!';
    } catch { results['bot'] = '❌ Bağlantı Hatası'; }

    try {
        const sitemapRes = await axios.get('http://localhost:3000/sitemap.xml', {
            headers: { 'Host': domain }, timeout: 5000
        });
        const urlCount = (sitemapRes.data.match(/<url>/g) || []).length;
        results['sitemap'] = `✅ Sitemap OK (${urlCount} URL)`;
    } catch { results['sitemap'] = '❌ Sitemap Hatası'; }

    try {
        const robotsRes = await axios.get('http://localhost:3000/robots.txt', {
            headers: { 'Host': domain }, timeout: 5000
        });
        const ok = robotsRes.data.includes('User-Agent: *');
        results['robots'] = ok ? '✅ Robots.txt OK' : '❌ Robots.txt Sorunlu';
    } catch { results['robots'] = '❌ Robots.txt Hatası'; }

    return results;
}

// ─────────────────────────────────────────────────────────────
// BÖLÜM 2: GOOGLE INDEXING API PUSH
// ─────────────────────────────────────────────────────────────
async function googlePush(sites: any[]) {
    if (!fs.existsSync(TOKEN_PATH)) {
        return 'google-oauth-token.json bulunamadı.';
    }
    const token = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf-8'));
    const auth = new google.auth.OAuth2();
    auth.setCredentials(token);
    const indexing = google.indexing({ version: 'v3', auth });

    let totalSuccess = 0, totalFailed = 0, quotaHit = false;

    for (const site of sites) {
        if (quotaHit) break;
        const urlList: string[] = [
            `https://${site.domain}/`,
            `https://${site.domain}/haberler`,
            `https://${site.domain}/deneme-bonusu`,
            `https://${site.domain}/hakkimizda`,
            `https://${site.domain}/iletisim`,
        ];
        try {
            const mc = typeof site.maskContent === 'string' ? JSON.parse(site.maskContent) : site.maskContent;
            if (mc?.news?.length) {
                const newsUrls = (mc.news as any[]).slice(0, 30).map((n: any) => `https://${site.domain}/haberler/${n.slug}`);
                urlList.push(...newsUrls);
            }
        } catch { }

        for (const url of urlList) {
            if (quotaHit) break;
            try {
                await indexing.urlNotifications.publish({ requestBody: { url, type: 'URL_UPDATED' } });
                totalSuccess++;
                await new Promise(r => setTimeout(r, 150));
            } catch (err: any) {
                const msg = err.errors?.[0]?.message || err.message || '';
                if (msg.includes('quota') || msg.includes('Quota')) { quotaHit = true; break; }
                totalFailed++;
            }
        }
    }
    return quotaHit
        ? `⚠️ ${totalSuccess} URL push'landı → KOTA DOLDU (yarın devam et)`
        : `✅ ${totalSuccess} URL Google'a push'landı | ❌ ${totalFailed} hatalı`;
}

// ─────────────────────────────────────────────────────────────
// BÖLÜM 3: BİNG + YANDEX INDEXNOW PING
// ─────────────────────────────────────────────────────────────
async function pingIndexNow(domain: string) {
    const sitemapUrl = `https://${domain}/sitemap.xml`;
    const results: string[] = [];
    try {
        await axios.get(`https://www.bing.com/indexnow?url=${encodeURIComponent(sitemapUrl)}&key=${INDEX_NOW_KEY}`, { timeout: 8000 });
        results.push('✅ Bing');
    } catch { results.push('❌ Bing'); }
    try {
        await axios.get(`https://yandex.com/indexnow?url=${encodeURIComponent(sitemapUrl)}&key=${INDEX_NOW_KEY}`, { timeout: 8000 });
        results.push('✅ Yandex');
    } catch { results.push('❌ Yandex'); }
    // Google classic sitemap ping
    try {
        await axios.get(`https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`, { timeout: 8000 });
        results.push('✅ Google Ping');
    } catch { results.push('⚠️ Google Ping (deprecated ama denendi)'); }
    return results.join(' | ');
}

// ─────────────────────────────────────────────────────────────
// BÖLÜM 4: İNDEKS DURUMU KONTROLÜ (site: sorgusu)
// ─────────────────────────────────────────────────────────────
async function checkIndexStatus(domain: string) {
    const status: Record<string, string> = { google: '?', bing: '?', yandex: '?' };

    // Google site: sorgusu
    try {
        const res = await axios.get(`https://www.google.com/search?q=site:${domain}&num=1`, {
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36' },
            timeout: 8000
        });
        const body = res.data as string;
        if (body.includes('did not match any documents') || body.includes('hiçbir belgeyle eşleşmedi')) {
            status['google'] = '❌ İNDEKSLENMEMİŞ';
        } else if (body.includes(domain)) {
            const match = body.match(/Yaklaşık ([\d.]+) sonuç|About ([\d,]+) results/i);
            status['google'] = `✅ İNDEKSLENDİ${match ? ' (~' + (match[1] || match[2]) + ' sonuç)' : ''}`;
        } else {
            status['google'] = '⏳ Henüz indekslenmemiş (bot gecikmiş olabilir)';
        }
    } catch { status['google'] = '⚠️ Sorgu engellenebilir (rate limit)'; }

    // Bing site: sorgusu
    try {
        const res = await axios.get(`https://www.bing.com/search?q=site:${domain}`, {
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36' },
            timeout: 8000
        });
        const body = res.data as string;
        if (body.includes('No results found') || body.includes('results couldn') || body.includes('Sonuç bulunamadı')) {
            status['bing'] = '❌ İNDEKSLENMEMİŞ';
        } else if (body.includes(domain)) {
            status['bing'] = '✅ İNDEKSLENDİ';
        } else {
            status['bing'] = '⏳ Belirsiz (ping iletildi)';
        }
    } catch { status['bing'] = '⚠️ Sorgu Engellenebilir'; }

    // Yandex site: sorgusu
    try {
        const res = await axios.get(`https://yandex.com/search/?text=site:${domain}`, {
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
            timeout: 8000
        });
        const body = res.data as string;
        if (body.includes('no results') || body.includes('Ничего не нашлось') || body.includes('bulunamadı')) {
            status['yandex'] = '❌ İNDEKSLENMEMİŞ';
        } else if (body.includes(domain)) {
            status['yandex'] = '✅ İNDEKSLENDİ';
        } else {
            status['yandex'] = '⏳ Belirsiz (ping iletildi)';
        }
    } catch { status['yandex'] = '⚠️ Sorgu Engellenebilir'; }

    return status;
}

// ─────────────────────────────────────────────────────────────
// ANA ÇALIŞMA
// ─────────────────────────────────────────────────────────────
async function main() {
    console.log('\n╔══════════════════════════════════════════════════════════');
    console.log('║  🚀 MASTER SEO BLAST v2.0');
    console.log('║  Tara → Push → Ping → Analiz (Google + Bing + Yandex)');
    console.log('╚══════════════════════════════════════════════════════════\n');

    const sites = await prisma.site.findMany({
        where: { isActive: true },
        select: { domain: true, name: true, maskContent: true }
    });

    console.log(`📊 ${sites.length} aktif site bulundu.\n`);

    // ── BÖLÜM 2: Google Push (tüm siteler birden) ─────────────
    console.log('📤 [ADIM 1/3] Google Indexing API\'ye push yapılıyor...');
    const pushResult = await googlePush(sites);
    console.log(`   └─ ${pushResult}\n`);

    // ── Ana döngü: tarama + ping + indeks analizi ──────────────
    console.log('🔄 [ADIM 2/3] Her site taranıyor, ping atılıyor, durum kontrol ediliyor...\n');

    const report: any[] = [];

    for (const site of sites) {
        console.log(`\n${'─'.repeat(60)}`);
        console.log(`🌐 ${site.name} → ${site.domain}`);

        // Tarama
        const scan = await scanSite(site.domain, site.name);
        console.log(`   ${scan['bot']}`);
        console.log(`   ${scan['sitemap']}`);
        console.log(`   ${scan['robots']}`);

        // Ping
        const pingResult = await pingIndexNow(site.domain);
        console.log(`   🔔 Ping: ${pingResult}`);
        await new Promise(r => setTimeout(r, 500));

        // İndeks Durumu
        const indexStatus = await checkIndexStatus(site.domain);
        console.log(`   📈 Google:  ${indexStatus['google']}`);
        console.log(`   📈 Bing:    ${indexStatus['bing']}`);
        console.log(`   📈 Yandex:  ${indexStatus['yandex']}`);

        report.push({ domain: site.domain, scan, pingResult, indexStatus });
        await new Promise(r => setTimeout(r, 800));
    }

    // ── ÖZEThttp ─────────────────────────────────────────────────────────────
    console.log('\n\n╔══════════════════════════════════════════════════════════');
    console.log('║  📊 ÖZET RAPOR');
    console.log('╠══════════════════════════════════════════════════════════');
    for (const r of report) {
        const g = r.indexStatus['google'];
        const b = r.indexStatus['bing'];
        const y = r.indexStatus['yandex'];
        const emoji = (g.includes('✅') || b.includes('✅') || y.includes('✅')) ? '🟢' : '🟡';
        console.log(`║  ${emoji} ${r.domain}`);
        console.log(`║     Google: ${g}`);
        console.log(`║     Bing:   ${b}`);
        console.log(`║     Yandex: ${y}`);
    }
    console.log('╚══════════════════════════════════════════════════════════\n');
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
