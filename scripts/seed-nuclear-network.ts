import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log("🔥 NUCLEAR CONTENT UPDATE v3.0: 1st Page Dominance Injection starting...");

    const domains = [
        'independent-news.org',
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

    // 15 adet, her biri stratejik anahtar kelimelerle dolu haber paketi
    const extendedNews = [
        { id: '1', title: `2026 Deneme Bonusu Veren Siteler: Tam Liste`, slug: 'deneme-bonusu-veren-siteler-2026', summary: 'Bu ayın en çok kazandıran platformlarını karşılaştırdık.', content: '2026 yılında deneme bonusu veren siteler arasında kıyasıya bir rekabet var. Özellikle 500 TL deneme bonusu veren siteler öne çıkıyor.', date: new Date().toISOString() },
        { id: '2', title: `Yatırımsız Bonus Analizi: Kimler Veriyor?`, slug: 'yatirim-sartsiz-bonus-2026', summary: 'Para yatırmadan kazanmanın en güvenli yolları.', content: 'Yatırım şartsız bonuslar 2026 yılında artık bir standart haline geldi. İşte güvenilir platformlar.', date: new Date().toISOString() },
        { id: '3', title: `En Güvenilir Bahis Altyapıları 2026`, slug: 'en-guvenilir-altyapilar', summary: 'Kapanmayan ve ödeme yapan siteleri nasıl anlarsınız?', content: 'Lisanslı altyapıların önemi 2026 yılında daha da arttı.', date: new Date().toISOString() },
        { id: '4', title: `500 TL Deneme Bonusu Veren Siteler 2026`, slug: '500-tl-deneme-bonusu-2026', summary: 'Yüksek limitli deneme bonusu veren siteler listelendi.', content: '500 TL deneme bonusu veren siteler 2026 listemizle yatırımsız kazanç fırsatlarını yakalayın.', date: new Date().toISOString() },
        { id: '5', title: `Payfix ve Mefete Kabul Eden Bahis Siteleri 2026`, slug: 'payfix-mefete-bahis-2026', summary: 'Hızlı ve güvenilir dijital cüzdan yöntemleri.', content: 'Dijital cüzdanlar 2026 yılında bahis ödemelerinin %80ini oluşturuyor.', date: new Date().toISOString() },
        { id: '6', title: `Çevrimsiz Freebet Veren Siteler Raporu`, slug: 'cevrimsiz-freebet-2026', summary: 'Kazancın doğrudan çekilebildiği şartlar.', content: '2026 yılında freebet dünyasında devrim yaratan yeni kurallar açıklandı.', date: new Date().toISOString() },
        { id: '7', title: `Hoşgeldin Bonusu %300 Olan Firmalar Listesi`, slug: 'hosgeldin-bonusu-300-liste', summary: 'İlk üyelikte kasanızı anında 3e katlayın.', content: 'Yüksek oranlı hoşgeldin paketleri için 2026 rehberimiz yayında.', date: new Date().toISOString() },
        { id: '8', title: `Slot Oyunlarında En Çok Freespin Veren Siteler`, slug: 'freespin-veren-siteler-2026', summary: 'Casino severler için yatırımsız dönüş fırsatları.', content: '2026 yılında Gates of Olympus ve Sugar Rush gibi oyunlarda geçerli freespinler.', date: new Date().toISOString() },
        { id: '9', title: `Sektörel Güvenlik Verisi: SSL ve Firewall Önemi`, slug: 'bahis-sitesi-guvenlik-protokolleri', summary: 'Kullanıcı verilerinin korunması hakkında teknik rapor.', content: 'Veri güvenliği 2026 bonus veren siteler arasında en önemli seçicidir.', date: new Date().toISOString() },
        { id: '10', title: `Mobil Ödeme İle Bahis: Hangi Operatörler Aktif?`, slug: 'mobil-odeme-aktif-operatorler', summary: 'Turkcell, Vodafone ve Telekom güncel durum.', content: '2026 mobil ödeme ile deneme bonusu alma yolları.', date: new Date().toISOString() },
        { id: '11', title: `Yeni Açılan Bahis Siteleri 2026 Listesi`, slug: 'yeni-acilan-siteler-2026', summary: 'Yüksek bütçeli reklamlarla piyasaya girenler.', content: 'Yeni açılan platformlar genellikle daha yüksek deneme bonusu vermektedir.', date: new Date().toISOString() },
        { id: '12', title: `VIP Oyuncular İçin Özel Sadakat Bonusları`, slug: 'vip-sadakat-bonuslari-2026', summary: 'Yüksek hacimli yatırımcılar için avantajlar.', content: 'Kaybetme lüksünü kazanca dönüştüren nakit iade sistemleri.', date: new Date().toISOString() },
        { id: '13', title: `Canlı Destek Kalitesi En Yüksek 10 Site`, slug: 'en-iyi-canli-destek-siteleri', summary: '7/24 kesintisiz hizmet veren platformlar.', content: 'Sorunsuz iletişim, bahis sitesi seçiminde kilit noktadır.', date: new Date().toISOString() },
        { id: '14', title: `Yurt Dışı Lisanslı Bahis Siteleri Sorgulama`, slug: 'lisans-sorgulama-2026', summary: 'MGA ve Curacao lisanslı sitelerin farkları.', content: '2026 yılında geçerli lisans anahtarlarını kontrol etme yöntemleri.', date: new Date().toISOString() },
        { id: '15', title: `Haftalık Bonus Gündemi Şubat 2026`, slug: 'subat-2026-bonus-gundemi', summary: 'Bu haftanın en çok ilgi gören promosyonları.', content: 'Dinamik değişen bonus oranları hakkında anlık veri akışı.', date: new Date().toISOString() }
    ];

    for (const domain of domains) {
        console.log(`🚀 Atomic Seeding: ${domain}...`);

        let site = await prisma.site.findUnique({ where: { domain } });
        const siteName = domain.split('.')[0].toUpperCase();

        // Her domain için ultra-agresif SEO başlıkları
        let seoSettings = {
            metaTitle: `${currentMonth} ${currentYear} Deneme Bonusu Veren Siteler - ${siteName} #1`,
            metaDescription: `${domain} - 2026 yılının en güvenilir, yatırımsız deneme bonusu ve bedava bonus veren siteler listesi. Güncel giriş adresleri ve profesyonel analiz raporu.`,
            keywords: "deneme bonusu veren siteler 2026, bonus veren siteler 2026, bedava bonus, yatırımsız deneme bonusu, 500 tl deneme bonusu, casino bonusları, bahis siteleri"
        };

        const maskContent = {
            siteName: siteName,
            heroTitle: `${siteName} | 2026 Otorite Onaylı Bonus Merkezi`,
            heroSubtitle: "Yapay Zeka Destekli Bahis ve Bonus Analiz Platformu v5.0 Platinum",
            news: extendedNews,
            colorScheme: {
                primary: '#10b981',
                secondary: '#064e3b',
                accent: '#34d399'
            }
        };

        if (site) {
            await prisma.site.update({
                where: { id: site.id },
                data: {
                    isActive: true,
                    maskType: 'blog',
                    maskContent: JSON.stringify(maskContent),
                    seoSettings: JSON.stringify(seoSettings),
                    updatedAt: new Date()
                }
            });
        } else {
            // Eğer site yoksa (self-healing yedeği olarak)
            await prisma.site.create({
                data: {
                    domain: domain,
                    name: siteName,
                    isActive: true,
                    maskType: 'blog',
                    maskContent: JSON.stringify(maskContent),
                    seoSettings: JSON.stringify(seoSettings),
                    bettingContent: JSON.stringify({}),
                    cloakingRules: JSON.stringify({
                        showMaskTo: { bots: true, desktop: true },
                        showBettingTo: { mobile: true, includedCountries: ["TR", "CY"] }
                    })
                }
            });
        }
    }

    console.log("💎 1. SAYFA DOMİNASYONU HAZIR: Tüm siteler bilgi deposuna dönüştürüldü!");
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
