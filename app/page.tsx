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
          <div class="home-master-report p-8 bg-slate-900 text-white rounded-[40px] mb-10 shadow-2xl relative overflow-hidden">
            <div class="absolute top-0 right-0 p-4">
                <span class="flex h-3 w-3">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
            </div>
            <h1 class="text-3xl font-black mb-6 uppercase">${currentMonth} ${currentYear} DENEME BONUSU VEREN SİTELER VE ANALİZ MERKEZİ</h1>
            <div class="live-update-line mb-6 text-emerald-400 font-mono text-xs font-black tracking-widest uppercase italic border-y border-emerald-900/50 py-2">
                >> TARAMA DURUMU: AKTİF // KONU: ${currentMonth} ${currentYear} GÜNCEL DENEME BONUSU // VERİ KAYNAĞI: ${site.name.toUpperCase()}
            </div>
            <p class="text-slate-300 leading-relaxed text-lg">
              <strong>${site.name}</strong> analistleri tarafından hazırlanan bu raporda, 2026 yılının en güvenilir <strong>deneme bonusu veren siteler</strong> listesi teknik detaylarıyla incelenmektedir. 
              Sistemimiz, her gün binlerce platformu <em>bedava bonus</em>, yatırım şartı ve çekim hızı kriterlerine göre tarar.
              ${currentMonth} ${currentYear} itibarıyla onaylanmış en yüksek <strong>deneme bonusu 2026</strong> fırsatları bu merkez üzerinden dağıtılmaktadır.
            </p>
            <div class="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/10">
              <div><span class="block text-2xl font-black text-emerald-400">99.9%</span><span class="text-xs text-slate-500 uppercase font-black">Güven Skoru</span></div>
              <div><span class="block text-2xl font-black text-blue-400">${Math.floor(Math.random() * 5000) + 10000}</span><span class="text-xs text-slate-500 uppercase font-black">Anlık Tarama</span></div>
              <div><span class="block text-2xl font-black text-purple-400">SSL-v3</span><span class="text-xs text-slate-500 uppercase font-black">Güvenlik</span></div>
            </div>
            <div class="mt-8 flex flex-wrap gap-4 text-[11px] font-black uppercase tracking-tighter text-slate-400">
                <span class="text-white">Hızlı Rapor:</span>
                <a href="/deneme-bonusu" class="text-emerald-400 hover:underline">/Yatırımsız-Bonus-2026</a>
                <a href="/bahis-siteleri" class="text-blue-400 hover:underline">/Güvenilir-Bahis-Sirleri</a>
                <a href="/casino-siteleri" class="text-purple-400 hover:underline">/Slot-Analizleri</a>
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

