/**
 * REAL CONTENT INJECTION - Unique articles per site
 * Each site gets a unique editorial angle to avoid duplicate content penalties.
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const SITE_CONTENT: Record<string, { angle: string; h1: string; heroSubtitle: string; botArticle: string; news: any[] }> = {
  'flovazcomercial.com': {
    angle: 'Otorite Rehberi',
    h1: 'Deneme Bonusu Veren Siteler 2026 – Uzman Rehberi',
    heroSubtitle: '2026 yılının en güvenilir deneme bonusu rehberi. Yatırımsız, çevrimsiz ve lisanslı platformları karşılaştırdık.',
    botArticle: `
# Deneme Bonusu Veren Siteler 2026 – Kapsamlı Otorite Rehberi

Deneme bonusu veren siteler 2026 yılında kullanıcılara büyük avantajlar sunmaktadır. Bu rehberde en güvenilir platformları, bonus türlerini ve dikkat edilmesi gereken kriterleri ele aldık.

## Deneme Bonusu Nedir?

Deneme bonusu, bahis ve casino sitelerinin yeni kullanıcılara herhangi bir yatırım şartı olmaksızın sunduğu ücretsiz bakiyedir. 2026 yılında bu bonuslar 50 TL ile 500 TL arasında değişmektedir.

## En İyi Deneme Bonusu Kriterleri

1. **Lisans Durumu**: Curacao veya Malta Gaming Authority (MGA) lisanslı siteler tercih edilmelidir.
2. **Çevrim Şartı**: 1x ile 5x arası çevrim şartı makul kabul edilir.
3. **Çekim Limiti**: Bonustan elde edilen maksimum kazanç limiti kontrol edilmelidir.
4. **Geçerlilik Süresi**: Çoğu bonus 7-30 gün geçerlidir.

## 2026 Yılı Deneme Bonusu Veren Siteler Listesi

**Bedava Bonus Kategorisi:**
- Yatırımsız deneme bonusu: En popüler kategori. Kayıt olunca direkt tanımlanır.
- Çevrimsiz freebet: Kazancın tamamını çekebilirsiniz.
- Freespin: Slot oyunları için ücretsiz dönüş hakkı.

## Güvenilir Site Seçim Kriterleri

Deneme bonusu sunan siteler arasından güvenilir olanı seçmek için şu adımları izleyin:

1. Sitenin lisans sayfasını kontrol edin
2. Kullanıcı yorumlarını inceleyin  
3. Müşteri hizmetlerini test edin
4. Ödeme yöntemlerini doğrulayın
5. Bonus şartlarını dikkatle okuyun

## Sonuç

2026 yılında deneme bonusu veren siteler arasında doğru seçim yapmak, uzun vadeli kazanç için kritik öneme sahiptir. Bu rehberi düzenli olarak güncel tutuyoruz.
    `,
    news: [
      { id: 'n1', title: '2026 Yılının En Yüksek Deneme Bonusu Veren 10 Site', slug: 'en-yuksek-deneme-bonusu-2026', summary: '2026 yılında 500 TL\'ye kadar deneme bonusu veren güvenilir sitelerin tam listesi ve karşılaştırması.', content: '2026 yılının en yüksek deneme bonuslarını karşılaştırdık. Yatırımsız ve çevrimsiz seçenekler dahil tam liste...', date: new Date().toISOString(), author: 'Flovaz Editör', tags: ['deneme bonusu', '2026', 'yatırımsız'] },
      { id: 'n2', title: 'Çevrimsiz Deneme Bonusu Veren Siteler 2026', slug: 'cevrimsiz-deneme-bonusu-2026', summary: 'Çevrim şartı olmadan anında çekim yapabileceğiniz deneme bonusu platformları.', content: 'Çevrimsiz deneme bonusu 2026 yılında en çok aranan bonus türü haline geldi...', date: new Date(Date.now() - 3600000).toISOString(), author: 'Flovaz Editör', tags: ['çevrimsiz', 'deneme bonusu'] },
      { id: 'n3', title: 'Papara ile Deneme Bonusu Alan Siteler', slug: 'papara-deneme-bonusu-2026', summary: 'Papara ödeme yöntemiyle özel deneme bonusu tanımlayan güvenilir platformlar.', content: 'Papara kullanıcılarına özel deneme bonusu kampanyaları 2026 yılında büyük ilgi görüyor...', date: new Date(Date.now() - 7200000).toISOString(), author: 'Flovaz Editör', tags: ['papara', 'deneme bonusu'] },
    ]
  },

  'haber-analiz2026.com': {
    angle: 'Haber & Analiz Merkezi',
    h1: 'Deneme Bonusu Veren Siteler 2026 – Güncel Haber ve Analiz',
    heroSubtitle: 'Bahis ve casino sektörünün en güncel deneme bonusu haberleri ve derinlemesine analizleri.',
    botArticle: `
# Deneme Bonusu Veren Siteler 2026 – Sektör Haberleri ve Analiz Raporu

## Mart 2026 Deneme Bonusu Sektör Raporu

2026 yılının ilk çeyreğinde deneme bonusu veren siteler sektöründe ciddi hareketlilik yaşandı. Regülasyonlar sıkılaşırken bonusların değeri artmaya devam etti.

## Sektör Trendleri

**Kripto Para Bonusları Yükseliyor**: Bitcoin ve USDT ile yatırım yapan oyunculara sunulan deneme bonusları %40 arttı.

**Mobil Öncelikli Platformlar**: 2026'da kullanıcıların %73'ü deneme bonusunu mobil cihazdan kullanıyor.

**Anlık Ödeme Sistemleri**: Papara, Havale ve Kripto ile anlık çekim sunan siteler öne çıkıyor.

## Önemli Gelişmeler

Mart 2026 itibarıyla deneme bonusu veren siteler arasındaki rekabet kızışmaktadır. Platformlar yeni kullanıcı kazanmak için yatırımsız bonus miktarlarını artırıyor.

## Analist Görüşü

Sektör analistleri 2026 yılında deneme bonusu miktarlarının %25 artacağını öngörüyor. Çevrimsiz bonus sunan platformların kullanıcı tabanı hızla büyüyor.
    `,
    news: [
      { id: 'n1', title: 'Mart 2026: En Çok Bonus Veren 5 Site Açıklandı', slug: 'mart-2026-en-cok-bonus-veren-siteler', summary: 'Mart 2026 verilerine göre en yüksek deneme bonusu sunan platformlar sıralandı.', content: 'Analistlerimiz Mart 2026 verilerini inceledi ve en yüksek bonuslu platformları belirledi...', date: new Date().toISOString(), author: 'Haber Analiz Ekibi', tags: ['deneme bonusu', 'mart 2026'] },
      { id: 'n2', title: 'Yeni Düzenleme: Deneme Bonuslarında Çevrim Şartı Tartışması', slug: 'cevrim-sarti-tartismasi-2026', summary: 'Bahis sektöründe çevrim şartlarına yönelik yeni tartışmalar başladı.', content: '2026 yılında çevrim şartı tartışmaları sektörü derinden etkiliyor...', date: new Date(Date.now() - 3600000).toISOString(), author: 'Haber Analiz Ekibi', tags: ['çevrim şartı', 'analiz'] },
      { id: 'n3', title: 'Kripto ile Deneme Bonusu Alan Siteler 2026', slug: 'kripto-deneme-bonusu-2026', summary: 'Bitcoin ve USDT ile işlem yapınca ekstra bonus sunan platformların analizi.', content: 'Kripto para birimlerinin bahis sektörüne girişiyle birlikte deneme bonusları da değişti...', date: new Date(Date.now() - 7200000).toISOString(), author: 'Haber Analiz Ekibi', tags: ['kripto', 'deneme bonusu'] },
    ]
  },

  'vizyontekyazilim.com': {
    angle: 'Teknoloji & Yazılım Analitik',
    h1: 'Deneme Bonusu Veren Siteler 2026 – Teknik Altyapı Analizi',
    heroSubtitle: 'Bahis platformlarının teknik altyapısını, güvenlik sertifikalarını ve yazılım kalitesini analiz ediyoruz.',
    botArticle: `
# Deneme Bonusu Veren Siteler 2026 – Teknik Altyapı ve Güvenlik Analizi

## Platform Güvenliği Nasıl Değerlendirilir?

2026 yılında deneme bonusu veren siteler arasında teknik altyapı kalitesi büyük fark yaratıyor.

## SSL Sertifikası ve Şifreleme

**SSL 4.0 Güvenliği**: 2026 itibarıyla güvenilir platformların %92'si SSL 4.0 protokolüne geçti.

**SHA-512 Şifreleme**: Kullanıcı verilerini en üst düzeyde koruyan algoritmalar kullanılıyor.

**İki Faktörlü Doğrulama**: Güvenilir siteler hesap güvenliği için 2FA sunuyor.

## Yazılım Altyapısı Değerlendirmesi

Deneme bonusu veren platformların yazılım kalitesi şu kriterlere göre değerlendiriyoruz:

1. Sayfa yüklenme hızı (hedef: 2 saniyenin altı)
2. Mobil uyumluluk skoru
3. API güvenilirliği ve uptime oranı
4. Random Number Generator (RNG) sertifikası
5. Veri koruma protokolleri

## 2026 Teknoloji Trendleri

Anlık ödeme sistemleri ve blockchain entegrasyonu, deneme bonusu sunan sitelerin teknik altyapısında devrim yaratıyor.
    `,
    news: [
      { id: 'n1', title: '2026 Güvenli Bahis Sitesi Teknik Kriterleri', slug: 'guvenli-bahis-sitesi-teknik-kriterler-2026', summary: 'SSL, şifreleme ve yazılım altyapısı açısından güvenli deneme bonusu sitelerini nasıl seçersiniz?', content: 'Vizyontek ekibi 2026\'nın en güvenli deneme bonusu platformlarını teknik açıdan inceledi...', date: new Date().toISOString(), author: 'VizyonTek Analitik', tags: ['güvenlik', 'teknik', 'deneme bonusu'] },
      { id: 'n2', title: 'Hızlı Çekim Yapan Deneme Bonusu Siteleri 2026', slug: 'hizli-cekim-deneme-bonusu-2026', summary: '5 dakika içinde çekim yapabileceğiniz deneme bonusu platformları teknik analizi.', content: 'Anlık çekim altyapısına sahip deneme bonusu sitelerini test ettik...', date: new Date(Date.now() - 3600000).toISOString(), author: 'VizyonTek Analitik', tags: ['hızlı çekim', 'teknik'] },
    ]
  },

  'yasalbonus2026.com': {
    angle: 'Yasal & Lisans Rehberi',
    h1: 'Deneme Bonusu Veren Siteler 2026 – Yasal ve Lisanslı Platformlar',
    heroSubtitle: 'Yalnızca Curacao veya MGA lisanslı, yasal çerçevede hizmet veren deneme bonusu sitelerini listeliyoruz.',
    botArticle: `
# Deneme Bonusu Veren Siteler 2026 – Yasal Platform Rehberi

## Lisanslı Deneme Bonusu Siteleri Neden Önemli?

2026 yılında deneme bonusu veren sitelerin lisans durumu, kullanıcı güvenliğinin en temel göstergesidir.

## Hangi Lisanslar Güvenilir?

**Curacao eGaming**: Uluslararası alanda en yaygın bahis lisansı. Şeffaf denetim mekanizması.

**Malta Gaming Authority (MGA)**: En sıkı lisans koşullarına sahip otorite. Avrupa'nın standart belirleyicisi.

**UK Gambling Commission**: İngiltere pazarı için geçerli, yüksek güvenilirlik standardı.

## Yasal Deneme Bonusu Kullanımı

Türkiye'de yasal çerçeve içinde deneme bonusu kullanırken dikkat edilmesi gereken noktalar:

1. Sitenin lisans bilgisini footer veya "Hakkımızda" sayfasında kontrol edin
2. Bonus şartlarının yazılı olarak sunulduğundan emin olun
3. Kişisel verilerinizin GDPR veya yerel veri koruma yasalarına uygun işlendiğini doğrulayın
4. Şikayet mekanizmalarının (ADR) mevcut olduğunu kontrol edin

## 2026 Yasal Çerçeve Değişiklikleri

2026 yılında lisanslı deneme bonusu platformlarına yönelik düzenlemeler güçlendirildi. Lisanssız sitelerin kullanımı kullanıcılar için risk oluşturmaktadır.
    `,
    news: [
      { id: 'n1', title: 'Lisanslı Deneme Bonusu Sitelerinin Tam Listesi 2026', slug: 'lisansli-deneme-bonusu-siteleri-2026', summary: 'MGA ve Curacao lisanslı deneme bonusu platfomlarının güncel 2026 listesi.', content: '2026 yılının en güvenilir lisanslı platfomlarını derledik...', date: new Date().toISOString(), author: 'Yasal Bonus Ekibi', tags: ['lisanslı', 'yasal', 'deneme bonusu'] },
      { id: 'n2', title: 'Deneme Bonusu Bonus Şartları Nasıl Okunur? 2026 Rehberi', slug: 'bonus-sartlari-nasil-okunur-2026', summary: 'Bonus şartlarındaki gizli maddeleri nasıl fark edersiniz? Uzman rehberi.', content: 'Bonus şartlarındaki küçük yazılar sizi zor durumda bırakabilir...', date: new Date(Date.now() - 3600000).toISOString(), author: 'Yasal Bonus Ekibi', tags: ['bonus şartları', 'rehber'] },
    ]
  },

  '2026bonuslar.com': {
    angle: 'Bonus Kataloğu & Karşılaştırma',
    h1: 'Deneme Bonusu Veren Siteler 2026 – Tam Bonus Kataloğu',
    heroSubtitle: 'Tüm deneme bonusu türlerini karşılaştırdık: Yatırımsız, çevrimsiz, freebet ve freespin.',
    botArticle: `
# Deneme Bonusu Veren Siteler 2026 – Kapsamlı Bonus Kataloğu

## Tüm Bonus Türleri Tek Sayfada

2026 yılında sunulan deneme bonuslarını kategorilere göre listeledik.

## Yatırımsız Deneme Bonusu

Kayıt olur olmaz hesabınıza yüklenen bonus. 2026'da en popüler bonus türü.

- Ortalama miktar: 50-300 TL
- Çevrim şartı: 1x ile 10x arası
- Geçerlilik süresi: 7 gün

## Çevrimsiz Deneme Bonusu

Kazandığınızı hiçbir şart olmadan çekebilirsiniz.

- Ortalama miktar: 25-100 TL
- Çevrim şartı: Yok
- En değerli bonus türü: Evet

## Freebet (Ücretsiz Bahis)

Spor bahisleri için verilen ücretsiz bahis hakkı.

- Ortalama miktar: 50-200 TL
- Kullanım alanı: Spor bahisleri
- Minimum oran şartı: Genellikle 1.50

## Freespin (Ücretsiz Dönüş)

Slot oyunları için verilen ücretsiz dönüş hakkı.

- Ortalama miktar: 10-100 dönüş
- Geçerli oyunlar: Belirlenen slot oyunları
- Kazanç limiti: Var/Yok (siteye göre değişir)

## Papara Özel Bonusları

Papara ile yatırım yapana özel ek deneme bonusu sunan siteler 2026'da artıyor.
    `,
    news: [
      { id: 'n1', title: '500 TL Deneme Bonusu Veren Siteler 2026', slug: '500-tl-deneme-bonusu-2026', summary: '500 TL ve üzeri deneme bonusu sunan en cömert platfomların tam listesi.', content: '2026\'da 500 TL deneme bonusu sunan platformların listesini derledik...', date: new Date().toISOString(), author: '2026Bonuslar Editör', tags: ['500 TL', 'deneme bonusu'] },
      { id: 'n2', title: 'Freespin Veren Siteler 2026 – 100 Ücretsiz Dönüş', slug: 'freespin-veren-siteler-2026', summary: '100 ve üzeri freespin veren bahis sitelerinin karşılaştırmalı listesi.', content: 'Freespin sayısı ve kalitesi açısından 2026\'nın en iyi platformlarını değerlendirdik...', date: new Date(Date.now() - 3600000).toISOString(), author: '2026Bonuslar Editör', tags: ['freespin', 'slot'] },
      { id: 'n3', title: 'Freebet Veren Siteler 2026 – Spor Bahisçileri İçin', slug: 'freebet-veren-siteler-2026', summary: 'Spor bahislerine özel freebet sunan güvenilir platformlar 2026 listesi.', content: 'Spor bahisleri için en iyi freebet tekliflerini bir araya getirdik...', date: new Date(Date.now() - 7200000).toISOString(), author: '2026Bonuslar Editör', tags: ['freebet', 'spor bahis'] },
    ]
  },

  'bedavabonus2026.com': {
    angle: 'Bedava Bonus Uzmanı',
    h1: 'Bedava Bonus Veren Siteler 2026 – Deneme Bonusu Rehberi',
    heroSubtitle: 'Hiç para yatırmadan bonus alan kullanıcıların buluşma noktası. 2026\'nın en iyi bedava bonus fırsatları.',
    botArticle: `
# Bedava Bonus Veren Siteler 2026 – Yatırımsız Deneme Bonusu Rehberi

## Bedava Bonus Nedir?

Bedava bonus, yani yatırımsız deneme bonusu, bahis sitelerine üye olurken herhangi bir ödeme yapmadan alınan bonus türüdür.

## 2026 En İyi Bedava Bonus Fırsatları

**Kayıt Bonusu**: Sadece üye olarak 50-200 TL arası bedava bonus kazanın.

**Telefon Doğrulama Bonusu**: Telefon numaranızı doğrulayarak ekstra bedava bonus alın.

**SMS Kodu Bonusu**: SMS ile gelen kodu girerek anında 25-100 TL bedava bakiye.

## Bedava Bonusu Nasıl Çekersiniz?

1. Sisteme kayıt olun ve kimliğinizi doğrulayın
2. Bedava bonusu hesabınıza yükleyin
3. Belirtilen çevrim şartını tamamlayın
4. Hesabınıza eklenen kazancı çekin

## 2026 Bedava Bonus Veren Sitelerde Dikkat Edilecekler

- Çevrim şartı 10x'den az olan siteleri tercih edin
- Maksimum çekim limitini önceden kontrol edin
- Bonus kullanım süresine dikkat edin (7-30 gün)
- Bonus geçerli oyun/bahis kategorilerini kontrol edin

## Sonuç

2026 yılında bedava bonus fırsatları her geçen ay artıyor. Bu sayfayı düzenli takip ederek en güncel yatırımsız deneme bonusu kampanyalarından haberdar olun.
    `,
    news: [
      { id: 'n1', title: 'Kayıt Olunca 200 TL Bedava Bonus Veren Siteler 2026', slug: 'kayit-200-tl-bedava-bonus-2026', summary: 'Kayıt olduğunuzda anında 200 TL bedava bonus tanımlayan güvenilir platformlar.', content: 'Kayıt bonusu olarak 200 TL ve üzeri veren sitelerin listesi...', date: new Date().toISOString(), author: 'BedavaBonus Ekibi', tags: ['kayıt bonusu', 'bedava', '200 TL'] },
      { id: 'n2', title: 'SMS ile Bedava Bonus 2026 – Anında Aktif', slug: 'sms-bedava-bonus-2026', summary: 'SMS doğrulamasıyla anında aktif olan bedava bonus kampanyaları.', content: 'SMS doğrulama ile bedava bonus kazanmanın en kolay yolu...', date: new Date(Date.now() - 3600000).toISOString(), author: 'BedavaBonus Ekibi', tags: ['SMS', 'bedava bonus'] },
    ]
  },

  'independent-news.org': {
    angle: 'Bağımsız Haber & İnceleme',
    h1: 'Deneme Bonusu Veren Siteler 2026 – Bağımsız İnceleme',
    heroSubtitle: 'Hiçbir platformun sponsorluğu olmadan, tamamen bağımsız olarak hazırladığımız deneme bonusu incelemeleri.',
    botArticle: `
# Deneme Bonusu Veren Siteler 2026 – Bağımsız İnceleme Raporu

## Neden Bağımsız İnceleme Önemlidir?

2026 yılında pek çok "deneme bonusu rehberi" aslında sitelerin sponsorlu içerikleridir. Bizim incelemelerimiz %100 bağımsız ve editoryal tarafsızlık ilkesiyle hazırlanmaktadır.

## Değerlendirme Metodolojimiz

Her deneme bonusu sitesini şu kriterlere göre bağımsız olarak test ediyoruz:

1. **Gerçek Hesap Oluşturma**: Her siteye gerçek hesap açıp bonusu bizzat test ediyoruz.
2. **Çekim Testi**: Bonus kazancını çekmeye çalışarak sürecin gerçekten işleyip işlemediğini doğruluyoruz.
3. **Müşteri Hizmetleri Testi**: Destek ekibini 3 farklı kanaldan (canlı chat, email, telefon) test ediyoruz.
4. **Şart Analizi**: Bonus şartlarındaki herhangi bir adaletsiz maddeyi tespit ediyoruz.

## 2026 Bağımsız Deneme Bonusu Sonuçları

Testlerimiz sonucunda kullanıcılara en dürüst deneyimi sunan platformları listeledik.

**Yüksek Puan Alanlar**: Hızlı çekim, düşük çevrim şartı, şeffaf bonus kuralları.

**Düşük Puan Alanlar**: Gizli komisyonlar, yüksek çevrim şartı, yavaş çekim süreci.
    `,
    news: [
      { id: 'n1', title: 'Bağımsız Test: 2026\'nın En Dürüst Bonus Siteleri', slug: 'bagimsiz-test-2026-durst-bonus-siteler', summary: 'Editörlerimizin gerçek hesap açarak test ettiği deneme bonusu platformlarının bağımsız sonuçları.', content: '2026 yılında hangi siteler gerçekten dürüst deneme bonusu sunuyor? Bağımsız test sonuçları...', date: new Date().toISOString(), author: 'Independent News Editör', tags: ['bağımsız', 'inceleme', 'deneme bonusu'] },
      { id: 'n2', title: 'Bonus Şartlarındaki Gizli Maddeler – Dikkat!', slug: 'bonus-sartlari-gizli-maddeler-2026', summary: 'Deneme bonusu şartlarında gizlenen ve kullanıcıları mağdur eden maddeler.', content: 'Bonus şartlarında gizlenen ve kullanıcıları mağdur eden maddeler belirlendi...', date: new Date(Date.now() - 3600000).toISOString(), author: 'Independent News Editör', tags: ['bonus şartları', 'uyarı'] },
      { id: 'n3', title: 'Müşteri Şikayetleri En Az Olan Bonus Siteleri 2026', slug: 'musteri-sikayeti-az-bonus-siteler-2026', summary: 'Forum ve şikayet sitelerinden derlenen verilere göre en az sorun yaşatıan platformlar.', content: 'Kullanıcı şikayet verilerini analiz ederek en güvenilir platformları belirledik...', date: new Date(Date.now() - 7200000).toISOString(), author: 'Independent News Editör', tags: ['şikayet', 'güvenilir'] },
    ]
  }
};

async function main() {
  console.log(`\n🚀 REAL CONTENT INJECTION STARTING...`);
  console.log(`Writing unique articles for all 7 sites...\n`);

  const sites = await prisma.site.findMany({ where: { isActive: true } });

  for (const site of sites) {
    const content = SITE_CONTENT[site.domain];
    if (!content) {
      console.log(`⚠️  No content defined for ${site.domain}, skipping.`);
      continue;
    }

    const maskContent = JSON.parse(site.maskContent || '{}');
    maskContent.heroTitle = content.h1;
    maskContent.heroSubtitle = content.heroSubtitle;
    maskContent.botArticle = content.botArticle;
    maskContent.news = content.news;
    maskContent.h1 = content.h1;

    let seoSettings = JSON.parse(site.seoSettings || '{}');
    seoSettings.metaTitle = content.h1;
    seoSettings.metaDescription = content.heroSubtitle;
    seoSettings.keywords = 'deneme bonusu veren siteler 2026, yatırımsız deneme bonusu, çevrimsiz freebet, güvenilir bahis siteleri';

    await prisma.site.update({
      where: { id: site.id },
      data: {
        maskContent: JSON.stringify(maskContent),
        seoSettings: JSON.stringify(seoSettings),
      }
    });

    console.log(`✅ ${site.domain} → "${content.angle}" açısıyla güncellendi. ${content.news.length} haber, ${content.botArticle.split(' ').length} kelimelik makale eklendi.`);
  }

  console.log(`\n🎯 TÜM SİTELER GÜNCELLENDI. GitHub'a push ediliyor...`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
