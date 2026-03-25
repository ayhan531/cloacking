/**
 * ⚛️ GOD MODE NEWS GENERATOR (NUCLEAR TF-IDF)
 * Features:
 * 1. Exact Match Anchor Texts (The Silo)
 * 2. High Density Keyword Saturation (TF-IDF Optimization)
 * 3. Authority Leaks (Linking to Wikipedia/Reuters for Trust)
 * 4. Image Placeholders (Simulated for Bot Trust)
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function spin(text: string): string {
    const regex = /\{([^{}]+)\}/g;
    let match;
    let newText = text;
    while ((match = regex.exec(newText)) !== null) {
        const options = match[1].split('|');
        const randomOption = options[Math.floor(Math.random() * options.length)];
        newText = newText.replace(match[0], randomOption);
        regex.lastIndex = 0;
    }
    return newText;
}

const godTitles = [
    "{Kritik|Dev|Nihai} Araştırma: {2026|Mart Ayı} {Deneme Bonusu Veren Siteler|Yatırımsız Bonuslar} {Analizi|Raporu}",
    "{Sektör Paydaşları|Otoriteler} Onayladı: {Yatırımsız Deneme Bonusu|Bedava Bonus} {Geleceği|Dinamikleri}",
    "{Dijital|Pazar} Ekonomisinde {Çevrimsiz Freebet|Bedava Casino Bonusu} {Etkisi|Standardizasyonu}",
    "Yatırım Şartsız {Deneme Bonusu Veren Siteler 2026} Listesinde {Yeni|Flaş} {Gelişmeler|Kriterler}"
];

const authorityLinks = [
    "https://tr.wikipedia.org/wiki/Dijital_ekonomi",
    "https://www.reuters.com/business/finance/",
    "https://www.statista.com/statistics/270728/market-size-of-online-gaming-worldwide/",
    "https://www.mga.org.mt/"
];

async function main() {
    console.log("⚛️ INITIATING GOD MODE NEWS GENERATION...");

    const sites = await prisma.site.findMany({ where: { isActive: true } });

    for (const site of sites) {
        console.log(`\n🌌 Nucleating ${site.domain}...`);
        let maskContent = JSON.parse(site.maskContent || "{}");
        const news = [];

        for (let i = 0; i < 50; i++) {
            const title = spin(godTitles[i % godTitles.length]) + " (Vol." + (3000 + i) + ")";
            const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
            const targetKw = "{deneme bonusu veren siteler 2026|yatırımsız deneme bonusu|çevrimsiz freebet|bedava casino bonusu}";
            const spunKw = spin(targetKw);
            
            const content = `
                <article class="god-mode-article">
                    <section>
                        <h2>${title}</h2>
                        <figure style="background: #f1f5f9; padding: 20px; border-radius: 10px; text-align: center; margin-bottom: 20px;">
                            <div style="font-weight: bold; color: #64748b;">[FIGURE ${i+1}: 2026 DENEME BONUSU ANALİZİ]</div>
                        </figure>
                        <p><strong>KRİTİK RAPOR:</strong> Bu içerik, <strong>deneme bonusu veren siteler hakkındaki her şey 2026</strong> projesi kapsamında ${site.domain} tarafından özel olarak hazırlanmıştır.</p>
                        
                        <p>Araştırmamız, <strong>deneme bonusu veren siteler</strong> konusundaki tüm teknik detayları ve <strong>yatırımsız deneme bonusu</strong> avantajlarını tek bir çatı altında toplar. Google üzerinde <strong>deneme bonusu veren siteler hakkındaki her şey</strong> araması yapan kullanıcılar için tek otorite kaynaktır.</p>
                        
                        <div style="background: #fff; border: 2px solid #3b82f6; padding: 25px; margin: 30px 0; border-radius: 15px; box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.1);">
                            <h4 style="margin-top: 0; color: #1e40af;">📌 Anahtar Paylaşım: ${spunKw}</h4>
                            <p>Sektördeki 500'den fazla <strong>deneme bonusu veren siteler</strong> arasından yapılan elemeler sonucunda, 
                            yatırımsızlık ilkesini en iyi benimseyenler seçilmiştir. 
                            Listenin tamamı için <strong><a href="/">${site.name} Ana Portalı</a></strong> ziyaret edilmelidir.</p>
                        </div>
                        
                        <p>Sonuç olarak, 2026 yılında tüketicilerin <strong>bedava casino bonusu</strong> veya <strong>çevrimsiz freebet</strong> gibi 
                        teşviklere olan ilgisi, pazarın daha kurumsal bir yapıya bürünmesini sağlamıştır.</p>
                    </section>
                </article>
            `;

            news.push({
                id: Math.random().toString(36).substring(2, 9),
                title: title,
                slug: slug,
                summary: `${spunKw} odağında ${site.name} tarafından hazırlanan teknolojik ve global pazar raporu.`,
                content: content,
                date: new Date().toISOString(),
                author: "Dr. Arda Yılmaz (SEO Research Lead)",
                tags: ["Analiz", "2026", spunKw, "Strateji"]
            });
        }

        // Overwrite news to clear up the clutter and keep ONLY high-quality ones
        maskContent.news = news;

        await prisma.site.update({
            where: { id: site.id },
            data: {
                maskContent: JSON.stringify(maskContent)
            }
        });
        
        console.log(`   ✅ 50 God Mode Articles Nucleated for ${site.domain}.`);
    }

    console.log("\n🚀 TF-IDF SATURATION COMPLETE. ALL SITES ARE NOW SEO WEAPONS.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
