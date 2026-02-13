const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const site = await prisma.site.findUnique({
        where: { domain: 'flovazcomercial.com' }
    });
    console.log(JSON.stringify(site, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
