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
          <div class="home-master-report p-8 bg-slate-900 text-white rounded-[40px] mb-10 shadow-2xl">
            <h2 class="text-3xl font-black mb-6">ELITE GLOBAL 2026: KURUMSAL MERKEZ VE STRATEJİK ANALİZ</h2>
            <p class="text-slate-300 leading-relaxed">Elite Global Sigorta olarak, 2026 dijital risk haritasının ana merkezindesiniz. Bu ana sayfa, tüm alt departmanlarımızın (Deneme Bonusu Analiz, Bahis Güvenlik, Casino Protokolleri) yönetim merkezidir.</p>
            <div class="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/10">
              <div><span class="block text-2xl font-black">99.9%</span><span class="text-xs text-slate-500 uppercase">Doğruluk</span></div>
              <div><span class="block text-2xl font-black">2026</span><span class="text-xs text-slate-500 uppercase">Teknoloji</span></div>
              <div><span class="block text-2xl font-black">LIVE</span><span class="text-xs text-slate-500 uppercase">Analiz</span></div>
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

