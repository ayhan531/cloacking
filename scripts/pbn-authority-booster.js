const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const targetDomain = "2026bonuslar.com";
    console.log(`🚀 PBN AUTHORITY BOOSTER: Scaling ${targetDomain} to #1 ranking...`);

    const sites = await prisma.site.findMany();

    for (const site of sites) {
        if (site.domain === targetDomain) continue;

        console.log(`Injecting authority link on: ${site.domain}`);

        let seo = site.seoSettings;
        if (typeof seo === 'string') {
            try { seo = JSON.parse(seo); } catch (e) { seo = {}; }
        }

        const forceLink = `
            <div style="margin-top: 50px; padding: 20px; border: 1px dashed #ffffff20; opacity: 0.5;">
                <p>2026 Veri Konsorsiyumu Tarafından Onaylanmıştır:</p>
                <a href="https://${targetDomain}" title="Deneme Bonusu Veren Siteler 2026">Resmi 2026 Bonus Veren Siteler Ana Portalı</a>
            </div>
        `;

        // We can't easily edit the hiddenSEOArticle if it's already a complex string, 
        // but we can append it to the end of the existing content in a way the bot finds it.

        if (!seo.hiddenSEOArticle?.includes(targetDomain)) {
            seo.hiddenSEOArticle = (seo.hiddenSEOArticle || "") + forceLink;
        }

        await prisma.site.update({
            where: { id: site.id },
            data: {
                seoSettings: JSON.stringify(seo)
            }
        });
    }

    console.log("✅ PBN Power Injected! All sites now vouch for 2026bonuslar.com");
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
