const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log("🚀 EXPLOSION SEO: Generating Nuclear News Cluster for all sites...");

    const sites = await prisma.site.findMany();
    const currentYear = new Date().getFullYear();
    const currentMonthLong = new Intl.DateTimeFormat('tr-TR', { month: 'long' }).format(new Date());

    const newsTemplates = [
        {
            title: "2026 Yılının En Güvenilir Bahis Altyapıları Analizi",
            slug: "en-guvenilir-altyapilar-2026",
            summary: "2026 yılında güvenlik standartlarının yükselmesiyle beraber Betconstruct ve EveryMatrix altyapıları ön plana çıkıyor. İşte detaylı güvenlik analizi.",
            content: "Bahis dünyasında güvenliğin en üst seviyeye çıktığı 2026 yılında, oyuncuların ilk dikkat ettiği nokta altyapı sağlayıcıları oluyor. Özellikle SHA-512 şifreleme ve Blockchain tabanlı ödeme sistemlerini entegre eden siteler, sektörde otorite konumuna yükseldi. Deneme bonusu veren siteler 2026 listemizde bu altyapılara sahip siteleri önceliklendirdik."
        },
        {
            title: "Yatırımsız Deneme Bonusu Çevrim Şartlarında Büyük Değişim",
            slug: "bonus-cevrim-sartlari-degisimi",
            summary: "Kullanıcı dostu politikalar sayesinde artık 2026 deneme bonusu seçeneklerinde çevrim şartları neredeyse tamamen kalktı.",
            content: "Eskiden 10-20 kat olan çevrim şartları, 2026'nın rekabetçi ortamında artık 1.30 orandan bir kez oynama seviyesine düştü. Bedava bonus veren siteler 2026 platformları, oyuncu sadakatini kazanmak için bu stratejiyi izliyor."
        },
        {
            title: "Bitcoin ve Kripto Paralarla Bahis: 2026 Trendleri",
            slug: "kripto-bahis-trendleri-2026",
            summary: "Anonimlik ve hız isteyen bahis severler için kripto para yöntemleri 2026'da ana ödeme kanalı haline geldi.",
            content: "Kripto paralar ile işlem yapan bahis siteleri, hem hız hem de gizlilik konusunda devrim yarattı. Bonus veren siteler 2026 listemizde kripto yatırımlarına özel %500'e varan hoşgeldin bonuslarını inceledik."
        },
        {
            title: "Mobil Bahis Uygulamalarında Yapay Zeka Dönemi",
            slug: "yapay-zeka-bahis-uygulamalari",
            summary: "Artık bahis uygulamaları kullanıcı tercihlerine göre özel bonus önerileri sunuyor. 2026'nın akıllı bonus sistemlerini tanıyalım.",
            content: "Yapay zeka, bahis deneyimini kişiselleştiriyor. Hangi oyunları sevdiğinizi bilen sistemler, size özel yatırımsız deneme bonusu tekliflerini anlık bildirimle gönderiyor."
        },
        {
            title: "En Yüksek Oranlı Bahis Siteleri: Mart 2026 Karşılaştırması",
            slug: "en-yuksek-oranli-siteler-subat-2026",
            summary: "Şubat ayı boyunca devam eden büyük turnuvalar için en yüksek bahis oranlarını sunan 10 siteyi karşılaştırdık.",
            content: "Şampiyonlar Ligi ve NBA finalleri yaklaşırken, oran karşılaştırmaları her zamankinden daha önemli. 2026 bahis siteleri arasında kar marjını %2'ye çeken devleri listemize ekledik."
        }
    ];

    for (const site of sites) {
        console.log(`Updating News for: ${site.domain}...`);

        let mask = typeof site.maskContent === 'string' ? JSON.parse(site.maskContent) : (site.maskContent || {});

        // Generate personalized news objects
        const siteNews = newsTemplates.map((t, idx) => ({
            id: (idx + 1).toString(),
            title: t.title.replace("2026", currentYear.toString()).replace("Şubat", currentMonthLong),
            slug: t.slug,
            summary: t.summary.replace("2026", currentYear.toString()).replace("Şubat", currentMonthLong),
            content: t.content.replace("2026", currentYear.toString()).replace("Şubat", currentMonthLong),
            date: new Date(Date.now() - idx * 86400000).toISOString(), // Subtract days for history
            author: "Uzman Analist",
            tags: ["Analiz", "Haber", "Bonus"]
        }));

        mask.news = siteNews;
        mask.type = 'news'; // Ensure it's treated as a news/blog site
        mask.siteName = site.name;

        // Enhance Footer Links specifically for SEO power keywords
        mask.footerLinks = [
            { label: "Deneme Bonusu Veren Siteler 2026", link: "/deneme-bonusu" },
            { label: "Yatırımsız Bonus 2026", link: "/yatirimsiz-bonus" },
            { label: "Kripto Bahis Analizi", link: "/kripto-bahis" },
            { label: "Yeni Giriş Adresleri", link: "#" }
        ];

        // Extreme Meta Update
        let seo = typeof site.seoSettings === 'string' ? JSON.parse(site.seoSettings) : (site.seoSettings || {});
        seo.metaTitle = `🔥 ${currentMonthLong} ${currentYear} Deneme Bonusu Veren Siteler (Yatırımsız & Güncel)`;
        seo.metaDescription = `${site.name} ile 2026 yılının en güvenilir deneme bonusu veren sitelerini keşfedin. Günlük güncellenen %100 yatırımsız bonus listesi ve analiz portalı.`;

        await prisma.site.update({
            where: { id: site.id },
            data: {
                maskContent: JSON.stringify(mask),
                seoSettings: JSON.stringify(seo),
                maskType: 'blog' // Switch all to blog for more indexable content
            }
        });
    }

    console.log("✅ News Cluster Explosion Complete! All sites are now rich with fresh, indexable articles.");
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
