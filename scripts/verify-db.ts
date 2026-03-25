
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

    console.log("--- SITE DATA ---");
    console.log("Domain:", site.domain);
    console.log("Betting Content (Partial):", site.bettingContent?.substring(0, 500));
}

main().catch(console.error).finally(() => prisma.$disconnect());
