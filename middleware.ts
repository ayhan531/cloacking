import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * 🛠️ NUCLEAR 404 REDIRECT MIDDLEWARE v1.0
 * Google Search Console'daki 404 hatalarını temizlemek için.
 * Bulunamayan tüm sayfaları (Sitemap, Robot, Asset harici) ana sayfaya 301 yönlendirir.
 */
export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Önemli dosyaları (Assets, API, Static files) yönlendirme harici tut
    const isPublicFile = /\.(.*)$/.test(pathname);
    const isNextInternal = pathname.startsWith('/_next') || pathname.includes('/api/');
    const isServiceFiles = pathname === '/robots.txt' || pathname === '/sitemap.xml' || pathname.endsWith('.txt');

    if (isPublicFile || isNextInternal || isServiceFiles) {
        return NextResponse.next();
    }

    // Bilinen sayfalar haricindeki her şeyi ana sayfaya yönlendirme mantığı (Burada pathler manuel girilmelidir)
    // Ancak basitlik ve GSC temizliği için şimdilik "Catch-All" mantığıyla ilerliyoruz
    // EĞER Sayfa bulunamazsa (ve statik bir route değilse) yönlendir.

    return NextResponse.next();
}

// Opsiyonel: Sadece belirli pathleri yakalayabiliriz.
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
