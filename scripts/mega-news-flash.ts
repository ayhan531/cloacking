/**
 * ⚛️ MEGA NEWS FLASH (KAMIKAZE EDITION)
 * Generates 100+ hyper-optimized articles per site.
 * Extreme TF-IDF, siloed links, and authority leaks.
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

const nuclearTitles = [
    "ACİL: {2026|Mart} {Deneme Bonusu Veren Siteler Hakkındaki Her Şey|Yatırımsız Bonus Rehberi} Güncellendi!",
    "{Resmi Rapor}: {Deneme Bonusu Veren Siteler Hakkındaki Her Şey} {2026} {Dinamikleri|Analizi}",
    "{Yeni Liste}: {Deneme Bonusu Veren Siteler Hakkındaki Her Şey} {Kapsamında|Özelinde} {Flaş|Sıcak} Gelişmeler",
    "Google Otorite Onayı: {Deneme Bonusu Veren Siteler Hakkındaki Her Şey} {Sektörel|Teknik} İnceleme"
];

const keywords = [
    "deneme bonusu veren siteler 2026",
    "yatırımsız deneme bonusu",
    "çevrimsiz freebet",
    "bedava casino bonusu",
    "güvenilir bahis siteleri",
    "yeni açılan casino",
    "deneme bonusu 2026"
];

async function main() {
    console.log("☣️ INITIATING MEGA NEWS FLASH - TOTAL WAR ON SERP...");

    const sites = await prisma.site.findMany({ where: { isActive: true } });

    for (const site of sites) {
        console.log(`\n🌌 Flooding ${site.domain} with 100 nuclear articles...`);
        let maskContent = JSON.parse(site.maskContent || "{}");
        // Keep current news but prepending 100 new ones
        const news = maskContent.news || [];
        
        const newBatch = [];
        for (let i = 0; i < 100; i++) {
            const title = spin(nuclearTitles[i % nuclearTitles.length]) + " (" + (4000 + i) + ")";
            const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
            const targetKw = keywords[i % keywords.length];
            
            const content = `
                <article>
                    <h2>${title}</h2>
                    <p><strong>KRİTİK ANALİZ:</strong> ${site.name} tarafından hazırlanan bu 2026 raporu, 
                    doğrudan <strong><a href="/">${targetKw}</a></strong> parametrelerini hedef alır.</p>
                    
                    <p>Sektördeki <strong>deneme bonusu veren siteler 2026</strong> ve <strong>yatırımsız deneme bonusu</strong> 
                    aramalarına yanıt veren en kaliteli içerik budur. Teknolojik altyapımız, 
                    kullanıcıların <strong>çevrimsiz freebet</strong> kazanmasını sağlar.</p>
                    
                    <div style="background:#f1f5f9; padding:20px; border-radius:10px; margin:20px 0;">
                        <h4>🎯 HEDEF ANAHTAR KELİMELER:</h4>
                        <p>${keywords.join(', ')}</p>
                    </div>

                    <p>Referanslar: <a href="https://www.google.com/search?q=${encodeURIComponent(targetKw)}" rel="nofollow">Google Arama Sonuçları</a></p>
                    
                    <div style="display:none;">
                        ${Array(15).fill(targetKw + ' hakkındaki her şey 2026').join(' ')}
                    </div>
                </article>
            `;

            newBatch.push({
                id: Math.random().toString(36).substring(2, 9),
                title: title,
                slug: slug,
                summary: `${targetKw} özelinde hazırlanan nükleer strateji makalesi.`,
                content: content,
                date: new Date().toISOString(),
                author: "SEO War Room",
                tags: ["2026", "Nükleer", targetKw]
            });
        }

        maskContent.news = [...newBatch, ...news].slice(0, 300); // Keep max 300 articles

        await prisma.site.update({
            where: { id: site.id },
            data: {
                maskContent: JSON.stringify(maskContent)
            }
        });
        
        console.log(`   ✅ 100 Nuclear Articles Added for ${site.domain}.`);
    }

    console.log("\n🚀 SERP WARFARE INITIATED. SITES ARE SATURATED.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
