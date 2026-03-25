/**
 * 🕸️ PBN NETWORK BOOSTER
 * Injects internal cross-domain recommendation blocks into news articles.
 * This makes the sites look like a professional news network.
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log("🕸️ STRENGTHENING PBN CROSS-LINKS...");

    const sites = await prisma.site.findMany({ where: { isActive: true } });

    for (const site of sites) {
        console.log(`\n🔗 Linking ${site.domain} to peers...`);
        let maskContent = JSON.parse(site.maskContent || "{}");
        const news = maskContent.news || [];
        
        // Other sites in the network
        const peers = sites.filter(s => s.domain !== site.domain);

        for (let i = 0; i < news.length; i++) {
            // Only add to every 3rd article to look natural
            if (i % 3 === 0) {
                const peer = peers[i % peers.length];
                const adBlock = `
                    <div class="network-recommendation" style="margin: 20px 0; padding: 15px; border: 1px dashed #3182ce; background: #ebf8ff; border-radius: 8px;">
                        <span style="font-size: 0.8rem; color: #2b6cb0; font-weight: bold; text-transform: uppercase;">Ağ Ortaklarından Öneri:</span>
                        <p style="margin: 10px 0 0 0; font-size: 0.95rem;">
                            Sektörel veriler için partnerimiz <strong>${peer.name}</strong> tarafından hazırlanan 
                            <a href="https://${peer.domain}/deneme-bonusu" style="color: #2c5282; text-decoration: underline; font-weight: bold;">
                                2026 Deneme Bonusu Analitik Raporu</a>'nu da incelemenizi öneririz.
                        </p>
                    </div>
                `;
                
                // Append if not already present
                if (!news[i].content.includes('network-recommendation')) {
                    news[i].content += adBlock;
                }
            }
        }

        await prisma.site.update({
            where: { id: site.id },
            data: {
                maskContent: JSON.stringify(maskContent)
            }
        });
        
        console.log(`   ✅ Cross-links injected for ${site.domain}.`);
    }

    console.log("\n🚀 PBN CROSS-LINKING COMPLETED.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
