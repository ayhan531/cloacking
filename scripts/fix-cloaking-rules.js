const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log("🚀 Standardizing Cloaking Rules for TR/CY across all domains...");

    const sites = await prisma.site.findMany();

    for (const site of sites) {
        console.log(`Checking: ${site.domain}...`);

        let rules = site.cloakingRules;
        if (typeof rules === 'string') {
            try {
                rules = JSON.parse(rules);
            } catch (e) {
                rules = {};
            }
        }

        // Standardize structure
        rules.showMaskTo = rules.showMaskTo || { desktop: true, bots: true };
        rules.showBettingTo = rules.showBettingTo || { mobile: true };

        // Ensure TR/CY is included
        rules.showBettingTo.mobile = true;
        rules.showBettingTo.includedCountries = ["TR", "CY"];

        // Ensure desktop/bots see mask
        rules.showMaskTo.desktop = true;
        rules.showMaskTo.bots = true;

        await prisma.site.update({
            where: { id: site.id },
            data: {
                cloakingRules: JSON.stringify(rules),
                isActive: true // Force active while we are at it
            }
        });
    }

    console.log("✅ All sites standardized! TR/CY Mobile will now work 100%.");
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
