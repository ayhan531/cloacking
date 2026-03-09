import fs from 'fs';
import path from 'path';

const pagePath = path.join(process.cwd(), 'app', 'page.tsx');
let currContent = fs.readFileSync(pagePath, 'utf8');

const newBotLogic = `            // 🏠 UNIQUE HOME BOT IDENTITY
            const monthNames = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
            const currentMonth = monthNames[new Date().getMonth()];
            const currentYear = new Date().getFullYear();

            const domainDataMap: Record<string, { h1: string; abstract: string; h2: string; p1: string; p2: string }> = {
                'flovazcomercial.com': {
                    h1: \`Dijital Tüketici Davranışlarında Promosyonel Teşviklerin Rolü: \${currentYear} Araştırması\`,
                    abstract: \`Bu çalışma, e-ticaret ve dijital hizmet platformlarında kullanıcı bağlılığını artırmak amacıyla sunulan hediye ve teşvik sistemlerini incelemektedir. Özellikle deneme bonusu veren siteler \${currentYear} yılı metrikleri üzerinden yapılan analizler, yatırımsız deneme bonusu modellerinin kullanıcı güvenini tesis etmedeki kritik rolünü ortaya koymaktadır.\`,
                    h2: \`1. Giriş ve Sektörel Kapsam\`,
                    p1: \`Dijitalleşen küresel ekonomide, hizmet sağlayıcılar potansiyel kullanıcılara ulaşmak için rekabetçi stratejiler geliştirmektedir. Bu stratejilerin başında gelen ve tüketicilere platformları risk almadan test etme imkanı sunan <strong>deneme bonusu veren siteler</strong>, son yıllarda sosyolojik ve ekonomik bir araştırma konusu olmuştur. Verilerimiz, \${currentYear} yılı itibarıyla tüketicilerin %84'ünün, herhangi bir finansal işlem yapmadan önce platformu test etmeyi tercih ettiğini göstermektedir.\`,
                    p2: \`Kullanıcı deneyimi (UX) odaklı yaklaşımlar, sistemlerin şeffaflığını artırmaktadır. Çevrimsiz freebet veya benzeri yatırımsız deneme bonusu formatları, dijital hizmet sağlayıcılarının kalite standartlarını kanıtlama ve uzun vadeli kullanıcı sadakati oluşturma aracı olarak görülmektedir.\`
                },
                'bedavabonus2026.com': {
                    h1: \`E-Hizmet Kullanımında Bağımsız Tüketici Avantajları: Özgür Erişim Modelleri \${currentYear}\`,
                    abstract: \`Tüketici hakları bağlamında dijital ürünlerin ücretsiz test edilme imkanları üzerine analitik bir yaklaşım. \${currentYear} verilerine göre bedava bonus ve promosyon kampanyalarının pazar dinamiklerine etkileri.\`,
                    h2: \`1. Sektörel Şeffaflık ve Erişim\`,
                    p1: \`Günümüz hizmet sektöründe, ürün kalitesini kanıtlamak isteyen sağlayıcılar çeşitli promosyonlar sunmaktadır. Tüketiciler için <strong>bedava bonus</strong> kampanyaları, platformun vadettiği hizmeti deneyimlemenin en rasyonel yoludur. Özellikle \${currentYear} yılında, finansal bir risk almadan sunulan bu ayrıcalıklar, kullanıcılar arasında büyük kabul görmüştür.\`,
                    p2: \`Ekonomik belirsizlik dönemlerinde, tamamen ücretsiz olarak sunulan avantajlar ve bedava deneme hakları, marka bilinirliğini artırmakla kalmayıp, hizmet sağlayıcıların organik büyümesini de desteklemektedir. Raporlarımız, kullanıcıların bu tür fırsatları değerlendirirken şeffaflık ilkelerine önem verdiğini ortaya koymaktadır.\`
                },
                'haber-analiz2026.com': {
                    h1: \`Dijital Eğlence Sektöründe Yasal Düzenlemeler ve Tüketici Eğilimleri \${currentYear}\`,
                    abstract: \`Bu makale, \${currentYear} yılında dijital eğlence ve bahis sektöründe meydana gelen regülasyon değişikliklerini ve kullanıcı teşviklerini tarihsel bir perspektifle incelemektedir.\`,
                    h2: \`1. Medya ve Bilgi Akışı\`,
                    p1: \`<strong>Bahis haberleri</strong> ve sektörel veri analizleri, tüketicilerin bilinçli karar alabilmeleri için elzemdir. \${currentYear} itibarıyla pazarın genişlemesi, doğru ve bağımsız enformasyona olan ihtiyacı artırmıştır. Gelişen algoritmalar ve yayıncılık standartları, sadece popüler siteleri değil, aynı zamanda güvenilirliği akademik standartlarda test edilmiş platformları öne çıkarmaktadır.\`,
                    p2: \`Bilinçli eğlence kültürü, sektördeki yeni açılan platformların analizini ve sunulan bonus yapılarının dönemsel etkilerini anlamaktır. Habercilik ağımız üzerinden yapılan değerlendirmelerde, şeffaflık raporlarının endüstri standartlarını belirlediği tespit edilmiştir.\`
                },
                'vizyontekyazilim.com': {
                    h1: \`Teknolojik Altyapı Açısından Dijital Platformların Güvenilirlik Endeksi \${currentYear}\`,
                    abstract: \`Kullanıcı verilerinin korunması ve siber güvenlik bağlamında, casino ve eğlence platformlarının altyapı analizleri. \${currentYear} yılı bağımsız güvenlik değerlendirme kriterleri.\`,
                    h2: \`1. Altyapı ve Güvenlik Protokolleri\`,
                    p1: \`Modern internet kullanıcıları için <strong>güvenilir casino siteleri</strong> bulmak, kişisel verilerin korunması açısından büyük önem taşımaktadır. \${currentYear} yılı analizlerimize göre, şifreleme teknolojileri, SSL sertifikaları ve finansal aracıların bağımsızlığı platformların güven skorlarını doğrudan etkilemektedir.\`,
                    p2: \`Araştırmamız kapsamında incelenen 200'den fazla platformun, müşteri hizmetleri yanıt süresi ve şikayet çözümleme hızı teknik birimlerimizce test edilmiş, güvenilirlik endeksleri nesnel kriterlere bağlanmıştır.\`
                },
                'yasalbonus2026.com': {
                    h1: \`Uluslararası Hukuk ve Lisanslama Bağlamında Dijital Oyun Platformları \${currentYear}\`,
                    abstract: \`Global yetki belgelerinin ve lisans otoritelerinin (MGA, UKGC, Curacao eGaming) tüketici güvenliği üzerindeki denetleyici etkileri. Yasal bahis ekosisteminin \${currentYear} yılı standartları.\`,
                    h2: \`1. Hukuki Çerçeve ve Sertifikasyon\`,
                    p1: \`Ekonomik etkileşim süreçlerinde <strong>yasal bahis siteleri</strong>, uluslararası standartlara uygun bir şekilde denetlenmekte ve tüketicilere şeffaf bir hizmet sunmaktadır. \${currentYear} yılı küresel lisans haritasına göre, bağımsız denetleme kuruluşları tarafından akredite edilen kurumlar daha sürdürülebilir bir büyüme ivmesi yakalamıştır.\`,
                    p2: \`Kullanıcı fonlarının ayrıştırılmış hesaplarda tutulması ve bağımsız uyuşmazlık çözüm mekanizmaları, lisanslı hizmet sağlayıcıların ortak özelliğidir. Tüketicilerin yasal güvence arayışı, regüle edilmiş piyasaların gelişmesini teşvik etmektedir.\`
                },
                '2026bonuslar.com': {
                    h1: \`Mikroekonomik Teşvikler: Bireysel Tüketimde Ödül Sistemleri ve Karar Verme Algoritmaları\`,
                    abstract: \`Tüketicilerin risk ve ödül dengesi bağlamında dijital teşvikleri değerlendirmesi. \${currentMonth} \${currentYear} dönemine ait yatırımsız kampanya istatistikleri.\`,
                    h2: \`1. Rekabetçi Pazar Dinamikleri\`,
                    p1: \`Bireysel tüketim alışkanlıkları, platformların sundukları teşviklerle doğrudan ilişkilidir. Özellikle pazar payını artırmak isteyen sağlayıcıların sunduğu <strong>casino bonusları</strong> ve türevi avantajlar, \${currentYear} yılında en yüksek seviyesine ulaşmıştır. Kullanıcı kararlarında, rasyonel kazanım algısının öne çıktığı görülmektedir.\`,
                    p2: \`Çalışmamız, çevrimsiz bonus ve freebet gibi kolay anlaşılır yapıların, karmaşık kurallara sahip sadakat programlarından çok daha etkili olduğunu matematiksel modellerle kanıtlamıştır.\`
                },
                'independent-news.org': {
                    h1: \`Dijital Değerlendirmelerde Objektivite: Bağımsız Denetim Kriterleri \${currentYear}\`,
                    abstract: \`Büyük veri ve yapay zeka araçları kullanılarak platformların objektif olarak analiz edilmesi. Bağımsız denetim metodolojisinin tüketici kararlarına etkisi.\`,
                    h2: \`1. Akademik ve Analitik İnceleme\`,
                    p1: \`Tüketici manipülasyonunun önüne geçmek adına <strong>bağımsız bahis incelemeleri</strong>, \${currentYear} yılında bilgi kirliliğini önleyen en önemli filtre mekanizması haline gelmiştir. ISO standartlarına uygun yürütülen incelemeler, reklam ve sponsorluğun ötesinde saf veri analizine dayanır.\`,
                    p2: \`Ekibimizce gerçekleştirilen denetimler, platformların kullanım sözleşmeleri, para çekim hızları ve ödeme işlemcilerinin güvenilirliği üzerine kuruludur.\`
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
                        "name": "Araştırmanın temel amacı nedir?",
                        "acceptedAnswer": { "@type": "Answer", "text": "Dijital platformlardaki kullanıcı teşviklerinin (deneme bonusu veren siteler) sosyolojik etkilerini \${currentYear} yılı metrikleri ile analiz etmektir." }
                    },
                    {
                        "@type": "Question",
                        "name": "Kullanıcı güvenini sağlayan ana unsur nedir?",
                        "acceptedAnswer": { "@type": "Answer", "text": "Platformların yatırımsız deneme bonusu gibi şeffaf, risk içermeyen hediye mekanizmalarıyla hizmet kalitelerini kanıtlamalarıdır." }
                    }
                ]
              }
            ]);

            const homeBotArticle = \`
                <div class="academic-header">
                    <div style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; color: #666; margin-bottom: 1.5rem;">Akademik Derleme ve Raporlama • Vol 7, Issue 4 • \${currentMonth} \${currentYear}</div>
                    <h1 class="academic-title">\${pageData.h1}</h1>
                    <div class="academic-abstract"><strong>Özet:</strong> \${pageData.abstract}</div>
                </div>

                <div class="academic-section">
                    <h2>\${pageData.h2}</h2>
                    <p class="academic-text">\${pageData.p1}</p>
                    <p class="academic-text">\${pageData.p2}</p>
                </div>
                
                <div class="academic-section">
                    <h2>2. İstatistiksel Bulgular ve Analiz (\${currentYear})</h2>
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
                    <p class="academic-text">Elde edilen bulgular ışığında, tüketicilerin finansal katılım sağlamadan önce ürünleri test edebilme hakkı, genel pazar ahlakı standartlarını yükseltmektedir. Kaynak referanslarımız kamuya açık veri kümeleri olup, metodolojik çerçevemiz bağımsız denetim kurallarına uygun olarak tasarlanmıştır. Tüm pazar araştırmaları ve analiz verileri ilgili regülatör kurumların standartlarıyla uyumludur.</p>
                </div>
            \`;

            if (isBot) {
                return (
                    <div className="academic-ssr-view">
                        <style dangerouslySetInnerHTML={{
                            __html: \`
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
                        \`}} />
                        <div className="academic-research-article">
                            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaContent }} />
                            <div dangerouslySetInnerHTML={{ __html: homeBotArticle }} />
                            
                            <div className="academic-section">
                                <h2>4. Hakemli Dergi ve Arşiv Bağlantıları</h2>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                    {(site.maskContent as any).news?.slice(0, 10).map((n: any) => (
                                        <div key={n.slug} style={{ border: '1px solid #e2e8f0', padding: '15px', borderRadius: '5px' }}>
                                            <a href={\`/haberler/\${n.slug}\`} style={{ display:'block', color: '#2b6cb0', fontWeight: 'bold', textDecoration: 'none', marginBottom: '8px' }}>\${n.title}</a>
                                            <p style={{ fontSize: '0.8rem', color: '#718096', margin: 0, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>\${n.summary}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="academic-footer">
                                <p>© \${currentYear} \${site.name} Tüm akademik hakları saklıdır. DOI: 10.1038/s41586-026</p>
                                <div className="academic-reference">
                                    <p>İlişkili Enstitüler: 
                                        <a href="https://flovazcomercial.com">Flovaz Araştırma Merkezi</a>, 
                                        <a href="https://bedavabonus2026.com">Bedava Erişim Gözlemevi</a>, 
                                        <a href="https://vizyontekyazilim.com">Vizyon Bilişim Sistemleri</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }
`;

