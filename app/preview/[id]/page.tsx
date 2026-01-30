'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { detectDevice, determineDisplayType, type DeviceInfo } from '@/lib/cloaking';
import type { SiteConfig } from '@/lib/types';
import MaskSite from '@/components/MaskSite';
import BettingSite from '@/components/BettingSite';
import { Button } from '@/components/ui/button';
import { LayoutDashboard } from 'lucide-react';
import Link from 'next/link';

export default function PreviewPage() {
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(null);
    const [displayMode, setDisplayMode] = useState<'mask' | 'betting' | 'redirect'>('mask');
    const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);

    useEffect(() => {
        async function loadPreview() {
            try {
                const device = await detectDevice();
                setDeviceInfo(device);

                const response = await fetch(`/api/sites/${params.id}`);
                if (response.ok) {
                    const siteData = await response.json();
                    setSiteConfig(siteData);

                    const mode = determineDisplayType(device, siteData.cloakingRules);
                    setDisplayMode(mode);
                }
            } catch (error) {
                console.error('Preview error:', error);
            } finally {
                setLoading(false);
            }
        }
        loadPreview();
    }, [params.id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <div className="text-purple-500 animate-pulse text-xl">Site Önizlemesi Hazırlanıyor...</div>
            </div>
        );
    }

    if (!siteConfig) {
        return <div className="p-10 text-center">Site bulunamadı (ID: {params.id})</div>;
    }

    return (
        <div className="relative min-h-screen">
            {/* Önizleme Bilgi Çubuğu */}
            <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-4 bg-black/80 backdrop-blur-md border border-white/20 px-6 py-3 rounded-full shadow-2xl pointer-events-auto">
                <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${displayMode === 'mask' ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                    <span className="text-white text-sm font-medium">
                        {displayMode === 'mask' ? 'MASKELİ SİTE (Bot/PC)' :
                            displayMode === 'redirect' ? 'YÖNLENDİRME AKTİF' : 'BAHİS SİTESİ (Mobil)'}
                    </span>
                </div>
                <div className="h-4 w-px bg-white/20" />
                <div className="text-gray-400 text-xs text-center">
                    Cihaz: {deviceInfo?.isMobile ? 'Mobil' : 'PC'} |
                    Konum: {deviceInfo?.country || 'Tespit Edilemedi'}
                </div>
                <div className="h-4 w-px bg-white/20" />
                <Link href="/admin/sites">
                    <Button size="sm" variant="ghost" className="text-white hover:bg-white/10 h-8">
                        <LayoutDashboard className="w-4 h-4 mr-2" />
                        Panelin
                    </Button>
                </Link>
            </div>

            {/* Sitenin Kendisi */}
            {displayMode === 'betting' ? (
                <BettingSite config={siteConfig} />
            ) : (
                <MaskSite config={siteConfig} />
            )}

            {displayMode === 'redirect' && (
                <div className="fixed inset-0 z-[9998] bg-black/90 flex items-center justify-center p-10 text-center">
                    <div className="max-w-md">
                        <h2 className="text-white text-2xl font-bold mb-4">PC Yönlendirmesi Aktif</h2>
                        <p className="text-gray-400">Normal kullanıcılar şu adrese yönlendirilecek:</p>
                        <code className="block bg-gray-800 p-2 rounded mt-2 text-blue-400">{siteConfig.cloakingRules.redirectMaskTo}</code>
                    </div>
                </div>
            )}
        </div>
    );
}
