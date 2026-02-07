import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const sites = await prisma.site.findMany({
            orderBy: { createdAt: 'desc' }
        });

        // Parse JSON strings
        const parsedSites = sites.map(site => ({
            ...site,
            maskContent: JSON.parse(site.maskContent),
            bettingContent: JSON.parse(site.bettingContent),
            cloakingRules: JSON.parse(site.cloakingRules),
            seoSettings: JSON.parse(site.seoSettings),
        }));

        return NextResponse.json(parsedSites);
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Siteler getirilemedi' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession();
        if (!session) {
            return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 });
        }

        const body = await req.json();
        const { name, domain, maskType, maskContent, bettingContent, cloakingRules, seoSettings } = body;

        const site = await prisma.site.create({
            data: {
                name,
                domain,
                maskType,
                maskContent: JSON.stringify(maskContent),
                bettingContent: JSON.stringify(bettingContent),
                cloakingRules: JSON.stringify(cloakingRules),
                seoSettings: JSON.stringify(seoSettings),
                isActive: true
            }
        });

        return NextResponse.json(site);
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Site oluşturulamadı' }, { status: 500 });
    }
}
