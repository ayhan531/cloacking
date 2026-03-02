import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// SPINTAX Helper
function spin(text: string): string {
    const regex = /\{([^{}]+)\}/g;
    let match;
    let newText = text;
    while ((match = regex.exec(newText)) !== null) {
        const options = match[1].split('|');
        const randomOption = options[Math.floor(Math.random() * options.length)];
        newText = newText.replace(match[0], randomOption);
        regex.lastIndex = 0; // reset
    }
    return newText;
}

const titles = [
    "{2026|Yeni Yılın|En Güncel} {Deneme Bonusu|Bedava Bonus|Yatırımsız Bonus} Rehberi",
    "{Güvenilir|Lisanslı|En İyi} {Casino Siteleri|Bahis Siteleri|İddaa Siteleri} {2026|Listesi}",
    "{Kayıp|Hoşgeldin|Çevrimsiz} Bonusu İsteyenlere {Özel|Dev|Harika} {Fırsatlar|Kampanyalar}",
    "{Bu Yılın|2026'nın} {En Çok Kazandıran|En Popüler} {Platformları|Sistemleri}",
];

const summaries = [
    "{Sektördeki|Bahis dünyasındaki} en {yeni|güncel|popüler} {gelişmeleri|haberleri|bonusları} {sizler için|özel olarak} {derledik|inceledik|sunuyoruz}. {Buradan|Sayfamızdan} {hemen|anında} {inceleyin|göz atın}.",
    "{İlk yatırıma özel|Yatırımsız} tam {500 TL|250 TL|1000 TL} değerindeki {dev|büyük} {kampanyayı|bonusu} {kaçırmayın|yakalayın}. {Üye olup|Kayıt olup} {kazanmaya|oynamaya} {başlayın|hemen başlayın}.",
    "{En güvenilir|Lisansı doğrulanmış} {altyapılara|sistemlere} sahip {firmaları|siteleri} mi arıyorsunuz? {İşte|Burada} en {detaylı|kapsamlı} {analiz|inceleme} {listemiz|raporumuz}.",
];

const paragraphs = [
    "<p>{Türkiye|Avrupa} piyasasındaki {gelişmeler|yenilikler} {hız kesmeden|son sürat} {devam ediyor|sürüyor}. Özellikle {2026 yılı|yeni sezon} itibarıyla {lisanslı|güvenilir} platformlar {rekabeti|yarışı} {artırdı|kızıştırdı}. Böylece {kullanıcılar|oyuncular} çok daha {yüksek|avantajlı} {bonuslar|promosyonlar} {elde edebiliyor|kazanabiliyor}.</p>",
    "<p>{Önemli olan|Dikkat edilmesi gereken} {nokta|husus}, sadece {yüksek miktar|büyük rakamlar} değil. Aynı zamanda {çevrim şartları|kullanım koşulları} da {büyük önem|ciddi önem} taşımaktadır. {Çevrim şartsız|Yatırımsız} verilen {ödüller|bonuslar} her zaman {ilk tercih|öncelik} {olmalıdır|haline gelmiştir}.</p>",
    "<p>{Uzman|Profesyonel} {ekibimiz|kadromuz} {günde|haftada} {onlarca|yüzlerce} farklı {siteyi|platformu} {test ediyor|inceliyor}. {Para çekme|Ödeme} {hızından|süresinden}, {canlı destek|müşteri hizmetleri} {kalitesine|ilgisine} kadar {her detayı|tüm süreçleri} {puanlıyoruz|değerlendiriyoruz}.</p>",
];

const tagPool = ["Deneme Bonusu", "Casino", "Bahis 2026", "Yatırımsız", "Çevrimsiz", "Slot Oyunu", "Kripto Bahis", "Freespin", "Kayıp Bonusu"];

