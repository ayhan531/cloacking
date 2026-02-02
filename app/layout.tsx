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

  // Clean port if existing (e.g. localhost:3000 -> localhost)
  const domain = host.split(':')[0];

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
        robots: "index, follow",
        alternates: {
          canonical: `https://${domain}`,
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
  const domain = host.split(':')[0];

  let structuredData: any = null;
  try {
    const site = await prisma.site.findUnique({
      where: { domain },
    });
    if (site) {
      const seo = JSON.parse(site.seoSettings);
      structuredData = seo.structuredData;
    }
  } catch (e) { }

  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        {structuredData && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          />
        )}
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
