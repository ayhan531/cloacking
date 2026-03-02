import { prisma } from '../lib/prisma';

async function main() {
    console.log('--- DB Debug ---');
    console.log('DATABASE_URL env:', process.env.DATABASE_URL);

    try {
        const count = await prisma.site.count();
        console.log('Total Sites Count:', count);

        const sites = await prisma.site.findMany({
            select: { domain: true, isActive: true, name: true }
        });

        console.log('All Sites in DB:', JSON.stringify(sites, null, 2));

        // Test matching for one of the user's sites
        const testDomain = 'flovazcomercial.com';
        const site = await prisma.site.findUnique({
            where: { domain: testDomain.toLowerCase().replace('www.', '') }
        });

        if (site) {
            console.log(`✅ MATCH FOUND for ${testDomain}:`, { id: site.id, name: site.name, isActive: site.isActive });
        } else {
            console.log(`❌ NO MATCH for ${testDomain}`);
        }

    } catch (err) {
        console.error('❌ DB Error:', err);
    }
}

main().catch(console.error).finally(() => prisma.$disconnect());
