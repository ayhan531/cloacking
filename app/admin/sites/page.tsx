'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Search, Globe, Shield, Trash2, Power, Edit2, Loader2, Download, Eye, TrendingUp } from 'lucide-react';
import type { SiteConfig, MaskContent, BettingContent, CloakingRules, SEOSettings, MaskType } from '@/lib/types';
import { useAuth } from '@/components/AuthProvider';

const initialMaskContent: MaskContent = {
    siteName: 'ProSolutions Tech',
    heroTitle: 'Dijital Geleceğinizi Bizimle İnşa Edin',
    heroSubtitle: 'Yapay zeka destekli altyapımız ve uzman kadromuzla işinizi bir üst seviyeye taşıyoruz. Modern tasarım ve yüksek performans bir arada.',
    features: [
        { id: '1', icon: 'Shield', title: 'Hızlı Entegrasyon', description: 'Mevcut sistemlerinize saatler içinde uyum sağlar.' },
        { id: '2', icon: 'Shield', title: 'Yüksek Güvenlik', description: 'Uçtan uca şifreleme ve gelişmiş koruma protokolleri.' },
        { id: '3', icon: 'Shield', title: '7/24 Destek', description: 'Teknik ekibimiz her ihtiyacınızda yanınızda.' },
        { id: '4', icon: 'Shield', title: 'Ölçeklenebilir', description: 'İşiniz büyüdükçe altyapımız size ayak uydurur.' }
    ],
    services: [
        { id: '1', name: 'Yazılım Geliştirme', description: 'Size özel kurumsal yazılım çözümleri.', price: 'Başlangıç: $999' },
        { id: '2', name: 'Dijital Pazarlama', description: 'Hedef kitlenize ulaşmanın en kısa yolu.', price: 'Haftalık: $199' },
        { id: '3', name: 'Bulut Altyapı', description: 'Kesintisiz ve güvenli hosting hizmetleri.', price: 'Yıllık: $499' }
    ],
    testimonials: [
        { id: '1', name: 'Ahmet Yılmaz', role: 'CEO, TechCorp', content: 'Çalışmaya başladığımızdan beri verimliliğimiz %40 arttı.', rating: 5 },
        { id: '2', name: 'Selin Yıldız', role: 'Kurucu, DesignHub', content: 'Tasarım ve hız konusunda beklentilerimin çok üzerindeler.', rating: 5 }
    ],
    contactInfo: {
        email: 'info@prosolutions.tech',
        phone: '+90 212 555 0101',
        address: 'Levent, Büyükdere Cad. No:199, İstanbul',
        socialMedia: {
            facebook: '#',
            twitter: '#',
            instagram: '#'
        }
    },
    colorScheme: {
        primary: '#6366F1',
        secondary: '#A855F7',
        accent: '#F43F5E',
        background: '#FFFFFF',
        text: '#1F2937'
    }
};

const initialBettingContent: BettingContent = {
    theme: {
        primaryColor: '#9333EA', // Purple from images
        secondaryColor: '#3B82F6', // Blue
        backgroundColor: '#0F172A', // Navy Dark
    },
    topBanner: { id: '1', title: 'Venombet 2.500 TL Bonus', link: '#', isActive: true },
    bottomBanner: { id: '2', title: 'Betsin 2.500 TL Bonus', link: '#', isActive: true },
    brandCarousel: [],
    bonuses: [],
    giveaways: [],
    liveWinners: [],
    games: [],
    navigation: [
        { id: '1', label: 'Anasayfa', icon: 'Home', link: '/', isActive: true },
        { id: '2', label: 'Kazananlar', icon: 'Trophy', link: '/winners', isActive: true },
        { id: '3', label: 'Çark', icon: 'Disc', link: '/wheel', isActive: true },
        { id: '4', label: 'Çekilişler', icon: 'Gift', link: '/giveaways', isActive: true },
        { id: '5', label: 'Telegram', icon: 'Send', link: '#', isActive: true },
        { id: '6', label: 'İletişim', icon: 'Plus', link: '#', isActive: true },
    ],
    wheelItems: [
        { id: '1', label: '2.500 TL', color: '#00C2E0' },
        { id: '2', label: '2.500 TL', color: '#FF4D4D' },
        { id: '3', label: '2.500 TL', color: '#FF9900' },
        { id: '4', label: '2.500 TL', color: '#E91E63' },
        { id: '5', label: '5.555 TL', color: '#9C27B0' },
        { id: '6', label: '2.700 TL', color: '#FFEB3B' },
        { id: '7', label: '3.300 TL', color: '#4CAF50' },
        { id: '8', label: '2.500 TL', color: '#F44336' },
    ],
    popups: [],
    popupLayout: 'single',
    mobileImmediatePopup: true,
    heroSlides: [],
    trendSites: []
};

const initialCloakingRules: CloakingRules = {
    showMaskTo: {
        desktop: true,
        bots: true,
        excludedCountries: []
    },
    showBettingTo: {
        mobile: true,
        includedCountries: ['TR', 'CY']
    },
    userAgentRules: [],
    ipBlacklist: [],
    redirectMaskTo: ''
};

const initialSEOSettings: SEOSettings = {
    metaTitle: '',
    metaDescription: '',
    keywords: [],
    hiddenSEOArticle: '',
    googleAnalyticsId: '',
    facebookPixelId: ''
};

