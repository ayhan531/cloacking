'use client';

import { useState, useEffect } from 'react';
import type { SiteConfig } from '@/lib/types';
import { Home, Trophy, Disc, Gift, Send, Plus, Search, ExternalLink, Timer, Users, ChevronRight, X } from 'lucide-react';
import { Button } from './ui/button';

interface BettingSiteProps {
    config: SiteConfig;
}

type ViewType = 'Anasayfa' | 'Kazananlar' | 'Çark' | 'Çekilişler';

export default function BettingSite({ config }: BettingSiteProps) {
    const { bettingContent } = config;
    const [activeView, setActiveView] = useState<ViewType>('Anasayfa');
    const [isSpinning, setIsSpinning] = useState(false);
    const [wheelRotation, setWheelRotation] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const [activePopupIndex, setActivePopupIndex] = useState(0);
    const [activeFilter, setActiveFilter] = useState<'Tümü' | 'Trend' | 'Popüler'>('Tümü');
    const [activeSlide, setActiveSlide] = useState(0);
    const [hasMounted, setHasMounted] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setHasMounted(true);
        setIsMobile(window.innerWidth < 768);
    }, []);

    // Initial popup logic
    useEffect(() => {
        if (!hasMounted) return;

        const activePopups = bettingContent.popups?.filter(p => p.isActive) || [];
        if (activePopups.length > 0) {
            const shouldImmediate = isMobile && bettingContent.mobileImmediatePopup;

            if (shouldImmediate) {
                setShowPopup(true);
            } else {
                // Pick the minimum delay among active popups for immediate engagement
                const minDelay = Math.min(...activePopups.map(p => p.showDelay || 2000));
                const timer = setTimeout(() => {
                    setShowPopup(true);
                }, minDelay);
                return () => clearTimeout(timer);
            }
        }
    }, [bettingContent.popups, bettingContent.mobileImmediatePopup, isMobile, hasMounted]);

    // Auto-slide logic
    useEffect(() => {
        if (bettingContent.heroSlides && bettingContent.heroSlides.length > 1) {
            const timer = setInterval(() => {
                setActiveSlide(prev => (prev + 1) % bettingContent.heroSlides.length);
            }, 5000);
            return () => clearInterval(timer);
        }
    }, [bettingContent.heroSlides]);
    const spinWheel = () => {
        if (isSpinning) return;
        setIsSpinning(true);
        const extraRotation = 1800 + Math.floor(Math.random() * 360);
        setWheelRotation(prev => prev + extraRotation);
        setTimeout(() => setIsSpinning(false), 5000);
    };

    const renderHome = () => (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Brand Carousel */}
            <div className="relative overflow-hidden py-4 -mx-4">
                <div className="flex gap-4 px-4 overflow-x-auto no-scrollbar scroll-smooth">
                    {bettingContent.brandCarousel.map((brand) => (
                        <a key={brand.id} href={brand.link} className="flex-shrink-0 w-36 h-20 bg-slate-800/50 backdrop-blur-md rounded-xl border border-white/10 flex items-center justify-center p-4 hover:border-purple-500/50 transition-colors">
                            <img src={brand.logo || `https://via.placeholder.com/150x80/222/fff?text=${brand.name}`} alt={brand.name} className="max-w-full max-h-full object-contain filter brightness-125" />
                        </a>
                    ))}
                </div>
            </div>

            {/* Hero Ad Slider */}
            {bettingContent.heroSlides && bettingContent.heroSlides.length > 0 && (
                <div className="relative h-64 md:h-80 w-full overflow-hidden rounded-3xl group">
                    {bettingContent.heroSlides.map((slide, idx) => (
                        <div key={slide.id}
                            className={`absolute inset-0 transition-all duration-700 ease-in-out ${idx === activeSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'}`}>

                            {/* Media Background */}
                            <div className="absolute inset-0 bg-slate-900">
                                {slide.type === 'video' && slide.video ? (
                                    <video className="w-full h-full object-cover opacity-60" autoPlay muted loop playsInline>
                                        <source src={slide.video} type="video/mp4" />
                                    </video>
                                ) : (
                                    <img src={slide.image || 'https://via.placeholder.com/800x400/222/fff?text=SLIDER'} className="w-full h-full object-cover opacity-60" />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                            </div>

                            {/* Content Over */}
                            <div className="relative h-full flex flex-col justify-end p-8 space-y-3">
                                <div className="space-y-1">
                                    <h2 className="text-3xl font-black italic tracking-tighter text-white uppercase leading-none">{slide.title}</h2>
                                    <p className="text-gray-300 text-sm font-medium tracking-wide uppercase drop-shadow-lg">{slide.subtitle}</p>
                                </div>
                                <Button className="w-fit px-8 h-12 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black italic uppercase rounded-xl shadow-xl shadow-purple-900/40 active:scale-95 transition-all"
                                    onClick={() => window.open(slide.ctaLink, '_blank')}>
                                    {slide.ctaText}
                                </Button>
                            </div>
                        </div>
                    ))}

                    {/* Dots Navigation */}
                    {bettingContent.heroSlides.length > 1 && (
                        <div className="absolute bottom-4 right-8 flex gap-2">
                            {bettingContent.heroSlides.map((_, i) => (
                                <button key={i} onClick={() => setActiveSlide(i)}
                                    className={`w-2 h-2 rounded-full transition-all ${i === activeSlide ? 'bg-white w-6' : 'bg-white/30'}`} />
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Main Heading & Search */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="bg-slate-800 p-2 rounded-lg">
                        <Search className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                        <button
                            onClick={() => setActiveFilter('Tümü')}
                            className={`whitespace-nowrap px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeFilter === 'Tümü' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-gray-400'}`}>Tümü</button>
                        <button
                            onClick={() => setActiveFilter('Trend')}
                            className={`whitespace-nowrap px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeFilter === 'Trend' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-gray-400'}`}>Trend Siteler</button>
                        <button
                            onClick={() => setActiveFilter('Popüler')}
                            className={`whitespace-nowrap px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeFilter === 'Popüler' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-gray-400'}`}>Popüler</button>
                    </div>
                </div>
            </div>

            {/* Bonuses Grid */}
            <section className="space-y-4">
                <div className="flex items-center gap-2">
                    <div className="bg-purple-500/20 p-2 rounded-lg text-purple-400">
                        <Gift className="w-6 h-6" />
                    </div>
                    <h2 className="text-xl font-bold">Bonus Fırsatları</h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {bettingContent.bonuses.filter(b => b.isActive).map((bonus) => (
                        <div key={bonus.id} className="bg-slate-800/60 border border-white/5 rounded-2xl p-4 flex flex-col items-center text-center space-y-3 relative group overflow-hidden">
                            <div className="absolute top-0 right-0 p-1">
                                <div className="bg-purple-600 text-[8px] font-black px-1.5 py-0.5 rounded text-white italic">DENEME BONUSU</div>
                            </div>
                            <div className="w-full aspect-video bg-black/40 rounded-lg overflow-hidden flex items-center justify-center">
                                <img src={bonus.image || 'https://via.placeholder.com/300x150/444/fff?text=BONUS'} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <h3 className="text-sm font-bold leading-tight">{bonus.title}</h3>
                            <div className="text-yellow-500 font-black text-xs uppercase tracking-wider">{bonus.amount}</div>
                            <Button className="w-full h-8 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-bold" onClick={() => window.open(bonus.link, '_blank')}>
                                Bonusu Al <ChevronRight className="w-3 h-3" />
                            </Button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Filtered Sites Grid */}
            <section className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold italic uppercase tracking-tight">
                        {activeFilter === 'Trend' ? 'Trend Siteler' : activeFilter === 'Popüler' ? 'Popüler Siteler' : 'Tüm Siteler'}
                    </h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {(activeFilter === 'Trend' ? (bettingContent.trendSites || []) :
                        activeFilter === 'Popüler' ? bettingContent.brandCarousel :
                            [...(bettingContent.trendSites || []), ...bettingContent.brandCarousel]).map((site, idx) => (
                                <div key={`${site.id}-${idx}`} className="bg-slate-800/40 border border-white/5 rounded-2xl p-4 flex flex-col items-center text-center space-y-2 group">
                                    <div className="h-12 flex items-center justify-center">
                                        <img src={site.logo || 'https://via.placeholder.com/80x40'} className="max-h-full max-w-full object-contain brightness-125" />
                                    </div>
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{site.name}</span>
                                    <Button variant="ghost" className="w-full h-8 text-[10px] font-bold text-purple-400 hover:text-purple-300 p-0" onClick={() => window.open(site.link, '_blank')}>
                                        İNCELE <ChevronRight className="w-3 h-3" />
                                    </Button>
                                </div>
                            ))}
                </div>
            </section>

            {/* Recommended Sites Grid (Shared) */}
            {renderRecommended()}
        </div>
    );

    const renderGiveaways = () => (
        <div className="space-y-8 animate-in slide-in-from-right duration-500">
            <div className="pt-4">
                <h1 className="text-2xl font-black italic">AKTİF ÇEKİLİŞLER</h1>
                <p className="text-gray-400 text-xs mt-1">Sana özel dev çekiliş havuzu</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-20">
                {bettingContent.giveaways.map((giveaway) => (
                    <div key={giveaway.id} className="bg-slate-800/80 backdrop-blur-lg border border-white/5 rounded-3xl p-6 space-y-6 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 blur-3xl -z-10" />
                        <div className="flex flex-col items-center text-center space-y-4">
                            <div className="w-32 h-16 flex items-center justify-center">
                                <img src={giveaway.brandLogo || 'https://via.placeholder.com/150x80/000/fff?text=BRAND'} alt={giveaway.brandName} className="max-h-full max-w-full object-contain brightness-125" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black uppercase italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-400">{giveaway.prize}</h3>
                                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Kazanma Şansı</p>
                            </div>
                        </div>

                        <div className="bg-black/40 rounded-2xl p-4 space-y-4 shadow-inner">
                            <div className="flex justify-between items-center text-xs">
                                <div className="flex items-center gap-2">
                                    <div className="p-1.5 bg-yellow-500/20 rounded-md">
                                        <Users className="w-3.5 h-3.5 text-yellow-500" />
                                    </div>
                                    <span className="font-bold">{giveaway.participantCount}</span>
                                    <span className="text-gray-500 font-medium">Katılımcı</span>
                                </div>
                                <div className="text-purple-400 font-black animate-pulse">
                                    {hasMounted ? `+${Math.floor(Math.random() * 5)}` : '+3'} CANLI
                                </div>
                            </div>
                            <div className="h-2.5 w-full bg-slate-700/50 rounded-full overflow-hidden p-[2px] border border-white/5">
                                <div className="h-full bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-200 rounded-full shadow-[0_0_10px_rgba(234,179,8,0.4)]"
                                    style={{ width: `${(giveaway.participantCount / giveaway.totalSlots) * 100}%` }} />
                            </div>
                            <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-gray-400 uppercase">
                                <Timer className="w-3.5 h-3.5 text-yellow-500" />
                                <span>Kalan: <span className="text-white">{giveaway.endTime}</span></span>
                            </div>
                        </div>

                        <Button className="w-full h-14 rounded-2xl bg-gradient-to-r from-yellow-500 to-yellow-300 hover:from-yellow-400 hover:to-yellow-200 text-black font-black italic uppercase text-sm flex items-center justify-center gap-2 group-hover:scale-[1.02] shadow-lg shadow-yellow-500/20 transition-all"
                            onClick={() => window.open(giveaway.link, '_blank')}>
                            Çekilişe Katıl <ExternalLink className="w-4 h-4 stroke-[3px]" />
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderWinners = () => (
        <div className="space-y-6 animate-in slide-in-from-right duration-500">
            <div className="pt-4">
                <h1 className="text-2xl font-black italic">ANLIK KAZANANLAR</h1>
                <p className="text-emerald-500 text-xs flex items-center gap-1.5 font-bold uppercase tracking-wider">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" /> SİSTEM AKTİF
                </p>
            </div>

            <div className="space-y-3 pb-20">
                {bettingContent.liveWinners.map((winner) => (
                    <div key={winner.id} className="bg-slate-800/40 border border-white/5 rounded-2xl p-4 flex items-center justify-between group hover:bg-slate-800/60 transition-all shadow-lg hover:border-emerald-500/30">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-black/40 rounded-xl flex items-center justify-center p-2 border border-white/5 shadow-inner">
                                <img src={winner.brandLogo || 'https://via.placeholder.com/50x50/333/fff?text=Bet'} className="max-w-full max-h-full object-contain filter group-hover:brightness-125 transition-all" />
                            </div>
                            <div>
                                <p className="font-black text-lg tracking-tight text-white group-hover:text-emerald-400 transition-colors uppercase italic">{winner.amount}</p>
                                <p className="text-[10px] text-gray-400 font-bold uppercase letter tracking-widest">
                                    {winner.username} • <span className="text-emerald-500/70">{winner.timeAgo}</span>
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                            <div className="text-yellow-500 font-black text-xs group-hover:translate-x-1 transition-transform bg-yellow-500/10 px-2 py-1 rounded-md">
                                {winner.game}
                            </div>
                            <ExternalLink className="w-4 h-4 text-emerald-500/50" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderWheel = () => (
        <div className="flex flex-col items-center space-y-10 pt-8 animate-in slide-in-from-bottom duration-500">
            <div className="text-center space-y-2">
                <div className="inline-block bg-purple-500/20 p-3 rounded-2xl ring-2 ring-purple-500/20">
                    <Disc className="w-8 h-8 text-purple-500 animate-spin-slow" />
                </div>
                <h1 className="text-3xl font-black italic tracking-tighter">BONUS ÇARKINI ÇEVİR</h1>
                <p className="text-gray-400 text-sm font-medium">Şansını dene, bugünkü şanslı bonusunu yakala!</p>
            </div>

            <div className="relative w-80 h-80 rounded-full border-[10px] border-slate-700/50 shadow-[0_0_70px_rgba(147,51,234,0.4)] flex items-center justify-center overflow-hidden bg-slate-900 group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-pink-600/10 pointer-events-none" />

                {/* Wheel Container */}
                <div className={`w-full h-full relative transition-transform duration-[5s] ${isSpinning ? 'ease-out' : ''}`}
                    style={{ transform: `rotate(${wheelRotation}deg)` }}>
                    {bettingContent.wheelItems.map((item, idx) => (
                        <div key={item.id}
                            className="absolute top-0 left-1/2 -ml-[1px] w-[2px] h-1/2 origin-bottom flex flex-col items-center"
                            style={{ transform: `rotate(${idx * (360 / bettingContent.wheelItems.length)}deg)` }}>
                            <div className="rotate-[45deg] bg-white/20 p-1.5 rounded-full text-[9px] font-black mt-6 shadow-lg border border-white/20" style={{ backgroundColor: item.color }}>
                                {item.label}
                            </div>
                            <div className="absolute top-0 bottom-0 left-[-60px] right-[-60px] -z-10"
                                style={{
                                    background: `conic-gradient(from 0deg at 50% 100%, ${item.color}22, ${item.color}aa 10deg, transparent 11deg)`,
                                    transform: `rotate(-5deg)`
                                }}></div>
                        </div>
                    ))}
                </div>

                {/* Center Button and Indicator */}
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    <div className="w-24 h-24 bg-gradient-to-b from-yellow-300 to-yellow-600 rounded-full border-[6px] border-slate-900 flex items-center justify-center shadow-2xl pointer-events-auto active:scale-90 active:rotate-12 transition-all cursor-pointer group-hover:scale-105"
                        onClick={spinWheel}>
                        <div className="flex flex-col items-center">
                            <span className="text-slate-900 font-black text-sm italic -mb-1">ŞANSLI</span>
                            <span className="text-slate-950 font-black text-xs">ÇEVİR</span>
                        </div>
                    </div>
                    {/* Tick Indicator */}
                    <div className="absolute top-[-5px] w-8 h-10 bg-yellow-400 clip-arrow shadow-2xl ring-2 ring-slate-900 z-20" />
                </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur border border-white/5 p-6 rounded-3xl w-full text-center space-y-2 max-w-sm">
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest italic">Bugünkü çevirme hakkın</p>
                <div className="text-3xl font-black italic">{isSpinning ? '...' : '1 / 1'}</div>
                <p className="text-[10px] text-purple-400 font-medium">Hemen üye olursan ekstra 3 çevirme kazanabilirsin!</p>
            </div>

            {renderRecommended()}
        </div>
    );

    const renderRecommended = () => (
        <section className="space-y-4 pt-10 pb-20">
            <div className="flex items-center gap-2">
                <div className="bg-blue-500/20 p-2 rounded-lg">
                    <Trophy className="w-6 h-6 text-blue-500" />
                </div>
                <h2 className="text-xl font-bold italic uppercase tracking-tighter">ÖNERİLEN SİTELER</h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {bettingContent.brandCarousel.concat(bettingContent.brandCarousel).slice(0, 10).map((site, idx) => (
                    <div key={idx} className="bg-slate-800/60 border border-white/5 rounded-2xl p-4 flex flex-col items-center text-center space-y-3 relative group">
                        <div className="absolute top-2 left-2 bg-yellow-500 text-[8px] font-black px-2 py-0.5 rounded text-black italic">
                            {idx % 3 === 0 ? 'BONUS KRALI' : idx % 2 === 0 ? 'YENİ SİTE' : 'POPÜLER'}
                        </div>
                        <div className="h-14 flex items-center justify-center p-2">
                            <img src={site.logo || 'https://via.placeholder.com/80x40'} className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <div className="bg-black/40 px-2 py-0.5 rounded-full">
                            <p className="text-[8px] text-gray-300 font-black uppercase tracking-widest tracking-widest">{site.name}</p>
                        </div>
                        <Button className="w-full h-10 bg-gradient-to-r from-purple-700 to-purple-500 hover:from-purple-600 hover:to-purple-400 text-white rounded-xl text-[10px] font-black italic uppercase shadow-lg shadow-purple-900/20 transition-all active:scale-95"
                            onClick={() => window.open(site.link, '_blank')}>
                            KEŞFET <ChevronRight className="w-4 h-4 ml-0.5" />
                        </Button>
                    </div>
                ))}
            </div>
        </section>
    );

    return (
        <div className="min-h-screen pb-24 text-white font-sans selection:bg-purple-500/30 overflow-x-hidden"
            style={{ backgroundColor: bettingContent.theme.backgroundColor }}>

            {/* Top Ad Banner */}
            {bettingContent.topBanner?.isActive && (
                <a href={bettingContent.topBanner.link} target="_blank"
                    className="fixed top-0 left-0 right-0 z-[100] h-14 flex items-center justify-between px-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 animate-gradient shadow-2xl border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="bg-yellow-400 p-1.5 rounded-lg shadow-lg rotate-12">
                            <Gift className="w-5 h-5 text-black animate-pulse" />
                        </div>
                        <div className="flex flex-col -space-y-1">
                            <span className="text-[11px] font-black uppercase italic tracking-tighter leading-tight">{bettingContent.topBanner.title}</span>
                            <span className="text-[8px] font-bold text-yellow-300 uppercase leading-tight tracking-widest">{bettingContent.topBanner.subtitle || 'Sınırlı Süre Fırsatı'}</span>
                        </div>
                    </div>
                    <Button variant="secondary" size="sm" className="h-8 text-[10px] font-black italic bg-white text-purple-700 hover:bg-gray-100 uppercase tracking-tighter px-4 rounded-xl shadow-lg active:scale-95 transition-all">
                        {bettingContent.topBanner.buttonText || 'KATIL'}
                    </Button>
                </a>
            )}

            {/* Bottom Ad Banner */}
            {bettingContent.bottomBanner?.isActive && (
                <a href={bettingContent.bottomBanner.link} target="_blank"
                    className="fixed bottom-20 left-4 right-4 z-[100] h-14 flex items-center justify-between px-4 bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex items-center gap-3 relative">
                        <div className="bg-purple-600 p-1.5 rounded-lg">
                            <Plus className="w-5 h-5 text-white animate-bounce" />
                        </div>
                        <div className="flex flex-col -space-y-1">
                            <span className="text-[11px] font-black uppercase italic tracking-tighter leading-tight">{bettingContent.bottomBanner.title}</span>
                            <span className="text-[8px] font-bold text-purple-400 uppercase leading-tight tracking-widest">{bettingContent.bottomBanner.subtitle || 'ÖZEL TEKLİF'}</span>
                        </div>
                    </div>
                    <Button variant="secondary" size="sm" className="relative h-8 text-[10px] font-black italic bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 uppercase tracking-tighter px-4 rounded-xl active:scale-95 transition-all">
                        {bettingContent.bottomBanner.buttonText || 'HEMEN AL'}
                    </Button>
                </a>
            )}

            {/* Main Viewport */}
            <div className="pt-16 px-4">
                {activeView === 'Anasayfa' && renderHome()}
                {activeView === 'Kazananlar' && renderWinners()}
                {activeView === 'Çark' && renderWheel()}
                {activeView === 'Çekilişler' && renderGiveaways()}
            </div>

            {/* Bottom Floating Menu */}
            <nav className="fixed bottom-0 left-0 right-0 z-[110] h-20 bg-slate-900/95 backdrop-blur-2xl border-t border-white/10 px-4 flex items-center justify-between pb-2">
                {bettingContent.navigation.map((item) => {
                    const isActive = activeView === item.label;
                    return (
                        <button
                            key={item.id}
                            onClick={() => {
                                if (['Anasayfa', 'Kazananlar', 'Çark', 'Çekilişler'].includes(item.label)) {
                                    setActiveView(item.label as ViewType);
                                    window.scrollTo(0, 0);
                                } else if (item.link && item.link !== '#') {
                                    window.open(item.link, '_blank');
                                }
                            }}
                            className={`flex flex-col items-center gap-1 group relative flex-1 transition-all ${isActive ? 'scale-110' : 'opacity-60 grayscale-[0.5]'}`}
                        >
                            <div className={`p-2.5 rounded-2xl transition-all duration-300 ${isActive ? 'bg-gradient-to-br from-purple-600 to-pink-600 text-white -mt-10 shadow-xl shadow-purple-600/40 ring-4 ring-slate-950' : 'text-gray-400 group-hover:text-purple-400 group-hover:bg-white/5'}`}>
                                {item.icon === 'Home' && <Home className="w-6 h-6" />}
                                {item.icon === 'Trophy' && <Trophy className="w-6 h-6" />}
                                {item.icon === 'Disc' && <Disc className="w-6 h-6 animate-spin-slow" />}
                                {item.icon === 'Gift' && <Gift className="w-6 h-6" />}
                                {item.icon === 'Send' && <Send className="w-6 h-6" />}
                                {item.icon === 'Plus' && <Plus className="w-6 h-6" />}
                            </div>
                            <span className={`text-[10px] font-black italic uppercase tracking-tighter mt-1 ${isActive ? 'text-white' : 'text-gray-500'}`}>{item.label}</span>
                            {isActive && <div className="absolute -bottom-1 w-2 h-2 bg-purple-500 rounded-full shadow-[0_0_10px_#9333ea]" />}
                        </button>
                    );
                })}
            </nav>

            {/* Popup Logic */}
            {(() => {
                const activePopups = bettingContent.popups?.filter(p => p.isActive) || [];
                if (!showPopup || activePopups.length === 0) return null;

                const layout = bettingContent.popupLayout || 'single';

                // CLOSE BUTTON
                const CloseButton = () => (
                    <button className="absolute top-4 right-4 z-[210] p-2 bg-black/40 backdrop-blur rounded-full text-white/50 hover:text-white transition-colors"
                        onClick={() => setShowPopup(false)}>
                        <X className="w-6 h-6" />
                    </button>
                );

                // SINGLE POPUP (Default)
                if (layout === 'single') {
                    const currentPopup = activePopups[activePopupIndex] || activePopups[0];
                    return (
                        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
                            <div className="relative w-full max-w-sm bg-slate-900 border border-white/10 rounded-[32px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-500">
                                <CloseButton />
                                <div className="relative aspect-[4/5] bg-gradient-to-b from-purple-600 to-slate-900 flex flex-col justify-end p-8 text-center space-y-6">
                                    <div className="absolute inset-0">
                                        {currentPopup.type === 'video' && currentPopup.video ? (
                                            <video className="w-full h-full object-cover opacity-60" autoPlay muted loop playsInline>
                                                <source src={currentPopup.video} type="video/mp4" />
                                            </video>
                                        ) : (
                                            <img src={currentPopup.image || 'https://via.placeholder.com/400x500/222/fff?text=POPUP'} className="w-full h-full object-cover opacity-60 mix-blend-overlay" />
                                        )}
                                    </div>
                                    <div className="relative space-y-2">
                                        <h2 className="text-3xl font-black italic tracking-tighter leading-tight text-white uppercase">{currentPopup.title}</h2>
                                        <p className="text-gray-300 text-sm font-medium leading-relaxed">{currentPopup.content}</p>
                                    </div>
                                    <Button className="w-full h-14 bg-gradient-to-r from-yellow-500 to-yellow-300 hover:from-yellow-400 hover:to-yellow-200 text-black font-black italic uppercase text-lg rounded-2xl shadow-xl shadow-yellow-500/20 active:scale-95 transition-all"
                                        onClick={() => {
                                            if (currentPopup.ctaLink) window.open(currentPopup.ctaLink, '_blank');
                                            setShowPopup(false);
                                        }}>
                                        {currentPopup.ctaText}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    );
                }

                // GRID POPUP (Multiple)
                if (layout === 'grid') {
                    return (
                        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl overflow-y-auto animate-in fade-in duration-500">
                            <div className="absolute top-6 right-6 z-[210]">
                                <Button variant="secondary" className="rounded-full h-12 w-12 p-0" onClick={() => setShowPopup(false)}>
                                    <X className="w-6 h-6" />
                                </Button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl py-20 px-4">
                                {activePopups.map((popup) => (
                                    <div key={popup.id} className="relative aspect-[4/5] bg-slate-900 border border-white/10 rounded-[40px] overflow-hidden shadow-2xl group animate-in zoom-in-95 duration-500">
                                        <div className="absolute inset-0">
                                            {popup.type === 'video' && popup.video ? (
                                                <video className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity" autoPlay muted loop playsInline>
                                                    <source src={popup.video} type="video/mp4" />
                                                </video>
                                            ) : (
                                                <img src={popup.image || 'https://via.placeholder.com/400x500/222/fff?text=POPUP'} className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity mix-blend-overlay" />
                                            )}
                                        </div>
                                        <div className="relative h-full flex flex-col justify-end p-8 text-center space-y-4">
                                            <div className="space-y-2">
                                                <h2 className="text-2xl font-black italic tracking-tighter leading-tight text-white uppercase">{popup.title}</h2>
                                                <p className="text-gray-300 text-xs font-medium leading-relaxed line-clamp-2">{popup.content}</p>
                                            </div>
                                            <Button className="w-full h-12 bg-purple-600 hover:bg-purple-500 text-white font-black italic uppercase text-sm rounded-xl"
                                                onClick={() => {
                                                    if (popup.ctaLink) window.open(popup.ctaLink, '_blank');
                                                    setShowPopup(false);
                                                }}>
                                                {popup.ctaText}
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                }

                // FULL SCREEN POPUP
                if (layout === 'full') {
                    const currentPopup = activePopups[activePopupIndex] || activePopups[0];
                    return (
                        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black animate-in fade-in duration-700">
                            <div className="absolute inset-0">
                                {currentPopup.type === 'video' && currentPopup.video ? (
                                    <video className="w-full h-full object-cover opacity-50" autoPlay muted loop playsInline>
                                        <source src={currentPopup.video} type="video/mp4" />
                                    </video>
                                ) : (
                                    <img src={currentPopup.image || 'https://via.placeholder.com/1200x800/222/fff?text=FULL+POPUP'} className="w-full h-full object-cover opacity-50" />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                            </div>

                            <CloseButton />

                            <div className="relative z-10 w-full max-w-2xl px-8 text-center space-y-12 animate-in slide-in-from-bottom-10 duration-1000">
                                <div className="space-y-6">
                                    <div className="inline-block px-4 py-1.5 bg-yellow-400 text-black text-[10px] font-black uppercase italic tracking-widest rounded-full animate-bounce">
                                        ÖZEL TEKLİF
                                    </div>
                                    <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter leading-[0.8] text-white uppercase drop-shadow-2xl">
                                        {currentPopup.title}
                                    </h2>
                                    <p className="text-gray-300 text-lg md:text-xl font-medium max-w-lg mx-auto leading-relaxed drop-shadow-lg">
                                        {currentPopup.content}
                                    </p>
                                </div>
                                <div className="flex flex-col items-center gap-4">
                                    <Button className="w-full md:w-auto px-16 h-20 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 animate-gradient text-white font-black italic uppercase text-2xl rounded-3xl shadow-[0_0_50px_rgba(147,51,234,0.5)] active:scale-95 transition-all group"
                                        onClick={() => {
                                            if (currentPopup.ctaLink) window.open(currentPopup.ctaLink, '_blank');
                                            setShowPopup(false);
                                        }}>
                                        <span>{currentPopup.ctaText}</span>
                                        <ChevronRight className="w-8 h-8 ml-2 group-hover:translate-x-2 transition-transform" />
                                    </Button>

                                    {activePopups.length > 1 && (
                                        <div className="flex gap-4">
                                            <button className="text-white/40 hover:text-white transition-colors"
                                                onClick={() => setActivePopupIndex(prev => (prev - 1 + activePopups.length) % activePopups.length)}>
                                                ÖNCEKİ
                                            </button>
                                            <div className="flex gap-2">
                                                {activePopups.map((_, i) => (
                                                    <div key={i} className={`w-2 h-2 rounded-full transition-all ${i === activePopupIndex ? 'bg-yellow-400 w-4' : 'bg-white/20'}`} />
                                                ))}
                                            </div>
                                            <button className="text-white/40 hover:text-white transition-colors"
                                                onClick={() => setActivePopupIndex(prev => (prev + 1) % activePopups.length)}>
                                                SONRAKİ
                                            </button>
                                        </div>
                                    )}

                                    <button className="text-gray-500 font-bold uppercase tracking-widest text-xs hover:text-white transition-colors"
                                        onClick={() => setShowPopup(false)}>
                                        ŞİMDİ DEĞİL, DAHA SONRA
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                }

                return null;
            })()}

            <style jsx>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                
                .clip-arrow {
                    clip-path: polygon(50% 100%, 0 0, 100% 0);
                }

                @keyframes gradient {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }

                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                .animate-gradient {
                    background-size: 200% 200%;
                    animation: gradient 3s ease infinite;
                }

                .animate-spin-slow {
                    animation: spin-slow 8s linear infinite;
                }
            `}</style>
        </div>
    );
}
