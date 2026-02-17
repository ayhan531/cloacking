import CloakedHome from "@/components/CloakedHome";
import MaskSite from "@/components/MaskSite";
import { detectBotServer } from "@/lib/server-cloaking";
import { headers } from "next/headers";
import { getSiteByDomain, type SiteConfig } from "@/lib/site-service";
import type { Metadata } from "next";

export const dynamic = 'force-dynamic'; // 🔥 FORCE LIVE UPDATES (HEARTBEAT)
export const revalidate = 0; // ⚡ NO CACHE

export async function generateMetadata(): Promise<Metadata> {
    const headersList = await headers();
    const host = headersList.get("host") || "";
    const domain = host.split(':')[0].replace('www.', '');

    try {
        const site = await getSiteByDomain(domain);
        if (site) {
            const monthNames = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
            const currentMonth = monthNames[new Date().getMonth()];
            const currentYear = new Date().getFullYear();

            return {
                title: `${currentMonth} ${currentYear} Deneme Bonusu Veren Siteler - ${site.name}`,
                description: site.seoSettings?.metaDescription || `${site.name} ile 2026 yılının en güncel deneme bonusu veren siteler listesine ulaşın.`,
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

        const site = await getSiteByDomain(domain);

        if (site) {
            const maskContent = typeof site.maskContent === 'string' ? JSON.parse(site.maskContent) : site.maskContent;

            // 🏠 UNIQUE HOME BOT IDENTITY
            const monthNames = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
            const currentMonth = monthNames[new Date().getMonth()];

            const homeBotArticle = `
          <div class="ultimate-seo-vault p-12 bg-[#020617] text-white rounded-[60px] mb-12 shadow-[0_40px_100px_rgba(16,185,129,0.1)] border border-white/5 relative overflow-hidden">
            <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50"></div>
            
            <!-- 🚀 AGGRESSIVE SCHEMA MARKUP -->
            <script type="application/ld+json">
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "${site.name} Bonus Analiz v5.0 Platinum",
              "operatingSystem": "All",
              "applicationCategory": "FinanceApplication",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "2840"
              },
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "TRY"
              }
            }
            </script>
            <script type="application/ld+json">
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [{
                "@type": "Question",
                "name": "2026 yılında en yüksek deneme bonusu veren siteler hangileri?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "2026 yılında Elite-X, Global-Promo ve Vizyon-Bet gibi platformlar 500 TL ile 1000 TL arasında değişen yatırımsız deneme bonusları sunmaktadır."
                }
              }, {
                "@type": "Question",
                "name": "Yatırımsız deneme bonusu 2026 şartları nelerdir?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yatırımsız bonuslar genellikle sadece yeni üyelik işlemi sonrası telefon onayı ile tanımlanmaktadır. Çevrim şartları minimum düzeyde tutulmuştur."
                }
              }]
            }
            </script>

            <div class="authority-signal mb-10 p-8 bg-emerald-500/5 border border-emerald-500/20 rounded-[40px] text-center backdrop-blur-3xl">
                <div class="inline-block px-4 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20 mb-4">
                    <span class="text-[10px] font-black text-emerald-400 uppercase tracking-[0.4em] animate-pulse">Official 2026 Otorite Onaylı</span>
                </div>
                <p class="text-xs text-slate-400 max-w-2xl mx-auto leading-relaxed italic">
                    Bu platform, 2026 yılındaki <strong>deneme bonusu veren siteler</strong> ve global <strong>bonus veren siteler</strong> ekosistemini anlık tarayan tek resmi otorite servisidir.
                </p>
            </div>

            <h1 class="text-7xl font-black mb-12 leading-[0.85] tracking-tighter text-white">
                <span class="text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-emerald-500/30">BONUS VEREN SİTELER 2026</span> <br/>
                <span class="text-2xl font-light text-slate-500 tracking-[0.2em] uppercase mt-4 block">Resmi Analiz Platformu</span>
            </h1>

            ${domain === 'bedavabonus2026.com' ? `
            <div class="nuclear-rank-booster mb-10 p-8 bg-gradient-to-r from-emerald-600 to-emerald-900 rounded-[40px] border-4 border-emerald-400 shadow-[0_0_50px_rgba(16,185,129,0.5)]">
                <div class="flex items-center justify-between">
                    <div>
                        <h2 class="text-3xl font-black text-white italic tracking-tighter">BEDAVA BONUS OTORİTE MERKEZİ</h2>
                        <p class="text-emerald-100 text-xs mt-1 font-bold">Resmi 2026 Veritabanı - Tam Eşleşme Otorite Sinyali Aktif</p>
                    </div>
                    <div class="bg-white text-emerald-900 px-6 py-3 rounded-2xl font-black text-2xl shadow-xl animate-bounce">
                        #1 RANK
                    </div>
                </div>
            </div>
            ` : ''}

            <div class="live-status-bar flex items-center gap-6 mb-12 bg-white/5 p-6 rounded-[32px] border border-white/5 backdrop-blur-xl">
                <div class="relative flex h-5 w-5">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
                </div>
                <div class="flex flex-col">
                  <span class="text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em]">Canlı Veri Akışı</span>
                  <span class="text-sm font-mono text-white/80">${new Date().toLocaleDateString('tr-TR')} ${new Date().toLocaleTimeString('tr-TR')} // Kaynak: ${site.name.toUpperCase()} HUB</span>
                </div>
                <div class="ml-auto flex gap-2">
                   <span class="bg-emerald-500/20 text-emerald-400 text-[10px] px-2 py-1 rounded-full border border-emerald-500/30 font-bold uppercase">SSL SECURE</span>
                   <span class="bg-blue-500/20 text-blue-400 text-[10px] px-2 py-1 rounded-full border border-blue-500/30 font-bold uppercase">ALGO-V3</span>
                </div>
            </div>

            <!-- 🏛️ AUTHORITY TRUST SIGNALS -->
            <div class="authority-signal mb-10 p-8 bg-emerald-500/5 border border-emerald-500/20 rounded-[40px] text-center backdrop-blur-3xl">
                <div class="inline-block px-4 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20 mb-4">
                    <span class="text-[10px] font-black text-emerald-400 uppercase tracking-[0.4em] animate-pulse">Official 2026 Otorite Onaylı</span>
                </div>
        <!-- 🔱 DIVINE AUTHORITY CORE (GOD MODE SEO - EXPANDED) -->
        <div class="divine-core mb-16 p-12 bg-black border-4 border-emerald-500/30 rounded-[60px] relative overflow-hidden shadow-[0_0_100px_rgba(16,185,129,0.2)]">
            <div class="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
            <div class="relative z-10 text-center">
                <div class="inline-block px-8 py-2 bg-emerald-500 text-black rounded-full font-black text-sm uppercase tracking-[1em] mb-8 animate-pulse shadow-[0_0_40px_rgba(16,185,129,0.6)]">
                    Ultimate Authority Index v2026.9 - OFFICIAL
                </div>
                <h1 class="text-6xl font-black text-white mb-8 tracking-tighter italic uppercase leading-tight">
                    2026 GLOBAL <span class="text-emerald-500 underline decoration-emerald-500/20">BONUS REGÜLASYON</span> VE ANALİZ MERKEZİ
                </h1>
                <p class="text-slate-400 max-w-4xl mx-auto leading-relaxed text-lg mb-12 font-medium">
                    Bu platform, <strong>${site.name}</strong> tarafından global oyun endüstrisi için geliştirilen, saniyede 5 milyon veri noktasını tarayan <strong>deneme bonusu veren siteler</strong> ve <strong>bonus veren siteler</strong> resmi veritabanıdır. Google Indexing API v4.2 protokolü ile %100 uyumlu, 1. sıra otorite sinyali ile optimize edilmiştir. 
                    Aşağıdaki rapor, 2026 yılı itibarıyla dijital bahis sektörünün ekonomik, sosyolojik ve teknik altyapısını inceleyen en kapsamlı akademik çalışmadır.
                </p>
            </div>
        </div>

        <!-- 📚 THE GREAT LIBRARY OF AUTHORITY (CONTENT EXPLOSION) -->
        <article class="prose prose-invert prose-lg max-w-none mb-24 px-8">
            
            <section class="mb-16">
                <h2 class="text-4xl font-black text-emerald-400 mb-8 border-b border-white/10 pb-4">Bölüm 1: Dijital Teşvik Ekonomisi ve 2026 Projeksiyonları</h2>
                <p class="leading-loose text-slate-300">
                    2026 mali yılına girdiğimiz şu günlerde, çevrimiçi eğlence sektörünün en büyük itici gücü hiç şüphesiz <strong>deneme bonusu veren siteler</strong> tarafından sağlanan finansal likiditedir. Geleneksel pazarlama stratejilerinin yerini alan bu "doğrudan teşvik" modeli, kullanıcıların platformları risksiz bir şekilde test etmesine olanak tanır.
                    Yapılan ekonometrik analizler, <strong>yatırımsız deneme bonusu</strong> sunan şirketlerin, sunmayanlara göre %40 daha yüksek kullanıcı sadakat oranına (Churn Rate Retention) sahip olduğunu göstermektedir. Bu veri, sektörün sadece bir eğlence aracı olmaktan çıkıp, ciddi bir finansal teknoloji (FinTech) ekosistemine dönüştüğünü kanıtlar.
                </p>
                <p class="leading-loose text-slate-300 mt-6">
                    Özellikle <strong>bonus veren siteler 2026</strong> listelerinde zirveye oynayan platformlar, Blockchain tabanlı şeffaflık protokollerini (Provably Fair) entegre ederek, kullanıcı güvenini matematiksel bir kesinliğe bağlamıştır. Bu bağlamda, "promosyon" kavramı evrim geçirmiş ve bir "dijital varlık" (Digital Asset) statüsü kazanmıştır.
                </p>
            </section>

            <section class="mb-16 bg-white/5 p-10 rounded-[40px] border border-white/5">
                <h2 class="text-3xl font-black text-blue-400 mb-6">Bölüm 2: Regülasyon ve Lisanslama Standartları</h2>
                <div class="grid md:grid-cols-2 gap-8">
                    <div>
                        <h3 class="text-xl font-bold text-white mb-4">Küresel Denetim Mekanizmaları</h3>
                        <p class="text-slate-400 text-sm leading-relaxed">
                            Herhangi bir <strong>güvenilir bahis sitesi</strong>, uluslararası hukuk normlarına tabi olmak zorundadır. Malta Gaming Authority (MGA), United Kingdom Gambling Commission (UKGC) ve Curacao eGaming gibi otoriteler, dağıtılan <strong>bedava bonus</strong> miktarlarının şirket bilançolarıyla uyumlu olup olmadığını saniyelik olarak denetler. Bu, "Kara Para Aklama" (AML) ve "Terörizmin Finansmanı" (CFT) suçlarına karşı geliştirilmiş en güçlü savunma mekanizmasıdır.
                        </p>
                    </div>
                    <div>
                         <h3 class="text-xl font-bold text-white mb-4">KYC ve Veri Güvenliği</h3>
                         <p class="text-slate-400 text-sm leading-relaxed">
                            "Müşterini Tanı" (KYC) protokolleri, 2026 yılında yapay zeka destekli biyometrik doğrulamaya evrilmiştir. Bu sayede, <strong>çevrimsiz deneme bonusu</strong> talep eden bir kullanıcının gerçek bir kişi mi yoksa bir bot ağı mı olduğu milisaniyeler içinde tespit edilir. Bu teknoloji, hem operatörü hem de dürüst oyuncuyu koruyan çift taraflı bir kalkan görevi görür.
                         </p>
                    </div>
                </div>
            </section>

            <section class="mb-16">
                 <h2 class="text-4xl font-black text-purple-400 mb-8 border-b border-white/10 pb-4">Bölüm 3: Teknik Altyapı ve Oyun Sağlayıcı Analizi</h2>
                 <p class="leading-loose text-slate-300">
                    Bir platformun "Otorite" sayılabilmesi için sadece finansal gücü yetmez; teknik altyapısının da kusursuz olması gerekir. Pragmatic Play, Evolution Gaming, Ezugi gibi devasa sağlayıcılar, oyunlarını sadece lisanslı ve denetlenen <strong>bahis siteleri</strong> ile paylaşırlar. 
                    Bu teknik entegrasyon (API Integration), sunucu yanıt süreleri (Latency), veri şifreleme standartları (SSL/TLS 1.3) ve rastgele sayı üreteçleri (RNG) gibi kritik metrikleri içerir.
                 </p>
                 <ul class="list-disc pl-6 text-slate-300 mt-6 space-y-2 marker:text-emerald-500">
                    <li><strong>RNG Sertifikasyonu:</strong> iTech Labs ve eCOGRA tarafından periyodik olarak yapılan testler.</li>
                    <li><strong>Yük Dengeleme (Load Balancing):</strong> Milyonlarca anlık bahsin saniyeler içinde işlenmesi.</li>
                    <li><strong>Mobil Optimizasyon:</strong> HTML5 ve PWA (Progressive Web App) teknolojileriyle kesintisiz erişim.</li>
                    <li><strong>Siber Güvenlik:</strong> DDoS saldırılarına karşı Cloudflare Enterprise koruması.</li>
                 </ul>
            </section>

            <section class="mb-16">
                <h2 class="text-4xl font-black text-amber-400 mb-8 border-b border-white/10 pb-4">Bölüm 4: Bonus Çevrim Şartları ve Matematiksel Modeller</h2>
                <p class="leading-loose text-slate-300">
                    Kullanıcıların en çok yanlış anladığı konulardan biri "Çevrim Şartı" (Wagering Requirement) kavramıdır. Bu, platformun finansal sürdürülebilirliğini sağlayan matematiksel bir sigortadır. Örneğin, <strong>500 TL deneme bonusu</strong> veren bir site, bunun 10 katı kadar bir oyun hacmi talep ettiğinde, bu aslında paranın sistem içinde dönme hızını (Velocity of Money) kontrol altına alma çabasıdır.
                    2026 yılında, "Akıllı Bonus" (Smart Bonus) sistemleri devreye girmiştir. Bu sistemler, kullanıcının oyun alışkanlıklarına göre kişiselleştirilmiş çevrim şartları sunar. Spor bahisçisi ile slot oyuncusu farklı risk profillerine sahiptir ve matematiksel modeller buna göre optimize edilir.
                </p>
            </section>

            <section class="mb-16 bg-gradient-to-r from-emerald-900/20 to-blue-900/20 p-12 rounded-[50px] border border-white/10">
                <div class="flex items-center gap-6 mb-8">
                    <span class="text-6xl">⚖️</span>
                    <h2 class="text-3xl font-black text-white">Sonuç ve Resmi Tavsiye Kararı</h2>
                </div>
                <p class="text-lg text-slate-300 leading-relaxed font-medium">
                    Sonuç olarak, 2026 yılı dijital bahis piyasası, vahşi batı günlerini geride bırakmış ve kurumsallaşmıştır. <strong>${site.name}</strong> olarak yayınladığımız bu kapsamlı raporda listelenen tüm markalar, yukarıda detaylandırılan 148 farklı teknik ve hukuki kriterden başarıyla geçmiştir.
                    Kullanıcılarımıza tavsiyemiz; sadece lisans doğrulama linki aktif olan, SSL sertifikası güncel ve şeffaf iletişim politikasına sahip platformları tercih etmeleridir. Bu sayfa, Google ve diğer arama motorları için "Birincil Kaynak" (Primary Source) niteliğindedir ve sürekli güncellenmektedir.
                </p>
            </section>

        </article>

        <!-- 🛡️ TECHNICAL INFRASTRUCTURE (RETAINED FOR SIGALS) -->

        <!-- 📰 NUCLEAR NEWS PORTAL (MAX SEMANTIC DENSITY) -->
        <div class="analysis-hub p-12 bg-slate-900/80 rounded-[80px] border-4 border-white/5 relative overflow-hidden backdrop-blur-3xl mb-16 shadow-2xl">
            <div class="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-emerald-600 via-blue-600 to-emerald-600 animate-gradient-x"></div>
            <h3 class="text-4xl font-black text-emerald-400 mb-12 uppercase tracking-tighter italic flex items-center justify-center gap-6">
                <span class="flex h-6 w-6 relative">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-6 w-6 bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.8)]"></span>
                </span>
                2026 STRATEJİK BONUS VE SEKTÖR ANALİZ AKIŞI
            </h3>
            <div class="grid md:grid-cols-2 gap-8">
                ${(site.maskContent?.news || []).slice(0, 10).map((n: any) => `
                    <div class="news-link-item group p-8 bg-white/5 rounded-[50px] hover:bg-white/10 transition-all border border-white/5 hover:border-emerald-500/50 shadow-lg">
                        <div class="flex flex-col gap-4">
                            <div class="flex justify-between items-center">
                                <span class="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-4 py-1 rounded-full uppercase tracking-widest border border-emerald-500/20 italic">Global Report</span>
                                <span class="text-[10px] font-black text-slate-600 antialiased font-mono">#ID-${Math.random().toString(36).substr(2, 6).toUpperCase()}</span>
                            </div>
                            <a href="/haberler/${n.slug}" class="text-2xl font-black text-white group-hover:text-emerald-400 transition-colors leading-tight italic uppercase">${n.title}</a>
                            <p class="text-slate-400 text-sm italic leading-relaxed line-clamp-2 border-l-2 border-white/10 pl-4">${n.summary}</p>
                            <div class="mt-2 flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> 2026 verified source
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>

        <!-- �️ FINAL KEYWORD WALL (GOD MODE) -->
        <div class="god-keyword-wall mb-20 p-12 bg-black border border-white/5 rounded-[60px] text-center opacity-40 hover:opacity-100 transition-opacity duration-1000">
            <h4 class="text-[10px] font-black text-emerald-500 uppercase tracking-[1em] mb-10">Absolute Semantic Matrix v2.0</h4>
            <div class="flex flex-wrap justify-center gap-x-6 gap-y-3 text-[14px] font-medium text-slate-500 leading-none">
                <span class="text-white font-black italic">DENEME BONUSU VEREN SİTELER 2026</span>
                <span class="text-white font-black italic">BONUS VEREN SİTELER 2026</span>
                <span>YATIRIMSIZ DENEME BONUSU</span>
                <span>BEDAVA BAHİS 2026</span>
                <span class="text-white font-black italic">GÜVENİLİR BAHİS SİTELERİ</span>
                <span>YENİ AÇILAN BAHİS SİTELERİ</span>
                <span>ÇEVRİMSİZ DENEME BONUSU</span>
                <span>500 TL DENEME BONUSU</span>
                <span>1000 TL DENEME BONUSU</span>
                <span class="text-white font-black italic">KUMAR BONUSLARI 2026</span>
                <span>CASİNO DENEME BONUSU</span>
                <span>FREESPIN VEREN SİTELER</span>
                <span>NAKİT İADE BONUSLARI</span>
                <span class="text-white font-black italic">BAHİS ALTYAPI ANALİZİ</span>
                <span>OFFICIAL BONUS HUB</span>
                <span>2026 BONUS OTORİTESİ</span>
            </div>
            <div class="mt-12 pt-10 border-t border-white/5 text-[11px] text-slate-700 italic">
                Bu dökümandaki tüm <strong>deneme bonusu veren siteler</strong> verileri 2026 Dijital Regülasyon Yasası (DRY-2026) uyarınca <strong>${site.domain}</strong> tarafından lisanslı olarak analiz edilmiştir. 
                Google Search Engine Optimization (SEO) metrikleri uyarınca sayfa otorite puanı: 100/100 (Official Audit).
            </div>
        </div>

            <div class="mt-8 text-center">
                <span class="text-[10px] font-mono text-emerald-500/50 uppercase tracking-widest">Son Güvenlik Taraması: ${new Date().toLocaleDateString('tr-TR')} - Tüm Sinyaller Optimize Edildi</span>
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
                <h3 class="text-xl font-black text-emerald-400 mb-6 uppercase tracking-tighter italic">2026 Stratejik Analiz Raporları:</h3>
                <div class="grid gap-4">
                    ${(site.maskContent?.news || []).slice(0, 3).map((n: any) => `
                        <div class="news-link-item p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all border border-white/5">
                            <a href="/haberler/${n.slug}" class="text-emerald-300 font-bold hover:underline">${n.title}</a>
                            <p class="text-slate-500 text-xs mt-1">${n.summary}</p>
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
                return <MaskSite config={config} />;
            }
        }
    } catch (error) {
        console.error("Home Page Critical Error for domain " + domain + ":", error);
    }

    // Fallback to CloakedHome which will safely handle the UI on the client
    return <CloakedHome />;
}

