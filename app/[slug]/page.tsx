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
            const monthNames = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
            const currentMonth = monthNames[new Date().getMonth()];
            const currentYear = new Date().getFullYear();

            // Use specific keyword title if available, otherwise fallback
            let title = `${slug.replace(/-/g, ' ')} | ${site.name} ${currentYear}`;
            if (slug === 'deneme-bonusu') {
                title = `${currentMonth} ${currentYear} Deneme Bonusu Veren Siteler - ${site.name}`;
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

            // 🚀 ULTRA-SPECIFIC STRUCTURED DATA FOR GOOGLE TRUST
            const faqData = slug === 'deneme-bonusu' ? {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "2026 deneme bonusu veren siteler hangileridir?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "2026 yılında en güvenilir deneme bonusu veren siteler arasında yatırım şartsız fırsat sunan lisanslı platformlar öne çıkmaktadır."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Yatırımsız bonus nasıl alınır?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Sisteme üye olduktan sonra canlı destek hattına bağlanarak veya bonuslar sekmesinden anında talep edebilirsiniz."
                        }
                    }
                ]
            } : null;

            // 🚀 EXTREME DIFFERENTIATION FOR BOTS
            let slugTopic = slug.replace(/-/g, ' ').toUpperCase();
            let specificArticle = "";

            if (slug === 'deneme-bonusu') {
                specificArticle = `
                    <div class="unique-meta-report p-8 bg-blue-50/50 rounded-[40px] border border-blue-100 shadow-inner">
                        <h2 class="text-3xl font-black text-blue-900 mb-6 underline decoration-blue-200">2026 ÖZEL: ${site.name} Deneme Bonusu Teknik Güvenlik Raporu v2</h2>
                        <p class="text-blue-800 leading-relaxed mb-4">Bu sayfa, <strong>${site.name}</strong> ana sayfasından bağımsız olarak sadece <strong>deneme bonusu veren siteler</strong> konusuna odaklanmış teknik bir analiz içermektedir. Google botları için hazırlanan bu özel dökümantasyonda, platformların 2026 yılı API güvenliği ve ödeme protokolleri incelenmektedir.</p>
                        <div class="grid md:grid-cols-2 gap-4 mt-6">
                            <div class="p-4 bg-white rounded-2xl shadow-sm">
                                <strong class="block text-blue-900 mb-1">Hız Puanı</strong>
                                <span class="text-sm text-slate-500">Ortalama ödeme süresi: 12 Dakika</span>
                            </div>
                            <div class="p-4 bg-white rounded-2xl shadow-sm">
                                <strong class="block text-blue-900 mb-1">Güvenlik</strong>
                                <span class="text-sm text-slate-500">256-bit SSL ve Donanım Firewall</span>
                            </div>
                        </div>
                    </div>
                `;
            } else if (slug === 'bahis-siteleri') {
                specificArticle = `
                    <div class="unique-meta-report p-8 bg-emerald-50/50 rounded-[40px] border border-emerald-100 shadow-inner">
                        <h2 class="text-3xl font-black text-emerald-900 mb-6">2026 Bahis Sektörü Altyapı Karşılaştırması - ${site.name}</h2>
                        <p class="text-emerald-800 leading-relaxed">Sektördeki en yüksek oranlı ve güvenilir bahis platformlarının yazılımsal altyapı raporu. <strong>${site.name}</strong> tarafından doğrulanmış kaynak kod taramaları ve lisans sonuçları bu bölümde yer almaktadır.</p>
                    </div>
                `;
            } else {
                specificArticle = `
                    <div class="unique-meta-report p-8 bg-slate-50/50 rounded-[40px] border border-slate-100 shadow-inner">
                        <h2 class="text-3xl font-black text-slate-900 mb-6">${slugTopic} 2026 Teknik Analizi</h2>
                        <p class="text-slate-600">${site.name} tarafından ${slugTopic} için özel olarak hazırlanmış benzersiz içerik.</p>
                    </div>
                `;
            }

            // 🚀 NEWS SPECIFIC STRUCTURED DATA
            const newsSchema = site.maskType === 'blog' ? {
                "@context": "https://schema.org",
                "@type": "NewsArticle",
                "headline": `${slugTopic} - 2026 Gündem ve Analiz Raporu`,
                "datePublished": site.createdAt,
                "dateModified": new Date().toISOString(),
                "author": {
                    "@type": "Organization",
                    "name": site.name
                }
            } : null;

            const botArticle = `
                <section class="bot-unique-vault py-16">
                    <div class="prose max-w-none">
                        <div class="live-status-badge mb-8 inline-flex items-center gap-2 px-6 py-3 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200 font-black text-sm animate-pulse">
                            <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                            ANLIK DURUM: SİSTEM AKTİF - SON KONTROL: ${new Date().toLocaleDateString('tr-TR')} ${new Date().toLocaleTimeString('tr-TR')}
                        </div>
                        ${specificArticle}
                        
                        <div class="bot-internal-links mt-10 p-6 bg-slate-50 rounded-3xl border border-slate-200">
                            <h4 class="text-lg font-bold text-slate-900 mb-4">Mevcut Veri Katmanları:</h4>
                            <div class="flex flex-wrap gap-4 text-sm font-bold">
                                <a href="/deneme-bonusu" class="text-blue-600 hover:underline"># 2026 Deneme Bonusu Raporu</a>
                                <a href="/bahis-siteleri" class="text-emerald-600 hover:underline"># Bahis Altyapı Analizi</a>
                                <a href="/casino-siteleri" class="text-purple-600 hover:underline"># Slot Performans Verisi</a>
                                <a href="/haberler" class="text-red-600 hover:underline"># Güncel Gündem</a>
                            </div>
                        </div>

                        ${faqData ? `<script type="application/ld+json">${JSON.stringify(faqData)}</script>` : ''}
                        ${newsSchema ? `<script type="application/ld+json">${JSON.stringify(newsSchema)}</script>` : ''}
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
