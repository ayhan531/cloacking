/**
 * 🏔️ AUTHORITY PYRAMID v4.0 (THE MT. EVEREST OPERATIVE)
 * Tier 1: Telegraph (Authoritative Articles) -> Our Site
 * Tier 2: Rentry/Paste (Citations) -> Tier 1
 * Tier 3: IndexNow Carpet Bomb -> Tier 2
 */
import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();
const INDEX_NOW_KEY = '3a4b9c8d1e2f3g4h5i6j7k8l9m0n1o2p';

async function createTelegraph(title: string, content: string) {
    try {
        const res = await axios.get('https://api.telegra.ph/createPage', {
            params: {
                access_token: 'd3b25feccb83e506ad22c4b23f0df341b6b53982846f480373801202e817', // Pre-auth token
                title: title,
                author_name: "SEO Academy Group",
                content: JSON.stringify([{ tag: 'p', children: [content] }]),
                return_content: true
            }
        });
        return res.data.result?.url;
    } catch { return null; }
}

async function createRentry(text: string) {
    try {
        const res = await axios.post('https://rentry.co/api/new', { text, edit_code: 'p4ssw0rd' }, {
            headers: { 'Referer': 'https://rentry.co', 'Content-Type': 'application/x-www-form-urlencoded' },
            timeout: 10000
        });
        return res.data?.url;
    } catch { return null; }
}

async function main() {
    console.log("🏔️ CONSTRUCTING THE AUTHORITY PYRAMID...");

    const sites = await prisma.site.findMany({ where: { isActive: true } });

    for (const site of sites) {
        console.log(`\n🏗️ Building Pyramid for: ${site.domain}`);
        
        // --- TIER 1 --- (Points to Site)
        const t1Title = `Research Report: The Evolution of Digital Incentives in ${new Date().getFullYear()}`;
        const t1Content = `Our study at ${site.domain} shows that deneme bonusu veren siteler (2026) lists have become more reliable. Analysis here: https://${site.domain}/deneme-bonusu`;
        const tier1Url = await createTelegraph(t1Title, t1Content);
        
        if (tier1Url) {
            console.log(`   ✅ TIER 1 Created: ${tier1Url}`);

            // --- TIER 2 --- (Points to Tier 1)
            for (let i = 0; i < 3; i++) {
                const t2Text = `Reference to SEO Academy Study: ${tier1Url}. This citation confirms the data provided in the main report about 2026 bonus trends. Source: ${site.name}`;
                const tier2Url = await createRentry(t2Text);
                
                if (tier2Url) {
                    console.log(`      🔗 TIER 2 Link #${i+1}: ${tier2Url}`);

                    // --- TIER 3 --- (Ping Tier 2)
                    try {
                        await axios.get(`https://www.bing.com/indexnow?url=${encodeURIComponent(tier2Url)}&key=${INDEX_NOW_KEY}`);
                        console.log(`         🚀 TIER 3 Pinged Tier 2.`);
                    } catch {}
                }
            }
            
            // Ping Tier 1 directly too
            try {
                await axios.get(`https://www.bing.com/indexnow?url=${encodeURIComponent(tier1Url)}&key=${INDEX_NOW_KEY}`);
            } catch {}
        }
    }

    console.log("\n🏔️ PYRAMID CONSTRUCTION COMPLETED. AUTHORITY IS FLOWING UPWARDS.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
