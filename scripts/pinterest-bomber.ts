import fs from 'fs';
import path from 'path';

const DOMAIN = 'https://flovazcomercial.com';
const SECONDARY_DOMAIN = 'https://bedavabonus2026.com';
const OUTPUT_DIR = path.join(process.cwd(), 'social-bomber-output');

if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function generatePinterestData() {
    console.log('📌 Pinterest (Görsel SEO) veri havuzu oluşturuluyor...');

    let pinterestHtml = '<h1>📌 Pinterest SEO ve Otomasyon Verileri</h1>';
    pinterestHtml += '<p>Pinterest, Google Görseller aramasını domine eder. Herhangi bir gazete/haber/para görselini Pin olarak eklerken bu verileri kullanın.</p>';

    const keywords = [
        "Yatırımsız Deneme Bonusu 2026",
        "Bedava Casino Bonusu",
        "Çevrimsiz Freebet 2026",
        "Güvenilir Bahis Siteleri",
        "Yeni Açılan Casino Siteleri"
    ];

    let csvContent = 'Pin_Title,Pin_Description,Link\n';

    keywords.forEach((kw, index) => {
        const link = index % 2 === 0 ? DOMAIN : SECONDARY_DOMAIN;
        // SEO Description for the pin
        const desc = `🔥 2026 Yılı güncel ${kw} arayanlar için muazzam liste. Paranızı riske atmadan gerçek kazanç sağlamak, güvenilir ve lisanslı sitelere ulaşmak için sitemizi ziyaret edin. Hemen tıkla, 500 TL deneme bonusunu kap. #denemebonusu #${kw.replace(/ /g, '').toLowerCase()} #casino #slot #freespin`;

        pinterestHtml += `
        <div style="border: 1px solid #e60023; padding: 15px; margin-bottom: 20px; border-radius: 8px;">
            <h3 style="color: #e60023;">Pinterest Pin Şablonu ${index + 1}</h3>
            <p><strong>Başlık (Title):</strong> ${kw} Veren Siteler (KANITLI LİSTE)</p>
            <p><strong>Açıklama (Description):</strong> ${desc}</p>
            <p><strong>Bağlantı Ekle (Destination Link):</strong> <a href="${link}">${link}</a></p>
        </div>`;

        csvContent += `"${kw} Veren Siteler (KANITLI LİSTE)","${desc.replace(/"/g, '""')}","${link}"\n`;
    });

    fs.writeFileSync(path.join(OUTPUT_DIR, 'pinterest-data.html'), pinterestHtml, 'utf8');
    fs.writeFileSync(path.join(OUTPUT_DIR, 'pinterest-pins.csv'), csvContent, 'utf8');
}

generatePinterestData();

console.log('✅ Pinterest şablonları social-bomber-output klasörüne eklendi.');
