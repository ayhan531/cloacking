const axios = require('axios');
const fs = require('fs');

// IndexNow Key Generation
const key = Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
const keyFileName = `${key}.txt`;

// Write Key File so Bing can verify
fs.writeFileSync(`./public/${keyFileName}`, key);

async function main() {
    console.log("🚀 STARTING INDEXNOW INSTANT SUBMISSION...");

    // Targeted Domains (FULL NETWORK)
    const domains = [
        'independent-news.org',
        'flovazcomercial.com',
        'haber-analiz2026.com',
        'vizyontekyazilim.com',
        'yasalbonus2026.com',
        'bonusverensiteler2026.com',
        '2026bonuslar.com',
        'bedavabonus2026.com'
    ];

    // Nuclear Slugs (Matching the seed script)
    const slugs = [
        'deneme-bonusu-veren-siteler-2026', 'yatirim-sartsiz-bonus-2026', 'en-guvenilir-altyapilar',
        '500-tl-deneme-bonusu-2026', 'payfix-mefete-bahis-2026', 'cevrimsiz-freebet-2026',
        'hosgeldin-bonusu-300-liste', 'freespin-veren-siteler-2026', 'bahis-sitesi-guvenlik-protokolleri',
        'mobil-odeme-aktif-operatorler', 'yeni-acilan-siteler-2026', 'vip-sadakat-bonuslari-2026',
        'en-iyi-canli-destek-siteleri', 'lisans-sorgulama-2026', 'subat-2026-bonus-gundemi',
        'global-audit-standards-2026', 'rng-algorithmic-fairness', 'aml-anti-fraud-2026',
        'cyber-resilience-2026', 'economic-impact-incentives', 'responsible-gaming-ethics',
        'gdpr-2026-compliance', 'blockchain-audit-integration', 'ai-user-behavior-analysis',
        'mobile-computing-igaming-2026', 'esg-criteria-digital-entertainment', 'defi-gaming-future',
        'global-compliance-matrix-2026', 'technical-audit-methodology', 'user-identity-web3',
        'economic-forecasting-digital-2026', 'risk-management-scaling', 'cloud-infrastructure-global-gaming',
        'ethical-ai-promotion', 'payment-orchestration-2026', 'regulatory-sandboxes-innovation',
        'biometric-verification-standard', 'global-media-oversight', 'digital-license-interoperability',
        'advanced-cryptography-wallets', 'sustainable-data-centers', 'legal-tech-automated-compliance',
        'consumer-protection-micro-transactions', 'social-responsibility-reports', 'cross-border-syndication',
        'digital-literacy-awareness', 'adaptive-learning-risk', 'regtech-boom-2026',
        'institutional-trust-journalism', 'semantic-reset-search-2026'
    ];

    for (const domain of domains) {
        console.log(`\n📡 Submitting to IndexNow for: ${domain}`);

        const urlList = [
            `https://${domain}/`,
            `https://${domain}/sitemap.xml`,
            ...slugs.map(s => `https://${domain}/${s}`)
        ];

        const payload = {
            host: domain,
            key: key,
            keyLocation: `https://${domain}/${keyFileName}`,
            urlList: urlList
        };

        try {
            // Bing Endpoint (also shares with Yandex)
            await axios.post('https://api.indexnow.org/indexnow', payload, {
                headers: { 'Content-Type': 'application/json' }
            });
            console.log(`✅ IndexNow Success: ${domain} - URLs pushed to Bing/Yandex.`);
        } catch (error) {
            console.error(`❌ IndexNow Failed: ${domain} - ${error.message}`);
        }
    }
}

main();
