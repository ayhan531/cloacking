import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const domain = 'flovazcomercial.com';

    const maskContent = {
        siteName: 'Flovaz Kurumsal Çözümler',
        heroTitle: 'Endüstriyel Kalite ve Dijital Platform İncelemeleri',
        heroSubtitle: 'Flovaz Ticaret olarak 2026 vizyonumuzla, hem endüstriyel hırdavat çözümlerinde hem de dijital platformların teknik analizlerinde lideriz. Güçlü stok ve uzman kadro.',
        features: [
            { id: '1', icon: 'Shield', title: 'Global Tedarik Zinciri', description: 'Dünyanın en iyi markalarını kurumsal müşterilerimizle buluşturuyoruz.' },
            { id: '2', icon: 'Shield', title: 'Yapay Zeka Destekli Analiz', description: 'Platform verimlilik raporları ve teknik inceleme metrikleri.' },
            { id: '3', icon: 'Shield', title: 'Hızlı Lojistik Ağı', description: 'Tüm siparişlerinizde 24 saat içinde sevkiyat garantisi.' }
        ],
        services: [
            { id: '1', name: 'Endüstriyel Ürün Tedariği', description: 'Fabrika ve işletmeler için tam kapsamlı teknik malzeme desteği.', price: 'Teklif Alın' },
            { id: '2', name: 'Dijital Platform Analizleri', description: '2026 yılının en kapsamlı bonus ve platform verimlilik raporları.', price: 'Ücretsiz' },
            { id: '3', name: 'Kurumsal Danışmanlık', description: 'Endüstriyel süreçlerinizi optimize eden uzman fikirleri.', price: 'Özel Fiyat' }
        ],
        testimonials: [
            { id: '1', name: 'Mustafa Kaya', role: 'Satın Alma Müdürü', content: 'Hırdavat ihtiyaçlarımızda tek geçerli adresimiz.', rating: 5 },
            { id: '2', name: 'Selin Deniz', role: 'Ekonomist', content: 'Teknik analiz raporları 2026 piyasası için çok değerli.', rating: 5 }
        ],
        contactInfo: {
            email: 'info@flovazcomercial.com',
            phone: '+90 216 000 00 00',
            address: 'İkitelli OSB, İstanbul',
            socialMedia: { facebook: '#', twitter: '#', instagram: '#' }
        },
        colorScheme: {
            primary: '#1E293B',
            secondary: '#334155',
            accent: '#0EA5E9',
            background: '#FFFFFF',
            text: '#0F172A'
        }
    };

    const seoSettings = {
        metaTitle: 'Bonus Veren Siteler 2026 - En Yüksek Deneme Bonusu Veren Bahis Siteleri (Flovaz)',
        metaDescription: '2026 yılının en güncel, güvenilir ve yüksek bonus veren siteleri listesi Flovaz Kurumsal güvencesiyle. Deneme bonusu veren siteleri hemen keşfedin.',
        keywords: ['bonus veren siteler 2026', 'deneme bonusu veren siteler 2026', 'güvenilir bahis siteleri', 'bedava bonus', 'casino bonusları 2026', 'flovaz comercial'],
        structuredData: {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "2026'da hangi siteler deneme bonusu veriyor?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "2026 yılı için hazırladığımız özel listede en güvenilir ve yüksek deneme bonusu veren siteler yer almaktadır. Flovaz olarak teknik analizlerimizi her hafta güncelliyoruz."
                    }
                }
            ]
        },
        hiddenSEOArticle: `
            <article>
                <h1>Bonus Veren Siteler 2026: En Güncel ve Güvenilir Rehber</h1>
                <p>2026 yılına girerken profesyonel oyuncuların en çok aradığı konu olan <strong>bonus veren siteler 2026</strong> rehberini Flovaz Kurumsal olarak hazırladık.</p>
                
                <h2>Deneme Bonusu Veren Siteler 2026 Seçimi</h2>
                <p>İnternet dünyasında <strong>deneme bonusu veren siteler</strong> sayısının artmasıyla beraber, güvenilirlik en önemli kriter haline geldi. 2026 listemizdeki tüm platformlar lisanslı ve test edilmiştir.</p>
                
                <h3>Neden 2026 Bonusları Daha Kazançlı?</h3>
                <p>Şirketlerin rekabeti sayesinde 100 TL ile 500 TL arası değişen rakipsiz fırsatlar sunulmaktadır. Bonus veren siteler arayışınızda sitemizdeki güncel listeyi takip etmenizi öneririz.</p>
            </article>
        `.trim()
    };

    // Update the site in DB
    await prisma.site.upsert({
        where: { domain },
        update: {
            maskContent: JSON.stringify(maskContent),
            seoSettings: JSON.stringify(seoSettings),
            isActive: true
        },
        create: {
            name: 'Flovaz Aggressive SEO 2026',
            domain,
            maskContent: JSON.stringify(maskContent),
            bettingContent: JSON.stringify({ bonuses: [] }), // Keep existing or default
            cloakingRules: JSON.stringify({
                showMaskTo: { desktop: true, bots: true },
                showBettingTo: { mobile: true, includedCountries: ['TR', 'CY'] }
            }),
            seoSettings: JSON.stringify(seoSettings),
            isActive: true
        }
    });

    console.log('Successfully updated FlovazComercial for elite SEO ranking!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
