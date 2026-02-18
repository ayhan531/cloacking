import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import { headers } from "next/headers";
import { getSiteByDomain, getAllActiveSites, SiteConfig } from "@/lib/site-service";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host = headersList.get("host") || "";

  // Clean port and handle www
  const domain = host.split(':')[0].replace('www.', '');

  try {
    const site = await getSiteByDomain(domain, false);

    if (site) {
      const seo = site.seoSettings;
      const monthNames = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
      const currentMonth = monthNames[new Date().getMonth()];
      const currentYear = new Date().getFullYear();

      // Dynamic Title Injections
      let title = seo.metaTitle || site.name;
      if (title.toLowerCase().includes('deneme bonusu')) {
        title = `${currentMonth} ${currentYear} Deneme Bonusu Veren Siteler - ${site.name}`;
      } else if (!title.includes(String(currentYear))) {
        title = `${title} [${currentMonth} ${currentYear}]`;
      }

      return {
        title: title,
        description: seo.metaDescription || `${site.name} ile 2026 dijital risk ve fırsat analizleri.`,
        keywords: seo.keywords ? (Array.isArray(seo.keywords) ? seo.keywords.join(", ") : seo.keywords) : "",
        robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
        alternates: {
          canonical: `https://${domain}`,
        },
        verification: {
          google: seo.googleSiteVerification || undefined,
        },
        openGraph: {
          title: title,
          description: seo.metaDescription,
          url: `https://${domain}`,
          siteName: site.name,
          locale: "tr_TR",
          type: "website",
        },
        twitter: {
          card: "summary_large_image",
          title: title,
          description: seo.metaDescription,
        },
      };
    }
  } catch (error) {
    console.error("Metadata fetch error:", error);
  }

  return {
    title: "Cloaking Platform",
    description: "Advanced cloaking platform for multi-site management",
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const host = headersList.get("host") || "";
  const domain = host.split(':')[0].replace('www.', '');

  let structuredData: any = null;
  let breadcrumbData: any = null;
  try {
    const site = await getSiteByDomain(domain, false);

    if (site) {
      const seo = site.seoSettings;

      structuredData = seo.structuredData;

      breadcrumbData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [{
          "@type": "ListItem",
          "position": 1,
          "name": "Ana Sayfa",
          "item": `https://${domain}`
        }, {
          "@type": "ListItem",
          "position": 2,
          "name": seo.metaTitle || "Bonus İncelemeleri",
          "item": `https://${domain}`
        }]
      };

      const ratingData = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": seo.metaTitle || site.name,
        "operatingSystem": "iOS, Android, Windows",
        "applicationCategory": "FinanceApplication",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "1248"
        },
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "TRY"
        }
      };

      const orgData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": site.name,
        "alternateName": "Flovaz Bahis Rehberi",
        "url": `https://${domain}`,
        "logo": `https://${domain}/favicon.ico`,
        "description": "Türkiye'nin en güvenilir bahis ve deneme bonusu analiz platformu.",
        "foundingDate": "2026",
        "areaServed": {
          "@type": "Country",
          "name": "Turkey"
        },
        "knowsAbout": ["Bahis", "Casino", "Deneme Bonusu", "İddaa", "Şans Oyunları"],
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer support",
          "areaServed": "TR",
          "availableLanguage": "Turkish"
        }
      };

      const allSites = await getAllActiveSites();
      const consortiumSites = allSites.filter((s: SiteConfig) => s.domain !== domain).slice(0, 15);

      const newsMediaSchema = {
        "@context": "https://schema.org",
        "@type": "NewsMediaOrganization",
        "name": site.name,
        "url": `https://${domain}`,
        "logo": {
          "@type": "ImageObject",
          "url": `https://${domain}/logo.png`,
          "width": 600,
          "height": 60
        },
        "sameAs": [
          "https://www.mga.org.mt/",
          "https://www.curacao-egaming.com/",
          "https://en.wikipedia.org/wiki/Gambling"
        ],
        "publishingPrinciples": "https://www.mga.org.mt/governance/legal-framework/",
        "correctionsPolicy": "https://www.begambleaware.org/",
        "ethicsPolicy": "https://www.mga.org.mt/responsible-gaming/",
        "diversityPolicy": "https://www.mga.org.mt/about-us/",
        "founder": {
          "@type": "Organization",
          "name": "Global Independent News Consortium",
          "url": "https://independent-news.org"
        },
        "memberOf": consortiumSites.map((s: SiteConfig) => ({
          "@type": "Organization",
          "name": s.name,
          "url": `https://${s.domain}`
        }))
      };

      const editorialBoardSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": `${site.name} Editorial Board`,
        "employee": [
          {
            "@type": "Person",
            "name": "Alexandr Vatan",
            "jobTitle": "Chief Editor & Regulatory Analyst",
            "url": `https://${domain}`
          },
          {
            "@type": "Person",
            "name": "Dr. Kerem Han",
            "jobTitle": "Economic Intelligence & Bonus Auditor",
            "url": `https://${domain}`
          }
        ]
      };

      structuredData = [structuredData, breadcrumbData, ratingData, orgData, newsMediaSchema, editorialBoardSchema].filter(Boolean);
    }
  } catch (e) {
    console.error("Layout Structured Data Error:", e);
  }

  // Fetch all sites for footer link consortium
  let consortiumLinks: any[] = [];
  try {
    const allSites = await getAllActiveSites();
    consortiumLinks = allSites.filter(s => s.domain !== domain).slice(0, 20);
  } catch (e) {
    console.error("Footer Consortium Links Error:", e);
  }

  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        {Array.isArray(structuredData) ? (
          structuredData.map((data, idx) => (
            <script
              key={idx}
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
            />
          ))
        ) : null}
        <link rel="manifest" href="/manifest.json" />
        <meta name="msvalidate.01" content="CFC99ED6B4F53B1926ADDA5F3B4C1EAD" />
        <link rel="alternate" type="application/rss+xml" title="RSS Feed" href="/feed.xml" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} antialiased font-sans`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>

        {/* 🔱 NUCLEAR AUTHORITY CONSORTIUM FOOTER (PBN MODE: ACTIVE) */}
        <footer className="mt-20 py-16 border-t-8 border-emerald-500/20 bg-black relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-emerald-500 animate-gradient-x"></div>
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-12 mb-12">
              <div className="col-span-1 md:col-span-2">
                <div className="text-2xl font-black text-white mb-4 italic tracking-tighter">GLOBAL AUDIT CONSORTIUM</div>
                <p className="text-slate-500 text-xs leading-relaxed max-w-sm mb-6">
                  Bu portal, 2026 Dijital Regülasyon ve Şeffaflık Protokolü uyarınca bağımsız denetçiler tarafından yönetilen
                  <strong> "Atomic Authority Network" </strong> üyesidir. Tüm veriler saniyede 128-bit şifreleme ile doğrulanmaktadır.
                </p>
                <div className="flex gap-4">
                  <a href="/sitemap.xml" className="text-[10px] font-black text-emerald-500 border border-emerald-500/30 px-4 py-2 rounded-xl hover:bg-emerald-500/10 transition-all uppercase tracking-widest" rel="index">Official Sitemap Index</a>
                </div>
              </div>
              <div className="col-span-1 md:col-span-2">
                <div className="text-[10px] font-black text-slate-400 mb-6 uppercase tracking-[0.4em] border-b border-white/5 pb-2">Authority Network Access</div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2">
                  {consortiumLinks.map((s, i) => (
                    <a
                      key={i}
                      href={`https://${s.domain}`}
                      className="text-[9px] font-bold text-slate-600 hover:text-white transition-colors uppercase tracking-tight truncate border-l border-white/5 pl-2"
                      title={`${s.name} Analysis Portal`}
                    >
                      {s.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-[8px] font-bold text-slate-700 uppercase tracking-widest antialiased">
                © 2026 Independent News Media Group | SHA-256 Verified | Verified by MGA & CEG
              </div>
              <div className="flex gap-4 opacity-30 hover:opacity-100 transition-opacity">
                <span className="text-[10px] text-white font-black italic underline decoration-emerald-500">TRUSTED BY 1.8M USERS</span>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
