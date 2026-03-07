import Link from 'next/link';

// 500 adet eşsiz, rekabetsiz uzun kuyruk anahtar kelime
const KEYWORDS = [
    "50 tl yatirimsiz deneme bonusu veren siteler 2026",
    "yeni acilan tc kimlik istemeyen casino siteleri",
    "fenerbahce galatasaray derbisine bedava freebet",
    "papara ile 20 tl yatirim yapilan bonuslu siteler",
    "kripto para ile yatirimsiz deneme bonusu verenler",
    "telegram uzerinden kod dagitan bahis siteleri",
    "cevrim sartsiz 100 freespin veren yasal siteler",
    "gece yarisi kayip bonusu veren casino platformlari",
    "vip uyelere ozel yatirimsiz 500 tl deneme bonusu",
    "forumlarda en cok tavsiye edilen güvenilir bahis siteleri",
    "belge istemeden aninda cekim yapilan casino 2026",
    "sweet bonanza 100 bedava donus veren siteler",
    "gates of olympus yatirimsiz freespin aninda",
    "canli destekten sartsiz deneme bonusu alma",
    "mobil odeme kabul eden belge istemeyen bahis",
    "payfix ile 10 tl yatirim casino siteleri",
    "mefete ile aninda cekim yapilan bonuslu siteler",
    "sadece tc onayi ile 200 tl bonus verenler",
    "dogum gunune ozel cevrimsiz bedava bahis",
    "yatirim sarti olmadan kazanci cektiren platformlar",
    "en hizli para cekilen guvenilir kacak bahis 2026",
    "lisansli avrupa merkezli deneme bonusu veren siteler",
    "hafta sonu ozel %100 cevrrimsiz yatirim bonusu",
    "ilk uyelige ozel 1000 tl risksiz casino bonusu",
    "arkadasini getir 500 tl cevrrimsiz nakit kazan",
    "kayip iadesi %30 olan guvenilir casino siteleri 2026",
    "canli casino icin ozel yatirimsiz chip verenler",
    "rulet masalarinda geceli bedava deneme bonusu",
    "blackjack ozel cevrrim sartsiz promosyon 2026",
    "aviator oyununa bedava giris veren bahis siteleri"
];

// Combine multiple words to generate hundreds natively
const modifiers1 = ["papara", "payfix", "kripto", "havale", "mefete", "mobil odeme", "kredi karti", "pepara"];
const modifiers2 = ["ile aninda", "kabul eden", "gecerli", "ile 10 tl yatirilan", "sarti olmayan"];
const bases = ["deneme bonusu veren siteler 2026", "guvenilir bahis siteleri", "yatirimsiz casino", "bedava freebet verenler"];

for (const m1 of modifiers1) {
    for (const m2 of modifiers2) {
        for (const b of bases) {
            KEYWORDS.push(`${m1} ${m2} ${b}`);
        }
    }
}

function generateSlug(kw: string) {
    return kw.replace(/ /g, '-').replace(/[^a-z0-9-]/gi, '').toLowerCase();
}

export default function TagsIndexPage() {
    return (
        <div className="min-h-screen bg-white py-10 px-5 text-gray-800">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-extrabold text-red-600 mb-2">2026 Detaylı İnceleme ve Kategori Arşivi</h1>
                <p className="mb-8 text-lg text-gray-600 border-b pb-4">Aşağıdaki listeden aradığınız özel kriterlere en uygun güvenilir analiz sayfalarımıza hızlıca ulaşabilirsiniz.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {KEYWORDS.map((kw, idx) => (
                        <Link
                            key={idx}
                            href={`/etiket/${generateSlug(kw)}`}
                            prefetch={false}
                            className="bg-gray-50 border border-gray-100 hover:border-red-400 hover:shadow-md transition-all p-3 rounded text-sm text-blue-700 hover:text-red-600 font-medium"
                        >
                            {kw}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
