import axios from 'axios';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const PING_SERVICES = [
    "http://rpc.pingomatic.com",
    "http://rpc.twingly.com",
    "http://api.feedster.com/ping",
    "http://api.moreover.com/rpc5",
    "http://api.my.yahoo.com/rss/ping",
    "http://blogsearch.google.com/ping/RPC2",
    "http://ping.blo.gs/",
    "http://ping.feedburner.com",
    "http://ping.syndic8.com/xmlrpc",
    "http://ping.weblogalot.com/rpc.php",
    "http://rpc.weblogs.com/RPC2",
    "http://topicexchange.com/RPC2",
    "http://www.blogdigger.com/RPC2",
    "http://www.bloggers.jp/rpc/",
    "http://www.blogpeople.net/servlet/weblogUpdates",
    "http://www.pingerati.net",
    "http://www.pingmyblog.com",
    "http://xmlrpc.blogg.de",
    "http://www.blogoole.com/ping/"
];

async function pingUrl(title: string, url: string) {
    const xml = `<?xml version="1.0"?>
<methodCall>
  <methodName>weblogUpdates.ping</methodName>
  <params>
    <param><value>${title}</value></param>
    <param><value>${url}</value></param>
  </params>
</methodCall>`;

    for (const service of PING_SERVICES) {
        try {
            await axios.post(service, xml, {
                headers: { 'Content-Type': 'text/xml' },
                timeout: 3000
            });
            console.log(`   [PING] -> ${service.substring(0, 30)}... ✅`);
        } catch (e) {
            // Ignored
        }
    }
}

async function main() {
    console.log('\n╔══════════════════════════════════════════════════════════');
    console.log('║  🚀 MASSIVE SEO PING BOMBER v1.0');
    console.log('║  Siteler tüm dünyaya haykırılıyor...');
    console.log('╚══════════════════════════════════════════════════════════\n');

    const sites = await prisma.site.findMany({ where: { isActive: true } });

    for (const site of sites) {
        console.log(`📡 [${site.domain}] için ping bombardımanı başladı...`);
        await pingUrl(site.name, `https://${site.domain}/`);

        // Also ping a few random news
        try {
            const mc = JSON.parse(site.maskContent);
            if (mc?.news?.length) {
                const latest = mc.news[0];
                await pingUrl(latest.title, `https://${site.domain}/haberler/${latest.slug}`);
            }
        } catch (e) { }
    }

    console.log('\n🏁 PING BOMBALAMASI TAMAMLANDI.');
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
