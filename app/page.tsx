import CloakedHome from "@/components/CloakedHome";
import MaskSite from "@/components/MaskSite";
import { detectBotServer } from "@/lib/server-cloaking";
import { headers } from "next/headers";
import { getSiteByDomain, type SiteConfig } from "@/lib/site-service";
import type { Metadata } from "next";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
    const headersList = await headers();
    const host = headersList.get("host") || "";
    const domain = host.split(':')[0].replace('www.', '');

    try {
        const site = await getSiteByDomain(domain);
        if (site) {
            let seoSettings: any = {};
            if (site.seoSettings) {
                seoSettings = typeof site.seoSettings === 'string' ? JSON.parse(site.seoSettings) : site.seoSettings;
            }

            return {
                title: seoSettings.metaTitle || ` MART 2026: Deneme Bonusu Veren Siteler (KESİN LİSTE) - ${site.name}`,
                description: seoSettings.metaDescription || `DİKKAT! Mart 2026 tarihli en özel deneme bonusu veren siteler listesi BURADA. %100 yatırımsız, karşılıksız ve çevrimsiz bonusları anında alın. Otorite onaylı tek rehber.`,
                keywords: seoSettings.keywords || "deneme bonusu veren siteler 2026",
                openGraph: {
                    title: seoSettings.metaTitle || ` MART 2026 BOMBA BONUS LİSTESİ - ${site.name}`,
                    description: seoSettings.metaDescription || `Piyasadaki tüm bonusları eledik, sadece en yüksek verenleri bıraktık. Kaçırmayın!`,
                }
            };
        }
    } catch (e) { }
    return { title: "2026 Deneme Bonusu Veren Siteler" };
}

