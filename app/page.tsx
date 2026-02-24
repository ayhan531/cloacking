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
            [
              {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [{
                  "@type": "Question",
                  "name": "2026 deneme bonusu veren siteler listesine nasıl güvenebilirim?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Tarafımızca hazırlanan 2026 listesi, platformların teknik altyapıları, kullanıcı ödeme performansları ve uluslararası lisans otoritelerinin (MGA, CEG) son güncellemeleri baz alınarak doğrulanmıştır."
                  }
                }, {
                  "@type": "Question",
                  "name": "Yatırımsız bonus veren siteler 2026 yılında aktif mi?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Evet, 2026 yılında birçok otorite portalı, kullanıcılarına ilk üyelik aşamasında yatırım şartı aramadan 100 TL ile 500 TL arasında değişen deneme bonusları sunmaktadır."
                  }
                }]
              },
              {
                "@context": "https://schema.org",
                "@type": "ItemList",
                "name": "2026 En İyi Deneme Bonusu Veren Siteler Listesi",
                "itemListElement": [
                  { "@type": "ListItem", "position": 1, "name": "Global Audit A+ Platform (500 TL Bonus)" },
                  { "@type": "ListItem", "position": 2, "name": "Secure Betting Hub (250 TL Nakit)" },
                  { "@type": "ListItem", "position": 3, "name": "Premium Slots Network (333 FreeSpin)" }
                ]
              }
            ]
            </script>

            <article class="prose prose-invert prose-lg max-w-none px-4 md:px-8 mt-6">
                <header class="mb-10 border-b border-emerald-900/50 pb-8">
                    <h1 class="text-4xl md:text-5xl font-black text-emerald-400 mb-4 tracking-tighter italic">
                        DENEME BONUSU VEREN SİTELER 2026 (Yatırımsız & Güncel Liste)
                    </h1>
                    <p class="text-slate-400 text-xl font-medium">
                        ${site.name} Otorite Raporu: ${currentMonth} ${currentYear} itibarıyla piyasadaki en yüksek deneme bonusu veren platformların teknik analizi ve tam listesi.
                    </p>
                </header>

                <section class="mb-12">
                    <h2 class="text-2xl font-bold text-emerald-300 mb-6 flex items-center gap-3 italic">
                        ⚡ 2026 GÜNCEL BONUS VE AVANTAJ MATRİSİ
                    </h2>
                    <div class="overflow-x-auto border border-white/5 rounded-3xl bg-black/40 p-4">
                        <table class="w-full text-left border-collapse">
                            <thead>
                                <tr class="border-b border-white/10">
                                    <th class="p-4 text-emerald-400 font-black">Platform segmenti</th>
                                    <th class="p-4 text-emerald-400 font-black">Bonus Miktarı</th>
                                    <th class="p-4 text-emerald-400 font-black">Durum</th>
                                </tr>
                            </thead>
                            <tbody class="text-slate-300">
                                <tr class="border-b border-white/5 hover:bg-white/5">
                                    <td class="p-4 font-bold">V-Audit Premium Ekosistemi</td>
                                    <td class="p-4 text-white">500 TL + 100 FS</td>
                                    <td class="p-4"><span class="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-1 rounded">AKTİF</span></td>
                                </tr>
                                <tr class="border-b border-white/5 hover:bg-white/5">
                                    <td class="p-4 font-bold">Global Gaming Network 2026</td>
                                    <td class="p-4 text-white">250 TL Nakit</td>
                                    <td class="p-4"><span class="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-1 rounded">AKTİF</span></td>
                                </tr>
                                <tr class="border-b border-white/5 hover:bg-white/5">
                                    <td class="p-4 font-bold">CyberSlot Otorite Portalı</td>
                                    <td class="p-4 text-white">333 FreeSpin</td>
                                    <td class="p-4"><span class="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-1 rounded">GÜNCEL</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <section class="mb-12">
                    <h2 class="text-2xl font-semibold text-emerald-300 mb-6 italic">2026 Deneme Bonusu Analiz Raporu</h2>
                    <p class="text-slate-300 leading-relaxed mb-4">
                        <strong>Deneme bonusu veren siteler 2026</strong> yılında, kullanıcıların yatırım yapmadan platformları test etmesi için sundukları avantajları genişletmiştir. Yapılan son denetimlerde, piyasadaki şeffaflık oranının arttığı ve kullanıcı odaklı kampanyaların ön plana çıktığı gözlemlenmiştir. 
                    </p>
                    <p class="text-slate-300 leading-relaxed">
                        Sektörel gelişim raporlarına göre, 2026 itibarıyla listemizde yer alan tüm platformlar, yüksek güvenlik protokollerine (SSL 4.0) ve anlık ödeme garantilerine sahiptir. Yatırımsız deneme bonusları, kullanıcıların dijital oyun dünyasına güvenli bir giriş yapmasını sağlamak amacıyla optimize edilmiştir.
                    </p>
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
                <span class="text-xs font-mono text-slate-500 uppercase tracking-widest">NUCLEAR_SEO_SIGNAL: [VERIFIED] // LAST_PUSH: ${new Date().toLocaleDateString('tr-TR')} // ALGORITHM_V6</span>
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

