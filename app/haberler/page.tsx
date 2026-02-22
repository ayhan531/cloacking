
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import type { SiteConfig, NewsItem } from "@/lib/types";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, User, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export async function generateMetadata(): Promise<Metadata> {
    const headersList = await headers();
    const host = headersList.get("host") || "";
    const domain = host.split(':')[0].replace('www.', '');

    try {
        const site = await prisma.site.findUnique({
            where: { domain },
        });

        if (site) {
            const seo = JSON.parse(site.seoSettings);
            return {
                title: `Haberler ve Duyurular - ${seo.metaTitle || site.name}`,
                description: "En son haberler, güncellemeler ve duyurular.",
                alternates: {
                    canonical: `https://${domain}/haberler`,
                },
            };
        }
    } catch (e) { }

    return {
        title: "Haberler",
    };
}

export default async function NewsPage() {
    const headersList = await headers();
    const host = headersList.get("host") || "";
    const domain = host.split(':')[0].replace('www.', '');

    let news: NewsItem[] = [];
    let siteName = "";
    let colorScheme = {
        primary: '#3b82f6',
        secondary: '#1d4ed8',
        accent: '#f59e0b',
        background: '#ffffff',
        text: '#1e293b'
    };

    try {
        const site = await prisma.site.findUnique({
            where: { domain },
            select: { name: true, maskContent: true }
        });

        if (site) {
            const maskContent = JSON.parse(site.maskContent);
            if (maskContent.news) {
                news = maskContent.news;
            }
            siteName = site.name;
            if (maskContent.colorScheme) {
                colorScheme = maskContent.colorScheme;
            }
        }
    } catch (error) {
        console.error("News Page Error:", error);
    }

    // Dummy data if no news exists (for demonstration/SEO structure)
    if (news.length === 0) {
        news = [
            {
                id: "1",
                title: "2026 Yılı Bonus Trendleri ve Beklentiler",
                slug: "2026-bonus-trendleri",
                summary: "Yeni yılda bahis ve casino dünyasında beklenen bonus trendleri ve kullanıcıları nelerin beklediğine dair kapsamlı bir inceleme.",
                content: "<p>2026 yılı, online bahis ve casino sektörü için devrim niteliğinde yeniliklerin beklendiği bir yıl olacak...</p>",
                date: "2026-01-15",
                author: "Editör Ekibi",
                tags: ["Bonus", "2026", "Trendler"]
            },
            {
                id: "2",
                title: "Güvenilir Bahis Siteleri Nasıl Seçilir?",
                slug: "guvenilir-bahis-siteleri-secimi",
                summary: "Lisanslı ve güvenilir bahis sitelerini ayırt etmenin püf noktaları. Nelere dikkat etmeli, hangi kriterler önemli?",
                content: "<p>Bahis severlerin en çok zorlandığı konulardan biri güvenilir site bulmaktır...</p>",
                date: "2026-02-01",
                author: "Uzman Analist",
                tags: ["Güvenlik", "Rehber"]
            },
            {
                id: "3",
                title: "Deneme Bonusu Veren Siteler Listesi Güncellendi",
                slug: "deneme-bonusu-veren-siteler-2026",
                summary: "Yatırımsız deneme bonusu veren en yeni siteler listemize eklendi. Avantajlı fırsatları kaçırmayın.",
                content: "<p>Deneme bonusları, kullanıcıların siteyi risk almadan test etmesi için harika bir fırsattır...</p>",
                date: "2026-02-05",
                author: "Haber Merkezi",
                tags: ["Deneme Bonusu", "Fırsatlar"]
            }
        ];
    }

    return (
        <div className="min-h-screen font-sans bg-slate-50" style={{
            '--primary': colorScheme.primary,
            '--secondary': colorScheme.secondary,
            '--accent': colorScheme.accent,
        } as any}>
            {/* Simple Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/" className="text-2xl font-black text-slate-900 tracking-tight">
                        {siteName || "Ana Sayfa"}
                    </Link>
                    <nav className="hidden md:flex gap-8">
                        <Link href="/" className="text-slate-600 hover:text-[var(--primary)] font-medium transition">Ana Sayfa</Link>
                        <Link href="/haberler" className="text-[var(--primary)] font-medium transition">Haberler</Link>
                    </nav>
                </div>
            </header>

            <main className="py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16 space-y-4">
                        <h1 className="text-5xl font-black text-slate-900 tracking-tight">Haberler ve İçerikler</h1>
                        <p className="text-xl text-slate-500 max-w-2xl mx-auto">Sektördeki son gelişmeler, analizler ve rehber içeriklerimiz.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {news.map((item) => (
                            <Link href={`/haberler/${item.slug}`} key={item.id} className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                {item.image ? (
                                    <div className="h-56 overflow-hidden relative">
                                        <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                                    </div>
                                ) : (
                                    <div className="h-56 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center group-hover:from-[var(--primary)] group-hover:to-[var(--secondary)] transition-colors duration-500">
                                        <span className="text-slate-400 group-hover:text-white/80 font-bold text-4xl">News</span>
                                    </div>
                                )}

                                <div className="p-8 flex-1 flex flex-col">
                                    <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(item.date).toLocaleDateString('tr-TR')}</span>
                                        {item.tags && item.tags.length > 0 && (
                                            <>
                                                <span>•</span>
                                                <span className="text-[var(--primary)]">{item.tags[0]}</span>
                                            </>
                                        )}
                                    </div>

                                    <h2 className="text-2xl font-bold text-slate-900 mb-4 leading-tight group-hover:text-[var(--primary)] transition-colors line-clamp-2">
                                        {item.title}
                                    </h2>

                                    <p className="text-slate-500 mb-6 line-clamp-3 text-sm leading-relaxed flex-1">
                                        {item.summary}
                                    </p>

                                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-100">
                                        <span className="text-sm font-bold text-slate-900 group-hover:text-[var(--primary)] transition-colors flex items-center gap-2">
                                            Devamını Oku <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>

            <footer className="bg-slate-900 py-12 text-center">
                <p className="text-slate-500">© 2026 {siteName}. Tüm hakları saklıdır.</p>
            </footer>
        </div>
    );
}
