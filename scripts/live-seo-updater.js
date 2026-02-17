const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log("💓 STARTING LIVE SEO HEARTBEAT: Injecting Freshness Signals...");

    const sites = await prisma.site.findMany({
        where: { isActive: true }
    });

    const emojis = ["🔥", "⚡", "🚀", "💎", "✅", "✨", "📢", "🔴"];
    const textRotator = [
        "Son Dakika",
        "Güncel Liste",
        "Canlı Onay",
        "Resmi Liste",
        "Anlık Veri"
    ];

    for (const site of sites) {
        // Randomize signals to create byte-level difference
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        const randomText = textRotator[Math.floor(Math.random() * textRotator.length)];
        const timeNow = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });

        let seoSettings = {};
        try {
            seoSettings = JSON.parse(site.seoSettings || '{}');
        } catch (e) { seoSettings = {} }

        // 1. Update Title dynamically (Google loves fresh titles)
        const baseTitle = site.name || site.domain;
        // Keep the core keyword but rotate the prefix/suffix
        seoSettings.metaTitle = `${randomEmoji} ${baseTitle} - 2026 Deneme Bonusu Veren Siteler [${randomText}]`;

        // 2. Update Content Metadata to signal "Just Updated"
        let maskContent = {};
        try {
            maskContent = JSON.parse(site.maskContent || '{}');
        } catch (e) { maskContent = {} }

        maskContent.heroSubtitle = `Son Güncelleme: ${new Date().toLocaleDateString('tr-TR')} ${timeNow} | Otorite Kodu: #${Math.floor(Math.random() * 99999)}`;

        // 3. Commit to DB
        await prisma.site.update({
            where: { id: site.id },
            data: {
                updatedAt: new Date(), // Forces Last-Modified header update
                seoSettings: JSON.stringify(seoSettings),
                maskContent: JSON.stringify(maskContent)
            }
        });

        console.log(`✅ Heartbeat sent to: ${site.domain} [${seoSettings.metaTitle}]`);
    }

    console.log("🏁 ALL SITES PULSED. Googlebot will detect 'New Content' on next crawl.");
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
