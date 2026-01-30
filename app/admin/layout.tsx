'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Globe, LogOut, Settings } from 'lucide-react';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { user, isAdmin, loading, logout } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    const isLoginPage = pathname === '/admin/login';

    useEffect(() => {
        if (!loading && !user && !isLoginPage) {
            router.push('/admin/login');
        }
    }, [user, loading, router, isLoginPage]);

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

    // Login sayfasındaysak layout'un geri kalanını (sidebar vs.) göstermeden sadece içeriği (login formunu) göster
    if (isLoginPage) {
        return <>{children}</>;
    }

    if (!user || !isAdmin) {
        return null;
    }

    const handleLogout = async () => {
        await logout();
        router.push('/admin/login');
    };

    const navItems = [
        { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { href: '/admin/sites', icon: Globe, label: 'Siteler' },
        { href: '/admin/settings', icon: Settings, label: 'Ayarlar' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
            {/* Sidebar */}
            <aside className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 text-white p-6 shadow-2xl">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        Cloaking Platform
                    </h1>
                    <p className="text-sm text-gray-400 mt-1">Admin Panel</p>
                </div>

                <nav className="space-y-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive
                                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg'
                                    : 'hover:bg-white/10'
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 mb-4">
                        <p className="text-sm text-gray-300">Giriş yapan:</p>
                        <p className="text-sm font-medium truncate">{user.email}</p>
                    </div>
                    <Button
                        onClick={handleLogout}
                        variant="outline"
                        className="w-full bg-white/10 border-white/20 hover:bg-white/20 text-white"
                    >
                        <LogOut className="w-4 h-4 mr-2" />
                        Çıkış Yap
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="ml-64 p-8">
                {children}
            </main>
        </div>
    );
}
