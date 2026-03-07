import axios from 'axios';
import fs from 'fs';
import path from 'path';

/**
 * 🎯 AGED DOMAIN SNIPER v1.0
 * 2026 iGaming SEO için boştaki/düşmüş yüksek otorite potansiyelli 
 * domainleri tarar ve uygunluklarını kontrol eder.
 */

const KEYWORDS = ['casino', 'bonus', 'bet', 'poker', 'iddaa', 'kumar', 'freebet', 'slot', 'analiz', 'rehber', 'giris'];
const SUFFIXES = ['-experts', '-rehberi', '-analizleri', '-portal', '-2026', '-merkezi', '-borsasi', '-deposu', '-aktif', '-vip'];
const TLDS = ['.com', '.net', '.org', '.com.tr'];

async function checkAvailability(domain: string) {
    try {
        // Ücretsiz bir Whois API veya DNS çözme kullanarak kabaca kontrol ediyoruz
        const response = await axios.get(`https://rdap.verisign.com/com/v1/domain/${domain}`, { timeout: 3000 });
        if (response.status === 200) {
            return false; // Domain dolu
        }
    } catch (e: any) {
        if (e.response?.status === 404) {
            return true; // Domain muhtemelen boş!
        }
    }
    return false;
}

async function main() {
    console.log('\n╔══════════════════════════════════════════════════════════');
    console.log('║  🎯 AGED DOMAIN SNIPER BAŞLIYOR');
    console.log('║  Boştaki ve otorite potansiyelli domainler taranıyor...');
    console.log('╚══════════════════════════════════════════════════════════\n');

    const candidates: string[] = [];
    for (const kw of KEYWORDS) {
        for (const sx of SUFFIXES) {
            for (const tld of TLDS) {
                candidates.push(`${kw}${sx}${tld}`);
            }
        }
    }

    console.log(`📦 Toplam ${candidates.length} aday oluşturuldu. Kontrol ediliyor...`);

    const available: string[] = [];
    const maxChecks = 100; // API limitlerine takılmamak için sınırlı tutuyoruz
    const subset = candidates.sort(() => 0.5 - Math.random()).slice(0, maxChecks);

    for (const domain of subset) {
        const isFree = await checkAvailability(domain);
        if (isFree) {
            console.log(`   ✅ BOŞ OLABİLİR: ${domain}`);
            available.push(domain);
        } else {
            // console.log(`   ❌ DOLU: ${domain}`);
        }
    }

    if (available.length > 0) {
        console.log('\n🌟 BULUNAN POTANSİYEL GÜZELLER:');
        available.forEach(d => console.log(`   🔗 ${d}`));
        console.log('\n⚠️  DİKKAT: Bu domainleri almadan önce Wayback Machine(archive.org)den geçmişine mutlaka bakın!');
    } else {
        console.log('\n❌ Şansımıza bugün bu listeden boş domain çıkmadı. Kelimeleri değiştirip tekrar deneyebiliriz.');
    }
}

main();
