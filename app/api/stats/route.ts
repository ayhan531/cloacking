import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';

export async function GET() {
    try {
        const session = await getServerSession();
        if (!session) {
            return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 });
        }

        const totalSites = await prisma.site.count();
        const activeSites = await prisma.site.count({ where: { isActive: true } });
        const inactiveSites = totalSites - activeSites;

        return NextResponse.json({
            totalSites,
            activeSites,
            inactiveSites,
        });
    } catch (error) {
        return NextResponse.json({ error: 'İstatistikler getirilemedi' }, { status: 500 });
    }
}
