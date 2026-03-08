import { headers } from 'next/headers';

export async function detectBotServer(): Promise<boolean> {
    const headersList = await headers();
    const userAgent = headersList.get('user-agent') || '';
    
    // Check multiple headers for IP since it might be behind Cloudflare or a proxy
    const ip = headersList.get('x-forwarded-for') || headersList.get('cf-connecting-ip') || headersList.get('x-real-ip') || '';

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

    const isBotUa = botPatterns.some(pattern => pattern.test(userAgent));

    // IP Based Cloaking - Detect common Googlebot/Bingbot/Spider subnets
    const botIps = [
        /^66\.249\./,   // Googlebot
        /^66\.102\./,   // Googlebot
        /^64\.233\./,   // Google
        /^157\.55\./,   // Bing
        /^207\.46\./,   // Bing
        /^40\.77\./,    // Bing
        /^216\.239\./,  // Google
        /^64\.68\./     // Google
    ];

    const isBotIp = botIps.some(pattern => pattern.test(ip));

    // E-E-A-T Strategy: Even if UA is spoofed by a user, we only want to show 
    // the academic page to true Googlebots. But if a real user comes with a bot UA, 
    // it's safer to show them the academic page than to show Googlebot the spam page.
    return isBotUa || isBotIp;
}
