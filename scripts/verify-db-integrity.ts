import { prisma } from '../lib/prisma';

async function main() {
    console.log('--- DETAILED DB CHECK ---');
    const sites = await prisma.site.findMany();

    for (const site of sites) {
        console.log(`- [${site.id}] Domain: '${site.domain}' (len: ${site.domain.length}), Name: '${site.name}', Active: ${site.isActive}`);
        try {
            JSON.parse(site.maskContent);
            JSON.parse(site.bettingContent);
            JSON.parse(site.seoSettings);
            console.log("   ✅ Valid JSON fields");
        } catch (e) {
            console.error("   ❌ INVALID JSON in fields!");
        }
    }
}

main().catch(console.error).finally(() => prisma.$disconnect());
