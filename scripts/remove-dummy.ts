import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log("Veritabanından sahte/test (pending- vb.) siteleri temizliyorum...");
    const deleted = await prisma.site.deleteMany({
        where: {
            OR: [
                { domain: { startsWith: 'pending-' } },
                { domain: 'dfbgfgf' },
                { domain: 'testfinal.com' },
                { domain: 'localhost' }
            ]
        }
    });
    console.log(`✅ ${deleted.count} adet sahte site veritabanından kalıcı olarak silindi!`);

    // Kalan siteleri listele
    const activeSites = await prisma.site.findMany({
        where: { isActive: true },
        select: { domain: true }
    });

    console.log("\n📊 ŞU AN SİSTEMDE KAYITLI AKTİF SİTELERİN:");
    activeSites.forEach((s: any) => console.log("- " + s.domain));
}

main().catch(console.error).finally(() => prisma.$disconnect());
