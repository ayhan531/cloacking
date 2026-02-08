import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const id = '82ed3fee-54e5-4277-b856-8ae1ebed68ec';
    const newDomain = 'haber-analiz2026.com';
    const newName = 'Haber Analiz 2026';

    const site = await prisma.site.findUnique({
        where: { id }
    });

    if (!site) {
        console.error('Site not found');
        return;
    }

    const maskContent = JSON.parse(site.maskContent);
    maskContent.siteName = newName;
    maskContent.heroTitle = 'Türkiye\'nin En Güncel Haber ve Analiz Portalı';

    const seoSettings = JSON.parse(site.seoSettings);
    seoSettings.metaTitle = 'Haber Analiz 2026 - Güncel Gündem ve Analizler';
    seoSettings.metaDescription = '2026 yılının en güncel haberleri, derinlemesine analizler ve son dakika gelişmeleri ile Türkiye\'nin haber merkezi.';

    await prisma.site.update({
        where: { id },
        data: {
            name: newName,
            domain: newDomain,
            maskContent: JSON.stringify(maskContent),
            seoSettings: JSON.stringify(seoSettings)
        }
    });

    console.log(`Successfully updated site ${id} to ${newDomain}`);
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
