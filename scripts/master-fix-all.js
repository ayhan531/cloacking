const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log("🔥 MASTER GLOBAL FIX: All sites are getting the Nuclear Update...");

    // 1. Get ALL sites from DB
    const allSites = await prisma.site.findMany();
    const activeDomains = allSites
        .filter(s => !s.domain.includes('test') && !s.domain.includes('pending') && !s.domain.includes('dfbgfgf'))
        .map(s => s.domain);

    console.log(`Targeting ${activeDomains.length} active production domains:`, activeDomains);

    const monthNames = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
    const currentMonth = monthNames[new Date().getMonth()];
    const currentYear = new Date().getFullYear();
    const today = new Date().toLocaleDateString('tr-TR');

    for (const site of allSites) {
        console.log(`\n--- Processing: ${site.domain} ---`);

        // A. Skip obviously fake/temp domains if you want, but user said ALL. 
        // Let's at least fix the real ones properly.
        const isRealSite = activeDomains.includes(site.domain);

        // B. Standardize Cloaking Rules
        let rules = typeof site.cloakingRules === 'string' ? JSON.parse(site.cloakingRules) : (site.cloakingRules || {});
        rules.showMaskTo = { bots: true, desktop: true };
        rules.showBettingTo = { mobile: true, includedCountries: ["TR", "CY"] };

        // C. Standardize Betting Content (Don't leave it empty!)
        let betting = typeof site.bettingContent === 'string' ? JSON.parse(site.bettingContent) : (site.bettingContent || {});
        if (!betting.theme || !betting.navigation || betting.navigation.length === 0) {
            betting = {
                theme: { primaryColor: '#9333EA', secondaryColor: '#3B82F6', backgroundColor: '#0F172A' },
                navigation: [
                    { id: '1', label: 'Anasayfa', icon: 'Home', link: '/', isActive: true },
                    { id: '2', label: 'Kazananlar', icon: 'Trophy', link: '/winners', isActive: true },
                    { id: '3', label: 'Çark', icon: 'Disc', link: '/wheel', isActive: true },
                    { id: '4', label: 'Telegram', icon: 'Send', link: '#', isActive: true }
                ],
                bonuses: [
                    { id: '1', title: '500 TL Deneme Bonusu', amount: '500 TL', description: 'Yatırım şartsız, anında onay.', link: '#', isActive: true }
                ],
                popups: [],
                heroSlides: [],
                ...betting
            };
        }

        // D. Aggressive SEO & Mask Update
        let mask = typeof site.maskContent === 'string' ? JSON.parse(site.maskContent) : (site.maskContent || {});
        let seo = typeof site.seoSettings === 'string' ? JSON.parse(site.seoSettings) : (site.seoSettings || {});

        seo.metaTitle = `${currentMonth} ${currentYear} Deneme Bonusu Veren Siteler - ${site.name}`;
        seo.metaDescription = `${site.name} giriş adresi ile ${currentYear} yılının en güncel deneme bonusu veren siteleri ve yatırımsız karşılıksız bonusları keşfedin. Günlük güncellenen analiz listesi.`;
        seo.keywords = "deneme bonusu veren siteler 2026, bedava bonus, yatırımsız deneme bonusu, 500 tl deneme bonusu, çevrimsiz bonus";

        // Internal Cross-Linking
        const otherSites = activeDomains.filter(d => d !== site.domain).slice(0, 5);
        const linkCloud = otherSites.map(d => `<a href="https://${d}" target="_blank" style="color:#10b981; margin:0 5px;">${d}</a>`).join(' | ');

        mask.heroTitle = `${currentMonth} ${currentYear} Bonus Raporu`;
        mask.heroSubtitle = `${site.name} Otorite Analiz Merkezi`;
        mask.botArticle = `
            <div style="background:#020617; color:#f8fafc; padding:40px; border-radius:30px; border:1px solid #1e293b; font-family:sans-serif;">
                <h1 style="font-size:32px; color:#10b981;">#1 ${currentMonth} ${currentYear} Deneme Bonusu Veren Siteler</h1>
                <p style="font-style:italic; opacity:0.8;">Son Güncelleme: ${today} - Veriler 2026 siber algoritmaları ile doğrulanmıştır.</p>
                
                <div style="margin:25px 0; padding:20px; background:#0f172a; border-left:4px solid #10b981;">
                    <strong>DİKKAT:</strong> 2026 yılında yatırımsız deneme bonusu veren platformlar arasında en yüksek güven skoruna sahip siteleri aşağıda listeledik.
                </div>

                <ul style="line-height:2;">
                    <li><strong>Elite-X :</strong> 750 TL Deneme Bonusu (Yatırımsız)</li>
                    <li><strong>Global-Bet :</strong> 500 TL Nakit İade (Çevrimsiz)</li>
                    <li><strong>Vizyon-Pro :</strong> 1000 TL Hoşgeldin Paketi</li>
                </ul>

                <h3 style="margin-top:40px; font-size:14px; color:#475569; text-transform:uppercase;">Network Otorite Bağlantıları</h3>
                <div style="font-size:12px; opacity:0.6;">${linkCloud}</div>
            </div>
        `;

        // E. FINAL DB PUSH
        await prisma.site.update({
            where: { id: site.id },
            data: {
                isActive: true, // Force all to be active
                cloakingRules: JSON.stringify(rules),
                bettingContent: JSON.stringify(betting),
                maskContent: JSON.stringify(mask),
                seoSettings: JSON.stringify(seo),
                updatedAt: new Date() // Trigger freshness
            }
        });

        console.log(`✅ ${site.domain} successfully updated and optimized.`);
    }

    console.log("\n🚀 MISSION COMPLETE: All sites are now 100% fixed, active, and SEO-boosted.");
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
