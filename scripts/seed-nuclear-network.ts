import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log("🔥 NUCLEAR CONTENT UPDATE v3.0: 1st Page Dominance Injection starting...");

    const domains = [
        'independent-news.org',
        'flovazcomercial.com',
        'haber-analiz2026.com',
        'vizyontekyazilim.com',
        'yasalbonus2026.com',
        'bonusverensiteler2026.com',
        '2026bonuslar.com',
        'bedavabonus2026.com'
    ];

    const monthNames = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
    const currentMonth = monthNames[new Date().getMonth()];
    const currentYear = new Date().getFullYear();

    // 15 adet, her biri stratejik anahtar kelimelerle dolu haber paketi
    const extendedNews = [
        { id: '1', title: `2026 Deneme Bonusu Veren Siteler: Tam Liste`, slug: 'deneme-bonusu-veren-siteler-2026', summary: 'Bu ayın en çok kazandıran platformlarını karşılaştırdık.', content: '2026 yılında deneme bonusu veren siteler arasında kıyasıya bir rekabet var. Özellikle 500 TL deneme bonusu veren siteler öne çıkıyor.', date: new Date().toISOString() },
        { id: '2', title: `Yatırımsız Bonus Analizi: Kimler Veriyor?`, slug: 'yatirim-sartsiz-bonus-2026', summary: 'Para yatırmadan kazanmanın en güvenli yolları.', content: 'Yatırım şartsız bonuslar 2026 yılında artık bir standart haline geldi. İşte güvenilir platformlar.', date: new Date().toISOString() },
        { id: '3', title: `En Güvenilir Bahis Altyapıları 2026`, slug: 'en-guvenilir-altyapilar', summary: 'Kapanmayan ve ödeme yapan siteleri nasıl anlarsınız?', content: 'Lisanslı altyapıların önemi 2026 yılında daha da arttı.', date: new Date().toISOString() },
        { id: '4', title: `500 TL Deneme Bonusu Veren Siteler 2026`, slug: '500-tl-deneme-bonusu-2026', summary: 'Yüksek limitli deneme bonusu veren siteler listelendi.', content: '500 TL deneme bonusu veren siteler 2026 listemizle yatırımsız kazanç fırsatlarını yakalayın.', date: new Date().toISOString() },
        { id: '5', title: `Payfix ve Mefete Kabul Eden Bahis Siteleri 2026`, slug: 'payfix-mefete-bahis-2026', summary: 'Hızlı ve güvenilir dijital cüzdan yöntemleri.', content: 'Dijital cüzdanlar 2026 yılında bahis ödemelerinin %80ini oluşturuyor.', date: new Date().toISOString() },
        { id: '6', title: `Çevrimsiz Freebet Veren Siteler Raporu`, slug: 'cevrimsiz-freebet-2026', summary: 'Kazancın doğrudan çekilebildiği şartlar.', content: '2026 yılında freebet dünyasında devrim yaratan yeni kurallar açıklandı.', date: new Date().toISOString() },
        { id: '7', title: `Hoşgeldin Bonusu %300 Olan Firmalar Listesi`, slug: 'hosgeldin-bonusu-300-liste', summary: 'İlk üyelikte kasanızı anında 3e katlayın.', content: 'Yüksek oranlı hoşgeldin paketleri için 2026 rehberimiz yayında.', date: new Date().toISOString() },
        { id: '8', title: `Slot Oyunlarında En Çok Freespin Veren Siteler`, slug: 'freespin-veren-siteler-2026', summary: 'Casino severler için yatırımsız dönüş fırsatları.', content: '2026 yılında Gates of Olympus ve Sugar Rush gibi oyunlarda geçerli freespinler.', date: new Date().toISOString() },
        { id: '9', title: `Sektörel Güvenlik Verisi: SSL ve Firewall Önemi`, slug: 'bahis-sitesi-guvenlik-protokolleri', summary: 'Kullanıcı verilerinin korunması hakkında teknik rapor.', content: 'Veri güvenliği 2026 bonus veren siteler arasında en önemli seçicidir.', date: new Date().toISOString() },
        { id: '10', title: `Mobil Ödeme İle Bahis: Hangi Operatörler Aktif?`, slug: 'mobil-odeme-aktif-operatorler', summary: 'Turkcell, Vodafone ve Telekom güncel durum.', content: '2026 mobil ödeme ile deneme bonusu alma yolları.', date: new Date().toISOString() },
        { id: '11', title: `Yeni Açılan Bahis Siteleri 2026 Listesi`, slug: 'yeni-acilan-siteler-2026', summary: 'Yüksek bütçeli reklamlarla piyasaya girenler.', content: 'Yeni açılan platformlar genellikle daha yüksek deneme bonusu vermektedir.', date: new Date().toISOString() },
        { id: '12', title: `VIP Oyuncular İçin Özel Sadakat Bonusları`, slug: 'vip-sadakat-bonuslari-2026', summary: 'Yüksek hacimli yatırımcılar için avantajlar.', content: 'Kaybetme lüksünü kazanca dönüştüren nakit iade sistemleri.', date: new Date().toISOString() },
        { id: '13', title: `Canlı Destek Kalitesi En Yüksek 10 Site`, slug: 'en-iyi-canli-destek-siteleri', summary: '7/24 kesintisiz hizmet veren platformlar.', content: 'Sorunsuz iletişim, bahis sitesi seçiminde kilit noktadır.', date: new Date().toISOString() },
        { id: '14', title: `Yurt Dışı Lisanslı Bahis Siteleri Sorgulama`, slug: 'lisans-sorgulama-2026', summary: 'MGA ve Curacao lisanslı sitelerin farkları.', content: '2026 yılında geçerli lisans anahtarlarını kontrol etme yöntemleri.', date: new Date().toISOString() },
        { id: '15', title: `Haftalık Bonus Gündemi Şubat 2026`, slug: 'subat-2026-bonus-gundemi', summary: 'Bu haftanın en çok ilgi gören promosyonları.', content: 'Dinamik değişen bonus oranları hakkında anlık veri akışı.', date: new Date().toISOString() },
        { id: '16', title: `Global Audit Standards for iGaming 2026`, slug: 'global-audit-standards-2026', summary: 'Uluslararası denetim standartlarının dijital oyunlara entegrasyonu.', content: '2026 yılında bağımsız denetim kuruluşları, şeffaflık raporlarını her çeyrekte yayınlamak zorundadır.', date: new Date().toISOString() },
        { id: '17', title: `Algorithmic Fairness in RNG Systems`, slug: 'rng-algorithmic-fairness', summary: 'Rastgele sayı üreteçlerinin matematiksel doğrulanması.', content: 'Oyun adaletini sağlayan algoritmaların blockchain üzerindeki şeffaf izlenimi.', date: new Date().toISOString() },
        { id: '18', title: `AML and Anti-Fraud Protocols in Digital Assets`, slug: 'aml-anti-fraud-2026', summary: 'Kara para aklama karşıtı sistemlerin evrimi.', content: 'Yapay zeka destekli AML sistemleri saniyede milyonlarca işlemi tarayarak risk analiz eder.', date: new Date().toISOString() },
        { id: '19', title: `Cyber Resilience in High-Traffic Portals`, slug: 'cyber-resilience-2026', summary: 'Yüksek trafikli haber portallarının siber direnç stratejileri.', content: 'DDoS koruması ve veri sızıntısı önleme protokolleri 2026 regülasyonlarının temelidir.', date: new Date().toISOString() },
        { id: '20', title: `Economic Impact of Digital Incentives`, slug: 'economic-impact-incentives', summary: 'Dijital teşviklerin makroekonomik etkileri.', content: 'Bonus ve promosyon odaklı teşvik paketleri, dijital ekonominin %12lik büyüme motorudur.', date: new Date().toISOString() },
        { id: '21', title: `Responsible Gaming and Ethical Marketing`, slug: 'responsible-gaming-ethics', summary: 'Etik pazarlama ve sorumlu oyun ilkeleri.', content: 'Kullanıcı sağlığını koruyan sınırlama araçları ve oto-kontrollerin entegrasyonu.', date: new Date().toISOString() },
        { id: '22', title: `Data Privacy Laws: GDPR 2026 Edition`, slug: 'gdpr-2026-compliance', summary: 'Veri gizliliği yasalarının yeni sürümü ve uyumluluk.', content: 'Kişisel verilerin işlenmesinde sıfır güven (Zero Trust) mimarisi artık bir standart.', date: new Date().toISOString() },
        { id: '23', title: `Blockchain Integration in Audit Trails`, slug: 'blockchain-audit-integration', summary: 'Denetim izlerinin blockchain üzerinde saklanması.', content: 'Değiştirilemez denetim kayıtları, güvenilir oyun platformlarının en büyük kanıtıdır.', date: new Date().toISOString() },
        { id: '24', title: `AI-Driven User Behavior Analysis`, slug: 'ai-user-behavior-analysis', summary: 'Kullanıcı davranışlarının yapay zeka ile analizi.', content: 'Riskli davranışların önceden tespiti ve müdahale mekanizmaları.', date: new Date().toISOString() },
        { id: '25', title: `Mobile Computing Trends in iGaming`, slug: 'mobile-computing-igaming-2026', summary: 'Mobil bilişim trendleri ve oyun sektörüne etkisi.', content: 'Edge computing sayesinde mobil oyun deneyimi sıfır gecikmeye (low latency) ulaştı.', date: new Date().toISOString() },
        { id: '26', title: `ESG Criteria for Digital Entertainment Companies`, slug: 'esg-criteria-digital-entertainment', summary: 'Çevresel, sosyal ve yönetişim kriterleri.', content: 'Sürdürülebilirlik raporları artık dijital şirketlerin hisse değerlerini doğrudan etkiliyor.', date: new Date().toISOString() },
        { id: '27', title: `Future of Decentralized Finance in Gaming`, slug: 'defi-gaming-future', summary: 'Merkeziyetsiz finansın oyun sektöründeki geleceği.', content: 'Kripto ödeme geçitleri ve akıllı kontratlar bonus dağıtımını otomatiğe bağladı.', date: new Date().toISOString() },
        { id: '28', title: `Global Compliance Matrix: 2026 Update`, slug: 'global-compliance-matrix-2026', summary: 'Küresel uyumluluk matrisi ve bölgesel farklılıklar.', content: 'Farklı yargı bölgelerindeki oyun yasalarının tek bir merkezden izlenmesi.', date: new Date().toISOString() },
        { id: '29', title: `Technical Audit Methodology for Platforms`, slug: 'technical-audit-methodology', summary: 'Platformlar için teknik denetim metodolojisi.', content: 'Sızma testleri ve kod analizi süreçlerinin bağımsız kurullarca denetimi.', date: new Date().toISOString() },
        { id: '30', title: `User Identity Management in Web3`, slug: 'user-identity-web3', summary: 'Web3 dünyasında kullanıcı kimlik yönetimi.', content: 'Self-Sovereign Identity (SSI) modellerinin oyun platformlarına entegrasyonu.', date: new Date().toISOString() },
        { id: '31', title: `Economic Forecasting for Digital Markets`, slug: 'economic-forecasting-digital-2026', summary: 'Dijital pazarlar için ekonomik öngörüler.', content: 'Yapay zeka modelleriyle bir sonraki yılın pazar trendlerinin tahmini.', date: new Date().toISOString() },
        { id: '32', title: `Risk Management in High-Volume Scaling`, slug: 'risk-management-scaling', summary: 'Yüksek hacimli ölçeklendirmede risk yönetimi.', content: 'Saniyelik işlem hacminin yükseldiği anlarda sistem bütünlüğünün korunması.', date: new Date().toISOString() },
        { id: '33', title: `Cloud Infrastructure for Global Gaming`, slug: 'cloud-infrastructure-global-gaming', summary: 'Küresel oyunlar için bulut altyapı mimarisi.', content: 'Multi-cloud stratejileri ile coğrafi yedeklilik ve yüksek erişilebilirlik.', date: new Date().toISOString() },
        { id: '34', title: `Ethical AI in Promoting Games`, slug: 'ethical-ai-promotion', summary: 'Oyun tanıtımlarında etik yapay zeka kullanımı.', content: 'Manüpilatif algoritmaların engellenmesi ve şeffaf pazarlama.', date: new Date().toISOString() },
        { id: '35', title: `Payment Orchestration Systems 2026`, slug: 'payment-orchestration-2026', summary: 'Ödeme orkestrasyon sistemleri ve verimlilik.', content: 'Çapraz ödeme yöntemlerini yöneten tek bir merkezileşmiş yapı.', date: new Date().toISOString() },
        { id: '36', title: `Regulatory Sandboxes for Innovation`, slug: 'regulatory-sandboxes-innovation', summary: 'İnovasyon için regülasyon kum havuzları.', content: 'Yeni teknolojilerin denetim altında test edildiği yasal alanlar.', date: new Date().toISOString() },
        { id: '37', title: `Biometric Verification Standard 3.0`, slug: 'biometric-verification-standard', summary: 'Biyometrik doğrulama standartlarında yeni sürüm.', content: 'Yüz ve parmak izi ötesinde, davranışsal biyometrik verilerin kullanımı.', date: new Date().toISOString() },
        { id: '38', title: `Global Media Oversight Protocols`, slug: 'global-media-oversight', summary: 'Küresel medya denetim protokolleri.', content: 'Bağımsız haber ajanslarının dijital içerik doğruluğunu denetlemesi.', date: new Date().toISOString() },
        { id: '39', title: `Interoperability of Digital Licenses`, slug: 'digital-license-interoperability', summary: 'Dijital lisansların karşılıklı tanınabilirliği.', content: 'Farklı ülkelerdeki lisansların birbirini tamamlaması süreci.', date: new Date().toISOString() },
        { id: '40', title: `Advanced Cryptography in User Wallets`, slug: 'advanced-cryptography-wallets', summary: 'Kullanıcı cüzdanlarında gelişmiş kriptografi.', content: 'Kuantum sonrası (Post-Quantum) şifreleme yöntemlerinin entegrasyonu.', date: new Date().toISOString() },
        { id: '41', title: `Sustainable Data Center Operations`, slug: 'sustainable-data-centers', summary: 'Sürdürülebilir veri merkezi operasyonları.', content: 'Dijital oyun platformlarının karbon ayak izi yönetimi.', date: new Date().toISOString() },
        { id: '42', title: `Legal Tech and Automated Compliance`, slug: 'legal-tech-automated-compliance', summary: 'Legal Tech ve otomatik uyumluluk çözümleri.', content: 'Yasal değişiklikleri gerçek zamanlı izleyen ve uygulayan yazılımlar.', date: new Date().toISOString() },
        { id: '43', title: `Consumer Protection in Micro-Transactions`, slug: 'consumer-protection-micro-transactions', summary: 'Mikro işlemlerde tüketici korunması.', content: 'Küçük limitli ödemelerde kullanıcı güvenliği ve şeffaflık.', date: new Date().toISOString() },
        { id: '44', title: `Social Responsibility Reports 2026`, slug: 'social-responsibility-reports', summary: 'Sosyal sorumluluk raporları ve sektörel etki.', content: 'Toplumsal farkındalık projelerinin kurumsal imaja etkisi.', date: new Date().toISOString() },
        { id: '45', title: `Cross-Border Content Syndication`, slug: 'cross-border-syndication', summary: 'Sınırlar ötesi içerik sendikasyonu.', content: 'Haber içeriklerinin global ortak ağlarda anlık yayılımı.', date: new Date().toISOString() },
        { id: '46', title: `Digital Literacy and User Awareness`, slug: 'digital-literacy-awareness', summary: 'Dijital okuryazarlık ve kullanıcı farkındalığı.', content: 'Sahte haber ve dolandırıcılık girişimlerine karşı eğitim modelleri.', date: new Date().toISOString() },
        { id: '47', title: `Adaptive Learning for Risk Models`, slug: 'adaptive-learning-risk', summary: 'Risk modelleri için adaptif öğrenme.', content: 'Değişen tehlikelere karşı kendini güncelleyen risk algoritmaları.', date: new Date().toISOString() },
        { id: '48', title: `Regulatory Technology (RegTech) Boom`, slug: 'regtech-boom-2026', summary: 'RegTech sektöründeki patlama ve 2026 beklentileri.', content: 'Denetim maliyetlerini düşüren ve hızı artıran teknolojik çözümler.', date: new Date().toISOString() },
        { id: '49', title: `Institutional Trust in Digital Journalism`, slug: 'institutional-trust-journalism', summary: 'Dijital gazetecilikte kurumsal güven inşası.', content: 'Bağımsız denetçilerin yayın ilkelerini tasdik etmesi süreci.', date: new Date().toISOString() },
        { id: '50', title: `The Great Semantic Reset: Search in 2026`, slug: 'semantic-reset-search-2026', summary: 'Arama motorlarında anlamsal sıfırlama ve yeni kurallar.', content: 'Google SGE sonrası içerik otoritesinin yeniden tanımlanması.', date: new Date().toISOString() }
    ];

    for (const domain of domains) {
        console.log(`🚀 Atomic Seeding: ${domain}...`);

        let site = await prisma.site.findUnique({ where: { domain } });
        const siteName = domain.split('.')[0].toUpperCase();

        // Her domain için ultra-agresif SEO başlıkları
        let seoSettings = {
            metaTitle: `${currentMonth} ${currentYear} Deneme Bonusu Veren Siteler - ${siteName} #1`,
            metaDescription: `${domain} - 2026 yılının en güvenilir, yatırımsız deneme bonusu ve bedava bonus veren siteler listesi. Güncel giriş adresleri ve profesyonel analiz raporu.`,
            keywords: "deneme bonusu veren siteler 2026, bonus veren siteler 2026, bedava bonus, yatırımsız deneme bonusu, 500 tl deneme bonusu, casino bonusları, bahis siteleri"
        };

        const maskContent = {
            siteName: siteName,
            heroTitle: `${siteName} | 2026 Otorite Onaylı Bonus Merkezi`,
            heroSubtitle: "Yapay Zeka Destekli Bahis ve Bonus Analiz Platformu v5.0 Platinum",
            news: extendedNews,
            colorScheme: {
                primary: '#10b981',
                secondary: '#064e3b',
                accent: '#34d399'
            }
        };

        if (site) {
            await prisma.site.update({
                where: { id: site.id },
                data: {
                    isActive: true,
                    maskType: 'blog',
                    maskContent: JSON.stringify(maskContent),
                    seoSettings: JSON.stringify(seoSettings),
                    updatedAt: new Date()
                }
            });
        } else {
            // Eğer site yoksa (self-healing yedeği olarak)
            await prisma.site.create({
                data: {
                    domain: domain,
                    name: siteName,
                    isActive: true,
                    maskType: 'blog',
                    maskContent: JSON.stringify(maskContent),
                    seoSettings: JSON.stringify(seoSettings),
                    bettingContent: JSON.stringify({}),
                    cloakingRules: JSON.stringify({
                        showMaskTo: { bots: true, desktop: true },
                        showBettingTo: { mobile: true, includedCountries: ["TR", "CY"] }
                    })
                }
            });
        }
    }

    console.log("💎 1. SAYFA DOMİNASYONU HAZIR: Tüm siteler bilgi deposuna dönüştürüldü!");
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
