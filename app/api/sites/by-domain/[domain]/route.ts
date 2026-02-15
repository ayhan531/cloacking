import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request, { params }: { params: Promise<{ domain: string }> }) {
    const { domain } = await params;
    const cleanDomain = domain.toLowerCase().replace('www.', '');

    try {
        let site = await prisma.site.findUnique({
            where: { domain: cleanDomain }
        });

        const targetDomains = [
            '2026bonuslar.com',
            'bedavabonus2026.com',
            'bonusverensiteler2026.com',
            'yasalbonus2026.com',
            'haber-analiz2026.com',
            'vizyontekyazilim.com'
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
                        theme: { primaryColor: '#9333EA', secondaryColor: '#3B82F6', backgroundColor: '#0F172A' },
                        navigation: [
                            { id: '1', label: 'Anasayfa', icon: 'Home', link: '/', isActive: true },
                            { id: '2', label: 'Kazananlar', icon: 'Trophy', link: '/winners', isActive: true },
                            { id: '3', label: 'Çark', icon: 'Disc', link: '/wheel', isActive: true }
                        ]
                    }),
                    cloakingRules: JSON.stringify(defaultRules),
                    seoSettings: JSON.stringify(defaultSeo)
                }
            });
        }

        if (!site || !site.isActive) {
            return NextResponse.json({ error: 'Site bulunamadı veya aktif değil' }, { status: 404 });
        }

        const safeParse = (str: any) => {
            try {
                return typeof str === 'string' ? JSON.parse(str) : (str || {});
            } catch (e) {
                return {};
            }
        };

        const headersList = req.headers;
        const serverCountry = (headersList as any).get('cf-ipcountry') || (headersList as any).get('x-vercel-ip-country') || null;

        return NextResponse.json({
            ...site,
            serverDetectedCountry: serverCountry,
            maskContent: safeParse(site.maskContent),
            bettingContent: safeParse(site.bettingContent),
            cloakingRules: safeParse(site.cloakingRules),
            seoSettings: safeParse(site.seoSettings),
        });
    } catch (error) {
        console.error("API Error for domain " + cleanDomain + ":", error);
        return NextResponse.json({ error: 'Site getirilemedi' }, { status: 500 });
    }
}
