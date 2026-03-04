

import { google } from 'googleapis';
import { PrismaClient } from '@prisma/client';
import http from 'http';
import url from 'url';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

// --- AYARLAR ---
// .env'den oku, yoksa buradaki değerleri manuel doldur
const CLIENT_ID = process.env.GOOGLE_OAUTH_CLIENT_ID || '';
const CLIENT_SECRET = process.env.GOOGLE_OAUTH_CLIENT_SECRET || '';
const REDIRECT_URI = 'http://localhost:4242/callback';
const TOKEN_PATH = path.join(process.cwd(), 'google-oauth-token.json');
const SCOPES = ['https://www.googleapis.com/auth/indexing'];

// -----------------------------------------------

function createOAuth2Client() {
    return new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
}

function loadSavedToken(): any | null {
    // 1. Check for environment variable (For Render/Production)
    if (process.env.GOOGLE_INDEXING_TOKEN) {
        try {
            return JSON.parse(process.env.GOOGLE_INDEXING_TOKEN);
        } catch (e) {
            console.error('❌ GOOGLE_INDEXING_TOKEN env is not a valid JSON!');
        }
    }

    // 2. Check for local file
    if (fs.existsSync(TOKEN_PATH)) {
        const raw = fs.readFileSync(TOKEN_PATH, 'utf-8');
        return JSON.parse(raw);
    }
    return null;
}

function saveToken(token: any) {
    fs.writeFileSync(TOKEN_PATH, JSON.stringify(token, null, 2));
    console.log(`✅ Token kaydedildi: ${TOKEN_PATH}`);
}

async function getAuthenticatedClient(): Promise<any> {
    const oAuth2Client = createOAuth2Client();

    // Daha önce token kaydedildiyse direkt kullan
    const savedToken = loadSavedToken();
    if (savedToken) {
        oAuth2Client.setCredentials(savedToken);
        console.log('✅ Kayıtlı token bulundu, giriş atlanıyor.');
        return oAuth2Client;
    }

    // Token yoksa browser flow başlat
    if (!CLIENT_ID || !CLIENT_SECRET) {
        console.error('');
        console.error('❌ GOOGLE_OAUTH_CLIENT_ID ve GOOGLE_OAUTH_CLIENT_SECRET bulunamadı!');
        console.error('');
        console.error('Lütfen şu adımları izleyin:');
        console.error('1. https://console.cloud.google.com/apis/credentials adresine git');
        console.error('2. "Create Credentials" → "OAuth 2.0 Client IDs" → "Web application"');
        console.error('3. Redirect URI olarak ekle: http://localhost:4242/callback');
        console.error('4. Oluşturulan Client ID ve Secret\'i .env dosyasına ekle:');
        console.error('   GOOGLE_OAUTH_CLIENT_ID=<client_id>');
        console.error('   GOOGLE_OAUTH_CLIENT_SECRET=<client_secret>');
        console.error('');
        process.exit(1);
    }

    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
        prompt: 'consent',
    });

    console.log('');
    console.log('🌐 Tarayıcıda Google hesabına giriş yapın:');
    console.log('');
    console.log(`→ ${authUrl}`);
    console.log('');

    // Tarayıcıyı otomatik aç
    try {
        const openModule = await import('open');
        await openModule.default(authUrl);
        console.log('🚀 Tarayıcı açıldı! Google Hesabınıza giriş yapın ve izin verin.');
    } catch {
        console.log('ℹ️  Tarayıcı otomatik açılamadı, yukarıdaki linki manuel kopyalayın.');
    }

    // Callback'i yakala
    console.log('⏳ Giriş bekleniyor...');
    const code = await new Promise<string>((resolve, reject) => {
        const server = http.createServer((req, res) => {
            const parsedUrl = url.parse(req.url || '', true);
            const code = parsedUrl.query.code as string;

            if (code) {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(`
                    <html><body style="font-family:sans-serif;text-align:center;padding:80px;background:#0f172a;color:white;">
                        <h1 style="color:#10b981;font-size:3rem">✅ Giriş Başarılı!</h1>
                        <p style="font-size:1.2rem;color:#94a3b8">Bu sekmeyi kapatabilirsiniz. Script çalışmaya devam ediyor...</p>
                    </body></html>
                `);
                server.close();
                resolve(code);
            } else {
                res.writeHead(400);
                res.end('Kod alınamadı.');
                server.close();
                reject(new Error('OAuth code alınamadı'));
            }
        });

        server.listen(4242, () => {
            console.log('📡 Localhost:4242 dinleniyor...');
        });

        server.on('error', reject);
        setTimeout(() => {
            server.close();
            reject(new Error('Timeout: 5 dakika içinde giriş yapılmadı'));
        }, 5 * 60 * 1000);
    });

    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);
    saveToken(tokens);

    return oAuth2Client;
}

