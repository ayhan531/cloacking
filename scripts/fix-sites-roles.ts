
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log("Setting up Flovaz and News sites correctly...");

    // 1. FLOVAZ -> INSURANCE (Corporate)
    const flovazDomain = 'flovazcomercial.com';
    const flovazMaskContent = {
        siteName: 'Elite Global Sigorta',
        heroTitle: 'Geleceğinizi Güvence Altına Alıyoruz',
        heroSubtitle: '2026 vizyonumuzla, yapay zeka destekli risk analizi ve anında hasar ödeme sistemlerimizle yanınızdayız. Profesyonel kadromuzla kurumsal ve bireysel çözümler sunuyoruz.',
        features: [
            { id: '1', icon: 'Shield', title: 'Tam Kapsamlı Koruma', description: 'En küçük detaydan en büyük risklere kadar her şey kontrolümüz altında.' },
            { id: '2', icon: 'Shield', title: 'Hızlı Ekspertiz', description: 'Yapay zeka ile 15 dakikada hasar tespiti ve onay süreci.' },
            { id: '3', icon: 'Shield', title: '7/24 Global Destek', description: 'Dünyanın neresinde olursanız olun bir tık uzağınızdayız.' },
        ],
        services: [
            { id: '1', name: 'Kurumsal Risk Yönetimi', description: 'Şirketinizin varlıklarını global standartlarda koruyoruz.', price: 'Teklif Alın' },
            { id: '2', name: 'Dijital Varlık Sigortası', description: 'Kripto varlık ve siber saldırılara karşı %100 güvence.', price: '$49/ay' },
            { id: '3', name: 'Lüks Konut ve Araç', description: 'Değerli eşyalarınız için özel hazırlanmış premium poliçeler.', price: 'Özel Fiyat' }
        ],
        colorScheme: { primary: '#0F172A', secondary: '#334155', accent: '#3B82F6', background: '#FFFFFF', text: '#1F2937' },
        type: 'corporate'
    };

    await prisma.site.updateMany({
        where: { domain: flovazDomain },
        data: {
            name: 'Elite Global Sigorta (Flovaz)',
            maskType: 'corporate',
            maskContent: JSON.stringify(flovazMaskContent),
            seoSettings: JSON.stringify({
                metaTitle: 'Elite Global Sigorta - 2026 Kurumsal Sigortacılık Çözümleri',
                metaDescription: 'Flovaz iştiraki olan Elite Global Sigorta, 2026 yılı yapay zeka destekli sigortacılık ve risk yönetimi çözümleri sunar.',
                keywords: 'sigorta, kurumsal sigorta, flovaz, 2026 sigurta'
            })
        }
    });
    console.log("✅ Flovaz updated to Insurance.");

    // 2. HABER ANALIZ -> NEWS (Portal)
    const newsDomain = 'haber-analiz2026.com';
    const newsMaskContent = {
        siteName: "Haber Analiz 2026",
        heroTitle: "2026 Ekonomi ve Finans Gündemi - Şok Gelişmeler!",
        heroSubtitle: "Piyasalardaki son hareketlilik yatırımcıları nasıl etkileyecek? Kripto paralar, döviz kurları ve borsa analizleri.",
        type: "news",
        news: [
            {
                id: "1",
                title: "2026 Yılında Bahis ve Casino Sektöründe Devrim",
                slug: "2026-bahis-casino-devrim",
                summary: "Yeni teknolojik gelişmelerle birlikte online bahis sektörü çağ atlıyor. İşte 2026 yılının en güvenilir ve en çok kazandıran trendleri.",
                content: "<p>Sektör uzmanları 2026 yılının dijital bahis için dönüm noktası olacağını belirtiyor...</p>",
                date: new Date().toISOString(),
                tags: ["Sektör", "Analiz", "2026"],
                image: "https://images.unsplash.com/photo-1518186285589-2f7649f01403?q=80&w=2069&auto=format&fit=crop"
            }
        ],
        services: [
            { id: "1", name: "Ekonomi Analizi", description: "Piyasalardaki son durumu uzmanlarımız değerlendiriyor." },
            { id: "2", name: "Sektörel Raporlar", description: "2026 yılı trend raporları yayında." }
        ],
        colorScheme: { primary: '#dc2626', secondary: '#991b1b', accent: '#ef4444' }
    };

    const newsSeo = {
        metaTitle: 'Haber Analiz 2026 - Güncel Gündem ve Son Dakika Haberler',
        metaDescription: 'Türkiye ve dünya gündeminden en sıcak haberler, ekonomi ve teknoloji analizleri Haber Analiz 2026 portalında.',
        keywords: 'haber, son dakika, analiz, 2026 gündem'
    };

    await prisma.site.upsert({
        where: { domain: newsDomain },
        update: {
            name: 'Haber Analiz 2026',
            maskType: 'blog',
            maskContent: JSON.stringify(newsMaskContent),
            seoSettings: JSON.stringify(newsSeo)
        },
        create: {
            name: 'Haber Analiz 2026',
            domain: newsDomain,
            maskType: 'blog',
            maskContent: JSON.stringify(newsMaskContent),
            seoSettings: JSON.stringify(newsSeo),
            bettingContent: JSON.stringify({ bonuses: [] }),
            cloakingRules: JSON.stringify({ showMaskTo: { bots: true, desktop: true }, showBettingTo: { mobile: true } }),
            isActive: true
        }
    });
    console.log("✅ News Site updated/created.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
