import CloakedHome from "@/components/CloakedHome";
import MaskSite from "@/components/MaskSite";
import { detectBotServer } from "@/lib/server-cloaking";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import type { SiteConfig } from "@/lib/types";

export default async function Home() {
  let domain = "";
  try {
    const headersList = await headers();
    const host = headersList.get("host") || "";
    // Clean port and handle www
    domain = host.split(':')[0].replace('www.', '');
    const isBot = await detectBotServer();

    const site = await prisma.site.findUnique({
      where: { domain },
    });

    if (site) {
      const maskContent = typeof site.maskContent === 'string' ? JSON.parse(site.maskContent) : site.maskContent;

      // 🏠 UNIQUE HOME BOT IDENTITY
      const homeBotArticle = `
          <div class="home-master-report p-8 bg-slate-900 text-white rounded-[40px] mb-10 shadow-2xl relative overflow-hidden">
            <div class="absolute top-0 right-0 p-4">
                <span class="flex h-3 w-3">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
            </div>
            <h2 class="text-3xl font-black mb-6 uppercase">${site.name} 2026: KURUMSAL MERKEZ VE STRATEJİK ANALİZ</h2>
            <div class="live-update-line mb-6 text-emerald-400 font-mono text-xs font-black tracking-widest uppercase italic">
                >> SERVER STATUS: OPTIMAL // LAST RE-SCAN: ${new Date().toLocaleDateString('tr-TR')} ${new Date().toLocaleTimeString('tr-TR')}
            </div>
            <p class="text-slate-300 leading-relaxed">${site.name} olarak, 2026 dijital risk haritasının ana merkezindesiniz. Bu ana sayfa, tüm alt departmanlarımızın (Deneme Bonusu Analiz, Bahis Güvenlik, Casino Protokolleri) yönetim merkezidir.</p>
            <div class="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/10">
              <div><span class="block text-2xl font-black text-emerald-400">99.9%</span><span class="text-xs text-slate-500 uppercase font-black">Güven Endeksi</span></div>
              <div><span class="block text-2xl font-black text-blue-400">24/7</span><span class="text-xs text-slate-500 uppercase font-black">Aktif Tarama</span></div>
              <div><span class="block text-2xl font-black text-purple-400">LIVE</span><span class="text-xs text-slate-500 uppercase font-black">Data Feed</span></div>
            </div>
            <div class="mt-8 flex gap-4 text-[10px] font-black uppercase tracking-tighter text-slate-500">
                <span>Bot Linkleri:</span>
                <a href="/deneme-bonusu" class="hover:text-white">/Deneme-Bonusu</a>
                <a href="/bahis-siteleri" class="hover:text-white">/Bahis-Siteleri</a>
                <a href="/haberler" class="hover:text-white">/Teknoloji-Haberleri</a>
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

