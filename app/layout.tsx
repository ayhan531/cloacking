import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";

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
    const site = await prisma.site.findUnique({
      where: { domain },
    });

    if (site) {
      const seo = JSON.parse(site.seoSettings);
      return {
        title: seo.metaTitle || site.name,
        description: seo.metaDescription || "Modern ve güvenilir çözümler.",
        keywords: seo.keywords ? (Array.isArray(seo.keywords) ? seo.keywords.join(", ") : seo.keywords) : "",
        robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
        alternates: {
          canonical: `https://${domain}`,
        },
        verification: {
          google: seo.googleSiteVerification,
        },
        openGraph: {
          title: seo.metaTitle || site.name,
          description: seo.metaDescription,
          url: `https://${domain}`,
          siteName: site.name,
          locale: "tr_TR",
          type: "website",
        },
        twitter: {
          card: "summary_large_image",
          title: seo.metaTitle || site.name,
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
    const site = await prisma.site.findUnique({
      where: { domain },
    });
    if (site) {
      const seo = JSON.parse(site.seoSettings);
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
        "name": seo.metaTitle,
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

      structuredData = [structuredData, breadcrumbData, ratingData, orgData].filter(Boolean);
    }
  } catch (e) { }

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
        ) : structuredData && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          />
        )}
        <link rel="manifest" href="/manifest.json" />
        <meta name="msvalidate.01" content="CFC99ED6B4F53B1926ADDA5F3B4C1EAD" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} antialiased font-sans`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
