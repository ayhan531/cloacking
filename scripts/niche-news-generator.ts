/**
 * 📰 NICHE-FOCUSED NEWS GENERATOR
 * Generates 50+ unique, highly relevant articles for each site based on its niche.
 */
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
        regex.lastIndex = 0;
    }
    return newText;
}

const commonParagraphs = [
    "<p>{2026 yılı|Mart ayı} itibarıyla sektördeki {regülasyonlar|yenilikler} {hız kazandı|ciddileşti}. Kullanıcıların {güvenilir|lisanslı} platformları {seçmesi|tercih etmesi} artık bir {zorunluluk|ihtiyaç} haline geldi.</p>",
    "<p>{Analizlerimize göre|Elde edilen verilere göre}, {yüksek oranlı|çevrimsiz} bonusların {popülaritesi|etkisi} %40 oranında {arttı|yükseldi}. Bu da {yeni açılan|sektöre yeni giren} sitelerin {agresif|cesur} stratejiler izlemesine neden oluyor.</p>",
];

const nicheVocabs: Record<string, any> = {
    'flovazcomercial.com': {
        keywords: ["yatırımsız bonus", "karşılıksız ödül", "deneme fırsatı", "sıfır yatırım"],
        templates: [
            "{Flovaz|Otorite} onaylı {yatırımsız|bedava} bonus ekonomisi {nasıl işliyor|analizi}.",
            "Tüketicilerin {yatırımsız|para yatırmadan} alabileceği {en yüksek|dev} bonus listesi."
        ]
    },
    'haber-analiz2026.com': {
        keywords: ["sektörel analiz", "regülasyon", "lisans haberi", "pazar durumu"],
        templates: [
            "{Mart 2026|Güncel} {lisans|bahis} yasası ve {sektörel|pazar} etkileri.",
            "Güvenilir {analiz|haber} kaynaklarının {yeni|son} raporu yayınlandı."
        ]
    },
    'vizyontekyazilim.com': {
        keywords: ["RNG testi", "casino yazılımı", "altyapı güvenliği", "slot mekaniği"],
        templates: [
            "Casino {yazılımlarında|altyapılarında} {yeni|2026} {güvenlik|şeffaflık} standartları.",
            "{Pragmatic|RNG} altyapılı {slot|casino} oyunlarının {kazanç|RTP} teorisi."
        ]
    },
    'yasalbonus2026.com': {
        keywords: ["yasal mevzuat", "milli piyango", "akredite siteler", "vergi uyumu"],
        templates: [
            "{Yasal|Lisanslı} ekosistemde {bonus|teşvik} {alma|kazanma} rehberi.",
            "Türkiye {mevzuatına|yasalarına} uygun {en güvenilir|güncel} platformlar."
        ]
    },
    '2026bonuslar.com': {
        keywords: ["yeni girişler", "üyelik paketi", "start-up casino", "promosyon kodu"],
        templates: [
            "Bu ay {yeni|ilk kez} açılan {5 dev|popüler} {bahis sitesi|casino platformu}.",
            "Devasa {ilk üyelik|karşılama} paketleri ile {anında|hemen} kazanın."
        ]
    },
    'bedavabonus2026.com': {
        keywords: ["çevrimsiz freebet", "anında nakit", "şartsız şurtsuz", "bedava spin"],
        templates: [
            "{Çevrimsiz|Şartsız} {freebet|bonus} verenlerin {gizli|özel} listesi.",
            "{Yatırım|Para} yatırmadan {nakit|para} çekebileceğiniz {tek|en iyi} sistem."
        ]
    },
    'independent-news.org': {
        keywords: ["kara liste", "ifşa raporu", "bağımsız denetim", "scam uyarısı"],
        templates: [
            "{Sahte|Lisanssız} sitelere karşı {bağımsız|sert} {izleme|denetim} raporu.",
            "Kullanıcıları {mağdur eden|dolandıran} {platformların|sitelerin} tam {listesi|ifşası}."
        ]
    }
};

async function main() {
    console.log("🔥 GENERATING NICHE-SPECIALIZED NEWS (ULTRA POWER) 🔥\n");

    const sites = await prisma.site.findMany({ where: { isActive: true } });

    for (const site of sites) {
        const vocab = nicheVocabs[site.domain];
        if (!vocab) continue;

        console.log(`\n⚙️ Generating 50 articles for ${site.domain} [${vocab.keywords[0]}]...`);
        
        const maskContent = JSON.parse(site.maskContent || "{}");
        const news = [];

        for (let i = 0; i < 50; i++) {
            const template = vocab.templates[i % vocab.templates.length];
            const title = spin(template) + " - #" + (1000 + i);
            const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
            const keyword = vocab.keywords[i % vocab.keywords.length];
            
            const content = `
                <article class="niche-article">
                    <h2>${title}</h2>
                    <p><strong>${keyword.toUpperCase()} ANALİZİ:</strong> ${spin(commonParagraphs[i % 2])}</p>
                    <p>Bu araştırma dosyası, ${site.domain} tarafından 2026 yılı için özel olarak hazırlanmıştır. 
                    Özellikle <strong>${keyword}</strong> konusunda derinlemesine bulgular içermektedir.</p>
                    <p>${spin(commonParagraphs[(i + 1) % 2])}</p>
                    <div class="citation">Kaynak: ${site.name} Bilgi Bankası (${new Date().getFullYear()})</div>
                </article>
            `;

            news.push({
                id: Math.random().toString(36).substring(2, 9),
                title: title,
                slug: slug,
                summary: `${keyword} üzerine odaklanan ${site.domain} özel teknik raporu.`,
                content: content,
                date: new Date(Date.now() - i * 3600000).toISOString(),
                author: "Stratejik Analiz Botu",
                tags: [keyword, "2026", "Analiz", site.name]
            });
        }

        maskContent.news = news;

        await prisma.site.update({
            where: { id: site.id },
            data: {
                maskContent: JSON.stringify(maskContent)
            }
        });
        
        console.log(`   ✅ 50 Niche Articles Stored.`);
    }

    console.log("\n🚀 DATABASE POISONED WITH HIGH-QUALITY NICHE CONTENT.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
