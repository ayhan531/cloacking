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
        /slack/i,
        /linkedin/i,
        /pinterest/i,
        /duckduck/i,
        /ia_archiver/i,
        /mediapartners-google/i,
        /adsbot-google/i,
        /google-read-aloud/i,
        /google-structured-data-testing-tool/i,
        /chrome-lighthouse/i,
    ];

    return botPatterns.some(pattern => pattern.test(userAgent));
}
