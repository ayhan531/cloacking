import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const domain = 'bonusverensiteler2026.com';

    // Check if site already exists
    const existingSite = await prisma.site.findUnique({
        where: { domain }
    });

    if (existingSite) {
        console.log('Sample site already exists at:', domain);
        return;
    }

    const maskContent = {
        siteName: 'Elite Global Sigorta',
        heroTitle: 'Geleceğinizi Güvence Altına Alıyoruz',
        heroSubtitle: '2026 vizyonumuzla, yapay zeka destekli risk analizi ve anında hasar ödeme sistemlerimizle yanınızdayız. Profesyonel kadromuzla kurumsal ve bireysel çözümler sunuyoruz.',
        features: [
            { id: '1', icon: 'Shield', title: 'Tam Kapsamlı Koruma', description: 'En küçük detaydan en büyük risklere kadar her şey kontrolümüz altında.' },
            { id: '2', icon: 'Shield', title: 'Hızlı Ekspertiz', description: 'Yapay zeka ile 15 dakikada hasar tespiti ve onay süreci.' },
            { id: '3', icon: 'Shield', title: '7/24 Global Destek', description: 'Dünyanın neresinde olursanız olun bir tık uzağınızdayız.' },
            { id: '4', icon: 'Shield', title: 'Uygun Primler', description: 'Bütçenize dost ve esnek ödeme planları ile maksimum koruma.' }
        ],
        services: [
            { id: '1', name: 'Kurumsal Risk Yönetimi', description: 'Şirketinizin varlıklarını global standartlarda koruyoruz.', price: 'Teklif Alın' },
            { id: '2', name: 'Dijital Varlık Sigortası', description: 'Kripto varlık ve siber saldırılara karşı %100 güvence.', price: '$49/ay' },
            { id: '3', name: 'Lüks Konut ve Araç', description: 'Değerli eşyalarınız için özel hazırlanmış premium poliçeler.', price: 'Özel Fiyat' }
        ],
        testimonials: [
            { id: '1', name: 'Mehmet Aras', role: 'Genel Müdür, Ak-Yol Lojistik', content: 'Filomuzu Elite Global\'e emanet ettiğimizden beri gözümüz arkada değil.', rating: 5 },
            { id: '2', name: 'Ayşe Yılmaz', role: 'Yazılım Mimarı', content: 'Dijital varlık sigortası konusunda Türkiye\'deki tek güvenilir adres.', rating: 5 }
        ],
        contactInfo: {
            email: 'kurumsal@eliteglobalsigorta.com',
            phone: '+90 212 999 00 00',
            address: 'Zorlu Center, Levazım, Beşiktaş/İstanbul',
            socialMedia: { facebook: '#', twitter: '#', instagram: '#' }
        },
        colorScheme: {
            primary: '#0F172A',
            secondary: '#334155',
            accent: '#3B82F6',
            background: '#FFFFFF',
            text: '#1F2937'
        }
    };

    const bettingContent = {
        theme: {
            primaryColor: '#9333EA',
            secondaryColor: '#3B82F6',
            backgroundColor: '#0F172A'
        },
        topBanner: { id: '1', title: 'VENOMBET %300 HOŞGELDİN BONUSU', link: 'https://venombet.link', isActive: true },
        bottomBanner: { id: '2', title: 'BETSİN 500 TL DENEME BONUSU', link: 'https://betsin.link', isActive: true },
        brandCarousel: [
            { id: '1', name: 'Venombet', logo: 'https://raw.githubusercontent.com/ayhan531/cloacking/main/public/brands/venom.png', link: '#' },
            { id: '2', name: 'Grandpasha', logo: 'https://raw.githubusercontent.com/ayhan531/cloacking/main/public/brands/grand.png', link: '#' },
            { id: '3', name: 'Bets10', logo: 'https://raw.githubusercontent.com/ayhan531/cloacking/main/public/brands/bets10.png', link: '#' }
        ],
        bonuses: [
            { id: '1', title: '500 TL Deneme Bonusu', amount: '500 TL', description: 'Yatırım şartsız, anında çekilebilir.', link: '#', image: 'https://placehold.co/600x400/9333ea/ffffff?text=500TL+BONUS', isActive: true },
            { id: '2', title: '%100 Kayıp Bonusu', amount: '%100', description: 'Tüm spor bahislerinde geçerli.', link: '#', image: 'https://placehold.co/600x400/3b82f6/ffffff?text=KAYIP+BONUSU', isActive: true }
        ],
        heroSlides: [
            { id: '1', title: '2026\'NIN EN YÜKSEK ORANLARI', subtitle: 'Tüm Major Liglerde En Yüksek Oran Garantisi', type: 'image', image: 'https://placehold.co/1200x600/1e293b/ffffff?text=EN+YUKSEK+ORANLAR', ctaText: 'HEMEN KATIL', ctaLink: '#' }
        ],
        popups: [
            { id: '1', title: 'GECEYE ÖZEL %50 EKSTRA', content: 'Saat 00:00 - 06:00 arası yatırımlara özel dev bonus.', type: 'image', image: 'https://placehold.co/800x800/7c3aed/ffffff?text=GECE+BONUSU', ctaText: 'BONUSU AL', ctaLink: '#', showDelay: 3000, isActive: true }
        ],
        navigation: [
            { id: '1', label: 'Anasayfa', icon: 'Home', link: '/', isActive: true },
            { id: '2', label: 'Bonuslar', icon: 'Trophy', link: '#', isActive: true },
            { id: '3', label: 'Canlı Destek', icon: 'MessageCircle', link: '#', isActive: true }
        ]
    };

    const seoSettings = {
        metaTitle: 'Bonus Veren Siteler 2026 - En Yüksek Deneme Bonusu Veren Bahis Siteleri',
        metaDescription: '2026 yılının en güncel, güvenilir ve yüksek bonus veren siteleri listesi. Çevrimsiz deneme bonusu, yatırım bonusları ve özel promosyonlar sunan siteleri hemen keşfedin.',
        keywords: ['bonus veren siteler 2026', 'deneme bonusu veren siteler 2026', 'güvenilir bahis siteleri', 'bedava bonus', 'casino bonusları 2026'],
        hiddenSEOArticle: `
            <article>
                <h1>Bonus Veren Siteler 2026: Sektördeki En Yeni Gelişmeler</h1>
                <p>2026 yılına girerken bahis tutkunlarının en çok üzerinde durduğu konu <strong>bonus veren siteler 2026</strong> rehberidir. Teknolojinin ilerlemesiyle birlikte artık siteler çok daha hızlı finansal işlemler ve daha yüksek promosyonlar sunuyor.</p>
                
                <h2>Deneme Bonusu Veren Siteler 2026 Neden Önemli?</h2>
                <p><strong>Deneme bonusu veren siteler</strong>, bir oyuncunun platformu risk almadan tanımasına imkan tanır. 2026 yılında profesyonel oyuncular artık sadece miktar değil, çevrim şartlarının kolaylığına bakmaktadır.</p>
                
                <h3>2026\'da Öne Çıkan Bonus Türleri</h3>
                <ul>
                    <li><strong>Yatırım Şartsız Bonuslar:</strong> Cebinizden para çıkmadan kazanç sağlamanın en kolay yolu.</li>
                    <li><strong>Kripto Yatırım Bonusları:</strong> Bitcoin veya Ethereum ile yapılan yatırımlara %50 ek fırsatlar.</li>
                    <li><strong>Sadakat Puanları:</strong> Her bahisinizde puan toplayıp nakite çevirme imkanı.</li>
                </ul>

                <p>Sonuç olarak, <em>bonus veren siteler</em> listemizi takip ederek 2026 boyunca en kazançlı tekliflerden ilk siz haberdar olabilirsiniz. Güvenilir lisanslı platformlar ve anında ödeme garantili sitelerle kazanmaya başlamak için doğru yerdesiniz.</p>
            </article>
        `.trim()
    };

    const cloakingRules = {
        showMaskTo: { desktop: true, bots: true, excludedCountries: [] },
        showBettingTo: { mobile: true, includedCountries: ['TR', 'CY'] },
        userAgentRules: [],
        ipBlacklist: [],
        redirectMaskTo: ''
    };

    await prisma.site.create({
        data: {
            name: 'Sample High-Performance Site 2026',
            domain,
            maskContent: JSON.stringify(maskContent),
            bettingContent: JSON.stringify(bettingContent),
            cloakingRules: JSON.stringify(cloakingRules),
            seoSettings: JSON.stringify(seoSettings),
            isActive: true
        }
    });

    console.log('Successfully seeded professional sample site for:', domain);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
