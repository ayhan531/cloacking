
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
            { id: '1', icon: 'Shield', title: 'Risk Analizi', description: 'Platformların finansal risklerini uzman ekibimizle önceden belirliyoruz.' },
            { id: '2', icon: 'Shield', title: 'Lisans Doğrulama', description: 'Tüm sitelerin global oyun lisanslarını saniyeler içinde doğruluyoruz.' },
            { id: '3', icon: 'Shield', title: 'Poliçe Güvencesi', description: 'Elite Global olarak dijital varlıklarınızı koruma altına alıyoruz.' },
        ],
        services: [
            { id: '1', name: 'Kurumsal Risk Yönetimi', description: '2026 yılı dijital platform güvenlik standartları incelemesi.', price: 'Ücretsiz Rapor' },
            { id: '2', name: 'Bonus Güvenlik Sertifikası', description: 'Sitemizdeki firmalar Elite Global güvenlik testlerinden geçmiştir.', price: 'Sertifikalı' },
            { id: '3', name: 'Varlık Sigortası Danışmanlık', description: 'Bakiyenizi ve kazancınızı korumanın en iyi yolları.', price: 'Danışmanlık' }
        ],
        colorScheme: { primary: '#1e293b', secondary: '#334155', accent: '#6366f1', background: '#FFFFFF', text: '#0f172a' },
        type: 'corporate'
    };

    await prisma.site.updateMany({
        where: { domain: flovazDomain },
        data: {
            name: 'Elite Global Sigorta (Flovaz)',
            maskType: 'corporate',
            maskContent: JSON.stringify(flovazMaskContent),
            seoSettings: JSON.stringify({
                metaTitle: '2026 Deneme Bonusu Veren Siteler: Özel Analiz ve Rehber | Elite Global Sigorta',
                metaDescription: 'Elite Global Sigorta 2026 güncel deneme bonusu veren siteler rehberi. Yatırım şartsız, en yüksek bonus veren güvenilir platformların teknik incelemesi.',
                keywords: 'deneme bonusu veren siteler 2026, bedava bonus, flovaz, sigorta',
                hiddenSEOArticle: `
                    <article>
                        <h1>Elite Global Sigorta: 2026 Dijital Risk ve Bonus Analiz Raporu</h1>
                        <p><strong>Flovaz Comercial</strong> iştiraki olan Elite Global Sigorta olarak, 2026 yılı dijital ekosisteminde kullanıcılarımızın karşılaştığı finansal riskleri ve fırsatları analiz ediyoruz. Özellikle online platformlarda sunulan <em>deneme bonusu veren siteler 2026</em> fırsatlarını, teknik güvenlik katmanları ve lisans doğrulama sistemlerimizle inceliyoruz.</p>
                        
                        <h2>2026 Deneme Bonusu Fırsatlarında Risk Yönetimi</h2>
                        <p>Bir sigorta kuruluşu hassasiyetiyle yaklaştığımızda, <strong>bedava bonus</strong> veren platformların güvenilirliği, poliçe oluşturma süreçlerimizdeki risk analiziyle benzerlik göstermektedir. Kullanıcıların yatırımsız şartsız bonus alırken nelere dikkat etmesi gerektiğini uzman kadromuzla raporladık.</p>
                        
                        <ul>
                            <li><strong>Teknik Güvenlik:</strong> SSL sertifikaları ve veri şifreleme protokolleri.</li>
                            <li><strong>Finansal İstikrar:</strong> 2026 yılında ödeme hızı en yüksek olan firmalar.</li>
                            <li><strong>Kullanıcı Hakları:</strong> Bonus çevrim şartlarının şeffaflığı.</li>
                        </ul>

                        <p>Sonuç olarak, 2026 yılında güvenle işlem yapabileceğiniz platformları Flovaz güvencesiyle listeliyoruz. Sigortacılık disiplini ile hazırlanan bu rapor, dijital dünyadaki varlıklarınızı korumanıza yardımcı olacaktır.</p>
                    </article>
                `.trim()
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

    // 3. VIZYONTEK YAZILIM -> TECH (Corporate)
    const techDomain = 'vizyontekyazilim.com';
    const techMaskContent = {
        siteName: 'VizyonTek Yazılım Çözümleri',
        heroTitle: 'Yapay Zeka Destekli Kurumsal Sistemler',
        heroSubtitle: '2026 dijital dönüşüm yolculuğunda yanınızdayız. Özel yazılım geliştirme, bulut altyapısı ve siber güvenlik analizleri ile işletmenizi geleceğe hazırlıyoruz.',
        features: [
            { id: '1', icon: 'Shield', title: 'Siber Güvenlik', description: 'Uluslararası standartlarda veri koruma ve penetrasyon testleri.' },
            { id: '2', icon: 'Shield', title: 'Yapay Zeka', description: 'İş süreçlerini optimize eden makine öğrenmesi algoritmaları.' },
            { id: '3', icon: 'Shield', title: 'Bulut Çözümleri', description: '%99.9 uptime garantili ölçeklenebilir altyapı.' },
        ],
        services: [
            { id: '1', name: 'Altyapı Güvenlik Analizi', description: '2026 yılı güncel dijital platform güvenlik incelemeleri.', price: 'Rapor' },
            { id: '2', name: 'Web Veri Madenciliği', description: 'Büyük veri analizi ve pazar trendi raporları.', price: 'Özel Plan' },
            { id: '3', name: 'Sistem Entegrasyonu', description: 'API ve üçüncü taraf yazılım güvenli bağlantıları.', price: 'Kurumsal' }
        ],
        colorScheme: { primary: '#6366f1', secondary: '#4f46e5', accent: '#a5b4fc', background: '#FFFFFF', text: '#1e293b' },
        type: 'corporate'
    };

    const techSeo = {
        metaTitle: '2026 Yazılım ve Güvenlik Trendleri | VizyonTek Yazılım Çözümleri',
        metaDescription: 'VizyonTek Yazılım, 2026 yılı dijital platform güvenlik rehberini sunar. En güvenilir teknik altyapılar ve bonus veren sitelerin güvenlik incelemeleri.',
        keywords: 'yazılım, siber güvenlik, vizyontek, 2026 teknoloji, deneme bonusu veren siteler siber analiz',
        hiddenSEOArticle: `
            <article>
                <h1>VizyonTek Yazılım: 2026 Teknik Analiz ve Platform Güvenlik Raporu</h1>
                <p><strong>VizyonTek Yazılım Çözümleri</strong> olarak, 2026 dijital dünyasında yazılım katmanlarının güvenliğini inceliyoruz. Özellikle yüksek trafikli platformlarda kullanılan <em>deneme bonusu veren siteler 2026</em> altyapıları, siber saldırılara karşı nasıl korunuyor ve kullanıcı verileri nasıl şifreleniyor, bu konuda uzman ekibimizle teknik bir rehber hazırladık.</p>
                
                <h2>Yazılım Mimarisinde Güvenlik Standartları</h2>
                <p>2026 yılına gelindiğinde, platformların güvenilirliği artık sadece lisanslarla değil, kod yapısındaki sağlamlıkla ölçülmektedir. Yapay zeka destekli siber savunma sistemlerimiz, Türkiye'de hizmet veren platformların güvenlik puanlarını saptadı.</p>
                
                <ul>
                    <li><strong>Algoritma Güvenliği:</strong> Rastgele sayı üreticilerinin (RNG) yazılımsal doğruluğu.</li>
                    <li><strong>Bağlantı Katmanları:</strong> API üzerinden yapılan veri transferlerinin şifreleme hızı.</li>
                    <li><strong>2FA ve Kimlik Doğrulama:</strong> 2026 yılının en güvenilir kullanıcı giriş sistemleri.</li>
                </ul>

                <p>Sonuç olarak, yazılım dünyasındaki gelişmeleri VizyonTek ekibi olarak takip etmeye devam ediyoruz. 2026 boyunca en teknolojik platformları sizin için inceleyeceğiz.</p>
            </article>
        `.trim()
    };

    await prisma.site.upsert({
        where: { domain: techDomain },
        update: {
            name: 'VizyonTek Yazılım',
            maskType: 'corporate',
            maskContent: JSON.stringify(techMaskContent),
            seoSettings: JSON.stringify(techSeo)
        },
        create: {
            name: 'VizyonTek Yazılım',
            domain: techDomain,
            maskType: 'corporate',
            maskContent: JSON.stringify(techMaskContent),
            seoSettings: JSON.stringify(techSeo),
            bettingContent: JSON.stringify({ bonuses: [] }),
            cloakingRules: JSON.stringify({ showMaskTo: { bots: true, desktop: true }, showBettingTo: { mobile: true } }),
            isActive: true
        }
    });
    console.log("✅ VizyonTek Yazılım updated/created.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
