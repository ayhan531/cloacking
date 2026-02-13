
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const sites = await prisma.site.findMany();
    console.log('--- REGISTERED SITES ---');
    sites.forEach(site => {
        console.log(`ID: ${site.id}`);
        console.log(`Name: ${site.name}`);
        console.log(`Domain: ${site.domain}`);
        console.log(`Is Active: ${site.isActive}`);
        try {
            const seo = JSON.parse(site.seoSettings);
            const mask = JSON.parse(site.maskContent);
            console.log(`Meta Title: ${seo.metaTitle}`);
            console.log(`Google Verification: ${seo.googleSiteVerification}`);
            console.log(`Has Bot Article: ${!!mask.botArticle}`);
            if (mask.botArticle) {
                console.log(`Bot Article Size: ${mask.botArticle.length} chars`);
            }
        } catch (e) {
            console.log('Settings parse error');
        }
        console.log('------------------------');
    });
}

main().catch(console.error).finally(() => prisma.$disconnect());
