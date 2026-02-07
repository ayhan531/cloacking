import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const { url } = await req.json();

        if (!url) {
            return NextResponse.json({ error: 'URL required' }, { status: 400 });
        }

        const results = {
            indexNow: { success: false, message: '' },
            bingPing: { success: false, message: '' },
            googlePing: { success: false, message: '' }
        };

        // 1. IndexNow Protocol (Bing, Yandex, etc.)
        try {
            const indexNowResponse = await fetch('https://api.indexnow.org/indexnow', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    host: new URL(url).hostname,
                    key: 'flovaz2026indexnowkey',
                    keyLocation: `https://${new URL(url).hostname}/flovaz2026indexnowkey.txt`,
                    urlList: [url]
                })
            });

            if (indexNowResponse.ok || indexNowResponse.status === 202) {
                results.indexNow.success = true;
                results.indexNow.message = 'IndexNow submitted successfully';
            } else {
                results.indexNow.message = `IndexNow failed: ${indexNowResponse.status}`;
            }
        } catch (e) {
            results.indexNow.message = `IndexNow error: ${String(e)}`;
        }

        // 2. Bing Webmaster Ping
        try {
            const bingPingUrl = `https://www.bing.com/ping?sitemap=https://${new URL(url).hostname}/sitemap.xml`;
            const bingResponse = await fetch(bingPingUrl);

            if (bingResponse.ok) {
                results.bingPing.success = true;
                results.bingPing.message = 'Bing sitemap pinged';
            } else {
                results.bingPing.message = `Bing ping failed: ${bingResponse.status}`;
            }
        } catch (e) {
            results.bingPing.message = `Bing ping error: ${String(e)}`;
        }

        // 3. Google Sitemap Ping
        try {
            const googlePingUrl = `https://www.google.com/ping?sitemap=https://${new URL(url).hostname}/sitemap.xml`;
            const googleResponse = await fetch(googlePingUrl);

            if (googleResponse.ok) {
                results.googlePing.success = true;
                results.googlePing.message = 'Google sitemap pinged';
            } else {
                results.googlePing.message = `Google ping failed: ${googleResponse.status}`;
            }
        } catch (e) {
            results.googlePing.message = `Google ping error: ${String(e)}`;
        }

        return NextResponse.json({
            success: true,
            url,
            results,
            summary: `IndexNow: ${results.indexNow.success ? '✅' : '❌'}, Bing: ${results.bingPing.success ? '✅' : '❌'}, Google: ${results.googlePing.success ? '✅' : '❌'}`
        });

    } catch (error) {
        console.error('Acceleration Error:', error);
        return NextResponse.json({
            success: false,
            error: String(error)
        }, { status: 500 });
    }
}