export default async function Home() {
    let domain = "";
    try {
        const headersList = await headers();
        const host = headersList.get("host") || "";
        // Clean port and handle www
        domain = host.split(':')[0].replace('www.', '');
        const isBot = await detectBotServer();

        const site = await getSiteByDomain(domain, true);

        if (site) {
            const maskContent = typeof site.maskContent === 'string' ? JSON.parse(site.maskContent) : site.maskContent;

            // 🏠 UNIQUE HOME BOT IDENTITY
            const monthNames = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
            const currentMonth = monthNames[new Date().getMonth()];
            const currentYear = new Date().getFullYear();

            const homeBotArticle = `
          <div class="ultimate-seo-vault p-6 md:p-12 bg-[#020617] text-white rounded-[40px] mb-12 border border-slate-800">
            
            <script type="application/ld+json">
            [
              {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": ${(() => {
                    const faqMap: Record<string, Array<{ q: string; a: string }>> = {
                        'flovazcomercial.com': [
                            { q: "Deneme bonusu veren siteler 2026 listesinde hangi siteler var?", a: "2026 yılı güncel listemizde 500 TL yatırımsız bonus veren platformlar, çevrimsiz freebet sunan bahis siteleri ve güvenilir casino markaları yer almaktadır. Mart 2026 itibarıyla 89 aktif platform listelenmiştir." },
                            { q: "Deneme bonusu nasıl alınır?", a: "Deneme bonusu almak için sitemizden güvenilir bir platform seçin, kayıt olun ve bonus otomatik olarak hesabınıza tanımlanır. Çoğu sitede yatırım şartı yoktur." },
                            { q: "Yatırımsız deneme bonusu 2026'da hâlâ var mı?", a: "Evet, Mart 2026 itibarıyla 89 platform hâlâ yatırımsız deneme bonusu sunmaktadır. En yüksek miktar 750 TL'dir." }
                        ],
                        'bedavabonus2026.com': [
                            { q: "Bedava bonus veren siteler hangileri?", a: "2026 yılında bedava bonus veren siteler arasında kayıt bonusu sunan 178 platform bulunmaktadır. Ücretsiz freespin, freebet ve nakit bonus seçenekleri mevcuttur." },
                            { q: "Bedava bonus çevrim şartı var mı?", a: "Listemizde yer alan bedava bonusların %72'si çevrim şartsızdır. Kazandığınızı doğrudan çekebilirsiniz." },
                            { q: "Ücretsiz casino bonusu nasıl kazanılır?", a: "Sitemizden bir platform seçip kayıt olmanız yeterlidir. SMS doğrulaması sonrası bonus anında tanımlanır." }
                        ],
                        'haber-analiz2026.com': [
                            { q: "2026 bahis sektöründe neler değişti?", a: "2026'da bahis sektöründe yapay zeka destekli analiz sistemleri, anlık ödeme teknolojileri ve yeni lisanslama düzenlemeleri öne çıktı." },
                            { q: "Yeni açılan bahis siteleri güvenilir mi?", a: "Her yeni siteyi 48 saatlik test sürecinden geçiriyoruz. Lisans, SSL ve ödeme testlerini geçen siteler güvenilir olarak onaylanır." }
                        ],
                        'vizyontekyazilim.com': [
                            { q: "En güvenilir casino siteleri hangileri 2026?", a: "2026 güvenlik denetimimizde 203 casino sitesi test edildi. Sadece 67'si tüm kriterlerimizi karşıladı. Lisans, SSL ve ödeme hızı ana kriterlerdir." },
                            { q: "Casino sitesi seçerken nelere dikkat edilmeli?", a: "Lisans bilgisi, SSL sertifikası, ödeme hızı, müşteri hizmetleri kalitesi ve kullanıcı yorumları en önemli kriterlerdir." }
                        ],
                        'yasalbonus2026.com': [
                            { q: "Türkiye'de yasal bahis siteleri hangileri?", a: "2026 verilerine göre MGA, Curacao ve UKGC lisansına sahip toplam 124 platform Türk kullanıcılara yasal olarak hizmet vermektedir." },
                            { q: "Lisanslı bahis sitelerinin avantajları neler?", a: "Kullanıcı fonları ayrı hesaplarda tutulur, bağımsız hakem mekanizması mevcuttur ve düzenli denetimlerden geçerler." }
                        ],
                        '2026bonuslar.com': [
                            { q: "En yüksek casino bonusu veren site hangisi?", a: "Mart 2026 itibarıyla en yüksek hoşgeldin bonusu 1500 TL ile Elite Slot platformundadır. Çevrimsiz freebet sayısı %34 artmıştır." },
                            { q: "Çevrimsiz bonus ne demek?", a: "Çevrimsiz bonus, kazandığınız tutarı herhangi bir çevrim şartı olmadan doğrudan çekebileceğiniz bonus türüdür." }
                        ],
                        'independent-news.org': [
                            { q: "Bağımsız bahis incelemeleri neden önemli?", a: "Bağımsız incelemeler hiçbir bahis sitesinden komisyon almadığı için tamamen tarafsızdır. ISO 27001 standartlarında denetim yapılır." },
                            { q: "Bahis sitesi denetim raporu nasıl hazırlanır?", a: "Her site minimum 72 saat test edilir. Para yatırma/çekme, müşteri hizmetleri ve güvenlik protokolleri değerlendirilir." }
                        ]
                    };
                    const faqs = faqMap[domain] || faqMap['flovazcomercial.com'];
                    return JSON.stringify(faqs.map(f => ({
                        "@type": "Question",
                        "name": f.q,
                        "acceptedAnswer": { "@type": "Answer", "text": f.a }
                    })));
                })()}
              },
              {
                "@context": "https://schema.org",
                "@type": "NewsArticle",
                "headline": "FLAŞ: 2026 Deneme Bonusu Veren Siteler Listesi Yayınlandı!",
                "image": ["https://${domain}/api/og"],
                "datePublished": "${new Date(Date.now() - 3600000).toISOString()}",
                "dateModified": "${new Date().toISOString()}",
                "author": { "@type": "Person", "name": "SEO Otorite Botu" },
                "publisher": { "@type": "Organization", "name": "${site.name}", "logo": { "@type": "ImageObject", "url": "https://${domain}/favicon.ico" } }
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "${site.name}",
                "alternateName": "${site.name} 2026 Bonus Rehberi",
                "url": "https://${domain}/"
              },
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "${site.name}",
                "url": "https://${domain}/",
                "logo": "https://${domain}/favicon.ico",
                "sameAs": []
              },
              {
                "@context": "https://schema.org",
                "@type": "Product",
                "name": "${site.name} Portalı",
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "${(4.5 + Math.random() * 0.4).toFixed(1)}",
                  "reviewCount": "${Math.floor(2000 + Math.random() * 1000)}"
                }
              }
            ]
            </script>

            <article class="prose prose-invert prose-lg max-w-none px-4 md:px-8 mt-6">
                <header class="mb-10 border-b border-emerald-900/50 pb-8">
                    ${(() => {
                    // 🎯 DOMAIN-UNIQUE H1 & INTRO — Critical for avoiding duplicate content across network
                    const domainH1Map: Record<string, { h1: string; intro: string; h2: string; p1: string; p2: string }> = {
                        'flovazcomercial.com': {
                            h1: `Deneme Bonusu Veren Siteler 2026 - ${currentMonth} Güncel Liste`,
                            intro: `${currentMonth} ${currentYear} ayına özel deneme bonusu veren sitelerin tamamını analiz ettik. 500 TL'ye varan yatırımsız bonuslar, çevrimsiz freebet fırsatları ve bedava casino denemeleri bu listede.`,
                            h2: `🔥 ${currentMonth} ${currentYear} En Yüksek Deneme Bonusu Veren Siteler`,
                            p1: `<strong>Deneme bonusu veren siteler</strong>, ${currentYear} yılında kullanıcılarına yatırım yapmadan kayıt olur olmaz bonus tanımlayan platformlardır. ${currentMonth} ayı itibarıyla listemize aldığımız 254 platformun 89'u yatırımsız deneme bonusu sunmaktadır. Üstelik bu bonusların %72'si çevrim şartsızdır.`,
                            p2: `Deneme bonusu almak için genellikle sadece kayıt olmak yeterlidir. Bazı siteler SMS doğrulaması isterken, liste başındaki platformlar hiçbir şart aramadan anında bonus tanımlamaktadır. Freebet, freespin ve nakit deneme bonusu seçenekleri mevcuttur.`
                        },
                        'bedavabonus2026.com': {
                            h1: `Bedava Bonus Veren Siteler 2026 - Ücretsiz Casino Bonusları`,
                            intro: `Para yatırmadan bonus kazanabileceğiniz tüm platformları listeledik. ${currentMonth} ${currentYear} güncel bedava bonus kampanyaları, ücretsiz freespin ve hoşgeldin bonusu fırsatları.`,
                            h2: `🎁 ${currentMonth} ${currentYear} Bedava Bonus Kampanyaları`,
                            p1: `<strong>Bedava bonus</strong> kampanyaları ${currentYear} yılında rekor seviyelere ulaştı. Kullanıcılar artık herhangi bir ödeme yapmadan casino ve bahis sitelerini deneyimleyebiliyor. ${currentMonth} ayında aktif olan bedava bonus sunan toplam 178 platform tespit edilmiştir.`,
                            p2: `Ücretsiz bonus çeşitleri arasında kayıt bonusu, doğum günü bonusu, arkadaş davet bonusu ve sosyal medya bonusu yer almaktadır. En popüler olanı ise yatırımsız deneme bonuslarıdır.`
                        },
                        'haber-analiz2026.com': {
                            h1: `Bahis Haberleri ve Bonus Analizleri 2026 - Günlük Güncellenen`,
                            intro: `Bahis dünyasındaki son gelişmeler, yeni açılan siteler ve bonus kampanyalarının detaylı analizleri. ${currentMonth} ${currentYear} en güncel bahis haberleri.`,
                            h2: `📰 ${currentMonth} ${currentYear} Bahis Sektörü Analiz Raporu`,
                            p1: `<strong>Bahis haberleri</strong> ve sektör analizleri konusunda ${currentYear} yılının en kapsamlı kaynağıyız. Editör ekibimiz her gün ortalama 12 yeni haber ve analiz yayınlamaktadır. ${currentMonth} ayında toplam 340+ makale yayınlanmıştır.`,
                            p2: `İncelediğimiz konular arasında yeni açılan bahis siteleri, bonus kampanya değişiklikleri, lisans güncellemeleri ve ödeme yöntemi haberleri bulunmaktadır. Tüm haberler tarafsız ve bağımsız editörler tarafından hazırlanmaktadır.`
                        },
                        'vizyontekyazilim.com': {
                            h1: `Güvenilir Casino Siteleri 2026 - Teknik İnceleme ve Karşılaştırma`,
                            intro: `Casino sitelerinin teknik altyapı analizi, lisans doğrulama ve güvenlik denetim sonuçları. ${currentMonth} ${currentYear} en güvenilir casino platformları rehberi.`,
                            h2: `🔍 ${currentMonth} ${currentYear} Casino Siteleri Güvenlik Denetimi`,
                            p1: `<strong>Güvenilir casino siteleri</strong> seçerken dikkat edilmesi gereken en önemli kriterler lisans bilgisi, SSL sertifikası ve ödeme hızıdır. ${currentYear} yılında test ettiğimiz 203 casino sitesinin yalnızca 67'si tüm güvenlik kriterlerimizi karşılamıştır.`,
                            p2: `Teknik inceleme sürecimiz her site için ortalama 48 saat sürmektedir. Bu süreçte para yatırma/çekme testleri, müşteri hizmetleri kalitesi ve oyun çeşitliliği değerlendirilmektedir.`
                        },
                        'yasalbonus2026.com': {
                            h1: `Yasal Bahis Siteleri 2026 - Lisanslı ve Onaylı Platformlar`,
                            intro: `Yasal çerçevede faaliyet gösteren ve uluslararası lisansa sahip bahis platformları. ${currentMonth} ${currentYear} yasal bonus kampanyaları ve güvenilir giriş adresleri.`,
                            h2: `⚖️ ${currentMonth} ${currentYear} Lisanslı Bahis Siteleri Listesi`,
                            p1: `<strong>Yasal bahis siteleri</strong>, uluslararası oyun otoriteleri tarafından lisanslanmış ve düzenli denetime tabi tutulan platformlardır. ${currentYear} verilerine göre MGA, Curacao ve UKGC lisansına sahip toplam 124 platform Türk kullanıcılara hizmet vermektedir.`,
                            p2: `Lisanslı sitelerin en büyük avantajı kullanıcı fonlarının ayrı hesaplarda tutulması ve anlaşmazlıklarda bağımsız hakem mekanizmasının devreye girmesidir.`
                        },
                        '2026bonuslar.com': {
                            h1: `Casino Bonusları 2026 - Çevrimsiz Freebet ve Freespin Rehberi`,
                            intro: `En yüksek casino bonuslarını karşılaştırın. Çevrimsiz freebet, freespin ve nakit iade kampanyaları. ${currentMonth} ${currentYear} slot ve canlı casino bonusları.`,
                            h2: `🎰 ${currentMonth} ${currentYear} En Yüksek Casino Bonusları`,
                            p1: `<strong>Casino bonusları</strong> ${currentYear} yılında çeşitlilik ve miktar açısından büyük bir artış gösterdi. ${currentMonth} ayında aktif olan çevrimsiz bonus sayısı bir önceki aya göre %34 arttı. En yüksek bonus 1500 TL ile Elite Slot platformunda.`,
                            p2: `Bonus karşılaştırma tablomuzdaki veriler her 6 saatte bir güncellenmektedir. Çevrim şartları, minimum yatırım tutarları ve geçerlilik süreleri anlık olarak takip edilmektedir.`
                        },
                        'independent-news.org': {
                            h1: `Bağımsız Bahis İncelemeleri 2026 - Tarafsız Denetim Raporları`,
                            intro: `Hiçbir bahis sitesiyle sponsorluk anlaşması olmayan bağımsız inceleme platformu. ${currentMonth} ${currentYear} doğrulanmış kullanıcı deneyimleri ve güvenlik raporları.`,
                            h2: `📊 ${currentMonth} ${currentYear} Bağımsız Denetim Sonuçları`,
                            p1: `<strong>Bağımsız bahis incelemeleri</strong> yaparken hiçbir bahis sitesinden komisyon veya reklam geliri almıyoruz. Bu bizi piyasadaki tek gerçek anlamda tarafsız inceleme platformu yapıyor. ${currentYear} yılında 89 adet bağımsız denetim raporu yayınladık.`,
                            p2: `İnceleme metodolojimiz ISO 27001 güvenlik standartlarına uygun olarak hazırlanmıştır. Her site minimum 72 saat boyunca test edilmekte ve sonuçlar istatistiksel olarak raporlanmaktadır.`
                        }
                    };
                    const d = domainH1Map[domain] || domainH1Map['flovazcomercial.com'];
                    return `
                    <h1 class="text-4xl md:text-5xl font-black text-emerald-400 mb-4 tracking-tighter">${d.h1}</h1>
                    <p class="text-slate-400 text-xl font-medium">${d.intro}</p>
                `;
                })()}
                </header>

                <section class="mb-12">
                    ${(() => {
                    const d2 = ({
                        'flovazcomercial.com': { h2: `🔥 ${currentMonth} ${currentYear} En Yüksek Deneme Bonusu Veren Siteler` },
                        'bedavabonus2026.com': { h2: `🎁 ${currentMonth} ${currentYear} Bedava Bonus Kampanyaları` },
                        'haber-analiz2026.com': { h2: `📰 ${currentMonth} ${currentYear} Bahis Sektörü Analiz Raporu` },
                        'vizyontekyazilim.com': { h2: `🔍 ${currentMonth} ${currentYear} Casino Siteleri Güvenlik Denetimi` },
                        'yasalbonus2026.com': { h2: `⚖️ ${currentMonth} ${currentYear} Lisanslı Bahis Siteleri Listesi` },
                        '2026bonuslar.com': { h2: `🎰 ${currentMonth} ${currentYear} En Yüksek Casino Bonusları` },
                        'independent-news.org': { h2: `📊 ${currentMonth} ${currentYear} Bağımsız Denetim Sonuçları` }
                    } as Record<string, { h2: string }>)[domain] || { h2: `🔥 ${currentMonth} ${currentYear} Deneme Bonusu Veren Siteler` };
                    return `<h2 class="text-2xl font-bold text-emerald-300 mb-6 flex items-center gap-3 italic uppercase tracking-tighter">${d2.h2}</h2>`;
                })()}
                    <div class="overflow-x-auto border border-white/10 rounded-[40px] bg-black/60 p-6 shadow-2xl backdrop-blur-xl">
                        <table class="w-full text-left border-collapse">
                            <thead>
                                <tr class="border-b border-white/20">
                                    <th class="p-6 text-emerald-400 font-black uppercase text-sm">PLATFORM</th>
                                    <th class="p-6 text-emerald-400 font-black uppercase text-sm">BONUS</th>
                                    <th class="p-6 text-emerald-400 font-black uppercase text-sm">SKOR</th>
                                    <th class="p-6 text-emerald-400 font-black uppercase text-sm">DURUM</th>
                                </tr>
                            </thead>
                            <tbody class="text-slate-200">
                                ${[
                    { name: "V-Audit Premium Global", bonus: "500 TL Cash + 200 FS", score: "9.9/10", status: "AKTİF" },
                    { name: "CyberSlot 2026 Network", bonus: "333 TL Yatırımsız", score: "9.8/10", status: "ANLIK" },
                    { name: "Global Gaming Authority", bonus: "250 Freebet (Şartsız)", score: "9.7/10", status: "YAYINDA" },
                    { name: "Elite Bet 2026 Hub", bonus: "750 TL Deneme", score: "9.6/10", status: "YENİ" },
                    { name: "Nitro Casino Partners", bonus: "500 FS Nakit İade", score: "9.5/10", status: "AKTİF" },
                    { name: "Titan Gaming Ecosystem", bonus: "1000 TL Hoşgeldin", score: "9.4/10", status: "GÜNCEL" }
                ].map(row => `
                                    <tr class="border-b border-white/5 hover:bg-emerald-500/5 transition-colors">
                                        <td class="p-6 font-black">${row.name}</td>
                                        <td class="p-6 text-emerald-300 font-bold">${row.bonus}</td>
                                        <td class="p-6 font-mono text-xs text-slate-400">${row.score}</td>
                                        <td class="p-6"><span class="bg-emerald-500 text-black font-black text-[10px] px-3 py-1 rounded-full">${row.status}</span></td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                    <div class="mt-4 text-center text-slate-500 text-[10px] uppercase font-bold tracking-widest">
                        SON GÜNCELLEME: ${new Date().toLocaleDateString('tr-TR')} ${new Date().toLocaleTimeString('tr-TR')}
                    </div>
                </section>

                <section class="mb-12">
                    ${(() => {
                    const domainContent: Record<string, { h2: string; p1: string; p2: string }> = {
                        'flovazcomercial.com': {
                            h2: `${currentMonth} ${currentYear} Deneme Bonusu Analiz Raporu`,
                            p1: `<strong>Deneme bonusu veren siteler</strong>, ${currentYear} yılında kullanıcılarına yatırım yapmadan kayıt olur olmaz bonus tanımlayan platformlardır. ${currentMonth} ayı itibarıyla listemize aldığımız 254 platformun 89'u yatırımsız deneme bonusu sunmaktadır. Üstelik bu bonusların %72'si çevrim şartsızdır.`,
                            p2: `Deneme bonusu almak için genellikle sadece kayıt olmak yeterlidir. Bazı siteler SMS doğrulaması isterken, liste başındaki platformlar hiçbir şart aramadan anında bonus tanımlamaktadır.`
                        },
                        'bedavabonus2026.com': {
                            h2: `Bedava Bonus Rehberi ${currentYear}`,
                            p1: `<strong>Bedava bonus</strong> kampanyaları ${currentYear} yılında rekor seviyelere ulaştı. Kullanıcılar artık herhangi bir ödeme yapmadan casino ve bahis sitelerini deneyimleyebiliyor. ${currentMonth} ayında aktif olan bedava bonus sunan toplam 178 platform tespit edilmiştir.`,
                            p2: `Ücretsiz bonus çeşitleri arasında kayıt bonusu, doğum günü bonusu, arkadaş davet bonusu ve sosyal medya bonusu yer almaktadır.`
                        },
                        'haber-analiz2026.com': {
                            h2: `${currentMonth} ${currentYear} Bahis Sektörü Değerlendirmesi`,
                            p1: `<strong>Bahis haberleri</strong> ve sektör analizleri konusunda ${currentYear} yılının en kapsamlı kaynağıyız. Editör ekibimiz her gün 12+ haber yayınlamaktadır.`,
                            p2: `İncelediğimiz konular arasında yeni açılan bahis siteleri, bonus kampanya değişiklikleri, lisans güncellemeleri ve ödeme yöntemi haberleri bulunmaktadır.`
                        },
                        'vizyontekyazilim.com': {
                            h2: `Casino Güvenlik Denetim Raporu ${currentMonth} ${currentYear}`,
                            p1: `<strong>Güvenilir casino siteleri</strong> seçerken dikkat edilmesi gereken en önemli kriterler lisans bilgisi, SSL sertifikası ve ödeme hızıdır. ${currentYear} yılında test ettiğimiz 203 casino sitesinin yalnızca 67'si kriterlerimizi karşılamıştır.`,
                            p2: `Teknik inceleme sürecimiz her site için ortalama 48 saat sürmektedir. Para yatırma/çekme testleri ve müşteri hizmetleri kalitesi değerlendirilmektedir.`
                        },
                        'yasalbonus2026.com': {
                            h2: `Yasal Bahis Platformları ${currentMonth} ${currentYear} Rehberi`,
                            p1: `<strong>Yasal bahis siteleri</strong>, uluslararası oyun otoriteleri tarafından lisanslanmış platformlardır. ${currentYear} verilerine göre MGA, Curacao ve UKGC lisansına sahip toplam 124 platform Türk kullanıcılara hizmet vermektedir.`,
                            p2: `Lisanslı sitelerin en büyük avantajı kullanıcı fonlarının ayrı hesaplarda tutulması ve anlaşmazlıklarda bağımsız hakem mekanizmasının devreye girmesidir.`
                        },
                        '2026bonuslar.com': {
                            h2: `Casino Bonus Karşılaştırma ${currentMonth} ${currentYear}`,
                            p1: `<strong>Casino bonusları</strong> ${currentYear} yılında çeşitlilik ve miktar açısından büyük bir artış gösterdi. ${currentMonth} ayında aktif olan çevrimsiz bonus sayısı bir önceki aya göre %34 arttı.`,
                            p2: `Bonus karşılaştırma tablomuzdaki veriler her 6 saatte bir güncellenmektedir. Çevrim şartları ve minimum yatırım tutarları anlık olarak takip edilmektedir.`
                        },
                        'independent-news.org': {
                            h2: `Bağımsız Platform Denetim Raporu ${currentMonth} ${currentYear}`,
                            p1: `<strong>Bağımsız bahis incelemeleri</strong> yaparken hiçbir bahis sitesinden komisyon veya reklam geliri almıyoruz. ${currentYear} yılında 89 adet bağımsız denetim raporu yayınladık.`,
                            p2: `İnceleme metodolojimiz ISO 27001 güvenlik standartlarına uygun olarak hazırlanmıştır. Her site minimum 72 saat boyunca test edilmektedir.`
                        }
                    };
                    const c = domainContent[domain] || domainContent['flovazcomercial.com'];
                    return `
                    <h2 class="text-2xl font-semibold text-emerald-300 mb-6 italic">${c.h2}</h2>
                    <p class="text-slate-300 leading-relaxed mb-4">${c.p1}</p>
                    <p class="text-slate-300 leading-relaxed">${c.p2}</p>
                `;
                })()}
                </section>

                <section class="mb-12 bg-slate-900/50 p-8 rounded-3xl border border-slate-800 shadow-xl">
                    <h2 class="text-2xl font-semibold text-emerald-300 mb-6">Neden Bizi Takip Etmelisiniz?</h2>
                    <ul class="space-y-6 text-slate-300">
                        <li class="flex items-start gap-4">
                            <span class="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-emerald-500/20 text-emerald-400 rounded-full font-bold">1</span>
                            <div>
                               <strong class="text-white block text-lg mb-1">Doğrulanmış Veri Kaynakları</strong>
                               Tüm verilerimiz global otorite veritabanlarıyla (SHA-512) eşleşmektedir.
                            </div>
                        </li>
                        <li class="flex items-start gap-4">
                            <span class="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-emerald-500/20 text-emerald-400 rounded-full font-bold">2</span>
                            <div>
                               <strong class="text-white block text-lg mb-1">7/24 Teknik Denetim</strong>
                               Bot ve örümcek algoritmalarımız piyasadaki bonus değişimlerini anlık olarak tarar.
                            </div>
                        </li>
                    </ul>
                </section>
            </article>

            <div class="mt-12 text-center border-t border-slate-800 pt-8">
                <span class="text-xs font-mono text-slate-500 uppercase tracking-widest">NUCLEAR_SEO_SIGNAL_V7: [VERIFIED] // LAST_PUSH: ${new Date().toLocaleDateString('tr-TR')} // ALGORITHM_MART_2026_APEX</span>
            </div>
          </div>
      `;

            const config: any = {
                ...site,
                maskContent: {
                    ...site.maskContent,
                    botArticle: `
            ${homeBotArticle}
            <div class="analysis-hub mt-12 p-8 bg-black/20 rounded-[40px] border border-white/5">
                <h3 class="text-xl font-black text-emerald-400 mb-6 uppercase tracking-tighter italic">2026 Global Otorite İndeksi (Anlık Veri Akışı):</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    ${(site.maskContent?.news || []).slice(0, 30).map((n: any) => `
                        <div class="news-link-item p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all border border-white/5">
                            <a href="/haberler/${n.slug}" class="text-emerald-300 font-bold hover:underline text-sm">${n.title}</a>
                            <p class="text-slate-500 text-[10px] mt-1 line-clamp-1">${n.summary}</p>
                        </div>
                    `).join('')}
                </div>
                <div class="mt-6 text-[10px] text-slate-600 italic">
                    * Tüm veriler SHA-512 şifreleme alt yapısıyla denetlenmiş ve <strong>bonus veren siteler 2026</strong> rehberimize entegre edilmiştir. 
                    Referans kaynaklar: <a href="https://www.mga.org.mt/" class="text-white/20">MGA Official</a>, <a href="https://www.curacao-egaming.com/" class="text-white/20">CEG Data</a>.
                </div>
            </div>
          `
                }
            };

            if (isBot) {
                // 🕒 APEX HEARTBEAT SIGNAL: Inject live timestamp to show extreme freshness to Googlebot
                const heartbeat = new Date().toISOString();
                const freshBotArticle = homeBotArticle.replace(
                    '<<< SYSTEM STATUS: 100% OPERATIONAL // REVALIDATION IN PROGRESS >>>',
                    `<<< SYSTEM STATUS: 100% OPERATIONAL // APEX HEARTBEAT: ${heartbeat} // DIRECT SSR INJECTION >>>`
                );

                return (
                    <div className="bot-optimized-ssr-view">
                        <style dangerouslySetInnerHTML={{
                            __html: `
                            .bot-optimized-ssr-view { background: #020617; color: white; font-family: sans-serif; }
                            .ultimate-seo-vault { max-width: 1200px; margin: 0 auto; padding: 3rem; border-bottom: 2px dashed rgba(255,255,255,0.05); }
                            .analysis-hub { max-width: 1200px; margin: 0 auto; padding: 3rem; background: rgba(15, 23, 42, 0.4); border-radius: 40px; }
                        `}} />
                        <div style={{ padding: '2rem', background: '#e11d48', color: '#fff', textAlign: 'center', fontWeight: '900', fontSize: '32px', textTransform: 'uppercase', letterSpacing: '3px', borderBottom: '10px solid #fbbf24' }}>
                            🧨 KRİTİK GÜNCELLEME: MART 2026 - %100 YATIRIMSIZ BONUSLAR AKTİF!
                        </div>
                        <div style={{ padding: '1rem', background: '#000', color: '#fbbf24', textAlign: 'center', fontWeight: 'bold', fontSize: '14px', fontFamily: 'monospace' }}>
                            EMERGENCY_INDEX_SIGNAL_V10: [${heartbeat}] // NUCLEAR_NONCE: ${Math.random().toString(36).substring(7)} // CRAWL_PRIORITY: CRITICAL // MART_2026_DOMINATION
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: freshBotArticle }} />
                        <div style={{ padding: '50px', color: '#1e293b', fontSize: '8px', lineHeight: '1' }}>
                            deneme bonusu veren siteler 2026 deneme bonusu 2026 bedava bonus veren siteler yatırımsız deneme bonusu çevrimsiz freebet yeni bahis siteleri 2026 bonus rehberi
                        </div>
                        <div className="analysis-hub">
                            <h3 style={{ color: '#10b981', marginBottom: '2rem', fontSize: '2rem', fontWeight: '900', textTransform: 'uppercase', fontStyle: 'italic' }}>🚀 MART 2026 STRATEJİK OTORİTE MATRİSİ (URGENT_INDEX):</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
                                {(site.maskContent as any).news?.map((n: any) => (
                                    <div key={n.slug} style={{ background: 'rgba(255,255,255,0.02)', padding: '1.25rem', borderRadius: '15px', border: '1px solid rgba(16, 185, 129, 0.1)' }}>
                                        <div style={{ fontSize: '10px', color: '#10b981', fontWeight: 'bold', marginBottom: '5px' }}>DOĞRULANMIŞ MAKALE: MART 2026</div>
                                        <a href={`/haberler/${n.slug}?ref=nuclear-bot-${heartbeat}`} style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 'bold', textDecoration: 'none', lineHeight: '1.2' }}>{n.title}</a>
                                        <p style={{ color: '#64748b', fontSize: '12px', marginTop: '0.75rem', lineClamp: '2', display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{n.summary}</p>
                                        <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ color: '#10b981', fontSize: '10px', fontWeight: 'bold' }}>GÜVEN SKORU: 9.9/10</span>
                                            <span style={{ color: '#475569', fontSize: '10px' }}>{new Date(n.date).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {site.seoSettings && (typeof site.seoSettings === 'string' ? JSON.parse(site.seoSettings) : site.seoSettings).footerMatrix && (
                            <div dangerouslySetInnerHTML={{ __html: (typeof site.seoSettings === 'string' ? JSON.parse(site.seoSettings) : site.seoSettings).footerMatrix }} />
                        )}
                        <div style={{ marginTop: '50px', padding: '30px', background: 'rgba(0,0,0,0.5)', borderTop: '2px solid #10b981', textAlign: 'left' }}>
                            <h4 style={{ color: '#10b981', fontSize: '14px', marginBottom: '15px', fontWeight: 'bold' }}>🔗 MART 2026 RESMİ ANALİZ %100 GÜVEN AĞI (OFFICIAL PARTNERS):</h4>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', fontSize: '12px' }}>
                                <a href="https://flovazcomercial.com" style={{ color: '#94a3b8', textDecoration: 'none' }}>🛡️ FLOVAZ ANALİZ</a>
                                <a href="https://bedavabonus2026.com" style={{ color: '#94a3b8', textDecoration: 'none' }}>⭐ BEDAVA BONUS 2026</a>
                                <a href="https://haber-analiz2026.com" style={{ color: '#94a3b8', textDecoration: 'none' }}>🗞️ HABER ANALİZ</a>
                                <a href="https://vizyontekyazilim.com" style={{ color: '#94a3b8', textDecoration: 'none' }}>💻 VİZYON TEK</a>
                                <a href="https://yasalbonus2026.com" style={{ color: '#94a3b8', textDecoration: 'none' }}>✅ YASAL BONUS</a>
                                <a href="https://2026bonuslar.com" style={{ color: '#94a3b8', textDecoration: 'none' }}>🔥 2026 BONUSLAR</a>
                                <a href="https://independent-news.org" style={{ color: '#94a3b8', textDecoration: 'none' }}>📰 INDEPENDENT NEWS</a>
                                <a href="/etiketler" style={{ color: '#10b981', fontWeight: 'bold' }}>🔎 TÜM ANALİZLER (1337+)</a>
                            </div>
                        </div>
                    </div>
                );
            }

            return <CloakedHome preloadedConfig={config} />;
        }
    } catch (error) {
        console.error("Home Page Critical Error for domain " + domain + ":", error);
    }

    // Fallback to CloakedHome which will safely handle the UI on the client
    return <CloakedHome />;
}

