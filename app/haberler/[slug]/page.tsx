
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import type { NewsItem } from "@/lib/types";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Tag, Share2 } from "lucide-react";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const headersList = await headers();
    const host = headersList.get("host") || "";
    const domain = host.split(':')[0].replace('www.', '');

    try {
        const site = await prisma.site.findUnique({
            where: { domain },
            select: { maskContent: true }
        });

        if (site) {
            const maskContent = JSON.parse(site.maskContent);
            const newsItem = maskContent.news?.find((n: any) => n.slug === slug);

            if (newsItem) {
                return {
                    title: newsItem.title,
                    description: newsItem.summary,
                    alternates: {
                        canonical: `https://${domain}/haberler/${slug}`,
                    },
                    openGraph: {
                        title: newsItem.title,
                        description: newsItem.summary,
                        url: `https://${domain}/haberler/${slug}`,
                        images: newsItem.image ? [newsItem.image] : [],
                    }
                };
            }
        }
    } catch (e) { }

    return {
        title: "Haber Detayı",
    };
}

import { detectBotServer } from "@/lib/server-cloaking";

export default async function NewsDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const headersList = await headers();
    const host = headersList.get("host") || "";
    const domain = host.split(':')[0].replace('www.', '');
    const isBot = await detectBotServer();

    let newsItem: NewsItem | null = null;
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
            siteName = site.name;
            if (maskContent.colorScheme) {
                colorScheme = maskContent.colorScheme;
            }
            if (maskContent.news) {
                newsItem = maskContent.news.find((n: any) => n.slug === slug) || null;
            }
        }
    } catch (error) {
        console.error("News Detail Error:", error);
    }

    // Fallback Dummy Data for specific slugs
    if (!newsItem) {
        const dummyNews = [
            {
                id: "1",
                title: "2026 Yılı Bonus Trendleri ve Beklentiler",
                slug: "2026-bonus-trendleri",
                summary: "Yeni yılda bahis ve casino dünyasında beklenen bonus trendleri ve kullanıcıları nelerin beklediğine dair kapsamlı bir inceleme.",
                content: `
                    <p class="mb-4">2026 yılı, online bahis ve casino sektörü için devrim niteliğinde yeniliklerin beklendiği bir yıl olacak...</p>
                    <h3 class="text-2xl font-bold mb-3 text-slate-800">Yapay Zeka Destekli Bonuslar</h3>
                    <p class="mb-4">Kullanıcı alışkanlıklarını analiz eden AI sistemleri, artık her oyuncuya özel bonus paketleri sunacak.</p>
                `,
                date: "2026-01-15",
                author: "Editör Ekibi",
                tags: ["Bonus", "2026", "Trendler"]
            },
            {
                id: "3",
                title: "Deneme Bonusu Veren Siteler Listesi Güncellendi",
                slug: "deneme-bonusu-veren-siteler-2026",
                summary: "Yatırımsız deneme bonusu veren en yeni siteler listemize eklendi. Avantajlı fırsatları kaçırmayın.",
                content: `
                    <p class="mb-4">Deneme bonusları, kullanıcıların siteyi risk almadan test etmesi için harika bir fırsattır.</p>
                 `,
                date: "2026-02-05",
                author: "Haber Merkezi",
                tags: ["Deneme Bonusu", "Fırsatlar"]
            }
        ];
        newsItem = dummyNews.find(n => n.slug === slug) || null;
    }

    if (!newsItem) {
        notFound();
    }

    if (isBot) {
        const heartbeat = new Date().toISOString();
        return (
            <div className="news-bot-optimized-ssr" style={{ background: '#f8fafc', color: '#1e293b', fontFamily: 'sans-serif', padding: '4rem 2rem' }}>
                <style dangerouslySetInnerHTML={{
                    __html: `
                    .news-bot-optimized-ssr { min-height: 100vh; }
                    .bot-content-vault { max-width: 800px; margin: 0 auto; background: white; padding: 3rem; border-radius: 40px; border: 1px solid #f1f5f9; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); }
                    .prose-header { border-bottom: 2px solid #f1f5f9; margin-bottom: 2rem; padding-bottom: 2rem; }
                    .prose-header h1 { font-size: 2.5rem; font-weight: 800; color: #0f172a; margin-bottom: 1rem; }
                    .prose-header p { color: #64748b; font-size: 1.1rem; }
                    .prose-body { line-height: 1.8; color: #334155; font-size: 1.1rem; }
                    .heartbeat-box { margin-top: 3rem; padding: 1.5rem; background: #fdf2f8; border: 1px dashed #f9a8d4; border-radius: 20px; text-align: center; font-family: monospace; font-size: 11px; color: #be185d; }
                `}} />

                <div className="bot-content-vault">
                    <header className="prose-header">
                        <div style={{ color: '#3b82f6', fontWeight: 'bold', fontSize: '12px', marginBottom: '8px', textTransform: 'uppercase' }}>News Archive :: Official Audit</div>
                        <h1>${newsItem.title}</h1>
                        <p>${newsItem.summary}</p>
                    </header>

                    <div className="prose-body" dangerouslySetInnerHTML={{ __html: newsItem.content }} />

                    <div className="heartbeat-box">
                        NUCLEAR_HB_SIGNAL :: [${heartbeat}] :: NEWS_ID: ${newsItem.slug.toUpperCase()} :: STATUS: GLOBAL_DISTRIBUTION_OK
                    </div>

                    <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                        <a href="/haberler" style={{ color: '#3b82f6', fontWeight: 'bold' }}>Tüm Haberleri İncele</a>
                        <span style={{ margin: '0 1rem', color: '#cbd5e1' }}>|</span>
                        <a href="/" style={{ color: '#3b82f6', fontWeight: 'bold' }}>Ana Sayfa Otorite Raporu</a>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen font-sans bg-slate-50" style={{
            '--primary': colorScheme.primary,
            '--secondary': colorScheme.secondary,
            '--accent': colorScheme.accent,
        } as any}>
            {/* Header */}
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
                <div className="max-w-4xl mx-auto px-6">
                    <Link href="/haberler" className="inline-flex items-center gap-2 text-slate-500 hover:text-[var(--primary)] font-medium mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Tüm Haberlere Dön
                    </Link>

                    <article className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden">
                        {newsItem.image && (
                            <div className="h-[400px] w-full overflow-hidden">
                                <img src={newsItem.image} alt={newsItem.title} className="w-full h-full object-cover" />
                            </div>
                        )}

                        <div className="p-10 md:p-14">
                            <div className="flex flex-wrap items-center gap-6 text-sm font-bold text-slate-400 mb-8 border-b border-slate-100 pb-8">
                                <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {new Date(newsItem.date).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                {newsItem.author && (
                                    <span className="flex items-center gap-2"><User className="w-4 h-4" /> {newsItem.author}</span>
                                )}
                                {newsItem.tags && newsItem.tags.map(tag => (
                                    <span key={tag} className="flex items-center gap-2 text-[var(--primary)] bg-blue-50 px-3 py-1 rounded-full"><Tag className="w-3 h-3" /> {tag}</span>
                                ))}
                            </div>

                            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 leading-tight tracking-tight">{newsItem.title}</h1>

                            <div className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-[var(--primary)]">
                                <div dangerouslySetInnerHTML={{ __html: newsItem.content }} />
                            </div>

                            {/* Yazar ve Paylaşım Alanı */}
                            <div className="mt-12 py-8 border-t border-slate-100 flex items-center justify-between">
                                <div className="text-sm font-medium text-slate-500">
                                    Editöryal inceleme tamamlanmıştır.
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </main>

            <footer className="bg-slate-900 py-12 text-center mt-20">
                <p className="text-slate-500">© 2026 {siteName}. Tüm hakları saklıdır.</p>
            </footer>
        </div>
    );
}
