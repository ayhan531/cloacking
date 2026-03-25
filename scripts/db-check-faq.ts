import { PrismaClient } from '@prisma/client';
const p = new PrismaClient();
async function main() {
    const s = await p.site.findUnique({ where: { domain: 'flovazcomercial.com' } });
    if (!s) {
        console.log('Site NOT found');
        return;
    }
    const mask = JSON.parse(s.maskContent || '{}');
    console.log('FAQ KEYS:', Object.keys(mask));
    console.log('FAQ DATA:', mask.faq);
}
main().finally(() => p.$disconnect());
