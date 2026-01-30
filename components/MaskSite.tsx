'use client';

import type { SiteConfig } from '@/lib/types';
import { Shield, Award, Users, TrendingUp, Mail, Phone, MapPin } from 'lucide-react';
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
            className="min-h-screen"
            style={{
                '--primary': colorScheme.primary,
                '--secondary': colorScheme.secondary,
                '--accent': colorScheme.accent,
                background: `linear-gradient(to bottom right, #f8fafc, ${colorScheme.primary}10, #f8fafc)`
            } as any}
        >
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            {maskContent.logo && (
                                <img src={maskContent.logo} alt={maskContent.siteName} className="h-10 w-10 object-contain" />
                            )}
                            <h1 className="text-2xl font-bold bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(to right, var(--primary), var(--secondary))` }}>
                                {maskContent.siteName}
                            </h1>
                        </div>
                        <nav className="hidden md:flex gap-6">
                            <a href="#services" className="text-gray-700 hover:text-[var(--primary)] transition-colors">Hizmetler</a>
                            <a href="#features" className="text-gray-700 hover:text-[var(--primary)] transition-colors">Özellikler</a>
                            <a href="#testimonials" className="text-gray-700 hover:text-[var(--primary)] transition-colors">Referanslar</a>
                            <a href="#contact" className="text-gray-700 hover:text-[var(--primary)] transition-colors">İletişim</a>
                        </nav>
                        <Button style={{ backgroundImage: `linear-gradient(to right, var(--primary), var(--secondary))`, color: 'white' }}>
                            İletişime Geç
                        </Button>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="container mx-auto px-4 py-20">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-5xl md:text-6xl font-bold leading-tight">
                            <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(to right, var(--primary), var(--secondary), var(--accent))` }}>
                                {maskContent.heroTitle}
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            {maskContent.heroSubtitle}
                        </p>
                        <div className="flex gap-4">
                            <Button size="lg" style={{ backgroundImage: `linear-gradient(to right, var(--primary), var(--secondary))`, color: 'white' }}>
                                Hemen Başla
                            </Button>
                            <Button size="lg" variant="outline" style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}>
                                Daha Fazla Bilgi
                            </Button>
                        </div>
                    </div>
                    {maskContent.heroImage && (
                        <div className="relative">
                            <div className="absolute inset-0 rounded-3xl blur-3xl opacity-20" style={{ backgroundImage: `linear-gradient(to right, var(--primary), var(--secondary))` }}></div>
                            <img
                                src={maskContent.heroImage}
                                alt="Hero"
                                className="relative rounded-3xl shadow-2xl w-full h-auto object-cover"
                            />
                        </div>
                    )}
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="container mx-auto px-4 py-20 bg-white/50 backdrop-blur-sm rounded-3xl my-12">
                <div className="text-center mb-12">
                    <h3 className="text-4xl font-bold mb-4 bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(to right, var(--primary), var(--secondary))` }}>
                        Neden Bizi Seçmelisiniz?
                    </h3>
                    <p className="text-gray-600 text-lg">Sektörde fark yaratan özelliklerimiz</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {maskContent.features.map((feature) => (
                        <Card key={feature.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-white to-slate-50">
                            <CardHeader>
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundImage: `linear-gradient(to right, var(--primary), var(--secondary))` }}>
                                    <Shield className="w-6 h-6 text-white" />
                                </div>
                                <CardTitle className="text-xl">{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-gray-600">{feature.description}</CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="container mx-auto px-4 py-20">
                <div className="text-center mb-12">
                    <h3 className="text-4xl font-bold mb-4 bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(to right, var(--primary), var(--secondary))` }}>
                        Hizmetlerimiz
                    </h3>
                    <p className="text-gray-600 text-lg">Size özel çözümler sunuyoruz</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {maskContent.services.map((service) => (
                        <Card key={service.id} className="border-0 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 bg-white">
                            {service.image && (
                                <div className="h-48 overflow-hidden rounded-t-lg">
                                    <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
                                </div>
                            )}
                            <CardHeader>
                                <CardTitle className="text-2xl">{service.name}</CardTitle>
                                {service.price && (
                                    <p className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>{service.price}</p>
                                )}
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">{service.description}</p>
                                <Button className="w-full mt-4 text-white" style={{ backgroundImage: `linear-gradient(to right, var(--primary), var(--secondary))` }}>
                                    Detaylı Bilgi
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" className="container mx-auto px-4 py-20 rounded-3xl my-12" style={{ backgroundImage: `linear-gradient(to right, var(--primary), var(--secondary))` }}>
                <div className="text-center mb-12">
                    <h3 className="text-4xl font-bold mb-4 text-white">
                        Müşterilerimiz Ne Diyor?
                    </h3>
                    <p className="text-white/80 text-lg">Binlerce mutlu müşterimizden bazıları</p>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                    {maskContent.testimonials.map((testimonial) => (
                        <Card key={testimonial.id} className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                            <CardHeader>
                                <div className="flex items-center gap-4">
                                    {testimonial.avatar && (
                                        <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full" />
                                    )}
                                    <div>
                                        <CardTitle className="text-white">{testimonial.name}</CardTitle>
                                        <CardDescription className="text-white/70">{testimonial.role}</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-white/90 italic">&quot;{testimonial.content}&quot;</p>
                                <div className="flex gap-1 mt-4">
                                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                                        <span key={i} className="text-yellow-400">★</span>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="container mx-auto px-4 py-20">
                <div className="text-center mb-12">
                    <h3 className="text-4xl font-bold mb-4 bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(to right, var(--primary), var(--secondary))` }}>
                        İletişime Geçin
                    </h3>
                    <p className="text-gray-600 text-lg">Size nasıl yardımcı olabiliriz?</p>
                </div>
                <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundImage: `linear-gradient(to right, var(--primary), var(--secondary))` }}>
                                <Mail className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-lg mb-1">Email</h4>
                                <p className="text-gray-600">{maskContent.contactInfo.email}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundImage: `linear-gradient(to right, var(--primary), var(--secondary))` }}>
                                <Phone className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-lg mb-1">Telefon</h4>
                                <p className="text-gray-600">{maskContent.contactInfo.phone}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundImage: `linear-gradient(to right, var(--primary), var(--secondary))` }}>
                                <MapPin className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-lg mb-1">Adres</h4>
                                <p className="text-gray-600">{maskContent.contactInfo.address}</p>
                            </div>
                        </div>
                    </div>
                    <Card className="border-0 shadow-xl">
                        <CardHeader>
                            <CardTitle>Mesaj Gönderin</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-4">
                                <input type="text" placeholder="Adınız" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--primary)] outline-none" />
                                <input type="email" placeholder="Email" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--primary)] outline-none" />
                                <textarea placeholder="Mesajınız" rows={4} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--primary)] outline-none"></textarea>
                                <Button className="w-full text-white" style={{ backgroundImage: `linear-gradient(to right, var(--primary), var(--secondary))` }}>
                                    Gönder
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Footer with Hidden SEO Article */}
            <footer className="bg-slate-900 text-white py-12">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <h4 className="font-bold text-lg mb-4">{maskContent.siteName}</h4>
                            <p className="text-white/60 text-sm">{maskContent.heroSubtitle}</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-lg mb-4">Hızlı Linkler</h4>
                            <ul className="space-y-2 text-white/60 text-sm">
                                <li><a href="#services" className="hover:text-white transition-colors">Hizmetler</a></li>
                                <li><a href="#features" className="hover:text-white transition-colors">Özellikler</a></li>
                                <li><a href="#testimonials" className="hover:text-white transition-colors">Referanslar</a></li>
                                <li><a href="#contact" className="hover:text-white transition-colors">İletişim</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-lg mb-4">İletişim</h4>
                            <ul className="space-y-2 text-white/60 text-sm">
                                <li>{maskContent.contactInfo.email}</li>
                                <li>{maskContent.contactInfo.phone}</li>
                                <li>{maskContent.contactInfo.address}</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-lg mb-4">Sosyal Medya</h4>
                            <div className="flex gap-4">
                                {maskContent.contactInfo.socialMedia.facebook && (
                                    <a href={maskContent.contactInfo.socialMedia.facebook} className="text-white/60 hover:text-white transition-colors">Facebook</a>
                                )}
                                {maskContent.contactInfo.socialMedia.twitter && (
                                    <a href={maskContent.contactInfo.socialMedia.twitter} className="text-white/60 hover:text-white transition-colors">Twitter</a>
                                )}
                                {maskContent.contactInfo.socialMedia.instagram && (
                                    <a href={maskContent.contactInfo.socialMedia.instagram} className="text-white/60 hover:text-white transition-colors">Instagram</a>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Hidden SEO Article for Bots */}
                    {seoSettings.hiddenSEOArticle && (
                        <div className="text-xs text-slate-700 leading-relaxed mt-8 pt-8 border-t border-slate-800">
                            <div dangerouslySetInnerHTML={{ __html: seoSettings.hiddenSEOArticle }} />
                        </div>
                    )}

                    <div className="text-center text-white/40 text-sm pt-8 border-t border-slate-800">
                        <p>&copy; 2026 {maskContent.siteName}. Tüm hakları saklıdır.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
