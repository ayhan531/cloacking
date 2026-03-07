import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * 🛠️ NUCLEAR SEO & REDIRECT MIDDLEWARE v2.0
 * Bütün proxy ve middleware mantığı tek dosyada birleştirildi.
 */
export function middleware(request: NextRequest) {
    const url = request.nextUrl.clone();
    const host = request.headers.get('host') || '';
    const pathname = url.pathname;

    // 1. WWW -> Non-WWW Yönlendirmesi (SEO Best Practice)
    if (host.startsWith('www.')) {
        const newHost = host.replace('www.', '');
        const newUrl = `https://${newHost}${pathname}${url.search}`;
        return NextResponse.redirect(newUrl, 301);
    }

    const domain = host.split(':')[0]; // Pure domain

    // Vercel / Next.js dahili dosyaları pas geç (Performans)
    const isPublicFile = /\.(.*)$/.test(pathname);
    const isNextInternal = pathname.startsWith('/_next') || pathname.includes('/api/');
    const isServiceFiles = pathname === '/robots.txt' || pathname === '/sitemap.xml' || pathname.endsWith('.txt');

    if (isPublicFile || isNextInternal || isServiceFiles) {
        return NextResponse.next();
    }

    // Response oluştur
    const response = NextResponse.next();

    // 2. Canonical URL Header Enjeksiyonu
    const canonicalUrl = `https://${domain}${pathname === '/' ? '' : pathname}`;
    response.headers.set('Link', `<${canonicalUrl}>; rel="canonical"`);

    return response;
}

// Sadece sayfaları (statiği hariç tut) yakala
export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
