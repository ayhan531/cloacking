import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const domain = 'flovazcomercial.com';

    const keywords = [
        'bonus veren siteler 2026', 'deneme bonusu veren siteler 2026', 'yatırım şartsız deneme bonusu',
        'bedava bonus veren siteler', 'en güvenilir bahis siteleri', 'casino bonusları 2026',
        'hoşgeldin bonusu veren siteler', 'çevrimsiz bonus veren siteler', 'kayıp bonusu veren siteler',
        'popüler bahis siteleri 2026', 'canlı bahis deneme bonusu', 'free spin veren siteler'
    ];

    const hiddenSEOArticle = `
        <article style="font-size: 1px; color: transparent; opacity: 0; position: absolute; z-index: -1;">
            <div style="border: 1px solid red; padding: 10px; margin-bottom: 20px;">
                <strong>SON DAKİKA - ${new Date().toLocaleDateString('tr-TR')} Güncellemesi:</strong> 
                2026 sezonu açıldı! Yeni lisanslı siteler listeye eklendi.
            </div>
            <h1><a href="/deneme-bonusu">Bonus Veren Siteler 2026</a> Rehberi: En Yüksek Kazanç Fırsatları</h1>
            <p>Son Güncelleme: <span>${new Date().toISOString()}</span></p>
            <section>
                <p>Türkiye'nin en kapsamlı <strong><a href="/deneme-bonusu">bonus veren siteler 2026</a></strong> analiz platformuna hoş geldiniz. Sektördeki 10 yıllık tecrübemizle, kullanıcılarımıza en güvenilir ve en yüksek kazanç sağlayan platformları sunuyoruz.</p>
                
                <h2><a href="/deneme-bonusu">Deneme Bonusu Veren Siteler 2026</a> Listesi</h2>
                <p>Yeni yıla girerken <strong>deneme bonusu veren siteler</strong> arayışında olan kullanıcılar için hazırladığımız liste, piyasanın en köklü firmalarını içermektedir. Bu siteler, oyuncularına yatırım yapmadan önce siteyi test etme şansı tanır.</p>
                
                <table border="1">
                    <thead>
                        <tr>
                            <th>Site Adı</th>
                            <th>Bonus Miktarı</th>
                            <th>Bonus Türü</th>
                            <th>Güven Skor</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>Venombet</td><td>500 TL</td><td><a href="/deneme-bonusu">Yatırımsız Deneme</a></td><td>9.9/10</td></tr>
                        <tr><td>Betsin</td><td>250 TL + 50 FS</td><td><a href="/hosgeldin-bonusu">Hoşgeldin</a></td><td>9.8/10</td></tr>
                        <tr><td>Grandpasha</td><td>100 TL Freebet</td><td><a href="/bahis-siteleri">Çevrimsiz</a></td><td>9.7/10</td></tr>
                    </tbody>
                </table>
                
                <h3>Neden <a href="/deneme-bonusu">Yatırım Şartsız Bonusları</a> Tercih Etmelisiniz?</h3>
                <p><strong>Yatırım şartsız deneme bonusu</strong> veren siteler, 2026 yılında en çok aranan kategoridir. Bu bonuslar sayesinde cebinizden tek kuruş çıkmadan gerçek para kazanma ihtimaliniz bulunur. Sektördeki rekabet arttığı için artık 500 TL ve üzeri rakamları görmek mümkün.</p>
                
                <h2>2026 Yılının En İyi <a href="/bahis-siteleri">Bahis</a> ve <a href="/casino-siteleri">Casino Bonusları</a></h2>
                <p>Bahis dünyasında <strong>bedava bonus</strong> almak sadece bir başlangıçtır. Profesyonel oyuncular için asıl kazanç, sadakat programları ve yüksek yüzdeli yatırım bonuslarındadır. İşte 2026'da öne çıkan bazı fırsatlar:</p>
                <ul>
                    <li>%300 <a href="/hosgeldin-bonusu">Hoşgeldin Paketi</a> - İlk 3 yatırıma özel.</li>
                    <li>%50 Kripto Yatırım Bonusu - Bitcoin ve Ethereum ile hızlı işlem.</li>
                    <li>%25 Haftalık Kayıp Bonusu - Kaybetseniz bile kazanmaya devam edin.</li>
                </ul>
                
                <h3>Hangi Siteler Güvenilir?</h3>
                <p>Bir sitenin <strong><a href="/bahis-siteleri">bonus veren siteler 2026</a></strong> listesine girebilmesi için Curaçao veya Malta lisansına sahip olması şarttır. Bizim inceleme ekibimiz, her siteyi 24 farklı kriterle test eder. Para çekme hızı, müşteri hizmetleri kalitesi ve bonus çevrim şartlarının şeffaflığı bizim için birincil önceliktir.</p>
                
                <p>Sonuç olarak, 2026 yılında kazancınızı katlamak istiyorsanız, güncel listemizi takip etmeyi unutmayın. <em><a href="/deneme-bonusu">Deneme bonusu veren siteler 2026</a></em> rehberimiz her hafta yeni fırsatlarla güncellenmektedir.</p>
            </section>
        </article>
    `.trim();

    const newsData = [
        {
            id: "1",
            title: "2026 Yılı Deneme Bonusu Veren Siteler Listesi",
            slug: "deneme-bonusu-veren-siteler-2026",
            summary: "En güncel ve en yüksek deneme bonusu veren siteler 2026 listesi burada. Yatırımsız şartsız bonus fırsatlarını kaçırmayın.",
            content: "<p>2026 yılına damgasını vuran <strong>deneme bonusu veren siteler</strong> listemiz güncellendi. Artık çevrim şartsız ve yatırımsız bonuslar çok daha popüler. İşte detaylar...</p><h3>2026 Trendleri</h3><p>Bahis severler için bu yılın en büyük sürprizi kripto bonusları oldu.</p>",
            date: new Date().toISOString(),
            tags: ["Deneme Bonusu", "2026", "Bahis"]
        },
        {
            id: "2",
            title: "Yatırımsız Bonus Veren Bahis ve Casino Siteleri",
            slug: "yatirimsiz-bonus-veren-siteler",
            summary: "Cebinizden para çıkmadan kazanma şansı! Yatırım şartsız deneme bonusları ve freespin kampanyaları.",
            content: "<p>Hiçbir risk almadan bahis oynamak ister misiniz? <strong>Yatırımsız bonus veren siteler</strong> tam size göre. Bu rehberimizde güvenilir siteleri inceledik.</p>",
            date: new Date().toISOString(),
            tags: ["Yatırımsız", "Casino", "Freespin"]
        }
    ];

    // Fetch existing site content first to preserve other fields
    const existingSite = await prisma.site.findUnique({ where: { domain } });
    let currentMaskContent = {};
    if (existingSite) {
        currentMaskContent = JSON.parse(existingSite.maskContent);
    }

    const updatedMaskContent = {
        ...currentMaskContent,
        news: newsData
    };

    await prisma.site.update({
        where: { domain },
        data: {
            maskContent: JSON.stringify(updatedMaskContent),
            seoSettings: JSON.stringify({
                metaTitle: 'Deneme Bonusu Veren Siteler 2026 - Flovaz Haber',
                metaDescription: 'Flovaz ile 2026 yılının en güvenilir deneme bonusu veren siteler listesine ulaşın. Yatırımsız şartsız bonuslar, bahis tahminleri ve anlık haberler.',
                keywords: keywords,
                structuredData: {
                    "@context": "https://schema.org",
                    "@type": "NewsMediaOrganization",
                    "name": "Flovaz Haber",
                    "url": `https://${domain}`,
                    "logo": {
                        "@type": "ImageObject",
                        "url": `https://${domain}/logo.png`
                    },
                    "sameAs": [
                        "https://www.facebook.com/flovaz",
                        "https://twitter.com/flovaz"
                    ]
                },
                hiddenSEOArticle: hiddenSEOArticle
            })
        }
    });

    console.log('Super Aggressive SEO V5 (With News) deployed to FlovazComercial!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
