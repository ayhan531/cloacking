import CloakedHome from "@/components/CloakedHome";
import MaskSite from "@/components/MaskSite";
import { detectBotServer } from "@/lib/server-cloaking";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import type { SiteConfig } from "@/lib/types";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const headersList = await headers();
    const host = headersList.get("host") || "";
    const domain = host.split(':')[0].replace('www.', '');

    try {
        const site = await prisma.site.findUnique({
            where: { domain },
        });

        if (site) {
            const seo = JSON.parse(site.seoSettings);
            // Use specific keyword title if available, otherwise fallback
            let title = `${slug.replace(/-/g, ' ')} | ${site.name} 2026`;
            if (slug === 'deneme-bonusu') {
                title = `2026 Deneme Bonusu Veren Siteler - ${site.name} İncelemesi`;
            }

            return {
                title: title,
                description: seo.metaDescription,
                alternates: {
                    canonical: `https://${domain}/${slug}`,
                },
                openGraph: {
                    title: title,
                    url: `https://${domain}/${slug}`,
                }
            };
        }
    } catch (e) { }

    return {
        title: "Bonus Veren Siteler 2026",
        alternates: {
            canonical: `https://${domain}/${slug}`,
        }
    };
}
export default async function SlugPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
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
            let maskContent = typeof site.maskContent === 'string' ? JSON.parse(site.maskContent) : site.maskContent;

            // Customize content based on slug to avoid duplicate content penalty
            // Applies to ALL mask types (Corporate, News, Blog, etc.) to ensure unique SEO content
            if (slug) {
                if (slug === 'deneme-bonusu') {
                    maskContent = {
                        ...maskContent,
                        heroTitle: `${site.name}: 2026 Deneme Bonusu Fırsatları`,
                        heroSubtitle: `${site.name} güvencesiyle yatırım şartsız deneme bonusu veren en güncel ve güvenilir siteler listesi. 500 TL'ye varan bedava bahis fırsatları.`,
                        heroLink: "#liste",
                        heroLinkText: "Fırsatları İncele"
                    };
                } else if (slug === 'bahis-siteleri') {
                    maskContent = {
                        ...maskContent,
                        heroTitle: `${site.name} - En Güvenilir Bahis Siteleri 2026`,
                        heroSubtitle: `${site.name} editörleri tarafından seçilen yüksek oranlı, hızlı çekim garantili, lisanslı ve güvenilir bahis siteleri karşılaştırması ve incelemeleri.`,
                        heroLink: "#top10",
                        heroLinkText: "Top 10 Listesi"
                    };
                } else if (slug === 'casino-siteleri') {
                    maskContent = {
                        ...maskContent,
                        heroTitle: `${site.name} Canlı Casino ve Slot Dünyası`,
                        heroSubtitle: "En çok kazandıran slot oyunları, güvenilir canlı casino sağlayıcıları ve freespin veren siteler.",
                    };
                } else if (slug === 'hosgeldin-bonusu') {
                    maskContent = {
                        ...maskContent,
                        heroTitle: `${site.name} Özel %300 Hoşgeldin Bonusu`,
                        heroSubtitle: "İlk üyelik ve yatırıma özel yüksek oranlı bonuslar. Çevrim şartsız hoşgeldin paketleri.",
                    };
                } else {
                    // Default dynamic customization for unknown slugs
                    const formattedSlug = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
                    maskContent = {
                        ...maskContent,
                        heroTitle: `${site.name} - ${formattedSlug} İncelemesi`,
                        heroSubtitle: `2026 yılı ${formattedSlug} hakkında detaylı analizler, kullanıcı yorumları ve uzman görüşleri.`,
                    };
                }
            }

            const config: SiteConfig = {
                id: site.id,
                name: site.name,
                domain: site.domain,
                maskType: site.maskType as any,
                maskContent: maskContent,
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
