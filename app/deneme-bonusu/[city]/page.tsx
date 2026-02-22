import { getSiteByDomain } from "@/lib/site-service";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
    const { city } = await params;
    const headersList = await headers();
    const host = headersList.get("host") || "";
    const domain = host.split(':')[0].replace('www.', '');
    const site = await getSiteByDomain(domain);
    const formattedCity = city.charAt(0).toUpperCase() + city.slice(1);

    return {
        title: `${formattedCity} Deneme Bonusu Veren Siteler 2026 - ${site?.name || 'Analiz'}`,
        description: `${formattedCity} lokasyonuna özel en yüksek 2026 deneme bonusu veren güvenilir bahis siteleri listesi.`,
        alternates: {
            canonical: `https://${domain}/deneme-bonusu/${city}`,
        }
    };
}

export default async function CityBonusPage({ params }: { params: Promise<{ city: string }> }) {
    const { city: rawCity } = await params;
    const headersList = await headers();
    const host = headersList.get("host") || "";
    const domain = host.split(':')[0].replace('www.', '');
    const site = await getSiteByDomain(domain);

    if (!site) notFound();

    const city = rawCity.charAt(0).toUpperCase() + rawCity.slice(1);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
            <div className="max-w-5xl mx-auto px-6 py-20">
                <div className="mb-8">
                    <span className="text-sm font-bold text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full">{city} Güncel Analizi</span>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                    {city} Deneme Bonusu Veren Siteler (2026 Listesi)
                </h1>

                <div className="prose prose-lg prose-slate max-w-none">
                    <p className="text-xl text-slate-600 leading-relaxed mb-12">
                        {city} bölgesindeki kullanıcılar için özel olarak hazırlanan bu rapor, <strong>deneme bonusu veren siteler</strong> ve <strong>bonus veren siteler</strong> arasındaki öne çıkan platformları analiz eder. Ekibimiz {city} lokasyonunda sorunsuz hizmet veren markaları sizin için derledi.
                    </p>

                    <section className="bg-white border border-slate-100 shadow-sm rounded-3xl p-10 mb-12">
                        <h2 className="text-2xl font-bold text-slate-800 mb-6">{city} Bölgesi İçin Değerlendirme Kriterleri</h2>
                        <p className="text-slate-600 leading-relaxed">
                            {city} genelinde platform arayan kullanıcılar için hazırlanan bu kılavuzda; yatırım işlemlerinin hızı, bonus çevrim şartlarının şeffaflığı ve canlı destek kalitesi gibi metrikler detaylıca incelenmektedir.
                        </p>
                    </section>

                    <div className="p-8 bg-blue-50 border-l-4 border-blue-500 rounded-r-2xl">
                        <h3 className="text-xl font-bold mb-3 text-slate-800">{city} Kullanıcılarına Özel Fırsatlar</h3>
                        <p className="text-slate-600 text-base">
                            Sektördeki rekabetle birlikte {city} kullanıcılarına sunulan avantajlar giderek artmaktadır. Yeni listemizdeki platformları inceleyerek size en uygun seçeneği değerlendirebilirsiniz.
                        </p>
                    </div>

                    <div className="mt-16 pt-8 border-t border-slate-200 text-center text-sm text-slate-500">
                        {site.name} • {city} Lokasyon Rehberi
                    </div>
                </div>
            </div>
        </div>
    );
}
