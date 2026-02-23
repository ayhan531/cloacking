import { headers } from "next/headers";
import { getSiteByDomain } from "@/lib/site-service";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    const headersList = await headers();
    const host = headersList.get("host") || "";
    const domain = host.split(':')[0].replace('www.', '');
    const site = await getSiteByDomain(domain);

    return {
        title: `İletişim - ${site?.name || 'Analiz'} Destek Hattı`,
        description: `${site?.name} ile iletişime geçin. 2026 deneme bonusu analizleri ve teknik destek talepleri için bize ulaşın.`,
        alternates: {
            canonical: `https://${domain}/iletisim`,
        }
    };
}

export default async function ContactPage() {
    const headersList = await headers();
    const host = headersList.get("host") || "";
    const domain = host.split(':')[0].replace('www.', '');
    const site = await getSiteByDomain(domain);
    const siteName = site?.name || "Otorite Analiz";

    const colorScheme = site?.maskContent ? JSON.parse(site.maskContent).colorScheme : { primary: '#3b82f6', secondary: '#1d4ed8' };

    return (
        <div className="min-h-screen font-sans bg-slate-50 selection:bg-[var(--primary)] selection:text-white" style={{
            '--primary': colorScheme.primary,
            '--secondary': colorScheme.secondary,
        } as any}>
            {/* Header Mirroring News/Home */}
            <header className="bg-white/80 backdrop-blur-2xl border-b border-slate-200/60 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3 group cursor-pointer">
                        <div className="w-10 h-10 bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] text-white flex items-center justify-center font-black text-xl rounded-xl shadow-lg shadow-primary/20 group-hover:rotate-6 transition-transform">
                            {siteName?.charAt(0) || 'V'}
                        </div>
                        <a href="/" className="text-2xl font-black text-slate-900 tracking-tight uppercase group-hover:text-[var(--primary)] transition-colors">
                            {siteName}
                        </a>
                    </div>
                    <nav className="hidden md:flex gap-10">
                        <a href="/" className="text-slate-500 font-bold hover:text-[var(--primary)] py-7 transition-colors">Ana Sayfa</a>
                        <a href="/haberler" className="text-slate-500 font-bold hover:text-[var(--primary)] py-7 transition-colors">Haberler</a>
                        <a href="/iletisim" className="text-[var(--primary)] font-bold border-b-2 border-[var(--primary)] py-7">İletişim</a>
                    </nav>
                </div>
            </header>

            <article className="max-w-6xl mx-auto py-24 px-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-[var(--primary)]/5 rounded-full blur-[120px] -z-10" />

                <header className="mb-20 text-center space-y-4">
                    <h3 className="text-[var(--primary)] font-black uppercase tracking-[0.3em] text-sm italic">Bize Ulaşın</h3>
                    <h1 className="text-6xl md:text-7xl font-black text-slate-900 tracking-tighter italic">Destek ve <span className="text-slate-400">İş Birliği</span></h1>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">Analiz talepleri ve kurumsal iş birlikleri için teknik destek merkezimiz 7/24 global standartlarda hizmetinizdedir.</p>
                </header>

                <div className="grid md:grid-cols-2 gap-10">
                    <div className="bg-white p-12 rounded-[56px] border border-slate-100 shadow-2xl shadow-slate-200/50 flex flex-col justify-between group overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--primary)]/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                        <div>
                            <h2 className="text-3xl font-black text-slate-900 mb-10 italic">{siteName} <br /><span className="text-[var(--primary)]">Global Audit Support</span></h2>
                            <ul className="space-y-8">
                                <li className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-[var(--primary)] group-hover:bg-[var(--primary)] group-hover:text-white transition-colors">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">E-Posta Hattı</div>
                                        <div className="text-lg font-black text-slate-800">support@{domain}</div>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-[var(--primary)] group-hover:bg-[var(--primary)] group-hover:text-white transition-colors">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Merkez Ofis</div>
                                        <div className="text-lg font-black text-slate-800 italic">San Jose, CA (Corporate HQ)</div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="mt-12 flex gap-4">
                            <span className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-[var(--primary)] hover:text-white cursor-pointer transition-colors">FB</span>
                            <span className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-[var(--primary)] hover:text-white cursor-pointer transition-colors">TW</span>
                            <span className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-[var(--primary)] hover:text-white cursor-pointer transition-colors">IG</span>
                        </div>
                    </div>

                    <div className="bg-slate-950 p-12 rounded-[56px] text-white flex flex-col justify-between shadow-2xl shadow-indigo-500/10 border border-white/5 group relative overflow-hidden">
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px]" />
                        <div>
                            <h2 className="text-3xl font-black mb-8 italic tracking-tighter">Hızlı <span className="text-indigo-400">Bildirim</span></h2>
                            <p className="mb-10 text-slate-400 text-lg font-medium leading-relaxed">
                                Analiz edilen platformlar hakkında şikayet veya öneride bulunmak için lütfen <span className="text-white italic underline decoration-indigo-500 underline-offset-4">support@{domain}</span> adresine iletin.
                            </p>
                            <div className="p-8 bg-white/5 rounded-3xl border border-white/10 text-xs font-mono space-y-2 group-hover:bg-white/10 transition-colors">
                                <div className="flex justify-between"><span>PROTOCOL:</span> <span className="text-indigo-400">SECURE_AUDIT_V5</span></div>
                                <div className="flex justify-between"><span>ENCRYPT:</span> <span className="text-emerald-400">AES-256-GCM</span></div>
                                <div className="flex justify-between"><span>AUTHORITY:</span> <span>{domain.toUpperCase()}</span></div>
                            </div>
                        </div>
                        <button className="mt-12 w-full h-16 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-2xl font-black text-lg italic uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20">
                            Talep Oluştur
                        </button>
                    </div>
                </div>

                <div className="mt-20 p-10 bg-white rounded-[40px] border border-slate-100 text-center shadow-lg shadow-slate-100/50">
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-[0.3em]">
                        * BU SAYFA {siteName} GLOBAL NEWS & AUDIT SYNERGY NETWORK BÜNYESİNDE KULLANICI ERİŞİM BÜTÜNLÜĞÜ İÇİN OLUŞTURULMUŞTUR.
                    </p>
                </div>
            </article>

            <footer className="bg-slate-950 py-24 text-center">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center justify-center gap-4 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center shadow-lg">
                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                        </div>
                        <span className="text-3xl font-black italic tracking-tighter text-white uppercase">{siteName}</span>
                    </div>
                    <p className="text-white/20 text-xs font-black uppercase tracking-[0.4em]">© 2026 {siteName}. TÜM HAKLARI SAKLIDIR.</p>
                </div>
            </footer>
        </div>
    );
}
