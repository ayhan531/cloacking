import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function GET() {
    const headersList = await headers();
    const host = headersList.get("host") || "";
    const domain = host.split(':')[0];

    const robots = `User-agent: *
Allow: /
Sitemap: https://${domain}/sitemap.xml`;

    return new Response(robots, {
        headers: {
            "Content-Type": "text/plain",
        },
    });
}
