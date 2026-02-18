import { getSiteByDomain } from "@/lib/site-service";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

export default async function CityBonusPage({ params }: { params: { city: string } }) {
    const headersList = await headers();
    const host = headersList.get("host") || "";
    const domain = host.split(':')[0].replace('www.', '');
    const site = await getSiteByDomain(domain);

    if (!site) notFound();

    const city = params.city.charAt(0).toUpperCase() + params.city.slice(1);

    // 🔱 COMPETITOR KILL: SEMANTIC DENSITY PER CITY
    return (
        <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-emerald-500 selection:text-black">
            <div className="max-w-6xl mx-auto px-6 py-20">
                <div className="inline-block px-4 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20 mb-8">
                    <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.4em]">Yerel Analiz Raporu v2026</span>
                </div>

                <h1 className="text-5xl font-black mb-8 leading-tight italic uppercase">
                    {city} <span className="text-emerald-500">Deneme Bonusu</span> Veren Siteler 2026 Listesi
                </h1>

                <div className="prose prose-invert prose-lg max-w-none">
                    <p className="text-xl text-slate-400 leading-relaxed mb-12">
                        {city} bölgesindeki kullanıcılar için özel olarak hazırlanan bu teknik rapor, <strong>deneme bonusu veren siteler</strong> ve <strong>bonus veren siteler</strong> arasındaki en güvenilir markaları analiz eder. 2026 yılı itibarıyla {city} lokasyonlu bağlantılarda hız ve güven metrikleri en üst düzeyde olan platformlar aşağıda listelenmiştir.
                    </p>

                    <section className="bg-white/5 border border-white/10 rounded-[40px] p-12 mb-16">
                        <h2 className="text-3xl font-black text-emerald-400 mb-6 uppercase italic">{city} Yerel Operasyonel Güvenlik Analizi</h2>
                        <p className="text-slate-300 leading-loose">
                            {city} genelinde dijital oyun tecrübesi arayan bireyler için hazırlanan bu kılavuz, <strong>yatırımsız deneme bonusu</strong> alırken dikkat edilmesi gereken yasal süreçleri kapsar. Küresel regülasyonlar uyarınca, {city} veritabanımızdaki siteler 7/24 denetime tabidir.
                        </p>
                    </section>

                    <div className="grid gap-8">
                        {/* High-Authority Semantic Content Blocks */}
                        <div className="p-10 bg-black/40 border-l-4 border-emerald-500 rounded-r-3xl">
                            <h3 className="text-xl font-bold mb-4">{city} İçin %100 Uyumlu Bonuslar</h3>
                            <p className="text-slate-400">
                                Sektörün devleşen markaları, {city} kullanıcılarına özel <strong>500 TL deneme bonusu</strong> ve çevrimsiz fırsatlar sunmaktadır. Bu teşvikler, {city} dijital ekonomisinin ayrılmaz bir parçası haline gelmiştir.
                            </p>
                        </div>
                    </div>

                    <div className="mt-20 pt-10 border-t border-white/10 text-center opacity-30 text-[10px] tracking-widest uppercase">
                        {city} Regional Security & Analytics Hub - Powered by {site.name}
                    </div>
                </div>
            </div>
        </div>
    );
}
