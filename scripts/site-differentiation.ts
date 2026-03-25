/**
 * 🎨 SITE DIFFERENTIATOR & SEO OPTIMIZER
 * Re-brands all 7 sites with unique niches and meta titles to avoid PBN penalties
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const siteStrategies: Record<string, any> = {
    'flovazcomercial.com': {
        name: 'Flovaz Bonus Otoritesi',
        title: 'Yatırımsız Deneme Bonusu Veren Siteler 2026 | Flovaz',
        desc: 'Mart 2026 güncel yatırımsız deneme bonusu veren siteler listesi. En iyi ve en yüksek karşılıksız bonusları keşfedin.',
        h1: '2026 Yatırımsız Bonus Radarımıza Hoş Geldiniz'
    },
    'haber-analiz2026.com': {
        name: 'Bahis Haber Analiz',
        title: 'Mart 2026 Bahis Haberleri ve Sektör Analizleri | Haber Analiz',
        desc: 'Günlük bahis haberleri, sektörel değişimler ve lisanslı sitelerin derinlemesine analizi. 2026\'nın en doğru haber kaynağı.',
        h1: 'Sektörün Nabzını Tutan Analiz Merkezi'
    },
    'vizyontekyazilim.com': {
        name: 'VizyonTek Casino Rehberi',
        title: 'Bedava Casino Bonusu ve Free Spin Listesi 2026 | VizyonTek',
        desc: 'En güvenilir casino sitelerinde bedava free spin ve deneme bonusları. VizyonTek ile kazandıran casino rehberi.',
        h1: 'Zirvedeki Casino Platformlarını Keşfedin'
    },
    'yasalbonus2026.com': {
        name: 'Yasal Bonus Portalı',
        title: 'Linaslı ve Yasal Bahis Siteleri 2026 | Güvenli Oyun Rehberi',
        desc: 'Sadece lisanslı ve vergi veren yasal bahis sitelerinin bonus kampanyaları. Mağduriyet yaşamadan güvenle oynayın.',
        h1: 'Yasal ve Güvenilir Bonusun Tek Adresi'
    },
    '2026bonuslar.com': {
        name: '2026 Bonus Koleksiyonu',
        title: 'Yeni Açılan Bahis Siteleri ve İlk Üyelik Bonusları 2026',
        desc: '2026\'da piyasaya yeni giren bahis siteleri ve sundukları devasa ilk üyelik bonusları. İlk siz haberdar olun.',
        h1: 'En Yeni Bonus Koleksiyonuna Göz Atın'
    },
    'bedavabonus2026.com': {
        name: 'Bedava Bonus Merkezi',
        title: 'Çevrimsiz Deneme Bonusu ve Freebet Fırsatları 2026',
        desc: 'Çevrim şartsız, yatırım gereksinimi olmayan en popüler bedava bonus ve freebet listesi. Anında nakit çekim imkanı.',
        h1: 'Bedava Bonusun En Kolay Hali Burada'
    },
    'independent-news.org': {
        name: 'Independent News - Casino News',
        title: 'Bağımsız Casino İncelemeleri ve Kara Liste 2026',
        desc: 'Güvenilir olmayan siteleri ifşa ediyoruz. Bağımsız denetimlerden geçen en sağlam bahis şirketleri rehberi.',
        h1: 'Bağımsız ve Tarafsız Casino Denetimi'
    }
};

async function main() {
    console.log("🚀 DIFFERENTIATING SITE METADATA TO CLIMB RANKINGS...");

    const sites = await prisma.site.findMany({ where: { isActive: true } });

    for (const site of sites) {
        const strategy = siteStrategies[site.domain];
        if (!strategy) continue;

        console.log(`\n⚙️ Updating ${site.domain}...`);
        
        let maskContent = JSON.parse(site.maskContent || "{}");
        // Update maskContent with specific strategy
        maskContent.seo = {
            title: strategy.title,
            description: strategy.desc,
            h1: strategy.h1
        };

        await prisma.site.update({
            where: { id: site.id },
            data: {
                name: strategy.name,
                metaTitle: strategy.title,
                maskContent: JSON.stringify(maskContent)
            }
        });
        
        console.log(`   ✅ New Name: ${strategy.name}`);
        console.log(`   ✅ New Title: ${strategy.title}`);
    }

    console.log("\n🏁 ALL SITES DIFFERENTIATED. GOOGLE WILL NOW SEE 7 UNIQUE ENTITIES INSTEAD OF 1 PBN.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
