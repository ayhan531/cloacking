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
  let site: any = null;
  try {
    site = await getSiteByDomain(domain, false);

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

      const websiteData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": seo.metaTitle || site.name,
        "url": `https://${domain}`,
        "description": seo.metaDescription || "Türkiye'nin en güncel analiz platformu.",
        "inLanguage": "tr-TR"
      };

      const orgData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": site.name,
        "alternateName": "Flovaz Bahis Rehberi",
        "url": `https://${domain}`,
        "logo": `https://${domain}/favicon.ico`,
        "description": "Profesyonel dijital analiz ve inceleme platformu.",
        "foundingDate": "2024",
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
          "https://en.wikipedia.org/wiki/Entertainment"
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

      structuredData = [structuredData, breadcrumbData, websiteData, orgData, newsMediaSchema, editorialBoardSchema].filter(Boolean);
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

        {/* PLATFORM FOOTER */}
        <footer className="mt-20 py-12 border-t border-slate-800 bg-slate-950 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-12 mb-12">
              <div className="col-span-1 md:col-span-2">
                <div className="text-xl font-bold text-slate-200 mb-4">{site?.name || "Platform"} Analiz Servisi</div>
                <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-6">
                  Bu portal, dijital platformların incelemelerini ve bağımsız analizlerini sunan bir bilgi kaynağıdır. Sorumlu kullanımı teşvik eder.
                </p>
                <div className="flex gap-4">
                  <a href="/sitemap.xml" className="text-sm font-medium text-emerald-500 hover:text-emerald-400" rel="index">Site Haritası (Sitemap)</a>
                </div>
              </div>
              <div className="col-span-1 md:col-span-2">
                <div className="text-sm font-bold text-slate-300 mb-4 uppercase">Önerilen Kaynaklar</div>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3">
                  {consortiumLinks.map((s, i) => (
                    <a
                      key={i}
                      href={`https://${s.domain}`}
                      className="text-xs font-medium text-slate-500 hover:text-emerald-400 transition-colors truncate"
                      title={`${s.name} İnceleme`}
                    >
                      {s.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="pt-8 border-t border-slate-800/50 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500">
                &copy; {new Date().getFullYear()} {site?.name || "Platform"}. Tüm hakları saklıdır. Metin tabanlı analizler bilgilendirme amaçlıdır.
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
