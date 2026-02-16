const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // Bütün hedef domainleri buraya ekledik ki her biri birbirini beslesin
    const allTargets = [
        "2026bonuslar.com",
        "bedavabonus2026.com",
        "yasalbonus2026.com",
        "haber-analiz2026.com",
        "bonusverensiteler2026.com",
        "flovazcomercial.com"
    ];

    console.log(`🚀 NUCLEAR PBN BOOSTER v2.0: Boosting ${allTargets.length} domains simultaneously...`);

    const sites = await prisma.site.findMany();

    for (const site of sites) {
        let seo = site.seoSettings;
        if (typeof seo === 'string') {
            try { seo = JSON.parse(seo); } catch (e) { seo = {}; }
        }

        // Her site için benzersiz, anahtar kelime zengini bir link bloğu oluşturuyoruz
        let linksHtml = `
            <div class="pbn-authority-signal-2026" style="margin-top: 60px; padding: 30px; border-top: 1px solid #ffffff10; background: rgba(0,0,0,0.2); border-radius: 20px;">
                <h4 style="color: #10b981; font-size: 14px; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 2px;">2026 Otorite Veri Paylaşım Ağı</h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
        `;

        allTargets.forEach(target => {
            // Sitenin kendisine link vermesini engelle
            if (site.domain !== target) {
                // Anahtar kelimeleri çeşitlendirerek Google'ın "spam" filtresine yakalanmıyoruz
                const keywords = [
                    "Deneme Bonusu Veren Siteler 2026",
                    "Yatırımsız Bonus Listesi",
                    "Güvenilir Bahis Analizleri",
                    "2026 Bonus Fırsatları",
                    "Bedava Bonus Otoritesi",
                    "Güncel Casino Haberleri"
                ];
                const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];

                linksHtml += `
                    <a href="https://${target}" title="${randomKeyword}" style="color: #94a3b8; text-decoration: none; font-size: 11px; display: block; padding: 5px; border-radius: 5px; background: rgba(255,255,255,0.02); transition: all 0.3s;">
                        # ${target.toUpperCase()} - ${randomKeyword}
                    </a>
                `;
            }
        });

        // Alt sayfalara da link vererek "Keşfedildi" sorununu çözüyoruz
        linksHtml += `
                </div>
                <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #ffffff05;">
                    <p style="color: #475569; font-size: 10px; font-style: italic;">
                        Bu kaynaklar 2026 yılı bağımsız denetleme kuruluşları tarafından ${site.domain} referansıyla doğrulanmıştır.
                    </p>
                </div>
            </div>
        `;

        // Eski linkleri temizle ve yenilerini ekle (Overlapping engellemek için)
        let currentSEOArticle = seo.hiddenSEOArticle || "";
        // Eğer zaten link bloğumuz varsa, onu güncelle
        if (currentSEOArticle.includes("pbn-authority-signal-2026")) {
            // Regex ile eski bloğu temizle
            currentSEOArticle = currentSEOArticle.replace(/<div class="pbn-authority-signal-2026"[\s\S]*?<\/div>\s*<\/div>/g, "");
        }

        seo.hiddenSEOArticle = currentSEOArticle + linksHtml;

        await prisma.site.update({
            where: { id: site.id },
            data: {
                seoSettings: JSON.stringify(seo)
            }
        });
        console.log(`✅ Cross-link updated for: ${site.domain}`);
    }

    console.log("🔥 NUCLEAR POWER INJECTED! Tüm siteler birbirine güçlü bağlarla kenetlendi.");
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
