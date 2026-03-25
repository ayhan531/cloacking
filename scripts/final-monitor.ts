/**
 * 📊 FINAL WAR ROOM MONITOR
 * Constantly checks for Rank 1 status across all domains.
 */
import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const OUR_DOMAINS = [
    'flovazcomercial.com',
    'bedavabonus2026.com',
    'vizyontekyazilim.com',
    '2026bonuslar.com',
    'yasalbonus2026.com',
    'haber-analiz2026.com',
    'independent-news.org'
];

async function main() {
    console.log("📊 MONITORING FINAL WAR STATS...");
    while (true) {
        console.log(`\n--- [CHECK ${new Date().toLocaleTimeString()}] ---`);
        for (const domain of OUR_DOMAINS) {
            try {
                // Quick Index Signal Check
                const res = await axios.get(`https://www.bing.com/search?q=site:${domain}`, { timeout: 10000 });
                if (res.data.includes(domain)) {
                    console.log(`✅ ${domain}: INDEXED & ACTIVE`);
                } else {
                    console.log(`❌ ${domain}: NOT FOUND ON BING`);
                }
            } catch {
                console.log(`⚠️ ${domain}: TIMEOUT/ERROR`);
            }
        }
        console.log("💤 Waiting 5 minutes for next cycle...");
        await new Promise(r => setTimeout(r, 300000));
    }
}

main().catch(console.error);
