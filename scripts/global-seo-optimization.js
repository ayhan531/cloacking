const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log("🚀 Starting Global Nuclear SEO Optimization...");

    const domains = [
        'flovazcomercial.com',
        'haber-analiz2026.com',
        'vizyontekyazilim.com',
        'yasalbonus2026.com',
        'bonusverensiteler2026.com'
    ];

    const currentMonth = new Intl.DateTimeFormat('tr-TR', { month: 'long' }).format(new Date());
    const currentYear = new Date().getFullYear();

    for (const domain of domains) {
        console.log(`Optimizing SEO for: ${domain}...`);

        const site = await prisma.site.findUnique({ where: { domain } });
        if (!site) continue;

        // 1. Aggressive Meta Tags
        const seoSettings = {
            metaTitle: `${currentMonth} ${currentYear} Deneme Bonusu Veren Siteler - ${site.name}`,
            metaDescription: `${site.name} ile 2026 yılının en güvenilir deneme bonusu veren sitelerine ulaşın. Yatırımsız deneme bonusu, bedava bonus ve yeni bahis siteleri listesi burada!`,
            keywords: "deneme bonusu veren siteler 2026, 2026 deneme bonusu, bedava bonus, yatırımsız deneme bonusu, yeni bahis siteleri 2026",
            ogTitle: `🔥 ${currentMonth} ${currentYear} Deneme Bonusu Fırsatları`,
            ogDescription: "2026'nın en yüksek bonus veren sitelerini keşfedin. Kesintisiz analiz ve güncel liste.",
        };

        // 2. Cross-Linking (Link to other domains in the network)
        const otherDomains = domains.filter(d => d !== domain);
        const internalLinks = otherDomains.map(d => {
            return `<a href="https://${d}" style="color: #10b981; font-weight: bold; margin-right: 10px;">${d} Analiz</a>`;
        }).join(' | ');

        // 3. Update Mask Content with persona-specific keywords
        let maskContent = typeof site.maskContent === 'string' ? JSON.parse(site.maskContent) : site.maskContent;

        maskContent.heroTitle = `Güvenilir ${currentYear} Veri Analiz Merkezi`;
        maskContent.heroSubtitle = `${site.name} ile Finansal Güvenlik ve Stratejik Bonus Denetimi`;

        // Add SEO Footer for links
        maskContent.seoFooter = `
            <div style="margin-top: 50px; padding: 20px; border-top: 1px solid #333; font-size: 12px; color: #666;">
                <p>Otorite Kaynaklarımız ve Partner Analiz Portallarımız:</p>
                ${internalLinks}
                <p style="margin-top: 20px;">
                    <strong>Deneme bonusu veren siteler 2026</strong> alanında yaptığımız global araştırmalar, 
                    <strong>bedava bonus</strong> ve <strong>yatırımsız deneme bonusu</strong> seçeneklerinin 
                    kullanıcı güvenliği için ne kadar kritik olduğunu kanıtlamıştır.
                </p>
            </div>
        `;

        await prisma.site.update({
            where: { id: site.id },
            data: {
                seoSettings: JSON.stringify(seoSettings),
                maskContent: JSON.stringify(maskContent),
                isActive: true
            }
        });
    }

    console.log("✅ Global SEO Optimization Complete! All sites are now cross-linked and keyword-optimized.");
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
