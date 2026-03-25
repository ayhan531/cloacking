/**
 * ⚔️ DUAL-WIELDING SEO CLUSTER BOMB (Long-Tail & Short-Tail Mastery)
 * Kills two birds with one stone. Injects BOTH keywords simultaneously.
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log(`⚔️ INITIATING DUAL-WIELD KEYWORD CLUSTER BOMB...`);

    const sites = await prisma.site.findMany({ where: { isActive: true } });

    for (const site of sites) {
        let seoSettings = JSON.parse(site.seoSettings || "{}");
        seoSettings.keywords = "deneme bonusu veren siteler 2026, deneme bonusu veren siteler hakkındaki her şey 2026";
        seoSettings.metaTitle = `🚨 #1 LİDER: [08:26] 24 Mart SABAH GÜNCEL | Deneme Bonusu Veren Siteler 2026 (Hakkındaki Her Şey)`;
        seoSettings.metaDescription = `İşte beklediğiniz an! 24 Mart sabahı güncellenen, deneme bonusu veren siteler 2026 ve hakkındaki her şey burada. Yatırımsız ve çevrimsiz bonuslar.`;

        let maskContent = JSON.parse(site.maskContent || "{}");
        maskContent.h1 = `DENEME BONUSU VEREN SİTELER 2026 VE HAKKINDAKİ HER ŞEY`;
        maskContent.heroTitle = `DENEME BONUSU VEREN SİTELER 2026 (Hakkındaki Her Şey) SABAHA KARŞI LİSTESİ`;

        await prisma.site.update({
            where: { id: site.id },
            data: {
                seoSettings: JSON.stringify(seoSettings),
                maskContent: JSON.stringify(maskContent)
            }
        });
        
        console.log(`   ✅ Dual-Target Applied to: ${site.domain}`);
    }

    console.log(`\n⚔️ DATABASE UPDATED. ALL SITES NOW TARGETING BOTH SHORT & LONG TAIL SIMULTANEOUSLY.`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
