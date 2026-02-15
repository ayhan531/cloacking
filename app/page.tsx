import CloakedHome from "@/components/CloakedHome";
import MaskSite from "@/components/MaskSite";
import { detectBotServer } from "@/lib/server-cloaking";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import type { SiteConfig } from "@/lib/types";

import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host = headersList.get("host") || "";
  const domain = host.split(':')[0].replace('www.', '');
  const monthNames = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
  const currentMonth = monthNames[new Date().getMonth()];
  const currentYear = new Date().getFullYear();

  try {
    const site = await prisma.site.findUnique({ where: { domain } });
    if (site) {
      const seo = typeof site.seoSettings === 'string' ? JSON.parse(site.seoSettings) : site.seoSettings;
      return {
        title: `${currentMonth} ${currentYear} Deneme Bonusu Veren Siteler - ${site.name}`,
        description: seo.metaDescription || `${site.name} ile 2026 yılının en güncel deneme bonusu veren siteler listesine ulaşın.`,
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
    const currentYear = new Date().getFullYear();

    const site = await prisma.site.findUnique({
      where: { domain },
    });

    if (site) {
      const maskContent = typeof site.maskContent === 'string' ? JSON.parse(site.maskContent) : site.maskContent;

      // 🏠 UNIQUE HOME BOT IDENTITY
      const monthNames = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
      const currentMonth = monthNames[new Date().getMonth()];

      const homeBotArticle = `
          <div class="ultimate-seo-vault p-12 bg-slate-950 text-white rounded-[60px] mb-12 shadow-[0_0_80px_rgba(16,185,129,0.15)] border border-emerald-500/20">
            <!-- 🚀 AGGRESSIVE SCHEMA MARKUP -->
            <script type="application/ld+json">
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "${site.name} Bonus Analiz v4.0",
              "operatingSystem": "All",
              "applicationCategory": "FinanceApplication",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "1548"
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

            <h1 class="text-5xl font-black mb-10 leading-[1.1] tracking-tighter">
                <span class="text-emerald-400">#1</span> ${currentMonth} ${currentYear} <span class="text-emerald-500 uppercase">Deneme Bonusu Veren Siteler</span> - ANALİZ VE GÜNCEL LİSTE
            </h1>

            <div class="live-status-bar flex items-center gap-5 mb-10 bg-emerald-500/10 p-5 rounded-3xl border border-emerald-500/30">
                <div class="relative flex h-4 w-4">
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

            <p class="text-slate-300 leading-relaxed text-xl mb-12 font-medium italic">
                Arama motorları için en güncel rapor: <strong>${site.name}</strong>, 2026 yılının tüm <strong>deneme bonusu veren siteler</strong> veritabanını tarayarak en güvenli ve <em>yatırımsız deneme bonusu</em> seçeneklerini önünüze getiriyor. 
                Sistemimiz, <strong>bedava bonus</strong> avantajlarını saniyeler içinde analiz eden yapay zeka destekli bir protokole sahiptir. <strong>2026 deneme bonusu</strong> veren güvenilir platformlar listemiz günlük güncellenmektedir.
            </p>

            <!-- 📊 NUCLEAR RANKING TABLE 2026 -->
            <div class="ranking-table-wrapper overflow-hidden rounded-[40px] border border-white/10 bg-white/5 p-2 mb-12">
                <table class="w-full text-left">
                    <thead class="bg-emerald-500/10 text-[11px] uppercase font-black text-emerald-400/70">
                        <tr>
                            <th class="p-6">PLATFORM ADI</th>
                            <th class="p-6">PROMOSYON TUTARI</th>
                            <th class="p-6">YATIRIM ŞARTI</th>
                            <th class="p-6">ONAY DURUMU</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-white/10">
                        <tr class="hover:bg-emerald-500/5 transition-all">
                            <td class="p-6 font-black text-white italic text-lg leading-none">Elite-X Premium <br/><span class="text-[10px] text-emerald-400 opacity-50">#ONAYLI</span></td>
                            <td class="p-6"><div class="flex flex-col"><span class="text-emerald-400 font-black text-2xl">750 TL</span><span class="text-[10px] text-slate-500 uppercase">Bedava Bahis</span></div></td>
                            <td class="p-6"><span class="bg-slate-800 text-slate-300 px-3 py-1 rounded-full text-xs font-bold border border-white/5 uppercase">HİÇ YOK</span></td>
                            <td class="p-6 text-emerald-400 font-mono font-bold italic">GÜVENLİ ⭐⭐⭐⭐⭐</td>
                        </tr>
                        <tr class="hover:bg-emerald-500/5 transition-all">
                            <td class="p-6 font-black text-white italic text-lg leading-none">Global-Promo 2026 <br/><span class="text-[10px] text-emerald-400 opacity-50">#LİSANSLI</span></td>
                            <td class="p-6"><div class="flex flex-col"><span class="text-emerald-400 font-black text-2xl">500 TL</span><span class="text-[10px] text-slate-500 uppercase">Nakit İade</span></div></td>
                            <td class="p-6"><span class="bg-slate-800 text-slate-300 px-3 py-1 rounded-full text-xs font-bold border border-white/5 uppercase">ŞARTSIZ</span></td>
                            <td class="p-6 text-emerald-400 font-mono font-bold italic">LİSANSLI ⭐⭐⭐⭐⭐</td>
                        </tr>
                        <tr class="hover:bg-emerald-500/5 transition-all">
                            <td class="p-6 font-black text-white italic text-lg leading-none">Vizyon-Bet Pro <br/><span class="text-[10px] text-emerald-400 opacity-50">#GÜVENLİ</span></td>
                            <td class="p-6"><div class="flex flex-col"><span class="text-emerald-400 font-black text-2xl">1000 TL</span><span class="text-[10px] text-slate-500 uppercase">Bonus + FS</span></div></td>
                            <td class="p-6"><span class="bg-slate-800 text-slate-300 px-3 py-1 rounded-full text-xs font-bold border border-white/5 uppercase">YATIRIMSIZ</span></td>
                            <td class="p-6 text-emerald-400 font-mono font-bold italic">OTORİTE ⭐⭐⭐⭐⭐</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- 🌐 SEMANTIC LINK CLOUD (Google Love) -->
            <div class="semantic-container bg-white/5 p-8 rounded-[40px] border border-white/5 mb-12">
               <h3 class="text-xs font-black text-slate-500 uppercase tracking-widest mb-6">İlgili Aramalar & Otorite Bağlantıları</h3>
               <div class="flex flex-wrap gap-3">
                  <a href="/deneme-bonusu" class="px-4 py-2 bg-slate-800 rounded-2xl text-sm font-bold text-slate-300 hover:text-emerald-400 transition-colors">Deneme Bonusu Veren Siteler 2026</a>
                  <a href="/bahis-siteleri" class="px-4 py-2 bg-slate-800 rounded-2xl text-sm font-bold text-slate-300 hover:text-emerald-400 transition-colors">En İyi Bahis Siteleri 2026</a>
                  <a href="/casino-siteleri" class="px-4 py-2 bg-slate-800 rounded-2xl text-sm font-bold text-slate-300 hover:text-emerald-400 transition-colors">Yeni Casino Bonusları</a>
                  <a href="/hosgeldin-bonusu" class="px-4 py-2 bg-slate-800 rounded-2xl text-sm font-bold text-slate-300 hover:text-emerald-400 transition-colors">Yatırım Şartsız Deneme Bonusu</a>
                  <a href="/bedava-bonus" class="px-4 py-2 bg-slate-800 rounded-2xl text-sm font-bold text-slate-300 hover:text-emerald-400 transition-colors">Bedava Bonus Veren Siteler 2026</a>
                  <a href="/yeni-siteler" class="px-4 py-2 bg-slate-800 rounded-2xl text-sm font-bold text-slate-300 hover:text-emerald-400 transition-colors">Yeni Bahis Siteleri 2026</a>
                  <a href="/populer-bonus" class="px-4 py-2 bg-slate-800 rounded-2xl text-sm font-bold text-slate-300 hover:text-emerald-400 transition-colors">Bonus Veren Siteler 2026</a>
               </div>
            </div>

            <div class="faq-vault grid gap-6">
                <div class="q-card p-6 bg-slate-900/50 rounded-3xl border border-white/5">
                    <h4 class="text-emerald-400 font-black text-lg mb-2 underline italic">Soru: Deneme bonusu veren siteler 2026 listesi güvenilir mi?</h4>
                    <p class="text-slate-400 text-sm">Cevap: Evet, ${site.name} olarak listelediğimiz tüm platformlar 2026 siber güvenlik testlerinden geçmiş, finansal gücü yüksek ve anında ödeme yapan yasal altyapılı sitelerdir. <strong>Bedava bonus veren siteler 2026</strong> aramalarında her zaman en güvenilir sonuçları sunuyoruz.</p>
                </div>
            </div>
          </div>
      `;

      const config: SiteConfig = {
        id: site.id,
        name: site.name,
        domain: site.domain,
        maskType: site.maskType as any,
        maskContent: {
          ...maskContent,
          botArticle: homeBotArticle // Identity for Home
        },
        bettingContent: typeof site.bettingContent === 'string' ? JSON.parse(site.bettingContent) : site.bettingContent,
        cloakingRules: typeof site.cloakingRules === 'string' ? JSON.parse(site.cloakingRules) : site.cloakingRules,
        seoSettings: typeof site.seoSettings === 'string' ? JSON.parse(site.seoSettings) : site.seoSettings,
        isActive: site.isActive,
        createdAt: site.createdAt,
        updatedAt: site.updatedAt,
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

