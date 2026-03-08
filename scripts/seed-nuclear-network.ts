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

    // 🎤 ULTIMATE SEMANTIC DNA SPINNING ENGINE v5.0: Generate 100% unique fingerprint per domain/article
    const generateUniqueNews = (domain: string, count: number) => {
        const spunNews = [];
        const domainName = domain.split('.')[0].toUpperCase();

        const intros = [
            `2026 yılı ${domainName} dijital veri akışına göre,`,
            `${domainName} platformu tarafından hazırlanan detaylı teknik raporda,`,
            `Global denetim standartları (audit) çerçevesinde ${domainName} analizi sonucu:`,
            `2026 iGaming ve dijital eğlence ekosisteminde ${domainName} otorite onayıyla:`,
            `${domainName} merkezi veritabanından alınan anlık verilere göre,`,
            `Sektörel şeffaflık raporu (Transparency Index) kapsamında ${domainName} verileri:`,
            `2026 regülasyon uyum süreci (Compliance) kapsamında ${domainName} tarafından bildirilen:`,
            `Ekonomik istikrar ve oyun adaletinde ${domainName} imzalı teknik rapor:`,
            `${domainName} uzmanları tarafından gerçekleştirilen derinlemesine inceleme neticesinde:`,
            `Dijital şeffaflık politikası uyarınca ${domainName} üzerinden servis edilen:`,
            `2026 yılının en kapsamlı risk-kazanç analizinde ${domainName} bulguları:`,
            `Bağımsız denetçiler ve ${domainName} iş birliğiyle hazırlanan deklarasyonda:`
        ];

        const bodies = [
            `sektördeki şeffaflık protokollerini ve kullanıcı güvenlik katmanlarını yeniden tanımlıyor. Bu gelişme, <strong>deneme bonusu veren siteler</strong> arasındaki rekabeti kökten değiştiriyor.`,
            `güvenlik mimarisi ve API katmanları üzerinde kritik bir rol oynamaktadır. Özellikle <strong>bonus veren siteler 2026</strong> rehberleri için yeni bir standart belirleniyor.`,
            `yatırımsız deneme bonusu sağlayan platformlar arasındaki pazar payı dengelerini değiştiriyor. ${domainName} bu süreçte stratejik bir denetleyici rol üstleniyor.`,
            `kullanıcı veri güvenliği için SHA-512 şifreleme ve anlık doğrulama sistemlerini devreye aldı. Bu yenilik ${domainName} ağının temel taşıdır.`,
            `finansal istikrar, yüksek çekim limitleri ve hızlı ödeme garantisiyle öne çıkan markaları teknik olarak inceliyor. Yatırımcılar için 2026 vizyonu oldukça parlak.`,
            `kripto varlık tabanlı ödeme geçitlerinin (Gateway) entegrasyonunda ${domainName} standartlarını ana referans noktası olarak alıyor.`,
            `yapay zeka destekli dolandırıcılık önleme (Anti-Fraud) sistemlerinde ${domainName} tarafından geliştirilen algoritmalar aktif olarak kullanılıyor.`,
            `pazarın en yüksek oranlı ve en şeffaf bonus kampanyalarını sunan mecraları metodolojik bir yaklaşımla listeleyerek kullanıcılara sunuyor.`,
            `altyapı sağlayıcılarının (Infrastructure) sertifikasyon süreçlerini saniyeler içinde tamamlayabilen yeni bir node sistemine geçiş yaptı.`
        ];

        const conclusion = [
            `Bu stratejik analiz ${domainName} tarafından saniyede 256-bit şifreleme ile doğrulanmış ve global arşive eklenmiştir.`,
            `Raporun tüm teknik detayları ve log kayıtları ${domainName} resmi audit sunucularında güvenle saklanmaktadır.`,
            `2026 gelecek vizyonu kapsamında ${domainName} bu verileri anlık (Real-time) olarak güncellemeye devam etmektedir.`,
            `Güvenlik ID: 0x${Math.random().toString(16).substr(2, 8).toUpperCase()} referans kodu ile ${domainName} blockchain ağına işlenmiştir.`,
            `Otorite Doğrulama Kodu: ${domainName}-2026-ALPHA-${Math.floor(Math.random() * 99999)}`,
            `Bu özel içerik ${domainName} News Synergy Network tarafından global dağıtım ağına yüksek öncelikle servis edilmiştir.`,
            `Tüm hakları ${domainName} Global iGaming Intelligence birimi tarafından saklı tutulmaktadır.`
        ];

        const adjectives = ["Kritik", "Stratejik", "Metodolojik", "Finansal", "Global", "Hukuki", "Dijital", "Derinlemesine", "Otomasyonel", "Yapay Zeka Destekli", "Bütünsel", "Şeffaf"];

        for (let i = 1; i <= count; i++) {
            const niche = niches[i % niches.length];
            const kw = keywords[i % keywords.length];
            const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
            const intro = intros[Math.floor(Math.random() * intros.length)];
            const body = bodies[Math.floor(Math.random() * bodies.length)];
            const concl = conclusion[Math.floor(Math.random() * conclusion.length)];

            // 🧬 Domain-based Slug variation to avoid cross-domain collisions
            const title = `${domainName}: ${adj} ${niche} ve ${kw} Raporu v${(i / 13 + 1).toFixed(1)}`;
            const slug = `${domainName.toLowerCase()}-${adj.toLowerCase().replace(' ', '-')}-${niche.toLowerCase()}-${kw.toLowerCase()}-${i + 1000}`;

            spunNews.push({
                id: (i + 1000).toString(),
                title: title,
                slug: slug,
                summary: `${intro} ${niche} odaklı ${kw} süreçlerinin 2026 yılındaki ${adj.toLowerCase()} boyutları incelendi.`,
                content: `
                    <div class="analysis-content-wrapper p-4">
                        <p class="text-lg leading-relaxed mb-4">${intro} <strong>${niche}</strong> ve <strong>${kw}</strong> parametreleri ışığında ${body}</p>
                        <section class="meta-data-box my-6 p-6 bg-slate-100 rounded-3xl border border-slate-200">
                             <h5 class="text-sm font-black mb-2 uppercase text-slate-500">Teknik Verifikasyon Katmanı:</h5>
                             <ul class="text-[11px] font-mono text-slate-400 space-y-1 list-none p-0">
                                <li>HASH_ALGO: SHA-512_ENCRYPTED</li>
                                <li>VERIFICATION_SIGNATURE: ${Math.random().toString(36).substr(2, 12).toUpperCase()}</li>
                                <li>METRIC_ID: ${domainName}-STABLE-${i}</li>
                                <li>SCAN_NODE: GLOBAL-AUDIT-SERVER-${Math.floor(Math.random() * 99)}</li>
                             </ul>
                        </section>
                        <p class="mb-4">Araştırmanın ikinci aşamasında, ${domainName} mühendisleri tarafından geliştirilen hibrit modelleme teknikleri kullanılarak pazarın en güvenilir <strong>deneme bonusu</strong> teklifleri ayrıştırılmıştır. Bu süreç, kullanıcılar için maksimum şeffaflık sağlamayı amaçlar.</p>
                        <div class="trust-signal mt-2 p-2 bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-widest text-center rounded-lg">
                            ${domainName} // VERIFIED_SOURCE // REVALIDATION_DATE: ${new Date().toLocaleDateString('tr-TR')}
                        </div>
                        <p class="mt-6 italic text-slate-500 border-t pt-4">${concl}</p>
                    </div>
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

        // 🎯 DOMAIN-SPECIFIC UNIQUE SEO — Each site targets DIFFERENT keywords to avoid cannibalization
        const domainSeoMap: Record<string, { title: string; desc: string; kw: string }> = {
            'flovazcomercial.com': {
                title: `Deneme Bonusu Veren Siteler 2026 ✅ Yatırımsız ${currentMonth} Listesi`,
                desc: `${currentMonth} ${currentYear} güncel deneme bonusu veren siteler listesi! 500 TL yatırımsız bonus, çevrimsiz freebet ve bedava casino deneme fırsatları. Editör onaylı güvenilir siteler.`,
                kw: 'deneme bonusu veren siteler, deneme bonusu veren siteler 2026, yatırımsız deneme bonusu, deneme bonusu'
            },
            'bedavabonus2026.com': {
                title: `Bedava Bonus Veren Siteler 2026 🎁 ${currentMonth} Güncel Liste`,
                desc: `2026 bedava bonus veren siteler tam listesi. Ücretsiz casino bonusları, kayıt bonusu, hoşgeldin freespin kampanyaları. Para yatırmadan kazanmaya başla!`,
                kw: 'bedava bonus, bedava bonus veren siteler, ücretsiz bonus 2026, kayıt bonusu, hoşgeldin bonusu'
            },
            'haber-analiz2026.com': {
                title: `Bahis Haberleri ve Bonus Analiz 2026 📰 ${currentMonth} Raporu`,
                desc: `2026 yılı bahis dünyası haberleri, yeni açılan siteler, bonus kampanya analizleri ve editör incelemeleri. Günlük güncellenen tarafsız bahis haberleri.`,
                kw: 'bahis haberleri, bonus analiz 2026, bahis site incelemeleri, yeni bahis siteleri 2026'
            },
            'vizyontekyazilim.com': {
                title: `Casino Siteleri İnceleme 2026 🔍 Güvenilir Platform Rehberi - ${currentMonth}`,
                desc: `Güvenilir casino siteleri teknik inceleme ve karşılaştırma. Lisans doğrulama, ödeme hızı testi, kullanıcı yorumları. 2026 en iyi casino siteleri rehberi.`,
                kw: 'güvenilir casino siteleri, casino siteleri 2026, casino incelemeleri, en iyi casino siteleri'
            },
            'yasalbonus2026.com': {
                title: `Yasal Bahis Siteleri 2026 ⚖️ Lisanslı ve Güvenilir ${currentMonth} Listesi`,
                desc: `Türkiye'de yasal ve lisanslı bahis siteleri 2026 tam rehberi. BTK onaylı, MGA lisanslı güvenilir platformlar. Yasal bonus kampanyaları ve giriş adresleri.`,
                kw: 'yasal bahis siteleri, lisanslı bahis siteleri 2026, güvenilir bahis siteleri, yasal bonus'
            },
            '2026bonuslar.com': {
                title: `Casino Bonusları 2026 🎰 Çevrimsiz Freebet ve Freespin ${currentMonth}`,
                desc: `2026 en yüksek casino bonusları! Çevrimsiz freebet, 200 freespin, nakit iade kampanyaları. Slot ve canlı casino bonuslarını karşılaştır. Kaçırma!`,
                kw: 'casino bonusları 2026, çevrimsiz bonus, freespin veren siteler, freebet 2026, slot bonusu'
            },
            'independent-news.org': {
                title: `Bağımsız Bahis İncelemeleri 2026 📊 Tarafsız Site Denetim Raporu`,
                desc: `Bağımsız ve tarafsız online bahis sitesi incelemeleri. Doğrulanmış kullanıcı yorumları, ödeme kanıtları ve güvenlik denetim raporları. 2026 güncel.`,
                kw: 'bağımsız bahis inceleme, bahis site denetim, güvenilir bahis incelemeleri 2026, tarafsız casino değerlendirme'
            }
        };

        const domainSeo = domainSeoMap[domain] || {
            title: `${currentMonth} ${currentYear} Deneme Bonusu Veren Siteler - ${siteName}`,
            desc: `${domain} - 2026 yılının en güncel bonus rehberi.`,
            kw: 'deneme bonusu veren siteler 2026'
        };

        const seoSettings = {
            metaTitle: domainSeo.title,
            metaDescription: domainSeo.desc,
            keywords: domainSeo.kw
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

        // Standard betting navigation (NO ÇARK!)
        const bettingNav = {
            theme: { primaryColor: '#a855f7', secondaryColor: '#7c3aed', backgroundColor: '#0F172A' },
            navigation: [
                { id: '1', label: 'Anasayfa', icon: 'Home', link: '/', isActive: true },
                { id: '2', label: 'Kazananlar', icon: 'Trophy', link: '#', isActive: true },
                { id: '3', label: 'Çekilişler', icon: 'Gift', link: '#', isActive: true },
                { id: '4', label: 'Telegram', icon: 'Send', link: 'https://t.me/atlastunahan', isActive: true },
                { id: '5', label: 'İletişim', icon: 'Plus', link: 'https://t.me/atlastunahan', isActive: true }
            ],
            brandCarousel: [
                { id: '1', name: 'BetKing', logo: 'https://placehold.co/200x80/1e293b/a855f7?text=BetKing', link: '#' },
                { id: '2', name: 'CasinoMax', logo: 'https://placehold.co/200x80/1e293b/ec4899?text=CasinoMax', link: '#' },
                { id: '3', name: 'SlotVIP', logo: 'https://placehold.co/200x80/1e293b/f59e0b?text=SlotVIP', link: '#' },
                { id: '4', name: 'BonusPro', logo: 'https://placehold.co/200x80/1e293b/10b981?text=BonusPro', link: '#' },
                { id: '5', name: 'MegaBet', logo: 'https://placehold.co/200x80/1e293b/3b82f6?text=MegaBet', link: '#' },
                { id: '6', name: 'WinStrike', logo: 'https://placehold.co/200x80/1e293b/ef4444?text=WinStrike', link: '#' }
            ],
            liveWinners: [
                { id: '1', brandLogo: 'https://placehold.co/100x100/1e293b/a855f7?text=WIN', amount: '45.000 ₺', username: 'Tunahan***', timeAgo: '2 dk önce', game: 'Sweet Bonanza' },
                { id: '2', brandLogo: 'https://placehold.co/100x100/1e293b/a855f7?text=WIN', amount: '12.300 ₺', username: 'Ahmet***', timeAgo: '5 dk önce', game: 'Gates of Olympus' },
                { id: '3', brandLogo: 'https://placehold.co/100x100/1e293b/a855f7?text=WIN', amount: '150.000 ₺', username: 'Can***', timeAgo: '8 dk önce', game: 'Aviator' },
                { id: '4', brandLogo: 'https://placehold.co/100x100/1e293b/a855f7?text=WIN', amount: '5.450 ₺', username: 'Elif***', timeAgo: '12 dk önce', game: 'Rulet' },
                { id: '5', brandLogo: 'https://placehold.co/100x100/1e293b/a855f7?text=WIN', amount: '24.900 ₺', username: 'Burak***', timeAgo: '15 dk önce', game: 'Blackjack' }
            ],
            giveaways: [
                { id: '1', title: '🎁 MEGA ÇEKİLİŞ - iPhone 16 Pro Max', prize: 'iPhone 16 Pro Max', participantCount: '4857', endDate: '2026-03-15', image: 'https://placehold.co/400x200/1e293b/a855f7?text=iPhone+16' },
                { id: '2', title: '💰 NAKİT ÇEKİLİŞ - 50.000 ₺', prize: '50.000 ₺ Nakit', participantCount: '7234', endDate: '2026-03-20', image: 'https://placehold.co/400x200/1e293b/ec4899?text=50K+TL' },
                { id: '3', title: '🚗 ARAÇ ÇEKİLİŞİ - Tesla Model 3', prize: 'Tesla Model 3', participantCount: '12890', endDate: '2026-04-01', image: 'https://placehold.co/400x200/1e293b/10b981?text=Tesla' }
            ],
            heroSlides: [
                { id: '1', title: '🔥 2026 EN YÜKSEK BONUS!', subtitle: 'Yatırımsız 500 TL Anında Hesabına.', ctaText: 'HEMEN AL', ctaLink: '#', bgColor: 'from-purple-600 to-pink-600' },
                { id: '2', title: '🎰 FREE SPİN YAĞMURU', subtitle: '200 Freespin hediye!', ctaText: 'DÖNÜŞLERE BAŞLA', ctaLink: '#', bgColor: 'from-blue-600 to-cyan-500' }
            ],
            siteListings: [
                { id: '1', name: 'BetKing Casino', rating: 9.8, bonus: '500 TL Deneme Bonusu', features: ['Hızlı Çekim', 'Lisanslı', '7/24 Destek'], link: '#', logo: 'https://placehold.co/100x50/1e293b/a855f7?text=BetKing', isPopular: true, isTrending: true },
                { id: '2', name: 'CasinoMax Elite', rating: 9.6, bonus: '333 TL Yatırımsız', features: ['Kripto Ödeme', 'Çevrimsiz', 'VIP'], link: '#', logo: 'https://placehold.co/100x50/1e293b/ec4899?text=CasinoMax', isPopular: true, isTrending: false },
                { id: '3', name: 'SlotVIP 2026', rating: 9.4, bonus: '200 Freespin', features: ['Slot Oyunları', 'Anlık Bonus', 'Mobil'], link: '#', logo: 'https://placehold.co/100x50/1e293b/f59e0b?text=SlotVIP', isPopular: false, isTrending: true },
                { id: '4', name: 'MegaBet Pro', rating: 9.2, bonus: '750 TL Hoşgeldin', features: ['Canlı Casino', 'E-Spor', 'Hızlı'], link: '#', logo: 'https://placehold.co/100x50/1e293b/3b82f6?text=MegaBet', isPopular: true, isTrending: true },
                { id: '5', name: 'WinStrike Gold', rating: 9.0, bonus: '1000 TL Kayıp Bonusu', features: ['Nakit İade', 'Güvenilir', 'TR Lisans'], link: '#', logo: 'https://placehold.co/100x50/1e293b/ef4444?text=WinStrike', isPopular: false, isTrending: false }
            ]
        };

        if (site) {
            // 🔄 Update BOTH maskContent AND bettingContent on every run
            await prisma.site.update({
                where: { id: site.id },
                data: {
                    name: siteName,
                    isActive: true,
                    maskType: maskType,
                    maskContent: JSON.stringify(maskContent),
                    seoSettings: JSON.stringify(seoSettings),
                    bettingContent: JSON.stringify(bettingNav),
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
                    bettingContent: JSON.stringify(bettingNav),
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
