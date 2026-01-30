import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const site = await prisma.site.findUnique({
            where: { id }
        });

        if (!site) {
            return NextResponse.json({ error: 'Site bulunamadı' }, { status: 404 });
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

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const session = await getServerSession();
        if (!session) {
            return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 });
        }

        const body = await req.json();
        const { name, domain, maskType, maskContent, bettingContent, cloakingRules, seoSettings, isActive } = body;

        const site = await prisma.site.update({
            where: { id },
            data: {
                name,
                domain,
                maskType,
                maskContent: JSON.stringify(maskContent),
                bettingContent: JSON.stringify(bettingContent),
                cloakingRules: JSON.stringify(cloakingRules),
                seoSettings: JSON.stringify(seoSettings),
                isActive
            }
        });

        return NextResponse.json(site);
    } catch (error) {
        return NextResponse.json({ error: 'Site güncellenemedi' }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const session = await getServerSession();
        if (!session) {
            return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 });
        }

        await prisma.site.delete({
            where: { id }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Site silinemedi' }, { status: 500 });
    }
}
