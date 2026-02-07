
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const COMMON_BETTING_CONTENT = {
    theme: {
        primaryColor: '#9333EA',
        secondaryColor: '#3B82F6',
        backgroundColor: '#0F172A',
    },
    navigation: [
        { id: '1', label: 'Anasayfa', icon: 'Home', link: '/', isActive: true },
        { id: '2', label: 'Kazananlar', icon: 'Trophy', link: '/winners', isActive: true },
        { id: '3', label: 'Çark', icon: 'Disc', link: '/wheel', isActive: true },
        { id: '4', label: 'Çekilişler', icon: 'Gift', link: '/giveaways', isActive: true },
        { id: '5', label: 'Telegram', icon: 'Send', link: '#', isActive: true },
        { id: '6', label: 'İletişim', icon: 'Plus', link: '#', isActive: true },
    ],
    // Empty arrays for now, user can populate via Admin
    brandCarousel: [],
    bonuses: [],
    giveaways: [],
    liveWinners: [],
    games: [],
    wheelItems: [
        { id: '1', label: '2.500 TL', color: '#00C2E0' },
        { id: '2', label: '2.500 TL', color: '#FF4D4D' },
        { id: '3', label: '2.500 TL', color: '#FF9900' },
        { id: '4', label: '2.500 TL', color: '#E91E63' },
        { id: '5', label: '5.555 TL', color: '#9C27B0' },
        { id: '6', label: '2.700 TL', color: '#FFEB3B' },
        { id: '7', label: '3.300 TL', color: '#4CAF50' },
        { id: '8', label: '2.500 TL', color: '#F44336' },
    ],
    popups: [],
    popupLayout: 'single',
    mobileImmediatePopup: true,
    heroSlides: [],
    trendSites: []
};

const COMMON_CLOAKING_RULES = {
    showMaskTo: {
        desktop: true,
        bots: true,
        excludedCountries: []
    },
    showBettingTo: {
        mobile: true,
        includedCountries: ['TR', 'CY']
    },
    userAgentRules: [],
    ipBlacklist: [],
    redirectMaskTo: ''
};

// Function to generate spun SEO Article
const generateSpunArticle = (personaName: string) => {
    const intros = [
        "2026 yılının en kazançlı deneme bonusu veren siteler listesine hoş geldiniz.",
        "Yeni yılda bonus veren siteler 2026 arayışınız için en doğru adrestesiniz.",
        "Bahis dünyasının en güncel deneme bonusu fırsatlarını sizler için derledik.",
        "Yatırımsız deneme bonusu veren siteler 2026 listemiz sürekli güncellenmektedir.",
        "En güvenilir bahis siteleri ve 2026 bonus fırsatları tek bir çatı altında."
    ];

    const bodies = [
        "Sektördeki 10 yıllık tecrübemizle, kullanıcılarımıza en güvenilir ve en yüksek kazanç sağlayan platformları sunuyoruz.",
        "Uzman ekibimiz tarafından incelenen bu siteler, lisanslı ve güvenilir altyapıya sahiptir.",
        "Kazanma şansınızı artırmak için en yüksek oranlı ve çevrimsiz bonusları tercih edin.",
        "Bedava bahis ve casino deneyimi yaşamak isteyenler için özel olarak seçilmiş firmalar.",
        "Para yatırmadan önce siteleri test etmek isteyenler için mükemmel fırsatlar sunuyoruz."
    ];

    const randomIntro = intros[Math.floor(Math.random() * intros.length)];
    const randomBody = bodies[Math.floor(Math.random() * bodies.length)];

    return `
        <article style="font-size: 1px; color: transparent; opacity: 0; position: absolute; z-index: -1;">
            <h1>${personaName} - Bonus Veren Siteler 2026</h1>
            <section>
                <p>${randomIntro} ${randomBody}</p>
                <h2>Deneme Bonusu Veren Siteler 2026</h2>
                <p>Türkiye'nin en popüler <strong>deneme bonusu veren siteler</strong> listesine buradan ulaşabilirsiniz. 2026 yılında öne çıkan firmalar arasında Venombet, Betsin ve Grandpasha yer alıyor.</p>
                <ul>
                    <li><a href="/deneme-bonusu">2026 Deneme Bonusu</a></li>
                    <li><a href="/bahis-siteleri">Güvenilir Bahis Siteleri</a></li>
                    <li><a href="/casino-siteleri">Canlı Casino Siteleri</a></li>
                </ul>
                <p>Son Güncelleme: ${new Date().toLocaleDateString('tr-TR')}</p>
            </section>
        </article>
    `.trim();
};

