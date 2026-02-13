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
          <div class="home-rank-vault p-10 bg-slate-950 text-white rounded-[50px] mb-12 shadow-[0_0_50px_rgba(16,185,129,0.1)] border border-emerald-500/10">
            <h1 class="text-4xl font-black mb-8 leading-tight tracking-tighter">
                <span class="text-emerald-400">#1</span> ${currentMonth} ${currentYear} DENEME BONUSU VEREN SİTELER ANALİZ VE GÜNCEL LİSTE
            </h1>

            <div class="live-status-bar flex items-center gap-4 mb-8 bg-emerald-500/5 p-4 rounded-2xl border border-emerald-500/20">
                <div class="relative flex h-3 w-3">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </div>
                <span class="text-xs font-mono font-black text-emerald-400 uppercase tracking-widest">
                    Canlı Tarama: ${new Date().toLocaleDateString('tr-TR')} // Kaynak: ${site.name.toUpperCase()} AI-SCANNER
                </span>
            </div>

            <p class="text-slate-400 leading-relaxed text-lg mb-10">
                2026 yılının en çok beklenen <strong>deneme bonusu veren siteler</strong> listesi, ${site.name} laboratuvarlarında titizlikle incelenmiştir. 
                Bu rehber, <em>yatırımsız deneme bonusu</em>, çevrimsiz bedava bahis ve 2026'nın en yüksek oranlı promosyonlarını tek bir tabloda sunar. 
                Sistemimiz, <strong>deneme bonusu 2026</strong> aramalarında size en güvenilir ve siber güvenlikten geçmiş platformları saniyeler içinde listeler.
            </p>

            <!-- 📊 GOOGLE RANKING TABLE (LSI keywords focus) -->
            <div class="ranking-table-wrapper overflow-hidden rounded-3xl border border-white/5 bg-white/5 p-1 mb-10">
                <table class="w-full text-sm text-left">
                    <thead class="bg-white/5 text-[10px] uppercase font-black text-slate-500">
                        <tr>
                            <th class="p-4">PLATFORM</th>
                            <th class="p-4">BONUS MİKTARI</th>
                            <th class="p-4">ŞART</th>
                            <th class="p-4">GÜVEN PUANI</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-white/5">
                        <tr class="hover:bg-white/5 transition-colors">
                            <td class="p-4 font-bold text-white italic">Elite-X 2026</td>
                            <td class="p-4"><span class="bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded">500 TL</span></td>
                            <td class="p-4 text-slate-400">Yatırımsız</td>
                            <td class="p-4 text-emerald-400">⭐⭐⭐⭐⭐ 4.9/5</td>
                        </tr>
                        <tr class="hover:bg-white/5 transition-colors">
                            <td class="p-4 font-bold text-white italic">Global-Promo</td>
                            <td class="p-4"><span class="bg-blue-500/20 text-blue-400 px-2 py-1 rounded">250 TL + 50 FS</span></td>
                            <td class="p-4 text-slate-400">Çevrimsiz</td>
                            <td class="p-4 text-blue-400">⭐⭐⭐⭐⭐ 4.8/5</td>
                        </tr>
                        <tr class="hover:bg-white/5 transition-colors">
                            <td class="p-4 font-bold text-white italic">Vizyon-Bet</td>
                            <td class="p-4"><span class="bg-purple-500/20 text-purple-400 px-2 py-1 rounded">1000 TL Hoşgeldin</span></td>
                            <td class="p-4 text-slate-400">Üyelik Özel</td>
                            <td class="p-4 text-purple-400">⭐⭐⭐⭐ 4.7/5</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="footer-seo-cloud mt-10 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div class="group">
                    <span class="block text-xl font-black text-white group-hover:text-emerald-400 transition-colors">7/24</span>
                    <span class="text-[9px] text-slate-500 uppercase font-black tracking-widest">Canlı Destek</span>
                </div>
                <div class="group">
                    <span class="block text-xl font-black text-white group-hover:text-blue-400 transition-colors">15 DK</span>
                    <span class="text-[9px] text-slate-500 uppercase font-black tracking-widest">Hızlı Çekim</span>
                </div>
                <div class="group">
                    <span class="block text-xl font-black text-white group-hover:text-purple-400 transition-colors">AKTİF</span>
                    <span class="text-[9px] text-slate-500 uppercase font-black tracking-widest">Bonus Hattı</span>
                </div>
                <div class="group">
                    <span class="block text-xl font-black text-white group-hover:text-yellow-400 transition-colors">2026</span>
                    <span class="text-[9px] text-slate-500 uppercase font-black tracking-widest">Teknoloji</span>
                </div>
            </div>

            <div class="mt-8 flex flex-wrap gap-4 text-[10px] font-black uppercase text-slate-600">
                <span class="text-white/20 italic">Hızlı Navigasyon:</span>
                <a href="/deneme-bonusu" class="hover:text-emerald-400 underline decoration-emerald-500/20">deneme bonusu veren siteler 2026</a>
                <a href="/bahis-siteleri" class="hover:text-white">yatırımsız bedava bonus</a>
                <a href="/casino-siteleri" class="hover:text-white">çevrimsiz deneme bonusu</a>
                <a href="/hosgeldin-bonusu" class="hover:text-white">en yüksek bonus veren siteler</a>
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

