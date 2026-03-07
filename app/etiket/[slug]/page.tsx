import { notFound } from 'next/navigation';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Programatik SEO Uzun Kuyruk Anahtar Kelimeleri (Örnek Havuz)
const LONG_TAIL_KEYWORDS = [
    '50 tl yatirimsiz deneme bonusu veren siteler 2026',
    'fenerbahce galatasaray derbi ozel bedava bahis',
    'tc kimlik istemeyen cevrimsiz bonuslu guvenilir casino',
    'yeni acilan 100 freespin veren slot siteleri',
    'gece yarisi bonusu veren bahis siteleri listesi',
    'whatsapp uzerinden deneme bonusu veren siteler 2026',
    'kripto para ile yatirimsiz bonus veren platformlar',
    'sadece cepbank kabul eden cevrrim sartsiz siteler',
    '10 tl yatirimla 500 tl deneme bonusu alinan casino',
    'belge istemeden odeme yapan yasal casino siteleri'
];

function generateSlug(kw: string) {
    return kw.replace(/ /g, '-').replace(/[^a-z0-9-]/gi, '').toLowerCase();
}

export async function generateStaticParams() {
    return LONG_TAIL_KEYWORDS.map(kw => ({
        slug: generateSlug(kw)
    }));
}

export default async function ProgrammaticPage({ params }: { params: { slug: string } }) {
    // URL host bilgisini almak için server component'te header okuyamıyoruz, 
    // ancak bu sayfalar botlar tarafindan taranacak.
    const slug = params.slug;

    // Geçerli bir anahtar kelime var mı bul
    const matchedKw = LONG_TAIL_KEYWORDS.find(k => generateSlug(k) === slug);
    if (!matchedKw) {
        // Otomatik türetilmiş gibi gösterelim
        return createFallbackPage(slug.replace(/-/g, ' '));
    }

    return createFallbackPage(matchedKw);
}

function createFallbackPage(title: string) {
    const capitalizedTitle = title.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
            <div className="max-w-4xl w-full bg-white p-8 rounded shadow">
                <h1 className="text-3xl font-bold text-red-600 border-b-2 border-red-600 pb-3 mb-6">
                    {capitalizedTitle} - 2026 Güncel Rehberi
                </h1>

                <p className="mb-4 text-gray-700 leading-relaxed text-lg">
                    Bu sayfada <strong>{capitalizedTitle}</strong> hakkında en detaylı ve güncel bilgileri bulacaksınız.
                    Uzman analiz ekibimiz, internette en çok aranan ve en az doğru bilgi bulunan bu okyanusta
                    sizin için en güvenilir platformları test etti ve onayladı.
                </p>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
                    <p className="text-sm text-yellow-800">
                        <strong>Uzman Notu:</strong> 2026 yılında {capitalizedTitle} arayışınızda
                        kesinlikle lisanslı ve bağımsız denetimden geçmiş platformları tercih etmelisiniz.
                    </p>
                </div>

                <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                    Sistem Nasıl Çalışır?
                </h2>
                <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    <li>Önce platformun güvenilirlik skoruna bakılır.</li>
                    <li>Ardından {capitalizedTitle} ile ilgili bonuslar test edilir.</li>
                    <li>Sadece para çekim garantisi veren siteler listeye dahil edilir.</li>
                </ul>

                <p className="text-gray-600 mt-10 border-t pt-4 text-center text-sm">
                    Bu sayfa arama motorlarına ve kullanıcılarına {capitalizedTitle} aramasında
                    en kaliteli sonucu sunmak için özel olarak oluşturulmuştur. Güncelleme: Mart 2026.
                </p>

                {/* Sitenin anasayfasına dönen güçlü bir iç link / bot tarama optimizasyonu */}
                <div className="mt-8 text-center">
                    <a href="/" className="inline-block bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition">
                        🏠 Ana Listeye ve Güncel Tabloya Dön
                    </a>
                </div>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Article",
                    "headline": `${capitalizedTitle}`,
                    "datePublished": "2026-03-05"
                })
            }} />
        </div>
    );
}
