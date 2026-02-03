import CloakedHome from "@/components/CloakedHome";
import MaskSite from "@/components/MaskSite";
import { detectBotServer } from "@/lib/server-cloaking";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import type { SiteConfig } from "@/lib/types";

export default async function Home() {
  const headersList = await headers();
  const host = headersList.get("host") || "";
  const domain = host.split(':')[0];
  const isBot = await detectBotServer();

  try {
    const site = await prisma.site.findUnique({
      where: { domain },
    });

    if (site) {
      const config: SiteConfig = {
        id: site.id,
        name: site.name,
        domain: site.domain,
        maskType: site.maskType as any,
        maskContent: JSON.parse(site.maskContent),
        bettingContent: JSON.parse(site.bettingContent),
        cloakingRules: JSON.parse(site.cloakingRules),
        seoSettings: JSON.parse(site.seoSettings),
        isActive: site.isActive,
        createdAt: site.createdAt,
        updatedAt: site.updatedAt,
      };

      // If it's a bot, render MaskSite server-side for maximum SEO impact
      if (isBot) {
        return <MaskSite config={config} />;
      }

      // If it's not a bot, let the client-side CloakedHome handle it (for mobile/country detection)
      return <CloakedHome />;
    }
  } catch (error) {
    console.error("Home Page Server Error:", error);
  }

  // Fallback to CloakedHome which will show the 404 state if config is missing
  return <CloakedHome />;
}

