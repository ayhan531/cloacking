import axios from 'axios';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const indexNowKey = 'e4de2d499fc74dc2bfeb541bd346f1fd'; // Common key used in previous scripts

async function blastYandex() {
    console.log("🧨 EMERGENCY YANDEX SLEDGEHAMMER BOOST INITIATED...");

    const sites = await prisma.site.findMany({ where: { isActive: true } });

    for (const site of sites) {
        console.log(`\n🚀 Target: ${site.domain}`);

        // 1. Traditional HTTP Ping
        try {
            const sitemapUrl = `https://${site.domain}/sitemap.xml`;
            console.log(`📡 Pinging Yandex traditional endpoint...`);
            await axios.get(`https://ping.yandex.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`);
            console.log(`   ✅ SITEMAP SECURED BY YANDEX`);
        } catch (e: any) {
            console.log(`   ❌ SITEMAP PING FAILED: ${e.message}`);
        }
    }

    console.log("\n💥 YANDEX SLEDGEHAMMER BLAST COMPLETE.");
}

blastYandex()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
