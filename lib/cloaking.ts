'use client';

export interface DeviceInfo {
    isMobile: boolean;
    isDesktop: boolean;
    isBot: boolean;
    country: string | null;
    userAgent: string;
}

export async function detectDevice(): Promise<DeviceInfo> {
    const userAgent = navigator.userAgent || '';

    // Bot detection
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

    const isBot = botPatterns.some(pattern => pattern.test(userAgent));

    // Mobile detection - Optimized for both real devices and browser resizing for testing
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
        || window.innerWidth < 768 // Standard mobile breakpoint
        || (window.innerWidth < 1024 && (navigator.maxTouchPoints > 0 || 'ontouchstart' in window));

    const isDesktop = !isMobile;

    // Country detection
    let country: string | null = null;

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);

        // Try multiple IP geolocation services with shorter timeouts
        const responseData = await Promise.any([
            fetch('https://ipapi.co/json/', { signal: controller.signal }).then(res => res.json()),
            fetch('https://ip-api.com/json/', { signal: controller.signal }).then(res => res.json()),
            fetch('https://api.ipify.org?format=json', { signal: controller.signal })
                .then(res => res.json())
                .then(data => fetch(`https://ipapi.co/${data.ip}/json/`, { signal: controller.signal }))
                .then(res => res.json())
        ]);

        clearTimeout(timeoutId);
        country = responseData.country_code || responseData.countryCode || null;
    } catch (error) {
        // Fallback to time zone detection (very effective for TR/CY)
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (tz === 'Europe/Istanbul' || tz === 'Asia/Istanbul') country = 'TR';
        if (tz === 'Europe/Nicosia' || tz === 'Asia/Nicosia') country = 'CY';

        // Final fallback: browser language
        if (!country) {
            const lang = navigator.language || '';
            if (lang.includes('tr')) country = 'TR';
            else if (lang.includes('cy')) country = 'CY';
        }
    }

    return {
        isMobile,
        isDesktop,
        isBot,
        country,
        userAgent,
    };
}

export function determineDisplayType(deviceInfo: DeviceInfo, rules: any): 'mask' | 'betting' | 'redirect' {
    // 1. IP Blacklist check
    if (rules.ipBlacklist && rules.ipBlacklist.length > 0) {
        // This usually needs server-side IP but we can check if we have any info
    }

    // 2. Bots always see mask
    if (deviceInfo.isBot) return 'mask';

    // 3. Desktop users check
    if (deviceInfo.isDesktop) {
        if (rules.redirectMaskTo && rules.redirectMaskTo.trim() !== '') {
            return 'redirect';
        }
        return 'mask';
    }

    // 4. Mobile Check
    if (deviceInfo.isMobile) {
        const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

        // If no countries are specified, allow all. Otherwise, check if current country is allowed.
        const hasCountryFilter = rules.showBettingTo.includedCountries && rules.showBettingTo.includedCountries.length > 0;
        const isAllowedCountry = !hasCountryFilter ||
            (deviceInfo.country && rules.showBettingTo.includedCountries.includes(deviceInfo.country)) ||
            isLocal;

        if (isAllowedCountry && rules.showBettingTo.mobile) {
            return 'betting';
        }
    }

    // Default to mask for safety
    return 'mask';
}
