import fs from 'fs';
import path from 'path';

const SITES = [
    { name: 'Flovaz Komersial', url: 'https://flovazcomercial.com', kw: 'yatırımsız deneme bonusu 2026' },
    { name: 'Bedava Bonus 2026', url: 'https://bedavabonus2026.com', kw: 'bedava casino bonusu 2026' },
    { name: 'VizyonTek Bonus', url: 'https://vizyontekyazilim.com', kw: 'güvenilir bahis siteleri 2026' },
    { name: '2026 Bonuslar Merkezi', url: 'https://2026bonuslar.com', kw: 'casino deneme bonusu 2026' },
    { name: 'Yasal Bonus 2026', url: 'https://yasalbonus2026.com', kw: 'yasal bahis platformları 2026' },
    { name: 'Haber Analiz 2026', url: 'https://haber-analiz2026.com', kw: 'bahis haberleri 2026' },
    { name: 'Independent News', url: 'https://independent-news.org', kw: 'bağımsız casino inceleme 2026' }
];

const OUTPUT_DIR = path.join(process.cwd(), 'parasite-seo-articles');

if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function generateArticle(site: any): string {
    const date = new Date().toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' });
    const capitalizedKw = site.kw.split(' ').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

    const structures = [
        () => `# 💎 ${date} Raporu: ${capitalizedKw} Üzerine İncelemeler

Dijital oyun dünyasının hızla değiştiği 2026 yılında, **${site.kw}** konusu her zamankinden daha önemli. [${site.name}](${site.url}) olarak bu hafta en güvenli limanları analiz ettik.

## 🏁 Nereden Başlamalı?
Birçok oyuncu ${site.kw} ararken dolandırıcılara denk geliyor. [Buradaki güncel listemiz](${site.url}) bu riski sıfıra indiriyor.

### 🛡️ 2026 Standartları
Sektördeki bağımsız denetmenlerin belirlediği ana kriterler şunlardır:
1. **Lisans Güvencesi:** MGA veya UKGC onaylı olmalı.
2. **Ödeme Hızı:** 15 dakika kuralı işlemeli.

### 👉 [TÜM LİSTEYİ GÖRMEK İÇİN TIKLAYIN](${site.url}) 👈`,

        () => `# 🚀 2026'da ${capitalizedKw}: Kesin Kazanç Taktikleri

Eğer siz de **${site.kw}** arayışındaysanız, doğru yerdesiniz. Sektörün devi [${site.name}](${site.url}) tarafından hazırlanan bu rehber size ışık tutacak.

## 💡 Uzman Görüşü
2026 standartlarında ${site.kw} fırsatları sınırlıdır. En iyi oranları yakalamak için [${site.name}](${site.url}) portalını takipte kalın.

### 🎲 Nasıl Katlarsınız?
- **Düşük Volatilite:** Bakiyenizi korumak için Starburst gibi oyunları seçin.
- **Sabırlı Bahis:** Tek maça tüm bonusu basmayın.

🔗 **Resmi Kaynak:** [${site.name} Platformu](${site.url})`,

        () => `# 🔥 ${capitalizedKw} Analiz: ${date} Özel Dosyası

Sektörde taşlar yerinden oynuyor. **${site.kw}** piyasasında Mart 2026 itibarıyla yeni liyakat dönemine girdik. [${site.name}](${site.url}) verilerine göre büyüme devam ediyor.

## 📈 Veriler Ne Diyor?
Kullanıcılar ${site.kw} seçerken hıza bakıyor. [Bu platform](${site.url}) hızıyla fark yaratıyor. 

### 🛡️ Güvenlik Notu
Bu içerik [${site.name}](${site.url}) uzmanları tarafından hazırlanmıştır. Kayıt olmadan önce lisans kontrolü yapmayı unutmayın.

*Tarih: ${date}*`
    ];

    const randomStructure = structures[Math.floor(Math.random() * structures.length)]();
    return randomStructure;
}

async function main() {
    console.log('\n╔══════════════════════════════════════════════════════════');
    console.log('║  🦠 PARASITE SEO ARTICLE GENERATOR');
    console.log('║  Medium, LinkedIn ve Quora için özel makaleler üretiliyor...');
    console.log('╚══════════════════════════════════════════════════════════\n');

    for (const site of SITES) {
        const content = generateArticle(site);
        const fileName = `${site.kw.replace(/ /g, '-')}.md`;
        const filePath = path.join(OUTPUT_DIR, fileName);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Üretildi: ${fileName}`);
    }

    console.log('\n🏁 Tüm makaleler hazır!');
}

main();
