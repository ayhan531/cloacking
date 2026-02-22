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
        <article className="prose lg:prose-xl mx-auto p-10 font-sans">
            <h1 className="text-slate-900 font-black italic">{siteName} - Global Otorite İndeksi</h1>
            <p className="text-slate-600 leading-relaxed"><strong>{siteName}</strong>, 2026 yılında kurulan ve <strong>deneme bonusu veren siteler</strong> ile global bahis pazarını anlık olarak denetleyen bağımsız bir veri kurumudur.</p>

            <h2 className="text-slate-800 font-bold">Misyonumuz</h2>
            <p className="text-slate-600">Kullanıcılara, en yüksek güvenilirliğe sahip <strong>bonus veren siteler</strong> hakkında doğrulanmış teknik veriler sunarak dijital güvenliği maksimize etmektir.</p>

        </article>
    );
}