const PERSONAS = [
    {
        name: "ProSolutions Tech",
        domain: "pending-tech-01.com",
        maskType: "corporate",
        colorScheme: { primary: "#6366F1", secondary: "#A855F7", accent: "#F43F5E", background: "#FFFFFF", text: "#1F2937" },
        maskContent: {
            siteName: "ProSolutions Tech",
            heroTitle: "Geleceğin Teknolojisi Bugün Burada",
            heroSubtitle: "Yapay zeka ve bulut çözümleriyle işinizi dijitalleştirin.",
            services: [
                { id: "1", name: "Yazılım Geliştirme", description: "Özel kurumsal çözümler.", price: "Projeye Özel" },
                { id: "2", name: "Siber Güvenlik", description: "Verileriniz bizimle güvende.", price: "Aylık $500" },
                { id: "3", name: "Bulut Mimari", description: "Ölçeklenebilir altyapı.", price: "Yıllık $2000" }
            ]
        }
    },
    {
        name: "Adalet Hukuk",
        domain: "pending-law-02.com",
        maskType: "corporate",
        colorScheme: { primary: "#1e3a8a", secondary: "#1e40af", accent: "#d97706", background: "#f8fafc", text: "#0f172a" },
        maskContent: {
            siteName: "Adalet Hukuk Bürosu",
            heroTitle: "Hukuki Haklarınız Güvencemiz Altında",
            heroSubtitle: "Deneyimli avukat kadromuzla her türlü hukuki sorununuzda yanınızdayız.",
            services: [
                { id: "1", name: "Ticaret Hukuku", description: "Şirketler için danışmanlık.", price: "Danışmanlık" },
                { id: "2", name: "Ceza Hukuku", description: "Profesyonel savunma.", price: "Dava Başı" },
                { id: "3", name: "Aile Hukuku", description: "Boşanma ve velayet süreçleri.", price: "Dava Başı" }
            ]
        }
    },
    {
        name: "Vitality Klinik",
        domain: "pending-health-03.com",
        maskType: "corporate", // Using corporate as generic template
        colorScheme: { primary: "#059669", secondary: "#10b981", accent: "#34d399", background: "#ffffff", text: "#064e3b" },
        maskContent: {
            siteName: "Vitality Sağlık Merkezi",
            heroTitle: "Sağlığınız İçin Modern Çözümler",
            heroSubtitle: "Uzman doktorlarımız ve son teknoloji cihazlarımızla hizmetinizdeyiz.",
            services: [
                { id: "1", name: "Genel Cerrahi", description: "Operasyonel çözümler.", price: "Muayene" },
                { id: "2", name: "Diş Polikliniği", description: "Gülüş tasarımı ve implant.", price: "İşlem Başı" },
                { id: "3", name: "Fizik Tedavi", description: "Rehabilitasyon merkezi.", price: "Seans" }
            ]
        }
    },
    {
        name: "Mega Yapı İnşaat",
        domain: "pending-build-04.com",
        maskType: "corporate",
        colorScheme: { primary: "#ca8a04", secondary: "#eab308", accent: "#facc15", background: "#fafaf9", text: "#451a03" },
        maskContent: {
            siteName: "Mega Yapı İnşaat",
            heroTitle: "Hayallerinizdeki Yaşam Alanlarını İnşa Ediyoruz",
            heroSubtitle: "Mühendislik harikası projeler ve kentsel dönüşümde lider marka.",
            services: [
                { id: "1", name: "Konut Projeleri", description: "Modern yaşam alanları.", price: "-" },
                { id: "2", name: "Ticari Yapılar", description: "Ofis ve AVM inşaatı.", price: "-" },
                { id: "3", name: "Restorasyon", description: "Tarihi yapı yenileme.", price: "-" }
            ]
        }
    },
    {
        name: "Hızlı Kargo",
        domain: "pending-logistic-05.com",
        maskType: "corporate",
        colorScheme: { primary: "#dc2626", secondary: "#ef4444", accent: "#f87171", background: "#fef2f2", text: "#7f1d1d" },
        maskContent: {
            siteName: "Hızlı Lojistik A.Ş.",
            heroTitle: "Dünyanın Her Yerine Güvenli Teslimat",
            heroSubtitle: "Hava, kara ve deniz taşımacılığında güvenilir çözüm ortağınız.",
            services: [
                { id: "1", name: "Uluslararası Nakliye", description: "Tüm dünyaya kargo.", price: "KG Başı" },
                { id: "2", name: "Depolama", description: "Güvenli antrepo hizmeti.", price: "m² Başı" },
                { id: "3", name: "Gümrükleme", description: "Hızlı gümrük işlemleri.", price: "İşlem Başı" }
            ]
        }
    },
    {
        name: "Değer Yatırım",
        domain: "pending-finance-06.com",
        maskType: "corporate",
        colorScheme: { primary: "#15803d", secondary: "#16a34a", accent: "#22c55e", background: "#f0fdf4", text: "#14532d" },
        maskContent: {
            siteName: "Değer Yatırım Danışmanlığı",
            heroTitle: "Paranızı En Doğru Şekilde Yönetin",
            heroSubtitle: "Borsa, altın ve döviz piyasalarında uzman analizlerle kazancınızı artırın.",
            services: [
                { id: "1", name: "Portföy Yönetimi", description: "Kişiye özel yatırım stratejisi.", price: "% Komisyon" },
                { id: "2", name: "Emeklilik Planı", description: "Geleceğinizi garantiye alın.", price: "Aylık" },
                { id: "3", name: "Kredi Danışmanlığı", description: "En uygun kredi seçenekleri.", price: "Ücretsiz" }
            ]
        }
    },
    {
        name: "Akademi Eğitim",
        domain: "pending-edu-07.com",
        maskType: "corporate",
        colorScheme: { primary: "#7c3aed", secondary: "#8b5cf6", accent: "#a78bfa", background: "#ffffff", text: "#4c1d95" },
        maskContent: {
            siteName: "Akademi Eğitim Kurumları",
            heroTitle: "Geleceğin Liderlerini Yetiştiriyoruz",
            heroSubtitle: "Anaokulundan üniversiteye kadar uzanan modern eğitim yolculuğu.",
            services: [
                { id: "1", name: "Yabancı Dil", description: "İngilizce ve Almanca eğitimi.", price: "Aylık" },
                { id: "2", name: "Kodlama", description: "Çocuklar için robotik kodlama.", price: "Kur Başı" },
                { id: "3", name: "Sınav Hazırlık", description: "LGS ve YKS kursları.", price: "Dönemlik" }
            ]
        }
    },
    {
        name: "Rota Turizm",
        domain: "pending-travel-08.com",
        maskType: "corporate",
        colorScheme: { primary: "#0ea5e9", secondary: "#38bdf8", accent: "#7dd3fc", background: "#f0f9ff", text: "#0c4a6e" },
        maskContent: {
            siteName: "Rota Turizm Seyahat",
            heroTitle: "Dünyayı Keşfetmeye Hazır Mısınız?",
            heroSubtitle: "En uygun uçak bileti, otel rezervasyonu ve tatil turları.",
            services: [
                { id: "1", name: "Yurt Dışı Turlar", description: "Avrupa ve Asya gezileri.", price: "Paket" },
                { id: "2", name: "Otel Rezervasyonu", description: "En seçkin oteller.", price: "Gecelik" },
                { id: "3", name: "Vize İşlemleri", description: "Sorunsuz vize başvurusu.", price: "Kişi Başı" }
            ]
        }
    },
    {
        name: "Prestij Emlak",
        domain: "pending-estate-09.com",
        maskType: "corporate",
        colorScheme: { primary: "#be185d", secondary: "#db2777", accent: "#f472b6", background: "#fff1f2", text: "#831843" },
        maskContent: {
            siteName: "Prestij Gayrimenkul",
            heroTitle: "Hayalinizdeki Evi Birlikte Bulalım",
            heroSubtitle: "Satılık ve kiralık lüks konutlar, villalar ve ticari mülkler.",
            services: [
                { id: "1", name: "Emlak Değerleme", description: "Ücretsiz ekspertiz.", price: "Ücretsiz" },
                { id: "2", name: "Alım-Satım", description: "Güvenli tapu işlemleri.", price: "%2 Komisyon" },
                { id: "3", name: "Kiralama", description: "Kurumsal kiralama hizmeti.", price: "1 Kira" }
            ]
        }
    },
    {
        name: "Oto Expertiz",
        domain: "pending-auto-10.com",
        maskType: "corporate",
        colorScheme: { primary: "#ea580c", secondary: "#f97316", accent: "#fb923c", background: "#fff7ed", text: "#7c2d12" },
        maskContent: {
            siteName: "Oto Expertiz Merkezi",
            heroTitle: "Aracınızın Gerçek Değerini Öğrenin",
            heroSubtitle: "Detaylı motor, kaporta ve mekanik testi ile güvenli araç alımı.",
            services: [
                { id: "1", name: "Full Expertiz", description: "101 nokta kontrolü.", price: "2500 TL" },
                { id: "2", name: "Motor Testi", description: "Dyno performans ölçümü.", price: "1000 TL" },
                { id: "3", name: "Boya Kaporta", description: "Mikron boya ölçümü.", price: "750 TL" }
            ]
        }
    }
];

