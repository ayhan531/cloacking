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
            const seo = site.seoSettings ? (typeof site.seoSettings === 'string' ? JSON.parse(site.seoSettings) : site.seoSettings) : {};
            // Use specific keyword title if available, otherwise fallback
            let title = `${slug.replace(/-/g, ' ')} | ${site.name} 2026`;
            if (slug === 'deneme-bonusu') {
                title = `2026 Deneme Bonusu Veren Siteler - ${site.name} İncelemesi`;
            }

            return {
                title: title,
                description: seo.metaDescription || "2026 deneme bonusu veren siteler rehberi.",
                alternates: {
                    canonical: `https://${domain}/${slug}`,
                },
                openGraph: {
                    title: title,
                    url: `https://${domain}/${slug}`,
                }
            };
        }
    } catch (e) {
        console.error("Metadata slug error:", e);
    }

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
            let maskContent = site.maskContent ? (typeof site.maskContent === 'string' ? JSON.parse(site.maskContent) : site.maskContent) : {};

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

            // 🚀 EXTREME DIFFERENTIATION FOR BOTS
            let slugTopic = slug.replace(/-/g, ' ').toUpperCase();
            let specificArticle = "";

            if (slug === 'deneme-bonusu') {
                specificArticle = `
                    <div class="slug-specific-report p-6 bg-slate-50 rounded-3xl border border-slate-200">
                        <h3 class="text-2xl font-black text-slate-900 mb-4">2026 Deneme Bonusu Teknik Analiz Raporu</h3>
                        <p class="text-slate-600 mb-4">Bu rapor, 2026 yılı başında Türkiye pazarında aktif olan <strong>yatırımsız deneme bonusu</strong> veren platformların altyapı güvenliğini incelemektedir. <strong>${site.name}</strong> teknik ekibi olarak, SSL sertifika derinliği ve ödeme katmanlarını saniyeler içinde doğrulayan algoritmalarımızla en güvenilir listeyi hazırladık.</p>
                        <ul class="list-disc pl-5 text-slate-600 space-y-2">
                            <li><strong>Altyapı Güvenliği:</strong> Betconstruct ve EveryMatrix altyapılarının 2026 yamaları doğrulanmıştır.</li>
                            <li><strong>Lisans Durumu:</strong> Curacao eGaming ve MGA lisanslarının anlık aktiflik kontrolü.</li>
                            <li><strong>Kullanıcı Puanı:</strong> 2026 yılının ilk çeyreğinde en yüksek çekim hızı puanına sahip firmalar.</li>
                        </ul>
                    </div>
                `;
            } else if (slug === 'bahis-siteleri') {
                specificArticle = `
                    <div class="slug-specific-report p-6 bg-indigo-50 rounded-3xl border border-indigo-100">
                        <h3 class="text-2xl font-black text-indigo-900 mb-4">2026 En Güvenilir Bahis Platformları Karşılaştırması</h3>
                        <p class="text-indigo-800/80 mb-4"><strong>${site.name}</strong> analistleri tarafından hazırlanan bu rehber, 2026 yüksek oranlı bahis sitelerinin finansal şeffaflık raporlarını içermektedir. Global bahis regülasyonlarına göre puanlanan siteler, yatırım hızı ve müşteri hizmetleri kalitesine göre sıralanmıştır.</p>
                    </div>
                `;
            } else {
                specificArticle = `
                    <div class="slug-specific-report p-6 bg-slate-50 rounded-3xl border border-slate-200">
                        <h3 class="text-2xl font-black text-slate-900 mb-4">${slugTopic} 2026 Derinlemesine İnceleme</h3>
                        <p class="text-slate-600">${site.name} editörleri tarafından hazırlanan bu özel incelemede, 2026 ${slugTopic} standartları ve kullanıcı deneyimi analiz edilmektedir.</p>
                    </div>
                `;
            }

            const botArticle = `
                <section class="bot-unique-page-identity py-12 border-b border-slate-100">
                    <h1 class="text-4xl font-extrabold text-slate-950 mb-6">${maskContent.heroTitle}</h1>
                    <div class="prose max-w-none text-slate-800">
                        ${specificArticle}
                        <div class="mt-8 pt-8 border-t border-slate-200">
                            ${site.seoSettings ? (JSON.parse(site.seoSettings).hiddenSEOArticle || '') : ''}
                        </div>
                    </div>
                </section>
            `;

            const config: SiteConfig = {
                id: site.id,
                name: site.name,
                domain: site.domain,
                maskType: site.maskType as any,
                maskContent: {
                    ...maskContent,
                    botArticle: botArticle
                },
                bettingContent: site.bettingContent ? (typeof site.bettingContent === 'string' ? JSON.parse(site.bettingContent) : site.bettingContent) : {},
                cloakingRules: site.cloakingRules ? (typeof site.cloakingRules === 'string' ? JSON.parse(site.cloakingRules) : site.cloakingRules) : {},
                seoSettings: site.seoSettings ? (typeof site.seoSettings === 'string' ? JSON.parse(site.seoSettings) : site.seoSettings) : {},
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
