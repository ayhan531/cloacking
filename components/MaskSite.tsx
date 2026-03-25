'use client';

import type { SiteConfig } from '@/lib/types';
import { Shield, Award, Users, TrendingUp, Mail, Phone, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

interface MaskSiteProps {
    config: SiteConfig;
}

export default function MaskSite({ config }: MaskSiteProps) {
    const { maskContent, seoSettings } = config;
    const { colorScheme } = maskContent;
    // Check if the site is configured as a News/Blog site
    if (config.maskType === 'blog' || (maskContent as any).type === 'news') {
        return (
            <>
            <div className="bg-red-600 text-white h-12 flex items-center justify-center font-black text-sm uppercase tracking-[0.3em] italic animate-pulse overflow-hidden whitespace-nowrap z-[99999] relative">
                🚨 SON DAKİKA ALARMI: 24 MART 2026 SABAH LİSTESİ AKTİF! [08:26 GÜNCEL] 🚨
            </div>

            <div className={`min-h-screen ${maskContent.theme?.font || 'font-sans'} ${maskContent.theme?.bg || 'bg-slate-50'} selection:bg-[var(--primary)] selection:text-white`} style={{
                '--primary': maskContent.theme?.primary || (colorScheme?.primary || '#10b981'),
                '--secondary': maskContent.theme?.primary + 'cc' || (colorScheme?.secondary || '#064e3b'),
                '--accent': '#f59e0b',
            } as any}>
                {/* News Header */}
                <header className="bg-white/80 backdrop-blur-2xl border-b border-slate-200/60 sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                        <div className="flex items-center gap-3 group cursor-pointer">
                            <div className="w-10 h-10 bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] text-white flex items-center justify-center font-black text-xl rounded-xl shadow-lg shadow-primary/20 group-hover:rotate-6 transition-transform">
                                {maskContent?.siteName?.charAt(0) || 'V'}
                            </div>
                            <span className="text-2xl font-black text-slate-900 tracking-tight uppercase group-hover:text-[var(--primary)] transition-colors">
                                {maskContent?.siteName || 'VizyonTek'}
                            </span>
                        </div>
                        <nav className="hidden md:flex gap-10">
                            <a href="#" className="text-[var(--primary)] font-bold border-b-2 border-[var(--primary)] py-7">Gündem</a>
                            <a href="#ekonomi" className="text-slate-500 font-bold hover:text-[var(--primary)] py-7 transition-colors relative group">
                                Ekonomi
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--primary)] group-hover:w-full transition-all" />
                            </a>
                            <a href="#spor" className="text-slate-500 font-bold hover:text-[var(--primary)] py-7 transition-colors relative group">
                                Spor
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--primary)] group-hover:w-full transition-all" />
                            </a>
                            <a href="#magazin" className="text-slate-500 font-bold hover:text-[var(--primary)] py-7 transition-colors relative group">
                                Magazin
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--primary)] group-hover:w-full transition-all" />
                            </a>
                        </nav>
                        <Button className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] hover:scale-105 hover:shadow-xl hover:shadow-primary/20 text-white font-bold rounded-xl px-8 h-12 transition-all">
                            Üye Ol
                        </Button>
                    </div>
                </header>

                <main className="max-w-7xl mx-auto px-6 py-12">
                    {/* Hero Section - Featured News */}
                    <section className="grid md:grid-cols-12 gap-8 mb-16">
                        <div className="md:col-span-8 relative group cursor-pointer overflow-hidden rounded-3xl h-[500px]">
                            {maskContent.heroImage ? (
                                <img onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src='https://placehold.co/400x200/1e293b/a855f7?text=RESIM+BULUNAMADI'; }} src={maskContent.heroImage} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                            ) : (
                                <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                                    <TrendingUp className="w-20 h-20 text-slate-400" />
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-10">
                                <span className="inline-block px-3 py-1 bg-[var(--primary)] text-white text-xs font-bold uppercase tracking-widest rounded-full mb-4 w-fit">
                                    Son Dakika
                                </span>
                                <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4 group-hover:underline decoration-[var(--primary)] decoration-4 underline-offset-8">
                                    {maskContent.heroTitle}
                                </h1>
                                <p className="text-white/80 text-lg line-clamp-2 max-w-2xl font-medium">
                                    {maskContent.heroSubtitle}
                                </p>
                            </div>
                        </div>
                        <div className="md:col-span-4 flex flex-col gap-8">
                            {maskContent.news?.slice(0, 2).map((item, idx) => (
                                <div key={item.id} className="relative h-full rounded-3xl overflow-hidden group cursor-pointer border border-slate-100 shadow-sm bg-white top-news-card">
                                    <div className="p-6 h-full flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">
                                                <div className="w-2 h-2 rounded-full bg-[var(--primary)]"></div>
                                                {new Date(item.date).toLocaleDateString('tr-TR')}
                                            </div>
                                            <h3 className="text-xl font-bold text-slate-900 leading-snug group-hover:text-[var(--primary)] transition-colors line-clamp-3">
                                                {item.title}
                                            </h3>
                                        </div>
                                        <a href={`/haberler/${item.slug}`} className="text-sm font-bold text-slate-400 mt-4 group-hover:text-[var(--primary)] flex items-center gap-2">
                                            Haberin Detayı <ArrowRight className="w-4 h-4" />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Latest News Grid */}
                    <section className="mb-16">
                        <div className="flex items-center justify-between mb-8 border-b border-slate-200 pb-4">
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                                <span className="w-2 h-8 bg-[var(--primary)] rounded-full"></span>
                                Öne Çıkan Haberler
                            </h2>
                            <a href="/haberler" className="font-bold text-slate-500 hover:text-[var(--primary)] transition-colors">Tümünü Gör</a>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {maskContent.news?.slice(2, 8).map((item) => (
                                <a href={`/haberler/${item.slug}`} key={item.id} className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300">
                                    {item.image && (
                                        <div className="h-48 overflow-hidden">
                                            <img onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src='https://placehold.co/400x200/1e293b/a855f7?text=RESIM+BULUNAMADI'; }} src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        </div>
                                    )}
                                    <div className="p-6">
                                        <div className="text-xs font-bold text-[var(--primary)] mb-2 uppercase tracking-wider">
                                            {item.tags?.[0] || 'Genel'}
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight group-hover:text-[var(--primary)] transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-sm text-slate-500 line-clamp-3 leading-relaxed font-medium">
                                            {item.summary}
                                        </p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </section>

                    {/* Services as Categories/Features */}
                    <section className="bg-slate-900 -mx-6 px-6 py-24 mb-10 overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--primary)]/10 rounded-full blur-[100px]" />
                        <div className="max-w-7xl mx-auto relative z-10">
                            <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
                                <h3 className="text-[var(--primary)] font-black uppercase tracking-[0.2em] text-sm">Kurumsal Raporlama</h3>
                                <h2 className="text-5xl font-black text-white italic tracking-tighter">Sektör Analizleri ve <span className="text-slate-500">Global Raporlar</span></h2>
                                <p className="text-slate-400 text-lg font-medium">Uzman ekibimiz tarafından hazırlanan, SHA-256 doğrulama teknolojisiyle korunan şeffaf veriler.</p>
                            </div>
                            <div className="grid md:grid-cols-4 gap-8">
                                {maskContent?.services?.map((service: any) => (
                                    <div key={service.id} className="bg-white/5 backdrop-blur-sm p-8 rounded-[40px] border border-white/10 hover:bg-white/10 hover:scale-105 transition-all duration-500 group">
                                        <div className="w-16 h-16 bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] text-white rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-primary/20 group-hover:rotate-12 transition-transform">
                                            <Award className="w-8 h-8" />
                                        </div>
                                        <h4 className="font-bold text-white text-xl mb-3 tracking-tight">{service.name}</h4>
                                        <p className="text-sm text-slate-400 leading-relaxed font-medium line-clamp-3">{service.description}</p>
                                    </div>
                                )) || <div className="col-span-4 text-center text-slate-400">Hizmet bilgisi bulunamadı.</div>}
                            </div>
                        </div>
                    </section>

                    
            {/* Advertise Banner */}
            <div className="my-12 animate-pulse text-center w-full px-4 max-w-4xl mx-auto" onClick={() => window.open('https://t.me/atlastunahan', '_blank')}>
                <div className="bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 p-[2px] rounded-3xl cursor-pointer hover:scale-105 transition-transform shadow-[0_0_30px_rgba(147,51,234,0.3)]">
                    <div className="bg-slate-900 rounded-3xl py-6 px-4">
                        <h2 className="text-xl font-black italic text-white mb-1">📢 BURAYA REKLAM VERMEK İÇİN TIKLAYIN</h2>
                        <p className="text-sm font-medium text-gray-400">Bizimle İletişime Geçin</p>
                    </div>
                </div>
            </div>

            {/* 🚀 REAL BRAND ADS (UNIVERSAL VISIBILITY) */}
            <div className="max-w-7xl mx-auto px-6 mb-16">
                <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden relative group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-[80px] -mr-32 -mt-32" />
                    <div className="relative z-10">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                            <div>
                                <h3 className="text-sm font-black text-purple-600 uppercase tracking-[0.2em] mb-2 italic">Stratejik İş Ortaklarımız</h3>
                                <h2 className="text-3xl font-black text-slate-900 tracking-tighter italic">2026'nın En Çok Tercih Edilen <span className="text-slate-400">Güvenilir Platformları</span></h2>
                            </div>
                            <div className="flex items-center gap-2 px-6 py-3 bg-emerald-50 text-emerald-600 rounded-2xl text-xs font-black uppercase tracking-widest shadow-sm">
                                <TrendingUp className="w-4 h-4" />
                                18 MART GÜNCEL VERİLER
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                            {(config.bettingContent as any)?.brandCarousel?.slice(0, 5).map((brand: any) => (
                                <a 
                                    key={brand.id} 
                                    href={brand.link} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="group/ad flex flex-col items-center gap-4 p-6 rounded-[32px] bg-slate-50 hover:bg-white hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-2 transition-all duration-500 border border-transparent hover:border-purple-200"
                                >
                                    <div className="w-full aspect-square bg-white rounded-2xl p-4 flex items-center justify-center shadow-sm group-hover/ad:shadow-md transition-shadow">
                                        <img src={brand.logo} alt={brand.name} className="max-w-full max-h-full object-contain filter grayscale group-hover/ad:grayscale-0 transition-all duration-500" />
                                    </div>
                                    <div className="text-center">
                                        <div className="text-sm font-black text-slate-900 mb-1">{brand.name.toUpperCase()}</div>
                                        <div className="text-[10px] font-bold text-purple-500 uppercase tracking-tighter opacity-0 group-hover/ad:opacity-100 transition-opacity">HEMEN GİT →</div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
                    {/* 🛰️ FAQ SECTION (SERP DOMINATION) */}
                    <section className="mb-24 max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h3 className="text-sm font-black text-purple-600 uppercase tracking-widest mb-2 italic">Merak Edilenler</h3>
                            <h2 className="text-4xl font-black text-slate-900 tracking-tighter italic">Sıkça Sorulan <span className="text-slate-400">Sorular</span></h2>
                        </div>
                        <div className="space-y-4">
                            {(maskContent as any).faq?.map((item: any, idx: number) => (
                                <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                    <h4 className="font-bold text-slate-900 text-lg mb-2 flex gap-3">
                                        <span className="text-purple-600">Q:</span> {item.q}
                                    </h4>
                                    <p className="text-slate-500 font-medium leading-relaxed">
                                        <span className="text-emerald-500 font-black">A:</span> {item.a}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
                        <div className="grid md:grid-cols-4 gap-12 mb-12">
                            <div className="col-span-2">
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 hover:bg-[var(--primary)] hover:text-white transition-colors cursor-pointer"><Mail className="w-5 h-5" /></div>
                                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 hover:bg-[var(--primary)] hover:text-white transition-colors cursor-pointer"><Phone className="w-5 h-5" /></div>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-sm">Hızlı Erişim</h4>
                                <ul className="space-y-3 text-sm font-medium text-slate-500">
                                    <li><a href="#" className="hover:text-[var(--primary)]">Hakkımızda</a></li>
                                    <li><a href="#" className="hover:text-[var(--primary)]">Künye</a></li>
                                    <li><a href="#" className="hover:text-[var(--primary)]">İletişim</a></li>
                                    <li><a href="https://t.me/atlastunahan" target="_blank" className="hover:text-purple-600 font-bold text-purple-500">Telegram Kanalı</a></li>
                                    <li><a href="#" className="hover:text-[var(--primary)]">Gizlilik Politikası</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-sm">Kategoriler</h4>
                                <ul className="space-y-3 text-sm font-medium text-slate-500">
                                    <li><a href="/" className="hover:text-[var(--primary)]">Gündem</a></li>
                                    <li><a href="/deneme-bonusu" className="hover:text-[var(--primary)]">Deneme Bonusu</a></li>
                                    <li><a href="/bahis-siteleri" className="hover:text-[var(--primary)]">Bahis Siteleri</a></li>
                                    <li><a href="/casino-siteleri" className="hover:text-[var(--primary)]">Casino Siteleri</a></li>
                                    <li><a href="/hosgeldin-bonusu" className="hover:text-[var(--primary)]">Hoşgeldin Bonusu</a></li>
                                </ul>
                            </div>
                        </div>

                        {/* Hidden SEO Article - ONLY show on homepage if no specific botArticle exists */}
                        {seoSettings.hiddenSEOArticle && !maskContent.botArticle && (
                            <div className="text-[1px] text-transparent absolute w-1 h-1 overflow-hidden">
                                <div dangerouslySetInnerHTML={{ __html: seoSettings.hiddenSEOArticle }} />
                            </div>
                        )}

                        <div className="border-t border-slate-100 pt-8 text-center">
                            <p className="text-slate-400 text-sm font-medium">© 2026 {maskContent.siteName}. Tüm hakları saklıdır. Kaynak gösterilmeden alıntı yapılamaz.</p>
                        </div>
                    </footer>
                </main>
            </div>
            </>
        );
    }

    return (
        <>
        <div className="bg-red-600 text-white h-12 flex items-center justify-center font-black text-sm uppercase tracking-[0.3em] italic animate-pulse overflow-hidden whitespace-nowrap z-[99999] relative">
            🚨 SON DAKİKA ALARMI: 24 MART 2026 SABAH LİSTESİ AKTİF! [08:26 GÜNCEL] 🚨
        </div>

        <div
            className="min-h-screen font-sans selection:bg-purple-500 selection:text-white"
            style={{
                '--primary': colorScheme.primary,
                '--secondary': colorScheme.secondary,
                '--accent': colorScheme.accent,
                '--background': colorScheme.background,
                '--text': colorScheme.text,
            } as any}
        >
            {/* Background Effects */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[5%] w-[40rem] h-[40rem] rounded-full blur-[120px] opacity-[0.08]" style={{ background: colorScheme.primary }} />
                <div className="absolute bottom-[20%] right-[10%] w-[35rem] h-[35rem] rounded-full blur-[100px] opacity-[0.08]" style={{ background: colorScheme.secondary }} />
            </div>

            {/* Header */}
            <header className="fixed w-full top-0 z-[100] border-b border-black/5 bg-white/40 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3 group cursor-pointer">
                        <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] shadow-lg shadow-primary/20 group-hover:rotate-12 transition-transform duration-500">
                            {maskContent.logo ? (
                                <img onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src='https://placehold.co/400x200/1e293b/a855f7?text=RESIM+BULUNAMADI'; }} src={maskContent.logo} alt={maskContent.siteName} className="w-6 h-6 object-contain brightness-0 invert" />
                            ) : (
                                <Shield className="w-6 h-6 text-white" />
                            )}
                        </div>
                        <span className="text-xl font-bold tracking-tight text-slate-800">
                            {maskContent?.siteName || 'VizyonTek'}
                        </span>
                    </div>

                    <nav className="hidden lg:flex items-center gap-10">
                        {['Hizmetler', 'Özellikler', 'Referanslar', 'İletişim'].map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className="text-sm font-semibold text-slate-600 hover:text-[var(--primary)] transition-colors relative group py-2"
                            >
                                {item}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--primary)] transition-all group-hover:w-full" />
                            </a>
                        ))}
                        <a
                            href="/haberler"
                            className="text-sm font-semibold text-slate-600 hover:text-[var(--primary)] transition-colors relative group py-2"
                        >
                            Haberler
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--primary)] transition-all group-hover:w-full" />
                        </a>
                    </nav>

                    <Button className="rounded-2xl px-6 h-12 font-bold shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all text-white"
                        style={{ backgroundImage: `linear-gradient(135deg, var(--primary), var(--secondary))` }}>
                        Teklif Al
                    </Button>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative pt-40 pb-24 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
                    <div className="relative z-10 space-y-10">
                        <div className="flex flex-wrap items-center gap-3">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200/60 text-xs font-black tracking-widest text-slate-500 uppercase">
                                <TrendingUp className="w-3.5 h-3.5 text-[var(--primary)] text-emerald-500" />
                                Yeni Nesil Çözümler
                            </div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-[10px] font-bold text-emerald-600 uppercase tracking-tighter shadow-sm">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                                CANLI SİNYAL: 21 MART 2026 - {new Date().getHours()}:{new Date().getMinutes()}
                            </div>
                            <div className="hidden" id="EMERGENCY_INDEX_SIGNAL">
                                {Array.from({length: 10}).map((_, i) => (
                                    <p key={i}>Deneme bonusu veren siteler hakkındaki her şey 2026 - Sinyal Gücü: {Math.random()}</p>
                                ))}
                            </div>
                        </div>

                        <h1 className="text-6xl lg:text-[100px] font-black tracking-tight leading-[0.9] font-outfit text-slate-900 italic uppercase">
                            DENEME <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)]">BONUSU</span> <br/>
                            <span className="text-3xl lg:text-5xl text-slate-400 block mt-2">22 MART 2026 <span className="text-slate-900">GÜNCEL GECE</span></span>
                        </h1>

                        {maskContent.heroLink ? (
                            <a href={maskContent.heroLink} className="block group/link">
                                <p className="text-xl text-slate-600 leading-relaxed max-w-lg group-hover/link:text-[var(--primary)] transition-colors">
                                    {maskContent.heroSubtitle}
                                </p>
                            </a>
                        ) : (
                            <p className="text-xl text-slate-600 leading-relaxed max-w-lg">
                                {maskContent.heroSubtitle}
                            </p>
                        )}

                        <div className="flex flex-wrap gap-4 pt-4">
                            <Button
                                size="lg"
                                className="h-16 px-8 rounded-2xl text-lg font-bold shadow-2xl shadow-primary/25 hover:shadow-primary/40 text-white"
                                style={{ backgroundImage: `linear-gradient(135deg, var(--primary), var(--secondary))` }}
                                onClick={() => maskContent.heroLink && window.open(maskContent.heroLink, '_self')}
                            >
                                {maskContent.heroLinkText || 'Ücretsiz Danışmanlık'}
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                            <Button size="lg" variant="ghost" className="h-16 px-8 rounded-2xl text-lg font-bold text-slate-600 hover:bg-slate-100">
                                Portfolyo
                            </Button>
                        </div>

                        <div className="flex items-center gap-8 pt-10 border-t border-slate-100">
                            {maskContent.botArticle ? (
                                <div className="bot-visible-seo" dangerouslySetInnerHTML={{ __html: maskContent.botArticle }} />
                            ) : (
                                <>
                                    <div>
                                        <div className="text-2xl font-black text-slate-900">500+</div>
                                        <div className="text-sm font-bold text-slate-400 uppercase tracking-tighter">Proje</div>
                                    </div>
                                    <div className="w-px h-8 bg-slate-100" />
                                    <div>
                                        <div className="text-2xl font-black text-slate-900">12k+</div>
                                        <div className="text-sm font-bold text-slate-400 uppercase tracking-tighter">Kullanıcı</div>
                                    </div>
                                    <div className="w-px h-8 bg-slate-100" />
                                    <div>
                                        <div className="text-2xl font-black text-slate-900">99.9%</div>
                                        <div className="text-sm font-bold text-slate-400 uppercase tracking-tighter">Memnuniyet</div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="relative lg:h-[600px] flex items-center justify-center">
                        {/* Abstract Decorative Elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-slate-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
                        <div className="absolute -bottom-8 -left-8 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />

                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-[40px] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                            {maskContent.heroImage ? (
                                <img                                     src={maskContent.heroImage}
                                    alt={seoSettings.metaTitle || "Elite Global 2026 Teknik Analiz"}
                                    className="relative rounded-[40px] shadow-2xl w-full h-auto object-cover transform rotate-2 hover:rotate-0 transition-transform duration-700"
                                />
                            ) : (
                                <div className="relative w-full aspect-square bg-white rounded-[40px] shadow-2xl flex items-center justify-center p-12 overflow-hidden border border-slate-100 transform rotate-2">
                                    <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-white" />
                                    <TrendingUp className="w-32 h-32 text-[var(--primary)] opacity-10 animate-pulse" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="hizmetler" className="py-32 bg-slate-50/50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
                        <div className="max-w-2xl space-y-4">
                            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-[var(--primary)]">Neler Yapıyoruz?</h3>
                            <h2 className="text-5xl font-black tracking-tighter text-slate-900 font-outfit">Sizin İçin Geliştirdiğimiz <br /><span className="text-slate-400 underline decoration-primary/20">Uçtan Uca</span> Çözümler</h2>
                        </div>
                        <p className="text-slate-500 max-w-sm text-lg font-medium leading-relaxed">
                            İşinizi büyütmek ve dijital dünyada fark yaratmak için ihtiyacınız olan her şey tek bir noktada.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {maskContent?.services?.map((service: any, idx: number) => (
                            <Card key={service.id || idx} className="border-0 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-500 group overflow-hidden rounded-[32px] bg-white">
                                {service.image && (
                                    <div className="h-64 overflow-hidden">
                                        <img onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src='https://placehold.co/400x200/1e293b/a855f7?text=RESIM+BULUNAMADI'; }} src={service.image} alt={service.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    </div>
                                )}
                                <CardHeader className="p-8">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="p-3 rounded-2xl bg-slate-50 text-[var(--primary)] group-hover:bg-[var(--primary)] group-hover:text-white transition-colors">
                                            <Award className="w-6 h-6" />
                                        </div>
                                        {service.price && (
                                            <span className="text-lg font-black text-slate-900">{service.price}</span>
                                        )}
                                    </div>
                                    <CardTitle className="text-2xl font-black mb-2 text-slate-900">{service.name}</CardTitle>
                                    <p className="text-slate-500 leading-relaxed line-clamp-3 font-medium">{service.description}</p>
                                </CardHeader>
                                <CardContent className="px-8 pb-8">
                                    <Button className="w-full h-12 rounded-xl bg-slate-50 hover:bg-slate-900 hover:text-white text-slate-900 font-bold border-0 shadow-none transition-all">
                                        Detayları Gör
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="özellikler" className="py-32 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div className="relative">
                            <div className="grid grid-cols-2 gap-6">
                                {maskContent?.features?.map((feature: any, idx: number) => (
                                    <div key={feature.id || idx}
                                        className={`p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 bg-white ${idx % 2 === 1 ? 'mt-8' : ''}`}>
                                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 text-white"
                                            style={{ backgroundImage: `linear-gradient(135deg, var(--primary), var(--secondary))` }}>
                                            <Shield className="w-6 h-6" />
                                        </div>
                                        <h4 className="text-xl font-bold mb-3 text-slate-900 tracking-tight">{feature.title}</h4>
                                        <p className="text-sm text-slate-500 leading-relaxed font-medium">{feature.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-8">
                            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-[var(--primary)]">Özelliklerimiz</h3>
                            <h2 className="text-5xl font-black tracking-tighter text-slate-900 leading-[1.1] font-outfit text-pretty">
                                Karmaşıklığı <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">Basitliğe Dönüştüren</span> Bir Yaklaşım
                            </h2>
                            <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
                                Teknolojiyi herkesin kullanabileceği, verimli ve estetik çözümlere dönüştürüyoruz. Sizin başarınız bizim en büyük referansımızdır.
                            </p>

                            <ul className="space-y-4 pt-4">
                                {['Hızlı Entegrasyon', 'Yüksek Performans', '7/24 Teknik Destek'].map((item) => (
                                    <li key={item} className="flex items-center gap-3 text-slate-700 font-bold">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <Button className="h-16 px-10 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20 text-white"
                                style={{ backgroundImage: `linear-gradient(135deg, var(--primary), var(--secondary))` }}>
                                Bize Katılın
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section id="referanslar" className="py-32 bg-slate-900 relative">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-20 space-y-4">
                        <h3 className="text-sm font-black uppercase tracking-[0.3em] text-white/50 italic">Kullanıcı Görüşleri</h3>
                        <h2 className="text-5xl font-black tracking-tighter text-white font-outfit italic underline underline-offset-8 decoration-primary/40">Güven Veren <span className="text-slate-400">Yorumlar</span></h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {maskContent?.testimonials?.map((t: any) => (
                            <div key={t.id} className="p-10 rounded-[40px] bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors group">
                                <div className="flex gap-1 mb-8">
                                    {Array.from({ length: t.rating || 5 }).map((_, i) => (
                                        <TrendingUp key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-xl text-white/80 leading-relaxed mb-10 font-medium tracking-tight">
                                    &quot;{t.content}&quot;
                                </p>
                                <div className="flex items-center gap-4">
                                    {t.avatar ? (
                                        <img onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src='https://placehold.co/400x200/1e293b/a855f7?text=RESIM+BULUNAMADI'; }} src={t.avatar} className="w-14 h-14 rounded-full border-2 border-[var(--primary)] object-cover" />
                                    ) : (
                                        <div className="w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center font-bold text-white text-xl">
                                            {t.name?.[0] || 'U'}
                                        </div>
                                    )}
                                    <div>
                                        <h4 className="font-bold text-white text-lg leading-none mb-1">{t.name}</h4>
                                        <p className="text-white/40 text-sm font-medium">{t.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="iletişim" className="py-32 overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
                    <div className="space-y-12">
                        <div className="space-y-4">
                            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-[var(--primary)]">İletişim</h3>
                            <h2 className="text-6xl font-black tracking-tighter text-slate-900 font-outfit leading-tight italic">Sizin İçin <br />Her Zaman <br /><span className="text-slate-400">Buradayız.</span></h2>
                        </div>

                        <div className="space-y-8">
                            {[
                                { icon: Mail, label: 'E-posta', value: maskContent?.contactInfo?.email || 'info@' + (config?.domain || 'site.com') },
                                { icon: Phone, label: 'Telefon', value: maskContent?.contactInfo?.phone || '+90 (212) --- ----' },
                                { icon: MapPin, label: 'Ofis', value: maskContent?.contactInfo?.address || 'Levent, İstanbul' }
                            ].map((item) => (
                                <div key={item.label} className="flex items-center gap-6 group cursor-pointer">
                                    <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-[var(--primary)] group-hover:text-white group-hover:border-primary transition-all duration-300 shadow-sm shadow-black/5">
                                        <item.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="text-xs font-black uppercase tracking-widest text-slate-400">{item.label}</div>
                                        <div className="text-lg font-bold text-slate-800 tracking-tight">{item.value}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <Card className="rounded-[48px] p-4 bg-slate-50 border-0 shadow-2xl">
                        <CardHeader className="p-10 space-y-2">
                            <CardTitle className="text-4xl font-black tracking-tighter">İletişime Geçin</CardTitle>
                            <CardDescription className="text-slate-500 font-medium text-lg">Hemen şimdi görüşelim.</CardDescription>
                        </CardHeader>
                        <CardContent className="px-10 pb-10">
                            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" placeholder="Adınız" className="w-full px-6 h-14 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium" />
                                    <input type="text" placeholder="E-posta" className="w-full px-6 h-14 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium" />
                                </div>
                                <textarea placeholder="Mesajınız" rows={4} className="w-full p-6 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium resize-none"></textarea>
                                <Button className="w-full h-16 rounded-2xl text-lg font-black shadow-2xl shadow-primary/30 text-white"
                                    style={{ backgroundImage: `linear-gradient(135deg, var(--primary), var(--secondary))` }}>
                                    Mesajı Gönder
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </section>

            
            {/* Advertise Banner */}
            <div className="my-12 animate-pulse text-center w-full px-4 max-w-4xl mx-auto" onClick={() => window.open('https://t.me/atlastunahan', '_blank')}>
                <div className="bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 p-[2px] rounded-3xl cursor-pointer hover:scale-105 transition-transform shadow-[0_0_30px_rgba(147,51,234,0.3)]">
                    <div className="bg-slate-900 rounded-3xl py-6 px-4">
                        <h2 className="text-xl font-black italic text-white mb-1">📢 BURAYA REKLAM VERMEK İÇİN TIKLAYIN</h2>
                        <p className="text-sm font-medium text-gray-400">Bizimle İletişime Geçin</p>
                    </div>
                </div>
            </div>

            {/* 🚀 REAL BRAND ADS (UNIVERSAL VISIBILITY) */}
            <div className="max-w-7xl mx-auto px-6 mb-24 relative z-10">
                <div className="bg-slate-950 rounded-[48px] p-12 border border-white/5 shadow-2xl overflow-hidden relative group">
                    <div className="absolute -top-32 -left-32 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px]" />
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
                        <div className="space-y-2">
                            <h3 className="text-sm font-black text-purple-400 uppercase tracking-[0.4em] italic">Yüksek Güvenilirlik Endeksi</h3>
                            <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase leading-none">2026'nın En Çok <span className="text-slate-500">Oynanan</span> Siteleri</h2>
                        </div>
                        <div className="px-6 py-4 bg-white/5 rounded-3xl border border-white/10 text-xs font-black text-emerald-400 uppercase tracking-widest shadow-lg italic">
                            18 MART CANLI VERİ AKIŞI
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                        {(config.bettingContent as any)?.brandCarousel?.slice(0, 5).map((brand: any) => (
                            <a 
                                key={brand.id} 
                                href={brand.link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="group/ad-v2 flex flex-col items-center gap-6 p-8 rounded-[40px] bg-white/5 hover:bg-white/10 hover:-translate-y-4 transition-all duration-700 border border-white/5 hover:border-purple-500/30 shadow-xl"
                            >
                                <div className="w-full aspect-square bg-slate-900/50 rounded-3xl p-5 flex items-center justify-center border border-white/5 group-hover/ad-v2:border-purple-500/20 transition-all">
                                    <img src={brand.logo} alt={brand.name} className="max-w-full max-h-full object-contain filter group-hover/ad-v2:brightness-125 transition-all duration-500" />
                                </div>
                                <div className="text-center">
                                    <div className="text-lg font-black text-white italic tracking-tighter mb-1 uppercase group-hover/ad-v2:text-purple-400 transition-colors">{brand.name}</div>
                                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest group-hover/ad-v2:text-emerald-400 transition-colors italic">ADRESİNE GİT →</div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

                    {/* 🛰️ FAQ SECTION (SERP DOMINATION) */}
                    <section className="mb-24 max-w-4xl mx-auto relative z-10 px-6">
                        <div className="text-center mb-12">
                            <h3 className="text-sm font-black text-purple-400 uppercase tracking-widest mb-2 italic">Bilgi Merkezi</h3>
                            <h2 className="text-4xl font-black text-white tracking-tighter italic">Deneme Bonusu <span className="text-slate-500">Hakkında Her Şey</span></h2>
                        </div>
                        <div className="space-y-4">
                            {(maskContent as any).faq?.map((item: any, idx: number) => (
                                <div key={idx} className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/5 hover:border-purple-500/20 transition-all">
                                    <h4 className="font-bold text-white text-xl mb-3 flex gap-4">
                                        <span className="text-purple-500">?</span> {item.q}
                                    </h4>
                                    <p className="text-slate-400 font-medium leading-relaxed italic">
                                        {item.a}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <footer className="bg-slate-950 py-20 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-4 gap-12 mb-20 text-center md:text-left">
                        <div className="col-span-1 md:col-span-2 space-y-8">
                            <div className="flex items-center justify-center md:justify-start gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                                    <Shield className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-3xl font-black italic tracking-tighter text-white uppercase">{maskContent.siteName}</span>
                            </div>
                            <p className="text-white/40 max-w-sm text-lg leading-relaxed font-medium italic">
                                &quot;{maskContent.heroSubtitle}&quot;
                            </p>
                        </div>

                        <div>
                            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">Bize Ulaşın</h4>
                            <ul className="space-y-4">
                                <li className="text-white/60 font-bold hover:text-white transition-colors cursor-pointer">{maskContent?.contactInfo?.email || 'info@' + (config?.domain || 'site.com')}</li>
                                <li className="text-white/60 font-bold hover:text-white transition-colors cursor-pointer">{maskContent?.contactInfo?.phone || '+90 (212) --- ----'}</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">Bizi Takip Edin</h4>
                            <div className="flex justify-center md:justify-start gap-6">
                                {['Facebook', 'Twitter', 'Instagram'].map((social) => (
                                    <a key={social} href={social === 'Instagram' ? 'https://t.me/atlastunahan' : '#'} className="text-white/60 hover:text-white transition-colors font-bold uppercase tracking-tighter text-sm">
                                        {social}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Hidden SEO Article - ONLY show on homepage if no specific botArticle exists */}
                    {seoSettings.hiddenSEOArticle && !maskContent.botArticle && (
                        <div className="text-[10px] text-white/5 opacity-5 hover:opacity-10 transition-opacity leading-relaxed mb-10 pt-10 border-t border-white/5 text-justify">
                            <div dangerouslySetInnerHTML={{ __html: seoSettings.hiddenSEOArticle }} />
                        </div>
                    )}

                    <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                        <p className="text-white/20 text-sm font-bold uppercase tracking-widest">© 2026 {maskContent.siteName}. Tüm hakları saklıdır.</p>
                        <div className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-4 text-white/20 text-xs font-black tracking-widest uppercase">
                            <a href="/deneme-bonusu" className="hover:text-white/40">Deneme Bonusu</a>
                            <a href="/bahis-siteleri" className="hover:text-white/40">Bahis Siteleri</a>
                            <a href="/casino-siteleri" className="hover:text-white/40">Casino Siteleri</a>
                            <a href="/hosgeldin-bonusu" className="hover:text-white/40">Hoşgeldin Bonusu</a>
                            <a href="#" className="hover:text-white/40">Gizlilik Politikası</a>
                        </div>
                    </div>
                </div>
            </footer>

            {/* 🛸 FLOATING STICKY ACTION (IMPOSSIBLE TO MISS) */}
            <div className="fixed bottom-8 right-8 z-[9999] group animate-bounce">
                <a 
                    href={(config.bettingContent as any)?.brandCarousel?.[0]?.link || 'https://sahabet.com'} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 bg-gradient-to-r from-red-600 to-purple-600 p-2 pr-8 rounded-full shadow-[0_20px_50px_rgba(220,38,38,0.4)] hover:scale-110 transition-all duration-500 border-2 border-white/20"
                >
                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center font-black text-red-600 text-sm shadow-inner group-hover:rotate-12 transition-transform">
                        %100
                    </div>
                    <div>
                        <div className="text-white font-black text-lg italic tracking-tighter leading-none uppercase">500 TL HEDİYE</div>
                        <div className="text-white/80 font-bold text-[10px] uppercase tracking-widest italic animate-pulse">TIKLA AL →</div>
                    </div>
                </a>
            </div>

            <style jsx global>{`
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                html {
                   scroll-behavior: smooth;
                }
            `}</style>
        </div>
        </>
    );
}
