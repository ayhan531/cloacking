import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import axios from 'axios';

const prisma = new PrismaClient();

// IndexNow Sabit Anahtarımız (Bing ve Yandex için doğrulama anahtarı)
const INDEXNOW_KEY = "3a4b9c8d1e2f3g4h5i6j7k8l9m0n1o2p";
const PUBLIC_DIR = path.join(process.cwd(), 'public');
const KEY_PATH = path.join(PUBLIC_DIR, `${INDEXNOW_KEY}.txt`);

async function generateIndexNowKey() {
    // Sitenin public klasöründe anahtar yoksa oluştur (Arama motorlarının 'Siz yetkili misiniz?' doğrulaması için)
    if (!fs.existsSync(KEY_PATH)) {
        fs.writeFileSync(KEY_PATH, INDEXNOW_KEY, 'utf-8');
        console.log(`✅ IndexNow yetki anahtarı sunucuda oluşturuldu: /${INDEXNOW_KEY}.txt`);
    } else {
        console.log("ℹ️  IndexNow yetki anahtarı zaten sunucuda mevcut.");
    }
}

async function bulkSubmitToIndexNow() {
    console.log("\n🚀 BING VE YANDEX (INDEXNOW) AĞINA TOPLU HÜCUM BAŞLATILIYOR...\n");

    // Yalnızca aktif siteleri seç
    const sites = await prisma.site.findMany({
        where: { isActive: true },
        select: { domain: true, maskContent: true }
    });

    for (const site of sites) {
        const domain = site.domain;

        // Gönderilecek URL listesi (Kök, alt sayfalar ve tüm dinamik yapay zeka haberleri)
        const urlList: string[] = [
            `https://${domain}/`,
            `https://${domain}/haberler`,
            `https://${domain}/hakkimizda`,
            `https://${domain}/iletisim`,
            `https://${domain}/deneme-bonusu`,
            `https://${domain}/bahis-siteleri`,
            `https://${domain}/casino-siteleri`
        ];

        try {
            const mc = typeof site.maskContent === 'string' ? JSON.parse(site.maskContent) : site.maskContent;
            if (mc?.news && Array.isArray(mc.news)) {
                // Her site için tüm makale linklerini ekle
                const newsUrls = mc.news.map((n: any) => `https://${domain}/haberler/${n.slug}`);
                urlList.push(...newsUrls);
            }
        } catch { }

        console.log(`📡 [${domain}] -> ${urlList.length} URL BING / YANDEX Veritabanına Fırlatılıyor...`);

        const payload = {
            host: domain,
            key: INDEXNOW_KEY,
            keyLocation: `https://${domain}/${INDEXNOW_KEY}.txt`,
            urlList: urlList
        };

        try {
            // Bing'e IndexNow post atmak
            const res = await axios.post('https://api.indexnow.org/indexnow', payload, {
                headers: { 'Content-Type': 'application/json' }
            });

            if (res.status === 200 || res.status === 202) {
                console.log(`   ✅ SÜPER BAŞARILI! Tüm URL'ler IndexNow ağına (Bing & Yandex) kabul edildi. (Status Code: ${res.status})`);
            } else {
                console.log(`   ⚠️ Kısmi Başarı: ${res.status} ${res.statusText}`);
            }
        } catch (error: any) {
            console.log(`   ❌ HATA: ${error.message} - ${error.response?.data?.message || ''}`);
        }
    }
}

async function main() {
    console.log("╔════════════════════════════════════════════════════");
    console.log("║  🔥 INDEXNOW (BING & YANDEX) FORCE INDEXING SİLAHI");
    console.log("╚════════════════════════════════════════════════════\n");

    await generateIndexNowKey();
    await bulkSubmitToIndexNow();

    console.log("\n🏁 Bütün sitelere ait linkler global IndexNow ağında zorla dizine sokuldu!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
