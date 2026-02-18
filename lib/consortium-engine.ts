export interface ConsortiumPartner {
    name: string;
    domain: string;
    description: string;
    niche: 'news' | 'audit' | 'tech' | 'legal';
}

export const CONSORTIUM_PARTNERS: ConsortiumPartner[] = [
    {
        name: 'INDEPENDENT NEWS',
        domain: 'independent-news.org',
        description: 'Uluslararası Bağımsız Haber ve Regülasyon İzleme Örgütü',
        niche: 'news'
    },
    {
        name: 'YASAL BONUS 2026',
        domain: 'yasalbonus2026.com',
        description: 'Global Bonus Regülasyon ve Lisans Denetim Merkezi',
        niche: 'legal'
    },
    {
        name: 'HABER ANALİZ 2026',
        domain: 'haber-analiz2026.com',
        description: 'Dijital Bahis ve Oyun Endüstrisi Haber Ajansı',
        niche: 'news'
    },
    {
        name: 'VİZYON TEK YAZILIM',
        domain: 'vizyontekyazilim.com',
        description: 'Bahis Altyapı ve Güvenlik Sistemleri Analiz Laboratuvarı',
        niche: 'tech'
    },
    {
        name: 'FLOVAZ COMERCIAL',
        domain: 'flovazcomercial.com',
        description: 'Uluslararası Oyun Standartları ve Sertifikasyon Kurulu',
        niche: 'audit'
    },
    {
        name: '2026 BONUSLAR',
        domain: '2026bonuslar.com',
        description: 'Promosyon ve Teşvik Ekonomisi Veri Analiz Portalı',
        niche: 'news'
    },
    {
        name: 'BEDAVA BONUS 2026',
        domain: 'bedavabonus2026.com',
        description: 'Yatırımsız Teşvikler ve Kullanıcı Hakları İzleme Merkezi',
        niche: 'legal'
    }
];

export function getConsortiumPartner(domain: string) {
    const cleanDomain = domain.toLowerCase().replace('www.', '');
    return CONSORTIUM_PARTNERS.find(p => p.domain === cleanDomain);
}

export function getPartnersByNiche(niche: string) {
    return CONSORTIUM_PARTNERS.filter(p => p.niche === niche);
}
