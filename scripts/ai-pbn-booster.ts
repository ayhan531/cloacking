import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Target keywords for anchor texts (Çok güçlü SEO hedefleri)
const keywords = [
    "Deneme Bonusu Veren Siteler 2026",
    "Güvenilir Bahis Platformları",
    "Yatırımsız Bonus Listesi",
    "En İyi Casino Siteleri",
    "Kayıp Bonusu Fırsatları",
    "Canlı Bahis 2026",
    "Yeni Açılan Bahis Siteleri",
    "Çevrim Şartsız Bonus",
    "Mobil Ödeme Kabul Eden Siteler",
    "Lisanslı Casino Şirketleri"
];

const recommendTitles = [
    "Editörün Seçimleri",
    "İlginizi Çekebilecek İncelemeler",
    "Sektörden Öne Çıkanlar",
    "En Çok Okunan Analizler",
    "2026'nın Parlayan Platformları"
];

function getRandomItems(arr: string[], count: number) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// Generate organic-looking HTML blocks for PBN (Örümcek Ağı - Link Wheel)
function generateOrganicPbnHtml(targetDomains: string[], currentDomain: string) {
    const otherDomains = targetDomains.filter(d => d !== currentDomain);

    // Yalnızca 3-4 domaine link vererek %100 doğal görünmesini sağlıyoruz (Hepsine aynı sayfada link vermek spam sinyalidir)
    const selectedTargets = getRandomItems(otherDomains, 3 + Math.floor(Math.random() * 2));
    const blockTitle = recommendTitles[Math.floor(Math.random() * recommendTitles.length)];

    let pbnHtml = `
        <div style="margin-top: 3rem; padding: 2rem; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 0.75rem;">
            <h3 style="font-size: 1.25rem; font-weight: 700; color: #1e293b; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem;">
                <span style="display: block; width: 4px; height: 1.5rem; background-color: #3b82f6; border-radius: 2px;"></span>
                ${blockTitle}
            </h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
    `;

    selectedTargets.forEach(target => {
        const keyword = keywords[Math.floor(Math.random() * keywords.length)];

        // Profesyonel ve gerçekçi "Önerilen Haber" kartı tasarımı
        pbnHtml += `
            <a href="https://${target}" title="${keyword}" style="display: block; padding: 1.25rem; background-color: white; border: 1px solid #e2e8f0; border-radius: 0.5rem; text-decoration: none; transition: box-shadow 0.2s, border-color 0.2s;" onmouseover="this.style.borderColor='#cbd5e1'; this.style.boxShadow='0 4px 6px -1px rgba(0, 0, 0, 0.05)';" onmouseout="this.style.borderColor='#e2e8f0'; this.style.boxShadow='none';">
                 <div style="font-size: 0.75rem; font-weight: 700; color: #3b82f6; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem;">Özel İnceleme</div>
                 <div style="font-size: 1rem; font-weight: 600; color: #334155; line-height: 1.4;">${keyword} Kapsamı ve ${target} Detayları</div>
                 <div style="margin-top: 0.75rem; font-size: 0.875rem; color: #64748b; display: flex; align-items: center; justify-content: space-between;">
                     <span>Detayları Gör</span>
                     <svg xmlns="http://www.w3.org/20Google.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                 </div>
            </a>
        `;
    });

    pbnHtml += `
            </div>
            <div style="margin-top: 1.5rem; font-size: 0.75rem; color: #94a3b8; text-align: center;">
                Sponsorlu / İş Ortağı Bağlantıları
            </div>
        </div>
    `;

    return pbnHtml;
}

async function main() {
    console.log("🔥 Başlıyor: NEXT-GEN AI PBN BOOST (White-Hat Organic Link Wheel) 🔥\n");

    const sites = await prisma.site.findMany({
        where: { isActive: true }
    });

    const allDomains = sites.map(s => s.domain);

    for (const site of sites) {
        console.log(`\n⚙️ İşleniyor: ${site.domain}`);

        try {
            const currentMask = JSON.parse(site.maskContent || "{}");

            // Generate the advanced internal linking block
            const seoPbnBlock = generateOrganicPbnHtml(allDomains, site.domain);

            // Eğer sitenin zaten news (haber) array'i varsa, her haberin (ve genel makale alanının)
            // en altına bu blokları "Önerilen Analizler" olarak çakıyoruz.

            // 1. maskContent içine genel ve her yerde kullanılabilir "pbnFooter"ı yerleştiriyoruz.
            currentMask.pbnFooter = seoPbnBlock;

            // Eğer haberleri (sayfaları) varsa, sayfa içeriklerinin de sonuna rastgele farklı network linkleri ekliyoruz
            if (currentMask.news && Array.isArray(currentMask.news)) {
                currentMask.news = currentMask.news.map((newsItem: any) => {
                    // Eski PBN bloklarını (varsa) temizle (örümcek ağı şüphe çekmesin)
                    let cleanContent = newsItem.content.replace(/<div class="pbn-authority-signal-2026"[\s\S]*?<\/div>\s*<\/div>/g, "")
                        .replace(/<div style="margin-top: 3rem; padding: 2rem; background-color: #f8fafc;[\s\S]*?<\/div>\s*<\/div>/gi, ""); // Kendimi de silip yeniliyorum

                    // Sayfanın içeriğine BİRBİRİNDEN FARKLI rastgele 3 hedefli organik PBN bloğunu yapıştır
                    const uniquePbnForArticle = generateOrganicPbnHtml(allDomains, site.domain);
                    newsItem.content = cleanContent + uniquePbnForArticle;
                    return newsItem;
                });
            }

            await prisma.site.update({
                where: { id: site.id },
                data: {
                    maskContent: JSON.stringify(currentMask)
                }
            });

            console.log(`✅ ${site.domain}: Bütün haberlere ve site temeline ORGANİK PBN EKLENDİ.`);

        } catch (e: any) {
            console.error(`❌ Hata (${site.domain}):`, e.message);
        }
    }

    console.log("\n🚀 TÜM SİTELER BİRBİRİNE HİBRİT İÇERİK KARTLARIYLA (Tier2 Otorite) BAĞLANDI! 🚀");
}

main().catch(console.error).finally(() => prisma.$disconnect());