async function main() {
    console.log("🚀 Starting Mass Site Deployment...");

    for (const persona of PERSONAS) {
        // Construct basic mask content
        const maskContent = {
            siteName: persona.maskContent.siteName,
            heroTitle: persona.maskContent.heroTitle,
            heroSubtitle: persona.maskContent.heroSubtitle,
            features: [
                { id: '1', icon: 'Shield', title: 'Hızlı Hizmet', description: 'Müşteri memnuniyeti odaklı çalışma prensibi.' },
                { id: '2', icon: 'Shield', title: 'Uzman Kadro', description: 'Alanında deneyimli profesyoneller.' },
                { id: '3', icon: 'Shield', title: 'Güvenilir Çözüm', description: 'Yılların verdiği tecrübe ile garantili hizmet.' },
                { id: '4', icon: 'Shield', title: '7/24 Destek', description: 'Her an yanınızdayız.' }
            ],
            services: persona.maskContent.services,
            testimonials: [
                { id: '1', name: 'Mustafa K.', role: 'Müşteri', content: 'Hizmet kalitesinden çok memnun kaldım, herkese tavsiye ederim.', rating: 5 },
                { id: '2', name: 'Ayşe T.', role: 'Müşteri', content: 'Profesyonel ve hızlı çözüm sundular. Teşekkürler.', rating: 5 }
            ],
            contactInfo: {
                email: 'info@' + persona.domain,
                phone: '+90 212 555 ' + Math.floor(1000 + Math.random() * 9000),
                address: 'İstanbul, Türkiye',
                socialMedia: { facebook: '#', twitter: '#', instagram: '#' }
            },
            colorScheme: persona.colorScheme,
            logo: '' // Default logo logic in frontend
        };

        const seoSettings = {
            metaTitle: `${persona.maskContent.siteName} - Kurumsal Hizmetler 2026`,
            metaDescription: persona.maskContent.heroSubtitle,
            keywords: ["kurumsal", "hizmet", "danışmanlık", "2026", "deneme bonusu veren siteler"], // Mix generic + target
            hiddenSEOArticle: generateSpunArticle(persona.maskContent.siteName),
            googleAnalyticsId: '',
            facebookPixelId: ''
        };

        console.log(`Creating site: ${persona.name} (${persona.domain})...`);

        await prisma.site.upsert({
            where: { domain: persona.domain },
            update: {
                name: persona.name,
                maskType: persona.maskType,
                maskContent: JSON.stringify(maskContent),
                bettingContent: JSON.stringify(COMMON_BETTING_CONTENT),
                cloakingRules: JSON.stringify(COMMON_CLOAKING_RULES),
                seoSettings: JSON.stringify(seoSettings),
                isActive: true
            },
            create: {
                name: persona.name,
                domain: persona.domain,
                maskType: persona.maskType,
                maskContent: JSON.stringify(maskContent),
                bettingContent: JSON.stringify(COMMON_BETTING_CONTENT),
                cloakingRules: JSON.stringify(COMMON_CLOAKING_RULES),
                seoSettings: JSON.stringify(seoSettings),
                isActive: true
            }
        });
    }

    console.log("✅ Successfully deployed 10 new sites!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
