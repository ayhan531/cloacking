import axios from 'axios';
import fs from 'fs';
import path from 'path';

const BUFFER_TOKEN = 'ZlGfyb_r6b79C5NCqiIhLmI8XexmQafl1egLnLvuFNq';
const CSV_PATH = path.join(process.cwd(), 'social-bomber-output', 'buffer-bulk-upload.csv');

async function pushToBuffer() {
    console.log('🚀 NUCLEAR BUFFER AUTO-PUSHER v1.0');

    if (!fs.existsSync(CSV_PATH)) {
        console.error('❌ CSV dosyası bulunamadı!');
        return;
    }

    try {
        // 1. Get Profiles - Using the confirmed correct domain and version
        const profileRes = await axios({
            method: 'get',
            url: 'https://api.bufferapp.com/1/profiles.json',
            headers: {
                'Authorization': `Bearer ${BUFFER_TOKEN}`,
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
            }
        });

        const profiles = profileRes.data;
        if (!profiles || profiles.length === 0) {
            console.error('❌ Buffer hesabı bulunamadı veya profil yok.');
            return;
        }

        console.log(`📡 ${profiles.length} profil bulundu. Gönderim başlıyor...`);

        // 2. Parse CSV
        const content = fs.readFileSync(CSV_PATH, 'utf8');
        const lines = content.split('\n').filter(l => l.trim()).slice(1);

        for (const line of lines) {
            const match = line.match(/"(.*)",(.*)/);
            if (!match) continue;

            const text = match[1];
            const scheduledAt = match[2];

            for (const profile of profiles) {
                try {
                    console.log(`📤 [${profile.service}] için gönderiliyor: ${text.substring(0, 30)}...`);

                    const formData = new URLSearchParams();
                    formData.append('text', text);
                    formData.append('profile_ids[]', profile.id);
                    formData.append('scheduled_at', scheduledAt);
                    formData.append('shorten', 'true');

                    await axios({
                        method: 'post',
                        url: 'https://api.bufferapp.com/1/updates/create.json',
                        headers: {
                            'Authorization': `Bearer ${BUFFER_TOKEN}`,
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'User-Agent': 'Mozilla/5.0'
                        },
                        data: formData.toString()
                    });

                    await new Promise(r => setTimeout(r, 1500));
                } catch (e: any) {
                    console.error(`   ❌ Hata (${profile.service}):`, e.response?.data?.message || e.response?.data || e.message);
                }
            }
        }

        console.log('✅ İşlem tamamlandı!');

    } catch (error: any) {
        console.error('❌ Kritik Hata:', error.response?.data || error.message);
    }
}

pushToBuffer();
