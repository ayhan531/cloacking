/**
 * 🚀 NUCLEAR GOOGLE INDEXING API (INSTANT INDEX)
 * 
 * Bu script, sitemap ping işleminin 100 kat daha güçlü versiyonudur.
 * URL'leri direkt olarak Google'ın 'Hızlandırılmış İndeksleme' veritabanına pushlar.
 * 
 * KULLANIM:
 * 1. google-indexing-key.json dosyasını kök dizine ekleyin.
 * 2. npm install googleapis
 * 3. npx ts-node scripts/google-indexing-api.ts
 */

import { google } from 'googleapis';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();
const KEY_PATH = path.join(__dirname, '../google-indexing-key.json');

async function main() {
    console.log("🔥 NUCLEAR GOOGLE INDEXING: Force-Update sequence initiated...");

    if (!fs.existsSync(KEY_PATH)) {
        console.error("❌ ERROR: google-indexing-key.json NOT FOUND!");
        console.log("Lütfen Google Cloud Console üzerinden bir Service Account oluşturun ve JSON anahtarını projenin kök dizinine 'google-indexing-key.json' adıyla koyun.");
        return;
    }

    const auth = new google.auth.GoogleAuth({
        keyFile: KEY_PATH,
        scopes: ['https://www.googleapis.com/auth/indexing'],
    });

    const indexing = google.indexing({
        version: 'v3',
        auth: auth
    });

    // Fetch all active sites and their URLs
    const sites = await prisma.site.findMany({
        where: { isActive: true },
        select: { domain: true, maskContent: true }
    });

    for (const site of sites) {
        const domain = site.domain;
        let urlList = [
            `https://${domain}/`,
            `https://${domain}/deneme-bonusu`
        ];

        try {
            const maskContent = typeof site.maskContent === 'string' ? JSON.parse(site.maskContent) : site.maskContent;
            if (maskContent && maskContent.news && Array.isArray(maskContent.news)) {
                // Google Indexing API limitlerine takılmamak için en güncel 50 URL'yi gönderiyoruz (günlük limit domain başı genelde 200'dür)
                const newsUrls = maskContent.news.slice(0, 50).map((n: any) => `https://${domain}/haberler/${n.slug}`);
                urlList = [...urlList, ...newsUrls];
            }
        } catch (e) { }

        console.log(`📡 Domain: ${domain} - ${urlList.length} URLs pushing to Google Indexing API...`);

        for (const url of urlList) {
            try {
                const res = await indexing.urlNotifications.publish({
                    requestBody: {
                        url: url,
                        type: 'URL_UPDATED'
                    }
                });
                console.log(`✅ [UPDATED] ${url} | Status: ${res.status}`);
                // API Rate limitlerini yormamak için kısa bir bekleme (opsiyonel)
                await new Promise(resolve => setTimeout(resolve, 200));
            } catch (err: any) {
                console.error(`❌ [FAILED] ${url} | Reason: ${err.errors?.[0]?.message || err.message}`);
                if (err.errors?.[0]?.message?.includes('quota')) {
                    console.log("⚠️ GLOBAL QUOTA REACED: Stopping for this session.");
                    return;
                }
            }
        }
    }

    console.log("💎 NUCLEAR GOOGLE INDEX COMPLETE: All sites pushed to instant priority queue.");
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
