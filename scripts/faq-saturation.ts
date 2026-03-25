/**
 * 🛰️ FAQ SATURATION & SCHEMA INJECTION (EXTREME SEO)
 * Injects 15+ high-authority FAQs with JSON-LD into every site.
 * This aims to dominate Google SERP features (Rich Results).
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const FAQ_POOL = [
    { q: "2026 deneme bonusu veren siteler hangileridir?", a: "Mart 2026 itibarıyla Sahabet, Matadorbet, Onwin ve Betist en güvenilir ve en yüksek deneme bonusu veren siteler arasında zirvededir." },
    { q: "Yatırımsız deneme bonusu veren siteler 2026 listesi güncel mi?", a: "Evet, listemiz her saat başı güncellenerek en yeni yatırımsız deneme bonusu veren siteler hakkındaki her şeyi sunmaktadır." },
    { q: "Çevrimsiz freebet veren siteler güvenilir mi?", a: "Sitemizde listelenen tüm çevrimsiz freebet veren platformlar bağımsız denetimlerden geçmiş ve 2026 lisans doğrulamasına sahiptir." },
    { q: "Yeni açılan casino siteleri deneme bonusu veriyor mu?", a: "Evet, pazara yeni giren casino siteleri genellikle 500 TL ye varan yüksek deneme bonusları ve bedava spinler sunmaktadır." },
    { q: "Deneme bonusu veren siteler hakkında her şey nerede bulunur?", a: "Aradığınız her şey burada! 2026 nın en kapsamlı deneme bonusu rehberi ve tarafsız analizleri sitemizde mevcuttur." },
    { q: "500 TL deneme bonusu veren site var mı?", a: "Özellikle Onwin ve Matadorbet gibi dev platformlar Mart 2026 ya özel 500 TL ve üzeri deneme bonusu seçenekleri sunmaktadır." },
    { q: "Deneme bonusu ile kazanılan para çekilebilir mi?", a: "Yatırımsız deneme bonusu veren sitelerin çoğu, belirli bir bakiye limitine ulaştığınızda kazancınızı şartsız çekmenize izin verir." },
    { q: "Bedava bonus veren siteler çevrim şartı istiyor mu?", a: "Listemizde yer alan 'çevrimsiz' etiketi taşıyan siteler, bonusu nakit gibi kullanmanıza olanak tanır." },
    { q: "Sahabet güncel giriş adresi nedir?", a: "Sahabet ve diğer tüm popüler sitelerin güncel giriş adresleri sitemizdeki butonlar üzerinden 18 Mart itibarıyla güncellenmektedir." },
    { q: "2026 yılında en popüler bahis trendleri neler?", a: "Hızlı çekim, yatırımsız bonus ve Telegram üzerinden sağlanan özel freespinler 2026'nın en büyük trendleridir." }
];

async function main() {
    console.log("🛰️ STARTING FAQ SATURATION...");

    const sites = await prisma.site.findMany({ where: { isActive: true } });

    for (const site of sites) {
        console.log(`📡 Injecting FAQ & Schema for ${site.domain}...`);
        
        let maskContent = JSON.parse(site.maskContent || "{}");
        maskContent.faq = FAQ_POOL; // Universal high-quality FAQs
        maskContent.reviewSchema = { rating: "4.9", count: (Math.floor(Math.random() * 5000) + 1000).toString() };

        // 🧬 ADVANCED SCHEMAS (JSON-LD)
        const schema = [
            {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": FAQ_POOL.map(f => ({
                    "@type": "Question",
                    "name": f.q,
                    "acceptedAnswer": { "@type": "Answer", "text": f.a }
                }))
            },
            {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": `${site.name} Bonus Tracer`,
                "operatingSystem": "ANDROID, IOS",
                "applicationCategory": "FinanceApplication",
                "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": maskContent.reviewSchema.count }
            }
        ];
        maskContent.advancedSchemas = schema;

        await prisma.site.update({
            where: { id: site.id },
            data: {
                maskContent: JSON.stringify(maskContent)
            }
        });
        
        console.log(`   ✅ ${site.domain} saturated with FAQ and App Schema.`);
    }

    console.log("\n🛰️ OPERATION COMPLETE. SERP DOMINATION STARTING.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
