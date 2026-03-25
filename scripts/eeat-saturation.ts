/**
 * 🎓 EEAT (EXPERTISE, EXPERIENCE, AUTHORITY, TRUST) SATURATION
 * Adds bio, editorial standards, and legal footers to all sites.
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log("🎓 SATURATING EEAT SIGNALS...");

    const sites = await prisma.site.findMany({ where: { isActive: true } });

    for (const site of sites) {
        console.log(`📜 Updating Trust Signals for ${site.domain}...`);
        
        let maskContent = JSON.parse(site.maskContent || "{}");
        
        maskContent.eeat = {
            author: "Dr. Arda Yılmaz",
            bio: "Lead SEO Strategist and Digital Economy Researcher. His sole focus is analyzing deneme bonusu veren siteler hakkındaki her şey (2026).",
            editorialPolicy: "All research follows the 2026 high-integrity data protocols for trial bonuses.",
            trustBadges: ["Niche Authority: Deneme Bonusu", "DMCA Protected", "SSL Certified"]
        };

        maskContent.legalFooter = `
            <div class="legal-links" style="margin-top:20px; font-size: 11px; color:#a0aec0;">
                <a href="#">Gizlilik Politikası</a> | <a href="#">Çerez Tercihleri</a> | <a href="#">Kullanım Koşulları</a>
                <p>© 2026 ${site.name} Digital Research Division. All rights reserved.</p>
            </div>
        `;

        await prisma.site.update({
            where: { id: site.id },
            data: {
                maskContent: JSON.stringify(maskContent)
            }
        });
    }

    console.log("\n🚀 EEAT SIGNALS EMBEDDED IN DATABASE.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
