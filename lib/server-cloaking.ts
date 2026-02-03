import { headers } from 'next/headers';

export async function detectBotServer(): Promise<boolean> {
    const headersList = await headers();
    const userAgent = headersList.get('user-agent') || '';

    const botPatterns = [
        /bot/i,
        /crawl/i,
        /spider/i,
        /google/i,
        /bing/i,
        /yahoo/i,
        /baidu/i,
        /yandex/i,
        /facebook/i,
        /twitter/i,
        /whatsapp/i,
        /telegram/i,
    ];

    return botPatterns.some(pattern => pattern.test(userAgent));
}
