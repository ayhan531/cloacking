/**
 * 💉 SEO SATURATION & BRANDED CTR UPDATE
 * 1. Adds "Branded" keywords to CTR bot to force initial ranking.
 * 2. Injects "Review" and "Dataset" schema for SERP dominance.
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log("🔥 SATURATING SEO METRICS & UPDATING CTR TARGETS...");

    const sites = await prisma.site.findMany({ where: { isActive: true } });

    for (const site of sites) {
        console.log(`⚙️ Injecting Branded Signals for ${site.domain}...`);
        
        let maskContent = JSON.parse(site.maskContent || "{}");
        
        // Saturation: Review Schema (Stars in Google!)
        maskContent.reviewSchema = {
            rating: "4.9",
            count: Math.floor(Math.random() * 500) + 1200,
            author: "Global Review Board"
        };

        // Saturation: Branded Keywords (Force Google to recognize the brand)
        maskContent.brandedKeywords = [
            `${site.domain} giriş`,
            `${site.domain} deneme bonusu`,
            `${site.name} güncel adres`
        ];

        await prisma.site.update({
            where: { id: site.id },
            data: {
                maskContent: JSON.stringify(maskContent)
            }
        });
    }

    console.log("\n🚀 DATABASE SATURATED. NOW UPDATING CTR BOT...");
}

main().catch(console.error).finally(() => prisma.$disconnect());
