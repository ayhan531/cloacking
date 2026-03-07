import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const LONG_TAIL_KEYWORDS = [
    "deneme bonusu veren siteler forum",
    "deneme bonusu veren siteler ekşi",
    "yatırımsız deneme bonusu veren siteler 2026",
    "çevrimsiz deneme bonusu veren siteler",
    "yeni açılan bahis siteleri deneme bonusu",
    "en yüksek deneme bonusu veren siteler",
    "deneme bonusu veren siteler twitter",
    "deneme bonusu veren siteler telegram",
    "deneme bonusu veren siteler şikayetvar",
    "yatırım şartı olmayan deneme bonusu 2026",
    "payfix ile deneme bonusu veren siteler",
    "papara deneme bonusu veren siteler",
    "mobil ödeme bahis bonusu",
    "kimlik istemeyen deneme bonusu veren siteler",
    "hoşgeldin bonusu veren siteler 2026",
    "freespin veren siteler yatırımsız",
    "kayıp bonusu yüksek olan siteler",
    "en iyi casino siteleri 2026",
    "lisanslı bahis siteleri deneme bonusu",
    "çevrim şartsız spor deneme bonusu",
    "100 tl deneme bonusu veren siteler",
    "200 tl deneme bonusu veren siteler",
    "500 tl deneme bonusu veren siteler"
];

async function main() {
    console.log('\n╔══════════════════════════════════════════════════════════');
    console.log('║  💥 LONG-TAIL KEYWORD INJECTOR v1.0');
    console.log('║  Sitelerin her birine 100+ uzun kuyruklu kelime basılıyor...');
    console.log('╚══════════════════════════════════════════════════════════\n');

    const sites = await prisma.site.findMany({ where: { isActive: true } });

    for (const site of sites) {
        let seoSettings: any;
        try {
            seoSettings = typeof site.seoSettings === 'string' ? JSON.parse(site.seoSettings) : site.seoSettings;
        } catch (e) {
            seoSettings = {};
        }

        // Footer Matrix - Keywords Cloud
        const keywordsCloud = LONG_TAIL_KEYWORDS.map(kw =>
            `<a href="/etiketler/${kw.replace(/ /g, '-')}" style="color:#64748b; font-size:11px; text-decoration:none; margin-right:8px;">#${kw}</a>`
        ).join(' ');

        const newFooterMatrix = `
            <div style="margin-top:40px; padding:20px; border-top:1px solid #1e293b;">
                <h5 style="color:#10b981; font-size:12px; margin-bottom:10px;">📉 POPÜLER ANALİZLER & ETİKETLER:</h5>
                <div style="line-height:2;">${keywordsCloud}</div>
            </div>
        `;

        seoSettings.footerMatrix = (seoSettings.footerMatrix || '') + newFooterMatrix;

        await prisma.site.update({
            where: { id: site.id },
            data: { seoSettings: JSON.stringify(seoSettings) }
        });

        console.log(`   ✅ [${site.domain}] -> Long-tail kelime bulutu eklendi.`);
    }

    console.log('\n🏁 TÜM KELİMELER ENJEKTE EDİLDİ.');
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
