const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const COMMON_BETTING_CONTENT = {
    theme: {
        primaryColor: '#9333EA',
        secondaryColor: '#3B82F6',
        backgroundColor: '#0F172A',
    },
    navigation: [
        { id: '1', label: 'Anasayfa', icon: 'Home', link: '/', isActive: true },
        { id: '2', label: 'Kazananlar', icon: 'Trophy', link: '/winners', isActive: true },
        { id: '3', label: 'Çark', icon: 'Disc', link: '/wheel', isActive: true },
        { id: '4', label: 'Çekilişler', icon: 'Gift', link: '/giveaways', isActive: true },
        { id: '5', label: 'Telegram', icon: 'Send', link: '#', isActive: true },
        { id: '6', label: 'İletişim', icon: 'Plus', link: '#', isActive: true },
    ],
    brandCarousel: [
        { id: '1', name: 'Venombet', logo: 'https://raw.githubusercontent.com/ayhan531/cloacking/main/public/brands/venom.png', link: '#' },
        { id: '2', name: 'Grandpasha', logo: 'https://raw.githubusercontent.com/ayhan531/cloacking/main/public/brands/grand.png', link: '#' }
    ],
    bonuses: [
        { id: '1', title: '500 TL Deneme Bonusu', amount: '500 TL', description: 'Yatırım şartsız.', link: '#', image: '', isActive: true }
    ],
    giveaways: [],
    liveWinners: [],
    games: [],
    wheelItems: [
        { id: '1', label: '2.500 TL', color: '#00C2E0' },
        { id: '2', label: '5.000 TL', color: '#FF4D4D' },
        { id: '3', label: '7.500 TL', color: '#FF9900' },
        { id: '4', label: '10.000 TL', color: '#E91E63' }
    ],
    popups: [],
    popupLayout: 'single',
    mobileImmediatePopup: true,
    heroSlides: [],
    trendSites: []
};

async function main() {
    console.log("🚀 Restoring Betting Content for all sites...");

    const sites = await prisma.site.findMany();

    for (const site of sites) {
        let content = site.bettingContent;
        if (typeof content === 'string') {
            try { content = JSON.parse(content); } catch (e) { content = {}; }
        } else {
            content = content || {};
        }

        // If theme or navigation is missing, it's a broken/incomplete content
        if (!content.theme || !content.navigation || content.navigation.length === 0) {
            console.log(`Fixing incomplete bettingContent for: ${site.domain}`);

            // Merge with common content, but keep existing bonuses if any
            const newContent = {
                ...COMMON_BETTING_CONTENT,
                ...content,
                theme: content.theme || COMMON_BETTING_CONTENT.theme,
                navigation: content.navigation?.length > 0 ? content.navigation : COMMON_BETTING_CONTENT.navigation
            };

            await prisma.site.update({
                where: { id: site.id },
                data: {
                    bettingContent: JSON.stringify(newContent)
                }
            });
        }
    }

    console.log("✅ All sites bettingContent secured!");
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
