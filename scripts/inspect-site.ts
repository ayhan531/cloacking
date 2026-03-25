
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const site = await prisma.site.findFirst({
        where: { domain: 'flovazcomercial.com' }
    });

    if (!site) {
        console.log("❌ Site not found");
        return;
    }

    console.log("--- FULL BETTING CONTENT ---");
    console.log(JSON.stringify(JSON.parse(site.bettingContent || "{}"), null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
