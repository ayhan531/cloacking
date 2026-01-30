import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';

export async function GET() {
    try {
        const settings = await prisma.settings.findUnique({
            where: { id: 'general' }
        });

        // Default settings if not found
        if (!settings) {
            return NextResponse.json({
                platformName: 'Cloaking Platform',
                adminEmail: 'admin@example.com',
            });
        }

        return NextResponse.json(settings);
    } catch (error) {
        return NextResponse.json({ error: 'Ayarlar getirilemedi' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession();
        if (!session) {
            return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 });
        }

        const body = await req.json();
        const { platformName, adminEmail } = body;

        const settings = await prisma.settings.upsert({
            where: { id: 'general' },
            update: {
                platformName,
                adminEmail,
            },
            create: {
                id: 'general',
                platformName,
                adminEmail,
            }
        });

        return NextResponse.json(settings);
    } catch (error) {
        return NextResponse.json({ error: 'Ayarlar kaydedilemedi' }, { status: 500 });
    }
}
