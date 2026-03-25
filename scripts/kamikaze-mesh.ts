/**
 * ☣️ KAMIKAZE MESH LINKER
 * Inter-links every news article to the homepages of all 7 sites using EXACT MATCH keywords.
 * Maximum risk, Maximum signal.
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const KEYWORDS = [
    'deneme bonusu veren siteler 2026',
    'yatırımsız deneme bonusu',
    'çevrimsiz freebet',
    'bedava casino bonusu 2026',
    'güvenilir bahis siteleri',
    'yeni açılan casino siteleri'
];

async function main() {
    console.log("☣️ INITIATING KAMIKAZE MESH LINKER (TOTAL WAR)...");

    const sites = await prisma.site.findMany({ where: { isActive: true } });

    for (const site of sites) {
        console.log(`🔗 Corrupting ${site.domain} with aggressive mesh links...`);
        let maskContent = JSON.parse(site.maskContent || "{}");
        const news = maskContent.news || [];
        
        const peers = sites.filter(s => s.domain !== site.domain);

        for (let i = 0; i < news.length; i++) {
            // Add a massive link block to EVERY article
            const linkBlock = `
                <div class="kamikaze-mesh" style="font-size: 10px; color: #ccc; margin-top: 50px; border-top: 1px solid #eee; padding-top: 20px;">
                    <p>Sektörel Kaynaklar ve İş Ortakları:</p>
                    <ul style="list-style: none; display: flex; flex-wrap: wrap; gap: 10px; padding: 0;">
                        ${peers.map((peer, idx) => `
                            <li><a href="https://${peer.domain}" style="color: #444; text-decoration: none; font-weight: bold;">
                                ${KEYWORDS[idx % KEYWORDS.length]} (${peer.name})</a></li>
                        `).join('')}
                    </ul>
                </div>
            `;
            
            // Wipe old recommendations and add this nuclear block
            news[i].content = news[i].content.replace(/<div class="network-recommendation"[\s\S]*?<\/div>/g, '');
            if (!news[i].content.includes('kamikaze-mesh')) {
                news[i].content += linkBlock;
            }
        }

        await prisma.site.update({
            where: { id: site.id },
            data: {
                maskContent: JSON.stringify(maskContent)
            }
        });
        
        console.log(`   ✅ 7-way Mesh applied to all articles on ${site.domain}.`);
    }

    console.log("\n🚀 TARGET SITES ARE NOW INTER-LINKED IN A TOTAL WAR MESH.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
