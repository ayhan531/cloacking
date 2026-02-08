
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const domain = 'flovazcomercial.com';
    const site = await prisma.site.findUnique({ where: { domain } });

    if (!site) return;

    // NUCLEAR SEO SETTINGS for Flovaz
    const newSeo = {
        metaTitle: '2026 Deneme Bonusu Veren Siteler - Teknik Altyapı Rehberi | Elite Global Sigorta',
        metaDescription: 'Elite Global Sigorta 2026 raporu yayında: En güncel deneme bonusu veren siteler, yatırımsız şartsız bonus fırsatları ve platform güvenlik analizleri.',
        keywords: 'deneme bonusu veren siteler 2026, bedava bonus, yatırımsız bonus, flovaz sigorta, 2026 bahis rehberi',
        googleSiteVerification: JSON.parse(site.seoSettings).googleSiteVerification
    };

    await prisma.site.update({
        where: { domain },
        data: {
            name: 'Elite Global Sigorta',
            seoSettings: JSON.stringify(newSeo)
        }
    });

    console.log("🚀 Flovaz NUCLEAR SEO hamlesi yapıldı! Kelimeler en başa alındı.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
