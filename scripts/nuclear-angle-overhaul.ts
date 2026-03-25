/**
 * 🔥 NUCLEAR ANGLE OVERHAUL (TOTAL SERP DOMINATION)
 * Gives all 7 sites completely unique visual identities and content to prevent Google Clustering.
 * This forces Google to treat each site as a unique 'Expert' source.
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const now = new Date();
const currentStr = `${now.getHours()}:${now.getMinutes() < 10 ? '0'+now.getMinutes() : now.getMinutes()}`;

const NUCLEAR_ANGLES = [
    { 
        domain: "flovazcomercial.com", 
        title: "RESMİ ANALİZ MERKEZİ", 
        h1: "2026 DENEME BONUSU OTORİTE RAPORU",
        sub: "Sektörün en köklü ve güvenilir analiz merkezi." 
    },
    { 
        domain: "haber-analiz2026.com", 
        title: "YATIRIMSIZ ŞARTSIZ GÜNDEM", 
        h1: "PARA YATIRMADAN ÇEKİM YAPILAN SİTELER",
        sub: "Hiç yatırım yapmadan doğrudan çekilebilen bonuslar." 
    },
    { 
        domain: "vizyontekyazilim.com", 
        title: "YAZILIM & GÜVENLİK ANALİZİ", 
        h1: "2026 SİTE GÜVENLİK VE LİSANS RAPORU",
        sub: "SSL 5.0 ve SHA-512 korumasıyla teknik analiz portalı." 
    },
    { 
        domain: "yasalbonus2026.com", 
        title: "YASAL & GÜVENLİ LİSTELER", 
        h1: "2026 LİSANSLI VE YASAL BAHİS DÜNYASI",
        sub: "Resmi lisans onaylı, şeffaf kazanç kapıları." 
    },
    { 
        domain: "2026bonuslar.com", 
        title: "FLAŞ BONUS MERKEZİ", 
        h1: "GÜNÜN EN YÜKSEK DENEME BONUSLARI",
        sub: "Saniyeler içinde hesabına yatan dev promosyonlar." 
    },
    { 
        domain: "bedavabonus2026.com", 
        title: "BEDAVA FREESPIN HABERLERİ", 
        h1: "2026 SLOT VE CASINO GIRIŞ REHBERİ",
        sub: "Bütün slotlarda geçerli bedava dönüş ve freebet." 
    },
    { 
        domain: "independent-news.org", 
        title: "BAĞIMSIZ HABER AJANSI", 
        h1: "MART 2026 ÖZEL SEKTÖR MANŞETLERİ",
        sub: "Bütün sitelerden bağımsız, objektif deneme bonusu analizi." 
    }
];

async function main() {
    console.log(`☢️ DETONATING NUCLEAR ANGLE OVERHAUL AT ${currentStr}...`);

    for (const angle of NUCLEAR_ANGLES) {
        console.log(`🚀 Reprogramming ${angle.domain}...`);
        
        const site = await prisma.site.findUnique({ where: { domain: angle.domain } });
        if (!site) continue;

        let seoSettings = JSON.parse(site.seoSettings || "{}");
        seoSettings.metaTitle = `🔥 ${angle.title}: [${currentStr}] | 22 Mart 2026 | Deneme Bonusu Veren Siteler Hakkındaki Her Şey 2026`;
        seoSettings.metaDescription = `${angle.h1}. ${angle.sub} 22 Mart saat ${currentStr} itibarıyla dakika dakika aktif!`;
        
        let maskContent = JSON.parse(site.maskContent || "{}");
        maskContent.heroTitle = angle.h1;
        maskContent.heroSubtitle = angle.sub;
        maskContent.siteName = angle.title;

        await prisma.site.update({
            where: { id: site.id },
            data: {
                seoSettings: JSON.stringify(seoSettings),
                maskContent: JSON.stringify(maskContent)
            }
        });
        
        console.log(`   ✅ ${angle.domain} repurposed.`);
    }

    console.log("\n☢️ ALL SITES REPROGRAMMED. RUNNING MASTER BLAST...");
}

main().catch(console.error).finally(() => prisma.$disconnect());
