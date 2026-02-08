
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
            console.log(`Meta Title: ${seo.metaTitle}`);
            console.log(`Google Verification: ${seo.googleSiteVerification}`);
        } catch (e) {
            console.log('SEO Settings error');
        }
        console.log('------------------------');
    });
}

main().catch(console.error).finally(() => prisma.$disconnect());
