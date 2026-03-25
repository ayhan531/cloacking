/**
 * ⚡ FRESHNESS BOOST v4.0
 * Injects 20 more hyper-active news articles and strengthens internal links to the "money page".
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

const flashTitles = [
    "SON DAKİKA: {2026 Mart|Bugün} {Deneme Bonusu|Bedava Bonus} {Kriterleri|Şartları} Değişti!",
    "{Flaş|Önemli} Gelişme: {Yeni Açılan|Lisansı Güncellenen} {Bahis|Casino} Sitelerinde {Değişim|Yükseliş}.",
    "Sektörde {Deprem|Şok}: {Yatırımsız|Çevrimsiz} Bonus Verenlerde {Yüzde 50|Yüzde 100} Artış.",
    "Bilinçli {Tüketici|Kullanıcı} İçin {2026|Yeni Nesil} {Güvenilirlik|Emniyet} Raporu Yayında."
];

async function main() {
    console.log("🔥 STARTING FRESHNESS BOOST v4.0...");

    const sites = await prisma.site.findMany({ where: { isActive: true } });

    for (const site of sites) {
        console.log(`\n⚙️ Updating Freshness: ${site.domain}`);
        const maskContent = JSON.parse(site.maskContent || "{}");
        const currentNews = maskContent.news || [];
        
        const newArticles = [];
        for (let i = 0; i < 20; i++) {
            const title = spin(flashTitles[i % flashTitles.length]) + " (Güncel #" + (2000 + i) + ")";
            const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
            
            newArticles.push({
                id: Math.random().toString(36).substring(2, 9),
                title: title,
                slug: slug,
                summary: "2026 sezonu için anlık veri takibi ve operasyonel analiz özeti.",
                content: `
                    <div class="flash-report">
                        <h3>${title}</h3>
                        <p>Analiz raporumuzun bu bölümünde, <strong>${site.name}</strong> veritabanından alınan anlık veriler paylaşılmaktadır.</p>
                        <p>2026 yılı stratejilerinde <a href="/deneme-bonusu">deneme bonusu veren siteler</a> üzerinden elde edilen verimlilik %22 oranında artış gösterdi.</p>
                        <p>Detaylı bilgi için <a href="/haberler">haberler</a> sayfamızı takip etmeye devam edin.</p>
                    </div>
                `,
                date: new Date().toISOString(),
                author: "Haber Botu",
                tags: ["Flaş", "2026", "Deneme Bonusu"]
            });
        }

        // Add to the START of the array for freshness
        maskContent.news = [...newArticles, ...currentNews].slice(0, 100);

        await prisma.site.update({
            where: { id: site.id },
            data: {
                maskContent: JSON.stringify(maskContent)
            }
        });
        
        console.log(`   ✅ 20 Flash Articles Added.`);
    }

    console.log("\n🚀 FRESHNESS BOOST COMPLETED. NOW RE-PINGING SEARCH ENGINES.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
