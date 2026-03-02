import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Daha agresif ve niş odaklı anahtar kelimeler
const targetKeywords = [
    "Deneme Bonusu Veren Siteler",
    "Yatırımsız Deneme Bonusu",
    "Çevrimsiz Bonus Veren Siteler",
    "Bedava Bonus 2026",
    "Freebet Veren Bahis Siteleri",
    "Payfix Deneme Bonusu",
    "Mefete Yatırım Bonusu",
    "Hoşgeldin Bonusu Veren Yerler",
    "SMS Doğrulamasız Deneme Bonusu",
    "En Yüksek Bonus Veren Siteler"
];

const subKeywords = [
    "Güvenilir Analiz",
    "Güncel Liste",
    "Yatırımsız Seçenekler",
    "Kesintisiz Erişim",
    "Yeni Açılanlar",
    "Popüler Markalar",
    "Lisanslı Şirketler"
];

const articleBodies = {
    intro: [
        "2026 yılına girdiğimiz şu günlerde, bahis severlerin en çok aradığı konu kuşkusuz deneme bonusu veren siteler olmaktadır.",
        "Şans oyunları dünyasında risksiz kazanç elde etmenin en popüler yolu, yatırımsız deneme bonusu seçeneklerini değerlendirmektir.",
        "Rekabetin tavan yaptığı bu dönemde, platformlar yeni kullanıcı çekmek için daha önce görülmemiş bonus miktarları sunmaya başladı.",
        "Dijital analizlerimize göre, kullanıcıların %85'i bir siteye üye olmadan önce sunduğu bedava bonus miktarına bakmaktadır."
    ],
    details: [
        "Özellikle Payfix ve Mefete gibi hızlı ödeme yöntemlerinin yaygınlaşması, deneme bonusu kullanımını daha da kolaylaştırdı.",
        "Alt yapı sağlayıcılarının (Betconstruct, EveryMatrix vb.) sunduğu yeni nesil oyunlar, verilen bonusların çevrim şartlarını daha esnek hale getiriyor.",
        "Lisanslı ve güvenilir marka tercihi yapmak, kazancınızı çekerken sorun yaşamamanız adına en kritik adımdır.",
        "Sektördeki oyuncuların en büyük beklentisi olan 'SMS onaysız üyelik' trendi, 2026 yılında da popülerliğini koruyor."
    ]
};

// HTML Tablo Üreteci (Google Snippets için çok kritik)
function generateComparisonTable(keyword: string) {
    const brands = ["BetX", "Winner24", "GoldPlus", "EliteCasino", "BonusKing"];
    const bonusValues = ["100 TL", "250 TL", "500 TL", "200 TL", "300 TL"];

    let table = `
        <div style="margin: 20px 0; overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse; min-width: 400px; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                <thead>
                    <tr style="background: #3b82f6; color: white; text-align: left;">
                        <th style="padding: 12px; border: 1px solid #e2e8f0;">Platform Adı</th>
                        <th style="padding: 12px; border: 1px solid #e2e8f0;">${keyword}</th>
                        <th style="padding: 12px; border: 1px solid #e2e8f0;">Şartlar</th>
                        <th style="padding: 12px; border: 1px solid #e2e8f0;">Puan</th>
                    </tr>
                </thead>
                <tbody>
    `;

    brands.forEach((brand, i) => {
        table += `
            <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 12px; border: 1px solid #e2e8f0; font-weight: bold;">${brand} Analizi</td>
                <td style="padding: 12px; border: 1px solid #e2e8f0; color: #059669;">${bonusValues[i]}</td>
                <td style="padding: 12px; border: 1px solid #e2e8f0;">Yatırımsız / Çevrimsiz</td>
                <td style="padding: 12px; border: 1px solid #e2e8f0;">⭐ 9.${9 - i}</td>
            </tr>
        `;
    });

    table += `
                </tbody>
            </table>
        </div>
    `;
    return table;
}

