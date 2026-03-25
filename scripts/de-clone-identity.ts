/**
 * 🔥 DE-CLONE OVERDRIVE (PHASE 7 - TOTAL IDENTITY SEPARATION)
 * Assigns unique visual themes (colors, fonts) and completely unique academic texts to all 7 sites.
 * This ensures Google never flags them as copies.
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const THEMES = [
    { domain: "flovazcomercial.com", primary: "#10b981", bg: "bg-emerald-50", font: "font-outfit" },
    { domain: "haber-analiz2026.com", primary: "#6366f1", bg: "bg-indigo-50", font: "font-sans" },
    { domain: "vizyontekyazilim.com", primary: "#334155", bg: "bg-slate-50", font: "font-mono" },
    { domain: "yasalbonus2026.com", primary: "#b45309", bg: "bg-amber-50", font: "font-serif" },
    { domain: "2026bonuslar.com", primary: "#be185d", bg: "bg-pink-50", font: "font-outfit" },
    { domain: "bedavabonus2026.com", primary: "#7c3aed", bg: "bg-violet-50", font: "font-sans" },
    { domain: "independent-news.org", primary: "#0f172a", bg: "bg-gray-100", font: "font-serif" }
];

async function main() {
    console.log("🔥 DE-CLONING SITES WITH UNIQUE IDENTITIES...");

    for (const theme of THEMES) {
        console.log(`📡 Separating identity for ${theme.domain}...`);
        
        const site = await prisma.site.findUnique({ where: { domain: theme.domain } });
        if (!site) continue;

        let maskContent = JSON.parse(site.maskContent || "{}");
        // Inject unique theme into content
        maskContent.theme = {
            primary: theme.primary,
            bg: theme.bg,
            font: theme.font
        };

        // Unique Academic Abstract for each site
        const abstracts = [
            "Bu çalışma, 2026 dijital finans ekosistemindeki teşvik mekanizmalarının kullanıcı sadakati üzerindeki makroekonomik etkilerini incelemektedir.",
            "2026 yılındaki veriye dayalı pazarlama stratejileri ve tüketici davranışları analizi, karşılıksız deneme modellerinin başarısını kanıtlamıştır.",
            "Yazılım tabanlı güvenlik protokolleri (SSL 5.0) ve blokzincir entegrasyonlu test sistemlerinin sektörel güven endeksine katkısı raporlanmıştır.",
            "Yasal düzenlemeler ve şeffaf lisanslama süreçlerinin 2026 yılındaki global pazar genişlemesi üzerindeki belirleyici rolü analiz edilmiştir.",
            "Flaş promosyon sistemlerinin anlık kullanıcı etkileşimi ve server yük dengesi üzerindeki dinamik korelasyonu bu raporun temelidir.",
            "Slot ve casino mekaniklerinin oyun teorisi çerçevesinde incelenmesi ve freespin sistemlerinin matematiksel olasılık dağılımları sunulmuştur.",
            "Bağımsız haber ajansları tarafından derlenen 2026 sektörel raporu, pazar liderlerinin şeffaflık ve kullanıcı hakları karnesini ortaya koymaktadır."
        ];
        
        maskContent.abstract = abstracts[THEMES.indexOf(theme)];

        await prisma.site.update({
            where: { id: site.id },
            data: { maskContent: JSON.stringify(maskContent) }
        });
        
        console.log(`   ✅ ${theme.domain} is now a unique entity.`);
    }

    console.log("\n🔥 DE-CLONING COMPLETE.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
