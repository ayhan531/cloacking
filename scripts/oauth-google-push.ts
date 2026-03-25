/**
 * 🚀 OAUTH GOOGLE PUSH (ULTRA AGGRESSIVE)
 * uses google-oauth-token.json to push ALL news and site URLs.
 */
import { google } from 'googleapis';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();
const TOKEN_PATH = path.join(process.cwd(), 'google-oauth-token.json');

async function main() {
    console.log("🔥 STARTING OAUTH GOOGLE INDEXING PUSH...");

    if (!fs.existsSync(TOKEN_PATH)) {
        console.error("❌ ERROR: google-oauth-token.json NOT FOUND!");
        return;
    }

    const token = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf-8'));
    const auth = new google.auth.OAuth2();
    auth.setCredentials(token);
    const indexing = google.indexing({ version: 'v3', auth });

    const sites = await prisma.site.findMany({ where: { isActive: true } });

    for (const site of sites) {
        console.log(`\n📡 Site: ${site.domain}`);
        const urls = [
            `https://${site.domain}/`,
            `https://${site.domain}/deneme-bonusu`,
            `https://${site.domain}/haberler`
        ];

        try {
            const mc = JSON.parse(site.maskContent || "{}");
            if (mc.news) {
                mc.news.forEach((n: any) => urls.push(`https://${site.domain}/haberler/${n.slug}`));
            }
        } catch (e) {}

        console.log(`   📤 Total URLs to push: ${urls.length}`);

        for (const url of urls) {
            try {
                await indexing.urlNotifications.publish({
                    requestBody: { url, type: 'URL_UPDATED' }
                });
                console.log(`   ✅ Sent: ${url.substring(0, 60)}...`);
                await new Promise(r => setTimeout(r, 100)); // Be nice
            } catch (err: any) {
                const msg = err.errors?.[0]?.message || err.message;
                console.log(`   ❌ Error: ${url.substring(0, 40)}: ${msg}`);
                if (msg.includes('quota')) {
                    console.log("⚠️ QUOTA LIMIT! Wait 24 hours.");
                    return;
                }
            }
        }
    }
}

main().catch(console.error).finally(() => prisma.$disconnect());
