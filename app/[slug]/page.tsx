import CloakedHome from "@/components/CloakedHome";
import MaskSite from "@/components/MaskSite";
import { detectBotServer } from "@/lib/server-cloaking";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import type { SiteConfig } from "@/lib/types";

export default async function SlugPage() {
    let domain = "";
    try {
        const headersList = await headers();
        const host = headersList.get("host") || "";
        domain = host.split(':')[0].replace('www.', '');
        const isBot = await detectBotServer();

        const site = await prisma.site.findUnique({
            where: { domain },
        });

        if (site) {
            const config: SiteConfig = {
                id: site.id,
                name: site.name,
                domain: site.domain,
                maskType: site.maskType as any,
                maskContent: typeof site.maskContent === 'string' ? JSON.parse(site.maskContent) : site.maskContent,
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
        console.error("Slug Page Critical Error:", error);
    }

    return <CloakedHome />;
}
