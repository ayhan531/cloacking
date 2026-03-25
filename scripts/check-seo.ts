
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

    console.log("--- SEO DATA ---");
    console.log("Domain:", site.domain);
    console.log("SEO Settings:", site.seoSettings);
}

main().catch(console.error).finally(() => prisma.$disconnect());
