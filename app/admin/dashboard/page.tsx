'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Layout, Globe, Shield, Activity, Plus, Settings, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalSites: 0,
        activeSites: 0,
        inactiveSites: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            try {
                const response = await fetch('/api/stats');
                if (response.ok) {
                    const data = await response.json();
                    setStats(data);
                }
            } catch (error) {
                console.error('Error fetching stats:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                        Dashboard
                    </h1>
                    <p className="text-gray-600 text-lg">Platform durumuna genel bir bakış.</p>
                </div>
                <Link href="/admin/sites">
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg transition-all duration-300">
                        <Plus className="w-4 h-4 mr-2" />
                        Yeni Site Oluştur
                    </Button>
                </Link>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-0 shadow-xl bg-white/50 backdrop-blur-sm hover:translate-y-[-4px] transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500 uppercase tracking-wider">Toplam Site</CardTitle>
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <Globe className="w-5 h-5 text-blue-600" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-gray-900">{stats.totalSites}</div>
                        <p className="text-xs text-gray-500 mt-2">Sistemdeki toplam domain sayısı</p>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-xl bg-white/50 backdrop-blur-sm hover:translate-y-[-4px] transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500 uppercase tracking-wider">Aktif Siteler</CardTitle>
                        <div className="p-2 bg-emerald-100 rounded-lg">
                            <Activity className="w-5 h-5 text-emerald-600" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-gray-900">{stats.activeSites}</div>
                        <p className="text-xs text-gray-500 mt-2">Yayında olan aktif domainler</p>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-xl bg-white/50 backdrop-blur-sm hover:translate-y-[-4px] transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500 uppercase tracking-wider">Pasif Siteler</CardTitle>
                        <div className="p-2 bg-rose-100 rounded-lg">
                            <Shield className="w-5 h-5 text-rose-600" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-gray-900">{stats.inactiveSites}</div>
                        <p className="text-xs text-gray-500 mt-2">Durdurulmuş veya pasif domainler</p>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions & System Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="border-0 shadow-xl bg-white/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle>Hızlı Linkler</CardTitle>
                        <CardDescription>Sık kullanılan sayfalara hızlı erişim.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Link href="/admin/sites" className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                                    <Layout className="w-5 h-5" />
                                </div>
                                <span className="font-medium text-gray-700">Tüm Siteleri Yönet</span>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link href="/admin/settings" className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                                    <Plus className="w-5 h-5" />
                                </div>
                                <span className="font-medium text-gray-700">Yeni Site Oluştur</span>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-xl bg-white/50 backdrop-blur-sm overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border-b border-white/20">
                        <CardTitle>Sistem Bilgisi</CardTitle>
                        <CardDescription>Platform teknik ayrıntıları.</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                <span className="text-gray-500">Versiyon</span>
                                <span className="font-medium">1.0.0</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                <span className="text-gray-500">Next.js</span>
                                <span className="font-medium">14.0.0</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                <span className="text-gray-500">Veritabanı</span>
                                <span className="font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full text-xs">SQLite (SQL)</span>
                            </div>
                            <div className="flex justify-between items-center py-2">
                                <span className="text-gray-500">Durum</span>
                                <div className="flex items-center text-emerald-600 font-medium">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse mr-2" />
                                    Kararlı
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
