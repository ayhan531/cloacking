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
            <h1><a href="/deneme-bonusu">Bonus Veren Siteler 2026</a> Rehberi: En Yüksek Kazanç Fırsatları</h1>
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

    await prisma.site.update({
        where: { domain },
        data: {
            seoSettings: JSON.stringify({
                metaTitle: 'Bonus Veren Siteler 2026 - En Yüksek Deneme Bonusu Veren Siteler',
                metaDescription: '2026 yılının en güncel, güvenilir ve yüksek deneme bonusu veren siteleri listesi. Hemen tıkla, yatırım şartsız bonusları keşfet!',
                keywords: keywords,
                structuredData: {
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": [
                        { "@type": "Question", "name": "2026'da en yüksek deneme bonusu ne kadar?", "acceptedAnswer": { "@type": "Answer", "text": "2026 yılında deneme bonusu miktarları 500 TL ile 1000 TL arasına yükselmiştir." } },
                        { "@type": "Question", "name": "Yatırım şartsız bonus çekilebilir mi?", "acceptedAnswer": { "@type": "Answer", "text": "Evet, sitemizdeki listede bulunan çoğu site yatırım şartı aramadan kazancınızı ödemektedir." } }
                    ]
                },
                hiddenSEOArticle: hiddenSEOArticle
            })
        }
    });

    console.log('Super Aggressive SEO V4 deployed to FlovazComercial!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
