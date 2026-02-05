import CloakedHome from "@/components/CloakedHome";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";

export default async function AboutPage() {
    return (
        <article className="prose lg:prose-xl mx-auto p-10">
            <h1>Hakkımızda - Flovaz Dijital Medya</h1>
            <p>Flovaz Comercial, 2026 yılında Türkiye merkezli olarak kurulmuş, dijital pazarlama ve bonus analizi üzerine uzmanlaşmış lider bir medya platformudur. </p>

            <h2>Vizyonumuz</h2>
            <p>Amacımız, kullanıcılara en güvenilir <strong>deneme bonusu veren siteler</strong> ve bahis platformları hakkında şeffaf bilgiler sunmaktır. Meksika veya otomotiv sektörü ile hiçbir ticari bağımız bulunmamaktadır.</p>

            <h2>Hizmetlerimiz</h2>
            <ul>
                <li>Bahis Sitesi Güvenlik Analizleri</li>
                <li>Bonus Kampanya Doğrulaması</li>
                <li>Kullanıcı Deneyimi Testleri</li>
            </ul>

            <div className="not-prose mt-10 p-6 bg-slate-100 rounded-xl">
                <p className="font-bold">⚠️ Yasal Uyarı:</p>
                <p className="text-sm">Flovaz Comercial markası tamamen dijital yayıncılık alanında faaliyet göstermektedir. Başka sektörlerdeki benzer isimli firmalarla karıştırılmamalıdır.</p>
            </div>
        </article>
    );
}