async function pushUrls(auth: any, urls: string[]) {
    const indexing = google.indexing({ version: 'v3', auth });
    let success = 0;
    let failed = 0;

    for (const urlStr of urls) {
        try {
            const res = await indexing.urlNotifications.publish({
                requestBody: {
                    url: urlStr,
                    type: 'URL_UPDATED',
                },
            });
            console.log(`  ✅ ${urlStr} → HTTP ${res.status}`);
            success++;
            await new Promise(r => setTimeout(r, 200));
        } catch (err: any) {
            const msg = err.errors?.[0]?.message || err.message || String(err);
            console.error(`  ❌ ${urlStr} → ${msg}`);
            failed++;
            if (msg.includes('quota') || msg.includes('Quota')) {
                console.log('\n⚠️  GÜNLÜK KOTA DOLDU. Yarın tekrar çalıştır.');
                break;
            }
        }
    }

    return { success, failed };
}

async function main() {
    console.log('');
    console.log('╔══════════════════════════════════════════════');
    console.log('║  🚀 NUCLEAR GOOGLE INDEXING - OAuth2 Flow');
    console.log('╚══════════════════════════════════════════════');
    console.log('');

    const auth = await getAuthenticatedClient();

    const sites = await prisma.site.findMany({
        where: { isActive: true },
        select: { domain: true, maskContent: true },
    });

    console.log(`\n📊 ${sites.length} aktif site bulundu.\n`);

    let totalSuccess = 0;
    let totalFailed = 0;

    for (const site of sites) {
        const domain = site.domain;
        const urlList: string[] = [
            `https://${domain}/`,
            `https://${domain}/haberler`,
            `https://${domain}/hakkimizda`,
            `https://${domain}/iletisim`,
            `https://${domain}/deneme-bonusu`,
            `https://${domain}/bahis-siteleri`,
            `https://${domain}/casino-siteleri`,
            `https://${domain}/hosgeldin-bonusu`,
        ];

        try {
            const mc = typeof site.maskContent === 'string'
                ? JSON.parse(site.maskContent)
                : site.maskContent;
            if (mc?.news?.length) {
                const newsUrls = (mc.news as any[])
                    .slice(0, 50)
                    .map((n: any) => `https://${domain}/haberler/${n.slug}`);
                urlList.push(...newsUrls);
            }
        } catch { }

        console.log(`\n📡 [${domain}] → ${urlList.length} URL push'lanıyor...`);
        const { success, failed } = await pushUrls(auth, urlList);
        console.log(`   └─ ✅ ${success} başarılı  ❌ ${failed} hatalı`);
        totalSuccess += success;
        totalFailed += failed;
    }

    console.log('');
    console.log('╔══════════════════════════════════════════════');
    console.log(`║  🏁 TAMAMLANDI: ${totalSuccess} URL → Google Indexing kuyruğuna eklendi`);
    if (totalFailed > 0) {
        console.log(`║  ⚠️  ${totalFailed} URL push'lanamadı (kota/izin hatası)`);
    }
    console.log('╚══════════════════════════════════════════════');
    console.log('');
}

main()
    .catch(err => {
        console.error('\n💥 HATA:', err.message);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
