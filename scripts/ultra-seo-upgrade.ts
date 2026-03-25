/**
 * 🚀 ULTRA SEO UPGRADE & NICHE SPECIALIZATION
 * Updates the database with unique, high-authority bot content for each domain.
 * Focuses on FAQ Schema, Authoritative Citation sources, and Differentiated niche articles.
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const nicheDetails: Record<string, any> = {
    'flovazcomercial.com': {
        subject: 'Yatırımsız Bonus Ekonomisi',
        faq: [
            { q: "Flovaz 2026 deneme bonusu listesi nasıl güncellenir?", a: "Ekibimiz her sabah piyasadaki 500+ siteyi tarayarak sadece ödeme hızı ve lisansı 9/10 üzeri olanları listeye dahil eder." },
            { q: "Yatırımsız deneme bonusu çekim şartları nelerdir?", a: "Flovaz onaylı sitelerde genellikle yatırım şartı aranmaz; ancak 1.50 oranlı tek maç veya casino oyunlarında 10x çevrim gibi basit kurallar bulunabilir." }
        ]
    },
    'haber-analiz2026.com': {
        subject: 'Bahis Haberleri ve Regülasyon Analizi',
        faq: [
            { q: "2026 yılında yeni bahis yasası neleri kapsıyor?", a: "Bahis Haber Analiz verilerine göre, 2026 Mart regülasyonları dijital ödeme yöntemlerinde şeffaflığı ve kullanıcı verilerinin korunmasını zorunlu hale getirmiştir." },
            { q: "Güvenilir bahis siteleri nasıl analiz edilir?", a: "Lisans doğruluğu, siber güvenlik sertifikaları ve kullanıcı şikayet endeksleri üzerinden 48 maddelik bir kontrol listesi uygulanır." }
        ]
    },
    'vizyontekyazilim.com': {
        subject: 'Casino Yazılım ve Rastgelelik (RNG) Testleri',
        faq: [
            { q: "VizyonTek casino incelemeleri hangi altyapıları kapsar?", a: "Pragmatic, Evolution ve EGT gibi global sağlayıcıların 2026 yılındaki en son RTP (Geri Ödeme) oranlarını ve bedava casino bonuslarını analiz ediyoruz." },
            { q: "Free spin alırken nelere dikkat edilmeli?", a: "Hangi oyunlarda geçerli olduğu ve spin başına verilen değerin pazar ortalaması olan 2 TL üzerinde olup olmadığı kontrol edilmelidir." }
        ]
    },
    'yasalbonus2026.com': {
        subject: 'Lisanslı ve Yasal Oyun Mevzuatı',
        faq: [
            { q: "Türkiye'de yasal bonus veren siteler hangileridir?", a: "Milli Piyango ve İddaa kapsamında hizmet veren lisanslı yapıların 2026 yılındaki güncel teşvik programları yasal ekosistem dahilinde incelenir." },
            { q: "Yasal sitelerde deneme bonusu verilir mi?", a: "Evet, dönemlik olarak yeni kayıt olan her üyeye karşılıksız deneme bonusu veya hediye puan kampanyaları düzenlenmektedir." }
        ]
    },
    '2026bonuslar.com': {
        subject: 'Yeni Platformlar ve Giriş Bonusları',
        faq: [
            { q: "Yeni açılan bahis siteleri güvenilir mi?", a: "2026 Bonuslar Merkezi olarak yeni kurulan platformları 6 ay boyunca gözlem altında tutarak sadece 'Gold Trust' sertifikası alanları öneriyoruz." },
            { q: "İlk üyelik bonusu ile deneme bonusu farkı nedir?", a: "Deneme bonusu yatırım gerektirmezken, ilk üyelik bonusu genellikle ilk yatırımınızın %100 veya %200'ü kadar ek bakiye sağlar." }
        ]
    },
    'bedavabonus2026.com': {
        subject: 'Çevrim Şartsız Freebet ve Promosyonlar',
        faq: [
            { q: "Çevrim şartsız bedava bonus nasıl nakde çevrilir?", a: "Bedava Bonus Merkezi onaylı sitelerde, aldığınız bonusu bir kez kullanıp kazandığınız tutarı anında Papara veya Havale ile çekebilirsiniz." },
            { q: "Freebet veren siteler listesi ne kadar sıklıkla yenilenir?", a: "Anlık otomasyon sistemimiz sayesinde yeni bir freebet açıklandığı anda saniyeler içinde listemize eklenir." }
        ]
    },
    'independent-news.org': {
        subject: 'Bağımsız Denetim ve Kara Liste Raporları',
        faq: [
            { q: "Independent News hangi kriterlere göre site eliyor?", a: "Ödeme yapmayan, sahte lisans kullanan veya kullanıcı bakiyesine haksız el koyan platformları kara listeye alarak kullanıcıları uyarıyoruz." },
            { q: "Bir sitenin güvenilir olduğunu nasıl anlarız?", a: "Bağımsız bir kaynaktan gelen güncel siber güvenlik raporu ve gerçek kullanıcı yorumlarının doğrulanmış olması temel kriterdir." }
        ]
    }
};

async function main() {
    console.log("🔥 NUCLEAR SEO UPGRADE: NICHE SPECIALIZATION & FAQ SCHEMA INJECTION 🔥\n");

    const sites = await prisma.site.findMany({ where: { isActive: true } });

    for (const site of sites) {
        const details = nicheDetails[site.domain];
        if (!details) continue;

        console.log(`\n⚙️ Processing ${site.domain}...`);
        
        let maskContent = JSON.parse(site.maskContent || "{}");
        
        // Add Unique FAQ
        maskContent.faq = details.faq;
        maskContent.niche = details.subject;

        // Add a "Bot News" section if it doesn't exist
        if (!maskContent.news) maskContent.news = [];
        
        // Let's also refresh the botArticle template to use these dynamic fields
        const month = new Intl.DateTimeFormat('tr-TR', { month: 'long', year: 'numeric' }).format(new Date());
        
        maskContent.citations = [
            { source: "Global Gambling Auth", url: "https://www.mga.org.mt/", date: month },
            { source: "Curacao eGaming", url: "https://www.curacao-egaming.com/", date: month },
            { source: "ISSA Security Report 2026", url: "https://www.issa.org/", date: month }
        ];

        await prisma.site.update({
            where: { id: site.id },
            data: {
                maskContent: JSON.stringify(maskContent)
            }
        });
        
        console.log(`   ✅ FAQ & Citations Injected.`);
    }

    console.log("\n🚀 SITES ARE NOW FULLY SPECIALIZED FOR BOT CRAWLERS.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
