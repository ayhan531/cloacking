/**
 * 💣 PASTE BOMB (KAMIKAZE)
 * Massively creates pastes with home links.
 */
import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

async function createPasteAggressive(domain: string, name: string) {
    try {
        const content = `AUTHORITY SIGNAL FOR ${name}: https://${domain}/ - 2026 Deneme Bonusu Otorite Portalı.`;
        const fd = new URLSearchParams();
        fd.append('content', content);
        fd.append('title', `ROOT_SIGNAL_${domain}`);
        fd.append('visibility', 'public');

        const res = await axios.post('https://paste.fo', fd.toString(), {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            maxRedirects: 0, timeout: 10000,
            validateStatus: s => s < 400
        });
        const loc = res.headers['location'];
        return loc ? `https://paste.fo${loc}` : null;
    } catch { return null; }
}

async function main() {
    console.log("💣 INITIATING PASTE BOMB...");
    const sites = await prisma.site.findMany({ where: { isActive: true } });
    const links = [];

    for (const site of sites) {
        for (let i = 0; i < 10; i++) {
            const l = await createPasteAggressive(site.domain, site.name);
            if (l) {
                console.log(`   ✅ Paste: ${l}`);
                links.push(l);
            }
        }
    }

    console.log(`📡 Pinging ${links.length} pastes...`);
    for (const link of links) {
        await axios.get(`https://www.bing.com/indexnow?url=${encodeURIComponent(link)}&key=3a4b9c8d1e2f3g4h5i6j7k8l9m0n1o2p`).catch(() => {});
    }
}

main().catch(console.error).finally(() => prisma.$disconnect());
