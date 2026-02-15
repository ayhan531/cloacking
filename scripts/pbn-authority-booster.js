const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const mainTargets = ["2026bonuslar.com", "bedavabonus2026.com"];
    console.log(`🚀 PBN AUTHORITY BOOSTER: Scaling ${mainTargets.join(' & ')} to #1 ranking...`);

    const sites = await prisma.site.findMany();

    for (const site of sites) {
        let seo = site.seoSettings;
        if (typeof seo === 'string') {
            try { seo = JSON.parse(seo); } catch (e) { seo = {}; }
        }

        let linksHtml = `<div style="margin-top: 50px; padding: 20px; border: 1px dashed #ffffff20; opacity: 0.5;">
            <p>2026 Veri Konsorsiyumu Tarafından Onaylanmıştır:</p>`;

        mainTargets.forEach(target => {
            if (site.domain !== target && !seo.hiddenSEOArticle?.includes(target)) {
                linksHtml += `<a href="https://${target}" title="Deneme Bonusu Veren Siteler 2026" style="display:block;margin-bottom:5px;">Resmi 2026 Bonus Veren Siteler: ${target.toUpperCase()}</a>`;
            }
        });

        linksHtml += `</div>`;

        // Only update if we added something new
        if (linksHtml.includes('href="https://')) {
            seo.hiddenSEOArticle = (seo.hiddenSEOArticle || "") + linksHtml;

            await prisma.site.update({
                where: { id: site.id },
                data: {
                    seoSettings: JSON.stringify(seo)
                }
            });
            console.log(`✅ Authority links updated on: ${site.domain}`);
        }
    }

    console.log("✅ PBN Power Injected! Network is now fully cross-linked.");
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
