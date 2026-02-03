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

    return (
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
                                <img src={maskContent.logo} alt={maskContent.siteName} className="w-6 h-6 object-contain brightness-0 invert" />
                            ) : (
                                <Shield className="w-6 h-6 text-white" />
                            )}
                        </div>
                        <span className="text-xl font-bold tracking-tight text-slate-800">
                            {maskContent.siteName}
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
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-[10px] font-bold text-emerald-600 uppercase tracking-tighter shadow-sm animate-pulse">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                Son Güncelleme: {new Date().toLocaleDateString('tr-TR')}
                            </div>
                        </div>

                        <h2 className="text-6xl lg:text-8xl font-black tracking-tight leading-[0.9] font-outfit">
                            <span className="block text-slate-900">{maskContent.heroTitle.split(' ').slice(0, -1).join(' ')}</span>
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)]">
                                {maskContent.heroTitle.split(' ').slice(-1)}
                            </span>
                        </h2>

                        <p className="text-xl text-slate-600 leading-relaxed max-w-lg">
                            {maskContent.heroSubtitle}
                        </p>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <Button size="lg" className="h-16 px-8 rounded-2xl text-lg font-bold shadow-2xl shadow-primary/25 hover:shadow-primary/40 text-white"
                                style={{ backgroundImage: `linear-gradient(135deg, var(--primary), var(--secondary))` }}>
                                Ücretsiz Danışmanlık
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                            <Button size="lg" variant="ghost" className="h-16 px-8 rounded-2xl text-lg font-bold text-slate-600 hover:bg-slate-100">
                                Portfolyo
                            </Button>
                        </div>

                        <div className="flex items-center gap-8 pt-10 border-t border-slate-100">
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
                        </div>
                    </div>

                    <div className="relative lg:h-[600px] flex items-center justify-center">
                        {/* Abstract Decorative Elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-slate-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
                        <div className="absolute -bottom-8 -left-8 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />

                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-[40px] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                            {maskContent.heroImage ? (
                                <img
                                    src={maskContent.heroImage}
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
                        {maskContent.services.map((service, idx) => (
                            <Card key={service.id} className="border-0 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-500 group overflow-hidden rounded-[32px] bg-white">
                                {service.image && (
                                    <div className="h-64 overflow-hidden">
                                        <img src={service.image} alt={service.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
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
                                {maskContent.features.map((feature, idx) => (
                                    <div key={feature.id}
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
                        {maskContent.testimonials.map((t) => (
                            <div key={t.id} className="p-10 rounded-[40px] bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors group">
                                <div className="flex gap-1 mb-8">
                                    {Array.from({ length: t.rating }).map((_, i) => (
                                        <TrendingUp key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-xl text-white/80 leading-relaxed mb-10 font-medium tracking-tight">
                                    &quot;{t.content}&quot;
                                </p>
                                <div className="flex items-center gap-4">
                                    {t.avatar ? (
                                        <img src={t.avatar} className="w-14 h-14 rounded-full border-2 border-[var(--primary)] object-cover" />
                                    ) : (
                                        <div className="w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center font-bold text-white text-xl">
                                            {t.name[0]}
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
                                { icon: Mail, label: 'E-posta', value: maskContent.contactInfo.email },
                                { icon: Phone, label: 'Telefon', value: maskContent.contactInfo.phone },
                                { icon: MapPin, label: 'Ofis', value: maskContent.contactInfo.address }
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

            {/* Footer */}
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
                                <li className="text-white/60 font-bold hover:text-white transition-colors cursor-pointer">{maskContent.contactInfo.email}</li>
                                <li className="text-white/60 font-bold hover:text-white transition-colors cursor-pointer">{maskContent.contactInfo.phone}</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">Bizi Takip Edin</h4>
                            <div className="flex justify-center md:justify-start gap-6">
                                {['Facebook', 'Twitter', 'Instagram'].map((social) => (
                                    <a key={social} href="#" className="text-white/60 hover:text-white transition-colors font-bold uppercase tracking-tighter text-sm">
                                        {social}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Hidden SEO Article */}
                    {seoSettings.hiddenSEOArticle && (
                        <div className="text-[10px] text-white/5 opacity-5 hover:opacity-10 transition-opacity leading-relaxed mb-10 pt-10 border-t border-white/5 text-justify">
                            <div dangerouslySetInnerHTML={{ __html: seoSettings.hiddenSEOArticle }} />
                        </div>
                    )}

                    <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                        <p className="text-white/20 text-sm font-bold uppercase tracking-widest">© 2026 {maskContent.siteName}. Tüm hakları saklıdır.</p>
                        <div className="flex gap-8 text-white/20 text-xs font-black tracking-widest uppercase">
                            <a href="#" className="hover:text-white/40">Gizlilik Politikası</a>
                            <a href="#" className="hover:text-white/40">Kullanım Şartları</a>
                        </div>
                    </div>
                </div>
            </footer>

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
    );
}