export default function SitesPage() {
    const { isAdmin } = useAuth();
    const [sites, setSites] = useState<SiteConfig[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingSiteId, setEditingSiteId] = useState<string | null>(null);

    // Form State
    const [newSite, setNewSite] = useState<{
        name: string;
        domain: string;
        maskType: MaskType;
        maskContent: MaskContent;
        bettingContent: BettingContent;
        cloakingRules: CloakingRules;
        seoSettings: SEOSettings;
    }>({
        name: '',
        domain: '',
        maskType: 'corporate',
        maskContent: initialMaskContent,
        bettingContent: initialBettingContent,
        cloakingRules: initialCloakingRules,
        seoSettings: initialSEOSettings
    });

    const stats = {
        total: sites.length,
        active: sites.filter(s => s.isActive).length,
        hits: sites.reduce((acc, s) => acc + (s.analytics?.totalHits || 0), 0),
        blocked: sites.reduce((acc, s) => acc + (s.analytics?.botHits || 0), 0)
    };

    useEffect(() => {
        fetchSites();
    }, []);

    const fetchSites = async () => {
        try {
            const response = await fetch('/api/sites');
            if (response.ok) {
                const data = await response.json();
                setSites(data);
            }
        } catch (error) {
            console.error('Error fetching sites:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEditClick = (site: SiteConfig) => {
        setNewSite({
            name: site.name,
            domain: site.domain,
            maskType: site.maskType,
            maskContent: {
                ...initialMaskContent,
                ...site.maskContent
            },
            bettingContent: {
                ...initialBettingContent,
                ...site.bettingContent
            },
            cloakingRules: {
                ...initialCloakingRules,
                ...site.cloakingRules,
                showMaskTo: { ...initialCloakingRules.showMaskTo, ...site.cloakingRules.showMaskTo },
                showBettingTo: { ...initialCloakingRules.showBettingTo, ...site.cloakingRules.showBettingTo }
            },
            seoSettings: {
                ...initialSEOSettings,
                ...site.seoSettings
            }
        });
        setEditingSiteId(site.id);
        setIsCreateDialogOpen(true);
    };

    const handleCreateSite = async () => {
        if (!newSite.name || !newSite.domain) return;
        setIsSubmitting(true);
        try {
            const url = editingSiteId ? `/api/sites/${editingSiteId}` : '/api/sites';
            const method = editingSiteId ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newSite),
            });

            if (response.ok) {
                setIsCreateDialogOpen(false);
                setEditingSiteId(null);
                setNewSite({
                    name: '',
                    domain: '',
                    maskType: 'corporate',
                    maskContent: initialMaskContent,
                    bettingContent: initialBettingContent,
                    cloakingRules: initialCloakingRules,
                    seoSettings: initialSEOSettings
                });
                fetchSites();
            }
        } catch (error) {
            console.error('Error saving site:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const toggleSiteStatus = async (id: string, currentStatus: boolean) => {
        try {
            const response = await fetch(`/api/sites/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ isActive: !currentStatus }),
            });

            if (response.ok) {
                fetchSites();
            }
        } catch (error) {
            console.error('Error toggling site status:', error);
        }
    };

    const handleDeleteSite = async (id: string) => {
        if (!confirm('Bu siteyi silmek istediğinize emin misiniz?')) return;

        try {
            const response = await fetch(`/api/sites/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchSites();
            }
        } catch (error) {
            console.error('Error deleting site:', error);
        }
    };

    const filteredSites = sites.filter(site =>
        site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        site.domain.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Toplam Site</CardTitle>
                        <Globe className="h-4 w-4 text-white" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.total}</div>
                        <p className="text-xs text-blue-100">Tüm siteleriniz</p>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-green-500 to-teal-600 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Aktif Site</CardTitle>
                        <Power className="h-4 w-4 text-white" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.active}</div>
                        <p className="text-xs text-green-100">Şu anda yayında olanlar</p>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-yellow-500 to-orange-600 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Toplam Hit</CardTitle>
                        <TrendingUp className="h-4 w-4 text-white" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.hits}</div>
                        <p className="text-xs text-yellow-100">Tüm sitelerdeki toplam ziyaret</p>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-red-500 to-pink-600 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Engellenen Bot</CardTitle>
                        <Shield className="h-4 w-4 text-white" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.blocked}</div>
                        <p className="text-xs text-red-100">Cloaking tarafından engellenen botlar</p>
                    </CardContent>
                </Card>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                        Site Komuta Merkezi
                    </h1>
                    <p className="text-gray-600 text-lg">Tüm cloaking ağınızı buradan yönetin ve izleyin.</p>
                </div>

                <Dialog open={isCreateDialogOpen} onOpenChange={(open) => {
                    setIsCreateDialogOpen(open);
                    if (!open) setEditingSiteId(null);
                }}>
                    <DialogTrigger asChild>
                        <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                            <Plus className="w-4 h-4 mr-2" />
                            Yeni Site Oluştur
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Yeni Site Oluştur</DialogTitle>
                            <DialogDescription>
                                Yeni bir cloaking sitesi oluşturun. Tüm içerikler SQL veritabanına kaydedilir.
                            </DialogDescription>
                        </DialogHeader>

                        <Tabs defaultValue="basic" className="mt-4">
                            <TabsList className="grid grid-cols-6 w-full">
                                <TabsTrigger value="basic">Temel</TabsTrigger>
                                <TabsTrigger value="design">Tasarım</TabsTrigger>
                                <TabsTrigger value="mask">Mask Content</TabsTrigger>
                                <TabsTrigger value="bet">Bet Content</TabsTrigger>
                                <TabsTrigger value="cloaking">SEO & Cloaking</TabsTrigger>
                                <TabsTrigger value="advanced">Takip & Gelişmiş</TabsTrigger>
                            </TabsList>

                            <TabsContent value="basic" className="space-y-4 pt-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Site İsmi (Admin İçin)</Label>
                                        <Input
                                            placeholder="Örn: Sigorta Projesi"
                                            value={newSite.name}
                                            onChange={(e) => setNewSite({ ...newSite, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Domain</Label>
                                        <Input
                                            placeholder="Örn: sigorta-projesi.com"
                                            value={newSite.domain}
                                            onChange={(e) => setNewSite({ ...newSite, domain: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Maske Türü</Label>
                                    <select
                                        className="w-full p-2 border rounded-md"
                                        value={newSite.maskType}
                                        onChange={(e) => setNewSite({ ...newSite, maskType: e.target.value as any })}
                                    >
                                        <option value="corporate">Kurumsal / Şirket</option>
                                        <option value="insurance">Sigorta / Finans</option>
                                        <option value="ecommerce">E-Ticaret</option>
                                        <option value="blog">Blog / Haber</option>
                                    </select>
                                </div>
                            </TabsContent>

                            <TabsContent value="design" className="space-y-4 pt-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-sm">Renk Paleti (Maske Site)</CardTitle>
                                    </CardHeader>
                                    <CardContent className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Birincil Renk (Primary)</Label>
                                            <div className="flex gap-2">
                                                <input
                                                    type="color"
                                                    className="w-10 h-10 p-0 border-0"
                                                    value={newSite.maskContent.colorScheme.primary}
                                                    onChange={(e) => setNewSite({
                                                        ...newSite,
                                                        maskContent: {
                                                            ...newSite.maskContent,
                                                            colorScheme: { ...newSite.maskContent.colorScheme, primary: e.target.value }
                                                        }
                                                    })}
                                                />
                                                <Input value={newSite.maskContent.colorScheme.primary} onChange={(e) => setNewSite({
                                                    ...newSite,
                                                    maskContent: {
                                                        ...newSite.maskContent,
                                                        colorScheme: { ...newSite.maskContent.colorScheme, primary: e.target.value }
                                                    }
                                                })} />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>İkincil Renk (Secondary)</Label>
                                            <div className="flex gap-2">
                                                <input
                                                    type="color"
                                                    className="w-10 h-10 p-0 border-0"
                                                    value={newSite.maskContent.colorScheme.secondary}
                                                    onChange={(e) => setNewSite({
                                                        ...newSite,
                                                        maskContent: {
                                                            ...newSite.maskContent,
                                                            colorScheme: { ...newSite.maskContent.colorScheme, secondary: e.target.value }
                                                        }
                                                    })}
                                                />
                                                <Input value={newSite.maskContent.colorScheme.secondary} readOnly />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="mask" className="space-y-4 pt-4">
                                <div className="space-y-2">
                                    <Label>Ziyaretçi Başlığı (Hero Title)</Label>
                                    <Input
                                        placeholder="Güvenilir Çözümler Sunuyoruz"
                                        value={newSite.maskContent.heroTitle}
                                        onChange={(e) => setNewSite({
                                            ...newSite,
                                            maskContent: { ...newSite.maskContent, heroTitle: e.target.value }
                                        })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Alt Başlık (Hero Subtitle)</Label>
                                    <Textarea
                                        placeholder="İşletmeniz için profesyonel destek ekibimizle yanınızdayız."
                                        value={newSite.maskContent.heroSubtitle}
                                        onChange={(e) => setNewSite({
                                            ...newSite,
                                            maskContent: { ...newSite.maskContent, heroSubtitle: e.target.value }
                                        })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Hizmetler (Örn: Yangın Sigortası, Kasko)</Label>
                                    <p className="text-xs text-gray-500 mb-2">Virgülle ayırarak hızlıca ekleyebilirsiniz.</p>
                                    <Input
                                        placeholder="Hizmet 1, Hizmet 2, Hizmet 3"
                                        onBlur={(e) => {
                                            const services = e.target.value.split(',').map(s => ({
                                                id: Math.random().toString(36).substr(2, 9),
                                                name: s.trim(),
                                                description: 'Profesyonel hizmet çözümümüz.',
                                            })).filter(s => s.name);
                                            setNewSite({
                                                ...newSite,
                                                maskContent: { ...newSite.maskContent, services }
                                            });
                                        }}
                                    />
                                </div>
                            </TabsContent>

                            <TabsContent value="bet" className="space-y-4 pt-4">
                                <Tabs defaultValue="bet-theme" className="w-full">
                                    <TabsList className="flex overflow-x-auto w-full no-scrollbar h-auto py-1 bg-slate-100 rounded-lg">
                                        <TabsTrigger value="bet-theme" className="text-[10px] px-3 whitespace-nowrap">Renkler</TabsTrigger>
                                        <TabsTrigger value="bet-banners" className="text-[10px] px-3 whitespace-nowrap">Reklamlar</TabsTrigger>
                                        <TabsTrigger value="bet-trends" className="text-[10px] px-3 whitespace-nowrap">Trend Siteler</TabsTrigger>
                                        <TabsTrigger value="bet-bonuses" className="text-[10px] px-3 whitespace-nowrap">Deneme Bonusları</TabsTrigger>
                                        <TabsTrigger value="bet-giveaways" className="text-[10px] px-3 whitespace-nowrap">Çekilişler</TabsTrigger>
                                        <TabsTrigger value="bet-winners" className="text-[10px] px-3 whitespace-nowrap">Kazananlar</TabsTrigger>
                                        <TabsTrigger value="bet-popups" className="text-[10px] px-3 whitespace-nowrap">Pop-uplar</TabsTrigger>
                                        <TabsTrigger value="bet-slider" className="text-[10px] px-3 whitespace-nowrap">Slider</TabsTrigger>
                                        <TabsTrigger value="bet-items" className="text-[10px] px-3 whitespace-nowrap">Markalar</TabsTrigger>
                                    </TabsList>

                                    {/* Bet Colors */}
                                    <TabsContent value="bet-theme" className="pt-4 space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label>Birincil Renk (Mor/Butonlar)</Label>
                                                <div className="flex gap-2">
                                                    <input type="color" value={newSite.bettingContent.theme.primaryColor}
                                                        onChange={(e) => setNewSite({
                                                            ...newSite,
                                                            bettingContent: { ...newSite.bettingContent, theme: { ...newSite.bettingContent.theme, primaryColor: e.target.value } }
                                                        })} />
                                                    <Input value={newSite.bettingContent.theme.primaryColor} readOnly />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Arkaplan Rengi (Koyu)</Label>
                                                <div className="flex gap-2">
                                                    <input type="color" value={newSite.bettingContent.theme.backgroundColor}
                                                        onChange={(e) => setNewSite({
                                                            ...newSite,
                                                            bettingContent: { ...newSite.bettingContent, theme: { ...newSite.bettingContent.theme, backgroundColor: e.target.value } }
                                                        })} />
                                                    <Input value={newSite.bettingContent.theme.backgroundColor} readOnly />
                                                </div>
                                            </div>
                                        </div>
                                    </TabsContent>

                                    {/* Banners */}
                                    <TabsContent value="bet-banners" className="pt-4 space-y-4">
                                        <Card className="p-4 bg-slate-50 space-y-4">
                                            <div className="flex items-center justify-between">
                                                <Label className="font-bold">Üst Reklam Barı (Top Banner)</Label>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[10px] font-medium text-gray-500">{newSite.bettingContent.topBanner?.isActive ? 'AKTİF' : 'PASİF'}</span>
                                                    <input type="checkbox" checked={newSite.bettingContent.topBanner?.isActive}
                                                        onChange={(e) => setNewSite({ ...newSite, bettingContent: { ...newSite.bettingContent, topBanner: { ...newSite.bettingContent.topBanner!, isActive: e.target.checked } } })} />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <Input placeholder="Başlık (Örn: Venombet 2.500 TL)" value={newSite.bettingContent.topBanner?.title}
                                                    onChange={(e) => setNewSite({ ...newSite, bettingContent: { ...newSite.bettingContent, topBanner: { ...newSite.bettingContent.topBanner!, title: e.target.value } } })} />
                                                <Input placeholder="Alt Başlık (Örn: Sınırlı Süre Fırsatı)" value={newSite.bettingContent.topBanner?.subtitle}
                                                    onChange={(e) => setNewSite({ ...newSite, bettingContent: { ...newSite.bettingContent, topBanner: { ...newSite.bettingContent.topBanner!, subtitle: e.target.value } } })} />
                                                <Input placeholder="Buton Yazısı (Örn: KATIL)" value={newSite.bettingContent.topBanner?.buttonText}
                                                    onChange={(e) => setNewSite({ ...newSite, bettingContent: { ...newSite.bettingContent, topBanner: { ...newSite.bettingContent.topBanner!, buttonText: e.target.value } } })} />
                                                <Input placeholder="Yönlendirme Linki" value={newSite.bettingContent.topBanner?.link}
                                                    onChange={(e) => setNewSite({ ...newSite, bettingContent: { ...newSite.bettingContent, topBanner: { ...newSite.bettingContent.topBanner!, link: e.target.value } } })} />
                                            </div>
                                        </Card>
                                        <Card className="p-4 bg-slate-50 space-y-4">
                                            <div className="flex items-center justify-between">
                                                <Label className="font-bold">Alt Reklam Barı (Bottom Banner)</Label>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[10px] font-medium text-gray-500">{newSite.bettingContent.bottomBanner?.isActive ? 'AKTİF' : 'PASİF'}</span>
                                                    <input type="checkbox" checked={newSite.bettingContent.bottomBanner?.isActive}
                                                        onChange={(e) => setNewSite({ ...newSite, bettingContent: { ...newSite.bettingContent, bottomBanner: { ...newSite.bettingContent.bottomBanner!, isActive: e.target.checked } } })} />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <Input placeholder="Başlık" value={newSite.bettingContent.bottomBanner?.title}
                                                    onChange={(e) => setNewSite({ ...newSite, bettingContent: { ...newSite.bettingContent, bottomBanner: { ...newSite.bettingContent.bottomBanner!, title: e.target.value } } })} />
                                                <Input placeholder="Alt Başlık" value={newSite.bettingContent.bottomBanner?.subtitle}
                                                    onChange={(e) => setNewSite({ ...newSite, bettingContent: { ...newSite.bettingContent, bottomBanner: { ...newSite.bettingContent.bottomBanner!, subtitle: e.target.value } } })} />
                                                <Input placeholder="Buton Yazısı" value={newSite.bettingContent.bottomBanner?.buttonText}
                                                    onChange={(e) => setNewSite({ ...newSite, bettingContent: { ...newSite.bettingContent, bottomBanner: { ...newSite.bettingContent.bottomBanner!, buttonText: e.target.value } } })} />
                                                <Input placeholder="Yönlendirme Linki" value={newSite.bettingContent.bottomBanner?.link}
                                                    onChange={(e) => setNewSite({ ...newSite, bettingContent: { ...newSite.bettingContent, bottomBanner: { ...newSite.bettingContent.bottomBanner!, link: e.target.value } } })} />
                                            </div>
                                        </Card>
                                    </TabsContent>

                                    {/* Trend Siteler */}
                                    <TabsContent value="bet-trends" className="pt-4 space-y-4">
                                        <Card className="p-4 border-dashed border-2">
                                            <Label className="block mb-4 font-bold">Yeni Trend Site Ekle</Label>
                                            <div className="grid grid-cols-2 gap-4 mb-4">
                                                <Input id="trend-name" placeholder="Site Adı" />
                                                <Input id="trend-link" placeholder="Yönlendirme Linki" />
                                                <Input id="trend-logo" placeholder="Logo URL" className="col-span-2" />
                                            </div>
                                            <Button className="w-full" variant="secondary" onClick={() => {
                                                const name = (document.getElementById('trend-name') as HTMLInputElement).value;
                                                const link = (document.getElementById('trend-link') as HTMLInputElement).value;
                                                const logo = (document.getElementById('trend-logo') as HTMLInputElement).value;
                                                if (!name) return;
                                                const newTrend = { id: Math.random().toString(36).substr(2, 9), name, link, logo };
                                                setNewSite({ ...newSite, bettingContent: { ...newSite.bettingContent, trendSites: [...(newSite.bettingContent.trendSites || []), newTrend] } });
                                            }}>Siteyi Ekle</Button>
                                        </Card>
                                        <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                                            {(newSite.bettingContent.trendSites || []).map((s, idx) => (
                                                <div key={idx} className="flex items-center justify-between p-2 bg-blue-50 rounded border text-[10px]">
                                                    <span className="truncate max-w-[80px] font-medium">{s.name}</span>
                                                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-red-500" onClick={() => {
                                                        const newList = newSite.bettingContent.trendSites.filter((_, i) => i !== idx);
                                                        setNewSite({ ...newSite, bettingContent: { ...newSite.bettingContent, trendSites: newList } });
                                                    }}>X</Button>
                                                </div>
                                            ))}
                                        </div>
                                    </TabsContent>

                                    {/* Deneme Bonusları */}
                                    <TabsContent value="bet-bonuses" className="pt-4 space-y-4">
                                        <Card className="p-4 border-dashed border-2">
                                            <Label className="block mb-4 font-bold">Yeni Deneme Bonusu Ekle</Label>
                                            <div className="grid grid-cols-2 gap-4 mb-4">
                                                <Input id="bonus-title" placeholder="Site Adı / Başlık" />
                                                <Input id="bonus-amount" placeholder="Bonus Miktarı (Örn: 100 TL)" />
                                                <Input id="bonus-image" placeholder="Site Fotoğrafı (URL)" className="col-span-2" />
                                                <Input id="bonus-link" placeholder="Yönlendirme (Bonusu Al) Linki" className="col-span-2" />
                                            </div>
                                            <Button className="w-full" variant="secondary" onClick={() => {
                                                const title = (document.getElementById('bonus-title') as HTMLInputElement).value;
                                                const amount = (document.getElementById('bonus-amount') as HTMLInputElement).value;
                                                const image = (document.getElementById('bonus-image') as HTMLInputElement).value;
                                                const link = (document.getElementById('bonus-link') as HTMLInputElement).value;
                                                if (!title) return;
                                                const newBonus = { id: Math.random().toString(36).substr(2, 9), title, amount, description: '', link, image, order: (newSite.bettingContent.bonuses || []).length, isActive: true };
                                                setNewSite({ ...newSite, bettingContent: { ...newSite.bettingContent, bonuses: [...(newSite.bettingContent.bonuses || []), newBonus] } });
                                            }}>Bonusu Ekle</Button>
                                        </Card>
                                        <div className="space-y-2 max-h-40 overflow-y-auto">
                                            {(newSite.bettingContent.bonuses || []).map((b, idx) => (
                                                <div key={idx} className="flex items-center justify-between p-2 bg-purple-50 rounded border text-xs">
                                                    <span className="font-medium">{b.title}</span>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-purple-600 font-bold">{b.amount}</span>
                                                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-red-500" onClick={() => {
                                                            const newList = newSite.bettingContent.bonuses.filter((_, i) => i !== idx);
                                                            setNewSite({ ...newSite, bettingContent: { ...newSite.bettingContent, bonuses: newList } });
                                                        }}>X</Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </TabsContent>

                                    {/* Giveaways */}
                                    <TabsContent value="bet-giveaways" className="pt-4 space-y-4">
                                        <Card className="p-4 border-dashed border-2">
                                            <Label className="block mb-4">Yeni Çekiliş Ekle</Label>
                                            <div className="grid grid-cols-2 gap-4 mb-4">
                                                <Input id="giveaway-brand" placeholder="Marka Adı (Grand Pasha)" />
                                                <Input id="giveaway-prize" placeholder="Ödül Miktarı (2.500 TL)" />
                                                <Input id="giveaway-slots" placeholder="Toplam Katılımcı (100)" type="number" />
                                                <Input id="giveaway-time" placeholder="Kalan Süre (35:50)" />
                                                <Input id="giveaway-link" placeholder="Katılım Linki" className="col-span-2" />
                                            </div>
                                            <Button className="w-full" variant="secondary" onClick={() => {
                                                const brandName = (document.getElementById('giveaway-brand') as HTMLInputElement).value;
                                                const prize = (document.getElementById('giveaway-prize') as HTMLInputElement).value;
                                                const totalSlots = parseInt((document.getElementById('giveaway-slots') as HTMLInputElement).value) || 100;
                                                const endTime = (document.getElementById('giveaway-time') as HTMLInputElement).value;
                                                const link = (document.getElementById('giveaway-link') as HTMLInputElement).value;

                                                if (!brandName) return;

                                                const newGiveaway = { id: Math.random().toString(36).substr(2, 9), brandName, brandLogo: '', prize, participantCount: Math.floor(Math.random() * totalSlots), totalSlots, endTime, link, isActive: true };
                                                setNewSite({ ...newSite, bettingContent: { ...newSite.bettingContent, giveaways: [...newSite.bettingContent.giveaways, newGiveaway] } });
                                            }}>Çekilişi Ekle</Button>
                                        </Card>
                                        <div className="space-y-2 max-h-40 overflow-y-auto">
                                            {newSite.bettingContent.giveaways.map((g, idx) => (
                                                <div key={idx} className="flex items-center justify-between p-2 bg-blue-50 rounded border text-xs">
                                                    <span>{g.brandName} - {g.prize}</span>
                                                    <Button variant="ghost" size="sm" onClick={() => {
                                                        const newList = newSite.bettingContent.giveaways.filter((_, i) => i !== idx);
                                                        setNewSite({ ...newSite, bettingContent: { ...newSite.bettingContent, giveaways: newList } });
                                                    }}>Sil</Button>
                                                </div>
                                            ))}
                                        </div>
                                    </TabsContent>

                                    {/* Winners */}
                                    <TabsContent value="bet-winners" className="pt-4 space-y-4">
                                        <Card className="p-4 border-dashed border-2">
                                            <div className="grid grid-cols-2 gap-4 mb-4">
                                                <Input id="winner-name" placeholder="Kullanıcı (al****)" />
                                                <Input id="winner-amount" placeholder="Kazanç (+56.299 TL)" />
                                                <Input id="winner-brand" placeholder="Site Adı" />
                                                <Input id="winner-time" placeholder="Zaman (54dk)" />
                                            </div>
                                            <Button className="w-full" variant="secondary" onClick={() => {
                                                const username = (document.getElementById('winner-name') as HTMLInputElement).value;
                                                const amount = (document.getElementById('winner-amount') as HTMLInputElement).value;
                                                const brandName = (document.getElementById('winner-brand') as HTMLInputElement).value;
                                                const timeAgo = (document.getElementById('winner-time') as HTMLInputElement).value;
                                                if (!username) return;
                                                const newWinner = { id: Math.random().toString(36).substr(2, 9), username, amount, game: 'Casino', brandName, brandLogo: '', timeAgo };
                                                setNewSite({ ...newSite, bettingContent: { ...newSite.bettingContent, liveWinners: [...newSite.bettingContent.liveWinners, newWinner] } });
                                            }}>Kazanan Ekle</Button>
                                        </Card>
                                        <div className="space-y-2 max-h-40 overflow-y-auto">
                                            {newSite.bettingContent.liveWinners.map((w, idx) => (
                                                <div key={idx} className="flex items-center justify-between p-2 bg-emerald-50 rounded border text-xs">
                                                    <span>{w.username} - {w.amount} ({w.brandName})</span>
                                                    <Button variant="ghost" size="sm" onClick={() => {
                                                        const newList = newSite.bettingContent.liveWinners.filter((_, i) => i !== idx);
                                                        setNewSite({ ...newSite, bettingContent: { ...newSite.bettingContent, liveWinners: newList } });
                                                    }}>Sil</Button>
                                                </div>
                                            ))}
                                        </div>
                                    </TabsContent>

                                    {/* Popups */}
                                    <TabsContent value="bet-popups" className="pt-4 space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <Card className="p-4 bg-slate-50 border border-slate-200">
                                                <div className="flex items-center justify-between mb-4">
                                                    <Label className="font-bold">📱 Mobil Hemen Göster</Label>
                                                    <input
                                                        type="checkbox"
                                                        checked={newSite.bettingContent.mobileImmediatePopup}
                                                        onChange={(e) => setNewSite({
                                                            ...newSite,
                                                            bettingContent: { ...newSite.bettingContent, mobileImmediatePopup: e.target.checked }
                                                        })}
                                                    />
                                                </div>
                                                <p className="text-[10px] text-gray-500 italic">Aktifse, mobil cihazlarda gecikme süresi beklenmeden direkt gösterilir.</p>
                                            </Card>

                                            <Card className="p-4 bg-slate-50 border border-slate-200">
                                                <Label className="font-bold block mb-2">📐 Pop-up Düzeni</Label>
                                                <select
                                                    className="w-full p-2 border rounded bg-white text-xs"
                                                    value={newSite.bettingContent.popupLayout || 'single'}
                                                    onChange={(e) => setNewSite({
                                                        ...newSite,
                                                        bettingContent: { ...newSite.bettingContent, popupLayout: e.target.value as any }
                                                    })}
                                                >
                                                    <option value="single">Tekil (Standart)</option>
                                                    <option value="grid">Izgara (Çoklu)</option>
                                                    <option value="full">Tam Ekran</option>
                                                </select>
                                                <p className="text-[10px] text-gray-500 italic mt-2">Birden fazla aktif pop-up varsa nasıl gösterileceğini belirler.</p>
                                            </Card>
                                        </div>

                                        <Card className="p-4 border-dashed border-2">
                                            <Label className="block mb-4 font-bold">Yeni Pop-up Ekle</Label>
                                            <div className="grid grid-cols-2 gap-4 mb-4">
                                                <Input id="popup-title" placeholder="Başlık (Örn: Hoşgeldin Paketi)" />
                                                <Input id="popup-delay" placeholder="Gecikme (ms, Örn: 3000)" type="number" />
                                                <Textarea id="popup-content" placeholder="Açıklama metni..." className="col-span-2" />
                                                <Input id="popup-cta-text" placeholder="Buton Yazısı (HEMEN AL)" />
                                                <Input id="popup-cta-link" placeholder="Buton Linki" />
                                                <div className="col-span-2 space-y-2">
                                                    <Label>Medya Tipi</Label>
                                                    <select id="popup-type" className="w-full p-2 border rounded bg-white text-sm">
                                                        <option value="image">Resim (Image)</option>
                                                        <option value="video">Video (MP4/HLS)</option>
                                                    </select>
                                                </div>
                                                <Input id="popup-media" placeholder="Medya URL (Resim veya Video Linki)" className="col-span-2" />
                                            </div>
                                            <Button className="w-full" variant="secondary" onClick={() => {
                                                const title = (document.getElementById('popup-title') as HTMLInputElement).value;
                                                const content = (document.getElementById('popup-content') as HTMLTextAreaElement).value;
                                                const ctaText = (document.getElementById('popup-cta-text') as HTMLInputElement).value;
                                                const ctaLink = (document.getElementById('popup-cta-link') as HTMLInputElement).value;
                                                const type = (document.getElementById('popup-type') as HTMLSelectElement).value as 'image' | 'video';
                                                const media = (document.getElementById('popup-media') as HTMLInputElement).value;
                                                const showDelay = parseInt((document.getElementById('popup-delay') as HTMLInputElement).value) || 2000;
                                                if (!title) return;
                                                const newPopup = {
                                                    id: Math.random().toString(36).substr(2, 9),
                                                    title,
                                                    content,
                                                    type,
                                                    image: type === 'image' ? media : '',
                                                    video: type === 'video' ? media : '',
                                                    ctaText,
                                                    ctaLink,
                                                    showDelay,
                                                    isActive: true
                                                } as any;
                                                setNewSite({ ...newSite, bettingContent: { ...newSite.bettingContent, popups: [...(newSite.bettingContent.popups || []), newPopup] } });
                                            }}>Pop-up Ekle</Button>
                                        </Card>
                                        <div className="space-y-2 max-h-60 overflow-y-auto pt-2">
                                            {(newSite.bettingContent.popups || []).map((p, idx) => (
                                                <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs shadow-sm shadow-black/5">
                                                    <div className="flex flex-col gap-0.5">
                                                        <span className="font-bold text-slate-700 uppercase">{p.type === 'video' ? '🎬' : '🖼️'} {p.title}</span>
                                                        <span className="text-[10px] text-slate-500">{p.showDelay}ms • {p.type === 'video' ? 'Video' : 'Resim'}</span>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex items-center gap-1.5 px-2 py-1 bg-white rounded-lg border border-slate-200">
                                                            <span className={`text-[10px] font-black italic tracking-tighter ${p.isActive ? 'text-emerald-500' : 'text-slate-400'}`}>
                                                                {p.isActive ? 'AKTİF' : 'PASİF'}
                                                            </span>
                                                            <input
                                                                type="checkbox"
                                                                className="w-4 h-4 accent-purple-600 rounded cursor-pointer"
                                                                checked={p.isActive}
                                                                onChange={(e) => {
                                                                    const newList = [...newSite.bettingContent.popups];
                                                                    newList[idx] = { ...p, isActive: e.target.checked };
                                                                    setNewSite({ ...newSite, bettingContent: { ...newSite.bettingContent, popups: newList } });
                                                                }}
                                                            />
                                                        </div>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                                                            onClick={() => {
                                                                const newList = newSite.bettingContent.popups.filter((_, i) => i !== idx);
                                                                setNewSite({ ...newSite, bettingContent: { ...newSite.bettingContent, popups: newList } });
                                                            }}
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </TabsContent>

                                    {/* Slider */}
                                    <TabsContent value="bet-slider" className="pt-4 space-y-4">
                                        <Card className="p-4 border-dashed border-2">
                                            <Label className="block mb-4 font-bold">Yeni Slider Reklamı Ekle</Label>
                                            <div className="grid grid-cols-2 gap-4 mb-4">
                                                <Input id="slider-title" placeholder="Ana Başlık" />
                                                <Input id="slider-subtitle" placeholder="Alt Başlık" />
                                                <Input id="slider-cta-text" placeholder="Buton Yazısı (Örn: KAYIT OL)" />
                                                <Input id="slider-cta-link" placeholder="Hangi Siteye Gidecek?" />
                                                <div className="col-span-2 space-y-2">
                                                    <Label>Medya Tipi</Label>
                                                    <select id="slider-type" className="w-full p-2 border rounded bg-white text-sm">
                                                        <option value="image">Resim (Image)</option>
                                                        <option value="video">Video (MP4/HLS)</option>
                                                    </select>
                                                </div>
                                                <Input id="slider-media" placeholder="Medya URL (Resim veya Video Linki)" className="col-span-2" />
                                            </div>
                                            <Button className="w-full" variant="secondary" onClick={() => {
                                                const title = (document.getElementById('slider-title') as HTMLInputElement).value;
                                                const subtitle = (document.getElementById('slider-subtitle') as HTMLInputElement).value;
                                                const ctaText = (document.getElementById('slider-cta-text') as HTMLInputElement).value;
                                                const ctaLink = (document.getElementById('slider-cta-link') as HTMLInputElement).value;
                                                const type = (document.getElementById('slider-type') as HTMLSelectElement).value as 'image' | 'video';
                                                const media = (document.getElementById('slider-media') as HTMLInputElement).value;
                                                if (!title) return;
                                                const newSlide = {
                                                    id: Math.random().toString(36).substr(2, 9),
                                                    title,
                                                    subtitle,
                                                    type,
                                                    image: type === 'image' ? media : '',
                                                    video: type === 'video' ? media : '',
                                                    ctaText,
                                                    ctaLink,
                                                    order: (newSite.bettingContent.heroSlides || []).length
                                                } as any;
                                                setNewSite({ ...newSite, bettingContent: { ...newSite.bettingContent, heroSlides: [...(newSite.bettingContent.heroSlides || []), newSlide] } });
                                            }}>Slider Ekle</Button>
                                        </Card>
                                        <div className="space-y-2 max-h-40 overflow-y-auto">
                                            {(newSite.bettingContent.heroSlides || []).map((s, idx) => (
                                                <div key={idx} className="flex items-center justify-between p-2 bg-indigo-50 rounded border text-xs">
                                                    <span className="font-medium text-indigo-700">{s.type.toUpperCase()}: {s.title}</span>
                                                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-red-500" onClick={() => {
                                                        const newList = newSite.bettingContent.heroSlides.filter((_, i) => i !== idx);
                                                        setNewSite({ ...newSite, bettingContent: { ...newSite.bettingContent, heroSlides: newList } });
                                                    }}>X</Button>
                                                </div>
                                            ))}
                                        </div>
                                    </TabsContent>

                                    {/* Brands / Carousel */}
                                    <TabsContent value="bet-items" className="pt-4 space-y-4">
                                        <Card className="p-4 border-dashed border-2">
                                            <div className="grid grid-cols-2 gap-4 mb-4">
                                                <Input id="brand-name" placeholder="Marka Adı" />
                                                <Input id="brand-link" placeholder="Yönlendirme Linki" />
                                                <Input id="brand-logo" placeholder="Logo URL" className="col-span-2" />
                                            </div>
                                            <Button className="w-full" variant="secondary" onClick={() => {
                                                const name = (document.getElementById('brand-name') as HTMLInputElement).value;
                                                const link = (document.getElementById('brand-link') as HTMLInputElement).value;
                                                const logo = (document.getElementById('brand-logo') as HTMLInputElement).value;
                                                if (!name) return;
                                                const newBrand = { id: Math.random().toString(36).substr(2, 9), name, link, logo };
                                                setNewSite({ ...newSite, bettingContent: { ...newSite.bettingContent, brandCarousel: [...newSite.bettingContent.brandCarousel, newBrand] } });
                                            }}>Marka Ekle</Button>
                                        </Card>
                                        <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                                            {newSite.bettingContent.brandCarousel.map((b, idx) => (
                                                <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded border text-[10px]">
                                                    <span className="truncate max-w-[80px]">{b.name}</span>
                                                    <Button variant="ghost" size="sm" onClick={() => {
                                                        const newList = newSite.bettingContent.brandCarousel.filter((_, i) => i !== idx);
                                                        setNewSite({ ...newSite, bettingContent: { ...newSite.bettingContent, brandCarousel: newList } });
                                                    }}>X</Button>
                                                </div>
                                            ))}
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </TabsContent>

                            <TabsContent value="cloaking" className="space-y-4 pt-4">
                                <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-100">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-sm flex items-center gap-2">
                                            <TrendingUp className="w-4 h-4 text-indigo-600" />
                                            Sihirli SEO Aracı
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-xs text-slate-600 mb-4">Tek tıkla "Bonus Veren Siteler 2026" anahtar kelimesi için tam uyumlu SEO ayarlarını oluşturun.</p>
                                        <Button
                                            size="sm"
                                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200"
                                            onClick={() => {
                                                const magicTitle = "Bonus Veren Siteler 2026 - En Yüksek Deneme Bonusu Veren Bahis Siteleri";
                                                const magicDesc = "2026 yılının en güncel, güvenilir ve yüksek bonus veren siteleri listesi. Çevrimsiz deneme bonusu, yatırım bonusları ve özel promosyonlar sunan siteleri hemen keşfedin.";
                                                const magicKeywords = ["bonus veren siteler 2026", "deneme bonusu veren siteler 2026", "güvenilir bahis siteleri", "bedava bonus", "casino bonusları 2026"];
                                                const magicArticle = `
                                                    <article>
                                                        <h1>Bonus Veren Siteler 2026: En Güncel ve Güvenilir Liste</h1>
                                                        <p>2026 yılında profesyonel oyuncuların en çok aradığı konuların başında <strong>bonus veren siteler 2026</strong> gelmektedir. Dijital dünyada rekabetin artmasıyla birlikte, platformlar kullanıcılarını memnun etmek için oldukça avantajlı teklifler sunmaktadır.</p>
                                                        
                                                        <h2>Deneme Bonusu Veren Siteler 2026 Avantajları</h2>
                                                        <p>Yeni yıla damga vuran <strong>deneme bonusu veren siteler</strong>, kullanıcıların herhangi bir yatırım yapmadan siteyi test etmesine olanak tanır. 2026 yılında bu bonus miktarları 100 TL ile 500 TL arasında değişiklik göstermektedir.</p>
                                                        
                                                        <ul>
                                                            <li><strong>Yatırım Şartsız Bonuslar:</strong> Hiçbir ücret ödemeden kazanç sağlama şansı.</li>
                                                            <li><strong>Çevrimsiz Bonuslar:</strong> Kazancınızı anında çekebileceğiniz şartlar.</li>
                                                            <li><strong>Özel VIP Paketler:</strong> Sadık üyelere özel 2026 promosyonları.</li>
                                                        </ul>

                                                        <h2>2026'da Neden Bu Siteleri Tercih Etmelisiniz?</h2>
                                                        <p>Güvenilirlik, hızlı ödeme ve yüksek oranlar bir platformun kalitesini belirler. 2026 bonus listemizdeki tüm siteler lisanslı ve denetlenebilir yapıdadır. <em>Bonus veren siteler</em> arasında seçim yaparken dikkat etmeniz gereken en önemli kural, kullanım şartlarını detaylıca okumaktır.</p>
                                                        
                                                        <h3>Hızlı ve Güvenilir Finansal İşlemler</h3>
                                                        <p>2026 yılında kripto paralar ve dijital cüzdanlar ile ödeme yapan siteler ön plandadır. Bonus kazançlarınızı saniyeler içinde hesabınıza aktarabilen altyapılar, kullanıcı memnuniyetini en üst düzeye çıkarmaktadır.</p>
                                                    </article>
                                                `.trim();

                                                const magicStructuredData = {
                                                    "@context": "https://schema.org",
                                                    "@type": "FAQPage",
                                                    "mainEntity": [
                                                        {
                                                            "@type": "Question",
                                                            "name": "2026 yılında en güvenilir bonus veren siteler hangileridir?",
                                                            "acceptedAnswer": {
                                                                "@type": "Answer",
                                                                "text": "2026 yılında en güvenilir platformlar lisanslı, hızlı ödeme yapan ve müşteri desteği 7/24 aktif olan sitelerdir. Listemizdeki tüm siteler bu kriterleri karşılamaktadır."
                                                            }
                                                        },
                                                        {
                                                            "@type": "Question",
                                                            "name": "Deneme bonusu nasıl alınır?",
                                                            "acceptedAnswer": {
                                                                "@type": "Answer",
                                                                "text": "Deneme bonusu almak için sitemizdeki linkler üzerinden yeni üyelik oluşturmanız yeterlidir. Bonusunuz anında hesabınıza tanımlanacaktır."
                                                            }
                                                        }
                                                    ]
                                                };

                                                setNewSite({
                                                    ...newSite,
                                                    seoSettings: {
                                                        ...newSite.seoSettings,
                                                        metaTitle: magicTitle,
                                                        metaDescription: magicDesc,
                                                        keywords: magicKeywords,
                                                        hiddenSEOArticle: magicArticle,
                                                        structuredData: magicStructuredData
                                                    }
                                                });
                                            }}
                                        >
                                            ✨ Sihirli SEO Ayarlarını Uygula
                                        </Button>
                                    </CardContent>
                                </Card>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label className="font-bold">SEO Başlığı (Title)</Label>
                                            <Input
                                                placeholder="En İyi Bonus Veren Siteler 2026"
                                                value={newSite.seoSettings.metaTitle}
                                                onChange={(e) => setNewSite({
                                                    ...newSite,
                                                    seoSettings: { ...newSite.seoSettings, metaTitle: e.target.value }
                                                })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="font-bold">SEO Açıklaması (Description)</Label>
                                            <Textarea
                                                placeholder="Site hakkında kısa açıklama..."
                                                className="h-20"
                                                value={newSite.seoSettings.metaDescription || ''}
                                                onChange={(e) => setNewSite({
                                                    ...newSite,
                                                    seoSettings: { ...newSite.seoSettings, metaDescription: e.target.value }
                                                })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="font-bold">Anahtar Kelimeler (Keywords)</Label>
                                            <Input
                                                placeholder="kelime1, kelime2, kelime3"
                                                value={newSite.seoSettings.keywords ? (Array.isArray(newSite.seoSettings.keywords) ? newSite.seoSettings.keywords.join(', ') : newSite.seoSettings.keywords) : ''}
                                                onChange={(e) => setNewSite({
                                                    ...newSite,
                                                    seoSettings: { ...newSite.seoSettings, keywords: e.target.value.split(',').map(s => s.trim()) }
                                                })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="font-bold">Structured Data (JSON-LD)</Label>
                                            <Textarea
                                                placeholder='{"@context": "https://schema.org", ...}'
                                                className="h-32 font-mono text-[10px]"
                                                value={newSite.seoSettings.structuredData ? JSON.stringify(newSite.seoSettings.structuredData, null, 2) : ''}
                                                onChange={(e) => {
                                                    try {
                                                        const parsed = JSON.parse(e.target.value);
                                                        setNewSite({
                                                            ...newSite,
                                                            seoSettings: { ...newSite.seoSettings, structuredData: parsed }
                                                        });
                                                    } catch (err) {
                                                        // Fallback to raw string if it's currently being typed
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="font-bold">Gizli SEO Makalesi (Bots Only)</Label>
                                        <Textarea
                                            placeholder="Google botları için buraya zengin içerikli bir HTML makale girin..."
                                            className="h-[365px] font-mono text-[10px]"
                                            value={newSite.seoSettings.hiddenSEOArticle || ''}
                                            onChange={(e) => setNewSite({
                                                ...newSite,
                                                seoSettings: { ...newSite.seoSettings, hiddenSEOArticle: e.target.value }
                                            })}
                                        />
                                        <p className="text-[10px] text-gray-500 italic">Bu içerik sadece botlara gösterilir, kullanıcılardan gizlenir.</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-2">
                                    <Card>
                                        <CardHeader className="py-2">
                                            <CardTitle className="text-sm">Cloaking Kuralları</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <Label>Masaüstü &rarr; Maske</Label>
                                                <input
                                                    type="checkbox"
                                                    checked={newSite.cloakingRules.showMaskTo.desktop}
                                                    onChange={(e) => setNewSite({
                                                        ...newSite,
                                                        cloakingRules: {
                                                            ...newSite.cloakingRules,
                                                            showMaskTo: { ...newSite.cloakingRules.showMaskTo, desktop: e.target.checked }
                                                        }
                                                    })}
                                                />
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <Label>Botlar &rarr; Maske</Label>
                                                <input
                                                    type="checkbox"
                                                    checked={newSite.cloakingRules.showMaskTo.bots}
                                                    onChange={(e) => setNewSite({
                                                        ...newSite,
                                                        cloakingRules: {
                                                            ...newSite.cloakingRules,
                                                            showMaskTo: { ...newSite.cloakingRules.showMaskTo, bots: e.target.checked }
                                                        }
                                                    })}
                                                />
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-sm">Hedef Ülkeler (TR, CY...)</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <Input
                                                placeholder="TR, CY, AZ"
                                                value={(newSite.cloakingRules.showBettingTo.includedCountries || []).join(', ')}
                                                onChange={(e) => {
                                                    const countries = e.target.value.split(',').map(c => c.trim().toUpperCase()).filter(c => c);
                                                    setNewSite({
                                                        ...newSite,
                                                        cloakingRules: {
                                                            ...newSite.cloakingRules,
                                                            showBettingTo: { ...newSite.cloakingRules.showBettingTo, includedCountries: countries }
                                                        }
                                                    });
                                                }}
                                            />
                                            <p className="text-[10px] text-gray-500 mt-2">Sadece bu ülkeler bahis sitesini görür.</p>
                                        </CardContent>
                                    </Card>
                                </div>
                            </TabsContent>

                            <TabsContent value="advanced" className="space-y-4 pt-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Google Analytics ID</Label>
                                        <Input
                                            placeholder="UA-XXXXX-Y / G-XXXXX"
                                            value={newSite.seoSettings.googleAnalyticsId || ''}
                                            onChange={(e) => setNewSite({
                                                ...newSite,
                                                seoSettings: { ...newSite.seoSettings, googleAnalyticsId: e.target.value }
                                            })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Facebook Pixel ID</Label>
                                        <Input
                                            placeholder="123456789"
                                            value={newSite.seoSettings.facebookPixelId || ''}
                                            onChange={(e) => setNewSite({
                                                ...newSite,
                                                seoSettings: { ...newSite.seoSettings, facebookPixelId: e.target.value }
                                            })}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>PC Kullanıcılarını Yönlendir (Opsiyonel)</Label>
                                    <Input
                                        placeholder="https://google.com"
                                        value={newSite.cloakingRules.redirectMaskTo || ''}
                                        onChange={(e) => setNewSite({
                                            ...newSite,
                                            cloakingRules: { ...newSite.cloakingRules, redirectMaskTo: e.target.value }
                                        })}
                                    />
                                    <p className="text-xs text-gray-500">Boş bırakılırsa Maskelenmiş Site gösterilir.</p>
                                </div>
                                <div className="space-y-2">
                                    <Label>IP Kara Liste (Satır başı bir IP)</Label>
                                    <Textarea
                                        placeholder="192.168.1.1"
                                        className="h-24"
                                        value={(newSite.cloakingRules.ipBlacklist || []).join('\n')}
                                        onChange={(e) => {
                                            const ips = e.target.value.split('\n').map(ip => ip.trim()).filter(ip => ip);
                                            setNewSite({
                                                ...newSite,
                                                cloakingRules: { ...newSite.cloakingRules, ipBlacklist: ips }
                                            });
                                        }}
                                    />
                                </div>
                            </TabsContent>
                        </Tabs>

                        <DialogFooter className="mt-6">
                            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>İptal</Button>
                            <Button
                                onClick={handleCreateSite}
                                className="bg-gradient-to-r from-blue-600 to-purple-600"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                                {isSubmitting ? 'Oluşturuluyor...' : 'Siteyi Yayına Al'}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Search and Filters */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                    placeholder="Site adı veya domain ara..."
                    className="pl-10 h-12 bg-white/50 backdrop-blur-sm border-0 shadow-lg"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Sites Inventory */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="h-[400px] bg-gray-100 animate-pulse rounded-2xl" />
                    ))
                ) : filteredSites.length > 0 ? (
                    filteredSites.map((site) => (
                        <Card key={site.id} className="border-0 shadow-xl overflow-hidden group hover:translate-y-[-4px] transition-all duration-300 bg-white/80 backdrop-blur-md">
                            <div className={`h-2 w-full ${site.isActive ? 'bg-emerald-500' : 'bg-gray-300'}`} />
                            <CardHeader className="pb-4">
                                <div className="flex items-center justify-between mb-2">
                                    <div className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${site.maskType === 'insurance' ? 'bg-blue-100 text-blue-700' :
                                        site.maskType === 'ecommerce' ? 'bg-purple-100 text-purple-700' :
                                            'bg-gray-100 text-gray-700'
                                        }`}>
                                        {site.maskType}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <div className={`w-2 h-2 rounded-full ${site.isActive ? 'bg-emerald-500 animate-pulse' : 'bg-gray-300'}`} />
                                        <span className="text-[10px] font-medium text-gray-500">{site.isActive ? 'YAYINDA' : 'PASİF'}</span>
                                    </div>
                                </div>
                                <CardTitle className="text-xl font-bold truncate">{site.name}</CardTitle>
                                <CardDescription className="flex items-center gap-2 font-mono text-xs text-blue-600 bg-blue-50 p-2 rounded-lg mt-2">
                                    <Globe className="w-3 h-3" />
                                    {site.domain}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Mini Stats Grid */}
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="p-2 bg-gray-50 rounded-lg">
                                        <p className="text-[10px] text-gray-400 font-bold uppercase">Hit</p>
                                        <p className="text-lg font-bold text-gray-700">{site.analytics?.totalHits || 0}</p>
                                    </div>
                                    <div className="p-2 bg-gray-50 rounded-lg">
                                        <p className="text-[10px] text-gray-400 font-bold uppercase">Bot</p>
                                        <p className="text-lg font-bold text-red-600">{site.analytics?.botHits || 0}</p>
                                    </div>
                                    <div className="p-2 bg-gray-50 rounded-lg col-span-2 flex justify-between items-center">
                                        <div className="flex gap-2">
                                            <div className="flex items-center gap-1">
                                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                                <span className="text-[10px] text-gray-500">PC: {site.analytics?.desktopHits || 0}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                                                <span className="text-[10px] text-gray-500">Mobil: {site.analytics?.mobileHits || 0}</span>
                                            </div>
                                        </div>
                                        <TrendingUp className="w-4 h-4 text-emerald-500" />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between gap-2 pt-4 border-t border-gray-100">
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline" size="icon" className="w-8 h-8 text-blue-600 border-blue-100 hover:bg-blue-50"
                                            onClick={() => window.open(`/preview/${site.id}`, '_blank')}
                                            title="Önizle"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            variant="outline" size="icon" className="w-8 h-8 text-amber-600 border-amber-100 hover:bg-amber-50"
                                            onClick={() => window.location.href = `/api/sites/${site.id}/export`}
                                            title="ZIP İndir"
                                        >
                                            <Download className="w-4 h-4" />
                                        </Button>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline" size="icon" className="w-8 h-8 text-emerald-600 border-emerald-100 hover:bg-emerald-50"
                                            onClick={() => toggleSiteStatus(site.id!, site.isActive)}
                                            title={site.isActive ? 'Durdur' : 'Başlat'}
                                        >
                                            <Power className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            variant="outline" size="icon" className="w-8 h-8 text-gray-600 border-gray-100 hover:bg-gray-50"
                                            onClick={() => handleEditClick(site)}
                                            title="Düzenle"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            variant="outline" size="icon" className="w-8 h-8 text-rose-600 border-rose-100 hover:bg-rose-50"
                                            onClick={() => handleDeleteSite(site.id!)}
                                            title="Sil"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center bg-white/50 backdrop-blur-sm rounded-3xl border-2 border-dashed border-gray-200">
                        <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Shield className="w-10 h-10 text-gray-300" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-600">Henüz site bulunmuyor</h3>
                        <p className="text-gray-400 mb-6">İlk sitenizi oluşturarak ağınızı başlatın.</p>
                        <Button onClick={() => setIsCreateDialogOpen(true)} className="bg-gradient-to-r from-blue-600 to-purple-600">
                            <Plus className="w-4 h-4 mr-2" />
                            Yeni Site Oluştur
                        </Button>
                    </div>
                )}
            </div>
        </div >
    );
}
