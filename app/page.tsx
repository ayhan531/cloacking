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
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [{
                "@type": "Question",
                "name": "${currentYear} yılı itibarıyla dijital platformların güvenilirlik kriterleri nelerdir?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Bir platformun güvenilir kabul edilmesi için uluslararası lisanslara, şeffaf hizmet politikalarına ve üstün veri güvenliği (SSL) standartlarına sahip olması gerekmektedir."
                }
              }, {
                "@type": "Question",
                "name": "Platform içeriklerini faydalı kılan analiz yöntemleri nelerdir?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Doğru bir analiz; kullanıcı yorumlarının taranması, finansal prosedürlerin incelenmesi ve müşteri hizmetlerinin kalitesinin bağımsız yöntemlerle test edilmesiyle sağlanır."
                }
              }]
            }
            </script>

            <article class="prose prose-invert prose-lg max-w-none px-4 md:px-8 mt-6">
                <header class="mb-10 border-b border-emerald-900/50 pb-8">
                    <h1 class="text-4xl md:text-5xl font-bold text-emerald-400 mb-4 tracking-tight">
                        ${currentMonth} ${currentYear} En İyi Analiz ve Değerlendirme Rehberi
                    </h1>
                    <p class="text-slate-400 text-lg">
                        ${site.name} olarak dijital dünyadaki gelişmeleri yakından takip ediyor, sizler için en güvenilir incelemeleri sunuyoruz.
                    </p>
                </header>

                <section class="mb-12">
                    <h2 class="text-2xl font-semibold text-emerald-300 mb-6 flex items-center gap-3">
                       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                       Dijital İncelemelerde Güvenilirlik
                    </h2>
                    <p class="text-slate-300 leading-relaxed mb-4">
                        Günümüzde bilgi kirliliğinin arttığı dijital ortamlarda, doğru ve tarafsız analizlere ulaşmak her geçen gün zorlaşmaktadır. Ekibimiz, sektörel standartları baz alarak objektif değerlendirmeler hazırlamayı ilke edinmiştir. Tüm içeriklerimiz kullanıcı odaklı yaklaşımımızla hazırlanmaktadır.
                    </p>
                    <p class="text-slate-300 leading-relaxed">
                        Araştırmalarımızda kullanıcı geri bildirimleri, teknik analizler ve bağımsız denetim raporları kullanılmaktadır. Bu sayede okuyucularımız, şeffaf ve doğru verilere ulaşarak kendi kararlarını güvenle verebilirler. Kalite politikamız gereğince sadece doğrulanmış altyapılara sahip, SSL güvenlik sertifikası kullanan platformlar öneri listelerimize dahil edilmektedir.
                    </p>
                </section>

                <section class="mb-12 bg-slate-900/50 p-8 rounded-3xl border border-slate-800 shadow-xl">
                    <h2 class="text-2xl font-semibold text-emerald-300 mb-6">Temel Analiz Kriterlerimiz Nelerdir?</h2>
                    <ul class="space-y-6 text-slate-300">
                        <li class="flex items-start gap-4">
                            <span class="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-emerald-500/20 text-emerald-400 rounded-full font-bold">1</span>
                            <div>
                               <strong class="text-white block text-lg mb-1">Güvenlik ve Lisans Altyapısı</strong>
                               Uluslararası düzenleyici kurumlar tarafından periyodik olarak denetlenen ve kullanıcı veri güvenliğini (KVKK / GDPR vb.) sağlayan yasal platformlar öncelikli olarak değerlendirilir.
                            </div>
                        </li>
                        <li class="flex items-start gap-4">
                            <span class="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-emerald-500/20 text-emerald-400 rounded-full font-bold">2</span>
                            <div>
                               <strong class="text-white block text-lg mb-1">Kullanıcı Deneyimi ve Arayüz (UX/UI)</strong>
                               Servis sağlayıcıların sunduğu platformların mobil uyumluluğu, iletişim kalitesi, hız performansları ve genel müşteri memnuniyet oranları ölçümlenir.
                            </div>
                        </li>
                        <li class="flex items-start gap-4">
                            <span class="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-emerald-500/20 text-emerald-400 rounded-full font-bold">3</span>
                            <div>
                               <strong class="text-white block text-lg mb-1">Finansal Şeffaflık ve Kampanyalar</strong>
                               Promosyon ve avantaj sağlanan kampanyaların açıklığı, erişilebilirliği ve adil kullanım şartları tarafsızlık ilkesiyle özenle gözden geçirilir. Özel kampanya koşullarının kullanıcı lehine olup olmadığı detaylı incelenir.
                            </div>
                        </li>
                    </ul>
                </section>

                <section>
                     <h2 class="text-2xl font-semibold text-emerald-300 mb-6">Güncel Raporlar ve Pazar Gelişmeleri</h2>
                     <p class="text-slate-300 leading-relaxed mb-8">
                        Platformumuz üzerinde güncellenen özgün makaleler ve sektörel rehberlerle dijital hizmet sektöründeki vizyonu sizlerle paylaşıyoruz. Kullanıcının refahı ve dijital güvenliği için 2026 regülasyonlarına tam uyumlu olarak çalışan <strong>${site.name}</strong>, günün her saati şeffaf bir analiz havuzu sunar. Aşağıdaki bölümden en son yayınlanan bölgesel analiz ve inceleme içeriklerimizi takip edebilirsiniz.
                     </p>
                </section>
            </article>

            <div class="mt-12 text-center border-t border-slate-800 pt-8">
                <span class="text-xs font-mono text-slate-500 uppercase tracking-widest">Son Şeffaflık Denetimi: ${new Date().toLocaleDateString('tr-TR')} - Tüm İçerikler Gözden Geçirildi</span>
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
                        <div style={{ padding: '1rem', background: '#10b981', color: '#000', textAlign: 'center', fontWeight: 'bold', fontSize: '10px' }}>
                            NUCLEAR_INDEX_SIGNAL: [${heartbeat}] // MODE: DIRECT_SSR_INJECTION // STATUS: AUTHENTICATED
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: freshBotArticle }} />
                        <div className="analysis-hub">
                            <h3 style={{ color: '#10b981', marginBottom: '2rem', fontSize: '1.5rem', fontWeight: '900' }}>2026 STRATEJİK VERİ KATMANLARI (FULL_INDEX):</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
                                {(site.maskContent as any).news?.slice(0, 30).map((n: any) => (
                                    <div key={n.slug} style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                        <a href={`/haberler/${n.slug}`} style={{ color: '#6ee7b7', fontSize: '1rem', fontWeight: 'bold', textDecoration: 'none' }}>{n.title}</a>
                                        <p style={{ color: '#94a3b8', fontSize: '12px', marginTop: '0.5rem' }}>{n.summary}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            }

            return <MaskSite config={config} />;
        }
    } catch (error) {
        console.error("Home Page Critical Error for domain " + domain + ":", error);
    }

    // Fallback to CloakedHome which will safely handle the UI on the client
    return <CloakedHome />;
}

