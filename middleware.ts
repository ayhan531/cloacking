import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const response = NextResponse.next();

    // Get the pathname
    const pathname = request.nextUrl.pathname;
    const host = request.headers.get('host') || 'flovazcomercial.com';

    // For all subpages, inject HTTP Header canonical
    if (pathname !== '/' && !pathname.startsWith('/api') && !pathname.startsWith('/_next')) {
        const canonicalUrl = `https://${host}${pathname}`;
        response.headers.set('Link', `<${canonicalUrl}>; rel="canonical"`);
    }

    // For homepage
    if (pathname === '/') {
        const canonicalUrl = `https://${host}`;
        response.headers.set('Link', `<${canonicalUrl}>; rel="canonical"`);
    }

    return response;
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
};
