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
        const timeoutId = setTimeout(() => controller.abort(), 2000);

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
        // Fallback 1: Timezone String
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
        if (tz.includes('Istanbul') || tz.includes('Turkey') || tz.includes('Athens') || tz.includes('Nicosia')) {
            if (tz.includes('Istanbul') || tz.includes('Turkey')) country = 'TR';
            if (tz.includes('Nicosia') || tz.includes('Cyprus')) country = 'CY';
        }

        // Fallback 2: Timezone Offset (TR is GMT+3, offset usually -180)
        if (!country) {
            const offset = new Date().getTimezoneOffset();
            if (offset === -180) { // Turkey/Cyprus/Moscow/etc
                country = 'TR'; // Default to TR for this offset in our context
            }
        }

        // Fallback 3: Browser Language
        if (!country) {
            const lang = (navigator.language || '').toLowerCase();
            const langs = (navigator.languages || []).map(l => l.toLowerCase());
            if (lang.includes('tr') || langs.some(l => l.includes('tr'))) country = 'TR';
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
    const showMask = rules?.showMaskTo || { bots: true, desktop: true };
    const showBetting = rules?.showBettingTo || { mobile: true };

    // 1. Bots always see mask
    if (deviceInfo.isBot && showMask.bots) return 'mask';

    // 2. Localhost always sees betting (for development)
    const isLocal = typeof window !== 'undefined' &&
        (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
    if (isLocal) return 'betting';

    // 3. Desktop users check
    if (deviceInfo.isDesktop) {
        // If it's a desktop but has touch (tablet logic)
        if (navigator.maxTouchPoints > 0) {
            // Fall through to mobile check
        } else {
            if (rules?.redirectMaskTo && rules.redirectMaskTo.trim() !== '') {
                return 'redirect';
            }
            return 'mask';
        }
    }

    // 4. Mobile / Tablet Check
    const includedCountries = showBetting.includedCountries || [];
    const hasCountryFilter = includedCountries.length > 0;

    // Country logic: if we have a filter, we MUST match.
    // BUT we add a "Safety TR/CY" auto-match if detected.
    const isAllowedCountry = !hasCountryFilter ||
        (deviceInfo.country && includedCountries.includes(deviceInfo.country)) ||
        deviceInfo.country === 'TR' || deviceInfo.country === 'CY';

    if (isAllowedCountry && showBetting.mobile !== false) {
        return 'betting';
    }

    // Default to mask for safety
    return 'mask';
}
