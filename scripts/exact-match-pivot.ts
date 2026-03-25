/**
 * 🎯 EXACT MATCH SHORT-TAIL PIVOT 
 * Removes "hakkındaki her şey" and strictly targets "Deneme Bonusu Veren Siteler 2026"
 */
import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

async function main() {
    console.log(`🎯 PIVOTING TARGET KEYWORD TO EXACT SHORT-TAIL...`);

    const sites = await prisma.site.findMany({ where: { isActive: true } });

    for (const site of sites) {
        let seoSettings = JSON.parse(site.seoSettings || "{}");
        seoSettings.keywords = "deneme bonusu veren siteler 2026, yatırımsız deneme bonusu, çevrimsiz freebet, güvenilir bahis siteleri";
        seoSettings.metaTitle = `🚨 #1 LİDER: [08:26] 24 Mart SABAH GÜNCEL | Deneme Bonusu Veren Siteler 2026`;
        seoSettings.metaDescription = `İşte beklediğiniz an! 24 Mart sabahı güncellenen, deneme bonusu veren siteler 2026 listesi burada. Yatırımsız ve çevrimsiz bonuslar.`;

        let maskContent = JSON.parse(site.maskContent || "{}");
        maskContent.h1 = `DENEME BONUSU VEREN SİTELER 2026`;
        if (maskContent.heroTitle) {
            maskContent.heroTitle = maskContent.heroTitle.replace('Hakkındaki Her Şey', '');
        }

        await prisma.site.update({
            where: { id: site.id },
            data: {
                seoSettings: JSON.stringify(seoSettings),
                maskContent: JSON.stringify(maskContent)
            }
        });
        
        console.log(`   ✅ Exact Match Applied to: ${site.domain}`);
    }

    console.log(`\n🎯 DATABASE UPDATED. ALL SITES NOW TARGETING EXACT SHORT-TAIL.`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
