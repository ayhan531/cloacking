import { PrismaClient } from '@prisma/client';
import { CONSORTIUM_PARTNERS } from '../lib/consortium-engine';

const prisma = new PrismaClient();

async function main() {
    console.log("🔥 NUCLEAR GLOBAL SATURATION v4.0: 1st Page Dominance for ALL sites starting...");

    // Fetch all domains from DB
    const dbSites = await prisma.site.findMany({ select: { domain: true } });
    const dbDomains = dbSites.map(s => s.domain);

    // Merge with consortium partners
    const consortiumDomains = CONSORTIUM_PARTNERS.map(p => p.domain);

    // Unique list of all domains to saturate
    const allDomains = Array.from(new Set([...dbDomains, ...consortiumDomains, 'independent-news.org', 'vizyontekyazilim.com']));

    console.log(`📡 Targeting ${allDomains.length} domains for full saturation...`);

    const monthNames = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
    const currentMonth = monthNames[new Date().getMonth()];
    const currentYear = new Date().getFullYear();

    // Stratejik Temel Makaleler (v2.0 - Expanded)
    const baseNews = [
        { id: '1', title: `2026 Deneme Bonusu Veren Siteler: Tam Liste`, slug: 'deneme-bonusu-veren-siteler-2026', summary: 'Bu ayın en çok kazandıran platformlarını karşılaştırdık.', content: '2026 yılında deneme bonusu veren siteler arasında kıyasıya bir rekabet var. Özellikle 500 TL deneme bonusu veren siteler öne çıkıyor.', date: new Date().toISOString() },
        { id: '2', title: `Yatırımsız Bonus Analizi: Kimler Veriyor?`, slug: 'yatirim-sartsiz-bonus-2026', summary: 'Para yatırmadan kazanmanın en güvenli yolları.', content: 'Yatırım şartsız bonuslar 2026 yılında artık bir standart haline geldi. İşte güvenilir platformlar.', date: new Date().toISOString() },
        { id: '3', title: `En Güvenilir Bahis Altyapıları 2026`, slug: 'en-guvenilir-altyapilar', summary: 'Kapanmayan ve ödeme yapan siteleri nasıl anlarsınız?', content: 'Lisanslı altyapıların önemi 2026 yılında daha da arttı.', date: new Date().toISOString() },
        { id: '4', title: `500 TL Deneme Bonusu Veren Siteler 2026`, slug: '500-tl-deneme-bonusu-2026', summary: 'Yüksek limitli deneme bonusu veren siteler listelendi.', content: '500 TL deneme bonusu veren siteler 2026 listemizle yatırımsız kazanç fırsatlarını yakalayın.', date: new Date().toISOString() },
        { id: '5', title: `Slot Oyunlarında En Çok Freespin Veren Siteler`, slug: 'freespin-veren-siteler-2026', summary: 'Casino severler için yatırımsız dönüş fırsatları.', content: '2026 yılında Gates of Olympus ve Sugar Rush gibi oyunlarda geçerli freespinler.', date: new Date().toISOString() },
        { id: '16', title: `Global Audit Standards for iGaming 2026`, slug: 'global-audit-standards-2026', summary: 'Uluslararası denetim standartlarının dijital oyunlara entegrasyonu.', content: '2026 yılında bağımsız denetim kuruluşları, şeffaflık raporlarını her çeyrekte yayınlamak zorundadır.', date: new Date().toISOString() },
        { id: '17', title: `Algorithmic Fairness in RNG Systems`, slug: 'rng-algorithmic-fairness', summary: 'Rastgele sayı üreteçlerinin matematiksel doğrulanması.', content: 'Oyun adaletini sağlayan algoritmaların blockchain üzerindeki şeffaf izlenimi.', date: new Date().toISOString() },
        { id: '30', title: `User Identity Management in Web3`, slug: 'user-identity-web3', summary: 'Web3 dünyasında kullanıcı kimlik yönetimi.', content: 'Self-Sovereign Identity (SSI) modellerinin oyun platformlarına entegrasyonu.', date: new Date().toISOString() },
        { id: '50', title: `The Great Semantic Reset: Search in 2026`, slug: 'semantic-reset-search-2026', summary: 'Arama motorlarında anlamsal sıfırlama ve yeni kurallar.', content: 'Google SGE sonrası içerik otoritesinin yeniden tanımlanması.', date: new Date().toISOString() }
    ];

    // ALGORİTMİK İÇERİK FABRİKASI: 10 -> 210
    const niches = ["Regulatory", "Audit", "Financial", "Technical", "Security", "AI", "Blockchain", "Compliance", "Ethical", "Global", "Cyber", "Risk", "Strategy", "Protocol", "Analytic"];
    const keywords = ["Verification", "Protocol", "Analysis", "Standards", "Framework", "Governance", "Transparency", "Safety", "Trust", "Infrastructure", "Dominance", "Compliance", "Architecture", "Audit", "Review"];

    const generatedNews = [];
    for (let i = 1; i <= 200; i++) {
        const niche = niches[i % niches.length];
        const kw = keywords[i % keywords.length];
        const title = `${niche} ${kw} Report v${(i / 10).toFixed(1)}: ${currentMonth} ${currentYear} Stability Analysis`;
        const slug = `${niche.toLowerCase()}-${kw.toLowerCase()}-report-${i + 100}`;

        generatedNews.push({
            id: (i + 100).toString(),
            title: title,
            slug: slug,
            summary: `${niche} odaklı ${kw} süreçlerinin 2026 yılındaki derinlemesine analizi ve endüstri standartları.`,
            content: `${title} kapsamında, ${niche} regülasyonlarının ${kw} parametreleri üzerindeki etkisi incelenmektedir. 2026 yılındaki global değişimler bu raporun temelini oluşturur. Bu analiz, siber güvenlik ve finansal şeffaflık konularında yeni bir era başlatmaktadır.`,
            date: new Date().toISOString()
        });
    }

    const extendedNews = [...baseNews, ...generatedNews].slice(0, 200);

    // Get niche mappings from consortium-engine for correct branding
    const getDomainInfo = (domain: string) => {
        const partner = CONSORTIUM_PARTNERS.find(p => p.domain === domain);
        if (partner) return partner;
        return { name: domain.split('.')[0].toUpperCase(), niche: 'news' as any };
    };

    for (const domain of allDomains) {
        console.log(`🚀 Saturating Domain [${allDomains.indexOf(domain) + 1}/${allDomains.length}]: ${domain}...`);

        let site = await prisma.site.findUnique({ where: { domain } });
        const partnerInfo = getDomainInfo(domain);
        const siteName = partnerInfo.name;

        const seoSettings = {
            metaTitle: `${currentMonth} ${currentYear} Deneme Bonusu Veren Siteler - ${siteName} Official`,
            metaDescription: `${domain} - 2026 yılının en güncel, yatırımsız deneme bonusu ve bedava bonus veren siteler listesi. Profesyonel analiz ve teknik raporlar.`,
            keywords: "deneme bonusu veren siteler 2026, bonus veren siteler 2026, bedava bonus, yatırımsız deneme bonusu, casino bonusları, bahis analiz 2026"
        };

        // Preserve niche identity while injecting 200 articles
        let maskType: any = 'blog';
        if (partnerInfo.niche === 'audit' || partnerInfo.niche === 'legal') maskType = 'corporate';
        if (partnerInfo.niche === 'tech') maskType = 'corporate';
        if (domain.includes('flovaz')) maskType = 'corporate';

        const maskContent = {
            siteName: siteName,
            heroTitle: partnerInfo.niche === 'news' ? `${siteName} | 2026 Stratejik Analiz Akışı` : `${siteName} | 2026 Güvenlik ve Denetim Portalı`,
            heroSubtitle: "Global Audit Consortium - Yapay Zeka Destekli Teknik Veri Analiz Portalı v7.0",
            news: extendedNews,
            colorScheme: domain.includes('flovaz') ? { primary: '#1e293b', secondary: '#334155', accent: '#6366f1' } : {
                primary: '#10b981',
                secondary: '#064e3b',
                accent: '#34d399'
            },
            features: [
                { id: '1', icon: 'Shield', title: 'Risk Analizi', description: 'Platformların finansal risklerini uzman ekibimizle önceden belirliyoruz.' },
                { id: '2', icon: 'Shield', title: 'Lisans Doğrulama', description: 'Tüm sitelerin global oyun lisanslarını saniyeler içinde doğruluyoruz.' },
                { id: '3', icon: 'Shield', title: 'Poliçe Güvencesi', description: 'Geleceğinizi güvence altına alıyoruz.' },
            ],
            services: [
                { id: '1', name: 'Analiz', description: '2026 yılı dijital platform güvenlik standartları incelemesi.' },
                { id: '2', name: 'Sertifikasyon', description: 'Sitemizdeki firmalar güvenlik testlerinden geçmiştir.' }
            ]
        };

        if (site) {
            await prisma.site.update({
                where: { id: site.id },
                data: {
                    isActive: true,
                    maskType: maskType,
                    maskContent: JSON.stringify(maskContent),
                    seoSettings: JSON.stringify(seoSettings),
                    updatedAt: new Date()
                }
            });
        } else {
            await prisma.site.create({
                data: {
                    domain: domain,
                    name: siteName,
                    isActive: true,
                    maskType: maskType,
                    maskContent: JSON.stringify(maskContent),
                    seoSettings: JSON.stringify(seoSettings),
                    bettingContent: JSON.stringify({
                        theme: { primaryColor: '#10b981', secondaryColor: '#064e3b', backgroundColor: '#020617' },
                        navigation: [
                            { id: '1', label: 'Anasayfa', icon: 'Home', link: '/', isActive: true },
                            { id: '2', label: 'Analizler', icon: 'FileText', link: '/haberler', isActive: true }
                        ]
                    }),
                    cloakingRules: JSON.stringify({
                        showMaskTo: { bots: true, desktop: true },
                        showBettingTo: { mobile: true, includedCountries: ["TR", "CY"] }
                    })
                }
            });
        }
    }

    console.log("💎 GLOBAL NETWORK SATURATION COMPLETE: All sites updated to 200 articles!");
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