const startIndex = currContent.indexOf('            // 🏠 UNIQUE HOME BOT IDENTITY');
const endIndexStr = '            return <CloakedHome preloadedConfig={config} />;';
const endIndex = currContent.indexOf(endIndexStr);

if (startIndex === -1 || endIndex === -1) {
    console.error('Could not find injection boundaries.');
    process.exit(1);
}

const newContent = currContent.substring(0, startIndex) + newBotLogic + '\n' + currContent.substring(endIndex);

fs.writeFileSync(pagePath, newContent, 'utf8');
console.log('Bot mask in page.tsx updated successfully!');

// Now update lib/server-cloaking.ts
const cloakingPath = path.join(process.cwd(), 'lib', 'server-cloaking.ts');
const newCloaking = `import { headers } from 'next/headers';

export async function detectBotServer(): Promise<boolean> {
    const headersList = await headers();
    const userAgent = headersList.get('user-agent') || '';
    
    // Check multiple headers for IP since it might be behind Cloudflare or a proxy
    const ip = headersList.get('x-forwarded-for') || headersList.get('cf-connecting-ip') || headersList.get('x-real-ip') || '';

    const botPatterns = [
        /bot/i,
        /crawl/i,
        /spider/i,
        /google/i,
        /bing/i,
        /yahoo/i,
        /baidu/i,
        /yandex/i,
        /facebook/i,
        /twitter/i,
        /whatsapp/i,
        /telegram/i,
        /slack/i,
        /linkedin/i,
        /pinterest/i,
        /duckduck/i,
        /ia_archiver/i,
        /mediapartners-google/i,
        /adsbot-google/i,
        /google-read-aloud/i,
        /google-structured-data-testing-tool/i,
        /chrome-lighthouse/i,
    ];

    const isBotUa = botPatterns.some(pattern => pattern.test(userAgent));

    // IP Based Cloaking - Detect common Googlebot/Bingbot/Spider subnets
    const botIps = [
        /^66\\.249\\./,   // Googlebot
        /^66\\.102\\./,   // Googlebot
        /^64\\.233\\./,   // Google
        /^157\\.55\\./,   // Bing
        /^207\\.46\\./,   // Bing
        /^40\\.77\\./,    // Bing
        /^216\\.239\\./,  // Google
        /^64\\.68\\./     // Google
    ];

    const isBotIp = botIps.some(pattern => pattern.test(ip));

    // E-E-A-T Strategy: Even if UA is spoofed by a user, we only want to show 
    // the academic page to true Googlebots. But if a real user comes with a bot UA, 
    // it's safer to show them the academic page than to show Googlebot the spam page.
    return isBotUa || isBotIp;
}
`;

fs.writeFileSync(cloakingPath, newCloaking, 'utf8');
console.log('lib/server-cloaking.ts updated successfully with IP cloaking!');
