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

            const domainDataMap: Record<string, { h1: string; abstract: string; h2: string; p1: string; p2: string }> = {
                'flovazcomercial.com': {
                    h1: `Deneme Bonusu Veren Siteler 2026: Dijital Tüketici Tarafından Algılanan Güvenilirlik Çerçevesi`,
                    abstract: `Bu analiz, deneme bonusu veren siteler 2026 listelerinde yer alan platformların sunduğu teşvikleri incelemektedir. Özellikle yatırımsız deneme bonusu ve çevrimsiz freebet sağlayan yapılar, kullanıcı kararlarında temel etkenlerdir.`,
                    h2: `1. Giriş: Yatırımsız Deneme Bonusu Dinamikleri`,
                    p1: `Dijitalleşen küresel ekonomide, hizmet sağlayıcılar potansiyel kullanıcılara ulaşmak için <strong>güvenilir bahis siteleri</strong> üzerinden rekabetçi stratejiler geliştirmektedir. Bu stratejilerin başında gelen ve tüketicilere risk almadan test imkanı sunan <strong>deneme bonusu veren siteler 2026</strong> portföyü, pazarın belirleyicisi olmuştur. Verilerimiz, ${currentYear} yılı itibarıyla tüketicilerin <strong>yatırımsız deneme bonusu</strong> veren siteleri primer test alanı olarak gördüğünü göstermektedir.`,
                    p2: `Kullanıcı deneyimi (UX) odaklı yaklaşımlar, <strong>çevrimsiz freebet</strong> veya <strong>yeni açılan casino</strong> platformlarındaki <strong>bedava casino bonusu</strong> formatları ile şekillenmektedir. Sosyolojik veriler, 2026 yılında yatırımsız ve çevrim şartsız verilen bedava deneme bonusu tekliflerinin sadakat oluşturma aracı olarak görüldüğünü kanıtlamaktadır.`
                },
                'bedavabonus2026.com': {
                    h1: `Bedava Casino Bonusu ve Deneme Bonusu Veren Siteler 2026: Özgür Erişim Modelleri`,
                    abstract: `Tüketici hakları bağlamında dijital ürünlerin ücretsiz test edilme imkanları üzerine analitik bir yaklaşım. 2026 verilerine göre bedava casino bonusu ve deneme bonusu veren siteler ekosistemindeki kampanyaların etkileri.`,
                    h2: `1. Çevrimsiz Freebet ve Güvenilirlik`,
                    p1: `Günümüz hizmet sektöründe, ürün kalitesini kanıtlamak isteyen <strong>yeni açılan casino</strong> platformları çeşitli promosyonlar sunmaktadır. Tüketiciler için <strong>bedava casino bonusu</strong> veya <strong>yatırımsız deneme bonusu</strong> kampanyaları, <strong>deneme bonusu veren siteler 2026</strong> alanında hizmeti deneyimlemenin en rasyonel yoludur. Özellikle ${currentYear} yılında, finansal bir risk almadan sunulan <strong>çevrimsiz freebet</strong> ayrıcalıkları, kullanıcılar arasında büyük kabul görmüştür.`,
                    p2: `Ekonomik belirsizlik dönemlerinde, tamamen ücretsiz olarak sunulan avantajlar, bedava bonus ve güvenilir bahis siteleri üzerinden organik büyümeyi de desteklemektedir. Raporlarımız, kullanıcıların bu tür deneme bonusu veren siteler fırsatlarını değerlendirirken yatırımsızlık ilkelerine önem verdiğini ortaya koymaktadır.`
                },
                'haber-analiz2026.com': {
                    h1: `Güvenilir Bahis Siteleri ve Deneme Bonusu Veren Siteler 2026 Yasal Regülasyonları`,
                    abstract: `Bu makale, ${currentYear} yılında deneme bonusu veren siteler, güvenilir bahis siteleri ve yatırımsız deneme bonusu kampanya süreçlerinde meydana gelen sektör değişikliklerini incelemektedir.`,
                    h2: `1. Çevrimsiz Freebet Kampanyalarının Medya Etkisi`,
                    p1: `<strong>Deneme bonusu veren siteler 2026</strong> verileri ve <strong>yatırımsız deneme bonusu</strong> haber analizleri, tüketicilerin bilinçli karar alabilmeleri için elzemdir. ${currentYear} itibarıyla pazarın genişlemesi, bedava casino bonusu sunan veya <strong>yeni açılan casino</strong> sitelerine yönelik doğru enformasyona olan ihtiyacı artırmıştır. Gelişen algoritmalar <strong>güvenilir bahis siteleri</strong> standartlarında test edilmiş platformları öne çıkarmaktadır.`,
                    p2: `Bilinçli eğlence kültürü, sektördeki yeni açılan platformların analizini ve sunulan çevrimsiz freebet yapılarının dönemsel etkilerini anlamaktır. Habercilik ağımız üzerinden yapılan deneme bonusu veren siteler değerlendirmelerinde, şeffaflık raporlarının yatırımsız teklifleri desteklediği tespit edilmiştir.`
                },
                'vizyontekyazilim.com': {
                    h1: `Yeni Açılan Casino Sistemleri ve Deneme Bonusu Veren Siteler 2026 Güvenilirlik Endeksi`,
                    abstract: `Kullanıcı verilerinin korunması ve yatırımsız deneme bonusu veren yapıların siber güvenlik bağlamında altyapı analizleri. Çevrimsiz freebet ve deneme bonusu veren siteler 2026 değerlendirme kriterleri.`,
                    h2: `1. Yatırımsız Deneme Bonusu Sağlayan Altyapılar`,
                    p1: `Modern internet kullanıcıları için <strong>güvenilir bahis siteleri</strong> bulmak ve özellikle <strong>deneme bonusu veren siteler 2026</strong> listelerine ulaşmak büyük önem taşımaktadır. ${currentYear} yılı analizlerimize göre, <strong>yeni açılan casino</strong> sistemlerindeki teknolojiler ve <strong>yatırımsız deneme bonusu</strong> sunan altyapıların bağımsızlığı platformların güven skorlarını doğrudan etkilemektedir.`,
                    p2: `Araştırmamız kapsamında incelenen 200'den fazla <strong>bedava casino bonusu</strong> platformunun ve <strong>çevrimsiz freebet</strong> veren güvenilir bahis siteleri müşteri hizmetleri yanıt süresi test edilmiş, deneme bonusu endeksleri nesnel kriterlere bağlanmıştır.`
                },
                'yasalbonus2026.com': {
                    h1: `Yatırımsız Deneme Bonusu Veren Siteler 2026: Hukuki Bağlamda Güvenilir Bahis Siteleri`,
                    abstract: `Global yetki belgelerinin yeni açılan casino ve deneme bonusu veren siteler 2026 ekosistemi üzerindeki denetleyici etkileri. Çevrimsiz freebet ve yasal ekosistemin ${currentYear} standartları.`,
                    h2: `1. Bedava Casino Bonusu Hukuki Çerçevesi`,
                    p1: `Ekonomik etkileşim süreçlerinde <strong>güvenilir bahis siteleri</strong>, uluslararası standartlara uygun bir şekilde denetlenmekte ve tüketicilere şeffaf bir <strong>yatırımsız deneme bonusu</strong> sunmaktadır. ${currentYear} yılı <strong>deneme bonusu veren siteler 2026</strong> haritasına göre, <strong>bedava casino bonusu</strong> veren ve <strong>çevrimsiz freebet</strong> dağıtan akredite kurumlar daha sürdürülebilir bir büyüme yakalamıştır.`,
                    p2: `Tüketicilerin yasal güvence arayışı, regüle edilmiş piyasaların gelişmesini teşvik etmekte; yatırımsız deneme bonusu ve bedava slot dönüşü veren yasal yapıların kullanımını artırmaktadır.`
                },
                '2026bonuslar.com': {
                    h1: `Çevrimsiz Freebet ve Deneme Bonusu Veren Siteler 2026 Bireysel Tüketim Modelleri`,
                    abstract: `Tüketicilerin yatırımsız deneme bonusu ve bedava casino bonusu bağlamında dijital teşvikleri değerlendirmesi. ${currentMonth} ${currentYear} dönemine ait deneme bonusu veren siteler 2026 istatistikleri.`,
                    h2: `1. Güvenilir Bahis Siteleri ve Yeni Açılan Casino Pazarı`,
                    p1: `Bireysel tüketim alışkanlıkları, platformların sundukları teşviklerle doğrudan ilişkilidir. Özellikle pazar payını artırmak isteyen <strong>yeni açılan casino</strong> sistemlerinin sunduğu <strong>bedava casino bonusu</strong> ve analizli <strong>deneme bonusu veren siteler 2026</strong> listeleri, ${currentYear} yılında en yüksek seviyesine ulaşmıştır. Tüketici algısında <strong>yatırımsız deneme bonusu</strong> kazanımı öne çıkmaktadır.`,
                    p2: `Çalışmamız, <strong>çevrimsiz freebet</strong> ve güvenilir bahis siteleri yapılarının, karmaşık kurallara sahip teşviklerden çok daha etkili olduğunu matematiksel modellerle kanıtlamıştır.`
                },
                'independent-news.org': {
                    h1: `Deneme Bonusu Veren Siteler 2026: Güvenilir Bahis Siteleri Bağımsız Denetim Kriterleri`,
                    abstract: `Bedava casino bonusu ve yatırımsız deneme bonusu sağlayan platformların objektif analizi. Çevrimsiz freebet sunan yeni açılan casino sitelerinin bağımsız denetim metodolojisi.`,
                    h2: `1. Yatırımsız Deneme Bonusu Analitik İncelemesi`,
                    p1: `Tüketici manipülasyonunun önüne geçmek adına <strong>güvenilir bahis siteleri</strong> özelinde yürütülen <strong>deneme bonusu veren siteler 2026</strong> incelemeleri önemli bir filtre mekanizmasıdır. <strong>Yatırımsız deneme bonusu</strong> ve <strong>bedava casino bonusu</strong> veren sistemlerin denetimi akademik standartlara dayanır.`,
                    p2: `Ekibimizce gerçekleştirilen <strong>çevrimsiz freebet</strong> denetimleri, <strong>yeni açılan casino</strong> platformlarının çevrim koşulları, yatırımsız para çekim hızları ve ödeme işlemcilerinin güvenilirliği üzerine kuruludur.`
                }
            };

            const pageData = domainDataMap[domain] || domainDataMap['flovazcomercial.com'];

            // SEO Keywords to seed naturally in the invisible source code
            const schemaContent = JSON.stringify([
                {
                    "@context": "https://schema.org",
                    "@type": "ResearchArticle",
                    "headline": pageData.h1,
                    "author": { "@type": "Organization", "name": "Akademik Dijital Araştırmalar Enstitüsü" },
                    "datePublished": new Date(Date.now() - 24 * 3600000).toISOString(),
                    "publisher": { "@type": "Organization", "name": site.name }
                },
                {
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": [
                        {
                            "@type": "Question",
                            "name": "2026 yılında deneme bonusu veren siteler hangileridir?",
                            "acceptedAnswer": { "@type": "Answer", "text": "Platformların yatırımsız deneme bonusu ve çevrimsiz freebet gibi şeffaf mekanizmalarıyla hizmet kalitelerini kanıtlayan güvenilir bahis siteleridir." }
                        },
                        {
                            "@type": "Question",
                            "name": "Yatırımsız deneme bonusu ve bedava casino bonusu nasıl alınır?",
                            "acceptedAnswer": { "@type": "Answer", "text": "Yeni açılan casino platformlarının sunduğu çevrimsiz kampanyalar bağlamında, deneme bonusu veren siteler 2026 normlarına göre risk almadan üyelik yoluyla alınır." }
                        }
                    ]
                }
            ]);

            const homeBotArticle = `
                <div class="academic-header">
                    <div style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; color: #666; margin-bottom: 1.5rem;">Akademik Derleme ve Raporlama • Vol 7, Issue 4 • ${currentMonth} ${currentYear}</div>
                    <h1 class="academic-title">${pageData.h1}</h1>
                    <div class="academic-abstract"><strong>Özet:</strong> ${pageData.abstract}</div>
                </div>

                <div class="academic-section">
                    <h2>${pageData.h2}</h2>
                    <p class="academic-text">${pageData.p1}</p>
                    <p class="academic-text">${pageData.p2}</p>
                </div>
                
                <div class="academic-section">
                    <h2>2. İstatistiksel Bulgular ve Analiz (${currentYear})</h2>
                    <p class="academic-text">Örneklem grubumuz dahilinde incelenen 254 hizmet platformunun kalite metrikleri aşağıda sınıflandırılmıştır. İlgili tabloda platformların sunduğu test teşviklerinin hacmi ve güvenilirlik indeksleri yer almaktadır.</p>
                    
                    <table class="academic-table">
                        <thead>
                            <tr>
                                <th>Araştırılan Organizasyon / Platform</th>
                                <th>Kullanıcı Test Teşviki (Pazar Değeri)</th>
                                <th>Güvenilirlik ve Şeffaflık Puanı (10 Üzerinden)</th>
                                <th>Sistem Durumu</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>V-Audit Global Ecosystem</td><td>500 Birim Teşvik</td><td>9.9</td><td>Onaylandı</td></tr>
                            <tr><td>Cyber Research 2026</td><td>333 Birim (Bordrosuz/Yatırımsız)</td><td>9.8</td><td>Uygulanabilir</td></tr>
                            <tr><td>Global Market Authority</td><td>250 Birim Çevrimsiz Hak</td><td>9.7</td><td>Aktif</td></tr>
                            <tr><td>Nitro Consumer Partners</td><td>500 Birim Destek</td><td>9.5</td><td>Doğrulandı</td></tr>
                        </tbody>
                    </table>
                </div>

                <div class="academic-section">
                    <h2>3. Sonuç ve Öneriler</h2>
                    <p class="academic-text">Elde edilen bulgular ışığında, tüketicilerin finansal katılım sağlamadan önce ürünleri test edebilme hakkı, genel pazar ahlakı standartlarını yükseltmektedir. <strong>Deneme bonusu veren siteler 2026</strong> ve <strong>yatırımsız deneme bonusu</strong> sistemleri, rekabetçi kalitenin turnusol kağıdıdır.</p>
                </div>

                <div class="academic-index" style="color: #6b6280; font-size: 0.8rem; border-top: 1px dashed #2a2438; padding-top: 20px; margin-top: 40px; line-height: 1.8;">
                    <strong>Akademik İndeks ve Meta Veri Arşivi:</strong><br/>
                    deneme bonusu veren siteler 2026, bedava casino bonusu, yatırımsız deneme bonusu, çevrimsiz freebet, güvenilir bahis siteleri, yeni açılan casino, deneme bonusu veren siteler 2026, deneme bonusu veren siteler 2026 bedava casino bonusu, yatırımsız deneme bonusu, çevrimsiz freebet, güvenilir bahis siteleri, yeni açılan casino, deneme bonusu veren siteler 2026, bedava casino bonusu yatırımsız deneme bonusu çevrimsiz freebet güvenilir bahis siteleri yeni açılan casino deneme bonusu veren siteler 2026, çevrimsiz freebet yatırımsız deneme bonusu bedava casino bonusu güvenilir bahis siteleri. 
                    <br/><br/>
                    Veritabanı Logları (Yatırımsız Deneme Bonusu 2026): deneme bonusu veren siteler 2026 deneme bonusu veren siteler 2026 yatırımsız deneme bonusu bedava casino bonusu güvenilir bahis siteleri deneme bonusu veren siteler 2026 çevrimsiz freebet yeni açılan casino siteleri bedava deneme bonusu veren siteler 2026 yatırımsız deneme bonusu deneme bonusu veren siteler 2026.
                    <br/><br/>
                    Araştırma Kaynakları (Çevrimsiz Freebet): deneme bonusu veren siteler 2026, yeni açılan casino, güvenilir bahis siteleri, deneme bonusu veren siteler 2026, yatırımsız deneme bonusu, çevrimsiz freebet, güvenilir bahis siteleri, deneme bonusu veren siteler 2026, bedava casino bonusu, yeni açılan casino yatırımsız deneme bonusu deneme bonusu veren siteler 2026 yatırımsız deneme bonusu çevrimsiz freebet deneme bonusu veren siteler 2026 güvenilir bahis siteleri.
                    <br/><br/>
                    Sürüm: ${currentYear}.Yatırımsız.Deneme.Bonusu.2026.Core.v7.4 - Çevrimsiz.Freebet.Güvenilir.Bahis.Siteleri
                </div>
            `;

            const config: any = {
                ...site,
                maskContent: {
                    ...site.maskContent,
                    botArticle: homeBotArticle
                }
            };

            if (isBot) {
                return (
                    <div className="academic-ssr-view">
                        <style dangerouslySetInnerHTML={{
                            __html: `
                            .academic-ssr-view { background: #ffffff; color: #222; font-family: 'Georgia', 'Times New Roman', serif; line-height: 1.7; font-size: 16px; padding: 20px; }
                            .academic-research-article { max-width: 800px; margin: 0 auto; background: #fff; padding: 40px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); border-radius: 8px; border: 1px solid #e2e8f0; }
                            .academic-header { text-align: center; border-bottom: 2px solid #e2e8f0; padding-bottom: 30px; margin-bottom: 30px; }
                            .academic-title { font-size: 2.2rem; color: #1a202c; font-weight: normal; margin-bottom: 20px; line-height: 1.3; }
                            .academic-abstract { font-style: italic; color: #4a5568; padding: 25px; background: #f8fafc; border-left: 4px solid #cbd5e1; text-align: left; font-size: 0.95rem; }
                            .academic-section { margin-bottom: 40px; }
                            .academic-section h2 { font-size: 1.5rem; color: #2d3748; padding-bottom: 10px; margin-bottom: 20px; font-weight: bold; border-bottom: 1px dotted #cbd5e1;}
                            .academic-text { color: #4a5568; margin-bottom: 20px; text-align: justify; }
                            .academic-table { width: 100%; border-collapse: collapse; margin-top: 30px; font-size: 0.9rem; }
                            .academic-table th, .academic-table td { border: 1px solid #e2e8f0; padding: 15px; text-align: left; }
                            .academic-table th { background-color: #f8fafc; font-weight: bold; color: #1a202c; }
                            .academic-table tr:hover { background-color: #f1f5f9; }
                            .academic-footer { margin-top: 50px; font-size: 0.8rem; color: #94a3b8; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 20px; }
                            .academic-reference a { color: #3b82f6; text-decoration: none; }
                            .academic-reference a:hover { text-decoration: underline; }
                        `}} />
                        <div className="academic-research-article">
                            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaContent }} />
                            <div dangerouslySetInnerHTML={{ __html: homeBotArticle }} />

                            <div className="academic-section">
                                <h2>4. Hakemli Dergi ve Arşiv Bağlantıları</h2>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                    {(site.maskContent as any).news?.slice(0, 10).map((n: any) => (
                                        <div key={n.slug} style={{ border: '1px solid #e2e8f0', padding: '15px', borderRadius: '5px' }}>
                                            <a href={`/haberler/${n.slug}`} style={{ display: 'block', color: '#2b6cb0', fontWeight: 'bold', textDecoration: 'none', marginBottom: '8px' }}>${n.title}</a>
                                            <p style={{ fontSize: '0.8rem', color: '#718096', margin: 0, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>${n.summary}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="academic-footer">
                                <p>© ${currentYear} ${site.name} Tüm akademik hakları saklıdır. DOI: 10.1038/s41586-026</p>
                                <div className="academic-reference">
                                    <p>İlişkili Enstitüler ve Veri Partnerleri:
                                        <a href="https://flovazcomercial.com">Flovaz Stratejik Araştırmalar</a>,
                                        <a href="https://bedavabonus2026.com">Dijital Erişim Gözlemevi</a>,
                                        <a href="https://haber-analiz2026.com">Sektörel Veri Analiz Merkezi</a>,
                                        <a href="https://vizyontekyazilim.com">Vizyon Bilişim Güvenliği</a>,
                                        <a href="https://yasalbonus2026.com">Global Lisans ve Mevzuat Kurulu</a>,
                                        <a href="https://2026bonuslar.com">Promosyonel Ekonomi Enstitüsü</a>,
                                        <a href="https://independent-news.org">Bağımsız İzleme ve Raporlama Ağı</a>
                                    </p>
                                </div>
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

