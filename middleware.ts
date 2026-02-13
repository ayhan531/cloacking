import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const response = NextResponse.next();

    // Get the pathname
    const url = request.nextUrl.clone();
    const host = request.headers.get('host') || '';

    // 1. WWW -> Non-WWW Redirect (SEO Best Practice)
    if (host.startsWith('www.')) {
        const newHost = host.replace('www.', '');
        const newUrl = `https://${newHost}${url.pathname}${url.search}`;
        return NextResponse.redirect(newUrl, 301);
    }

    const domain = host.split(':')[0]; // Pure domain
    const pathname = url.pathname;

    // For all subpages/home, inject consistent HTTP Header canonical (Non-WWW)
    if (!pathname.startsWith('/api') && !pathname.startsWith('/_next') && !pathname.includes('.')) {
        const canonicalUrl = `https://${domain}${pathname === '/' ? '' : pathname}`;
        response.headers.set('Link', `<${canonicalUrl}>; rel="canonical"`);
    }

    return response;
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
};
