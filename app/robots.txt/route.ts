import { headers } from "next/headers";

export async function GET() {
    const headersList = await headers();
    const host = headersList.get("host") || "flovazcomercial.com";

    const robots = `User-agent: *
Allow: /

User-agent: Googlebot-News
Allow: /

User-agent: Googlebot-Image
Allow: /

Sitemap: https://${host}/sitemap.xml`.trim();

    return new Response(robots, {
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200"
        },
    });
}
