
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
        });

        if (site) {
            const maskContent = JSON.parse(site.maskContent);
            const newsItem = maskContent.news?.find((n: any) => n.slug === slug);

            if (newsItem) {
                return {
                    title: newsItem.title,
                    description: newsItem.summary,
                    openGraph: {
                        title: newsItem.title,
                        description: newsItem.summary,
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

export default async function NewsDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const headersList = await headers();
    const host = headersList.get("host") || "";
    const domain = host.split(':')[0].replace('www.', '');

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

    // Fallback Dummy Data for specific slugs if not found in DB (for demo)
    if (!newsItem) {
        const dummyNews = [
            {
                id: "1",
                title: "2026 Yılı Bonus Trendleri ve Beklentiler",
                slug: "2026-bonus-trendleri",
                summary: "Yeni yılda bahis ve casino dünyasında beklenen bonus trendleri ve kullanıcıları nelerin beklediğine dair kapsamlı bir inceleme.",
                content: `
                    <p class="mb-4">2026 yılı, online bahis ve casino sektörü için devrim niteliğinde yeniliklerin beklendiği bir yıl olacak. Özellikle kripto para entegrasyonları, yapay zeka destekli kişiselleştirilmiş bonuslar ve sanal gerçeklik (VR) tabanlı oyun deneyimleri öne çıkıyor.</p>
                    <h3 class="text-2xl font-bold mb-3 text-slate-800">Yapay Zeka Destekli Bonuslar</h3>
                    <p class="mb-4">Kullanıcı alışkanlıklarını analiz eden AI sistemleri, artık her oyuncuya özel bonus paketleri sunacak. Bu, standart "Hoşgeldin Bonusu" kavramını değiştirerek, "Size Özel Fırsat" dönemini başlatıyor.</p>
                    <h3 class="text-2xl font-bold mb-3 text-slate-800">Daha Hızlı Çekim İşlemleri</h3>
                    <p class="mb-4">Blockchain teknolojisinin daha yaygın kullanımı ile birlikte, ödeme işlemleri saniyeler içinde gerçekleşecek. Masrafsız ve anında transferler, 2026'nın standartı haline geliyor.</p>
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
                    <p class="mb-4">Deneme bonusları, kullanıcıların siteyi risk almadan test etmesi için harika bir fırsattır. 2026 yılında birçok yeni site, rekabet avantajı sağlamak için yüksek miktarlı deneme bonusları sunmaya başladı.</p>
                    <ul class="list-disc pl-5 mb-4 space-y-2">
                        <li><strong>Yatırımsız Bonuslar:</strong> Artık çevrim şartı olmadan verilen bonusların sayısı artıyor.</li>
                        <li><strong>Freespin Kampanyaları:</strong> Slot oyunları için özel tanımlanan günlük freespinler popülerleşiyor.</li>
                    </ul>
                    <p>Güncel listemizi takip ederek en avantajlı sitelerden haberdar olabilirsiniz.</p>
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