const randomStructure = (domain: string, slug: string) => {
    const hash = Buffer.from(domain + slug).toString('base64').substring(0, 8);
    return `
        <article id="vault-${hash}" class="v-seo-article structure-${Math.floor(Math.random() * 10)}" style="opacity:1; margin-bottom: 20px;">
            <header class="h-head-${hash}" style="padding-bottom: 10px; border-bottom: ${Math.floor(Math.random() * 5)}px solid #efefef;">
                <h2 style="font-size: ${20 + Math.floor(Math.random() * 10)}px; color: #${Math.floor(Math.random() * 16777215).toString(16)};">${spin(titles[Math.floor(Math.random() * titles.length)])}</h2>
                <div style="font-size: 11px; color: #888;">GÜNCELLEME SİNYALİ: ${(new Date()).getTime()}</div>
            </header>
            <div class="content-wrapper-${hash}" style="margin-top: 15px; line-height: ${1.5 + (Math.random() * 0.5)};">
                ${spin(paragraphs[Math.floor(Math.random() * paragraphs.length)])}
                ${spin(paragraphs[Math.floor(Math.random() * paragraphs.length)])}
                ${Math.random() > 0.5 ? spin(paragraphs[Math.floor(Math.random() * paragraphs.length)]) : ''}
                <div style="margin-top: 20px; padding: 15px; background: #${Math.floor(Math.random() * 16777215).toString(16)}11; border-radius: ${Math.floor(Math.random() * 20)}px;">
                    <strong>Fırsat Kodu: ${hash.toUpperCase()}</strong> - <em><a href="/deneme-bonusu">Sektörün en agresif bonusunu almak için tıklayın.</a></em>
                </div>
            </div>
            <div style="visibility:hidden; height:0px; overflow:hidden;">#${Math.random().toString(36).substring(7)}</div>
        </article>
    `;
};

async function main() {
    console.log("🔥 Başlıyor: NUCLEAR SPINTAX SEO GÜNCELLEMESİ (Tüm aktif siteler için) 🔥");
    
    const sites = await prisma.site.findMany({
        where: { isActive: true }
    });
    
    for (const site of sites) {
        console.log(`\n⚙️ İşleniyor: ${site.domain}`);
        const currentMask = JSON.parse(site.maskContent || "{}");
        const currentSeo = JSON.parse(site.seoSettings || "{}");
        
        const generatedNews = [];
        const numArticles = 15 + Math.floor(Math.random() * 10);
        
        for (let i = 0; i < numArticles; i++) {
            const rawTitle = spin(titles[Math.floor(Math.random() * titles.length)]) + ' - ' + Math.floor(Math.random() * 1000);
            const slug = rawTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
            const rawSummary = spin(summaries[Math.floor(Math.random() * summaries.length)]);
            const rawContent = randomStructure(site.domain, slug);
            
            // Generate some random tags
            const tags = [];
            for (let t = 0; t < 2 + Math.floor(Math.random() * 3); t++) {
                tags.push(tagPool[Math.floor(Math.random() * tagPool.length)]);
            }
            
            generatedNews.push({
                id: Math.random().toString(36).substring(2, 9),
                title: rawTitle,
                slug: slug,
                summary: rawSummary,
                content: rawContent,
                date: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString(),
                author: ["Haber Merkezi", "Editör", "VIP Analiz", "Uzman Ekip", "SEO Bot"][Math.floor(Math.random() * 5)],
                tags: [...new Set(tags)]
            });
        }
        
        currentMask.news = generatedNews;
        
        // Update SEO settings uniquely
        currentSeo.metaTitle = spin("{Güvenilir|En İyi} Bahis ve Casino {Rehberi|Analizi} | " + site.domain);
        currentSeo.metaDescription = spin("{En yüksek|Harika} {deneme bonusu|yatırımsız bonus} {veren|dağıtan} sitelerin {güncel|2026} listesini {bulacağınız|inceleyeceğiniz} platform.");
        
        if (!currentSeo.structuredData) currentSeo.structuredData = {};
        currentSeo.structuredData.dateModified = new Date().toISOString();
        
        await prisma.site.update({
            where: { id: site.id },
            data: {
                maskContent: JSON.stringify(currentMask),
                seoSettings: JSON.stringify(currentSeo)
            }
        });
        
        console.log(`✅ ${site.domain} için ${numArticles} eşsiz spinlenmiş haber ve schema işlendi.`);
    }
    
    console.log("\n🚀 TÜM SİTELER BAŞARIYLA SPINTAX SEO GÜNCELLEMESİNDEN GEÇTİ! 🚀");
}

main().catch(console.error).finally(() => prisma.$disconnect());