function generateSuperArticle(keyword: string, siteName: string) {
    const year = "2026";
    const sub = subKeywords[Math.floor(Math.random() * subKeywords.length)];

    const title = `${year} Yılının En İyi ${keyword} - ${sub} (${siteName})`;
    const slug = title.toLowerCase().replace(/[^a-z0-9ğüşöçİĞÜŞÖÇ]+/g, '-').replace(/^-+|-+$/g, '');

    const content = `
        <p class="lead" style="font-size: 1.1rem; border-left: 4px solid #3b82f6; padding-left: 15px; margin-bottom: 25px;">
            ${articleBodies.intro[Math.floor(Math.random() * articleBodies.intro.length)]} 
            <strong>${keyword}</strong> arayanlar için hazırladığımız bu güncel listede, 
            piyasanın en şeffaf verilerini sunuyoruz.
        </p>
        
        <h2 style="font-size: 1.6rem; color: #1e293b; margin-top: 30px;">${keyword} Kullanmanın Avantajları</h2>
        <p>${articleBodies.details[Math.floor(Math.random() * articleBodies.details.length)]}</p>
        
        <h3 style="font-size: 1.4rem; color: #1e293b;">🔥 En Popüler ${keyword} Listesi</h3>
        ${generateComparisonTable(keyword)}
        
        <p style="background: #eff6ff; padding: 15px; border-radius: 8px; border: 1px dashed #3b82f6; margin: 20px 0;">
            <strong>Uzman Notu:</strong> ${keyword} fırsatlarından yararlanırken her zaman güncel giriş adreslerini kullanmaya özen gösterin. 
            Eski linkler ve sahte sayfalar üzerinden yapılan işlemler güvenliğinizi tehlikeye atabilir.
        </p>

        <h2 style="font-size: 1.6rem; color: #1e293b;">Sıkça Sorulan Sorular (SSS)</h2>
        <div style="margin-top: 15px;">
            <p><strong>${keyword} gerçekten yatırımsız mı?</strong><br>Evet, listemizde yer alan birçok platform, üye olduğunuz anda hesabınıza tanımlanan bakiyeleri yatırım şartı olmadan sunmaktadır.</p>
            <p><strong>En yüksek bonusu hangi site veriyor?</strong><br>2026 itibariyle rekabet arttı, ancak ortalama bonus miktarları 250 TL ile 500 TL arasında değişmektedir.</p>
        </div>
    `;

    return { title, slug, summary: articleBodies.intro[0], content };
}

async function main() {
    console.log("💣 BAŞLATILIYOR: NUCLEAR SEO REVOLUTION v3.0 (Targeting First Page) 💣");

    const sites = await prisma.site.findMany({ where: { isActive: true } });

    // 1. Site isimlerini optimize et (Eğer çok genericlerse)
    const siteMapping: Record<string, string> = {
        'flovazcomercial.com': 'Flovaz Bonus Rehberi 2026',
        '2026bonuslar.com': '2026 Deneme Bonusu Otoritesi',
        'bedavabonus2026.com': 'Bedava Bonus 2026 - Yatırımsız',
        'bonusverensiteler2026.com': 'Bonus Veren Siteler Bilgi Portalı',
        'haber-analiz2026.com': 'Haber Analiz Bahis Raporu',
        'vizyontekyazilim.com': 'VizyonTek Bonus Analitik',
        'yasalbonus2026.com': 'Yasal Bonus 2026 Listesi',
        'independent-news.org': 'Independent News Bonus Center'
    };

    for (const site of sites) {
        console.log(`\n⚙️ Güçlendiriliyor: ${site.domain}`);

        const optimizedName = siteMapping[site.domain] || site.name;
        const currentMask = JSON.parse(site.maskContent || "{}");
        const currentSeo = JSON.parse(site.seoSettings || "{}");

        // 12-18 arası Çok Güçlü makale üret
        const generatedNews = [];
        for (let i = 0; i < 15; i++) {
            const keyword = targetKeywords[i % targetKeywords.length];
            const article = generateSuperArticle(keyword, optimizedName);

            generatedNews.push({
                id: Math.random().toString(36).substring(2, 10),
                title: article.title,
                slug: article.slug,
                summary: article.summary,
                content: article.content,
                date: new Date().toISOString(),
                author: "Baş Editör Alexandr Vatan",
                tags: [keyword, "2026", "Deneme Bonusu", "Analiz"]
            });
        }

        currentMask.news = generatedNews;

        // SEO Ayarlarını Kilitle (En agresif meta title)
        currentSeo.metaTitle = `${new Intl.DateTimeFormat('tr-TR', { month: 'long' }).format(new Date())} 2026 Deneme Bonusu Veren Siteler - ${optimizedName}`;
        currentSeo.metaDescription = `En güncel ${optimizedName} raporu: Yatırımsız deneme bonusu, 2026 bedava bonus veren siteler ve güvenilir bahis incelemeleri burada. Hemen tıkla, kazanmaya başla!`;
        currentSeo.keywords = "deneme bonusu veren siteler 2026, bedava bonus, yatırımsız bonus, payfix bonus, bahis analiz, 2026 casino bonusları";

        await prisma.site.update({
            where: { id: site.id },
            data: {
                name: optimizedName,
                maskContent: JSON.stringify(currentMask),
                seoSettings: JSON.stringify(currentSeo)
            }
        });

        console.log(`✅ ${site.domain} Başarı ile 'Nuclear' seviyesine yükseltildi.`);
    }

    console.log("\n🚀 OPERASYON TAMAMLANDI! Tüm siteler artık en agresif SEO kodlarına sahip. 🚀");
}

main().catch(console.error).finally(() => prisma.$disconnect());
