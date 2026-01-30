'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Save, Shield, Settings as SettingsIcon, Loader2 } from 'lucide-react';

export default function SettingsPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [settings, setSettings] = useState({
        platformName: 'Cloaking Platform',
        adminEmail: 'admin@example.com'
    });

    useEffect(() => {
        async function fetchSettings() {
            try {
                const response = await fetch('/api/settings');
                if (response.ok) {
                    const data = await response.json();
                    setSettings({
                        platformName: data.platformName || 'Cloaking Platform',
                        adminEmail: data.adminEmail || 'admin@example.com'
                    });
                }
            } catch (error) {
                console.error('Error fetching settings:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchSettings();
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const response = await fetch('/api/settings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(settings),
            });

            if (response.ok) {
                alert('Ayarlar başarıyla kaydedildi.');
            } else {
                const error = await response.json();
                alert(`Hata: ${error.error || 'Ayarlar kaydedilemedi'}`);
            }
        } catch (error) {
            console.error('Error saving settings:', error);
            alert('Ayarlar kaydedilirken bir hata oluştu.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    Genel Ayarlar
                </h1>
                <p className="text-gray-600 text-lg">
                    Platformun genel ayarlarını buradan yönetebilirsiniz.
                </p>
            </div>

            <div className="grid gap-6 max-w-2xl">
                <Card className="border-0 shadow-lg">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <SettingsIcon className="w-5 h-5 text-purple-600" />
                            <CardTitle>Platform Yapılandırması</CardTitle>
                        </div>
                        <CardDescription>
                            Panelde görünen genel platform bilgileri.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSave} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="platformName">Platform İsmi</Label>
                                <Input
                                    id="platformName"
                                    value={settings.platformName}
                                    onChange={(e) => setSettings({ ...settings, platformName: e.target.value })}
                                    placeholder="Cloaking Platform"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="adminEmail">Admin İletişim Email</Label>
                                <Input
                                    id="adminEmail"
                                    type="email"
                                    value={settings.adminEmail}
                                    onChange={(e) => setSettings({ ...settings, adminEmail: e.target.value })}
                                    placeholder="admin@example.com"
                                />
                            </div>

                            <div className="pt-4">
                                <Button
                                    type="submit"
                                    disabled={saving}
                                    className="bg-gradient-to-r from-blue-600 to-purple-600"
                                >
                                    {saving ? (
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    ) : (
                                        <Save className="w-4 h-4 mr-2" />
                                    )}
                                    {saving ? 'Kaydediliyor...' : 'Ayarları Kaydet'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-lg border-l-4 border-l-amber-500">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Shield className="w-5 h-5 text-amber-600" />
                            <CardTitle>Güvenlik Notu</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            Bu panel üzerinden oluşturduğunuz her veri, yerel SQL veritabanınızda güvenli bir şekilde saklanır.
                            Giriş şifrelerini veya admin bilgilerini güncellemek için platform Ayarlarını kullanmaya devam edebilirsiniz.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
