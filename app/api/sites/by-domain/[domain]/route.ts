import { NextResponse } from 'next/server';
import { getSiteByDomain } from '@/lib/site-service';

export async function GET(req: Request, { params }: { params: Promise<{ domain: string }> }) {
    const { domain } = await params;

    try {
        const site = await getSiteByDomain(domain);

        if (!site) {
            return NextResponse.json({ error: 'Site bulunamadı veya aktif değil' }, { status: 404 });
        }

        const headersList = req.headers;
        const serverCountry = (headersList as any).get('cf-ipcountry') || (headersList as any).get('x-vercel-ip-country') || null;

        return NextResponse.json({
            ...site,
            serverDetectedCountry: serverCountry,
        });
    } catch (error) {
        console.error("API Error for domain " + domain + ":", error);
        return NextResponse.json({ error: 'Site getirilemedi' }, { status: 500 });
    }
}
