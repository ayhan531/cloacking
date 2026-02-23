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

    return (
        <div className="min-h-screen bg-slate-50">
            <article className="max-w-4xl mx-auto py-20 px-6 font-sans">
                <header className="mb-12 text-center">
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Bize Ulaşın</h1>
                    <p className="text-lg text-slate-500 mt-4">Analiz talepleri ve kurumsal iş birlikleri için destek merkezimiz 7/24 hizmetinizdedir.</p>
                </header>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6 italic">{siteName} Destek</h2>
                        <ul className="space-y-6 text-slate-600">
                            <li>
                                <strong>E-Posta:</strong><br />
                                <span className="text-blue-600">support@{domain}</span>
                            </li>
                            <li>
                                <strong>Global Ofis:</strong><br />
                                <span>Digital Plaza No: 2026, San Jose, CA (Audit HQ)</span>
                            </li>
                            <li>
                                <strong>Sosyal Medya:</strong><br />
                                <span className="text-slate-400 italic">Resmi kanallarımız üzerinden anlık duyuruları takip edebilirsiniz.</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-blue-600 p-10 rounded-[40px] text-white">
                        <h2 className="text-2xl font-bold mb-6 italic">Hızlı Mesaj</h2>
                        <p className="mb-8 opacity-90 text-sm leading-relaxed">
                            Analiz edilen platformlar hakkında şikayet veya öneride bulunmak için lütfen "Güvenlik ID" kodunuzla birlikte mail atınız.
                        </p>
                        <div className="p-4 bg-white/10 rounded-2xl border border-white/20 text-xs font-mono">
                            MSG_PROTOCOL: SECURE_AUDIT_V3<br />
                            ENCRYPTION: ACTIVE<br />
                            SERVER: {domain.toUpperCase()}
                        </div>
                    </div>
                </div>

                <div className="mt-16 p-8 bg-white rounded-[40px] border border-slate-100 text-center">
                    <p className="text-sm text-slate-400 italic">
                        * Bu sayfa {siteName} Global News & Audit Synergy Network bünyesinde taranabilirlik ve kullanıcı erişim bütünlüğü için oluşturulmuştur.
                    </p>
                </div>
            </article>

            <footer className="bg-slate-900 py-12 text-center mt-20">
                <p className="text-slate-500">© 2026 {siteName}. Tüm hakları saklıdır.</p>
            </footer>
        </div>
    );
}
