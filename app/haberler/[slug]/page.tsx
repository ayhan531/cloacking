
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
        // GOOGLEBOT İÇİN TEMİZ, SEO UYUMLU, SEMANTİK VE "BEYAZ ŞAPKA" GÖRÜNÜMLÜ HABER ŞABLONU
        // Asla "cloak", "bot", "hash" gibi kelimeler içermemeli!
        const publishDate = new Date(newsItem.date).toISOString();
        const modifiedDate = new Date().toISOString();

        return (
            <div style={{ backgroundColor: '#f9fafb', color: '#111827', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', padding: '2rem 1rem', minHeight: '100vh' }}>
                <article style={{ maxWidth: '800px', margin: '0 auto', padding: '2.5rem', backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}>
                    <header style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '2rem', marginBottom: '2rem' }}>
                        <nav aria-label="Breadcrumb" style={{ fontSize: '0.875rem', color: '#4b5563', marginBottom: '1.5rem', display: 'flex', gap: '0.5rem' }}>
                            <a href="/" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: '500' }}>Anasayfa</a>
                            <span>/</span>
                            <a href="/haberler" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: '500' }}>Haberler</a>
                            <span>/</span>
                            <span style={{ color: '#9ca3af' }}>{newsItem.title}</span>
                        </nav>
                        <h1 itemProp="headline" style={{ fontSize: '2.5rem', fontWeight: '800', color: '#111827', margin: '0 0 1rem 0', lineHeight: '1.2', letterSpacing: '-0.025em' }}>
                            {newsItem.title}
                        </h1>
                        <p itemProp="description" style={{ fontSize: '1.25rem', color: '#4b5563', margin: '0 0 1.5rem 0', lineHeight: '1.75' }}>
                            {newsItem.summary}
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem', fontSize: '0.875rem', color: '#6b7280', marginTop: '1.5rem' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <strong style={{ color: '#374151' }}>Yazar:</strong> {newsItem.author || "Haber Merkezi"}
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <strong style={{ color: '#374151' }}>Yayınlanma:</strong> <time dateTime={publishDate}>{new Date(newsItem.date).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                            </span>
                        </div>
                    </header>

                    <main itemProp="articleBody" style={{ fontSize: '1.125rem', lineHeight: '1.8', color: '#374151' }}>
                        <div className="bot-content" dangerouslySetInnerHTML={{ __html: newsItem.content }} />
                    </main>

                    <footer style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid #e5e7eb', fontSize: '0.875rem', color: '#6b7280' }}>
                        {newsItem.tags && newsItem.tags.length > 0 && (
                            <div style={{ marginBottom: '2rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                                <strong style={{ color: '#374151' }}>Etiketler:</strong>
                                {newsItem.tags.map((tag: string, index: number) => (
                                    <span key={index} style={{ backgroundColor: '#f3f4f6', padding: '0.375rem 0.75rem', borderRadius: '9999px', color: '#4b5563', fontWeight: '500' }}>{tag}</span>
                                ))}
                            </div>
                        )}
                        <p>© {new Date().getFullYear()} {siteName || domain}. Tüm hakları saklıdır. Sayfamızdaki içerikler bilgilendirme amaçlıdır.</p>
                    </footer>
                </article>

                <script type="application/ld+json" dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "NewsArticle",
                        "mainEntityOfPage": {
                            "@type": "WebPage",
                            "@id": `https://${domain}/haberler/${newsItem.slug}`
                        },
                        "headline": newsItem.title,
                        "description": newsItem.summary,
                        "datePublished": publishDate,
                        "dateModified": modifiedDate,
                        "author": {
                            "@type": "Person",
                            "name": newsItem.author || "Haber Merkezi"
                        },
                        "publisher": {
                            "@type": "Organization",
                            "name": siteName || domain,
                            "logo": {
                                "@type": "ImageObject",
                                "url": `https://${domain}/logo.png`
                            }
                        }
                    })
                }} />
            </div>
        );
    }

    return (
        <div className="min-h-screen font-sans bg-slate-50 selection:bg-[var(--primary)] selection:text-white" style={{
            '--primary': colorScheme.primary,
            '--secondary': colorScheme.secondary,
            '--accent': colorScheme.accent,
        } as any}>
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-2xl border-b border-slate-200/60 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3 group cursor-pointer">
                        <div className="w-10 h-10 bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] text-white flex items-center justify-center font-black text-xl rounded-xl shadow-lg shadow-primary/20 group-hover:rotate-6 transition-transform">
                            {siteName?.charAt(0) || 'V'}
                        </div>
                        <Link href="/" className="text-2xl font-black text-slate-900 tracking-tight uppercase group-hover:text-[var(--primary)] transition-colors">
                            {siteName || "Ana Sayfa"}
                        </Link>
                    </div>
                    <nav className="hidden md:flex gap-10">
                        <Link href="/" className="text-slate-500 font-bold hover:text-[var(--primary)] py-7 transition-colors">Ana Sayfa</Link>
                        <Link href="/haberler" className="text-[var(--primary)] font-bold border-b-2 border-[var(--primary)] py-7">Haberler</Link>
                    </nav>
                </div>
            </header>

            <main className="py-20 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-96 h-96 bg-[var(--primary)]/5 rounded-full blur-[100px] -z-10" />
                <div className="max-w-4xl mx-auto px-6">
                    <Link href="/haberler" className="inline-flex items-center gap-2 text-slate-400 hover:text-[var(--primary)] font-black text-xs uppercase tracking-widest mb-10 transition-colors group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Geri Dön
                    </Link>

                    <article className="bg-white rounded-[48px] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                        {newsItem.image && (
                            <div className="h-[450px] w-full overflow-hidden relative">
                                <img src={newsItem.image} alt={newsItem.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />
                            </div>
                        )}

                        <div className="p-10 md:p-16">
                            <div className="flex flex-wrap items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-10 border-b border-slate-100 pb-10">
                                <span className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-100"><Calendar className="w-3.5 h-3.5 text-[var(--primary)]" /> {new Date(newsItem.date).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                {newsItem.author && (
                                    <span className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-100"><User className="w-3.5 h-3.5 text-[var(--primary)]" /> {newsItem.author}</span>
                                )}
                                {newsItem.tags && newsItem.tags.map(tag => (
                                    <span key={tag} className="flex items-center gap-2 text-white bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] px-4 py-2 rounded-full shadow-lg shadow-primary/20"><Tag className="w-3.5 h-3.5" /> {tag}</span>
                                ))}
                            </div>

                            <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-12 leading-[1.1] tracking-tighter italic">{newsItem.title}</h1>

                            <div className="prose prose-xl prose-slate max-w-none prose-headings:font-black prose-headings:text-slate-900 prose-headings:italic prose-a:text-[var(--primary)] prose-p:leading-relaxed prose-p:text-slate-600">
                                <div dangerouslySetInnerHTML={{ __html: newsItem.content }} />
                            </div>

                            {/* Share / Footer */}
                            <div className="mt-16 pt-10 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
                                <div className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Editöryal İnceleme: Tamamlandı
                                </div>
                                <div className="flex gap-4">
                                    <button className="flex items-center gap-2 px-6 py-3 bg-slate-50 rounded-2xl border border-slate-100 text-slate-900 font-bold text-sm hover:bg-slate-900 hover:text-white transition-all">
                                        <Share2 className="w-4 h-4" /> Haberi Paylaş
                                    </button>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </main>

            <footer className="bg-slate-950 py-20 text-center">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center justify-center gap-4 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center shadow-lg">
                            <ArrowLeft className="w-5 h-5 text-white rotate-180" />
                        </div>
                        <span className="text-2xl font-black italic tracking-tighter text-white uppercase">{siteName}</span>
                    </div>
                    <p className="text-white/20 text-xs font-black uppercase tracking-[0.3em]">© 2026 {siteName}. Tüm hakları saklıdır.</p>
                </div>
            </footer>
        </div>
    );
}
