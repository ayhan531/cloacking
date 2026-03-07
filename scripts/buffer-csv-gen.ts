import fs from 'fs';
import path from 'path';

const DOMAIN = 'https://flovazcomercial.com';
const SECONDARY_DOMAIN = 'https://bedavabonus2026.com';
const OUTPUT_DIR = path.join(process.cwd(), 'social-bomber-output');

const KEYWORDS = [
    "yatırımsız deneme bonusu", "bedava casino bonusu", "çevrimsiz freebet",
    "güvenilir bahis siteleri", "yeni açılan casino", "deneme bonusu 2026"
];

function generateTweetCsv() {
    let csvContent = 'text,scheduled_at\n'; // Buffer Bulk Upload format

    const now = new Date();

    for (let i = 0; i < 50; i++) {
        const kw = KEYWORDS[Math.floor(Math.random() * KEYWORDS.length)];
        const isFlovaz = Math.random() > 0.5;
        const link = isFlovaz ? DOMAIN : SECONDARY_DOMAIN;

        const templates = [
            `🚨 2026 Güncel: Sadece yeni üyelere özel ${kw} veren platformlar listelendi! Hemen incele ve kap: ${link} #denemebonusu #${kw.replace(/ /g, '')} #casino`,
            `🔥 Cebinden tek kuruş çıkmadan kazan! En güvenilir ${kw} fırsatları burada güncellendi: ${link} #bahis #canlıcasino #freebet`,
            `✅ V-Audit onaylı, lisanslı ve ödeme yapan siteler. ${kw} arayanlar için dev liste yayında: ${link} #kaçakbahis #iddaa #bonus`,
            `💰 ${kw} ile bugün şansını dene. Sadece onaylı platformlar, sıfır risk: ${link} #slot #rulet #sweetbonanza`
        ];

        const tweet = templates[Math.floor(Math.random() * templates.length)];

        // Schedule every 2 hours
        const scheduledTime = new Date(now.getTime() + (i + 1) * 2 * 60 * 60 * 1000);
        const timeStr = scheduledTime.toISOString().replace('T', ' ').substring(0, 16);

        csvContent += `"${tweet.replace(/"/g, '""')}",${timeStr}\n`;
    }

    fs.writeFileSync(path.join(OUTPUT_DIR, 'buffer-bulk-upload.csv'), csvContent, 'utf8');
    console.log(`✅ Buffer Bulk Upload CSV dosyası oluşturuldu: ${path.join(OUTPUT_DIR, 'buffer-bulk-upload.csv')}`);
}

generateTweetCsv();
