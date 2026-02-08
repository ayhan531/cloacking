import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const id = '82ed3fee-54e5-4277-b856-8ae1ebed68ec';
        const newDomain = 'haber-analiz2026.com';
        const newName = 'Haber Analiz 2026';

        const site = await prisma.site.findUnique({
            where: { id }
        });

        if (!site) {
            return NextResponse.json({ error: 'Site not found' }, { status: 404 });
        }

        const maskContent = JSON.parse(site.maskContent);
        maskContent.siteName = newName;
        maskContent.heroTitle = 'Türkiye\'nin En Güncel Haber ve Analiz Portalı';
        // Nuclear Ranking Strategy: Backlink from News Authority to Betting Target
        maskContent.heroSubtitle = 'Son Dakika: 2026 Yılının En Yüksek Deneme Bonusu Veren Siteleri Listesi Güncellendi. Analizleri İncelemek İçin Tıklayın.';
        maskContent.heroLink = 'https://flovazcomercial.com/deneme-bonusu';

        const seoSettings = JSON.parse(site.seoSettings);
        seoSettings.metaTitle = 'Haber Analiz 2026 - Güncel Gündem ve Analizler';
        seoSettings.metaDescription = '2026 yılının en güncel haberleri, derinlemesine analizler ve son dakika gelişmeleri ile Türkiye\'nin haber merkezi.';

        const updatedSite = await prisma.site.update({
            where: { id },
            data: {
                name: newName,
                domain: newDomain,
                maskContent: JSON.stringify(maskContent),
                seoSettings: JSON.stringify(seoSettings)
            }
        });

        return NextResponse.json({
            success: true,
            message: `Successfully updated site to ${newDomain}`,
            site: updatedSite
        });
    } catch (error) {
        console.error('Setup Error:', error);
        return NextResponse.json({ error: 'Setup failed' }, { status: 500 });
    }
}
