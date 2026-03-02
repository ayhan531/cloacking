import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
    const sites = await prisma.site.findMany({
        where: { isActive: true },
        select: { id: true, domain: true, name: true, seoSettings: true }
    });
    console.log(JSON.stringify(sites, null, 2));
}
main().catch(console.error).finally(() => prisma.$disconnect());
