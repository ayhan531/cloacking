/**
 * 🕸️ CONSORTIUM LINK BUILDER (PBN STRATEGY)
 * Cross-links all 7 domains in the footers with optimized anchor text.
 * This signals a high-authority network to search engines.
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const ANCHOR_TEXTS = [
    "deneme bonusu veren siteler hakkındaki her şey 2026",
    "yatırımsız deneme bonusu veren siteler",
    "en güvenilir bahis siteleri listesi 2026",
    "çevrimsiz freebet veren siteler mart 2026",
    "bedava casino bonusu güncel rehber",
    "en iyi deneme bonusu veren siteler hakkında her şey",
    "yeni açılan casino siteleri 2026"
];

async function main() {
    console.log("🕸️ BUILDING LINK CONSORTIUM...");

    const sites = await prisma.site.findMany({ where: { isActive: true } });
    const siteData = sites.map(s => ({
        id: s.id,
        domain: s.domain,
        name: s.name
    }));

    for (const site of sites) {
        console.log(`🔗 Linking and pushing SEO for ${site.domain}...`);
        
        // Exclude self from links
        const targetLinks = siteData.filter(s => s.domain !== site.domain);
        
        // Generate Footer HTML for Consortium
        const footerLinksHtml = targetLinks.map((t, i) => {
            const anchor = ANCHOR_TEXTS[i % ANCHOR_TEXTS.length];
            return `<a href="https://${t.domain}" target="_blank" style="margin: 0 10px; color: #64748b; font-weight: bold; text-decoration: none; border-bottom: 1px dotted #ccc;">${anchor}</a>`;
        }).join(' | ');

        const pbnFooterSection = `
            <div style="margin-top: 50px; padding: 20px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; text-align: center; font-size: 11px; color: #94a3b8;">
                <p style="margin-bottom: 10px; font-weight: black; color: #475569;">NETWORK ANALİTİK PARTNERLERİMİZ (2026):</p>
                ${footerLinksHtml}
            </div>
        `;

        // 1. Update Mask Content (Academic Site Footer)
        let maskContent = JSON.parse(site.maskContent || "{}");
        maskContent.pbnFooter = pbnFooterSection;
        
        // 2. Update Betting Content (Gambling Site Footer)
        let bettingContent = JSON.parse(site.bettingContent || "{}");
        bettingContent.footerConsortium = pbnFooterSection;

        // 3. NUCLEAR SEO SETTINGS (Max Saturation)
        let seoSettings = JSON.parse(site.seoSettings || "{}");
        seoSettings.metaTitle = `🔥 #1 LİDER: Deneme Bonusu Veren Siteler Hakkındaki Her Şey 2026 (GÜNCEL GECE)`;
        seoSettings.metaDescription = `Zirvede biz varız! ${site.domain} ile 18 Mart 2026 deneme bonusu veren siteler hakkındaki her şey burada. Yatırımsız, çevrimsiz dev liste!`;
        seoSettings.keywords = "deneme bonusu veren siteler hakkındaki her şey 2026, bedava bonus, yatırımsız bonus, sahabet, matadorbet, onwin";

        await prisma.site.update({
            where: { id: site.id },
            data: {
                maskContent: JSON.stringify(maskContent),
                bettingContent: JSON.stringify(bettingContent),
                seoSettings: JSON.stringify(seoSettings)
            }
        });
        
        console.log(`   ✅ Consortium linked and SEO hardened for ${site.domain}`);
    }

    console.log("\n🕸️ CONSORTIUM COMPLETED. SEARCH ENGINES WILL NOW SEE A MASSIVE AUTHORITY NETWORK.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
