import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const headersList = await headers();
  const host = headersList.get("host") || "";
  const domain = host.split(':')[0].replace('www.', '');

  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://${domain}/</loc><lastmod>${new Date().toISOString()}</lastmod><changefreq>daily</changefreq><priority>1.0</priority></url></urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
