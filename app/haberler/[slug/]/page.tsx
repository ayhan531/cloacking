import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { detectBotServer } from "@/lib/server-cloaking";
import MaskSite from "@/components/MaskSite";
import CloakedHome from "@/components/CloakedHome";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const headersList = await headers();
    const domain = (headersList.get("host") || "").split(':')[0].replace('www.', '');

    try {
        const site = await prisma.site.findUnique({ where: { domain } });
        if (site) {
            const mask = typeof site.maskContent === 'string' ? JSON.parse(site.maskContent) : site.maskContent;
            const article = mask.news?.find((n: any) => n.slug === slug);
            if (article) {
                return {
                    title: `${article.title} - ${site.name} Analiz`,
                    description: article.summary,
                };
            }
        }
    } catch (e) { }
    return { title: "Haber Detayları - 2026 Analiz" };
}

export default async function NewsDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const headersList = await headers();
    const domain = (headersList.get("host") || "").split(':')[0].replace('www.', '');
    const isBot = await detectBotServer();

    try {
        const site = await prisma.site.findUnique({ where: { domain } });

        if (site) {
            const maskContent = typeof site.maskContent === 'string' ? JSON.parse(site.maskContent) : site.maskContent;
            const article = maskContent.news?.find((n: any) => n.slug === slug);

            if (article) {
                // Return MaskSite even for real users if it's a subpage (to keep disguise)
                // OR show betting if it's a special landing page. For now, news = always mask.
                const config = {
                    ...site,
                    maskContent: {
                        ...maskContent,
                        heroTitle: article.title,
                        heroSubtitle: article.summary,
                        botArticle: `
                            <article style="padding: 40px; background: white; color: #333; line-height: 1.8; font-size: 18px;">
                                <h1 style="font-size: 36px; color: #000; margin-bottom: 20px;">${article.title}</h1>
                                <p style="font-weight: bold; font-style: italic; color: #666; margin-bottom: 30px;">${article.summary}</p>
                                <div style="margin-bottom: 40px;">${article.content}</div>
                                <hr/>
                                <p>İlgili Terimler: deneme bonusu veren siteler 2026, bedava bonus, bahis altyapı analizleri.</p>
                            </article>
                        `
                    },
                    bettingContent: typeof site.bettingContent === 'string' ? JSON.parse(site.bettingContent) : site.bettingContent,
                    cloakingRules: typeof site.cloakingRules === 'string' ? JSON.parse(site.cloakingRules) : site.cloakingRules,
                    seoSettings: typeof site.seoSettings === 'string' ? JSON.parse(site.seoSettings) : site.seoSettings,
                };

                // Even real users see the "News Article" on this route to maintain legitimacy
                return (
                    <div className="min-h-screen bg-white">
                        <MaskSite config={config as any} />
                        {/* We can still have hidden cloaking triggers here if needed */}
                    </div>
                );
            }
        }
    } catch (error) {
        console.error("News Detail Error:", error);
    }

    return <CloakedHome />;
}
