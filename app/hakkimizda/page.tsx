import { headers } from "next/headers";
import { getSiteByDomain } from "@/lib/site-service";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    const headersList = await headers();
    const host = headersList.get("host") || "";
    const domain = host.split(':')[0].replace('www.', '');
    const site = await getSiteByDomain(domain);

    return {
        title: `Hakkımızda - ${site?.name || 'Analiz'} Otorite Raporu`,
        description: `${site?.name} hakkında kurumsal bilgiler ve 2026 deneme bonusu analiz protokollü.`,
        alternates: {
            canonical: `https://${domain}/hakkimizda`,
        }
    };
}

export default async function AboutPage() {
    const headersList = await headers();
    const host = headersList.get("host") || "";
    const domain = host.split(':')[0].replace('www.', '');
    const site = await getSiteByDomain(domain);
    const siteName = site?.name || "Otorite Analiz";

    return (
        <div className="min-h-screen bg-white">
            <article className="max-w-4xl mx-auto py-20 px-6 font-sans">
                <header className="mb-12 border-b border-slate-100 pb-10">
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                        {siteName} <span className="text-blue-600">Global Otorite İndeksi</span>
                    </h1>
                    <p className="text-xl text-slate-500 mt-4 leading-relaxed">
                        Bağımsız Analiz, Denetim ve Dijital Güvenlik Standartları Merkezi (2026)
                    </p>
                </header>

                <div className="prose prose-lg prose-slate max-w-none">
                    <p>
                        <strong>{siteName}</strong>, 2026 yılında dijital eğlence ve iGaming sektöründeki şeffaflığı artırmak amacıyla kurulmuş, global ölçekte faaliyet gösteren bağımsız bir veri kurumudur. Temel amacımız, <strong>deneme bonusu veren siteler</strong> ve <strong>bonus veren siteler</strong> arasındaki teknik farkları, güvenlik altyapılarını ve finansal sürdürülebilirliği son kullanıcı adına denetlemektir.
                    </p>

                    <h2 className="text-slate-900 font-bold mt-12 mb-6">Analiz Metodolojimiz</h2>
                    <p>
                        Platformumuz, her incelemede 12 farklı kritik güvenlik katmanını ve 8 ana performans metriğini baz alır. Bunlar arasında:
                    </p>
                    <ul className="space-y-3">
                        <li><strong>SSL ve Veri Şifreleme:</strong> Kullanıcı verilerinin SHA-512 standartlarında korunması.</li>
                        <li><strong>Finansal Şeffaflık:</strong> Ödeme hızları ve likidite oranlarının anlık takibi.</li>
                        <li><strong>Lisans Doğrulama:</strong> MGA, Curaçao ve UKGC lisanslarının aktiflik kontrolü.</li>
                        <li><strong>Kullanıcı Hakları:</strong> Bonus çevrim şartlarının adil kullanımı ve şikayet çözüm süreçleri.</li>
                    </ul>

                    <h2 className="text-slate-900 font-bold mt-12 mb-6">Kurumsal Vizyon</h2>
                    <p>
                        Dijital dünyada güvenin en değerli para birimi olduğu inancıyla, {siteName} ekibi olarak 7/24 kesintisiz analiz akışı sağlıyoruz. Global Audit Consortium (GAC) üyesi olan kurumumuz, tüm raporlarını kamuoyuna şeffaf bir şekilde sunmaktadır.
                    </p>

                    <div className="mt-16 p-8 bg-blue-50 rounded-3xl border border-blue-100 items-center text-center">
                        <h3 className="text-blue-900 font-bold mb-4">Hızlı Erişim ve Veri Kaynakları</h3>
                        <div className="flex flex-wrap justify-center gap-6">
                            <a href="/" className="text-blue-700 font-bold hover:underline">Ana Sayfa Analizi</a>
                            <a href="/haberler" className="text-blue-700 font-bold hover:underline">Güncel Teknik Raporlar</a>
                            <a href="/deneme-bonusu" className="text-blue-700 font-bold hover:underline">Deneme Bonusu Rehberi</a>
                        </div>
                    </div>
                </div>
            </article>

            <footer className="bg-slate-50 py-10 mt-20 border-t border-slate-100 text-center text-slate-400 text-sm">
                &copy; 2026 {siteName} Global News & Audit Synergy Network • Tüm Hakları Saklıdır.
            </footer>
        </div>
    );
}
