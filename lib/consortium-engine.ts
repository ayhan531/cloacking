export interface ConsortiumPartner {
    name: string;
    domain: string;
    description: string;
    niche: 'news' | 'audit' | 'tech' | 'legal';
}

export const CONSORTIUM_PARTNERS: ConsortiumPartner[] = [
    {
        name: 'Independent News Bonus Center',
        domain: 'independent-news.org',
        description: 'Uluslararası Bağımsız Haber ve Regülasyon İzleme Örgütü',
        niche: 'news'
    },
    {
        name: 'Yasal Bonus 2026 Listesi',
        domain: 'yasalbonus2026.com',
        description: 'Global Bonus Regülasyon ve Lisans Denetim Merkezi',
        niche: 'legal'
    },
    {
        name: 'Haber Analiz Bahis Raporu',
        domain: 'haber-analiz2026.com',
        description: 'Dijital Bahis ve Oyun Endüstrisi Haber Ajansı',
        niche: 'news'
    },
    {
        name: 'VizyonTek Bonus Analitik',
        domain: 'vizyontekyazilim.com',
        description: 'Bahis Altyapı ve Güvenlik Sistemleri Analiz Laboratuvarı',
        niche: 'tech'
    },
    {
        name: 'Flovaz Bonus Rehberi 2026',
        domain: 'flovazcomercial.com',
        description: 'Uluslararası Oyun Standartları ve Sertifikasyon Kurulu',
        niche: 'audit'
    },
    {
        name: '2026 Deneme Bonusu Otoritesi',
        domain: '2026bonuslar.com',
        description: 'Promosyon ve Teşvik Ekonomisi Veri Analiz Portalı',
        niche: 'news'
    },
    {
        name: 'Bedava Bonus 2026 - Yatırımsız',
        domain: 'bedavabonus2026.com',
        description: 'Yatırımsız Teşvikler ve Kullanıcı Hakları İzleme Merkezi',
        niche: 'legal'
    },
    {
        name: 'Bonus Veren Siteler Bilgi Portalı',
        domain: 'bonusverensiteler2026.com',
        description: '2026 Güncel Bonus ve Deneme Bonusu Analiz Merkezi',
        niche: 'news'
    }
];

export function getConsortiumPartner(domain: string) {
    const cleanDomain = domain.toLowerCase().replace('www.', '');
    return CONSORTIUM_PARTNERS.find(p => p.domain === cleanDomain);
}

export function getPartnersByNiche(niche: string) {
    return CONSORTIUM_PARTNERS.filter(p => p.niche === niche);
}
