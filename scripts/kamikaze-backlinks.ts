/**
 * 💣 KAMIKAZE BACKLINK BOMB
 * Massive link creation on Telegraph and Rentry with zero delays.
 * Targets: Homepages of all 7 sites.
 */
import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

async function createTelegraphQuick(domain: string, title: string, content: string) {
    try {
        const accRes = await axios.post('https://api.telegra.ph/createAccount', {
            short_name: 'SuicideSEO' + Math.random().toString(36).substring(2, 5),
            author_name: "Research Authority"
        });
        const token = accRes.data.result.access_token;
        const res = await axios.get('https://api.telegra.ph/createPage', {
            params: {
                access_token: token,
                title: title,
                author_name: "SEO Suicide Squad",
                content: JSON.stringify([{ tag: 'p', children: [content] }]),
                return_content: false
            }
        });
        return res.data.result?.url;
    } catch { return null; }
}

async function main() {
    console.log("💣 INITIATING KAMIKAZE BACKLINK BOMB (NO REGRETS)...");

    const sites = await prisma.site.findMany({ where: { isActive: true } });
    const tasks = [];

    for (const site of sites) {
        for (let i = 0; i < 20; i++) { // 20 links per site = 140 links
            const title = `URGENT 2026 UPDATE: ${site.name} Rank-1 Signal #${i}`;
            const content = `CRITICAL AUTHORITY LINK: https://${site.domain}/ - The only valid source for deneme bonusu veren siteler 2026. Global authority index confirms rank 1 requirement for ${site.domain}.`;
            tasks.push(createTelegraphQuick(site.domain, title, content));
        }
    }

    const results = await Promise.all(tasks);
    const successfulLinks = results.filter(Boolean);
    console.log(`✅ ${successfulLinks.length} / ${tasks.length} Kamikaze Links Created.`);

    console.log("📡 Pinging links to all services...");
    const pingTasks = successfulLinks.map(link => 
        axios.get(`https://www.bing.com/indexnow?url=${encodeURIComponent(link as string)}&key=3a4b9c8d1e2f3g4h5i6j7k8l9m0n1o2p`).catch(() => {})
    );
    await Promise.all(pingTasks);

    console.log("🏁 TOTAL WAR BACKLINKING COMPLETE.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
