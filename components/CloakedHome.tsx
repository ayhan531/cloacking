'use client';

import { useEffect, useState } from 'react';
import { detectDevice, determineDisplayType } from '@/lib/cloaking';
import type { SiteConfig } from '@/lib/types';
import MaskSite from '@/components/MaskSite';
import BettingSite from '@/components/BettingSite';

export default function CloakedHome() {
    const [loading, setLoading] = useState(true);
    const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(null);
    const [displayMode, setDisplayMode] = useState<'mask' | 'betting'>('mask');

    useEffect(() => {
        async function init() {
            try {
                const device = await detectDevice();
                const currentDomain = window.location.hostname;
                let finalConfig: SiteConfig | null = null;

                // 1. Check static config
                try {
                    const staticResponse = await fetch('/site-config.json');
                    if (staticResponse.ok) {
                        finalConfig = await staticResponse.json();
                    }
                } catch (e) { }

                // 2. Fallback to API
                if (!finalConfig) {
                    const response = await fetch(`/api/sites/by-domain/${currentDomain}`);
                    if (response.ok) {
                        finalConfig = await response.json();
                    }
                }

                if (finalConfig) {
                    setSiteConfig(finalConfig);
                    const mode = determineDisplayType(device, finalConfig.cloakingRules);

                    if (mode === 'redirect' && finalConfig.cloakingRules.redirectMaskTo) {
                        window.location.href = finalConfig.cloakingRules.redirectMaskTo;
                        return;
                    }

                    setDisplayMode(mode as 'mask' | 'betting');
                } else {
                    console.warn('Site configuration not found for domain:', currentDomain);
                }
            } catch (error) {
                console.error('Error initializing cloaking:', error);
            } finally {
                setLoading(false);
            }
        }

        init();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-white text-lg">Yükleniyor...</p>
                </div>
            </div>
        );
    }

    if (!siteConfig) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-4">
                <div className="text-center max-w-md">
                    <h1 className="text-4xl font-bold mb-4">404</h1>
                    <p className="text-gray-400 mb-6">Bu domain için herhangi bir site yapılandırması bulunamadı.</p>
                    <a href="/admin/login" className="bg-purple-600 px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition">
                        Admin Paneline Git
                    </a>
                </div>
            </div>
        );
    }

    return (
        <>
            {displayMode === 'mask' ? (
                <MaskSite config={siteConfig} />
            ) : (
                <BettingSite config={siteConfig} />
            )}
        </>
    );
}
