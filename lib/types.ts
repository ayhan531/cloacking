export type MaskType = 'insurance' | 'corporate' | 'ecommerce' | 'blog' | 'custom';

export interface SiteConfig {
    id: string;
    name: string;
    domain: string;
    maskType: MaskType;
    maskContent: MaskContent;
    bettingContent: BettingContent;
    cloakingRules: CloakingRules;
    seoSettings: SEOSettings;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    analytics?: SiteAnalytics;
}

export interface MaskContent {
    siteName: string;
    logo?: string;
    heroTitle: string;
    heroSubtitle: string;
    heroLink?: string;
    heroLinkText?: string;
    heroImage?: string;
    features: Feature[];
    services: Service[];
    testimonials: Testimonial[];
    contactInfo: ContactInfo;
    customSections?: CustomSection[];
    colorScheme: ColorScheme;
    news?: NewsItem[];
    botArticle?: string;
}

export interface NewsItem {
    id: string;
    title: string;
    slug: string;
    summary: string;
    content: string;
    image?: string;
    date: string;
    author?: string;
    tags?: string[];
}

export interface Feature {
    id: string;
    icon: string;
    title: string;
    description: string;
}

export interface Service {
    id: string;
    name: string;
    description: string;
    image?: string;
    price?: string;
}

export interface Testimonial {
    id: string;
    name: string;
    role: string;
    content: string;
    avatar?: string;
    rating: number;
}

export interface ContactInfo {
    email: string;
    phone: string;
    address: string;
    socialMedia: {
        facebook?: string;
        twitter?: string;
        instagram?: string;
        linkedin?: string;
    };
}

export interface CustomSection {
    id: string;
    title: string;
    content: string;
    type: 'text' | 'image' | 'video' | 'gallery';
    order: number;
}

export interface ColorScheme {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
}

export interface BettingContent {
    theme: {
        primaryColor: string;
        secondaryColor: string;
        backgroundColor: string;
    };
    topBanner?: AdBanner;
    bottomBanner?: AdBanner;
    brandCarousel: BrandSlide[];
    bonuses: Bonus[];
    giveaways: Giveaway[];
    liveWinners: LiveWinner[];
    games: GameItem[];
    navigation: NavItem[];
    wheelItems: WheelBonus[];
    popups: Popup[];
    popupLayout?: 'single' | 'grid' | 'full';
    mobileImmediatePopup?: boolean;
    heroSlides: HeroSlide[];
    trendSites: BrandSlide[];
}

export interface AdBanner {
    id: string;
    title: string;
    subtitle?: string;
    buttonText?: string;
    link: string;
    isActive: boolean;
}

export interface BrandSlide {
    id: string;
    name: string;
    logo: string;
    link: string;
}

export interface Bonus {
    id: string;
    title: string;
    description: string;
    amount: string;
    badge?: string;
    link: string;
    image?: string;
    order: number;
    isActive: boolean;
}

export interface Giveaway {
    id: string;
    brandName: string;
    brandLogo: string;
    prize: string;
    participantCount: number;
    totalSlots: number;
    endTime: string;
    link: string;
    isActive: boolean;
}

export interface LiveWinner {
    id: string;
    username: string;
    amount: string;
    game: string;
    brandName: string;
    brandLogo: string;
    timeAgo: string;
}

export interface GameItem {
    id: string;
    name: string;
    image: string;
    isHot: boolean;
    category: string;
}

export interface NavItem {
    id: string;
    label: string;
    icon: string;
    link: string;
    isActive: boolean;
}

export interface WheelBonus {
    id: string;
    label: string;
    color: string;
}

export interface Popup {
    id: string;
    title: string;
    content: string;
    image?: string;
    video?: string;
    type: 'image' | 'video';
    ctaText: string;
    ctaLink: string;
    showDelay: number;
    isActive: boolean;
}

export interface HeroSlide {
    id: string;
    title: string;
    subtitle: string;
    image?: string;
    video?: string;
    type: 'image' | 'video';
    ctaText: string;
    ctaLink: string;
    order: number;
}

export interface CloakingRules {
    showMaskTo: {
        desktop: boolean;
        bots: boolean;
        excludedCountries: string[];
    };
    showBettingTo: {
        mobile: boolean;
        includedCountries: string[];
    };
    userAgentRules: string[];
    ipBlacklist: string[];
    redirectMaskTo?: string;
}

export interface SEOSettings {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    ogImage?: string;
    hiddenSEOArticle?: string;
    structuredData?: any;
    googleAnalyticsId?: string;
    facebookPixelId?: string;
    googleSiteVerification?: string;
}

export interface SiteAnalytics {
    totalHits: number;
    mobileHits: number;
    desktopHits: number;
    botHits: number;
    countryStats: Record<string, number>;
}

export interface AdminUser {
    id: string;
    email: string;
    role: 'admin' | 'editor';
    createdAt: Date;
}
