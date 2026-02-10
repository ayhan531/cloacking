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

        const safeParse = (str: any) => {
            try {
                return typeof str === 'string' ? JSON.parse(str) : (str || {});
            } catch (e) {
                return {};
            }
        };

        return NextResponse.json({
            ...site,
            maskContent: safeParse(site.maskContent),
            bettingContent: safeParse(site.bettingContent),
            cloakingRules: safeParse(site.cloakingRules),
            seoSettings: safeParse(site.seoSettings),
        });
    } catch (error) {
        return NextResponse.json({ error: 'Site getirilemedi' }, { status: 500 });
    }
}
