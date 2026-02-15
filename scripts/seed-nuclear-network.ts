import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log("🔥 NUCLEAR CONTENT UPDATE: Injecting massive news volume for SEO dominance...");

    const domains = [
        'flovazcomercial.com',
        'haber-analiz2026.com',
        'vizyontekyazilim.com',
        'yasalbonus2026.com',
        'bonusverensiteler2026.com',
        '2026bonuslar.com',
        'bedavabonus2026.com'
    ];

    const monthNames = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
    const currentMonth = monthNames[new Date().getMonth()];
    const currentYear = new Date().getFullYear();

    const extendedNews = [
        { id: '1', title: `2026 Deneme Bonusu Veren Siteler: Tam Liste`, slug: 'deneme-bonusu-veren-siteler-2026', summary: 'Bu ayın en çok kazandıran platformlarını karşılaştırdık.', content: '2026 yılında deneme bonusu veren siteler arasında kıyasıya bir rekabet var. Özellikle 500 TL deneme bonusu veren siteler öne çıkıyor.', date: new Date().toISOString() },
        { id: '2', title: `Yatırımsız Bonus Analizi: Kimler Veriyor?`, slug: 'yatirim-sartsiz-bonus-2026', summary: 'Para yatırmadan kazanmanın en güvenli yolları.', content: 'Yatırım şartsız bonuslar 2026 yılında artık bir standart haline geldi. İşte güvenilir platformlar.', date: new Date().toISOString() },
        { id: '3', title: `En Güvenilir Bahis Altyapıları 2026`, slug: 'en-guvenilir-altyapilar', summary: 'Kapanmayan ve ödeme yapan siteleri nasıl anlarsınız?', content: 'Lisanslı altyapıların önemi 2026 yılında daha da arttı.', date: new Date().toISOString() },
        { id: '4', title: `500 TL Deneme Bonusu Veren Siteler 2026`, slug: '500-tl-deneme-bonusu-2026', summary: 'Yüksek limitli deneme bonusu veren siteler listelendi.', content: '500 TL deneme bonusu veren siteler 2026 listemizle yatırımsız kazanç fırsatlarını yakalayın.', date: new Date().toISOString() },
        { id: '5', title: `Çevrimsiz Deneme Bonusu 2026 Fırsatları`, slug: 'cevrimsiz-deneme-bonusu-2026', summary: 'Kazanılan tutarı anında çekebileceğiniz siteler.', content: '2026 çevrimsiz bonus veren siteler ile kasanızı hızlıca katlayın.', date: new Date().toISOString() },
        { id: '6', title: `Haftalık Bonus Raporu: Şubat 2026`, slug: 'haftalik-bonus-raporu-subat', summary: 'Bu haftanın en popüler promosyonları.', content: 'Şubat ayının ikinci haftasında deneme bonusu veren siteler arasında en çok kazandıranlar şunlar...', date: new Date().toISOString() },
        { id: '7', title: `Mobil Ödeme İle Para Yatırılan Bahis Siteleri`, slug: 'mobil-odeme-bahis-2026', summary: '2026 yılında en hızlı finansal metotlar.', content: 'Mobil ödeme alan bahis siteleri 2026 listesi güncellendi.', date: new Date().toISOString() },
        { id: '8', title: `Bedava Bonus 2026: Yeni Açılan Siteler`, slug: 'yeni-acilan-bedava-bonus-siteleri', summary: 'Piyasaya yeni giren ve yüksek bonus dağıtan platformlar.', content: '2026 yılında sektöre hızlı giriş yapan deneme bonusu veren siteler rehberimizde.', date: new Date().toISOString() }
    ];

    for (const domain of domains) {
        console.log(`Boosting: ${domain}...`);

        let site = await prisma.site.findUnique({ where: { domain } });

        const siteName = domain.split('.')[0].toUpperCase();

        let seoSettings = {
            metaTitle: `${currentMonth} ${currentYear} Deneme Bonusu Veren Siteler - ${siteName}`,
            metaDescription: `${domain} ile 2026'nın en güncel deneme bonusu veren sitelerini ve yatırımsız karşılıksız bonusları keşfedin.`,
            keywords: "deneme bonusu, bonus veren siteler 2026, bedava bonus, yatırımsız bonus"
        };

        if (domain === 'bedavabonus2026.com') {
            seoSettings.metaTitle = `BEDAVA BONUS 2026 - Deneme Bonusu Veren Siteler (KESİN LİSTE)`;
        }

        const maskContent = {
            siteName: siteName,
            heroTitle: `${currentMonth} ${currentYear} Bonus Otorite Merkezi`,
            heroSubtitle: "Profesyonel Analiz ve Güncel Veri Paylaşım Platformu",
            news: extendedNews
        };

        if (site) {
            await prisma.site.update({
                where: { id: site.id },
                data: {
                    isActive: true,
                    maskContent: JSON.stringify(maskContent),
                    seoSettings: JSON.stringify(seoSettings),
                    updatedAt: new Date()
                }
            });
        }
    }

    console.log("✅ NUCLEAR CONTENT DEPLOYED: All sites are now content-rich!");
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
