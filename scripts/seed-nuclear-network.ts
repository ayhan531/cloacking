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

    const niches = ["Regulatory", "Audit", "Financial", "Technical", "Security", "AI", "Blockchain", "Compliance", "Ethical", "Global", "Cyber", "Risk", "Strategy", "Protocol", "Analytic"];
    const keywords = ["Verification", "Protocol", "Analysis", "Standards", "Framework", "Governance", "Transparency", "Safety", "Trust", "Infrastructure", "Dominance", "Compliance", "Architecture", "Audit", "Review"];

    // 🎤 SEMANTIC DNA SPINNING ENGINE: Generate 100% unique fingerprint per domain/article
    const generateUniqueNews = (domain: string, count: number) => {
        const spunNews = [];
        const domainName = domain.split('.')[0].toUpperCase();

        const intros = [
            `2026 yılı ${domainName} veri akışına göre,`,
            `${domainName} tarafından hazırlanan teknik raporda,`,
            `Global denetim standartları çerçevesinde ${domainName} analizi:`,
            `2026 iGaming ekosisteminde ${domainName} otorite onayıyla:`,
            `${domainName} veritabanından alınan son bilgilere göre,`,
            `Sektörel şeffaflık raporuna göre ${domainName} verileri:`,
            `2026 regülasyon uyum süreci kapsamında ${domainName} tarafından bildirilen:`,
            `Ekonomik istikrar ve oyun adaletinde ${domainName} imzalı rapor:`,
        ];

        const bodies = [
            `sektördeki şeffaflık protokollerini yeniden tanımlıyor. Bu gelişme, <strong>deneme bonusu veren siteler</strong> arasındaki dengeyi değiştiriyor.`,
            `güvenlik katmanları ve API entegrasyonları üzerinde kritik bir rol oynamaktadır. Özellikle <strong>bonus veren siteler</strong> için yeni bir çağ başlıyor.`,
            `yatırımsız deneme bonusu veren siteler arasındaki rekabeti körüklüyor. ${domainName} bu süreçte denetleyici rol üstleniyor.`,
            `kullanıcı güvenliği için SHA-256 doğrulama hashlerini devreye aldı. Bu sistem ${domainName} altyapısının bir parçasıdır.`,
            `finansal stabilite ve hızlı çekim garantisiyle öne çıkan platformları inceliyor. Yatırımcılar için 2026 yılı kritik.`,
            `kripto tabanlı ödeme sistemlerinin iGaming entegrasyonunda ${domainName} standartlarını referans alıyor.`,
            `yapay zeka destekli hile koruma sistemlerinde ${domainName} patentli teknolojiler kullanılıyor.`,
        ];

        const conclusion = [
            `Bu analiz ${domainName} tarafından saniyede 128-bit şifreleme ile onaylanmıştır.`,
            `Raporun tam detayı ${domainName} resmi arşivlerinde saklanmaktadır.`,
            `2026 vizyonu kapsamında ${domainName} bu verileri anlık olarak güncellemektedir.`,
            `Güvenlik ID: 0x${Math.random().toString(16).substr(2, 6).toUpperCase()} ile ${domainName} ağına kaydedilmiştir.`,
            `Otorite Doğrulama Kodu: ${domainName}-2026-X${Math.floor(Math.random() * 999)}`,
            `Bu içerik ${domainName} News Network tarafından global dağıtım ağına servis edilmiştir.`,
        ];

        const adjectives = ["Kritik", "Stratejik", "Teknik", "Finansal", "Global", "Hukuki", "Dijital", "Hiyerarşik", "Otomasyonel", "Yapay Zeka Destekli"];

        for (let i = 1; i <= count; i++) {
            const niche = niches[i % niches.length];
            const kw = keywords[i % keywords.length];
            const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
            const intro = intros[Math.floor(Math.random() * intros.length)];
            const body = bodies[Math.floor(Math.random() * bodies.length)];
            const concl = conclusion[Math.floor(Math.random() * conclusion.length)];

            // 🧬 Domain-based Slug variation to avoid cross-domain collisions
            const title = `${domainName} ${adj} ${niche} ${kw} Analizi v${(i / 13).toFixed(1)}`;
            const slug = `${domainName.toLowerCase()}-${adj.toLowerCase()}-${niche.toLowerCase()}-${kw.toLowerCase()}-${i + 1000}`;

            spunNews.push({
                id: (i + 1000).toString(),
                title: title,
                slug: slug,
                summary: `${intro} ${niche} odaklı ${kw} süreçlerinin 2026 yılındaki ${adj.toLowerCase()} analizi.`,
                content: `
                    <p>${intro} <strong>${niche}</strong> ve <strong>${kw}</strong> parametreleri ${body}</p>
                    <div class="audit-verification" style="border-left: 2px solid #10b981; padding-left: 10px; margin: 10px 0; font-size: 10px; color: #64748b;">
                        VERIFICATION_HASH: ${Math.random().toString(36).substr(2, 10).toUpperCase()}<br/>
                        NODE_ID: ${domainName}-S${i}<br/>
                        TIMESTAMP: ${new Date().toISOString()}
                    </div>
                    <p>${concl}</p>
                `,
                date: new Date(Date.now() - Math.floor(Math.random() * 86400000)).toISOString()
            });
        }
        return spunNews;
    };

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

        // 🧬 DNA Diversification happens here
        const domainSpecificNews = generateUniqueNews(domain, 200);

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
            news: domainSpecificNews,
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
