import { prisma } from './prisma';

export interface SiteConfig {
    id: string;
    name: string;
    domain: string;
    maskType: string;
    maskContent: any;
    bettingContent: any;
    cloakingRules: any;
    seoSettings: any;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

const safeParse = (str: any) => {
    try {
        return typeof str === 'string' ? JSON.parse(str) : (str || {});
    } catch (e) {
        return {};
    }
};

// 🧠 ULTIMATE CACHE LAYER (5 MINUTE TTL)
let cachedAllSites: SiteConfig[] | null = null;
let lastCacheUpdate = 0;
const CACHE_TTL = 300000; // 5 mins

export async function getSiteByDomain(domain: string, fullData: boolean = true): Promise<SiteConfig | null> {
    const cleanDomain = domain.toLowerCase().replace('www.', '');

    try {
        // Optimized select: Don't fetch huge blobs if not needed
        let site = await prisma.site.findUnique({
            where: { domain: cleanDomain },
            select: fullData ? undefined : {
                id: true,
                name: true,
                domain: true,
                maskType: true,
                isActive: true,
                seoSettings: true,
                // specifically exclude maskContent and bettingContent for meta-only
            }
        });

        const targetDomains = [
            'independent-news.org',
            '2026bonuslar.com',
            'bedavabonus2026.com',
            'bonusverensiteler2026.com',
            'yasalbonus2026.com',
            'haber-analiz2026.com',
            'vizyontekyazilim.com',
            'flovazcomercial.com'
        ];

        // 🛡️ SELF-HEALING: If it's one of our target domains and missing from DB, create it on-the-fly!
        if (!site && targetDomains.includes(cleanDomain)) {
            console.log("🛡️ Self-healing activated for:", cleanDomain);
            const defaultRules = {
                showMaskTo: { bots: true, desktop: true },
                showBettingTo: { mobile: true, includedCountries: ["TR", "CY"] }
            };
            const defaultSeo = {
                metaTitle: `Şubat 2026 Deneme Bonusu Veren Siteler - ${cleanDomain.split('.')[0].toUpperCase()}`,
                metaDescription: `${cleanDomain} ile 2026'nın en güncel deneme bonusu veren sitelerini ve yatırımsız karşılıksız bonusları keşfedin.`,
                keywords: "deneme bonusu veren siteler 2026, bedava bonus, yatırımsız deneme bonusu, 500 tl deneme bonusu"
            };

            try {
                site = await prisma.site.create({
                    data: {
                        domain: cleanDomain,
                        name: cleanDomain.split('.')[0].toUpperCase(),
                        isActive: true,
                        maskType: 'blog',
                        maskContent: JSON.stringify({
                            siteName: cleanDomain.split('.')[0].toUpperCase(),
                            heroTitle: '2026 En İyi Bonuslar',
                            heroSubtitle: 'Profesyonel Analiz ve Güvenilir Bahis Rehberiniz',
                            news: []
                        }),
                        bettingContent: JSON.stringify({
                            theme: { primaryColor: '#10b981', secondaryColor: '#064e3b', backgroundColor: '#020617' },
                            navigation: [
                                { id: '1', label: 'Anasayfa', icon: 'Home', link: '/', isActive: true },
                                { id: '2', label: 'Analizler', icon: 'FileText', link: '/haberler', isActive: true }
                            ]
                        }),
                        cloakingRules: JSON.stringify(defaultRules),
                        seoSettings: JSON.stringify(defaultSeo)
                    }
                });
            } catch (createError) {
                console.error("Self-healing creation failed:", createError);
                site = await prisma.site.findUnique({ where: { domain: cleanDomain } });
            }
        }

        if (site && site.isActive) {
            return {
                id: site.id,
                name: site.name,
                domain: site.domain,
                maskType: site.maskType,
                maskContent: fullData ? safeParse((site as any).maskContent) : {},
                bettingContent: fullData ? safeParse((site as any).bettingContent) : {},
                cloakingRules: fullData ? safeParse((site as any).cloakingRules) : {},
                seoSettings: safeParse(site.seoSettings),
                isActive: site.isActive,
                createdAt: (site as any).createdAt,
                updatedAt: (site as any).updatedAt
            };
        }

        return null;
    } catch (error) {
        console.error("Site fetch service error for " + cleanDomain + ":", error);
        return null;
    }
}

export async function getAllActiveSites(): Promise<SiteConfig[]> {
    const now = Date.now();
    if (cachedAllSites && (now - lastCacheUpdate < CACHE_TTL)) {
        return cachedAllSites;
    }

    try {
        // High-speed lean query for consortium link generation
        const sites = await prisma.site.findMany({
            where: { isActive: true },
            select: {
                id: true,
                name: true,
                domain: true,
                isActive: true
                // specifically exclude huge JSON strings
            }
        });

        const mapped = sites.map(site => ({
            id: site.id,
            name: site.name,
            domain: site.domain,
            isActive: site.isActive,
            maskType: 'lean',
            maskContent: {},
            bettingContent: {},
            cloakingRules: {},
            seoSettings: {}
        }));

        cachedAllSites = mapped as SiteConfig[];
        lastCacheUpdate = now;
        return cachedAllSites;
    } catch (error) {
        console.error("All sites fetch service error:", error);
        return [];
    }
}
