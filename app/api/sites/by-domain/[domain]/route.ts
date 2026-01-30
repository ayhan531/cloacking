import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
    req: Request,
    { params }: { params: Promise<{ domain: string }> }
) {
    try {
        const { domain } = await params;

        const site = await prisma.site.findUnique({
            where: { domain }
        });

        if (!site || !site.isActive) {
            return NextResponse.json({ error: 'Site bulunamadı veya aktif değil' }, { status: 404 });
        }

        return NextResponse.json({
            ...site,
            maskContent: JSON.parse(site.maskContent),
            bettingContent: JSON.parse(site.bettingContent),
            cloakingRules: JSON.parse(site.cloakingRules),
            seoSettings: JSON.parse(site.seoSettings),
        });
    } catch (error) {
        return NextResponse.json({ error: 'Site getirilemedi' }, { status: 500 });
    }
}
