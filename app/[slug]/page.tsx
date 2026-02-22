import CloakedHome from "@/components/CloakedHome";
import MaskSite from "@/components/MaskSite";
import { detectBotServer } from "@/lib/server-cloaking";
import { headers } from "next/headers";
import { getSiteByDomain } from "@/lib/site-service";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const headersList = await headers();
    const host = headersList.get("host") || "";
    const domain = host.split(':')[0].replace('www.', '');

    try {
        const site = await getSiteByDomain(domain);

        if (site) {
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
                description: site.seoSettings?.metaDescription || "2026 deneme bonusu veren siteler rehberi.",
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

        const site = await getSiteByDomain(domain);

        if (site) {
            let maskContent = site.maskContent;

            // Customize content based on slug to avoid duplicate content penalty
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
                    const formattedSlug = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
                    maskContent = {
                        ...maskContent,
                        heroTitle: `${site.name} - ${formattedSlug} İncelemesi`,
                        heroSubtitle: `2026 yılı ${formattedSlug} hakkında detaylı analizler, kullanıcı yorumları ve uzman görüşleri.`,
                    };
                }
            }

            // ... Structured Data Logic ...
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

            let slugTopic = slug.replace(/-/g, ' ').toUpperCase();
            let specificArticle = "";

            if (slug === 'deneme-bonusu') {
                specificArticle = `
                    <div class="p-8 bg-white rounded-[40px] border border-slate-100 shadow-sm">
                        <h2 class="text-3xl font-bold text-slate-800 mb-6">2026 ${site.name} Deneme Bonusu Analiz Rehberi</h2>
                        <p class="text-slate-600 leading-relaxed mb-4">Bu sayfa, <strong>${site.name}</strong> platformunun sağladığı incelemeler doğrultusunda <strong>deneme bonusu veren siteler</strong> hakkında güncel ve tarafsız bilgiler sunmaktadır. Ekibimiz, listelenen platformların güvenliğini, bonus avantajlarını ve ödeme süreçlerini hassasiyetle değerlendirir.</p>
                        <div class="grid md:grid-cols-2 gap-4 mt-6">
                            <div class="p-4 bg-slate-50 rounded-2xl">
                                <strong class="block text-slate-700 mb-1">Müşteri Memnuniyeti</strong>
                                <span class="text-sm text-slate-500">Kullanıcı yorumları ve şikayet çözüm hızları test edilmiştir.</span>
                            </div>
                            <div class="p-4 bg-slate-50 rounded-2xl">
                                <strong class="block text-slate-700 mb-1">Güvenilirlik Kriteri</strong>
                                <span class="text-sm text-slate-500">Tüm platformların geçerli lisans bilgileri doğrulanmıştır.</span>
                            </div>
                        </div>
                    </div>
                `;
            } else if (slug === 'bahis-siteleri') {
                specificArticle = `
                    <div class="p-8 bg-white rounded-[40px] border border-slate-100 shadow-sm">
                        <h2 class="text-3xl font-bold text-slate-800 mb-6">${site.name} Tavsiyeli En İyi Bahis Siteleri Listesi</h2>
                        <p class="text-slate-600 leading-relaxed mb-6">Sektördeki en yüksek oranlı ve güvenilir bahis platformlarının detaylı incelemesi. <strong>${site.name}</strong> uzmanları tarafından hazırlanan bu listede sadece kanıtlanmış bir geçmişe sahip olan platformlar yer bulmaktadır.</p>
                        
                        <div class="bg-slate-50 rounded-3xl p-6 border border-slate-100">
                            <h3 class="text-lg font-bold text-slate-800 mb-4">Öne Çıkan Özellikler</h3>
                            <ul class="list-disc pl-5 space-y-2 text-slate-600">
                                <li>Global standartlarda aktif lisans ve denetim</li>
                                <li>Sorunsuz ve hızlı finansal işlemler (Para çekme/yatırma)</li>
                                <li>Mobil uyumluluk ve kesintisiz canlı bahis altyapıları</li>
                            </ul>
                        </div>
                    </div>
                `;
            } else {
                specificArticle = `
                    <div class="p-8 bg-white rounded-[40px] border border-slate-100 shadow-sm">
                        <h2 class="text-3xl font-bold text-slate-800 mb-6">${slugTopic} 2026 Kapsamlı Değerlendirmesi</h2>
                        <p class="text-slate-600">${site.name} tarafından ${slugTopic} başlığı altında ziyaretçilerimiz için özenle derlenmiş faydalı bilgileri ve objektif yorumları bulabilirsiniz.</p>
                    </div>
                `;
            }

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
                <section class="bot-unique-vault py-10">
                    <div class="prose max-w-none">
                        ${specificArticle}
                        
                        <div class="mt-10 p-6 bg-slate-50 rounded-3xl border border-slate-200">
                            <h4 class="text-lg font-bold text-slate-900 mb-4">Popüler Konular:</h4>
                            <div class="flex flex-wrap gap-4 text-sm font-semibold">
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

            const config: any = {
                ...site,
                maskContent: {
                    ...maskContent,
                    botArticle: botArticle
                }
            };

            const currentYear = new Date().getFullYear();
            if (isBot) {
                return (
                    <div className="hub-optimized-ssr-view" style={{ background: '#f8fafc', color: '#1e293b', fontFamily: 'sans-serif' }}>
                        <style dangerouslySetInnerHTML={{
                            __html: `
                            .hub-optimized-ssr-view { min-height: 100vh; padding: 4rem 2rem; }
                            .bot-unique-vault { max-width: 900px; margin: 0 auto; background: white; padding: 3rem; border-radius: 40px; border: 1px solid #f1f5f9; }
                            .prose h2 { color: #1e293b; font-size: 2rem; font-weight: 700; margin-bottom: 1.5rem; }
                            .prose p { line-height: 1.8; color: #475569; margin-bottom: 1.5rem; }
                        `}} />
                        <div className="bot-unique-vault" dangerouslySetInnerHTML={{ __html: botArticle }} />
                        <div style={{ textAlign: 'center', marginTop: '3rem', color: '#94a3b8', fontSize: '0.875rem' }}>
                            {site.name} Bilgi Portalı &copy; {currentYear}
                        </div>
                    </div>
                );
            }
        }
    } catch (error) {
        console.error("Slug Page Critical Error:", error);
    }

    return <CloakedHome />;
}
